# ALFAAZ RECRUIT: IMPLEMENTATION BRIEF v2

**Status:** calibration-stage research instrument for unpaid volunteer recruitment.
**Not** a validated psychometric instrument. **Not** a selection tool.

Put this file in the repo at `docs/ALFAAZ_RECRUIT_BRIEF.md` and read it fully before touching code.

---

## 0. KICKOFF PROMPT (paste this into the CLI)

```
Read docs/ALFAAZ_RECRUIT_BRIEF.md completely. You are working inside the EXISTING
Alfaaz website repository. Work in gates. At the end of every gate, STOP and wait for my
written approval before starting the next gate. Start with Gate 0 (read-only audit).
Do not write or modify any code in Gate 0. Every statement about the existing repo
must cite file path and line numbers. If something is missing, say exactly what is
missing. Do not invent it.
```

---

## 1. NON-NEGOTIABLE RULES

### 1.1 Do not invent
If information is missing, do not fabricate it. Inspect the repo, search again, and if it is still missing, list it under **MISSING INPUTS** and use a clearly marked placeholder that **fails the production build** (see 12.5).

Never fabricate: SJT content or keys, parameter definitions, project names, font names, palette values, consent or legal wording, retention periods, API endpoints, credentials, existing components or data, validation results, or norm/threshold values.

### 1.2 Evidence for claims about the repo
Every claim about existing code carries `path:line`. "I believe there is a component…" is not acceptable. Open the file and cite it.

### 1.3 Gates
The work is split into gates (Section 16). The CLI must stop at each gate, present the required artifacts, and wait. It must not continue "while waiting".

### 1.4 Git safety
- Run `git status` and `git branch --show-current` first and report both.
- Work on a new branch `feature/alfaaz-recruit`. Do not commit to `main`.
- Commit once per gate with a descriptive message.
- Do not delete or overwrite existing working files without first explaining what they do.
- Do not edit unrelated pages or components. Preserve existing site behavior.
- Never commit secrets. Use environment variables. Add `.env*` to `.gitignore` if not already covered.

### 1.5 No LLM in the measurement path
No LLM or other generative model may be used at runtime for scoring, evidence labelling, or report text. Report sentences come from fixed templates keyed on computed features (Section 11).

### 1.6 Honest completion
Do not claim anything is complete unless it is implemented and its tests pass. Report failures as they are.

---

## 2. PURPOSE AND RESEARCH STATUS

- Alfaaz Recruit collects **judgment evidence** (SJT) and **observed behavioral evidence** (game worlds) on the seven Alfaaz parameters, for **unpaid volunteer** applicants.
- The system is **exploratory**. Its job in this phase is to collect clean, versioned, reproducible data and to show agreement and disagreement between sources. It is not to decide who is accepted.
- The system must not: auto-reject, rank, sort candidates by any evidence field, produce an overall fit score, recommend roles or projects, or infer character, honesty, or personality type.
- A human decides, using the normal Alfaaz process (for example a structured interview). The report is an **evidence view for research**, not a decision input, until criterion evidence exists. The report page must say so prominently.
- Criterion outcomes (for example volunteer retention, hours contributed, supervisor feedback) are **not defined yet**. Build the optional `outcomes` table (Section 9) so they can be attached later. Do not invent outcome definitions.

---

## 3. LOCKED INPUTS AND VERIFICATION

### 3.1 Locked files
Place these exactly as supplied in `config/`. Do not edit them.

| File | SHA-256 (must match) |
|---|---|
| `config/parameters.json` | `ed4eb65e958a37d45b539470dfe5dc125932651cbc404e68f56fac31bb5bc64e` |
| `config/sjt_items.json` | `be71fb2f4f0473034dccc5b9affac76ca93a553b50c54c155470ce1b50835890` |

A startup/CI check must compute both hashes and fail if they differ. The combined hash goes into `config_hash` (Section 9).

`sjt_version` is read from the file (currently `"2026-09-rev"`). Do not hardcode it.

### 3.2 The seven parameters (locked)
Empathy, Conscientiousness, Collaborative Spirit, Emotional Agility, Curiosity, Creative Initiative, Motivation.

Use the keys and definitions in `parameters.json` verbatim. Internal keys: `empathy`, `conscientiousness`, `collaborative_spirit`, `emotional_agility`, `curiosity`, `creative_initiative`, `motivation`. Behavioral facets may be used internally but are never shown as parameters.

### 3.3 Inputs still MISSING (Gate 0 must check the repo for each; if absent, report it)
1. Font names and stack
2. Palette
3. Alfaaz project list
4. Consent and privacy notice text (owner or a qualified advisor must write it)
5. Data retention period (owner decision)
6. SJT instruction text shown to candidates (the JSON has scenario and option text only)
7. The V1.2.1 build spec (the game mechanics in this brief build on it)
8. Existing Urdu copy beyond the act titles in `sjt_items.json`
9. Whether SJT and other candidate-facing copy exists in Urdu (only the act titles do)

