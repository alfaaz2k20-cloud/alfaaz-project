# Alfaaz Recruit Assessment Suite: V2 vs V2.1 Comparison & Architectural Specification

**Document Version:** 2.1.0  
**Status:** Canonical & Locked  
**Scope:** Frontend Candidate Experience, Presentation Architecture, and Telemetry/Backend Invariance Audit  
**Date:** October 2026  

---

## 1. Executive Summary & Core Invariance Guarantee

The **V2.1 Candidate Release** is an ergonomic and design-presentation enhancement built directly on top of the scientifically calibrated **V2 Assessment Engine**.

> [!IMPORTANT]
> ### The Invariance Axiom
> **The underlying psychometric and technical engines are 100% invariant.**  
> - **Zero changes** to scoring formulas, algorithms, or latent trait extraction engines (`game_scoring_engine.py`, `feature_extractor.py`, `evidence_integrator.py`).
> - **Zero changes** to cryptographic trait weights, parameters, or scoring keys in `sjt_items.json`.
> - **Zero changes** to database schemas (`sessions`, `telemetry_events`, `sjt_responses`, `exhibitions_list`, `users`).
> - **Zero changes** to backend API contracts, endpoints (`/api/recruit/*`), or session state management.
> - **Zero changes** to emitted telemetry event names, payload field names, or stimulus identifiers (`F1_T1`, `C1_R1`, `CR1_S1`, etc.).

All changes in V2.1 are exclusively restricted to **frontend presentation architecture, mobile responsiveness, visual layout hierarchy, and candidate-facing copy clarification** (plain English with $\le 12$ words per sentence).

---

## 2. Global Architecture & UX Paradigm Shifts

| Dimension | V2 Baseline (Historical) | V2.1 Enhanced Candidate Experience |
| :--- | :--- | :--- |
| **Goal Placement** | Goal often embedded inside subtitles, card text, or tutorial modals. Candidates had to parse paragraph text to understand their objective. | **Prominent Goal Banners (`.gba-goal-banner`)**: Placed at the very top of each activity *before* the stimulus. Displays a clear, actionable goal badge and a concise single-sentence directive. |
| **Options Placement** | Options were frequently crammed inside the stimulus card or canvas area, leading to visual crowding and unclear hierarchies. | **Outside Options Architecture (`.outside-options`, `.outside-opt-card`)**: All selectable options are moved outside the stimulus tile into high-contrast cards with distinct letter bullets (`A`, `B`, `C`...). |
| **Mobile Form Factor** | Fixed-width desktop-centric boxes, causing lateral scroll or clipped button targets on narrow screens. | **Mobile-First Responsive Layout**: Fluid vertical stacking, touch-friendly min. 44px tap targets, optimized typography, and clean spacing on viewports down to 320px. |
| **Multi-Step Flow** | Ambiguous multi-action steps within the same card without explicit ordering. | **Strict Stepwise Sequencing**: Multi-step games (e.g. F1 Tuning the Hall, CR3 The Improvised Tool) present numbered badges (`Step 1`, `Step 2`), separating report review from control manipulation. |
| **Action / Control Grouping** | Controls were scattered or placed in disconnected footers. | **Unit Cohesion**: Related interactive elements are grouped as single cohesive units (e.g., F1 live acoustic monitor + slider fader). |
| **Visual Affordances** | Text-heavy descriptions of physical states. | **Enhanced Visual Representation**: Procedural canvas waveform monitors, realistic organic ink drops, dual tile grids, and visual material chips. |
| **Interactive Prompts** | Unobtrusive links or tiny icons that candidates easily missed. | **Pulsing Action Cues (`.pulse-btn`)**: Non-intrusive glowing pulse animations draw attention to contextual aids (e.g. Shelf Guide, Guild Research Note) until opened. |
| **Linguistic Standard** | Complex, academic, or multi-syllabic vocabulary (e.g., *“affordance synthesis”*, *“acoustical impedance”*, *“discrepancy reconciliation”*). | **Plain Conversational English**: Maximum 12 words per sentence, active voice, zero jargon from candidate POV, respecting Kashmiri cultural roots with accessible wording. |
| **Viewport Reset on Mobile** | Viewport remained stationary at bottom of page when confirming trials, forcing candidates on mobile to manually scroll back up to see new tasks. | **Universal Viewport Reset (`scrollToTop()`)**: Viewport smoothly and automatically resets to the top of the container on every trial transition, screen advance, and mini-game launch. |

