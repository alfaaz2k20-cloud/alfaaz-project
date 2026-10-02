/* ==========================================================================
   ALFAAZ RECRUIT — WORLD 4: THE SHIFTING GRID (متغیر گرڈ)
   Mini-games: E1 (Rule Shift), E2 (Setback Recovery), E3 (Changing Conditions)
   Plain language remediation for human playtest pass 1.
   Sentences <= 12 words. Simple conversational English. Jargon removed.
   Preserves raw behavioral telemetry emissions and exact stimulus/action IDs.
   ========================================================================== */

import { renderTutorialCard } from './index.js';

export function runTheShiftingGrid(context, renderHeader) {
  const { appContainer, miniGameIndex, logEvent, onMiniGameComplete } = context;

  switch (miniGameIndex) {
    case 0:
      runE1RuleShift(appContainer, renderHeader, logEvent, onMiniGameComplete);
      break;
    case 1:
      runE2SetbackRecovery(appContainer, renderHeader, logEvent, onMiniGameComplete);
      break;
    case 2:
      runE3ChangingConditions(appContainer, renderHeader, logEvent, onMiniGameComplete);
      break;
  }
}

// --------------------------------------------------------------------------
// E1: Rule Shift (9 trials, unannounced rule shift)
// --------------------------------------------------------------------------
function runE1RuleShift(app, renderHeader, logEvent, onComplete) {
  let inTutorial = true;
  let currentIdx = 0;
  let trialStartTime = 0;
  let lastInputModality = 'mouse';

  const trials = [
    { stimulus_id: 'E1_T1', color: 'Gold', shape: 'Square', icon: '&#9632;', label: 'Gold Square' },
    { stimulus_id: 'E1_T2', color: 'Sage', shape: 'Circle', icon: '&#9679;', label: 'Sage Circle' },
    { stimulus_id: 'E1_T3', color: 'Gold', shape: 'Circle', icon: '&#9679;', label: 'Gold Circle' },
    { stimulus_id: 'E1_T4', color: 'Sage', shape: 'Square', icon: '&#9632;', label: 'Sage Square' },
    { stimulus_id: 'E1_T5', color: 'Gold', shape: 'Square', icon: '&#9632;', label: 'Gold Square' },
    { stimulus_id: 'E1_T6', color: 'Sage', shape: 'Circle', icon: '&#9679;', label: 'Sage Circle' },
    { stimulus_id: 'E1_T7', color: 'Gold', shape: 'Circle', icon: '&#9679;', label: 'Gold Circle' },
    { stimulus_id: 'E1_T8', color: 'Gold', shape: 'Square', icon: '&#9632;', label: 'Gold Square' },
    { stimulus_id: 'E1_T9', color: 'Sage', shape: 'Circle', icon: '&#9679;', label: 'Sage Circle' }
  ];

  function render() {
    if (inTutorial) {
      app.innerHTML = `
        <div class="candidate-content-protected max-w-2xl mx-auto">
          ${renderHeader('The Ceramic Mosaic', 'Sort each tile into the matching container.')}
          ${renderTutorialCard({
            icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>`,
            goal: 'Observe each ceramic tile and assign it to the matching container.',
            steps: [
              'Look at the shape and color of the tile.',
              'Pick Container 1 or Container 2.',
              'Sort all 9 tiles to complete the task.'
            ]
          })}
        </div>
      `;
      document.getElementById('startActivityBtn')?.addEventListener('click', () => {
        inTutorial = false;
        currentIdx = 0;
        trialStartTime = performance.now();
        logTrialPresented();
        render();
      });
      return;
    }

    const t = trials[currentIdx];

    app.innerHTML = `
      <div class="animate-fadeIn max-w-2xl mx-auto">
        <!-- TOP BAR -->
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3 pb-2 border-b border-[var(--grid-border)]">
          <div class="flex items-center gap-2">
            <span class="act-badge">World 4: The Shifting Grid</span>
            <span class="text-xs text-[var(--text-secondary)] font-sans">Part 1 of 3 &middot; Tile ${currentIdx + 1} of ${trials.length}</span>
          </div>
          <div class="text-[11px] text-[var(--accent-gold)] font-sans font-medium">Takes about 1 minute</div>
        </div>

        <!-- TASK HEADER -->
        <div class="mb-4">
          <h2 class="text-xl sm:text-2xl font-serif text-[var(--text-primary)]">The Ceramic Mosaic</h2>
          <p class="text-xs text-[var(--text-secondary)] mt-0.5">Sort each ceramic tile into the matching container.</p>
        </div>

        <!-- YOUR TASK -->
        <div class="p-3 sm:p-4 bg-amber-50/70 border border-[var(--accent-gold)]/40 rounded-xs mb-4 candidate-content-protected">
          <div class="text-[10px] uppercase tracking-wider font-sans text-[var(--accent-gold)] font-semibold mb-1">Your Task</div>
          <div class="text-xs text-[var(--text-primary)] leading-relaxed">
            Examine the tile below. Click Container 1 or 2 to file it.
          </div>
        </div>

        <!-- LOOK AT THIS -->
        <div class="p-6 bg-white border border-[var(--grid-border)] mb-4 text-center shadow-xs rounded-xs candidate-content-protected">
          <div class="text-5xl mb-2 ${t.color === 'Gold' ? 'text-[var(--accent-gold)]' : 'text-emerald-700'}">
            ${t.icon}
          </div>
          <div class="text-sm font-serif font-semibold text-[var(--text-primary)]">${t.label}</div>
          <div class="text-[11px] text-[var(--text-secondary)] mt-0.5 font-sans uppercase">${t.color} &bull; ${t.shape}</div>
        </div>

        <!-- INTERACTION AREA -->
        <div class="grid grid-cols-2 gap-4 mb-4 candidate-content-protected">
          <button type="button" class="bin-btn p-5 bg-white border border-[var(--grid-border)] hover:border-[var(--accent-gold)] hover:bg-amber-50/40 active:scale-98 transition text-center shadow-xs rounded-xs min-h-[80px]" data-choice="container_1" tabindex="0">
            <span class="text-2xl text-[var(--accent-gold)] block mb-1">&#9679;</span>
            <span class="text-xs font-semibold text-[var(--text-primary)] block">Container 1</span>
            <span class="text-[10px] text-[var(--text-secondary)] block mt-0.5 font-sans">Reference: Gold Circle</span>
          </button>
          <button type="button" class="bin-btn p-5 bg-white border border-[var(--grid-border)] hover:border-[var(--accent-gold)] hover:bg-amber-50/40 active:scale-98 transition text-center shadow-xs rounded-xs min-h-[80px]" data-choice="container_2" tabindex="0">
            <span class="text-2xl text-emerald-800 block mb-1">&#9632;</span>
            <span class="text-xs font-semibold text-[var(--text-primary)] block">Container 2</span>
            <span class="text-[10px] text-[var(--text-secondary)] block mt-0.5 font-sans">Reference: Sage Square</span>
          </button>
        </div>

        <!-- Progress Footer -->
        <div class="text-right text-[11px] text-[var(--text-secondary)] font-sans">
          Tile ${currentIdx + 1} of ${trials.length}
        </div>
      </div>
    `;

    app.querySelectorAll('.bin-btn').forEach(btn => {
      const handleSort = (modality) => {
        lastInputModality = modality;
        const choice = btn.getAttribute('data-choice');
        logEvent('tile_sorted', {
          trial_index: currentIdx,
          stimulus_id: t.stimulus_id,
          choice: choice,
          input_modality: lastInputModality,
          task_def_version: '1.0'
        });

        if (currentIdx < trials.length - 1) {
          currentIdx++;
          trialStartTime = performance.now();
          logTrialPresented();
          render();
        } else {
          onComplete({
            mini_game: 'E1',
            observations_count: 9
          });
        }
      };

      btn.addEventListener('click', () => handleSort('mouse'));
      btn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleSort('keyboard');
        }
      });
    });
  }

  function logTrialPresented() {
    const t = trials[currentIdx];
    logEvent('trial_presented', {
      trial_index: currentIdx,
      stimulus_id: t.stimulus_id,
      tile_color: t.color,
      tile_shape: t.shape,
      task_def_version: '1.0'
    });
  }

  render();
}

// --------------------------------------------------------------------------
// E2: Setback Recovery (4 sequences)
// --------------------------------------------------------------------------
function runE2SetbackRecovery(app, renderHeader, logEvent, onComplete) {
  let inTutorial = true;
  let currentSeq = 0;
  let selectedAction = null;
  let lastInputModality = 'mouse';

  const sequences = [
    {
      stimulus_id: 'E2_S1',
      title: 'Sequence 1: Ink Spill on Desk',
      situation: 'A small drop of ink spilled onto your active pattern card.',
      has_disruption: true,
      disruption_type: 'ink_spill_masking_workspace',
      options: [
        { id: 'clear_workspace', label: 'Dab ink with a cloth and straighten your card', note: 'Calm cleanup' },
        { id: 'rush_uncleaned', label: 'Keep placing tiles around the wet ink', note: 'Rushed step' },
        { id: 'pause_idle', label: 'Step away and wait for help', note: 'Long wait' }
      ]
    },
    {
      stimulus_id: 'E2_S2',
      title: 'Sequence 2: Calm Studio Work',
      situation: 'The workbench is clean, tidy, and well lit.',
      has_disruption: false,
      disruption_type: 'undisrupted_control',
      options: [
        { id: 'standard_sequence', label: 'Continue placing tiles according to plan', note: 'Steady step' },
        { id: 'unnecessary_rework', label: 'Take tiles apart to re-check for no reason', note: 'Unneeded check' },
        { id: 'pause_idle', label: 'Stop and wait before continuing', note: 'Unneeded pause' }
      ]
    },
    {
      stimulus_id: 'E2_S3',
      title: 'Sequence 3: Breeze Blows Paper',
      situation: 'A sudden breeze blew your reference drawing off the table.',
      has_disruption: true,
      disruption_type: 'draft_blows_reference_card',
      options: [
        { id: 'stabilize_reference', label: 'Pick up paper and weigh it down with a stone', note: 'Fix and secure' },
        { id: 'guess_motif', label: 'Place tiles from memory without looking at plan', note: 'Guessing' },
        { id: 'pause_idle', label: 'Wait for the wind to stop', note: 'Waiting' }
      ]
    },
    {
      stimulus_id: 'E2_S4',
      title: 'Sequence 4: Color Tray in the Way',
      situation: 'A color tray was nudged and blocks your tool holder.',
      has_disruption: true,
      disruption_type: 'misplaced_pigment_tray',
      options: [
        { id: 'reposition_tray', label: 'Slide the tray back to its own side', note: 'Move tray' },
        { id: 'use_wrong_shade', label: 'Work around the tray at an awkward angle', note: 'Awkward reach' },
        { id: 'pause_idle', label: 'Stop work until someone comes back', note: 'Waiting' }
      ]
    }
  ];

  function render() {
    if (inTutorial) {
      app.innerHTML = `
        <div class="candidate-content-protected max-w-2xl mx-auto">
          ${renderHeader('The Courtyard Setup', 'Respond constructively to workshop situations.')}
          ${renderTutorialCard({
            icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`,
            goal: 'Respond constructively to workshop situations and unexpected physical adjustments.',
            steps: [
              'Review the workshop event in each round.',
              'Evaluate the 3 response options.',
              'Choose your response across all 4 sequences.'
            ]
          })}
        </div>
      `;
      document.getElementById('startActivityBtn')?.addEventListener('click', () => {
        inTutorial = false;
        currentSeq = 0;
        selectedAction = null;
        logSequencePresented();
        render();
      });
      return;
    }

    const s = sequences[currentSeq];
    const activeOpt = s.options.find(o => o.id === selectedAction);

    app.innerHTML = `
      <div class="animate-fadeIn max-w-2xl mx-auto">
        <!-- TOP BAR -->
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3 pb-2 border-b border-[var(--grid-border)]">
          <div class="flex items-center gap-2">
            <span class="act-badge">World 4: The Shifting Grid</span>
            <span class="text-xs text-[var(--text-secondary)] font-sans">Part 2 of 3 &middot; Event ${currentSeq + 1} of ${sequences.length}</span>
          </div>
          <div class="text-[11px] text-[var(--accent-gold)] font-sans font-medium">Takes about 1 minute</div>
        </div>

        <!-- TASK HEADER -->
        <div class="mb-4">
          <h2 class="text-xl sm:text-2xl font-serif text-[var(--text-primary)]">The Courtyard Setup</h2>
          <p class="text-xs text-[var(--text-secondary)] mt-0.5">Choose the best response when unexpected studio events happen.</p>
        </div>

        <!-- YOUR TASK -->
        <div class="p-3 sm:p-4 bg-amber-50/70 border border-[var(--accent-gold)]/40 rounded-xs mb-4 candidate-content-protected">
          <div class="text-[10px] uppercase tracking-wider font-sans text-[var(--accent-gold)] font-semibold mb-1">Your Task</div>
          <div class="text-xs text-[var(--text-primary)] leading-relaxed">
            Read the situation below. Pick the most practical next step.
          </div>
        </div>

        <!-- LOOK AT THIS -->
        <div class="p-3.5 bg-white border border-[var(--grid-border)] rounded-xs mb-4 shadow-xs candidate-content-protected flex items-center justify-between">
          <span class="text-xs font-serif text-[var(--text-primary)]">
            <strong>${s.title}:</strong> ${s.situation}
          </span>
          <span class="text-[10px] uppercase tracking-wider text-[var(--accent-gold)] font-medium">Scenario ${currentTrial + 1} of 4</span>
        </div>

        <!-- INTERACTION AREA -->
        <div class="p-5 bg-[#faf8f5] border border-[var(--grid-border)] mb-4 rounded-xs shadow-xs candidate-content-protected">
          <div class="text-[10px] text-[var(--text-secondary)] font-sans uppercase tracking-wider mb-2.5">Available Responses:</div>
          <div class="space-y-2.5">
            ${s.options.map(opt => `
              <div class="e2-opt p-3.5 bg-white border ${selectedAction === opt.id ? 'border-[var(--accent-gold)] bg-amber-50/70 shadow-xs' : 'border-[var(--grid-border)]'} rounded-xs cursor-pointer hover:border-[var(--accent-gold)] transition text-xs flex items-center justify-between min-h-[48px]" data-action="${opt.id}" tabindex="0" role="button">
                <span class="flex items-center gap-2">
                  <span class="w-3.5 h-3.5 rounded-full border border-current flex items-center justify-center text-[9px] ${selectedAction === opt.id ? 'bg-[var(--accent-gold)] text-white' : 'text-stone-300'}">${selectedAction === opt.id ? '✓' : ''}</span>
                  <span class="text-[var(--text-primary)] font-medium">${opt.label}</span>
                </span>
                <span class="text-[10px] text-[var(--text-secondary)] uppercase font-medium">${opt.note}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- YOUR CHOICE -->
        <div class="p-3 bg-white border border-[var(--grid-border)] rounded-xs mb-4 text-xs font-sans text-[var(--text-secondary)] flex justify-between items-center">
          <span>${selectedAction ? `You selected: <strong class="text-[var(--text-primary)]">${activeOpt?.label}</strong>` : 'Select an option above to continue.'}</span>
          <span class="text-[10px] text-stone-400 font-sans">${currentSeq + 1} / ${sequences.length}</span>
        </div>

        <!-- PRIMARY ACTION BUTTON -->
        <div class="flex justify-end">
          <button type="button" id="confirmE2Btn" ${selectedAction ? '' : 'disabled'} class="w-full sm:w-auto px-7 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] disabled:opacity-40 transition shadow-sm rounded-xs min-h-[44px]">
            ${currentSeq < sequences.length - 1 ? 'Confirm Choice &rarr;' : 'Finish Setup Sequences &rarr;'}
          </button>
        </div>
      </div>
    `;

    app.querySelectorAll('.e2-opt').forEach(opt => {
      const chooseAction = (modality) => {
        lastInputModality = modality;
        selectedAction = opt.getAttribute('data-action');
        logEvent('action_selected', {
          trial_index: currentSeq,
          stimulus_id: s.stimulus_id,
          action_id: selectedAction,
          input_modality: lastInputModality,
          task_def_version: '1.0'
        });
        render();
      };

      opt.addEventListener('click', () => chooseAction('mouse'));
      opt.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          chooseAction('keyboard');
        }
      });
    });

    document.getElementById('confirmE2Btn')?.addEventListener('click', () => {
      logEvent('sequence_completed', {
        trial_index: currentSeq,
        stimulus_id: s.stimulus_id,
        chosen_action: selectedAction,
        input_modality: lastInputModality,
        task_def_version: '1.0'
      });

      if (currentSeq < sequences.length - 1) {
        currentSeq++;
        selectedAction = null;
        logSequencePresented();
        render();
      } else {
        onComplete({
          mini_game: 'E2',
          observations_count: 4
        });
      }
    });
  }

  function logSequencePresented() {
    const s = sequences[currentSeq];
    logEvent('sequence_presented', {
      trial_index: currentSeq,
      stimulus_id: s.stimulus_id,
      has_disruption: s.has_disruption,
      disruption_type: s.disruption_type,
      task_def_version: '1.0'
    });
  }

  render();
}

// --------------------------------------------------------------------------
// E3: Changing Conditions (3 condition transitions)
// --------------------------------------------------------------------------
function runE3ChangingConditions(app, renderHeader, logEvent, onComplete) {
  let inTutorial = true;
  let currentCondition = 0;
  let selectedLayout = null;
  let lastInputModality = 'mouse';

  const conditions = [
    {
      stimulus_id: 'E3_C1',
      title: 'Condition 1: Three Colors Available',
      constraint_state: 'standard_three_color_palette',
      description: 'Gold, sage, and terracotta colors are all on the table.',
      options: [
        { id: 'standard_layout', label: 'Three-Color Pattern (Balanced three-color arrangement)' },
        { id: 'tonal_adaptation', label: 'Single Color Shades (One shade only)' },
        { id: 'compact_adaptation', label: 'Half-Grid Squeeze' }
      ]
    },
    {
      stimulus_id: 'E3_C2',
      title: 'Condition 2: Only Indigo Blue Available',
      constraint_state: 'monochrome_indigo_only',
      description: 'Only one blue color is available on the table.',
      options: [
        { id: 'tonal_adaptation', label: 'Light and Dark Shading (Create depth using light and dark tones)' },
        { id: 'standard_layout', label: 'Try Three Colors (Cannot be done with one color)' },
        { id: 'compact_adaptation', label: 'Small Stamp Layout' }
      ]
    },
    {
      stimulus_id: 'E3_C3',
      title: 'Condition 3: Half-Size Wall Space',
      constraint_state: 'boundary_constricted_half_grid',
      description: 'The wall space is cut in half. The artwork must fit smaller dimensions.',
      options: [
        { id: 'compact_adaptation', label: 'Compact Small Design (Scale down pattern to fit half wall)' },
        { id: 'standard_layout', label: 'Full Size Layout (Too wide for the small wall)' },
        { id: 'tonal_adaptation', label: 'Unscaled Shading Layout' }
      ]
    }
  ];

  function render() {
    if (inTutorial) {
      app.innerHTML = `
        <div class="candidate-content-protected max-w-2xl mx-auto">
          ${renderHeader('The Shifting Medium', 'Adapt design layout when studio materials change.')}
          ${renderTutorialCard({
            icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"></path></svg>`,
            goal: 'Adapt your mosaic design strategy to match shifting studio constraints.',
            steps: [
              'Examine the active studio condition in each round.',
              'Choose the layout option that matches the condition.',
              'Confirm your choice across all 3 rounds.'
            ]
          })}
        </div>
      `;
      document.getElementById('startActivityBtn')?.addEventListener('click', () => {
        inTutorial = false;
        currentCondition = 0;
        selectedLayout = null;
        logConditionPresented();
        render();
      });
      return;
    }

    const c = conditions[currentCondition];
    const activeLayout = c.options.find(o => o.id === selectedLayout);

    app.innerHTML = `
      <div class="animate-fadeIn max-w-2xl mx-auto">
        <!-- TOP BAR -->
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3 pb-2 border-b border-[var(--grid-border)]">
          <div class="flex items-center gap-2">
            <span class="act-badge">World 4: The Shifting Grid</span>
            <span class="text-xs text-[var(--text-secondary)] font-sans">Part 3 of 3 &middot; Condition ${currentCondition + 1} of ${conditions.length}</span>
          </div>
          <div class="text-[11px] text-[var(--accent-gold)] font-sans font-medium">Takes about 1 minute</div>
        </div>

        <!-- TASK HEADER -->
        <div class="mb-4">
          <h2 class="text-xl sm:text-2xl font-serif text-[var(--text-primary)]">The Shifting Medium</h2>
          <p class="text-xs text-[var(--text-secondary)] mt-0.5">Adapt design layout to active studio conditions.</p>
        </div>

        <!-- YOUR TASK -->
        <div class="p-3 sm:p-4 bg-amber-50/70 border border-[var(--accent-gold)]/40 rounded-xs mb-4 candidate-content-protected">
          <div class="text-[10px] uppercase tracking-wider font-sans text-[var(--accent-gold)] font-semibold mb-1">Your Task</div>
          <div class="text-xs text-[var(--text-primary)] leading-relaxed">
            Read the active condition below. Pick the layout that fits best.
          </div>
        </div>

        <!-- LOOK AT THIS -->
        <div class="p-3.5 bg-white border border-[var(--grid-border)] rounded-xs mb-4 shadow-xs candidate-content-protected flex items-center justify-between">
          <span class="text-xs font-serif text-[var(--text-primary)]">
            <strong>${c.title}:</strong> ${c.description}
          </span>
          <span class="text-[10px] uppercase tracking-wider text-[var(--accent-gold)] font-medium">Layout ${currentCondition + 1} of ${conditions.length}</span>
        </div>

        <!-- INTERACTION AREA -->
        <div class="p-5 bg-[#faf8f5] border border-[var(--grid-border)] mb-4 rounded-xs shadow-xs candidate-content-protected">
          <div class="text-[10px] text-[var(--text-secondary)] font-sans uppercase tracking-wider mb-2.5">Layout Options:</div>
          <div class="space-y-2.5">
            ${c.options.map(opt => `
              <div class="e3-opt p-3.5 bg-white border ${selectedLayout === opt.id ? 'border-[var(--accent-gold)] bg-amber-50/70 shadow-xs' : 'border-[var(--grid-border)]'} rounded-xs cursor-pointer hover:border-[var(--accent-gold)] transition text-xs flex items-center justify-between min-h-[48px]" data-layout="${opt.id}" tabindex="0" role="button">
                <span class="flex items-center gap-2">
                  <span class="w-3.5 h-3.5 rounded-full border border-current flex items-center justify-center text-[9px] ${selectedLayout === opt.id ? 'bg-[var(--accent-gold)] text-white' : 'text-stone-300'}">${selectedLayout === opt.id ? '✓' : ''}</span>
                  <span class="text-[var(--text-primary)] font-medium">${opt.label}</span>
                </span>
                <span class="text-[10px] text-[var(--accent-gold)] uppercase font-medium">Option ${opt.id.replace('LAYOUT_', '')}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- YOUR CHOICE -->
        <div class="p-3 bg-white border border-[var(--grid-border)] rounded-xs mb-4 text-xs font-sans text-[var(--text-secondary)] flex justify-between items-center">
          <span>${selectedLayout ? `You selected: <strong class="text-[var(--text-primary)]">${activeLayout?.label}</strong>` : 'Select a layout above to continue.'}</span>
          <span class="text-[10px] text-stone-400 font-sans">${currentCondition + 1} / ${conditions.length}</span>
        </div>

        <!-- PRIMARY ACTION BUTTON -->
        <div class="flex justify-end">
          <button type="button" id="confirmE3Btn" ${selectedLayout ? '' : 'disabled'} class="w-full sm:w-auto px-7 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] disabled:opacity-40 transition shadow-sm rounded-xs min-h-[44px]">
            ${currentCondition < conditions.length - 1 ? 'Confirm Layout &rarr;' : 'Finish World 4 &rarr;'}
          </button>
        </div>
      </div>
    `;

    app.querySelectorAll('.e3-opt').forEach(opt => {
      const chooseLayout = (modality) => {
        lastInputModality = modality;
        selectedLayout = opt.getAttribute('data-layout');
        logEvent('composition_action_attempted', {
          trial_index: currentCondition,
          stimulus_id: c.stimulus_id,
          action_id: selectedLayout,
          input_modality: lastInputModality,
          task_def_version: '1.0'
        });
        render();
      };

      opt.addEventListener('click', () => chooseLayout('mouse'));
      opt.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          chooseLayout('keyboard');
        }
      });
    });

    document.getElementById('confirmE3Btn')?.addEventListener('click', () => {
      logEvent('composition_confirmed', {
        trial_index: currentCondition,
        stimulus_id: c.stimulus_id,
        chosen_action: selectedLayout,
        input_modality: lastInputModality,
        task_def_version: '1.0'
      });

      if (currentCondition < conditions.length - 1) {
        currentCondition++;
        selectedLayout = null;
        logConditionPresented();
        render();
      } else {
        onComplete({
          mini_game: 'E3',
          observations_count: 3
        });
      }
    });
  }

  function logConditionPresented() {
    const c = conditions[currentCondition];
    logEvent('condition_presented', {
      trial_index: currentCondition,
      stimulus_id: c.stimulus_id,
      constraint_state: c.constraint_state,
      task_def_version: '1.0'
    });
  }

  render();
}
