# ALFAAZ RECRUIT: ADDENDUM 1
## Agent Handoff, SJT Restore Authorization, Extractor Quarantine

**Purpose:** Final handoff from the previous coding agent to Antigravity. This document records owner decisions already made and prevents the new agent from relying on conversation memory or unverified previous-agent summaries.

---

## READ ORDER AND AUTHORITY

Read in this order:

1. `docs/ALFAAZ_RECRUIT_BRIEF.md` (V2)
2. `docs/ALFAAZ_RECRUIT_REMEDIATION_BRIEF.md`
3. `docs/ALFAAZ_RECRUIT_GO_BRIEF.md`
4. `docs/ALFAAZ_RECRUIT_ADDENDUM_1.md`

### Precedence on implementation conflicts

For implementation details:

1. This Addendum
2. GO Brief
3. Remediation Brief
4. V2 Brief
5. Existing code
6. `RECRUITMENT_INTEGRATION.md`

`RECRUITMENT_INTEGRATION.md` is non-authoritative and is known to contain errors.

### V2 invariants never overridden

Regardless of precedence:
- no invented vocabulary;
- no invented consent/privacy/legal wording;
- no runtime LLM in measurement/scoring/report generation;
- no ranking or automated selection;
- missing evidence is never LOW;
- locked parameter names/definitions remain authoritative;
- locked SJT content remains owner-controlled;
- the system remains calibration-stage and not validated.

---

# 0. KICKOFF PROMPT

Paste this into the Antigravity CLI:

```text
Read these files completely before making changes:

1. docs/ALFAAZ_RECRUIT_BRIEF.md
2. docs/ALFAAZ_RECRUIT_REMEDIATION_BRIEF.md
3. docs/ALFAAZ_RECRUIT_GO_BRIEF.md
4. docs/ALFAAZ_RECRUIT_ADDENDUM_1.md

You are taking over an existing Alfaaz Recruit repository from another coding
agent. You have no conversation memory. Treat all previous agent summaries as
UNTRUSTED until verified from git, source code, configuration, tests, and actual
command output.

Do not assume that a task is complete because a previous agent said it was.

Work through the execution sequence in this Addendum.

At every step:
- use exact path:line evidence for repository claims;
- provide exact commands and unedited output where requested;
- say NOT VERIFIED when something cannot be established;
- do not invent missing information;
- do not modify the locked SJT or parameter files except for the exact SJT
  restoration authorized in this Addendum;
- do not deploy;
- do not merge to main;
- do not rewrite git history.

The goal is to finish the already-approved remediation, not to redesign Alfaaz Recruit.

Do not create new architecture unless a concrete repository problem requires it.

Proceed through Step H, then A, then B, then the approved GO steps in order.

Stop only where this document explicitly says STOP.

At each STOP, provide the required report and wait for written approval before
continuing to the next gated step.
```

---

# 1. STANDING RULES

1. **Locked files**
   Never edit:
   - `config/sjt_items.json`
   - `config/parameters.json`
   - their backend copies

   except for the exact, byte-preserving restore explicitly authorized in Section 3.

2. **Consent/privacy/legal copy**
   Never write, paraphrase, infer, or replace:
   - consent copy;
   - privacy copy;
   - legal wording.

   Keep `__MISSING__` where currently present.

   `interim: true` remains until the owner supplies approved text.

3. **Vocabulary**
   Use only the vocabulary specified by V2 and the Remediation Brief.

   Do not introduce:
   - `OBSERVED`;
   - `GAME_ONLY`;
   - numeric confidence;
   - `OBSERVED_PARALLEL`;
   - `SJT_WITH_OBSERVED_GAMES`;
   - any invented synonym.

4. **LLM**
   No runtime LLM may participate in:
   - scoring;
   - feature extraction;
   - evidence classification;
   - confidence;
   - relationship;
   - report text.

