/* ==========================================================================
   ALFAAZ RECRUIT — WORLD 1: THE FREQUENCY (EMPATHY)
   Mini-games: F1 (Tone Tuning), F2 (Helpful Dialogue), F3 (Room Adaptation)
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
// F1: Tone Tuning
// --------------------------------------------------------------------------
function runF1CueDetection(app, renderHeader, logEvent, onComplete) {
  let sliderVal = 50;
  let cueOnsetTime = performance.now();
  let firstAdjustmentTime = null;
  let animationFrameId = null;

  app.innerHTML = `
    <div>
      ${renderHeader('Task 1: Sound Tuning', 'Listen to your teammate and adjust the dial until the sound feels warm and comfortable.')}

      <!-- Partner Dialogue Bubble -->
      <div class="p-4 bg-amber-50/70 border border-[var(--accent-gold)]/40 rounded-sm mb-6 flex items-center gap-3">
        <div class="w-8 h-8 rounded-full bg-[var(--accent-gold)] text-white flex items-center justify-center font-serif text-sm font-semibold">T</div>
        <div>
          <div class="text-[10px] uppercase tracking-wider text-[var(--accent-gold)] font-semibold">Teammate Note</div>
          <div id="partnerSpeech" class="text-xs text-[var(--text-primary)] font-medium">"The sound feels a bit sharp on the high notes. Could we soften it?"</div>
        </div>
      </div>

      <!-- Interactive Animated Waveform Canvas -->
      <div class="p-6 bg-[#faf8f5] border border-[var(--grid-border)] mb-6 text-center">
        <canvas id="waveCanvas" width="600" height="90" class="w-full h-20 bg-white border border-[var(--grid-border)] mb-4"></canvas>

        <div class="w-full max-w-md mx-auto">
          <div class="flex justify-between items-center text-xs text-[var(--text-secondary)] mb-2">
            <span>Softer / Warm (0)</span>
            <span class="font-mono text-sm font-semibold text-[var(--text-primary)]" id="sliderValDisplay">50</span>
            <span>Brighter / Sharp (100)</span>
          </div>
          <input type="range" id="freqSlider" min="0" max="100" value="50" class="w-full accent-[#bd6f5d] cursor-pointer">
        </div>

        <div id="toneFeedback" class="text-xs text-[var(--text-secondary)] mt-3">
          Move the slider left to soften the sound.
        </div>
      </div>

      <div class="flex justify-end">
        <button id="lockFreqBtn" class="px-6 py-2.5 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition">
          Set Sound &rarr;
        </button>
      </div>
    </div>
  `;

  const canvas = document.getElementById('waveCanvas');
  const ctx = canvas?.getContext('2d');
  const slider = document.getElementById('freqSlider');
  const valDisplay = document.getElementById('sliderValDisplay');
  const feedback = document.getElementById('toneFeedback');

  let waveOffset = 0;
  function drawWave() {
    if (!ctx || !canvas) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#bd6f5d';
    ctx.lineWidth = 2;
    ctx.beginPath();

    const freq = 0.02 + (sliderVal / 100) * 0.06;
    const amp = 15 + (Math.abs(sliderVal - 35) / 50) * 15;

    for (let x = 0; x < canvas.width; x++) {
      const y = canvas.height / 2 + Math.sin(x * freq + waveOffset) * amp;
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
    waveOffset += 0.04;
    animationFrameId = requestAnimationFrame(drawWave);
  }
  drawWave();

  slider?.addEventListener('input', (e) => {
    sliderVal = parseInt(e.target.value);
    if (valDisplay) valDisplay.textContent = sliderVal;
    if (!firstAdjustmentTime) {
      firstAdjustmentTime = performance.now();
    }
    if (feedback) {
      if (Math.abs(sliderVal - 35) <= 10) {
        feedback.innerHTML = '<span class="text-emerald-700 font-semibold">&#10003; Warm and balanced tone reached.</span>';
      } else if (sliderVal > 35) {
        feedback.textContent = 'Tone is still slightly sharp.';
      } else {
        feedback.textContent = 'Tone is very muted.';
      }
    }
    logEvent('slider_input', { value: sliderVal });
  });

  document.getElementById('lockFreqBtn')?.addEventListener('click', () => {
    if (animationFrameId) cancelAnimationFrame(animationFrameId);
    const latency = firstAdjustmentTime ? (firstAdjustmentTime - cueOnsetTime) : 2000.0;
    const accuracy = Math.max(0, 1 - Math.abs(sliderVal - 35) / 50.0);
    logEvent('tuning_locked', { final_value: sliderVal, latency_ms: latency, accuracy });
    onComplete({
      mini_game: 'F1',
      observations_count: 1,
      latency_ms: latency,
      accuracy: accuracy
    });
  });
}

// --------------------------------------------------------------------------
// F2: Helpful Dialogue
// --------------------------------------------------------------------------
function runF2AmbiguousCue(app, renderHeader, logEvent, onComplete) {
  let selectedOption = null;

  const options = [
    {
      id: 'F2_ASK',
      title: 'Clarify with Kindness',
      desc: 'Ask: "Would you like the voice to sound a bit warmer or softer?"',
      detail: 'Checks what the teammate is sensing before making changes.'
    },
    {
      id: 'F2_TEST',
      title: 'Gentle Test Adjustment',
      desc: 'Lower the bass slightly and ask if that feels more balanced.',
      detail: 'Tries a small, careful change to see if it solves the issue.'
    },
    {
      id: 'F2_HOLD',
      title: 'Test with the Room',
      desc: 'Keep current level and invite the audience to give feedback.',
      detail: 'Gathers feedback from listeners in the hall.'
    }
  ];

  app.innerHTML = `
    <div>
      ${renderHeader('Task 2: Unclear Feedback', 'Your teammate says something feels off, but is not sure what. Choose how to respond.')}

      <div class="p-4 bg-amber-50/70 border border-[var(--accent-gold)]/40 rounded-sm mb-6 flex items-center gap-3">
        <div class="w-8 h-8 rounded-full bg-[var(--accent-gold)] text-white flex items-center justify-center font-serif text-sm font-semibold">T</div>
        <div>
          <div class="text-[10px] uppercase tracking-wider text-[var(--accent-gold)] font-semibold">Teammate</div>
          <div class="text-xs text-[var(--text-primary)] font-medium">"Something feels a bit off with the sound, but I cannot quite tell what."</div>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        ${options.map(opt => `
          <div class="f2-card p-4 bg-white border border-[var(--grid-border)] cursor-pointer hover:border-[var(--accent-gold)] transition space-y-2" data-opt="${opt.id}">
            <div class="text-xs font-semibold text-[var(--text-primary)]">${opt.title}</div>
            <div class="text-xs text-[var(--text-secondary)] leading-relaxed">${opt.desc}</div>
            <div class="text-[10px] text-[var(--accent-gold)] pt-1 border-t border-[var(--grid-border)]">${opt.detail}</div>
          </div>
        `).join('')}
      </div>

      <div class="flex justify-end">
        <button id="f2ConfirmBtn" disabled class="px-6 py-2.5 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] disabled:opacity-40 transition">
          Confirm Response &rarr;
        </button>
      </div>
    </div>
  `;

  const confirmBtn = document.getElementById('f2ConfirmBtn');
  app.querySelectorAll('.f2-card').forEach(card => {
    card.addEventListener('click', () => {
      app.querySelectorAll('.f2-card').forEach(c => c.classList.remove('border-[var(--accent-gold)]', 'bg-amber-50/30'));
      card.classList.add('border-[var(--accent-gold)]', 'bg-amber-50/30');
      selectedOption = card.getAttribute('data-opt');
      if (confirmBtn) confirmBtn.disabled = false;
      logEvent('dialogue_option_selected', { option: selectedOption });
    });
  });

  confirmBtn?.addEventListener('click', () => {
    logEvent('ambiguity_resolved', { choice: selectedOption });
    onComplete({
      mini_game: 'F2',
      observations_count: 1,
      selected_option: selectedOption
    });
  });
}

// --------------------------------------------------------------------------
// F3: Room Adaptation
// --------------------------------------------------------------------------
function runF3ContextChange(app, renderHeader, logEvent, onComplete) {
  let hallSlider = 50;

  app.innerHTML = `
    <div>
      ${renderHeader('Task 3: Room Adaptation', 'The event moved into a large stone hall. Adjust the echo level for clear spoken poetry.')}

      <div class="p-4 bg-amber-50/70 border border-[var(--accent-gold)]/40 rounded-sm mb-6 flex items-center gap-3">
        <div class="w-8 h-8 rounded-full bg-[var(--accent-gold)] text-white flex items-center justify-center font-serif text-sm font-semibold">T</div>
        <div>
          <div class="text-[10px] uppercase tracking-wider text-[var(--accent-gold)] font-semibold">Venue Update</div>
          <div class="text-xs text-[var(--text-primary)] font-medium">"The large stone hall causes an echo. Please lower the echo to around 25%."</div>
        </div>
      </div>

      <div class="p-6 bg-[#faf8f5] border border-[var(--grid-border)] mb-6 text-center">
        <div class="w-full max-w-md mx-auto">
          <div class="flex justify-between items-center text-xs text-[var(--text-secondary)] mb-2">
            <span>Direct Clarity (0%)</span>
            <span class="font-mono text-sm font-semibold text-[var(--text-primary)]" id="hallValDisplay">50%</span>
            <span>Deep Echo (100%)</span>
          </div>
          <input type="range" id="hallSlider" min="0" max="100" value="50" class="w-full accent-[#bd6f5d] cursor-pointer">
        </div>

        <div id="hallFeedback" class="text-xs text-[var(--text-secondary)] mt-4">
          Adjust the slider until voice clarity is optimal.
        </div>
      </div>

      <div class="flex justify-end">
        <button id="f3LockBtn" class="px-6 py-2.5 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition">
          Complete Task &rarr;
        </button>
      </div>
    </div>
  `;

  const slider = document.getElementById('hallSlider');
  const valDisplay = document.getElementById('hallValDisplay');
  const feedback = document.getElementById('hallFeedback');

  slider?.addEventListener('input', (e) => {
    hallSlider = parseInt(e.target.value);
    if (valDisplay) valDisplay.textContent = `${hallSlider}%`;
    if (feedback) {
      if (Math.abs(hallSlider - 25) <= 8) {
        feedback.innerHTML = '<span class="text-emerald-700 font-semibold">&#10003; Clear spoken poetry acoustics achieved.</span>';
      } else {
        feedback.textContent = `Echo level at ${hallSlider}%.`;
      }
    }
    logEvent('hall_slider_input', { value: hallSlider });
  });

  document.getElementById('f3LockBtn')?.addEventListener('click', () => {
    const accuracy = Math.max(0, 1 - Math.abs(hallSlider - 25) / 50.0);
    logEvent('hall_tuning_locked', { final_value: hallSlider, accuracy });
    onComplete({
      mini_game: 'F3',
      observations_count: 1,
      accuracy: accuracy
    });
  });
}