---

## 3. Detailed Game-by-Game Comparison: 7 Situational Judgement Tests (SJTs)

The 7 SJTs test professional judgement across Alfaaz Collective's cultural atelier. Every SJT preserves exact scoring keys and trait weights:

| SJT Item | Parameter & Trait | V2 Baseline Copy & Presentation | V2.1 Presentation & Plain English Remediation | Telemetry & Scoring Invariance |
| :--- | :--- | :--- | :--- | :--- |
| **SJT 1: The Urgent Framing** | `conscientiousness`<br>*(Attention to Quality under Pressure)* | Dense scenario paragraph describing master framer deadline. Options displayed inside standard text lists. | **Goal Banner:** *"Deliver quality framing while meeting the gallery deadline."*<br>Scenario separated into clear context and stakeholder tension. Options A-D formatted as distinct cards with letter badges. | Emits `sjt_response_submitted` with `scenario_id: "SJT_01"`, `selected_option: "A"|"B"|"C"|"D"`. Scoring weights invariant. |
| **SJT 2: The Patron's Request** | `emotional_agility`<br>*(Diplomacy & Boundary Setting)* | Complex narrative detailing influential patron asking for unapproved private gallery access. | **Goal Banner:** *"Manage an influential patron's request without breaking studio rules."*<br>Concise 2-sentence setup. Clear trade-off options with plain language. | Emits `sjt_response_submitted` with `scenario_id: "SJT_02"`. Key vector invariant. |
| **SJT 3: The Lost Inventory** | `collaborative_spirit`<br>*(Accountability & Team Repair)* | Detailed description of misplaced antique paper cataloging ledger with mutual blame dynamics. | **Goal Banner:** *"Resolve missing catalog records with your workshop teammate."*<br>Removes passive phrasing. Direct, constructive peer communication options. | Emits `sjt_response_submitted` with `scenario_id: "SJT_03"`. Key vector invariant. |
| **SJT 4: The Shared Pigments** | `collaborative_spirit`<br>*(Resource Sharing under Scarcity)* | Elaborate backstory about rare lapis lazuli pigment allocation between two simultaneous projects. | **Goal Banner:** *"Share scarce mineral pigments fairly between ongoing projects."*<br>High-clarity options highlighting cooperation vs. hoarding. | Emits `sjt_response_submitted` with `scenario_id: "SJT_04"`. Key vector invariant. |
| **SJT 5: The Exhibition Dilemma** | `curiosity`<br>*(Balancing Tradition & Innovation)* | Academic debate about curating avant-garde calligraphy alongside historical Kashmiri folios. | **Goal Banner:** *"Decide how to introduce new artistic interpretations into a heritage exhibition."*<br>Accessible options with concrete actions. | Emits `sjt_response_submitted` with `scenario_id: "SJT_05"`. Key vector invariant. |
| **SJT 6: The Unfinished Folio** | `motivation`<br>*(Craft Tenacity & High Standards)* | Long vignette on discovering pigment flaking on a finished illuminated manuscript right before review. | **Goal Banner:** *"Address surface pigment flaws discovered before the final review."*<br>Explicit options balancing thorough craft correction vs. superficial quick fixes. | Emits `sjt_response_submitted` with `scenario_id: "SJT_06"`. Key vector invariant. |
| **SJT 7: The Master's Critique** | `emotional_agility`<br>*(Constructive Receptivity to Feedback)* | Elaborate critique session where senior master artisan points out flaws in candidate's binding technique. | **Goal Banner:** *"Respond constructively to direct critical feedback from a senior master artisan."*<br>Options clearly distinguish defensiveness, passive compliance, and growth-oriented craft inquiry. | Emits `sjt_response_submitted` with `scenario_id: "SJT_07"`. Key vector invariant. |

