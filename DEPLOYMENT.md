# Deployment Guide (Cloudflare + FastAPI)

This project is easiest to deploy as:
- Frontend (React/Vite): Cloudflare Pages
- Backend (FastAPI): Render Web Service

## 1) Prepare the repo

1. Make sure these files exist:
   - `backend/.env.example`
   - `frontend/.env.example`
2. Never commit real secrets. Keep real key only in host environment variables.

## 2) Deploy backend (Render)

1. Push this repo to GitHub.
2. In Render, create a new `Web Service` from the repo.
3. Set:
   - Root Directory: `backend`
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
4. Add environment variables in Render:
   - `OPENROUTER_API_KEY=<your real key>`
   - `CORS_ORIGINS=https://<your-pages-domain>`
   - Optional: `DB_PATH=/var/data/chat_history.db` (if using a mounted disk)
5. Deploy and verify:
   - `https://<render-service-url>/`
   - `https://<render-service-url>/config-status` (should show `openrouter_key_set: true`)

## 3) Deploy frontend (Cloudflare Pages)

1. In Cloudflare Pages, create project from the same GitHub repo.
2. Build settings:
   - Framework preset: `Vite`
   - Root directory: `frontend`
   - Build command: `npm run build`
   - Build output directory: `dist`
3. Add Pages Environment Variable:
   - `VITE_API_URL=https://<render-service-url>`
4. Deploy and open your Pages URL.

## 4) Connect custom domain in Cloudflare

1. In Pages project, add custom domain (for example `www.yourdomain.com`).
2. In your DNS zone on Cloudflare:
   - Point `www` to Pages (Cloudflare usually auto-configures this through Pages UI).
3. For API, create subdomain:
   - `api.yourdomain.com` CNAME to your Render hostname.
4. Update:
   - Render `CORS_ORIGINS=https://www.yourdomain.com`
   - Cloudflare Pages `VITE_API_URL=https://api.yourdomain.com`
5. Redeploy frontend (and restart backend after env var change).

## 5) Final checks

1. Open browser devtools on the site and send a chat message.
2. If chat fails, inspect response from:
   - `POST /chat` in Network tab
   - Backend logs in Render
3. Common issues:
   - CORS mismatch: `CORS_ORIGINS` missing exact frontend URL.
   - Wrong API URL: `VITE_API_URL` points to old/local address.
   - Missing key: backend `/config-status` shows `openrouter_key_set: false`.
