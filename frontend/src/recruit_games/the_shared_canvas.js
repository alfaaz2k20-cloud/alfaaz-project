/* ==========================================================================
   ALFAAZ RECRUIT — WORLD 3: THE SHARED CANVAS (مشترکہ نقش)
   Mini-games: C1 (Resource Cooperation), C2 (Coordination), C3 (Collaboration Repair)
   Plain language remediation for human playtest pass 1.
   Sentences <= 12 words. Simple conversational English. Jargon removed.
   Preserves raw behavioral telemetry emissions and exact stimulus/action IDs.
   ========================================================================== */

import { renderTutorialCard, bindTutorialCard } from './index.js';

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
      title: 'Round 1: Partner Needs Tiles',
      description: 'Your partner needs 3 more tiles to finish. You have 8 tiles.',
      partner_initial: 2,
      user_initial: 8,
      default_transfer: 0,
      context_note: 'Partner Needs Help'
    },
    {
      stimulus_id: 'C1_R2',
      title: 'Round 2: Balanced Baskets',
      description: 'Both you and your partner have 5 tiles. Both have enough to finish.',
      partner_initial: 5,
      user_initial: 5,
      default_transfer: 0,
      context_note: 'Both Have Enough'
    },
    {
      stimulus_id: 'C1_R3',
      title: 'Round 3: Your Basket is Low',
      description: 'Your basket has only 3 tiles (you need 6). Your partner has 7 tiles.',
      partner_initial: 7,
      user_initial: 3,
      default_transfer: 0,
      context_note: 'Keep Your Tiles'
    }
  ];

  function render() {
    if (inTutorial) {
      app.innerHTML = `
        <div class="candidate-content-protected max-w-2xl mx-auto">
          ${renderHeader("The Artisan's Basket", 'Coordinate ceramic tiles with your workshop partner.')}
          ${renderTutorialCard({
            icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>`,
            goal: 'Look at both baskets and decide if you want to share tiles.',
            steps: [
              'Check how many tiles you and your partner have.',
              'Use plus and minus to move tiles between baskets.',
              'Confirm your choice across 3 rounds.'
            ]
          })}
        </div>
      `;
      bindTutorialCard(app, () => {
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
      <div class="animate-soft-fade-in max-w-2xl mx-auto">
        <!-- TOP BAR -->
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3 pb-2 border-b border-[var(--grid-border)]">
          <div class="flex items-center gap-2">
            <span class="act-badge">World 3: The Shared Canvas</span>
            <span class="text-xs text-[var(--text-secondary)] font-sans">Part 1 of 3 &middot; Round ${currentRound + 1} of 3</span>
          </div>
          <div class="text-[11px] text-[var(--accent-gold)] font-sans font-medium">Takes about 1 minute</div>
        </div>

        <!-- TASK HEADER -->
        <div class="mb-4">
          <h2 class="text-xl sm:text-2xl font-serif text-[var(--text-primary)]">The Artisan's Basket</h2>
          <p class="text-xs text-[var(--text-secondary)] mt-0.5">Coordinate ceramic tiles with your workshop partner.</p>
        </div>

        <!-- YOUR TASK -->
        <div class="p-3 sm:p-4 bg-amber-50/70 border border-[var(--accent-gold)]/40 rounded-xs mb-4 candidate-content-protected">
          <div class="text-[10px] uppercase tracking-wider font-sans text-[var(--accent-gold)] font-semibold mb-1">Your Task</div>
          <div class="text-xs text-[var(--text-primary)] leading-relaxed">
            Check tile counts below. Move tiles to your partner if needed.
          </div>
        </div>

        <!-- LOOK AT THIS -->
        <div class="p-3.5 bg-white border border-[var(--grid-border)] rounded-xs mb-4 shadow-xs candidate-content-protected flex items-center justify-between">
          <span class="text-xs font-serif text-[var(--text-primary)]">
            <strong>${r.title}:</strong> ${r.description}
          </span>
          <span class="text-[10px] font-sans uppercase tracking-wider text-[var(--text-secondary)]">${r.context_note}</span>
        </div>

        <!-- INTERACTION AREA -->
        <div class="p-5 bg-[#faf8f5] border border-[var(--grid-border)] mb-4 rounded-xs shadow-xs candidate-content-protected">
          <div class="grid grid-cols-2 gap-4 text-center mb-5">
            <div class="p-4 bg-white border border-[var(--grid-border)] rounded-xs shadow-xs">
              <span class="text-[10px] text-[var(--accent-gold)] uppercase font-semibold font-sans">Partner Basket</span>
              <div class="text-xl font-serif font-semibold text-[#bd6f5d] mt-1">${partnerTotal} Tiles</div>
              <div class="flex justify-center gap-1 mt-2.5 flex-wrap max-w-[140px] mx-auto">
                ${Array(Math.max(0, partnerTotal)).fill('<div class="w-3.5 h-3.5 bg-[#bd6f5d]/70 rounded-xs shadow-xs"></div>').join('')}
              </div>
            </div>
            <div class="p-4 bg-white border border-[var(--grid-border)] rounded-xs shadow-xs">
              <span class="text-[10px] text-emerald-700 uppercase font-semibold font-sans">Your Basket</span>
              <div class="text-xl font-serif font-semibold text-emerald-800 mt-1">${userTotal} Tiles</div>
              <div class="flex justify-center gap-1 mt-2.5 flex-wrap max-w-[140px] mx-auto">
                ${Array(Math.max(0, userTotal)).fill('<div class="w-3.5 h-3.5 bg-emerald-700/70 rounded-xs shadow-xs"></div>').join('')}
              </div>
            </div>
          </div>

          <div class="text-center pt-3 border-t border-[var(--grid-border)]">
            <div class="text-xs text-[var(--text-secondary)] mb-2 font-sans">Tiles to share with partner:</div>
            <div class="flex justify-center items-center gap-4">
              <button type="button" id="minusTileBtn" class="w-12 h-12 rounded-xs bg-white border border-[var(--grid-border)] text-xl font-bold hover:border-[var(--accent-gold)] hover:bg-amber-50 active:scale-95 transition shadow-xs flex items-center justify-center min-h-[44px]" tabindex="0">-</button>
              <span id="transferCount" class="font-serif text-3xl font-semibold text-[var(--accent-gold)] w-12 text-center">${transferCount}</span>
              <button type="button" id="plusTileBtn" class="w-12 h-12 rounded-xs bg-white border border-[var(--grid-border)] text-xl font-bold hover:border-[var(--accent-gold)] hover:bg-amber-50 active:scale-95 transition shadow-xs flex items-center justify-center min-h-[44px]" tabindex="0">+</button>
            </div>
          </div>
        </div>

        <!-- YOUR CHOICE -->
        <div class="p-3 bg-white border border-[var(--grid-border)] rounded-xs mb-4 text-xs font-sans text-[var(--text-secondary)] flex justify-between items-center">
          <span>Sharing: <strong class="text-[var(--text-primary)]">${transferCount} tiles</strong> (You keep ${userTotal})</span>
          <span class="text-[10px] text-stone-400 font-sans">Round ${currentRound + 1} of 3</span>
        </div>

        <!-- PRIMARY ACTION BUTTON -->
        <div class="flex justify-end">
          <button type="button" id="confirmTransferBtn" class="w-full sm:w-auto px-7 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition shadow-sm rounded-xs min-h-[44px]">
            ${currentRound < 2 ? 'Confirm Tile Sharing &rarr;' : 'Finish Tile Allocation &rarr;'}
          </button>
        </div>
      </div>
    `;

    document.getElementById('minusTileBtn')?.addEventListener('click', () => {
      lastInputModality = 'mouse';
      if (transferCount > 0) {
        transferCount--;
        logEvent('resource_transferred', {
          trial_index: currentRound,
          stimulus_id: r.stimulus_id,
          delta: -1,
          action_type: 'return_to_user',
          input_modality: lastInputModality,
          task_def_version: '1.0'
        });
        render();
      }
    });

    document.getElementById('plusTileBtn')?.addEventListener('click', () => {
      lastInputModality = 'mouse';
      if (transferCount < r.user_initial) {
        transferCount++;
        logEvent('resource_transferred', {
          trial_index: currentRound,
          stimulus_id: r.stimulus_id,
          delta: 1,
          action_type: 'transfer_to_partner',
          input_modality: lastInputModality,
          task_def_version: '1.0'
        });
        render();
      }
    });

    document.getElementById('confirmTransferBtn')?.addEventListener('click', () => {
      logEvent('allocation_confirmed', {
        trial_index: currentRound,
        stimulus_id: r.stimulus_id,
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
      input_modality: lastInputModality,
      task_def_version: '1.0'
    });
  }

  render();
}

