# Phase 10: Cutover and Rollback Runbook

## Overview
This runbook dictates the exact procedure to swap out the legacy Alfaaz volunteer screening system with the newly built V1.3 system in production, alongside the contingency rollback plan.

**WARNING:** DO NOT EXECUTE THESE STEPS WITHOUT THE EXPLICIT "GO CUTOVER" COMMAND.

## 1. Prerequisites Check
- [ ] Ensure all V1.3 Tests (Unit, E2E, Bot Profiles, Accessibility) pass.
- [ ] Confirm `COUNSEL_APPROVED_CONSENT=true` is set in production environment variables.
- [ ] Ensure production PostgreSQL is initialized via `apps/api/init.sql`.
- [ ] Database credentials, salts, and AES keys (`ENCRYPTION_KEY`) are secured in production secrets manager.

## 2. Cutover Execution (The "Go" sequence)
1. **Freeze Legacy Pipeline:** Redirect the main Alfaaz recruitment landing page to a temporary "Maintenance" or "Application Update" holding page to prevent candidates from starting sessions during the swap.
2. **Deploy V1.3 Backend:** Spin up the Fastify API containers (`apps/api`) and point them to the new PostgreSQL schema.
3. **Deploy V1.3 Frontend:** Build the React application (`apps/web`) using `pnpm build` and deploy the output bundle to the frontend edge nodes.
4. **Validation (Sanity Check):** 
   - A developer creates a test session via the live frontend.
   - Completes SJT and 1 Game.
   - Successfully verifies data appears correctly mapped in the Recruiter Dashboard and successfully decrypts.
5. **Route Update:** Remove the maintenance holding page and redirect the `alfaaz.org/volunteer` route to the new V1.3 React frontend.
6. **Telemetry Watch:** Monitor `apps/api` logs for any 5xx errors across the first 12 hours of candidate traffic.

## 3. Rollback Procedure
If severe defects, missing config keys, or unapproved copy (`COUNSEL_REVIEW_REQUIRED`) leak into production, immediately execute the rollback sequence.

1. **Re-activate Holding Page:** Set the `alfaaz.org/volunteer` route back to maintenance mode.
2. **Re-route DNS:** Point the recruitment DNS record back to the legacy system servers.
3. **Data Quarantine:** Label any data collected under V1.3 as `uncalibrated_quarantine` and do NOT process it through standard recruiter systems until investigated.
4. **Post-Mortem:** Downgrade the release, document the failure in `docs/ASSUMPTIONS.md`, and resume legacy processing.
