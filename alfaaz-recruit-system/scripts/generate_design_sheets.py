import os

MINIGAMES = [
    # World 1: The Frequency (Empathy)
    {
        "id": "F1",
        "name": "Cue Detection",
        "world": "The Frequency",
        "world_id": "W1",
        "param": "empathy",
        "facet": "attunement_to_cues",
        "construct": "Emotion/State Cue Sensitivity (Affective Attunement)",
        "construct_note": "Laboratory analog of social cue detection under cognitive load. Observes behavioral response latency and directional adjustment when partner cues appear during audio/visual tuning.",
        "desc": "The candidate tunes a resonant frequency dial to stabilize a waveform while receiving subtle real-time partner feedback cues (textural shimmer, tone shifts, and dialogue status indicators).",
        "trial_structure": "4 trials: 2 baseline tuning trials, 2 cue-injected trials (1 subtle comfort preference cue, 1 urgent distraction cue).",
        "nuisances": "Motor slider precision and visual contrast. Sibling F1 focuses on cue latency/detection, F2 on ambiguity resolution, F3 on continuous context updating.",
        "controls": "Control trial where frequency drift is purely mechanical and partner state remains optimal; adjusting for partner is unneeded.",
        "events": ["signal_drift_start", "partner_cue_onset", "slider_input", "tuning_stabilized", "cue_acknowledged"],
        "features": [
            {"name": "cue_response_latency_ms", "formula": "t(first slider adjustment after cue) - t(cue onset)", "units": "ms", "interp": "Lower latency indicates prompt behavioral attunement to partner state change.", "why_not_clicks": "Measures temporal responsiveness to a discrete social event rather than raw interaction quantity."},
            {"name": "contextual_adjustment_accuracy", "formula": "abs(final_setting - partner_target) / tolerance_range", "units": "ratio", "interp": "Values closer to 0 indicate precise accommodation of partner cue requirements.", "why_not_clicks": "Measures parameter convergence rather than total movements."}
        ],
        "min_obs": 3,
        "exp_obs": 4,
        "ceiling_ms": 30000,
        "invalid_rules": "No slider interaction across all trials or sequence corruption.",
        "a11y": "Keyboard step adjustment (Arrow keys / Slider keys). Latency features marked unadjusted or excluded in assistive keyboard mode.",
        "insufficient_desc": "Fewer than 3 trials attempted or candidate skipped prior to cue presentation."
    },
    {
        "id": "F2",
        "name": "Ambiguous Cue",
        "world": "The Frequency",
        "world_id": "W1",
        "param": "empathy",
        "facet": "clarification_under_ambiguity",
        "construct": "Social Clarification Seeking under Ambiguity",
        "construct_note": "Analog of communicative inquiry when social signals are low-fidelity.",
        "desc": "Partner gives an ambiguous cue ('something feels slightly off in the balance') while signal is within operational bounds. Candidate can probe for clarification, refine subtly, or maintain state.",
        "trial_structure": "3 trials with varying cue ambiguity (clear error, ambiguous preference, false alarm).",
        "nuisances": "Reading speed of short prompt; differentiated from F1 by offering explicit clarification action vs raw slider tuning.",
        "controls": "Trial where signal is objectively distorted and partner cue is clear: clarification is inefficient, immediate adjustment is appropriate.",
        "events": ["cue_displayed", "clarification_requested", "slider_adjusted", "decision_submitted"],
        "features": [
            {"name": "clarification_vs_assumption_ratio", "formula": "count(clarification_requests on ambiguous trials) / count(ambiguous_trials)", "units": "ratio", "interp": "Higher ratio reflects willingness to verify partner perspective before acting on ambiguous signals.", "why_not_clicks": "Categorical choice under specific informational ambiguity condition."}
        ],
        "min_obs": 2,
        "exp_obs": 3,
        "ceiling_ms": 30000,
        "invalid_rules": "Zero responses registered or timeout without interaction.",
        "a11y": "Full screen-reader semantic buttons; keyboard selectable.",
        "insufficient_desc": "Trial skipped or timed out before choice selection."
    },
    {
        "id": "F3",
        "name": "Context Change",
        "world": "The Frequency",
        "world_id": "W1",
        "param": "empathy",
        "facet": "perspective_updating",
        "construct": "Dynamic Perspective Updating",
        "construct_note": "Evaluates adaptation when external situational shifts modify partner constraints mid-stream.",
        "desc": "Partner's listening environment suddenly shifts (e.g. ambient noise increases), altering their optimal balance target while candidate is actively tuning.",
        "trial_structure": "3 continuous tracking phases with 1 unexpected environment shift.",
        "nuisances": "Continuous visual-motor tracking. Differentiated by evaluating post-shift adjustment trajectory rather than initial cue detection.",
        "controls": "Shift where environment change does not affect partner comfort zone (distractor event).",
        "events": ["environment_shift_onset", "partner_status_updated", "recalibration_started", "recalibration_complete"],
        "features": [
            {"name": "post_shift_adaptation_latency_ms", "formula": "t(first adjustment towards new target) - t(environment shift)", "units": "ms", "interp": "Shorter latency indicates rapid perspective updating following external context change.", "why_not_clicks": "Time-series event delta."}
        ],
        "min_obs": 2,
        "exp_obs": 3,
        "ceiling_ms": 35000,
        "invalid_rules": "Interrupted mid-shift or no input after shift onset.",
        "a11y": "Clear text announcement of partner status change (aria-live); keyboard-friendly adjustment.",
        "insufficient_desc": "Less than 2 valid environment phases completed."
    },

    # World 2: The Archive (Conscientiousness)
    {
        "id": "A1",
        "name": "Classification",
        "world": "The Archive",
        "world_id": "W2",
        "param": "conscientiousness",
        "facet": "rule_governed_sorting",
        "construct": "Rule-Governed Categorization & Attentiveness to Detail",
        "construct_note": "Structured archival sorting task evaluating adherence to multi-attribute classification criteria under neutral pacing.",
        "desc": "Candidate catalogs historical cultural documents into categorized archival drawers according to era, medium, and preservation protocol.",
        "trial_structure": "6 document filing trials with multi-criteria metadata cards.",
        "nuisances": "Reading structured metadata tags; differentiated from A2/A3 by testing standard rule application without deliberate exceptions or post-hoc auditing.",
        "controls": "Items with obvious single-category tags interspersed with multi-attribute items.",
        "events": ["document_opened", "metadata_inspected", "rule_guide_viewed", "category_selected", "document_filed"],
        "features": [
            {"name": "classification_rule_adherence_rate", "formula": "count(correctly classified documents) / total_documents", "units": "ratio", "interp": "Higher ratio indicates meticulous application of classification rubrics.", "why_not_clicks": "Categorical correctness normalized by item count."},
            {"name": "verification_duration_ratio", "formula": "total_time_reviewing_rules_and_metadata / total_task_duration", "units": "ratio", "interp": "Process metric capturing deliberation and pre-decision verification.", "why_not_clicks": "Proportional temporal investment."}
        ],
        "min_obs": 4,
        "exp_obs": 6,
        "ceiling_ms": 35000,
        "invalid_rules": "All documents filed in under 2 seconds without inspecting metadata.",
        "a11y": "High contrast text tags, keyboard drag/drop or numeric slot assignment (1-4).",
        "insufficient_desc": "Fewer than 4 documents processed before exiting."
    },
    {
        "id": "A2",
        "name": "Exception Handling",
        "world": "The Archive",
        "world_id": "W2",
        "param": "conscientiousness",
        "facet": "diligence_under_ambiguity",
        "construct": "Exception Identification and Protocol Discipline",
        "construct_note": "Evaluates handling of ambiguous, damaged, or rule-conflicting records.",
        "desc": "Candidate encounters rare archival items that do not neatly fit standard categories (e.g. bilingual fragment, dual-period artifact). Option to flag for secondary review or force-fit.",
        "trial_structure": "4 trials (2 standard items, 2 genuine edge cases requiring exception protocol).",
        "nuisances": "Cognitive judgment of boundary conditions; sibling A1 tests standard rules, A3 tests retrospective verification.",
        "controls": "Items that appear complex but have an explicit fallback clause in the archival rule sheet.",
        "events": ["edge_case_presented", "rule_exception_consulted", "quarantine_or_flag_action", "decision_logged"],
        "features": [
            {"name": "exception_flagging_precision", "formula": "count(genuine exceptions properly flagged) / total_edge_cases", "units": "ratio", "interp": "Higher precision reflects systematic handling of boundary conditions without reckless forcing.", "why_not_clicks": "Rule-criterion compliance score."}
        ],
        "min_obs": 3,
        "exp_obs": 4,
        "ceiling_ms": 35000,
        "invalid_rules": "No actions taken or immediate random filing.",
        "a11y": "Full keyboard navigation and screen reader labels for metadata flags.",
        "insufficient_desc": "Less than 3 trials completed."
    },
    {
        "id": "A3",
        "name": "Quality Control",
        "world": "The Archive",
        "world_id": "W2",
        "param": "conscientiousness",
        "facet": "self_correction_and_verification",
        "construct": "Post-Task Auditing & Error Correction",
        "construct_note": "Measures voluntary verification behavior before final archival submission.",
        "desc": "Candidate is presented with a summary ledger of 6 previously filed items (2 of which contain injected transcript errors) and given unpressured opportunity to review, verify, or correct.",
        "trial_structure": "1 comprehensive ledger review phase with 6 item rows.",
        "nuisances": "Visual comparison of side-by-side strings; distinguishes careful accurate work without checking from heavy checking with poor error detection.",
        "controls": "4 clean records that require no changes.",
        "events": ["ledger_opened", "row_inspected", "edit_modal_triggered", "correction_applied", "ledger_finalized"],
        "features": [
            {"name": "error_detection_sensitivity", "formula": "count(true errors corrected) / total_true_errors", "units": "ratio", "interp": "Sensitivity to discrepancies in catalogued records.", "why_not_clicks": "Signal detection sensitivity (d' or hit rate)."},
            {"name": "false_alarm_rate", "formula": "count(clean records erroneously altered) / total_clean_records", "units": "ratio", "interp": "Distinguishes disciplined checking from indiscriminate editing.", "why_not_clicks": "Error rate metric."}
        ],
        "min_obs": 1,
        "exp_obs": 1,
        "ceiling_ms": 35000,
        "invalid_rules": "Finalized instantaneously (<500ms) or corrupted ledger state.",
        "a11y": "Accessible data table markup with aria-sort and keyboard focusable cells.",
        "insufficient_desc": "Ledger bypassed without inspection."
    },

    # World 3: The Shared Canvas (Collaborative Spirit)
    {
        "id": "C1",
        "name": "Resource Cooperation",
        "world": "The Shared Canvas",
        "world_id": "W3",
        "param": "collaborative_spirit",
        "facet": "prosocial_resource_sharing",
        "construct": "Prosocial Resource Allocation in Joint Tasks",
        "construct_note": "Evaluates voluntary allocation of finite creative tiles/pigments when partner indicates scarcity.",
        "desc": "Player and a simulated peer collaborate to restore a mosaic mural. Player holds surplus pigment blocks; partner's palette runs low on a shared section.",
        "trial_structure": "3 collaborative rounds with varying partner resource states (plentiful, near depletion, exhausted).",
        "nuisances": "Motor tile placement; differentiated from C2 (pacing) and C3 (alignment repair).",
        "controls": "Control trial where partner has full resources and sharing would deplete player needlessly ('more sharing != always better').",
        "events": ["round_start", "partner_resource_state_updated", "resource_transfer_initiated", "resource_amount_selected", "tile_placed"],
        "features": [
            {"name": "need_sensitive_sharing_index", "formula": "(sharing_when_partner_depleted - sharing_when_partner_full) / max_possible_transfer", "units": "index (-1 to 1)", "interp": "Positive values reflect targeted prosocial sharing attuned to genuine peer need.", "why_not_clicks": "Normalized differential allocation index."}
        ],
        "min_obs": 2,
        "exp_obs": 3,
        "ceiling_ms": 30000,
        "invalid_rules": "No canvas engagement or zero tiles handled.",
        "a11y": "Keyboard palette transfers (Number keys 1-5 to transfer / space to place).",
        "insufficient_desc": "Fewer than 2 rounds completed."
    },
    {
        "id": "C2",
        "name": "Coordination",
        "world": "The Shared Canvas",
        "world_id": "W3",
        "param": "collaborative_spirit",
        "facet": "interpersonal_synchrony_and_pacing",
        "construct": "Adaptive Interpersonal Pacing",
        "construct_note": "Measures behavioral pacing adjustment when working on interconnected canvas sections.",
        "desc": "Player and partner must alternate or complement brush strokes to blend boundary gradients without overwriting each other's work.",
        "trial_structure": "3 segments where partner's pace dynamically modulates (steady, delayed, accelerated).",
        "nuisances": "Rhythmic timing; focuses on collision avoidance and complementary pacing rather than motor dexterity.",
        "controls": "Independent canvas zones where partner pace is irrelevant.",
        "events": ["brush_stroke_start", "partner_stroke_detected", "overlap_collision_event", "pacing_delay_adjusted"],
        "features": [
            {"name": "coordination_collision_avoidance_rate", "formula": "1 - (count(destructive overlaps) / total_joint_strokes)", "units": "ratio", "interp": "Higher rate indicates respectful spatial-temporal awareness of peer actions.", "why_not_clicks": "Ratio of non-conflicting joint actions."}
        ],
        "min_obs": 2,
        "exp_obs": 3,
        "ceiling_ms": 30000,
        "invalid_rules": "Zero strokes or intentional continuous overwrite.",
        "a11y": "Auditory/visual pacing metronome indicators; step-based turn mode.",
        "insufficient_desc": "Less than 2 segments attempted."
    },
    {
        "id": "C3",
        "name": "Collaboration Repair",
        "world": "The Shared Canvas",
        "world_id": "W3",
        "param": "collaborative_spirit",
        "facet": "constructive_alignment_repair",
        "construct": "Collaborative Misalignment Repair",
        "construct_note": "Assesses willingness to constructively realign and rectify shared discrepancies without assigning blame or abandoning joint output.",
        "desc": "A simulated partner inadvertently places mismatched color tiles in the shared motif. Candidate can repair, blend, redistribute, or isolate.",
        "trial_structure": "3 repair scenarios (minor misalignment, major color clash, intentional artistic divergence).",
        "nuisances": "Spatial composition judgment; differentiated from C1/C2 by focusing on resolution of partner errors.",
        "controls": "Scenario where partner divergence was an intended stylistic feature defined in the motif brief.",
        "events": ["misalignment_revealed", "repair_strategy_selected", "tile_rearranged", "motif_completed"],
        "features": [
            {"name": "constructive_repair_score", "formula": "weighted_sum(integrative_solutions) / total_repair_trials", "units": "score (0-1)", "interp": "Higher score reflects constructive harmonizing of collective output.", "why_not_clicks": "Evaluates structural quality of repair strategy."}
        ],
        "min_obs": 2,
        "exp_obs": 3,
        "ceiling_ms": 35000,
        "invalid_rules": "No interaction during repair phase.",
        "a11y": "Keyboard selectable repair actions (1: Re-tile, 2: Harmonize border, 3: Retain).",
        "insufficient_desc": "Less than 2 scenarios completed."
    },

    # World 4: The Shifting Grid (Emotional Agility)
    {
        "id": "E1",
        "name": "Rule Shift",
        "world": "The Shifting Grid",
        "world_id": "W4",
        "param": "emotional_agility",
        "facet": "cognitive_flexibility_under_rule_change",
        "construct": "Behavioral Flexibility & Set-Shifting (Wisconsin Card Sort Analog)",
        "construct_note": "Measures adaptation when established sorting rules (color vs shape vs glyph) silently change.",
        "desc": "Candidate sorts geometric cultural symbols into quadrants. After establishing a stable sorting pattern, the matching criterion silently shifts.",
        "trial_structure": "18 continuous sorting trials with 2 unannounced dimension shifts.",
        "nuisances": "Rapid classification motor speed. Differentiated by pure rule reversal vs setback recovery (E2) or condition disruption (E3).",
        "controls": "Initial 6 trials established with unambiguous feedback.",
        "events": ["symbol_presented", "quadrant_selected", "feedback_displayed", "rule_shift_triggered", "perseverative_error_logged"],
        "features": [
            {"name": "perseverative_error_count", "formula": "count(incorrect choices adhering to obsolete rule immediately post-shift)", "units": "count", "interp": "Lower perseveration indicates agile mental flexibility and rapid detachment from obsolete assumptions.", "why_not_clicks": "Categorical error classification."},
            {"name": "trials_to_criterion_post_shift", "formula": "count(trials until 3 consecutive correct post-shift)", "units": "trials", "interp": "Fewer trials indicates swift recalibration to new operating reality.", "why_not_clicks": "Convergence speed metric."}
        ],
        "min_obs": 12,
        "exp_obs": 18,
        "ceiling_ms": 35000,
        "invalid_rules": "Random spam clicking without regard to feedback.",
        "a11y": "High contrast shape/color/symbol dual encoding; keyboard keys 1-4.",
        "insufficient_desc": "Less than 12 trials completed or skipped during first shift."
    },
    {
        "id": "E2",
        "name": "Setback Recovery",
        "world": "The Shifting Grid",
        "world_id": "W4",
        "param": "emotional_agility",
        "facet": "post_interruption_stability",
        "construct": "Behavioral Equanimity Post-Disruption",
        "construct_note": "Evaluates latency and accuracy stabilization following a mild scripted task interruption/setback.",
        "desc": "Candidate is assembling a sequence when a scripted task condition change resets the current subunit (no false error accusation, transparent system recalibration).",
        "trial_structure": "3 sequence assembly stages with 1 scripted condition reset.",
        "nuisances": "Motor re-entry; avoids any distress/loud stimuli. Strictly tracks behavioral cadence pre- and post-reset.",
        "controls": "Pre-setback baseline assembly speed and accuracy.",
        "events": ["sequence_step_logged", "system_recalibration_reset", "first_action_post_reset", "cadence_recovered"],
        "features": [
            {"name": "cadence_stability_ratio", "formula": "median_latency_post_reset / median_latency_baseline", "units": "ratio", "interp": "Ratios close to 1.0 reflect steady emotional equanimity without flustered rushing or paralysis.", "why_not_clicks": "Temporal variance ratio."}
        ],
        "min_obs": 2,
        "exp_obs": 3,
        "ceiling_ms": 30000,
        "invalid_rules": "Complete abandonment post-reset.",
        "a11y": "Clear visual announcement of reset; no sudden motion.",
        "insufficient_desc": "Aborted before post-reset recovery."
    },
    {
        "id": "E3",
        "name": "Changing Conditions",
        "world": "The Shifting Grid",
        "world_id": "W4",
        "param": "emotional_agility",
        "facet": "strategy_adaptation",
        "construct": "Strategy Modification under Constraint Modulation",
        "construct_note": "Evaluates intentional strategy shift when time budget or grid density dynamically changes.",
        "desc": "Grid configuration transforms from open layout to constrained labyrinth, requiring transition from broad scanning to sequential pathing.",
        "trial_structure": "4 phases with progressive density changes.",
        "nuisances": "Spatial navigation; differentiated from E1 (rules) and E2 (disruptions).",
        "controls": "Phase with identical density to establish baseline approach.",
        "events": ["phase_start", "density_modified", "path_node_selected", "phase_complete"],
        "features": [
            {"name": "strategy_shift_efficiency", "formula": "path_efficiency_in_constrained_phase / path_efficiency_in_open_phase", "units": "ratio", "interp": "Capacity to shift behavioral mode in response to altered environmental constraints.", "why_not_clicks": "Algorithmic path efficiency ratio."}
        ],
        "min_obs": 3,
        "exp_obs": 4,
        "ceiling_ms": 35000,
        "invalid_rules": "No path completed.",
        "a11y": "Step-by-step directional grid navigation via arrow keys.",
        "insufficient_desc": "Fewer than 3 phases completed."
    },

    # World 5: The Hidden Gallery (Curiosity)
    {
        "id": "Q1",
        "name": "Optional Discovery",
        "world": "The Hidden Gallery",
        "world_id": "W5",
        "param": "curiosity",
        "facet": "epistemic_exploration",
        "construct": "Information Seeking Without Extrinsic Reward",
        "construct_note": "Evaluates voluntary exploration of unrequired cultural artifacts and background archives where no score incentive exists.",
        "desc": "Candidate navigates an exhibition floorplan to reach an exit marker. Optional side alcoves contain unrequired archival manuscripts and artifacts.",
        "trial_structure": "1 continuous floorplan navigation with 3 optional side alcoves.",
        "nuisances": "Map navigation; content is broad cultural/historical, not Alfaaz-specific.",
        "controls": "Direct clear path to exit clearly demarcated.",
        "events": ["navigation_step", "alcove_entered", "artifact_examined", "detail_expanded", "exit_reached"],
        "features": [
            {"name": "optional_alcove_exploration_rate", "formula": "count(alcoves entered) / total_optional_alcoves", "units": "ratio", "interp": "Propensity to voluntarily investigate non-mandatory domains.", "why_not_clicks": "Proportion of voluntary areas explored."},
            {"name": "epistemic_dwell_duration_ratio", "formula": "time_spent_in_alcoves / total_navigation_time", "units": "ratio", "interp": "Investment of attention in optional informational depth.", "why_not_clicks": "Relative dwell time."}
        ],
        "min_obs": 1,
        "exp_obs": 1,
        "ceiling_ms": 35000,
        "invalid_rules": "Exited in <1000ms with zero movement trace.",
        "a11y": "Keyboard list navigation of gallery rooms and artifact descriptions.",
        "insufficient_desc": "Session terminated before navigation."
    },
    {
        "id": "Q2",
        "name": "Mystery Exploration",
        "world": "The Hidden Gallery",
        "world_id": "W5",
        "param": "curiosity",
        "facet": "perceptual_inquiry",
        "construct": "Investigation of Anomalous / Unexplained Stimuli",
        "construct_note": "Assesses behavioral inquiry into an anomalous symbol or unresolved visual pattern.",
        "desc": "An artifact exhibit contains an anomalous inscription that does not match standard catalog entries. Candidate can proceed or inspect multiple interpretive facets.",
        "trial_structure": "3 artifact stations with 1 distinct anomalous curiosity trigger.",
        "nuisances": "Visual pattern discernment; sibling Q1 measures spatial exploration, Q3 measures integration.",
        "controls": "Standard artifacts with complete clear catalog descriptions.",
        "events": ["station_viewed", "anomaly_clicked", "layer_unfolded", "investigation_depth_logged"],
        "features": [
            {"name": "anomaly_investigation_depth", "formula": "count(investigative layers unlocked on anomaly) / max_depth", "units": "ratio", "interp": "Depth of sustained inquiry into unexplained stimuli.", "why_not_clicks": "Hierarchical discovery depth level."}
        ],
        "min_obs": 2,
        "exp_obs": 3,
        "ceiling_ms": 30000,
        "invalid_rules": "Zero stations inspected.",
        "a11y": "Screen reader descriptive text with expandable detail disclosures.",
        "insufficient_desc": "Less than 2 stations viewed."
    },
    {
        "id": "Q3",
        "name": "Information Integration",
        "world": "The Hidden Gallery",
        "world_id": "W5",
        "param": "curiosity",
        "facet": "knowledge_synthesis",
        "construct": "Spontaneous Cross-Domain Information Synthesis",
        "construct_note": "Examines whether optional insights gathered in prior exploration are spontaneously utilized to contextualize a later exhibit.",
        "desc": "A final archival curation challenge presents a contextual puzzle that is readily solved if optional alcove clues were read, but also solvable through deduction.",
        "trial_structure": "2 thematic synthesis questions.",
        "nuisances": "Memory and comprehension; differentiates superficial browsing from cognitive processing.",
        "controls": "Baseline questions requiring only immediate stimulus information.",
        "events": ["synthesis_presented", "cross_reference_accessed", "synthesis_option_selected"],
        "features": [
            {"name": "integrated_insight_utilization", "formula": "count(synthesis solutions referencing optional clues) / total_synthesis_items", "units": "ratio", "interp": "Shows functional utility derived from spontaneous epistemic curiosity.", "why_not_clicks": "Qualitative solution matching."}
        ],
        "min_obs": 2,
        "exp_obs": 2,
        "ceiling_ms": 30000,
        "invalid_rules": "No response submitted.",
        "a11y": "Accessible form choices with high contrast options.",
        "insufficient_desc": "Synthesis skipped."
    },

    # World 6: The Broken Tool (Creative Initiative)
    {
        "id": "CR1",
        "name": "Open Construction",
        "world": "The Broken Tool",
        "world_id": "W6",
        "param": "creative_initiative",
        "facet": "divergent_problem_solving",
        "construct": "Divergent Assembly & Multi-Path Problem Solving",
        "construct_note": "Evaluates generative assembly when multiple distinct structural configurations satisfy the objective.",
        "desc": "Candidate must bridge a structural gap using an assortment of asymmetrical modular architectural fragments.",
        "trial_structure": "2 open-ended structural assembly trials.",
        "nuisances": "Spatial 2D layout. Differentiated from CR2 (constraint shift) and CR3 (novel tool affordances).",
        "controls": "Clear physical constraints (span width, load points) where first-try valid construction is fully credited.",
        "events": ["block_selected", "block_rotated", "block_placed", "test_load_applied", "structure_stabilized"],
        "features": [
            {"name": "solution_uniqueness_index", "formula": "dissimilarity(candidate_solution_graph, common_template_graph)", "units": "index (0-1)", "interp": "Higher index denotes novel yet functionally sound structural approach.", "why_not_clicks": "Topological graph dissimilarity."},
            {"name": "attempt_chain_progression", "formula": "entropy_of_block_variety_across_attempts", "units": "bits", "interp": "Evaluates whether revisions explore new concepts rather than repetitive micro-nudges.", "why_not_clicks": "Information entropy across attempt sequence."}
        ],
        "min_obs": 1,
        "exp_obs": 2,
        "ceiling_ms": 35000,
        "invalid_rules": "Zero blocks placed or continuous random thrashing.",
        "a11y": "Grid-based coordinate placement via keyboard cursor; structural validation audio/text cues.",
        "insufficient_desc": "Less than 1 valid structure attempted."
    },
    {
        "id": "CR2",
        "name": "Constraint Shift",
        "world": "The Broken Tool",
        "world_id": "W6",
        "param": "creative_initiative",
        "facet": "ideational_flexibility",
        "construct": "Creative Pivot under Sudden Resource Constraint",
        "construct_note": "Examines strategic reorientation when standard building blocks become unavailable.",
        "desc": "The primary connector element breaks/runs out mid-assembly. Candidate must pivot to utilize alternative structural elements (cantilevers, counterweights).",
        "trial_structure": "2 trials with mid-task material depletion.",
        "nuisances": "Mechanical reasoning; avoids penalizing rapid successful pivot.",
        "controls": "Standard baseline trial before resource depletion occurs.",
        "events": ["primary_tool_depleted", "alternative_selected", "novel_mechanism_tested", "pivot_succeeded"],
        "features": [
            {"name": "creative_pivot_latency_ms", "formula": "t(first functional alternative attempt) - t(primary tool depletion)", "units": "ms", "interp": "Swift ideational pivot when conventional pathways close.", "why_not_clicks": "Temporal pivot latency."}
        ],
        "min_obs": 1,
        "exp_obs": 2,
        "ceiling_ms": 35000,
        "invalid_rules": "Abandoned upon tool breakage.",
        "a11y": "Accessible inventory menu with explicit alternative descriptions.",
        "insufficient_desc": "Skipped during tool depletion."
    },
    {
        "id": "CR3",
        "name": "Unspecified Tool Use",
        "world": "The Broken Tool",
        "world_id": "W6",
        "param": "creative_initiative",
        "facet": "functional_flexibility",
        "construct": "Overcoming Functional Fixedness",
        "construct_note": "Evaluates repurposing an object with a conventional label for an unconventional utilitarian purpose.",
        "desc": "Candidate is provided items with conventional labels (e.g. 'bookend', 'ruler', 'ribbon') and must solve a mechanical alignment challenge requiring non-standard affordances.",
        "trial_structure": "3 distinct challenge stages.",
        "nuisances": "Object manipulation interface; sibling CR1 tests open build, CR2 tests resource breakage.",
        "controls": "One challenge where the conventional use of the tool is optimal (prevents over-complication bias).",
        "events": ["challenge_initiated", "tool_affordance_tested", "unconventional_use_applied", "objective_met"],
        "features": [
            {"name": "functional_fixedness_overcome_rate", "formula": "count(unconventional affordances successfully applied) / total_novel_challenges", "units": "ratio", "interp": "Capacity to perceive novel utilitarian utility in everyday items.", "why_not_clicks": "Binary success on affordance transfer."}
        ],
        "min_obs": 2,
        "exp_obs": 3,
        "ceiling_ms": 30000,
        "invalid_rules": "Zero tools tested.",
        "a11y": "Keyboard selection of tool pairing and applied orientation.",
        "insufficient_desc": "Less than 2 challenges attempted."
    },

    # World 7: The Repetition (Motivation)
    {
        "id": "M1",
        "name": "Minimum Completed",
        "world": "The Repetition",
        "world_id": "W7",
        "param": "motivation",
        "facet": "baseline_task_completion",
        "construct": "Baseline Execution Quality on Routine Tasks",
        "construct_note": "Measures quality, pace consistency, and diligence during mandatory baseline repetitive units.",
        "desc": "Candidate formats and validates a series of repetitive cultural transcript cards (matching typography style and checking hyphenation) up to the explicit stated required minimum (3 units).",
        "trial_structure": "3 mandatory baseline units.",
        "nuisances": "Typing / verification clicks; neutral, non-flashy interface.",
        "controls": "Uniform difficulty across all units.",
        "events": ["unit_loaded", "formatting_applied", "unit_verified", "mandatory_minimum_reached"],
        "features": [
            {"name": "mandatory_cadence_consistency", "formula": "std_dev(unit_completion_durations) / mean(unit_completion_durations)", "units": "coefficient of variation", "interp": "Lower variation indicates steady, disciplined execution rhythm on routine work.", "why_not_clicks": "Coefficient of variation of processing durations."}
        ],
        "min_obs": 3,
        "exp_obs": 3,
        "ceiling_ms": 30000,
        "invalid_rules": "Less than 3 mandatory units completed before cutoff.",
        "a11y": "Full keyboard shortcuts for text styling/formatting toggles.",
        "insufficient_desc": "Mandatory minimum not completed."
    },
    {
        "id": "M2",
        "name": "Optional Continuation",
        "world": "The Repetition",
        "world_id": "W7",
        "param": "motivation",
        "facet": "voluntary_persistence",
        "construct": "Voluntary Task Persistence Beyond Stated Minimum",
        "construct_note": "Measures spontaneous decision to continue repetitive cataloguing when explicitly told they are free to proceed or stop without penalty.",
        "desc": "After completing the mandatory 3 units, the UI neutrally informs: 'Minimum completed. You may continue formatting additional records or conclude this world.'",
        "trial_structure": "Up to 5 optional units with honest neutral choice prompt after each unit.",
        "nuisances": "None; completely transparent choice prompt ('Finish & Continue' vs 'Format Another').",
        "controls": "Stopping at minimum is treated as neutral, valid baseline behavior, never penalized.",
        "events": ["optional_prompt_displayed", "choice_logged", "optional_unit_started", "optional_unit_finished", "ceiling_reached"],
        "features": [
            {"name": "optional_units_completed", "formula": "count(completed optional units)", "units": "units (0-5)", "interp": "Voluntary persistence on unglamorous organizational tasks. Note: Right-censored at ceiling.", "why_not_clicks": "Count of discrete voluntary tasks completed."},
            {"name": "voluntary_duration_ms", "formula": "sum(time spent on optional units)", "units": "ms", "interp": "Total voluntary time investment in routine support.", "why_not_clicks": "Continuous duration metric."}
        ],
        "min_obs": 1,
        "exp_obs": 5,
        "ceiling_ms": 40000,
        "invalid_rules": "Immediate crash or invalid state.",
        "a11y": "Accessible button prompt with direct keyboard focus.",
        "insufficient_desc": "No choice registered."
    },
    {
        "id": "M3",
        "name": "Persistence Under Reduced Reward",
        "world": "The Repetition",
        "world_id": "W7",
        "param": "motivation",
        "facet": "intrinsic_stamina",
        "construct": "Persistence Under Diminished Feedback Salience",
        "construct_note": "Evaluates continuation when UI feedback indicators (progress animations, immediate confirmation chimes) are removed.",
        "desc": "If candidate chooses to continue, formatting feedback becomes understated (quiet silent save) to observe self-sustained persistence vs extrinsic feedback dependency.",
        "trial_structure": "Optional continuous batch with subtle silent acknowledgement.",
        "nuisances": "Differentiated from M1/M2 by stripped visual affirmation.",
        "controls": "Accurate tracking of pause-and-resume and cadence degradation.",
        "events": ["understated_unit_started", "pause_detected", "resume_detected", "understated_unit_completed", "session_concluded"],
        "features": [
            {"name": "reduced_feedback_persistence_count", "formula": "count(units completed without salient feedback)", "units": "units", "interp": "Capacity for self-regulated persistence in low-stimulation environments.", "why_not_clicks": "Discrete completed unit count."}
        ],
        "min_obs": 1,
        "exp_obs": 3,
        "ceiling_ms": 30000,
        "invalid_rules": "Corrupted state.",
        "a11y": "Semantic status messages via aria-live.",
        "insufficient_desc": "Exited prior to reduced feedback phase."
    }
]

