# main.py
# FastAPI backend with two routes:
#   POST /chat     → sends user message to OpenRouter AI, returns AI reply
#   GET  /history  → returns recent chat messages from SQLite

import os
from pathlib import Path
import httpx
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

from database import init_db, save_message, get_recent_messages
from resume import get_resume_context, get_resume_source

DOTENV_PATH = Path(__file__).with_name(".env")


def get_openrouter_api_key() -> str:
    # Force values from .env to override empty/stale process env values.
    load_dotenv(dotenv_path=DOTENV_PATH, override=True)
    load_dotenv(override=True)
    return os.getenv("OPENROUTER_API_KEY", "").strip().strip('"').strip("'")
OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions"
MODEL = "stepfun/step-3.5-flash:free"  # Free model on OpenRouter

# ── App setup ────────────────────────────────────────────────────────────────
app = FastAPI(title="Sriram Portfolio API")

# CORS: Allow the React frontend (running on port 5173) to talk to this server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create DB tables on startup
@app.on_event("startup")
def startup():
    init_db()

# ── Request/Response models ───────────────────────────────────────────────────
class ChatRequest(BaseModel):
    message: str   # The user's question

class ChatResponse(BaseModel):
    reply: str     # The AI's answer

# ── Routes ───────────────────────────────────────────────────────────────────

@app.get("/")
def root():
    """Health check — visit http://localhost:8000 to confirm backend is running."""
    return {"status": "running", "message": "Sriram's Portfolio API is live!"}


@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """
    Receives a user question, sends it to OpenRouter AI with resume context,
    saves both messages to SQLite, and returns the AI reply.
    """
    openrouter_api_key = get_openrouter_api_key()
    if not openrouter_api_key:
        raise HTTPException(status_code=500, detail="OpenRouter API key not set in .env")

    user_message = request.message.strip()
    if not user_message:
        raise HTTPException(status_code=400, detail="Message cannot be empty")

    # System prompt: tell the AI who it is and give it Sriram's resume
    resume_context = get_resume_context()

    system_prompt = f"""You are an AI assistant for Sriram Karthik Eunni's portfolio website.
Answer questions about Sriram based ONLY on the resume information provided below.
Be friendly, concise, and professional. If a question is not related to Sriram or his resume,
politely say you can only answer questions about Sriram.

RESUME DATA:
{resume_context}
"""

    # Prepare the request payload for OpenRouter
    payload = {
        "model": MODEL,
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user",   "content": user_message},
        ]
    }

    headers = {
        "Authorization": f"Bearer {openrouter_api_key}",
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:5173",  # Required by OpenRouter
        "X-Title": "Sriram Portfolio"
    }

    # Call OpenRouter API
    async with httpx.AsyncClient(timeout=30.0) as client:
        response = await client.post(OPENROUTER_URL, json=payload, headers=headers)

    if response.status_code != 200:
        raise HTTPException(status_code=502, detail=f"OpenRouter error: {response.text}")

    ai_reply = response.json()["choices"][0]["message"]["content"]

    # Save both messages to the database
    save_message("user", user_message)
    save_message("assistant", ai_reply)

    return ChatResponse(reply=ai_reply)


@app.get("/history")
def history():
    """Returns the last 20 chat messages from the database."""
    messages = get_recent_messages(limit=20)
    return {"messages": messages}


@app.get("/resume")
def resume_status():
    """Verifies resume data can be read by the backend."""
    context = get_resume_context()
    return {
        "source": get_resume_source(),
        "characters": len(context),
        "preview": context[:500],
    }


@app.get("/config-status")
def config_status():
    key = get_openrouter_api_key()
    return {
        "dotenv_path": str(DOTENV_PATH),
        "dotenv_exists": DOTENV_PATH.exists(),
        "openrouter_key_set": bool(key),
        "openrouter_key_length": len(key),
    }
