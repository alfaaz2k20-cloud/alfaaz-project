/* ==========================================================================
   ALFAAZ RECRUIT — WORLD 3: THE SHARED CANVAS (COLLABORATIVE SPIRIT)
   Mini-games: C1 (Resource Sharing), C2 (Wall Coordination), C3 (Lighting Balance)
   ========================================================================== */

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
// C1: Resource Sharing
// --------------------------------------------------------------------------
function runC1ResourceCooperation(app, renderHeader, logEvent, onComplete) {
  let sharedTiles = 3;

  function render() {
    app.innerHTML = `
      <div>
        ${renderHeader('Task 1: Sharing Art Materials', 'You and your teammate are setting up a mosaic wall. Your teammate has 2 tiles. You have 8 tiles.')}

        <div class="p-6 bg-[#faf8f5] border border-[var(--grid-border)] mb-6">
          <div class="grid grid-cols-2 gap-4 text-center mb-6">
            <div class="p-3 bg-white border border-[var(--grid-border)]">
              <span class="text-[10px] text-[var(--text-secondary)] uppercase">Teammate Box</span>
              <div class="text-base font-serif font-semibold text-[#bd6f5d] mt-1">${2 + sharedTiles} Tiles</div>
              <div class="flex justify-center gap-1 mt-2">
                ${Array(2 + sharedTiles).fill('<div class="w-3 h-3 bg-[#bd6f5d]/60 rounded-xs"></div>').join('')}
              </div>
            </div>
            <div class="p-3 bg-white border border-[var(--grid-border)]">
              <span class="text-[10px] text-[var(--text-secondary)] uppercase">Your Box</span>
              <div class="text-base font-serif font-semibold text-emerald-800 mt-1">${8 - sharedTiles} Tiles</div>
              <div class="flex justify-center gap-1 mt-2">
                ${Array(8 - sharedTiles).fill('<div class="w-3 h-3 bg-emerald-700/60 rounded-xs"></div>').join('')}
              </div>
            </div>
          </div>

          <div class="text-center">
            <div class="text-xs text-[var(--text-secondary)] mb-2">Tiles to share with your teammate:</div>
            <div class="flex justify-center items-center gap-4">
              <button id="minusTileBtn" class="w-9 h-9 rounded bg-white border border-[var(--grid-border)] text-base font-bold hover:bg-amber-50">-</button>
              <span id="transferCount" class="font-serif text-2xl font-semibold text-[var(--accent-gold)] w-8">${sharedTiles}</span>
              <button id="plusTileBtn" class="w-9 h-9 rounded bg-white border border-[var(--grid-border)] text-base font-bold hover:bg-amber-50">+</button>
            </div>
          </div>
        </div>

        <div class="flex justify-end">
          <button id="confirmTransferBtn" class="px-6 py-2.5 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition">
            Confirm Sharing &rarr;
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
// C2: Wall Coordination
// --------------------------------------------------------------------------
function runC2Coordination(app, renderHeader, logEvent, onComplete) {
  let chosenSlot = null;

  const wallSlots = [
    { id: 'SLOT_TOP', label: 'Top Center' },
    { id: 'SLOT_RIGHT', label: 'Right Side (Balanced)' },
    { id: 'SLOT_BOTTOM', label: 'Lower Right' }
  ];

  function render() {
    app.innerHTML = `
      <div>
        ${renderHeader('Task 2: Wall Coordination', 'Your teammate hung their painting on the left. Click a spot on the wall to place your piece.')}

        <!-- Interactive Gallery Wall Preview -->
        <div class="p-6 bg-[#faf8f5] border border-[var(--grid-border)] mb-6">
          <div class="w-full h-48 bg-white border border-[var(--grid-border)] relative flex items-center justify-between p-6">
            <!-- Teammate Painting -->
            <div class="w-28 h-32 bg-amber-100 border-2 border-[var(--accent-gold)] flex flex-col items-center justify-center p-2 text-center shadow-sm">
              <span class="text-[10px] uppercase font-bold text-[var(--accent-gold)]">Teammate Art</span>
              <span class="text-[9px] text-[var(--text-secondary)] mt-1">"Autumn Leaf"</span>
            </div>

            <!-- Wall Slot Buttons -->
            <div class="flex flex-col gap-2">
              ${wallSlots.map(s => `
                <button class="slot-btn px-4 py-2 text-xs border ${chosenSlot === s.id ? 'border-[var(--accent-gold)] bg-amber-50 font-semibold' : 'border-dashed border-[var(--grid-border)] bg-transparent hover:border-solid hover:border-[var(--text-primary)]'} transition" data-slot="${s.id}">
                  ${chosenSlot === s.id ? '&#10003; Your Art Placed Here' : `+ Hang at ${s.label}`}
                </button>
              `).join('')}
            </div>
          </div>
        </div>

        <div class="flex justify-end">
          <button id="confirmWallBtn" ${chosenSlot ? '' : 'disabled'} class="px-6 py-2.5 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] disabled:opacity-40 transition">
            Confirm Placement &rarr;
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
// C3: Lighting Balance
// --------------------------------------------------------------------------
function runC3CollaborationRepair(app, renderHeader, logEvent, onComplete) {
  let partnerLights = 5;
  let myLights = 5;

  function render() {
    app.innerHTML = `
      <div>
        ${renderHeader('Task 3: Shared Lighting Pool', 'The hall has 10 spotlight lamps. Adjust the slider to share lights between both display rooms.')}

        <div class="p-6 bg-[#faf8f5] border border-[var(--grid-border)] mb-6">
          <div class="grid grid-cols-2 gap-4 text-center mb-6">
            <div class="p-4 bg-white border border-[var(--grid-border)]">
              <span class="text-xs text-[var(--text-secondary)] uppercase font-medium">Room A (Partner)</span>
              <div class="text-xl font-serif font-bold text-[var(--accent-gold)] mt-1">${partnerLights} Lamps</div>
              <div class="flex justify-center gap-1 mt-2">
                ${Array(partnerLights).fill('<div class="w-3 h-3 bg-amber-400 rounded-full"></div>').join('')}
              </div>
            </div>
            <div class="p-4 bg-white border border-[var(--grid-border)]">
              <span class="text-xs text-[var(--text-secondary)] uppercase font-medium">Room B (You)</span>
              <div class="text-xl font-serif font-bold text-[var(--accent-gold)] mt-1">${myLights} Lamps</div>
              <div class="flex justify-center gap-1 mt-2">
                ${Array(myLights).fill('<div class="w-3 h-3 bg-amber-400 rounded-full"></div>').join('')}
              </div>
            </div>
          </div>

          <div class="w-full max-w-md mx-auto text-center">
            <input type="range" id="lightSlider" min="1" max="9" value="${partnerLights}" class="w-full accent-[#bd6f5d] cursor-pointer">
            <div class="flex justify-between text-[11px] text-[var(--text-secondary)] mt-1">
              <span>More to Partner</span>
              <span>Balanced (5 / 5)</span>
              <span>More to You</span>
            </div>
          </div>
        </div>

        <div class="flex justify-end">
          <button id="confirmLightBtn" class="px-6 py-2.5 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition">
            Finish &rarr;
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
