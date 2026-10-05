# ALFAAZ RECRUIT: GO BRIEF (build now, diagnose after)

Save as `docs/ALFAAZ_RECRUIT_GO_BRIEF.md`.

**This brief changes the working mode. It does not change the rules of the V2 brief or the remediation brief.**
Those two files stay the source for detail. Where this file conflicts with the gate rules in them, **this file wins**. It does not override any non-negotiable (no invented vocabulary, no invented consent or legal wording, no runtime LLM, no ranking, missing evidence is never LOW, locked parameters).

---

## 0. KICKOFF PROMPT (paste into the CLI)

```
Read docs/ALFAAZ_RECRUIT_BRIEF.md, docs/ALFAAZ_RECRUIT_REMEDIATION_BRIEF.md and
docs/ALFAAZ_RECRUIT_GO_BRIEF.md. Execute the work in the GO brief in order, without
waiting for approval between steps. Commit after each step on the current branch.
Stop ONLY on a STOP CONDITION listed in Section 2. Produce one consolidated report
at the end (Section 9). Every claim needs path:line; every verification needs the
command and its unedited output; anything unverified is written NOT VERIFIED.
```

---

## 1. WHAT CHANGES

- Gates R1.1 to R5 run as **one continuous pass** with one commit per step. R6 (mapping report) and R7 (documentation) are completed at the end. No approval is needed between steps.
- The owner will **diagnose after the build** using the consolidated report, the acceptance script (Section 7) and a manual checklist (Section 8).
- The previous R0 is **replaced** by the checks inside each step. A separate read-only R0 pass is not required. The reload simulation, route and filter inventory, CORS, beacon, client-exposure and mini-game mapping are done where they are needed below.
- **Do not redesign the 21 mini-games in this pass.** Map them (Step 8) and report. Redesign is a separate decision.
- **Do not merge to `main` and do not deploy.** Production stays blocked anyway while consent/privacy copy is `__MISSING__` or `interim`.

---

## 2. STOP CONDITIONS (the only reasons to stop and ask)

1. **SJT scoring keys differ** from the reference (Step 0). Text-only or formatting-only differences do **not** stop work.
2. **Any change** to locked files `config/sjt_items.json` or `config/parameters.json` would be needed.
3. **Production data may exist** and a schema change is needed. Stop before migrating, ask for backup confirmation.
4. A **new dependency, service, or paid infrastructure** (for example Redis) would be needed.
5. A change to **consent/privacy wording** would be needed. Wording is never edited or written by the CLI.
6. Tests that **cannot be made to pass** without weakening them.
7. Anything that would **destroy raw data**.
8. A requirement in these briefs that is **ambiguous or contradictory**. Choose nothing silently. Ask one precise question. Continue with other steps that do not depend on it.

When a stop condition affects one step only, stop that step, note it, and continue with independent steps.

---

## 3. STEP 0: SJT LOCK (scoring-relevant content is strict, text is a warning)

The repository SJT file is not byte-identical to the owner's reference (LF hash `91a5b993…` vs reference `c098b401…`). That may be formatting or text only. What matters for scoring is the keys. So:

1. The owner will place the reference files in `config/reference/` (`sjt_items.json`, `parameters.json`). Diff them against `config/`. Report: identical / formatting only / text differs / **keys differ**.
2. Define the **keys fingerprint** exactly:
   ```
   obj = {
     "sjt_version": <value>,
     "scenario_ids": [<scenario ids in file order>],
     "options": { <option id>: <its keys object>, ... }
   }
   canonical = json.dumps(obj, sort_keys=True, ensure_ascii=False, separators=(',', ':')).encode('utf-8')
   fingerprint = sha256(canonical).hexdigest()
   ```
   Reference value: `0a1f21197968a9179eec6123b6b19beb8822902c5fdbb820aeb587a3a195e1b6`
