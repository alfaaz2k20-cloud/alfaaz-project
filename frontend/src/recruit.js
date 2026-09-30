/* ==========================================================================
   ALFAAZ RECRUIT — CANDIDATE EXPERIENCE & TELEMETRY CLIENT
   ========================================================================== */

let state = {
  sessionId: null,
  configHash: null,
  worldSequence: [],
  seeds: {},
  screen: 'consent', // consent, accessibility, warmup, sjt, games, complete, paused
  pausedPreviousScreen: null,
  sjtScenarios: [],
  currentSjtIndex: 0,
  sjtResponses: {},
  currentWorldIndex: 0,
  currentMiniGameIndex: 0,
  accessibilityModes: [],
  segmentId: 1,
  seq: 1,
  telemetryQueue: [],
  isPaused: false
};

async function apiFetch(endpoint, options = {}) {
  if (window.globalApiFetch) {
    const res = await window.globalApiFetch(endpoint, options);
    return res;
  }
  const apiBase = window.ALFAAZ_API_URL || 'https://alfaaz-project.onrender.com';
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
  return fetch(`${apiBase}${endpoint}`, {
    ...options,
    headers
  });
}

// Telemetry Client
function logEvent(screen, action, data = {}, stateSnapshot = {}, inputType = 'mouse', miniGame = null, trial = null) {
  const t_ms = performance.now();
  const eventPayload = {
    seq: state.seq++,
    segment_id: state.segmentId,
    t_ms: t_ms,
    screen: screen,
    game_world: state.worldSequence[state.currentWorldIndex] || null,
    mini_game: miniGame,
    trial: trial,
    action: action,
    input_type: inputType,
    state: stateSnapshot,
    data: data
  };

  state.telemetryQueue.push(eventPayload);
  if (state.telemetryQueue.length >= 10 || action === 'minigame_end' || action === 'sjt_complete') {
    flushTelemetry();
  }
}

async function flushTelemetry() {
  if (!state.sessionId || state.telemetryQueue.length === 0) return;
  const batch = [...state.telemetryQueue];
  state.telemetryQueue = [];

  try {
    await apiFetch('/recruit/telemetry', {
      method: 'POST',
      body: JSON.stringify({
        session_id: state.sessionId,
        events: batch
      })
    });
  } catch (err) {
    console.warn('[Telemetry] Flush failed, re-queuing:', err);
    state.telemetryQueue = [...batch, ...state.telemetryQueue];
  }
}

// Flush on unload
window.addEventListener('beforeunload', () => {
  if (state.sessionId && state.telemetryQueue.length > 0) {
    const apiBase = window.ALFAAZ_API_URL || '';
    const payload = JSON.stringify({
      session_id: state.sessionId,
      events: state.telemetryQueue
    });
    navigator.sendBeacon(`${apiBase}/recruit/telemetry`, payload);
  }
});

// Tab Visibility Tracking
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    logEvent(state.screen, 'visibility_hidden', { timestamp: Date.now() });
  } else {
    logEvent(state.screen, 'visibility_visible', { timestamp: Date.now() });
  }
});

// Initialization
document.addEventListener('DOMContentLoaded', async () => {
  renderScreen();
  setupGlobalControls();
});

function setupGlobalControls() {
  const pauseBtn = document.getElementById('pauseBtn');
  pauseBtn?.addEventListener('click', togglePause);
}

function togglePause() {
  if (state.isPaused) {
    state.isPaused = false;
    logEvent(state.screen, 'resume');
    state.screen = state.pausedPreviousScreen || 'sjt';
    renderScreen();
  } else {
    state.isPaused = true;
    state.pausedPreviousScreen = state.screen;
    logEvent(state.screen, 'pause');
    state.screen = 'paused';
    renderScreen();
  }
}