For each missing item, create a placeholder key in `config/copy/` or `config/brand.json` with value `"__MISSING__"`. Do not guess values.

---

## 4. DECISIONS LOG (owner to confirm at Gate 1)

Each row is a change or clarification against the earlier brief. "Default" is what the CLI implements unless the owner says otherwise.

| ID | Issue found | Default in this brief |
|---|---|---|
| D1 | Band cutoffs were written as 0.67 / 0.34. In real data this matters only for Conscientiousness (span 21): raw 14/21 is exactly 2/3 and raw 7/21 is exactly 1/3. Decimal cutoffs put 14 in MODERATE and 7 in LOW. | Use exact integer arithmetic with cutoffs at exactly 1/3 and 2/3 (Section 6.2). Bands are equal-width thirds. |
| D2 | "STRONG" meant three different things. | Separate vocabularies (Section 5). |
| D3 | Game levels (STRONG, MODERATE) need norms that don't exist. | Game bands are computed only when `config/feature_bands.json` holds real thresholds. Shipped value: `null` for all. Until then the status is `UNCALIBRATED` and the report shows raw features and descriptive statements only (Section 10). |
| D4 | Mini-game order was partly randomized, but several are sequential. | Order inside each world is **fixed**. Only world order is counterbalanced, using a small fixed set of orders (Section 14). |
| D5 | "No deception" vs "simulated partner". | Candidates are told in the intro that some characters in the tasks are computer-controlled. No deception. |
| D6 | "No fake errors" vs "unexpected setback". | Setbacks are scripted task-condition changes. The UI never tells the candidate they made a mistake when they did not. |
| D7 | Motivation and Archive time budgets were not specified. | Every mini-game has a `ceiling_ms` and a `min_observations` value, set in its Design Sheet and approved at Gate 1. Reaching a ceiling is recorded as `stop_reason: "ceiling"`. |
| D8 | Part 10 said "2-3 of 3" is strong convergence, but also defined "mixed". | Internal consistency uses a single range rule (Section 10.4). |
| D9 | Source priority list omitted this brief. | Section 15 adds it. |
| D10 | Game section may burden unpaid applicants and disadvantage some. | Skipping a mini-game, a world, or the whole game section is allowed at any time, without penalty wording. Recorded as `INSUFFICIENT`, never LOW. Owner may disable with `GAMES_OPTIONAL=false`. |
| D11 | SJT is always first. | Fixed: SJT first, then games. Recorded as a known limitation (possible priming effect). |
| D12 | Relationship state names (STRONG/PARTIAL/DIVERGENT) collide with other terms. | Renamed to ALIGNED / PARTLY_ALIGNED / DIFFERENT (Section 5). Mapping: STRONG→ALIGNED, PARTIAL→PARTLY_ALIGNED, DIVERGENT→DIFFERENT. |

---

## 5. VOCABULARY (use these words only, each for one concept)

| Concept | Allowed values | Notes |
|---|---|---|
| SJT band (per parameter) | `HIGH`, `MODERATE`, `LOW` | Equal-width thirds of the **relative-emphasis** scale. Display text: "higher / middle / lower emphasis in this SJT's trade-offs". Never "high trait". |
| Mini-game band | `HIGH`, `MODERATE`, `LOW`, `UNCALIBRATED` | Only after real thresholds exist (D3). |
| Mini-game status | `USABLE`, `INSUFFICIENT`, `INVALID` | Skipped, interrupted, or too few observations → `INSUFFICIENT`. Corrupt/impossible data → `INVALID`. Neither ever becomes `LOW`. |
| Within-parameter consistency | `CONSISTENT`, `VARIED`, `INSUFFICIENT`, `NOT_COMPUTED` | Across usable mini-games. `NOT_COMPUTED` when uncalibrated. |
| SJT/game relationship | `ALIGNED`, `PARTLY_ALIGNED`, `DIFFERENT`, `SJT_ONLY`, `INSUFFICIENT`, `NOT_COMPUTED` | Descriptive only. |
| Confidence | `LIMITED`, `MODERATE`, `SUBSTANTIAL` | Reflects **amount and consistency of observations**, not validity. |

---

## 6. SJT SPECIFICATION

### 6.1 Structure (verified from the supplied file)
- 7 scenarios (`S1`–`S7`), 4 options each, 28 unique option IDs.
- Every option has integer keys 0–3 for all seven parameters.
- Every parameter varies within every scenario (no zero-variance scenario).
- Acts: S1–S3 "The Exhibition" (نمائش), S4–S5 "The Circle" (حلقہ), S6–S7 "The Outreach" (رسائی).

Do not add, remove, reword, or re-key any item. Do not create extra SJT items. Do not restore anything from the old PDF.

### 6.2 Scoring (exact integer arithmetic, no floats in band logic)
For each parameter `p`:

