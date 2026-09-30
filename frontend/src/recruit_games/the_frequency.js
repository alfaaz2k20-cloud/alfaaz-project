/* ==========================================================================
   ALFAAZ RECRUIT — WORLD 1: THE FREQUENCY (EMPATHY)
   Mini-games: F1 (Cue Detection), F2 (Ambiguous Cue), F3 (Context Change)
   ========================================================================== */

export function runTheFrequency(context, renderHeader) {
  const { appContainer, miniGameIndex, logEvent, onMiniGameComplete } = context;

  switch (miniGameIndex) {
    case 0:
      runF1CueDetection(appContainer, renderHeader, logEvent, onMiniGameComplete);
      break;
    case 1:
      runF2AmbiguousCue(appContainer, renderHeader, logEvent, onMiniGameComplete);
      break;
    case 2:
      runF3ContextChange(appContainer, renderHeader, logEvent, onMiniGameComplete);
      break;
  }
}

// --------------------------------------------------------------------------
// F1: Cue Detection
// --------------------------------------------------------------------------
function runF1CueDetection(app, renderHeader, logEvent, onComplete) {
  let sliderVal = 50;
  let cueOnsetTime = performance.now() + 1500;
  let firstAdjustmentTime = null;

  app.innerHTML = `
    <div>
      ${renderHeader('F1: Resonance Tuning', 'Tune the audio frequency slider to achieve collective resonance with your simulated partner.')}

      <div class="p-6 bg-[#faf8f5] border border-[var(--grid-border)] mb-6 text-center">
        <div id="partnerStatus" class="text-xs text-[var(--text-secondary)] mb-4">Partner Status: Listening...</div>
        <div class="w-full max-w-md mx-auto">
          <input type="range" id="freqSlider" min="0" max="100" value="50" class="w-full accent-[#bd6f5d]">
          <div class="flex justify-between text-[10px] text-[var(--text-secondary)] mt-1">
            <span>Low Harmonic (0)</span>
            <span id="sliderValDisplay">50</span>
            <span>High Harmonic (100)</span>
          </div>
        </div>
      </div>

      <div class="flex justify-end">
        <button id="lockFreqBtn" class="px-6 py-2 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition">
          Lock Frequency &rarr;
        </button>
      </div>
    </div>
  `;

  const slider = document.getElementById('freqSlider');
  const valDisplay = document.getElementById('sliderValDisplay');
  const partnerStatus = document.getElementById('partnerStatus');

  setTimeout(() => {
    if (partnerStatus) {
      partnerStatus.innerHTML = '<span class="text-[#bd6f5d] font-medium">Partner Cue: "Sound feels slightly harsh on the higher register."</span>';
      cueOnsetTime = performance.now();
      logEvent('partner_cue_onset', { target_optimal: 35 });
    }
  }, 1200);

  slider?.addEventListener('input', (e) => {
    sliderVal = parseInt(e.target.value);
    if (valDisplay) valDisplay.textContent = sliderVal;
    if (!firstAdjustmentTime && performance.now() > cueOnsetTime) {
      firstAdjustmentTime = performance.now();
    }
    logEvent('slider_input', { value: sliderVal });
  });

  document.getElementById('lockFreqBtn')?.addEventListener('click', () => {
    const latency = firstAdjustmentTime ? (firstAdjustmentTime - cueOnsetTime) : 2500.0;
    logEvent('tuning_locked', { final_value: sliderVal, latency_ms: latency });
    onComplete({
      mini_game: 'F1',
      observations_count: 1,
      latency_ms: latency,
      accuracy: Math.abs(sliderVal - 35) / 50.0
    });
  });
}

// --------------------------------------------------------------------------
// F2: Ambiguous Cue
// --------------------------------------------------------------------------
function runF2AmbiguousCue(app, renderHeader, logEvent, onComplete) {
  app.innerHTML = `
    <div>
      ${renderHeader('F2: Ambiguity Resolution', 'Respond to subtle or ambiguous partner communication during tuning.')}

      <div class="p-6 bg-[#faf8f5] border border-[var(--grid-border)] mb-6 text-center">
        <p class="text-xs text-[var(--text-secondary)] mb-2">Simulated Partner Dialogue:</p>
        <p class="text-sm font-serif text-[var(--text-primary)] italic">"Something feels slightly off in the overall balance, but I cannot quite pinpoint the channel."</p>
      </div>

      <div class="grid grid-cols-3 gap-3">
        <button class="choice-btn p-3 bg-white border border-[var(--grid-border)] text-xs hover:border-[var(--accent-gold)]" data-choice="clarify">
          Ask for Clarification
        </button>
        <button class="choice-btn p-3 bg-white border border-[var(--grid-border)] text-xs hover:border-[var(--accent-gold)]" data-choice="adjust">
          Make Immediate Guess Adjustment
        </button>
        <button class="choice-btn p-3 bg-white border border-[var(--grid-border)] text-xs hover:border-[var(--accent-gold)]" data-choice="maintain">
          Maintain Current Calibration
        </button>
      </div>
    </div>
  `;

  app.querySelectorAll('.choice-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const choice = btn.getAttribute('data-choice');
      logEvent('ambiguity_choice_made', { choice });
      onComplete({
        mini_game: 'F2',
        observations_count: 1,
        clarification_ratio: choice === 'clarify' ? 1.0 : 0.0
      });
    });
  });
}

// --------------------------------------------------------------------------
// F3: Context Change
// --------------------------------------------------------------------------
function runF3ContextChange(app, renderHeader, logEvent, onComplete) {
  app.innerHTML = `
    <div>
      ${renderHeader('F3: Dynamic Updating', 'Recalibrate output when partner environment constraints shift mid-stream.')}

      <div class="p-6 bg-[#faf8f5] border border-[var(--grid-border)] mb-6 text-center">
        <div class="p-3 bg-amber-50 border border-amber-200 text-xs text-[#bd6f5d] font-medium mb-3">
          Notice: Partner has moved to an open hall with higher acoustic reverberation.
        </div>
        <p class="text-xs text-[var(--text-secondary)]">Recalibrate frequency to absorb low-end echo.</p>
      </div>

      <div class="flex justify-center">
        <button id="recalibrateBtn" class="px-6 py-2.5 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition">
          Apply Acoustic Adjustment &rarr;
        </button>
      </div>
    </div>
  `;

  document.getElementById('recalibrateBtn')?.addEventListener('click', () => {
    logEvent('acoustic_recalibration_applied');
    onComplete({
      mini_game: 'F3',
      observations_count: 1,
      adaptation_latency_ms: 1200.0
    });
  });
}
