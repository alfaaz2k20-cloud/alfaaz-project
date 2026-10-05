# ALFAAZ RECRUIT: REMEDIATION BRIEF (R-SERIES)

**Purpose:** Correct the existing Alfaaz Recruit implementation after the repository audit. This is a **fix specification, not a rebuild**.

**Status:** Calibration-stage remediation. The system is **not a validated psychometric instrument** and is **not an automated selection tool**.

**Authority order:**
1. Owner-supplied locked config files:
   - `config/sjt_items.json`
   - `config/parameters.json`
2. `docs/ALFAAZ_RECRUIT_BRIEF.md` (V2)
3. This remediation brief, **only for the explicit implementation/remediation decisions identified here**
4. Existing code
5. `RECRUITMENT_INTEGRATION.md` (non-authoritative; known to contain errors)

This brief may clarify or prescribe implementation behavior where it explicitly identifies a defect or ambiguity in V2. It **may never override the locked config files** and may not invent Alfaaz content, construct definitions, scoring keys, legal wording, thresholds, or validation evidence.

**Fix scope:** Preserve existing task mechanics unless a separate approved Design Sheet authorizes a mini-game redesign.

---

## 0. KICKOFF PROMPT (paste into the CLI)

```text
Read docs/ALFAAZ_RECRUIT_BRIEF.md and docs/ALFAAZ_RECRUIT_REMEDIATION_BRIEF.md completely.

Work in gates R0..R7. At the end of each gate STOP and wait for my written approval.

Start with Gate R0, which is READ-ONLY.

For every repository claim give exact path:line evidence.
For every executable verification, provide the exact command and its UNEDITED output.
If something cannot be verified, write NOT VERIFIED and explain why.
Do not summarize in place of evidence.

Do not touch config/sjt_items.json or config/parameters.json under any circumstances.

Do not silently reconcile conflicts between the brief, V2, documentation and code.
Where the R-series explicitly changes an implementation rule, follow that rule only
after the relevant gate is approved.

Do not begin a later gate while waiting for approval.
Do not redesign mini-game mechanics during remediation unless a separate approved
Design Sheet explicitly authorizes that change.
```

---

## 1. RULES (apply to every gate)

### 1.1 No invention

Do not invent vocabulary, thresholds, field names, candidate-facing copy, recruiter copy, legal wording, retention periods, project names, APIs, credentials, validation claims, or research results.

Use only the vocabulary in Section 3.

If something is missing, report it as missing. Do not silently replace it with a plausible value.

### 1.2 Evidence

Every claim about the existing repository carries `path:line`.

Every verification that can be run includes:
- exact command;
- unedited output;
- interpretation only after the output.

### 1.3 Do not weaken tests

Never delete, disable, or loosen a test merely to make it pass.

If an existing test encodes behavior that this brief declares incorrect, show:
1. the existing test;
2. the current behavior;
3. the reason it conflicts;
4. the replacement test;
5. the gate/commit in which it is changed.

Example: a test requiring `ALIGNED` whenever any game data exists must be treated as incorrect and replaced, not suppressed.

### 1.4 Raw data is never destroyed

Do not drop, alter, rewrite, or reinterpret raw:
- `telemetry_events`;
- `sjt_responses`;
- any raw table/column containing recorded candidate behavior.

Derived data (`features`, `evidence`, derived `data_quality_flags`, integration output) must remain recomputable.

### 1.5 Production safety and migrations

If the production database may already hold real applicant data:
- STOP before any schema migration;
- show the current schema and migration mechanism;
- ask for approval;
- take a verified backup first.

Use the repository's existing migration system when one exists.

If no migration system exists, write a reversible one-off migration script and show it before executing it.

No destructive migration in any R-series gate:
- no `DROP TABLE`;
- no `DROP COLUMN`;
- no destructive rename;
- no destructive type conversion;
- no deletion of existing raw applicant data.

Additive schema changes are preferred.

Any removal of an obsolete numeric confidence column/field requires a separate approved migration plan.

### 1.6 Git

Use branch:

`fix/alfaaz-recruit-remediation`

Do not commit to `main`.

At the start and end of every gate:
- show `git status`;
- show current branch;
- list touched files and why.

One commit per approved gate, with a descriptive commit message.

No changes outside the files a gate needs.

### 1.7 No runtime LLM

