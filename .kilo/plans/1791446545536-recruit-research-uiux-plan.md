# Recruit & Research UI/UX Improvement Plan

**Goal:** Make the candidate assessment flow clearer, calmer, and more resilient; make the admin research dossier faster to scan and less intimidating while preserving all safeguards and neutral language.

## Current State (Observed)

- **Recruit (candidate):** `frontend/recruit.html`, `frontend/src/recruit.js` (V2.1), `frontend/src/recruit_games/`, `frontend/src/recruit-utilities.css`. Has progress bar, pause/exit, `candidate-content-protected` (selective), print hides body. Uses `innerHTML` for dynamic content.
- **Research (admin):** `frontend/src/research.js`, `frontend/research.html`. Dossier includes overview, safeguards, "Evidence by parameter" table with sorting (SJT/Games/Delta), activity behavioral records, interpretation text. Uses `escapeHtml`, neutral labels, no overall score/ranking (matches tests). Tables scroll horizontally (`overflow-x-auto`).
- **Shared:** `frontend/global.js` (API base, `escapeHtml`, token in `localStorage`, pulse check), CSS variables.

## Recruit UX Findings

- **Onboarding clarity:** "Loading assessment environment..." is generic. No brief "what to expect" (duration ~11–14 min, 14 games + SJT, can pause) before starting.
- **Progress visibility:** `segmentProgress` exists but could be clearer (e.g., "Step X / Y • Section") and announce state changes for screen readers.
- **Errors/retries:** Network/API errors shown as plain text; no consistent retry CTA pattern; unclear resume guidance if token/session expires mid-flow.
- **Focus & a11y:** `.option-card:focus-visible` exists; need to ensure keyboard reachability, focus moved after screen transitions, and live regions for status updates.
- **Mobile:** Responsive padding/clamp used; game stages vary height. Some tap targets could be more consistently >= 44px.
- **State recovery:** Pause/exit exist; persisting in-progress step (scoped by `session_id`) would help accidental refreshes.
- **Copy tighten:** Exit flow could be clearer about whether progress is saved.

## Research UX Findings

- **Density:** Dossier is information-rich. Interpretation per row competes with numeric columns.
- **Scanability:** Sorting UI is good. Could benefit from a collapsed "Key takeaways" card (top divergences, lowest confidence, incomplete) and sticky header/first column.
- **Errors:** Detail errors sometimes show raw messages. Keep user-facing text generic; log details to console.
- **Clarity:** "Re-analyze Telemetry" is explicit; could use tooltip explaining it's explicit opt-in/expensive.
- **Neutrality:** Already preserved (matches tests). Keep as-is.

## Suggested Improvements

### Recruit (candidate)
1. **Loading state:** Replace generic text with skeleton + "Estimated time: 11–13 min. You can pause anytime." and spinner.
2. **Error panel:** Standardize (icon, short message, "Retry" primary, "Refresh page" secondary). Don't leak internals.
3. **Focus management:** After advancing steps, move focus to new heading/main region (`tabindex="-1"` + `focus()`).
4. **A11y live region:** Add `aria-live="polite"` for progress updates.
5. **Mobile polish:** Ensure option cards and buttons meet min 44px touch targets; avoid clipping on small screens.
6. **Route/state:** Persist current screen/step in `sessionStorage` keyed by `session_id` for refresh recovery.

### Research (admin)
1. **Key takeaways card:** Collapsible card above table (largest divergence, lowest confidence, incomplete).
2. **Table readability:** Sticky header and sticky first column; `scope="col"/scope="row"`; truncate long "Observed behavior" with tooltip.
3. **Error sanitization:** Show generic user-facing text; keep raw details in console (and preserve `escapeHtml`).
4. **Sort ARIA:** Add `aria-sort` on active column; ensure buttons have clear labels.
5. **Density toggle:** "Compact/Comfortable" for table rows (optional, low effort).
6. **Empty registry polish:** Add subtle guidance about when sessions appear.

### Shared/frontend
1. **Error boundary:** Normalize fetch errors in `globalApiFetch` to return `{ok,status,message}` with consistent UI.
2. **Loading component:** Reusable loading skeleton CSS/JS to avoid duplication.

## Prioritized Implementation Tasks

1. **Recruit loading + error states** (small, high impact)
2. **Recruit focus management + live region** (a11y)
3. **Research key takeaways + sticky table header/first column** (scanability)
4. **Research error sanitization** (safety + polish)
5. **Recruit mobile polish + min touch targets** (responsive)
6. **Recruit refresh recovery** (state persistence) (nice-to-have)

## Validation Plan

- **Manual QA:** Candidate flow on mobile/desktop (consent → identity → SJT → games → completion), pause/exit, refresh recovery, slow-network errors.
- **Admin QA:** Registry with multiple sessions; dossier complete/partial/incomplete; all sort modes; recompute path; empty/error states.
- **A11y:** Keyboard-only nav, focus order, live regions, contrast on badges/tags.
- **Regression:** Frontend tests (`test_gate5_r5_recruiter_view_and_anticopy.py`) must still pass (labels/neutrality, no prohibited anti-copy). Keep "Evidence by parameter" text intact.
- **No functional changes:** Preserve API contracts, neutral language, safeguard copy, prohibition on overall score/ranking.

## Open Questions

- Is refresh recovery (task 6) in scope now or later? Low effort, high UX value.
- Should admin token move to httpOnly cookie (separate backend change)? Worth considering (S5 from security audit) but not blocking UI polish.

**Saved plan path:** `C:\Users\saqrt\OneDrive\Desktop\alliswell\alfaaz-project\.kilo\plans\1791446545536-recruit-research-uiux-plan.md`
