# ALFAAZ RECRUIT — CONSTRUCT MAP & PSYCHOMETRIC BOUNDARIES

**Status:** Provisional / Exploratory Research Mapping  
**Authority:** Aligned with authoritative definitions in `config/parameters.json` and Brief v2 §10.7.

---

## 1. Foundational Guardrails & Methodological Limits

1. **Exploratory Research Tool:** Alfaaz Recruit is a calibration-stage data collection instrument for unpaid volunteer recruitment. It is **not** an accredited psychological test, validated psychometric instrument, or automated selection mechanism.
2. **Organizational Parameter Definitions:** "Collaborative Spirit", "Emotional Agility", and "Creative Initiative" are custom, organizationally defined Alfaaz parameters and do not map directly to singular Big Five or DSM constructs.
3. **Behavioral Analogues vs Internal States:**
   - **Rule-Shift Tasks (Emotional Agility):** Provide behavioral set-shifting and cognitive flexibility evidence under changing rules; they do **not** directly measure subjective internal emotional states, distress tolerance, or emotional regulation.
   - **Repetitive Persistence Tasks (Motivation):** Capture behavioral stamina and voluntary persistence on routine tasks; this represents only one narrow facet of the parameter and is **not** equivalent to multidimensional volunteer motivation, commitment, or mission-alignment in academic literature.
   - **Signal Tuning & Cues (Empathy):** Measure behavioral responsiveness to state cues; they do not measure deep clinical empathy or personal moral integrity.
4. **Demand Characteristics:** All candidates operate under the knowledge that they are participating in a volunteer onboarding assessment. Stated choices and behavioral actions are subject to social desirability and task-specific framing.
5. **No Averaging / Scale Separation:** SJT scores are relative-emphasis ipsative distributions. Game metrics are observational features. **SJT and game bands are never averaged.**

---

## 2. Parameter-to-Feature Mapping

### 2.1 Empathy (`empathy`)
- **Authoritative Definition:** Attunement to interpersonal cues, perspective-taking, and active listening.
- **Behavioral Facets:**
  - `attunement_to_cues` (F1: Cue Detection)
  - `clarification_under_ambiguity` (F2: Ambiguous Cue)
  - `perspective_updating` (F3: Context Change)
- **Features Logged:**
  - `cue_response_latency_ms`: Response latency following subtle partner cue onset.
  - `contextual_adjustment_accuracy`: Proximity to partner target balance.
  - `clarification_vs_assumption_ratio`: Seeking clarification when social cues are ambiguous.
  - `post_shift_adaptation_latency_ms`: Time required to update settings following environmental shift.
- **Nearest Research Constructs:** Affective Attunement, Interpersonal Sensitivity, Communicative Clarification Inquiry.
- **Known Limitations:** Laboratory tuning simulations cannot replicate long-term interpersonal trust or emotional resonance in live community spaces.

### 2.2 Conscientiousness (`conscientiousness`)
- **Authoritative Definition:** Attention to detail, follow-through, methodological discipline, and verification under uncertainty.
- **Behavioral Facets:**
  - `rule_governed_sorting` (A1: Classification)
  - `diligence_under_ambiguity` (A2: Exception Handling)
  - `self_correction_and_verification` (A3: Quality Control)
