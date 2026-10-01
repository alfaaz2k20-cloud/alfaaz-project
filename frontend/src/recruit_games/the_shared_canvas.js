/* ==========================================================================
   ALFAAZ RECRUIT — WORLD 3: THE SHARED CANVAS (مشترکہ نقش)
   Mini-games: C1 (Resource Cooperation), C2 (Coordination), C3 (Collaboration Repair)
   Adheres to Design Freeze v1 + Addendum v1.1.
   Emits raw behavioral telemetry only (no client-authored scores or correctness).
   ========================================================================== */

import { renderTutorialCard } from './index.js';

export function runTheSharedCanvas(context, renderHeader) {
  const { appContainer, miniGameIndex, logEvent, onMiniGameComplete } = context;

  switch (miniGameIndex) {
    case 0:
      runC1ResourceCooperation(appContainer, renderHeader, logEvent, onMiniGameComplete);
      break;
    case 1:
      runC2Coordination(appContainer, renderHeader, logEvent, onMiniGameComplete);
      break;
    case 2:
      runC3CollaborationRepair(appContainer, renderHeader, logEvent, onMiniGameComplete);
      break;
  }
}

// --------------------------------------------------------------------------
// C1: Resource Cooperation (3 rounds: deficit, balanced, surplus control)
// --------------------------------------------------------------------------
function runC1ResourceCooperation(app, renderHeader, logEvent, onComplete) {
  let inTutorial = true;
  let currentRound = 0;
  let transferCount = 0;
  let lastInputModality = 'mouse';

  const rounds = [
    {
      stimulus_id: 'C1_R1',
      title: 'Round 1: Partner Mosaic Deficit',
      description: 'Your partner’s workstation is short by 3 tiles to complete their mosaic panel. You have 8 tiles.',
      partner_initial: 2,
      user_initial: 8,
      default_transfer: 0,
      context_note: 'Partner Deficit Condition'
    },
    {
      stimulus_id: 'C1_R2',
      title: 'Round 2: Balanced Mosaic Workstation',
      description: 'Both you and your partner have adequate supplies (5 tiles each) to complete your respective panels.',
      partner_initial: 5,
      user_initial: 5,
      default_transfer: 0,
      context_note: 'Balanced Need Condition'
    },
    {
      stimulus_id: 'C1_R3',
      title: 'Round 3: Partner Surplus Control',
      description: 'Your partner already has an excess of materials (8 tiles) for their section, while you have 5 tiles.',
      partner_initial: 8,
      user_initial: 5,
      default_transfer: 0,
      context_note: 'Surplus / No-Need Control'
    }
  ];

  function render() {
    if (inTutorial) {
      app.innerHTML = `
        <div>
          ${renderHeader("Part 1: The Artisan's Basket", 'Coordinating ceramic mosaic supplies with your workshop partner across 3 distinct inventory situations.')}
          ${renderTutorialCard({
            icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>`,
            goal: 'Evaluate the inventory needs in each round and decide how many tiles (if any) to transfer from your basket.',
            steps: [
              'Check both workstations to see if materials are in deficit, balanced, or surplus.',
              'Use the + / - buttons to set your transfer count.',
              'Confirm your distribution for each of the 3 rounds.'
            ]
          })}
        </div>
      `;
      document.getElementById('startActivityBtn')?.addEventListener('click', () => {
        inTutorial = false;
        currentRound = 0;
        transferCount = 0;
        logRoundPresented();
        render();
      });
      return;
    }

    const r = rounds[currentRound];
    const partnerTotal = r.partner_initial + transferCount;
    const userTotal = r.user_initial - transferCount;

    app.innerHTML = `
      <div class="animate-fadeIn">
        <div class="flex justify-between items-center mb-2">
          ${renderHeader("Part 1: The Artisan's Basket", 'Review workstation requirements and allocate tiles appropriately.')}
          <span class="text-xs uppercase tracking-wider text-[var(--accent-gold)] font-mono font-medium">Round ${currentRound + 1} of 3</span>
        </div>

        <!-- Situation Banner -->
        <div class="p-3 bg-stone-100 border border-[var(--grid-border)] rounded-sm mb-4 text-xs font-serif text-[var(--text-primary)] flex items-center justify-between">
          <span class="flex items-center gap-2">
            <span class="w-1.5 h-1.5 rounded-full bg-[var(--accent-gold)] inline-block"></span>
            <strong>${r.title}:</strong> ${r.description}
          </span>
          <span class="text-[10px] uppercase font-mono tracking-wider text-[var(--text-secondary)]">${r.context_note}</span>
        </div>

        <div class="p-6 bg-[#faf8f5] border border-[var(--grid-border)] mb-6 shadow-xs rounded-xs">
          <div class="grid grid-cols-2 gap-4 text-center mb-6">
            <div class="p-4 bg-white border border-[var(--grid-border)] shadow-xs rounded-xs">
              <span class="text-[10px] text-[var(--accent-gold)] uppercase font-semibold tracking-wider font-mono">Partner Basket</span>
              <div class="text-xl font-serif font-semibold text-[#bd6f5d] mt-1">${partnerTotal} Ceramic Tiles</div>
              <div class="flex justify-center gap-1.5 mt-3 flex-wrap max-w-[140px] mx-auto">
                ${Array(Math.max(0, partnerTotal)).fill('<div class="w-4 h-4 bg-[#bd6f5d]/70 rounded-xs shadow-xs"></div>').join('')}
              </div>
            </div>
            <div class="p-4 bg-white border border-[var(--grid-border)] shadow-xs rounded-xs">
              <span class="text-[10px] text-emerald-700 uppercase font-semibold tracking-wider font-mono">Your Basket</span>
              <div class="text-xl font-serif font-semibold text-emerald-800 mt-1">${userTotal} Ceramic Tiles</div>
              <div class="flex justify-center gap-1.5 mt-3 flex-wrap max-w-[140px] mx-auto">
                ${Array(Math.max(0, userTotal)).fill('<div class="w-4 h-4 bg-emerald-700/70 rounded-xs shadow-xs"></div>').join('')}
              </div>
            </div>
          </div>

          <div class="text-center pt-2 border-t border-[var(--grid-border)]">
            <div class="text-xs text-[var(--text-secondary)] mb-3 font-medium">Tiles to transfer to partner:</div>
            <div class="flex justify-center items-center gap-4">
              <button type="button" id="minusTileBtn" class="w-10 h-10 rounded-xs bg-white border border-[var(--grid-border)] text-lg font-bold hover:border-[var(--accent-gold)] hover:bg-amber-50 active:scale-95 transition shadow-xs" tabindex="0">-</button>
              <span id="transferCount" class="font-serif text-3xl font-semibold text-[var(--accent-gold)] w-10 text-center">${transferCount}</span>
              <button type="button" id="plusTileBtn" class="w-10 h-10 rounded-xs bg-white border border-[var(--grid-border)] text-lg font-bold hover:border-[var(--accent-gold)] hover:bg-amber-50 active:scale-95 transition shadow-xs" tabindex="0">+</button>
            </div>
          </div>
        </div>

        <div class="flex justify-end">
          <button type="button" id="confirmTransferBtn" class="px-7 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition shadow-sm rounded-xs">
            ${currentRound < 2 ? 'Confirm Allocation &rarr;' : 'Finish Resource Distribution &rarr;'}
          </button>
        </div>
      </div>
    `;

    document.getElementById('minusTileBtn')?.addEventListener('click', () => {
      lastInputModality = 'mouse';
      if (transferCount > 0) {
        transferCount--;
        logAllocationAdjusted();
        render();
      }
    });

    document.getElementById('plusTileBtn')?.addEventListener('click', () => {
      lastInputModality = 'mouse';
      if (transferCount < r.user_initial) {
        transferCount++;
        logAllocationAdjusted();
        render();
      }
    });

    document.getElementById('confirmTransferBtn')?.addEventListener('click', () => {
      logEvent('round_submit', {
        trial_index: currentRound,
        stimulus_id: r.stimulus_id,
        transferred_count: transferCount,
        remaining_count: r.user_initial - transferCount,
        partner_final_count: r.partner_initial + transferCount,
        input_modality: lastInputModality,
        task_def_version: '1.0'
      });

      if (currentRound < 2) {
        currentRound++;
        transferCount = 0;
        logRoundPresented();
        render();
      } else {
        onComplete({
          mini_game: 'C1',
          observations_count: 3
        });
      }
    });
  }

  function logRoundPresented() {
    const r = rounds[currentRound];
    logEvent('round_presented', {
      trial_index: currentRound,
      stimulus_id: r.stimulus_id,
      partner_initial: r.partner_initial,
      user_initial: r.user_initial,
      task_def_version: '1.0'
    });
  }

  function logAllocationAdjusted() {
    const r = rounds[currentRound];
    logEvent('allocation_adjusted', {
      trial_index: currentRound,
      stimulus_id: r.stimulus_id,
      allocated_amount: transferCount,
      input_modality: lastInputModality,
      task_def_version: '1.0'
    });
  }

  render();
}

// --------------------------------------------------------------------------
// C2: Coordination (3 coordinated placement rounds)
// Partner / system state changes across rounds. Per-placement raw events.
// --------------------------------------------------------------------------
function runC2Coordination(app, renderHeader, logEvent, onComplete) {
  let inTutorial = true;
  let currentRound = 0;
  let chosenSlot = null;
  let lastInputModality = 'mouse';

  const rounds = [
    {
      stimulus_id: 'C2_R1',
      title: 'Round 1: Open Wall Turn',
      partner_desc: 'Partner has hung their painting on the Upper Left (North) cluster.',
      slots: [
        { id: 'SLOT_NORTH_RIGHT', label: 'Upper Right (Balanced Spacing)' },
        { id: 'SLOT_OVERLAP_LEFT', label: 'Adjacent Left (Tight Cluster)' },
        { id: 'SLOT_BOTTOM_CENTER', label: 'Lower Center (Vertical Complement)' }
      ]
    },
    {
      stimulus_id: 'C2_R2',
      title: 'Round 2: Restricted Wall Space',
      partner_desc: 'Partner is framing the Center Hallway; central corridor clearance must remain open.',
      slots: [
        { id: 'SLOT_PERIMETER_EAST', label: 'East Perimeter (Clear Corridor)' },
        { id: 'SLOT_CENTER_ADJACENT', label: 'Center Blocking Slot (Crowds Hallway)' },
        { id: 'SLOT_PERIMETER_WEST', label: 'West Perimeter (Clear Corridor)' }
      ]
    },
    {
      stimulus_id: 'C2_R3',
      title: 'Round 3: Dynamic Canvas Adjustment',
      partner_desc: 'Partner shifted their composition toward the Lower (South) exhibition area.',
      slots: [
        { id: 'SLOT_UPPER_GALLERY', label: 'Upper Wall (Restores Bilateral Balance)' },
        { id: 'SLOT_LOWER_CONGESTED', label: 'Lower Wall (Overcrowds South)' },
        { id: 'SLOT_MID_SIDE', label: 'Mid-Side Niche (Neutral Position)' }
      ]
    }
  ];

  function render() {
    if (inTutorial) {
      app.innerHTML = `
        <div>
          ${renderHeader('Part 2: The Gallery Wall', 'Coordinating artwork hanging positions across 3 spatial layout rounds.')}
          ${renderTutorialCard({
            icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"></path></svg>`,
            goal: 'Select an artwork hanging slot in each round that complements your partner’s arrangement without interference.',
            steps: [
              'Review your colleague’s hung piece and the layout state in each round.',
              'Inspect the available placement slots on the wall.',
              'Confirm your chosen position across all 3 rounds.'
            ]
          })}
        </div>
      `;
      document.getElementById('startActivityBtn')?.addEventListener('click', () => {
        inTutorial = false;
        currentRound = 0;
        chosenSlot = null;
        logRoundPresented();
        render();
      });
      return;
    }

    const r = rounds[currentRound];

    app.innerHTML = `
      <div class="animate-fadeIn">
        <div class="flex justify-between items-center mb-2">
          ${renderHeader('Part 2: The Gallery Wall', 'Coordinate placement with your partner’s artwork.')}
          <span class="text-xs uppercase tracking-wider text-[var(--accent-gold)] font-mono font-medium">Round ${currentRound + 1} of 3</span>
        </div>

        <div class="p-3 bg-stone-100 border border-[var(--grid-border)] rounded-sm mb-4 text-xs font-serif text-[var(--text-primary)] flex items-center justify-between">
          <span class="flex items-center gap-2">
            <span class="w-1.5 h-1.5 rounded-full bg-[var(--accent-gold)] inline-block"></span>
            <strong>${r.title}:</strong> ${r.partner_desc}
          </span>
          <span class="text-[10px] uppercase font-mono tracking-wider text-[var(--text-secondary)] font-mono">${r.stimulus_id}</span>
        </div>

        <div class="p-6 bg-[#faf8f5] border border-[var(--grid-border)] mb-6 shadow-xs rounded-xs">
          <div class="w-full bg-white border border-[var(--grid-border)] p-6 rounded-xs shadow-inner mb-4">
            <div class="text-[10px] text-[var(--text-secondary)] font-mono uppercase tracking-wider mb-3">Available Wall Placement Slots:</div>
            <div class="flex flex-col gap-2.5">
              ${r.slots.map(s => `
                <button type="button" class="slot-btn px-4 py-3 text-xs border rounded-xs ${chosenSlot === s.id ? 'border-[var(--accent-gold)] bg-amber-50 font-semibold shadow-xs' : 'border-[var(--grid-border)] bg-white hover:border-[var(--accent-gold)]'} transition flex items-center justify-between" data-slot="${s.id}" tabindex="0">
                  <span class="flex items-center gap-2">
                    <span class="w-3.5 h-3.5 rounded-full border border-current flex items-center justify-center text-[9px] ${chosenSlot === s.id ? 'bg-[var(--accent-gold)] text-white' : 'text-stone-400'}">${chosenSlot === s.id ? '✓' : ''}</span>
                    <span class="text-[var(--text-primary)]">${s.label}</span>
                  </span>
                  <span class="text-[10px] font-mono text-[var(--text-secondary)] uppercase">${s.id}</span>
                </button>
              `).join('')}
            </div>
          </div>
        </div>

        <div class="flex justify-end">
          <button type="button" id="confirmWallBtn" ${chosenSlot ? '' : 'disabled'} class="px-7 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] disabled:opacity-40 transition shadow-sm rounded-xs">
            ${currentRound < 2 ? 'Confirm Placement &rarr;' : 'Finish Wall Coordination &rarr;'}
          </button>
        </div>
      </div>
    `;

    app.querySelectorAll('.slot-btn').forEach(btn => {
      const selectSlot = (modality) => {
        lastInputModality = modality;
        chosenSlot = btn.getAttribute('data-slot');
        logEvent('placement_attempted', {
          trial_index: currentRound,
          stimulus_id: r.stimulus_id,
          slot_id: chosenSlot,
          input_modality: lastInputModality,
          task_def_version: '1.0'
        });
        render();
      };

      btn.addEventListener('click', () => selectSlot('mouse'));
      btn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          selectSlot('keyboard');
        }
      });
    });

    document.getElementById('confirmWallBtn')?.addEventListener('click', () => {
      logEvent('placement_confirmed', {
        trial_index: currentRound,
        stimulus_id: r.stimulus_id,
        chosen_slot: chosenSlot,
        input_modality: lastInputModality,
        task_def_version: '1.0'
      });

      if (currentRound < 2) {
        currentRound++;
        chosenSlot = null;
        logRoundPresented();
        render();
      } else {
        onComplete({
          mini_game: 'C2',
          observations_count: 3
        });
      }
    });
  }

  function logRoundPresented() {
    const r = rounds[currentRound];
    logEvent('round_presented', {
      trial_index: currentRound,
      stimulus_id: r.stimulus_id,
      task_def_version: '1.0'
    });
  }

  render();
}

// --------------------------------------------------------------------------
// C3: Collaboration Repair (3 breakdown / recovery opportunities)
// Candidate must: identify breakdown -> perform useful repair -> execute repaired action
// --------------------------------------------------------------------------
function runC3CollaborationRepair(app, renderHeader, logEvent, onComplete) {
  let inTutorial = true;
  let currentOpportunity = 0;
  let currentStep = 'identify'; // 'identify' -> 'repair' -> 'execute'
  let selectedFault = null;
  let selectedRepair = null;
  let lastInputModality = 'mouse';

  const opportunities = [
    {
      stimulus_id: 'C3_R1',
      title: 'Opportunity 1: Partner Circuit Breakdown',
      partner_state: 'Partner’s exhibition lantern circuit has gone dark due to an electrical conduit misalignment.',
      condition_type: 'identify_and_repair',
      fault_options: [
        { id: 'fault_conduit_disconnected', label: 'Conduit feeder disconnected at terminal block' },
        { id: 'fault_bulb_broken', label: 'Bulb filament shattered' },
        { id: 'fault_switch_off', label: 'Main pavilion master switch is turned off' }
      ],
      repair_options: [
        { id: 'adjust_conduit', label: 'Realight conduit terminal and secure ground clamp' },
        { id: 'call_help_desk', label: 'Click general help desk button' },
        { id: 'replace_lantern', label: 'Dismantle lantern fixture' }
      ],
      execution_action: 'restore_power'
    },
    {
      stimulus_id: 'C3_R2',
      title: 'Opportunity 2: Balanced Pavilion Inspection',
      partner_state: 'Both gallery pavilions are currently operating at optimal lighting equilibrium.',
      condition_type: 'clean_control',
      fault_options: [
        { id: 'fault_none_adequate', label: 'No fault detected — illumination is adequate and balanced' },
        { id: 'fault_phantom_surge', label: 'Suspected phantom electrical surge' }
      ],
      repair_options: [
        { id: 'verify_adequate', label: 'Confirm adequate operation without disturbing settings' },
        { id: 'unnecessary_reset', label: 'Shut down partner circuit for full reset' }
      ],
      execution_action: 'verify_adequate'
    },
    {
      stimulus_id: 'C3_R3',
      title: 'Opportunity 3: Shadow Corridor Obstruction',
      partner_state: 'Partner’s painting is obscured by an accidental spotlight shadow barrier.',
      condition_type: 'identify_and_repair',
      fault_options: [
        { id: 'fault_blindspot_obstruction', label: 'Spotlight angle obstructed by movable partition' },
        { id: 'fault_color_distortion', label: 'Color temperature mismatched' }
      ],
      repair_options: [
        { id: 'shift_lantern', label: 'Re-angle spotlight beam 30 degrees to bypass obstruction' },
        { id: 'generic_complaint', label: 'Submit generic lighting complaint ticket' }
      ],
      execution_action: 'illuminate_path'
    }
  ];

  function render() {
    if (inTutorial) {
      app.innerHTML = `
        <div>
          ${renderHeader('Part 3: The Dual Lanterns', 'Diagnosing and repairing collaborative workflow breakdowns across 3 exhibition situations.')}
          ${renderTutorialCard({
            icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>`,
            goal: 'Collaboratively repair workflow breakdowns: identify the specific issue, perform a useful repair action, and execute the fix.',
            steps: [
              'Examine the operational situation in each opportunity.',
              'Identify the breakdown root cause (or recognize clean balance).',
              'Select a constructive repair action and execute the solution.'
            ]
          })}
        </div>
      `;
      document.getElementById('startActivityBtn')?.addEventListener('click', () => {
        inTutorial = false;
        currentOpportunity = 0;
        currentStep = 'identify';
        selectedFault = null;
        selectedRepair = null;
        logRepairPresented();
        render();
      });
      return;
    }

    const opp = opportunities[currentOpportunity];

    app.innerHTML = `
      <div class="animate-fadeIn">
        <div class="flex justify-between items-center mb-2">
          ${renderHeader('Part 3: The Dual Lanterns', 'Resolve operational breakdowns to maintain joint exhibition harmony.')}
          <span class="text-xs uppercase tracking-wider text-[var(--accent-gold)] font-mono font-medium">Opportunity ${currentOpportunity + 1} of 3</span>
        </div>

        <div class="p-3 bg-stone-100 border border-[var(--grid-border)] rounded-sm mb-4 text-xs font-serif text-[var(--text-primary)] flex items-center justify-between">
          <span class="flex items-center gap-2">
            <span class="w-1.5 h-1.5 rounded-full bg-[var(--accent-gold)] inline-block"></span>
            <strong>${opp.title}:</strong> ${opp.partner_state}
          </span>
          <span class="text-[10px] uppercase font-mono tracking-wider text-[var(--text-secondary)] font-mono">${opp.stimulus_id}</span>
        </div>

        <div class="p-6 bg-[#faf8f5] border border-[var(--grid-border)] mb-6 shadow-xs rounded-xs">
          <!-- Step 1: Identify Breakdown -->
          <div class="mb-5">
            <div class="text-xs font-semibold uppercase tracking-wider text-[var(--text-primary)] mb-2">
              Step 1: Identify the Operational Breakdown
            </div>
            <div class="space-y-2">
              ${opp.fault_options.map(f => `
                <div class="fault-opt p-3 bg-white border ${selectedFault === f.id ? 'border-[var(--accent-gold)] bg-amber-50/50 shadow-xs' : 'border-[var(--grid-border)]'} rounded-xs cursor-pointer hover:border-[var(--accent-gold)] transition text-xs flex items-center gap-2" data-fault="${f.id}" tabindex="0" role="button">
                  <span class="w-3 h-3 rounded-full border border-current flex items-center justify-center text-[8px] ${selectedFault === f.id ? 'bg-[var(--accent-gold)] text-white' : 'text-stone-300'}">${selectedFault === f.id ? '✓' : ''}</span>
                  <span class="text-[var(--text-primary)]">${f.label}</span>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Step 2: Perform Constructive Repair -->
          ${selectedFault ? `
            <div class="mb-5 pt-4 border-t border-[var(--grid-border)] animate-fadeIn">
              <div class="text-xs font-semibold uppercase tracking-wider text-[var(--text-primary)] mb-2">
                Step 2: Perform Constructive Repair Action
              </div>
              <div class="space-y-2">
                ${opp.repair_options.map(r => `
                  <div class="repair-opt p-3 bg-white border ${selectedRepair === r.id ? 'border-[var(--accent-gold)] bg-amber-50/50 shadow-xs' : 'border-[var(--grid-border)]'} rounded-xs cursor-pointer hover:border-[var(--accent-gold)] transition text-xs flex items-center gap-2" data-repair="${r.id}" tabindex="0" role="button">
                    <span class="w-3 h-3 rounded-full border border-current flex items-center justify-center text-[8px] ${selectedRepair === r.id ? 'bg-[var(--accent-gold)] text-white' : 'text-stone-300'}">${selectedRepair === r.id ? '✓' : ''}</span>
                    <span class="text-[var(--text-primary)]">${r.label}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}
        </div>

        <div class="flex justify-end">
          <button type="button" id="executeRepairBtn" ${selectedFault && selectedRepair ? '' : 'disabled'} class="px-7 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] disabled:opacity-40 transition shadow-sm rounded-xs">
            ${currentOpportunity < 2 ? 'Execute Repair & Proceed &rarr;' : 'Finalize Joint Repair &rarr;'}
          </button>
        </div>
      </div>
    `;

    // Handlers for Step 1
    app.querySelectorAll('.fault-opt').forEach(opt => {
      const selectFault = (modality) => {
        lastInputModality = modality;
        selectedFault = opt.getAttribute('data-fault');
        logEvent('breakdown_identified', {
          trial_index: currentOpportunity,
          stimulus_id: opp.stimulus_id,
          fault_id: selectedFault,
          input_modality: lastInputModality,
          task_def_version: '1.0'
        });
        render();
      };

      opt.addEventListener('click', () => selectFault('mouse'));
      opt.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          selectFault('keyboard');
        }
      });
    });

    // Handlers for Step 2
    app.querySelectorAll('.repair-opt').forEach(opt => {
      const selectRepair = (modality) => {
        lastInputModality = modality;
        selectedRepair = opt.getAttribute('data-repair');
        logEvent('repair_action_performed', {
          trial_index: currentOpportunity,
          stimulus_id: opp.stimulus_id,
          repair_action_id: selectedRepair,
          input_modality: lastInputModality,
          task_def_version: '1.0'
        });
        render();
      };

      opt.addEventListener('click', () => selectRepair('mouse'));
      opt.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          selectRepair('keyboard');
        }
      });
    });

    // Step 3 Execution
    document.getElementById('executeRepairBtn')?.addEventListener('click', () => {
      logEvent('repaired_action_executed', {
        trial_index: currentOpportunity,
        stimulus_id: opp.stimulus_id,
        fault_id: selectedFault,
        repair_action_id: selectedRepair,
        execution_action_id: opp.execution_action,
        input_modality: lastInputModality,
        task_def_version: '1.0'
      });

      if (currentOpportunity < 2) {
        currentOpportunity++;
        selectedFault = null;
        selectedRepair = null;
        logRepairPresented();
        render();
      } else {
        onComplete({
          mini_game: 'C3',
          observations_count: 3
        });
      }
    });
  }

  function logRepairPresented() {
    const opp = opportunities[currentOpportunity];
    logEvent('repair_presented', {
      trial_index: currentOpportunity,
      stimulus_id: opp.stimulus_id,
      task_def_version: '1.0'
    });
  }

  render();
}
