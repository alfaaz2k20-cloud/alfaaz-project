# Alfaaz Recruit: 14-Game Design Resolution & Candidate Proposals

**Status:** Research audit complete; measurement implementation blocked pending owner design decisions.  
**Purpose:** Documents concrete candidate design directions for the 14 mini-games flagged during the research audit. These are design proposals for owner selection; **none are implemented in code** at this stage.

---

## 1. Overview of Blocked Mini-Games

The pre-implementation research audit identified that 14 of the 21 mini-games cannot be implemented or unquarantined in their current client state because they:
1. Provide only a single observation ($N=1$), providing inadequate psychometric variance;
2. Lack necessary non-accommodation or control trials to prevent construct conflation;
3. Duplicate the verbal Situational Judgment Test (SJT) vignette format inside interactive game worlds; or
4. Confound construct measurement with reading compliance, verbal recall, or subjective taste.

Below, each stopped game receives 1–2 candidate design directions adhering to the 15–35 second time budget, avoiding deception, and preserving approved V2 vocabulary.

---

## 2. Parameter 1: Empathy (World 1: The Frequency)

### F1: Tuning the Hall
- **Current Problem:** Client provides only 1 single tuning trial; lacks control trials where the partner is comfortable, risking the conflation of empathy with indiscriminate accommodation.

#### Direction A: Multi-Trial Adaptive Tuning with Decoy Mechanical Drift
- **Construct/Facet Preserved:** `empathy` / `attunement_to_cues`
- **Repeated Opportunities & Expected Observations:** 4 distinct trials (2 cue-injected trials, 2 control trials). `OBSERVATIONS_PER_FEATURE`: **4**.
- **Control Condition:** In 2 control trials, frequency drift occurs due to mechanical hall resonance while the partner's status icon indicates satisfaction ("Acoustics clear in front row"). Adjusting for the partner is unnecessary.
- **Primary Nuisance Demand:** Motor slider control and visual contrast.
- **Telemetry Needed:** `trial_started`, `cue_displayed`, `slider_moved` (first movement latency), `setting_locked`.
- **Expected Duration:** 24–28 seconds total (6–7 seconds per trial).
- **Accessibility Alternative:** Keyboard slider stepping (Arrow keys); latency features flagged as unadjusted in assistive mode.
- **Measurement Quality Rationale:** Directly tests whether adjustments are selectively cue-contingent rather than mindless slider sliding.

#### Direction B: Discrete 3-Stage Rehearsal Balance
- **Construct/Facet Preserved:** `empathy` / `attunement_to_cues`
- **Repeated Opportunities & Expected Observations:** 3 sequential sound check stages. `OBSERVATIONS_PER_FEATURE`: **3**.
- **Control Condition:** Stage 2 is optimal; candidate should confirm without moving the slider.
- **Primary Nuisance Demand:** Pacing speed.
- **Telemetry Needed:** `stage_onset`, `slider_delta`, `stage_confirmed`.
- **Expected Duration:** 20 seconds.
- **Accessibility Alternative:** Stepper buttons (- / +).
- **Measurement Quality Rationale:** Prevents single-trial error; establishes whether candidate checks partner state before moving slider.

---

### F2: The Gathering Voices
- **Current Problem:** Implemented as a single multiple-choice question (`F2_ASK`, `F2_TEST`, `F2_HOLD`), duplicating the SJT methodology inside an interactive game world.

#### Direction A: Interactive Audio Channel Equalization
- **Construct/Facet Preserved:** `empathy` / `cognitive_perspective_taking`
- **Repeated Opportunities & Expected Observations:** 3 consecutive audio channel balance tasks with ambiguous textural feedback. `OBSERVATIONS_PER_FEATURE`: **3**.
- **Control Condition:** One channel has explicit feedback; two have ambiguous tone shifts requiring a "Test Level" or "Inquire" action.
- **Primary Nuisance Demand:** Auditory/visual discrimination.
- **Telemetry Needed:** `channel_presented`, `action_chosen` (inquire vs guess), `level_set`.
- **Expected Duration:** 25 seconds.
- **Accessibility Alternative:** Textual transcript of audio characteristics.
- **Measurement Quality Rationale:** Replaces passive multiple-choice reading with active procedural disambiguation under ambiguous feedback.

#### Direction B: Time-Budget Limitation Note
- **Honest Assessment:** If interactive audio channel disambiguation cannot be implemented without exceeding the 35-second budget or requiring complex audio assets, F2 should be flagged for formal redesign or removal during battery revision.