5. **Git**
   - Work on the current branch unless explicitly instructed otherwise.
   - Do not merge to `main`.
   - Do not deploy.
   - Do not reset, rebase, amend, force-push, or otherwise rewrite history.
   - Use new commits for corrections.
   - One commit per approved step where practical.

6. **Evidence**
   Every repository claim has `path:line`.
   Every runnable verification has:
   - exact command;
   - unedited output.

7. **Tests**
   Never weaken or delete a test merely to make it pass.

8. **Project-rule conflicts**
   Older `GEMINI.md`, `AGENTS.md`, or equivalent rules are not allowed to override these briefs.
   Report conflicts.
   Do not edit project-rule files without explicit approval.

9. **No silent task redesign**
   Do not alter mini-game mechanics, stimuli, trial counts, reward structure,
   task difficulty, partner behavior, or construct targeting during this
   remediation unless a separately approved Design Sheet authorizes it.

10. **Raw data**
    Never delete, rewrite, or transform raw applicant telemetry or raw SJT responses.

11. **Generated files**
    Do not commit generated `dist/` artifacts unless the repository's deployment
    process explicitly requires tracked build output.

---

# 2. STEP H: RE-BASELINE

**READ-ONLY.**

Run:

```text
git status
git branch --show-current
git log --oneline -20
git diff --stat main...HEAD
```

Use the repository's actual main branch name if it differs.

### H1. Documentation

List files in `docs/`.

For:

`docs/ALFAAZ_RECRUIT_REMEDIATION_BRIEF_UPDATED.md`

compare it against:

`docs/ALFAAZ_RECRUIT_REMEDIATION_BRIEF.md`

If one is missing, report it.

That UPDATED file is not authoritative.

Do not delete either file.

### H2. GO brief status

For each:
- GO Step 0
- GO Step 1
- GO Step 2
- GO Step 3a
- GO Step 3
- GO Step 4
- GO Step 5
- GO Step 8
- GO Step 9
- `scripts/acceptance_check.py`

report:

`DONE / PARTIAL / NOT DONE`

with evidence.

### H3. Tests

Run the full existing test suite.

Report:
- command;
- pass/fail counts per file;
- every failure.

Do not edit tests during H.

### H4. Previous-agent claims

Verify each claim:

- anti-copy/clipboard interception exists in `frontend/src/recruit.js`;
- `admin.js` has search/filter controls and which fields they affect;
- `evidence_integrator.py` computes numeric confidence;
- `evidence_integrator.py` still assigns ALIGNED whenever usable game data exists;
- which `feature_extractor.py` functions compute from events;
- which return constants;
- whether `frontend/dist` is tracked.

Each must be:

`CONFIRMED` or `CONTRADICTED`

with `path:line`.

### H5. Shell

Report:
- operating system;
- shell;
- command equivalents if the briefs contain Unix-specific commands that do
  not work in the current shell.

Do not install WSL or new system tools without approval.

### H6. STOP

Deliver an H summary:

- repository state;
- completed GO items;
- incomplete GO items;
- test state;
- unapproved changes;
- blockers;
- NOT VERIFIED.

Then continue to Section 3 only after H is complete.

---

# 3. A: SJT RESTORE AUTHORIZATION

The previous agent changed the SJT without owner authorization.

Commit associated with the unauthorized change:

`feab2e9`

Known owner reference commit:

`8bdf3b3`

The owner-approved LF hash for `config/sjt_items.json` is:

`c098b401d37cc30b515139d307fef632047c048584e19771c0e014ef027e391d`

## A1. READ-ONLY INVESTIGATION

Report unedited output for:

```text
git log --format="%h | %an | %ad | %s%n%b" 8bdf3b3..HEAD
git show --stat feab2e9
```

Then:

- classify every changed line in `config/sjt_items.json` from `feab2e9` as
  `TEXT-ONLY` or `KEYS`;
- state whether `sjt_version` changed;
- calculate the GO-brief keys fingerprint for:
  - `8bdf3b3` version;
  - current `config/sjt_items.json`;
  - `backend/config/sjt_items.json`;
