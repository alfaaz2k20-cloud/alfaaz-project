/* ==========================================================================
   ALFAAZ RECRUIT — WORLD 4: THE SHIFTING GRID (متغیر گرڈ)
   Mini-games: E1 (Rule Shift), E2 (Setback Recovery), E3 (Changing Conditions)
   Adheres to Design Freeze v1 + Addendum v1.1.
   Emits raw behavioral telemetry only (no client-authored scores or correctness).
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
// E1: Rule Shift (9 trials, unannounced rule shift at trial index 3/4)
// Ground truth rules: trials 0-2 (Color), trials 3-8 (Shape)
// Static reference exemplars only. No Active Rule banner or dynamic relabeling.
// --------------------------------------------------------------------------
function runE1RuleShift(app, renderHeader, logEvent, onComplete) {
  let inTutorial = true;
  let currentIdx = 0;
  let trialStartTime = 0;
  let lastInputModality = 'mouse';

  // 9 trials matching task_definitions.json
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
        <div>
          ${renderHeader('Part 1: The Ceramic Mosaic', 'Sorting geometric tiles into exhibition bins across 9 successive sorting opportunities.')}
          ${renderTutorialCard({
            icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>`,
            goal: 'Observe each ceramic tile and assign it to the matching container.',
            steps: [
              'Examine the stimulus tile presented on the central easel.',
              'Choose Container 1 or Container 2 based on pattern correspondence.',
              'Sort all 9 tiles to complete the series.'
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
      <div class="animate-fadeIn">
        <div class="flex justify-between items-center mb-2">
          ${renderHeader('Part 1: The Ceramic Mosaic', 'Sort each mosaic tile into the appropriate exhibition container.')}
          <span class="text-xs uppercase tracking-wider text-[var(--accent-gold)] font-mono font-medium">Tile ${currentIdx + 1} of ${trials.length}</span>
        </div>

        <div class="p-3 bg-stone-100 border border-[var(--grid-border)] rounded-sm mb-4 text-xs font-serif text-[var(--text-primary)] flex items-center justify-between">
          <span class="flex items-center gap-2">
            <span class="w-1.5 h-1.5 rounded-full bg-[var(--accent-gold)] inline-block"></span>
            <strong>Mosaic Stage:</strong> Determine the matching container for the presented tile.
          </span>
          <span class="text-[10px] uppercase font-mono tracking-wider text-[var(--text-secondary)]">${t.stimulus_id}</span>
        </div>

        <!-- Stimulus Presentation Area -->
        <div class="p-8 bg-[#faf8f5] border border-[var(--grid-border)] mb-6 text-center shadow-xs rounded-xs">
          <div class="text-5xl mb-2.5 transition-transform hover:scale-105 ${t.color === 'Gold' ? 'text-[var(--accent-gold)]' : 'text-emerald-700'}">
            ${t.icon}
          </div>
          <div class="text-sm font-serif font-semibold text-[var(--text-primary)]">${t.label}</div>
          <div class="text-[11px] text-[var(--text-secondary)] mt-1 font-mono uppercase">${t.color} &bull; ${t.shape}</div>
        </div>

        <!-- Static Reference Containers (No Dynamic Relabeling) -->
        <div class="grid grid-cols-2 gap-4">
          <button type="button" class="bin-btn p-5 bg-white border border-[var(--grid-border)] hover:border-[var(--accent-gold)] hover:bg-amber-50/40 active:scale-98 transition text-center shadow-xs rounded-xs" data-choice="container_1" tabindex="0">
            <span class="text-2xl text-[var(--accent-gold)] block mb-1">&#9679;</span>
            <span class="text-xs font-semibold text-[var(--text-primary)] block">Container 1</span>
            <span class="text-[10px] text-[var(--text-secondary)] block mt-0.5 font-mono">Reference: Gold Circle</span>
          </button>
          <button type="button" class="bin-btn p-5 bg-white border border-[var(--grid-border)] hover:border-[var(--accent-gold)] hover:bg-amber-50/40 active:scale-98 transition text-center shadow-xs rounded-xs" data-choice="container_2" tabindex="0">
            <span class="text-2xl text-emerald-800 block mb-1">&#9632;</span>
            <span class="text-xs font-semibold text-[var(--text-primary)] block">Container 2</span>
            <span class="text-[10px] text-[var(--text-secondary)] block mt-0.5 font-mono">Reference: Sage Square</span>
          </button>
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
// E2: Setback Recovery (4 sequences: 3 disrupted, 1 clean control)
// Focuses on calm, constructive operational adaptation. No distressing stimuli.
// --------------------------------------------------------------------------
function runE2SetbackRecovery(app, renderHeader, logEvent, onComplete) {
  let inTutorial = true;
  let currentSeq = 0;
  let selectedAction = null;
  let lastInputModality = 'mouse';

  const sequences = [
    {
      stimulus_id: 'E2_S1',
      title: 'Sequence 1: Workspace Pigment Spill',
      situation: 'A sudden ink droplet spilled across your active workstation layout card.',
      has_disruption: true,
      disruption_type: 'ink_spill_masking_workspace',
      options: [
        { id: 'clear_workspace', label: 'Dab spill with blotting linen and realign layout card', note: 'Constructive recovery action' },
        { id: 'rush_uncleaned', label: 'Continue assembly without cleaning around the smudge', note: 'Rushed compromise' },
        { id: 'pause_idle', label: 'Step away from the bench to wait for guidance', note: 'Passive hesitation' }
      ]
    },
    {
      stimulus_id: 'E2_S2',
      title: 'Sequence 2: Calm Working Cadence',
      situation: 'The work area is undisturbed, materials are organized, and light is balanced.',
      has_disruption: false,
      disruption_type: 'undisrupted_control',
      options: [
        { id: 'standard_sequence', label: 'Proceed with planned standard mosaic montage sequence', note: 'Standard constructive cadence' },
        { id: 'unnecessary_rework', label: 'Disassemble existing tiles to verify underlayer unnecessarily', note: 'Unneeded re-examination' },
        { id: 'pause_idle', label: 'Pause activity to double-check surroundings', note: 'Passive delay' }
      ]
    },
    {
      stimulus_id: 'E2_S3',
      title: 'Sequence 3: Courtyard Draft Disruption',
      situation: 'A courtyard breeze displaced your paper reference template off the table.',
      has_disruption: true,
      disruption_type: 'draft_blows_reference_card',
      options: [
        { id: 'stabilize_reference', label: 'Retrieve reference card and secure it with corner stone weight', note: 'Constructive securing action' },
        { id: 'guess_motif', label: 'Continue placing tiles from rough memory without the template', note: 'Unanchored improvisation' },
        { id: 'pause_idle', label: 'Wait for indoor air current to settle', note: 'Passive hesitation' }
      ]
    },
    {
      stimulus_id: 'E2_S4',
      title: 'Sequence 4: Misplaced Ceramic Tray',
      situation: 'The neighboring glaze palette was nudged, obstructing your primary tool rest.',
      has_disruption: true,
      disruption_type: 'misplaced_pigment_tray',
      options: [
        { id: 'reposition_tray', label: 'Gently shift the neighboring palette back onto its runner', note: 'Constructive realignment' },
        { id: 'use_wrong_shade', label: 'Work around the obstruction in an awkward wrist posture', note: 'Rushed ergonomic compromise' },
        { id: 'pause_idle', label: 'Stop work until the assistant returns', note: 'Passive hesitation' }
      ]
    }
  ];

  function render() {
    if (inTutorial) {
      app.innerHTML = `
        <div>
          ${renderHeader('Part 2: The Courtyard Setup', 'Managing operational adjustments and studio setbacks across 4 workshop sequences.')}
          ${renderTutorialCard({
            icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`,
            goal: 'Respond constructively to workshop situations and unexpected physical adjustments.',
            steps: [
              'Review the atelier situation presented in each sequence.',
              'Evaluate the 3 response options.',
              'Select your constructive operational response across all 4 sequences.'
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

    app.innerHTML = `
      <div class="animate-fadeIn">
        <div class="flex justify-between items-center mb-2">
          ${renderHeader('Part 2: The Courtyard Setup', 'Select the appropriate constructive operational response.')}
          <span class="text-xs uppercase tracking-wider text-[var(--accent-gold)] font-mono font-medium">Sequence ${currentSeq + 1} of ${sequences.length}</span>
        </div>

        <div class="p-3 bg-stone-100 border border-[var(--grid-border)] rounded-sm mb-4 text-xs font-serif text-[var(--text-primary)] flex items-center justify-between">
          <span class="flex items-center gap-2">
            <span class="w-1.5 h-1.5 rounded-full bg-[var(--accent-gold)] inline-block"></span>
            <strong>${s.title}:</strong> ${s.situation}
          </span>
          <span class="text-[10px] uppercase font-mono tracking-wider text-[var(--text-secondary)]">${s.stimulus_id}</span>
        </div>

        <div class="p-6 bg-[#faf8f5] border border-[var(--grid-border)] mb-6 shadow-xs rounded-xs">
          <div class="text-[10px] text-[var(--text-secondary)] font-mono uppercase tracking-wider mb-3">Available Operational Responses:</div>
          <div class="space-y-3">
            ${s.options.map(opt => `
              <div class="e2-opt p-4 bg-white border ${selectedAction === opt.id ? 'border-[var(--accent-gold)] bg-amber-50/50 shadow-xs' : 'border-[var(--grid-border)]'} rounded-xs cursor-pointer hover:border-[var(--accent-gold)] transition text-xs flex items-center justify-between" data-action="${opt.id}" tabindex="0" role="button">
                <span class="flex items-center gap-2.5">
                  <span class="w-3.5 h-3.5 rounded-full border border-current flex items-center justify-center text-[9px] ${selectedAction === opt.id ? 'bg-[var(--accent-gold)] text-white' : 'text-stone-300'}">${selectedAction === opt.id ? '✓' : ''}</span>
                  <span class="text-[var(--text-primary)] font-medium">${opt.label}</span>
                </span>
                <span class="text-[10px] font-mono text-[var(--text-secondary)] uppercase">${opt.note}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="flex justify-end">
          <button type="button" id="confirmE2Btn" ${selectedAction ? '' : 'disabled'} class="px-7 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] disabled:opacity-40 transition shadow-sm rounded-xs">
            ${currentSeq < sequences.length - 1 ? 'Confirm Response &rarr;' : 'Finish Setup Sequences &rarr;'}
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
// Objective is constant; constraints shift (standard -> monochrome -> constrained grid).
// Input modality and interaction method remain invariant.
// --------------------------------------------------------------------------
function runE3ChangingConditions(app, renderHeader, logEvent, onComplete) {
  let inTutorial = true;
  let currentCondition = 0;
  let selectedLayout = null;
  let lastInputModality = 'mouse';

  const conditions = [
    {
      stimulus_id: 'E3_C1',
      title: 'Condition 1: Full Tri-Tone Palette',
      constraint_state: 'standard_three_color_palette',
      description: 'Standard studio conditions: gold, sage, and terracotta pigments are all available on the bench.',
      options: [
        { id: 'standard_layout', label: 'Balanced Tri-Tone Motif (Symmetrical triad placement)' },
        { id: 'tonal_adaptation', label: 'Monochrome Grayscale Contrast (Single shade emphasis)' },
        { id: 'compact_adaptation', label: 'Half-Grid High Density Compression' }
      ]
    },
    {
      stimulus_id: 'E3_C2',
      title: 'Condition 2: Monochrome Indigo Restriction',
      constraint_state: 'monochrome_indigo_only',
      description: 'Material restriction: only single indigo pigment is available; contrast must be achieved through tonal density.',
      options: [
        { id: 'tonal_adaptation', label: 'Tonal Value Gradient (Depth through hatching and value density)' },
        { id: 'standard_layout', label: 'Attempt Tri-Color Separation (Incompatible with single pigment)' },
        { id: 'compact_adaptation', label: 'Compressed Stamp Layout' }
      ]
    },
    {
      stimulus_id: 'E3_C3',
      title: 'Condition 3: Constricted Border Grid',
      constraint_state: 'boundary_constricted_half_grid',
      description: 'Spatial constraint: available wall boundary is reduced to half-width; artwork must be scaled to compact dimensions.',
      options: [
        { id: 'compact_adaptation', label: 'Compact Geometric Scaling (Dense micro-mosaic adaptation)' },
        { id: 'standard_layout', label: 'Standard Wide Layout (Exceeds constricted boundary)' },
        { id: 'tonal_adaptation', label: 'Unscaled Shading Layout' }
      ]
    }
  ];

  function render() {
    if (inTutorial) {
      app.innerHTML = `
        <div>
          ${renderHeader('Part 3: The Shifting Medium', 'Adapting aesthetic compositions across 3 shifting environmental constraints.')}
          ${renderTutorialCard({
            icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"></path></svg>`,
            goal: 'Adapt your mosaic design strategy to match the shifting environmental conditions while maintaining aesthetic harmony.',
            steps: [
              'Examine the active studio constraints in each transition.',
              'Choose the layout adaptation best aligned with the constraints.',
              'Confirm your composition across all 3 transitions.'
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

    app.innerHTML = `
      <div class="animate-fadeIn">
        <div class="flex justify-between items-center mb-2">
          ${renderHeader('Part 3: The Shifting Medium', 'Adapt composition strategy to active constraint requirements.')}
          <span class="text-xs uppercase tracking-wider text-[var(--accent-gold)] font-mono font-medium">Condition ${currentCondition + 1} of ${conditions.length}</span>
        </div>

        <div class="p-3 bg-stone-100 border border-[var(--grid-border)] rounded-sm mb-4 text-xs font-serif text-[var(--text-primary)] flex items-center justify-between">
          <span class="flex items-center gap-2">
            <span class="w-1.5 h-1.5 rounded-full bg-[var(--accent-gold)] inline-block"></span>
            <strong>${c.title}:</strong> ${c.description}
          </span>
          <span class="text-[10px] uppercase font-mono tracking-wider text-[var(--text-secondary)] font-mono">${c.stimulus_id}</span>
        </div>

        <div class="p-6 bg-[#faf8f5] border border-[var(--grid-border)] mb-6 shadow-xs rounded-xs">
          <div class="text-[10px] text-[var(--text-secondary)] font-mono uppercase tracking-wider mb-3">Composition Adaptation Strategies:</div>
          <div class="space-y-3">
            ${c.options.map(opt => `
              <div class="e3-opt p-4 bg-white border ${selectedLayout === opt.id ? 'border-[var(--accent-gold)] bg-amber-50/50 shadow-xs' : 'border-[var(--grid-border)]'} rounded-xs cursor-pointer hover:border-[var(--accent-gold)] transition text-xs flex items-center justify-between" data-layout="${opt.id}" tabindex="0" role="button">
                <span class="flex items-center gap-2.5">
                  <span class="w-3.5 h-3.5 rounded-full border border-current flex items-center justify-center text-[9px] ${selectedLayout === opt.id ? 'bg-[var(--accent-gold)] text-white' : 'text-stone-300'}">${selectedLayout === opt.id ? '✓' : ''}</span>
                  <span class="text-[var(--text-primary)] font-medium">${opt.label}</span>
                </span>
                <span class="text-[10px] font-mono text-[var(--text-secondary)] uppercase">${opt.id}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="flex justify-end">
          <button type="button" id="confirmE3Btn" ${selectedLayout ? '' : 'disabled'} class="px-7 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] disabled:opacity-40 transition shadow-sm rounded-xs">
            ${currentCondition < conditions.length - 1 ? 'Confirm Adaptation &rarr;' : 'Finish World 4 &rarr;'}
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
