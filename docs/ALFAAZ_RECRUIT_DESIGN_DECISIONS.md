# Alfaaz Recruit: 14-Game Design Resolution & Candidate Proposals

**Status:** Design Freeze v1 + Addendum v1.1 Approved — Implementation Phase  
**Purpose:** Documents candidate design directions and the transition to the owner-approved Design Freeze v1 across all 21 mini-games.

> **NOTE (DESIGN FREEZE v1 + ADDENDUM v1.1 SUPERSEDING NOTE):** The earlier "14 directions" count was ambiguous and is formally superseded by Design Freeze v1 + Addendum v1.1. In the authoritative R4 counterbalancing table (`backend/app/services/world_order.py`), World 7 begins in Position 0 at Rows 6 and 9 (0-indexed). Bibliographic citation: Koechlin, E., Ody, C., & Kouneiher, F. (2003). "The architecture of cognitive control in the human prefrontal cortex." *Science*, 302(5648), 1181–1185. DOI: 10.1126/science.1088545 provides theoretical rationale for cognitive control and contextual adaptation only; it does NOT empirically validate any Alfaaz mini-game. No literature source is claimed as read unless its primary text was consulted.

---

## 1. Overview & Construct-Preservation Mandate

The pre-implementation research audit established that 14 mini-games cannot be implemented or unquarantined in their current state. To ensure scientific integrity, all proposed directions must preserve the construct-essential element of each domain:

- **Empathy (World 1: The Soundscape / The Frequency):** Partner-state information that changes which response is context-appropriate, including trials where pursuing the primary task without alteration is correct.
- **Collaborative Spirit (World 3: The Shared Canvas):** A simulated partner or shared resource with genuine need, paired with rigorous no-need control conditions.
- **Emotional Agility (World 4: The Shifting Patterns / The Shifting Grid):** A scripted change or setback with behavioral recovery measured; strictly zero disclosure of the rule, shift, or construct.
- **Curiosity (World 5: The Hidden Gallery):** Downstream information integration where voluntarily discovered context from earlier exploration (Q1/Q2) can be actively applied, with zero reward, zero score incentive, and zero task demand.
- **Creative Initiative (World 6: The Workshop Bench / The Broken Tool):** Repeated attempts with objective feedback; immediate first-try success is fully credited and never penalized; variety, click counts, or random exploration are never scored.
- **Motivation (World 7: The Final Gathering / The Repetition):** Stated minimum baseline, voluntary optional continuation, mechanical continuity with M2, and completely honest non-deceptive wording.

**Explicit Exclusions:** The directions below reject and exclude:
- Turning games into categorization, proofreading, QC, checklist, or procedural compliance;
- Using rating, ranking, or multiple-choice item selection (SJT vignette formats);
- Relying on subjective aesthetic preferences;
- Scoring click counts or erratic exploratory variety;
- Reusing mechanics across worlds without a construct-based justification.

---

## 2. Parameter 1: Empathy (World 1: The Soundscape / The Frequency)

### F1: Tuning the Hall
- **Target Parameter:** `empathy`
- **Behavioral Facet Preserved:** `attunement_to_cues`
- **Nearest Research Domain / Construct:** Perceptual perspective-taking, acoustic cue sensitivity.
- **Identified Problem:** 1 single audio slider trial; lacks partner-state cues and non-accommodation control trials, risking the conflation of empathy with indiscriminate slider tampering.

#### Direction A (PROPOSED: needs owner approval)
- **Mechanic Description:** Interactive acoustic monitoring of a live poetry rehearsal. A partner status indicator reflects the reciter's current vocal delivery (whispering quiet verse, full projection, pausing). Candidate adjusts monitor level only when reciter delivery shifts.
- **Repeated Opportunities & Expected Observations:** 3 distinct recital rehearsal trials. `OBSERVATIONS_PER_FEATURE`: **3**.
- **Control Condition:** In Trial 2 (Control), the reciter's state indicator confirms: *"Acoustics clear; vocal resonance effortless."* Pursuing the performance without moving the slider is the correct context-appropriate response. Moving the slider in Trial 2 represents unnecessary tampering. In Trials 1 and 3, partner cues explicitly signal acoustic strain or excessive reverberation requiring attenuation.
- **Primary Nuisance Demand:** Motor slider precision and visual contrast.
- **Task Condition Ground Truth (Server Immutable):** `trial_index` (1..3), `partner_state_cue` ("whispering", "projecting", "pausing", "clear"), `condition_type` ("reverberation_shift" vs "no_adjustment_control").
- **Client Observable Behavior (Raw Telemetry):** `trial_presented` (t_ms), `slider_input` (t_ms, slider_position_raw, input_modality), `trial_confirmed` (t_ms, final_slider_position).
- **Derived Later (Server Feature Engine):** `first_slider_move_latency_ms`, `slider_delta_from_baseline`, `tampering_during_control_trial`.
- **Estimated Duration:** **ESTIMATE: 21–24 seconds** (3 trials $\times$ 7–8 seconds). Feasible within budget.
- **Accessibility Alternative:** Keyboard slider stepping (Arrow keys); stepper buttons (- / +); audio wave rendered with high-contrast amplitude guides.
- **Rationale for Measurement Improvement:** Evaluates whether candidate actively checks partner state before adjusting settings rather than assuming adjustment is always desired.
- **What the Task Cannot Establish:** Cannot prove generalized interpersonal empathy in non-acoustic social situations.

#### Direction B (PROPOSED: needs owner approval)
- **Alternative Approach:** Discrete 3-stage sound check balance where candidate toggles monitor channels to match reciter's indicated ear comfort.
- **Budget Status:** ESTIMATE: 20 seconds.

---

### F2: The Gathering Voices
- **Target Parameter:** `empathy`
- **Behavioral Facet Preserved:** `cognitive_perspective_taking`
- **Nearest Research Domain / Construct:** Cognitive Perspective-Taking / Theory of Mind.
- **Identified Problem:** Implemented as a single multiple-choice text question (`F2_ASK`, `F2_TEST`, `F2_HOLD`), duplicating the SJT format inside the game battery.

