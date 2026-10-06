# Alfaaz Recruit System — Master System Specification & Technical Documentation

**System Version:** 2.0 (Candidate Core: 14 Activities · Research Bank: 7 Activities)  
**Architecture:** Vite MPA (Frontend) + FastAPI / SQLModel (Backend)  
**Date:** October 2026  
**Status:** Computationally validated · 186/186 automated tests passing · Empirical psychometric validation pending  

---

## 1. Executive Summary & Design Philosophy

**Alfaaz Recruit** is an exploratory, multi-method creative candidate assessment system built for the Alfaaz Collective. It evaluates candidate workplace and collaborative tendencies through a grounded, dual-methodology framework:

1. **Situational Judgment Scenarios (SJT):** 7 deliberate, qualitative trade-off dilemmas drawn from studio life and collective stewardship.
2. **Interactive Activity Telemetry (GBA):** 14 lightweight, self-paced simulation exercises spanning seven thematic studio "Worlds", capturing fine-grained behavioural telemetry without arcade or speed pressure.

### Psychometric & Ethical Safeguards
- **Provisional Within-Person Relative Profile:** Alfaaz Recruit reflects the *relative emphasis* among dimensions within an individual candidate's own responses, **not** normative percentile ranks, clinical psychometrics, or automated hiring pass/fail filters.
- **Rule Zero (Zero Construct Exposure):** All candidate-facing text (prompts, instructions, tutorials, scenario titles) is strictly behavioral and craft-grounded. Candidate interfaces never reveal internal psychometric construct names (e.g., Empathy, Conscientiousness, Neuroticism).
- **Aesthetic Alignment:** Strictly adheres to the Alfaaz Collective Manifesto ([`GEMINI.md`](../GEMINI.md)): total visual minimalism, warm ivory/paper backgrounds (`#faf8f5`), hairline borders, Alegreya serif typography, Urdu script flourishes in the top right, and high-legibility touch targets.

---

## 2. The Seven Evaluated Dimensions & World Mapping

The assessment framework measures seven core dimensions. Each dimension is paired with an interactive studio world and a dedicated situational judgment scenario:

| # | Dimension (Internal Construct) | Studio World | World Theme | Candidate Core (14 Games) | Research Bank (7 Games) |
|---|--------------------------------|--------------|-------------|---------------------------|-------------------------|
| 1 | **Empathy** | **W1: The Frequency** (`آواز`) | Sound & Acoustics | **F1:** Cue Detection<br>**F2:** Ambiguous Cue | **F3:** Context Change |
| 2 | **Conscientiousness** | **W2: The Archive** (`دستاویز`) | Manuscripts & Preservation | **A1:** Classification<br>**A2:** Exception Handling | **A3:** Quality Control |
| 3 | **Collaborative Spirit** | **W3: The Shared Canvas** (`مشترکہ کینوس`) | Artisan Workshop | **C1:** Resource Cooperation<br>**C2:** Coordination | **C3:** Collaboration Repair |
| 4 | **Emotional Agility** | **W4: The Shifting Grid** (`بدلتا گرڈ`) | Mosaic & Layout | **E1:** Rule Shift<br>**E2:** Setback Recovery | **E3:** Changing Conditions |
| 5 | **Curiosity** | **W5: The Hidden Gallery** (`پوشیدہ گیلری`) | Exhibition Curating | **Q1:** Optional Discovery<br>**Q2:** Mystery Exploration | **Q3:** Information Integration |
| 6 | **Creative Initiative** | **W6: The Broken Tool** (`ٹوٹا آلہ`) | Material Assembly | **CR1:** Open Construction<br>**CR3:** Unspecified Tool Use | **CR2:** Constraint Shift |
| 7 | **Motivation** | **W7: The Repetition** (`دہرائی`) | Ceremony & Readiness | **M1:** Minimum Completed<br>**M2:** Optional Continuation | **M3:** Persistence Under Reduced Feedback |

