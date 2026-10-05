# ALFAAZ FULL PROJECT AUDIT
**Canonical Architecture Map, Complete Codebase Inventory, and Recruit Subsystem Forensic Diagnosis**

*Date: October 2, 2026*  
*Repository: `alfaaz2k20-cloud/alfaaz-project`*  
*Local HEAD Commit: `f5b4475bbc6ee6077f436087b9dbff003221ba19`*  
*Deployment Targets: Vercel (`alfaazcollective.vercel.app`), Render (`alfaaz-project.onrender.com`), PostgreSQL (`alfaaz-db`)*

---

## 1. Executive Summary

### 1.1 What is the Current Architecture?
The Alfaaz project is a hybrid cultural platform consisting of two major subsystems sharing a single production backend and PostgreSQL database:
1. **The Public Cultural Platform:** A Vite Multi-Page Application (MPA) built with vanilla ES modules, Tailwind CSS, and custom Web Components, deployed on Vercel. It provides public community features: exhibition catalogs, poetry/literature submissions ("The Vault"), club applications, events RSVP, journal publications ("The Journal" / Blogs), and member accounts.
2. **Alfaaz Recruit:** A 2-cycle volunteer behavioral assessment system mounted on the same frontend at `/recruit.html` and connected to the same FastAPI backend at `/recruit/*`. It implements a 7-scenario Situational Judgment Test (SJT) followed by a 7-world, 21-minigame behavioral assessment battery, streaming raw telemetry events into PostgreSQL and generating evidence dossiers for administrative review.
3. **Dual Backend Execution:**
   - **Render Web Service (FastAPI / Python):** Serves `/auth/*`, `/events/*`, `/clubs/*`, `/exhibitions/*`, `/admin/*`, `/curator/*`, `/vault/*`, `/recruit/*`, and `/recruit/research/*`.
   - **Vercel Serverless Functions (Node.js):** Directly queries PostgreSQL via `pg.Pool` for `/api/blogs`, `/api/blog`, and `/api/notices` to bypass Render cold starts for public readers.

### 1.2 What is Broken?
1. **PWA Service Worker Stale-Asset Delivery:** The active service worker (`public/sw.js`) applies `staleWhileRevalidate` caching to same-origin scripts. When new frontend code is pushed and deployed to Vercel, returning users receive the **old cached JavaScript bundle** on their first visit, making fixes appear non-existent until a second hard refresh.
2. **Global 401 Interceptor Kicks Candidates to Login:** `frontend/global.js` registers a global fetch wrapper (`globalApiFetch`) that redirects any request returning HTTP 401 to `login.html` and clears `localStorage`. While `recruit.html` is an unauthenticated volunteer assessment, `recruit.js` delegates to `window.globalApiFetch`, making candidate sessions vulnerable to abrupt eviction if any endpoint misfires.
3. **Admin Dossier Load Failures During Cold Starts:** When an admin clicks "Inspect Dossier", the modal calls `/recruit/research/session/{sessionId}`. If Render's free-tier instance is spinning up (30–50s delay), the call times out or throws, displaying `"Failed to load candidate dossier. Please check server connection."`
4. **Synchronous `sessionStorage` Serialisation on Telemetry:** On every candidate interaction (mouse move, slider drag, click), `saveLocalState()` synchronously calls `JSON.stringify(state.telemetryQueue)` and writes up to 100 KB to `sessionStorage` on the main thread, causing micro-stutter on mobile devices.
5. **Credentials Tracked in Git:** A file named `recovery-codes.txt` containing six plaintext 2FA/account recovery codes is actively tracked in git at the repository root.

### 1.3 Why is Recruit Unstable or Laggy?
- **Runtime ReferenceErrors (Now Resolved in HEAD `f5b4475`):** During previous label cleanups, template strings in C3, E2, Q1, and Q3 referenced `currentTrial` instead of loop counters, throwing `ReferenceError: currentTrial is not defined` when clicking "Begin Activity" on the Activity Guide. This aborted DOM rendering, trapped candidates on the tutorial card, and led to repeated clicks.
- **Client-Side Tailwind Play CDN:** `recruit.html` loads `<script src="https://cdn.tailwindcss.com">` in addition to Vite's bundled CSS. The Tailwind browser compiler continuously re-scans dynamic DOM injections and recalculates styles, causing significant UI rendering latency on mobile.
- **Render Free-Tier Spin-Down:** Render shuts down after 15 minutes of inactivity. Initial assessment start (`POST /recruit/consent`) blocks while awaiting the backend pulse.

### 1.4 Are Recruit and the Main Site Interfering with Each Other?
- **Database Connection Contention:** Both systems query the same PostgreSQL database. Vercel serverless functions create pooled connections per lambda instance without connection pooling limits, while Recruit streams batches of telemetry events into `telemetry_events`. Under load, database connection limits can be saturated.
- **Shared Administrative Modal:** `admin.html` uses a single modal container (`#regModal`) for both Event Registration Lists and Candidate Evidence Dossiers. State collisions can occur if multiple views are toggled quickly.
- **Shared Storage and Global Scripts:** `global.js` runs a background bilingual flipper (`.ur-hover`) and a 10-minute ping loop on all pages, including `/recruit.html`.

### 1.5 What is Definitely Unused?
1. `v1.3/`: An abandoned 58-file TypeScript/React monorepo prototype (`apps/web`, `apps/api`, `packages/core`) that violates `ai_rules.md` ("NO REACT").
2. Root patch scripts (`build-sequence.py`, `clean_export.py`, `fix.py`, `patch-backend.py`, `patch-cycles.py`, `replace-recruit.py`, `update-backend.py`): One-off legacy scripts referencing obsolete files.
3. `frontend/components.js`: A 102-line Web Component (`<alfaaz-nav>`) that is never imported or referenced in any HTML file.
4. `upload_ready/`: An untracked export folder.
5. `frontend/src/content` & `frontend/src/game`: Empty directories.

