/* ==========================================================================
   ALFAAZ RECRUIT — WORLD 3: THE SHARED CANVAS (مشترکہ نقش)
   Mini-games: C1 (The Artisan's Basket), C2 (The Gallery Wall), C3 (The Dual Lanterns)
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
// C1: The Artisan's Basket
// --------------------------------------------------------------------------
function runC1ResourceCooperation(app, renderHeader, logEvent, onComplete) {
  let inTutorial = true;
  let sharedTiles = 3;

  function render() {
    if (inTutorial) {
      app.innerHTML = `
        <div>
          ${renderHeader("Part 1: The Artisan's Basket", 'Coordinating ceramic mosaic tiles with your workshop partner.')}
          ${renderTutorialCard({
            icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>`,
            goal: 'Distribute ceramic mosaic tiles between your station and your partner’s workbench.',
            steps: [
              'Check your starting tile basket (8 tiles) and your partner’s supply (2 tiles).',
              'Use the + / - buttons to transfer tiles to the shared basket.',
              'Confirm your distribution when you are satisfied.'
            ]
          })}
        </div>
      `;
      document.getElementById('startActivityBtn')?.addEventListener('click', () => {
        inTutorial = false;
        render();
      });
      return;
    }

    app.innerHTML = `
      <div class="animate-fadeIn">
        ${renderHeader("Part 1: The Artisan's Basket", 'You have 8 mosaic tiles; your partner has 2. Choose how many to place into their basket.')}

        <div class="p-6 bg-[#faf8f5] border border-[var(--grid-border)] mb-6 shadow-xs">
          <div class="grid grid-cols-2 gap-4 text-center mb-6">
            <div class="p-4 bg-white border border-[var(--grid-border)] shadow-xs rounded-xs">
              <span class="text-[10px] text-[var(--accent-gold)] uppercase font-semibold tracking-wider">Partner Basket</span>
              <div class="text-xl font-serif font-semibold text-[#bd6f5d] mt-1">${2 + sharedTiles} Ceramic Tiles</div>
              <div class="flex justify-center gap-1.5 mt-3 flex-wrap max-w-[140px] mx-auto">
                ${Array(2 + sharedTiles).fill('<div class="w-4 h-4 bg-[#bd6f5d]/70 rounded-xs shadow-xs transition-transform hover:scale-110"></div>').join('')}
              </div>
            </div>
            <div class="p-4 bg-white border border-[var(--grid-border)] shadow-xs rounded-xs">
              <span class="text-[10px] text-emerald-700 uppercase font-semibold tracking-wider">Your Basket</span>
              <div class="text-xl font-serif font-semibold text-emerald-800 mt-1">${8 - sharedTiles} Ceramic Tiles</div>
              <div class="flex justify-center gap-1.5 mt-3 flex-wrap max-w-[140px] mx-auto">
                ${Array(8 - sharedTiles).fill('<div class="w-4 h-4 bg-emerald-700/70 rounded-xs shadow-xs transition-transform hover:scale-110"></div>').join('')}
              </div>
            </div>
          </div>

          <div class="text-center pt-2 border-t border-[var(--grid-border)]">
            <div class="text-xs text-[var(--text-secondary)] mb-3 font-medium">Tiles transferred to partner's workstation:</div>
            <div class="flex justify-center items-center gap-4">
              <button id="minusTileBtn" class="w-10 h-10 rounded bg-white border border-[var(--grid-border)] text-lg font-bold hover:border-[var(--accent-gold)] hover:bg-amber-50 active:scale-95 transition shadow-xs">-</button>
              <span id="transferCount" class="font-serif text-3xl font-semibold text-[var(--accent-gold)] w-10 text-center">${sharedTiles}</span>
              <button id="plusTileBtn" class="w-10 h-10 rounded bg-white border border-[var(--grid-border)] text-lg font-bold hover:border-[var(--accent-gold)] hover:bg-amber-50 active:scale-95 transition shadow-xs">+</button>
            </div>
          </div>
        </div>

        <div class="flex justify-end">
          <button id="confirmTransferBtn" class="px-7 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition shadow-sm">
            Confirm Basket Sharing &rarr;
          </button>
        </div>
      </div>
    `;

    document.getElementById('minusTileBtn')?.addEventListener('click', () => {
      if (sharedTiles > 0) {
        sharedTiles--;
        render();
      }
    });

    document.getElementById('plusTileBtn')?.addEventListener('click', () => {
      if (sharedTiles < 6) {
        sharedTiles++;
        render();
      }
    });

    document.getElementById('confirmTransferBtn')?.addEventListener('click', () => {
      logEvent('resource_transfer_confirmed', { shared_amount: sharedTiles });
      onComplete({
        mini_game: 'C1',
        observations_count: 1,
        sharing_index: sharedTiles / 6.0
      });
    });
  }

  render();
}

// --------------------------------------------------------------------------
// C2: The Gallery Wall
// --------------------------------------------------------------------------
function runC2Coordination(app, renderHeader, logEvent, onComplete) {
  let inTutorial = true;
  let chosenSlot = null;

  const wallSlots = [
    { id: 'SLOT_TOP', label: 'Upper Center Slot' },
    { id: 'SLOT_RIGHT', label: 'Right Center Slot (Even Spacing)' },
    { id: 'SLOT_BOTTOM', label: 'Lower Right Corner' }
  ];

  function render() {
    if (inTutorial) {
      app.innerHTML = `
        <div>
          ${renderHeader('Part 2: The Gallery Wall', 'Coordinating artwork spacing across the central exhibition wall.')}
          ${renderTutorialCard({
            icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"></path></svg>`,
            goal: 'Select a placement slot on the wall that balances with your colleague’s hung piece.',
            steps: [
              'Observe the position of the existing painting on the left wall.',
              'Inspect the 3 available wall hanging slots.',
              'Click on your preferred wall slot and confirm placement.'
            ]
          })}
        </div>
      `;
      document.getElementById('startActivityBtn')?.addEventListener('click', () => {
        inTutorial = false;
        render();
      });
      return;
    }

    app.innerHTML = `
      <div class="animate-fadeIn">
        ${renderHeader('Part 2: The Gallery Wall', 'Your partner hung their artwork on the left wall. Choose a slot for your piece.')}

        <div class="p-6 bg-[#faf8f5] border border-[var(--grid-border)] mb-6 shadow-xs">
          <div class="w-full h-52 bg-white border border-[var(--grid-border)] relative flex items-center justify-between p-6 rounded-xs shadow-inner">
            <!-- Partner Artwork -->
            <div class="w-32 h-36 bg-amber-50 border-2 border-[var(--accent-gold)] flex flex-col items-center justify-center p-3 text-center shadow-xs">
              <svg class="w-6 h-6 text-[var(--accent-gold)] mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
              <span class="text-[10px] uppercase font-bold text-[var(--accent-gold)]">Partner Painting</span>
              <span class="text-[9px] text-[var(--text-secondary)] italic mt-0.5">"Chinar at Twilight"</span>
            </div>

            <!-- Wall Slot Options -->
            <div class="flex flex-col gap-2.5">
              ${wallSlots.map(s => `
                <button class="slot-btn px-4 py-2.5 text-xs border ${chosenSlot === s.id ? 'border-[var(--accent-gold)] bg-amber-50 font-semibold shadow-xs' : 'border-dashed border-[var(--grid-border)] bg-transparent hover:border-solid hover:border-[var(--text-primary)]'} transition flex items-center gap-2" data-slot="${s.id}">
                  <span class="w-3 h-3 rounded-full border border-current flex items-center justify-center text-[8px]">${chosenSlot === s.id ? '✓' : '+'}</span>
                  ${chosenSlot === s.id ? `Your Art Positioned: ${s.label}` : `Hang at ${s.label}`}
                </button>
              `).join('')}
            </div>
          </div>
        </div>

        <div class="flex justify-end">
          <button id="confirmWallBtn" ${chosenSlot ? '' : 'disabled'} class="px-7 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] disabled:opacity-40 transition shadow-sm">
            Confirm Wall Placement &rarr;
          </button>
        </div>
      </div>
    `;

    app.querySelectorAll('.slot-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        chosenSlot = btn.getAttribute('data-slot');
        logEvent('wall_slot_selected', { slot: chosenSlot });
        render();
      });
    });

    document.getElementById('confirmWallBtn')?.addEventListener('click', () => {
      logEvent('wall_coordination_complete', { chosen_slot: chosenSlot });
      onComplete({
        mini_game: 'C2',
        observations_count: 1,
        slot: chosenSlot
      });
    });
  }

  render();
}

// --------------------------------------------------------------------------
// C3: The Dual Lanterns
// --------------------------------------------------------------------------
function runC3CollaborationRepair(app, renderHeader, logEvent, onComplete) {
  let inTutorial = true;
  let partnerLights = 5;
  let myLights = 5;

  function render() {
    if (inTutorial) {
      app.innerHTML = `
        <div>
          ${renderHeader('Part 3: The Dual Lanterns', 'Sharing spotlight lanterns between both exhibition pavilions.')}
          ${renderTutorialCard({
            icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>`,
            goal: 'Balance the 10 available warm spotlight lanterns between Gallery Room A and Room B.',
            steps: [
              'Review the current lighting allotment across both halls.',
              'Slide the balance bar to assign spotlights where needed.',
              'Click Finish to confirm the lighting arrangement.'
            ]
          })}
        </div>
      `;
      document.getElementById('startActivityBtn')?.addEventListener('click', () => {
        inTutorial = false;
        render();
      });
      return;
    }

    app.innerHTML = `
      <div class="animate-fadeIn">
        ${renderHeader('Part 3: The Dual Lanterns', '10 spotlight lanterns are shared between Room A and Room B. Adjust the balance.')}

        <div class="p-6 bg-[#faf8f5] border border-[var(--grid-border)] mb-6 shadow-xs">
          <div class="grid grid-cols-2 gap-4 text-center mb-6">
            <div class="p-4 bg-white border border-[var(--grid-border)] shadow-xs rounded-xs">
              <span class="text-xs text-[var(--text-secondary)] uppercase font-semibold tracking-wider">Room A (Partner Gallery)</span>
              <div class="text-2xl font-serif font-bold text-[var(--accent-gold)] mt-1">${partnerLights} Lanterns</div>
              <div class="flex justify-center gap-1.5 mt-3 flex-wrap">
                ${Array(partnerLights).fill('<div class="w-3.5 h-3.5 bg-amber-400 rounded-full shadow-xs"></div>').join('')}
              </div>
            </div>
            <div class="p-4 bg-white border border-[var(--grid-border)] shadow-xs rounded-xs">
              <span class="text-xs text-[var(--text-secondary)] uppercase font-semibold tracking-wider">Room B (Your Gallery)</span>
              <div class="text-2xl font-serif font-bold text-[var(--accent-gold)] mt-1">${myLights} Lanterns</div>
              <div class="flex justify-center gap-1.5 mt-3 flex-wrap">
                ${Array(myLights).fill('<div class="w-3.5 h-3.5 bg-amber-400 rounded-full shadow-xs"></div>').join('')}
              </div>
            </div>
          </div>

          <div class="w-full max-w-md mx-auto text-center pt-2">
            <input type="range" id="lightSlider" min="1" max="9" value="${partnerLights}" class="w-full accent-[#bd6f5d] cursor-pointer h-2 bg-stone-200 rounded-lg">
            <div class="flex justify-between text-[11px] text-[var(--text-secondary)] mt-2 font-medium">
              <span>More to Room A</span>
              <span class="text-[var(--accent-gold)] font-semibold">Equal Balance (5 / 5)</span>
              <span>More to Room B</span>
            </div>
          </div>
        </div>

        <div class="flex justify-end">
          <button id="confirmLightBtn" class="px-7 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition shadow-sm">
            Lock Lantern Arrangement &rarr;
          </button>
        </div>
      </div>
    `;

    document.getElementById('lightSlider')?.addEventListener('input', (e) => {
      partnerLights = parseInt(e.target.value);
      myLights = 10 - partnerLights;
      render();
    });

    document.getElementById('confirmLightBtn')?.addEventListener('click', () => {
      logEvent('light_balance_confirmed', { partner_lights: partnerLights, my_lights: myLights });
      onComplete({
        mini_game: 'C3',
        observations_count: 1,
        partner_lights: partnerLights,
        my_lights: myLights
      });
    });
  }

  render();
}

