/* ==========================================================================
   ALFAAZ RECRUIT — WORLD 7: THE REPETITION (تکرار)
   Mini-games: M1 (The Ceremonial Seal), M2 (The Courtesy Sleeves), M3 (The Evening Registry)
   Adheres to Design Freeze v1 + Addendum v1.1.
   Emits primitive behavioral telemetry only.
   Stopping at mandatory minimum is neutral; continuation is non-evaluative behavioral information.
   Remediated for plain English (<= 12 words per sentence), mobile-first layout,
   and scoped candidate content protection.
   ========================================================================== */

import { renderTutorialCard, bindTutorialCard } from './index.js';

export function runTheRepetition(context, renderHeader) {
  const { appContainer, miniGameIndex, logEvent, onMiniGameComplete } = context;

  switch (miniGameIndex) {
    case 0:
      runM1Minimum(appContainer, renderHeader, logEvent, onMiniGameComplete);
      break;
    case 1:
      runM2Optional(appContainer, renderHeader, logEvent, onMiniGameComplete);
      break;
    case 2:
      runM3ReducedReward(appContainer, renderHeader, logEvent, onMiniGameComplete);
      break;
  }
}

// --------------------------------------------------------------------------
// M1: Baseline Diligence (Exactly 3 mandatory units)
// Minimum is clearly stated. Completion of mandatory units satisfies the requirement.
// Completion alone is not "high motivation".
// --------------------------------------------------------------------------
function runM1Minimum(app, renderHeader, logEvent, onComplete) {
  let inTutorial = true;
  let currentIdx = 0;
  let lastInputModality = 'mouse';

  const units = [
    { stimulus_id: 'M1_U1', recipient: 'Master Ghulam — Calligraphy Diwan', note: 'Formal invitation envelope 1' },
    { stimulus_id: 'M1_U2', recipient: 'Valley Youth Literary Guild', note: 'Formal invitation envelope 2' },
    { stimulus_id: 'M1_U3', recipient: 'Regional Heritage Conservation Archive', note: 'Formal invitation envelope 3' }
  ];

  function render() {
    if (inTutorial) {
      app.innerHTML = `
        <div class="candidate-content-protected">
          <div class="flex items-center gap-2 mb-3">
            <span class="act-badge">World 7: The Repetition</span>
            <span class="text-xs text-[var(--text-secondary)] font-sans">Part 1 of 3</span>
          </div>
          ${renderTutorialCard({
            icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>`,
            goal: 'Press the wax seal on each of the 3 required invitation envelopes.',
            steps: [
              'Mandatory requirement: Exactly 3 invitations.',
              'Review the named recipient on each handcrafted envelope.',
              'Click the button to press the wax seal.',
              'Completing all 3 fulfills this activity requirement.'
            ]
          })}
        </div>
      `;
      bindTutorialCard(app, () => {
        inTutorial = false;
        currentIdx = 0;
        logUnitPresented();
        render();
      });
      return;
    }

    const u = units[currentIdx];

    app.innerHTML = `
      <div class="animate-soft-fade-in">
        <!-- TOP BAR -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3">
          <div class="flex items-center gap-2">
            <span class="act-badge">World 7: The Repetition</span>
            <span class="text-xs text-[var(--text-secondary)] font-sans">Part 1 of 3 &middot; Envelope ${currentIdx + 1} of ${units.length}</span>
          </div>
          <div class="text-[11px] text-[var(--accent-gold)] font-sans font-medium">Takes about 1 minute</div>
        </div>

        <!-- TASK HEADER -->
        <div class="mb-4">
          <h2 class="text-xl sm:text-2xl font-serif text-[var(--text-primary)]">The Ceremonial Seal</h2>
          <p class="text-xs text-[var(--text-secondary)] mt-0.5">Apply wax seals to event invitations.</p>
        </div>

        <!-- YOUR TASK -->
        <div class="p-3 sm:p-4 bg-amber-50/70 border border-[var(--accent-gold)]/40 rounded-xs mb-4 candidate-content-protected">
          <div class="text-[10px] uppercase tracking-wider font-sans text-[var(--accent-gold)] font-semibold mb-1">Your Task</div>
          <div class="text-xs text-[var(--text-primary)] leading-relaxed">
            Review the recipient below. Click Press Wax Seal. Completing all 3 fulfills this activity.
          </div>
        </div>

        <!-- LOOK AT THIS: Envelope Preview -->
        <div class="p-6 sm:p-8 bg-[#faf8f5] border border-[var(--grid-border)] mb-5 text-center shadow-xs rounded-xs candidate-content-protected">
          <div class="w-full max-w-sm mx-auto min-h-[140px] bg-amber-50/70 border border-[var(--grid-border)] flex flex-col items-center justify-center p-5 relative shadow-sm rounded-xs">
            <span class="text-[10px] uppercase tracking-widest text-[var(--text-secondary)] font-sans">Ceremonial Invitation</span>
            <div class="font-serif text-sm font-semibold text-[var(--text-primary)] mt-1.5">${u.recipient}</div>
            <div class="text-[11px] text-stone-500 mt-0.5">${u.note}</div>

            <div id="sealDisplay" class="w-12 h-12 rounded-full border-2 border-dashed border-[var(--accent-gold)] mt-3 flex items-center justify-center text-[10px] text-[var(--accent-gold)] font-bold shadow-xs">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"></path></svg>
            </div>
          </div>
        </div>

        <!-- PRIMARY ACTION BUTTON -->
        <div class="flex justify-end mb-4">
          <button type="button" id="stampBtn" class="px-8 py-3.5 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition shadow-sm flex items-center justify-center gap-2 rounded-xs w-full sm:w-auto min-h-[44px]">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
            Press Wax Seal &rarr;
          </button>
        </div>

        <!-- Progress Footer -->
        <div class="text-right text-[11px] text-[var(--text-secondary)] font-sans">
          Envelope ${currentIdx + 1} of ${units.length} (Required Minimum: 3)
        </div>
      </div>
    `;

    document.getElementById('stampBtn')?.addEventListener('click', () => {
      lastInputModality = 'mouse';
      logEvent('unit_action_performed', {
        stimulus_id: u.stimulus_id,
        unit_index: currentIdx,
        action_type: 'press_wax_seal',
        input_modality: lastInputModality,
        task_def_version: '1.0'
      });

      logEvent('unit_completed', {
        stimulus_id: u.stimulus_id,
        unit_index: currentIdx,
        task_def_version: '1.0'
      });

      if (currentIdx < units.length - 1) {
        currentIdx++;
        logUnitPresented();
        render();
      } else {
        onComplete({
          mini_game: 'M1',
          observations_count: units.length
        });
      }
    });
  }

  function logUnitPresented() {
    const u = units[currentIdx];
    logEvent('unit_presented', {
      stimulus_id: u.stimulus_id,
      unit_index: currentIdx,
      is_mandatory: true,
      task_def_version: '1.0'
    });
  }

  render();
}

// --------------------------------------------------------------------------
// M2: The Courtesy Sleeves (Optional Continuation)
// 3 mandatory units. Explicit finish-or-continue choice after minimum.
// Up to 3 optional units. Stopping at minimum is neutral.
// Continuation is behavioral information, not a motivation score.
// --------------------------------------------------------------------------
function runM2Optional(app, renderHeader, logEvent, onComplete) {
  let inTutorial = true;
  let phase = 'mandatory'; // 'mandatory' | 'choice' | 'optional'
  let mandatoryIdx = 0;
  let optionalIdx = 0;
  let lastInputModality = 'mouse';

  const mandatoryUnits = [
    { stimulus_id: 'M2_M1', label: 'Guest Folder 1: Artisan Guild', is_mandatory: true },
    { stimulus_id: 'M2_M2', label: 'Guest Folder 2: Regional Patrons', is_mandatory: true },
    { stimulus_id: 'M2_M3', label: 'Guest Folder 3: Visiting Artists', is_mandatory: true }
  ];

  const optionalUnits = [
    { stimulus_id: 'M2_O1', label: 'Extra Folder 1: Visiting Students', is_mandatory: false },
    { stimulus_id: 'M2_O2', label: 'Extra Folder 2: Community Observers', is_mandatory: false },
    { stimulus_id: 'M2_O3', label: 'Extra Folder 3: Studio Assistants', is_mandatory: false }
  ];

  function render() {
    if (inTutorial) {
      app.innerHTML = `
        <div class="candidate-content-protected">
          <div class="flex items-center gap-2 mb-3">
            <span class="act-badge">World 7: The Repetition</span>
            <span class="text-xs text-[var(--text-secondary)] font-sans">Part 2 of 3</span>
          </div>
          ${renderTutorialCard({
            icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>`,
            goal: 'Prepare 3 required folders. Then decide whether to finish or make extras.',
            steps: [
              'Complete the 3 required courtesy folders.',
              'After the third folder, you will be given a clear choice.',
              'You may conclude the activity now, or make extra folders.',
              'Stopping at the minimum is completely neutral.'
            ]
          })}
        </div>
      `;
      bindTutorialCard(app, () => {
        inTutorial = false;
        phase = 'mandatory';
        mandatoryIdx = 0;
        optionalIdx = 0;
        logUnitPresented(mandatoryUnits[0]);
        render();
      });
      return;
    }

    if (phase === 'mandatory') {
      const u = mandatoryUnits[mandatoryIdx];
      app.innerHTML = `
        <div class="animate-soft-fade-in">
          <!-- TOP BAR -->
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3">
            <div class="flex items-center gap-2">
              <span class="act-badge">World 7: The Repetition</span>
              <span class="text-xs text-[var(--text-secondary)] font-sans">Part 2 of 3 &middot; Folder ${mandatoryIdx + 1} of ${mandatoryUnits.length}</span>
            </div>
            <div class="text-[11px] text-amber-800 font-sans font-medium">Required Phase (${mandatoryIdx + 1}/3)</div>
          </div>

          <!-- TASK HEADER -->
          <div class="mb-4">
            <h2 class="text-xl sm:text-2xl font-serif text-[var(--text-primary)]">The Courtesy Sleeves</h2>
            <p class="text-xs text-[var(--text-secondary)] mt-0.5">Prepare courtesy sleeves for event attendees.</p>
          </div>

          <!-- YOUR TASK -->
          <div class="p-3 sm:p-4 bg-amber-50/70 border border-[var(--accent-gold)]/40 rounded-xs mb-4 candidate-content-protected">
            <div class="text-[10px] uppercase tracking-wider font-sans text-[var(--accent-gold)] font-semibold mb-1">Your Task</div>
            <div class="text-xs text-[var(--text-primary)] leading-relaxed">
              Assemble the required folder below. Three required folders are needed to satisfy this activity.
            </div>
          </div>

          <!-- LOOK AT THIS: Folder Card -->
          <div class="p-6 sm:p-8 bg-[#faf8f5] border border-[var(--grid-border)] mb-5 text-center shadow-xs rounded-xs candidate-content-protected">
            <div class="max-w-sm mx-auto p-4 bg-white border border-[var(--grid-border)] rounded-xs">
              <span class="text-[10px] uppercase tracking-wider text-stone-500 font-sans">Required Courtesy Folder</span>
              <div class="font-serif text-sm font-semibold text-[var(--text-primary)] mt-1">${u.label}</div>
            </div>
          </div>

          <!-- PRIMARY ACTION BUTTON -->
          <div class="flex justify-end mb-4">
            <button type="button" id="foldSleeveBtn" class="px-8 py-3.5 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition shadow-sm rounded-xs w-full sm:w-auto min-h-[44px]">
              Assemble Required Folder &rarr;
            </button>
          </div>

          <!-- Progress Footer -->
          <div class="text-right text-[11px] text-[var(--text-secondary)] font-sans">
            Required Folder ${mandatoryIdx + 1} of ${mandatoryUnits.length}
          </div>
        </div>
      `;

      document.getElementById('foldSleeveBtn')?.addEventListener('click', () => {
        lastInputModality = 'mouse';
        logEvent('unit_action_performed', {
          stimulus_id: u.stimulus_id,
          unit_index: mandatoryIdx,
          action_type: 'assemble_sleeve',
          input_modality: lastInputModality,
          task_def_version: '1.0'
        });

        logEvent('unit_completed', {
          stimulus_id: u.stimulus_id,
          unit_index: mandatoryIdx,
          is_mandatory: true,
          task_def_version: '1.0'
        });

        if (mandatoryIdx < mandatoryUnits.length - 1) {
          mandatoryIdx++;
          logUnitPresented(mandatoryUnits[mandatoryIdx]);
          render();
        } else {
          // Transition to explicit choice point
          phase = 'choice';
          logEvent('choice_presented', {
            trial_index: mandatoryUnits.length,
            mandatory_completed_count: mandatoryUnits.length,
            task_def_version: '1.0'
          });
          render();
        }
      });

    } else if (phase === 'choice') {
      app.innerHTML = `
        <div class="animate-soft-fade-in">
          <!-- TOP BAR -->
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3">
            <div class="flex items-center gap-2">
              <span class="act-badge">World 7: The Repetition</span>
              <span class="text-xs text-[var(--text-secondary)] font-sans">Part 2 of 3 &middot; Choice Point</span>
            </div>
            <div class="text-[11px] text-emerald-800 font-sans font-medium">Requirement Completed</div>
          </div>

          <!-- TASK HEADER -->
          <div class="mb-4">
            <h2 class="text-xl sm:text-2xl font-serif text-[var(--text-primary)]">The Courtesy Sleeves</h2>
            <p class="text-xs text-[var(--text-secondary)] mt-0.5">Required minimum completed.</p>
          </div>

          <!-- LOOK AT THIS: Choice Card -->
          <div class="p-6 bg-white border border-[var(--grid-border)] mb-5 shadow-xs rounded-xs text-center candidate-content-protected">
            <div class="w-10 h-10 mx-auto rounded-full bg-emerald-50 border border-emerald-300 flex items-center justify-center text-emerald-700 text-lg mb-2">
              &#10003;
            </div>
            <div class="text-sm font-serif font-semibold text-[var(--text-primary)] mb-1">Required Minimum Satisfied</div>
            <p class="text-xs text-[var(--text-secondary)] max-w-md mx-auto leading-relaxed mb-6">
              You have completed the required 3 courtesy folders. You may conclude this activity now, or make up to ${optionalUnits.length - optionalIdx} extra folders.
              <br><strong class="text-stone-700 mt-1 inline-block">Stopping at the minimum is completely neutral.</strong>
            </p>

            <div class="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button type="button" id="concludeBtn" class="px-6 py-3.5 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition shadow-sm rounded-xs w-full sm:w-auto min-h-[44px]">
                Conclude Activity Now &rarr;
              </button>
              ${optionalIdx < optionalUnits.length ? `
                <button type="button" id="continueOptionalBtn" class="px-6 py-3.5 bg-white border border-[var(--accent-gold)] text-[var(--accent-gold)] text-xs uppercase tracking-widest hover:bg-amber-50 transition shadow-xs rounded-xs w-full sm:w-auto min-h-[44px]">
                  + Prepare Extra Folder (${optionalIdx + 1}/${optionalUnits.length})
                </button>
              ` : ''}
            </div>
          </div>

          <!-- Progress Footer -->
          <div class="text-right text-[11px] text-[var(--text-secondary)] font-sans">
            Choice Point &middot; Stopping is neutral
          </div>
        </div>
      `;

      document.getElementById('concludeBtn')?.addEventListener('click', () => {
        lastInputModality = 'mouse';
        logEvent('continuation_choice_selected', {
          choice: 'conclude',
          optional_index: optionalIdx,
          input_modality: lastInputModality,
          task_def_version: '1.0'
        });

        onComplete({
          mini_game: 'M2',
          observations_count: mandatoryUnits.length + optionalIdx
        });
      });

      document.getElementById('continueOptionalBtn')?.addEventListener('click', () => {
        lastInputModality = 'mouse';
        logEvent('continuation_choice_selected', {
          choice: 'continue',
          optional_index: optionalIdx,
          input_modality: lastInputModality,
          task_def_version: '1.0'
        });

        phase = 'optional';
        logUnitPresented(optionalUnits[optionalIdx]);
        render();
      });

    } else if (phase === 'optional') {
      const u = optionalUnits[optionalIdx];
      app.innerHTML = `
        <div class="animate-soft-fade-in">
          <!-- TOP BAR -->
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3">
            <div class="flex items-center gap-2">
              <span class="act-badge">World 7: The Repetition</span>
              <span class="text-xs text-[var(--text-secondary)] font-sans">Part 2 of 3 &middot; Extra Folder ${optionalIdx + 1} of ${optionalUnits.length}</span>
            </div>
            <div class="text-[11px] text-emerald-800 font-sans font-medium">Voluntary Extra</div>
          </div>

          <!-- TASK HEADER -->
          <div class="mb-4">
            <h2 class="text-xl sm:text-2xl font-serif text-[var(--text-primary)]">The Courtesy Sleeves</h2>
            <p class="text-xs text-[var(--text-secondary)] mt-0.5">Voluntary extra folder preparation.</p>
          </div>

          <!-- YOUR TASK -->
          <div class="p-3 sm:p-4 bg-emerald-50/70 border border-emerald-400/40 rounded-xs mb-4 candidate-content-protected">
            <div class="text-[10px] uppercase tracking-wider font-sans text-emerald-800 font-semibold mb-1">Voluntary Extra</div>
            <div class="text-xs text-emerald-950 leading-relaxed">
              You may assemble this extra folder or finish at any time. Stopping is completely neutral.
            </div>
          </div>

          <!-- LOOK AT THIS: Folder Card -->
          <div class="p-6 sm:p-8 bg-[#faf8f5] border border-[var(--grid-border)] mb-5 text-center shadow-xs rounded-xs candidate-content-protected">
            <div class="max-w-sm mx-auto p-4 bg-white border border-[var(--grid-border)] rounded-xs">
              <span class="text-[10px] uppercase tracking-wider text-stone-500 font-sans">Voluntary Courtesy Folder</span>
              <div class="font-serif text-sm font-semibold text-[var(--text-primary)] mt-1">${u.label}</div>
            </div>
          </div>

          <!-- PRIMARY ACTION BUTTONS -->
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <button type="button" id="stopOptionalEarlyBtn" class="px-5 py-3 bg-stone-100 hover:bg-stone-200 border border-stone-300 text-stone-700 text-xs uppercase tracking-wider transition rounded-xs w-full sm:w-auto min-h-[44px]">
              Conclude Now
            </button>
            <button type="button" id="foldOptionalSleeveBtn" class="px-7 py-3.5 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition shadow-sm rounded-xs w-full sm:w-auto min-h-[44px]">
              Assemble Extra Folder &rarr;
            </button>
          </div>

          <!-- Progress Footer -->
          <div class="text-right text-[11px] text-[var(--text-secondary)] font-sans">
            Extra Folder ${optionalIdx + 1} of ${optionalUnits.length}
          </div>
        </div>
      `;

      document.getElementById('stopOptionalEarlyBtn')?.addEventListener('click', () => {
        lastInputModality = 'mouse';
        logEvent('continuation_choice_selected', {
          choice: 'conclude',
          optional_index: optionalIdx,
          input_modality: lastInputModality,
          task_def_version: '1.0'
        });

        onComplete({
          mini_game: 'M2',
          observations_count: mandatoryUnits.length + optionalIdx
        });
      });

      document.getElementById('foldOptionalSleeveBtn')?.addEventListener('click', () => {
        lastInputModality = 'mouse';
        logEvent('unit_action_performed', {
          stimulus_id: u.stimulus_id,
          unit_index: mandatoryUnits.length + optionalIdx,
          action_type: 'assemble_sleeve',
          input_modality: lastInputModality,
          task_def_version: '1.0'
        });

        logEvent('unit_completed', {
          stimulus_id: u.stimulus_id,
          unit_index: mandatoryUnits.length + optionalIdx,
          is_mandatory: false,
          task_def_version: '1.0'
        });

        optionalIdx++;
        if (optionalIdx < optionalUnits.length) {
          phase = 'choice';
          logEvent('choice_presented', {
            trial_index: mandatoryUnits.length + optionalIdx,
            mandatory_completed_count: mandatoryUnits.length,
            task_def_version: '1.0'
          });
          render();
        } else {
          onComplete({
            mini_game: 'M2',
            observations_count: mandatoryUnits.length + optionalIdx
          });
        }
      });
    }
  }

  function logUnitPresented(u) {
    logEvent('unit_presented', {
      stimulus_id: u.stimulus_id,
      unit_index: u.is_mandatory ? mandatoryIdx : mandatoryUnits.length + optionalIdx,
      is_mandatory: u.is_mandatory,
      task_def_version: '1.0'
    });
  }

  render();
}