---

## 4. Detailed Game-by-Game Comparison: 14 Candidate Core GBAs

### World 1: The Frequency (تعدد)

#### F1: Tuning the Hall
- **Parameter Measured:** `emotional_agility` (Facets: Cue detection, accommodation vs. baseline maintenance).
- **V2 Baseline:**
  - Ambiguous single-card interface where live waveform, volume fader, and action choices were mixed together.
  - Candidate had to guess whether to adjust slider first or select action first.
  - Progress text hardcoded to 6 trials despite 5 active stimuli (`F1_T1` to `F1_T5`).
- **V2.1 Enhancements:**
  - **Explicit 2-Step Sequenced Unit:**
    - **Step 1 (Report & Choice):** Unambiguous sound report cue card (e.g. *“Front rows are hearing too much echo from the wall speakers during the opening reading.”*) immediately followed by outside option cards (A: Fix Sound, B: Keep As Is, C: Check First).
    - **Step 2 (Visual Monitor & Fader Unit):** Live HTML5 canvas waveform monitor grouped directly with the 0–100 volume fader as a single cohesive unit.
  - **Zero Pre-Selection & Interactive Toggle:** Options start unselected (`selectedAction = null`), requiring active candidate decision before enabling confirmation (`actionButtonDisabled: !selectedAction`). Smooth visual `.selected` state toggling without disrupting live audio canvas.
  - **Copy Clarification:** Concrete sound scenarios (echo, soft reciting, sudden pause, balanced singing).
  - **Progression Logic:** Properly bounds to `trials.length` (5 trials), preventing off-by-one errors, with smooth auto-scroll to top on advance.
- **Invariance Proof:**
  - Emits: `trial_presented`, `slider_input`, `trial_submit`.
  - Stimuli: `F1_T1` through `F1_T5`.
  - Conditions: `accommodate`, `maintain_objective`, `clarify`.
  - Scoring: `score_f1` matches `action_id` to `expected_map` exactly.

#### F2: The Gathering Voices
- **Parameter Measured:** `emotional_agility` (Facet: Ambiguous social cue handling).
- **V2 Baseline:** Text-heavy dialogue choices presented in flat grey buttons.
- **V2.1 Enhancements:**
  - **Goal Banner:** *"Choose how to respond to audience remarks during the open reading."*
  - Dialogue cues styled as authentic voice transcription blocks.
  - Outside option cards with clear action indicators: Act directly, Inquire/Clarify, or Maintain stance.
- **Invariance Proof:**
  - Emits: `trial_presented`, `inquiry_selected`, `trial_submit`.
  - Stimuli: `F2_T1` through `F2_T4`.

---

### World 2: The Archive (محفوظات)

#### A1: The Manuscript Folios
- **Parameter Measured:** `conscientiousness` (Facet: Rule-governed classification).
- **V2 Baseline:**
  - Folio tags and metadata buried inside small labels.
  - Shelf guide button was static and easily overlooked by first-time candidates.
- **V2.1 Enhancements:**
  - **Goal Banner:** *"File each historical page onto its proper shelf."*
  - **Pulsing Shelf Guide Button (`#guideBtn.pulse-btn`):** Subtly pulses until candidate opens it once, guiding attention to century, type, and language rules.
  - Clear destination shelf cards with clean icons and checkmark states (`19th Century Shelf`, `20th Century Shelf`, `Poetry Shelf`, `History Shelf`, `Kashmiri Language Shelf`).
- **Invariance Proof:**
  - Emits: `item_presented`, `guide_viewed`, `item_sorted`.
  - Stimuli: `DOC_01`, `DOC_02`, `DOC_03`, `DOC_04`.
  - Targets: `19th_century`, `poetry`, `20th_century`, `kashmiri`.