---

### F3: The Echo of the Room
- **Current Problem:** Single-trial room adjustment; lacks dynamic transition stimuli to measure context updating.

#### Direction A: Dynamic Two-Phase Transition Recalibration
- **Construct/Facet Preserved:** `empathy` / `context_sensitive_updating`
- **Repeated Opportunities & Expected Observations:** 2 sequential hall transitions (Rehearsal $\rightarrow$ Arrival $\rightarrow$ Full Recital). `OBSERVATIONS_PER_FEATURE`: **2** (recalibration speed and accuracy per phase).
- **Control Condition:** Phase 2 reverses the direction of ideal resonance, penalizing perseveration on Phase 1 settings.
- **Primary Nuisance Demand:** Perceptual change detection.
- **Telemetry Needed:** `transition_triggered`, `recalibration_start`, `recalibration_locked`.
- **Expected Duration:** 25–30 seconds.
- **Accessibility Alternative:** Distinct visual indicator and textual announcement of hall occupancy change.
- **Measurement Quality Rationale:** Separates initial tuning ability from the capacity to discard obsolete settings when social environmental demands change.

---

## 3. Parameter 3: Collaborative Spirit (World 3: The Shared Canvas)

### C1: The Artisan's Basket
- **Current Problem:** 1 single tile distribution trial (8 vs 2 tiles); lacks control conditions where sharing is unnecessary or counterproductive, violating the construct boundary: *Collaborative Spirit $\neq$ Amount of Sharing*.

#### Direction A: Multi-Round Workshop Allocation with Variable Demand
- **Construct/Facet Preserved:** `collaborative_spirit` / `need_sensitive_resource_sharing`
- **Repeated Opportunities & Expected Observations:** 3 distinct allocation rounds. `OBSERVATIONS_PER_FEATURE`: **3**.
- **Control Condition:** Round 2 presents a workbench where partner has 6 tiles and needs only 4; transferring tiles to partner in Round 2 is wasteful and starves candidate's station.
- **Primary Nuisance Demand:** Numerical arithmetic comprehension.
- **Telemetry Needed:** `round_presented` (own_tiles, partner_tiles, quota), `transfer_delta`, `round_confirmed`.
- **Expected Duration:** 25–30 seconds (8–10 seconds per round).
- **Accessibility Alternative:** Clear numeric summary tables alongside visual baskets; Tab/Enter step incrementing.
- **Measurement Quality Rationale:** Disentangles thoughtful need-sensitive equity from simplistic altruistic compliance or blind 50/50 splitting.

---

### C2: The Gallery Wall
- **Current Problem:** Single 1-click slot selection on a static canvas; measures spatial symmetry perception rather than social coordination.

#### Direction A: Sequential Turn-Taking Placement
- **Construct/Facet Preserved:** `collaborative_spirit` / `complementary_role_coordination`
- **Repeated Opportunities & Expected Observations:** 3 sequential artwork placements alternating with simulated partner placements. `OBSERVATIONS_PER_FEATURE`: **3**.
- **Control Condition:** Partner places a wide landscape in Step 2; candidate must choose a complementary slot that leaves room for the final group piece.
- **Primary Nuisance Demand:** Spatial visualization.
- **Telemetry Needed:** `partner_piece_placed`, `slot_hovered`, `slot_selected`, `placement_latency`.
- **Expected Duration:** 25–30 seconds.
- **Accessibility Alternative:** Screen reader descriptions of relative wall positions ("West Section: Upper", "Center Section: Balanced").
- **Measurement Quality Rationale:** Converts a static visual quiz into an active process of mutual adaptation across sequential turns.

---

### C3: The Dual Lanterns
- **Current Problem:** Single slider choice with an obvious 5–5 default middle split; lacks multi-step balance repair.