No LLM, generative model, or probabilistic text generator may be used at runtime for:
- SJT scoring;
- feature extraction;
- evidence classification;
- relationship logic;
- confidence;
- recruiter report text.

Report text comes from fixed templates keyed on deterministic computed features.

### 1.8 Existing numeric thresholds are preserved, not tuned

Where this brief says a current numeric value must move into config:
- copy the current value verbatim;
- label it `provisional`;
- do not tune it.

Threshold design/calibration is a separate research activity.

### 1.9 No silent task redesign

During R0-R5, do not change:
- task mechanics;
- stimuli;
- trial counts;
- partner behavior;
- reward structure;
- timing ceilings;
- feature definitions;
- construct targeting;
- task difficulty.

If a task is inconsistent with V2, document the mismatch.

A mini-game redesign requires a separate approved Design Sheet under V2 Section 7.2.

---

## 2. LOCKED INPUTS AND HASH PROVENANCE

### 2.1 Owner-supplied reference hashes

Reference hashes below are owner-supplied values. They are not inferred from the repository.

Hashes are computed after converting CRLF to LF (`\r\n` → `\n`) with no other modification.

| File | LF-normalized SHA-256 | Raw CRLF SHA-256 |
|---|---|---|
| `config/sjt_items.json` | `c098b401d37cc30b515139d307fef632047c048584e19771c0e014ef027e391d` | `be71fb2f4f0473034dccc5b9affac76ca93a553b50c54c155470ce1b50835890` |
| `config/parameters.json` | `1262f85b33c6bd64b3331d214363813e218e9fb52efa856cd6342bd6818c70e6` | `ed4eb65e958a37d45b539470dfe5dc125932651cbc404e68f56fac31bb5bc64e` |

### 2.2 Known structure of the authoritative files

The CLI must confirm each point from the repository files, not from this text.

- `sjt_items.json`: `sjt_version` `"2026-09-rev"`; 7 scenarios `S1`..`S7`; 4 options each with IDs like `S1A`..`S7D`; every option has a `keys` object with integer 0–3 for all seven parameters; there are no `parameter`, `weight`, or `rationale` fields; 445 lines in CRLF form; no trailing newline.
- `parameters.json`: seven keys `empathy`, `conscientiousness`, `collaborative_spirit`, `emotional_agility`, `curiosity`, `creative_initiative`, `motivation`, each with `name` and `definition`.
- Golden SJT values:
  - empathy 0/19/19
  - conscientiousness 0/21/21
  - collaborative_spirit 1/18/17
  - emotional_agility 1/17/16
  - curiosity 0/17/17
  - creative_initiative 0/20/20
  - motivation 0/19/19

### 2.3 Hash check rule

Expected hashes must live in a separate owner-supplied file:

`config/locked_hashes.json`

The file must never derive its expected values from the files it is supposed to validate.

**If Gate R0 finds any mismatch between repository files and Section 2 reference values:**
- do not update Section 2 to match the repository;
- do not update the locked files to match Section 2;
- do not change `locked_hashes.json` merely to make the check pass;
- STOP;
- report the exact mismatch and full relevant diff;
- wait for the owner to confirm/provide the authoritative reference file(s).

`config/locked_hashes.json` may only be finalized after the owner confirms the reference values.

Startup and CI must fail on mismatch.

---

## 3. VOCABULARY

These are the only allowed values for the corresponding concepts.

| Concept | Allowed values |
|---|---|
| SJT band | `HIGH`, `MODERATE`, `LOW` |
| Mini-game status | `USABLE`, `INSUFFICIENT`, `INVALID` |
| Mini-game band | `HIGH`, `MODERATE`, `LOW`, `UNCALIBRATED` |
| Game evidence status | `USABLE`, `INSUFFICIENT` |
| Within-parameter consistency | `CONSISTENT`, `VARIED`, `INSUFFICIENT`, `NOT_COMPUTED` |
| SJT/game relationship | `ALIGNED`, `PARTLY_ALIGNED`, `DIFFERENT`, `SJT_ONLY`, `INSUFFICIENT`, `NOT_COMPUTED` |
| Confidence | `LIMITED`, `MODERATE`, `SUBSTANTIAL` |

Confidence is categorical in the evidence/API/UI layer. Do not expose or use a numeric confidence score.