3. `config/locked_hashes.json` (owner-supplied values only):
   ```
   sjt_keys_fingerprint:       0a1f21197968a9179eec6123b6b19beb8822902c5fdbb820aeb587a3a195e1b6
   parameters_canonical_sha256: f9026b9c50ad4a7c65b3108b2b3321b8c4daece85a1402274d9f342374cf0397
   parameters_lf_sha256:        1262f85b33c6bd64b3331d214363813e218e9fb52efa856cd6342bd6818c70e6
   sjt_reference_lf_sha256:     c098b401d37cc30b515139d307fef632047c048584e19771c0e014ef027e391d   (informational)
   ```
4. `sjt_engine.py` must **read** these values and:
   - **fail startup** if the keys fingerprint or the parameters canonical hash differs from `locked_hashes.json`;
   - **warn** (log + a data-quality note on the session record) if only the SJT text or formatting differs from the reference.
   Remove the hardcoded hashes at `sjt_engine.py:21`.
5. Add the **golden test** from the V2 brief Section 6.3 (min/max/span table, 28 option ids `S1A`..`S7D`, all seven keys on every option) and a test that a tampered copy of the keys fails startup.
6. If the fingerprint matches, continue. If it differs, that is stop condition 1: print the option-by-option key differences and stop SJT-related steps (Steps 3 and 9 depend on it). Steps that do not touch the SJT continue.

---

## 4. STEP 1: R1.1 CLEANUP (authorized)

- Move the hardcoded consent notice and the two checkbox labels from `frontend/src/recruit.js` into `config/copy`, **verbatim**, each marked `interim: true`. Do not change a word. Production build fails while any value is `__MISSING__` or `interim: true`. Report `git blame` for those strings.
- Add a DOM-level consent UI test only if a test runner already exists. Otherwise mark NOT VERIFIED and the owner checks manually (Section 8).
- Report whether the gate 2 to 6 tests create sessions through the HTTP API or by direct database insertion. Add API-level tests for the new consent/identity flow where missing.
- Keep the limiter as is until Step 2 changes it.

---

## 5. STEP 2: R2 TELEMETRY INTEGRITY (parameters are now final)

Implement remediation brief R2.1 to R2.6 with these final values. All are `provisional` engineering limits in environment variables. Report the defaults actually set.

| Item | Value |
|---|---|
| Session creation + consent, shared per-IP bucket | 10 per minute, 60 per hour |
| Session creation, service-wide | 500 per hour |
| Consent submissions per session (if a separate endpoint remains) | 3; identical resend idempotent |
| Identity | 5 per session, 30 per hour per IP; rejected without affirmative consent |
| SJT submit | 3 per session; identical resend idempotent; differing resend rejected, original preserved, non-critical flag `sjt_submit_conflict` |
| Telemetry per session | token bucket: refill 5/s, capacity 20 |
| Telemetry per IP | 3,000 per minute |
| Client flush | every 2 to 3 seconds or at 50 events, whichever comes first; also on `visibilitychange` (hidden), `pagehide`, and at mini-game end |
| Batch size | 100 events max |
| Telemetry body | 256 KB; other recruitment bodies 16 KB; enforce while reading the body, not only via `Content-Length` |
| One event `data` + `state` | 4 KB; client checks size at creation |
| Events per session | informational flag `events_high_volume` at 25,000; hard cap 50,000 |
| Ingest eligibility | session `ACTIVE` and within 24 h of creation; no grace window; list all session statuses and confirm `ACTIVE` covers the whole game period |