### 1.6 What Must NOT Be Deleted?
- **Root `config/` AND `backend/config/`:** Both are structurally mandatory. Root `config/` is required for Python tests and Vite pre-build checks; `backend/config/` is required for Render production deployment (`rootDir: backend`).
- **All 12 HTML entry points in `frontend/` and their respective modules in `frontend/src/`.**
- **All 8 game files in `frontend/src/recruit_games/`.**
- **All 10 backend routers and 12 services.**
- **All 24 database tables.**

### 1.7 What Needs to be Fixed First?
1. Exclude `/recruit.html` and Recruit assets from Service Worker aggressive caching or invalidate cache on deploy.
2. Decouple `recruit.js` from `global.js`'s 401 redirect behavior to prevent unauthenticated candidates from being bounced to `login.html`.
3. Debounce and asynchronously schedule `sessionStorage` writes in `recruit.js`.
4. Remove `cdn.tailwindcss.com` runtime compiler from `recruit.html` and rely purely on Vite-compiled CSS.
5. Rotate and remove `recovery-codes.txt` from repository tracking.

### 1.8 What is Still Unknown?
- Production PostgreSQL connection pool limits and current max concurrent connection configuration on Render / Neon.
- Cloudinary credentials validity for large video/image uploads in the public Vault.
- Exact Render cold start latency for overseas mobile users outside US East.

---

## 2. Current Project State

```
Branch: main
HEAD Commit: f5b4475bbc6ee6077f436087b9dbff003221ba19
Working Tree: Clean (0 uncommitted changes)
Python Unit Tests: 141 passed (100%)
Acceptance Suite: 22 passed (100%)
Banned-Word Linter: 0 banned words found
Vite Production Build: Passing (dist/assets/recruit-Cu6jn_kK.js)
```

The repository is synchronized between `main` and `origin/main`. The recent patch (`f5b4475`) fixed all Activity Guide ReferenceErrors in C3, E2, Q1, and Q3. All 21 games now transition smoothly in automated mock environments.

---

## 3. Complete Architecture Map

```
                                  [ USER BROWSER ]
                                         │
                 ┌───────────────────────┴───────────────────────┐
                 │                                               │
        (Public Pages & MPA)                             (Assessment App)
       alfaazcollective.vercel.app                  alfaazcollective.vercel.app/recruit.html
                 │                                               │
                 ▼                                               ▼
         [ VERCEL HOSTING ]                              [ VERCEL HOSTING ]
         Static HTML / CSS / JS                          Static recruit.html + JS Bundle
         Vercel Serverless Functions                     (PWA Service Worker: sw.js)
         (/api/blogs, /api/notices)                              │
                 │                                               │
                 │ (Direct SQL)                                  │ (API Fetch)
                 │                                               ▼
                 │                                    [ RENDER WEB SERVICE ]
                 │                                  FastAPI (Python 3.12 / SQLModel)
                 │                                  alfaaz-project.onrender.com
                 │                                  ┌─────────────────────────────┐
                 │                                  │ • /auth/* (JWT Auth)        │
                 │                                  │ • /events/* (RSVP)          │
                 │                                  │ • /clubs/* (Memberships)    │
                 │                                  │ • /exhibitions/* (Catalog)  │
                 │                                  │ • /vault/* (Submissions)    │
                 │                                  │ • /admin/* (Management)     │
                 │                                  │ • /recruit/* (Candidate)    │
                 │                                  │ • /recruit/research/* (Ops) │
                 │                                  └──────────────┬──────────────┘
                 │                                                 │
                 ▼                                                 ▼
      ┌───────────────────────────────────────────────────────────────────┐
      │                   SHARED POSTGRESQL DATABASE                      │
      │                           (alfaaz-db)                             │
      │                                                                   │
      │  PUBLIC TABLES:                     RECRUIT TABLES:               │
      │  • users                            • applicant_identities        │
      │  • audit_logs                       • recruit_sessions            │
      │  • blogs                            • consent_records             │
      │  • club_memberships                 • accessibility_profiles      │
      │  • events                           • warmup_baselines            │
      │  • event_registrations              • task_assignments            │
      │  • exhibitions_list                 • sjt_responses               │
      │  • exhibition_artworks              • telemetry_events            │
      │  • exhibition_rsvps                 • features                    │
      │  • visitor_notes                    • evidence                    │
      │  • submissions                      • data_quality_flags          │
      │                                     • volunteer_outcomes          │
      │                                     • recruiter_access_logs       │
      └───────────────────────────────────────────────────────────────────┘
```

---

## 4. Directory & File Inventory

### 4.1 Root Directory