Removed values:
- `OBSERVED`
- `GAME_ONLY`
- numeric confidence as an evidence interpretation
- `OBSERVED_PARALLEL`
- `SJT_WITH_OBSERVED_GAMES`
- any new synonym created for one of the above concepts

---

## GATE R0: GROUND TRUTH (READ-ONLY)

Run and paste unedited output for each item.

### R0.1 Locked files

Run:

```text
sha256sum config/sjt_items.json config/parameters.json
tr -d '\r' < config/sjt_items.json | sha256sum
tr -d '\r' < config/parameters.json | sha256sum
```

Compare each result with Section 2.

Print from the repository files:
- all option IDs;
- the key names of the first option of S1;
- `sjt_version`;
- the first 3 lines of each parameter `definition`.

Run:

```text
git log --follow --stat -- config/sjt_items.json config/parameters.json
```

For every commit that changed them, report commit message and author.

If either file mismatches Section 2:
- STOP;
- report the full relevant diff;
- do not proceed to R1.

### R0.2 Other SJT copies

Search the whole repository excluding `node_modules`, build output, caches and generated artifacts for:
- duplicate SJT item data;
- scenario IDs `S8`..`S12`;
- hardcoded scenario counts;
- alternate SJT JSON/JS/Python copies.

Do not use a simple `grep -rn "12"` as the only test.

List every relevant hit with `path:line`.

### R0.3 Hash-check implementation

Show where expected hashes come from:
- hardcoded constant;
- config file;
- environment variable;
- generated value;
- other source.

State whether the current check is self-referential.

### R0.4 Evidence pipeline

Print the full current text of the functions that compute:
- mini-game status;
- feature/band calculation;
- game evidence;
- within-parameter consistency;
- relationship;
- confidence.

Show every constant involved.

Search backend, frontend, tests and docs for:
- `OBSERVED`
- `GAME_ONLY`
- `ALIGNED`
- `PARTLY_ALIGNED`
- `DIFFERENT`
- `NOT_COMPUTED`
- numeric `confidence`

### R0.5 Consent and identity

Print the request and database sequence from the first page load to the first stored row.

List every table written before `consent_records` is written.

### R0.6 Active assessment location and reload

Show exactly where these are created, stored and reset:
- `session_id`
- `sequenceNumber`
- `segment_id`
- current world ID
- current mini-game ID
- assessment phase
- active/incomplete mini-game state

State whether each is stored in:
- memory;
- `sessionStorage`;
- `localStorage`;
- server;
- nowhere.

### R0.7 Temporary reload simulation

Using a temporary database outside the repository, deleted after testing:

1. create a session;
2. send events with seq 1–10;
3. simulate a reload using the same `session_id`;
4. restart the client sequence at 1;
5. show how many replacement events are stored;
6. report whether the duplicate sequence numbers are accepted, ignored, rejected or conflict-flagged.

Do not modify production data.

### R0.8 Missing sequence detection

Show where sequence gaps are detected:
- ingest;
- recompute;
- both;
- neither.

### R0.9 Beacon and unload

Show:
- exact URL;
- method;
- body type;
- `Content-Type`;
- `sendBeacon` vs `fetch keepalive`;
- API base URL configuration.

### R0.10 CORS and rate limiting

Print:
- CORS middleware configuration;
- all rate-limit mechanisms;
- scope;
- limits;
- window sizes.

A batch-size cap is **not** a rate limit. Say so if that is all that exists.

### R0.11 Production configuration

Print:
- `backend/app/db/session.py`;
- names of environment variables used for:
  - database;
  - secrets;
  - allowed origins.

Never print secret values.

State whether production database type/persistence can actually be verified from the repository.

If not, write `NOT VERIFIED`.

### R0.12 Recruiter view

List:
- every filter;
- every sort;
- every search control;
- every recruiter API query parameter.

State whether each affects:
- operational session status;
- evidence fields;
- features;
- bands;
- relationship;
- confidence.

### R0.13 Banned-word linter

Show:
- which files it scans;
- exact banned list.

Compare against Section 9.

Run the linter and paste output.

### R0.14 Client exposure

Run the production frontend build.

Search built output for:

```text
keys
weight
rationale
S1A
feature_bands
```

Call the public SJT endpoint and paste the full unedited JSON for scenario S1.

### R0.15 Tests

Run the full test suite.

Paste:
- commands;
- unedited summary;
- pass/fail counts per test file.