// Main Render Dispatcher
export function renderScreen() {
  const app = document.getElementById('recruitApp');
  const headerControls = document.getElementById('sessionHeaderControls');
  const topProgressBar = document.getElementById('topProgressBar');
  const progressBarFill = document.getElementById('progressBarFill');

  if (state.screen !== 'consent' && state.screen !== 'complete' && state.screen !== 'paused') {
    headerControls?.classList.remove('hidden');
    topProgressBar?.classList.remove('hidden');
  } else {
    headerControls?.classList.add('hidden');
    topProgressBar?.classList.add('hidden');
  }

  if (window.lucide) window.lucide.createIcons();

  switch (state.screen) {
    case 'consent':
      renderConsent(app);
      break;
    case 'accessibility':
      renderAccessibility(app);
      break;
    case 'warmup':
      renderWarmup(app);
      break;
    case 'sjt':
      renderSJT(app, progressBarFill);
      break;
    case 'games':
      renderGames(app, progressBarFill);
      break;
    case 'paused':
      renderPaused(app);
      break;
    case 'complete':
      renderComplete(app);
      break;
  }
}

// 1. Consent Screen
function renderConsent(app) {
  app.innerHTML = `
    <div class="space-y-6">
      <div class="border-b border-[var(--grid-border)] pb-4 text-center">
        <span class="act-badge">Onboarding & Research</span>
        <h1 class="text-3xl font-serif text-[var(--text-primary)]">Volunteer Exploratory Assessment</h1>
      </div>

      <div class="space-y-4 text-sm text-[var(--text-primary)] leading-relaxed bg-[#faf8f5] p-5 border border-[var(--grid-border)]">
        <p><strong>Estimated Total Time:</strong> ~20–25 minutes (SJT + brief exploratory micro-tasks).</p>
        <p><strong>Voluntary Nature:</strong> You may pause, skip tasks, or conclude at any time without penalty. Missing or skipped sections are recorded neutrally as insufficient data, never as a low score.</p>
        <p><strong>Simulated Partners:</strong> Some interactive tasks feature computer-controlled simulated characters. Their behavior is automated and scripted.</p>
        <p><strong>Data & Research Notice:</strong> This is a calibration-stage research instrument for unpaid volunteer recruitment, not a validated selection test. All raw telemetry is recorded under a pseudonymous session identifier.</p>
      </div>

      <form id="startForm" class="space-y-4 pt-2">
        <div>
          <label class="block text-xs uppercase tracking-wider text-[var(--text-secondary)] mb-1">Full Name *</label>
          <input type="text" id="fullName" required class="w-full p-2.5 bg-white border border-[var(--grid-border)] focus:border-[var(--accent-gold)] focus:outline-none" placeholder="Your name">
        </div>
        <div>
          <label class="block text-xs uppercase tracking-wider text-[var(--text-secondary)] mb-1">Email Address *</label>
          <input type="email" id="email" required class="w-full p-2.5 bg-white border border-[var(--grid-border)] focus:border-[var(--accent-gold)] focus:outline-none" placeholder="you@example.com">
        </div>
        <div class="flex items-center gap-2 pt-2">
          <input type="checkbox" id="ageConfirm" required checked class="w-4 h-4 accent-[#bd6f5d]">
          <label for="ageConfirm" class="text-xs text-[var(--text-primary)]">I confirm that I am 18 years of age or older.</label>
        </div>
        <div class="flex items-center gap-2">
          <input type="checkbox" id="consentAgree" required checked class="w-4 h-4 accent-[#bd6f5d]">
          <label for="consentAgree" class="text-xs text-[var(--text-primary)]">I understand and agree to participate in this research session.</label>
        </div>

        <div class="pt-4 flex justify-end">
          <button type="submit" class="px-6 py-2.5 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition">
            Begin Session &rarr;
          </button>
        </div>
      </form>
    </div>
  `;

  document.getElementById('startForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button[type="submit"]');
    const origText = btn ? btn.innerHTML : 'Begin Session &rarr;';
    if (btn) {
      btn.disabled = true;
      btn.innerHTML = 'Connecting...';
    }

    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();

    try {
      const resp = await apiFetch('/recruit/session/start', {
        method: 'POST',
        body: JSON.stringify({
          full_name: fullName,
          email: email,
          device_class: window.innerWidth < 768 ? 'mobile' : 'desktop',
          input_modality: 'ontouchstart' in window ? 'touch' : 'mouse'
        })
      });

      if (!resp || !resp.ok) {
        const errData = resp ? await resp.json().catch(() => ({})) : {};
        throw new Error(errData.detail || (resp ? `Server returned ${resp.status}` : 'No response from server'));
      }

      const data = await resp.json();
      if (data.session_id) {
        state.sessionId = data.session_id;
        state.configHash = data.config_hash;
        state.worldSequence = data.world_sequence;
        state.seeds = data.seeds;

        // Record Consent
        await apiFetch('/recruit/consent', {
          method: 'POST',
          body: JSON.stringify({
            session_id: state.sessionId,
            consent_text_version: '2026-10-v2',
            choices: { research_telemetry: true },
            confirmed_18_plus: true
          })
        });

        logEvent('consent', 'consent_accepted', { full_name: fullName });
        state.screen = 'accessibility';
        renderScreen();
      } else {
        throw new Error('Missing session ID');
      }
    } catch (err) {
      alert(`Unable to initialize session: ${err.message || 'Please check connection.'}`);
      console.error(err);
      if (btn) {
        btn.disabled = false;
        btn.innerHTML = origText;
      }
    }
  });
}