#### Direction A: Asymmetric Hall Lighting Balancing
- **Construct/Facet Preserved:** `collaborative_spirit` / `collaborative_misalignment_repair`
- **Repeated Opportunities & Expected Observations:** 2 distinct exhibition setups with unequal room sizes (Setup 1: Room A has 8 folios, Room B has 2; Setup 2: Room A has 4 folios, Room B has 6). `OBSERVATIONS_PER_FEATURE`: **2**.
- **Control Condition:** A 5–5 numerical split in Setup 1 under-lights Room A and over-lights Room B; true cooperation requires proportional distribution based on exhibit needs.
- **Primary Nuisance Demand:** Ratio estimation.
- **Telemetry Needed:** `setup_presented`, `slider_adjusted`, `allocation_confirmed`.
- **Expected Duration:** 20–25 seconds.
- **Accessibility Alternative:** Numeric text readouts of lumens/lanterns per room; keyboard arrow step adjustment.
- **Measurement Quality Rationale:** Eliminates the lazy middle-split heuristic; tests authentic functional cooperation.

---

## 4. Parameter 4: Emotional Agility (World 4: The Shifting Grid)

### E1: The Ceramic Mosaic
- **Current Problem:** Client explicitly announces the rule shift with a prominent banner (`Active Rule: Match by Shape`) and re-labels the bins, destroying the measurement of cognitive flexibility and turning the task into reading compliance.

#### Direction A: Unannounced Shift Discovered via Feedback
- **Construct/Facet Preserved:** `emotional_agility` / `behavioral_adaptation_under_rule_change`
- **Repeated Opportunities & Expected Observations:** 10 total sorting trials (trials 1–5: Color; trial 6: unannounced shift to Shape; trials 6–10: post-shift adaptation). `OBSERVATIONS_PER_FEATURE`: **10** (5 post-shift trials to observe perseveration and recovery).
- **Control Condition:** Target bins retain neutral dual-attribute exemplar markers (e.g. Bin 1: Gold Circle, Bin 2: Sage Square) throughout the entire task, without text label changes.
- **Primary Nuisance Demand:** Perceptual processing speed and set-shifting.
- **Telemetry Needed:** `card_presented`, `bin_selected`, `is_correct`, `trial_latency_ms`.
- **Expected Duration:** 25–30 seconds (~2.5–3 seconds per card).
- **Accessibility Alternative:** High-contrast shape and pattern fills; keyboard keys 1 and 2.
- **Measurement Quality Rationale:** Aligns with standard cognitive flexibility paradigms (e.g. Wisconsin Card Sort analog), measuring genuine behavioral adaptation rather than reading compliance.

---

### E2: The Unexpected Guest
- **Current Problem:** 1-shot multiple-choice question (`QUICK_FIX`, `ASK_TEAM`, `FINISH_FIRST`), replicating SJT format inside the game battery.

#### Direction A: Interactive Setup Interruption & Recovery
- **Construct/Facet Preserved:** `emotional_agility` / `constructive_disruption_response`
- **Repeated Opportunities & Expected Observations:** Candidate is executing a timed arrangement task; an unplanned interruption occurs at second 10 (easel dislodged, requiring a brief stabilization tap), after which primary task resumes. `OBSERVATIONS_PER_FEATURE`: **2** (interruption latency, primary rhythm recovery ratio).
- **Control Condition:** Control trial without interruption establishes baseline task execution speed.
- **Primary Nuisance Demand:** Motor response latency.
- **Telemetry Needed:** `interruption_onset`, `interruption_handled`, `task_resumed`, `post_interruption_dwell`.
- **Expected Duration:** 25 seconds.
- **Accessibility Alternative:** Keyboard Spacebar to resolve interruption; no fast time-out penalty.
- **Measurement Quality Rationale:** Measures actual behavioral recovery of task rhythm following disruption rather than self-reported coping intentions.

---

### E3: The Geometric Harmony
- **Current Problem:** 1-shot motif preference click (diamond vs wave vs dots); heavily confounded by subjective personal aesthetic taste.

#### Direction A: Contextual Harmony Matching Against Discordant Backgrounds
- **Construct/Facet Preserved:** `emotional_agility` / `equilibrium_under_ambiguity`
- **Repeated Opportunities & Expected Observations:** 3 successive room backgrounds (Angular, Flowing, Minimalist) where the candidate selects a complementary floor pattern. `OBSERVATIONS_PER_FEATURE`: **3**.
- **Control Condition:** One background has balanced neutral borders where multiple choices are acceptable.
- **Primary Nuisance Demand:** Visual aesthetic judgment.
- **Telemetry Needed:** `background_presented`, `pattern_selected`, `selection_latency`.
- **Expected Duration:** 20–25 seconds.
- **Accessibility Alternative:** Text descriptions of architectural lines and motif geometries.
- **Measurement Quality Rationale:** Tests whether candidate adapts motif selection to shifting environmental contexts rather than rigidly repeating their personal favorite pattern.

