# Mini-Game Design Sheet: CR3 — Unspecified Tool Use
**World:** The Broken Tool (`W6`)  
**Target Parameter:** `creative_initiative`  
**Behavioral Facet:** `functional_flexibility`  

---

## 1. Target Parameter & Behavioral Facet
- **Parameter Key:** `creative_initiative`
- **Facet:** `functional_flexibility`
- **Definition Reference:** Bound to authoritative definition in `config/parameters.json` for `creative_initiative`.

## 2. Nearest Researched Construct & Honest Match Note
- **Nearest Construct:** Overcoming Functional Fixedness
- **Honesty Note:** Evaluates repurposing an object with a conventional label for an unconventional utilitarian purpose.

## 3. Task Description & Trial Structure
- **Description:** Candidate is provided items with conventional labels (e.g. 'bookend', 'ruler', 'ribbon') and must solve a mechanical alignment challenge requiring non-standard affordances.
- **Trial Structure:** 3 distinct challenge stages.

## 4. Nuisance Demands & Sibling Differentiation
- **Nuisance Demands:** Object manipulation interface; sibling CR1 tests open build, CR2 tests resource breakage.

## 5. Control / Decoy Conditions
- **Controls:** One challenge where the conventional use of the tool is optimal (prevents over-complication bias).

## 6. Raw Events Logged
- `challenge_initiated`
- `tool_affordance_tested`
- `unconventional_use_applied`
- `objective_met`

## 7. Extracted Behavioral Features
### Feature: `functional_fixedness_overcome_rate`
- **Formula:** count(unconventional affordances successfully applied) / total_novel_challenges
- **Units:** ratio
- **Direction of Interpretation:** Capacity to perceive novel utilitarian utility in everyday items.
- **Construct Distinction (Why not click count):** Binary success on affordance transfer.



## 8. Data Sufficiency (`min_observations`)
- **Minimum Observations for `USABLE` Status:** `2`
- **Expected Observations:** `3`

## 9. Time Ceiling (`ceiling_ms`) & Censoring
- **Ceiling:** `30000 ms`
- **Behavior on Ceiling:** Task gracefully concludes; logged with `stop_reason: "ceiling"`; observations are marked right-censored.

## 10. Validity Rules (`INVALID` Criteria)
- **Invalidation Condition:** Zero tools tested.

## 11. Accessibility Alternative & Feature Exclusion
- **Interaction Alternative:** Keyboard selection of tool pairing and applied orientation.

## 12. Insufficient Evidence Manifestation
- **Insufficient Condition:** Less than 2 challenges attempted. Result marked `INSUFFICIENT` (never `LOW`).

## 13. Proposed Elements
- **PROPOSED (needs owner approval):** All heuristic features and thresholds are uncalibrated (`null` thresholds in `config/feature_bands.json`) pending empirical normative volunteer data.
