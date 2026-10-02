# Alfaaz Recruit Theory-Driven Calibration (R8)

## R8.1 Measurement objective

Specify and test measurement machinery without converting theory, synthetic fixtures, or task design into production scores, norms, thresholds, or selection decisions.
The R8 measurement layer establishes a defensible, falsifiable, theory-driven psychometric architecture for future human calibration studies while strictly maintaining a firewalled boundary against production evaluation.

## R8.2 Measurement philosophy and evidence boundaries

Theory can specify an indicator, an error model, and a falsifiable validity hypothesis. It cannot supply Alfaaz reliability coefficients, empirical validity results, factor loadings, equivalence margins, norms, or performance criteria.
Hard separation is maintained between four distinct epistemic states:
1. **THEORY:** Theoretical specification of constructs, facets, task affordances, and directional hypotheses.
2. **SYNTHETIC / ALGORITHMIC VERIFICATION:** Unit test verification of mathematical pipelines, inverse-variance estimators, and known-answer transformations using isolated synthetic fixtures (`data_classification="SYNTHETIC"`).
3. **EMPIRICAL ESTIMATION:** Parameter estimation conducted on clean, consented human participant datasets (`data_classification="EMPIRICAL"`), accompanied by formal study references and independent reviewer verification.
4. **EMPIRICAL VALIDATION:** Independent validation of model generalizability, test-retest stability, convergence, discriminant separation, and fairness evidence.

Production remains purely descriptive: SJT relative-emphasis bands, active A1 and A2 feature extraction, and 19 quarantined extractors. Production configuration (`config/feature_bands.json`) remains strictly `UNCALIBRATED` with null thresholds.

## R8.3 Seven construct definitions

The seven locked parameters are:
- `empathy`
- `conscientiousness`
- `collaborative_spirit`
- `emotional_agility`
- `curiosity`
- `creative_initiative`
- `motivation`

Their canonical definitions and facet decompositions remain locked in `config/parameters.json`. This layer does not redefine, alter, or re-weight any of the seven parameters.

## R8.4 Construct -> behavioral indicator mapping

`GAME_SPECS` in `backend/app/research/theory_calibration.py` is the canonical R8 mapping. Each game is a construct-relevant behavioral indicator hypothesis, not a construct score.
Each task is designed to elicit observable behavior under controlled, reproducible conditions rather than static self-report.

## R8.5 SJT measurement model

The locked seven-scenario SJT keeps its current exact-thirds HIGH/MODERATE/LOW output. It is a relative-emphasis indicator across candidate-selected behavioral dilemmas. Its raw profile is retained for future empirical linking; it is never averaged with mini-game bands or treated as an independent Likert trait scale.

## R8.6 Game measurement models

The authoritative 21-game observation schedule, extractor state, and theory-specified precision approach are defined as follows:

| Game | Parameter | World | Locked observation structure | Extractor state | Observed feature | Theory-specified precision approach |
| --- | --- | --- | --- | --- | --- | --- |
| F1 | empathy | W1 The Frequency | 6 trials | QUARANTINED | cue_response_latency_ms | trial-level variance / test-retest |
| F2 | empathy | W1 The Frequency | 4 ambiguity trials | QUARANTINED | clarification_vs_assumption_ratio | binomial/proportion precision |
| F3 | empathy | W1 The Frequency | 3 context transitions | QUARANTINED | post_shift_adaptation_latency_ms | transition-level variance / test-retest |
| A1 | conscientiousness | W2 The Archive | 5 classification items | ACTIVE | classification_rule_adherence_rate | binomial/proportion precision |
| A2 | conscientiousness | W2 The Archive | at least 3 genuine exception opportunities; clean controls excluded | ACTIVE | exception_flagging_precision | binomial/proportion precision with the locked N>=3 gate |
| A3 | conscientiousness | W2 The Archive | 5 quality-control records | QUARANTINED | error_detection_sensitivity | signal-detection / binomial precision |
| C1 | collaborative_spirit | W3 The Shared Canvas | 3 rounds | QUARANTINED | need_sensitive_sharing_index | multilevel round variance / test-retest |
| C2 | collaborative_spirit | W3 The Shared Canvas | 3 coordinated placement rounds | QUARANTINED | coordination_collision_avoidance_rate | binomial/proportion precision |
| C3 | collaborative_spirit | W3 The Shared Canvas | 3 breakdown/recovery opportunities | QUARANTINED | constructive_repair_score | episode-level variance / test-retest |
| E1 | emotional_agility | W4 The Shifting Grid | 9 trials: baseline T1-T3, shift T4, recovery T5-T9 | QUARANTINED | perseverative_error_count | change-point / recovery-curve variance |
| E2 | emotional_agility | W4 The Shifting Grid | 4 sequences: 3 disrupted and 1 control | QUARANTINED | cadence_stability_ratio | within-person disrupted-vs-control contrast |
| E3 | emotional_agility | W4 The Shifting Grid | 3 condition transitions with unchanged input modality | QUARANTINED | strategy_shift_efficiency | transition-level variance / test-retest |
| Q1 | curiosity | W5 The Hidden Gallery | 4 required decisions plus optional resources and useful/low-value controls | QUARANTINED | optional_alcove_exploration_rate | choice-model / binomial precision |
| Q2 | curiosity | W5 The Hidden Gallery | 4 exploration opportunities | QUARANTINED | anomaly_investigation_depth | ordinal / episode-level variance |
| Q3 | curiosity | W5 The Hidden Gallery | 3 ambiguity/integration episodes | QUARANTINED | integrated_insight_utilization | episode-level variance / test-retest |
| CR1 | creative_initiative | W6 The Broken Tool | 2 construction stages with multiple valid solutions | QUARANTINED | solution_uniqueness_index | variance components with human-coded criterion only if independently rated |
| CR2 | creative_initiative | W6 The Broken Tool | 3 constraint-shift episodes | QUARANTINED | creative_pivot_latency_ms | episode-level variance / test-retest |
| CR3 | creative_initiative | W6 The Broken Tool | 3 tool-use opportunities | QUARANTINED | functional_fixedness_overcome_rate | binomial/proportion precision |
| M1 | motivation | W7 The Repetition | 3 mandatory units | QUARANTINED | mandatory_cadence_consistency | within-task variance / test-retest |
| M2 | motivation | W7 The Repetition | 3 mandatory, explicit finish/continue, up to 3 optional | QUARANTINED | optional_units_completed | right-censored count / survival model |
| M3 | motivation | W7 The Repetition | 3 mandatory, up to 3 voluntary, explicit stop, reduced feedback, right-censored | QUARANTINED | reduced_feedback_persistence_count | right-censored count / survival model |

### A2 Genuine Exception Measurement Invariant
A2 strictly measures genuine exception handling. Telemetry contains 3 true exception stimuli (`condition_type == "true_exception"`) and 1 clean control stimulus (`condition_type == "clean_control"`).
- Denominator `genuine_evaluated` strictly counts genuine exception opportunities.
- Clean controls are excluded from both the genuine opportunity count and the precision denominator.
- N < 3 genuine opportunities results in `INSUFFICIENT_OBSERVATIONS` (`valid = False`).
- Duplicate events per stimulus / trial key do not inflate opportunity count.
- Action `exception_resolved` does not bypass the minimum-opportunity gate.

## R8.7 Per-game reliability/error methodology

`binomial_precision(successes, opportunities)` supplies a design-based standard error for repeated binary or proportion trials:
$$\text{SE} = \sqrt{\frac{p(1-p)}{N}}$$
It represents sampling variance under repeated trials, not an empirical test-retest or internal-consistency reliability coefficient.
Tasks with continuous latencies, multi-round coordination, or survival structures require empirical test-retest, change-point, or survival modeling on human datasets before any reliability claim can be made.