| Path | Purpose | Runtime / Build | Classification | Notes |
| :--- | :--- | :--- | :--- | :--- |
| `render.yaml` | Render Blueprint configuration | Build / Deploy | **STRUCTURAL** | Defines web service & DB |
| `vercel.json` | Vercel MPA build and routing config | Build / Deploy | **STRUCTURAL** | Sets output to `frontend/dist` |
| `GEMINI.md` | AI engineering guardrails & manifesto | Documentation | **STRUCTURAL** | Project rules & invariants |
| `ai_rules.md` | Strict minimalism directives | Documentation | **STRUCTURAL** | Forbids React/heavy libs |
| `README.md` | Repository overview | Documentation | ACTIVE | Basic project docs |
| `.gitignore` | Git exclusion rules | Dev / Git | **STRUCTURAL** | Ignores `.env`, `*.db`, `upload_ready` |
| `.aiexclude` | Context exclusion rules | Dev / AI | ACTIVE | Excludes private paths |
| `recovery-codes.txt` | 2FA recovery codes | Security | **SECURITY RISK** | Plaintext codes tracked in git |
| `alfaaz_data.db` | Local SQLite database | Dev / Local | LEGACY / UNUSED | Ignored by git |
| `test_mp_check.db` | Test SQLite database | Test / Local | LEGACY / UNUSED | Ignored by git |
| `build-sequence.py` | Legacy patch script | One-off | DEAD / UNUSED | References dead user media path |
| `clean_export.py` | Export utility to `upload_ready/` | One-off | DEAD / UNUSED | Obsolete packaging script |
| `fix.py` | Ad-hoc text replacement script | One-off | DEAD / UNUSED | Targeted old recruit.html |
| `patch-backend.py` | Ad-hoc router patch script | One-off | DEAD / UNUSED | Targeted old volunteers.py |
| `patch-cycles.py` | Ad-hoc copy injection script | One-off | DEAD / UNUSED | Injected banned vendor copy |
| `replace-recruit.py`| Ad-hoc replacement script | One-off | DEAD / UNUSED | Targeted nonexistent sequence.html |
| `update-backend.py` | Ad-hoc router update script | One-off | DEAD / UNUSED | Targeted old volunteers.py |
| `PWA_IMPLEMENTATION_SUMMARY.md` | Service worker docs | Documentation | HISTORICAL | Documents sw.js design |
| `RECRUITMENT_INTEGRATION.md` | Recruiter integration plan | Documentation | HISTORICAL | Outlines older phase plan |

### 4.2 Configuration Directories (`config/` and `backend/config/`)

Both directories contain identical copies of configuration files.
- `config/`: Used by repository root test suites (`tests/`), acceptance scripts (`scripts/`), and frontend build check (`frontend/scripts/check-recruit-build-config.mjs`).
- `backend/config/`: Used by the Render FastAPI runtime when deployed with `rootDir: backend`.

| File | Purpose | Consumers | Status |
| :--- | :--- | :--- | :--- |
| `locked_hashes.json` | SHA-256 integrity locks | `sjt_engine.py`, `evidence_integrator.py`, build checks | **LOCKED / STRUCTURAL** |
| `parameters.json` | 7 locked construct definitions | `sjt_engine.py`, `acceptance_check.py` | **LOCKED / STRUCTURAL** |
| `sjt_items.json` | 7 SJT scenarios & scoring spans | `sjt_engine.py`, `acceptance_check.py` | **LOCKED / STRUCTURAL** |
| `task_definitions.json` | 21 minigame definitions | `task_definitions.py`, `feature_extractor.py` | **LOCKED / STRUCTURAL** |
| `features.json` | Feature registry & minigame mappings| `acceptance_check.py`, `feature_extractor.py` | **LOCKED / STRUCTURAL** |
| `feature_bands.json` | Categorical feature cut-offs | `evidence_integrator.py` | **LOCKED / STRUCTURAL** |
| `integration.json` | Evidence convergence rules | `evidence_integrator.py` | **LOCKED / STRUCTURAL** |
| `brand.json` | Brand copy and retention days | Frontend build checks, candidate UI | **STRUCTURAL** |
| `copy/consent.json` | DPDP candidate consent copy | `recruit.py`, frontend UI | **STRUCTURAL** |
| `copy/privacy.json` | Privacy notice copy | `recruit.py`, frontend UI | **STRUCTURAL** |
| `copy/sjt_instructions.json` | SJT instruction copy | Frontend UI | **STRUCTURAL** |

### 4.3 Frontend (`frontend/`)

| Path | Purpose | Depends On | Depended On By | Status |
| :--- | :--- | :--- | :--- | :--- |
| `index.html` | Homepage & Public Showcase | `global.js`, `global.css` | Public users | **ACTIVE** |
| `blogs.html` | Journal / Articles list | `blogs.js`, `global.js` | Public users | **ACTIVE** |
| `post.html` | Blog post reader | `post.js`, `global.js` | Public readers | **ACTIVE** |
| `events.html` (inline in index) | Community events | `main.js`, `global.js` | Public users | **ACTIVE** |
| `exhibition.html` | Active exhibition showcase | `exhibition.js`, `global.js`| Art applicants | **ACTIVE** |
| `dashboard.html` | User dashboard & Club status | `dashboard.js`, `global.js` | Logged-in users | **ACTIVE** |
| `login.html` | Authentication entry point | `login.js`, `global.js` | Members / Admin | **ACTIVE** |
| `register.html` | Account registration | `register.js`, `global.js` | New members | **ACTIVE** |
| `reset.html` | Password recovery | `reset.js`, `global.js` | Members | **ACTIVE** |
| `submit.html` | The Vault submission portal | `submit.js`, `global.js` | Artists/Writers | **ACTIVE** |
| `recruit.html` | Recruit candidate assessment | `recruit.js`, `global.js` | Candidates | **ACTIVE** |
| `admin.html` | Admin & Recruitment Dossier | `admin.js`, `global.js` | Administrators | **ACTIVE** |
| `research.html` | Standalone Recruiter Research View | `research.js`, `global.js`| Recruiters | **ACTIVE** |
| `global.js` | Global configs, backend pulse | Fetch API | All HTML pages | **STRUCTURAL** |
| `global.css` | Global typography, layout | CSS Variables | All HTML pages | **STRUCTURAL** |
| `components.js` | `<alfaaz-nav>` custom element | CustomElements | **None (Zero imports)**| **DEAD / UNUSED** |
| `api/blogs.js` | Vercel serverless blogs query | `pg.Pool`, DB | `blogs.js` | **ACTIVE** |
| `api/blog.js` | Vercel serverless single post | `pg.Pool`, DB | `post.js` | **ACTIVE** |
| `api/notices.js` | Vercel serverless active notice | `pg.Pool`, DB | `index.html` | **ACTIVE** |
| `public/sw.js` | Service Worker cache | CacheStorage | `global.js` | **ACTIVE (CAUTION)** |