**Behavior**
- 429 with `Retry-After` for rate limits; 413 for oversize. A 413 batch: client splits it in half and retries. A single event that alone gets 413 is dropped from the queue **and** logged as a non-critical flag `event_oversize_dropped` (never silent).
- A batch that would cross 50,000 is rejected **whole** with a **non-retryable** status (not 429, not 5xx). The client treats it as terminal: stops sending, keeps unsent events locally for the rest of the session, no retry loop. The server records `events_cap_reached` once. Raw events already accepted stay.
- The client awaits the acknowledgement of its final flush before calling `/recruit/complete`.
- **Reload:** persist `session_id`, next `seq` and `segment_id` in `sessionStorage`; on load, ask the server for the last stored `seq` and `segment_id`, continue from `last_seq + 1`, new `segment_id`, emit `segment_start`. Reload inside a mini-game → `interrupted` → `INSUFFICIENT`. Reproduce the old failure first with a test on a **temporary** database (seq restarting at 1 with the same `session_id`), show how many events were stored, then show the fix stores all of them.
- **Idempotency:** identical duplicate ignored; conflicting duplicate not overwritten, flagged `seq_conflict`.
- **Gaps:** detect per session and per mini-game window at ingest and at recompute, flag `seq_gap` with the ranges.
- **Hidden tab:** time hidden is excluded from durations; the existing 60 s / 5 switches values move to `config/features.json` as provisional (same numbers); exceeding them sets `tab_hidden_extended` (informational) and does not change status by itself. `INVALID` only for corrupt or impossible data.
- **Beacon:** absolute API base URL; a body type that avoids a failing CORS preflight; tested cross-origin against the CORS config.
- **Trusted proxy:** configure for the hosting platform's own proxy entry only (never the left-most client-supplied value). Unit tests simulate trusted and untrusted headers. Check whether API traffic passes through a Vercel rewrite, which would hide real IPs. Production behavior is `NOT VERIFIED` until the owner checks it once manually (Section 8).
- **CORS:** replace `*` with an `ALLOWED_ORIGINS` environment variable (production origin, preview pattern if needed, localhost for dev). The `GEMINI.md` rule that mandates `*` is to be **reported, not edited**.
- **Volume check:** run the heaviest synthetic profile and report total events, peak requests per 10 s, and largest request body; target: under half the event cap. Add an analytical worst case if ceilings are defined, otherwise NOT VERIFIED.

**Mini-game window:** from `minigame_start` to `minigame_end` in the same segment. A gap counts as inside the window if its sequence range overlaps `[start_seq, end_seq]`. If `minigame_end` is missing, the window runs to the next `minigame_start` and that mini-game is `INVALID`.

---

## 6. STEPS 3 TO 5

### Step 3: Evidence logic (remediation brief R3, with these decisions)
- Implement R3.1 to R3.5 exactly, including the pseudocode, **except** these decisions are now final:
  - Missing SJT → confidence `LIMITED` (structural). The flag `sjt_missing` is informational only.
  - **Derived records are insert-only with version fields.** A recompute with changed rules adds new rows and marks previous rows `superseded`. Never `UPDATE` derived rows in place. The recruiter view shows the current version. Needs new columns → stop condition 3 if production data exist.
  - Mini-game effects of flags and the critical list are exactly: `interrupted` → `INSUFFICIENT`; `invalid_timing` → `INVALID`; `seq_gap` or `seq_conflict` inside a window → `INVALID`. **Critical for confidence (LIMITED for all parameters):** `seq_conflict` anywhere in the session, `events_cap_reached`. Informational: `seq_gap` outside any window, `tab_hidden_extended`, `rate_limited_retry`, `events_high_volume`, `accessibility_latency_excluded`, `segment_resumed`, `sjt_missing`, `sjt_submit_conflict`, `event_oversize_dropped`.
  - Any other existing flag: non-critical. List each one in the report.
- `OBSERVED`, `GAME_ONLY` and numeric confidence are removed everywhere. No new vocabulary.
- While uncalibrated: consistency `NOT_COMPUTED`, relationship `NOT_COMPUTED`, confidence at most `MODERATE`, bands `UNCALIBRATED`.

### Step 4: World-order counterbalancing (remediation brief R4, unchanged)
14-row balanced design, server-side, least-used row, test of the position and adjacency balance properties, seeds from HMAC of `session_id` and mini-game id.

### Step 5: Recruiter view and anti-copy cleanup (remediation brief R5, unchanged)
No sort, filter or search on evidence fields; neutral band notes; V2 vocabulary; full banned-term list in the linter, scanning all candidate- and recruiter-facing strings and the integration document; anti-copy JavaScript removed (print CSS and `user-select: none` on game surfaces only); copy/paste verified in inputs.

---

## 7. ACCEPTANCE SCRIPT (so the owner can diagnose without trusting prose)