```
raw[p]  = sum over scenarios of key[p] of the selected option
min[p]  = sum over scenarios of the minimum key[p] among that scenario's options
max[p]  = sum over scenarios of the maximum key[p] among that scenario's options
span[p] = max[p] - min[p]
num     = raw[p] - min[p]

if span[p] == 0 -> band unavailable
elif 3*num >= 2*span -> HIGH
elif 3*num >= span   -> MODERATE
else                 -> LOW
```

Store `raw`, `min`, `max`, `span`, `band` per parameter. A ratio may be displayed but is never used for banding.

No overall SJT score, trait score on 0–100, radar chart, project-fit score, or cross-parameter ranking. The report must state that parameters are not on comparable absolute scales.

### 6.3 Golden values (verified by enumerating all 4^7 = 16,384 response patterns)
The CLI must reproduce these in a test. If it does not, scoring or config loading is wrong.

| Parameter | min | max | span |
|---|---|---|---|
| empathy | 0 | 19 | 19 |
| conscientiousness | 0 | 21 | 21 |
| collaborative_spirit | 1 | 18 | 17 |
| emotional_agility | 1 | 17 | 16 |
| curiosity | 0 | 17 | 17 |
| creative_initiative | 0 | 20 | 20 |
| motivation | 0 | 19 | 19 |

Band distribution under uniformly random responding, exact thirds:

| Parameter | LOW | MODERATE | HIGH |
|---|---|---|---|
| empathy | 34.6% | 59.7% | 5.7% |
| conscientiousness | 46.0% | 51.1% | 2.9% |
| collaborative_spirit | 34.2% | 60.9% | 5.0% |
| emotional_agility | 43.9% | 51.9% | 4.2% |
| curiosity | 48.2% | 49.2% | 2.5% |
| creative_initiative | 48.9% | 48.9% | 2.2% |
| motivation | 34.7% | 59.6% | 5.7% |

Also verified:
- Number of HIGH bands per pattern: 0 → 12,148 patterns, 1 → 3,844, 2 → 392. **No pattern produces more than 2 HIGH bands.**
- Number of LOW bands per pattern: most patterns have 2–4 LOW bands (0 → 14, 1 → 720, 2 → 4,346, 3 → 7,426, 4 → 3,475, 5 → 403).
- The sum of the seven raw scores across parameters ranges only 44–56 (13 distinct values). The profile is therefore **nearly ipsative**: a higher score on one parameter mechanically means lower scores elsewhere. Correlations between parameters under random responding range from about −0.59 to +0.36.
- Under decimal cutoffs (0.67/0.34), only Conscientiousness changes (LOW 58.5%, MODERATE 39.8%, HIGH 1.7%). This is why D1 uses exact thirds.

**Consequences for the report (mandatory text):** a HIGH band is rare by design, LOW is common by design, and LOW does not mean "low trait". The report must show the random-responder reference distribution above next to the candidate's bands.

Implement `scripts/enumerate_sjt` that regenerates all of the above from the two locked files and writes `docs/sjt_enumeration.json`. Re-run it in CI.

### 6.4 Server-side only
- Scoring keys never reach the client. The client receives scenario text and option text/IDs only.
- Build a stripped payload server-side (`sjt_public`) and serve that. Scoring happens on the server from submitted option IDs.
- Test: search the production client bundle for any of the key field names and for the literal `"keys"` structure from `sjt_items.json`. Fail if found.
- The SJT instruction text comes from `config/copy/` (currently missing). Do not write one. Use the `__MISSING__` placeholder.

### 6.5 Items flagged for owner review (do NOT change them)
These are observations about the authoritative SJT. They are not corrections.

1. **Motivation is keyed 3 on options that mean absorbing extra labour or working through burnout** (S1A, S2D, S3C, S4C, S7A), while the honest-communication option in S7 (S7B) is keyed 0. For unpaid volunteers this may reward over-extension. Decide whether that is intended.
2. **Conscientiousness is keyed mostly as rule-keeping and structure** (it is the maximum in all 7 scenarios). The parameter definition emphasizes verifying information under uncertainty, and no SJT option clearly describes verifying. Record this in the construct map (Section 10.6).
3. Because options trade parameters off against each other, SJT bands show relative emphasis in a forced-choice-like pattern, not absolute levels.

---

## 7. GAME ARCHITECTURE

### 7.1 Shape
- 7 worlds × 3 mini-games = 21 short tasks. The candidate experiences **7 worlds**, not 21 tests. Each world has one visual identity and seamless transitions, with no repeated "test instructions" between micro-tasks.
- Nominal budget: 15–35 s per mini-game, 60–100 s per world, about 10–14 minutes for the game battery, about 20–25 minutes overall including SJT and warm-up.
- Three mini-games per parameter must differ in mechanics and in nuisance demands (motor, reading, strategy) while keeping construct relevance. They are **not** three copies of one game.
- All mini-games record behavior. None claims to measure an internal state.

### 7.2 Design Sheet (required before coding each mini-game)
For every one of the 21 mini-games, the CLI writes `docs/design/<id>.md` with:

1. Target parameter and behavioral facet (link to the `parameters.json` definition text)
2. Nearest researched construct, if any, and an honest note on how close the match is
3. Task description, trial structure, stimuli, and what varies between trials
4. **Nuisance demands** (reading, motor, familiarity) and how this mini-game differs from its two siblings
5. Control/decoy conditions (for example trials where the "accommodating" response is not the context-appropriate one)
6. Raw events logged
7. Features: formula, units, inputs, direction of interpretation, and why it is not a click count
8. `min_observations` for the mini-game to count as `USABLE`, and expected number of observations
9. `ceiling_ms` and what happens when it is reached
10. Validity rules (what makes it `INVALID`)
11. Accessibility alternative and which latency features are excluded in each mode
12. What "insufficient evidence" looks like
13. Anything **not** taken from V1.2.1 or this brief, marked `PROPOSED: needs owner approval`

Design Sheets are presented at Gate 1. No mini-game is coded before its sheet is approved.

### 7.3 The 21 mini-games
Order within each world is fixed as listed.

| World (parameter) | ID | Mini-game | Must include / must avoid |
|---|---|---|---|
| **1 The Frequency** (Empathy) Keep: signal tuning, slider, simulated producer | F1 | Cue Detection | Partner-state cues appear during tuning. Log cue onset, response, slider movement. |
| | F2 | Ambiguous Cue | Incomplete feedback. Options: adjust, ask for clarification, keep current setting. |
| | F3 | Context Change | Partner's needs change mid-task. Log updating. |
| | | *World rule* | "Accommodate = always correct" is forbidden. Include trials where pursuing the task objective, accommodating, and clarifying are each the context-appropriate response. Do not define Empathy as time in a comfort zone. |
| **2 The Archive** (Conscientiousness) Keep: archive, rules, classification, checking, untimed feel | A1 | Classification | Sort abstract items under multiple rules. |
| | A2 | Exception Handling | Unusual items, rule conflicts, ambiguous cases. |
| | A3 | Quality Control | After finishing, decide what to review/correct before finalizing. |
| | | *World rule* | No visible countdown. "More rule-panel opens = more Conscientiousness" is forbidden. Outcome (accuracy, consistency) and process (verification, self-correction) are both recorded. Careful accurate work with no checking, and heavy checking with poor accuracy, must be distinguishable. |
| **3 The Shared Canvas** (Collaborative Spirit) Keep: shared mural, simulated partner, shared resources | C1 | Resource Cooperation | Partner genuinely needs a resource. Player decides whether and how much to share. |
| | C2 | Coordination | Partner changes pace or pauses. Player chooses how to coordinate. |
| | C3 | Collaboration Repair | Shared task becomes misaligned. Player repairs or redistributes. |
| | | *World rule* | "More sharing = better" is forbidden. Include control trials where sharing is unnecessary. Record sharing before vs after request, need-sensitivity, role adjustment, repair. Motor synchronization is secondary only. |
| **4 The Shifting Grid** (Emotional Agility) Keep: rapid sorting, changing rules, recovery | E1 | Rule Shift | Hidden rule reversal. |
| | E2 | Setback Recovery | Mild scripted interruption of a normal task (D6). |
| | E3 | Changing Conditions | Requirements change after a strategy is established. |
| | | *World rule* | No loud sounds, no false error claims, no distress imagery, no harmful stimulation. Evidence is behavioral: recovery, perseveration, stability, strategy change. No claim to measure internal emotion. |
| **5 The Hidden Gallery** (Curiosity) Keep: gallery, map, hidden rooms, optional information | Q1 | Optional Discovery | Optional information, no reward for looking. |
| | Q2 | Mystery Exploration | An unexplained object/event invites investigation. |
| | Q3 | Information Integration | Optional information found earlier helps explain something later. |
| | | *World rule* | Content is not all about Alfaaz or art. "More clicks = more Curiosity" is forbidden. Log first inquiry, breadth, depth, revisits, persistence after unrewarded findings, use of found information. |
| **6 The Broken Tool** (Creative Initiative) Keep: incomplete resources, sandbox, manipulation, multiple solutions | CR1 | Open Construction | Multiple valid solutions. |
| | CR2 | Constraint Shift | A previously useful approach stops working. |
| | CR3 | Unspecified Tool Use | An object has more than one plausible use. |
| | | *World rule* | Log the attempt chain: attempt → outcome → response to feedback → strategy change → next attempt. Clicks are not creativity. First-try success is not penalized. If there was no opportunity to experiment, evidence is `INSUFFICIENT`. |
| **7 The Repetition** (Motivation) Keep: mundane work, minimum, optional continuation | M1 | Minimum Completed | Candidate completes a stated minimum and is explicitly told they may finish. |
| | M2 | Optional Continuation | More units remain; continuing is optional. |
| | M3 | Persistence Under Reduced Reward | Continuation with less salient immediate feedback. |
| | | *World rule* | Stopping at the minimum is neutral. Do not state or imply that extra work is used by Alfaaz if it is not. Use honest framing ("you may continue or finish"). Each segment has a `ceiling_ms`; reaching it ends the segment with `stop_reason: "ceiling"` and the observation is **right-censored**, not "highest". Log continuation, duration, extra units, cadence trajectory, pauses, stopping point. "Longer = more Motivation" is forbidden. |