List every V2/R-series non-negotiable without a test.

### R0.16 Map the 21 mini-games

For every code mini-game:
- map it to nearest V2 task F1–F3, A1–A3, C1–C3, E1–E3, Q1–Q3, CR1–CR3, or M1–M3;
- or `NO MATCH`.

List:
- raw events logged;
- every computed feature.

Do not redesign or judge at R0.

### R0.17 Existing data

State whether any non-test rows exist in:
- `applicant_identities`;
- `recruitment_sessions`;
- `telemetry_events`.

Counts only. No personal data.

### R0.18 R0 summary

Deliver a one-page summary:
- confirmed bugs;
- confirmed non-bugs;
- NOT VERIFIED items;
- deviations from Section 2 facts;
- migration/data-risk flags.

STOP.

---

## GATE R1: CONSENT BEFORE IDENTITY

**Prerequisite:** R0 passed or the owner explicitly resolved all R0 blockers.

### R1.1 Required application behavior

Before consent:
- Alfaaz must not persist applicant identity, assessment state, telemetry, device metadata or session records in its application datastore.

This does not assert control over external infrastructure/network access logs outside the Alfaaz application datastore.

Candidate information/notice and consent occur before identity persistence.

### R1.2 Atomic consent/session creation

After affirmative consent:
1. create the session and consent record in one transaction;
2. record:
   - `consent_text_version`;
   - `choices`;
   - `confirmed_18_plus` when required;
   - timestamp;
3. do not include applicant identity in this transaction.

### R1.3 Identity submission

After the consent transaction succeeds:
- submit identity separately;
- server rejects identity submission unless an affirmative consent record exists for that `session_id`.

If the candidate declines or leaves the consent screen:
- no Alfaaz application datastore rows are created.

### R1.4 Device metadata

Store only approved coarse device metadata and input modality, after consent.

No device fingerprinting.

### R1.5 Existing IP-hash behavior

Report the current behavior for IP hashing:
- hash;
- salt;
- retention.

Do not change it in R1.

The owner/advisor decides whether it is necessary.

### R1.6 Consent copy

Consent text comes from `config/copy/`.

Do not write legal/privacy language.

If `__MISSING__` remains:
- development warns;
- production fails;
- this follows V2 launch-blocker rules.

### R1.7 Orphan report

Produce a read-only count of identity rows without a matching consent record.

Do not delete them.

### R1.8 Tests

Must prove:
- abandoning consent stores nothing in the Alfaaz application datastore;
- declined consent stores nothing;
- identity endpoint rejects without affirmative consent;
- session + consent are atomic;
- simulated mid-transaction failure leaves no partial session/consent rows.

STOP.

---

## GATE R2: TELEMETRY INTEGRITY

### R2.1 Session continuity and sequence numbers

Persist in `sessionStorage`:
- `session_id`;
- next sequence number;
- current `segment_id`;
- current world;
- current mini-game;
- assessment phase;
- active/incomplete mini-game state.

On load with an existing session:
- query the server for the last stored sequence and segment;
- continue from `last_seq + 1`;
- use `last_segment_id + 1`;
- emit `segment_start`.

A nonexistent session ID is rejected.

### R2.2 Reload inside a mini-game

If the prior persisted state indicates an active mini-game without a corresponding `minigame_end`:
- mark that mini-game `INSUFFICIENT`;
- add flag `interrupted`;
- do not resume mid-task.

Resume only from the most recent completed mini-game boundary.

Never compute a duration across segments.

### R2.3 Idempotency and conflicts

For duplicate `(session_id, seq)`:

- identical payload hash → ignore idempotently;
- different payload → do not overwrite original;
- retain original;
- record critical `seq_conflict` with both hashes;
- never silently drop the conflict.

### R2.4 Sequence gaps

After ingest and during recompute:
- detect gaps;
- record `seq_gap`;
- include missing ranges;
- support both session and mini-game scope where applicable.

### R2.5 Hidden tab and blur

Keep logging visibility/blur/focus events.

Hidden time is excluded from behavioral duration.

Current values:
- background >60s;
- >5 switches;

move to `config/features.json`, preserving those numbers exactly and marking them `provisional`.

They generate non-critical `tab_hidden_extended`.

They do not automatically make a mini-game `INVALID`.

