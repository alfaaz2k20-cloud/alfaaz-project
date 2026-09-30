# ALFAAZ RECRUIT — GATE 1 IMPLEMENTATION PLAN & ARCHITECTURE

**Status:** Plan & Design Approved for Execution  
**Context:** Builds directly on Gate 0 Audit findings and strict adherence to Brief v2.

---

## 1. File List & Rationale for Architectural Changes

### 1.1 Backend Modules (`backend/app/`)
1. **`models/recruit.py` (New):** Defines SQLModel tables for recruitment:
   - `DBApplicantIdentity` (`identity_link`, stored separate with restricted access)
   - `DBSession` (`sessions`: session_id, created, status, order_id, versions, config_hash, device_class)
   - `DBConsentRecord` (`consent_records`: session_id, consent_text_version, timestamp, choices)
   - `DBAccessibilityProfile` (`accessibility`: session_id, modes enabled)
   - `DBWarmupBaseline` (`warmup`: session_id, tap/movement/reading baseline)
   - `DBTaskAssignment` (`assignments`: session_id, world_order_id, per-mini-game seeds)
   - `DBSJTResponse` (`sjt_responses`: session_id, scenario_id, option_id, timing)
   - `DBTelemetryEvent` (`events`: append-only, idempotent on `(session_id, seq)`)
   - `DBFeature` (`features`: session_id, mini_game, feature_name, value_raw, value_adjusted, flags)
   - `DBEvidence` (`evidence`: SJT bands, mini-game status/band, consistency, relationship, confidence)
   - `DBDataQualityFlag` (`data_quality_flags`: session_id, scope, flag, detail)
   - `DBOutcome` (`outcomes`: optional, nullable)
   - `DBRecruiterAccessLog` (`recruiter_access_log`: who viewed which session, when)
2. **`services/sjt_engine.py` (New):** Server-side exact integer arithmetic scoring for SJT (1/3 and 2/3 cutoffs, golden distribution generator, stripped public payload builder).
3. **`services/telemetry_engine.py` (New):** Ingestion handler, idempotency checks on `(session_id, seq)`, segment boundary validator, pause/reload duration calculator.
4. **`services/feature_extractor.py` (New):** Deterministic extraction of behavioral features from stored raw events for all 21 mini-games.
5. **`services/evidence_integrator.py` (New):** Integration pipeline: within-parameter consistency, SJT/game relationship, confidence calculation, template sentence generation.
6. **`routers/recruit.py` (New):** Candidate-facing endpoints: session creation, config hash verification, stripped public SJT fetch, SJT submission, batch telemetry ingest, mini-game completion.
7. **`routers/research_view.py` (New):** Recruiter research view endpoints (strictly authenticated via `require_admin`, access logging, no sort/rank/filter controls).
8. **`main.py` (Edit):** Mount `recruit.router` and `research_view.router`.

### 1.2 Frontend Modules (`frontend/`)
1. **`recruit.html` & `src/recruit.js` (New):** The seamless candidate experience:
   - Consent screen (with `__MISSING__` handling)
   - Accessibility preference selector
   - Baseline motor/reading warm-up
   - 7-scenario SJT with stripped payload
   - 7 seamless worlds containing 21 mini-games
   - "Assessment Complete" concluding screen (no scores shown)
2. **`research.html` & `src/research.js` (New):** Recruiter research view dashboard (prominent unvalidated research banner, random responder reference distribution display, template-based statements, access-controlled).
3. **`src/recruit_games/` (New):** Modular vanilla ES module implementations for the 21 mini-games across the 7 worlds, adhering to the design sheets.
4. **`vite.config.js` (Edit):** Register `recruit.html` and `research.html` as MPA entry points.