### 4.4 Backend (`backend/`)

| Path | Purpose | Dependencies | Consumers | Status |
| :--- | :--- | :--- | :--- | :--- |
| `app/main.py` | FastAPI application entry point | Routers, DB, Middleware | Uvicorn (Render) | **STRUCTURAL** |
| `app/core/config.py` | Environment variable resolution | `os`, `dotenv` | Entire backend | **STRUCTURAL** |
| `app/core/security.py` | JWT creation, bcrypt hashing | `passlib`, `jose` | Auth & Admin | **STRUCTURAL** |
| `app/db/session.py` | SQLAlchemy database engine | `sqlmodel`, PostgreSQL | DB operations | **STRUCTURAL** |
| `app/db/base.py` | Metadata base definition | `sqlmodel` | `main.py` | **STRUCTURAL** |
| `app/routers/auth.py` | Member authentication | `DBUser`, rate limiters | Frontend auth | **ACTIVE** |
| `app/routers/events.py` | Event listing and RSVP | `DBEvent`, `DBRegistration` | Frontend events | **ACTIVE** |
| `app/routers/clubs.py` | Club applications | `DBClubMembership` | Frontend clubs | **ACTIVE** |
| `app/routers/exhibitions.py` | Exhibition registration | `DBExhibition` | Artists | **ACTIVE** |
| `app/routers/admin.py` | Main administrative controls | All public models | `admin.js` | **ACTIVE** |
| `app/routers/curator.py` | AI Curator chat widget | Groq API, in-memory limiter| Public chat | **ACTIVE** |
| `app/routers/blogs.py` | Blog creation & Phantom AI | `DBBlog`, Groq | Admin blogs | **ACTIVE** |
| `app/routers/vault.py` | Vault art submissions | `DBSubmission`, Cloudinary | `submit.js` | **ACTIVE** |
| `app/routers/recruit.py` | Candidate assessment engine | Recruit models, engines | `recruit.js` | **ACTIVE** |
| `app/routers/research_view.py` | Recruiter dossier engine | Telemetry, evidence | `admin.js`, `research.js`| **ACTIVE** |

---

## 5. Public Website Flow

```
                      [ USER ]
                         │
          ┌──────────────┴──────────────┐
          ▼                             ▼
    [ index.html ]               [ blogs.html ]
    • Hero slider               • Fetches /api/blogs (Vercel)
    • Notices (/api/notices)    • Reads direct from PostgreSQL
    • About & Margins           • Clicking article -> post.html?id=X
    • Clubs (/clubs)                     │
    • Volunteer Call                     ▼
          │                        [ post.html ]
          │                     • Fetches /api/blog?id=X (Vercel)
          ▼
   [ recruit.html ]
 (Enters Recruit Battery)
```

### Flow Breakdown:
1. **Homepage (`index.html`):** Loads `global.js`, which initiates the backend wake pulse. Queries `/api/notices` via Vercel serverless function to fetch active announcements without waiting for Render. Contains a prominent call-to-action button linking directly to `recruit.html`.
2. **Journal (`blogs.html` & `post.html`):** Queries `/api/blogs` directly from PostgreSQL via Vercel serverless. Fast and independent of Render.
3. **Clubs & Events:** Uses `globalApiFetch` to call Render backend (`/events/active`, `/clubs/apply`). If Render is asleep, `serverReadyPromise` holds execution up to 30s.
4. **Member Auth (`login.html`, `register.html`, `dashboard.html`):** Standard JWT flow. Tokens stored in `localStorage.alfaaz_token`.

---

## 6. Backend Flow

```
HTTP REQUEST ──► RecruitBodyLimitMiddleware
                    ├── If /recruit/telemetry > 256 KB ──► HTTP 413
                    └── If other /recruit/* > 16 KB   ──► HTTP 413
                         │
                         ▼
                 CORSMiddleware
                    ├── Allowed Origins: Vercel, localhost
                    ├── allow_credentials: False
                    └── Methods: GET, POST, PUT, DELETE, OPTIONS
                         │
                         ▼
                   FastAPI Router
                         │
       ┌─────────────────┼─────────────────┐
       ▼                 ▼                 ▼
  /auth/*            /recruit/*      /recruit/research/*
  (JWT Auth)       (Candidate Flow)     (Recruiter Ops)
       │                 │                 │
       ▼                 ▼                 ▼
   PostgreSQL        PostgreSQL        PostgreSQL
   (users)           (sessions,        (evidence recompute,
                      telemetry)        dossier generation)
```

### Route-to-Service Registry:

| Endpoint | Router | Function | Primary Model / Service | Response |
| :--- | :--- | :--- | :--- | :--- |
| `POST /auth/register` | `auth.py` | `register_user` | `DBUser`, bcrypt | User token & profile |
| `POST /auth/login` | `auth.py` | `login_user` | `DBUser`, JWT | Access token |
| `GET /events/active` | `events.py` | `get_active_events` | `DBEvent` | Active event list |
| `POST /events/register` | `events.py` | `register_event` | `DBEventRegistration`, Make.com | Registration confirmation |
| `POST /curator/ask` | `curator.py` | `curator_chat` | Groq API (`llama-3.3-70b-versatile`) | Curatorial statement |
| `GET /exhibitions/config`| `exhibitions.py`| `get_exhibition_config`| `DBExhibition` (`exhibitions_list`) | Active exhibition details |
| `POST /recruit/consent` | `recruit.py` | `record_consent` | `DBSession`, `DBConsentRecord` | Session ID, config hash |
| `POST /recruit/identity`| `recruit.py` | `record_identity` | `DBApplicantIdentity` | OK |
| `GET /recruit/sjt/public`| `recruit.py` | `get_public_sjt` | `sjt_engine.py` (stripped keys) | 7 scenarios |
| `POST /recruit/sjt/submit`| `recruit.py`| `submit_sjt_response`| `DBSJTResponse`, `sjt_engine.py` | Question confirmation |
| `POST /recruit/telemetry`| `recruit.py` | `receive_telemetry` | `DBTelemetryEvent`, `DBDataQualityFlag`| Accepted sequence & count |
| `POST /recruit/complete`| `recruit.py` | `complete_session` | `DBSession`, `feature_extractor.py` | Final completion state |
| `GET /recruit/research/sessions` | `research_view.py` | `list_research_sessions` | `DBSession`, `DBApplicantIdentity` | Chronological session list |
| `GET /recruit/research/session/{id}` | `research_view.py` | `get_research_dossier` | `integrate_session_evidence` | Comprehensive dossier |

