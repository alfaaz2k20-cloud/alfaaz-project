# Alfaaz Recruit: 14-Game Design Resolution & Candidate Proposals

**Status:** Research audit complete; measurement implementation blocked pending owner design decisions.  
**Purpose:** Documents concrete candidate design directions for the 14 mini-games flagged during the research audit. These are design proposals for owner selection; **none are implemented in code** at this stage.

---

## 1. Overview & Construct-Preservation Mandate

The pre-implementation research audit established that 14 mini-games cannot be implemented or unquarantined in their current state. To ensure scientific integrity, all proposed directions must preserve the construct-essential element of each domain:

- **Empathy (World 1: The Frequency):** Partner-state information that changes which response is context-appropriate, including trials where pursuing the primary task without alteration is correct.
- **Collaborative Spirit (World 3: The Shared Canvas):** A simulated partner or shared resource with genuine need, paired with rigorous no-need control conditions.
- **Emotional Agility (World 4: The Shifting Patterns):** A scripted change or setback with behavioral recovery measured; strictly zero disclosure of the rule, shift, or construct.
- **Curiosity (World 5: The Hidden Courtyard):** Spontaneous exploration of optional information with zero reward, zero score incentive, and zero task demand.
- **Creative Initiative (World 6: The Workshop Bench):** Repeated attempts with objective feedback; immediate first-try success is fully credited and never penalized; variety, click counts, or random exploration are never scored.
- **Motivation (World 7: The Final Gathering):** Stated minimum baseline, voluntary optional continuation, and completely honest non-deceptive wording.

**Explicit Exclusions:** The directions below reject and exclude:
- Turning games into categorization, proofreading, QC, checklist, or procedural compliance;
- Using rating, ranking, or multiple-choice item selection (SJT vignette formats);
- Relying on subjective aesthetic preferences;
- Scoring click counts or erratic exploratory variety;
- Reusing mechanics across worlds without a construct-based justification.

---

## 2. Parameter 1: Empathy (World 1: The Soundscape / The Frequency)

### F1: Tuning the Hall
- **Current Problem:** 1 single audio slider trial; lacks partner-state cues and non-accommodation control trials, risking the conflation of empathy with indiscriminate slider tampering.

#### Direction A: Partner-State Adaptive Attunement
- **Construct Preserved:** `empathy` / `attunement_to_cues`
- **Repeated Opportunities & Expected Observations:** 3 distinct recital rehearsal trials. `OBSERVATIONS_PER_FEATURE`: **3**.
- **Control Condition:** In Trial 2 (Control), the reciter's state indicator confirms: *"Acoustics clear; vocal resonance effortless."* Pursuing the performance without moving the slider is the correct context-appropriate response. Moving the slider in Trial 2 represents unnecessary tampering. In Trials 1 and 3, partner cues explicitly signal acoustic strain or excessive reverberation requiring attenuation.
- **Primary Nuisance Demand:** Motor slider precision and visual contrast.
- **Telemetry Needed:** `trial_presented` (trial_id, partner_state), `first_slider_move_ms`, `slider_delta`, `trial_confirmed`.
- **Duration vs 15–35 s Budget:** 3 trials $\times$ 7–8 seconds = 21–24 seconds. Feasible within budget.
- **Accessibility Alternative:** Keyboard slider stepping (Arrow keys); stepper buttons (- / +); audio wave rendered with high-contrast amplitude guides.
- **Why Measurement Improves:** Evaluates whether candidate actively checks partner state before adjusting settings rather than assuming adjustment is always desired.

---

### F2: The Gathering Voices
- **Current Problem:** Implemented as a single multiple-choice text question (`F2_ASK`, `F2_TEST`, `F2_HOLD`), duplicating the SJT format inside the game battery.