### 7.4 Honesty rules for all worlds
- Nothing is actually "submitted" anywhere. UI wording must not imply otherwise.
- Simulated partners are disclosed as computer-controlled in the intro (D5).
- Partner behavior is scripted and deterministic given a stored seed.
- No fake errors, no false claims, no manipulation of candidate emotions.

---

## 8. TELEMETRY

### 8.1 Event schema (append-only)
```
session_id        pseudonymous UUID (no personal data)
seq               integer, strictly increasing per session, assigned on client
segment_id        increments on every page load/resume
t_ms              performance.now() relative to segment start (Section 8.3)
server_received   server timestamp, used for ordering/QC only, never for behavior
screen
game_world
mini_game
trial
action
input_type        mouse | touch | keyboard | other
state             game/partner state snapshot (structured)
data              action-specific payload (structured)
```

Log raw behavior: option selection, slider change, cue onset, response, correction, retry, exploration, sharing, coordination, pause, resume, skip, completion, partner state, game state change, visibility change, and error.

Never drop raw events because a variable is "not currently scored".

### 8.2 Transport and storage
- Client batches events (flush on interval, on mini-game end, on `visibilitychange`, and with `sendBeacon` or equivalent on unload). Slider events are throttled at a configured rate, and the raw rate used is recorded.
- Server ingest is **idempotent** on `(session_id, seq)`. Re-sending a batch creates no duplicates. Missing `seq` ranges are flagged.
- Respect serverless request-size and duration limits of the actual deployment platform (check current Vercel documentation during Gate 0, do not guess).
- Storage: use what the repo already uses if it exists. If there is no database, **present options and stop at Gate 1 for approval** (Section 13). Do not choose silently.

### 8.3 Timing
- All behavioral durations use `performance.now()` differences within one segment.
- Wall-clock time is never used for behavior.
- **Pause:** log `pause` and `resume`. Paused time is excluded from durations. A hidden tab (`visibilitychange`) is logged, and time hidden is treated as paused.
- **Reload/resume:** `performance.now()` restarts on reload. Log `segment_start` with a new `segment_id`. A session may resume **only at a mini-game boundary**. A reload **inside** a mini-game marks that mini-game `INSUFFICIENT` (`interrupted`). Never compute durations across segments.
- Warm-up (tap, movement, reading/comprehension) stores baseline metadata. Do **not** mechanically divide latencies by baseline. For each latency feature store `raw`, `adjusted`, and `adjust_method`. If no defensible adjustment is configured, `adjusted` is null.

### 8.4 Immutability and deletion
Raw events are immutable in normal operation. The only exception is a **deletion/anonymization request**: a documented admin command removes or anonymizes the identity link and, where required, raw events, and writes a non-identifying audit record. Design the schema so this is possible (Section 9).

---

## 9. DATA MODEL AND VERSIONING

```
identity_link      (kept separate; maps an applicant to a session_id; restricted access)
sessions           session_id, created, status, order_id, versions, config_hash, device_class
consent_records    session_id, consent_text_version, timestamp, choices
accessibility      session_id, modes enabled (not a score)
warmup             session_id, tap/movement/reading baseline
assignments        session_id, world_order_id, per-mini-game seeds, stimulus condition codes
sjt_responses      session_id, scenario_id, option_id, timing (raw)
events             append-only (Section 8)
features           session_id, mini_game, feature_name, value_raw, value_adjusted, adjust_method, feature_version, valid, flags
evidence           derived: SJT bands, mini-game status/band, consistency, relationship, confidence
data_quality_flags session_id, scope, flag, detail
outcomes           (optional, nullable) session_id, outcome_type, value, recorded_at, recorded_by
recruiter_access_log  who viewed which session, when
```

Versions stored on every derived record: `spec_version`, `sjt_version`, `scoring_version`, `feature_version`, `config_hash`.

**Reproducibility:** `features`, `evidence`, and integration output are derived and can be regenerated. Provide `recompute --session <id>` and `recompute --all`. Same raw events + same config = same output. A test must prove this.

Identity data (name, email, contact) is never stored in `events`, `features`, or `evidence`. Telemetry refers only to the pseudonymous `session_id`.

---

## 10. FEATURES → EVIDENCE → INTEGRATION

### 10.1 Pipeline
raw events → features (per mini-game) → mini-game status/band → within-parameter game evidence and consistency → relationship with SJT band → confidence → report.

Computed on the **server** from stored events. Scoring annotations (which response is context-appropriate on each trial, etc.) live in server-only config. Only stimulus data is sent to the client. Client-safe stimulus files and server-only scoring files are separate files.

### 10.2 Config files (all versioned and hashed into `config_hash`)
- `config/features.json`: feature definitions, `min_observations`, exclusion rules by accessibility mode
- `config/feature_bands.json`: band thresholds per feature or mini-game. **Shipped value: `null` for all.** Do not fill these in. They must come from real data later.
- `config/integration.json`: provisional settings below. All are **marked provisional**, not validated

