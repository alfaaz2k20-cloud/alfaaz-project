/* ==========================================================================
   ALFAAZ RECRUIT — WORLD 6: THE BROKEN TOOL (CREATIVE INITIATIVE)
   Mini-games: CR1 (Open Construction), CR2 (Constraint Shift), CR3 (Unspecified Tool Use)
   ========================================================================== */

export function runTheBrokenTool(context, renderHeader) {
  const { appContainer, miniGameIndex, logEvent, onMiniGameComplete } = context;

  switch (miniGameIndex) {
    case 0:
      runCR1OpenConstruction(appContainer, renderHeader, logEvent, onMiniGameComplete);
      break;
    case 1:
      runCR2ConstraintShift(appContainer, renderHeader, logEvent, onMiniGameComplete);
      break;
    case 2:
      runCR3UnspecifiedToolUse(appContainer, renderHeader, logEvent, onMiniGameComplete);
      break;
  }
}

// --------------------------------------------------------------------------
// CR1: Open Construction
// --------------------------------------------------------------------------
function runCR1OpenConstruction(app, renderHeader, logEvent, onComplete) {
  let placedBlocks = [];

  function render() {
    app.innerHTML = `
      <div>
        ${renderHeader('CR1: Open Bridge Assembly', 'Assemble an asymmetric architectural cantilever to bridge the structural span.')}

        <div class="h-40 bg-[#faf8f5] border border-[var(--grid-border)] mb-6 flex items-center justify-center relative">
          <div class="absolute left-8 bottom-0 w-24 h-16 bg-[#2d312e]"></div>
          <div class="absolute right-8 bottom-0 w-24 h-16 bg-[#2d312e]"></div>
          <div class="text-xs text-[var(--text-secondary)]">
            Span Status: ${placedBlocks.length >= 2 ? '<span class="text-emerald-700 font-medium">Span Connected</span>' : 'Unbridged Gap'}
          </div>
        </div>

        <div class="grid grid-cols-3 gap-3 mb-6">
          <button class="block-btn p-3 bg-white border border-[var(--grid-border)] text-xs hover:border-[var(--accent-gold)]" data-block="Arch Truss">
            + Place Arch Truss
          </button>
          <button class="block-btn p-3 bg-white border border-[var(--grid-border)] text-xs hover:border-[var(--accent-gold)]" data-block="Counterweight Wedge">
            + Place Counterweight
          </button>
          <button class="block-btn p-3 bg-white border border-[var(--grid-border)] text-xs hover:border-[var(--accent-gold)]" data-block="Tension Cable">
            + Place Tension Cable
          </button>
        </div>

        <div class="flex justify-between items-center">
          <span class="text-xs text-[var(--text-secondary)]">${placedBlocks.length} structural elements placed</span>
          <button id="testStructureBtn" ${placedBlocks.length >= 2 ? '' : 'disabled'} class="px-6 py-2 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] disabled:opacity-40 transition">
            Test Load Stability &rarr;
          </button>
        </div>
      </div>
    `;

    logEvent('construction_state_rendered', { blocks_placed: placedBlocks.length });

    app.querySelectorAll('.block-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const bType = btn.getAttribute('data-block');
        placedBlocks.push(bType);
        logEvent('element_placed', { block: bType });
        render();
      });
    });

    document.getElementById('testStructureBtn')?.addEventListener('click', () => {
      logEvent('structure_tested', { total_elements: placedBlocks.length });
      onComplete({
        mini_game: 'CR1',
        observations_count: 1,
        uniqueness_index: 0.85
      });
    });
  }

  render();
}

// --------------------------------------------------------------------------
// CR2: Constraint Shift
// --------------------------------------------------------------------------
function runCR2ConstraintShift(app, renderHeader, logEvent, onComplete) {
  let isDepleted = false;

  function render() {
    app.innerHTML = `
      <div>
        ${renderHeader('CR2: Material Pivot', 'Adapt structural strategy when primary fastener supply is depleted.')}

        <div class="p-6 bg-[#faf8f5] border border-[var(--grid-border)] mb-6 text-center">
          ${isDepleted ? `
            <div class="p-3 bg-amber-50 border border-amber-200 text-xs text-[#bd6f5d] font-medium mb-3">
              Notice: Primary Joint Fasteners Exhausted. Pivot to interlocking friction joints.
            </div>
            <button id="pivotActionBtn" class="px-6 py-2.5 bg-[var(--accent-gold)] text-white text-xs uppercase tracking-widest hover:opacity-90 transition">
              Deploy Interlocking Friction Joints &rarr;
            </button>
          ` : `
            <p class="text-xs text-[var(--text-secondary)] mb-4">Fastening main truss beam...</p>
            <button id="fastenBeamBtn" class="px-6 py-2 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition">
              Apply Standard Fastener
            </button>
          `}
        </div>
      </div>
    `;

    document.getElementById('fastenBeamBtn')?.addEventListener('click', () => {
      isDepleted = true;
      logEvent('primary_tool_depleted');
      render();
    });

    document.getElementById('pivotActionBtn')?.addEventListener('click', () => {
      logEvent('creative_pivot_succeeded');
      onComplete({
        mini_game: 'CR2',
        observations_count: 1,
        pivot_latency_ms: 1400.0
      });
    });
  }

  render();
}

// --------------------------------------------------------------------------
// CR3: Unspecified Tool Use
// --------------------------------------------------------------------------
function runCR3UnspecifiedToolUse(app, renderHeader, logEvent, onComplete) {
  app.innerHTML = `
    <div>
      ${renderHeader('CR3: Affordance Transfer', 'Re-purpose standard archival tools to stabilize an uncalibrated optical balance.')}

      <div class="p-6 bg-[#faf8f5] border border-[var(--grid-border)] mb-6 text-center">
        <p class="text-xs text-[var(--text-secondary)] mb-3">Objective: Level the optical projection plane without a standard spirit level.</p>
        <div class="grid grid-cols-3 gap-3">
          <button class="tool-btn p-3 bg-white border border-[var(--grid-border)] text-xs hover:border-[var(--accent-gold)]" data-tool="Water Droplet Pipette">
            Use Pipette (Surface Tension Level)
          </button>
          <button class="tool-btn p-3 bg-white border border-[var(--grid-border)] text-xs hover:border-[var(--accent-gold)]" data-tool="Brass Bookmark">
            Use Bookmark (Cantilever Shorter)
          </button>
          <button class="tool-btn p-3 bg-white border border-[var(--grid-border)] text-xs hover:border-[var(--accent-gold)]" data-tool="Linen Ribbon">
            Use Ribbon (Plumb Line)
          </button>
        </div>
      </div>
    </div>
  `;

  app.querySelectorAll('.tool-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const tool = btn.getAttribute('data-tool');
      logEvent('unconventional_tool_selected', { tool });
      onComplete({
        mini_game: 'CR3',
        observations_count: 1,
        affordance_transfer: 1.0
      });
    });
  });
}