// 2. Accessibility Options Screen
function renderAccessibility(app) {
  app.innerHTML = `
    <div class="space-y-6">
      <div class="border-b border-[var(--grid-border)] pb-3 text-center">
        <span class="act-badge">Preferences</span>
        <h2 class="text-2xl font-serif text-[var(--text-primary)]">Interaction & Accessibility</h2>
        <p class="text-xs text-[var(--text-secondary)] mt-1">Adjust the environment to suit your input and comfort preferences.</p>
      </div>

      <div class="space-y-3 pt-2">
        <label class="flex items-start gap-3 p-3 bg-[#faf8f5] border border-[var(--grid-border)] cursor-pointer">
          <input type="checkbox" id="a11y_keyboard" class="mt-1 accent-[#bd6f5d]">
          <div>
            <div class="text-sm font-medium text-[var(--text-primary)]">Keyboard / Non-Pointer Navigation</div>
            <div class="text-xs text-[var(--text-secondary)]">Optimizes interaction for tab, arrow keys, and numeric keypad shortcuts.</div>
          </div>
        </label>
        <label class="flex items-start gap-3 p-3 bg-[#faf8f5] border border-[var(--grid-border)] cursor-pointer">
          <input type="checkbox" id="a11y_contrast" class="mt-1 accent-[#bd6f5d]">
          <div>
            <div class="text-sm font-medium text-[var(--text-primary)]">High Contrast Display</div>
            <div class="text-xs text-[var(--text-secondary)]">Increases stroke density and foreground-background separation.</div>
          </div>
        </label>
        <label class="flex items-start gap-3 p-3 bg-[#faf8f5] border border-[var(--grid-border)] cursor-pointer">
          <input type="checkbox" id="a11y_motion" class="mt-1 accent-[#bd6f5d]">
          <div>
            <div class="text-sm font-medium text-[var(--text-primary)]">Reduced Motion</div>
            <div class="text-xs text-[var(--text-secondary)]">Disables pulsing transitions and rapid symbol shifting.</div>
          </div>
        </label>
        <label class="flex items-start gap-3 p-3 bg-[#faf8f5] border border-[var(--grid-border)] cursor-pointer">
          <input type="checkbox" id="a11y_time" class="mt-1 accent-[#bd6f5d]">
          <div>
            <div class="text-sm font-medium text-[var(--text-primary)]">Extended Time Allowance</div>
            <div class="text-xs text-[var(--text-secondary)]">Expands trial observation windows (timing metrics are automatically excluded from comparison).</div>
          </div>
        </label>
      </div>

      <div class="pt-4 flex justify-between items-center">
        <span class="text-xs text-[var(--text-secondary)]">Accessibility settings never lower any measurement.</span>
        <button id="saveA11yBtn" class="px-6 py-2 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition">
          Continue &rarr;
        </button>
      </div>
    </div>
  `;

  document.getElementById('saveA11yBtn')?.addEventListener('click', async () => {
    const modes = [];
    if (document.getElementById('a11y_keyboard')?.checked) modes.push('keyboard_navigation');
    if (document.getElementById('a11y_contrast')?.checked) modes.push('high_contrast');
    if (document.getElementById('a11y_motion')?.checked) modes.push('reduced_motion');
    if (document.getElementById('a11y_time')?.checked) modes.push('extended_time');

    state.accessibilityModes = modes;

    try {
      await apiFetch('/recruit/accessibility', {
        method: 'POST',
        body: JSON.stringify({
          session_id: state.sessionId,
          modes_enabled: modes
        })
      });
    } catch (err) {
      console.warn('Accessibility preferences save error:', err);
    }

    logEvent('accessibility', 'preferences_saved', { modes });
    state.screen = 'warmup';
    renderScreen();
  });
}