#### Direction A (REVISE — PROPOSED: needs owner approval)
- **Mechanic Description:** Interactive multi-track acoustic balance. Candidate adjusts an accompaniment audio track while a simulated reciter recites poetry. In response to dynamic partner vocal feedback (displayed visually via subtle pacing changes or delivery notes), candidate adjusts balance. Must remain an interactive behavioral task; must not become a text vignette or SJT-like item.
- **Repeated Opportunities & Expected Observations:** 3 interactive balancing trials. `OBSERVATIONS_PER_FEATURE`: **3**.
- **Control Condition:** In Trial 2 (Control), partner vocal cadence is steady and accompaniment volume is optimal; candidate must leave the balance untouched while recital continues. In Trials 1 and 3, partner's delivery falters due to loud backing instruments, requiring candidate to attenuate background sound.
- **Primary Nuisance Demand:** Auditory/visual tracking and reaction speed.
- **Task Condition Ground Truth (Server Immutable):** `trial_index` (1..3), `track_id`, `partner_cue_cadence`, `target_attenuation_ratio`.
- **Client Observable Behavior (Raw Telemetry):** `track_started` (t_ms), `fader_input` (t_ms, fader_position_raw, input_modality), `balance_confirmed` (t_ms, final_fader_position).
- **Derived Later (Server Feature Engine):** `fader_delta`, `cue_to_input_latency_ms`, `target_convergence_error`.
- **Estimated Duration:** **ESTIMATE: 27–30 seconds**.
- **Time-Budget Limitation Note:** Reliable multi-trial behavioral perspective-taking within 30 seconds is borderline tight. If candidate takes >10 seconds per trial, reliable measurement within the 35 s cap is compromised.
- **Accessibility Alternative:** Visual dynamic volume meters and text closed-captioning of vocal cadence.
- **Rationale for Measurement Improvement:** Replaces a static verbal multiple-choice quiz with active behavioral cue-attunement under real-time simulated performance demands.
- **What the Task Cannot Establish:** Cannot diagnose emotional perspective-taking outside of acoustic coordination tasks.

#### Direction B (PROPOSED: needs owner approval)
- **Alternative Approach:** If interactive multi-track balance cannot be reliably executed within 35 seconds across diverse hardware, flag F2 for formal battery redesign or structural simplification.

---

### F3: The Echo of the Room
- **Target Parameter:** `empathy`
- **Behavioral Facet Preserved:** `context_sensitive_updating`
- **Nearest Research Domain / Construct:** Context-Sensitive Updating & Social Attunement.
- **Identified Problem:** 1-shot slider adjustment of hall resonance; lacks partner-state feedback, dynamic transition stimuli, and provides only $N=1$.

#### Direction A (REVISE — PROPOSED: needs owner approval)
- **Mechanic Description:** Dynamic environmental transition where the recital moves from an indoor salon to a stone courtyard. Reciter communicates experiential feedback regarding courtyard resonance.
- **Repeated Opportunities & Expected Observations:** 2 sequential hall transitions. `OBSERVATIONS_PER_FEATURE`: **2**.
- **Limited Repeated Opportunities ($N=2$) Note:** Due to the 15–35 second total time budget, only 2 transitions can be executed (12–14 seconds per transition). Expanding to $N \ge 3$ transitions would require 40–45 seconds, exceeding the 35s budget cap. Therefore, $N=2$ is recognized as an explicit design limitation.
- **Control Condition:** In Transition 1, the partner reciter signals vocal strain from courtyard echo (*"Courtyard stones are muddying the verse"*), requiring resonance reduction. In Transition 2 (Control), the reciter signals comfort with natural courtyard acoustics (*"Courtyard ambiance matches the poem tone"*); maintaining current resonance without alteration is correct.
- **Primary Nuisance Demand:** Perceptual change detection.
- **Task Condition Ground Truth (Server Immutable):** `transition_index` (1..2), `venue_profile_id`, `optimal_dampening_ratio`.
- **Client Observable Behavior (Raw Telemetry):** `transition_rendered` (t_ms), `slider_input` (t_ms, slider_position_raw, input_modality), `setting_confirmed` (t_ms, final_slider_position).
- **Derived Later (Server Feature Engine):** `adaptation_latency_ms`, `slider_adjustment_delta`, `context_alignment_score`.
- **Estimated Duration:** **ESTIMATE: 24–28 seconds**.
- **Accessibility Alternative:** Numerical reverb percentage indicators alongside visual meter; keyboard stepping.
- **Rationale for Measurement Improvement:** Evaluates whether acoustic recalibration is driven by partner comfort rather than reflexive retuning.
- **What the Task Cannot Establish:** Cannot establish broad cognitive flexibility (which is measured in World 4).

#### Direction B (PROPOSED: needs owner approval)
- **Alternative Approach:** 3 rapid discrete acoustic checks (6 seconds each), enabling $N=3$ within 25 seconds by removing continuous sliders in favor of stepped presets.

---

## 3. Parameter 3: Collaborative Spirit (World 3: The Shared Canvas)

### C1: The Artisan's Basket
- **Target Parameter:** `collaborative_spirit`
- **Behavioral Facet Preserved:** `need_sensitive_resource_sharing`
- **Nearest Research Domain / Construct:** Prosocial Resource Allocation & Need-Sensitive Equity.
- **Identified Problem:** 1 single tile transfer trial (8 vs 2 tiles); lacks control conditions where sharing is unnecessary or counterproductive, violating the construct boundary: *Collaborative Spirit $\neq$ Unilateral Altruism*.

#### Direction A (PROPOSED: needs owner approval)
- **Mechanic Description:** Multi-round mosaic tile allocation where candidate distributes tiles from their station to a partner's station across varying demand states.
- **Repeated Opportunities & Expected Observations:** 3 distinct allocation rounds with varying partner reserve and quota requirements. `OBSERVATIONS_PER_FEATURE`: **3**.
- **Control Condition (Round 2 — No-Need Control):** Partner holds 7 tiles and requires only 4 to complete their section (partner has a surplus). Candidate holds 5 tiles and requires 5. Transferring tiles to partner in Round 2 is wasteful, deprives candidate's station, and slows overall project completion. Keeping tiles is contextually appropriate. In Round 1, partner has a genuine deficit (holds 2, needs 5; candidate holds 8; transferring 3 is needed). In Round 3, mutual tight budgets require exact balanced allocation.
- **Primary Nuisance Demand:** Numerical arithmetic comprehension.
- **Task Condition Ground Truth (Server Immutable):** `round_index` (1..3), `partner_supply_initial`, `partner_quota_target`, `own_supply_initial`, `own_quota_target`, `condition_type` ("partner_need" vs "no_need_control").
- **Client Observable Behavior (Raw Telemetry):** `round_presented` (t_ms), `tile_transferred` (t_ms, transfer_count_raw, input_modality), `round_confirmed` (t_ms).
- **Derived Later (Server Feature Engine):** `surplus_offered_ratio`, `unnecessary_transfer_during_control`, `confirmation_latency_ms`.
- **Estimated Duration:** **ESTIMATE: 24 seconds** (3 rounds $\times$ 8 seconds). Feasible within budget.
- **Accessibility Alternative:** Tabular summary of partner needs alongside graphical baskets; standard keyboard stepper buttons (- / +).
- **Rationale for Measurement Improvement:** Directly dissociates thoughtful, need-sensitive collaboration from mindless altruistic compliance or reflexive 50/50 splitting.
- **What the Task Cannot Establish:** Cannot measure real-time verbal negotiation or conflict resolution.