// --------------------------------------------------------------------------
// M3: Persistence Under Reduced Feedback
// Honest repetitive task; feedback becomes less salient across trials.
// Explicit stop option available on EVERY unit once minimum is reached.
// No artificial submission experience or deception. Stopping at minimum is neutral.
// Maximum observed continuation is right-censored at 6 units (3 mandatory + 3 voluntary).
// --------------------------------------------------------------------------
function runM3ReducedReward(app, renderHeader, logEvent, onComplete) {
  let inTutorial = true;
  let currentIdx = 0;
  let lastInputModality = 'mouse';

  const allUnits = [
    { stimulus_id: 'M3_U1', is_mandatory: true, row_name: 'Gallery Row 1: Lighting & Illumination Alignment', feedback_type: 'salient' },
    { stimulus_id: 'M3_U2', is_mandatory: true, row_name: 'Gallery Row 2: Poetry Anthologies Welcome Stand', feedback_type: 'moderate' },
    { stimulus_id: 'M3_U3', is_mandatory: true, row_name: 'Gallery Row 3: Courtyard Entry Floral Registry', feedback_type: 'minimal' },
    { stimulus_id: 'M3_U4', is_mandatory: false, row_name: 'Gallery Row 4: Auxiliary Bench Linen Inspection', feedback_type: 'none' },
    { stimulus_id: 'M3_U5', is_mandatory: false, row_name: 'Gallery Row 5: Outer Colonnade Lantern Wick Inspection', feedback_type: 'none' },
    { stimulus_id: 'M3_U6', is_mandatory: false, row_name: 'Gallery Row 6: Perimeter Garden Urn Water Check', feedback_type: 'none' }
  ];

  const mandatoryCount = 3;

  function render() {
    if (inTutorial) {
      app.innerHTML = `
        <div class="candidate-content-protected">
          <div class="flex items-center gap-2 mb-3">
            <span class="act-badge">World 7: The Repetition</span>
            <span class="text-xs text-[var(--text-secondary)] font-sans">Part 3 of 3</span>
          </div>
          ${renderTutorialCard({
            icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path></svg>`,
            goal: 'Verify checklist rows for gallery preparation. A minimum of 3 rows is required.',
            steps: [
              'Mandatory requirement: Exactly 3 checklist rows.',
              'Completing 3 rows satisfies this activity.',
              'You may conclude at any time after row 3, or continue. Stopping is neutral.',
              'Feedback messages become shorter on later rows. This is normal and intentional.'
            ]
          })}
        </div>
      `;
      bindTutorialCard(app, () => {
        inTutorial = false;
        currentIdx = 0;
        logTrialPresented();
        render();
      });
      return;
    }

    const u = allUnits[currentIdx];
    const hasMetMinimum = currentIdx >= mandatoryCount;

    app.innerHTML = `
      <div class="animate-soft-fade-in">
        <!-- TOP BAR -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3">
          <div class="flex items-center gap-2">
            <span class="act-badge">World 7: The Repetition</span>
            <span class="text-xs text-[var(--text-secondary)] font-sans">Part 3 of 3 &middot; Row ${currentIdx + 1} of ${allUnits.length}</span>
          </div>
          <div class="text-[11px] ${hasMetMinimum ? 'text-emerald-800' : 'text-amber-800'} font-sans font-medium">
            ${hasMetMinimum ? 'Optional Continuation' : 'Required Minimum (3)'}
          </div>
        </div>

        <!-- TASK HEADER -->
        <div class="mb-4">
          <h2 class="text-xl sm:text-2xl font-serif text-[var(--text-primary)]">The Evening Registry</h2>
          <p class="text-xs text-[var(--text-secondary)] mt-0.5">
            ${hasMetMinimum ? 'Requirement met (3/3). You may conclude now or continue.' : 'Mandatory requirement: 3 rows. Completing 3 satisfies the activity.'}
          </p>
        </div>

        ${hasMetMinimum ? `
          <div class="p-3.5 bg-stone-50 border border-stone-200 rounded-xs text-xs text-stone-700 mb-4 space-y-1 candidate-content-protected">
            <div class="flex items-center justify-between">
              <span class="font-medium text-[var(--text-primary)]">Mandatory minimum completed (3 of 3 rows).</span>
              <span class="text-[10px] font-sans text-stone-500 uppercase font-semibold">Stopping is neutral</span>
            </div>
            <p class="text-[11px] text-stone-600 leading-relaxed">
              You may finish this activity now, or verify extra rows. Feedback details decrease on later rows; this is normal and intentional.
            </p>
          </div>
        ` : `
          <!-- YOUR TASK -->
          <div class="p-3 sm:p-4 bg-amber-50/70 border border-[var(--accent-gold)]/40 rounded-xs mb-4 candidate-content-protected">
            <div class="text-[10px] uppercase tracking-wider font-sans text-[var(--accent-gold)] font-semibold mb-1">Your Task</div>
            <div class="text-xs text-[var(--text-primary)] leading-relaxed">
              Review the checklist row below and click Verify Row. Completing 3 rows satisfies the activity.
            </div>
          </div>
        `}

        <!-- LOOK AT THIS: Registry Row Item -->
        <div class="p-6 sm:p-8 bg-[#faf8f5] border border-[var(--grid-border)] mb-5 text-center shadow-xs rounded-xs candidate-content-protected">
          <div class="max-w-md mx-auto p-4 bg-white border border-[var(--grid-border)] rounded-xs">
            <span class="text-[10px] uppercase tracking-wider text-stone-400 font-sans">Checklist Item</span>
            <div class="font-serif text-sm font-semibold text-[var(--text-primary)] mt-1">${u.row_name}</div>
          </div>
        </div>

        <!-- PRIMARY ACTION BUTTONS -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            ${hasMetMinimum ? `
              <button type="button" id="concludeM3Btn" class="px-6 py-3 bg-stone-100 hover:bg-stone-200 border border-stone-300 text-stone-800 text-xs uppercase tracking-wider transition rounded-xs w-full sm:w-auto min-h-[44px]">
                Conclude Activity &rarr;
              </button>
            ` : '<span></span>'}
          </div>
          <button type="button" id="verifyRowBtn" class="px-7 py-3.5 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition shadow-sm rounded-xs w-full sm:w-auto min-h-[44px]">
            Verify Row &rarr;
          </button>
        </div>

        <!-- Progress Footer -->
        <div class="text-right text-[11px] text-[var(--text-secondary)] font-sans">
          Row ${currentIdx + 1} of ${allUnits.length}
        </div>
      </div>
    `;

    document.getElementById('concludeM3Btn')?.addEventListener('click', () => {
      lastInputModality = 'mouse';
      logEvent('conclude_selected', {
        stimulus_id: u.stimulus_id,
        unit_index: currentIdx,
        total_units_completed: currentIdx,
        input_modality: lastInputModality,
        task_def_version: '1.0'
      });

      onComplete({
        mini_game: 'M3',
        observations_count: currentIdx
      });
    });

    document.getElementById('verifyRowBtn')?.addEventListener('click', () => {
      lastInputModality = 'mouse';
      logEvent('unit_action_performed', {
        stimulus_id: u.stimulus_id,
        unit_index: currentIdx,
        action_type: 'verify_registry_entry',
        input_modality: lastInputModality,
        task_def_version: '1.0'
      });

      logEvent('unit_completed', {
        stimulus_id: u.stimulus_id,
        unit_index: currentIdx,
        task_def_version: '1.0'
      });

      if (currentIdx < allUnits.length - 1) {
        currentIdx++;
        logTrialPresented();
        render();
      } else {
        // Reached right-censoring ceiling of 6 units
        onComplete({
          mini_game: 'M3',
          observations_count: allUnits.length
        });
      }
    });
  }

  function logTrialPresented() {
    const u = allUnits[currentIdx];
    logEvent('trial_presented', {
      stimulus_id: u.stimulus_id,
      unit_index: currentIdx,
      is_mandatory: u.is_mandatory,
      task_def_version: '1.0'
    });
  }

  render();
}
