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

## 4. PROVISIONAL STUDY-PLANNING TARGETS & DATA COLLECTION PHASES

The cohorts below represent provisional study-planning guidelines for iterative data collection. They are planning heuristics, not fixed universal validity rules. No sample size automatically guarantees psychometric adequacy; calibration decisions depend strictly on the actual distribution properties, data quality, and construct behaviors observed in empirical data.

| Planning Phase | Provisional Target ($N$) | Cohort Composition | Primary Focus & Research Objectives |
| :--- | :--- | :--- | :--- |
| **Phase 1: Technical & Field Pilot** | $N \approx 50$ | Controlled volunteer playtesters & internal staff | Technical telemetry verification, distribution range verification, latency baseline check, edge-case debugging. |
| **Phase 2: Exploratory Calibration** | $N \approx 250$ | Broad candidate pilot pool | Item discrimination analysis, item difficulty calculation, exploratory reliability analysis appropriate to each task design, baseline feature distributions. |
| **Phase 3: Formal Normative Evaluation** | $N \approx 1,000$ | Representative applicant population | Confirmatory structural analysis, empirical percentile analysis, subgroup fairness & differential item functioning (DIF) analysis. True "norming" is never claimed without a formally conducted normative study on a representative population. |

---

## 5. PSYCHOMETRIC RELIABILITY AND CONSTRUCT VALIDITY

### 5.1 Situational Judgment Test (SJT) Calibration
1. **Scoring Scheme:** 7 scenarios, 4 options each, scored across the 7 constructs according to `sjt_items.json` (SHA-256: `c098b401d37cc30b515139d307fef632047c048584e19771c0e014ef027e391d`).
2. **Scoring Bands:**
   - Current: Mathematical exact-thirds of theoretical score ranges.
   - Post-Calibration: Empirical tertiles derived from Phase 2 exploratory data, provided distribution symmetry and psychometric suitability are empirically verified.
3. **Reliability Methods:**
   - Reliability estimators must be selected according to the actual measurement design of the scale.
   - Internal consistency (e.g., Cronbach's $\alpha$, McDonald's $\omega$) or split-half methods may be evaluated, but no single threshold (such as $r \ge 0.70$) is treated as sufficient evidence of construct validity or decision utility.
   - Standard Error of Measurement (SEM) will be evaluated alongside confidence intervals.

### 5.2 Behavioral Micro-Game Metrics
1. **A1 (Document Classification):**
   - Observations: 5 documents.
   - Active Metric: `classification_accuracy` (proportion correct out of 5).
2. **A2 (Exception Handling):**
   - Observations: 4 trials (3 genuine exceptions + 1 clean control).
   - Active Metric: `exception_detection_rate` (proportion of genuine exceptions correctly flagged, strictly out of 3; clean control excluded from denominator).
3. **Descriptive Records (All 21 Games):**
   - Descriptive records output primitive observation counts, timings, and strategies under allowed terms: `RECORDED`, `INSUFFICIENT`, `INVALID`, `not derived yet`, and contextual qualitative text.
   - Norm-referenced scoring is never claimed for descriptive records. No Alfaaz norms may be manufactured from external literature or other assessments.

---

## 6. EXTRACTOR QUARANTINE POLICY & ACTIVATION CRITERIA

### 6.1 Current Operational Status
- **Active Extractors (2):** `A1` and `A2`.
- **Quarantined Extractors (19):** `F1`, `F2`, `F3`, `A3`, `C1`, `C2`, `C3`, `E1`, `E2`, `E3`, `Q1`, `Q2`, `Q3`, `CR1`, `CR2`, `CR3`, `M1`, `M2`, `M3`.

### 6.2 Requirements for Evaluating Quarantine Release
Quarantined extractors remain strictly quarantined until an explicit empirical validation study has been designed, executed, and reviewed. Transitioning any extractor from `QUARANTINED` to `ACTIVE` requires:
1. **Empirical Distribution Analysis:** Evaluation on an adequate sample of valid, non-excluded candidate sessions showing sufficient variance without severe floor or ceiling artifacts. A target sample (e.g. $N \approx 250$) serves as a planning minimum, not an automatic pass.
2. **Task-Appropriate Reliability:** Demonstration of measurement stability using a reliability method aligned with the task's cognitive structure (test-retest, parallel forms, or appropriate internal consistency estimators). No universal numerical cutoff (such as $r \ge 0.70$) is treated as automatically sufficient without construct validity evidence.
3. **Construct & Criterion Evidence:** Empirical correlation with theoretically relevant external criteria or convergence with corresponding assessment dimensions.
4. **Subgroup Fairness:** Empirical inspection for differential item functioning (DIF) or adverse impact across demographic subgroups.
5. **Formal Review & Explicit Owner Sign-Off:** Written sign-off by psychometric reviewers and project owners recorded in the repository commit history. No extractor may be activated without this explicit process.

---

## 7. ETHICAL AND REGULATORY COMPLIANCE

1. **Digital Personal Data Protection (DPDP) Act:** Complete consent record retention, candidate notice of automated assessment, voluntary participation opt-in.
2. **No Autonomous Adverse Decisions:** Recruiter view serves as decision-support; automated algorithmic rejection is strictly forbidden.
3. **Audit Trail:** Recruiter access is logged immutably in `recruiter_access_logs`.
