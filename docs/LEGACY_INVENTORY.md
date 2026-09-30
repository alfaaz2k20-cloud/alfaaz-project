# Legacy System Inventory (Pre-V1.3)

## 1. Stack
- **Frontend**: Vanilla HTML/JS, Vite bundler, Tailwind CSS, Lucide icons.
- **Backend**: Python FastAPI, Uvicorn, SQLAlchemy/SQLModel for ORM, PyJWT, passlib. Groq for AI integrations.

## 2. Deployments & Environments
- **Frontend Deployment**: Vercel (indicated by `vercel.json`).
- **Backend Deployment**: Render (indicated by `render.yaml`) / Heroku (indicated by `Procfile`).

## 3. Data Stores
- **Primary Database**: SQLite locally (`alfaaz_data.db`), PostgreSQL in production (via `DATABASE_URL`).
- **Media Storage**: Cloudinary.
- **Legacy Candidate Data**: Stored in `alfaaz_data.db`. A verified backup was taken.

## 4. Environment Variables (Keys Only)
- **Frontend** (`.env.development` / `.env.production`):
  - `VITE_API_BASE_URL`
- **Backend** (`.env`):
  - `ENV`
  - `DATABASE_URL`
  - `ADMIN_PASSWORD`
  - `JWT_SECRET`
  - `GROQ_API_KEY`
  - `PHANTOM_SECRET_TOKEN`
  - `CLOUDINARY_CLOUD_NAME`
  - `CLOUDINARY_API_KEY`
  - `CLOUDINARY_API_SECRET`
  - `MAKE_WEBHOOK_URL`
  - `PYTHON_VERSION`

## 5. Verified Data Backups
- **File**: `backend/alfaaz_data_backup.db`
- **SHA256 Checksum**: `6e8673da1762dba61ad76062bfd95958a0c61fc6a67aacd9d40d4b6cc2d4dfda`
- **Status**: Tagged `legacy-pre-v1.3` in git.

## 6. What will be replaced
The V1.3 build will eventually replace the candidate assessment pathways in the frontend (such as `recruit.html` / `sequence.html`) and the backend evaluation routes. We will build V1.3 in a separate directory/branch structure initially. Legacy keeps running until explicit cutover.
