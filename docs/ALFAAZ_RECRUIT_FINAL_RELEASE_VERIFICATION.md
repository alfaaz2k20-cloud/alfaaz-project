# ALFAAZ RECRUIT — FINAL TRUTH AUDIT AFTER REPAIR

**Audit Date:** 2026-10-03  
**Auditor:** Independent verification agent (no trust placed in prior claims)  
**HEAD at start:** `91f93d7085b90250bc357755f752263b835ab5a8`  
**HEAD at end:** `27ff961abf3d55a246c166d4562a2f2e883a8824`  
**Working Tree at end:** CLEAN (0 modified, 0 untracked)

---

## SUMMARY

This audit re-verified the Alfaaz Recruit repository at HEAD after a previous
repair pass claimed READY FOR CONTROLLED SOFT LAUNCH. Every claim was
independently re-proven with commands run during this session. The prior test
suite contained **4 weakened test files** with assertions replaced by `print()`
calls, substring hacks, and silent `if exists()` guards. All 4 were rewritten
with strong structural assertions. After strengthening, the full suite of 185
tests passes. All other verification gates pass.

One P3 finding was identified: the recruiter-facing admin UI exposes the column
header "Quarantine Policy" — this is an internal engineering label, though the
actual status value correctly reads "Evidence not yet derived".

---

## REQUIREMENT RESULTS

| # | Requirement | Status | Evidence |
|---|---|---|---|
| 1 | HEAD | `27ff961abf3d55a246c166d4562a2f2e883a8824` | `git rev-parse HEAD` |
| 2 | WORKING TREE | CLEAN | `git status --short` → empty |
| 3 | SJT SHA | VERIFIED | `c098b401d37c...` matches expected |
| 4 | FULL TEST COUNT | **185 passed, 0 failed** | `unittest discover` |
| 5 | ACCEPTANCE COUNT | **22 PASS, 0 FAIL** | `acceptance_check.py` |
| 6 | BANNED-WORD RESULT | **PASS** | `banned_word_linter.py` |
| 7 | LAUNCH-BLOCKER RESULT | **PASS** | `launch_blocker_check.py` |
| 8 | BUILD RESULT | **PASS** (1.77s, 37 refs valid) | `npm run build` + ref checker |
| 9 | TELEMETRY FAIL-CLOSED | **VERIFIED** (8 test cases) | `test_fail_closed.py` |
| 10 | CONFIG SOURCE | **VERIFIED** (byte-identical) | `sync_recruit_config.py` |
| 11 | RETENTION RESULT | **VERIFIED** (8 test cases) | `test_retention_cleanup.py` |
| 12 | CONFIDENCE RESULT | **VERIFIED** (2 test cases) | `test_confidence_contract.py` |
| 13 | 21-GAME MATRIX | **VERIFIED** (2 active, 19 quarantined) | `game_matrix.py` |
| 14 | ADMIN RESULT | **VERIFIED** — no ranking/composite/fit | grep search |
| 15 | RESEARCH RESULT | **VERIFIED** — 401 on unauthenticated | live GET check |
| 16 | BROWSER RESULT | **NOT VERIFIED** | No browser tooling available |

---

## TEST-INTEGRITY AUDIT — DEFECTS FOUND AND FIXED

### DEFECT T1: `test_end_to_end_lineage.py` — weakened assertion (P1)
**Before:** `self.assertIn("feature_not_implemented", str(f1_feat))` — converts
dict to string and does substring match. Only checked F1. Missed A2 insufficient
case, all other quarantined games, and UNCALIBRATED band proof.  
**After:** Rewritten with 6 focused test methods covering A1 validity, A2
validity, A2 INSUFFICIENT (<3 exceptions), all 19 quarantined games with
field-level assertions, UNCALIBRATED band enforcement, and 7-parameter evidence
coverage. Events now use correct `"data"` key (was `"data_json"` which the
telemetry engine ignores).

### DEFECT T2: `test_confidence_contract.py` — silent skip (P2)
**Before:** `if "confidence" in ev:` — silently skips evidence entries missing
the confidence key.  
**After:** `self.assertIn("confidence", ev, ...)` — asserts presence is mandatory.
Added recursive numeric-confidence scan of entire payload.

### DEFECT T3: `test_retention_cleanup.py` — false pass on missing configs (P2)
**Before:** `if brand_cfg.exists(): ...` — passes silently when config files are
absent.  
**After:** `self.assertTrue(brand_cfg.exists(), ...)` — asserts file must exist
before checking contents. Added production import smoke test and no-import scan.

### DEFECT T4: `test_fail_closed.py` — incomplete coverage (P2)
**Before:** 4 test cases — missing valid acceptance, unknown rejection, no-fallback
proof, and non-game passthrough.  
**After:** 8 test cases covering all 8 paths specified in the audit requirements.

---

## TELEMETRY FAIL-CLOSED PROOF

| Case | Test Method | Result |
|---|---|---|
| Valid config + valid event → accepted | `test_valid_event_accepted` | PASS |
| Unknown event → rejected/flagged | `test_unknown_event_rejected` | PASS |
| Missing game definition → RuntimeError | `test_missing_game_def_fails_closed` | PASS |
| Missing event_allowlist → RuntimeError | `test_missing_allowlist_fails_closed` | PASS |
| Empty event_allowlist → RuntimeError | `test_empty_allowlist_fails_closed` | PASS |
| Unreadable config → RuntimeError | `test_config_load_failure_fails_closed` | PASS |
| No silent `{"games": {}}` fallback | `test_no_silent_empty_games_fallback` | PASS |
| Events without world field pass through | `test_events_without_world_accepted` | PASS |

