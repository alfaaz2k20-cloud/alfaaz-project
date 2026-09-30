# Phase 6: Primary Games and Feature Extractors (G1-G4)

**Status:** PASS

## Actions Taken
- Extracted exact specifications for G1 (The Frequency), G2 (The Archive), G3 (The Shared Canvas), and G4 (The Shifting Grid).
- Implemented pure Typescript extractors (`extractG1` through `extractG4`) that map raw event outcomes into their precise Index functions and `game_evidence` levels.
- Implemented React playable component shells (`GameComponents.tsx`) that plug into the Phase 5 Router.
- Built Golden Bot Profiles (`bots.test.ts`) using `vitest` to verify the scripted psychometric bounds required in §8 and §14.

## Notable Output
Testing confirms the following Phase 6 acceptance criteria:
- **G1 (Empathy)**: The "always maximize" bot properly scores LOW. The "always accommodate" bot handles ambiguous cues and permission drops effectively but scores predictably (ensuring blind accommodation is not the only path to HIGH).
- **G2 (Conscientiousness)**: The "random sorter who checks rules constantly" scores LOW (verifying that clicking the guide without accurate application does not artificially inflate the score, as checking is descriptive/unscored).
- **G3 (Collaborative Spirit)**: S3 control calculation verified. Sharing independent of need correctly penalizes the overall F1 score to 50% max.
- **G4 (Emotional Agility)**: Baseline accuracy correctly flags `INSUFFICIENT: TASK_NOT_LEARNED` if <0.75. Recovery and perseveration equations correctly clamp into bounded [0,1] features.

Ready to proceed to Phase 7 (Secondary Games).