- calculate raw SHA-256 and LF-normalized SHA-256 for the `8bdf3b3`
  version;
- summarize what `feab2e9` changed in:
  - `feature_extractor.py`;
  - `frontend/src/recruit_games/`.

Do not change anything in A1.

## A2. RESTORE CONDITION

ONLY if the `8bdf3b3` historical blob has the owner-approved LF hash:

`c098b401d37cc30b515139d307fef632047c048584e19771c0e014ef027e391d`

the restore is authorized.

If the hash does not match:

**STOP.**

Do not restore.

Do not change expected hashes.

Do not edit the SJT.

Report the mismatch.

## A3. BYTE-EXACT RESTORE

Do not use a working-tree operation that can silently convert line endings.

Restore the exact Git blob bytes.

Required process:

1. extract the historical blob bytes directly from Git;
2. verify raw SHA-256;
3. verify LF-normalized SHA-256;
4. write the exact bytes to the target file;
5. verify target bytes again;
6. repeat for:
   `backend/config/sjt_items.json`.

No:
- JSON reserialization;
- formatting;
- newline conversion;
- hand edits.

Create a separate commit:

`restore owner-locked SJT (reverts unauthorized edits in feab2e9)`

Do not revert any game or extractor changes here.

## A4. LOCKED HASH CONFIG

After the authorized restoration:

- use `config/locked_hashes.json`;
- expected values must come from the owner-approved reference;
- do not derive expected hashes from the current repo files;
- remove obsolete hardcoded expected SJT/parameter hashes from `sjt_engine.py`.

Add tests that:
- both locked files match their expected hashes;
- tampering with either copy fails;
- root and backend copies are byte-identical.

Do not modify locked file content beyond the authorized restoration.

## A5. CONSENT COPY

Any interim consent/checkbox copy previously created by an agent remains:

`interim: true`

and production remains blocked.

Do not rewrite it.

### STOP

After A is complete, report:
- exact restore evidence;
- final hashes;
- commit;
- `locked_hashes.json`;
- tests;
- locked-file diff status.

Then STOP.

---

# 4. B: FEATURE QUARANTINE

This happens before any further feature/evidence implementation.

For every mini-game extractor report:

`COMPUTED_FROM_EVENTS / CONSTANT / PARTIAL`

with `file:line`.

Compare current extractor code with the `8bdf3b3` version.

For every `CONSTANT` or `PARTIAL` extractor:

- mini-game status becomes `INSUFFICIENT`;
- add informational flag:
  `feature_not_implemented`;
- value is not shown as an observed behavioral result in recruiter UI;
- display neutral `Not implemented`;
- it is never counted as usable evidence;
- do not write a replacement extractor in this step.

## B1. Sensitivity tests

For every extractor that is NOT quarantined:

Create two synthetic event streams that differ specifically in the events relevant
to the feature.

Verify:
- resulting values differ;
- expected direction/category differs where a direction is defined;
- irrelevant event changes do not spuriously determine the feature where the
  feature definition says they should be ignored.

These are pipeline/sensitivity tests.

They are not construct-validity tests.

Add the required checks to the acceptance script as checks 21 and 22.

The existing determinism tests do not replace these tests because a constant
implementation is deterministic too.

### STOP

Report:
- each extractor classification;
- quarantined extractors;
- tests;
- acceptance-script changes.

Then STOP.

---

# 5. R2: TELEMETRY INTEGRITY

Proceed only after the relevant gate approval.

## 5.1 Rate limits

Use these owner-approved provisional limits.

### Shared session-start + consent IP bucket

Across whichever endpoints actually exist:

- 10 requests/minute/IP;
- 60 requests/hour/IP.

This is ONE SHARED bucket.

### Session start

- 500 requests/hour globally.

### Consent

If a separate consent endpoint exists:
- maximum 3 requests/session.

If consent is part of atomic session creation:
- no separate consent endpoint limit applies.

### Identity

- 5/session;
- 30/hour/IP.

### SJT submit

- 3/session.