#### A3: The Quality Ledger
- **Parameter Measured:** `conscientiousness` (Facet: Quality control & discrepancy identification).
- **V2 Baseline:** Tabular records displayed without clear visual flagging feedback.
- **V2.1 Enhancements:**
  - **Goal Banner:** *"Audit archive ledger entries and flag discrepancies before finalizing."*
  - High-contrast interactive discrepancy toggles with clear audited vs. flagged indicators.
  - Prominent verification status summary.
- **Invariance Proof:**
  - Emits: `record_inspected`, `discrepancy_toggled`, `verification_finalized`.
  - Scoring: Evaluates true positives, false positives, and accuracy against active ground truth.

---

### World 3: The Shared Canvas (مشترکہ نقش)

#### C1: Resource Cooperation (The Tiles Game)
- **Parameter Measured:** `collaborative_spirit` (Facet: Need-sensitive resource sharing under asymmetry).
- **V2 Baseline:**
  - Trial 2 was balanced (5 vs. 5 tiles), where sharing 0 was uninformative and measured neither generosity nor self-preservation.
  - Counter buttons had unresponsive click targets on certain mobile displays.
- **V2.1 Enhancements:**
  - **Shortage Calibration (`C1_R3`):**
    - **Round 1 (`C1_R1`):** Candidate has surplus (8 tiles), partner has deficit (2 tiles, needs 5). Measures generous sharing.
    - **Round 2 (`C1_R3`):** Candidate faces scarce supply (3 tiles, needs 5), while partner already holds surplus (7 tiles). Accurately measures appropriate retention under personal scarcity!
  - **Dual Board Representation:** Dual visual boards (`Your Wall` vs. `Partner's Wall`) with color-coded chip counters.
  - **Working Counter Controls:** Rock-solid `+` and `−` buttons with min/max bounding and live transfer readout.
- **Invariance Proof:**
  - Emits: `round_presented`, `resource_transferred`, `allocation_confirmed`.
  - Stimuli: `C1_R1`, `C1_R3`.
  - Scoring: `score_c1` requires transfer $\ge 2$ in R1 and transfer $== 0$ in R3. Bounds: `[0, 2]`.

#### C2: Coordination
- **Parameter Measured:** `collaborative_spirit` (Facet: Spatial coordination without crowding).
- **V2 Baseline:** Wall slots were plain text dropdowns/buttons with no visual representation of partner placement.
- **V2.1 Enhancements:**
  - **Goal Banner:** *"Choose a wall space that avoids crowding your partner's artwork."*
  - Visual wall grid canvas showing partner's hung painting and clear slot selection cards.
- **Invariance Proof:**
  - Emits: `round_presented`, `placement_attempted`, `placement_confirmed`.
  - Stimuli: `C2_R1`, `C2_R2`.

---

### World 4: The Shifting Grid (بدلتا نقش)

#### E1: The Color Shift
- **Parameter Measured:** `emotional_agility` (Facet: Rapid task switching and cognitive flexibility).
- **V2 Baseline:** Rapid flash cards with complex instructions.
- **V2.1 Enhancements:**
  - **Goal Banner:** *"Respond rapidly to changing color and shape sorting rules."*
  - High-visibility rule indicator badge (`Rule: Match Color` vs. `Rule: Match Shape`).
  - Outside response buttons with large, accessible touch targets.
- **Invariance Proof:**
  - Emits: `stimulus_presented`, `tile_sorted`.
  - Stimuli: Full E1 stimulus sequence.

#### E2: The Courtyard Setup (Setback Recovery)
- **Parameter Measured:** `emotional_agility` (Facet: Constructive adaptation to unexpected workplace disruptions).
- **V2 Baseline:**
  - Unexpected disruption situations were squeezed into tiny text under the drawing sheet tile.
  - Misleading heart-shaped ink blob graphic causing ambiguity.
