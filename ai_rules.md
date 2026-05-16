# Alfaaz Collective - Minimalist Manifesto (AI Guidelines)

## 1. The Tech Stack
*   **Frontend:** Vite Multi-Page App (MPA), Vanilla ES Modules, Native Web Components (e.g., `<alfaaz-nav>`). **NO REACT, NO NEXT.JS, NO HEAVY UI LIBRARIES.**
*   **Backend:** FastAPI, Python, SQLModel.

## 2. Core Directives
*   **Maintenance Minimalism:** Write the least amount of code possible. If a native web API can do it, do not install an npm package.
*   **Backend Structure:** Follow the existing split used in this repo: persistence models live in `models/`, and request/response validation schemas live in `schemas/`. Reuse those layers instead of inventing new ones.
*   **Vite Routing:** All frontend asset paths must be absolute (starting with `/`) to support the `vite.config.js` MPA setup.
*   **Environment Variables:** Never hardcode URLs. Prefer `import.meta.env.VITE_API_BASE_URL` on the frontend, while keeping `VITE_API_URL` as a legacy fallback only when needed.

## 3. Strict Boundary
Do not suggest migrating away from this stack. If asked to fix a bug or add a feature, do so strictly within these exact parameters.
