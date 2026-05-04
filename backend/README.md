# Alfaaz Backend

Render settings for this FastAPI service:

- Root Directory: `backend`
- Build Command: `pip install -r requirements.txt`
- Start Command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`

Do not prefix commands with `backend/` when the Render root directory is already set to `backend`.

Required environment variables:

- `ENV=production`
- `DATABASE_URL`
- `JWT_SECRET`
- `ADMIN_PASSWORD`

Optional environment variables:

- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `SMTP_EMAIL`
- `SMTP_PASSWORD`
- `GROQ_API_KEY`
