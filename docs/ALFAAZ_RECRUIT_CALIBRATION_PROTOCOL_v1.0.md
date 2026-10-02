# ALFAAZ RECRUIT — EMPIRICAL CALIBRATION PROTOCOL v1.0

**Status:** LOCKED MASTER SPECIFICATION  
**Effective Date:** October 2026  
**Document Version:** 1.0  
**Authority:** Alfaaz Collective Psychometric & Engineering Review  

---

## 1. PURPOSE AND SCOPE

This document defines the authoritative protocol for normative data collection, psychometric calibration, quality control gating, and extractor quarantine release for **Alfaaz Recruit**.

Alfaaz Recruit evaluates seven core behavioral constructs across seven narrative worlds comprising 21 behavioral micro-games and a 7-scenario Situational Judgment Test (SJT). The instrument operates under strict psychometric principles: primitive observation logging without client-authored interpretation, deterministic feature extraction, and empirical norming prior to high-stakes selection use.

---

## 2. RAW TELEMETRY RETENTION AND FORMAT

### 2.1 Raw Telemetry Architecture
All candidate interactions are captured as discrete primitive telemetry events. In accordance with the R2 Telemetry Architecture:
1. **Client Autonomy Restricted to Primitives:** The client authors only primitive observations:
   - `event_id` / `seq` (strictly monotonic integer per session)
   - `segment_id` (task segment)
   - `t_ms` (high-precision timestamp via `performance.now()`)
   - `screen`, `game_world`, `mini_game`, `trial`
   - `action`, `input_type`
   - `task_def_version` (strictly `"1.0"`)
   - Primitive payload fields within `data` (e.g., `stimulus_id`, `choice`, `slider_position_raw`, `input_modality`).
2. **Server-Side Sanitization & Allowlist:**
   - Any client-authored derived, evaluative, or psychological metrics (e.g., `correct`, `is_correct`, `rule`, `condition_id`, `perseverative_choice`, `dwell_ms`, `response_latency_ms`) are strictly stripped and recorded under `DBDataQualityFlag` with `flag="forbidden_client_field_detected"`.
   - Any unknown fields outside `ALLOWED_EVENT_DATA_FIELDS` are stripped and recorded under `DBDataQualityFlag` with `flag="unknown_client_field_detected"`.
   - Continuous pointer streams (`mousemove`, `pointermove`, `touchmove`, `continuous_drag`) are dropped defensively before sequence accounting and storage.
3. **Lossless Persistent Storage:** All accepted discrete telemetry events are stored in the PostgreSQL `telemetry_events` table with immutable sequence ordering.

---

## 3. PARTICIPANT INCLUSION AND EXCLUSION CRITERIA

Data quality filtering must be executed prior to calibration sample compilation. Any candidate session meeting exclusion triggers is tagged as `INVALID` or `DATA_LIMITED` and excluded from normative distribution calculation.

### 3.1 Hard Session Exclusion Triggers
A session is excluded from the calibration dataset if any of the following conditions occur:
1. **Consent Invalidation:** Missing or incomplete `DBConsentRecord`, or lack of age confirmation (under 18).
2. **Telemetry Cap Reached (`events_cap_reached`):** Session reached the hard cap of 50,000 events, indicating script automation, client loop fault, or abusive event flooding.
3. **Sequence Corruption (`seq_conflict`):** Transmission of differing payloads for the same sequence number, indicating payload tampering or network race conditions.
4. **Severe Sequence Gaps (`seq_gap`):** Missing sequence blocks exceeding 5 consecutive events in any active behavioral micro-game.
5. **Specification Mismatch:** Telemetry events lacking valid `task_def_version == "1.0"` (`missing_task_def_version` or `invalid_task_def_version`).
6. **Incomplete Battery Completion:** Abandonment prior to completing all 7 worlds (F1 through M3) and the 7-scenario SJT.
7. **Active Duration Outliers:** Total active task duration (`calculate_active_duration_ms`) falling below 6 minutes (bot or rushed non-engagement) or exceeding 90 minutes (abandoned session).

### 3.2 Diagnostic Flags (Retained with Observation Tagging)
Sessions with non-fatal flags (`events_high_volume`, minor `event_oversize`, isolated `forbidden_client_field_detected`) are retained for sensitivity analysis but tagged for secondary review.

---

