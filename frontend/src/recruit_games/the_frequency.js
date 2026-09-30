/* ==========================================================================
   ALFAAZ RECRUIT — WORLD 1: THE SOUNDSCAPE (تعدد)
   Mini-games: F1 (Tuning the Hall), F2 (The Gathering Voices), F3 (The Echo of the Room)
   ========================================================================== */

import { renderTutorialCard } from './index.js';

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
// F1: Tuning the Hall
// --------------------------------------------------------------------------
function runF1CueDetection(app, renderHeader, logEvent, onComplete) {
  let inTutorial = true;
  let sliderVal = 50;
  let cueOnsetTime = performance.now();
  let firstAdjustmentTime = null;
  let animationFrameId = null;

  function render() {
    if (inTutorial) {
      app.innerHTML = `
        <div>
          ${renderHeader('Part 1: Tuning the Hall', 'Calibrating the soundscape for the poetry recital.')}
          ${renderTutorialCard({
            icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 100-6 3 3 0 000 6z"></path></svg>`,
            goal: 'Dial the audio frequency into the comfortable, warm zone.',
            steps: [
              'Review the acoustic feedback note from the setup team.',
              'Drag the golden slider to soften high frequencies.',
              'Observe the waveform until the green balance zone appears.'
            ]
          })}
        </div>
      `;
      document.getElementById('startActivityBtn')?.addEventListener('click', () => {
        inTutorial = false;
        cueOnsetTime = performance.now();
        render();
      });
      return;
    }

    app.innerHTML = `
      <div class="animate-fadeIn">
        ${renderHeader('Part 1: Tuning the Hall', 'Adjust the acoustic slider until the voice feels warm and balanced.')}

        <!-- Acoustic Dialogue Note -->
        <div class="p-4 bg-amber-50/80 border border-[var(--accent-gold)]/40 rounded-sm mb-6 flex items-center gap-3 shadow-xs">
          <div class="w-9 h-9 rounded-full bg-[var(--accent-gold)] text-white flex items-center justify-center font-serif text-sm font-semibold shrink-0">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path></svg>
          </div>
          <div>
            <div class="text-[10px] uppercase tracking-wider text-[var(--accent-gold)] font-semibold">Hall Acoustic Observation</div>
            <div id="partnerSpeech" class="text-xs text-[var(--text-primary)] font-medium mt-0.5">"The sound in the front row has a sharp treble edge. Let us soften it slightly."</div>
          </div>
        </div>

        <!-- Interactive Animated Waveform Canvas -->
        <div class="p-6 bg-[#faf8f5] border border-[var(--grid-border)] mb-6 text-center shadow-inner">
          <canvas id="waveCanvas" width="600" height="90" class="w-full h-24 bg-white border border-[var(--grid-border)] mb-4 rounded-xs"></canvas>

          <div class="w-full max-w-md mx-auto">
            <div class="flex justify-between items-center text-xs text-[var(--text-secondary)] mb-2">
              <span class="flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-amber-600 inline-block"></span> Muted (0)</span>
              <span class="font-mono text-sm font-semibold text-[var(--accent-gold)] bg-white px-3 py-1 border border-[var(--grid-border)]" id="sliderValDisplay">${sliderVal}</span>
              <span class="flex items-center gap-1">Bright (100) <span class="w-2 h-2 rounded-full bg-orange-500 inline-block"></span></span>
            </div>
            <input type="range" id="freqSlider" min="0" max="100" value="${sliderVal}" class="w-full accent-[#bd6f5d] cursor-pointer h-2 bg-stone-200 rounded-lg">
          </div>

          <div id="toneFeedback" class="text-xs text-[var(--text-secondary)] mt-4 font-medium">
            Slide toward the left to soften the sound frequency.
          </div>
        </div>

        <div class="flex justify-end">
          <button id="lockFreqBtn" class="px-7 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition shadow-sm flex items-center gap-2">
            Lock Acoustic Setting &rarr;
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

      // Grid background
      ctx.strokeStyle = '#f0eeea';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 30) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
      }

      ctx.strokeStyle = '#bd6f5d';
      ctx.lineWidth = 2.5;
      ctx.beginPath();

      const freq = 0.015 + (sliderVal / 100) * 0.05;
      const amp = 14 + (Math.abs(sliderVal - 35) / 50) * 16;

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
      if (!firstAdjustmentTime) firstAdjustmentTime = performance.now();
      if (feedback) {
        if (Math.abs(sliderVal - 35) <= 10) {
          feedback.innerHTML = '<span class="text-emerald-700 font-semibold flex items-center justify-center gap-1">&#10003; Acoustic balance reached — warm and pleasant tone.</span>';
        } else if (sliderVal > 35) {
          feedback.textContent = 'Tone remains slightly sharp on highs.';
        } else {
          feedback.textContent = 'Tone is currently subdued.';
        }
      }
      logEvent('slider_input', { value: sliderVal });
    });

    document.getElementById('lockFreqBtn')?.addEventListener('click', () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      const latency = firstAdjustmentTime ? (firstAdjustmentTime - cueOnsetTime) : 1800.0;
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

  render();
}