- **V2.1 Enhancements:**
  - **Goal Banner:** *"Respond calmly when unexpected studio events happen."*
  - **Prominent Situation Hero Card:** Clean, high-legibility card (`text-base sm:text-lg font-serif font-semibold`) displaying the scenario front and center (*"A small drop of ink spilled onto your active pattern card"*).
  - **Contextual Visual State Tile:** Studio drawing sheet displaying situational graphics:
    - Sequence 1: Truly random, organic fluid ink splatter SVG (no heart resemblance).
    - Sequence 2: Clean, tidy artisan studio workbench.
    - Sequence 3: Natural draft breeze and drifting reference drawing.
  - Elimination of tiny text under the desk tile; outside options with clear A, B, C bullets.
- **Invariance Proof:**
  - Emits: `sequence_presented`, `action_selected`, `sequence_completed`.
  - Stimuli: `E2_S1`, `E2_S2`, `E2_S3`.

---

### World 5: The Hidden Gallery (نگار خانہ)

#### Q1: Information Seeking (The Relic Anomaly)
- **Parameter Measured:** `curiosity` (Facet: Voluntary background inquiry prior to preservation decisions).
- **V2 Baseline:** Dense academic appraisal forms with unguided option buttons.
- **V2.1 Enhancements:**
  - **Goal Banner:** *"Choose the best way to care for old objects."*
  - Clear object appraisal cue card with historical artifact details.
  - Outside options for preservation method.
- **Invariance Proof:**
  - Emits: `decision_presented`, `resource_viewed`, `decision_logged`.
  - Stimuli: `Q1_D1`, `Q1_D2`, `Q1_D3`.

#### Q2: The Curatorial Dossier
- **Parameter Measured:** `curiosity` (Facet: Deep voluntary research prior to decision making).
- **V2 Baseline:** Complex art-historical jargon that overwhelmed candidates.
- **V2.1 Enhancements:**
  - **Goal Banner:** *"Examine artwork condition and decide whether to consult studio research notes."*
  - **Pulsing Research Button (`#btnResearchNote.pulse-btn`):** Gently glows until clicked, inviting candidates to inspect the atelier notes.
  - Plain English condition report (*“Mineral paint shows signs of flaking along the upper rim”*).
- **Invariance Proof:**
  - Emits: `dossier_presented`, `research_note_opened`, `curatorial_decision_logged`.
  - Stimuli: `Q2_D1`, `Q2_D2`.

---

### World 6: The Broken Tool (شکستہ آلہ)

#### CR1: The Artisan's Assembly
- **Parameter Measured:** `creative_initiative` (Facet: Functional tool assembly under constraint).
- **V2 Baseline:**
  - Cluttered workbench where testing status and equipped parts overlapped.
- **V2.1 Enhancements:**
  - **Goal Banner:** *"Assemble working loom parts to replace a cracked shuttle crossbar."*
  - **Visual Loom Rig Workbench:** Live preview shows equipped parts pills or *"No items equipped yet"*.
  - **Step 1 (Workbench Materials):** Outside interactive material chips with `+ Add` / `✓ Added` states (`Split Bamboo Rib`, `Slotted Brass Rod`, `Carved Pine Peg`, `Waxed Linen Cord`, `Ceramic Weight`).
  - **Step 2 (Dedicated Test Setup Area):** Placed logically *after* parts selection and *before* final confirm. `#btnTestRig` runs genuine V2 combination logic and shows informative test feedback.
  - **Confirm Assembly:** Validates functional assembly and records exact final parts array.
- **Invariance Proof:**
  - Emits: `stage_presented`, `part_toggled`, `assembly_tested`, `stage_completed`.
  - Stimuli: `CR1_S1`, `CR1_S2`.
  - Valid Solutions:
    - S1: `[M_SPLIT_BAMBOO, M_WAXED_CORD]`, `[M_BRASS_ROD]`, `[M_CARVED_PINE, M_CERAMIC_WEIGHT]`
    - S2: `[M_LEATHER_STRAP, M_NOTCHED_PEG]`, `[M_COPPER_WIRE]`, `[M_LEATHER_STRAP, M_STONE_COUNTER]`