#### Direction A: Dynamic Rehearsal Coordination with Partner Cue Disambiguation
- **Construct Preserved:** `empathy` / `cognitive_perspective_taking`
- **Repeated Opportunities & Expected Observations:** 3 sequential sound-check coordination points. `OBSERVATIONS_PER_FEATURE`: **3**.
- **Control Condition:** In 1 coordination point, partner's operational note indicates full readiness: *"Monitors are balanced; ready to begin on time."* Proceeding immediately with the rehearsal timetable is correct. In the other 2 points, partner feedback contains ambiguous hesitation (*"The high registers feel somewhat sharp today..."*), where selecting an active check-in or acoustic adjustment is context-appropriate.
- **Primary Nuisance Demand:** Text reading speed and auditory/visual cues.
- **Telemetry Needed:** `cue_presented`, `partner_status_expanded`, `action_selected` (proceed vs adjust vs clarify), `action_latency_ms`.
- **Duration vs 15–35 s Budget:** 3 points $\times$ 9–10 seconds = 27–30 seconds. **Honest Budget Assessment:** *Reliable multi-trial measurement of perspective-taking within 30 seconds is tight. Reading latency introduces substantial nuisance variance. If candidate reading times exceed 10 seconds per trial, reliable measurement within the 35 s cap is compromised.*
- **Accessibility Alternative:** Screen-reader accessible dialogue text cards; no time-out penalty.
- **Why Measurement Improves:** Replaces a static 1-shot SJT question with context-dependent behavioral choices where task focus is explicitly correct on control trials.

---

### F3: The Echo of the Room
- **Current Problem:** 1-shot slider adjustment of hall resonance; lacks partner-state feedback and dynamic transition stimuli.

#### Direction A: Dynamic Environmental Transition with Partner Feedback
- **Construct Preserved:** `empathy` / `context_sensitive_updating`
- **Repeated Opportunities & Expected Observations:** 2 sequential hall transitions (Indoor Rehearsal $\rightarrow$ Stone Courtyard Recital). `OBSERVATIONS_PER_FEATURE`: **2**.
- **Control Condition:** In Transition 1, the partner reciter signals vocal strain from courtyard echo (*"Courtyard stones are muddying the verse"*), requiring resonance reduction. In Transition 2 (Control), the reciter signals comfort with natural courtyard acoustics (*"Courtyard ambiance matches the poem tone"*); maintaining current resonance without alteration is correct.
- **Primary Nuisance Demand:** Perceptual change detection.
- **Telemetry Needed:** `transition_onset`, `partner_cue_rendered`, `resonance_slider_delta`, `setting_locked`.
- **Duration vs 15–35 s Budget:** 2 transitions $\times$ 11–12 seconds = 22–24 seconds. Feasible within budget.
- **Accessibility Alternative:** Numerical decibel/reverb text indicators alongside visual meter; keyboard stepping.
- **Why Measurement Improves:** Isolates context-updating driven by partner auditory feedback from automatic motor recalibration.

---

## 3. Parameter 3: Collaborative Spirit (World 3: The Shared Canvas)

### C1: The Artisan's Basket
- **Current Problem:** 1 single tile transfer trial (8 vs 2 tiles); lacks control conditions where sharing is unnecessary or counterproductive, violating the construct boundary: *Collaborative Spirit $\neq$ Unilateral Altruism*.

#### Direction A: Multi-Round Resource Allocation with Need-Sensitive Demands
- **Construct Preserved:** `collaborative_spirit` / `need_sensitive_resource_sharing`
- **Repeated Opportunities & Expected Observations:** 3 distinct allocation rounds with varying partner reserve and quota requirements. `OBSERVATIONS_PER_FEATURE`: **3**.
- **Control Condition (Round 2 — No-Need Control):** Partner holds 7 tiles and requires only 4 to complete their section (partner has a surplus). Candidate holds 5 tiles and requires 5. Transferring tiles to partner in Round 2 is wasteful, deprives candidate's station, and slows overall project completion. Keeping tiles is contextually appropriate. In Round 1, partner has a genuine deficit (holds 2, needs 5; candidate holds 8; transferring 3 is needed). In Round 3, mutual tight budgets require exact balanced allocation.
- **Primary Nuisance Demand:** Numerical arithmetic comprehension.
- **Telemetry Needed:** `round_started`, `partner_supply`, `partner_quota`, `own_supply`, `own_quota`, `transferred_count`, `round_confirmed`.
- **Duration vs 15–35 s Budget:** 3 rounds $\times$ 8 seconds = 24 seconds. Feasible within budget.
- **Accessibility Alternative:** Clear tabular summary of partner needs alongside graphical baskets; standard keyboard stepper buttons (- / +).
- **Why Measurement Improves:** Directly dissociates thoughtful, need-sensitive collaboration from mindless altruistic compliance or reflexive 50/50 splitting.