// --------------------------------------------------------------------------
// F2: The Gathering Voices
// --------------------------------------------------------------------------
function runF2AmbiguousCue(app, renderHeader, logEvent, onComplete) {
  let inTutorial = true;
  let selectedOption = null;

  const options = [
    {
      id: 'F2_ASK',
      title: 'Clarify with Kindness',
      desc: 'Ask: "Would you like the recital microphone to sound warmer or softer?"',
      detail: 'Checks the exact preference before making audio changes.'
    },
    {
      id: 'F2_TEST',
      title: 'Gentle Test Adjustment',
      desc: 'Lower the bass slightly and ask if that feels more balanced.',
      detail: 'Tries a modest change to see if it immediately solves the issue.'
    },
    {
      id: 'F2_HOLD',
      title: 'Consult the Hall',
      desc: 'Keep current level and invite the listeners to give live feedback.',
      detail: 'Gathers input directly from audience members.'
    }
  ];

  function render() {
    if (inTutorial) {
      app.innerHTML = `
        <div>
          ${renderHeader('Part 2: The Gathering Voices', 'Coordinating acoustic clarity with your event colleagues.')}
          ${renderTutorialCard({
            icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path></svg>`,
            goal: 'Choose how to address ambiguous acoustic feedback.',
            steps: [
              'Read the setup volunteer’s impression of the audio balance.',
              'Review the three constructive communication choices.',
              'Select the dialogue approach you would take.'
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
        ${renderHeader('Part 2: The Gathering Voices', 'A team member shares an impression. Choose your approach.')}

        <div class="p-4 bg-amber-50/80 border border-[var(--accent-gold)]/40 rounded-sm mb-6 flex items-center gap-3">
          <div class="w-9 h-9 rounded-full bg-[var(--accent-gold)] text-white flex items-center justify-center font-serif text-sm font-semibold shrink-0">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
          </div>
          <div>
            <div class="text-[10px] uppercase tracking-wider text-[var(--accent-gold)] font-semibold">Stage Volunteer</div>
            <div class="text-xs text-[var(--text-primary)] font-medium mt-0.5">"Something feels a bit off with the spoken audio in the center aisle, though I cannot pinpoint it."</div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          ${options.map(opt => `
            <div class="f2-card p-4 bg-white border border-[var(--grid-border)] cursor-pointer hover:border-[var(--accent-gold)] hover:shadow-sm transition space-y-2" data-opt="${opt.id}">
              <div class="text-xs font-semibold text-[var(--text-primary)] flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full bg-[var(--accent-gold)]"></span>
                ${opt.title}
              </div>
              <div class="text-xs text-[var(--text-secondary)] leading-relaxed">${opt.desc}</div>
              <div class="text-[10px] text-[var(--accent-gold)] pt-2 border-t border-[var(--grid-border)] font-medium">${opt.detail}</div>
            </div>
          `).join('')}
        </div>

        <div class="flex justify-end">
          <button id="f2ConfirmBtn" disabled class="px-7 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] disabled:opacity-40 transition shadow-sm">
            Confirm Communication &rarr;
          </button>
        </div>
      </div>
    `;

    const confirmBtn = document.getElementById('f2ConfirmBtn');
    app.querySelectorAll('.f2-card').forEach(card => {
      card.addEventListener('click', () => {
        app.querySelectorAll('.f2-card').forEach(c => c.classList.remove('border-[var(--accent-gold)]', 'bg-amber-50/40', 'shadow-sm'));
        card.classList.add('border-[var(--accent-gold)]', 'bg-amber-50/40', 'shadow-sm');
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

  render();
}

// --------------------------------------------------------------------------
// F3: The Echo of the Room
// --------------------------------------------------------------------------
function runF3ContextChange(app, renderHeader, logEvent, onComplete) {
  let inTutorial = true;
  let hallSlider = 50;

  function render() {
    if (inTutorial) {
      app.innerHTML = `
        <div>
          ${renderHeader('Part 3: The Echo of the Room', 'Adjusting natural reverberation for spoken poetry.')}
          ${renderTutorialCard({
            icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path></svg>`,
            goal: 'Adapt natural hall acoustics to ensure every recited verse carries clearly.',
            steps: [
              'Notice the new venue acoustic condition notice.',
              'Adjust the reverberation dial toward crisp vocal clarity.',
              'Lock in the setting when the acoustic check shows green.'
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
        ${renderHeader('Part 3: The Echo of the Room', 'The performance moved into the stone courtyard. Set the echo balance.')}

        <div class="p-4 bg-amber-50/80 border border-[var(--accent-gold)]/40 rounded-sm mb-6 flex items-center gap-3">
          <div class="w-9 h-9 rounded-full bg-[var(--accent-gold)] text-white flex items-center justify-center font-serif text-sm font-semibold shrink-0">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
          </div>
          <div>
            <div class="text-[10px] uppercase tracking-wider text-[var(--accent-gold)] font-semibold">Courtyard Acoustic Note</div>
            <div class="text-xs text-[var(--text-primary)] font-medium mt-0.5">"The arched stone walls create reverberation. Bring the echo down to roughly 25%."</div>
          </div>
        </div>

        <div class="p-6 bg-[#faf8f5] border border-[var(--grid-border)] mb-6 text-center shadow-inner">
          <div class="w-full max-w-md mx-auto">
            <div class="flex justify-between items-center text-xs text-[var(--text-secondary)] mb-2">
              <span class="font-medium text-stone-700">Direct Clarity (0%)</span>
              <span class="font-mono text-sm font-semibold text-[var(--accent-gold)] bg-white px-3 py-1 border border-[var(--grid-border)]" id="hallValDisplay">${hallSlider}%</span>
              <span class="font-medium text-stone-700">Full Echo (100%)</span>
            </div>
            <input type="range" id="hallSlider" min="0" max="100" value="${hallSlider}" class="w-full accent-[#bd6f5d] cursor-pointer h-2 bg-stone-200 rounded-lg">
          </div>

          <div id="hallFeedback" class="text-xs text-[var(--text-secondary)] mt-4 font-medium">
            Adjust the slider until vocal clarity is aligned.
          </div>
        </div>

        <div class="flex justify-end">
          <button id="f3LockBtn" class="px-7 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition shadow-sm">
            Save Courtyard Setting &rarr;
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

  render();
}