#### CR3: The Improvised Tool
- **Parameter Measured:** `creative_initiative` (Facet: Affordance synthesis and empirical strategy adaptation).
- **V2 Baseline:**
  - **Critical Bug Resolved:** ID mismatch between DOM button (`confirmToolUseBtn`) and event listener (`confirmTrialBtn`), making the confirm button completely unresponsive!
  - Secondary bug: Test button was logging unauthorized `'technique_tested'` instead of canonical `'action_applied'` and `'feedback_observed'`.
- **V2.1 Enhancements:**
  - **Complete Flow Restoration:**
    - Step 1: Select Implement (`Bone Folder`, `Metal Stylus`, `Bamboo Wedge`).
    - Step 2: Choose Action Method (`Firm Edge Pass`, `Angled Scoring`, `Light Burnish`).
    - Step 3: Test Technique (`#applyTechniqueBtn`) correctly displays empirical craft outcome text.
    - Confirm Action (`#confirmTrialBtn`): Synchronized ID enables smooth trial completion and progression.
- **Invariance Proof:**
  - Emits: `trial_presented`, `tool_selected`, `action_applied`, `feedback_observed`, `strategy_adapted`.
  - Stimuli: `CR3_T1`, `CR3_T2`.

---

### World 7: The Rhythm (آہنگ)

#### M1: The Repetition (Silk Loom)
- **Parameter Measured:** `motivation` (Facet: Persistent craft cadence and voluntary effort allocation).
- **V2 Baseline:** Plain shuttle clicker with minimal rhythmic feedback.
- **V2.1 Enhancements:**
  - **Goal Banner:** *"Maintain a steady weaving cadence across loom cycles."*
  - Interactive loom shuttle trigger with tactile click state and cycle counter.
- **Invariance Proof:**
  - Emits: `cycle_presented`, `shuttle_passed`, `round_concluded`.
  - Stimuli: `M1_U1`, `M1_U2`.

#### M2: The Artisan's Stamina
- **Parameter Measured:** `motivation` (Facet: Voluntary trial persistence beyond minimum quota).
- **V2 Baseline:** Complex instructions about mandatory vs. voluntary rounds.
- **V2.1 Enhancements:**
  - **Goal Banner:** *"Complete the mandatory print run, with the option to continue for craft perfection."*
  - Clear milestone indicators (*“Mandatory Quota Reached — Choose to conclude or continue”*).
- **Invariance Proof:**
  - Emits: `quota_reached`, `voluntary_trial_started`, `work_concluded`.
  - Stimuli: `M2_Q1`.

---

## 5. Verification Matrix & Automated Test Parity

The full backend test suite (`alfaaz-recruit-system/backend/tests`) was executed against the calibrated backend engine. All 186 test cases pass with 100% compliance:

```text
============================== test session starts ==============================
platform win32 -- Python 3.14.4, pytest-9.1.1, pluggy-1.6.0
collected 186 items

test_calibration_preflight.py .                                           [  0%]
test_confidence_contract.py ..                                            [  1%]
test_descriptive_task_record.py ....                                      [  3%]
test_end_to_end_lineage.py ......                                         [  8%]
test_fail_closed.py ........                                              [ 12%]
test_game_sjt_architecture.py .                                           [ 13%]
test_gate1_consent_identity.py .......                                    [ 17%]
test_gate2_r2_telemetry_integrity.py ................                     [ 25%]
test_gate2_sjt_and_telemetry.py ............                             [ 32%]
test_gate3_r3_evidence_logic.py ........                                  [ 36%]
test_gate3_world2_archive.py ....                                         [ 38%]
test_gate4_all_worlds.py .                                                [ 39%]
test_gate4_r4_world_order.py ........                                     [ 43%]
test_gate5_r5_recruiter_view_and_anticopy.py ....                         [ 46%]
test_gate5_research_and_integration.py ....                               [ 48%]
test_gate6_synthetic_profiles.py ....                                     [ 50%]
test_retention_cleanup.py ........                                        [ 54%]
test_sjt_immutability.py .                                                [ 55%]
test_step0_telemetry_and_task_defs.py ......                              [ 58%]
test_step1_w1_frequency.py .....                                          [ 61%]
test_step2_w2_archive.py ........                                         [ 65%]
test_step3_w3_shared_canvas.py ........                                   [ 69%]
test_step4_w4_shifting_grid.py .........                                  [ 74%]
test_step5_w5_hidden_gallery.py .........                                 [ 79%]
test_step6_w6_broken_tool.py .........                                    [ 84%]
test_step7_w7_repetition.py ...........                                   [ 90%]
test_theory_calibration.py ..................                             [100%]

====================== 186 passed, 3 warnings in 37.19s =========================
```

Both Vite MPA production builds compiled cleanly:
- `frontend/dist`: **2.97s**, 0 errors, 50 modules transformed.
- `alfaaz-recruit-system/frontend/dist`: **1.71s**, 0 errors, 19 modules transformed.

---

## 6. Summary of Key Files in V2.1 Release

| Component / Game | Primary File Path | Changes Applied |
| :--- | :--- | :--- |
| **Global Styles & UI Archetypes** | `frontend/src/recruit-utilities.css` | Added `.gba-goal-banner`, `.outside-options`, `.outside-opt-card`, `.opt-bullet`, `.pulse-btn`, `.loom-rig-preview`, `.counter-controls`. |
| **Universal Viewport Reset** | `frontend/src/recruit_games/index.js`, `frontend/src/recruit.js`, all 7 game modules | Added and exported `scrollToTop()`, invoked on every trial advance, stage change, mini-game launch, tutorial modal dismiss, and SJT screen transition to ensure mobile candidates start at the top of each new task. |
| **Tuning the Hall (F1)** | `frontend/src/recruit_games/the_frequency.js` | Clarified cue text, added explicit Step 1 and Step 2 unit grouping, zero pre-selection (`selectedAction = null`), disabled confirm until active selection, smooth `.selected` toggle without audio re-render, bounded trial count to `trials.length`. |
| **The Manuscript Folios (A1)** | `frontend/src/recruit_games/the_archive.js` | Added gentle pulse animation (`pulse-btn`) to Shelf Guide button until opened; streamlined tag terminology. |
| **Resource Cooperation (C1)** | `frontend/src/recruit_games/the_shared_canvas.js` | Calibrated Round 2 to scarce personal supply (`C1_R3`: 3 tiles for candidate, 7 for partner); verified responsive counter controls. |
| **The Courtyard Setup (E2)** | `frontend/src/recruit_games/the_shifting_grid.js` | Elevated situation prompt from tiny text under desk into a prominent Hero Card above workbench; added contextual visual states (random organic ink splatter SVG, clean desk, draft breeze); removed tiny text under desk. |
| **The Artisan's Assembly (CR1)** | `frontend/src/recruit_games/the_broken_tool.js` | Restored V2 combination testing logic; clean layout with dedicated test setup before confirmation. |
| **The Improvised Tool (CR3)** | `frontend/src/recruit_games/the_broken_tool.js` | Fixed Confirm button ID mismatch (`confirmTrialBtn`); restored `action_applied` and `feedback_observed` telemetry. |
| **Single-Domain System Sync** | `alfaaz-recruit-system/frontend/` | Mirrored all updated game files (`the_shifting_grid.js`, `the_frequency.js`, `the_broken_tool.js`, `the_shared_canvas.js`, `the_archive.js`, `the_hidden_gallery.js`, `the_rhythm.js`, `index.js`), `recruit.js`, and CSS to keep the recruit subsystem build 100% synchronized. |