#### Direction B (PROPOSED: needs owner approval)
- **Alternative Approach:** Proportional allocation slider under explicit shared project deadline constraint.
- **Budget Status:** ESTIMATE: 22 seconds.

---

### C2: The Gallery Wall
- **Target Parameter:** `collaborative_spirit`
- **Behavioral Facet Preserved:** `complementary_role_coordination`
- **Nearest Research Domain / Construct:** Team Coordination & Mutual Accommodation.
- **Identified Problem:** Single 1-click slot selection on a static wall; confounded by visual symmetry perception rather than social coordination; limited to $N=1$.

#### Direction A (REVISE — PROPOSED: needs owner approval)
- **Mechanic Description:** Sequential turn-taking placement on a shared exhibition wall. Candidate places artwork in response to partner's prior placement.
- **Repeated Opportunities & Expected Observations:** 2 sequential placement turns. `OBSERVATIONS_PER_FEATURE`: **2**.
- **Limited Repeated Opportunities ($N=2$) Note:** 2 interactive placement turns require ~24 seconds (12s per turn). Adding a 3rd turn would push total duration to ~36 seconds, exceeding the 35s budget cap. Therefore, $N=2$ is documented as a constrained observation ceiling under the current battery time budget.
- **Control Condition:** In Turn 1, partner has placed a dominant wide canvas leaving a specific complementary alcove; coordinating placement in the alcove harmonizes the wall. In Turn 2 (Control), partner has placed an isolated decorative plaque in an exterior corner that does not constrain the central wall; candidate placing centrally without altering their plan is the correct independent action (forced clustering is counterproductive).
- **Primary Nuisance Demand:** Spatial layout visualization.
- **Task Condition Ground Truth (Server Immutable):** `round_index` (1..2), `simulated_partner_coordinates` ([row, col]), `canvas_grid_dimensions`.
- **Client Observable Behavior (Raw Telemetry):** `canvas_rendered` (t_ms), `slot_selected` (t_ms, selected_row, selected_col, input_modality), `placement_confirmed` (t_ms).
- **Derived Later (Server Feature Engine):** `decision_latency_ms`, `workspace_overlap_flag`, `spatial_complementarity_distance`.
- **Estimated Duration:** **ESTIMATE: 24 seconds**.
- **Accessibility Alternative:** Semantic text descriptions of wall grid coordinates ("North Alcove", "Center Gallery", "South Plaque").
- **Rationale for Measurement Improvement:** Evaluates active mutual accommodation across sequential turns rather than static visual symmetry.
- **What the Task Cannot Establish:** Cannot measure leadership emergence or verbal group dynamics.

#### Direction B (PROPOSED: needs owner approval)
- **Alternative Approach:** Two-phase wall balance under asymmetric lighting where candidate coordinates lighting angle to complement partner's display.
- **Budget Status:** ESTIMATE: 25 seconds.

---

### C3: The Dual Lanterns
- **Target Parameter:** `collaborative_spirit`
- **Behavioral Facet Preserved:** `collaborative_misalignment_repair`
- **Nearest Research Domain / Construct:** Dynamic Resource Reallocation & Backup Behavior.
- **Identified Problem:** 1-shot slider split with an obvious 5–5 default middle; lacks multi-step balance repair or variable room demand.

#### Direction A (PROPOSED: needs owner approval)
- **Mechanic Description:** Shared spotlight lantern allocation across Room A (candidate) and Room B (partner) under changing exhibition traffic.
- **Repeated Opportunities & Expected Observations:** 3 sequential lighting distribution rounds. `OBSERVATIONS_PER_FEATURE`: **3**.
- **Control Condition (Round 2 — Own High Demand / Partner No-Need):** Room A hosts a delicate manuscript inspection requiring 7 lanterns; Room B is in natural daylight requiring only 3. A 5–5 split under-lights Room A and wastes light in Room B. Candidate must appropriately retain lanterns while satisfying partner's minimum. In Round 1, Room B has high demand (needs 7), requiring candidate to allocate surplus lanterns.
- **Primary Nuisance Demand:** Ratio estimation and budget allocation.
- **Task Condition Ground Truth (Server Immutable):** `round_index` (1..3), `room_A_demand`, `room_B_demand`, `total_pool_size`, `condition_type` ("balanced" vs "emergency_deficit").
- **Client Observable Behavior (Raw Telemetry):** `round_presented` (t_ms), `slider_input` (t_ms, slider_ratio_raw, input_modality), `allocation_confirmed` (t_ms).
- **Derived Later (Server Feature Engine):** `allocation_equity_ratio`, `shortage_mitigation_index`, `deliberation_latency_ms`.
- **Estimated Duration:** **ESTIMATE: 24 seconds** (3 rounds $\times$ 8 seconds). Feasible within budget.
- **Accessibility Alternative:** Numeric lantern count readouts (e.g. "Room A: 7, Room B: 3"); Arrow-key slider stepping.
- **Rationale for Measurement Improvement:** Eliminates the lazy middle-split heuristic; evaluates genuine functional cooperation under operational constraints.
- **What the Task Cannot Establish:** Cannot measure interpersonal trust or emotional alliance.

#### Direction B (PROPOSED: needs owner approval)
- **Alternative Approach:** Interactive circuit repair where candidate restores power to partner's darkened display before lighting their own.
- **Budget Status:** ESTIMATE: 26 seconds.

---

## 4. Parameter 4: Emotional Agility (World 4: The Shifting Patterns / The Shifting Grid)