- **Features Logged:**
  - `classification_rule_adherence_rate`: Correct categorization across multi-attribute items.
  - `verification_duration_ratio`: Time spent inspecting criteria/metadata vs rapid clicking.
  - `exception_flagging_precision`: Accurate identification and flagging of protocol edge-cases.
  - `error_detection_sensitivity`: Sensitivity ($d'$) to discrepancies in retrospective ledger audit.
  - `false_alarm_rate`: Erroneous edits made to clean records.
- **Nearest Research Constructs:** Detail Attentiveness, Rule Compliance, Post-hoc Error Correction.
- **Known Limitations:** In the SJT, conscientiousness heavily reflects structured rule-keeping. The game battery introduces active verification and checking to measure empirical thoroughness.

### 2.3 Collaborative Spirit (`collaborative_spirit`)
- **Authoritative Definition:** Willingness to share credit, support peers, communicate transparently, and build collective momentum.
- **Behavioral Facets:**
  - `prosocial_resource_sharing` (C1: Resource Cooperation)
  - `interpersonal_synchrony_and_pacing` (C2: Coordination)
  - `constructive_alignment_repair` (C3: Collaboration Repair)
- **Features Logged:**
  - `need_sensitive_sharing_index`: Differential resource transfer when peer is depleted vs full.
  - `coordination_collision_avoidance_rate`: Avoidance of destructive simultaneous overwrites.
  - `constructive_repair_score`: Quality and integration of repair actions during joint task misalignment.
- **Nearest Research Constructs:** Prosocial Resource Allocation, Cooperative Interaction, Collaborative Problem Repair.
- **Known Limitations:** Interaction takes place with a deterministic computer-controlled partner (explicitly disclosed). Partner behavior is scripted, not genuine human co-creation.

### 2.4 Emotional Agility (`emotional_agility`)
- **Authoritative Definition:** Adaptability under ambiguity, resilience following setbacks, and openness to evolving contexts.
- **Behavioral Facets:**
  - `cognitive_flexibility_under_rule_change` (E1: Rule Shift)
  - `post_interruption_stability` (E2: Setback Recovery)
  - `strategy_adaptation` (E3: Changing Conditions)
- **Features Logged:**
  - `perseverative_error_count`: Errors committed adhering to obsolete rules post-shift.
  - `trials_to_criterion_post_shift`: Trials needed to adapt to newly active criteria.
  - `cadence_stability_ratio`: Ratio of assembly latency post-reset relative to pre-reset baseline.
  - `strategy_shift_efficiency`: Pathing efficiency across constrained vs open grid densities.
- **Nearest Research Constructs:** Wisconsin Card Sorting (Set-Shifting), Behavioral Recovery Post-Interruption.
- **Known Limitations:** Measures behavioral flexibility and task recovery, not emotional coping, subjective stress, or lived emotional maturity.

### 2.5 Curiosity (`curiosity`)
- **Authoritative Definition:** Desire to learn, explore unfamiliar ideas, probe beneath the surface, and connect disparate fields.
- **Behavioral Facets:**
  - `epistemic_exploration` (Q1: Optional Discovery)
  - `perceptual_inquiry` (Q2: Mystery Exploration)
  - `knowledge_synthesis` (Q3: Information Integration)
- **Features Logged:**
  - `optional_alcove_exploration_rate`: Proportion of unrequired archival alcoves visited.
  - `epistemic_dwell_duration_ratio`: Dwell time in optional exploration zones relative to total time.
  - `anomaly_investigation_depth`: Layers of inquiry unfolded when inspecting anomalous stimuli.
  - `integrated_insight_utilization`: Application of optional insights to solve downstream curation puzzles.
- **Nearest Research Constructs:** Epistemic Curiosity, Voluntary Information Seeking, Incidental Knowledge Transfer.
- **Known Limitations:** Candidates may explore simply due to novelty in a gamified context. Dwell time alone does not guarantee cognitive reflection.

### 2.6 Creative Initiative (`creative_initiative`)
- **Authoritative Definition:** Generative thinking, willingness to experiment, problem-solving with incomplete resources, and aesthetic agency.
- **Behavioral Facets:**
  - `divergent_problem_solving` (CR1: Open Construction)
  - `ideational_flexibility` (CR2: Constraint Shift)
  - `functional_flexibility` (CR3: Unspecified Tool Use)
- **Features Logged:**
  - `solution_uniqueness_index`: Graph dissimilarity of functional structure compared to standard templates.
  - `attempt_chain_progression`: Entropy of block variety across sequential iterations.
  - `creative_pivot_latency_ms`: Latency to formulate alternative mechanism upon primary tool depletion.
  - `functional_fixedness_overcome_rate`: Rate of unconventional tool affordance utilization.
- **Nearest Research Constructs:** Divergent Assembly, Overcoming Functional Fixedness, Ideational Fluency.
- **Known Limitations:** First-try direct solutions are not penalized. Constrained 2D mechanics capture structural reasoning rather than expansive literary or artistic expression.

### 2.7 Motivation (`motivation`)
- **Authoritative Definition:** Intrinsic drive, dedication to craft, proactive ownership, and steady persistence.
- **Behavioral Facets:**
  - `baseline_task_completion` (M1: Minimum Completed)
  - `voluntary_persistence` (M2: Optional Continuation)
  - `intrinsic_stamina` (M3: Persistence Under Reduced Reward)
- **Features Logged:**
  - `mandatory_cadence_consistency`: Coefficient of variation of completion durations on required units.
  - `optional_units_completed`: Count of voluntary units formatted beyond mandatory minimum (right-censored at ceiling).
  - `voluntary_duration_ms`: Total voluntary duration invested in routine formatting.
  - `reduced_feedback_persistence_count`: Units completed when visual confirmation cues are attenuated.
- **Nearest Research Constructs:** Task Persistence, Effort Allocation, Self-Regulated Routine Work.
- **Known Limitations:** Stopping at the minimum is completely valid and neutral; it must never be interpreted as "low motivation" for the broader organization. Right-censoring prevents confounding speed with commitment.

---

## 3. Data Integrity & Reporting Rules
- **Template Sentences Only:** Report generation relies exclusively on deterministic templates bound to calibrated or uncalibrated raw features. No generative LLM is permitted in the measurement pipeline.
- **Banned Words:** The word linting filter enforces absolute exclusion of evaluative or moralizing labels (e.g. `careless`, `lazy`, `fake`, `dishonest`, `hypocritical`, `hire`, `reject`).
- **Research Safeguards:** All views explicitly present random responder reference distributions and remind reviewers of the non-evaluative, exploratory nature of the tool.
