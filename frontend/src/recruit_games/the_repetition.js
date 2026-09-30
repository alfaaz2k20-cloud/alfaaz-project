/* ==========================================================================
   ALFAAZ RECRUIT — WORLD 7: THE REPETITION (MOTIVATION)
   Mini-games: M1 (Minimum Completed), M2 (Optional Continuation), M3 (Reduced Reward)
   ========================================================================== */

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
// M1: Minimum Completed
// --------------------------------------------------------------------------
function runM1Minimum(app, renderHeader, logEvent, onComplete) {
  const units = [
    { id: 'REC-1', raw: 'ALFAAZ  COLLECTIVE —   SPRING  SALON', clean: 'ALFAAZ COLLECTIVE — SPRING SALON' },
    { id: 'REC-2', raw: 'POETRY   READING   SERIES   VOL  II', clean: 'POETRY READING SERIES VOL II' },
    { id: 'REC-3', raw: 'DOCUMENTARY   SCREENING   AND   TALK', clean: 'DOCUMENTARY SCREENING AND TALK' }
  ];

  let currentIdx = 0;
  let latencies = [];
  let unitStart = performance.now();

  function render() {
    if (currentIdx >= units.length) {
      const mean = latencies.reduce((a, b) => a + b, 0) / latencies.length;
      const variance = latencies.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / latencies.length;
      const cv = mean > 0 ? (Math.sqrt(variance) / mean) : 0.0;

      onComplete({
        mini_game: 'M1',
        observations_count: units.length,
        cadence_consistency: cv
      });
      return;
    }

    const unit = units[currentIdx];
    unitStart = performance.now();

    app.innerHTML = `
      <div>
        ${renderHeader('M1: Baseline Formatting', 'Standardize typography spacing for historical event notices (3 mandatory units).')}

        <div class="text-xs text-[var(--text-secondary)] uppercase tracking-wider mb-4">
          Required Unit ${currentIdx + 1} of ${units.length}
        </div>

        <div class="p-6 bg-[#faf8f5] border border-[var(--grid-border)] mb-6 text-center">
          <div class="text-xs text-[var(--text-secondary)] uppercase mb-2">Unformatted Header String:</div>
          <div class="font-mono text-sm bg-white p-3 border border-[var(--grid-border)] inline-block tracking-wider">
            ${unit.raw}
          </div>
        </div>

        <div class="flex justify-center gap-4">
          <button id="formatBtn" class="px-6 py-2.5 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition">
            Apply Normalized Spacing &rarr;
          </button>
        </div>
      </div>
    `;

    logEvent('mandatory_unit_presented', { unit_id: unit.id });

    document.getElementById('formatBtn')?.addEventListener('click', () => {
      const dwell = performance.now() - unitStart;
      latencies.push(dwell);
      logEvent('mandatory_unit_completed', { unit_id: unit.id, duration_ms: dwell });
      currentIdx++;
      render();
    });
  }

  render();
}