### E1: The Ceramic Mosaic
- **Target Parameter:** `emotional_agility`
- **Behavioral Facet Preserved:** `behavioral_adaptation_under_rule_change`
- **Nearest Research Domain / Construct:** Cognitive Set-Shifting / Executive Flexibility (Informed by WCST paradigms; Note: E1 is an Alfaaz exploratory task inspired by WCST, NOT a validated WCST analog).
- **Identified Problem:** Client explicitly announces the rule shift with a prominent banner (`Active Rule: Match by Shape`) and dynamically relabels target bins, destroying the measurement of cognitive flexibility and converting the task into reading compliance.

#### Direction A (PROPOSED: needs owner approval)
- **Mechanic Description:** Sorting geometric tiles into two static containers based on multi-attribute feedback. Containers display static exemplar icons (Container 1: Gold Circle; Container 2: Sage Square) that NEVER change text labels or visual icons.
- **Unannounced Shift & Feedback Rule:** Trials 1–5 sort by Color (established rule). Candidate discovers rule via subtle placement confirmation ("Tile Accepted" vs "Tile Returned"). At Trial 6, the rule shifts unannounced to Shape. Container labels and appearances NEVER change.
- **Repeated Opportunities & Expected Observations:** 10 sequential sorting trials. Trials 1–5 establish rule baseline; Trials 6–10 provide **5 post-shift adaptation trials** to observe perseverative errors and recovery. `OBSERVATIONS_PER_FEATURE`: **10** (5 post-shift trials).
- **Control Condition:** Trials 1–5 establish intra-individual baseline sorting speed and accuracy under an intact rule.
- **Primary Nuisance Demand:** Perceptual processing speed and motor clicking.
- **Task Condition Ground Truth (Server Immutable):** `trial_index` (1..10), `card_id`, `card_color`, `card_shape`, `latent_rule_schedule` (1–5: color, 6–10: shape), `container_exemplars` (1: Gold Circle, 2: Sage Square).
- **Client Observable Behavior (Raw Telemetry):** `card_presented` (t_ms), `container_clicked` (t_ms, selected_container ["container_1" | "container_2"], input_modality).
- **Derived Later (Server Feature Engine):** `is_error`, `perseverative_error` (matches discontinued rule), `response_latency_ms`, `post_shift_switch_cost`.
- **Estimated Duration:** **ESTIMATE: 25 seconds** (10 trials $\times$ 2.5 seconds). Feasible within budget.
- **Accessibility Alternative:** High-contrast pattern fills (stripes vs dots) in addition to colors; keyboard inputs '1' and '2'.
- **Rationale for Measurement Improvement:** Eliminates reading compliance confound; measures genuine perseverative errors and post-shift behavioral recovery without disclosing the rule change.
- **What the Task Cannot Establish:** Cannot establish clinical executive function deficits or real-world emotional resilience under life stress.

#### Direction B (PROPOSED: needs owner approval)
- **Alternative Approach:** Subtle ambient background tint shift cued without explicit verbal instructions.
- **Budget Status:** ESTIMATE: 25 seconds.

---

### E2: The Unexpected Guest
- **Target Parameter:** `emotional_agility`
- **Behavioral Facet Preserved:** `constructive_disruption_response`
- **Nearest Research Domain / Construct:** Disruption Recovery & Affective Equilibrium.
- **Identified Problem:** 1-shot multiple-choice question (`QUICK_FIX`, `ASK_TEAM`, `FINISH_FIRST`), replicating SJT format inside the game battery.

#### Direction A (REVISE — PROPOSED: needs owner approval)
- **Mechanic Description:** Candidate executes an interactive mosaic alignment task. At second 10, an unexpected scripted environmental disruption occurs (a simulated wind gust dislodges 2 placed tiles with a brief visual vibration, resetting those 2 tiles to the staging bench). Candidate must re-align them and continue.
- **Repeated Opportunities & Accurate Observation Count:**
  - *Disruption Recovery Latency:* **`SINGLE_OBSERVATION` ($N=1$)**. The disruption event occurs once; recovery latency is a single observation.
  - *Post-Setback Cadence Stability:* **$N=3\text{--}4$ post-disruption placements**.
  - Total observations: $N=1$ for recovery latency, $N=4$ for post-setback accuracy.
- **Control Condition:** Pre-disruption trials 1–4 establish baseline placement speed and accuracy as an intra-individual control.
- **Primary Nuisance Demand:** Motor recovery latency and startle response.
- **Task Condition Ground Truth (Server Immutable):** `disruption_event_id`, `disruption_onset_ms`, `option_catalog` (IDs: opt_1, opt_2, opt_3).
- **Client Observable Behavior (Raw Telemetry):** `disruption_rendered` (t_ms), `option_clicked` (t_ms, selected_option_id, input_modality), `response_confirmed` (t_ms).
- **Derived Later (Server Feature Engine):** `deliberation_latency_ms`, `coping_strategy_classification`, `recovery_trajectory`.
- **Estimated Duration:** **ESTIMATE: 25–28 seconds**. Feasible within budget.
- **Accessibility Alternative:** Keyboard Spacebar to acknowledge/stabilize; no speed-penalty disqualification.
- **Rationale for Measurement Improvement:** Captures authentic behavioral recovery of task rhythm following an unexpected operational setback rather than self-reported coping intentions.
- **What the Task Cannot Establish:** Cannot measure recovery from deep emotional trauma or chronic interpersonal conflict.

#### Direction B (PROPOSED: needs owner approval)
- **Alternative Approach:** Dual-disruption protocol (disruption at second 8 and second 18), providing $N=2$ recovery latency observations within 32 seconds.
- **Budget Status:** ESTIMATE: 32 seconds.

---

### E3: The Geometric Harmony
- **Target Parameter:** `emotional_agility`
- **Behavioral Facet Preserved:** `equilibrium_under_ambiguity`
- **Nearest Research Domain / Construct:** Dynamic Constraint Adaptation.
- **Identified Problem:** 1-shot motif preference click (diamond vs wave vs dots); heavily confounded by subjective aesthetic taste.

#### Direction A (REVISE — PROPOSED: needs owner approval)
- **Mechanic Description:** Assembling an interlocking floor pattern under changing boundary constraints. After 3 tiles are placed, a dynamic structural constraint shifts (e.g. water drainage channel expands, blocking the planned western pathway and requiring rerouting through the eastern pathway).
- **Repeated Opportunities & Accurate Observation Count:**
  - *Initial Adaptation Latency:* **`SINGLE_OBSERVATION` ($N=1$)** upon boundary shift.
  - *Post-Shift Execution Placements:* **$N=2\text{--}3$ placements** under the new constraint.