## 4. SAMPLE SIZING AND CALIBRATION MILESTONES

Calibration proceeds through three sequential cohorts:

| Milestone Stage | Sample Size ($N$) | Cohort Composition | Primary Objective |
| :--- | :--- | :--- | :--- |
| **Phase 1: Pilot Verification** | $N = 50$ | Controlled volunteer playtesters & internal staff | Technical telemetry verification, distribution range verification, latency baseline check. |
| **Phase 2: Exploratory Calibration** | $N = 250$ | Broad candidate pilot pool | Item discrimination analysis, item difficulty calculation, initial reliability ($r_{xx}, \alpha$), baseline feature distributions. |
| **Phase 3: Confirmatory Norming** | $N = 1,000$ | Representative applicant population | Confirmatory Factor Analysis (CFA), percentile norm tables, subgroup fairness & differential item functioning (DIF) analysis. |

---

## 5. PSYCHOMETRIC RELIABILITY AND CONSTRUCT VALIDITY

### 5.1 Situational Judgment Test (SJT) Calibration
1. **Scoring Scheme:** 7 scenarios, 4 options each, scored across the 7 constructs according to `sjt_items.json` (SHA-256: `c098b401d37cc30b515139d307fef632047c048584e19771c0e014ef027e391d`).
2. **Scoring Bands:**
   - Current: Mathematical exact-thirds of theoretical score ranges.
   - Post-Calibration: Empirical tertiles (Low: $< 33\text{rd}$ percentile, Moderate: $33\text{rd} - 66\text{th}$ percentile, High: $> 66\text{th}$ percentile) derived from Phase 2 ($N \ge 250$).
3. **Reliability Metrics:**
   - Cronbach's $\alpha$ across construct scoring dimensions (target $\alpha \ge 0.70$).
   - Standard Error of Measurement (SEM) computed for each parameter scale.

### 5.2 Behavioral Micro-Game Metrics
1. **A1 (Document Classification):**
   - Observations: 5 documents.
   - Active Metric: `classification_accuracy` (proportion correct out of 5).
2. **A2 (Exception Handling):**
   - Observations: 4 trials (3 genuine exceptions + 1 clean control).
   - Active Metric: `exception_detection_rate` (proportion of genuine exceptions correctly flagged, strictly out of 3; clean control excluded from denominator).
3. **Descriptive Records (All 21 Games):**
   - Descriptive records output primitive observation counts, timings, and strategies under allowed terms: `RECORDED`, `INSUFFICIENT`, `INVALID`, `not derived yet`, and contextual qualitative text.

---

## 6. EXTRACTOR QUARANTINE RELEASE POLICY

### 6.1 Current Status
- **Active Extractors (2):** `A1` and `A2`.
- **Quarantined Extractors (19):** `F1`, `F2`, `F3`, `A3`, `C1`, `C2`, `C3`, `E1`, `E2`, `E3`, `Q1`, `Q2`, `Q3`, `CR1`, `CR2`, `CR3`, `M1`, `M2`, `M3`.

### 6.2 Prerequisites for Lifting Quarantine
An extractor may ONLY be transitioned from `QUARANTINED` to `ACTIVE` when all of the following conditions are met:
1. **Sample Adequacy:** $N \ge 250$ valid, non-excluded candidate sessions completing the specific game.
2. **Reliability Verification:** Demonstrates test-retest or split-half reliability $r \ge 0.70$, or stable variance distribution with no floor/ceiling effect ($< 15\%$ at boundaries).
3. **Construct Concordance:** Statistically significant correlation with the corresponding SJT dimension or peer behavioral indicator ($p < 0.05$).
4. **Fairness & Adverse Impact:** Zero evidence of disparate impact across demographic subgroups (Four-Fifths Rule compliance, $p > 0.05$ on DIF).
5. **Owner & Psychometrician Sign-Off:** Explicit dual approval recorded in the repository commit history.

---

## 7. ETHICAL AND REGULATORY COMPLIANCE

1. **Digital Personal Data Protection (DPDP) Act:** Complete consent record retention, candidate notice of automated assessment, voluntary participation opt-in.
2. **No Autonomous Adverse Decisions:** Recruiter view serves as decision-support; automated algorithmic rejection is strictly forbidden.
3. **Audit Trail:** Recruiter access is logged immutably in `recruiter_access_logs`.