---

## 7. Database & Data Flow

### 7.1 Cross-System Contention Analysis
- **Shared Connection Pool:** Both systems connect to the single `alfaaz-db` PostgreSQL instance. Vercel serverless functions connect via raw Node `pg.Pool`, while FastAPI connects via SQLAlchemy `SessionLocal`. Because Render's free PostgreSQL tier limits total connections, high concurrent candidate telemetry traffic could starve public website queries if connection pools are unmanaged.
- **Write-Heavy Telemetry:** A single candidate assessment session generates between 800 and 2,500 rows in `telemetry_events`. Under multi-candidate playtests, `telemetry_events` will grow rapidly.

---

## 8. Recruit Actual Flow

```
[ ENTRY: /recruit.html ]
       │
       ▼
[ SCREEN 1: Consent ] ──────────► POST /recruit/consent
       │                          Creates DBSession (status: CONSENTED)
       ▼
[ SCREEN 2: Identity ] ─────────► POST /recruit/identity
       │                          Stores DBApplicantIdentity (name, email)
       ▼
[ SCREEN 3: Accessibility ] ────► POST /recruit/accessibility
       │                          Stores DBAccessibilityProfile
       ▼
[ SCREEN 4: Warmup ] ───────────► POST /recruit/warmup
       │                          Stores DBWarmupBaseline (tap latency)
       ▼
[ SCREEN 5: SJT ] ──────────────► GET /recruit/sjt/public (fetches 7 items)
       │                          POST /recruit/sjt/submit (7 times)
       ▼
[ WORLD ASSIGNMENT ] ───────────► Latin Square assigns 1 of 14 world orders
       │
       ▼
[ 7 WORLDS / 21 GAMES ] ────────► Stream telemetry batches every 2.5s
       │                          POST /recruit/telemetry (max 100 events/batch)
       ▼
[ SCREEN 6: Completion ] ───────► POST /recruit/complete
       │                          Marks DBSession (status: COMPLETED)
       │                          Triggers feature_extractor & evidence_integrator
       ▼
[ CANDIDATE FINISHED ] ─────────► Minimalist poetic sign-off. Zero scores shown.
```

---

## 9. Recruit Game-by-Game Findings

All 21 games have been verified against frozen observation counts, event schemas, and transition logic:

| World | Game Code | Interactive Task Title | Target Observations | Verified Event Type | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **W1: The Frequency** | F1 | Tuning the Hall | 6 rounds | `trial_submit` | PASS |
| | F2 | The Gathering Voices | 4 rounds | `trial_submit` | PASS |
| | F3 | The Echo of the Room | 3 transitions | `transition_completed` | PASS |
| **W2: The Archive** | A1 | The Manuscript Folios | 5 items | `document_filed` | PASS |
| | A2 | The Fragile Leaf | >=3 exceptions | `decision_logged` | PASS |
| | A3 | The Exhibition Ledger | 5 QC items | `inspection_completed` | PASS |
| **W3: The Shared Canvas** | C1 | The Artisan's Basket | 3 rounds | `allocation_round_confirmed` | PASS |
| | C2 | The Gallery Wall | 3 placements | `placement_confirmed` | PASS |
| | C3 | The Dual Lanterns | 3 repairs | `repair_stage_completed` | PASS |
| **W4: The Shifting Grid** | E1 | The Ceramic Mosaic | 9 trials | `tile_placed` | PASS |
| | E2 | The Broken Tile | 4 sequences | `recovery_submitted` | PASS |
| | E3 | The Rhythm of the Wheel | 3 conditions | `block_transition` | PASS |
| **W5: The Hidden Gallery** | Q1 | The Hidden Vault | 4 decisions | `decision_finalized` | PASS |
| | Q2 | The Antiquarian's Bench | 4 items | `exploration_completed` | PASS |
| | Q3 | The Weaver's Chronicle | 3 episodes | `integration_submitted` | PASS |
| **W6: The Broken Tool** | CR1 | The Woodcarver's Chisel | 2 stages | `stage_completed` | PASS |
| | CR2 | The Papier-mâché Mold | 3 trials | `trial_completed` | PASS |
| | CR3 | The Master's Pattern | 3 trials | `trial_completed` | PASS |
| **W7: The Repetition** | M1 | The Saffron Harvest | 3 stages | `stage_completed` | PASS |
| | M2 | The Calligrapher's Dedication | 3 trials | `trial_completed` | PASS |
| | M3 | The Final Gathering | 3 decisions | `decision_confirmed` | PASS |

---

## 10. Recruit Performance & Lag Findings

1. **[CRITICAL] PWA Service Worker `staleWhileRevalidate` Cache:**
   - **File:** `frontend/public/sw.js` (lines 95–109)
   - **Mechanism:** Serves cached scripts from `RUNTIME_CACHE` before updating in the background.
   - **Impact:** Candidates and admins receive stale code after deployments.