- **Control Condition:** Pre-change baseline placement rate across trials 1–3.
- **Primary Nuisance Demand:** Spatial pathfinding.
- **Task Condition Ground Truth (Server Immutable):** `stage_id`, `constraint_shift_onset_ms`, `blocked_pathway_coordinates`, `open_pathway_coordinates`.
- **Client Observable Behavior (Raw Telemetry):** `stage_rendered` (t_ms), `tile_action` (t_ms, action_type ["place" | "remove"], row, col, input_modality), `pattern_submitted` (t_ms).
- **Derived Later (Server Feature Engine):** `adaptation_latency_ms`, `placements_against_blocked_pathway`, `successful_rerouting_achieved`.
- **Estimated Duration:** **ESTIMATE: 24–28 seconds**. Feasible within budget.
- **Accessibility Alternative:** Screen reader announcements of blocked vs open pathways; grid coordinate selection.
- **Rationale for Measurement Improvement:** Evaluates objective behavioral adaptation to changing constraints rather than subjective aesthetic taste.
- **What the Task Cannot Establish:** Cannot measure broad emotional tolerance of life ambiguity.

#### Direction B (PROPOSED: needs owner approval)
- **Alternative Approach:** Continuous boundary constriction challenge where candidate rapidly fits remaining pieces into shrinking grid space.
- **Budget Status:** ESTIMATE: 26 seconds.

---

## 5. Parameter 5: Curiosity (World 5: The Hidden Gallery)

### Q3: The Inscription / Downstream Information Integration
- **Target Parameter:** `curiosity`
- **Behavioral Facet Preserved:** `downstream_information_application`
- **Nearest Research Domain / Construct:** Epistemic Information Seeking & Knowledge Integration.
- **Identified Problem:** Implemented as a 3-card multiple-choice preference selector (`catalog`, `curator`, `archival`), providing no behavioral exploration stream.

#### Direction A (REVISE — PROPOSED: needs owner approval)
- **Mechanic Description:** Downstream information integration task. Candidate is sorting and cataloging ambiguous ancient folios. In earlier mini-games (Q1's optional cultural alcoves and Q2's uncataloged seal), optional background provenance details were available for voluntary inspection. In Q3, candidate can actively apply that voluntarily discovered knowledge to resolve an archival classification dilemma immediately.
- **Preserved Requirement:** Earlier voluntarily discovered information is actually available and potentially integrated into later behavior; not reduced to optional clicking or reading alone.
- **Repeated Opportunities & Expected Observations:** 2 sequential catalog dilemmas. `OBSERVATIONS_PER_FEATURE`: **2**.
- **Control Condition:** Candidate who did not explore optional alcoves in Q1/Q2 can still resolve the folio using standard rule-based trial-and-error without penalty. Knowledge integration provides an immediate insight pathway without conferring unfair test points.
- **Primary Nuisance Demand:** Visual pattern matching and memory retention.
- **Task Condition Ground Truth (Server Immutable):** `folio_id`, `catalog_category_definitions`, `historical_provenance_key`, `session_prior_exploration_state` (retrieved from server session history of Q1/Q2 events).
- **Client Observable Behavior (Raw Telemetry):** `folio_presented` (t_ms), `category_clicked` (t_ms, selected_category_id, input_modality), `classification_confirmed` (t_ms).
- **Derived Later (Server Feature Engine):** `insight_application_match` (derived by comparing client choice with whether optional clues were viewed in Q1/Q2), `deliberation_latency_ms`, `classification_validity`.
- **Estimated Duration:** **ESTIMATE: 22–26 seconds**. Feasible within budget.
- **Accessibility Alternative:** Screen-reader accessible provenance transcripts; full keyboard navigation.
- **Rationale for Measurement Improvement:** Connects spontaneous earlier epistemic exploration directly to downstream operational application.
- **What the Task Cannot Establish:** Cannot establish general academic intelligence or scholarly research aptitude.

#### Direction B (PROPOSED: needs owner approval)
- **Alternative Approach:** Pure voluntary deep-dive inspection of archival footnotes during cataloging without downstream integration dependency.
- **Budget Status:** ESTIMATE: 20 seconds.

---

## 6. Parameter 6: Creative Initiative (World 6: The Workshop Bench / The Broken Tool)

### CR1: The Damaged Compass / The Artisan's Cord
- **Target Parameter:** `creative_initiative`
- **Behavioral Facet Preserved:** `divergent_combination_under_constraint`
- **Nearest Research Domain / Construct:** Creative Problem-Solving & Functional Restructuring.
- **Identified Problem:** 1 single assembly trial without iterative testing or feedback; candidate toggles materials and immediately concludes.

#### Direction A (REVISE — PROPOSED: needs owner approval)
- **Mechanic Description:** Assembly of an improvised drafting tool when the primary fastener is missing. Candidate combines workshop materials (bamboo splint, linen cord, wax dab, brass pin) and tests the assembly against physical constraints.
- **Valid Solution Criteria:** A valid solution requires: (1) Tensile binding resistance $\ge T_{min}$ (provided by linen cord or wire wrap) AND (2) Rigid pivot alignment (provided by bamboo splint or pin). At least **2 distinct valid combinations** satisfy the constraints (preserving multiple valid paths).
- **Feedback Rule:** When candidate clicks "Test Assembly", the simulator evaluates the physical criteria. If invalid, diagnostic feedback identifies the physical failure mode without disclosing the exact answer (*"Assembly slips under lateral shear — lacks friction wrap"* or *"Pivot wobbles — arm lacks rigid backing"*).
- **First-Try Success Protection:** If candidate selects a valid combination on Attempt 1, full success is awarded immediately. First-try insight is NEVER penalized.
- **Variety Exclusion:** Randomly clicking through many invalid combinations is NOT scored as creativity. Extractor scores structured strategy revision following feedback.
- **Repeated Opportunities & Expected Observations:** 2 sequential assembly challenges under differing tool constraints. `OBSERVATIONS_PER_FEATURE`: **2**.
- **Control Condition:** Challenge 1 provides a standard intact fastener (baseline control); Challenge 2 lacks standard fastener.
- **Primary Nuisance Demand:** Mechanical intuition and spatial reasoning.
- **Task Condition Ground Truth (Server Immutable):** `challenge_id`, `missing_tool_specification`, `valid_alternative_solution_sets`.
- **Client Observable Behavior (Raw Telemetry):** `challenge_presented` (t_ms), `attempt_started` (t_ms, attempt_index), `material_toggled` (t_ms, material_id, state [true|false], input_modality), `assembly_tested` (t_ms).
- **Derived Later (Server Feature Engine):** `solution_validity`, `first_try_success_flag`, `strategy_divergence_between_attempts`, `total_attempts_until_resolution`.
- **Estimated Duration:** **ESTIMATE: 30 seconds** (capped at 3 test attempts per challenge to prevent timeout exhaustion).
- **Accessibility Alternative:** Text descriptions of material mechanical properties; keyboard toggle buttons.
- **Rationale for Measurement Improvement:** Evaluates genuine hypothesis testing and strategy revision under objective constraints while protecting immediate insight.
- **What the Task Cannot Establish:** Cannot measure artistic creativity or divergent verbal fluency.