`INVALID` is reserved for corrupt/impossible data:
- non-monotonic `t_ms` in a segment;
- negative duration;
- impossible values;
- other objectively invalid payloads.

If a candidate-facing pause control does not exist, document it as a later gap. Do not invent it in R2.

### R2.6 Beacon

Use configured absolute API base URL.

Use either:
- `sendBeacon` with a CORS-safe body strategy; or
- `fetch(..., {keepalive: true})`.

Document why the chosen method is used.

Flush on:
- mini-game end;
- SJT end;
- `visibilitychange` to hidden;
- `pagehide`.

Test cross-origin behavior on the deployed preview.

### R2.7 Rate limiting and payload limits

Rate-limit:
- session start/consent;
- identity;
- telemetry.

Scope by:
- IP;
- `session_id` where appropriate.

Do not add Redis/new infrastructure without approval.

Enforce:
- max batch size = current 100;
- max request body bytes;
- max events per session;
- max sessions per IP per window.

Put numeric defaults in environment variables.

State clearly that in-memory limits do not hold across multiple instances.

### R2.8 CORS

Replace wildcard CORS with `ALLOWED_ORIGINS`.

Allow only approved:
- production frontend origin;
- necessary preview origins;
- localhost for development.

Restrict methods and headers to those actually used.

Print the existing `GEMINI.md` rule that currently permits wildcard CORS if one exists.

Do not modify `GEMINI.md`.

### R2.9 Data-quality flag scope

Every data-quality flag must carry scope:
- `session`;
- `world`;
- `mini_game`;
- `parameter`.

A parameter-level confidence calculation uses:
- session-level critical flags affecting the session;
- world/mini-game flags belonging to that parameter;
- parameter-level flags.

Do not propagate a local defect to unrelated parameters without an explicit rule.

### R2.10 Tests

Must prove:
- reload preserves sequence continuity;
- same `(session_id, seq)` with identical payload is idempotent;
- conflicting duplicate is flagged and original retained;
- gaps are flagged;
- hidden time excluded;
- reload inside mini-game → `INSUFFICIENT` + `interrupted`;
- missing session rejected;
- cross-origin disallowed request rejected;
- rate limits trigger;
- oversize body rejected;
- active mini-game state is recovered correctly;
- no duration crosses segments.

STOP.

---

## GATE R3: EVIDENCE LOGIC

This gate replaces the incorrect behavior in which usable game data caused `ALIGNED`.

All evidence is derived from raw data.

Do not edit raw data.

Historical derived results must retain their version metadata. Do not overwrite old derived results without version traceability.

### R3.1 Config

Create/extend:

`config/integration.json`

All values are provisional.

```text
min_usable_minigames: 2
consistency_max_band_range: 1
calibration_status_source: config/feature_bands.json
critical_flags: proposed by CLI at R0 and owner-approved at R3
```

Current `min_observations` stays at the existing value until Design Sheets provide approved task-specific values.

Move it into `config/features.json` and label it provisional.

### R3.2 Mini-game status

```text
INSUFFICIENT = skipped, interrupted, or observations < min_observations
INVALID      = corrupt or impossible data only
USABLE       = otherwise
```

Never convert `INSUFFICIENT` or `INVALID` into a LOW band.

### R3.3 Per-parameter evidence

Implement this logic exactly:

```python
n_usable = number of parameter's three mini-games with status USABLE

calibrated = (
    feature_bands.calibration_status == "CALIBRATED"
    and all needed thresholds are non-null
)

sjt_band = band from sjt_engine, or None if SJT missing/incomplete

# game evidence
if n_usable >= min_usable_minigames:
    game_status = "USABLE"
    mg_bands = [
        band(mg) if calibrated else "UNCALIBRATED"
        for mg in usable
    ]
    game_band = aggregate(mg_bands) if calibrated else "UNCALIBRATED"
else:
    game_status = "INSUFFICIENT"
    game_band = None

# consistency
if n_usable < min_usable_minigames:
    consistency = "INSUFFICIENT"
elif not calibrated:
    consistency = "NOT_COMPUTED"
else:
    r = (
        max(ordinal(b) for b in mg_bands)
        - min(ordinal(b) for b in mg_bands)
    )
    consistency = (
        "CONSISTENT"
        if r <= consistency_max_band_range
        else "VARIED"
    )

# relationship
if sjt_band is None:
    relationship = "INSUFFICIENT"
    add_flag("sjt_missing")
elif game_status == "INSUFFICIENT":
    relationship = "SJT_ONLY"
elif not calibrated:
    relationship = "NOT_COMPUTED"
else:
    d = abs(ordinal(sjt_band) - ordinal(game_band))
    relationship = (
        "ALIGNED"
        if d == 0
        else "PARTLY_ALIGNED"
        if d == 1
        else "DIFFERENT"
    )

# confidence
if sjt_band is None or n_usable <= 1 or any critical flag in scope:
    confidence = "LIMITED"
elif n_usable == 3 and consistency == "CONSISTENT":
    confidence = "SUBSTANTIAL"
else:
    confidence = "MODERATE"
```