## R8.8 Cross-game/sibling-game convergence

Within each parameter, the three mini-games represent distinct facets of a shared construct alongside task-specific method variance.
Their association represents future internal-structure evidence, not automatic reliability. Sibling correlations must be empirically estimated on human data; they cannot be assumed or synthesized.

## R8.9 SJT <-> game convergence

The relationship between an SJT relative-emphasis indicator and a mini-game behavioral feature is a convergent validity hypothesis. SJT and game metrics operate on distinct scales and must never be averaged, merged, or directly compared without formal linking models.

## R8.10 Discriminant evidence

Relationships between indicators of differing constructs represent discriminant hypotheses. Alternative explanations, including input modality differences, device form factor (mobile vs desktop), and general cognitive or reading load, must be evaluated before concluding discriminant divergence.

## R8.11 Measurement error

Measurement error is explicitly tracked at every stage. Model-based standard errors are propagated through transformations. Response time is treated as contextual; speed alone is never interpreted as construct mastery.

## R8.12 Common-scale linking governance

To prevent arbitrary or ad-hoc cross-task comparisons, indicators must pass through a formal linking pipeline:
$$\text{RawIndicator} \xrightarrow{\text{LinkingModel}} \text{CommonScaleIndicator}$$
A `LinkingModel` requires:
- `source_measure_id` and `target_scale_id`
- `transformation_type` (e.g. `LINEAR`, `IDENTITY`)
- `transformation_parameters` (intercept, slope)
- `parameter_provenance`
- `model_version` and `status`
- Synthetic fixture (`SyntheticModelFixture`) for algorithmic tests, or empirical study reference (`EmpiricalStudyReference`) for empirical models.

Comparing indicators from different scales raises an immediate error.

## R8.13 Delta analysis

Delta analysis evaluates whether two linked common-scale indicators diverge significantly:
$$\text{Var}(\Delta) = \text{SE}_1^2 + \text{SE}_2^2 - 2 \cdot \text{Cov}(1, 2)$$
$$\text{SE}_{\Delta} = \sqrt{\text{Var}(\Delta)}$$
$$\Delta = |V_1 - V_2|$$
- If $\Delta \le \text{SE}_{\Delta}$, the result is classified as `DELTA_WITHIN_MEASUREMENT_ERROR`.
- If $\Delta > \text{SE}_{\Delta}$, substantive classification (`DELTA_SMALL`, `DELTA_MATERIAL`, `DELTA_LARGE`) is permitted **only** when an `EMPIRICALLY_JUSTIFIED_MARGIN` is supplied. In the absence of an empirical margin, the result is classified as `NOT_DETERMINED`.

## R8.14 Equivalence margins & Delta policy

An `EquivalenceMargin` specifies substantive divergence boundaries (`small_max`, `material_max`).
- `THEORY_SPECIFIED_MARGIN`: A theoretical conjecture. It cannot classify differences exceeding measurement error; `evaluate_delta` returns `NOT_DETERMINED`.
- `EMPIRICALLY_JUSTIFIED_MARGIN`: Requires empirical derivation methodology, published study reference, and independent reviewer sign-off.
Ad-hoc numerical margins without empirical justification are strictly rejected.

## R8.15 Latent/integrated construct estimation

The structural latent indicator model is:
$$Y_{ij} = \alpha_j + \lambda_j \theta_i + \epsilon_{ij}, \quad \epsilon_{ij} \sim \mathcal{N}(0, \sigma_j^2)$$
Estimates of $\theta_i$ are obtained via inverse-variance weighting:
$$\hat{\theta}_i = \frac{\sum_j \frac{Y_{ij} - \alpha_j}{\lambda_j \sigma_j^2}}{\sum_j \frac{1}{\sigma_j^2 / \lambda_j^2}}$$
Rules governing `LatentModel`:
1. Equal factor loadings ($\lambda_j$) cannot be assumed without empirical support.
2. Loadings cannot be zero; error variances must be strictly positive.
3. At least two indicators are required.
4. Models with `EMPIRICALLY_ESTIMATED` or `EMPIRICALLY_VALIDATED` status require a verified `EmpiricalParameterBundle` (`data_classification="EMPIRICAL"`).
5. Algorithmic test fixtures require an explicit `SyntheticModelFixture` (`data_classification="SYNTHETIC"`).
6. The resulting quantity is termed a **latent construct estimate** or **integrated construct estimate**, never a "true score".