#### Direction B (PROPOSED: needs owner approval)
- **Alternative Approach:** Single complex rigging challenge with unlimited testing within a strict 30-second window.
- **Budget Status:** ESTIMATE: 30 seconds.

---

### CR2: The Central Pillar
- **Target Parameter:** `creative_initiative`
- **Behavioral Facet Preserved:** `cognitive_reframing_under_obstacle`
- **Nearest Research Domain / Construct:** Cognitive Reframing & Spatial Restructuring.
- **Identified Problem:** 1 multiple-choice question describing an immovable pillar; duplicates SJT format inside the game battery.

#### Direction A (REVISE — PROPOSED: needs owner approval)
- **Mechanic Description:** Spatial layout restructuring where an immovable architectural obstacle (Central Pillar, Low Archway) bisects the exhibition floor. Candidate positions movable partitions to create an exhibition flow.
- **Valid Solution Criteria:** A valid layout requires: (1) Continuous visitor circulation corridor width $\ge 1.5\text{m}$ around the pillar AND (2) Total display wall perimeter $\ge 8\text{m}$ achieved by utilizing the pillar surfaces rather than walling them off. Multiple valid floor configurations exist.
- **Feedback Rule:** Clicking "Test Flow" runs a pedestrian circulation simulation. Feedback highlights bottlenecks (*"Circulation corridor pinched to 0.8m near east arch"*) or unutilized display surfaces.
- **First-Try Success Protection:** Immediate optimal placement on Attempt 1 receives full score immediately.
- **Repeated Opportunities & Expected Observations:** 2 distinct spatial obstacle configurations. `OBSERVATIONS_PER_FEATURE`: **2**.
- **Control Condition:** Board 1 has an unobstructed floor; Board 2 has the central pillar obstacle.
- **Primary Nuisance Demand:** Spatial manipulation and geometric reasoning.
- **Task Condition Ground Truth (Server Immutable):** `board_id`, `fixed_obstacle_coordinates`, `channel_flow_rules`, `valid_partition_configurations`.
- **Client Observable Behavior (Raw Telemetry):** `board_rendered` (t_ms), `attempt_started` (t_ms, attempt_index), `partition_action` (t_ms, action_type ["place" | "remove"], coord_x, coord_y, input_modality), `flow_tested` (t_ms).
- **Derived Later (Server Feature Engine):** `flow_connectivity_valid`, `first_try_success_flag`, `spatial_reorganization_delta`, `total_attempts`.
- **Estimated Duration:** **ESTIMATE: 28 seconds**. Feasible within budget.
- **Accessibility Alternative:** Keyboard grid navigation; text status readouts of corridor clearance.
- **Rationale for Measurement Improvement:** Replaces verbal vignette selection with active spatial problem-solving and reframing of obstacles into functional assets.
- **What the Task Cannot Establish:** Cannot establish architectural engineering competence.

#### Direction B (PROPOSED: needs owner approval)
- **Alternative Approach:** Modular exhibition partitioning challenge with fixed corner anchoring.
- **Budget Status:** ESTIMATE: 28 seconds.

---

### CR3: The Printed Motif
- **Target Parameter:** `creative_initiative`
- **Behavioral Facet Preserved:** `novel_tool_application`
- **Nearest Research Domain / Construct:** Functional Fixedness Overcoming & Affordance Discovery.
- **Identified Problem:** 1-shot tool selection (ruler, comb, sponge) to replicate a border motif.

#### Direction A (REVISE — PROPOSED: needs owner approval)
- **Mechanic Description:** Affordance synthesis for geometric border repair. Candidate must produce target geometric flourishes on a damaged manuscript border when standard woodblocks are chipped. Candidate selects workshop items (notched reed, cord wrap, carved horn) and angles impressions against parchment.
- **Valid Solution Criteria:** A valid imprint requires: (1) Contact surface geometric curvature matching target flourish within 15% tolerance AND (2) Transfer viscosity adequate to produce clean continuous line. At least **2 tools or tool combinations** satisfy the affordance criteria.
- **Feedback Rule:** "Test Imprint" generates a visual impression and calculates contour intersection. Feedback displays visual deviation against target profile (*"Imprint curvature too broad — requires narrower contact radius"*).
- **First-Try Success Protection:** Selecting the affordance-matched tool on Attempt 1 receives full credit immediately.
- **Variety Exclusion:** Unusual or bizarre tool combinations that do not match physical affordances are NOT credited as creative.
- **Repeated Opportunities & Expected Observations:** 2 distinct border sections requiring different geometric profiles. `OBSERVATIONS_PER_FEATURE`: **2**.
- **Control Condition:** Section 1 has an intact standard stamp (baseline control); Section 2 requires affordance substitution.
- **Primary Nuisance Demand:** Visual geometric comparison and fine motor angle adjustment.
- **Task Condition Ground Truth (Server Immutable):** `section_id`, `missing_carver_profile`, `tool_affordances`, `acceptable_contour_tolerances`.
- **Client Observable Behavior (Raw Telemetry):** `section_rendered` (t_ms), `attempt_started` (t_ms, attempt_index), `tool_selected` (t_ms, tool_id, input_modality), `angle_adjusted` (t_ms, angle_degrees), `imprint_tested` (t_ms).
- **Derived Later (Server Feature Engine):** `contour_match_score`, `unconventional_tool_choice_flag`, `first_try_success_flag`, `total_attempts`.
- **Estimated Duration:** **ESTIMATE: 28 seconds**. Feasible within budget.
- **Accessibility Alternative:** High-contrast geometric outlines and tactile pattern descriptions.
- **Rationale for Measurement Improvement:** Evaluates discovery of functional tool affordances with real feedback rather than guessing a multiple-choice item.
- **What the Task Cannot Establish:** Cannot measure fine artistic brushwork or manual drafting craftsmanship.

