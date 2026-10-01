# Mini-Game Design Sheet: CR3 — Unspecified Tool Use (The Printed Motif)
**World:** The Broken Tool (`W6`)  
**Target Parameter:** `creative_initiative`  
**Behavioral Facet:** `novel_tool_application`  
**Measurement Status:** `MISSING DESIGN DECISION — STOPPED`

---

## 1. Target Parameter & Behavioral Facet
- **Target Parameter:** `creative_initiative`
- **Behavioral Facet:** `novel_tool_application`
- **Authoritative Definition Reference:** Bound to `config/parameters.json` (`creative_initiative`).

## 2. Nearest Established Research Construct & Honest Match Note
- **Nearest Construct:** Alternative Uses, Non-Standard Tool Affordance, & Heuristic Problem Solving.
- **Honesty Match Note:** Selecting an improvised non-standard printing implement (e.g. edge of a wooden ruler, carved comb) to replicate a border motif when the primary stamp is cracked.
- **Claim Boundary:** Selecting an alternative implement on screen does not measure manual artisanal ingenuity.

## 3. Research Citation(s)
- Benedek, M., & Fink, A. (2019). *Toward a cognitive neuroscience of creative cognition...* Current Opinion in Behavioral Sciences, 27, 116–122.
- Zhang, W., et al. (2020). *Metacontrol of human creativity...* NeuroImage, 210, 116572.

## 4. Mechanistic Rationale
Creative initiative involves recognizing structural affordances in everyday objects when the dedicated tool fails, allowing work to proceed without halting the entire collective effort.

## 5. Exact Observable Behavior
- Selection and testing of alternative printing tools.
- Number of test impressions before finding a viable pattern.

## 6. Candidate Raw Telemetry Requirements
- `broken_tool_presented` (timestamp, primary_tool: "cracked stamp")
- `alternative_tested` (timestamp, tool_id, test_result)
- `motif_completed` (timestamp, final_tool_used)

## 7. Candidate Feature(s), Formula, and Direction
- **Feature 1:** `affordance_discovery_efficiency`
  - *Formula:* Ratio mapping of viable tool selection.
  - *Units:* Score (0.0 to 1.0)
  - *Direction:* Higher indicates quick recognition of geometric affordance in non-standard tools.

## 8. Important Construct Boundary
- **Creative Initiative $\neq$ Random Thrashing:** Trying tools indiscriminately without observing their edges is not creative; first-try recognition of the correct affordance is optimal and must not be penalized.

## 9. Nuisance Demands & Alternative Explanations
- **Visual Pattern Matching:** Matching geometric stamp teeth to border lines.

## 10. Required Control / Decoy Conditions
- Decoy implements with completely unsuitable shapes (e.g. rounded sponge for sharp geometric border).

## 11. Accessibility Implications
- Textual description of tool edges and physical shapes.

## 12. Expected Relationship with SJT
- **SJT $\leftrightarrow$ CR3 Convergence Hypothesis:** Low-to-moderate positive correlation.

## 13. Expected Relationship with Sibling Mini-Games (CR1, CR2)
- High conceptual alignment with CR1 (both test non-standard physical affordances).

## 14. What the Task Cannot Establish
- Cannot measure artistic drawing skill or fine craft mastery.

## 15. Pre-Implementation Validity Check & Decision
- **Opportunities:** 1 single tool choice in current client.
- **Status:** `MISSING DESIGN DECISION — STOPPED`.
- **Blocker:** Requires owner design decision specifying multi-tool testing sequence and feedback display.