Create `scripts/acceptance_check.py`. It runs against a temporary database, makes **no changes outside it**, and prints one table: `CHECK | PASS / FAIL / NOT VERIFIED | evidence (test name or file:line)`. It must cover at least:

1. Seven SJT scenarios, 28 option ids, golden min/max/span, golden random-responder distributions
2. Keys fingerprint equals the owner lock; tampered copy fails startup
3. Seven locked parameter keys; names and definitions equal `parameters.json`
4. Seven worlds and 21 mini-games exist; three per world; fixed order inside each world
5. SJT is first
6. World order assignment balanced across 14 simulated sessions per row
7. Nothing stored before consent; identity rejected without consent; consent and session atomic
8. Identical duplicate event ignored; conflicting duplicate flagged and not overwritten
9. Reload keeps the sequence; reload inside a mini-game gives `INSUFFICIENT`
10. Hidden-tab time excluded from durations
11. Every branch of the evidence logic (relationship, consistency, confidence) incl. uncalibrated behavior
12. Skipped/missing data never produces `LOW`
13. Recompute from raw events is deterministic (byte-identical output) and insert-only
14. Scoring keys and feature configs absent from public API responses and from the built frontend bundle
15. Recruiter endpoints return 401/403 without a token; access is logged; no evidence-field sort/filter parameters accepted
16. Banned-term linter passes on all strings
17. No `clipboard.write*` or key-interception code in the frontend source
18. Rate limits, body limits and the event cap behave as specified (including whole-batch rejection at the cap)
19. Production build fails with `__MISSING__` or `interim` copy
20. No runtime LLM imports or calls in scoring/evidence/report code

Anything the script cannot check is printed as `NOT VERIFIED`, never `PASS`.

---

## 8. OWNER MANUAL CHECKLIST (the CLI prints this at the end; the owner performs it)

1. Consent screen on a dev server: both boxes unchecked; Tab reaches the submit button; it reads as disabled until both are ticked; ticking both enables it; the flow reaches the identity form; declining or reloading leaves no new rows.
2. Copy and paste work in the name and email fields; a screen reader or browser translate works on SJT text.
3. Deployed preview: send a telemetry request from a phone on mobile data and from a second device on the same Wi-Fi; confirm the rate limiter sees different IPs (or report if not).
4. Start an assessment, reload mid-game, and confirm it resumes at the next mini-game boundary and the interrupted one is marked `INSUFFICIENT` in the recruiter view.
5. Open a recruiter dossier: banner present; no colours, no ranking, no filter by evidence; uncalibrated values shown as `UNCALIBRATED` / `NOT_COMPUTED`.
6. Confirm the production database type and that it is persistent (not an ephemeral SQLite file).

---

## 9. STEPS 8 AND 9, AND THE CONSOLIDATED REPORT

### Step 8: Mini-game mapping (read-only)
Remediation brief R6: map each of the 21 code mini-games to F1 to M3 (`MATCH`, `PARTIAL`, `NO MATCH`), list the raw events and features of each, and flag any whose main feature is speed, motor accuracy, rhythm stability or perceptual accuracy for a social, exploratory, creative or motivational parameter. Report only; change nothing.

### Step 9: Documentation
Rewrite `RECRUITMENT_INTEGRATION.md` to describe only what the code now does (remediation brief R7), with a changelog, "Calibration-stage research instrument. Not validated.", names copied from config, correct endpoints, and a plain list of what is not implemented or not verified. Run the linter on it.

### Consolidated report (one message at the end)
1. Commit list (hash, one-line purpose)
2. Files changed with reasons
3. The acceptance table (Section 7), unedited
4. Full test run: counts per file
5. Stop conditions encountered and how each was handled
6. Everything NOT VERIFIED
7. Existing data-quality flags found and their classification
8. The mini-game mapping table
9. Questions for the owner
10. `git diff --stat` for `config/sjt_items.json` and `config/parameters.json` (expected: empty)

**Do not claim completion for anything the acceptance script marks FAIL or NOT VERIFIED.**