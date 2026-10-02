# ALFAAZ RECRUIT — HUMAN PLAYTEST PACKAGE

**Document Version:** 1.0  
**Target Environment:** Local Dev / Staging / Production Soft-Launch  
**Target Audience:** QA Engineers, Playtesters, Psychometric Reviewers  

---

## 1. PLAYTEST OBJECTIVES

This package provides a standardized operational checklist for conducting end-to-end human playtesting of Alfaaz Recruit. Testers verify:
1. Candidate clarity, minimalism, and aesthetic consistency.
2. Responsiveness across desktop, tablet, and mobile form factors.
3. Proper behavioral mechanics across all 21 games in the locked 7-world sequence.
4. Clean telemetry generation without client-authored cheating or console exceptions.
5. Accurate recruiter dashboard reflection with descriptive task records and quarantine indicators.

---

## 2. PRE-FLIGHT ENVIRONMENT SETUP

### 2.1 Supported Browser Matrix
- [ ] Chrome / Chromium (Desktop & Mobile)
- [ ] Safari / WebKit (macOS & iOS)
- [ ] Firefox (Desktop)
- [ ] Microsoft Edge (Desktop)

### 2.2 Accessibility Options Verification
Before starting the assessment, test each accessibility toggle:
- [ ] **High Contrast Mode:** Verify text contrast ratios ($\ge 4.5:1$) on text and UI borders.
- [ ] **Dyslexia-Friendly Typography:** Verify font switch is clean without layout overflow.
- [ ] **Reduced Motion:** Verify smooth animations, wave visualizers, and transitions respect `prefers-reduced-motion`.

---

## 3. STAGE-BY-STAGE VERIFICATION CHECKLIST

### 3.1 Onboarding & Warmup Baseline
- [ ] **Consent Screen:** Verify 18+ age verification checkbox, voluntary participation disclosure, and privacy terms.
- [ ] **Candidate Identity:** Enter full name and email; verify rate limiting on repeated rapid submissions.
- [ ] **Warmup Phase:** Complete reading dwell test and tap latency tests. Verify baseline values are logged without console errors.

### 3.2 Situational Judgment Test (SJT)
- [ ] **Scenario Presentation:** Verify all 7 scenarios display their setup and 4 distinct options.
- [ ] **Option Selection:** Verify single-choice radio interaction and keyboard navigation.
- [ ] **Security:** Open DevTools Network tab; verify `/recruit/sjt/public` does NOT contain scoring keys or construct labels.
- [ ] **SJT Finalization:** Confirm transition to the behavioral world battery.

---

### 3.3 Behavioral Micro-Games (All 21 Games)

#### World 1: The Frequency (Construct: Empathy)
- [ ] **F1: Tuning the Hall (6 trials):**
  - Verify dialogue note appears for each trial.
  - Choose action (Accommodate, Maintain Objective, Clarify).
  - Drag the frequency slider. Verify smooth canvas rendering and that intermediate scrubbing is throttled to ~100ms.
  - Click Confirm Setting; verify 6 trials complete.
- [ ] **F2: The Gathering Voices (4 trials):**
  - Verify incomplete acoustic prompt is displayed.
  - Choose one of 3 operational strategies.
  - Confirm completion across 4 distinct trials.
- [ ] **F3: The Echo of the Room (3 condition transitions):**
  - Verify baseline prompt, adjust setting, observe sudden acoustic context shift, select adaptation.
  - Confirm completion across 3 transitions.

#### World 2: The Archive (Construct: Conscientiousness)
- [ ] **A1: Classification (5 documents):**
  - Verify document details and folder categories (Poetry, History, Philosophy, Critical Theory).
  - Sort 5 documents. Verify raw choice is logged without client dwell computation.
- [ ] **A2: Exception Handling (4 trials: 3 genuine exceptions + 1 clean control):**
  - Inspect ledger records with conflicting dates or missing seals.
  - Correctly flag exceptions and accept clean controls.
  - Verify completion across 4 trials.
- [ ] **A3: Quality Control (5 records):**
  - Review 5 manuscript transcription excerpts.
  - Toggle identified discrepancies.
  - Finalize verification after 5 records.