### 1.3 Tooling & Scripts (`scripts/`)
1. **`scripts/enumerate_sjt.py`:** Regenerates and verifies all 16,384 SJT response patterns against golden min/max/span/band distributions; writes `docs/sjt_enumeration.json`.
2. **`scripts/recompute_evidence.py`:** Provides `recompute --session <id>` and `recompute --all` CLI utilities proving deterministic reproducibility.
3. **`scripts/banned_word_linter.py`:** CI/build linter scanning all templates and UI strings for prohibited evaluative words.

---

## 2. Storage and Authentication Architecture

### 2.1 Storage Options & Selection
- **Evaluated Option A (Isolated PostgreSQL/SQLite via existing SQLModel engine):** [SELECTED]
  - Seamlessly integrates with existing database architecture (`backend/app/db/session.py`).
  - Supports SQLite for local tests and PostgreSQL on Render production.
  - Fully supports transactional integrity, append-only logs, and strict foreign key relationships between session tables.
- **Evaluated Option B (Separate NoSQL document store):**
  - Rejected: Introduces unnecessary architectural sprawl and external cloud service dependencies.

### 2.2 Authentication & Authorization Strategy
- **Candidate Endpoints:** Authenticated via ephemeral cryptographically secure `session_id` UUID tokens issued upon consent acceptance.
- **Recruiter Research Views:** Strictly secured using existing `require_admin` JWT bearer token dependency ([`backend/app/core/security.py:36-40`](file:///c:/Users/saqrt/OneDrive/Desktop/alliswell/alfaaz-project/backend/app/core/security.py#L36-L40)). Every access is written to `recruiter_access_log`.

---

## 3. Decisions Log Confirmations (D1–D12 & §6.5)

| ID | Topic | Resolution / Confirmed Default |
|---|---|---|
| **D1** | SJT Band Cutoffs | Exact integer arithmetic with boundaries at exactly 1/3 and 2/3 of parameter span. |
| **D2** | Vocabularies | Strict separation of vocabularies per Brief v2 §5 (`HIGH/MODERATE/LOW` for SJT; `USABLE/INSUFFICIENT/INVALID` for game status; `ALIGNED/PARTLY_ALIGNED/DIFFERENT` for relationships). |
| **D3** | Game Levels | Shipped with `null` thresholds (`UNCALIBRATED`). Raw metrics and descriptive statements only. |
| **D4** | Task Order | Order of mini-games inside each world is fixed (1→2→3). World order is counterbalanced via balanced Latin square. |
| **D5** | Social Partners | Simulated characters are transparently disclosed as computer-controlled in candidate intro. |
| **D6** | Scripted Setbacks | Task condition changes are scripted; no false error claims or deceptive feedback. |
| **D7** | Time Budgets | Every mini-game has explicit `ceiling_ms` and `min_observations`. Reaching ceiling logs right-censored observation. |
| **D8** | Consistency Rule | Single range rule: `max - min <= consistency_max_band_range (1)` → `CONSISTENT`, else `VARIED`. |
| **D9** | Source Priority | Brief v2 controls implementation; locked files control keys and parameter definitions. |
| **D10** | Skipping & Incompletion | Mini-games/worlds can be skipped without penalty. Incomplete data is `INSUFFICIENT`, never `LOW`. |
| **D11** | Test Ordering | Fixed SJT-first sequence, noted as a known research limitation (potential priming effect). |
| **D12** | Relationship Names | `ALIGNED`, `PARTLY_ALIGNED`, `DIFFERENT`. |
| **§6.5** | Construct Observations | Noted in construct map that SJT Conscientiousness measures structured rule-keeping and Motivation captures task absorption. |

---

## 4. Self-Critique of Gate 1
- All 21 mini-game design sheets (`docs/design/<id>.md`) have been generated with complete 13-point specifications.
- `docs/construct_map.md` explicitly documents psychometric boundaries, honesty notes, and known limitations.
- Configuration skeletons (`features.json`, `feature_bands.json`, `integration.json`, `brand.json`, `copy/*.json`) are created with zero invented copy and explicit `__MISSING__` markers.
- Storage and Auth leverage the existing FastAPI SQLModel architecture cleanly.
