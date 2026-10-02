# ALFAAZ RECRUIT — HUMAN PLAYTEST PACKAGE & OPERATIONAL AUDIT

**Document Version:** 2.0 (Playtest Fix Pass 1)  
**Target Environment:** Local Dev / Shared Production (alfaaz-project.onrender.com)  
**Target Audience:** QA Engineers, Playtesters, Recruiters, Psychometric Reviewers  
**Commit Baseline:** Post-Playtest Remediation (`fix/alfaaz-recruit-remediation`)

---

## 1. PLAYTEST REMEDIATION OVERVIEW

Following real human playtests on the shared production deployment, Playtest Fix Pass 1 addressed usability, language, visual hierarchy, mobile readability, candidate content protection, and recruiter evidence delivery:
1. **Plain Language Standards:** All candidate-facing instructions, prompts, and options are in everyday English with sentences $\le 12$ words. All specialist jargon ("frequency", "acoustic", "resonance", "provenance", "discrepancy", "anomaly", "cadence", "ledger", "attenuate", "sotto voce") has been removed.
2. **Kashmiri Cultural Identity Preserved:** Authentic cultural and artistic motifs (papier-mâché pen cases, walnut wood loom shuttles, pashmina couriers, saffron pigments, Dal Lake pavilions, Rainawari ateliers) are retained as self-contained settings requiring zero prior knowledge.
3. **Mobile-First Shared Shell:** Every mini-game renders within a standardized layout:
   - `[TOP BAR]`: World title, task index, estimated duration.
   - `[TASK HEADER]`: Plain-language title and single-sentence subtitle.
   - `[YOUR TASK]`: Amber highlight card with explicit instructions.
   - `[LOOK AT THIS]`: Clear stimulus presentation container.
   - `[INTERACTION AREA]`: Touch-friendly targets ($\ge 44$px height/width).
   - `[PRIMARY ACTION BUTTON]`: Full-width on mobile, right-aligned on desktop.
   - `[PROGRESS FOOTER]`: Subtle status indicator.
4. **Scoped Candidate Content Protection:** Applied CSS class `.candidate-content-protected` to deter casual copy-pasting of assessment text without breaking browser accessibility or employing hostile clipboard traps.
5. **Render Cold-Start Stability:** Client-side retry mechanisms handle Render free-tier spin-up latency (30–60s) gracefully with informative retry notices.
6. **Recruiter Evidence Delivery:** Candidate cards and dossiers upgraded to present complete behavioral evidence, active extractors, quarantined notices, and descriptive task records.

---

## 2. 21-GAME SELF-CONTAINED AUDIT SUMMARY (WORKSTREAM 6)

Every mini-game has been audited and verified against five criteria:
- **No Dictionary Needed:** Everyday English vocabulary only.
- **Zero Outside Knowledge:** Self-contained instructions; no historical or technical trivia required.
- **Zero Specialist Jargon:** No acoustic, psychometric, or conservation terms.
- **Clear Interaction:** Unambiguous touch targets ($\ge 44$px) and explicit action buttons.
- **Responsive Layout:** Tested and validated on both 360px mobile viewports and desktop displays.

