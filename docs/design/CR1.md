# Mini-Game Design Sheet: CR1 — Open Construction (The Artisan's Cord)
**World:** The Broken Tool (`W6`)  
**Target Parameter:** `creative_initiative`  
**Behavioral Facet:** `divergent_combination_under_constraint`  
**Measurement Status:** `MISSING DESIGN DECISION — STOPPED`

---

## 1. Target Parameter & Behavioral Facet
- **Target Parameter:** `creative_initiative`
- **Behavioral Facet:** `divergent_combination_under_constraint`
- **Authoritative Definition Reference:** Bound to `config/parameters.json` (`creative_initiative`).

## 2. Nearest Established Research Construct & Honest Match Note
- **Nearest Construct:** Divergent Thinking, Creative Problem Solving, & Heuristic Assembly.
- **Honesty Match Note:** Evaluates the generation and combination of non-standard workshop items (hemp cord, brass chain, walnut clip, steel ring) to build a stable hanging rig when standard mounting wire is absent.
- **Claim Boundary:** Combining materials on a 2D web canvas does not establish patent-level mechanical creativity or artistic genius.

## 3. Research Citation(s)
- Benedek, M., & Fink, A. (2019). *Toward a cognitive neuroscience of creative cognition: A review.* Current Opinion in Behavioral Sciences, 27, 116–122. https://doi.org/10.1016/j.cobeha.2018.08.005
- Zhang, W., Sjoerds, Z., & Hommel, B. (2020). *Metacontrol of human creativity: The neurocognitive mechanisms of convergent and divergent thinking.* NeuroImage, 210, 116572. https://doi.org/10.1016/j.neuroimage.2019.116572

## 4. Mechanistic Rationale
When routine tools are unavailable or broken, creative initiative involves identifying alternative affordances in existing materials and combining them into an effective functional substitute.

## 5. Exact Observable Behavior
- Assembly combination selected from available workbench items.
- Iterative attempts and reconfiguration after stability feedback (`assembly_tested`, `materials_combined`).

## 6. Candidate Raw Telemetry Requirements
- `workbench_presented` (timestamp, available_tools: 4)
- `tool_toggled` (timestamp, tool_id, is_active)
- `stability_tested` (timestamp, rig_items, is_stable)
- `assembly_finalized` (timestamp, final_rig)

## 7. Candidate Feature(s), Formula, and Direction
- **Feature 1:** `viable_alternative_synthesis`
  - *Formula:* Binary/Categorical score on whether the combination satisfies tensile and balance constraints without standard wire.
  - *Units:* Score (0.0 to 1.0)
  - *Direction:* Higher indicates functional synthesis under constraint.

## 8. Important Construct Boundary
- **Creative Initiative $\neq$ Unusual Clicks or Number of Attempts:** Clicking every tool randomly or making 10 failed attempts is not creativity; achieving an elegant solution on the first try must NEVER be penalized.

## 9. Nuisance Demands & Alternative Explanations
- **Mechanical/Physics Intuition:** Prior experience with knots, cords, or workshop rigging.
- **Trial-and-Error Guessing:** Selecting pairs until a green checkmark appears.

## 10. Required Control / Decoy Conditions
- Decoy combinations that look plausible but lack necessary tensile strength or fastening logic.

## 11. Accessibility Implications
- Textual descriptors of material physical properties; toggleable buttons with keyboard Enter.

## 12. Expected Relationship with SJT
- **SJT $\leftrightarrow$ CR1 Convergence Hypothesis:** Modest positive correlation. SJT evaluates strategic improvisation; CR1 tests concrete artifact combination.

## 13. Expected Relationship with Sibling Mini-Games (CR2, CR3)
- **CR1 $\leftrightarrow$ CR2:** CR1 tests physical assembly; CR2 tests spatial constraint reframing.
- **CR1 $\leftrightarrow$ CR3:** CR3 tests non-standard tool improvisation.

## 14. What the Task Cannot Establish
- Cannot measure artistic inspiration or novel conceptual breakthrough.

## 15. Pre-Implementation Validity Check & Decision
- **Opportunities:** Currently implemented as a single combination trial in `frontend/src/recruit_games/the_broken_tool.js`.
- **Lacks Iterative Feedback Loop:** Lacks dynamic test feedback and hypothesis revision cycle.
- **Status:** `MISSING DESIGN DECISION — STOPPED`.
- **Blocker:** Requires owner design decision specifying multi-attempt stability feedback loop and scoring rules that do not penalize first-try success.
