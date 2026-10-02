/* ==========================================================================
   ALFAAZ RECRUIT — WORLD 1: THE FREQUENCY (تعدد)
   Mini-games: F1 (Tuning the Hall), F2 (The Gathering Voices), F3 (The Echo of the Room)
   Plain language remediation for human playtest pass 1.
   Sentences <= 12 words. Simple conversational English. Jargon removed.
   Preserves raw behavioral telemetry emissions and exact stimulus/action IDs.
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
// F1: Tuning the Hall (6 trials)
// Conditions: accommodate, maintain_objective, clarify
// --------------------------------------------------------------------------
function runF1CueDetection(app, renderHeader, logEvent, onComplete) {
  let inTutorial = true;
  let currentTrial = 0;
  let sliderVal = 50;
  let selectedAction = 'accommodate';
  let lastInputModality = 'mouse';
  let animationFrameId = null;

  const trials = [
    {
      stimulus_id: 'F1_T1',
      title: 'Sound Note: Sharp Echo',
      cue_text: '"Front row sound has sharp treble and heavy wall echo."',
      default_action: 'accommodate'
    },
    {
      stimulus_id: 'F1_T2',
      title: 'Sound Note: Clear Hall',
      cue_text: '"Center hall sound is clear, balanced, and easy to hear."',
      default_action: 'maintain_objective'
    },
    {
      stimulus_id: 'F1_T3',
      title: 'Sound Note: Quiet Whisper',
      cue_text: '"The speaker is reciting a whisper. Words are hard to hear."',
      default_action: 'accommodate'
    },
    {
      stimulus_id: 'F1_T4',
      title: 'Sound Note: Sudden Silence',
      cue_text: '"A sudden quiet pause. Could be a dramatic silence or equipment issue."',
      default_action: 'clarify'
    },
    {
      stimulus_id: 'F1_T5',
      title: 'Sound Note: Group Singing',
      cue_text: '"Group singing is steady and balanced across the entire room."',
      default_action: 'maintain_objective'
    },
    {
      stimulus_id: 'F1_T6',
      title: 'Sound Note: Loud Voice Peak',
      cue_text: '"The speaker\'s voice peaks loudly on strong dramatic verse lines."',
      default_action: 'accommodate'
    }
  ];

  function render() {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }

    if (inTutorial) {
      app.innerHTML = `
        <div class="candidate-content-protected max-w-2xl mx-auto">
          ${renderHeader('Tuning the Hall', 'Adjust the hall sound to support the poetry reading.')}
          ${renderTutorialCard({
            icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 100-6 3 3 0 000 6z"></path></svg>`,
            goal: 'Listen to the hall sound and adjust settings across 6 rounds.',
            steps: [
              'Read the sound note from the hall.',
              'Pick your response: Adjust, Keep, or Check.',
              'Move the sound slider if needed, then confirm.'
            ]
          })}
        </div>
      `;
      document.getElementById('startActivityBtn')?.addEventListener('click', () => {
        inTutorial = false;
        currentTrial = 0;
        sliderVal = 50;
        selectedAction = 'accommodate';
        render();
      });
      return;
    }

    const t = trials[currentTrial];

    app.innerHTML = `
      <div class="animate-fadeIn max-w-2xl mx-auto">
        <!-- TOP BAR -->
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3 pb-2 border-b border-[var(--grid-border)]">
          <div class="flex items-center gap-2">
            <span class="act-badge">World 1: The Frequency</span>
            <span class="text-xs text-[var(--text-secondary)] font-mono">Part 1 of 3 · Round ${currentTrial + 1} of 6</span>
          </div>
          <div class="text-[11px] text-[var(--accent-gold)] font-mono font-medium">Takes about 1 minute</div>
        </div>

        <!-- TASK HEADER -->
        <div class="mb-4">
          <h2 class="text-xl sm:text-2xl font-serif text-[var(--text-primary)]">Tuning the Hall</h2>
          <p class="text-xs text-[var(--text-secondary)] mt-0.5">Adjust the hall sound to support the poetry reading.</p>
        </div>

        <!-- YOUR TASK -->
        <div class="p-3 sm:p-4 bg-amber-50/70 border border-[var(--accent-gold)]/40 rounded-xs mb-4 candidate-content-protected">
          <div class="text-[10px] uppercase tracking-wider font-mono text-[var(--accent-gold)] font-semibold mb-1">Your Task</div>
          <div class="text-xs text-[var(--text-primary)] leading-relaxed">
            Read the sound note below. Pick your response and move the slider.
          </div>
        </div>

        <!-- LOOK AT THIS -->
        <div class="p-4 bg-white border border-[var(--grid-border)] rounded-xs mb-4 shadow-xs candidate-content-protected">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-full bg-[var(--accent-gold)] text-white flex items-center justify-center font-serif text-sm font-semibold shrink-0">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path></svg>
            </div>
            <div>
              <div class="text-[10px] uppercase tracking-wider font-mono text-[var(--accent-gold)] font-semibold">${t.title}</div>
              <div id="partnerSpeech" class="text-xs text-[var(--text-primary)] font-medium mt-0.5 leading-relaxed">${t.cue_text}</div>
            </div>
          </div>
        </div>

        <!-- INTERACTION AREA -->
        <div class="mb-5 candidate-content-protected">
          <div class="text-xs uppercase tracking-wider text-[var(--text-secondary)] mb-2 font-mono">1. Choose your response:</div>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button type="button" class="f1-action-btn p-3.5 text-left border rounded-xs transition min-h-[56px] ${selectedAction === 'accommodate' ? 'border-[var(--accent-gold)] bg-amber-50/70 shadow-xs' : 'border-[var(--grid-border)] bg-white hover:border-[var(--accent-gold)]'}" data-action="accommodate">
              <div class="text-xs font-semibold text-[var(--text-primary)] flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full ${selectedAction === 'accommodate' ? 'bg-[var(--accent-gold)]' : 'bg-stone-300'}"></span>
                Adjust Sound
              </div>
              <div class="text-[11px] text-[var(--text-secondary)] mt-1 leading-relaxed">Change the sound setting to help the speaker.</div>
            </button>
            <button type="button" class="f1-action-btn p-3.5 text-left border rounded-xs transition min-h-[56px] ${selectedAction === 'maintain_objective' ? 'border-[var(--accent-gold)] bg-amber-50/70 shadow-xs' : 'border-[var(--grid-border)] bg-white hover:border-[var(--accent-gold)]'}" data-action="maintain_objective">
              <div class="text-xs font-semibold text-[var(--text-primary)] flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full ${selectedAction === 'maintain_objective' ? 'bg-[var(--accent-gold)]' : 'bg-stone-300'}"></span>
                Keep Baseline
              </div>
              <div class="text-[11px] text-[var(--text-secondary)] mt-1 leading-relaxed">Leave the current sound setting as it is.</div>
            </button>
            <button type="button" class="f1-action-btn p-3.5 text-left border rounded-xs transition min-h-[56px] ${selectedAction === 'clarify' ? 'border-[var(--accent-gold)] bg-amber-50/70 shadow-xs' : 'border-[var(--grid-border)] bg-white hover:border-[var(--accent-gold)]'}" data-action="clarify">
              <div class="text-xs font-semibold text-[var(--text-primary)] flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full ${selectedAction === 'clarify' ? 'bg-[var(--accent-gold)]' : 'bg-stone-300'}"></span>
                Check Channel
              </div>
              <div class="text-[11px] text-[var(--text-secondary)] mt-1 leading-relaxed">Check the audio signal before changing settings.</div>
            </button>
          </div>
        </div>

        <!-- Slider Area -->
        <div class="p-5 bg-[#faf8f5] border border-[var(--grid-border)] mb-5 rounded-xs shadow-inner candidate-content-protected">
          <div class="text-xs uppercase tracking-wider text-[var(--text-secondary)] mb-2 font-mono text-center">2. Adjust sound level:</div>
          <canvas id="waveCanvas" width="600" height="80" class="w-full h-20 bg-white border border-[var(--grid-border)] mb-4 rounded-xs"></canvas>

          <div class="w-full max-w-md mx-auto">
            <div class="flex justify-between items-center text-xs text-[var(--text-secondary)] mb-2">
              <span class="flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-amber-600 inline-block"></span> Soft (0)</span>
              <span class="font-mono text-sm font-semibold text-[var(--accent-gold)] bg-white px-3 py-1 border border-[var(--grid-border)] rounded-xs" id="sliderValDisplay">${sliderVal}</span>
              <span class="flex items-center gap-1">Bright (100) <span class="w-2 h-2 rounded-full bg-orange-500 inline-block"></span></span>
            </div>
            <input type="range" id="freqSlider" min="0" max="100" step="5" value="${sliderVal}" class="w-full accent-[#bd6f5d] cursor-pointer h-2 bg-stone-200 rounded-lg min-h-[44px]">
          </div>
        </div>

        <!-- YOUR CHOICE -->
        <div class="p-3 bg-white border border-[var(--grid-border)] rounded-xs mb-4 text-xs font-mono text-[var(--text-secondary)] flex justify-between items-center">
          <span>Your setting: <strong class="text-[var(--text-primary)]" id="choiceSummary">${selectedAction === 'accommodate' ? 'Adjust Sound' : (selectedAction === 'maintain_objective' ? 'Keep Baseline' : 'Check Channel')} (Level: ${sliderVal})</strong></span>
          <span class="text-[10px] text-stone-400 font-mono">${currentTrial + 1} / 6</span>
        </div>

        <!-- PRIMARY ACTION BUTTON -->
        <div class="flex justify-end">
          <button id="lockFreqBtn" class="w-full sm:w-auto px-7 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition shadow-sm rounded-xs flex items-center justify-center gap-2 min-h-[44px]">
            ${currentTrial < 5 ? 'Confirm Setting &rarr;' : 'Finish Sound Setup &rarr;'}
          </button>
        </div>
      </div>
    `;

    const canvas = document.getElementById('waveCanvas');
    const ctx = canvas?.getContext('2d');
    const slider = document.getElementById('freqSlider');
    const valDisplay = document.getElementById('sliderValDisplay');
    const choiceSummary = document.getElementById('choiceSummary');

    let waveOffset = 0;
    function drawWave() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = '#f0eeea';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 30) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
      }

      ctx.strokeStyle = '#bd6f5d';
      ctx.lineWidth = 2.5;
      ctx.beginPath();

      const freq = 0.015 + (sliderVal / 100) * 0.05;
      const amp = 14 + (Math.abs(sliderVal - 50) / 50) * 16;

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

    // Action button handlers
    app.querySelectorAll('.f1-action-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        lastInputModality = 'mouse';
        selectedAction = btn.getAttribute('data-action');
        app.querySelectorAll('.f1-action-btn').forEach(b => {
          b.classList.remove('border-[var(--accent-gold)]', 'bg-amber-50/70', 'shadow-xs');
          b.classList.add('border-[var(--grid-border)]', 'bg-white');
          b.querySelector('span.rounded-full')?.classList.remove('bg-[var(--accent-gold)]');
          b.querySelector('span.rounded-full')?.classList.add('bg-stone-300');
        });
        btn.classList.add('border-[var(--accent-gold)]', 'bg-amber-50/70', 'shadow-xs');
        btn.classList.remove('border-[var(--grid-border)]', 'bg-white');
        btn.querySelector('span.rounded-full')?.classList.add('bg-[var(--accent-gold)]');
        btn.querySelector('span.rounded-full')?.classList.remove('bg-stone-300');
        if (choiceSummary) {
          const lbl = selectedAction === 'accommodate' ? 'Adjust Sound' : (selectedAction === 'maintain_objective' ? 'Keep Baseline' : 'Check Channel');
          choiceSummary.textContent = `${lbl} (Level: ${sliderVal})`;
        }
      });
    });

    let lastSliderLogTime = 0;
    let sliderThrottleTimer = null;

    const emitSliderEvent = (val, modality) => {
      logEvent('slider_input', {
        trial_index: currentTrial,
        stimulus_id: t.stimulus_id,
        slider_position_raw: val,
        input_modality: modality,
        task_def_version: '1.0'
      });
      lastSliderLogTime = Date.now();
    };

    slider?.addEventListener('input', (e) => {
      lastInputModality = e.pointerType || 'mouse';
      sliderVal = parseInt(e.target.value, 10);
      if (valDisplay) valDisplay.textContent = sliderVal;
      if (choiceSummary) {
        const lbl = selectedAction === 'accommodate' ? 'Adjust Sound' : (selectedAction === 'maintain_objective' ? 'Keep Baseline' : 'Check Channel');
        choiceSummary.textContent = `${lbl} (Level: ${sliderVal})`;
      }

      const now = Date.now();
      if (now - lastSliderLogTime >= 100) {
        if (sliderThrottleTimer) {
          clearTimeout(sliderThrottleTimer);
          sliderThrottleTimer = null;
        }
        emitSliderEvent(sliderVal, lastInputModality);
      } else if (!sliderThrottleTimer) {
        sliderThrottleTimer = setTimeout(() => {
          emitSliderEvent(sliderVal, lastInputModality);
          sliderThrottleTimer = null;
        }, 100 - (now - lastSliderLogTime));
      }
    });

    slider?.addEventListener('change', () => {
      if (sliderThrottleTimer) {
        clearTimeout(sliderThrottleTimer);
        sliderThrottleTimer = null;
      }
      emitSliderEvent(sliderVal, lastInputModality);
    });

    slider?.addEventListener('keydown', (e) => {
      if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
        lastInputModality = 'keyboard';
      }
    });

    document.getElementById('lockFreqBtn')?.addEventListener('click', () => {
      if (sliderThrottleTimer) {
        clearTimeout(sliderThrottleTimer);
        sliderThrottleTimer = null;
      }
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }

      logEvent('trial_submit', {
        trial_index: currentTrial,
        stimulus_id: t.stimulus_id,
        action_id: selectedAction,
        slider_position_raw: sliderVal,
        input_modality: lastInputModality,
        task_def_version: '1.0'
      });

      if (currentTrial < 5) {
        currentTrial++;
        sliderVal = 50;
        selectedAction = trials[currentTrial].default_action;
        render();
      } else {
        onComplete({
          mini_game: 'F1',
          observations_count: 6
        });
      }
    });
  }

  render();
}

// --------------------------------------------------------------------------
// F2: The Gathering Voices (4 trials)
// Action choices: act, clarify, maintain
// --------------------------------------------------------------------------
function runF2AmbiguousCue(app, renderHeader, logEvent, onComplete) {
  let inTutorial = true;
  let currentTrial = 0;
  let selectedAction = null;
  let lastInputModality = 'mouse';

  const trials = [
    {
      stimulus_id: 'F2_T1',
      speaker_role: 'Stage Lead',
      cue_text: '"The poet gestures toward the side speaker, asking for sound help."',
      condition_label: 'Direct Request'
    },
    {
      stimulus_id: 'F2_T2',
      speaker_role: 'Hall Helper',
      cue_text: '"The speaker pauses with an uncertain look. No words are spoken."',
      condition_label: 'Ambiguous Signal'
    },
    {
      stimulus_id: 'F2_T3',
      speaker_role: 'Sound Helper',
      cue_text: '"The performer sings with intense emotion as part of the poem."',
      condition_label: 'Expressive Intensity'
    },
    {
      stimulus_id: 'F2_T4',
      speaker_role: 'Guest Drummer',
      cue_text: '"The drum player slowed tempo and watches the speaker closely."',
      condition_label: 'Subtle Drift'
    }
  ];

  const choices = [
    {
      id: 'act',
      title: 'Act Directly',
      desc: 'Take action right away to help the speaker.'
    },
    {
      id: 'clarify',
      title: 'Ask for Clarity',
      desc: 'Check with the speaker before making any changes.'
    },
    {
      id: 'maintain',
      title: 'Keep Course',
      desc: 'Stay on course without stepping in too early.'
    }
  ];

  function render() {
    if (inTutorial) {
      app.innerHTML = `
        <div class="candidate-content-protected max-w-2xl mx-auto">
          ${renderHeader('The Gathering Voices', 'Coordinate sound with your hall team.')}
          ${renderTutorialCard({
            icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path></svg>`,
            goal: 'Read each team message and choose the best response across 4 rounds.',
            steps: [
              'Read the update from your hall teammate.',
              'Decide if the message is clear, uncertain, or mixed.',
              'Choose your next step: Act, Ask, or Wait.'
            ]
          })}
        </div>
      `;
      document.getElementById('startActivityBtn')?.addEventListener('click', () => {
        inTutorial = false;
        currentTrial = 0;
        selectedAction = null;
        render();
      });
      return;
    }

    const t = trials[currentTrial];

    app.innerHTML = `
      <div class="animate-fadeIn max-w-2xl mx-auto">
        <!-- TOP BAR -->
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3 pb-2 border-b border-[var(--grid-border)]">
          <div class="flex items-center gap-2">
            <span class="act-badge">World 1: The Frequency</span>
            <span class="text-xs text-[var(--text-secondary)] font-mono">Part 2 of 3 · Round ${currentTrial + 1} of 4</span>
          </div>
          <div class="text-[11px] text-[var(--accent-gold)] font-mono font-medium">Takes about 1 minute</div>
        </div>

        <!-- TASK HEADER -->
        <div class="mb-4">
          <h2 class="text-xl sm:text-2xl font-serif text-[var(--text-primary)]">The Gathering Voices</h2>
          <p class="text-xs text-[var(--text-secondary)] mt-0.5">Coordinate sound with your hall team.</p>
        </div>

        <!-- YOUR TASK -->
        <div class="p-3 sm:p-4 bg-amber-50/70 border border-[var(--accent-gold)]/40 rounded-xs mb-4 candidate-content-protected">
          <div class="text-[10px] uppercase tracking-wider font-mono text-[var(--accent-gold)] font-semibold mb-1">Your Task</div>
          <div class="text-xs text-[var(--text-primary)] leading-relaxed">
            Read the message from your teammate. Pick the best response below.
          </div>
        </div>

        <!-- LOOK AT THIS -->
        <div class="p-4 bg-white border border-[var(--grid-border)] rounded-xs mb-4 shadow-xs candidate-content-protected">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-full bg-[var(--accent-gold)] text-white flex items-center justify-center font-serif text-sm font-semibold shrink-0">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
            </div>
            <div>
              <div class="text-[10px] uppercase tracking-wider font-mono text-[var(--accent-gold)] font-semibold">${t.speaker_role}</div>
              <div class="text-xs text-[var(--text-primary)] font-medium mt-0.5 leading-relaxed">${t.cue_text}</div>
            </div>
          </div>
        </div>

        <!-- INTERACTION AREA -->
        <div class="mb-4 candidate-content-protected">
          <div class="text-xs uppercase tracking-wider text-[var(--text-secondary)] mb-2 font-mono">Pick your response:</div>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            ${choices.map(c => `
              <div class="f2-card p-4 bg-white border ${selectedAction === c.id ? 'border-[var(--accent-gold)] bg-amber-50/70 shadow-xs' : 'border-[var(--grid-border)]'} cursor-pointer hover:border-[var(--accent-gold)] transition space-y-1.5 rounded-xs min-h-[56px]" data-action="${c.id}" tabindex="0" role="button">
                <div class="text-xs font-semibold text-[var(--text-primary)] flex items-center gap-1.5">
                  <span class="w-2 h-2 rounded-full ${selectedAction === c.id ? 'bg-[var(--accent-gold)]' : 'bg-stone-300'}"></span>
                  ${c.title}
                </div>
                <div class="text-[11px] text-[var(--text-secondary)] leading-relaxed">${c.desc}</div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- YOUR CHOICE -->
        <div class="p-3 bg-white border border-[var(--grid-border)] rounded-xs mb-4 text-xs font-mono text-[var(--text-secondary)] flex justify-between items-center">
          <span id="f2ChoiceText">${selectedAction ? `You selected: <strong class="text-[var(--text-primary)]">${choices.find(c => c.id === selectedAction)?.title}</strong>` : 'Select an option above to continue.'}</span>
          <span class="text-[10px] text-stone-400 font-mono">${currentTrial + 1} / 4</span>
        </div>

        <!-- PRIMARY ACTION BUTTON -->
        <div class="flex justify-end">
          <button id="f2ConfirmBtn" ${selectedAction ? '' : 'disabled'} class="w-full sm:w-auto px-7 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] disabled:opacity-40 transition shadow-sm rounded-xs min-h-[44px]">
            ${currentTrial < 3 ? 'Confirm Choice &rarr;' : 'Finish Team Coordination &rarr;'}
          </button>
        </div>
      </div>
    `;

    const confirmBtn = document.getElementById('f2ConfirmBtn');
    const choiceText = document.getElementById('f2ChoiceText');

    app.querySelectorAll('.f2-card').forEach(card => {
      const selectCard = (modality) => {
        lastInputModality = modality;
        selectedAction = card.getAttribute('data-action');
        app.querySelectorAll('.f2-card').forEach(c => {
          c.classList.remove('border-[var(--accent-gold)]', 'bg-amber-50/70', 'shadow-xs');
          c.classList.add('border-[var(--grid-border)]');
          c.querySelector('span.rounded-full')?.classList.remove('bg-[var(--accent-gold)]');
          c.querySelector('span.rounded-full')?.classList.add('bg-stone-300');
        });
        card.classList.add('border-[var(--accent-gold)]', 'bg-amber-50/70', 'shadow-xs');
        card.classList.remove('border-[var(--grid-border)]');
        card.querySelector('span.rounded-full')?.classList.add('bg-[var(--accent-gold)]');
        card.querySelector('span.rounded-full')?.classList.remove('bg-stone-300');
        if (confirmBtn) confirmBtn.disabled = false;
        if (choiceText) {
          const ch = choices.find(c => c.id === selectedAction);
          choiceText.innerHTML = `You selected: <strong class="text-[var(--text-primary)]">${ch?.title}</strong>`;
        }
      };

      card.addEventListener('click', () => selectCard('mouse'));
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          selectCard('keyboard');
        }
      });
    });

    confirmBtn?.addEventListener('click', () => {
      logEvent('trial_submit', {
        trial_index: currentTrial,
        stimulus_id: t.stimulus_id,
        action_id: selectedAction,
        input_modality: lastInputModality,
        task_def_version: '1.0'
      });

      if (currentTrial < 3) {
        currentTrial++;
        selectedAction = null;
        render();
      } else {
        onComplete({
          mini_game: 'F2',
          observations_count: 4
        });
      }
    });
  }

  render();
}

// --------------------------------------------------------------------------
// F3: The Echo of the Room (3 context transitions)
// Mechanic: Baseline response -> New context changes interpretation -> Updated response
// --------------------------------------------------------------------------
function runF3ContextChange(app, renderHeader, logEvent, onComplete) {
  let inTutorial = true;
  let currentTransition = 0;
  let phase = 'baseline';
  let selectedBaselineChoice = null;
  let selectedUpdatedChoice = null;
  let lastInputModality = 'mouse';

  const transitions = [
    {
      stimulus_id: 'F3_T1',
      cue_id: 'cue_expressive_crescendo',
      title: 'Round 1: Rising Voice Line',
      cue_text: '"The poet begins a rising, powerful verse."',
      baseline_context: 'Small Practice Room — Sound dies down quickly with no echo.',
      baseline_options: [
        { id: 'support_volume', label: 'Support Volume', desc: 'Lift volume so sound carries across the room.' },
        { id: 'dampen_level', label: 'Lower Level', desc: 'Turn volume down before the loud peak.' },
        { id: 'neutral_hold', label: 'Keep Steady', desc: 'Keep room settings steady without changes.' }
      ],
      shifted_context: 'Stone Hall — High stone walls bounce sound and create heavy echo.',
      shifted_options: [
        { id: 'attenuate_reverb', label: 'Lower Echo', desc: 'Trim room echo so words stay clear.' },
        { id: 'support_volume', label: 'Support Volume', desc: 'Keep the volume boost from the small room.' },
        { id: 'neutral_hold', label: 'Keep Steady', desc: 'Make no changes for the stone room.' }
      ]
    },
    {
      stimulus_id: 'F3_T2',
      cue_id: 'cue_sotto_voce_pause',
      title: 'Round 2: Quiet Whisper',
      cue_text: '"The poet drops into a quiet whisper between lines."',
      baseline_context: 'Quiet Sitting Room — Audience sits close and easily hears every word.',
      baseline_options: [
        { id: 'preserve_natural_intimacy', label: 'Keep Natural Tone', desc: 'Keep sound soft and clear without extra volume.' },
        { id: 'boost_high_gain', label: 'High Boost', desc: 'Force the whisper to play at loud volume.' },
        { id: 'cut_channel', label: 'Mute Feed', desc: 'Treat quiet verse as dead sound.' }
      ],
      shifted_context: 'Courtyard Gate — Nearby street chatter and fountain water cover soft voices.',
      shifted_options: [
        { id: 'boost_intelligibility', label: 'Boost Voice', desc: 'Lift the voice so outdoor chatter does not hide it.' },
        { id: 'preserve_natural_intimacy', label: 'Keep Natural Tone', desc: 'Leave voice unboosted so whisper is hard to hear.' },
        { id: 'cut_channel', label: 'Mute Feed', desc: 'Treat quiet sound as an equipment issue.' }
      ]
    },
    {
      stimulus_id: 'F3_T3',
      cue_id: 'cue_rhythmic_syncopation',
      title: 'Round 3: Pause Before Verse',
      cue_text: '"The poet pauses suddenly before the final line."',
      baseline_context: 'Solo Recital — A single speaker recites at a steady, driving pace.',
      baseline_options: [
        { id: 'sustain_cadence', label: 'Keep Pace', desc: 'Keep the steady beat moving through the pause.' },
        { id: 'halt_accompaniment', label: 'Stop Sound', desc: 'Stop all instruments abruptly on the pause.' },
        { id: 'force_metronome', label: 'Speed Up', desc: 'Push the recital forward past the pause.' }
      ],
      shifted_context: 'Group Singing — A chorus enters during the pause to sing an answer line.',
      shifted_options: [
        { id: 'open_reciprocal_space', label: 'Make Space', desc: 'Pause instruments to let the chorus answer clearly.' },
        { id: 'sustain_cadence', label: 'Keep Pace', desc: 'Play straight through without waiting for the chorus.' },
        { id: 'force_metronome', label: 'Speed Up', desc: 'Rush the group tempo forward.' }
      ]
    }
  ];

  function render() {
    if (inTutorial) {
      app.innerHTML = `
        <div class="candidate-content-protected max-w-2xl mx-auto">
          ${renderHeader('The Echo of the Room', 'Adjust your choices when room sound changes.')}
          ${renderTutorialCard({
            icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path></svg>`,
            goal: 'See how the same performance needs a new response when the room changes.',
            steps: [
              'Read what the performer does in the first room.',
              'Pick your first response.',
              'See the new room setting and pick an updated response.'
            ]
          })}
        </div>
      `;
      document.getElementById('startActivityBtn')?.addEventListener('click', () => {
        inTutorial = false;
        currentTransition = 0;
        phase = 'baseline';
        selectedBaselineChoice = null;
        selectedUpdatedChoice = null;
        logTransitionPresented();
        render();
      });
      return;
    }

    const tr = transitions[currentTransition];

    if (phase === 'baseline') {
      const activeOpt = tr.baseline_options.find(o => o.id === selectedBaselineChoice);
      app.innerHTML = `
        <div class="animate-fadeIn max-w-2xl mx-auto">
          <!-- TOP BAR -->
          <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3 pb-2 border-b border-[var(--grid-border)]">
            <div class="flex items-center gap-2">
              <span class="act-badge">World 1: The Frequency</span>
              <span class="text-xs text-[var(--text-secondary)] font-mono">Part 3 of 3 · Transition ${currentTransition + 1} of 3 (Step 1)</span>
            </div>
            <div class="text-[11px] text-[var(--accent-gold)] font-mono font-medium">Takes about 1 minute</div>
          </div>

          <!-- TASK HEADER -->
          <div class="mb-4">
            <h2 class="text-xl sm:text-2xl font-serif text-[var(--text-primary)]">The Echo of the Room</h2>
            <p class="text-xs text-[var(--text-secondary)] mt-0.5">Pick your response for the first room setting.</p>
          </div>

          <!-- YOUR TASK -->
          <div class="p-3 sm:p-4 bg-amber-50/70 border border-[var(--accent-gold)]/40 rounded-xs mb-4 candidate-content-protected">
            <div class="text-[10px] uppercase tracking-wider font-mono text-[var(--accent-gold)] font-semibold mb-1">Your Task</div>
            <div class="text-xs text-[var(--text-primary)] leading-relaxed">
              Read the performer action in this room. Pick your first response.
            </div>
          </div>

          <!-- LOOK AT THIS -->
          <div class="p-4 bg-white border border-[var(--grid-border)] rounded-xs mb-4 shadow-xs candidate-content-protected space-y-3">
            <div>
              <span class="text-[10px] uppercase font-mono tracking-wider text-[var(--accent-gold)] font-semibold">Performer Action</span>
              <div class="text-xs font-serif text-[var(--text-primary)] font-medium mt-0.5 leading-relaxed">${tr.cue_text}</div>
            </div>
            <div class="p-3 bg-amber-50/50 border border-[var(--grid-border)] rounded-xs">
              <span class="text-[10px] uppercase font-mono tracking-wider text-amber-800 font-semibold">First Room Setting</span>
              <div class="text-xs text-[var(--text-primary)] mt-0.5">${tr.baseline_context}</div>
            </div>
          </div>

          <!-- INTERACTION AREA -->
          <div class="space-y-2.5 mb-4 candidate-content-protected">
            <div class="text-xs uppercase tracking-wider text-[var(--text-secondary)] mb-1 font-mono">Choose your response:</div>
            ${tr.baseline_options.map(opt => `
              <div class="f3-opt p-3.5 bg-white border ${selectedBaselineChoice === opt.id ? 'border-[var(--accent-gold)] bg-amber-50/70 shadow-xs' : 'border-[var(--grid-border)]'} cursor-pointer hover:border-[var(--accent-gold)] transition rounded-xs min-h-[50px]" data-choice="${opt.id}" tabindex="0" role="button">
                <div class="text-xs font-semibold text-[var(--text-primary)] flex items-center gap-1.5">
                  <span class="w-2 h-2 rounded-full ${selectedBaselineChoice === opt.id ? 'bg-[var(--accent-gold)]' : 'bg-stone-300'}"></span>
                  ${opt.label}
                </div>
                <div class="text-[11px] text-[var(--text-secondary)] mt-0.5 leading-relaxed">${opt.desc}</div>
              </div>
            `).join('')}
          </div>

          <!-- YOUR CHOICE -->
          <div class="p-3 bg-white border border-[var(--grid-border)] rounded-xs mb-4 text-xs font-mono text-[var(--text-secondary)] flex justify-between items-center">
            <span>${selectedBaselineChoice ? `You selected: <strong class="text-[var(--text-primary)]">${activeOpt?.label}</strong>` : 'Select an option above to continue.'}</span>
            <span class="text-[10px] text-stone-400 font-mono">Step 1 of 2</span>
          </div>

          <!-- PRIMARY ACTION BUTTON -->
          <div class="flex justify-end">
            <button id="f3BaselineBtn" ${selectedBaselineChoice ? '' : 'disabled'} class="w-full sm:w-auto px-7 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] disabled:opacity-40 transition shadow-sm rounded-xs min-h-[44px]">
              Confirm and See Room Shift &rarr;
            </button>
          </div>
        </div>
      `;

      app.querySelectorAll('.f3-opt').forEach(opt => {
        const select = (modality) => {
          lastInputModality = modality;
          selectedBaselineChoice = opt.getAttribute('data-choice');
          render();
        };
        opt.addEventListener('click', () => select('mouse'));
        opt.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            select('keyboard');
          }
        });
      });

      document.getElementById('f3BaselineBtn')?.addEventListener('click', () => {
        logEvent('baseline_response_selected', {
          trial_index: currentTransition,
          stimulus_id: tr.stimulus_id,
          cue_id: tr.cue_id,
          choice_id: selectedBaselineChoice,
          input_modality: lastInputModality,
          task_def_version: '1.0'
        });

        phase = 'shifted';
        logEvent('context_shifted', {
          trial_index: currentTransition,
          stimulus_id: tr.stimulus_id,
          cue_id: tr.cue_id,
          shifted_context: tr.shifted_context,
          task_def_version: '1.0'
        });
        render();
      });

    } else {
      // phase === 'shifted'
      const activeShiftedOpt = tr.shifted_options.find(o => o.id === selectedUpdatedChoice);
      app.innerHTML = `
        <div class="animate-fadeIn max-w-2xl mx-auto">
          <!-- TOP BAR -->
          <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3 pb-2 border-b border-[var(--grid-border)]">
            <div class="flex items-center gap-2">
              <span class="act-badge">World 1: The Frequency</span>
              <span class="text-xs text-[var(--text-secondary)] font-mono">Part 3 of 3 · Transition ${currentTransition + 1} of 3 (Step 2)</span>
            </div>
            <div class="text-[11px] text-[var(--accent-gold)] font-mono font-medium">Takes about 1 minute</div>
          </div>

          <!-- TASK HEADER -->
          <div class="mb-4">
            <h2 class="text-xl sm:text-2xl font-serif text-[var(--text-primary)]">The Echo of the Room</h2>
            <p class="text-xs text-[var(--text-secondary)] mt-0.5">The room has changed. Update your response.</p>
          </div>

          <!-- YOUR TASK -->
          <div class="p-3 sm:p-4 bg-amber-50/70 border border-[var(--accent-gold)]/40 rounded-xs mb-4 candidate-content-protected">
            <div class="text-[10px] uppercase tracking-wider font-mono text-[var(--accent-gold)] font-semibold mb-1">Your Task</div>
            <div class="text-xs text-[var(--text-primary)] leading-relaxed">
              The performer action is the same. Pick your updated response for the new room.
            </div>
          </div>

          <!-- LOOK AT THIS -->
          <div class="p-4 bg-white border border-[var(--grid-border)] rounded-xs mb-4 shadow-xs candidate-content-protected space-y-3">
            <div>
              <span class="text-[10px] uppercase font-mono tracking-wider text-[var(--accent-gold)] font-semibold">Same Performer Action</span>
              <div class="text-xs font-serif text-[var(--text-primary)] font-medium mt-0.5 leading-relaxed">${tr.cue_text}</div>
            </div>
            <div class="p-3 bg-amber-100/70 border border-[#bd6f5d]/50 rounded-xs">
              <span class="text-[10px] uppercase font-mono tracking-wider text-[#bd6f5d] font-semibold">New Room Setting</span>
              <div class="text-xs text-[var(--text-primary)] font-medium mt-0.5">${tr.shifted_context}</div>
            </div>
          </div>

          <!-- INTERACTION AREA -->
          <div class="space-y-2.5 mb-4 candidate-content-protected">
            <div class="text-xs uppercase tracking-wider text-[var(--text-secondary)] mb-1 font-mono">Choose your updated response:</div>
            ${tr.shifted_options.map(opt => `
              <div class="f3-updated-opt p-3.5 bg-white border ${selectedUpdatedChoice === opt.id ? 'border-[var(--accent-gold)] bg-amber-50/70 shadow-xs' : 'border-[var(--grid-border)]'} cursor-pointer hover:border-[var(--accent-gold)] transition rounded-xs min-h-[50px]" data-choice="${opt.id}" tabindex="0" role="button">
                <div class="text-xs font-semibold text-[var(--text-primary)] flex items-center gap-1.5">
                  <span class="w-2 h-2 rounded-full ${selectedUpdatedChoice === opt.id ? 'bg-[var(--accent-gold)]' : 'bg-stone-300'}"></span>
                  ${opt.label}
                </div>
                <div class="text-[11px] text-[var(--text-secondary)] mt-0.5 leading-relaxed">${opt.desc}</div>
              </div>
            `).join('')}
          </div>

          <!-- YOUR CHOICE -->
          <div class="p-3 bg-white border border-[var(--grid-border)] rounded-xs mb-4 text-xs font-mono text-[var(--text-secondary)] flex justify-between items-center">
            <span>${selectedUpdatedChoice ? `You selected: <strong class="text-[var(--text-primary)]">${activeShiftedOpt?.label}</strong>` : 'Select an option above to continue.'}</span>
            <span class="text-[10px] text-stone-400 font-mono">Step 2 of 2</span>
          </div>

          <!-- PRIMARY ACTION BUTTON -->
          <div class="flex justify-end">
            <button id="f3UpdatedBtn" ${selectedUpdatedChoice ? '' : 'disabled'} class="w-full sm:w-auto px-7 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] disabled:opacity-40 transition shadow-sm rounded-xs min-h-[44px]">
              ${currentTransition < 2 ? 'Save Updated Setting & Next Round &rarr;' : 'Finish World 1 &rarr;'}
            </button>
          </div>
        </div>
      `;

      app.querySelectorAll('.f3-updated-opt').forEach(opt => {
        const select = (modality) => {
          lastInputModality = modality;
          selectedUpdatedChoice = opt.getAttribute('data-choice');
          render();
        };
        opt.addEventListener('click', () => select('mouse'));
        opt.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            select('keyboard');
          }
        });
      });

      document.getElementById('f3UpdatedBtn')?.addEventListener('click', () => {
        logEvent('updated_response_selected', {
          trial_index: currentTransition,
          stimulus_id: tr.stimulus_id,
          cue_id: tr.cue_id,
          choice_id: selectedUpdatedChoice,
          input_modality: lastInputModality,
          task_def_version: '1.0'
        });

        logEvent('transition_completed', {
          trial_index: currentTransition,
          stimulus_id: tr.stimulus_id,
          task_def_version: '1.0'
        });

        if (currentTransition < 2) {
          currentTransition++;
          phase = 'baseline';
          selectedBaselineChoice = null;
          selectedUpdatedChoice = null;
          logTransitionPresented();
          render();
        } else {
          onComplete({
            mini_game: 'F3',
            observations_count: 3
          });
        }
      });
    }
  }

  function logTransitionPresented() {
    const tr = transitions[currentTransition];
    logEvent('transition_presented', {
      trial_index: currentTransition,
      stimulus_id: tr.stimulus_id,
      cue_id: tr.cue_id,
      baseline_context: tr.baseline_context,
      task_def_version: '1.0'
    });
  }

  render();
}