2. **[MAJOR] Synchronous Storage Serialization:**
   - **File:** `frontend/src/recruit.js` (lines 50–51, 168)
   - **Mechanism:** `sessionStorage.setItem()` is executed synchronously on every single logged telemetry event, stringifying arrays of up to 50–100 objects on the main UI thread.
   - **Impact:** Causes frame drops and touch delay on mobile.
3. **[MAJOR] Double-Compilation of Tailwind CSS:**
   - **File:** `frontend/recruit.html` (line 21)
   - **Mechanism:** Loads `https://cdn.tailwindcss.com` at runtime alongside Vite's compiled CSS bundle.
   - **Impact:** Browser client compiles CSS rules on the fly, consuming 150–350ms of main-thread execution on mobile devices.
4. **[MODERATE] Render Backend Cold Start:**
   - **Mechanism:** 30–50s spin-up time on free-tier Render instances causes initial `/recruit/consent` requests to hang.

---

## 11. Recruit UX Findings

- **Mobile Viewport Optimization:**
  - Layout tested on 320px–412px viewports. Text hierarchy and container padding (`p-4 sm:p-6`) prevent horizontal overflow.
  - Interactive touch targets (`#startActivityBtn`, action buttons) maintain a minimum height of 44px (`min-h-[44px]`), satisfying WCAG tap target requirements.
- **Progress Clarity:**
  - Top progress bar dynamically reflects `(currentWorldIndex * 3 + currentMiniGameIndex + 1) / 21`.
  - Header displays "World X of 7" and "Part Y of 3" clearly.
- **Selection Deterrence:**
  - Scoped deterrence (`.candidate-content-protected { user-select: none; }`) prevents accidental text highlighting during gameplay without disabling form inputs.

---

## 12. Recruit Admin / Recruiter Findings

### 12.1 Root Cause of Missing Evidence in Earlier Playtests
Earlier playtests produced applicant cards showing demographics but no evidence ("In Progress / Not Derived Yet").
- **Root Cause Confirmed:** Due to the Activity Guide ReferenceErrors in C3, E2, Q1, and Q3, the candidate's browser threw exceptions before reaching or finishing those minigames.
- Under R3 measurement specifications, games with 0 telemetry events are factually marked `NOT_DERIVED`.
- Because completed games were fewer than 21, the session remained `In Progress`.
- With commit `f5b4475`, full playthroughs now submit all 21 games, allowing the backend to compute all 21 task records and mark the dossier as `Evidence Collected`.

### 12.2 Admin Dossier Rendering Structure
The dossier viewer in `admin.js` renders six strictly segregated evidence sections:
1. Candidate Identity & Consent Verification (DPDP Notice, timestamp, 18+).
2. Seven Parameter Summary (Provisional ipsative SJT indicators).
3. Active Feature Extractors (2 of 21: A1 Attention to Detail, A2 Exception Handling).
4. Quarantined Feature Extractors (19 of 21 cataloged with Design Freeze v1.1 policy notice).
5. 21-Game Descriptive Task Records (Factual within-game task counts).
6. Data Quality Flags & Telemetry Integrity (Zero critical conflicts, duration, event counts).

---

## 13. Whole-Site Interaction Findings

1. **Global 401 Eviction Danger:**
   - In `frontend/global.js` (lines 65–73), any HTTP 401 response triggers `localStorage.clear()` and `window.location.href = 'login.html'`.
   - In `frontend/src/recruit.js` (line 122), `apiFetch` delegates to `window.globalApiFetch`.
   - If an unauthenticated volunteer candidate encounters a 401 error, they are kicked out of their assessment and sent to `login.html`.
2. **Modal DOM Collision:**
   - `admin.html` uses `#regModal` for both Event Registration Lists and Recruitment Dossiers. Toggling between them rapidly can cause DOM race conditions.

---

## 14. Error Handling Findings

1. **Telemetry Flush Fallback:**
   - In `recruit.js` (lines 209–220), HTTP 413 (Payload Too Large) automatically splits the telemetry batch in half and re-queues it.
2. **Swallowed Catch Blocks in UI Scripts:**
   - In `admin.js` (line 12), invalid JSON in `localStorage.alfaaz_user` silently clears and redirects without user notice.
   - In `frontend/src/blogs.js`, network failure renders a generic error state without retry buttons.

---

## 15. Security Findings

1. **[CRITICAL] Account Recovery Codes Committed to Repository:**
   - **File:** `recovery-codes.txt` (Repository root)
   - **Finding:** Six plaintext recovery codes are tracked in git.
   - **Recommendation:** Rotate immediately and purge from git tracking.
2. **[PASS] Answer Key Obfuscation:**
   - Scoring keys and weights are completely stripped from `GET /recruit/sjt/public`.
   - Client receives only `scenario_id`, `prompt`, and randomized `options` (UUIDs).
3. **[PASS] Candidate Score Invisibility:**
   - No score, rank, fit percentage, or construct name is ever sent to or displayed by the candidate client.

---

## 16. Deployment Findings

| Layer | Host | Source Branch | Build Command | Output / Root |
| :--- | :--- | :--- | :--- | :--- |
| **Frontend MPA** | Vercel | `main` | `npm run build` | `frontend/dist` |
| **Backend API** | Render | `main` | `pip install -r requirements.txt` | `backend` (`rootDir`) |
| **Database** | Render / Neon | Live Cloud | Managed Postgres | Schema `public` |

- **Root vs Backend Config Synchronization:**
  - Render executes with `rootDir: backend`. It cannot see the repository root `config/`.
  - `backend/config/` must remain byte-identical to `config/` at all times.

---

## 17. Duplicate Code Findings

1. **Recruiter Views:**
   - `frontend/admin.html` (Recruitment tab) and `frontend/research.html` (Standalone research page) duplicate the candidate list and dossier rendering logic.
2. **Configuration Folders:**
   - Root `config/` and `backend/config/` are intentional duplicates required by deployment isolation.

---