// --------------------------------------------------------------------------
// M2: Optional Continuation
// --------------------------------------------------------------------------
function runM2Optional(app, renderHeader, logEvent, onComplete) {
  let optionalUnitsCompleted = 0;
  let totalVoluntaryTimeMs = 0;
  let unitStart = 0;
  const maxOptional = 5;

  function renderPrompt() {
    app.innerHTML = `
      <div class="text-center py-6 space-y-5">
        ${renderHeader('M2: Task Continuation', 'Mandatory baseline completed. Additional catalog records remain.')}

        <div class="p-6 bg-[#faf8f5] border border-[var(--grid-border)] max-w-lg mx-auto text-sm text-[var(--text-primary)]">
          <p class="font-medium mb-1">Standard required quota is complete.</p>
          <p class="text-xs text-[var(--text-secondary)]">You may choose to continue formatting additional archival units (${optionalUnitsCompleted}/${maxOptional} completed) or conclude this section now. Stopping now is completely valid.</p>
        </div>

        <div class="flex justify-center gap-4 pt-2">
          <button id="finishNowBtn" class="px-6 py-2.5 border border-[var(--grid-border)] text-xs uppercase tracking-widest text-[var(--text-primary)] hover:border-[var(--accent-gold)] transition">
            Conclude & Continue &rarr;
          </button>
          ${optionalUnitsCompleted < maxOptional ? `
          <button id="continueFormatBtn" class="px-6 py-2.5 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition">
            Format Another Record
          </button>` : ''}
        </div>
      </div>
    `;

    logEvent('optional_prompt_presented', { optional_completed: optionalUnitsCompleted });

    document.getElementById('finishNowBtn')?.addEventListener('click', () => {
      logEvent('optional_session_concluded', { optional_completed: optionalUnitsCompleted, voluntary_time_ms: totalVoluntaryTimeMs });
      onComplete({
        mini_game: 'M2',
        observations_count: Math.max(1, optionalUnitsCompleted),
        optional_units: optionalUnitsCompleted,
        voluntary_duration_ms: totalVoluntaryTimeMs
      });
    });

    document.getElementById('continueFormatBtn')?.addEventListener('click', () => {
      renderFormattingUnit();
    });
  }

  function renderFormattingUnit() {
    unitStart = performance.now();
    app.innerHTML = `
      <div>
        ${renderHeader('M2: Optional Formatting', `Optional record ${optionalUnitsCompleted + 1} of ${maxOptional}.`)}

        <div class="p-6 bg-[#faf8f5] border border-[var(--grid-border)] mb-6 text-center">
          <div class="text-xs text-[var(--text-secondary)] uppercase mb-2">Archival Notice Line:</div>
          <div class="font-mono text-sm bg-white p-3 border border-[var(--grid-border)] inline-block">
            EXHIBIT CATALOG — ENTRY 0${optionalUnitsCompleted + 4} / ARCHIVE
          </div>
        </div>

        <div class="flex justify-center">
          <button id="saveOptionalBtn" class="px-6 py-2.5 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition">
            Verify & Save Record &rarr;
          </button>
        </div>
      </div>
    `;

    document.getElementById('saveOptionalBtn')?.addEventListener('click', () => {
      const dwell = performance.now() - unitStart;
      totalVoluntaryTimeMs += dwell;
      optionalUnitsCompleted++;
      logEvent('optional_unit_saved', { unit_index: optionalUnitsCompleted, dwell_ms: dwell });
      if (optionalUnitsCompleted >= maxOptional) {
        onComplete({
          mini_game: 'M2',
          observations_count: optionalUnitsCompleted,
          optional_units: optionalUnitsCompleted,
          voluntary_duration_ms: totalVoluntaryTimeMs
        });
      } else {
        renderPrompt();
      }
    });
  }

  renderPrompt();
}

// --------------------------------------------------------------------------
// M3: Persistence Under Reduced Reward
// --------------------------------------------------------------------------
function runM3ReducedReward(app, renderHeader, logEvent, onComplete) {
  let count = 0;
  const maxUnits = 3;

  function render() {
    if (count >= maxUnits) {
      onComplete({
        mini_game: 'M3',
        observations_count: count,
        reduced_feedback_persistence: count
      });
      return;
    }

    app.innerHTML = `
      <div>
        ${renderHeader('M3: Unannounced Batch Sync', 'Low-stimulation archival synchronization.')}

        <div class="p-6 bg-[#faf8f5] border border-[var(--grid-border)] mb-6 text-center">
          <p class="text-xs text-[var(--text-secondary)] mb-3">Syncing background repository record...</p>
          <div class="font-mono text-xs text-[var(--text-primary)]">RECORD_ID_00${count + 1}</div>
        </div>

        <div class="flex justify-between items-center">
          <button id="concludeM3Btn" class="skip-btn">Proceed to Next World &rarr;</button>
          <button id="syncUnitBtn" class="px-6 py-2 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition">
            Confirm Indexing
          </button>
        </div>
      </div>
    `;

    logEvent('reduced_reward_unit_displayed', { index: count });

    document.getElementById('concludeM3Btn')?.addEventListener('click', () => {
      logEvent('m3_concluded_early', { completed: count });
      onComplete({
        mini_game: 'M3',
        observations_count: Math.max(1, count),
        reduced_feedback_persistence: count
      });
    });

    document.getElementById('syncUnitBtn')?.addEventListener('click', () => {
      count++;
      logEvent('reduced_reward_synced', { index: count });
      render();
    });
  }

  render();
}