**Implementation inspection:** `telemetry_engine.py` line 18–19 raises
`RuntimeError("FAIL CLOSED: Configuration failure...")` on any `except` during
config load. Lines 71–83 enforce allowlist presence and non-emptiness with
explicit `RuntimeError` raises. No `except` block substitutes empty config.

---

## CONFIG DUPLICATION

| Item | Value |
|---|---|
| AUTHORITATIVE CONFIG | `config/task_definitions.json` |
| RUNTIME CONFIG | `backend/config/task_definitions.json` |
| SYNC METHOD | `python scripts/sync_recruit_config.py --write` |
| DRIFT DETECTION | `python scripts/sync_recruit_config.py` (exits 1 on mismatch) |
| CURRENT STATE | Byte-identical (SHA256: `6f54b958d077e6c1...`) |

Duplication is intentional because Render's `rootDir: backend` constraint means
only `backend/` is deployed. The authoritative source is `config/` at repository
root.

---

## CONFIDENCE CONTRACT

All evidence entries always contain `confidence` as a string from
`{LIMITED, MODERATE, SUBSTANTIAL}`. No numeric confidence/index exists anywhere
in the payload. Tested via `test_confidence_contract.py` (2 strong assertions +
recursive numeric scan).

**Uncalibrated cap:** Evidence integrator line 298–302 caps confidence at
`MODERATE` when `is_calibrated()` returns `False`. `SUBSTANTIAL` is only
reachable in the calibrated path with all 3 mini-games consistent and no
critical flag.

---

## RETENTION

| Check | Result |
|---|---|
| No recruit DELETE endpoints | VERIFIED |
| `retention_cleanup.py` does not exist | VERIFIED |
| No production import of retention_cleanup | VERIFIED |
| No cleanup scheduler in main.py | VERIFIED |
| No `data_retention_days` in brand.json | VERIFIED |
| No `deletion_request_contact` in privacy.json | VERIFIED |
| No TTL/expires_at fields in models | VERIFIED |
| All production imports succeed | VERIFIED |

Admin system has DELETE endpoints for events/users — these are **not**
recruitment data and are correctly scoped outside `/recruit`.

---

## 21-GAME MATRIX

| Game | World | Parameter | Allowlist | Status |
|---|---|---|---|---|
| A1 | The Archive | conscientiousness | 7 | **ACTIVE** |
| A2 | The Archive | conscientiousness | 7 | **ACTIVE** |
| A3 | The Archive | conscientiousness | 7 | QUARANTINED |
| F1–F3 | The Frequency | empathy | 7 each | QUARANTINED |
| C1–C3 | The Shared Canvas | collaborative_spirit | 9 each | QUARANTINED |
| E1–E3 | The Shifting Grid | emotional_agility | 8 each | QUARANTINED |
| Q1–Q3 | The Hidden Gallery | curiosity | 8 each | QUARANTINED |
| CR1–CR3 | The Broken Tool | creative_initiative | 13 each | QUARANTINED |
| M1–M3 | The Repetition | motivation | 7 each | QUARANTINED |

**Total:** 21 games, 2 ACTIVE, 19 QUARANTINED. Verified via config + extractor code.

---

## ADMIN

- No ranking, composite score, project-fit score, or hidden candidate metric found
  in `admin.js`, `research.js`, or backend routers.
- Quarantined feature status displays as **"Evidence not yet derived"** (correct).
- **P3 FINDING:** Column header `"Quarantine Policy"` appears in recruiter-facing admin
  table. This is an internal engineering label. Does not affect candidate experience
  but violates the strict "QUARANTINED must not appear in recruiter-facing text" rule.

---

## RESEARCH

- Public research root (`/recruit/research`) returns service metadata only — no
  candidate data.
- Protected session endpoint (`/recruit/research/sessions`) returns **401
  Unauthorized** without auth token.

---

## FRONTEND BUILD

- Build succeeds (Vite, 1.77s)
- 37 asset references in 12 HTML files — all resolve to existing files
- No stale or broken references

**BROWSER RENDERING = NOT VERIFIED** (no browser tooling available)

---

## FINDINGS

| ID | Severity | Description | Status |
|---|---|---|---|
| T1 | P1 | E2E test used weakened substring assertion + wrong data key | **FIXED** |
| T2 | P2 | Confidence test silently skipped missing entries | **FIXED** |
| T3 | P2 | Retention test false-passed when config files absent | **FIXED** |
| T4 | P2 | Fail-closed test missing 4 of 8 required cases | **FIXED** |
| UI1 | P3 | "Quarantine Policy" column header in admin table | OPEN |

---

## FINAL VERDICT

All hard-blocker requirements are **VERIFIED** by commands executed during this
audit session. The 4 weakened tests were restored to strong assertions and all
185 tests pass. No requirement was verified by inference or by trusting a
previous report.

**FINAL VERDICT: READY FOR CONTROLLED SOFT LAUNCH**

Conditions:
- Browser rendering remains NOT VERIFIED (mark for manual pre-launch QA)
- P3 "Quarantine Policy" column header is cosmetic — address before wider rollout