// 3. Warm-up Phase
function renderWarmup(app) {
  let taps = [];
  let warmupStartTime = performance.now();

  app.innerHTML = `
    <div class="space-y-6 text-center py-4">
      <span class="act-badge">Calibration</span>
      <h2 class="text-2xl font-serif text-[var(--text-primary)]">Interactive Calibration</h2>
      <p class="text-xs text-[var(--text-secondary)] max-w-md mx-auto">
        Please tap or click the center symbol 3 times at a natural, comfortable pace to establish your baseline device rhythm.
      </p>

      <div class="py-8 flex justify-center">
        <button id="tapTarget" class="w-24 h-24 rounded-full border-2 border-[var(--accent-gold)] bg-white text-[var(--accent-gold)] font-serif text-xl flex items-center justify-center hover:bg-amber-50 active:scale-95 transition shadow-sm">
          Tap (0/3)
        </button>
      </div>

      <div id="warmupStatus" class="text-xs text-[var(--text-secondary)] tracking-wider uppercase">
        Waiting for first tap...
      </div>
    </div>
  `;

  const btn = document.getElementById('tapTarget');
  const status = document.getElementById('warmupStatus');

  btn?.addEventListener('click', async () => {
    taps.push(performance.now());
    const count = taps.length;
    btn.textContent = `Tap (${count}/3)`;
    status.textContent = `Registered tap ${count} of 3`;

    if (count >= 3) {
      const latencies = [taps[1] - taps[0], taps[2] - taps[1]];
      const avgLatency = (latencies[0] + latencies[1]) / 2;
      const readingDwell = performance.now() - warmupStartTime;

      try {
        await apiFetch('/recruit/warmup', {
          method: 'POST',
          body: JSON.stringify({
            session_id: state.sessionId,
            tap_latency_baseline_ms: avgLatency,
            reading_dwell_baseline_ms: readingDwell,
            pointer_type: 'ontouchstart' in window ? 'touch' : 'mouse',
            viewport_class: window.innerWidth < 768 ? 'mobile' : 'desktop'
          })
        });
      } catch (err) {
        console.warn('Warmup save error:', err);
      }

      logEvent('warmup', 'warmup_completed', { avgLatency, readingDwell });
      
      // Load Public SJT payload
      try {
        const sjtResp = await apiFetch('/recruit/sjt/public');
        const sjtData = await sjtResp.json();
        state.sjtScenarios = sjtData.scenarios || [];
        state.currentSjtIndex = 0;
        state.screen = 'sjt';
        renderScreen();
      } catch (err) {
        console.error('Failed to load SJT payload:', err);
      }
    }
  });
}