```
minigame_weights:            equal (1/3 each), provisional
min_usable_minigames:        2 of 3, provisional
consistency_max_band_range:  1, provisional
relationship_rule:           see 10.5, provisional
```

### 10.3 Missing or invalid data
- Skipped, interrupted, or too few observations → mini-game `INSUFFICIENT`. Corrupt or impossible data → `INVALID`. Neither becomes `LOW`.
- If a mini-game is excluded, renormalize weights over the remaining usable ones.
- If fewer than `min_usable_minigames` are usable → game evidence `INSUFFICIENT`.
- Accessibility modes never lower a result. If a mode makes a latency feature uninterpretable (for example extended time), exclude that feature and flag it.

### 10.4 Within-parameter consistency
Bands map to 0 (LOW), 1 (MODERATE), 2 (HIGH). Among `USABLE` mini-games with a band:
- fewer than `min_usable_minigames` → `INSUFFICIENT`
- `max − min ≤ consistency_max_band_range` → `CONSISTENT`
- otherwise → `VARIED`

When uncalibrated (D3): `NOT_COMPUTED`. `VARIED` is recorded as behavioral variation. It is **not** given psychological meaning. Consistency informs **confidence**. It never overrides the observed features.

### 10.5 SJT/game relationship (provisional, descriptive)
Only when both an SJT band and a game band exist:
- same band → `ALIGNED`
- adjacent band → `PARTLY_ALIGNED`
- HIGH vs LOW → `DIFFERENT`

Other cases: no usable game evidence → `SJT_ONLY`; neither source interpretable → `INSUFFICIENT`; uncalibrated → `NOT_COMPUTED`.

Two limitations the report must state:
1. SJT bands are anchored to the SJT's own scoring range. Game bands will be norm-referenced. A mismatch can be a **scale artifact**, not a real difference.
2. A discrepancy means only: "stated judgment and observed behavior differed in this session". It never means dishonesty, hypocrisy, low character, or "faking". It may serve as an interview prompt.

The SJT is the primary framework. Game evidence corroborates. **Never average the two.**

### 10.6 Confidence
```
LIMITED      usable_minigames <= 1, or a critical data-quality flag
MODERATE     2 usable mini-games, or 3 usable but VARIED
SUBSTANTIAL  3 usable, CONSISTENT, no critical flags
```
Provisional rules, stored in `config/integration.json`. Confidence reflects data sufficiency, not validity.

### 10.7 Construct map (required deliverable, `docs/construct_map.md`)
For every feature: parameter → definition text from `parameters.json` → facet → feature → nearest researched construct (or "none") → known limits. Must state, at minimum:
- rule-shift tasks are behavioral flexibility evidence, not direct emotional evidence (Emotional Agility)
- persistence on a dull task is one facet of the Motivation definition and is not the same as volunteer motivation as studied in the literature
- "Collaborative Spirit", "Emotional Agility" and "Creative Initiative" are organization-defined parameters and are not standard research constructs
- demand characteristics apply: candidates know they are being assessed

---

## 11. RECRUITER RESEARCH VIEW

### 11.1 Content per parameter
Parameter · SJT raw/min/max and band · mini-game status and (if calibrated) band for each of the three · game evidence · consistency · SJT/game relationship · observed behavior (template sentences) · confidence · data-quality flags.

### 11.2 Mandatory safeguards
- A fixed banner: "Research evidence view. Not validated. Not for selection decisions."
- Show the random-responder reference distribution (Section 6.3) and the near-ipsative note.
- No sorting, ranking, or filtering candidates by any evidence field. List by submission order only.
- No red/amber/green colouring. No single summary row. No overall fit.
- `SJT_ONLY` and `INSUFFICIENT` are shown in neutral styling, never as a deficit.
- Authentication and authorization are required. If the repo has existing auth, use it; otherwise propose options at Gate 1. Unauthenticated access must return 401/403. Every view is written to `recruiter_access_log`.
- Observed-behavior text comes from fixed templates keyed on features. No free text. No runtime LLM.

### 11.3 Banned words (lint all report templates and UI strings; the build fails on a match)
careless, lazy, fake, faking, hypocritical, hypocrite, dishonest, lying, liar, intrinsically motivated, unreliable, high potential, low potential, recommended for, not recommended, personality type, character, trustworthy, untrustworthy, best fit, poor fit, reject, hire.

---

## 12. CANDIDATE EXPERIENCE, CONSENT, ACCESSIBILITY, FAIRNESS

### 12.1 Candidate flow
Consent → accessibility options → warm-up → SJT → seven worlds → "Assessment Complete. Thank you for your time." No scores, bands, or feedback are shown to the candidate.

### 12.2 Intro information (copy supplied by owner; placeholders until then)
Must be given **before** consent: estimated total time, that parts are optional and can be skipped or paused without penalty wording, that some characters are computer-controlled, what data is recorded and why, and who sees it. Wording is the owner's (or a qualified advisor's). The CLI writes none of it.