#### World 3: The Shared Canvas (Construct: Collaborative Spirit)
- [ ] **C1: Resource Cooperation (3 rounds):**
  - Round 1 (Deficit), Round 2 (Balanced), Round 3 (Self-Shortage).
  - Adjust pigment resource allocation between self and studio partner.
  - Confirm allocation across 3 rounds.
- [ ] **C2: Coordination (3 rounds):**
  - Coordinate tile placement with simulated partner on a shared grid.
  - Confirm placement across 3 rounds.
- [ ] **C3: Collaboration Repair (3 breakdowns):**
  - Identify palette misalignment / stylistic conflict with partner.
  - Select repair action and execute resolution across 3 breakdowns.

#### World 4: The Shifting Grid (Construct: Emotional Agility)
- [ ] **E1: Rule Shift (9 trials):**
  - Sort cards by color or shape. Observe shifting classification criteria.
  - Verify 9 trials complete cleanly.
- [ ] **E2: Setback Recovery (4 sequences: 3 disrupted + 1 undisrupted control):**
  - Build sequence. Observe external disruption/blockage and select recovery action.
  - Verify 4 sequences complete.
- [ ] **E3: Changing Conditions (3 condition shifts):**
  - Adapt composition under altered grid constraints across 3 conditions.

#### World 5: The Hidden Gallery (Construct: Curiosity)
- [ ] **Q1: Optional Discovery (4 decisions, 4 optional resources):**
  - Choose whether to view optional archival background materials (2 high-value, 2 low-value controls) before deciding.
  - Verify 4 decisions complete.
- [ ] **Q2: Mystery Exploration (4 artifacts):**
  - Inspect artifact clues (including low-control relic) under varying uncertainty levels before final conclusion.
  - Verify 4 artifacts complete.
- [ ] **Q3: Information Integration (3 decisions):**
  - Synthesize cross-referenced narrative fragments into an integrated decision.
  - Verify 3 decisions complete.

#### World 6: The Broken Tool (Construct: Creative Initiative)
- [ ] **CR1: Open Construction (2 stages):**
  - Construct an assembly using provided parts and test mechanical fit across 2 stages (3 valid solution paths each).
  - Verify 2 stages complete.
- [ ] **CR2: Constraint Shift (3 stages):**
  - Assemble under changing physical constraints across 3 stages.
- [ ] **CR3: Improvisation / Tool Breakage (3 repairs):**
  - Handle tool failure by selecting alternative methods/implements.
  - Verify 3 repairs complete.

#### World 7: The Repetition (Construct: Motivation)
- [ ] **M1: Mandatory Baseline (3 mandatory units, 0 optional):**
  - Execute 3 cataloging units with continuous feedback.
- [ ] **M2: Extended Continuation (3 mandatory + optional up to 3):**
  - Complete 3 baseline units. Notice explicit raw finish/continue choice prompt.
  - Test choosing to continue or conclude (capped at 3 optional units).
- [ ] **M3: Honest Continuation & Reduced Reward (3 mandatory + voluntary up to 3):**
  - Complete 3 baseline units.
  - **Honest Disclosure Check:** Verify UI explicitly informs candidate that the mandatory minimum is complete, they may stop, and feedback saliency may decrease as part of the normal task design (not an error state).
  - Verify candidate can stop on any voluntary unit or continue up to 3 voluntary units (capped at 6 total).

---

## 4. SESSION COMPLETION & TELEMETRY AUDIT

- [ ] **Final Screen:** Verify graceful completion message without score disclosure or percentile ranking.
- [ ] **Network Audit:** Confirm telemetry queue flushes successfully (HTTP 200) with 0 dropped batches.
- [ ] **Console Inspection:** Confirm 0 uncaught JavaScript errors or network 500s.

---

## 5. RECRUITER PORTAL VERIFICATION

1. Log in to `/recruit/admin` or recruiter evaluation view.
2. Search for the playtest `session_id`.
3. Verify:
   - [ ] 7 construct bands display correctly from SJT.
   - [ ] Exactly 2 active extractors (`A1`, `A2`) show calculated scores.
   - [ ] 19 extractors clearly show `QUARANTINED` status badge.
   - [ ] Descriptive task records show `RECORDED` status and formatted qualitative observations.
   - [ ] Data quality flags reflect playtest conditions accurately.