---

## 3. Battery Structure: Candidate Core vs. Research Bank

### V2 Candidate Core (14 Activities)
The core candidate experience consists of exactly 14 interactive tasks (2 per world). Every candidate in standard assessment flows completes these 14 activities:
- **W1:** F1 (Tuning the Hall: 5 trials), F2 (The Gathering Voices: 3 trials)
- **W2:** A1 (The Manuscript Folios: 4 observations), A2 (The Fragile Leaf: 4 observations)
- **W3:** C1 (The Artisan's Basket: 2 rounds), C2 (The Gallery Wall: 2 rounds)
- **W4:** E1 (The Ceramic Mosaic: 8 trials), E2 (The Courtyard Setup: 3 sequences)
- **W5:** Q1 (The Curatorial Dossier: 3 records), Q2 (The Antiquarian's Bench: 3 relics)
- **W6:** CR1 (The Artisan's Assembly: 2 stages), CR3 (The Improvised Tool: 2 trials)
- **W7:** M1 (The Ceremonial Seal: 2 mandatory units), M2 (The Courtesy Sleeves: 2 mandatory units)

### Research Bank (7 Activities)
Games **F3, A3, C3, E3, Q3, CR2, M3** are reserved in the Research Bank for exploratory research pilots. They remain unattempted during candidate core sessions and are tagged as `NOT_DERIVED · Unattempted · Reserved in Research Bank`.

---

## 4. Mathematical Calculations & Psychometric Formulae

All metrics map onto a common within-person relative scale $[0.0, 1.0]$.

### 1. Situational Judgment Relative Evidence ($sjt\_relative$)
Derived from owner-locked scenario scoring weights:
$$sjt\_relative = \frac{raw - min}{span} \in [0.0, 1.0]$$
Where:
- $raw$: Candidate's scenario option score.
- $min$: Theoretical minimum score for that scenario.
- $span = max - min$: Theoretical range.

### 2. Game-Based Relative Evidence ($game\_relative$)
Computed deterministically from candidate micro-task telemetry by aggregating across usable candidate-core games with renormalized weights:
$$game\_relative = \sum_{g \in \text{usable}} w_g^* \cdot score_g \in [0.0, 1.0]$$
Where $w_g^* = \frac{w_g}{\sum_{u \in \text{usable}} w_u}$.

### 3. Cross-Method Delta ($\Delta$)
Measures the absolute difference between stated situational trade-offs and observed interactive simulation behavior:
$$\Delta = |sjt\_relative - game\_relative| \in [0.0, 1.0]$$

### 4. Relationship Classification
Categorizes cross-method congruence between stated situational responses and observed task behavior:
- $\Delta \le 0.15 \implies$ **`ALIGNED`** (The two evidence channels show strong convergence)
- $0.15 < \Delta \le 0.30 \implies$ **`PARTLY_ALIGNED`** (Moderate difference between situational responses and observed task behavior)
- $\Delta > 0.30 \implies$ **`DIFFERENT`** (The two evidence channels diverge substantially; this difference may be useful to explore during interview)
- Missing or insufficient game observations $\implies$ **`NOT_ENOUGH_EVIDENCE`**

### 5. Monotonic Confidence Invariant & Computational Confidence Rules

> [!NOTE]
> **Internal Evidence-Confidence vs. Empirical Psychometrics:**
> The confidence bands (`SUBSTANTIAL`, `MODERATE`, `LIMITED`) represent **internal evidence-confidence categories** produced deterministically by current computational heuristics (evaluating observational completeness, multi-activity consistency, and cross-method agreement). They are **not** empirically validated psychometric confidence levels or measurement reliability coefficients. In particular, meeting the internal threshold of 2 or 3 usable games satisfies computational evidence sufficiency under current rules, but does **not** imply empirically established measurement reliability or high psychometric confidence. Formal empirical calibration (normative sample validation, test-retest reliability, and construct validity) is still required before these confidence bands can be interpreted as established psychometric properties.

Under current V2 computational behavior, evidence confidence enforces a strict non-increasing monotonicity rule: **a larger Delta must NEVER increase confidence**.

- **Computational Base Confidence Rules:**
  - $\ge 2$ usable games with high consistency: `SUBSTANTIAL` internal evidence
  - $2$ usable games with moderate spread: `MODERATE` internal evidence
  - $< 2$ usable games or missing situational judgment responses: `LIMITED` internal evidence
- **Delta Degradation Rules:**
  - $\Delta \le 0.15$: Retains base computational confidence category.
  - $0.15 < \Delta \le 0.30$: Computational confidence category cannot exceed `MODERATE`.
  - $\Delta > 0.30$: Computational confidence category is strictly downgraded to `LIMITED`.
- **Integrity Overrides:** Critical flags (`seq_gap`, `seq_conflict`, `invalid_timing`, `events_cap_reached`) always force `LIMITED`.

### 6. Profile Completeness
- `COMPLETE`: Both SJT and Game relative evidence are derived across all 7 dimensions.
- `SJT_ONLY`: SJT completed; game activities not yet completed or insufficient.
- `PARTIAL`: Incomplete mix across dimensions.
- `INSUFFICIENT`: Neither method meets evidentiary thresholds.

---

## 5. Candidate Dossier Interpretation Engine & Within-Person Parameter Ranking

Section 2 of the Research Dossier dynamically ranks the 7 evaluated parameters from **highest to lowest** relative emphasis. This ordering provides immediate readability of the candidate's top within-person relative emphasis profile without altering underlying mathematical calculations or introducing cross-candidate ranking:

```
┌───┬─────────────────────────────────┬─────────┬──────────┬───────┬──────────────┬────────────┬────────────────────────────────────────────────────────┐
│ # │ Dimension & Observed Context    │ SJT Rel │ Game Rel │ Delta │ Relationship │ Confidence │ Interpretation                                         │
├───┼─────────────────────────────────┼─────────┼──────────┼───────┼──────────────┼────────────┼────────────────────────────────────────────────────────┤
│ 1 │ Conscientiousness               │  0.75   │   0.72   │ 0.03  │ ALIGNED      │ SUBSTANTIAL│ The two evidence channels show strong convergence     │
│   │ handled 4 of 4 observations     │         │          │       │              │            │ (Δ 0.03). Situational response pattern aligns with     │
│   │                                 │         │          │       │              │            │ observed task behavior. [Substantial Evidence]        │
├───┼─────────────────────────────────┼─────────┼──────────┼───────┼──────────────┼────────────┼────────────────────────────────────────────────────────┤
│ 2 │ Collaborative Spirit            │  0.85   │   0.35   │ 0.50  │ DIFFERENT    │ LIMITED    │ The two evidence channels diverge substantially        │
│   │ completed 2 of 2 rounds         │         │          │       │              │            │ (Δ 0.50). Situational response pattern was higher than │
│   │                                 │         │          │       │              │            │ task behavior; explore in interview. [Limited Evidence]│
└───┴─────────────────────────────────┴─────────┴──────────┴───────┴──────────────┴────────────┴────────────────────────────────────────────────────────┘
```

### Ranking Hierarchy & Multi-Mode Controls:
The Research Dossier equips recruiters with three non-destructive, single-click ranking modes right above the Evidence by Parameter table:
1. **Written (SJT) Mode (Default):** Ranks descending by `SJT_relative` to display reflective situational judgment response priorities. Secondary tie-breaker is `Game_relative`, followed by alphabetical stability.
2. **Hands-On (Games) Mode:** Ranks descending by `Game_relative` to instantly elevate and spotlight observed practical task execution (especially in cases where observed task behavior was higher than situational response patterns).
3. **Difference (Δ) Mode:** Ranks descending by continuous `cross_method_delta` ($|SJT_{relative} - Game_{relative}|$) to surface the largest divergences between stated situational responses and observed task behavior (ideal interview exploration probes).

### Critical Edge-Case Safeguards:
- **Incomplete / Missing Game Data:** When games are unattempted or drop below the 2-game threshold, `Game_relative` remains `—` (Not Available); missing rows gracefully sort to the bottom and the "Hands-On" button is disabled.
- **SJT-Only Session:** Defaults cleanly to SJT sort; Game and Delta buttons are disabled with explanatory tooltips.
- **Game-Only Session:** Automatically switches active sort to "Hands-On (Games)".
- **Exact Numerical Ties:** Broken first by the alternate instrument score, then by alphabetical parameter name to guarantee deterministic ordering across page reloads.
- **Zero Calculation Alteration:** All raw metrics, normalized relative scores, cross-method deltas, relationship bands, and confidence tags remain 100% immutable. Ranking is strictly a presentation and readability layer for recruiters.

### Handled Combinations & Interpretive Boundaries:
The interpretation engine translates numeric combinations into qualitative observational notes for recruiters. Crucially, **cross-method Delta does not prove honesty, deception, lying, character defects, competence, or latent psychological traits**; it solely describes the degree of convergence or divergence between two distinct observational channels: **stated situational responses** and **observed task behavior**.

1. **Single-Method / Incomplete:**
   - Summarizes available evidence from stated situational judgment responses ($sjt\_relative$) or observed task behavior ($game\_relative$) while explicitly noting that cross-method corroboration is pending.
2. **Aligned ($\Delta \le 0.15$):**
   - *Both relatively elevated ($\ge 0.55$):* The two evidence channels show strong convergence; situational judgment response pattern aligns with observed task behavior.
   - *Both moderate ($0.38 - 0.54$):* The two evidence channels show balanced convergence; steady, moderate relative emphasis across both situational responses and task activities.
   - *Both lower ($< 0.38$):* The two evidence channels show consistent lower relative emphasis within the candidate's personal profile.
3. **Partly Aligned ($0.15 < \Delta \le 0.30$):**
   - *$SJT > Games$:* Situational judgment response pattern was moderately higher than observed simulation behavior; this difference may be useful to explore during interview.
   - *$Games > SJT$:* Observed task behavior was moderately higher than the situational response pattern; this practical engagement may be useful to explore during interview.
4. **Different ($\Delta > 0.30$):**
   - *$SJT \gg Games$:* The two evidence channels diverge substantially; the situational response pattern was higher than observed task behavior. This difference may be useful to explore during interview (e.g., exploring contextual constraints or unfamiliarity with task format).
   - *$Games \gg SJT$:* The two evidence channels diverge substantially; the observed task behavior was higher than the situational response pattern. This difference may be useful to explore during interview (e.g., exploring unexpressed practical inclinations).

---

## 6. Frontend Architecture & Multi-Page Flow

The frontend is a lightweight **Vite Multi-Page Application (MPA)** using vanilla ES modules, located in `frontend/src/` (built to `frontend/dist/`):

### Candidate Assessment Journey (`recruit.html` / `recruit.js`):
1. **Consent Screen (`consent`):** Explicit study information, data protection terms, voluntary participation checkboxes.
2. **Identity Verification (`identity`):** Full name, email, contact info.
3. **Accessibility Preferences (`accessibility`):** High Contrast Display, Dyslexia-Friendly Typography, Reduced Motion (settings modify presentation without affecting scores).
4. **Screen & Rhythm Baseline (`warmup`):** 3-tap device latency check to calculate motor baselines and screen viewport classification.
5. **Section 1 Briefing (`sjt_briefing`):** Orientation card explaining the 7 situational scenarios, how to answer, self-pacing, and reassurance of no trick questions.
6. **Section 1: Situational Judgments (`sjt`):** 7 scenarios. Top left English title, top right Urdu calligraphy, prominent hero card, "Your Task" banner right before options, keyboard navigation (`1`–`4`, `Enter`).
7. **Section 2 Briefing (`gba_briefing`):** Orientation card explaining the 7 studio areas, 14 interactive tasks, and reassurance of zero arcade/speed pressure.
8. **Section 2: Game Battery (`games`):** Dispatches through `recruit_games/index.js` (`renderGameShell`) into 7 worlds with child-friendly step-by-step clarity.
9. **Completion Screen (`complete`):** Reassurance of completion, verification ID, and feedback confirmation.

### Recruiter & Research Analytics (`research.html` / `research.js`):
- **Applicant Registry:** Searchable table of sessions with completion state, duration, and telemetry count.
- **Candidate Dossier:** 
  - Section 1: Candidate & Session Overview.
  - Psychometric Safeguard Notice.
  - Section 2: Evidence by parameter table with live `SJT Rel`, `Game Rel`, `Delta`, `Relationship`, `Confidence`, and `Interpretation`.
  - Section 3: Interactive Activity Behavioral Records split into Core Battery (14) and Research Bank (7).
  - Telemetry Event Inspector & Re-analysis trigger.

---

## 7. Backend Architecture & API Routes

The backend is built with **FastAPI** and **SQLModel** (SQLite in development, PostgreSQL ready), located in `alfaaz-recruit-system/backend/`:

### Key Endpoints:
- `POST /recruit/session/start`: Initializes session and binds identity.
- `POST /recruit/accessibility`: Records accessibility preferences (`high_contrast`, `dyslexia_font`, `reduced_motion`).
- `POST /recruit/warmup`: Saves baseline tap latency and viewport metrics.
- `GET /recruit/sjt/public`: Serves public SJT prompts (zero exposure of internal construct scoring keys).
- `POST /recruit/sjt/submit`: Validates and scores situational responses.
- `POST /recruit/telemetry`: High-throughput ingestion of client behavioral telemetry events with payload size limits (256 KB) and sequential integrity validation.
- `POST /recruit/session/complete`: Marks session as complete and initiates background feature extraction.
- `GET /recruit/research/sessions`: Authenticated recruiter list of applicant sessions.
- `GET /recruit/research/sessions/{sessionId}`: Generates or recomputes the full multi-method dossier.

### Database Models (`recruit_system/models/recruit.py`):
- `DBSession`: Tracks session status, start/end timestamps, duration, and battery version.
- `DBApplicantIdentity`: Pseudonymous candidate identity records.
- `DBConsentRecord`: Immutable timestamped consent agreements.
- `DBTelemetryEvent`: Sequential, append-only behavioral telemetry events.
- `DBFeature`: Extracted behavioral feature metrics per mini-game.
- `DBEvidence`: Integrated cross-method relative scores, deltas, and confidences.
- `DBGameScore`: Scored mini-game records with status and observation counts.
- `DBDataQualityFlag`: Integrity warnings (`seq_gap`, `invalid_timing`, etc.).
- `DBRecruiterAccessLog`: Audit log of recruiter dossier views.

---

## 8. Verification & Test Suite

The system includes a 186-test automated verification suite covering end-to-end telemetry lineage, scoring immutability, fail-closed security, and monotonic delta confidence:

```bash
# Execute full backend test suite
python -m pytest alfaaz-recruit-system/backend/tests/ -o pythonpath=alfaaz-recruit-system/backend
```

**Results:**
- **Software & Computational Validation:** 186 passed, 0 failed (verifies runtime pipelines, scoring algebra, integrity flags, and deterministic parameter ranking).
- **Empirical Psychometric Validation:** Pending (normative sample calibration, construct validity, test-retest reliability, and predictive validity have not yet been established).
- **Frontend Build:** `npm run build` cleanly bundles via Vite in under 2 seconds.
- **Fail-Closed Guarantees:** Invalid or interrupted telemetry never fabricates high scores; unattempted games remain strictly `NOT_DERIVED`.