---

## 5. Parameter 5: Curiosity (World 5: The Hidden Gallery)

### Q3: The Weaver's Chronicle
- **Current Problem:** Functions as a short-term multiple-choice memory recall test on details read in Q1, confounding curiosity with verbal working memory.

#### Direction A: Optional Cultural Deep-Dive Query
- **Construct/Facet Preserved:** `curiosity` / `downstream_information_application`
- **Repeated Opportunities & Expected Observations:** Candidate is sorting chronicle records and can optionally open "Historical Cross-Reference" drawers to resolve ambiguous catalog dates. `OBSERVATIONS_PER_FEATURE`: **3** (optional cross-reference inquiries across 3 catalog records).
- **Control Condition:** Cross-referencing is completely optional; records can be filed with an approximate tag immediately without penalty.
- **Primary Nuisance Demand:** Reading speed.
- **Telemetry Needed:** `record_presented`, `reference_opened`, `reference_dwell_ms`, `record_filed`.
- **Expected Duration:** 25–30 seconds.
- **Accessibility Alternative:** Screen-reader accessible reference text; unhurried pacing.
- **Measurement Quality Rationale:** Measures voluntary pursuit of deeper context to enrich work rather than testing rote memory recall.

---

## 6. Parameter 6: Creative Initiative (World 6: The Broken Tool)

### CR1: The Artisan's Cord
- **Current Problem:** 1 single assembly trial without iterative testing or feedback; candidate selects 2 tools and immediately concludes.

#### Direction A: Iterative Multi-Stage Rigging with Stability Feedback
- **Construct/Facet Preserved:** `creative_initiative` / `divergent_combination_under_constraint`
- **Repeated Opportunities & Expected Observations:** 2 mounting challenges under differing weight constraints, with up to 3 test attempts per challenge. `OBSERVATIONS_PER_FEATURE`: **2** (successful synthesis scores; immediate first-try insight is awarded full credit without penalty).
- **Control Condition:** Challenge 1 has standard wire available (control baseline); Challenge 2 has broken wire, requiring alternative combination.
- **Primary Nuisance Demand:** Mechanical intuition.
- **Telemetry Needed:** `challenge_started`, `items_combined`, `stability_tested` (feedback shown), `challenge_finalized`.
- **Expected Duration:** 30–35 seconds.
- **Accessibility Alternative:** Clear textual feedback on test results ("Mount unstable: brass chain lacks friction; requires cord wrap"); toggleable buttons.
- **Measurement Quality Rationale:** Captures hypothesis generation, testing, and strategy revision while explicitly protecting immediate first-try insight.

---

### CR2: The Central Pillar
- **Current Problem:** 1 multiple-choice question describing an immovable pillar; duplicates SJT format inside the game battery.

#### Direction A: Interactive Spatial Layout Reconfiguration
- **Construct/Facet Preserved:** `creative_initiative` / `cognitive_reframing_under_obstacle`
- **Repeated Opportunities & Expected Observations:** 2 spatial arrangement boards with immovable architectural obstacles (Pillar, Low Arch). Candidate drags display panels into available floor slots. `OBSERVATIONS_PER_FEATURE`: **2**.
- **Control Condition:** Board 1 has an unobstructed floor; Board 2 has the central pillar.
- **Primary Nuisance Demand:** Spatial manipulation.
- **Telemetry Needed:** `board_loaded`, `panel_positioned`, `layout_tested`.
- **Expected Duration:** 30 seconds.
- **Accessibility Alternative:** Keyboard grid navigation (Arrow keys / Slot selection).
- **Measurement Quality Rationale:** Replaces reading a verbal vignette with active spatial reframing of obstacles into focal display assets.

---

### CR3: The Printed Motif
- **Current Problem:** 1-shot tool selection (ruler, comb, sponge) to replicate a border motif.

#### Direction A: Multi-Impression Border Completion
- **Construct/Facet Preserved:** `creative_initiative` / `novel_tool_application`
- **Repeated Opportunities & Expected Observations:** Candidate needs to complete 3 sections of a damaged geometric border using non-standard workshop items. `OBSERVATIONS_PER_FEATURE`: **3**.
- **Control Condition:** Section 1 has a standard intact stamp; Sections 2 and 3 require alternative tool selection.
- **Primary Nuisance Demand:** Visual geometric comparison.
- **Telemetry Needed:** `section_presented`, `tool_selected`, `impression_tested`, `section_completed`.
- **Expected Duration:** 25–30 seconds.
- **Accessibility Alternative:** Text descriptions of stamp teeth and tool geometric profiles.
- **Measurement Quality Rationale:** Tests whether candidate discovers structural affordances across multiple distinct border sections without penalizing immediate correct choices.