## 18. Unused File Findings

| File / Folder | Current Location | Evidence | Safe to Delete? |
| :--- | :--- | :--- | :--- |
| `v1.3/` | Repository Root | Abandoned React monorepo; 0 imports | **YES (Owner Review)** |
| `components.js` | `frontend/` | Never imported or referenced in HTML | **YES (Owner Review)** |
| `build-sequence.py`| Repository Root | Dead hardcoded user path | **YES (Owner Review)** |
| `clean_export.py` | Repository Root | One-off packaging script | **YES (Owner Review)** |
| `fix.py` | Repository Root | One-off regex script | **YES (Owner Review)** |
| `patch-backend.py` | Repository Root | One-off patch script | **YES (Owner Review)** |
| `patch-cycles.py` | Repository Root | Injected obsolete vendor copy | **YES (Owner Review)** |
| `replace-recruit.py`| Repository Root | Targeted deleted sequence.html | **YES (Owner Review)** |
| `update-backend.py`| Repository Root | One-off patch script | **YES (Owner Review)** |
| `upload_ready/` | Repository Root | Untracked export folder | **YES (Local Only)** |
| `content/`, `game/` | `frontend/src/` | Empty directories | **YES (Owner Review)** |

---

## 19. Protected Structural Files

The following files are essential to routing, build pipelines, test suites, or runtime integrity and **MUST NOT BE DELETED**:

1. `render.yaml` — Defines Render web service and database deployment.
2. `vercel.json` (Root & Frontend) — Configures Vercel MPA build and clean URLs.
3. `frontend/vite.config.js` — Defines multi-page rollup inputs for all 12 HTML pages.
4. `config/` and `backend/config/` — Configuration files required by test suites and Render backend.
5. `scripts/acceptance_check.py` — The 22-check psychometric and architectural validation suite.
6. `scripts/banned_word_linter.py` — Enforces candidate-facing copy constraints.
7. `backend/app/main.py` — FastAPI application entry point, middleware, and table migrations.
8. `backend/app/core/config.py` — Environment configuration resolver.
9. `backend/app/services/sjt_engine.py` — SJT scoring engine and SHA-256 integrity verifier.
10. `frontend/src/recruit.js` — Primary candidate assessment runtime coordinator.
11. `frontend/src/recruit_games/index.js` & all 7 world modules — The 21-minigame battery.

---

## 20. Documentation Findings

| Document | Current Location | Status | Assessment |
| :--- | :--- | :--- | :--- |
| `GEMINI.md` | Repository Root | **CURRENT / AUTHORITATIVE** | Core project rules and architectural guidelines |
| `ai_rules.md` | Repository Root | **CURRENT / AUTHORITATIVE** | Strict stack rules (Vite MPA, Vanilla JS, SQLModel) |
| `docs/ALFAAZ_RECRUIT_BRIEF_v2.md` | `docs/` | **CURRENT / AUTHORITATIVE** | Full specification of Recruit subsystem |
| `docs/ALFAAZ_RECRUIT_DESIGN_DECISIONS.md` | `docs/` | **CURRENT / AUTHORITATIVE** | Architectural ledger and invariant freeze |
| `docs/design/*.md` (21 files) | `docs/design/` | **CURRENT / AUTHORITATIVE** | Detailed behavioral task specs (A1–Q3) |
| `RECRUITMENT_INTEGRATION.md` | Root | HISTORICAL | Outlines older phase planning |
| `PWA_IMPLEMENTATION_SUMMARY.md`| Root | HISTORICAL | Documents original PWA service worker design |

---

## 21. Contradiction Matrix

| Subject | Source A | Source B | Authoritative Truth |
| :--- | :--- | :--- | :--- |
| **Frontend Framework** | `v1.3/apps/web` uses React/TSX | `ai_rules.md` explicitly forbids React | **Vanilla ES Modules in Vite MPA** |
| **Exhibition Table** | Old docs reference `exhibition_config`| `GEMINI.md` mandates `exhibitions_list` | **`exhibitions_list` with `is_active`** |
| **Service Worker Precache**| `sw.js` caches all public HTML pages | `recruit.html` is omitted from precache | **Omission is correct, but runtime cache still intercepts scripts** |
| **Config Location** | Backend loads `backend/config/` | Root scripts load `config/` | **Both must exist and remain byte-identical** |

---

## 22. Problem Register

| ID | Severity | Area | Problem | Root Cause | Affected Files | User Impact | Recommended Action | Owner Decision |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **P0-1** | P0 | Security | Plaintext 2FA recovery codes in git | Unintentional commit | `recovery-codes.txt` | Account takeover risk | Rotate credentials, remove file from git | REQUIRED |
| **P1-1** | P1 | Recruit / UX | Stale JS bundle served after deploys | `sw.js` `staleWhileRevalidate` | `frontend/public/sw.js` | Fixes not visible to user | Exclude recruit scripts from SW cache | RECOMMENDED |
| **P1-2** | P1 | Recruit / Auth | 401 kicks candidates to `login.html` | `globalApiFetch` redirect hook | `frontend/global.js`, `recruit.js` | Assessment abort | Decouple `recruit.js` from `globalApiFetch` | RECOMMENDED |
| **P2-1** | P2 | Performance | Mobile frame drops during gameplay | Sync `sessionStorage` in `logEvent` | `frontend/src/recruit.js` | UI stutter on mobile | Debounce storage writes to 1s intervals | RECOMMENDED |
| **P2-2** | P2 | Performance | Dual Tailwind CSS compilation | Play CDN loaded alongside Vite CSS | `frontend/recruit.html` | Slower rendering | Remove `cdn.tailwindcss.com` script tag | RECOMMENDED |
| **P2-3** | P2 | Admin | Dossier fails to load on cold start | Render free-tier spin-up timeout | `frontend/src/admin.js` | Admin sees error alert | Add loading spinner & retry timeout | RECOMMENDED |
| **P3-1** | P3 | Codebase | Dead legacy code cluttering repo | Abandoned prototype & patch scripts| `v1.3/`, root `*.py` scripts | Confusion for devs | Safely archive/delete dead files | REQUIRED |
| **P3-2** | P3 | Codebase | Unused component script | `components.js` never imported | `frontend/components.js` | Stale dead code | Delete or wire into HTML | REQUIRED |