Identical resend:
- idempotent.

Different resend:
- reject;
- preserve original;
- flag non-critical SJT conflict.

### Telemetry

Per session:
- 50 requests/10 seconds;
- token-bucket burst capacity 20;
- refill 5 requests/second.

Per IP:
- 3,000 requests/minute.

Batch:
- maximum 100 events.

### Body limits

- telemetry request: 256 KB;
- every other recruitment request: 16 KB;
- one event's combined `data + state`: 4 KB.

Enforce request-size limits while reading the body, not only through
`Content-Length`.

Oversize:
- HTTP 413;
- no truncation.

### Oversized individual event

Client checks each event when created.

If batch gets 413:
- split and retry.

If one event alone is too large:
- remove it from the retry queue;
- record:
  `event_oversize`
- non-critical;
- do not store the oversized raw payload itself;
- do not retry indefinitely.

### Event cap

- hard cap: 50,000 telemetry events/session;
- informational at 25,000:
  `events_high_volume`;
- cap:
  `events_cap_reached`.

A batch that would cross 50,000:
- reject whole batch;
- never partially accept.

The cap response must be a documented non-retryable status,
not 429 and not 5xx.

After that response:
- telemetry transmission becomes terminal for that session;
- client does not retry indefinitely;
- buffered unsent events are not silently discarded;
- session is finalized as data-limited.

### Telemetry eligibility

Accept only while:
- session status is `ACTIVE`;
- within 24 hours of session creation.

No grace period.

Client must await final telemetry acknowledgement before:

`POST /recruit/complete`

Report all session statuses and confirm exactly which one spans the game period.

### Flush

Flush:
- approximately every 2–3 seconds;
- OR at 50 buffered events;
- plus mini-game end;
- SJT end;
- visibility hidden;
- pagehide.

Report actual configured interval.

## 5.2 Trusted proxy

Use only the hosting platform's trusted proxy configuration.

Do not trust arbitrary forwarded headers.

Use the platform's actual client-IP entry, not an attacker-controlled left-most
forwarded value.

Unit test:
- trusted header;
- untrusted header;
- spoofed forwarded values.

Check for any Vercel rewrite affecting the API path.

Production verification is `NOT VERIFIED` until owner manually confirms it.

## 5.3 CORS

Replace wildcard origins with configured exact origins.

Report the preview-origin pattern for owner confirmation.

Restrict methods and headers to those actually used.

Do not modify older project-rule files merely to reconcile CORS.

## 5.4 Reload and persistence

Persist in `sessionStorage`:
- session ID;
- next sequence;
- segment ID;
- current world;
- current mini-game;
- assessment phase;
- active/incomplete mini-game state.

Also persist unsent telemetry separately so a reload cannot silently destroy
events that were created but not acknowledged.

On reload:
- recover last server sequence;
- continue at last acknowledged sequence + 1;
- increment segment;
- emit `segment_start`;
- do not compute duration across segments.

If reload occurs inside an active mini-game:
- mark that mini-game `INSUFFICIENT`;
- flag `interrupted`;
- resume only at a completed mini-game boundary.

## 5.5 Sequence conflicts

Duplicate `(session_id, seq)`:
- identical payload hash → ignore idempotently;
- different payload → retain original and flag `seq_conflict`.

`seq_conflict` is session-critical.

Sequence gaps:
- detect at ingest;
- detect during recompute;
- record missing ranges.

A gap inside a mini-game affects that mini-game as defined in R3.

## 5.6 Mini-game window

A mini-game window is defined in sequence space.

A gap is inside a mini-game if its missing range overlaps:

`[start_seq, end_seq]`

If `minigame_end` is missing:
- window continues to next `minigame_start`;
- affected mini-game is `INVALID`.

## 5.7 Data-quality criticality

CRITICAL:

- `seq_conflict`
- `events_cap_reached`

Both are session-critical.

Either causes:

`confidence = LIMITED`

for every parameter.

Informational/non-critical:

- `seq_gap` outside a mini-game window;
- `tab_hidden_extended`;
- `rate_limited_retry`;
- `events_high_volume`;
- `accessibility_latency_excluded`;
- `segment_resumed`;
- `sjt_missing`;
- SJT conflicting-resubmission flag;
- `event_oversize`.

`interrupted`:
- mini-game = `INSUFFICIENT`.

`invalid_timing`:
- mini-game = `INVALID`.

`seq_gap` inside mini-game:
- affected mini-game = `INVALID`.

Any other pre-existing flag not listed:
- report it;
- treat as NON-critical until owner classifies it.

### STOP

After R2 changes and tests, STOP.

---

# 6. R3: EVIDENCE LOGIC

Implement exact categorical logic.

## 6.1 Mini-game statuses

Only:

- `USABLE`
- `INSUFFICIENT`
- `INVALID`

Never turn insufficient/invalid evidence into LOW.

## 6.2 Game evidence

Minimum usable mini-games:

`2`

One usable mini-game is not enough for parameter-level game evidence.

If fewer than 2 are usable:

`game_status = INSUFFICIENT`

If at least 2 are usable:
`game_status = USABLE`

Game band:
- calibrated → configured band;
- uncalibrated → `UNCALIBRATED`.

## 6.3 Consistency

While uncalibrated:

`NOT_COMPUTED`

Never:
- `CONSISTENT`;
- `VARIED`.

When calibrated:
- map LOW=0, MODERATE=1, HIGH=2;
- calculate range;
- `range <= 1` → `CONSISTENT`;
- otherwise → `VARIED`.

## 6.4 Relationship

If SJT missing:

`INSUFFICIENT`

and add informational:

`sjt_missing`

If SJT present but game evidence insufficient:

`SJT_ONLY`

If game evidence exists but game calibration is absent:

`NOT_COMPUTED`

Only when both SJT and calibrated game evidence exist:
- same ordinal band → `ALIGNED`;
- adjacent → `PARTLY_ALIGNED`;
- HIGH vs LOW → `DIFFERENT`.

SJT and game are NEVER averaged.

## 6.5 Confidence

Categorical only.

If:
- SJT missing;
- <=1 usable mini-game;
- critical flag exists;

then:

`LIMITED`

If:
- 3 usable;
- consistency `CONSISTENT`;
- no critical flag;

then:

`SUBSTANTIAL`

Otherwise:

`MODERATE`

While game evidence is uncalibrated:
- confidence can never exceed `MODERATE`.

## 6.6 Derived-data versioning

Derived records are INSERT-ONLY.

Do not update old derived records in place.

Each new derived result stores:
- `spec_version`;
- `sjt_version`;
- `scoring_version`;
- `feature_version`;
- `config_hash`.

A recomputation:
- inserts new rows;
- marks/links the previous version as superseded without rewriting its historical content.

There must be exactly one current non-superseded derived result per derivation
scope.

## 6.7 Golden end-to-end fixture

Build one deterministic test-only session with:
- complete SJT;
- known telemetry for all 21 mini-games;
- known status;
- known accessibility mode;
- known quality flags.

Run twice.

Require byte-identical derived output.

## 6.8 Error-path exposure

Verify server-only SJT keys, weights, feature thresholds and scoring annotations
are absent from:
- success responses;
- validation errors;
- 4xx responses;
- 5xx responses;
- debug responses;
- serialized client errors;
- production frontend bundle.

### STOP

Report:
- exact evidence logic;
- status vocabulary;
- consistency;
- relationship;
- confidence;
- tests;
- migration/versioning behavior.

Then STOP.

---

# 7. R4: WORLD ORDER

Implement the approved 14-row balanced design.

Verify:
- every world appears exactly twice in every position;
- intended adjacent-pair balance;
- assignment uses least-used consented row;
- ties use secure randomness;
- concurrent assignment cannot corrupt balance;
- order is stored;
- client cannot override it.

SJT remains first.

Mini-games within a world remain fixed 1→2→3.

