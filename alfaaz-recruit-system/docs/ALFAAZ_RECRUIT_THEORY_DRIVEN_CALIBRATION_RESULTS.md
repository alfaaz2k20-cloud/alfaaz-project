# Alfaaz Recruit: Theory-Driven Calibration & Measurement Model Estimation Results (Stage 2)

**Document ID:** `DOC-RES-2026-CAL-R9`
**Status:** `RESEARCH_LAYER_ACTIVE` / `PRE_EMPIRICAL`
**Date:** October 2026
**Authority Precedence:** Addendum > GO Brief > Remediation Brief > Brief v2 > Production Code > Technical Architecture (non-authoritative)
**Epistemic Separation Standard:** Hard separation across `THEORY_DERIVED`, `MODEL_BASED`, `ALGORITHMICALLY_VERIFIED`, `EMPIRICALLY_ESTIMATED`, and `EMPIRICALLY_VALIDATED`.

---

## R9.1 Executive Summary

This document establishes the canonical theory-driven calibration and measurement model estimation results for the Alfaaz Recruit volunteer assessment system. Following the completion of the R8 governance framework, Stage 2 derives the strongest possible measurement models, estimands, sampling precision formulas, identifiability bounds, and sensitivity analyses achievable from locked task definitions, game mechanics, and psychometric theory **prior to human participant data collection**.

In strict accordance with scientific honesty:
1. **Zero Empirical Data Fabricated:** No empirical reliability coefficients, factor loadings, correlation matrices, or normative distributions have been manufactured. Advancing to `EMPIRICALLY_ESTIMATED` requires an appropriate consented human dataset. No fixed participant count is imposed by the R9 software layer. Sample-size requirements depend on the estimator, parameter, model complexity, precision target, and intended empirical claim. Provisional planning figures (such as $N=50, 250, 1000$) are not mandatory gates.
2. **Identifiability Partition across 21 Tasks:**
   - **7 games** are classified as `MODEL_NUMERICALLY_ESTIMABLE` under design-based binomial sampling models ($F2, A1, A2, C2, Q1, Q3, CR3$).
   - **8 games** are classified as `MODEL_BOUND_ESTIMABLE` under bounded task design, signal detection, or survival/stopping hazard structures ($A3, C1, C3, E1, E3, Q2, M2, M3$).
   - **6 games** are classified as `EMPIRICAL_DATA_REQUIRED` / `PRIOR_RANGE_ONLY` because their core indicators reflect continuous latencies, normative frequency distributions, or variance ratios that cannot be identified without observed between- and within-person distributions ($F1, F3, E2, CR1, CR2, M1$).
3. **Rigid Production Measurement Quarantine:** Production measurement/scoring behavior remains strictly uncalibrated (`config/feature_bands.json` remains `UNCALIBRATED`). The 19 quarantined feature extractors remain inactive in production; only $A1$ and $A2$ remain active. Recruiter safeguards (no composite applicant scores, no candidate ranking, no automated project-fit indices) remain absolute. Delivery infrastructure changes (service-worker, Vercel rewrites, research view route) are strictly separated from measurement logic.

---

## R9.2 What "Calibrated" Means in This Stage

In classical psychometric engineering, "calibration" often denotes the statistical estimation of item difficulty, discrimination, and person parameters from observed participant response matrices. In Stage 2 of the Alfaaz project, where no human dataset has yet been collected, **"calibrated" carries a rigorous, mathematically defensible, theory-driven meaning**:

1. **Definite Mathematical Specification of Estimands:** Every task indicator is tied to a formal population parameter or design estimand rather than an ad-hoc heuristic.
2. **Identification of Finite Design Sampling Errors:** Where tasks present discrete opportunity structures (e.g., $k$ successes out of $N$ opportunities), sampling precision is computed directly via design-based binomial error functions ($\text{SE}(p) = \sqrt{p(1-p)/N}$).
3. **Formal Delimitation of Theoretical Bounds & Priors:** Where continuous or ordinal indicators are observed, physical, physiological, and design-imposed boundary conditions are established as immutable constraints (e.g., motor reaction time floor of 150 ms; UI timeout of 10,000 ms).
4. **Transparent Accounting of Unidentified Nuisance Parameters:** Rather than silently assuming unit variances or arbitrary factor loadings, every missing empirical parameter required for full identification is explicitly enumerated.
5. **Strict Epistemic Taxonomy:**
   - `THEORY_DERIVED`: Formal deduction from construct definition, ethical principles, or logical task affordances.
   - `MODEL_BASED`: Deduction from explicit statistical sampling assumptions (e.g., conditionally independent Bernoulli trials).
   - `ALGORITHMICALLY_VERIFIED`: Deterministic verification through automated unit testing, synthetic fixtures, or mathematical proofs.
   - `EMPIRICALLY_ESTIMATED`: **Unavailable in Stage 2** (requires consented human sample telemetry).
   - `EMPIRICALLY_VALIDATED`: **Unavailable in Stage 2** (requires independent cross-validation / criterion review).

