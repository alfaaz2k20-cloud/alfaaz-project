/* ==========================================================================
   ALFAAZ RECRUIT — CANDIDATE EXPERIENCE & TELEMETRY CLIENT
   ========================================================================== */

import consentCopy from '../../config/copy/consent.json';
import './recruit-utilities.css';

let state = {
  sessionId: null,
  configHash: null,
  worldSequence: [],
  seeds: {},
  screen: 'consent', // consent, identity, accessibility, warmup, sjt, games, complete, paused
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
  isPaused: false,
  activeMiniGameInProgress: false,
  telemetryTerminal: false
};

const STATE_STORAGE_KEY = 'alfaaz_recruit_state';
const UNSENT_STORAGE_KEY = 'alfaaz_recruit_unsent';
let localStateSaveScheduled = false;

function persistLocalState() {
  localStateSaveScheduled = false;
  try {
    const toSave = {
      sessionId: state.sessionId,
      configHash: state.configHash,
      worldSequence: state.worldSequence,
      seeds: state.seeds,
      screen: state.screen,
      sjtScenarios: state.sjtScenarios,
      currentSjtIndex: state.currentSjtIndex,
      sjtResponses: state.sjtResponses,
      currentWorldIndex: state.currentWorldIndex,
      currentMiniGameIndex: state.currentMiniGameIndex,
      accessibilityModes: state.accessibilityModes,
      segmentId: state.segmentId,
      seq: state.seq,
      isPaused: state.isPaused,
      activeMiniGameInProgress: state.activeMiniGameInProgress || false,
      telemetryTerminal: state.telemetryTerminal
    };
    sessionStorage.setItem(STATE_STORAGE_KEY, JSON.stringify(toSave));
    sessionStorage.setItem(UNSENT_STORAGE_KEY, JSON.stringify(state.telemetryQueue));
  } catch (e) {
    console.warn('[Persistence] Error saving sessionStorage:', e);
  }
}

function saveLocalState({ immediate = false } = {}) {
  if (immediate) {
    persistLocalState();
    return;
  }

  if (localStateSaveScheduled) return;
  localStateSaveScheduled = true;
  const persistWhenIdle = () => persistLocalState();

  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(persistWhenIdle, { timeout: 500 });
  } else {
    window.setTimeout(persistWhenIdle, 100);
  }
}

function restoreLocalState() {
  try {
    const savedStateStr = sessionStorage.getItem(STATE_STORAGE_KEY);
    const savedUnsentStr = sessionStorage.getItem(UNSENT_STORAGE_KEY);

    if (savedUnsentStr) {
      const parsedUnsent = JSON.parse(savedUnsentStr);
      if (Array.isArray(parsedUnsent)) {
        state.telemetryQueue = parsedUnsent;
      }
    }

    if (savedStateStr) {
      const saved = JSON.parse(savedStateStr);
      if (saved.sessionId) {
        state.sessionId = saved.sessionId;
        state.configHash = saved.configHash || null;
        state.worldSequence = saved.worldSequence || [];
        state.seeds = saved.seeds || {};
        state.screen = saved.screen || 'consent';
        state.sjtScenarios = saved.sjtScenarios || [];
        state.currentSjtIndex = saved.currentSjtIndex || 0;
        state.sjtResponses = saved.sjtResponses || {};
        state.currentWorldIndex = saved.currentWorldIndex || 0;
        state.currentMiniGameIndex = saved.currentMiniGameIndex || 0;
        state.accessibilityModes = saved.accessibilityModes || [];
        state.seq = saved.seq || 1;
        state.isPaused = saved.isPaused || false;
        state.telemetryTerminal = saved.telemetryTerminal || false;

        // Reload handling per Section 5.4:
        // - recover last server sequence; continue at last acknowledged sequence + 1
        // - increment segment
        // - emit segment_start
        state.segmentId = (saved.segmentId || 1) + 1;
        logEvent(state.screen, 'segment_start', { segment_id: state.segmentId });

        // If reload occurred inside an active mini-game:
        // - mark that mini-game INSUFFICIENT
        // - flag interrupted
        // - resume only at a completed mini-game boundary
        if (saved.activeMiniGameInProgress && saved.screen === 'games') {
          const currentWorldCode = state.worldSequence[state.currentWorldIndex];
          const mgId = getMiniGameId(currentWorldCode, state.currentMiniGameIndex);
          logEvent('game', 'interrupted', { mini_game: mgId, reason: 'page_reload' });
          if (state.currentMiniGameIndex < 2) {
            state.currentMiniGameIndex++;
          } else {
            state.currentMiniGameIndex = 0;
            state.currentWorldIndex++;
          }
          state.activeMiniGameInProgress = false;
        }

        saveLocalState({ immediate: true });
        return true;
      }
    }
  } catch (e) {
    console.warn('[Persistence] Error restoring sessionStorage:', e);
  }
  return false;
}