---

## 7. Parameter 7: Motivation (World 7: The Repetition)

### M3: The Evening Threshold
- **Current Problem:** Implemented as a single 3-item static checklist with a "Finalize Assessment" button; lacks an unreinforced repeated behavioral stream.

#### Direction A: Silent Unreinforced Verification Block
- **Construct/Facet Preserved:** `motivation` / `autonomous_self_regulation_without_extrinsic_feedback`
- **Repeated Opportunities & Expected Observations:** Candidate verifies up to 4 closing ledger pages where celebratory sound chimes and visual reward animations are completely absent. `OBSERVATIONS_PER_FEATURE`: **4** (voluntary inspection count under extinction).
- **Control Condition:** Candidate is clearly informed: *"Mandatory closing is verified. Up to 4 optional archival folios may be double-checked, or you may finalize now."* Exit button is permanently active.
- **Primary Nuisance Demand:** End-of-battery fatigue.
- **Telemetry Needed:** `unreinforced_block_started`, `folio_checked`, `session_finalized`.
- **Expected Duration:** 20–30 seconds.
- **Accessibility Alternative:** Silent screen reader status update confirming verification without distracting sound effects.
- **Measurement Quality Rationale:** Provides an honest extinction/reduced-feedback condition testing intrinsic follow-through without misleading claims about background saving.

#### Direction B: Scope Elimination Note
- **Honest Assessment:** If M1 (baseline diligence) and M2 (voluntary persistence beyond minimum) provide sufficient construct coverage for motivation, M3 can be formally designated as a non-scored transitional closing ritual rather than an artificial psychometric task.

---

## 8. Summary Table of Stopped Game Decisions

| Game | Identified Problem | Candidate Direction A | Candidate Direction B / Limitation |
| :--- | :--- | :--- | :--- |
| **F1** | Single trial; lacks non-accommodation control trial | 4-trial adaptive tuning with decoy mechanical drift | 3-stage rehearsal balance with stage 2 optimal control |
| **F2** | Single multiple-choice prompt; duplicates SJT format | Interactive audio channel equalization & disambiguation | Flag for battery redesign/removal if budget exceeded |
| **F3** | Single trial; lacks dynamic transition sequence | 2-phase transition recalibration with direction reversal | Static 3-room sequential check |
| **C1** | Single trial; violates boundary (sharing $\neq$ collaboration) | 3-round workshop allocation with variable demand | Proportional allocation with partner quota display |
| **C2** | Single slot click; visual symmetry confound | 3-turn sequential artwork placement with partner | Two-phase wall balance under asymmetric lighting |
| **C3** | Single slider choice; trivial 5–5 default middle split | Asymmetric hall lighting balancing (8 vs 2 artworks) | Multi-step interactive lighting repair |
| **E1** | Explicit banner announces rule; only 6 trials; reading confound | 10-trial unannounced shift discovered via feedback | Shift cued by subtle ambient color shift without text |
| **E2** | Single multiple-choice vignette; duplicates SJT format | Interactive setup interruption and rhythm recovery | Timed checklist with sudden pause and restart |
| **E3** | Single preference click; subjective aesthetic confound | Contextual harmony matching across 3 discordant backgrounds | Pattern adaptation under strict border constraints |
| **Q3** | Verbal recall quiz; working memory confound | Optional cultural cross-referencing during chronicle sorting | Bounded search through chronicle records |
| **CR1** | Single assembly trial; lacks iterative feedback loop | 2-stage rigging with stability feedback (protects 1st try) | Tension testing across 3 material combinations |
| **CR2** | Single multiple-choice vignette; duplicates SJT format | Interactive spatial layout reconfiguration around pillar | Modular exhibition partitioning challenge |
| **CR3** | Single tool selection; lacks multi-attempt sequence | 3-section border repair using tool affordances | Texture stamp substitution with preview feedback |
| **M3** | Single button click; lacks repeated behavioral stream | Silent unreinforced verification block (up to 4 folios) | Designate as non-scored closing ritual (M1+M2 sufficient) |
