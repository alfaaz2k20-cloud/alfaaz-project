# Alfaaz Collective | Project Manifesto & AI Guidelines

## 1. Core Identity & Design Philosophy
- **Visual Style:** Total minimalism. Every interface must be elegant, clean, and spacious.
- **Thematic Tone:** The project is a bridge between art, literature, and existence. Keep UI copy and generated content poetic, grounded, and philosophical.
- **UI Constraints:** Prioritize centered layouts and high-quality typography. Avoid unnecessary borders, shadows, or "busy" components.

## 2. Linguistic & Naming Conventions
- **Suffix Rule:** Always favor clean, two-word suffixes for modules, organizations, or features (e.g., "Alfaaz Collective").
- **Strict Prohibition:** NEVER use "-e-" linkages (ezafe) or clunky, multi-word philosophical compounds.
- **Regional Influence:** Names may draw from Urdu, Persian, or Kashmiri roots, but they must remain readable and natural. Focus on suffix-based structures.

## 3. Technical Architecture
- **Backend:** FastAPI deployed on Render.
- **Frontend:** Vite Multi-Page App (MPA) with vanilla ES modules, deployed on Vercel from the `frontend/` directory.
- **Data Handling:** 
    - Use `Bearer` tokens for authentication (stored in `localStorage`).
    - `CORS` is strictly configured (`allow_credentials=False`).
- **Database Schema (Active):** 
    - The correct table is `exhibitions_list`.
    - Use the column `is_active` for status checks.
    - Avoid outdated references to `exhibition_config`.

## 4. Engineering Guardrails
- **File Structure:** Keep logic strictly separated. Routers stay in `routers/`, models stay in `models/`. Do not duplicate router logic in the models directory.
- **Security & Privacy:** 
    - Protect original paintings and photographs. Never suggest exposing raw asset directories in public API endpoints.
    - Use environment variables (`.env`) for backend URLs and Cloudinary credentials.
- **Rate Limiting:** The "Curator" AI widget uses a minimalist in-memory rate limiter. Acknowledge that this resets on Render's free tier restarts.

## 5. Current "Surgical Fix" Status (May 2026)
- Redundant `models/exhibitions.py` has been removed to prevent logic collisions.
- `delete_user` logic is corrected to filter by `user_email` across event registrations.
- Vercel serverless functions are synced to the `exhibitions_list` schema.
