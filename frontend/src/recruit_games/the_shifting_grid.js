/* ==========================================================================
   ALFAAZ RECRUIT — WORLD 4: THE SHIFTING GRID (EMOTIONAL AGILITY)
   Mini-games: E1 (Card Sorting), E2 (Handling Interruption), E3 (Pattern Balance)
   ========================================================================== */

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
// E1: Card Sorting & Rule Shift
// --------------------------------------------------------------------------
function runE1RuleShift(app, renderHeader, logEvent, onComplete) {
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
    // Rule starts as COLOR for cards 0-2, shifts to SHAPE for cards 3-5
    const activeRuleName = currentIdx < 3 ? 'Match by Color' : 'Match by Shape';

    app.innerHTML = `
      <div>
        ${renderHeader('Task 1: Pattern Sorting', 'Sort each card into the matching box. Pay attention to the active rule!')}

        <div class="flex justify-between items-center mb-4">
          <span class="text-xs text-[var(--text-secondary)] font-medium">Card ${currentIdx + 1} of ${cards.length}</span>
          <span class="text-xs font-semibold px-2.5 py-1 bg-amber-50 text-[var(--accent-gold)] border border-[var(--accent-gold)]/40">
            Rule: ${activeRuleName}
          </span>
        </div>

        <!-- Current Card Display -->
        <div class="p-8 bg-[#faf8f5] border border-[var(--grid-border)] mb-6 text-center">
          <div class="text-4xl mb-2 ${currentCard.color === 'Gold' ? 'text-[var(--accent-gold)]' : 'text-emerald-700'}">
            ${currentCard.icon}
          </div>
          <div class="text-sm font-serif font-semibold text-[var(--text-primary)]">${currentCard.label}</div>
        </div>

        <!-- Sorting Target Bins -->
        <div class="grid grid-cols-2 gap-4">
          ${currentIdx < 3 ? `
            <button class="bin-btn p-4 bg-white border border-[var(--grid-border)] hover:border-[var(--accent-gold)] hover:bg-amber-50/30 transition text-center" data-choice="Gold">
              <span class="text-xs font-semibold text-[var(--accent-gold)] block">Box 1: Gold Items</span>
            </button>
            <button class="bin-btn p-4 bg-white border border-[var(--grid-border)] hover:border-[var(--accent-gold)] hover:bg-amber-50/30 transition text-center" data-choice="Sage">
              <span class="text-xs font-semibold text-emerald-800 block">Box 2: Sage Items</span>
            </button>
          ` : `
            <button class="bin-btn p-4 bg-white border border-[var(--grid-border)] hover:border-[var(--accent-gold)] hover:bg-amber-50/30 transition text-center" data-choice="Circle">
              <span class="text-xs font-semibold text-[var(--text-primary)] block">Box 1: Circles (&#9679;)</span>
            </button>
            <button class="bin-btn p-4 bg-white border border-[var(--grid-border)] hover:border-[var(--accent-gold)] hover:bg-amber-50/30 transition text-center" data-choice="Square">
              <span class="text-xs font-semibold text-[var(--text-primary)] block">Box 2: Squares (&#9632;)</span>
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
// E2: Handling Interruption
// --------------------------------------------------------------------------
function runE2SetbackRecovery(app, renderHeader, logEvent, onComplete) {
  let chosenAction = null;

  app.innerHTML = `
    <div>
      ${renderHeader('Task 2: Surprise Interruption', 'A sudden message arrives while you are preparing the room. Choose your next step.')}

      <div class="p-4 bg-amber-50 border border-amber-300 rounded-sm mb-6 flex items-start gap-3">
        <span class="text-base">&#9888;</span>
        <div>
          <div class="text-xs font-bold text-[#bd6f5d] uppercase">Urgent Notice</div>
          <div class="text-xs text-[var(--text-primary)] mt-0.5">
            "A sudden breeze in the courtyard blew over the welcome easel. The signs are scattered."
          </div>
        </div>
      </div>

      <div class="space-y-3 mb-6">
        <div class="e2-card p-4 bg-white border border-[var(--grid-border)] cursor-pointer hover:border-[var(--accent-gold)] transition" data-opt="QUICK_FIX">
          <div class="text-xs font-semibold text-[var(--text-primary)]">Step outside for 2 minutes, set up the easel securely with a stone weight, then return</div>
          <div class="text-[11px] text-[var(--text-secondary)] mt-1">Solves the outdoor issue immediately and returns to current work.</div>
        </div>

        <div class="e2-card p-4 bg-white border border-[var(--grid-border)] cursor-pointer hover:border-[var(--accent-gold)] transition" data-opt="ASK_TEAM">
          <div class="text-xs font-semibold text-[var(--text-primary)]">Quickly check if a courtyard volunteer is already nearby to reset it</div>
          <div class="text-[11px] text-[var(--text-secondary)] mt-1">Coordinates with outdoor teammates without breaking your own focus.</div>
        </div>

        <div class="e2-card p-4 bg-white border border-[var(--grid-border)] cursor-pointer hover:border-[var(--accent-gold)] transition" data-opt="FINISH_FIRST">
          <div class="text-xs font-semibold text-[var(--text-primary)]">Finish your current indoor setup task first, then go out to reset the easel</div>
          <div class="text-[11px] text-[var(--text-secondary)] mt-1">Ensures the critical indoor checklist is safely completed without losing rhythm.</div>
        </div>
      </div>

      <div class="flex justify-end">
        <button id="e2ConfirmBtn" disabled class="px-6 py-2.5 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] disabled:opacity-40 transition">
          Confirm Action &rarr;
        </button>
      </div>
    </div>
  `;

  const btn = document.getElementById('e2ConfirmBtn');
  app.querySelectorAll('.e2-card').forEach(card => {
    card.addEventListener('click', () => {
      app.querySelectorAll('.e2-card').forEach(c => c.classList.remove('border-[var(--accent-gold)]', 'bg-amber-50/30'));
      card.classList.add('border-[var(--accent-gold)]', 'bg-amber-50/30');
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

// --------------------------------------------------------------------------
// E3: Pattern Balance
// --------------------------------------------------------------------------
function runE3ChangingConditions(app, renderHeader, logEvent, onComplete) {
  let selectedTile = null;

  const options = [
    { id: 'T1', label: 'Geometric Diamond', desc: 'Balanced diagonals that complement straight borders.' },
    { id: 'T2', label: 'Flowing Wave', desc: 'Curved lines that soften angular floor patterns.' },
    { id: 'T3', label: 'Minimalist Dot', desc: 'Open, calm space that leaves breathing room.' }
  ];

  app.innerHTML = `
    <div>
      ${renderHeader('Task 3: Pattern Harmony', 'Select the tile that creates the best harmony for the center gallery mat.')}

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        ${options.map(opt => `
          <div class="e3-card p-5 bg-white border border-[var(--grid-border)] cursor-pointer hover:border-[var(--accent-gold)] transition text-center space-y-2" data-tile="${opt.id}">
            <div class="w-12 h-12 mx-auto bg-amber-50 border border-[var(--accent-gold)]/40 flex items-center justify-center font-serif text-lg text-[var(--accent-gold)]">
              &#10022;
            </div>
            <div class="text-xs font-semibold text-[var(--text-primary)]">${opt.label}</div>
            <div class="text-[11px] text-[var(--text-secondary)] leading-relaxed">${opt.desc}</div>
          </div>
        `).join('')}
      </div>

      <div class="flex justify-end">
        <button id="e3ConfirmBtn" disabled class="px-6 py-2.5 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] disabled:opacity-40 transition">
          Finish World 4 &rarr;
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