// --------------------------------------------------------------------------
// C2: Coordination (3 coordinated placement rounds)
// --------------------------------------------------------------------------
function runC2Coordination(app, renderHeader, logEvent, onComplete) {
  let inTutorial = true;
  let currentRound = 0;
  let chosenSlot = null;
  let lastInputModality = 'mouse';

  const rounds = [
    {
      stimulus_id: 'C2_R1',
      title: 'Round 1: Open Wall Space',
      partner_desc: 'Partner hung their painting on the top left corner.',
      slots: [
        { id: 'SLOT_NORTH_RIGHT', label: 'Top Right (Even Spacing)' },
        { id: 'SLOT_OVERLAP_LEFT', label: 'Next to Partner (Tight Cluster)' },
        { id: 'SLOT_BOTTOM_CENTER', label: 'Bottom Center (Center Spot)' }
      ]
    },
    {
      stimulus_id: 'C2_R2',
      title: 'Round 2: Keep Hallway Clear',
      partner_desc: 'Partner is framing the center hallway. Keep the doorway path clear.',
      slots: [
        { id: 'SLOT_PERIMETER_EAST', label: 'East Wall (Keeps Path Open)' },
        { id: 'SLOT_CENTER_ADJACENT', label: 'Center Slot (Crowds the Hall)' },
        { id: 'SLOT_PERIMETER_WEST', label: 'West Wall (Keeps Path Open)' }
      ]
    },
    {
      stimulus_id: 'C2_R3',
      title: 'Round 3: Partner Moved Down',
      partner_desc: 'Partner moved their artwork down to the lower wall.',
      slots: [
        { id: 'SLOT_UPPER_GALLERY', label: 'Top Wall (Balances Both Sides)' },
        { id: 'SLOT_LOWER_CONGESTED', label: 'Lower Wall (Crowds Lower Wall)' },
        { id: 'SLOT_MID_SIDE', label: 'Side Niche (Side Corner)' }
      ]
    }
  ];

  function render() {
    if (inTutorial) {
      app.innerHTML = `
        <div class="candidate-content-protected max-w-2xl mx-auto">
          ${renderHeader('The Gallery Wall', 'Coordinate artwork placement with your partner.')}
          ${renderTutorialCard({
            icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"></path></svg>`,
            goal: 'Pick a hanging spot that leaves space for your partner.',
            steps: [
              'Check where your partner hung their piece in each round.',
              'Inspect the available hanging spots on the wall.',
              'Confirm your chosen position across all 3 rounds.'
            ]
          })}
        </div>
      `;
      bindTutorialCard(app, () => {
        inTutorial = false;
        currentRound = 0;
        chosenSlot = null;
        logRoundPresented();
        render();
      });
      return;
    }

    const r = rounds[currentRound];
    const activeSlot = r.slots.find(s => s.id === chosenSlot);

    app.innerHTML = `
      <div class="animate-soft-fade-in max-w-2xl mx-auto">
        <!-- TOP BAR -->
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3 pb-2 border-b border-[var(--grid-border)]">
          <div class="flex items-center gap-2">
            <span class="act-badge">World 3: The Shared Canvas</span>
            <span class="text-xs text-[var(--text-secondary)] font-sans">Part 2 of 3 &middot; Round ${currentRound + 1} of 3</span>
          </div>
          <div class="text-[11px] text-[var(--accent-gold)] font-sans font-medium">Takes about 1 minute</div>
        </div>

        <!-- TASK HEADER -->
        <div class="mb-4">
          <h2 class="text-xl sm:text-2xl font-serif text-[var(--text-primary)]">The Gallery Wall</h2>
          <p class="text-xs text-[var(--text-secondary)] mt-0.5">Coordinate artwork placement with your partner.</p>
        </div>

        <!-- YOUR TASK -->
        <div class="p-3 sm:p-4 bg-amber-50/70 border border-[var(--accent-gold)]/40 rounded-xs mb-4 candidate-content-protected">
          <div class="text-[10px] uppercase tracking-wider font-sans text-[var(--accent-gold)] font-semibold mb-1">Your Task</div>
          <div class="text-xs text-[var(--text-primary)] leading-relaxed">
            Check your partner's position. Choose an open spot that balances the wall.
          </div>
        </div>

        <!-- LOOK AT THIS -->
        <div class="p-3.5 bg-white border border-[var(--grid-border)] rounded-xs mb-4 shadow-xs candidate-content-protected flex items-center justify-between">
          <span class="text-xs font-serif text-[var(--text-primary)]">
            <strong>${r.title}:</strong> ${r.partner_desc}
          </span>
          <span class="text-[10px] uppercase tracking-wider text-[var(--accent-gold)] font-medium">Round ${currentRound + 1} of 3</span>
        </div>

        <!-- INTERACTION AREA -->
        <div class="p-5 bg-[#faf8f5] border border-[var(--grid-border)] mb-4 rounded-xs shadow-xs candidate-content-protected">
          <div class="text-[10px] text-[var(--text-secondary)] font-sans uppercase tracking-wider mb-2.5">Available Wall Placement Slots:</div>
          <div class="flex flex-col gap-2.5">
            ${r.slots.map(s => `
              <button type="button" class="slot-btn px-4 py-3 text-xs border rounded-xs ${chosenSlot === s.id ? 'border-[var(--accent-gold)] bg-amber-50/70 font-semibold shadow-xs' : 'border-[var(--grid-border)] bg-white hover:border-[var(--accent-gold)]'} transition flex items-center justify-between min-h-[48px]" data-slot="${s.id}" tabindex="0">
                <span class="flex items-center gap-2">
                  <span class="w-3.5 h-3.5 rounded-full border border-current flex items-center justify-center text-[9px] ${chosenSlot === s.id ? 'bg-[var(--accent-gold)] text-white' : 'text-stone-400'}">${chosenSlot === s.id ? '✓' : ''}</span>
                  <span class="text-[var(--text-primary)]">${s.label}</span>
                </span>
                <span class="text-[10px] text-[var(--accent-gold)] font-medium uppercase">Slot ${s.id.replace('SLOT_', '')}</span>
              </button>
            `).join('')}
          </div>
        </div>

        <!-- YOUR CHOICE -->
        <div class="p-3 bg-white border border-[var(--grid-border)] rounded-xs mb-4 text-xs font-sans text-[var(--text-secondary)] flex justify-between items-center">
          <span>${chosenSlot ? `You selected: <strong class="text-[var(--text-primary)]">${activeSlot?.label}</strong>` : 'Select a spot above to continue.'}</span>
          <span class="text-[10px] text-stone-400 font-sans">Round ${currentRound + 1} of 3</span>
        </div>

        <!-- PRIMARY ACTION BUTTON -->
        <div class="flex justify-end">
          <button type="button" id="confirmWallBtn" ${chosenSlot ? '' : 'disabled'} class="w-full sm:w-auto px-7 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] disabled:opacity-40 transition shadow-sm rounded-xs min-h-[44px]">
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
  let selectedFault = null;
  let selectedRepair = null;
  let lastInputModality = 'mouse';

  const opportunities = [
    {
      stimulus_id: 'C3_R1',
      title: 'Opportunity 1: Partner Lantern is Dark',
      partner_state: 'Your partner\'s lantern turned dark during setup.',
      condition_type: 'identify_and_repair',
      fault_options: [
        { id: 'fault_conduit_disconnected', label: 'The wire came loose at the connector' },
        { id: 'fault_bulb_broken', label: 'The glass bulb is broken' },
        { id: 'fault_switch_off', label: 'The main hall switch is off' }
      ],
      repair_options: [
        { id: 'adjust_conduit', label: 'Reconnect the loose wire and tighten the clamp' },
        { id: 'call_help_desk', label: 'Call the main help desk' },
        { id: 'replace_lantern', label: 'Take down the entire lamp' }
      ],
      execution_action: 'restore_power'
    },
    {
      stimulus_id: 'C3_R2',
      title: 'Opportunity 2: Hanging Rope Stuck',
      partner_state: 'The hanging rope got caught in the wheel bracket.',
      condition_type: 'identify_and_repair',
      fault_options: [
        { id: 'fault_cable_pulley_pinch', label: 'Rope is pinched between wheel and metal frame' },
        { id: 'fault_cable_snapped', label: 'The rope snapped completely' },
        { id: 'fault_wall_anchor_loose', label: 'The wall hook is loose' }
      ],
      repair_options: [
        { id: 'reseat_pulley_cable', label: 'Loosen the lever and place the rope back on the wheel' },
        { id: 'call_facility_maintenance', label: 'File a general repair request' },
        { id: 'force_pull_cable', label: 'Pull the rope down hard' }
      ],
      execution_action: 'align_panel_height'
    },
    {
      stimulus_id: 'C3_R3',
      title: 'Opportunity 3: Shadow Blocks Artwork',
      partner_state: 'A movable wooden screen casts a dark shadow over your partner\'s painting.',
      condition_type: 'identify_and_repair',
      fault_options: [
        { id: 'fault_blindspot_obstruction', label: 'Wooden screen blocks the spotlight beam' },
        { id: 'fault_color_distortion', label: 'The light color looks wrong' }
      ],
      repair_options: [
        { id: 'shift_lantern', label: 'Turn the spotlight slightly to shine around the screen' },
        { id: 'generic_complaint', label: 'Submit a general lighting complaint' }
      ],
      execution_action: 'illuminate_path'
    }
  ];

  function render() {
    if (inTutorial) {
      app.innerHTML = `
        <div class="candidate-content-protected max-w-2xl mx-auto">
          ${renderHeader('The Dual Lanterns', 'Resolve studio breakdowns to keep the hall ready.')}
          ${renderTutorialCard({
            icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>`,
            goal: 'Find the work issue, pick a fix, and repair it together.',
            steps: [
              'Examine the situation described in each round.',
              'Identify the issue from the list.',
              'Choose a helpful fix and apply the repair.'
            ]
          })}
        </div>
      `;
      bindTutorialCard(app, () => {
        inTutorial = false;
        currentOpportunity = 0;
        selectedFault = null;
        selectedRepair = null;
        logRepairPresented();
        render();
      });
      return;
    }

    const opp = opportunities[currentOpportunity];
    const activeFault = opp.fault_options.find(f => f.id === selectedFault);
    const activeRepair = opp.repair_options.find(r => r.id === selectedRepair);

    app.innerHTML = `
      <div class="animate-soft-fade-in max-w-2xl mx-auto">
        <!-- TOP BAR -->
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3 pb-2 border-b border-[var(--grid-border)]">
          <div class="flex items-center gap-2">
            <span class="act-badge">World 3: The Shared Canvas</span>
            <span class="text-xs text-[var(--text-secondary)] font-sans">Part 3 of 3 &middot; Problem ${currentOpportunity + 1} of 3</span>
          </div>
          <div class="text-[11px] text-[var(--accent-gold)] font-sans font-medium">Takes about 1 minute</div>
        </div>

        <!-- TASK HEADER -->
        <div class="mb-4">
          <h2 class="text-xl sm:text-2xl font-serif text-[var(--text-primary)]">The Dual Lanterns</h2>
          <p class="text-xs text-[var(--text-secondary)] mt-0.5">Resolve studio issues to keep exhibition work moving.</p>
        </div>

        <!-- YOUR TASK -->
        <div class="p-3 sm:p-4 bg-amber-50/70 border border-[var(--accent-gold)]/40 rounded-xs mb-4 candidate-content-protected">
          <div class="text-[10px] uppercase tracking-wider font-sans text-[var(--accent-gold)] font-semibold mb-1">Your Task</div>
          <div class="text-xs text-[var(--text-primary)] leading-relaxed">
            Step 1: Identify what went wrong. Step 2: Choose how to fix it.
          </div>
        </div>

        <!-- LOOK AT THIS -->
        <div class="p-3.5 bg-white border border-[var(--grid-border)] rounded-xs mb-4 shadow-xs candidate-content-protected flex items-center justify-between">
          <span class="text-xs font-serif text-[var(--text-primary)]">
            <strong>${opp.title}:</strong> ${opp.partner_state}
          </span>
          <span class="text-[10px] uppercase tracking-wider text-[var(--accent-gold)] font-medium">Stage ${currentOpportunity + 1} of 3</span>
        </div>

        <!-- INTERACTION AREA -->
        <div class="p-5 bg-[#faf8f5] border border-[var(--grid-border)] mb-4 rounded-xs shadow-xs candidate-content-protected">
          <!-- Step 1: Identify Breakdown -->
          <div class="mb-4">
            <div class="text-xs font-semibold uppercase tracking-wider text-[var(--text-primary)] mb-2 font-sans">
              Step 1: What is the issue?
            </div>
            <div class="space-y-2">
              ${opp.fault_options.map(f => `
                <div class="fault-opt p-3 bg-white border ${selectedFault === f.id ? 'border-[var(--accent-gold)] bg-amber-50/70 shadow-xs font-medium' : 'border-[var(--grid-border)] hover:border-[var(--accent-gold)]'} rounded-xs cursor-pointer transition text-xs flex items-center gap-2 min-h-[44px]" data-fault="${f.id}" tabindex="0" role="button">
                  <span class="w-3.5 h-3.5 rounded-full border border-current flex items-center justify-center text-[8px] ${selectedFault === f.id ? 'bg-[var(--accent-gold)] text-white' : 'text-stone-300'}">${selectedFault === f.id ? '✓' : ''}</span>
                  <span class="text-[var(--text-primary)]">${f.label}</span>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Step 2: Perform Constructive Repair -->
          ${selectedFault ? `
            <div class="pt-4 border-t border-[var(--grid-border)] animate-soft-fade-in">
              <div class="text-xs font-semibold uppercase tracking-wider text-[var(--text-primary)] mb-2 font-sans">
                Step 2: Choose a constructive fix:
              </div>
              <div class="space-y-2">
                ${opp.repair_options.map(r => `
                  <div class="repair-opt p-3 bg-white border ${selectedRepair === r.id ? 'border-[var(--accent-gold)] bg-amber-50/70 shadow-xs font-medium' : 'border-[var(--grid-border)] hover:border-[var(--accent-gold)]'} rounded-xs cursor-pointer transition text-xs flex items-center gap-2 min-h-[44px]" data-repair="${r.id}" tabindex="0" role="button">
                    <span class="w-3.5 h-3.5 rounded-full border border-current flex items-center justify-center text-[8px] ${selectedRepair === r.id ? 'bg-[var(--accent-gold)] text-white' : 'text-stone-300'}">${selectedRepair === r.id ? '✓' : ''}</span>
                    <span class="text-[var(--text-primary)]">${r.label}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}
        </div>

        <!-- YOUR CHOICE -->
        <div class="p-3 bg-white border border-[var(--grid-border)] rounded-xs mb-4 text-xs font-sans text-[var(--text-secondary)] flex justify-between items-center">
          <span>${selectedFault && selectedRepair ? `Fix selected: <strong class="text-[var(--text-primary)]">${activeRepair?.label}</strong>` : (selectedFault ? 'Now choose a fix in Step 2.' : 'Select an issue in Step 1.')}</span>
          <span class="text-[10px] text-stone-400 font-sans">${currentOpportunity + 1} / 3</span>
        </div>

        <!-- PRIMARY ACTION BUTTON -->
        <div class="flex justify-end">
          <button type="button" id="executeRepairBtn" ${selectedFault && selectedRepair ? '' : 'disabled'} class="w-full sm:w-auto px-7 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] disabled:opacity-40 transition shadow-sm rounded-xs min-h-[44px]">
            ${currentOpportunity < 2 ? 'Apply Fix & Next Problem &rarr;' : 'Finish World 3 &rarr;'}
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