#### Direction B (PROPOSED: needs owner approval)
- **Alternative Approach:** Texture stamp substitution with live ink preview feedback across 3 discrete patterns.
- **Budget Status:** ESTIMATE: 26 seconds.

---

## 7. Parameter 7: Motivation (World 7: The Final Gathering / The Repetition)

### M3: The Evening Threshold
- **Target Parameter:** `motivation`
- **Behavioral Facet Preserved:** `autonomous_self_regulation_without_extrinsic_feedback`
- **Nearest Research Domain / Construct:** Autonomous Motivation, Intrinsic Self-Regulation, & Persistence Under Extinction / Low Saliency.
- **Previous Proposal Audit:** Marked **`DESIGN_CONCEPT_ACCEPTABLE: NO`**. The previously proposed verification/checklist design is rejected because a closing checklist primarily measures Conscientiousness or compliance rather than Motivation.
- **Current Client Problem:** Uses a 3-item static checklist with false/misleading UI copy: buttons and text say *"Finalize Assessment"* and *"submit your session"*, which is false whenever The Repetition is counterbalanced into positions 0–5 (including Position 0 in Rows 6 and 9). Earlier documentation also incorrectly claimed *"work saves silently in background"*.

#### Direction A (REVISE — PROPOSED: needs owner approval)
- **Construct-Preserving Mechanic:** Continues the repetitive stamping/sealing mechanics of M2 under reduced/non-salient feedback, completely abandoning the checklist format.
- **Mechanical Continuity:** Candidate continues stamping/sealing invitation folios (same motor/procedural mechanic as M1 and M2).
- **Explicit Stated Minimum:** Candidate is instructed to prepare exactly 2 formal archival folios for the quiet collection.
- **Voluntary Continuation Beyond Minimum:** After completing the 2 required folios, candidate is told:
  > *"The required 2 folios are complete. Up to 3 additional folios are available on the bench. You may seal extra folios, or click Complete Part 3 to proceed at any time."*
- **Stopping at Minimum is Neutral:** Exiting immediately upon completing the 2 mandatory units is treated as standard baseline fulfillment, never penalized or labeled low.
- **Honest Candidate-Facing Wording:** Button is labeled *"Complete Part 3 &rarr;"* (or *"Complete Workshop Task &rarr;"*). It is **never** labeled "Finalize Assessment" or "Submit Session" (which is false in counterbalanced Latin square order where World 7 appears first in Rows 6 and 9). Zero claims of silent background saving; no implication that work is submitted or used unless literally true.
- **No Hidden Construct Disclosure:** No evaluative banners, no psychological labels.
- **No False Feedback / Error:** The interface never feigns errors, artificial crashes, or lost progress.
- **Confound Documentation:** Reduced feedback is heavily confounded with: (1) Time-on-task and session fatigue; and (2) Altered task salience (candidates may interpret absence of celebratory visual flourishes as interface lag or lower task importance, leading to rational effort conservation rather than low intrinsic motivation).
- **Repeated Opportunities & Expected Observations:** 2 mandatory units + up to 3 optional units. `OBSERVATIONS_PER_FEATURE`: **Up to 3** optional units ($N \in [0, 3]$).
- **Control Condition:** Stopping at the 2 mandatory units is standard neutral behavior.
- **Primary Nuisance Demand:** Battery fatigue and motor repetition.
- **Task Condition Ground Truth (Server Immutable):** `activity_id`, `unit_catalog` (unit_1, unit_2, unit_3), `baseline_quota` (2).
- **Client Observable Behavior (Raw Telemetry):** `activity_rendered` (t_ms), `unit_toggled` (t_ms, unit_id, checkbox_state [true|false], input_modality), `activity_completed` (t_ms).
- **Derived Later (Server Feature Engine):** `completion_ratio`, `perseverance_under_reduced_feedback`, `total_dwell_ms`.
- **Estimated Duration:** **ESTIMATE: 18–25 seconds**. Candidate-paced.
- **Accessibility Alternative:** Keyboard-accessible stamping buttons; screen-reader notifications confirming completion without intrusive audio.
- **Rationale for Measurement Improvement:** Pure, unconfounded voluntary persistence beyond a stated minimum with complete transparency and zero false framing.
- **What the Task Cannot Establish:** Cannot measure resistance to chronic organizational burnout or long-term volunteer retention.

#### Direction B (PROPOSED: needs owner approval)
- **Formal Scope Designation Note:** M1 (stated baseline diligence) and M2 (voluntary continuation beyond minimum) already provide robust, clean measurement of voluntary persistence. If M3 adds marginal construct variance, M3 can be formally designated as a non-scored transitional closing ritual rather than an artificial psychometric task.

---

## 8. Summary Table of Stopped Game Decisions

