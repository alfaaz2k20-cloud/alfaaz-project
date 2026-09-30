# Phase 7: Secondary Games (G5-G7)

**Status:** PASS

## Actions Taken
- Implemented `matter-js` in `apps/web` as the core physics dependency for G6 (The Broken Tool).
- Engineered extractors for G5 (The Hidden Gallery), G6 (The Broken Tool), and G7 (The Repetition), handling their precise index scaling logic.
- Implemented the critical "Neutral Rules" for G6 and G7 to ensure that standard behavior (solving on the first try, or stopping exactly at the stated requirement) does not result in a `LOW` score, but correctly outputs `INSUFFICIENT` with a neutral reason code.
- Mapped all `[0,1]` clamp logic for arrays like `useful_iteration`, `diversity`, `cadence_change`, and `depth`.
- Added the React component shells for S10-S12 into `GameComponents.tsx`.

## Notable Output
- Vitest Golden Bot verification (`bots_p7.test.ts`) passed perfectly:
  - **G5 (Curiosity)**: The bot who opens zero doors successfully yields 0 on F1 and dynamically assigns `null` to F2-F4, flagging `single_feature = true` for confidence caps.
  - **G6 (Creative Initiative)**: The "random clicker" bot scores 0 on `feedback_rate` and `useful_iteration`, pulling the overall index down to `LOW` as required by §14. The neutral rule (solved attempt 1) correctly overrides scoring to yield `INSUFFICIENT (NEUTRAL_OUTCOME)`.
  - **G7 (Motivation)**: Stopping at 10 flyers (`extra_units = 0`) perfectly skips F1-F3 and yields `INSUFFICIENT (NEUTRAL_STOP)`.

Ready to proceed to Phase 8 (Form and Output).