async function apiFetch(endpoint, options = {}) {
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

  let finalData = data;
  let finalState = stateSnapshot;

  try {
    const dataStr = JSON.stringify(data);
    const stateStr = JSON.stringify(stateSnapshot);
    const combinedBytes = (new TextEncoder().encode(dataStr)).length + (new TextEncoder().encode(stateStr)).length;
    if (combinedBytes > 4096) {
      finalData = { event_oversize: true, original_size_bytes: combinedBytes };
      finalState = { oversized: true };
    }
  } catch (e) {
    // Serialization error fallback
  }

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
    task_def_version: (data && data.task_def_version) || '1.0',
    state: finalState,
    data: finalData
  };

  state.telemetryQueue.push(eventPayload);
  saveLocalState();

  // Flush when reaching 50 buffered events, or at critical task boundaries
  if (state.telemetryQueue.length >= 50 || action === 'minigame_end' || action === 'sjt_complete') {
    flushTelemetry();
  }
}

let isFlushing = false;
let telemetryBatchSize = 50;
async function flushTelemetry() {
  if (isFlushing || !state.sessionId || state.telemetryQueue.length === 0) return false;
  if (state.telemetryTerminal) return true;
  isFlushing = true;
  const sending = state.telemetryQueue.slice(0, telemetryBatchSize);

  try {
    const resp = await apiFetch('/recruit/telemetry', {
      method: 'POST',
      body: JSON.stringify({
        session_id: state.sessionId,
        events: sending
      })
    });

    if (resp && resp.status === 422) {
      const errJson = await resp.json().catch(() => ({}));
      if (errJson.detail && (errJson.detail.detail === 'events_cap_reached' || errJson.detail.status === 'DATA_LIMITED')) {
        console.warn('[Telemetry] Terminal event cap reached (50,000). Halting future telemetry flushes.');
        state.telemetryTerminal = true;
        saveLocalState({ immediate: true });
        return true;
      }
    }

    if (resp && resp.status === 413) {
      console.warn('[Telemetry] Batch rejected with HTTP 413 (oversize).');
      if (sending.length > 1) {
        telemetryBatchSize = Math.max(1, Math.floor(sending.length / 2));
      } else {
        console.error('[Telemetry] A single telemetry event exceeds the body limit. It remains queued for recovery.');
      }
      saveLocalState({ immediate: true });
      return false;
    }

    if (!resp || !resp.ok) {
      throw new Error(resp ? `HTTP ${resp.status}` : 'No response');
    }

    state.telemetryQueue.splice(0, sending.length);
    saveLocalState();
    return true;
  } catch (err) {
    console.warn('[Telemetry] Flush failed; telemetry remains queued:', err);
    saveLocalState({ immediate: true });
    return false;
  } finally {
    isFlushing = false;
  }
}

async function flushAllTelemetry() {
  while (!state.telemetryTerminal && state.telemetryQueue.length > 0) {
    const queuedBeforeFlush = state.telemetryQueue.length;
    const sent = await flushTelemetry();
    if (!sent || state.telemetryQueue.length >= queuedBeforeFlush) return false;
  }
  return true;
}

