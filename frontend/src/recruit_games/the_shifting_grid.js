/* ==========================================================================
   ALFAAZ RECRUIT — WORLD 4: THE SHIFTING GRID (EMOTIONAL AGILITY)
   Mini-games: E1 (Rule Shift), E2 (Setback Recovery), E3 (Changing Conditions)
   ========================================================================== */

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
// E1: Rule Shift (Wisconsin Card Sort Analog)
// --------------------------------------------------------------------------
function runE1RuleShift(app, renderHeader, logEvent, onComplete) {
  const symbols = [
    { color: 'gold', shape: 'circle', symbol: 'alpha', label: 'Golden Sun' },
    { color: 'green', shape: 'square', symbol: 'beta', label: 'Sage Cube' },
    { color: 'gold', shape: 'square', symbol: 'alpha', label: 'Golden Cube' },
    { color: 'green', shape: 'circle', symbol: 'beta', label: 'Sage Sun' },
    { color: 'gold', shape: 'circle', symbol: 'beta', label: 'Golden Crest' },
    { color: 'green', shape: 'square', symbol: 'alpha', label: 'Sage Glyph' },
    // Repeat sequence for set-shifting
    { color: 'gold', shape: 'square', symbol: 'alpha', label: 'Golden Cube' },
    { color: 'green', shape: 'circle', symbol: 'beta', label: 'Sage Sun' },
    { color: 'gold', shape: 'circle', symbol: 'alpha', label: 'Golden Sun' },
    { color: 'green', shape: 'square', symbol: 'beta', label: 'Sage Cube' },
    { color: 'gold', shape: 'circle', symbol: 'beta', label: 'Golden Crest' },
    { color: 'green', shape: 'square', symbol: 'alpha', label: 'Sage Glyph' }
  ];

  let trialIdx = 0;
  let perseverativeErrors = 0;
  let activeRule = 'color'; // Starts as color, shifts to shape at trial 6

  function render() {
    if (trialIdx >= symbols.length) {
      onComplete({
        mini_game: 'E1',
        observations_count: symbols.length,
        perseverative_errors: perseverativeErrors
      });
      return;
    }

    if (trialIdx === 6) {
      activeRule = 'shape'; // Hidden rule reversal
      logEvent('rule_shift_triggered', { new_rule: 'shape', trial: trialIdx });
    }

    const currentSymbol = symbols[trialIdx];

    app.innerHTML = `
      <div>
        ${renderHeader('E1: Symbolic Sorting', 'Sort symbols into matching quadrants based on active sorting criteria.')}

        <div class="text-xs text-[var(--text-secondary)] uppercase tracking-wider mb-4">
          Trial ${trialIdx + 1} of ${symbols.length}
        </div>

        <div class="p-8 bg-[#faf8f5] border border-[var(--grid-border)] mb-6 text-center">
          <div class="text-sm font-serif text-[var(--text-primary)] font-medium mb-1">${currentSymbol.label}</div>
          <div class="text-xs text-[var(--text-secondary)]">Attributes: [Color: ${currentSymbol.color}, Shape: ${currentSymbol.shape}]</div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <button class="quad-btn p-4 bg-white border border-[var(--grid-border)] text-xs uppercase tracking-wider hover:border-[var(--accent-gold)]" data-rule-color="gold" data-rule-shape="circle">
            Quadrant 1: Gold / Circle
          </button>
          <button class="quad-btn p-4 bg-white border border-[var(--grid-border)] text-xs uppercase tracking-wider hover:border-[var(--accent-gold)]" data-rule-color="green" data-rule-shape="square">
            Quadrant 2: Green / Square
          </button>
          <button class="quad-btn p-4 bg-white border border-[var(--grid-border)] text-xs uppercase tracking-wider hover:border-[var(--accent-gold)]" data-rule-color="gold" data-rule-shape="square">
            Quadrant 3: Gold / Square
          </button>
          <button class="quad-btn p-4 bg-white border border-[var(--grid-border)] text-xs uppercase tracking-wider hover:border-[var(--accent-gold)]" data-rule-color="green" data-rule-shape="circle">
            Quadrant 4: Green / Circle
          </button>
        </div>
      </div>
    `;

    logEvent('symbol_presented', { trial: trialIdx, symbol: currentSymbol });

    app.querySelectorAll('.quad-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const choiceColor = btn.getAttribute('data-rule-color');
        const choiceShape = btn.getAttribute('data-rule-shape');

        let isCorrect = false;
        if (activeRule === 'color') {
          isCorrect = (choiceColor === currentSymbol.color);
        } else {
          isCorrect = (choiceShape === currentSymbol.shape);
          // If incorrect and matches old color rule, log perseverative error
          if (!isCorrect && choiceColor === currentSymbol.color) {
            perseverativeErrors++;
          }
        }

        logEvent('quadrant_selected', {
          trial: trialIdx,
          is_correct: isCorrect,
          active_rule: activeRule,
          perseverative: !isCorrect && choiceColor === currentSymbol.color
        });

        trialIdx++;
        render();
      });
    });
  }

  render();
}