---

### C2: The Gallery Wall
- **Current Problem:** Single 1-click slot selection on a static wall; confounded by visual symmetry perception rather than social coordination.

#### Direction A: Sequential Turn-Taking Placement under Partner Coordination
- **Construct Preserved:** `collaborative_spirit` / `complementary_role_coordination`
- **Repeated Opportunities & Expected Observations:** 2 sequential artwork placement challenges on a shared exhibition wall. `OBSERVATIONS_PER_FEATURE`: **2**.
- **Control Condition:** In Challenge 1, partner has placed a dominant wide canvas leaving a specific complementary alcove; coordinating placement in the alcove harmonizes the wall. In Challenge 2 (Control), partner has placed an isolated decorative plaque in an exterior corner that does not constrain the central wall; candidate placing centrally without altering their plan is the correct independent action (forced grouping is counterproductive).
- **Primary Nuisance Demand:** Spatial layout visualization.
- **Telemetry Needed:** `partner_piece_rendered`, `slot_hovered`, `slot_selected`, `placement_latency_ms`.
- **Duration vs 15–35 s Budget:** 2 challenges $\times$ 12 seconds = 24 seconds. Feasible within budget.
- **Accessibility Alternative:** Semantic text descriptions of wall grid coordinates ("North Alcove", "Center Gallery", "South Plaque").
- **Why Measurement Improves:** Replaces static geometric preference with active mutual accommodation across sequential turns.

---

### C3: The Dual Lanterns
- **Current Problem:** 1-shot slider split with an obvious 5–5 default middle; lacks multi-step balance repair or variable room demand.

#### Direction A: Asymmetric Pavilion Lighting Balancing under Operational Demands
- **Construct Preserved:** `collaborative_spirit` / `collaborative_misalignment_repair`
- **Repeated Opportunities & Expected Observations:** 3 sequential lighting distribution rounds across Room A (candidate) and Room B (partner). `OBSERVATIONS_PER_FEATURE`: **3**.
- **Control Condition (Round 2 — Own High Demand / Partner No-Need):** Room A hosts a delicate manuscript inspection requiring 7 lanterns; Room B is in natural daylight requiring only 3. A 5–5 split under-lights Room A and wastes light in Room B. Candidate must appropriately retain lanterns while satisfying partner's minimum. In Round 1, Room B has high demand (needs 7), requiring candidate to allocate surplus lanterns.
- **Primary Nuisance Demand:** Ratio estimation and budget allocation.
- **Telemetry Needed:** `round_presented`, `room_demands`, `slider_ratio`, `allocation_confirmed`.
- **Duration vs 15–35 s Budget:** 3 rounds $\times$ 8 seconds = 24 seconds. Feasible within budget.
- **Accessibility Alternative:** Numeric lantern count readouts (e.g. "Room A: 7, Room B: 3"); Arrow-key slider stepping.
- **Why Measurement Improves:** Eliminates the lazy middle-split heuristic; evaluates genuine functional cooperation under operational constraints.

---

## 4. Parameter 4: Emotional Agility (World 4: The Shifting Patterns / The Shifting Grid)

### E1: The Ceramic Mosaic
- **Current Problem:** Client explicitly announces the rule shift with a prominent banner (`Active Rule: Match by Shape`) and dynamically relabels target bins, destroying the measurement of cognitive flexibility and converting the task into reading compliance.

#### Direction A: Unannounced Rule Shift Discovered via Implicit Feedback (WCST Analog)
- **Construct Preserved:** `emotional_agility` / `behavioral_adaptation_under_rule_change`
- **Repeated Opportunities & Expected Observations:** 10 sequential sorting trials. Trials 1–5 sort by Color (established rule); at Trial 6, the rule shifts unannounced to Shape. Post-shift trials (Trials 6–10) provide **5** critical opportunities to observe perseveration and adaptive recovery. `OBSERVATIONS_PER_FEATURE`: **10** total (5 post-shift adaptation trials).
- **Control Condition:** Target bins display static multi-attribute reference icons (Bin 1: Gold Circle; Bin 2: Sage Square) that NEVER change text labels or visual icons. Feedback is purely outcome-based ("Tile Placed" vs "Tile Returned").
- **Primary Nuisance Demand:** Perceptual matching speed and motor latency.
- **Telemetry Needed:** `trial_presented`, `container_selected`, `is_error`, `perseverative_error_flag`, `trial_latency_ms`.
- **Duration vs 15–35 s Budget:** 10 trials $\times$ 2.5 seconds = 25 seconds. Feasible within budget.
- **Accessibility Alternative:** High-contrast pattern fills (stripes vs dots) in addition to colors; keyboard inputs '1' and '2'.
- **Why Measurement Improves:** Restores the valid cognitive set-shifting paradigm. Directly measures perseverative errors and recovery latency without disclosing the rule change.