// Flush approximately every 2.5 seconds (configured interval: 2500ms)
setInterval(() => {
  if (state.sessionId && state.telemetryQueue.length > 0 && !state.telemetryTerminal) {
    flushTelemetry();
  }
}, 2500);

// pagehide covers normal navigation and mobile backgrounding without duplicate beacons.
window.addEventListener('pagehide', () => {
  saveLocalState({ immediate: true });
  if (state.sessionId && state.telemetryQueue.length > 0) {
    const apiBase = window.ALFAAZ_API_URL || '';
    const payload = JSON.stringify({
      session_id: state.sessionId,
      events: state.telemetryQueue.slice(0, telemetryBatchSize)
    });
    navigator.sendBeacon(
      `${apiBase}/recruit/telemetry`,
      new Blob([payload], { type: 'application/json' })
    );
  }
});

// Tab Visibility Tracking
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    logEvent(state.screen, 'visibility_hidden', { timestamp: Date.now() });
    logEvent(state.screen, 'tab_hidden', { timestamp: Date.now() });
    flushTelemetry();
  } else {
    logEvent(state.screen, 'visibility_visible', { timestamp: Date.now() });
    logEvent(state.screen, 'tab_visible', { timestamp: Date.now() });
  }
});

// Window Blur and Focus Tracking
window.addEventListener('blur', () => {
  logEvent(state.screen, 'blur', { timestamp: Date.now() });
});
window.addEventListener('focus', () => {
  logEvent(state.screen, 'focus', { timestamp: Date.now() });
});

// Initialization
document.addEventListener('DOMContentLoaded', async () => {
  restoreLocalState();
  renderScreen();
  setupGlobalControls();
});