---

## R9.3 Seven-Parameter Measurement Models

The Alfaaz Recruit framework evaluates seven non-cognitive and behavioral parameters across seven distinct worlds. The structural measurement equations for each parameter link the Situational Judgement Task (SJT) and three micro-games ($G1, G2, G3$) to a single latent construct:

$$\theta_p \sim \mathcal{N}(0, 1), \quad p \in \{1, \dots, 7\}$$

### Structural Model Formulation
For candidate $i$ on parameter $p$, each observed indicator $Y_{ij}$ (where $j \in \{\text{SJT}, G_1, G_2, G_3\}$) follows the linear factor model:
$$Y_{ij} = \alpha_j + \lambda_j \theta_{ip} + \epsilon_{ij}$$
subject to:
- $\mathbb{E}[\epsilon_{ij}] = 0$
- $\operatorname{Var}(\epsilon_{ij}) = \sigma_j^2 > 0$
- $\operatorname{Cov}(\epsilon_{ij}, \epsilon_{ik}) = \delta_{jk} \sigma_{jk}$ (where non-zero covariance represents method variance between sibling micro-games).

### Identification Status
- **Structural Status:** `LATENT_MODEL_SPECIFIED`
- **Parameter Identification:** `ESTIMATE_NOT_IDENTIFIED_WITHOUT_EMPIRICAL_PARAMETERS`
- **Equal Loadings Prohibition:** Equal factor loadings ($\lambda_j = \lambda$) are **strictly prohibited** by design assumption. The model acknowledges that an implicit behavioral latency task, a discrete rule adherence count, and a narrative SJT dilemma load onto the latent trait with unequal magnitudes and distinct error variances.

---

## R9.4 SJT Measurement Model

The Situational Judgement Task comprises 7 multi-faceted cultural and organizational dilemma scenarios, each offering 4 behavioral options.