---

### E2: The Unexpected Guest
- **Current Problem:** 1-shot multiple-choice question (`QUICK_FIX`, `ASK_TEAM`, `FINISH_FIRST`), replicating SJT format inside the game battery.

#### Direction A: Interactive Task Disruption and Rhythm Recovery
- **Construct Preserved:** `emotional_agility` / `constructive_disruption_response`
- **Repeated Opportunities & Expected Observations:** Candidate executes a continuous tile alignment task. At second 10, a scripted environmental disruption occurs (a simulated gust dislodges 2 placed tiles with a brief visual vibration, resetting those 2 tiles to the staging bench). Candidate must re-align them and continue. Post-disruption performance yields **4** sequential placement observations. `OBSERVATIONS_PER_FEATURE`: **4** (post-disruption trials).
- **Control Condition:** Pre-disruption trials (Trials 1–4) establish baseline placement speed and accuracy as an intra-individual control.
- **Primary Nuisance Demand:** Motor recovery latency.
- **Telemetry Needed:** `disruption_onset_ms`, `first_interaction_post_disruption_ms`, `recovery_latency_ms`, `post_disruption_error_count`.
- **Duration vs 15–35 s Budget:** 25–28 seconds total. Feasible within budget.
- **Accessibility Alternative:** Keyboard Spacebar to acknowledge/stabilize; no speed-penalty disqualification.
- **Why Measurement Improves:** Captures authentic behavioral recovery of task rhythm following an unexpected operational setback rather than self-reported coping intentions.

---

### E3: The Geometric Harmony
- **Current Problem:** 1-shot motif preference click (diamond vs wave vs dots); heavily confounded by subjective aesthetic taste.

#### Direction A: Dynamic Constraint Adaptation under Shifting Boundary Conditions
- **Construct Preserved:** `emotional_agility` / `equilibrium_under_ambiguity`
- **Repeated Opportunities & Expected Observations:** Candidate is assembling an interlocking floor pattern. After 3 tiles are placed, a dynamic structural constraint shifts (e.g. water drainage channel expands, blocking the planned western pathway and requiring rerouting through the eastern pathway). Candidate completes 3 pre-change and 3 post-change placements. `OBSERVATIONS_PER_FEATURE`: **3** post-change observations.
- **Control Condition:** Pre-change baseline placement rate.
- **Primary Nuisance Demand:** Spatial pathfinding.
- **Telemetry Needed:** `constraint_shift_onset`, `blocked_attempt_count`, `adaptation_latency_ms`, `alternative_path_success`.
- **Duration vs 15–35 s Budget:** 24–28 seconds. Feasible within budget.
- **Accessibility Alternative:** Screen reader announcements of blocked vs open pathways; grid coordinate selection.
- **Why Measurement Improves:** Replaces subjective aesthetic preference with objective behavioral adaptation to changing operational constraints.

---

## 5. Parameter 5: Curiosity (World 5: The Hidden Courtyard)

### Q3: The Inscription / The Weaver's Chronicle
- **Current Problem:** Implemented as a 3-card multiple-choice preference selector (`catalog`, `curator`, `archival`), providing no behavioral exploration stream.

