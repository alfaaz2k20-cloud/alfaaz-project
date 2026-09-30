/* ==========================================================================
   ALFAAZ RECRUIT — WORLD 3: THE SHARED CANVAS (COLLABORATIVE SPIRIT)
   Mini-games: C1 (Resource Cooperation), C2 (Coordination), C3 (Collaboration Repair)
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
// C1: Resource Cooperation
// --------------------------------------------------------------------------
function runC1ResourceCooperation(app, renderHeader, logEvent, onComplete) {
  let sharedTiles = 0;

  app.innerHTML = `
    <div>
      ${renderHeader('C1: Mosaic Allocation', 'Collaborate on a joint mosaic mural. Your partner holds 2 tiles; you hold 8 surplus tiles.')}

      <div class="p-6 bg-[#faf8f5] border border-[var(--grid-border)] mb-6 text-center">
        <p class="text-xs text-[var(--text-secondary)] mb-1">Partner Resource Reserve: <strong class="text-[#bd6f5d]">Low (2 Tiles)</strong></p>
        <p class="text-xs text-[var(--text-secondary)] mb-4">Your Resource Reserve: <strong class="text-emerald-800">Surplus (8 Tiles)</strong></p>

        <div class="flex justify-center items-center gap-4">
          <button id="minusTileBtn" class="w-8 h-8 rounded border border-[var(--grid-border)] bg-white">-</button>
          <span id="transferCount" class="font-serif text-lg font-semibold text-[var(--accent-gold)]">0</span>
          <button id="plusTileBtn" class="w-8 h-8 rounded border border-[var(--grid-border)] bg-white">+</button>
        </div>
        <p class="text-[10px] text-[var(--text-secondary)] mt-2">Tiles to transfer into shared pool</p>
      </div>

      <div class="flex justify-end">
        <button id="confirmTransferBtn" class="px-6 py-2 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition">
          Confirm Allocation &rarr;
        </button>
      </div>
    </div>
  `;

  const countDisplay = document.getElementById('transferCount');
  document.getElementById('minusTileBtn')?.addEventListener('click', () => {
    if (sharedTiles > 0) {
      sharedTiles--;
      if (countDisplay) countDisplay.textContent = sharedTiles;
    }
  });
  document.getElementById('plusTileBtn')?.addEventListener('click', () => {
    if (sharedTiles < 6) {
      sharedTiles++;
      if (countDisplay) countDisplay.textContent = sharedTiles;
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

// --------------------------------------------------------------------------
// C2: Coordination
// --------------------------------------------------------------------------
function runC2Coordination(app, renderHeader, logEvent, onComplete) {
  app.innerHTML = `
    <div>
      ${renderHeader('C2: Synchronous Stroke Pacing', 'Blend border gradients in harmony with your simulated partner.')}

      <div class="p-6 bg-[#faf8f5] border border-[var(--grid-border)] mb-6 text-center">
        <p class="text-xs text-[var(--text-secondary)] mb-2">Partner Stroke Rhythm: Steady 1.5s Intervals</p>
        <div class="w-full h-12 bg-white border border-[var(--grid-border)] flex items-center justify-center">
          <span class="text-xs text-[var(--accent-gold)] tracking-widest">STROKE HARMONY ACTIVE</span>
        </div>
      </div>

      <div class="flex justify-center">
        <button id="coordinateStrokeBtn" class="px-6 py-2.5 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition">
          Apply Harmonized Brush Stroke &rarr;
        </button>
      </div>
    </div>
  `;

  document.getElementById('coordinateStrokeBtn')?.addEventListener('click', () => {
    logEvent('coordinated_stroke_applied');
    onComplete({
      mini_game: 'C2',
      observations_count: 1,
      collision_avoidance_rate: 0.95
    });
  });
}

// --------------------------------------------------------------------------
// C3: Collaboration Repair
// --------------------------------------------------------------------------
function runC3CollaborationRepair(app, renderHeader, logEvent, onComplete) {
  app.innerHTML = `
    <div>
      ${renderHeader('C3: Alignment Repair', 'Resolve an unintended motif discrepancy in the collective artwork.')}

      <div class="p-6 bg-[#faf8f5] border border-[var(--grid-border)] mb-6 text-center">
        <p class="text-xs text-[var(--text-secondary)] mb-3">Notice: Partner inadvertently placed terracotta tiles across a sage border.</p>
        <div class="grid grid-cols-3 gap-3">
          <button class="repair-btn p-3 bg-white border border-[var(--grid-border)] text-xs hover:border-[var(--accent-gold)]" data-strategy="harmonize">
            1. Harmonize Border (Integrate Motif)
          </button>
          <button class="repair-btn p-3 bg-white border border-[var(--grid-border)] text-xs hover:border-[var(--accent-gold)]" data-strategy="realign">
            2. Re-tile Jointly
          </button>
          <button class="repair-btn p-3 bg-white border border-[var(--grid-border)] text-xs hover:border-[var(--accent-gold)]" data-strategy="isolate">
            3. Isolate Section
          </button>
        </div>
      </div>
    </div>
  `;

  app.querySelectorAll('.repair-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const strategy = btn.getAttribute('data-strategy');
      logEvent('repair_strategy_selected', { strategy });
      onComplete({
        mini_game: 'C3',
        observations_count: 1,
        constructive_repair_score: strategy === 'harmonize' ? 1.0 : (strategy === 'realign' ? 0.75 : 0.4)
      });
    });
  });
}
