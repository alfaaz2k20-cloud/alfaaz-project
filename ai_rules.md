# Alfaaz Collective - Minimalist Manifesto (AI Guidelines)

## 1. The Tech Stack
*   **Frontend:** Vite Multi-Page App (MPA), Vanilla ES Modules, Native Web Components (e.g., `<alfaaz-nav>`). **NO REACT, NO NEXT.JS, NO HEAVY UI LIBRARIES.**
*   **Backend:** FastAPI, Python, SQLModel.

## 2. Core Directives
*   **Maintenance Minimalism:** Write the least amount of code possible. If a native web API can do it, do not install an npm package.
*   **Single Source of Truth:** The backend relies entirely on the SQLModel inheritance pattern. Do not separate Pydantic schemas from SQLAlchemy models.
*   **Vite Routing:** All frontend asset paths must be absolute (starting with `/`) to support the `vite.config.js` MPA setup.
*   **Environment Variables:** Never hardcode URLs. Always use `import.meta.env.VITE_API_BASE_URL` on the frontend.

## 3. Strict Boundary
Do not suggest migrating away from this stack. If asked to fix a bug or add a feature, do so strictly within these exact parameters.