#### Direction A: Voluntary Archival Context Exploration without External Demand
- **Construct Preserved:** `curiosity` / `epistemic_information_seeking`
- **Repeated Opportunities & Expected Observations:** Candidate is cataloging 2 exhibition artifact records. Beside each artifact is an unrequired, expandable drawer: *"View Historical Calligraphy Analysis & Provenance Notes"*. Candidate can click to inspect or immediately click "Complete Filing &rarr;". `OBSERVATIONS_PER_FEATURE`: **2** (voluntary inspection count across 2 opportunities).
- **Control Condition:** Opening the provenance notes confers zero points, has no countdown bonus, and does not alter the filing outcome. Filing without opening is completely neutral and unpenalized.
- **Primary Nuisance Demand:** Reading speed.
- **Telemetry Needed:** `artifact_presented`, `provenance_expanded`, `provenance_dwell_ms`, `scroll_depth`, `filing_completed`.
- **Duration vs 15–35 s Budget:** 10–30 seconds. Fully candidate-paced. If candidate ignores optional notes, task concludes in 10 s; if candidate explores, task remains well under 30 s.
- **Accessibility Alternative:** Semantic HTML `<details>` disclosure with screen-reader accessible provenance text.
- **Why Measurement Improves:** Pure behavioral observation of voluntary epistemic exploration in the complete absence of extrinsic reward or instructional demand.

---

## 6. Parameter 6: Creative Initiative (World 6: The Workshop Bench / The Broken Tool)

### CR1: The Damaged Compass / The Artisan's Cord
- **Current Problem:** 1 single assembly trial without iterative testing or feedback; candidate toggles materials and immediately concludes.

#### Direction A: Iterative Assembly under Constraint with Objective Mechanical Feedback
- **Construct Preserved:** `creative_initiative` / `divergent_combination_under_constraint`
- **Repeated Opportunities & Expected Observations:** 2 sequential assembly challenges under tool constraint. Up to 3 test attempts allowed per challenge. `OBSERVATIONS_PER_FEATURE`: **2** (successful functional solution achieved).
- **First-Try Success Protection:** If candidate synthesizes a mechanically viable combination on Attempt 1, full credit is awarded immediately; first-try insight is NEVER penalized.
- **Variety / Click Count Exclusion:** Number of attempts, toggles, or erratic variety are strictly NOT scored as creativity. Extractor scores strategy revision following objective negative feedback.
- **Control Condition:** Challenge 1 provides a standard intact fastener (baseline); Challenge 2 lacks the standard fastener, requiring alternative material binding.
- **Primary Nuisance Demand:** Mechanical intuition and spatial manipulation.
- **Telemetry Needed:** `challenge_id`, `attempt_number`, `materials_selected`, `test_feedback_message`, `strategy_revised_flag`, `solved_on_attempt`.
- **Duration vs 15–35 s Budget:** 2 challenges $\times$ 15 seconds = 30 seconds. **Honest Budget Assessment:** *Allowing multiple iterative feedback loops within 35 seconds is tight. Capping test attempts at 3 per challenge is required to prevent timeout exhaustion.*
- **Accessibility Alternative:** Text descriptions of material mechanical properties (flexibility, tensile strength, friction); keyboard toggle buttons.
- **Why Measurement Improves:** Measures genuine hypothesis testing and strategy revision when standard tools fail, while fully protecting immediate insight.

---

### CR2: The Central Pillar
- **Current Problem:** 1 multiple-choice question describing an immovable pillar; duplicates SJT format inside the game battery.

#### Direction A: Interactive Spatial Layout Restructuring under Architectural Obstacle
- **Construct Preserved:** `creative_initiative` / `cognitive_reframing_under_obstacle`
- **Repeated Opportunities & Expected Observations:** 2 spatial arrangement boards where an immovable architectural obstacle (Central Pillar, Low Archway) blocks standard placement. Candidate positions movable display partitions and clicks "Test Flow". `OBSERVATIONS_PER_FEATURE`: **2**.
- **First-Try Success Protection:** Optimal functional placement on Attempt 1 receives full credit immediately.
- **Control Condition:** Board 1 has an unobstructed floor; Board 2 has the central pillar obstacle.
- **Primary Nuisance Demand:** Spatial manipulation.
- **Telemetry Needed:** `board_id`, `attempt_num`, `partition_coordinates`, `flow_tested`, `flow_feedback`, `solved_attempt`.
- **Duration vs 15–35 s Budget:** 2 boards $\times$ 14 seconds = 28 seconds. Feasible within budget.
- **Accessibility Alternative:** Keyboard grid navigation; clear status readouts of sightline clearance and pathway width.
- **Why Measurement Improves:** Replaces verbal vignette selection with active spatial problem-solving and reframing of obstacles into functional exhibition features.