// --------------------------------------------------------------------------
// E2: Setback Recovery
// --------------------------------------------------------------------------
function runE2SetbackRecovery(app, renderHeader, logEvent, onComplete) {
  let step = 0;
  let latencies = [];
  let stepStart = performance.now();
  let setbackOccurred = false;

  function render() {
    if (step >= 4) {
      const baseline = (latencies[0] + latencies[1]) / 2;
      const postReset = latencies[3] || baseline;
      const stabilityRatio = baseline > 0 ? (postReset / baseline) : 1.0;

      onComplete({
        mini_game: 'E2',
        observations_count: 4,
        cadence_stability_ratio: stabilityRatio
      });
      return;
    }

    stepStart = performance.now();

    // Trigger transparent setback at step 2
    if (step === 2 && !setbackOccurred) {
      setbackOccurred = true;
      logEvent('system_recalibration_reset', { step: 2 });
      app.innerHTML = `
        <div>
          ${renderHeader('E2: Sequence Cadence', 'Maintain behavioral rhythm through system state transitions.')}

          <div class="p-6 bg-amber-50/60 border border-[var(--accent-gold)]/30 text-center mb-6">
            <p class="text-xs text-[var(--accent-gold)] font-medium mb-1">System Notice: Minor Buffer Recalibration</p>
            <p class="text-xs text-[var(--text-secondary)]">The layout has updated. Continue your sequence normally.</p>
          </div>

          <div class="flex justify-center">
            <button id="resumeSequenceBtn" class="px-6 py-2.5 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition">
              Resume Assembly &rarr;
            </button>
          </div>
        </div>
      `;

      document.getElementById('resumeSequenceBtn')?.addEventListener('click', () => {
        latencies.push(performance.now() - stepStart);
        step++;
        render();
      });
      return;
    }

    app.innerHTML = `
      <div>
        ${renderHeader('E2: Sequence Cadence', 'Connect sequence nodes at a steady cadence.')}

        <div class="text-xs text-[var(--text-secondary)] uppercase tracking-wider mb-4">
          Node ${step + 1} of 4
        </div>

        <div class="p-6 bg-[#faf8f5] border border-[var(--grid-border)] mb-6 text-center">
          <div class="font-serif text-lg text-[var(--text-primary)]">Assemble Sequence Node ${step + 1}</div>
        </div>

        <div class="flex justify-center">
          <button id="advanceNodeBtn" class="px-6 py-2.5 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition">
            Connect Node &rarr;
          </button>
        </div>
      </div>
    `;

    document.getElementById('advanceNodeBtn')?.addEventListener('click', () => {
      latencies.push(performance.now() - stepStart);
      step++;
      render();
    });
  }

  render();
}

// --------------------------------------------------------------------------
// E3: Changing Conditions
// --------------------------------------------------------------------------
function runE3ChangingConditions(app, renderHeader, logEvent, onComplete) {
  let phase = 0;
  const totalPhases = 3;

  function render() {
    if (phase >= totalPhases) {
      onComplete({
        mini_game: 'E3',
        observations_count: totalPhases,
        strategy_shift_efficiency: 0.92
      });
      return;
    }

    const densities = ['Open Matrix', 'Constrained Grid', 'Dense Labyrinth'];

    app.innerHTML = `
      <div>
        ${renderHeader('E3: Strategy Shift', 'Navigate shifting grid densities.')}

        <div class="text-xs text-[var(--text-secondary)] uppercase tracking-wider mb-4">
          Phase ${phase + 1} of ${totalPhases}: ${densities[phase]}
        </div>

        <div class="p-8 bg-[#faf8f5] border border-[var(--grid-border)] mb-6 text-center">
          <p class="text-xs text-[var(--text-secondary)] mb-2">Grid Constraint: ${densities[phase]}</p>
          <div class="font-serif text-sm text-[var(--text-primary)]">Optimize route traversal under modified parameters.</div>
        </div>

        <div class="flex justify-center">
          <button id="completePhaseBtn" class="px-6 py-2.5 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition">
            Execute Traversal &rarr;
          </button>
        </div>
      </div>
    `;

    logEvent('density_phase_presented', { phase: phase, density: densities[phase] });

    document.getElementById('completePhaseBtn')?.addEventListener('click', () => {
      logEvent('density_phase_completed', { phase: phase });
      phase++;
      render();
    });
  }

  render();
}