Stimuli use server-generated deterministic seeds.

Never claim counterbalancing eliminates bias.

Say:

`counterbalanced across the sample`.

### STOP

Report tests and assignment behavior.

STOP.

---

# 8. R5: RECRUITER VIEW / ACCESSIBILITY / ANTI-COPY

## Recruiter view

Remove evidence-field:
- sorting;
- filtering;
- searching.

Operational session-status filtering may remain.

Use:

`Evidence by parameter`

instead of:

`Evaluated Traits`

Do not display:
- overall fit;
- recommendation;
- ranking;
- traffic-light evidence;
- psychological interpretation.

While uncalibrated:
- game band = `UNCALIBRATED`;
- relationship = `NOT_COMPUTED`;
- consistency = `NOT_COMPUTED`.

## Anti-copy cleanup

Remove:
- clipboard clearing;
- DevTools/F12 interception;
- keyboard shortcut interception;
- context menu blocking;
- copy/cut/dragstart blocking;
- global `user-select:none`.

Keep:
- print hiding if required;
- `user-select:none` only on interactive game surfaces where it prevents
  accidental selection.

Verify:
- normal copy/paste in inputs;
- keyboard navigation;
- screen-reader access;
- browser zoom/find/translate.

### STOP

Report all recruiter safeguards and accessibility effects.

STOP.

---

# 9. R6: MINI-GAME MAPPING

READ-ONLY.

Map every implemented mini-game to:
- nearest V2 task;
- MATCH / PARTIAL / NO MATCH;
- actual feature behavior;
- relation to `parameters.json`;
- known limitation.

Flag:
- speed-dominant social tasks;
- motor/rhythm/perceptual features where inappropriate;
- missing control conditions;
- missing optional continuation;
- any task that cannot observe what V2 says it should observe.

Do not redesign tasks.

Any redesign requires approved Design Sheet.

### STOP

---

# 10. R7: DOCUMENTATION

Only after previous steps are complete:

Rewrite `RECRUITMENT_INTEGRATION.md` to document actual code.

Include:
- 7 SJT scenarios;
- 3 acts;
- actual `sjt_version`;
- parameter names/definitions from `parameters.json`;
- actual 7 worlds;
- actual 21 mini-games;
- actual endpoints;
- actual evidence pipeline;
- actual status vocabulary;
- actual limitations;
- actual unverified deployment items.

Do not claim:
- validation;
- predictive validity;
- objective personality measurement;
- calibrated game norms if they do not exist.

Run the banned-word linter.

### STOP

---

# 11. CALIBRATION SEPARATION

Do not populate game thresholds from the current live applicant sample during
these remediation steps.

Calibration is a separate research activity with:
- approved analysis plan;
- defined sample;
- versioned thresholds;
- provenance.

Do not declare the game battery calibrated.

---

# 12. FINAL REPORT

At every step report:

1. Files changed and why.
2. Exact commands + unedited output.
3. Tests and pass/fail counts.
4. Anything not done.
5. Anything NOT VERIFIED.
6. Questions for owner.
7. Data/migration safety.
8. Confirmation that locked SJT and parameter files remain untouched, except
   the explicitly authorized byte-exact SJT restoration.

At final completion report:
- repository baseline;
- remediation changes;
- SJT integrity;
- parameter integrity;
- 7 worlds / 21 mini-games;
- telemetry integrity;
- evidence logic;
- counterbalancing;
- recruiter safeguards;
- accessibility;
- privacy/security;
- tests;
- remaining limitations.

---

# 13. FINAL OPERATING PRINCIPLE

Do not keep redesigning the system.

The system being implemented is:

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
research evidence view
```

SJT remains primary.

Games corroborate but are never blindly averaged with SJT.

Missing evidence is never LOW.

Uncalibrated games are not assigned invented normative bands.

Discrepancy is not interpreted as dishonesty, character, or motive.

Raw data remains reproducible.

The repository, locked config, tests, and approved briefs are the source of truth.