---

### CR3: The Printed Motif / Improvised Tool Use
- **Current Problem:** 1-shot tool selection (ruler, comb, sponge) to replicate a border motif.

#### Direction A: Affordance Synthesis for Motif Completion with Preview Feedback
- **Construct Preserved:** `creative_initiative` / `novel_tool_application`
- **Repeated Opportunities & Expected Observations:** Candidate needs to complete 2 damaged geometric border sections where standard printing blocks are missing. Candidate selects workshop items (notched reed, cord wrap, carved horn) and tests impressions against target contours. Up to 3 attempts per section. `OBSERVATIONS_PER_FEATURE`: **2**.
- **First-Try Success Protection:** Choosing the affordance-matched tool on Attempt 1 receives full credit immediately.
- **Control Condition:** Section 1 has an intact standard stamp (baseline control); Section 2 requires novel affordance substitution.
- **Primary Nuisance Demand:** Visual geometric comparison.
- **Telemetry Needed:** `section_id`, `tool_selected`, `impression_tested`, `contour_match_score`, `solved_attempt`.
- **Duration vs 15–35 s Budget:** 2 sections $\times$ 14 seconds = 28 seconds. Feasible within budget.
- **Accessibility Alternative:** High-contrast geometric outlines and tactile pattern descriptions.
- **Why Measurement Improves:** Evaluates discovery of functional tool affordances with real feedback rather than guessing a multiple-choice item.

---

## 7. Parameter 7: Motivation (World 7: The Final Gathering / The Repetition)

### M3: The Evening Threshold
- **Current Problem:** Uses a 3-item static checklist with false/misleading UI copy: buttons and text say *"Finalize Assessment"* and *"submit your session"*, which is false whenever The Repetition is counterbalanced into positions 0–5. Earlier documentation also incorrectly claimed *"work saves silently in background"*.

#### Direction A: Transparent Voluntary Verification under Reduced Feedback
- **Construct Preserved:** `motivation` / `autonomous_self_regulation_without_extrinsic_feedback`
- **Repeated Opportunities & Expected Observations:** Candidate verifies a mandatory 3-item gallery readiness checklist (stated baseline). Upon completion, candidate is transparently offered optional verification of up to 3 secondary equipment folios. `OBSERVATIONS_PER_FEATURE`: **Up to 3** optional persistence observations ($N \in [0, 3]$).
- **Honest Wording & No Deception:** Button is labeled *"Complete Workshop Check &rarr;"* (NEVER "Finalize Assessment" or "Submit Session"). Instructional copy states:
  > *"Mandatory readiness checkpoints are complete. You may optionally verify up to 3 secondary equipment folios, or click Complete Workshop Check to proceed at any time."*
  Zero claims of silent background saving; zero false claims of session finalization.
- **Control Condition:** Stopping immediately after the mandatory 3 checkpoints is completely neutral, unpenalized, and treated as standard baseline fulfillment.
- **Primary Nuisance Demand:** End-of-battery fatigue.
- **Telemetry Needed:** `mandatory_checkpoints_done`, `optional_folio_inspected` (folio_id, timestamp), `optional_count`, `workshop_check_completed`.
- **Duration vs 15–35 s Budget:** 18–25 seconds. Fully self-paced by candidate.
- **Accessibility Alternative:** Standard keyboard accessible checkboxes with screen reader announcements.
- **Why Measurement Improves:** Pure, unconfounded voluntary persistence beyond a stated minimum with complete transparency and zero false framing.

#### Direction B: Formal Scope Designation Note
- **Honest Assessment:** M1 (stated baseline diligence) and M2 (voluntary continuation beyond minimum) already provide robust, clean measurement of voluntary persistence. If M3 adds marginal construct variance, M3 can be formally designated as a non-scored transitional closing ritual rather than an artificial psychometric task.

---

## 8. Summary Table of Stopped Game Decisions

