# Alfaaz Recruit V1.3 — Traceability Matrix & Build Plan

## Traceability Matrix

| ID | Requirement | Target Module | Test Strategy |
|:---|:---|:---|:---|
| **REQ-01** | Strict typing & Config | `packages/core/types` | Zod schema parsing unit tests, `tsc --noEmit`. SJT V1-V7 validation checks. |
| **REQ-02** | SJT Scoring Methods | `packages/core/scoring` | Golden fixtures for `ratio_bands` & `reference_percentile`. |
| **REQ-03** | Game Evidence & Convergence | `packages/core/convergence` | Unit tests for 12 matrix cells. `WITHIN_GAME_DIVERGENCE` rules tested. |
| **REQ-04** | PII & Privacy Isolation | `apps/api/db`, `apps/api/auth` | DB schema tests (PII separate). Deletion/Withdraw endpoint testing. |
| **REQ-05** | Web Shell & Flow | `apps/web/shell` | Playwright E2E for S00-S15 flow, pause/resume, zero external network requests. |
| **REQ-06** | Primary Games (G1-G7) | `apps/web/games/*` | Per-game bot profiles verifying expected score vectors. |
| **REQ-07** | Secondary Measures (E2, C2, M2) | `apps/web/games/*` | Bot profiles (Straight-liner, Mark-all-match, Always-hard). C2 mismatch generator tests. |
| **REQ-08** | SME Approval Kit | `packages/content` | Scripts verifying `DRAFT_NEEDS_SME_KEYING` block. Agreement threshold testing. |
| **REQ-09** | Confound Controls | `packages/core`, `apps/web` | Keyboard-only Playwright runs. Input-mode invariance tests. Readability CI lint. |
| **REQ-10** | Analysis & Validity Kit | `analysis/` | Synthetic data parsing, distribution monitors, reliability/correlation reports. |

## Build Phases (Monorepo)
- **P2 (Scaffolding)**: `packages/core` init, config schemas, seeded RNG, event schema, V1-V7 content validators for `sjt_items.json`.
- **P3 (Core Logic)**: Scoring engine, convergence, templates.
- **P4 (Backend)**: Fastify API, PostgreSQL docker-compose, encryption, auth, retention jobs.
- **P5 (Web Shell)**: React 18, Vite, routing S00-S15, consent gate, accessibility baselines.
- **P6 (Primary Games)**: G1-G4 implementations + specific bot profiles.
- **P7 (Secondary & Remaining Games)**: G5-G7 + E2, C2, M2 + specific bot profiles.
- **P8 (Integration)**: Randomization engine, data quality gates, SME kit, report UI.
- **P9 (Verification)**: Full E2E, accessibility checks, security run, bot profile validations.
- **P10 (Cutover Runbook)**: Write `docs/CUTOVER.md` (no execution until explicitly authorized).

## Ancillary Deliverables
- `docs/ASSUMPTIONS.md`
- `docs/PRIVACY_NOTES.md`
- `docs/VALIDITY_EVIDENCE_PLAN.md`
- `docs/ETHICS_CHECKLIST.md`
- `docs/VERIFICATION.md`
- `docs/CUTOVER.md`