---

## 23. Proposed Cleanup Register

*Note: In accordance with Rule 35, NO files have been deleted during this audit pass.*

| File / Folder | Type | Status | Why Unused | Risk | Recommendation | Owner Approval |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `v1.3/` | Folder | ABANDONED | Obsolete React monorepo | ZERO | **SAFE TO REMOVE** | Required |
| `frontend/components.js` | File | UNREFERENCED | 0 imports in repo | ZERO | **SAFE TO REMOVE** | Required |
| `build-sequence.py` | File | LEGACY SCRIPT | References non-existent file | ZERO | **SAFE TO REMOVE** | Required |
| `clean_export.py` | File | LEGACY SCRIPT | Obsolete packaging script | ZERO | **SAFE TO REMOVE** | Required |
| `fix.py` | File | LEGACY SCRIPT | Ad-hoc regex script | ZERO | **SAFE TO REMOVE** | Required |
| `patch-backend.py` | File | LEGACY SCRIPT | Targeted old volunteers router | ZERO | **SAFE TO REMOVE** | Required |
| `patch-cycles.py` | File | LEGACY SCRIPT | Injected obsolete vendor copy | ZERO | **SAFE TO REMOVE** | Required |
| `replace-recruit.py` | File | LEGACY SCRIPT | Targeted deleted sequence.html | ZERO | **SAFE TO REMOVE** | Required |
| `update-backend.py` | File | LEGACY SCRIPT | Targeted old volunteers router | ZERO | **SAFE TO REMOVE** | Required |
| `upload_ready/` | Folder | UNTRACKED EXPORT | Local export directory | ZERO | **SAFE TO REMOVE** | Required |
| `frontend/src/content` | Folder | EMPTY | Contains 0 files | ZERO | **SAFE TO REMOVE** | Required |
| `frontend/src/game` | Folder | EMPTY | Contains 0 files | ZERO | **SAFE TO REMOVE** | Required |

---

## 24. Rules for Future Coding Agents

1. **Vite MPA Stack Only:** Never add React, Vue, Angular, or Next.js. The frontend is vanilla ES modules in Vite.
2. **Never Touch Assessment Invariants:**
   - 7 locked parameters (empathy, conscientiousness, collaborative_spirit, emotional_agility, curiosity, creative_initiative, motivation).
   - 7 worlds, 21 games.
   - SJT SHA-256 lock: `c098b401d37cc30b515139d307fef632047c048584e19771c0e014ef027e391d`.
   - Frozen observation counts across all 21 games.
   - Zero candidate-visible scores, ranks, or fit metrics.
3. **Dual Config Directory Rule:** Whenever updating files in `config/`, immediately synchronize them with `backend/config/` using `python scripts/sync_recruit_config.py --write`.
4. **Always Build & Verify:**
   - Run `npm run build` inside `frontend/`.
   - Run `python scripts/acceptance_check.py` (must pass 22/22).
   - Run `python scripts/banned_word_linter.py`.
   - Run `python -m unittest discover -s tests -p "test_*.py"` (must pass 141/141).
5. **Protect Database Schemas:** Never drop or alter existing columns without backwards-compatibility migrations in `main.py`.

---

## 25. Recommended Remediation Sequence

- **Phase 1: Security & Session Isolation (Immediate)**
  - Rotate recovery codes and remove `recovery-codes.txt` from git tracking.
  - Decouple `recruit.js` from `global.js`'s 401 redirect to prevent assessment evictions.
- **Phase 2: Deployment & Caching Remediation**
  - Update `frontend/public/sw.js` to bypass caching for `/recruit.html` and `assets/recruit-*.js`.
  - Remove `<script src="https://cdn.tailwindcss.com">` from `recruit.html` and rely purely on bundled CSS.
- **Phase 3: Recruit Telemetry Performance Optimization**
  - Throttle synchronous `sessionStorage.setItem` calls in `recruit.js` using `requestIdleCallback` or 1000ms debouncing.
- **Phase 4: Admin Dossier Resilience**
  - Add robust retry logic and cold-start progress indicator to `admin.js` for `/recruit/research/session/{id}`.
- **Phase 5: Repository Cleanup (Post-Approval)**
  - Remove `v1.3/`, `frontend/components.js`, and the 7 root patch scripts.

---

## 26. Unknown & Unverified Items

1. **Max Pool Connections on PostgreSQL:** Production connection limits under heavy concurrency remain unmeasured.
2. **External Email Automations:** Whether the Make.com webhook URL configured in Render environment variables is currently active.

---

## 27. Verification Commands & Evidence Log

```powershell
# 1. Acceptance suite check
.venv\Scripts\python.exe scripts/acceptance_check.py
# Result: 22 PASS, 0 FAIL

# 2. Banned words audit
.venv\Scripts\python.exe scripts/banned_word_linter.py
# Result: PASS (0 banned words)

# 3. Full test suite execution
.venv\Scripts\python.exe -m unittest discover -s tests -p "test_*.py"
# Result: Ran 141 tests in 46.1s. OK.

# 4. Frontend build verification
cd frontend; npm run build
# Result: 12 entry points built cleanly into dist/

# 5. Git repository state
git status --short
# Result: Clean working tree
```

---

## 28. Final Repository State

Working tree remains clean and fully verified at HEAD commit `f5b4475`. Zero destructive modifications were executed during this audit.