| Game | Identified Problem | Preserved Construct | Candidate Direction A | Control Condition | Observations ($N$) | Budget Status (15–35 s) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **F1** | Single trial; lacks partner cues & non-accommodation control | Empathy: Attunement to cues | 3-trial adaptive tuning with partner vocal indicators | Trial 2: Partner comfortable; no slider move needed | $N=3$ | 21–24 s (Feasible) |
| **F2** | Single multiple-choice prompt; duplicates SJT format | Empathy: Cognitive perspective-taking | 3-point dynamic rehearsal coordination & cue disambiguation | Control point: Partner ready; schedule pursuit correct | $N=3$ | 27–30 s (Borderline tight) |
| **F3** | Single slider trial; lacks dynamic transition sequence | Empathy: Context-sensitive updating | 2-phase hall transition with reciter acoustic feedback | Transition 2: Courtyard echo balanced; no shift | $N=2$ | 22–24 s (Feasible) |
| **C1** | Single trial; violates boundary (sharing $\neq$ collaboration) | Collaborative Spirit: Need-sensitive sharing | 3-round workshop allocation with partner deficit/surplus | Round 2: Partner surplus; keeping tiles correct | $N=3$ | 24 s (Feasible) |
| **C2** | Single slot click; visual symmetry confound | Collaborative Spirit: Complementary coordination | 2-turn sequential artwork placement with partner | Challenge 2: Partner corner plaque; independent placing | $N=2$ | 24 s (Feasible) |
| **C3** | Single slider choice; trivial 5–5 default middle split | Collaborative Spirit: Misalignment repair | 3-round asymmetric pavilion lighting balancing | Round 2: Own high demand; partner surplus light | $N=3$ | 24 s (Feasible) |
| **E1** | Explicit banner announces rule; reading compliance confound | Emotional Agility: Set-shifting under rule change | 10-trial unannounced shift discovered via feedback (WCST) | Neutral static container markers; Color $\rightarrow$ Shape | $N=10$ (5 post-shift) | 25 s (Feasible) |
| **E2** | Single multiple-choice vignette; duplicates SJT format | Emotional Agility: Disruption recovery | Interactive setup disruption and rhythm recovery tracking | Pre-disruption trials 1–4 provide intra-person baseline | $N=4$ (post-setback) | 25–28 s (Feasible) |
| **E3** | Single preference click; subjective aesthetic confound | Emotional Agility: Adaptive constraint response | Dynamic constraint rerouting under structural obstacle | Pre-change placement rate baseline | $N=3$ (post-shift) | 24–28 s (Feasible) |
| **Q3** | 3-card preference click; lacks behavioral exploration | Curiosity: Epistemic exploration | Voluntary archival context exploration without demand | Opening notes unrewarded; skipping completely neutral | $N=2$ | 10–30 s (Candidate-paced) |
| **CR1** | Single assembly trial; lacks iterative feedback loop | Creative Initiative: Divergent synthesis | 2-stage assembly under constraint with objective feedback | Challenge 1 intact fastener baseline; 1st-try protected | $N=2$ | 30 s (Capped 3 tries) |
| **CR2** | Single multiple-choice vignette; duplicates SJT format | Creative Initiative: Reframing under obstacle | Interactive spatial restructuring around central pillar | Board 1 unobstructed floor baseline; 1st-try protected | $N=2$ | 28 s (Feasible) |
| **CR3** | Single tool selection; lacks multi-attempt sequence | Creative Initiative: Novel affordance synthesis | Affordance synthesis for motif completion with preview | Section 1 intact tool baseline; 1st-try protected | $N=2$ | 28 s (Feasible) |
| **M3** | False "Finalize Assessment" wording; background save claim | Motivation: Autonomous self-regulation | Transparent voluntary verification with honest wording | Stated minimum 3 items; stopping neutral; honest button | $N \in [0, 3]$ | 18–25 s (Candidate-paced) |

---

## 9. Telemetry Gap for A3 (Attention to Detail)

While A3 was evaluated among the candidate games, it remains **quarantined and blocked from extractor implementation**:
- **Problem:** Client event `quality_check_completed` sends a single summary array of checked cards upon clicking submit, omitting individual card inspection latencies, dwell times, and toggle events.
- **Required Resolution:** Frontend client telemetry must emit `placard_inspected` (with `placard_id`, `dwell_ms`) and `placard_toggled` before an extractor can compute inspection thoroughness without relying on a single compound event.