// 4. SJT Phase
function renderSJT(app, progressBarFill) {
  const scenario = state.sjtScenarios[state.currentSjtIndex];
  if (!scenario) {
    submitSjtAndProceed();
    return;
  }

  const total = state.sjtScenarios.length;
  const current = state.currentSjtIndex + 1;
  if (progressBarFill) {
    progressBarFill.style.width = `${((current - 1) / (total + 7)) * 100}%`;
  }

  const segmentProgress = document.getElementById('segmentProgress');
  if (segmentProgress) segmentProgress.textContent = `SJT ${current}/${total}`;

  const selectedOptId = state.sjtResponses[scenario.id] || null;

  const optionsHtml = scenario.options.map(opt => `
    <div class="option-card ${selectedOptId === opt.id ? 'selected' : ''}" data-opt-id="${opt.id}" tabindex="0" role="button">
      <span class="font-serif text-sm font-semibold text-[var(--accent-gold)]">${opt.id.slice(-1)}.</span>
      <span class="text-sm text-[var(--text-primary)] leading-relaxed">${opt.text}</span>
    </div>
  `).join('');

  app.innerHTML = `
    <div class="space-y-6">
      <div class="border-b border-[var(--grid-border)] pb-3 flex justify-between items-end">
        <div>
          <span class="act-badge">Act ${scenario.act}: ${scenario.act_title_en}</span>
          <span class="act-title-ur font-serif">${scenario.act_title_ur || ''}</span>
          <h2 class="text-2xl font-serif text-[var(--text-primary)]">Scenario ${scenario.id}</h2>
        </div>
        <div class="text-xs text-[var(--text-secondary)] uppercase tracking-wider">
          Scenario ${current} of ${total}
        </div>
      </div>

      <div class="text-sm text-[var(--text-primary)] leading-relaxed bg-[#faf8f5] p-5 border border-[var(--grid-border)]">
        ${scenario.setup}
      </div>

      <div class="space-y-3">
        <div class="text-xs uppercase tracking-wider text-[var(--text-secondary)]">Choose the course of action you would most naturally take:</div>
        ${optionsHtml}
      </div>

      <div class="pt-4 flex justify-between items-center border-t border-[var(--grid-border)]">
        <span class="text-xs text-[var(--text-secondary)]">Keyboard: Press 1–4 to choose</span>
        <button id="nextSjtBtn" ${selectedOptId ? '' : 'disabled'} class="px-6 py-2 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] disabled:opacity-40 disabled:hover:bg-[var(--text-primary)] transition">
          ${current === total ? 'Complete SJT &rarr;' : 'Next Scenario &rarr;'}
        </button>
      </div>
    </div>
  `;

  logEvent('sjt', 'scenario_displayed', { scenario_id: scenario.id, index: current });

  // Option selection handlers
  app.querySelectorAll('.option-card').forEach(card => {
    card.addEventListener('click', () => {
      const optId = card.getAttribute('data-opt-id');
      state.sjtResponses[scenario.id] = optId;
      logEvent('sjt', 'option_selected', { scenario_id: scenario.id, option_id: optId });
      renderSJT(app, progressBarFill);
    });
  });

  document.getElementById('nextSjtBtn')?.addEventListener('click', () => {
    if (state.sjtResponses[scenario.id]) {
      state.currentSjtIndex++;
      renderSJT(app, progressBarFill);
    }
  });

  // Keyboard shortcut listener (1-4)
  const keyHandler = (e) => {
    if (['1', '2', '3', '4'].includes(e.key)) {
      const idx = parseInt(e.key) - 1;
      if (scenario.options[idx]) {
        state.sjtResponses[scenario.id] = scenario.options[idx].id;
        logEvent('sjt', 'option_selected_key', { scenario_id: scenario.id, option_id: scenario.options[idx].id });
        renderSJT(app, progressBarFill);
      }
    }
  };
  window.onkeydown = keyHandler;
}

async function submitSjtAndProceed() {
  window.onkeydown = null;
  try {
    await apiFetch('/recruit/sjt/submit', {
      method: 'POST',
      body: JSON.stringify({
        session_id: state.sessionId,
        responses: state.sjtResponses
      })
    });
    logEvent('sjt', 'sjt_complete', { response_count: Object.keys(state.sjtResponses).length });
    state.screen = 'games';
    state.currentWorldIndex = 0;
    state.currentMiniGameIndex = 0;
    renderScreen();
  } catch (err) {
    console.error('SJT submit error:', err);
  }
}

// 5. Game Battery Container & Dispatcher
import { runMiniGame } from './recruit_games/index.js';

