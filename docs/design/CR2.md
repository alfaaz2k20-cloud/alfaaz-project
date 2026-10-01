# Mini-Game Design Sheet: CR2 — Constraint Shift (The Central Pillar)
**World:** The Broken Tool (`W6`)  
**Target Parameter:** `creative_initiative`  
**Behavioral Facet:** `cognitive_reframing_under_obstacle`  
**Measurement Status:** `MISSING DESIGN DECISION — STOPPED`

---

## 1. Target Parameter & Behavioral Facet
- **Target Parameter:** `creative_initiative`
- **Behavioral Facet:** `cognitive_reframing_under_obstacle`
- **Authoritative Definition Reference:** Bound to `config/parameters.json` (`creative_initiative`).

## 2. Nearest Established Research Construct & Honest Match Note
- **Nearest Construct:** Cognitive Reframing, Functional Fixedness Overcoming, & Spatial Improvisation.
- **Honesty Match Note:** Evaluates whether a candidate can reframe an obstruction (a massive structural pillar blocking sightlines) into an exhibition display asset.
- **Claim Boundary:** Selecting a creative reframing option in a scenario does not guarantee creative architectural problem-solving under real construction pressure.

## 3. Research Citation(s)
- Benedek, M., & Fink, A. (2019). *Toward a cognitive neuroscience of creative cognition...* Current Opinion in Behavioral Sciences, 27, 116–122.
- Zhang, W., et al. (2020). *Metacontrol of human creativity...* NeuroImage, 210, 116572.

## 4. Mechanistic Rationale
When confronted with an immovable obstacle, creative initiative manifests in overcoming functional fixedness—transforming the constraint itself into the centerpiece of the solution rather than fighting the obstruction.

## 5. Exact Observable Behavior
- Selection among reframing strategies (e.g. mounting 360-degree cylindrical tapestry around the pillar vs fighting the obstruction).

## 6. Candidate Raw Telemetry Requirements
- `constraint_presented` (timestamp, obstacle_id)
- `strategy_selected` (timestamp, strategy_id, latency_ms)

## 7. Candidate Feature(s), Formula, and Direction
- **Feature 1:** `reframing_divergence_score`
  - *Formula:* Categorical mapping scoring reframing efficacy.
  - *Units:* Score (0.0 to 1.0)
  - *Direction:* Higher indicates ability to leverage constraints constructively.

## 8. Important Construct Boundary
- **Creative Initiative $\neq$ Bizarre / Impractical Ideas:** Reframing must be viable and functional, not merely bizarre.

## 9. Nuisance Demands & Alternative Explanations
- **Verbal SJT Format:** Currently implemented as a multiple-choice vignette, confounding game behavior with verbal SJT reasoning.

## 10. Required Control / Decoy Conditions
- Decoy options offering standard uncreative workarounds or impractical ideas.

## 11. Accessibility Implications
- Textual option description; keyboard navigation.

## 12. Expected Relationship with SJT
- **SJT $\leftrightarrow$ CR2 Convergence Hypothesis:** High correlation with SJT due to shared verbal multiple-choice format.

## 13. Expected Relationship with Sibling Mini-Games (CR1, CR3)
- Diverges from CR1 and CR3 in format (verbal vs object manipulation).

## 14. What the Task Cannot Establish
- Cannot measure spontaneous generation of unprompted novel ideas.

## 15. Pre-Implementation Validity Check & Decision
- **Opportunities:** 1 single choice.
- **Format Redundancy:** Multiple-choice format duplicates SJT.
- **Status:** `MISSING DESIGN DECISION — STOPPED`.
- **Blocker:** Requires owner design decision on converting CR2 into an active spatial layout task or keeping it as a contextual vignette.