| Game | Status | Identified Problem | Candidate Direction A | Candidate Direction B / Limitation |
| :--- | :--- | :--- | :--- | :--- |
| **F1** | PROPOSED: needs owner approval | Single trial; lacks partner cues & non-accommodation control | 3-trial adaptive tuning with partner vocal indicators (ESTIMATE: 21–24s) | Discrete 3-stage sound check balance |
| **F2** | REVISE — PROPOSED: needs owner approval | Single multiple-choice prompt; duplicates SJT format | Interactive multi-track acoustic balance (ESTIMATE: 27–30s; budget tight) | Battery redesign / structural simplification |
| **F3** | REVISE — PROPOSED: needs owner approval | Single slider trial; lacks dynamic transition; limited N=2 | 2-phase hall transition with reciter acoustic feedback (ESTIMATE: 24–28s; N=2 limited) | 3 rapid discrete acoustic checks |
| **C1** | PROPOSED: needs owner approval | Single trial; violates boundary (sharing $\neq$ collaboration) | 3-round workshop allocation with partner deficit/surplus (ESTIMATE: 24s) | Proportional allocation under deadline constraint |
| **C2** | REVISE — PROPOSED: needs owner approval | Single slot click; visual symmetry confound; limited N=2 | 2-turn sequential artwork placement with partner (ESTIMATE: 24s; N=2 limited) | Two-phase wall balance under asymmetric lighting |
| **C3** | PROPOSED: needs owner approval | Single slider choice; trivial 5–5 default middle split | 3-round asymmetric pavilion lighting balancing (ESTIMATE: 24s) | Interactive circuit repair |
| **E1** | PROPOSED: needs owner approval | Explicit banner announces rule; reading compliance confound | 10-trial unannounced shift discovered via feedback; WCST inspired (ESTIMATE: 25s) | Subtle ambient tint shift cued without text |
| **E2** | REVISE — PROPOSED: needs owner approval | Single multiple-choice vignette; duplicates SJT format | Interactive setup disruption; recovery latency N=1, cadence N=4 (ESTIMATE: 25–28s) | Dual-disruption protocol (N=2 recovery latency) |
| **E3** | REVISE — PROPOSED: needs owner approval | Single preference click; subjective aesthetic confound | Dynamic constraint rerouting; shift response N=1, post-shift N=2-3 (ESTIMATE: 24–28s) | Continuous boundary constriction challenge |
| **Q3** | REVISE — PROPOSED: needs owner approval | 3-card preference click; lacks behavioral exploration stream | Downstream information integration of Q1/Q2 context into cataloging (ESTIMATE: 22–26s) | Pure voluntary deep-dive inspection |
| **CR1** | REVISE — PROPOSED: needs owner approval | Single assembly trial; lacks iterative feedback loop | 2-stage assembly under constraint with objective feedback; 1st-try protected (ESTIMATE: 30s) | Single complex rigging challenge |
| **CR2** | REVISE — PROPOSED: needs owner approval | Single multiple-choice vignette; duplicates SJT format | Interactive spatial restructuring around central pillar; 1st-try protected (ESTIMATE: 28s) | Modular exhibition partitioning challenge |
| **CR3** | REVISE — PROPOSED: needs owner approval | Single tool selection; lacks multi-attempt sequence | Affordance synthesis for motif completion with preview; 1st-try protected (ESTIMATE: 28s) | Texture stamp substitution with live ink preview |
| **M3** | REVISE — PROPOSED: needs owner approval | Checklist format (Conscientiousness risk); false finalization | Repetitive stamping under reduced feedback; honest wording (ESTIMATE: 18–25s) | Formally designate M3 as non-scored closing ritual |

---

## 9. Telemetry Gap for A3 (Attention to Detail)

While A3 was evaluated among the candidate games, it remains **quarantined and blocked from extractor implementation**:
- **Problem:** Client event `quality_check_completed` sends a single summary array of checked cards upon clicking submit, omitting individual card inspection latencies, dwell times, and toggle events.
- **Required Resolution:** Frontend client telemetry must emit `placard_inspected` (with `placard_id`, `dwell_ms`) and `placard_toggled` before an extractor can compute inspection thoroughness without relying on a single compound event.

---

## 10. Sampling Deficiency for Q2 (The Uncataloged Seal)

Q2 is **not approved, not specification-complete, and blocked from measurement implementation**:
- **Problem:** Q2 currently presents a single uncataloged manuscript item inspection ($N=1$). A single observation provides inadequate evidentiary basis for individual-difference construct measurement.
- **Governing Status:** Unresolved single-observation sampling flaw. Requires multiple genuine opportunities or another defensible sampling solution before any feature extractor can be implemented.
- **Guardrail:** Do not invent artificial weights or lower thresholds to bypass this deficiency; do not mark resulting evidence LOW.

---

## 11. Status of A2: Active Implementation with Strict Observation-Validity Gate

- **Backend Status:** Implemented in `backend/app/services/feature_extractor.py` (`_extract_A2`).
- **Observation-Validity Gate:** Strictly requires $N \ge 3$ decision events. The previous $N=1$ bypass has been permanently removed. If $N < 3$, the extractor marks `valid = False` with `flags = ["INSUFFICIENT_OBSERVATIONS"]`.
- **Live Client Reality:** The current frontend task injects only 1 exception trial ($N=1$). Therefore, live sessions currently fail the observation-validity gate and produce non-usable evidence until the client task is expanded to present 3+ exception trials.

---

## 12. Universal Telemetry Accessibility Schema & Non-Penalty Principle

Telemetry across all mini-games records user interaction characteristics without evaluating accessibility settings as performance deficits:
- **Input Modality Tracking:** The client detects and reports `input_modality` (`"mouse" | "touch" | "keyboard"`) based on actual interaction events.
- **Accessibility Profile:** During session onboarding, candidates may enable zero or more modes stored in `DBAccessibilityProfile`:
  - `keyboard_navigation`
  - `high_contrast`
  - `reduced_motion`
  - `extended_time`
- **Strict Non-Penalty Principle:** Candidate-facing notice guarantees: *"Accessibility settings never lower any measurement."* Latency/dwell metrics collected under `extended_time` or stepper interactions under `keyboard_navigation` must never be evaluated against unadjusted normative speed baselines.

---

## 13. Owner-Approved Reconciled Amendments (Release Hardening)

The following authoritative owner amendments reconcile the design freeze and define canonical target counts for Alfaaz Recruit:

1. **A1 (Classification): 12 items**
   - Expanded from earlier 8/10 items to exactly 12 items (`DOC_01` through `DOC_12`).
   - Maintains balanced distribution across genres with unambiguous ground-truth rules (`rules.py` / `task_definitions.json`).

2. **A3 (Quality Control): 8 records**
   - Expanded from earlier 6 items to exactly 8 catalog ledger records (`REC_01` through `REC_08`).
   - Server reconstructs inspection thoroughness and discrepancy flagging from primitive event streams (`record_inspected`, `discrepancy_toggled`).

3. **C1 (Resource Cooperation): 4 allocation rounds**
   - Expanded from earlier 3 rounds to exactly 4 distinct inventory rounds (`C1_R1` through `C1_R4`).
   - Crucially incorporates `C1_R4` (Self-Station Ceramic Shortage): candidate station has deficit (3 tiles, quota 6) while partner has surplus (7 tiles, quota 4).
   - In `C1_R4`, retaining resources is the task-defined appropriate behavior, ensuring cooperation is not conflated with indiscriminate self-depriving over-allocation.
