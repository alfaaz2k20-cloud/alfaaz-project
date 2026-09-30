# ALFAAZ RECRUIT V1.3: MERGED SPECIFICATION
*Status: COMPLETE (Spec V1.2.1 + V1.3 Deltas)*

## 1. Product Flow & Design Defaults
*   **Time Budget:** ~35 min limit. Break introduced between Part A and Part B (Screen S12).
*   **SJT Intro:** "You've just joined Alfaaz Collective. Today is your first day. Choose the option closest to what you would actually do."
*   **10 Measures Total:** 7 Primary (G1-G7) and 3 Secondary (E2, C2, M2).
*   **Randomization:** Covers all 10 measures. Two measures of the same parameter are never adjacent.

## 2. The Measures (Secondary Additions)

### E2: The Unspoken (Empathy)
*   **Method:** 10 scored + 2 practice items. 25-45 word moments recognizing others' states.
*   **Workflow:** Draft items ship as `DRAFT_NEEDS_SME_KEYING`. Must be approved by ≥3 SMEs with ≥80% agreement, plus ≥1 outside reviewer check.
*   **Evidence:** Index = `e2_accuracy` (correct/10). Soft flags for `STRAIGHTLINE`, `RUSHED`, `LOW_READING_BASELINE`. E2 remains entirely disabled until SME approved.

### C2: The Ledger (Conscientiousness)
*   **Method:** Verifying 2 sets of 12 rows (Source vs Recorded). Untimed, both visible (no memory load).
*   **Generator:** Exactly 4 planted mismatches per set (digit transposition, date off by one, hours off by 0.5, event code one digit off). Seeded.
*   **Evidence:** Index = `0.70 * balanced_accuracy + 0.30 * error_resolution`.

### M2: The Long Table (Motivation)
*   **Method:** 12 scored trials choosing between Easy (1 point) and Hard (2-5 points) tasks. Task requires hitting a tap target computed from a 5s calibration run.
*   **Accessibility Mode:** Hold-to-fill instead of tapping.
*   **Evidence:** Index = `0.60 * hard_rate + 0.20 * hard_completion + 0.20 * persistence_trend`.

## 3. Scoring & Convergence Deltas
*   **Parameter Level:** `game_index[p] = mean of measure indices`.
*   **Within-Game Divergence:** If a parameter has 2 valid measures and `max - min > 0.34`, flag `WITHIN_GAME_DIVERGENCE` and lower confidence one step.
*   **SJT Scoring:** Implements both `ratio_bands` (default) and `reference_percentile` (normative ranking based on exhaustive 4^7 pattern generation).

## 4. Confound Controls & Privacy
*   **Confound Handling:** Reading/motor abilities baseline adjusted. Memory load removed from C2. SJT length-cue validator enforced. All games have keyboard and tap alternatives.
*   **Privacy:** `PII_RETENTION_DAYS=90`, `TELEMETRY_RETENTION_MONTHS=12`. Anonymization script. Strict `POST /candidate/withdraw` endpoint. `consent_calibration` flag for cohort stats. Zero external third-party requests.

## 5. Ecosystem Tooling
*   **Validity Kit:** `docs/VALIDITY_EVIDENCE_PLAN.md` with mapping matrices.
*   **Analysis:** Python scripts inside `analysis/` for reliability reports, test-retest, distribution monitors, and internal consistency.
*   **SME Approval:** Automated scripts checking SME ratings (I-CVI) against strict minimum thresholds before enabling content.
