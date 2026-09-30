# Mini-Game Design Sheet: CR2 — Constraint Shift
**World:** The Broken Tool (`W6`)  
**Target Parameter:** `creative_initiative`  
**Behavioral Facet:** `ideational_flexibility`  

---

## 1. Target Parameter & Behavioral Facet
- **Parameter Key:** `creative_initiative`
- **Facet:** `ideational_flexibility`
- **Definition Reference:** Bound to authoritative definition in `config/parameters.json` for `creative_initiative`.

## 2. Nearest Researched Construct & Honest Match Note
- **Nearest Construct:** Creative Pivot under Sudden Resource Constraint
- **Honesty Note:** Examines strategic reorientation when standard building blocks become unavailable.

## 3. Task Description & Trial Structure
- **Description:** The primary connector element breaks/runs out mid-assembly. Candidate must pivot to utilize alternative structural elements (cantilevers, counterweights).
- **Trial Structure:** 2 trials with mid-task material depletion.

## 4. Nuisance Demands & Sibling Differentiation
- **Nuisance Demands:** Mechanical reasoning; avoids penalizing rapid successful pivot.

## 5. Control / Decoy Conditions
- **Controls:** Standard baseline trial before resource depletion occurs.

## 6. Raw Events Logged
- `primary_tool_depleted`
- `alternative_selected`
- `novel_mechanism_tested`
- `pivot_succeeded`

## 7. Extracted Behavioral Features
### Feature: `creative_pivot_latency_ms`
- **Formula:** t(first functional alternative attempt) - t(primary tool depletion)
- **Units:** ms
- **Direction of Interpretation:** Swift ideational pivot when conventional pathways close.
- **Construct Distinction (Why not click count):** Temporal pivot latency.



## 8. Data Sufficiency (`min_observations`)
- **Minimum Observations for `USABLE` Status:** `1`
- **Expected Observations:** `2`

## 9. Time Ceiling (`ceiling_ms`) & Censoring
- **Ceiling:** `35000 ms`
- **Behavior on Ceiling:** Task gracefully concludes; logged with `stop_reason: "ceiling"`; observations are marked right-censored.

## 10. Validity Rules (`INVALID` Criteria)
- **Invalidation Condition:** Abandoned upon tool breakage.

## 11. Accessibility Alternative & Feature Exclusion
- **Interaction Alternative:** Accessible inventory menu with explicit alternative descriptions.

## 12. Insufficient Evidence Manifestation
- **Insufficient Condition:** Skipped during tool depletion. Result marked `INSUFFICIENT` (never `LOW`).

## 13. Proposed Elements
- **PROPOSED (needs owner approval):** All heuristic features and thresholds are uncalibrated (`null` thresholds in `config/feature_bands.json`) pending empirical normative volunteer data.