| Game | Candidate Title | Construct | Observations | No Dictionary | Zero Outside Knowledge | No Specialist Jargon | Touch $\ge 44$px | Responsive |
| :--- | :--- | :--- | :--- | :---: | :---: | :---: | :---: | :---: |
| **F1** | Tuning the Hall | Empathy | 6 trials | YES | YES | YES | YES | YES |
| **F2** | The Gathering Voices | Empathy | 4 trials | YES | YES | YES | YES | YES |
| **F3** | The Echo of the Room | Empathy | 3 shifts | YES | YES | YES | YES | YES |
| **A1** | The Manuscript Folios | Conscientiousness | 5 documents | YES | YES | YES | YES | YES |
| **A2** | The Fragile Leaf | Conscientiousness | 4 trials | YES | YES | YES | YES | YES |
| **A3** | The Exhibition Register | Conscientiousness | 5 records | YES | YES | YES | YES | YES |
| **C1** | The Artisan's Basket | Collaborative Spirit | 3 rounds | YES | YES | YES | YES | YES |
| **C2** | The Gallery Wall | Collaborative Spirit | 3 rounds | YES | YES | YES | YES | YES |
| **C3** | The Dual Lanterns | Collaborative Spirit | 3 breakdowns | YES | YES | YES | YES | YES |
| **E1** | The Ceramic Mosaic | Emotional Agility | 9 trials | YES | YES | YES | YES | YES |
| **E2** | The Courtyard Setup | Emotional Agility | 4 sequences | YES | YES | YES | YES | YES |
| **E3** | The Changing Conditions | Emotional Agility | 3 shifts | YES | YES | YES | YES | YES |
| **Q1** | The Curatorial Dossier | Curiosity | 4 decisions | YES | YES | YES | YES | YES |
| **Q2** | The Antiquarian’s Bench | Curiosity | 4 relics | YES | YES | YES | YES | YES |
| **Q3** | The Weaver's Chronicle | Curiosity | 3 episodes | YES | YES | YES | YES | YES |
| **CR1** | The Artisan's Assembly | Creative Initiative | 2 stages | YES | YES | YES | YES | YES |
| **CR2** | The Spatial Pivot | Creative Initiative | 3 episodes | YES | YES | YES | YES | YES |
| **CR3** | The Improvised Tool | Creative Initiative | 3 trials | YES | YES | YES | YES | YES |
| **M1** | The Ceremonial Seal | Motivation | 3 units | YES | YES | YES | YES | YES |
| **M2** | The Courtesy Sleeves | Motivation | 3–6 units | YES | YES | YES | YES | YES |
| **M3** | The Evening Registry | Motivation | 3–6 units | YES | YES | YES | YES | YES |

---

## 3. STAGE-BY-STAGE CANDIDATE EXPERIENCE

### 3.1 Onboarding & Warmup Baseline
- **Consent Notice:** Explicit voluntary participation notice, age confirmation (18+), research disclosure, and DPDP-aligned data retention policy.
- **Candidate Registration:** Name and email entry with in-memory submission rate limiting.
- **Reading & Tap Warmup:** Unobtrusive dwell and touch latency calibration.

### 3.2 Situational Judgment Test (SJT)
- **Item Count:** Exactly 7 workplace scenarios.
- **Response Format:** 4 distinct options per scenario (1 per parameter).
- **Security:** Public endpoint `/recruit/sjt/public` transmits scenarios and options only; scoring keys and construct names remain exclusively on the server.
- **Raw LF Hash:** `c098b401d37cc30b515139d307fef632047c048584e19771c0e014ef027e391d`.

### 3.3 The 7 Interactive Worlds (21 Mini-Games)

#### World 1: The Frequency (Construct: Empathy)
- **F1: Tuning the Hall (6 trials):** Listen to team member's feedback on tone balance. Adjust the slider. Scrubbing telemetry throttled to 100ms.
- **F2: The Gathering Voices (4 trials):** Review incomplete messages. Choose whether to ask for clarification, accommodate, or maintain objective.
- **F3: The Echo of the Room (3 shifts):** Set sound level. Adapt to an unexpected acoustic interruption.

#### World 2: The Archive (Construct: Conscientiousness)
- **A1: The Manuscript Folios (5 documents):** Sort antique texts into 4 folders (Poetry, History, Philosophy, Critical Studies). Optional shelf guide available.
- **A2: The Fragile Leaf (4 trials):** Examine catalog records. Identify genuine exceptions (damaged seal, duplicate date) versus normal variations.
- **A3: The Exhibition Register (5 records):** Proofread exhibition cards. Flag transcription discrepancies.

#### World 3: The Shared Canvas (Construct: Collaborative Spirit)
- **C1: The Artisan's Basket (3 rounds):** Share colored mosaic tiles with a studio partner under varying resource constraints.
- **C2: The Gallery Wall (3 rounds):** Place art tiles on a shared grid alongside a partner without claiming conflicting slots.
- **C3: The Dual Lanterns (3 breakdowns):** Balance two exhibition spotlights to eliminate harsh shadows on a centerpiece.

#### World 4: The Shifting Grid (Construct: Emotional Agility)
- **E1: The Ceramic Mosaic (9 trials):** Sort ceramic tiles by color or shape. Adapt when sorting criteria switch.
- **E2: The Courtyard Setup (4 sequences):** Arrange gallery courtyard benches. Recover calmly when a sudden interruption occurs.
- **E3: The Changing Conditions (3 shifts):** Rebalance courtyard lighting when weather conditions alter natural light.