### R3.4 Mandatory consequences

While calibration is `UNCALIBRATED`:
- consistency is never `CONSISTENT`;
- consistency is never `VARIED`;
- relationship is never `ALIGNED`;
- relationship is never `PARTLY_ALIGNED`;
- relationship is never `DIFFERENT`;
- confidence never exceeds `MODERATE`.

One usable mini-game is not enough for game evidence.

Missing/skipped data never becomes LOW.

### R3.5 Confidence interpretation

Confidence reflects:
- quantity of usable observations;
- consistency;
- critical data-quality state.

It does **not** represent:
- validity;
- accuracy;
- diagnostic certainty;
- personality certainty;
- prediction.

### R3.6 Calibrated aggregate

Only implement calibrated aggregate behavior behind the calibration condition.

Use configured mini-game weights in `config/integration.json`:
- equal 1/3 each, provisional.

Renormalize over usable mini-games.

The rule mapping aggregate result to a band lives in config.

Use test-only threshold fixtures:

`tests/fixtures/*_TEST_ONLY.json`

Never ship test thresholds as production calibration.

### R3.7 Vocabulary migration

Replace usage of:
- `OBSERVED`;
- `GAME_ONLY`;
- numeric confidence interpretation;

across:
- models;
- services;
- APIs;
- frontend;
- tests;
- report templates.

Do not drop existing obsolete numeric columns in this gate.

Do not create replacement vocabulary not listed in Section 3.

### R3.8 Critical-flag policy

The CLI proposes the critical flag list at R0.

The owner approves the final list at R3.

Do not silently expand the list during implementation.

### R3.9 Golden end-to-end evidence fixture

Create a test-only deterministic fixture containing:
- a complete SJT response set;
- known telemetry across all 21 mini-games;
- known accessibility mode;
- known status combinations;
- known quality flags.

Run the full pipeline twice.

Required:
- same raw events + same config → byte-identical derived output;
- no `ALIGNED` while uncalibrated;
- no `PARTLY_ALIGNED` while uncalibrated;
- no `DIFFERENT` while uncalibrated;
- missing evidence never LOW;
- consistency obeys vocabulary;
- confidence obeys categorical rules.

### R3.10 Recompute versioning

Never silently overwrite the meaning of historical evidence after a rule change.

Every derived record carries:
- `spec_version`;
- `sjt_version`;
- `scoring_version`;
- `feature_version`;
- `config_hash`.

`recompute --session <id>` and `recompute --all` must produce versioned output.

If a historical derived record is superseded, preserve version traceability.

### R3.11 Error-path secret protection

Test SJT scoring keys and game thresholds against:
- success responses;
- validation errors;
- 4xx responses;
- 5xx responses;
- debug responses;
- serialized exception payloads.

They must not reach the client.

### R3.12 Tests

Table-driven tests must cover every R3 branch:
- `n_usable` ∈ {0,1,2,3};
- SJT present/absent;
- calibrated/uncalibrated;
- critical flag present/absent.

Explicitly assert:
- old unconditional ALIGNED behavior is absent;
- numeric confidence interpretation is absent;
- uncalibrated evidence never becomes a relationship band;
- recompute determinism.

STOP.

---

## GATE R4: WORLD-ORDER COUNTERBALANCING

Implement the 14-row first-order balanced design:

```text
Worlds:
1 Frequency
2 Archive
3 Shared Canvas
4 Shifting Grid
5 Hidden Gallery
6 Broken Tool
7 Repetition

Row 0:  1 2 7 3 6 4 5
Row 1:  2 3 1 4 7 5 6
Row 2:  3 4 2 5 1 6 7
Row 3:  4 5 3 6 2 7 1
Row 4:  5 6 4 7 3 1 2
Row 5:  6 7 5 1 4 2 3
Row 6:  7 1 6 2 5 3 4

Row 7:   5 4 6 3 7 2 1
Row 8:   6 5 7 4 1 3 2
Row 9:   7 6 1 5 2 4 3
Row 10:  1 7 2 6 3 5 4
Row 11:  2 1 3 7 4 6 5
Row 12:  3 2 4 1 5 7 6
Row 13:  4 3 5 2 6 1 7
```

### R4.1 Balance verification

Test that:
- every world appears exactly twice in each position;
- every ordered adjacent pair is balanced according to the intended first-order design.

If mathematical verification of the supplied rows fails, STOP and report the failure instead of modifying the rows silently.

### R4.2 Assignment

After consent:
- choose row with fewest consented sessions;
- ties broken with `secrets`-based randomness;
- use transaction/lock to avoid race conditions;
- record `world_order_id`;
- record sequence;
- return sequence to client;
- client cannot override.

Track both:
- consented-session counts;
- completion counts.

### R4.3 Seeds

Per-mini-game seeds are generated server-side from a secret-derived deterministic method and stored.

Same assignment + same seed = same stimuli.

### R4.4 SJT and mini-game order

- SJT remains first.
- Mini-game order within a world remains fixed 1→2→3.
- World order is the only randomized/counterbalanced presentation layer.

Do not claim counterbalancing "eliminates bias".

Use wording such as:

`counterbalanced across the sample`.

### R4.5 Tests

Prove:
- row balance;
- assignment balance across N simulated consented sessions;
- concurrent allocation behavior;
- client cannot override order;
- same seed reproduces same stimuli.

STOP.

---

## GATE R5: RECRUITER VIEW AND ANTI-COPY CLEANUP

### R5.1 Recruiter view

Remove every filter, sort and search operating on:
- parameter status;
- bands;
- relationship;
- confidence;
- features;
- behavioral evidence.

Keep operational session-status filtering where needed.

List order remains submission time.

Rename evaluative headings such as "Evaluated Traits" to:

`Evidence by parameter`

### R5.2 Neutral SJT language

Show:
- SJT raw/min/max;
- band;
- random-responder distribution;
- near-ipsative note.

Do not add psychological interpretation.

Use neutral language:

`Relative emphasis in this SJT's trade-offs: higher / middle / lower.`

### R5.3 Uncalibrated game language

While uncalibrated:
- show `UNCALIBRATED` where applicable;
- show `NOT_COMPUTED` for consistency/relationship where applicable;
- use neutral styling;
- no traffic-light coloring;
- no overall fit;
- no recommendation.

### R5.4 Linter

Replace/extend the banned list to scan:
- candidate-facing strings;
- recruiter-facing strings;
- report templates;
- documentation.

The build fails on a match.

### R5.5 Anti-copy cleanup

Remove:
- clipboard writes intended to clear clipboard;
- F12/DevTools interception;
- keyboard shortcut interception;
- contextmenu blocking;
- copy/cut/dragstart blocking;
- global `user-select: none`.

Keep:
- print CSS hiding where already required;
- `user-select: none` only on interactive game surfaces where it prevents accidental drag/selection.

Verify:
- copy/cut/paste work in name/email inputs;
- keyboard navigation works;
- screen readers can read SJT text;
- browser translate/zoom/find work normally.

Do not claim browser code can prevent OS-level screenshots.

### R5.6 Tests

Must prove:
- no evidence-field sorting/filtering/search parameter is accepted;
- copy/paste works in text inputs;
- no `clipboard.write*` call exists in frontend source;
- banned-word linter passes;
- report authentication and access logging remain intact.

STOP.

---

## GATE R6: MINI-GAME MAPPING (READ-ONLY)

Using the R0 mapping, produce a table:

`code mini-game → nearest V2 task → MATCH/PARTIAL/NO MATCH → actual measured behavior → fit to parameters.json definition → known limitation`

Flag especially:
- speed-first tasks applied to social/exploratory/creative/motivational parameters;
- motor/rhythm/perceptual accuracy as dominant features where not substantively related;
- tasks missing required control conditions;
- tasks missing optional continuation where required;
- tasks whose current mechanics cannot observe the behavior claimed in V2.

