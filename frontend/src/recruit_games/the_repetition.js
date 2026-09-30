/* ==========================================================================
   ALFAAZ RECRUIT — WORLD 7: THE FINAL GATHERING (تکرار)
   Mini-games: M1 (The Wax Seal), M2 (The Courtesy Sleeves), M3 (The Evening Threshold)
   ========================================================================== */

import { renderTutorialCard } from './index.js';

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
// M1: The Wax Seal (3 Envelopes)
// --------------------------------------------------------------------------
function runM1Minimum(app, renderHeader, logEvent, onComplete) {
  let inTutorial = true;
  const invitations = [
    { id: 'INV_1', recipient: 'Senior Calligrapher — Master Ghulam' },
    { id: 'INV_2', recipient: 'Community Youth Art Collective' },
    { id: 'INV_3', recipient: 'Regional Heritage Conservation Trust' }
  ];

  let currentIdx = 0;
  let latencies = [];
  let unitStart = performance.now();

  function render() {
    if (inTutorial) {
      app.innerHTML = `
        <div>
          ${renderHeader('Part 1: The Wax Seal', 'Sealing formal event invitations for visiting artists and guests.')}
          ${renderTutorialCard({
            icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>`,
            goal: 'Apply the warm terracotta wax seal to each of the 3 handmade invitation envelopes.',
            steps: [
              'Review the named recipient on the handcrafted envelope.',
              'Click the Apply Wax Seal button to press the seal.',
              'Complete all 3 invitations to proceed.'
            ]
          })}
        </div>
      `;
      document.getElementById('startActivityBtn')?.addEventListener('click', () => {
        inTutorial = false;
        unitStart = performance.now();
        render();
      });
      return;
    }

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
      <div class="animate-fadeIn">
        ${renderHeader('Part 1: The Wax Seal', 'Apply the collective seal stamp to each of the 3 formal invitation envelopes.')}

        <div class="text-xs text-[var(--text-secondary)] font-medium mb-4 flex items-center gap-1.5">
          <span class="w-2 h-2 rounded-full bg-[var(--accent-gold)] inline-block"></span>
          Envelope ${currentIdx + 1} of ${invitations.length}
        </div>

        <!-- Interactive Envelope Preview -->
        <div class="p-8 bg-[#faf8f5] border border-[var(--grid-border)] mb-6 text-center shadow-xs">
          <div class="w-full max-w-sm mx-auto h-40 bg-amber-50/70 border border-[var(--grid-border)] flex flex-col items-center justify-center p-4 relative shadow-sm rounded-xs">
            <span class="text-[10px] uppercase tracking-widest text-[var(--text-secondary)]">Ceremonial Invitation</span>
            <div class="font-serif text-sm font-semibold text-[var(--text-primary)] mt-1.5">${item.recipient}</div>
            
            <div id="sealDisplay" class="w-12 h-12 rounded-full border-2 border-dashed border-[var(--accent-gold)] mt-3 flex items-center justify-center text-[10px] text-[var(--accent-gold)] font-bold shadow-xs">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"></path></svg>
            </div>
          </div>
        </div>

        <div class="flex justify-center">
          <button id="stampBtn" class="px-8 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition shadow-sm flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
            Press Wax Seal &rarr;
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
// M2: The Courtesy Sleeves
// --------------------------------------------------------------------------
function runM2Optional(app, renderHeader, logEvent, onComplete) {
  let inTutorial = true;
  let optionalCompleted = 0;
  const maxOptional = 3;

  function render() {
    if (inTutorial) {
      app.innerHTML = `
        <div>
          ${renderHeader('Part 2: The Courtesy Sleeves', 'Preparing optional extra guest invitation folios.')}
          ${renderTutorialCard({
            icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>`,
            goal: 'Optionally stamp additional courtesy sleeves for community elders and artisans, or conclude whenever you like.',
            steps: [
              'The mandatory 3 invitations are already sealed.',
              'Click + Seal Extra Sleeve if you choose to prepare more.',
              'Click Proceed when you are ready.'
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
        ${renderHeader('Part 2: The Courtesy Sleeves', 'The required invitations are complete. 3 voluntary courtesy sleeves remain on the table.')}

        <div class="p-6 bg-[#faf8f5] border border-[var(--grid-border)] mb-6 text-center shadow-xs">
          <div class="text-sm font-serif text-[var(--text-primary)] mb-1.5 font-medium">
            Optional Courtesy Sleeves Available
          </div>
          <p class="text-xs text-[var(--text-secondary)] max-w-md mx-auto mb-4 leading-relaxed">
            You may stamp additional invitations for visiting youth guilds, or proceed at any time.
          </p>

          <div class="text-lg font-serif font-bold text-[var(--accent-gold)] mb-4">
            ${optionalCompleted} of ${maxOptional} Extra Sleeves Sealed
          </div>

          <div class="flex justify-center gap-4">
            ${optionalCompleted < maxOptional ? `
              <button id="stampExtraBtn" class="px-6 py-2.5 bg-white border border-[var(--accent-gold)] text-[var(--accent-gold)] text-xs uppercase tracking-wider hover:bg-amber-50 transition shadow-xs flex items-center gap-1.5">
                + Seal Extra Courtesy Sleeve
              </button>
            ` : '<span class="text-xs text-emerald-700 font-semibold flex items-center gap-1">&#10003; All optional sleeves sealed.</span>'}
          </div>
        </div>

        <div class="flex justify-end">
          <button id="finishM2Btn" class="px-7 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition shadow-sm">
            Proceed to Final Check &rarr;
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
// M3: The Evening Threshold
// --------------------------------------------------------------------------
function runM3ReducedReward(app, renderHeader, logEvent, onComplete) {
  let inTutorial = true;
  const tasks = [
    { id: 'T_LIGHTS', name: 'Turn on Warm Gallery Spotlights and Lanterns' },
    { id: 'T_PAMPHLETS', name: 'Arrange Urdu & Kashmiri Poetry Guides on Welcome Stand' },
    { id: 'T_FLOWERS', name: 'Place Fresh Jasmine Petals at the Courtyard Entrance Urn' }
  ];

  let completedTasks = {};

  function render() {
    if (inTutorial) {
      app.innerHTML = `
        <div>
          ${renderHeader('Part 3: The Evening Threshold', 'Final 3-point exhibition readiness inspection before guests arrive.')}
          ${renderTutorialCard({
            icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>`,
            goal: 'Verify the 3 gallery readiness checkpoints to prepare the hall for evening arrival.',
            steps: [
              'Check each gallery preparation item (lighting, guides, floral welcome).',
              'Verify all 3 items to complete the ritual.',
              'Click Finalize Assessment to submit your session.'
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

    const allDone = tasks.every(t => completedTasks[t.id]);

    app.innerHTML = `
      <div class="animate-fadeIn">
        ${renderHeader('Part 3: The Evening Threshold', 'Verify the final 3-point checklist to make the gallery ready for evening guests.')}

        <div class="space-y-3 mb-6">
          ${tasks.map((t, idx) => `
            <label class="flex items-center gap-3.5 p-4 bg-white border ${completedTasks[t.id] ? 'border-emerald-600 bg-emerald-50/30 shadow-xs' : 'border-[var(--grid-border)] shadow-xs'} cursor-pointer hover:border-[var(--accent-gold)] transition rounded-xs">
              <input type="checkbox" id="task_${t.id}" ${completedTasks[t.id] ? 'checked' : ''} class="accent-[#bd6f5d] w-4 h-4">
              <span class="text-xs font-medium text-[var(--text-primary)]">${idx + 1}. ${t.name}</span>
            </label>
          `).join('')}
        </div>

        <div class="flex justify-end">
          <button id="m3FinishBtn" ${allDone ? '' : 'disabled'} class="px-7 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] disabled:opacity-40 transition shadow-sm">
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