def generate_design_sheet(mg):
    events_md = "\n".join([f"- `{e}`" for e in mg["events"]])
    features_md = ""
    for f in mg["features"]:
        features_md += f"""### Feature: `{f['name']}`
- **Formula:** {f['formula']}
- **Units:** {f['units']}
- **Direction of Interpretation:** {f['interp']}
- **Construct Distinction (Why not click count):** {f['why_not_clicks']}

"""

    content = f"""# Mini-Game Design Sheet: {mg['id']} — {mg['name']}
**World:** {mg['world']} (`{mg['world_id']}`)  
**Target Parameter:** `{mg['param']}`  
**Behavioral Facet:** `{mg['facet']}`  

---

## 1. Target Parameter & Behavioral Facet
- **Parameter Key:** `{mg['param']}`
- **Facet:** `{mg['facet']}`
- **Definition Reference:** Bound to authoritative definition in `config/parameters.json` for `{mg['param']}`.

## 2. Nearest Researched Construct & Honest Match Note
- **Nearest Construct:** {mg['construct']}
- **Honesty Note:** {mg['construct_note']}

## 3. Task Description & Trial Structure
- **Description:** {mg['desc']}
- **Trial Structure:** {mg['trial_structure']}

## 4. Nuisance Demands & Sibling Differentiation
- **Nuisance Demands:** {mg['nuisances']}

## 5. Control / Decoy Conditions
- **Controls:** {mg['controls']}

## 6. Raw Events Logged
{events_md}

## 7. Extracted Behavioral Features
{features_md}

## 8. Data Sufficiency (`min_observations`)
- **Minimum Observations for `USABLE` Status:** `{mg['min_obs']}`
- **Expected Observations:** `{mg['exp_obs']}`

## 9. Time Ceiling (`ceiling_ms`) & Censoring
- **Ceiling:** `{mg['ceiling_ms']} ms`
- **Behavior on Ceiling:** Task gracefully concludes; logged with `stop_reason: "ceiling"`; observations are marked right-censored.

## 10. Validity Rules (`INVALID` Criteria)
- **Invalidation Condition:** {mg['invalid_rules']}

## 11. Accessibility Alternative & Feature Exclusion
- **Interaction Alternative:** {mg['a11y']}

## 12. Insufficient Evidence Manifestation
- **Insufficient Condition:** {mg['insufficient_desc']} Result marked `INSUFFICIENT` (never `LOW`).

## 13. Proposed Elements
- **PROPOSED (needs owner approval):** All heuristic features and thresholds are uncalibrated (`null` thresholds in `config/feature_bands.json`) pending empirical normative volunteer data.
"""
    return content

os.makedirs("docs/design", exist_ok=True)
for mg in MINIGAMES:
    path = os.path.join("docs/design", f"{mg['id']}.md")
    with open(path, "w", encoding="utf-8") as f:
        f.write(generate_design_sheet(mg))
    print(f"Generated {path}")

print("All 21 Design Sheets successfully generated.")