## R8.16 Uncertainty intervals

The latent construct estimator returns both an estimate and its standard error:
$$\text{SE}(\hat{\theta}) = \sqrt{\frac{1}{\sum_j \frac{\lambda_j^2}{\sigma_j^2}}}$$
Confidence intervals are not hard-coded until empirical normality and sample distributions are validated.

## R8.17 Criterion validity

Future validation requires external, non-circular volunteer engagement or organizational criteria. Assessment scores or selection outcomes cannot serve as self-justifying criteria.

## R8.18 Incremental validity / regression

Incremental validity must test whether candidate mini-game features provide variance explanation beyond baseline biographical and SJT measures. No regression weights or coefficients are fabricated in the absence of human criterion datasets.

## R8.19 Device/accessibility sensitivity

Telemetry and feature distributions must be analyzed across device form factors, browser engines, and assistive technology modalities. Lower performance under an access barrier must never be interpreted as lower construct capability.

## R8.20 Theory-driven estimation status & lifecycle enforcement

The lifecycle transitions are strictly linear and adjacent:
$$\text{THEORY\_SPECIFIED} \rightarrow \text{MODEL\_IMPLEMENTED} \rightarrow \text{ALGORITHMICALLY\_VERIFIED} \rightarrow \text{EMPIRICALLY\_ESTIMATED} \rightarrow \text{EMPIRICALLY\_VALIDATED}$$
The transition function `advance_provenance(current, target)` strictly permits single-step advances and rejects skips, regressions, or non-enum types.

## R8.21 Empirical validation requirements

Empirical calibration requires:
- Consented human participant datasets with DPDP compliance.
- Sample sizes powered for stable covariance estimation.
- Distributional normality checks.
- Sibling convergence ($r > 0$) and discriminant divergence ($r_{\text{sibling}} > r_{\text{discriminant}}$).
- Fairness and differential item functioning (DIF) audits across demographic groups.

## R8.22 Promotion/release gates

Under no circumstances may:
- Any quarantined mini-game extractor be activated in production without empirical review.
- Any latent model or common-scale score be displayed to recruiters or candidates.
- Any production threshold or band be populated in `config/feature_bands.json` without explicit owner approval.

## R8.23 Evidence trail and provenance

All research objects must encapsulate full provenance metadata:
- `TheorySpecification`: Construct scope and theoretical rationale.
- `SyntheticModelFixture`: Test fixture identifier and synthetic classification.
- `AlgorithmicallyVerifiedArtifact`: Algorithmic test documentation.
- `EmpiricalStudyReference`: Study ID, dataset reference, reviewer name, timestamp.
- `EmpiricalParameterBundle`: Parameter vector, covariance matrix, study reference, reviewer.
- `EmpiricallyValidatedArtifact`: Validation evidence and review record.

## R8.24 Prohibited inferences / anti-overclaim rules

The following are strictly prohibited:
1. Claiming empirical reliability, validity, or generalizability from theoretical models or synthetic tests.
2. Constructing normative applicant rankings, cutoffs, or composite scores.
3. Averaging or blending SJT relative-emphasis bands with raw game metrics.
4. Using latency as a sole indicator of psychological traits.
5. Circumventing data quality or observation count gates.

---

## Reconciliation Matrix: Historical Design Sheets vs Authoritative Schedule

The repository contains initial exploratory design sheets in `docs/design/*.md` created during early prototyping. These historical sheets reflect early exploratory drafts and have been superseded.