#### World 5: The Hidden Gallery (Construct: Curiosity)
- **Q1: The Curatorial Dossier (4 decisions):** Select preservation methods for 4 historic artifacts. Voluntary reference notes available.
- **Q2: The Antiquarian’s Bench (4 relics):** Inspect physical clues on 4 historic relics to determine their origins.
- **Q3: The Weaver's Chronicle (3 episodes):** Read historical questions. Optionally consult archival notes. Select catalog attribution.

#### World 6: The Broken Tool (Construct: Creative Initiative)
- **CR1: The Artisan's Assembly (2 stages):** Build a working replacement fixture using available studio parts. Test stability.
- **CR2: The Spatial Pivot (3 episodes):** Choose an initial room floor plan. Adapt the plan when an unexpected pillar or safety rule shifts conditions.
- **CR3: The Improvised Tool (3 trials):** Pair an implement with an action method. Observe craft feedback. Refine technique.

#### World 7: The Repetition (Construct: Motivation)
- **M1: The Ceremonial Seal (3 units):** Apply wax seals to 3 required invitation envelopes. Fulfills activity requirement.
- **M2: The Courtesy Sleeves (3–6 units):** Assemble 3 required courtesy folders. Clear choice screen appears: conclude now or prepare up to 3 extra folders. Stopping is completely neutral.
- **M3: The Evening Registry (3–6 units):** Verify 3 required checklist rows. Conclude button available on every row after the minimum. Feedback messages shorten intentionally.

---

## 4. RECRUITER PORTAL SPECIFICATION

### 4.1 Candidate List Cards (5 Mandatory Badges)
1. **SJT Status:** `SJT: COMPLETE` (Green) or `SJT: PENDING` (Gray).
2. **Task Progress:** `Tasks: X/21` (Gold badge showing completed games).
3. **Evidence Status:** `Evidence: READY` (Green), `PROVISIONAL` (Amber), or `INSUFFICIENT` (Gray).
4. **Active Extractors:** `Active Extractors: 2/2` (Emerald badge for A1 and A2).
5. **Quarantined Extractors:** `19 Quarantined (Awaiting Calibration)` (Stone badge).

### 4.2 Candidate Dossier Modal (6 Structured Sections)
1. **Candidate Identity & Consent Verification:** Full name, email, submission timestamp, completion duration, and verified consent record.
2. **Seven Parameter Summary:** 7 construct cards with SJT response bands (`HIGH`, `BALANCED`, `DEVELOPING`), random responder baseline distributions, and prominent notice: *"Bands represent ipsative profile tendencies, not absolute capability rankings."*
3. **Active Behavioral Extractors (A1 & A2):** Calculated values for `classification_rule_adherence_rate`, `verification_duration_ratio`, and `exception_flagging_precision`, accompanied by the notice: *"Active extractors represent technical feasibility baselines under current laboratory parameters."*
4. **Quarantined Feature Extractors (19 Features):** Formatted table listing all 19 quarantined extractors across Worlds 1–7 with `QUARANTINED` status badge and policy reason: *"Awaiting calibration data (Design Freeze v1.1)"*.
5. **21-Game Descriptive Task Records:** Complete qualitative narrative summaries for each completed mini-game (`RECORDED` status).
6. **Data Quality Flags & Telemetry Integrity:** Detailed listing of system flags (`rapid_progression`, `excessive_dwell`, `tab_switch_count`, `duplicate_events`), total event counts, and device input modality.

---

## 5. RUNTIME STABILITY & COLD-START RETRY

Render free-tier instances spin down after inactivity. On spin-up, cold starts typically take 30–60 seconds.
- **Frontend Retries:** `loadSjtWithRetry` in `recruit.js` performs up to 3 automatic retries with 4-second exponential backoff.
- **User Notice:** When cold start is detected, a gold progress banner informs the candidate: *"Connecting to Alfaaz Recruit secure server... This may take up to 45 seconds on initial load."*
- **SJT Submission Retry:** In-flight network retries ensure candidate SJT selections are not lost if a server restart occurs during submission.

---

## 6. PRE-FLIGHT VERIFICATION GATES

Before launching a human playtest session, execute the following commands:
```bash
# 1. Banned-word psychometric linter (must report 0 violations)
python scripts/banned_word_linter.py

# 2. Acceptance check suite (must report 22/22 PASS)
python scripts/acceptance_check.py

# 3. Full Python test suite (must report 141/141 tests PASS)
python -m unittest discover tests

# 4. Frontend production build (must compile cleanly)
cd frontend && npm run build
```