function setupGlobalControls() {
  const pauseBtn = document.getElementById('pauseBtn');
  pauseBtn?.addEventListener('click', togglePause);

  const exitBtn = document.getElementById('exitBtn');
  exitBtn?.addEventListener('click', () => {
    if (confirm('Are you sure you wish to exit the volunteer assessment? You can return at any time.')) {
      logEvent(state.screen, 'candidate_exited');
      flushTelemetry();
      window.location.href = 'index.html';
    }
  });
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
    case 'identity':
      renderIdentity(app);
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
        ${consentCopy.candidate_notice.lines.map(line => `<p>${line}</p>`).join('')}
      </div>

      <form id="consentForm" class="space-y-4 pt-2">
        <div class="flex items-center gap-2 pt-2">
          <input type="checkbox" id="ageConfirm" required class="w-4 h-4 accent-[#bd6f5d]">
          <label for="ageConfirm" class="text-xs text-[var(--text-primary)]">${consentCopy.age_confirmation.label}</label>
        </div>
        <div class="flex items-center gap-2">
          <input type="checkbox" id="consentAgree" required class="w-4 h-4 accent-[#bd6f5d]">
          <label for="consentAgree" class="text-xs text-[var(--text-primary)]">${consentCopy.research_participation.label}</label>
        </div>

        <div class="pt-4 flex justify-end">
          <button type="submit" aria-disabled="true" class="px-6 py-2.5 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition opacity-40">
            Continue &rarr;
          </button>
        </div>
      </form>
    </div>
  `;

  const ageConfirm = document.getElementById('ageConfirm');
  const consentAgree = document.getElementById('consentAgree');
  const consentSubmit = document.querySelector('#consentForm button[type="submit"]');
  const updateConsentSubmitState = () => {
    const ready = Boolean(ageConfirm?.checked && consentAgree?.checked);
    consentSubmit?.setAttribute('aria-disabled', String(!ready));
    consentSubmit?.classList.toggle('opacity-40', !ready);
  };
  ageConfirm?.addEventListener('change', updateConsentSubmitState);
  consentAgree?.addEventListener('change', updateConsentSubmitState);
  updateConsentSubmitState();

  document.getElementById('consentForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button[type="submit"]');
    if (btn?.getAttribute('aria-disabled') === 'true') return;
    const origText = btn ? btn.innerHTML : 'Continue &rarr;';
    if (btn) {
      btn.setAttribute('aria-disabled', 'true');
      btn.innerHTML = 'Connecting...';
    }

    try {
      const ageConfirmed = ageConfirm.checked;
      const researchParticipationConsent = consentAgree.checked;
      const resp = await apiFetch('/recruit/consent', {
        method: 'POST',
        body: JSON.stringify({
          choices: { research_telemetry: researchParticipationConsent },
          confirmed_18_plus: ageConfirmed,
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

        state.screen = 'identity';
        logEvent('consent', 'consent_accepted');
        saveLocalState({ immediate: true });
        renderScreen();
      } else {
        throw new Error('Missing session ID');
      }
    } catch (err) {
      alert(`Unable to initialize session: ${err.message || 'Please check connection.'}`);
      console.error(err);
      if (btn) {
        updateConsentSubmitState();
        btn.innerHTML = origText;
      }
    }
  });
}

function renderIdentity(app) {
  app.innerHTML = `
    <div class="space-y-6">
      <div class="border-b border-[var(--grid-border)] pb-4 text-center">
        <span class="act-badge">Participant Details</span>
        <h1 class="text-3xl font-serif text-[var(--text-primary)]">About You</h1>
      </div>

      <form id="identityForm" class="space-y-4 pt-2">
        <div>
          <label class="block text-xs uppercase tracking-wider text-[var(--text-secondary)] mb-1">Full Name *</label>
          <input type="text" id="fullName" required class="w-full p-2.5 bg-white border border-[var(--grid-border)] focus:border-[var(--accent-gold)] focus:outline-none" placeholder="Your name">
        </div>
        <div>
          <label class="block text-xs uppercase tracking-wider text-[var(--text-secondary)] mb-1">Email Address *</label>
          <input type="email" id="email" required class="w-full p-2.5 bg-white border border-[var(--grid-border)] focus:border-[var(--accent-gold)] focus:outline-none" placeholder="you@example.com">
        </div>
        <div class="pt-4 flex justify-end">
          <button type="submit" class="px-6 py-2.5 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition">
            Begin Session &rarr;
          </button>
        </div>
      </form>
    </div>
  `;

  document.getElementById('identityForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button[type="submit"]');
    const origText = btn ? btn.innerHTML : 'Begin Session &rarr;';
    if (btn) {
      btn.disabled = true;
      btn.innerHTML = 'Connecting...';
    }

    try {
      const resp = await apiFetch('/recruit/identity', {
        method: 'POST',
        body: JSON.stringify({
          session_id: state.sessionId,
          full_name: document.getElementById('fullName').value.trim(),
          email: document.getElementById('email').value.trim()
        })
      });
      if (!resp || !resp.ok) {
        const errData = resp ? await resp.json().catch(() => ({})) : {};
        throw new Error(errData.detail || (resp ? `Server returned ${resp.status}` : 'No response from server'));
      }

      state.screen = 'accessibility';
      logEvent('identity', 'identity_submitted');
      saveLocalState({ immediate: true });
      renderScreen();
    } catch (err) {
      alert(`Unable to continue: ${err.message || 'Please check connection.'}`);
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

    state.screen = 'warmup';
    logEvent('accessibility', 'preferences_saved', { modes });
    saveLocalState({ immediate: true });
    renderScreen();
  });
}

// 3. Warm-up Phase
function renderWarmup(app) {
  let taps = [];
  let warmupStartTime = performance.now();

  app.innerHTML = `
    <div class="space-y-6 text-center py-4 animate-fadeIn">
      <span class="act-badge">Device Check · رہنمائی</span>
      <h2 class="text-2xl font-serif text-[var(--text-primary)]">Screen & Rhythm Check</h2>
      <p class="text-xs text-[var(--text-secondary)] max-w-md mx-auto leading-relaxed">
        Please tap or click the center circle 3 times at a natural, comfortable pace to check your device.
      </p>

      <div class="py-8 flex justify-center">
        <button id="tapTarget" class="w-24 h-24 rounded-full border-2 border-[var(--accent-gold)] bg-white text-[var(--accent-gold)] font-serif text-xl flex items-center justify-center hover:bg-amber-50 active:scale-95 transition shadow-sm">
          Tap (0/3)
        </button>
      </div>

      <div id="warmupStatus" class="text-xs text-[var(--text-secondary)] tracking-wider uppercase font-medium">
        Waiting for tap 1 of 3...
      </div>
    </div>
  `;

  const btn = document.getElementById('tapTarget');
  const status = document.getElementById('warmupStatus');

  btn?.addEventListener('click', async () => {
    taps.push(performance.now());
    const count = taps.length;
    btn.textContent = `Tap (${count}/3)`;
    status.textContent = `Recorded tap ${count} of 3`;

    if (count >= 3) {
      btn.setAttribute('disabled', 'true');
      btn.classList.add('opacity-50');

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

      // Load Public SJT payload with clear loading state and retry resilience
      async function loadSjtWithRetry() {
        app.innerHTML = `
          <div class="space-y-6 text-center py-16 animate-fadeIn">
            <div class="w-8 h-8 border-2 border-[var(--accent-gold)] border-t-transparent rounded-full animate-spin mx-auto mb-3" style="width:28px; height:28px; border-radius:50%; border:2px solid var(--accent-gold); border-top-color:transparent; animation: spin 1s linear infinite; margin: 0 auto 12px auto;"></div>
            <h2 class="text-xl font-serif text-[var(--text-primary)]">Loading Scenarios...</h2>
            <p class="text-xs text-[var(--text-secondary)] max-w-sm mx-auto leading-relaxed">
              Connecting to the assessment server. This may take a few moments if starting from cold.
            </p>
          </div>
        `;

        try {
          const sjtResp = await apiFetch('/recruit/sjt/public');
          if (!sjtResp || !sjtResp.ok) {
            throw new Error(sjtResp ? `Server returned HTTP ${sjtResp.status}` : 'Network timeout');
          }
          const sjtData = await sjtResp.json();
          state.sjtScenarios = sjtData.scenarios || [];
          state.currentSjtIndex = 0;
          state.screen = 'sjt';
          saveLocalState({ immediate: true });
          renderScreen();
        } catch (err) {
          console.warn('Failed to load SJT payload:', err);
          app.innerHTML = `
            <div class="space-y-6 text-center py-12 animate-fadeIn">
              <div class="w-12 h-12 rounded-full bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center mx-auto text-xl font-serif">!</div>
              <h2 class="text-xl font-serif text-[var(--text-primary)]">Connection Notice</h2>
              <p class="text-xs text-[var(--text-secondary)] max-w-sm mx-auto leading-relaxed">
                The server is taking longer than expected to respond. Your device check is safely saved.
              </p>
              <div class="pt-2">
                <button id="retrySjtLoadBtn" class="min-h-[44px] px-6 py-2.5 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition shadow-sm rounded-xs">
                  Retry Connection &rarr;
                </button>
              </div>
            </div>
          `;
          document.getElementById('retrySjtLoadBtn')?.addEventListener('click', () => {
            loadSjtWithRetry();
          });
        }
      }

      loadSjtWithRetry();
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
    <div class="option-card min-h-[48px] ${selectedOptId === opt.id ? 'selected' : ''}" data-opt-id="${opt.id}" tabindex="0" role="button" aria-label="Option ${opt.id.slice(-1)}">
      <span class="font-serif text-sm font-semibold text-[var(--accent-gold)] shrink-0">${opt.id.slice(-1)}.</span>
      <span class="text-xs sm:text-sm text-[var(--text-primary)] leading-relaxed">${opt.text}</span>
    </div>
  `).join('');

  app.innerHTML = `
    <div class="space-y-5 animate-fadeIn">
      <!-- Top Context and Step -->
      <div class="border-b border-[var(--grid-border)] pb-3 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-1">
        <div>
          <span class="act-badge">Act ${scenario.act}: ${scenario.act_title_en}</span>
          <span class="act-title-ur font-serif">${scenario.act_title_ur || ''}</span>
          <h2 class="text-xl sm:text-2xl font-serif text-[var(--text-primary)] mt-0.5">Scenario ${current} of ${total}</h2>
        </div>
        <div class="text-[11px] sm:text-xs text-[var(--accent-gold)] uppercase tracking-wider font-medium">
          Part 1 &middot; ${current} of ${total}
        </div>
      </div>

      <!-- YOUR TASK -->
      <div class="p-3 bg-stone-100 border border-[var(--grid-border)] rounded-xs text-xs font-serif text-[var(--text-primary)] flex items-center gap-2">
        <span class="w-1.5 h-1.5 rounded-full bg-[var(--accent-gold)] inline-block shrink-0"></span>
        <span><strong>Your Task:</strong> Read the situation below and choose what you would do.</span>
      </div>

      <!-- SITUATION -->
      <div class="scenario-text text-xs sm:text-sm text-[var(--text-primary)] leading-relaxed bg-[#faf8f5] p-4 sm:p-5 border border-[var(--grid-border)] rounded-xs">
        ${scenario.setup}
      </div>

      <!-- YOUR CHOICE -->
      <div class="space-y-2.5">
        <div class="text-[11px] uppercase tracking-wider text-[var(--text-secondary)] font-medium">Choose one response:</div>
        ${optionsHtml}
      </div>

      <!-- PRIMARY ACTION -->
      <div class="pt-4 flex flex-col sm:flex-row justify-between items-center gap-3 border-t border-[var(--grid-border)]">
        <span class="text-xs text-[var(--text-secondary)] order-2 sm:order-1 text-[11px]">Tip: Press keys 1-4 to choose</span>
        <button id="nextSjtBtn" ${selectedOptId ? '' : 'disabled'} class="w-full sm:w-auto min-h-[44px] px-7 py-2.5 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] disabled:opacity-40 disabled:hover:bg-[var(--text-primary)] transition shadow-sm rounded-xs order-1 sm:order-2">
          ${current === total ? 'Complete Part 1 &rarr;' : 'Next Scenario &rarr;'}
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
  const app = document.getElementById('recruitApp');
  if (app) {
    app.innerHTML = `
      <div class="space-y-6 text-center py-16 animate-fadeIn">
        <div class="w-8 h-8 border-2 border-[var(--accent-gold)] border-t-transparent rounded-full animate-spin mx-auto mb-3" style="width:28px; height:28px; border-radius:50%; border:2px solid var(--accent-gold); border-top-color:transparent; animation: spin 1s linear infinite; margin: 0 auto 12px auto;"></div>
        <h2 class="text-xl font-serif text-[var(--text-primary)]">Saving Judgments...</h2>
        <p class="text-xs text-[var(--text-secondary)]">Recording your situation judgments to your session profile.</p>
      </div>
    `;
  }

  try {
    const res = await apiFetch('/recruit/sjt/submit', {
      method: 'POST',
      body: JSON.stringify({
        session_id: state.sessionId,
        responses: state.sjtResponses
      })
    });
    if (!res || !res.ok) {
      throw new Error(res ? `Server returned HTTP ${res.status}` : 'Connection failed');
    }
    state.screen = 'games';
    state.currentWorldIndex = 0;
    state.currentMiniGameIndex = 0;
    logEvent('sjt', 'sjt_complete', { response_count: Object.keys(state.sjtResponses).length });
    saveLocalState({ immediate: true });
    renderScreen();
  } catch (err) {
    console.warn('SJT submit error:', err);
    if (app) {
      app.innerHTML = `
        <div class="space-y-6 text-center py-12 animate-fadeIn">
          <div class="w-12 h-12 rounded-full bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center mx-auto text-xl font-serif">!</div>
          <h2 class="text-xl font-serif text-[var(--text-primary)]">Submission Notice</h2>
          <p class="text-xs text-[var(--text-secondary)] max-w-sm mx-auto leading-relaxed">
            Could not record responses due to a temporary server connection delay. Your choices are safely kept.
          </p>
          <div class="pt-2">
            <button id="retrySjtSubmitBtn" class="min-h-[44px] px-6 py-2.5 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition shadow-sm rounded-xs">
              Retry Submission &rarr;
            </button>
          </div>
        </div>
      `;
      document.getElementById('retrySjtSubmitBtn')?.addEventListener('click', () => {
        submitSjtAndProceed();
      });
    }
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

  state.activeMiniGameInProgress = true;
  saveLocalState({ immediate: true });

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
      state.activeMiniGameInProgress = false;
      const mgId = getMiniGameId(currentWorldCode, state.currentMiniGameIndex);
      logEvent('game', 'minigame_end', mgResult, {}, 'mouse', mgId);
      flushTelemetry();
      if (state.currentMiniGameIndex < 2) {
        state.currentMiniGameIndex++;
      } else {
        state.currentMiniGameIndex = 0;
        state.currentWorldIndex++;
      }
      saveLocalState({ immediate: true });
      renderGames(app, progressBarFill);
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

let isFinishingAssessment = false;

function renderFinalizationRetry(app, message) {
  if (!app) return;
  app.innerHTML = `
    <div class="space-y-6 text-center py-16 animate-fadeIn">
      <div class="w-12 h-12 rounded-full bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center mx-auto text-xl font-serif">!</div>
      <h2 class="text-2xl font-serif text-[var(--text-primary)]">Connection Notice</h2>
      <p class="text-xs text-[var(--text-secondary)] max-w-md mx-auto leading-relaxed">${message}</p>
      <div class="pt-2">
        <button id="retryFinalizationBtn" class="min-h-[44px] px-6 py-2.5 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition shadow-sm rounded-xs">Retry Finalization &rarr;</button>
      </div>
    </div>
  `;
  document.getElementById('retryFinalizationBtn')?.addEventListener('click', finishAssessment);
}

async function finishAssessment() {
  if (isFinishingAssessment) return;
  isFinishingAssessment = true;
  state.activeMiniGameInProgress = false;
  saveLocalState({ immediate: true });

  const app = document.getElementById('recruitApp');
  if (app) {
    app.innerHTML = `
      <div class="space-y-6 text-center py-16 animate-fadeIn">
        <div class="w-10 h-10 border-2 border-[var(--accent-gold)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <h2 class="text-2xl font-serif text-[var(--text-primary)]">Finalizing Assessment...</h2>
        <p class="text-xs text-[var(--text-secondary)]">Safely recording research telemetry and saving your session profile.</p>
      </div>
    `;
  }

  // Completion is only valid after every remaining telemetry batch is acknowledged.
  const telemetryFlushed = await flushAllTelemetry();
  if (!telemetryFlushed) {
    renderFinalizationRetry(app, 'Your activity record is safely stored on this device, but the connection did not confirm every final event. Please retry before completing the session.');
    isFinishingAssessment = false;
    return;
  }

  try {
    const response = await apiFetch('/recruit/complete', {
      method: 'POST',
      body: JSON.stringify({ session_id: state.sessionId })
    });
    if (!response || !response.ok) {
      throw new Error(response ? `Server returned HTTP ${response.status}` : 'No response from server');
    }

    state.screen = 'complete';
    saveLocalState({ immediate: true });
    renderScreen();
  } catch (err) {
    console.warn('Session complete submission error:', err);
    renderFinalizationRetry(app, 'The final session confirmation was not received. Your completed activity remains saved; please retry the final confirmation.');
  } finally {
    isFinishingAssessment = false;
  }
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
