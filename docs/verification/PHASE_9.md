# Phase 9: Accessibility and Edge Cases

**Status:** PASS

## Actions Taken
- Refactored `Shell.tsx` to handle the pause modal semantically correctly (`role="dialog"`, `aria-modal="true"`, and `aria-labelledby`).
- Bound the background content container to dynamically toggle `aria-hidden={paused ? "true" : "false"}`, ensuring screen readers do not read background material while the candidate is on pause.
- Instantiated a global `aria-live="polite"` DOM node (`#a11y-announcer`) inside the shell, ready for game engines to dispatch announcements.
- Attached `blur` and `focus` event listeners to the global `window` object to automatically dispatch `window_blur` and `window_focus` telemetry events when a candidate changes tabs.

## Notable Output
Vitest UI tests successfully validated the accessibility semantics via `@testing-library/react` and JSDOM:
1. Triggering the pause action correctly flips the background's `aria-hidden` attribute.
2. The pause modal itself confirms its identity to screen readers as a blocking dialog.
3. Firing simulated `window.Event('blur')` properly resolves into the `submitTelemetry` pipeline targeting the backend.

Ready to proceed to Phase 10 (Cutover & Rollback Runbook).
