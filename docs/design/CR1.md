# Mini-Game Design Sheet: CR1 — Open Construction
**World:** The Broken Tool (`W6`)  
**Target Parameter:** `creative_initiative`  
**Behavioral Facet:** `divergent_problem_solving`  

---

## 1. Target Parameter & Behavioral Facet
- **Parameter Key:** `creative_initiative`
- **Facet:** `divergent_problem_solving`
- **Definition Reference:** Bound to authoritative definition in `config/parameters.json` for `creative_initiative`.

## 2. Nearest Researched Construct & Honest Match Note
- **Nearest Construct:** Divergent Assembly & Multi-Path Problem Solving
- **Honesty Note:** Evaluates generative assembly when multiple distinct structural configurations satisfy the objective.

## 3. Task Description & Trial Structure
- **Description:** Candidate must bridge a structural gap using an assortment of asymmetrical modular architectural fragments.
- **Trial Structure:** 2 open-ended structural assembly trials.

## 4. Nuisance Demands & Sibling Differentiation
- **Nuisance Demands:** Spatial 2D layout. Differentiated from CR2 (constraint shift) and CR3 (novel tool affordances).

## 5. Control / Decoy Conditions
- **Controls:** Clear physical constraints (span width, load points) where first-try valid construction is fully credited.

## 6. Raw Events Logged
- `block_selected`
- `block_rotated`
- `block_placed`
- `test_load_applied`
- `structure_stabilized`

## 7. Extracted Behavioral Features
### Feature: `solution_uniqueness_index`
- **Formula:** dissimilarity(candidate_solution_graph, common_template_graph)
- **Units:** index (0-1)
- **Direction of Interpretation:** Higher index denotes novel yet functionally sound structural approach.
- **Construct Distinction (Why not click count):** Topological graph dissimilarity.

### Feature: `attempt_chain_progression`
- **Formula:** entropy_of_block_variety_across_attempts
- **Units:** bits
- **Direction of Interpretation:** Evaluates whether revisions explore new concepts rather than repetitive micro-nudges.
- **Construct Distinction (Why not click count):** Information entropy across attempt sequence.



## 8. Data Sufficiency (`min_observations`)
- **Minimum Observations for `USABLE` Status:** `1`
- **Expected Observations:** `2`

## 9. Time Ceiling (`ceiling_ms`) & Censoring
- **Ceiling:** `35000 ms`
- **Behavior on Ceiling:** Task gracefully concludes; logged with `stop_reason: "ceiling"`; observations are marked right-censored.

## 10. Validity Rules (`INVALID` Criteria)
- **Invalidation Condition:** Zero blocks placed or continuous random thrashing.

## 11. Accessibility Alternative & Feature Exclusion
- **Interaction Alternative:** Grid-based coordinate placement via keyboard cursor; structural validation audio/text cues.

## 12. Insufficient Evidence Manifestation
- **Insufficient Condition:** Less than 1 valid structure attempted. Result marked `INSUFFICIENT` (never `LOW`).

## 13. Proposed Elements
- **PROPOSED (needs owner approval):** All heuristic features and thresholds are uncalibrated (`null` thresholds in `config/feature_bands.json`) pending empirical normative volunteer data.
