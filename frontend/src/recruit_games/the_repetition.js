/* ==========================================================================
   ALFAAZ RECRUIT — WORLD 7: THE REPETITION (تکرار)
   Mini-games: M1 (The Wax Seal), M2 (The Courtesy Sleeves), M3 (The Evening Threshold)
   Adheres to Design Freeze v1 + Addendum v1.1.
   Emits primitive behavioral telemetry only.
   Stopping at mandatory minimum is neutral; continuation is non-evaluative behavioral information.
   ========================================================================== */

import { renderTutorialCard } from './index.js';

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
    { stimulus_id: 'M1_U1', recipient: 'Master Ghulam — Classical Calligraphy Diwan', note: 'Formal invitation folio 1' },
    { stimulus_id: 'M1_U2', recipient: 'Valley Youth Literary Guild', note: 'Formal invitation folio 2' },
    { stimulus_id: 'M1_U3', recipient: 'Regional Heritage Conservation Archive', note: 'Formal invitation folio 3' }
  ];

  function render() {
    if (inTutorial) {
      app.innerHTML = `
        <div>
          ${renderHeader('Part 1: The Ceremonial Seal', 'Sealing formal event invitation folios for the exhibition gathering.')}
          ${renderTutorialCard({
            icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>`,
            goal: 'Apply the terracotta wax seal to each of the 3 required invitation folios.',
            steps: [
              'Mandatory requirement: Exactly 3 invitations.',
              'Review the named recipient on the handcrafted envelope.',
              'Press the wax seal stamp on each envelope.',
              'Completing all 3 fulfills the activity requirement.'
            ]
          })}
        </div>
      `;
      document.getElementById('startActivityBtn')?.addEventListener('click', () => {
        inTutorial = false;
        currentIdx = 0;
        logUnitPresented();
        render();
      });
      return;
    }

    const u = units[currentIdx];

    app.innerHTML = `
      <div class="animate-fadeIn">
        ${renderHeader('Part 1: The Ceremonial Seal', 'Mandatory requirement: 3 folios. Completing all 3 satisfies this activity.')}

        <div class="text-xs text-[var(--text-secondary)] font-medium mb-4 flex items-center justify-between">
          <div class="flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full bg-[var(--accent-gold)] inline-block"></span>
            <span>Folio ${currentIdx + 1} of ${units.length} (Required Minimum)</span>
          </div>
          <span class="text-[10px] font-mono uppercase tracking-wider text-stone-500">Requirement: 3 Mandatory Units</span>
        </div>

        <!-- Envelope Preview -->
        <div class="p-8 bg-[#faf8f5] border border-[var(--grid-border)] mb-6 text-center shadow-xs rounded-xs">
          <div class="w-full max-w-sm mx-auto h-40 bg-amber-50/70 border border-[var(--grid-border)] flex flex-col items-center justify-center p-4 relative shadow-sm rounded-xs">
            <span class="text-[10px] uppercase tracking-widest text-[var(--text-secondary)] font-mono">Ceremonial Invitation</span>
            <div class="font-serif text-sm font-semibold text-[var(--text-primary)] mt-1.5">${u.recipient}</div>
            <div class="text-[10px] text-stone-500 mt-0.5">${u.note}</div>
            
            <div id="sealDisplay" class="w-12 h-12 rounded-full border-2 border-dashed border-[var(--accent-gold)] mt-3 flex items-center justify-center text-[10px] text-[var(--accent-gold)] font-bold shadow-xs">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"></path></svg>
            </div>
          </div>
        </div>

        <div class="flex justify-center">
          <button type="button" id="stampBtn" class="px-8 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition shadow-sm flex items-center gap-2 rounded-xs">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
            Press Wax Seal &rarr;
          </button>
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
// M2: Voluntary Continuation
// 2 mandatory units. Explicit finish-or-continue choice after minimum.
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
    { stimulus_id: 'M2_M1', label: 'Primary Guest Folio — Artisan Guild', is_mandatory: true },
    { stimulus_id: 'M2_M2', label: 'Primary Guest Folio — Regional Patrons', is_mandatory: true }
  ];

  const optionalUnits = [
    { stimulus_id: 'M2_O1', label: 'Courtesy Sleeve 1 — Visiting Apprentices', is_mandatory: false },
    { stimulus_id: 'M2_O2', label: 'Courtesy Sleeve 2 — Community Archive Observers', is_mandatory: false },
    { stimulus_id: 'M2_O3', label: 'Courtesy Sleeve 3 — Auxiliary Studio Assistants', is_mandatory: false }
  ];

  function render() {
    if (inTutorial) {
      app.innerHTML = `
        <div>
          ${renderHeader('Part 2: The Courtesy Sleeves', 'Preparing required and optional courtesy sleeves for visiting artisans.')}
          ${renderTutorialCard({
            icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>`,
            goal: 'Prepare the 2 required sleeves, then decide whether to finish or prepare extra sleeves.',
            steps: [
              'Complete the 2 required courtesy sleeves.',
              'After completing the required sleeves, you will be given an explicit choice.',
              'You may conclude the activity immediately, or prepare up to 3 optional sleeves.',
              'Stopping at the minimum is completely neutral.'
            ]
          })}
        </div>
      `;
      document.getElementById('startActivityBtn')?.addEventListener('click', () => {
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
        <div class="animate-fadeIn">
          ${renderHeader('Part 2: The Courtesy Sleeves', 'Mandatory phase: 2 required sleeves. Required for activity completion.')}

          <div class="text-xs text-[var(--text-secondary)] font-medium mb-4 flex items-center justify-between">
            <div class="flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-[var(--accent-gold)] inline-block"></span>
              <span>Required Sleeve ${mandatoryIdx + 1} of 2</span>
            </div>
            <span class="text-[10px] font-mono uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 border border-amber-200 rounded-xs">Required Minimum</span>
          </div>

          <div class="p-8 bg-[#faf8f5] border border-[var(--grid-border)] mb-6 text-center shadow-xs rounded-xs">
            <div class="max-w-sm mx-auto p-4 bg-white border border-[var(--grid-border)] rounded-xs">
              <span class="text-[10px] uppercase tracking-wider text-stone-500 font-mono">Ceremonial Courtesy Sleeve</span>
              <div class="font-serif text-sm font-semibold text-[var(--text-primary)] mt-1">${u.label}</div>
            </div>
          </div>

          <div class="flex justify-center">
            <button type="button" id="foldSleeveBtn" class="px-8 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition shadow-sm rounded-xs">
              Assemble Required Sleeve &rarr;
            </button>
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
        <div class="animate-fadeIn">
          ${renderHeader('Part 2: The Courtesy Sleeves', 'Required minimum completed (2 of 2). You may conclude or prepare additional sleeves.')}

          <div class="p-6 bg-white border border-[var(--grid-border)] mb-6 shadow-xs rounded-xs text-center">
            <div class="w-10 h-10 mx-auto rounded-full bg-emerald-50 border border-emerald-300 flex items-center justify-center text-emerald-700 text-lg mb-2">
              &#10003;
            </div>
            <div class="text-sm font-serif font-semibold text-[var(--text-primary)] mb-1">Required Minimum Satisfied</div>
            <p class="text-xs text-[var(--text-secondary)] max-w-md mx-auto leading-relaxed mb-6">
              You have completed the required minimum of 2 courtesy sleeves. You may conclude this activity now and advance, or optionally prepare up to ${optionalUnits.length - optionalIdx} additional sleeves.
              <br><span class="italic text-stone-500 font-serif">Stopping at the minimum is completely neutral.</span>
            </p>

            <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button type="button" id="concludeBtn" class="px-6 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition shadow-sm rounded-xs w-full sm:w-auto">
                Conclude Activity Now &rarr;
              </button>
              ${optionalIdx < optionalUnits.length ? `
                <button type="button" id="continueOptionalBtn" class="px-6 py-3 bg-white border border-[var(--accent-gold)] text-[var(--accent-gold)] text-xs uppercase tracking-widest hover:bg-amber-50 transition shadow-xs rounded-xs w-full sm:w-auto">
                  + Prepare Extra Sleeve (${optionalIdx + 1}/${optionalUnits.length})
                </button>
              ` : ''}
            </div>
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
        <div class="animate-fadeIn">
          ${renderHeader('Part 2: The Courtesy Sleeves', 'Voluntary extra sleeve preparation. You may finish at any time.')}

          <div class="text-xs text-[var(--text-secondary)] font-medium mb-4 flex items-center justify-between">
            <div class="flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-emerald-600 inline-block"></span>
              <span>Voluntary Courtesy Sleeve ${optionalIdx + 1} of ${optionalUnits.length}</span>
            </div>
            <span class="text-[10px] font-mono uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 border border-emerald-200 rounded-xs">Voluntary</span>
          </div>

          <div class="p-8 bg-[#faf8f5] border border-[var(--grid-border)] mb-6 text-center shadow-xs rounded-xs">
            <div class="max-w-sm mx-auto p-4 bg-white border border-[var(--grid-border)] rounded-xs">
              <span class="text-[10px] uppercase tracking-wider text-stone-500 font-mono">Voluntary Courtesy Sleeve</span>
              <div class="font-serif text-sm font-semibold text-[var(--text-primary)] mt-1">${u.label}</div>
            </div>
          </div>

          <div class="flex justify-between items-center">
            <button type="button" id="stopOptionalEarlyBtn" class="px-5 py-2.5 bg-stone-100 hover:bg-stone-200 border border-stone-300 text-stone-700 text-xs uppercase tracking-wider transition rounded-xs">
              Conclude Now
            </button>
            <button type="button" id="foldOptionalSleeveBtn" class="px-7 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition shadow-sm rounded-xs">
              Assemble Voluntary Sleeve &rarr;
            </button>
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
        <div>
          ${renderHeader('Part 3: The Evening Registry', 'Verifying event readiness records under routine repetitive conditions.')}
          ${renderTutorialCard({
            icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path></svg>`,
            goal: 'Verify ledger rows for gallery preparation. A minimum of 3 rows is required.',
            steps: [
              'Mandatory minimum: Exactly 3 ledger rows.',
              'Once you complete 3 rows, you have satisfied the requirement.',
              'You may conclude the activity at any time after row 3, or continue. Stopping is neutral.',
              'Feedback saliency decreases during continuation; this is an intentional part of the activity, not an error or submission state.'
            ]
          })}
        </div>
      `;
      document.getElementById('startActivityBtn')?.addEventListener('click', () => {
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
      <div class="animate-fadeIn">
        ${renderHeader('Part 3: The Evening Registry', hasMetMinimum ? 'Requirement met (3/3). You may conclude the activity now or continue.' : 'Mandatory requirement: 3 rows. Completing 3 satisfies the activity.')}

        <div class="text-xs text-[var(--text-secondary)] font-medium mb-4 flex items-center justify-between">
          <div class="flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full ${hasMetMinimum ? 'bg-emerald-600' : 'bg-[var(--accent-gold)]'} inline-block"></span>
            <span>Ledger Row ${currentIdx + 1} of ${allUnits.length} ${hasMetMinimum ? '(Voluntary Continuation)' : '(Required Minimum)'}</span>
          </div>
          <span class="text-[10px] font-mono uppercase tracking-wider ${hasMetMinimum ? 'text-emerald-800 bg-emerald-50 border-emerald-200' : 'text-amber-800 bg-amber-50 border-amber-200'} px-2 py-0.5 border rounded-xs">
            ${hasMetMinimum ? 'Optional Beyond Minimum' : 'Required Minimum (3)'}
          </span>
        </div>

        ${hasMetMinimum ? `
          <div class="p-3 bg-stone-50 border border-stone-200 rounded-xs text-xs text-stone-700 mb-4 space-y-1">
            <div class="flex items-center justify-between">
              <span class="font-medium text-[var(--text-primary)]">Mandatory minimum completed (3 of 3 rows).</span>
              <span class="text-[10px] font-mono text-stone-500 uppercase font-semibold">Stopping is neutral</span>
            </div>
            <p class="text-[11px] text-stone-600 leading-relaxed">
              You may conclude the activity now, or voluntarily verify additional rows. Feedback saliency decreases during continuation; this gradual reduction is an intentional part of the activity design and does not indicate an error or submission state.
            </p>
          </div>
        ` : ''}

        <!-- Registry Row Item -->
        <div class="p-6 bg-[#faf8f5] border border-[var(--grid-border)] mb-6 shadow-xs rounded-xs">
          <div class="max-w-md mx-auto p-4 bg-white border border-[var(--grid-border)] rounded-xs">
            <span class="text-[10px] uppercase tracking-wider text-stone-400 font-mono">Registry Verification Item</span>
            <div class="font-serif text-sm font-semibold text-[var(--text-primary)] mt-1">${u.row_name}</div>
          </div>
        </div>

        <div class="flex justify-between items-center">
          <div>
            ${hasMetMinimum ? `
              <button type="button" id="concludeM3Btn" class="px-6 py-2.5 bg-stone-100 hover:bg-stone-200 border border-stone-300 text-stone-800 text-xs uppercase tracking-wider transition rounded-xs">
                Conclude Activity &rarr;
              </button>
            ` : '<span></span>'}
          </div>
          <button type="button" id="verifyRowBtn" class="px-7 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition shadow-sm rounded-xs">
            Verify Row &rarr;
          </button>
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
