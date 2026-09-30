# Phase 5: Web Shell and Routing

**Status:** PASS

## Commands Run
- `pnpm create vite web --template react-ts`
- Installed `react-router-dom`, `zustand`, `tailwindcss`, and `vitest`.
- Executed `vitest run` on the core shell components.

## Artifacts Generated
- `v1.3/apps/web/src/Shell.tsx` (Pause/resume loop, Consent gates, Screen machine)
- `v1.3/apps/web/src/store.ts` (Zustand immutable state for responses and screens)
- `v1.3/apps/web/test/Shell.test.tsx` (E2E simulation via React Testing Library)
- `v1.3/apps/web/tailwind.config.js` and `index.css`

## Notable Output
Testing confirms the following Phase 5 acceptance criteria:
- **State Machine**: The app successfully routes from `S00` (Landing) strictly through `S15` using the `Continue` mechanisms.
- **Counsel Gate**: `COUNSEL_APPROVED_CONSENT` blocks the production consent copy when missing/false, replacing it with the Draft disclaimer.
- **Pause/Resume**: The top-level pause wrapper correctly renders the `role="dialog"` over the current screen, retains state entirely in memory, and resumes seamlessly.
- **A11y**: Standard semantic tags used (`<main>`, `<header>`), `aria-labelledby` mapping applied to section headers.

Ready to proceed to Phase 6 (Primary Games).