function renderGames(app, progressBarFill) {
  const currentWorldCode = state.worldSequence[state.currentWorldIndex];
  if (!currentWorldCode || state.currentWorldIndex >= state.worldSequence.length) {
    finishAssessment();
    return;
  }

  const segmentProgress = document.getElementById('segmentProgress');
  if (segmentProgress) segmentProgress.textContent = `World ${state.currentWorldIndex + 1}/7`;

  if (progressBarFill) {
    progressBarFill.style.width = `${((state.currentSjtIndex + state.currentWorldIndex + 1) / (state.sjtScenarios.length + 7)) * 100}%`;
  }

  runMiniGame({
    appContainer: app,
    worldCode: currentWorldCode,
    worldIndex: state.currentWorldIndex,
    miniGameIndex: state.currentMiniGameIndex,
    seeds: state.seeds,
    logEvent: (action, data, stateSnapshot, inputType) => {
      const mgId = getMiniGameId(currentWorldCode, state.currentMiniGameIndex);
      logEvent('game', action, data, stateSnapshot, inputType, mgId);
    },
    onMiniGameComplete: (mgResult) => {
      logEvent('game', 'minigame_end', mgResult);
      if (state.currentMiniGameIndex < 2) {
        state.currentMiniGameIndex++;
      } else {
        state.currentMiniGameIndex = 0;
        state.currentWorldIndex++;
      }
      renderGames(app, progressBarFill);
    },
    onSkipWorld: () => {
      logEvent('game', 'world_skipped', { world: currentWorldCode });
      state.currentMiniGameIndex = 0;
      state.currentWorldIndex++;
      renderGames(app, progressBarFill);
    },
    onSkipAllGames: () => {
      logEvent('game', 'all_games_skipped');
      finishAssessment();
    }
  });
}

function getMiniGameId(worldCode, mgIndex) {
  const mapping = {
    'W1': ['F1', 'F2', 'F3'],
    'W2': ['A1', 'A2', 'A3'],
    'W3': ['C1', 'C2', 'C3'],
    'W4': ['E1', 'E2', 'E3'],
    'W5': ['Q1', 'Q2', 'Q3'],
    'W6': ['CR1', 'CR2', 'CR3'],
    'W7': ['M1', 'M2', 'M3']
  };
  return (mapping[worldCode] && mapping[worldCode][mgIndex]) || 'MG';
}

async function finishAssessment() {
  try {
    await apiFetch('/recruit/complete', {
      method: 'POST',
      body: JSON.stringify({ session_id: state.sessionId })
    });
  } catch (err) {
    console.warn('Session complete submission error:', err);
  }
  flushTelemetry();
  state.screen = 'complete';
  renderScreen();
}

// 6. Paused Modal
function renderPaused(app) {
  app.innerHTML = `
    <div class="space-y-6 text-center py-12">
      <h2 class="text-3xl font-serif text-[var(--text-primary)]">Session Paused</h2>
      <p class="text-sm text-[var(--text-secondary)] max-w-md mx-auto">
        Your progress has been preserved. Take as much time as you need. Timing metrics are suspended while paused.
      </p>
      <div class="pt-4">
        <button id="resumeBtn" class="px-8 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition">
          Resume Session &rarr;
        </button>
      </div>
    </div>
  `;
  document.getElementById('resumeBtn')?.addEventListener('click', togglePause);
}

// 7. Completion Screen
function renderComplete(app) {
  app.innerHTML = `
    <div class="space-y-6 text-center py-16">
      <div class="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 mx-auto flex items-center justify-center text-2xl font-serif">
        &#10003;
      </div>
      <h1 class="text-3xl font-serif text-[var(--text-primary)]">Assessment Complete</h1>
      <p class="text-sm text-[var(--text-secondary)] max-w-lg mx-auto leading-relaxed">
        Thank you for your time, care, and attention. Your responses have been safely submitted to the Alfaaz Collective research registry.
      </p>
      <div class="pt-6">
        <a href="index.html" class="inline-block px-6 py-2.5 border border-[var(--grid-border)] text-xs uppercase tracking-widest text-[var(--text-primary)] hover:border-[var(--accent-gold)] transition">
          Return to Alfaaz Home
        </a>
      </div>
    </div>
  `;
}
