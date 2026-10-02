/* ==========================================================================
   ALFAAZ RECRUIT — WORLD 1: THE SOUNDSCAPE (تعدد)
   Mini-games: F1 (Tuning the Hall), F2 (The Gathering Voices), F3 (The Echo of the Room)
   Adheres to Design Freeze v1 + Addendum v1.1.
   Emits raw behavioral telemetry only (no client-authored scores or correctness).
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
// F1: Tuning the Hall (6 trials: Cues x task demand)
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
      title: 'Acoustic Note: Reverberant Strain',
      cue_text: '"The sound in the front row has a sharp treble edge and heavy wall reflection."',
      default_action: 'accommodate'
    },
    {
      stimulus_id: 'F1_T2',
      title: 'Acoustic Note: Effortless Resonance',
      cue_text: '"Acoustics in the center hall are clear; resonance is balanced and effortless."',
      default_action: 'maintain_objective'
    },
    {
      stimulus_id: 'F1_T3',
      title: 'Acoustic Note: Quiet Passage',
      cue_text: '"The speaker is reciting a whisper passage; verse intelligibility is dipping."',
      default_action: 'accommodate'
    },
    {
      stimulus_id: 'F1_T4',
      title: 'Acoustic Note: Ambiguous Silence',
      cue_text: '"A sudden pause in the audio stream — could be dramatic silence or a channel fault."',
      default_action: 'clarify'
    },
    {
      stimulus_id: 'F1_T5',
      title: 'Acoustic Note: Balanced Choral',
      cue_text: '"Choral recitation is balanced and rhythm is completely stable throughout the room."',
      default_action: 'maintain_objective'
    },
    {
      stimulus_id: 'F1_T6',
      title: 'Acoustic Note: Projected Forte',
      cue_text: '"Vocal projection is peaking sharply on dramatic verse accents in the hall."',
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
        <div>
          ${renderHeader('Part 1: Tuning the Hall', 'Calibrating the soundscape for the poetry recital across changing acoustic moments.')}
          ${renderTutorialCard({
            icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 100-6 3 3 0 000 6z"></path></svg>`,
            goal: 'Observe each acoustic feedback note and adjust your approach accordingly across 6 trials.',
            steps: [
              'Review the acoustic feedback note from the setup team.',
              'Choose your response approach: Accommodate, Maintain Baseline, or Clarify.',
              'Adjust the acoustic slider if needed, then confirm your setting.'
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
      <div class="animate-fadeIn">
        <div class="flex justify-between items-center mb-2">
          ${renderHeader('Part 1: Tuning the Hall', 'Adjust the acoustic profile to support the recital.')}
          <span class="text-xs uppercase tracking-wider text-[var(--accent-gold)] font-mono font-medium">Trial ${currentTrial + 1} of 6</span>
        </div>

        <!-- Acoustic Dialogue Note -->
        <div class="p-4 bg-amber-50/80 border border-[var(--accent-gold)]/40 rounded-sm mb-6 flex items-center gap-3 shadow-xs">
          <div class="w-9 h-9 rounded-full bg-[var(--accent-gold)] text-white flex items-center justify-center font-serif text-sm font-semibold shrink-0">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path></svg>
          </div>
          <div>
            <div class="text-[10px] uppercase tracking-wider text-[var(--accent-gold)] font-semibold">${t.title}</div>
            <div id="partnerSpeech" class="text-xs text-[var(--text-primary)] font-medium mt-0.5">${t.cue_text}</div>
          </div>
        </div>

        <!-- Action Approach Selection -->
        <div class="mb-5">
          <div class="text-xs uppercase tracking-wider text-[var(--text-secondary)] mb-2 font-medium">Select Operational Response:</div>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button type="button" class="f1-action-btn p-3 text-left border rounded-xs transition ${selectedAction === 'accommodate' ? 'border-[var(--accent-gold)] bg-amber-50/50' : 'border-[var(--grid-border)] bg-white'}" data-action="accommodate">
              <div class="text-xs font-semibold text-[var(--text-primary)]">Accommodate</div>
              <div class="text-[11px] text-[var(--text-secondary)] mt-0.5">Adapt acoustic filter to assist the speaker</div>
            </button>
            <button type="button" class="f1-action-btn p-3 text-left border rounded-xs transition ${selectedAction === 'maintain_objective' ? 'border-[var(--accent-gold)] bg-amber-50/50' : 'border-[var(--grid-border)] bg-white'}" data-action="maintain_objective">
              <div class="text-xs font-semibold text-[var(--text-primary)]">Maintain Objective</div>
              <div class="text-[11px] text-[var(--text-secondary)] mt-0.5">Keep baseline acoustic balance undisturbed</div>
            </button>
            <button type="button" class="f1-action-btn p-3 text-left border rounded-xs transition ${selectedAction === 'clarify' ? 'border-[var(--accent-gold)] bg-amber-50/50' : 'border-[var(--grid-border)] bg-white'}" data-action="clarify">
              <div class="text-xs font-semibold text-[var(--text-primary)]">Clarify Channel</div>
              <div class="text-[11px] text-[var(--text-secondary)] mt-0.5">Verify audio signal before adjusting</div>
            </button>
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
            <input type="range" id="freqSlider" min="0" max="100" step="5" value="${sliderVal}" class="w-full accent-[#bd6f5d] cursor-pointer h-2 bg-stone-200 rounded-lg">
          </div>
        </div>

        <div class="flex justify-end">
          <button id="lockFreqBtn" class="px-7 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition shadow-sm flex items-center gap-2">
            ${currentTrial < 5 ? 'Confirm Setting &rarr;' : 'Finish Acoustic Calibration &rarr;'}
          </button>
        </div>
      </div>
    `;

    const canvas = document.getElementById('waveCanvas');
    const ctx = canvas?.getContext('2d');
    const slider = document.getElementById('freqSlider');
    const valDisplay = document.getElementById('sliderValDisplay');

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
      btn.addEventListener('click', (e) => {
        lastInputModality = 'mouse';
        selectedAction = btn.getAttribute('data-action');
        app.querySelectorAll('.f1-action-btn').forEach(b => {
          b.classList.remove('border-[var(--accent-gold)]', 'bg-amber-50/50');
          b.classList.add('border-[var(--grid-border)]', 'bg-white');
        });
        btn.classList.add('border-[var(--accent-gold)]', 'bg-amber-50/50');
        btn.classList.remove('border-[var(--grid-border)]', 'bg-white');
      });
    });

    slider?.addEventListener('input', (e) => {
      lastInputModality = e.pointerType || 'mouse';
      sliderVal = parseInt(e.target.value, 10);
      if (valDisplay) valDisplay.textContent = sliderVal;
      logEvent('slider_input', {
        trial_index: currentTrial,
        stimulus_id: t.stimulus_id,
        slider_position_raw: sliderVal,
        input_modality: lastInputModality,
        task_def_version: '1.0'
      });
    });

    slider?.addEventListener('keydown', (e) => {
      if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
        lastInputModality = 'keyboard';
      }
    });

    document.getElementById('lockFreqBtn')?.addEventListener('click', () => {
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
// F2: The Gathering Voices (4 trials: Incomplete information)
// Action choices: act, clarify, maintain
// Controls: clear, ambiguous, misleading
// --------------------------------------------------------------------------
function runF2AmbiguousCue(app, renderHeader, logEvent, onComplete) {
  let inTutorial = true;
  let currentTrial = 0;
  let selectedAction = null;
  let lastInputModality = 'mouse';

  const trials = [
    {
      stimulus_id: 'F2_T1',
      speaker_role: 'Stage Director',
      cue_text: '"The reciting poet gestures clearly toward the side monitor speaker, explicitly requesting vocal support."',
      condition_label: 'Direct Request'
    },
    {
      stimulus_id: 'F2_T2',
      speaker_role: 'Rehearsal Coordinator',
      cue_text: '"The speaker pauses mid-line with an uncertain expression; their tone is hesitant but no instruction is given."',
      condition_label: 'Ambiguous Signal'
    },
    {
      stimulus_id: 'F2_T3',
      speaker_role: 'Sound Technician',
      cue_text: '"The performer delivers an impassioned verse with intense strain in their voice, as part of the theatrical performance."',
      condition_label: 'Expressive Intensity'
    },
    {
      stimulus_id: 'F2_T4',
      speaker_role: 'Guest Accompanist',
      cue_text: '"The accompanying percussionist has subtly altered tempo and is watching the reciter intently to re-establish synchrony."',
      condition_label: 'Subtle Drift'
    }
  ];

  const choices = [
    {
      id: 'act',
      title: 'Act Directly',
      desc: 'Take immediate operational action to adapt sound levels and support the speaker.'
    },
    {
      id: 'clarify',
      title: 'Clarify Intent',
      desc: 'Seek confirmation or verify the partner’s preference before making changes.'
    },
    {
      id: 'maintain',
      title: 'Maintain Course',
      desc: 'Preserve the ongoing acoustic cadence without premature intervention.'
    }
  ];

  function render() {
    if (inTutorial) {
      app.innerHTML = `
        <div>
          ${renderHeader('Part 2: The Gathering Voices', 'Coordinating acoustic clarity with your event colleagues across 4 communication situations.')}
          ${renderTutorialCard({
            icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path></svg>`,
            goal: 'Evaluate the communication cue in each trial and select whether to act, clarify, or maintain course.',
            steps: [
              'Read the operational feedback and partner state description.',
              'Assess whether information is clear, ambiguous, or misleading.',
              'Choose your response: Act, Clarify, or Maintain.'
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
      <div class="animate-fadeIn">
        <div class="flex justify-between items-center mb-2">
          ${renderHeader('Part 2: The Gathering Voices', 'Evaluate the communication situation and choose your course of action.')}
          <span class="text-xs uppercase tracking-wider text-[var(--accent-gold)] font-mono font-medium">Trial ${currentTrial + 1} of 4</span>
        </div>

        <div class="p-4 bg-amber-50/80 border border-[var(--accent-gold)]/40 rounded-sm mb-6 flex items-center gap-3">
          <div class="w-9 h-9 rounded-full bg-[var(--accent-gold)] text-white flex items-center justify-center font-serif text-sm font-semibold shrink-0">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
          </div>
          <div>
            <div class="text-[10px] uppercase tracking-wider text-[var(--accent-gold)] font-semibold">${t.speaker_role}</div>
            <div class="text-xs text-[var(--text-primary)] font-medium mt-0.5">${t.cue_text}</div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          ${choices.map(c => `
            <div class="f2-card p-4 bg-white border ${selectedAction === c.id ? 'border-[var(--accent-gold)] bg-amber-50/40 shadow-sm' : 'border-[var(--grid-border)]'} cursor-pointer hover:border-[var(--accent-gold)] transition space-y-2 rounded-xs" data-action="${c.id}" tabindex="0" role="button">
              <div class="text-xs font-semibold text-[var(--text-primary)] flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full ${selectedAction === c.id ? 'bg-[var(--accent-gold)]' : 'bg-stone-300'}"></span>
                ${c.title}
              </div>
              <div class="text-xs text-[var(--text-secondary)] leading-relaxed">${c.desc}</div>
            </div>
          `).join('')}
        </div>

        <div class="flex justify-end">
          <button id="f2ConfirmBtn" ${selectedAction ? '' : 'disabled'} class="px-7 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] disabled:opacity-40 transition shadow-sm">
            ${currentTrial < 3 ? 'Confirm Communication &rarr;' : 'Finish Coordination &rarr;'}
          </button>
        </div>
      </div>
    `;

    const confirmBtn = document.getElementById('f2ConfirmBtn');

    app.querySelectorAll('.f2-card').forEach(card => {
      const selectCard = (modality) => {
        lastInputModality = modality;
        selectedAction = card.getAttribute('data-action');
        app.querySelectorAll('.f2-card').forEach(c => {
          c.classList.remove('border-[var(--accent-gold)]', 'bg-amber-50/40', 'shadow-sm');
          c.classList.add('border-[var(--grid-border)]');
          c.querySelector('span.rounded-full')?.classList.remove('bg-[var(--accent-gold)]');
          c.querySelector('span.rounded-full')?.classList.add('bg-stone-300');
        });
        card.classList.add('border-[var(--accent-gold)]', 'bg-amber-50/40', 'shadow-sm');
        card.classList.remove('border-[var(--grid-border)]');
        card.querySelector('span.rounded-full')?.classList.add('bg-[var(--accent-gold)]');
        card.querySelector('span.rounded-full')?.classList.remove('bg-stone-300');
        if (confirmBtn) confirmBtn.disabled = false;
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
// Objective constant across transitions. Acoustic environment updates. Transition events logged.
// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
// F3: The Echo of the Room (3 context transitions)
// Mechanic: Baseline response -> New context changes interpretation of SAME cue -> Updated response
// --------------------------------------------------------------------------
function runF3ContextChange(app, renderHeader, logEvent, onComplete) {
  let inTutorial = true;
  let currentTransition = 0;
  let phase = 'baseline'; // 'baseline' -> 'shifted'
  let selectedBaselineChoice = null;
  let selectedUpdatedChoice = null;
  let lastInputModality = 'mouse';

  const transitions = [
    {
      stimulus_id: 'F3_T1',
      cue_id: 'cue_expressive_crescendo',
      title: 'Transition 1: Vocal Projection Crescendo',
      cue_text: '"The reciting poet initiates an impassioned vocal crescendo on a climactic verse."',
      baseline_context: 'Dry Rehearsal Studio — Acoustic decay is rapid and unamplified.',
      baseline_options: [
        { id: 'support_volume', label: 'Support Volume', desc: 'Apply gain to sustain acoustic projection in dry room.' },
        { id: 'dampen_level', label: 'Dampen Level', desc: 'Reduce level immediately before the peak.' },
        { id: 'neutral_hold', label: 'Neutral Hold', desc: 'Keep baseline settings without adjustment.' }
      ],
      shifted_context: 'Vaulted Stone Chamber — High-reverberation stone walls amplify natural decay; boosting gain causes muddy reverberation clash.',
      shifted_options: [
        { id: 'attenuate_reverb', label: 'Attenuate Reverb', desc: 'Dampen decay tails so reflective walls do not blur verse clarity.' },
        { id: 'support_volume', label: 'Support Volume', desc: 'Maintain dry-studio gain boost (causes severe echo clash).' },
        { id: 'neutral_hold', label: 'Neutral Hold', desc: 'Ignore acoustic environment shift.' }
      ]
    },
    {
      stimulus_id: 'F3_T2',
      cue_id: 'cue_sotto_voce_pause',
      title: 'Transition 2: Sotto-Voce Whisper',
      cue_text: '"The performer drops into a delicate, hushed whisper between stanza strophes."',
      baseline_context: 'Quiet Intimate Salon — Close audience seating; natural whisper is completely audible.',
      baseline_options: [
        { id: 'preserve_natural_intimacy', label: 'Preserve Natural Intimacy', desc: 'Keep sound transparent without artificial amplification.' },
        { id: 'boost_high_gain', label: 'High Gain Boost', desc: 'Force whisper volume to loud recital level.' },
        { id: 'cut_channel', label: 'Mute Channel', desc: 'Treat volume dip as dead air.' }
      ],
      shifted_context: 'Bustling Courtyard Entrance — Distant street traffic and fountain murmur mask delicate acoustic signals.',
      shifted_options: [
        { id: 'boost_intelligibility', label: 'Boost Intelligibility', desc: 'Lift vocal presence so outdoor murmur does not drown out verse.' },
        { id: 'preserve_natural_intimacy', label: 'Preserve Natural Intimacy', desc: 'Leave unboosted (whisper is completely obscured).' },
        { id: 'cut_channel', label: 'Mute Channel', desc: 'Treat dip as audio fault.' }
      ]
    },
    {
      stimulus_id: 'F3_T3',
      cue_id: 'cue_rhythmic_syncopation',
      title: 'Transition 3: Syncopated Metric Pause',
      cue_text: '"The performer introduces an abrupt, syncopated metric pause before the final couplet."',
      baseline_context: 'Continuous Solo Recitation — Solitary speaker; steady driving tempo is expected.',
      baseline_options: [
        { id: 'sustain_cadence', label: 'Sustain Cadence', desc: 'Maintain driving tempo support across the pause.' },
        { id: 'halt_accompaniment', label: 'Halt Accompaniment', desc: 'Stop abruptly on sudden pause.' },
        { id: 'force_metronome', label: 'Force Accelerated Tempo', desc: 'Push recitation forward past pause.' }
      ],
      shifted_context: 'Call-and-Response Ensemble — Vocal chorus enters in the pause to provide reciprocal answering refrain.',
      shifted_options: [
        { id: 'open_reciprocal_space', label: 'Open Reciprocal Space', desc: 'Yield direct tempo drive to let the chorus answer breathe.' },
        { id: 'sustain_cadence', label: 'Sustain Cadence', desc: 'Drive straight through the chorus reply without pausing.' },
        { id: 'force_metronome', label: 'Force Accelerated Tempo', desc: 'Rush ensemble timing.' }
      ]
    }
  ];

  function render() {
    if (inTutorial) {
      app.innerHTML = `
        <div>
          ${renderHeader('Part 3: The Echo of the Room', 'Reinterpreting performance cues across 3 venue transitions as environmental context changes.')}
          ${renderTutorialCard({
            icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path></svg>`,
            goal: 'Observe how the exact same performance cue requires an updated response when the venue context changes.',
            steps: [
              'Review the performer cue in the baseline context and select your initial response.',
              'Observe the context transition: the setting changes, altering the cue\'s meaning.',
              'Select your updated response to maintain objective across all 3 transitions.'
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
      app.innerHTML = `
        <div class="animate-fadeIn">
          <div class="flex justify-between items-center mb-2">
            ${renderHeader('Part 3: The Echo of the Room', 'Initial baseline context: determine your response to the performer\'s cue.')}
            <span class="text-xs uppercase tracking-wider text-[var(--accent-gold)] font-mono font-medium">Transition ${currentTransition + 1} of 3 (Stage 1)</span>
          </div>

          <!-- Performer Cue -->
          <div class="p-5 bg-stone-50 border border-[var(--grid-border)] rounded-sm mb-4">
            <span class="text-[10px] uppercase font-mono tracking-wider text-[var(--accent-gold)] font-semibold">Performer Cue</span>
            <div class="text-sm font-serif text-[var(--text-primary)] font-medium mt-1">${tr.cue_text}</div>
          </div>

          <!-- Baseline Setting -->
          <div class="p-4 bg-amber-50/70 border border-[var(--accent-gold)]/40 rounded-sm mb-6 flex items-start gap-3">
            <div class="w-8 h-8 rounded-full bg-[var(--accent-gold)] text-white flex items-center justify-center font-serif text-xs font-semibold shrink-0">1</div>
            <div>
              <div class="text-[10px] uppercase tracking-wider text-[var(--accent-gold)] font-semibold">Baseline Context</div>
              <div class="text-xs text-[var(--text-primary)] mt-0.5">${tr.baseline_context}</div>
            </div>
          </div>

          <!-- Baseline Options -->
          <div class="space-y-3 mb-6">
            ${tr.baseline_options.map(opt => `
              <div class="f3-opt p-4 bg-white border ${selectedBaselineChoice === opt.id ? 'border-[var(--accent-gold)] bg-amber-50/40 shadow-xs' : 'border-[var(--grid-border)]'} cursor-pointer hover:border-[var(--accent-gold)] transition rounded-xs" data-choice="${opt.id}" tabindex="0" role="button">
                <div class="text-xs font-semibold text-[var(--text-primary)]">${opt.label}</div>
                <div class="text-[11px] text-[var(--text-secondary)] mt-1">${opt.desc}</div>
              </div>
            `).join('')}
          </div>

          <div class="flex justify-end">
            <button id="f3BaselineBtn" ${selectedBaselineChoice ? '' : 'disabled'} class="px-7 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] disabled:opacity-40 transition shadow-sm rounded-xs">
              Confirm Baseline & Proceed to Context Shift &rarr;
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
      app.innerHTML = `
        <div class="animate-fadeIn">
          <div class="flex justify-between items-center mb-2">
            ${renderHeader('Part 3: The Echo of the Room', 'The context has shifted: re-evaluate the same cue under new acoustic conditions.')}
            <span class="text-xs uppercase tracking-wider text-[var(--accent-gold)] font-mono font-medium">Transition ${currentTransition + 1} of 3 (Stage 2)</span>
          </div>

          <!-- Performer Cue (Unchanged) -->
          <div class="p-4 bg-stone-50 border border-[var(--grid-border)] rounded-sm mb-3">
            <span class="text-[10px] uppercase font-mono tracking-wider text-[var(--accent-gold)] font-semibold">Same Performer Cue</span>
            <div class="text-xs font-serif text-[var(--text-primary)] font-medium mt-0.5">${tr.cue_text}</div>
          </div>

          <!-- Shifted Context Notice -->
          <div class="p-4 bg-amber-100/70 border border-[#bd6f5d]/50 rounded-sm mb-6 flex items-start gap-3">
            <div class="w-8 h-8 rounded-full bg-[#bd6f5d] text-white flex items-center justify-center font-serif text-xs font-semibold shrink-0">2</div>
            <div>
              <div class="text-[10px] uppercase tracking-wider text-[#bd6f5d] font-semibold">New Context Shift</div>
              <div class="text-xs text-[var(--text-primary)] font-medium mt-0.5">${tr.shifted_context}</div>
            </div>
          </div>

          <!-- Shifted Options -->
          <div class="space-y-3 mb-6">
            ${tr.shifted_options.map(opt => `
              <div class="f3-updated-opt p-4 bg-white border ${selectedUpdatedChoice === opt.id ? 'border-[var(--accent-gold)] bg-amber-50/40 shadow-xs' : 'border-[var(--grid-border)]'} cursor-pointer hover:border-[var(--accent-gold)] transition rounded-xs" data-choice="${opt.id}" tabindex="0" role="button">
                <div class="text-xs font-semibold text-[var(--text-primary)]">${opt.label}</div>
                <div class="text-[11px] text-[var(--text-secondary)] mt-1">${opt.desc}</div>
              </div>
            `).join('')}
          </div>

          <div class="flex justify-end">
            <button id="f3UpdatedBtn" ${selectedUpdatedChoice ? '' : 'disabled'} class="px-7 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] disabled:opacity-40 transition shadow-sm rounded-xs">
              ${currentTransition < 2 ? 'Save Updated Setting & Next Transition &rarr;' : 'Finalize Context Updating &rarr;'}
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