Do not redesign anything.

If a task is weak, document it.

Mini-game replacement/redesign is a separate Design Sheet process.

STOP.

---

## GATE R7: DOCUMENTATION

Rewrite `RECRUITMENT_INTEGRATION.md` only after R1-R6 are approved and implemented.

Document **what the code actually does**, not what the previous architecture claimed.

Requirements:

1. Version bump and changelog.
2. Remove:
   `Status: Production / Implemented`
3. Replace status with:
   `Calibration-stage research instrument. Not validated.`
4. SJT:
   - 7 scenarios;
   - 3 acts;
   - `sjt_version` read from file;
   - exact config hashes;
   - parameter names/definitions copied verbatim from `parameters.json`.
5. World names and mini-game names match actual code, with R6 mapping.
6. Correct endpoint names.
7. Correct evidence pipeline and vocabulary.
8. State what is not implemented or not verified.
9. State that game calibration is absent until real thresholds exist.
10. State known limitations:
    - near-ipsative SJT;
    - task-level reliability is still an empirical question;
    - demand characteristics;
    - fixed SJT-first sequence;
    - no normative game thresholds;
    - device/accessibility effects require later analysis.
11. Run banned-word linter on documentation.

STOP.

---

## 9. BANNED TERMS

Build fails on a match in candidate-facing, recruiter-facing, report, or documentation text.

```text
careless
lazy
fake
faking
hypocritical
hypocrite
dishonest
lying
liar
intrinsically motivated
intrinsic motivation
unreliable
high potential
low potential
recommended for
not recommended
personality type
character
trustworthy
untrustworthy
best fit
poor fit
reject
hire
evaluated traits
```

Search case-insensitively.

---

## 10. CALIBRATION SEPARATION

Do not populate `config/feature_bands.json` with thresholds derived from the current production applicant dataset during R-series remediation.

Calibration is a separate research activity requiring:
- an owner-approved analysis plan;
- documented sample definition;
- versioned thresholds;
- provenance;
- explicit record of which data were used.

R-series may build infrastructure for future calibration.

R-series must not declare the game battery calibrated.

---

## 11. OUT OF SCOPE

Tracked but not completed by this brief:

- candidate-initiated erasure route;
- retention period owner decision;
- final candidate-facing pause control;
- remaining accessibility alternatives;
- mini-game redesign;
- calibrated game thresholds;
- construct map;
- outcomes table;
- DPDP review by a qualified advisor;
- confirmation of live production database type/persistence;
- production secret values;
- owner privacy/consent wording.

---

## 12. FINAL REPORT FORMAT

After each gate and at the end, provide:

1. Files changed, one line each with the reason.
2. Commands run with unedited output.
3. Test results: pass/fail counts per file, honestly.
4. Anything not done.
5. Anything NOT VERIFIED.
6. Questions for the owner.
7. Migration/data-safety status.
8. Confirmation that:
   - `config/sjt_items.json` is untouched;
   - `config/parameters.json` is untouched;
   - their hashes remain exactly as approved.

At final completion also report:
- repository audit summary;
- all remediation changes;
- SJT integrity;
- parameter integrity;
- game architecture;
- telemetry integrity;
- evidence logic;
- counterbalancing;
- recruiter safeguards;
- accessibility/privacy status;
- test suite status;
- remaining research limitations.

---

## 13. CORE PRINCIPLE

The implementation must remain a transparent, deterministic, calibration-stage evidence system.

It must not silently become:
- a hiring ranker;
- a personality test;
- an automated rejection system;
- an AI judge;
- a normative game score without norms;
- a system that interprets discrepancy as dishonesty or character.

The correct pipeline is:

```text
SJT judgment evidence
        +
observed behavioral evidence
        ↓
raw versioned telemetry
        ↓
deterministic features
        ↓
mini-game status
        ↓
parameter-level game evidence
        ↓
within-parameter consistency
        ↓
descriptive SJT/game relationship
        ↓
categorical confidence
        ↓
research view
```

SJT remains the primary framework.

Game evidence corroborates but is never blindly averaged with SJT.

Missing evidence is `INSUFFICIENT`, never `LOW`.

Uncalibrated game evidence is `UNCALIBRATED`, not an invented game band.

Discrepancy is an observation of this session, not an inference about motive or honesty.

All derived output remains reproducible from raw events plus versioned configuration.