### Precedence Hierarchy
Per repository governance, conflicting documentation is resolved by strict precedence:
$$\text{Addenda} > \text{GO Brief} > \text{Remediation Brief} > \text{V2 Brief} > \text{Code / Task Definitions} > \text{Integration Manual / Early Drafts}$$

### Schedule Discrepancy Reconciliation

| Mini-Game | Early Draft Sheet (`docs/design/`) | Authoritative Locked Schedule | Authoritative Authority & Justification |
| --- | --- | --- | --- |
| **F1** | 1 trial exploratory draft (`w1_the_frequency.md`) | **6 trials** | `config/task_definitions.json`, Addendum 1. Provides required trial-level variance. |
| **F2** | 2 trials exploratory draft | **4 ambiguity trials** | `config/task_definitions.json`, Addendum 1. 4 trials allow proportion estimation. |
| **F3** | 1 context transition | **3 context transitions** | `config/task_definitions.json`, Addendum 1. Required for transition-level variance. |
| **A1** | 6 items initial draft | **5 classification items** | `config/task_definitions.json`, GO Brief, active production extractor. |
| **A2** | 2 items initial draft | **>= 3 genuine exception opportunities** (clean controls excluded) | `config/task_definitions.json` (3 true exceptions, 1 clean control), Remediation Brief, locked N>=3 gate. |
| **A3** | 3 QC records initial draft | **5 quality-control records** | `config/task_definitions.json`, GO Brief (3 error records, 2 clean controls). |
| **C1** | 1 round initial draft | **3 rounds** | `config/task_definitions.json`, Addendum 1. Multilevel round variance. |
| **C2** | 1 round initial draft | **3 coordinated placement rounds** | `config/task_definitions.json`, Addendum 1. Binomial coordination precision. |
| **C3** | 1 breakdown initial draft | **3 breakdown/recovery opportunities** | `config/task_definitions.json`, Addendum 1. Episode-level repair variance. |
| **E1** | 6 trials initial draft | **9 trials** (baseline T1-T3, shift T4, recovery T5-T9) | `config/task_definitions.json`, Addendum 1. Change-point recovery curve. |
| **E2** | 2 sequences initial draft | **4 sequences** (3 disrupted, 1 control) | `config/task_definitions.json`, Addendum 1. Disrupted vs control contrast. |
| **E3** | 1 transition initial draft | **3 condition transitions** | `config/task_definitions.json`, Addendum 1. Modality-stable shift efficiency. |
| **Q1** | 2 choices initial draft | **4 required decisions + optional resources** | `config/task_definitions.json`, Addendum 1. Useful vs low-value controls. |
| **Q2** | 2 opportunities initial draft | **4 exploration opportunities** | `config/task_definitions.json`, Addendum 1. Anomaly depth variance. |
| **Q3** | 1 episode initial draft | **3 ambiguity/integration episodes** | `config/task_definitions.json`, Addendum 1. Context utilization episodes. |
| **CR1** | 1 stage initial draft | **2 construction stages** | `config/task_definitions.json`, Addendum 1. Multiple valid solutions. |
| **CR2** | 1 shift initial draft | **3 constraint-shift episodes** | `config/task_definitions.json`, Addendum 1. Constraint reframing pivots. |
| **CR3** | 1 tool initial draft | **3 tool-use opportunities** | `config/task_definitions.json`, Addendum 1. Functional adaptation rate. |
| **M1** | 1 unit initial draft | **3 mandatory units** | `config/task_definitions.json`, Addendum 1. Mandatory cadence consistency. |
| **M2** | 1 continuation initial draft | **3 mandatory + up to 3 optional** | `config/task_definitions.json`, Addendum 1. Right-censored continuation. |
| **M3** | 1 continuation initial draft | **3 mandatory + up to 3 voluntary** (reduced feedback) | `config/task_definitions.json`, Addendum 1. Reduced feedback persistence. |