### Structure & Scoring Invariants
1. **7 Scenarios $\times$ 4 Options:** Every scenario presents four options whose scoring vectors span the seven parameters.
2. **Ipsative Dilemma Nature:** Options represent trade-offs between competing prosocial goods (e.g., immediate artistic empathy vs. systematic archivist conscientiousness). Choosing one emphasis necessarily forfeits emphasis on others.
3. **Attainable Span:** Raw scores per parameter range across integer values bounded by scenario point allocations (nominal span $[-14, +14]$ relative to alternative choices).
4. **Production Categorization:** In production, scores are reported strictly as exact-thirds relative emphasis categories: `HIGH`, `MODERATE`, and `LOW`.
5. **Psychometric Limits without Empirical Data:**
   - Conventional internal consistency (e.g., Cronbach's $\alpha$) is **mathematically invalid** when applied to ipsative or multi-construct situational dilemma items due to induced negative item covariances.
   - Item response theory (IRT) or Thurstonian IRT calibration requires empirical human response vectors to model scenario thresholds and parameter discrimination.
   - **Current Status:** `MODEL_BOUND_ESTIMABLE` for raw score span; `EMPIRICAL_DATA_REQUIRED` for dimensionality and trait reliability.

---

## R9.5 21-Game Estimands

The table below specifies the construct, observed indicator, estimand, and identifiability class for every game in the locked observation schedule.

| Game | Parameter | World | Observed Indicator | Formal Estimand | Identifiability Class |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **F1** | Empathy | W1 The Frequency | `cue_response_latency_ms` | Mean response latency and trial-level variance across 6 audio cues | `EMPIRICAL_DATA_REQUIRED` |
| **F2** | Empathy | W1 The Frequency | `clarification_vs_assumption_ratio` | Binomial proportion $p = k / 4$ of clarification choices under ambiguity | `MODEL_NUMERICALLY_ESTIMABLE` |
| **F3** | Empathy | W1 The Frequency | `post_shift_adaptation_latency_ms` | Mean adjustment latency across 3 acoustic context transitions | `EMPIRICAL_DATA_REQUIRED` |
| **A1** | Conscientiousness | W2 The Archive | `classification_rule_adherence_rate` | Binomial proportion $p = k / 5$ of rule-guided document classifications | `MODEL_NUMERICALLY_ESTIMABLE` |
| **A2** | Conscientiousness | W2 The Archive | `exception_flagging_precision` | Binomial proportion $p = k / N_{\text{genuine}}$ of genuine exceptions flagged ($N \ge 3$) | `MODEL_NUMERICALLY_ESTIMABLE` |
| **A3** | Conscientiousness | W2 The Archive | `error_detection_sensitivity` | Signal detection sensitivity $d'$ across 5 QC records (3 error, 2 control) | `MODEL_BOUND_ESTIMABLE` |
| **C1** | Collaborative Spirit | W3 The Shared Canvas | `need_sensitive_sharing_index` | Mean resource allocation conditional on partner need state across 3 rounds | `MODEL_BOUND_ESTIMABLE` |
| **C2** | Collaborative Spirit | W3 The Shared Canvas | `coordination_collision_avoidance_rate` | Binomial proportion $p = k / 3$ of collision-free coordinated placements | `MODEL_NUMERICALLY_ESTIMABLE` |
| **C3** | Collaborative Spirit | W3 The Shared Canvas | `constructive_repair_score` | Mean constructive repair index across 3 breakdown episodes | `MODEL_BOUND_ESTIMABLE` |
| **E1** | Emotional Agility | W4 The Shifting Grid | `perseverative_error_count` | Integer count of perseverative errors $k \in \{0, \dots, 5\}$ on recovery trials T5–T9 | `MODEL_BOUND_ESTIMABLE` |
| **E2** | Emotional Agility | W4 The Shifting Grid | `cadence_stability_ratio` | Ratio of cadence variance in 3 disrupted sequences vs. 1 control sequence | `EMPIRICAL_DATA_REQUIRED` |
| **E3** | Emotional Agility | W4 The Shifting Grid | `strategy_shift_efficiency` | Mean strategy adjustment efficiency across 3 modality-stable transitions | `MODEL_BOUND_ESTIMABLE` |
| **Q1** | Curiosity | W5 The Hidden Gallery | `optional_alcove_exploration_rate` | Binomial proportion $p = k / 4$ of useful optional resources inspected | `MODEL_NUMERICALLY_ESTIMABLE` |
| **Q2** | Curiosity | W5 The Hidden Gallery | `anomaly_investigation_depth` | Mean multi-stage inspection depth across 4 exploration opportunities | `MODEL_BOUND_ESTIMABLE` |
| **Q3** | Curiosity | W5 The Hidden Gallery | `integrated_insight_utilization` | Binomial proportion $p = k / 3$ of downstream decisions utilizing clues | `MODEL_NUMERICALLY_ESTIMABLE` |
| **CR1** | Creative Initiative | W6 The Broken Tool | `solution_uniqueness_index` | Statistical rarity index of chosen structural configuration across 2 stages | `EMPIRICAL_DATA_REQUIRED` |
| **CR2** | Creative Initiative | W6 The Broken Tool | `creative_pivot_latency_ms` | Mean cognitive reframing latency following 3 constraint-shift episodes | `EMPIRICAL_DATA_REQUIRED` |
| **CR3** | Creative Initiative | W6 The Broken Tool | `functional_fixedness_overcome_rate` | Binomial proportion $p = k / 3$ of non-standard affordance adaptations | `MODEL_NUMERICALLY_ESTIMABLE` |
| **M1** | Motivation | W7 The Repetition | `mandatory_cadence_consistency` | Coefficient of variation $\text{CV} = \sigma_t / \mu_t$ across 3 mandatory units | `EMPIRICAL_DATA_REQUIRED` |
| **M2** | Motivation | W7 The Repetition | `optional_units_completed` | Right-censored count $k \in \{0, 1, 2, 3\}$ of optional units completed | `MODEL_BOUND_ESTIMABLE` |
| **M3** | Motivation | W7 The Repetition | `reduced_feedback_persistence_count` | Right-censored count $k \in \{0, 1, 2, 3\}$ under attenuated feedback | `MODEL_BOUND_ESTIMABLE` |

---

## R9.6 Measurement Precision & Identifiability Results

Under classical test theory, reliability is defined as the ratio of true score variance to observed score variance ($\rho_{XX'} = \sigma_T^2 / \sigma_X^2$). Because $\sigma_T^2$ and $\sigma_X^2$ require an empirical sample of human participants, **no empirical reliability coefficients exist in Stage 2**. These quantities are not empirical reliability or empirical calibration.

Instead, for all discrete-observation tasks, we compute **DESIGN-BASED MEASUREMENT PRECISION** (`THEORY-DERIVED`):

$$\operatorname{SE}(p) = \sqrt{\frac{p(1 - p)}{N}}$$

### Design-Based Measurement Precision for Numerically Estimable Tasks (THEORY-DERIVED)

| Game | Observed Feature | Observation Count ($N$) | Minimum SE ($p \in \{0, 1\}$) | Typical SE ($p = 0.80$) | Maximum SE (`SE_max`, $p = 0.50$) | 95% Confidence Half-Width (Max) | Label / Epistemic Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **F2** | Clarification Ratio | $N = 4$ | $0.0000$ | $0.2000$ | $0.2500$ | $\pm 0.4900$ | `THEORY-DERIVED` / `DESIGN-BASED` |
| **A1** | Rule Adherence | $N = 5$ | $0.0000$ | $0.1789$ | $0.2236$ | $\pm 0.4383$ | `THEORY-DERIVED` / `DESIGN-BASED` |
| **A2** | Genuine Exception Precision | $N \ge 3$ ($N=3$) | $0.0000$ | $0.2309$ | $0.2887$ | $\pm 0.5658$ | `THEORY-DERIVED` / `DESIGN-BASED` |
| **C2** | Collision Avoidance | $N = 3$ | $0.0000$ | $0.2309$ | $0.2887$ | $\pm 0.5658$ | `THEORY-DERIVED` / `DESIGN-BASED` |
| **Q1** | Alcove Exploration | $N = 4$ | $0.0000$ | $0.2000$ | $0.2500$ | $\pm 0.4900$ | `THEORY-DERIVED` / `DESIGN-BASED` |
| **Q3** | Insight Utilization | $N = 3$ | $0.0000$ | $0.2309$ | $0.2887$ | $\pm 0.5658$ | `THEORY-DERIVED` / `DESIGN-BASED` |
| **CR3**| Affordance Adaptation | $N = 3$ | $0.0000$ | $0.2309$ | $0.2887$ | $\pm 0.5658$ | `THEORY-DERIVED` / `DESIGN-BASED` |

**Scientific Takeaway:** Across all short-form behavioral micro-games ($N=3$ to $N=5$), individual point estimates carry substantial design-based measurement precision limits (standard errors ranging from $0.18$ to $0.29$). This confirms why **no single game feature can support high-stakes binary selection decisions in isolation**, validating the Alfaaz architectural mandate of holistic, multi-method aggregation. These numerical quantities represent design-based measurement precision derived conditionally from the locked observation structure, and are strictly distinct from empirical reliability.

---

## R9.7 Measurement Error Results

Measurement error is modeled conditionally based on task structure:

1. **Binomial Proportion Sampling Error:** For $F2, A1, A2, C2, Q1, Q3, CR3$, error variance is heteroscedastic and depends on the underlying parameter:
   $$\sigma_e^2(p) = \frac{p(1 - p)}{N}$$
   At perfect adherence ($p=1.0$) or complete absence ($p=0.0$), the binomial standard error collapses to zero, though small-sample continuity corrections (e.g., Wilson score or Laplace smoothing) are recommended for empirical implementations.
2. **Signal Detection Vigilance ($A3$):** Error detection sensitivity is modeled as:
   $$d' = \Phi^{-1}(H) - \Phi^{-1}(F)$$
   With 3 signal and 2 noise items, boundary corrections (log-linear transformation) constrain $d'$ to $[-3.0, +3.0]$. Error variance is estimated via Gourevitch & Galanter asymptotic variance:
   $$\operatorname{Var}(d') \approx \frac{H(1 - H)}{N_{\text{signal}} [\phi(\Phi^{-1}(H))]^2} + \frac{F(1 - F)}{N_{\text{noise}} [\phi(\Phi^{-1}(F))]^2}$$
3. **Right-Censored Persistence ($M2, M3$):** Error variance in voluntary persistence counts ($k \in \{0, 1, 2, 3\}$) is right-censored at $k=3$. The measurement error cannot be modeled with standard symmetric Gaussian residuals; it requires a parametric survival model (e.g., Weibull or exponential hazard $\lambda$).
4. **Continuous Latencies ($F1, F3, CR2$):** Latency measurement error is compound:
   $$T_{ij} = \tau_{\text{motor}, i} + \tau_{\text{cognitive}, ij} + e_{ij}$$
   Without empirical baseline motor speed calibration, $\sigma_e^2$ remains unseparated from candidate baseline ability.

---

## R9.8 Cross-Game Convergence Hypotheses

For each parameter, the three sibling micro-games are hypothesized to share a common latent dimension while exhibiting distinct task-specific method variances:

| Parameter | Sibling Games | Shared Construct | Method Variance Contrasts | A-Priori Convergence Hypothesis |
| :--- | :--- | :--- | :--- | :--- |
| **Empathy** | F1, F2, F3 | Interpersonal Attunement | Latency vs. Choice vs. Transition | Positive covariance expected; F1 and F3 covary higher due to motor/latency modality. |
| **Conscientiousness**| A1, A2, A3 | Systematic Rule Following | Direct Rule vs. Exception vs. Vigilance | Positive covariance expected; A1 and A2 share rule-application mechanics. |
| **Collaborative Spirit**| C1, C2, C3 | Prosocial Coordination | Allocation vs. Real-Time Motor vs. Recovery | Positive covariance expected; C1 and C3 reflect social-evaluative strategy. |
| **Emotional Agility**| E1, E2, E3 | Adaptive Cognitive Flexibility | Set-Shifting vs. Cadence vs. Strategy | Positive covariance expected; E1 perseveration negatively correlates with E3 efficiency. |
| **Curiosity** | Q1, Q2, Q3 | Information Seeking | Inspection vs. Depth vs. Utilization | Positive covariance expected; Q1 exploration predicts Q3 insight integration. |
| **Creative Initiative**| CR1, CR2, CR3 | Generative Re-framing | Structural Rarity vs. Pivot vs. Tool Use | Positive covariance expected; CR1 uniqueness covaries with CR3 functional flexibility. |
| **Motivation** | M1, M2, M3 | Autonomous Sustained Effort | Cadence Consistency vs. Continuation vs. Low Feedback | Positive covariance expected; M2 continuation strongly predicts M3 persistence. |

*Status across all 7 parameters:* `EXPECTED_RELATIONSHIP` (numerical correlation coefficients remain strictly `NOT_IDENTIFIED_WITHOUT_EMPIRICAL_DATA`).

---

## R9.9 SJT $\leftrightarrow$ Game Convergence Hypotheses

The Situational Judgement Task and the micro-games assess identical constructs via contrasting measurement methodologies:
- **SJT:** Explicit, conscious, scenario-based declarative judgment in complex interpersonal narratives.
- **Micro-Games:** Implicit, real-time, behavioral enactment under immediate task affordances.

### Formal Convergence Framework
For each parameter $p$:
$$\operatorname{Cov}(\text{SJT}_p, G_{pj}) = \lambda_{\text{SJT}, p} \lambda_{G_{pj}, p} \operatorname{Var}(\theta_p)$$
Because both $\lambda_{\text{SJT}, p} > 0$ and $\lambda_{G_{pj}, p} > 0$, the theoretical model posits **strictly positive covariance** between SJT parameter emphasis and corresponding micro-game performance.

However, cross-method correlation is theoretically attenuated by method variance:
$$r_{\text{SJT}, G_{pj}} = \frac{\lambda_{\text{SJT}} \lambda_{G_j}}{\sqrt{(\lambda_{\text{SJT}}^2 + \sigma_{\text{SJT}}^2)(\lambda_{G_j}^2 + \sigma_{G_j}^2)}}$$
In organizational literature, typical multi-trait multi-method (MTMM) correlations between declarative SJTs and behavioral simulations range from $r = 0.20$ to $r = 0.45$. No higher point value may be assumed.

---

## R9.10 A-Priori Discriminant Validity Matrix

To guarantee scientific falsifiability, every game is assigned explicit theoretical convergence and discriminant hypotheses across constructs:

| Game | Intended Construct | Related Constructs (Weak Association) | Unrelated Constructs (Zero/Near-Zero Association) |
| :--- | :--- | :--- | :--- |
| **F1** | Empathy | Collaborative Spirit | Conscientiousness, Motivation |
| **F2** | Empathy | Collaborative Spirit, Curiosity | Conscientiousness, Motivation |
| **F3** | Empathy | Emotional Agility | Conscientiousness, Creative Initiative |
| **A1** | Conscientiousness | Emotional Agility | Empathy, Creative Initiative |
| **A2** | Conscientiousness | Curiosity | Empathy, Collaborative Spirit |
| **A3** | Conscientiousness | Motivation | Creative Initiative, Collaborative Spirit |
| **C1** | Collaborative Spirit | Empathy | Conscientiousness, Curiosity |
| **C2** | Collaborative Spirit | Empathy | Curiosity, Creative Initiative |
| **C3** | Collaborative Spirit | Emotional Agility | Conscientiousness, Curiosity |
| **E1** | Emotional Agility | Conscientiousness | Empathy, Collaborative Spirit |
| **E2** | Emotional Agility | Motivation | Curiosity, Creative Initiative |
| **E3** | Emotional Agility | Creative Initiative | Collaborative Spirit, Motivation |
| **Q1** | Curiosity | Creative Initiative | Conscientiousness, Motivation |
| **Q2** | Curiosity | Creative Initiative, Conscientiousness | Collaborative Spirit, Empathy |
| **Q3** | Curiosity | Emotional Agility | Collaborative Spirit, Motivation |
| **CR1**| Creative Initiative | Curiosity | Conscientiousness, Motivation |
| **CR2**| Creative Initiative | Emotional Agility | Collaborative Spirit, Conscientiousness |
| **CR3**| Creative Initiative | Curiosity | Empathy, Collaborative Spirit |
| **M1** | Motivation | Conscientiousness | Curiosity, Creative Initiative |
| **M2** | Motivation | Conscientiousness | Curiosity, Creative Initiative |
| **M3** | Motivation | Emotional Agility | Empathy, Creative Initiative |

---

## R9.11 Common-Scale Model

To integrate SJT scores and game features onto a shared metric without committing mathematical malpractice, the common-scale architecture specifies:
1. **Target Scale:** Standardized construct dimension $\theta_p \sim \mathcal{N}(0, 1)$.
2. **Linear Linking Transformation:**
   $$X_{\text{common}} = \frac{X_{\text{raw}} - \alpha_j}{\lambda_j}$$
3. **Uncertainty Propagation:**
   $$\operatorname{SE}(X_{\text{common}}) = \frac{\operatorname{SE}(X_{\text{raw}})}{\lambda_j}$$
4. **Current Identifiability Status:**
   - Architecture: `COMMON_SCALE_MODEL_SPECIFIED`
   - Parameters ($\alpha_j, \lambda_j$): `EMPIRICAL_LINKING_PARAMETERS_REQUIRED`
   - Any attempt to map raw game values directly onto $\theta$ without empirical calibration constants is **strictly prohibited**.

---

## R9.12 Delta Analysis (Equivalence Testing)

When comparing an applicant's performance across different indicators or modalities (e.g., SJT vs. Game) on the common scale, delta analysis evaluates the absolute difference:

$$\Delta = |X_{\text{common}, 1} - X_{\text{common}, 2}|$$

### Covariance-Aware Standard Error of Difference
$$\operatorname{SE}_{\Delta} = \sqrt{\operatorname{SE}_1^2 + \operatorname{SE}_2^2 - 2 \operatorname{Cov}(X_1, X_2)}$$
When $\operatorname{Cov}(X_1, X_2) = 0$ (independent measurement errors):
$$\operatorname{SE}_{\Delta} = \sqrt{\operatorname{SE}_1^2 + \operatorname{SE}_2^2}$$

### Evaluative Logic
1. If $\Delta \le \operatorname{SE}_{\Delta}$: The difference is completely explained by expected measurement uncertainty.
   $$\text{Classification} \rightarrow \mathbf{DELTA\_WITHIN\_MEASUREMENT\_ERROR}$$
2. If $\Delta > \operatorname{SE}_{\Delta}$: The difference exceeds random error, but its substantive importance cannot be determined without an **empirically justified equivalence margin**.

---

## R9.13 Equivalence Margin Status

In the absence of empirical validation data, the status of equivalence margins is as follows:

| Margin Category | Governance Requirement | Current Project Status | Production Permissibility |
| :--- | :--- | :--- | :--- |
| `DELTA_WITHIN_MEASUREMENT_ERROR` | Design sampling variance ($\operatorname{SE}_{\Delta}$) | `ALGORITHMICALLY_VERIFIED` | Permitted in research layer |
| `DELTA_SMALL` | Empirically justified margin ($\delta_{\text{small}}$) | `NOT_DETERMINED` | Prohibited in production |
| `DELTA_MATERIAL` | Empirically justified margin ($\delta_{\text{material}}$) | `NOT_DETERMINED` | Prohibited in production |
| `DELTA_LARGE` | Empirically justified margin ($\delta > \delta_{\text{material}}$) | `NOT_DETERMINED` | Prohibited in production |

*Rule:* Theoretical or synthetic margins are **strictly barred** from issuing substantive candidate classifications.

---

## R9.14 Latent Construct Model

When indicators $Y_1, \dots, Y_K$ are linked to $\theta_p$ with known parameters $(\alpha_j, \lambda_j, \sigma_j^2)$, the optimal minimum-variance linear unbiased estimator (MVLUE) of $\theta_p$ is:

$$\hat{\theta}_p = \frac{\sum_{j=1}^K w_j \left(\frac{Y_j - \alpha_j}{\lambda_j}\right)}{\sum_{j=1}^K w_j}, \quad \text{where } w_j = \frac{\lambda_j^2}{\sigma_j^2}$$
$$\operatorname{SE}(\hat{\theta}_p) = \frac{1}{\sqrt{\sum_{j=1}^K w_j}}$$

### Forbidden Nomenclature
Under no circumstances may $\hat{\theta}_p$ be designated a "true score". Classical true score $T = \mathbb{E}[Y]$ is an expected value on the raw indicator scale, not a latent trait score. Terming latent estimates "true scores" is a severe conceptual violation.

### Current Identifiability Status
- **Specification:** `LATENT_MODEL_SPECIFIED`
- **Numerical Estimation:** `ESTIMATE_NOT_IDENTIFIED_WITHOUT_EMPIRICAL_PARAMETERS`

---

## R9.15 Uncertainty Representation

Every reported quantity in the Alfaaz research layer must explicitly carry its uncertainty payload:
1. **Point Estimates:** Must be paired with a standard error ($\pm \text{SE}$) or a 95% confidence interval.
2. **Proportions:** Bounded in $[0, 1]$ with binomial sampling error.
3. **Continuous Features:** Reported with design-based plausible ranges and missing variance components.
4. **Epistemic Labeling:** Every numerical artifact must state its provenance state: `THEORY_DERIVED`, `MODEL_BASED`, or `ALGORITHMICALLY_VERIFIED`.

---

## R9.16 Sensitivity Analysis: Precision Scaling by Observation Count

To answer the fundamental design question—*“How much precision does the Alfaaz task design provide, and how would precision scale with increased task length?”*—we evaluate standard error across varying trial counts ($N \in \{3, 4, 5, 8, 12, 20\}$) and latent success probabilities ($p \in \{0.50, 0.70, 0.80, 0.90\}$):

| Observation Count ($N$) | Context / Design Meaning | $\text{SE}$ at $p=0.50$ | $\text{SE}$ at $p=0.70$ | $\text{SE}$ at $p=0.80$ | $\text{SE}$ at $p=0.90$ |
| :---: | :--- | :---: | :---: | :---: | :---: |
| **$N = 3$** | **Alfaaz Locked ($A2_{\text{min}}, C2, Q3, CR3$)** | **$0.2887$** | **$0.2646$** | **$0.2309$** | **$0.1732$** |
| **$N = 4$** | **Alfaaz Locked ($F2, Q1$)** | **$0.2500$** | **$0.2291$** | **$0.2000$** | **$0.1500$** |
| **$N = 5$** | **Alfaaz Locked ($A1, A3$)** | **$0.2236$** | **$0.2049$** | **$0.1789$** | **$0.1342$** |
| **$N = 8$** | Extended Protocol (+60% items) | $0.1768$ | $0.1620$ | $0.1414$ | $0.1061$ |
| **$N = 12$** | Double-Length Battery | $0.1443$ | $0.1323$ | $0.1155$ | $0.0866$ |
| **$N = 20$** | Full Psychometric Benchmark | $0.1118$ | $0.1025$ | $0.0894$ | $0.0671$ |

**Scientific Implication:** Increasing item count from $N=3$ to $N=12$ cuts sampling error by exactly $50\%$ ($\sqrt{3/12} = 0.50$). The current locked schedule represents a deliberate compromise prioritizing candidate experience and minimal cognitive fatigue, with the theoretical consequence of wider confidence intervals per individual game.

---

## R9.17 What Is Numerically Identifiable Now (THEORY-DERIVED / DESIGN-BASED MEASUREMENT PRECISION)

The following quantities are identified from task definitions and psychometric sampling theory alone (explicitly labeled `THEORY-DERIVED` or `DESIGN-BASED MEASUREMENT PRECISION`), and are strictly distinct from empirical reliability or empirical calibration:
1. **Design Observation Counts:** Exact $N$ for all 21 games (`THEORY-DERIVED`).
2. **Binomial Sampling Precision:** $\text{SE}(p) = \sqrt{p(1-p)/N}$ for $F2, A1, A2, C2, Q1, Q3, CR3$ (`DESIGN-BASED MEASUREMENT PRECISION`).
3. **Worst-Case Sampling Precision (`SE_max`):** Exact upper bounds on standard error when $p=0.50$ (e.g., $0.2236$ for $A1$; $0.2887$ for $A2$) (`DESIGN-BASED MEASUREMENT PRECISION`).
4. **Physical & Physiological Latency Bounds:** Absolute response latency bounds $[150\text{ ms}, 10000\text{ ms}]$ based on biological motor thresholds and UI interaction timeouts (`THEORY-DERIVED`).
5. **Right-Censored Discrete Count Bounds:** $k \in \{0, 1, 2, 3\}$ for $M2, M3$ (`THEORY-DERIVED`).
6. **Signal Detection Log-Linear Bounds:** $d' \in [-3.0, +3.0]$ for $A3$ (`THEORY-DERIVED`).
7. **Equivalence Bounds for Noise:** Exact standard error of difference $\operatorname{SE}_{\Delta}$ when comparing linked indicators with independent errors (`DESIGN-BASED MEASUREMENT PRECISION`).

---

## R9.18 What Requires Empirical Data

The following quantities **cannot be computed** without consented human participant telemetry:
1. **Empirical Reliability Coefficients:** Split-half reliability, test-retest ICC, McDonald's $\omega$, or Cronbach's $\alpha$.
2. **Latent Factor Loadings ($\lambda_j$):** The discrimination power of each task relative to $\theta_p$.
3. **Indicator Intercepts ($\alpha_j$):** Task difficulty parameters on the common scale.
4. **Error Variances ($\sigma_j^2$):** Residual non-construct task variance.
5. **Observed Population Distributions:** Means, standard deviations, skewness, and normative percentiles.
6. **Empirical Correlation Matrices:** Both convergent ($r_{\text{SJT}, G_j}$) and discriminant ($r_{G_j, G_k}$) correlation values.
7. **Equivalence Margins:** Substantive thresholds defining `DELTA_SMALL`, `DELTA_MATERIAL`, and `DELTA_LARGE`.
8. **Differential Item Functioning (DIF):** Assessment of measurement invariance across demographic groups, devices, or assistive technologies.

---

## R9.19 Production Impact

**Production measurement/scoring behavior unchanged:**
- SJT scoring unchanged
- feature-bands calibration unchanged (`config/feature_bands.json` remains strictly `"UNCALIBRATED"`, with all threshold values set to `null`)
- A1/A2 state unchanged except the previously approved A2 denominator correction
- 19 extractors remain quarantined ($F1$–$F3$, $A3$, $C1$–$C3$, $E1$–$E3$, $Q1$–$Q3$, $CR1$–$CR3$, and $M1$–$M3$)
- no composite score/ranking/fit score introduced

**Production delivery/infrastructure changed:**
- research route handling (`backend/app/routers/research_view.py`)
- Vercel rewrites (`vercel.json`)
- service-worker availability (`frontend/public/service-worker.js`, `frontend/dist/service-worker.js`)

---

## R9.20 Prohibited Inferences

The following inferences and assertions are **categorically prohibited** across all Alfaaz documentation, API responses, and research outputs:
1. Claiming that Alfaaz tasks have been "empirically validated" or possess "proven reliability".
2. Referring to latent trait estimates as an applicant's "true score".
3. Representing theoretical priors or simulation parameters as empirical participant findings.
4. Ranking candidates based on uncalibrated game features or arbitrary composites.
5. Making binary selection decisions using single-game behavioral indicators.
6. Direct comparison between raw SJT band strings and raw game feature values.
7. Using any term from the project's banned word list (e.g., evaluating "character", assigning "personality types", or labeling candidates as "unreliable").
8. Claiming that software tests establish psychometric validity; the implemented mathematical formulations are covered by deterministic tests, but software execution tests do not establish psychometric validity.

---

## R9.21 Next Empirical Validation Requirements

To transition any Alfaaz Recruit measurement parameter from `THEORY_DERIVED` / `MODEL_BASED` to `EMPIRICALLY_ESTIMATED` and `EMPIRICALLY_VALIDATED`, the following scientific milestones must be executed:

1. **Consented Human Dataset:**
   - Advancing to `EMPIRICALLY_ESTIMATED` requires an appropriate consented human dataset. No fixed participant count is imposed by the R9 software layer. Sample-size requirements depend on the estimator, parameter, model complexity, precision target, and intended empirical claim.
   - Collection of fully consented, anonymized telemetry across the complete Latin-square counterbalanced battery.
   - Stratified representation across device categories (mobile, tablet, desktop) and input modalities.
2. **Confirmatory Factor Analysis (CFA):**
   - Fitting of the specified 7-parameter structural equation models to estimate $(\alpha_j, \lambda_j, \sigma_j^2)$.
   - Evaluation of model fit indices (RMSEA $\le 0.06$, CFI $\ge 0.95$, SRMR $\le 0.08$).
3. **Generalizability Theory ($G$-Study):**
   - Partitioning of variance into candidate ($\sigma_p^2$), task facet ($\sigma_t^2$), occasion facet ($\sigma_o^2$), and residual error ($\sigma_{pto, e}^2$).
   - Calculation of Dependability Coefficients ($\Phi$) for short-form decision batteries.
4. **Empirical Equivalence Margin Calibration:**
   - Establishing substantive equivalence margins ($\delta_{\text{small}}, \delta_{\text{material}}$) through receiver operating characteristic (ROC) analysis and empirical standard error distributions.
5. **Independent Algorithmic Review Board Approval:**
   - Formal sign-off on empirical parameter bundles by an independent psychometric review board prior to updating `config/feature_bands.json`.