### 12.3 Privacy and law (owner must confirm with a qualified advisor)
India's Digital Personal Data Protection Act 2023 and its rules are likely relevant. Engineering requirements regardless:
- consent record stored with a consent-text version and a timestamp
- purpose limitation: no reuse of telemetry outside the stated purpose
- a configured retention period (**owner value required; no default**). Deletion job implemented
- deletion/anonymization path (Section 8.4)
- minimal device metadata only, in coarse categories: pointer type, viewport class, input modality, reduced-motion preference. No fingerprinting
- the assessment pages load **no third-party analytics or trackers**. Gate 0 audits the site's existing scripts
- **Age:** if applicants may be under 18, stop and get advice before launch. Behavioral monitoring of minors has stricter rules. The brief provides the flag `REQUIRE_18_PLUS_CONFIRMATION` (default `true`, text from owner)

### 12.4 Accessibility (not a score)
Required where feasible: keyboard operation, touch, large targets, colour-independent cues, reduced motion, extended time, pause at any time, screen-reader labels, no mandatory audio, an alternative interaction method per mini-game. Each Design Sheet states the alternative and which features are excluded per mode. Accessibility modes never produce `LOW`.

Urdu headings use `lang="ur"` and `dir="rtl"`. Do not translate anything else. Do not invent Urdu copy.

### 12.5 Launch blockers
A production build/CI check fails if any `__MISSING__` placeholder remains in candidate-facing copy, consent, retention period, or brand config, or if `feature_bands.json` claims calibration without a recorded source. Development builds warn instead.

### 12.6 Fairness monitoring (infrastructure only)
Store device class, input modality, accessibility modes, and language. Provide a de-identified analysis export so analysts can stratify feature distributions by device and mode. Do not use these for scoring.

---

## 13. SECURITY AND DEPLOYMENT

- Scoring keys, feature configs, and scoring annotations stay server-side (Sections 6.4, 10.1).
- Identity is kept separate from telemetry (Section 9).
- Environment variables for all credentials. None committed.
- Recruiter routes are authenticated and log access.
- Rate-limit ingest endpoints. Validate and size-limit payloads. Reject unknown `session_id`.
- Random assignment uses a cryptographically secure source, server-side. Candidates cannot choose or influence it.
- Database/storage and auth choices, if not already in the repo: **present 2–3 concrete options with trade-offs at Gate 1 and wait for approval.**

---

## 14. RANDOMIZATION

- **World order:** counterbalanced using a fixed set of orders, generated by a script. Default: a Williams-type balanced Latin square for 7 worlds (14 sequences), assigned by **least-used order first**, ties broken by secure random. Fewer orders are acceptable only with owner approval. Record the order ID.
- **Mini-game order inside a world:** fixed 1→2→3.
- **Stimuli** (card order, puzzle order, door states, scenario variations): generated from a per-mini-game seed stored in `assignments`. Stimulus replay must be exact from the seed.
- **SJT option display order:** the owner has not specified shuffling. Default: **fixed as in the file**. Flag at Gate 1 whether to randomize it. If randomized, store the displayed order per response.
- Randomization may not change the construct. Any variant is recorded as a condition code.

---

## 15. SOURCE PRIORITY

When sources conflict:

1. `config/sjt_items.json`
2. `config/parameters.json`
3. **This brief (v2)**
4. V1.2.1 build spec, where not overridden by this brief
5. Working code already in the repo
6. Older PDFs, only for visual and narrative reference

Where this brief overrides V1.2.1 (one game per parameter → three mini-games per parameter), keep V1.2.1's useful mechanics and telemetry principles and build three complementary tasks.

---

## 16. GATES (stop and wait at every gate)

### Gate 0: Read-only audit (no code changes)
Deliver:
- `git status`, branch, and latest commits
- framework, language, package manager, routing, styling approach, backend/API routes, database, auth, deployment config. Every item with `path:line`
- existing Alfaaz pages, components, CSS/theme, fonts, palette, project list, Urdu copy
- any existing recruitment/SJT implementation and anything touching applicant data
- third-party scripts/analytics on the site
- check of each locked input in 3.1 and 3.3: present / missing / conflicting
- SHA-256 verification result for the two locked files
- a list of **MISSING INPUTS**
- risks and questions for the owner

### Gate 1: Plan and design approval (documentation only)
Deliver:
- implementation plan based on audit findings, with file list and rationale for each change
- storage and auth options with trade-offs (if not already in the repo)
- the 21 Design Sheets (Section 7.2)
- the draft construct map (Section 10.7)
- proposed `features.json` skeleton and `integration.json`
- answers/confirmations needed for decisions D1–D12 and Section 6.5

### Gate 2: Shell, SJT, telemetry, storage
Deliver: assessment shell on an existing route, consent flow (placeholder copy), warm-up, SJT with server-side scoring, telemetry ingest with idempotency, pause/reload handling, identity separation, `enumerate_sjt` script. Tests for Sections 6, 8, 9. Demonstrate end to end.

