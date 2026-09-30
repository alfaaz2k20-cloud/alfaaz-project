/* ==========================================================================
   ALFAAZ RECRUIT — WORLD 4: THE SHIFTING PATTERNS (متغیر گرڈ)
   Mini-games: E1 (The Ceramic Mosaic), E2 (The Unexpected Guest), E3 (The Geometric Harmony)
   ========================================================================== */

import { renderTutorialCard } from './index.js';

export function runTheShiftingGrid(context, renderHeader) {
  const { appContainer, miniGameIndex, logEvent, onMiniGameComplete } = context;

  switch (miniGameIndex) {
    case 0:
      runE1RuleShift(appContainer, renderHeader, logEvent, onMiniGameComplete);
      break;
    case 1:
      runE2SetbackRecovery(appContainer, renderHeader, logEvent, onMiniGameComplete);
      break;
    case 2:
      runE3ChangingConditions(appContainer, renderHeader, logEvent, onMiniGameComplete);
      break;
  }
}

// --------------------------------------------------------------------------
// E1: The Ceramic Mosaic
// --------------------------------------------------------------------------
function runE1RuleShift(app, renderHeader, logEvent, onComplete) {
  let inTutorial = true;
  const cards = [
    { id: 'C1', color: 'Gold', shape: 'Circle', icon: '&#9679;', label: 'Gold Circle' },
    { id: 'C2', color: 'Sage', shape: 'Square', icon: '&#9632;', label: 'Sage Square' },
    { id: 'C3', color: 'Gold', shape: 'Square', icon: '&#9632;', label: 'Gold Square' },
    { id: 'C4', color: 'Sage', shape: 'Circle', icon: '&#9679;', label: 'Sage Circle' },
    { id: 'C5', color: 'Gold', shape: 'Square', icon: '&#9632;', label: 'Gold Square' },
    { id: 'C6', color: 'Sage', shape: 'Circle', icon: '&#9679;', label: 'Sage Circle' }
  ];

  let currentIdx = 0;
  let correctCount = 0;

  function render() {
    if (inTutorial) {
      app.innerHTML = `
        <div>
          ${renderHeader('Part 1: The Ceramic Mosaic', 'Sorting geometric tiles under changing design requirements.')}
          ${renderTutorialCard({
            icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>`,
            goal: 'Sort each geometric tile into the correct bin based on the active sorting rule badge.',
            steps: [
              'Check the active sorting rule badge at the top (e.g. Color or Shape).',
              'Observe the tile presented in the center stage.',
              'Click the matching target bin to place the tile.'
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

    if (currentIdx >= cards.length) {
      const accuracy = correctCount / cards.length;
      onComplete({
        mini_game: 'E1',
        observations_count: cards.length,
        accuracy: accuracy
      });
      return;
    }

    const currentCard = cards[currentIdx];
    const activeRuleName = currentIdx < 3 ? 'Match by Color' : 'Match by Shape';

    app.innerHTML = `
      <div class="animate-fadeIn">
        ${renderHeader('Part 1: The Ceramic Mosaic', 'Sort each tile into the matching container according to the active rule.')}

        <div class="flex justify-between items-center mb-4">
          <span class="text-xs text-[var(--text-secondary)] font-medium flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full bg-[var(--accent-gold)] inline-block"></span>
            Tile ${currentIdx + 1} of ${cards.length}
          </span>
          <span class="text-xs font-semibold px-3 py-1 bg-amber-50 text-[var(--accent-gold)] border border-[var(--accent-gold)]/40 shadow-xs flex items-center gap-1">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            Active Rule: ${activeRuleName}
          </span>
        </div>

        <!-- Current Card Display -->
        <div class="p-8 bg-[#faf8f5] border border-[var(--grid-border)] mb-6 text-center shadow-xs rounded-xs">
          <div class="text-5xl mb-2.5 transition-transform hover:scale-105 ${currentCard.color === 'Gold' ? 'text-[var(--accent-gold)]' : 'text-emerald-700'}">
            ${currentCard.icon}
          </div>
          <div class="text-sm font-serif font-semibold text-[var(--text-primary)]">${currentCard.label}</div>
        </div>

        <!-- Target Bins -->
        <div class="grid grid-cols-2 gap-4">
          ${currentIdx < 3 ? `
            <button class="bin-btn p-4 bg-white border border-[var(--grid-border)] hover:border-[var(--accent-gold)] hover:bg-amber-50/40 transition text-center shadow-xs" data-choice="Gold">
              <span class="text-xs font-semibold text-[var(--accent-gold)] block">Container 1: Gold Items</span>
            </button>
            <button class="bin-btn p-4 bg-white border border-[var(--grid-border)] hover:border-[var(--accent-gold)] hover:bg-amber-50/40 transition text-center shadow-xs" data-choice="Sage">
              <span class="text-xs font-semibold text-emerald-800 block">Container 2: Sage Items</span>
            </button>
          ` : `
            <button class="bin-btn p-4 bg-white border border-[var(--grid-border)] hover:border-[var(--accent-gold)] hover:bg-amber-50/40 transition text-center shadow-xs" data-choice="Circle">
              <span class="text-xs font-semibold text-[var(--text-primary)] block">Container 1: Circles (&#9679;)</span>
            </button>
            <button class="bin-btn p-4 bg-white border border-[var(--grid-border)] hover:border-[var(--accent-gold)] hover:bg-amber-50/40 transition text-center shadow-xs" data-choice="Square">
              <span class="text-xs font-semibold text-[var(--text-primary)] block">Container 2: Squares (&#9632;)</span>
            </button>
          `}
        </div>
      </div>
    `;

    logEvent('card_presented', { card_id: currentCard.id, rule: activeRuleName });

    app.querySelectorAll('.bin-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const choice = btn.getAttribute('data-choice');
        let isCorrect = false;
        if (currentIdx < 3) {
          isCorrect = (choice === currentCard.color);
        } else {
          isCorrect = (choice === currentCard.shape);
        }
        if (isCorrect) correctCount++;
        logEvent('card_sorted', { card_id: currentCard.id, choice, is_correct: isCorrect });
        currentIdx++;
        render();
      });
    });
  }

  render();
}

// --------------------------------------------------------------------------
// E2: The Unexpected Guest
// --------------------------------------------------------------------------
function runE2SetbackRecovery(app, renderHeader, logEvent, onComplete) {
  let inTutorial = true;
  let chosenAction = null;

  function render() {
    if (inTutorial) {
      app.innerHTML = `
        <div>
          ${renderHeader('Part 2: The Unexpected Guest', 'Responding calmly to mid-task courtyard changes.')}
          ${renderTutorialCard({
            icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`,
            goal: 'Choose how to handle an unexpected visitor or outdoor change while setting up.',
            steps: [
              'Read the situation update from the gallery entrance.',
              'Evaluate the 3 calm, constructive coordination responses.',
              'Select your preferred response.'
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
        ${renderHeader('Part 2: The Unexpected Guest', 'A sudden gust in the courtyard tipped the welcome easel. Choose your response.')}

        <div class="p-4 bg-amber-50/80 border border-amber-300 rounded-sm mb-6 flex items-start gap-3 shadow-xs">
          <div class="w-9 h-9 rounded-full bg-amber-200 border border-amber-400 flex items-center justify-center text-amber-900 shrink-0">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
          </div>
          <div>
            <div class="text-[10px] font-bold text-[#bd6f5d] uppercase tracking-wider">Courtyard Notice</div>
            <div class="text-xs text-[var(--text-primary)] mt-0.5 leading-relaxed">
              "A sudden breeze tipped over the welcome board in the courtyard. Signs are displaced."
            </div>
          </div>
        </div>

        <div class="space-y-3 mb-6">
          <div class="e2-card p-4 bg-white border border-[var(--grid-border)] cursor-pointer hover:border-[var(--accent-gold)] transition shadow-xs" data-opt="QUICK_FIX">
            <div class="text-xs font-semibold text-[var(--text-primary)]">Step out for 2 minutes to secure the easel with a stone weight, then return</div>
            <div class="text-[11px] text-[var(--text-secondary)] mt-1">Resolves the outdoor entrance quickly before continuing indoor preparation.</div>
          </div>

          <div class="e2-card p-4 bg-white border border-[var(--grid-border)] cursor-pointer hover:border-[var(--accent-gold)] transition shadow-xs" data-opt="ASK_TEAM">
            <div class="text-xs font-semibold text-[var(--text-primary)]">Check if a courtyard volunteer is already stationed outside to adjust it</div>
            <div class="text-[11px] text-[var(--text-secondary)] mt-1">Coordinates with outdoor colleagues without breaking your current momentum.</div>
          </div>

          <div class="e2-card p-4 bg-white border border-[var(--grid-border)] cursor-pointer hover:border-[var(--accent-gold)] transition shadow-xs" data-opt="FINISH_FIRST">
            <div class="text-xs font-semibold text-[var(--text-primary)]">Complete your current indoor setup task first, then reset the outer board</div>
            <div class="text-[11px] text-[var(--text-secondary)] mt-1">Ensures the critical indoor checklist stays on schedule before attending to the yard.</div>
          </div>
        </div>

        <div class="flex justify-end">
          <button id="e2ConfirmBtn" disabled class="px-7 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] disabled:opacity-40 transition shadow-sm">
            Confirm Action Choice &rarr;
          </button>
        </div>
      </div>
    `;

    const btn = document.getElementById('e2ConfirmBtn');
    app.querySelectorAll('.e2-card').forEach(card => {
      card.addEventListener('click', () => {
        app.querySelectorAll('.e2-card').forEach(c => c.classList.remove('border-[var(--accent-gold)]', 'bg-amber-50/40'));
        card.classList.add('border-[var(--accent-gold)]', 'bg-amber-50/40');
        chosenAction = card.getAttribute('data-opt');
        if (btn) btn.disabled = false;
      });
    });

    btn?.addEventListener('click', () => {
      logEvent('interruption_handled', { action: chosenAction });
      onComplete({
        mini_game: 'E2',
        observations_count: 1,
        action: chosenAction
      });
    });
  }

  render();
}

// --------------------------------------------------------------------------
// E3: The Geometric Harmony
// --------------------------------------------------------------------------
function runE3ChangingConditions(app, renderHeader, logEvent, onComplete) {
  let inTutorial = true;
  let selectedTile = null;

  const options = [
    { id: 'T1', label: 'Geometric Diamond', desc: 'Symmetrical diagonal motifs that complement straight wooden borders.' },
    { id: 'T2', label: 'Flowing Wave Motif', desc: 'Curved lines that soften angular architectural lines in the room.' },
    { id: 'T3', label: 'Minimalist Dot Grid', desc: 'Quiet, unadorned spacing that leaves breathing room for the artwork.' }
  ];

  function render() {
    if (inTutorial) {
      app.innerHTML = `
        <div>
          ${renderHeader('Part 3: The Geometric Harmony', 'Balancing visual motifs for the central gallery floor mat.')}
          ${renderTutorialCard({
            icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"></path></svg>`,
            goal: 'Select the geometric decorative motif that establishes aesthetic harmony in the center hall.',
            steps: [
              'Examine the 3 decorative tile patterns.',
              'Choose the motif that best suits the gathering hall ambience.',
              'Click to confirm your selection.'
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
        ${renderHeader('Part 3: The Geometric Harmony', 'Choose the tile motif that best balances the central gallery aesthetic.')}

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          ${options.map(opt => `
            <div class="e3-card p-5 bg-white border border-[var(--grid-border)] cursor-pointer hover:border-[var(--accent-gold)] transition text-center space-y-2.5 shadow-xs" data-tile="${opt.id}">
              <div class="w-12 h-12 mx-auto bg-amber-50 border border-[var(--accent-gold)]/40 flex items-center justify-center font-serif text-xl text-[var(--accent-gold)] rounded-xs">
                &#10022;
              </div>
              <div class="text-xs font-semibold text-[var(--text-primary)]">${opt.label}</div>
              <div class="text-[11px] text-[var(--text-secondary)] leading-relaxed">${opt.desc}</div>
            </div>
          `).join('')}
        </div>

        <div class="flex justify-end">
          <button id="e3ConfirmBtn" disabled class="px-7 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] disabled:opacity-40 transition shadow-sm">
            Confirm Motif & Finish &rarr;
          </button>
        </div>
      </div>
    `;

    const btn = document.getElementById('e3ConfirmBtn');
    app.querySelectorAll('.e3-card').forEach(card => {
      card.addEventListener('click', () => {
        app.querySelectorAll('.e3-card').forEach(c => c.classList.remove('border-[var(--accent-gold)]', 'bg-amber-50/40'));
        card.classList.add('border-[var(--accent-gold)]', 'bg-amber-50/40');
        selectedTile = card.getAttribute('data-tile');
        if (btn) btn.disabled = false;
      });
    });

    btn?.addEventListener('click', () => {
      logEvent('pattern_selected', { tile: selectedTile });
      onComplete({
        mini_game: 'E3',
        observations_count: 1,
        tile: selectedTile
      });
    });
  }

  render();
}

