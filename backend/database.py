# database.py
# We use SQLite (built into Python — no installation needed).
# This file creates the database and a "messages" table when the server starts.

import sqlite3
import os

DB_NAME = os.getenv("DB_PATH", "chat_history.db")

def init_db():
    """Create the messages table if it doesn't already exist."""
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS messages (
            id        INTEGER PRIMARY KEY AUTOINCREMENT,
            role      TEXT NOT NULL,        -- 'user' or 'assistant'
            content   TEXT NOT NULL,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    """)

    conn.commit()
    conn.close()

def save_message(role: str, content: str):
    """Save a single message to the database."""
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    cursor.execute("INSERT INTO messages (role, content) VALUES (?, ?)", (role, content))
    conn.commit()
    conn.close()

def get_recent_messages(limit: int = 20):
    """Fetch the last N messages for display or context."""
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    cursor.execute(
        "SELECT role, content, timestamp FROM messages ORDER BY id DESC LIMIT ?",
        (limit,)
    )
    rows = cursor.fetchall()
    conn.close()
    # Return in chronological order
    return [{"role": r[0], "content": r[1], "timestamp": r[2]} for r in reversed(rows)]