### Gate 3: One world, end to end
Build **The Archive (World 2)** fully: three mini-games, raw events, features, status logic, evidence, report row, accessibility modes, and tests. (It has the least dependence on simulated social partners, so it exercises the pipeline first.) Demonstrate recompute determinism.

### Gate 4: Remaining worlds, two at a time
Suggested batches: (Repetition + Shifting Grid), (Hidden Gallery + Broken Tool), (Frequency + Shared Canvas). Each batch delivers code, tests, and demonstrations. Stop after each batch.

### Gate 5: Integration and research view
Consistency, relationship, confidence, and the research view with all safeguards in 11.2. Word lint, authentication tests, access logging.

### Gate 6: Hardening
Full accessibility pass, test-profile suite, complete end-to-end run on the deployed preview, launch-blocker check, final report.

---

## 17. TESTS

### 17.1 Required tests (must exist and pass)
**SJT**
- Golden min/max/span table (6.3) reproduced from the file
- Band boundaries: Conscientiousness raw 7 → MODERATE, raw 14 → HIGH (D1)
- Enumeration of all 16,384 patterns reproduces the distributions in 6.3
- Locked-file hashes match
- Scoring keys are absent from the client bundle and from any public API response

**Telemetry**
- Duplicate batch does not create duplicates (idempotent on `session_id, seq`)
- Gaps in `seq` are flagged
- Paused and hidden-tab time is excluded from durations
- Reload inside a mini-game → `INSUFFICIENT`; reload at a boundary → resumes correctly
- Raw event replay produces identical features (recompute determinism, byte-identical output)

**Evidence logic**
- Skipped world/mini-game → `INSUFFICIENT`, never `LOW`
- Whole game section skipped → `SJT_ONLY`
- Uncalibrated thresholds → `UNCALIBRATED` / `NOT_COMPUTED`; no band is invented
- Excluded mini-game renormalizes weights
- Accessibility mode excludes latency features and never lowers a result
- Consistency and relationship rules (using **test-only** fixtures with threshold values, clearly marked as test fixtures and never shipped)

**Report and security**
- Unauthenticated request to the report returns 401/403
- Access is logged
- Banned-word lint passes on all templates
- No sort/rank/filter controls on evidence fields
- No third-party scripts on assessment pages

**Assignment**
- World-order assignment is balanced across N simulated sessions
- Same seed → same stimuli

### 17.2 Synthetic profiles (pipeline tests, not construct validation)
Bot profiles verify that the pipeline separates recorded behavior patterns. They do **not** show that the tasks measure the intended construct, which needs human data. Label them so in tests and docs.

| Parameter | Profiles |
|---|---|
| Empathy | always optimizes task; always accommodates; context-sensitive |
| Conscientiousness | random sorter; over-checker with poor accuracy; accurate careful operator; accurate with no checking |
| Collaborative Spirit | never shares; shares indiscriminately; need-sensitive |
| Emotional Agility | perseverates; adapts; abandons |
| Curiosity | never explores; explores everything; selective investigator |
| Creative Initiative | repeats failed strategy; random trial and error; feedback-driven experimentation; first-try success |
| Motivation | stops at minimum; moderate continuation; continues to ceiling; pauses and resumes |

### 17.3 Measurement questions to answer with data later (build the export, do not answer now)
Feature reliability by mini-game · agreement across the three mini-games · distributions by device and accessibility mode · SJT vs game relationship distribution · missing/invalid rates.

---

## 18. FINAL REPORT FORMAT (at Gate 6)

1. **Repository audit:** what existed (with `path:line`)
2. **Implementation:** files added/changed and why
3. **SJT:** loaded `sjt_version`, hash check, golden test results
4. **Seven parameters:** confirmed from `parameters.json`
5. **Seven worlds:** confirmed
6. **21 mini-games:** list with IDs, facets, and Design Sheet links
7. **Telemetry:** event schema, storage, idempotency, deletion path
8. **Scoring architecture:** SJT, features, evidence, consistency, relationship, confidence; which parts are `UNCALIBRATED`
9. **Accessibility:** modes implemented and latency features excluded per mode
10. **Privacy/security:** what is in place; what needs owner/advisor action
11. **Tests:** passed / failed / not run, honestly
12. **Open owner decisions and MISSING INPUTS**
13. **Known limitations:** near-ipsative SJT, weak reliability expected from 15–35 s tasks, demand characteristics, fixed SJT-first order, no norms

Do not claim validation, predictive validity, or objective personality measurement.

---

## 19. THE SHORT VERSION

Do not invent. Use the two locked files. Keep seven parameters, seven worlds, three short mini-games per world. SJT is primary. Games corroborate and are never averaged with it. Missing data is `INSUFFICIENT`, never `LOW`. Record everything raw. Recompute everything from raw. No levels for games until real thresholds exist. No ranking. A human decides. Stop at every gate.
