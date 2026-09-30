/* ==========================================================================
   ALFAAZ RECRUIT — WORLD 7: THE REPETITION (MOTIVATION)
   Mini-games: M1 (Mandatory Stamping), M2 (Voluntary Extra), M3 (Final Touches)
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
// M1: Mandatory Stamping (3 Envelopes)
// --------------------------------------------------------------------------
function runM1Minimum(app, renderHeader, logEvent, onComplete) {
  const invitations = [
    { id: 'INV_1', recipient: 'Senior Calligrapher — Master Ghulam' },
    { id: 'INV_2', recipient: 'Community Youth Art Collective' },
    { id: 'INV_3', recipient: 'Regional Heritage Conservation Trust' }
  ];

  let currentIdx = 0;
  let latencies = [];
  let unitStart = performance.now();

  function render() {
    if (currentIdx >= invitations.length) {
      const mean = latencies.reduce((a, b) => a + b, 0) / latencies.length;
      onComplete({
        mini_game: 'M1',
        observations_count: invitations.length,
        avg_latency_ms: mean
      });
      return;
    }

    const item = invitations[currentIdx];
    unitStart = performance.now();

    app.innerHTML = `
      <div>
        ${renderHeader('Task 1: Sealing Event Invitations', 'Apply the collective wax seal stamp to each of the 3 handmade invitation envelopes.')}

        <div class="text-xs text-[var(--text-secondary)] font-medium mb-4">
          Envelope ${currentIdx + 1} of ${invitations.length}
        </div>

        <!-- Interactive Envelope Preview -->
        <div class="p-8 bg-[#faf8f5] border border-[var(--grid-border)] mb-6 text-center">
          <div class="w-full max-w-sm mx-auto h-36 bg-amber-50/60 border border-[var(--grid-border)] flex flex-col items-center justify-center p-4 relative shadow-sm">
            <span class="text-[10px] uppercase tracking-widest text-[var(--text-secondary)]">Exhibition Invitation</span>
            <div class="font-serif text-sm font-semibold text-[var(--text-primary)] mt-1">${item.recipient}</div>
            
            <div id="sealDisplay" class="w-10 h-10 rounded-full border-2 border-dashed border-[var(--accent-gold)] mt-3 flex items-center justify-center text-[10px] text-[var(--accent-gold)] font-bold">
              SEAL
            </div>
          </div>
        </div>

        <div class="flex justify-center">
          <button id="stampBtn" class="px-8 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition shadow-sm flex items-center gap-2">
            &#9998; Apply Wax Seal Stamp &rarr;
          </button>
        </div>
      </div>
    `;

    logEvent('invitation_presented', { inv_id: item.id });

    document.getElementById('stampBtn')?.addEventListener('click', () => {
      const dwell = performance.now() - unitStart;
      latencies.push(dwell);
      logEvent('envelope_stamped', { inv_id: item.id, dwell_ms: dwell });
      currentIdx++;
      render();
    });
  }

  render();
}

// --------------------------------------------------------------------------
// M2: Voluntary Extra Envelopes
// --------------------------------------------------------------------------
function runM2Optional(app, renderHeader, logEvent, onComplete) {
  let optionalCompleted = 0;
  const maxOptional = 3;

  function render() {
    app.innerHTML = `
      <div>
        ${renderHeader('Task 2: Extra Preparations', 'The required invitations are complete. 3 additional courtesy envelopes remain.')}

        <div class="p-6 bg-[#faf8f5] border border-[var(--grid-border)] mb-6 text-center">
          <div class="text-sm font-serif text-[var(--text-primary)] mb-2 font-medium">
            Optional Courtesy Envelopes Available
          </div>
          <p class="text-xs text-[var(--text-secondary)] max-w-md mx-auto mb-4">
            You may stamp additional invitations for guest artists, or complete this task at any time.
          </p>

          <div class="text-base font-serif font-bold text-[var(--accent-gold)] mb-4">
            ${optionalCompleted} of ${maxOptional} Extra Envelopes Sealed
          </div>

          <div class="flex justify-center gap-4">
            ${optionalCompleted < maxOptional ? `
              <button id="stampExtraBtn" class="px-6 py-2.5 bg-white border border-[var(--accent-gold)] text-[var(--accent-gold)] text-xs uppercase tracking-wider hover:bg-amber-50 transition">
                + Seal Extra Envelope
              </button>
            ` : '<span class="text-xs text-emerald-700 font-semibold">&#10003; All extra envelopes completed.</span>'}
          </div>
        </div>

        <div class="flex justify-end">
          <button id="finishM2Btn" class="px-6 py-2.5 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition">
            Proceed to Final Task &rarr;
          </button>
        </div>
      </div>
    `;

    document.getElementById('stampExtraBtn')?.addEventListener('click', () => {
      optionalCompleted++;
      logEvent('optional_envelope_stamped', { count: optionalCompleted });
      render();
    });

    document.getElementById('finishM2Btn')?.addEventListener('click', () => {
      logEvent('optional_stamping_done', { total_extra: optionalCompleted });
      onComplete({
        mini_game: 'M2',
        observations_count: 1,
        optional_completed: optionalCompleted
      });
    });
  }

  render();
}

// --------------------------------------------------------------------------
// M3: Final Touches
// --------------------------------------------------------------------------
function runM3ReducedReward(app, renderHeader, logEvent, onComplete) {
  const tasks = [
    { id: 'T_LIGHTS', name: 'Turn on Warm Gallery Spotlights' },
    { id: 'T_PAMPHLETS', name: 'Arrange Urdu & Kashmiri Poetry Guides on Welcome Table' },
    { id: 'T_FLOWERS', name: 'Place Fresh Jasmine Petals at the Entrance Urn' }
  ];

  let completedTasks = {};

  function render() {
    const allDone = tasks.every(t => completedTasks[t.id]);

    app.innerHTML = `
      <div>
        ${renderHeader('Task 3: Final Room Warmth', 'Complete the final 3-point checklist to make the gallery ready for evening guests.')}

        <div class="space-y-3 mb-6">
          ${tasks.map((t, idx) => `
            <label class="flex items-center gap-3 p-4 bg-white border ${completedTasks[t.id] ? 'border-emerald-600 bg-emerald-50/20' : 'border-[var(--grid-border)]'} cursor-pointer hover:border-[var(--accent-gold)] transition">
              <input type="checkbox" id="task_${t.id}" ${completedTasks[t.id] ? 'checked' : ''} class="accent-[#bd6f5d]">
              <span class="text-xs font-medium text-[var(--text-primary)]">${idx + 1}. ${t.name}</span>
            </label>
          `).join('')}
        </div>

        <div class="flex justify-end">
          <button id="m3FinishBtn" ${allDone ? '' : 'disabled'} class="px-6 py-2.5 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] disabled:opacity-40 transition">
            Finalize Assessment &rarr;
          </button>
        </div>
      </div>
    `;

    tasks.forEach(t => {
      document.getElementById(`task_${t.id}`)?.addEventListener('change', (e) => {
        completedTasks[t.id] = e.target.checked;
        logEvent('readiness_task_toggled', { task_id: t.id, checked: e.target.checked });
        render();
      });
    });

    document.getElementById('m3FinishBtn')?.addEventListener('click', () => {
      logEvent('gallery_readiness_complete');
      onComplete({
        mini_game: 'M3',
        observations_count: tasks.length,
        readiness_score: 1.0
      });
    });
  }

  render();
}
