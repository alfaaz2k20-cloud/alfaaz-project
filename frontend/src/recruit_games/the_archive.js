/* ==========================================================================
   ALFAAZ RECRUIT — WORLD 2: THE LIVING ARCHIVE (دستاویز)
   Mini-games: A1 (The Manuscript Folios), A2 (The Fragile Leaf), A3 (The Exhibition Ledger)
   ========================================================================== */

import { renderTutorialCard } from './index.js';

export function runTheArchive(context, renderHeader) {
  const { appContainer, miniGameIndex, logEvent, onMiniGameComplete } = context;

  switch (miniGameIndex) {
    case 0:
      runA1Classification(appContainer, renderHeader, logEvent, onMiniGameComplete);
      break;
    case 1:
      runA2ExceptionHandling(appContainer, renderHeader, logEvent, onMiniGameComplete);
      break;
    case 2:
      runA3QualityControl(appContainer, renderHeader, logEvent, onMiniGameComplete);
      break;
  }
}

// --------------------------------------------------------------------------
// A1: The Manuscript Folios
// --------------------------------------------------------------------------
function runA1Classification(app, renderHeader, logEvent, onComplete) {
  let inTutorial = true;
  const documents = [
    { id: 'FOLIO-1', title: 'Handwritten Ghazal Manuscript (1842)', tags: ['Poetry', 'Parchment', 'Ink'], targetCategory: 'Books & Poetry' },
    { id: 'FOLIO-2', title: 'Carved Walnut Printing Block', tags: ['Object', 'Craft Tool', 'Wood'], targetCategory: 'Art Objects' },
    { id: 'FOLIO-3', title: 'Lal Ded Vakh Verse Translations', tags: ['Poetry Book', 'Kashmiri', 'Paper'], targetCategory: 'Books & Poetry' },
    { id: 'FOLIO-4', title: 'Silver Thread Embroidery Sample', tags: ['Fabric', 'Silk & Metal', 'Textile'], targetCategory: 'Art Objects' },
    { id: 'FOLIO-5', title: '1924 Exhibition Visitor Guestbook', tags: ['Official Record', 'Signatures', 'Ledger'], targetCategory: 'Letters & Records' },
    { id: 'FOLIO-6', title: 'Founder Letter on Folio Care', tags: ['Letter', 'Preservation Guide', 'Archive'], targetCategory: 'Letters & Records' }
  ];

  let currentDocIdx = 0;
  let correctCount = 0;
  let guideOpened = false;

  function render() {
    if (inTutorial) {
      app.innerHTML = `
        <div>
          ${renderHeader('Part 1: The Manuscript Folios', 'Preserving and organizing historical folios and objects.')}
          ${renderTutorialCard({
            icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>`,
            goal: 'Organize each historical item into its designated archive shelf.',
            steps: [
              'Examine the item title and descriptor tags on the card.',
              'Click the shelf guide button if you want to verify category rules.',
              'Select the appropriate archive shelf to place the folio.'
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

    if (currentDocIdx >= documents.length) {
      const accuracy = correctCount / documents.length;
      onComplete({
        mini_game: 'A1',
        observations_count: documents.length,
        accuracy: accuracy,
        guide_opened: guideOpened
      });
      return;
    }

    const doc = documents[currentDocIdx];

    app.innerHTML = `
      <div class="animate-fadeIn">
        ${renderHeader('Part 1: The Manuscript Folios', 'Select the correct shelf for each historical archive artifact.')}

        <div class="flex justify-between items-center mb-4">
          <span class="text-xs text-[var(--text-secondary)] font-medium flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full bg-[var(--accent-gold)] inline-block"></span>
            Folio ${currentDocIdx + 1} of ${documents.length}
          </span>
          <button id="guideBtn" class="text-xs text-[var(--accent-gold)] border border-[var(--accent-gold)]/40 px-3 py-1 hover:bg-amber-50 transition flex items-center gap-1.5">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            Shelf Guide
          </button>
        </div>

        <div id="guideModal" class="hidden p-4 mb-4 bg-amber-50/80 border border-[var(--accent-gold)]/40 text-xs text-[var(--text-primary)] space-y-1 shadow-xs">
          <div>• <strong>1. Books & Poetry:</strong> Handwritten manuscripts, poetry leaves, verse folios.</div>
          <div>• <strong>2. Art Objects:</strong> Wooden blocks, textile fragments, metal craft tools.</div>
          <div>• <strong>3. Letters & Records:</strong> Guestbooks, official letters, event registers.</div>
        </div>

        <div class="p-6 bg-[#faf8f5] border border-[var(--grid-border)] mb-6 text-center shadow-xs">
          <span class="text-[10px] tracking-widest text-[var(--text-secondary)] uppercase font-mono">${doc.id}</span>
          <h3 class="text-lg font-serif text-[var(--text-primary)] font-medium mt-1 mb-3">${doc.title}</h3>
          <div class="flex justify-center gap-2">
            ${doc.tags.map(t => `<span class="px-2.5 py-1 bg-white border border-[var(--grid-border)] text-xs text-[var(--text-secondary)] rounded-xs">${t}</span>`).join('')}
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
          <button class="cat-btn p-4 bg-white border border-[var(--grid-border)] text-xs font-semibold uppercase tracking-wider hover:border-[var(--accent-gold)] hover:bg-amber-50/40 transition text-center shadow-xs flex flex-col items-center gap-1" data-cat="Books & Poetry">
            <svg class="w-4 h-4 text-[var(--accent-gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
            Books & Poetry
          </button>
          <button class="cat-btn p-4 bg-white border border-[var(--grid-border)] text-xs font-semibold uppercase tracking-wider hover:border-[var(--accent-gold)] hover:bg-amber-50/40 transition text-center shadow-xs flex flex-col items-center gap-1" data-cat="Art Objects">
            <svg class="w-4 h-4 text-[var(--accent-gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
            Art Objects
          </button>
          <button class="cat-btn p-4 bg-white border border-[var(--grid-border)] text-xs font-semibold uppercase tracking-wider hover:border-[var(--accent-gold)] hover:bg-amber-50/40 transition text-center shadow-xs flex flex-col items-center gap-1" data-cat="Letters & Records">
            <svg class="w-4 h-4 text-[var(--accent-gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
            Letters & Records
          </button>
        </div>
      </div>
    `;

    logEvent('item_presented', { doc_id: doc.id, index: currentDocIdx });

    document.getElementById('guideBtn')?.addEventListener('click', () => {
      const modal = document.getElementById('guideModal');
      modal?.classList.toggle('hidden');
      guideOpened = true;
      logEvent('guide_viewed', { doc_id: doc.id });
    });

    app.querySelectorAll('.cat-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const cat = btn.getAttribute('data-cat');
        const isCorrect = (cat === doc.targetCategory);
        if (isCorrect) correctCount++;
        logEvent('item_sorted', { doc_id: doc.id, choice: cat, is_correct: isCorrect });
        currentDocIdx++;
        render();
      });
    });
  }

  render();
}

// --------------------------------------------------------------------------
// A2: The Fragile Leaf
// --------------------------------------------------------------------------
function runA2ExceptionHandling(app, renderHeader, logEvent, onComplete) {
  let inTutorial = true;
  let chosenAction = null;

  function render() {
    if (inTutorial) {
      app.innerHTML = `
        <div>
          ${renderHeader('Part 2: The Fragile Leaf', 'Handling an archival leaf with partial water wear.')}
          ${renderTutorialCard({
            icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>`,
            goal: 'Decide how to preserve an ancient poem leaf with faint, blurred dating.',
            steps: [
              'Review the condition notes for the 19th-century ghazal leaf.',
              'Assess the preservation options for accessioning.',
              'Select your archival handling recommendation.'
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
        ${renderHeader('Part 2: The Fragile Leaf', 'A 19th-century poem leaf has faint water spots and a blurred year stamp. Select your approach.')}

        <div class="p-6 bg-[#faf8f5] border border-[var(--grid-border)] mb-6 text-center shadow-xs">
          <div class="w-10 h-10 rounded-full bg-amber-100 border border-[var(--accent-gold)] flex items-center justify-center text-[var(--accent-gold)] mx-auto mb-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
          </div>
          <span class="text-[10px] tracking-widest text-[#bd6f5d] uppercase font-semibold">Special Conservation Inspection</span>
          <h3 class="text-base font-serif text-[var(--text-primary)] mt-1 mb-1">19th Century Kashmiri Ghazal Leaf</h3>
          <p class="text-xs text-[var(--text-secondary)] max-w-md mx-auto leading-relaxed">
            Condition: Water fading on lower margin. Year stamp appears as "18--".
          </p>
        </div>

        <div class="space-y-3 mb-6">
          <div class="a2-opt p-4 bg-white border border-[var(--grid-border)] cursor-pointer hover:border-[var(--accent-gold)] transition shadow-xs" data-action="FLAG_CARE">
            <div class="text-xs font-semibold text-[var(--text-primary)]">Place in acid-free envelope with notice: "Year Estimated, Needs Conservator Review"</div>
            <div class="text-[11px] text-[var(--text-secondary)] mt-1">Safeguards the paper and alerts archival specialists to inspect under magnification.</div>
          </div>

          <div class="a2-opt p-4 bg-white border border-[var(--grid-border)] cursor-pointer hover:border-[var(--accent-gold)] transition shadow-xs" data-action="ESTIMATE">
            <div class="text-xs font-semibold text-[var(--text-primary)]">Record as "Circa 1850" based on typical script styling</div>
            <div class="text-[11px] text-[var(--text-secondary)] mt-1">Assigns a working approximation so the folio enters the active catalog immediately.</div>
          </div>

          <div class="a2-opt p-4 bg-white border border-[var(--grid-border)] cursor-pointer hover:border-[var(--accent-gold)] transition shadow-xs" data-action="HOLD">
            <div class="text-xs font-semibold text-[var(--text-primary)]">Hold in the pending vault until historical donor provenance is confirmed</div>
            <div class="text-[11px] text-[var(--text-secondary)] mt-1">Waits for complete documentation before placing into public exhibition shelves.</div>
          </div>
        </div>

        <div class="flex justify-end">
          <button id="a2ConfirmBtn" disabled class="px-7 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] disabled:opacity-40 transition shadow-sm">
            Confirm Conservation Choice &rarr;
          </button>
        </div>
      </div>
    `;

    const btn = document.getElementById('a2ConfirmBtn');
    app.querySelectorAll('.a2-opt').forEach(opt => {
      opt.addEventListener('click', () => {
        app.querySelectorAll('.a2-opt').forEach(o => o.classList.remove('border-[var(--accent-gold)]', 'bg-amber-50/40'));
        opt.classList.add('border-[var(--accent-gold)]', 'bg-amber-50/40');
        chosenAction = opt.getAttribute('data-action');
        if (btn) btn.disabled = false;
      });
    });

    btn?.addEventListener('click', () => {
      logEvent('exception_resolved', { action: chosenAction });
      onComplete({
        mini_game: 'A2',
        observations_count: 1,
        chosen_action: chosenAction
      });
    });
  }

  render();
}

// --------------------------------------------------------------------------
// A3: The Exhibition Ledger
// --------------------------------------------------------------------------
function runA3QualityControl(app, renderHeader, logEvent, onComplete) {
  let inTutorial = true;
  const cards = [
    { id: 'Q1', text: 'Poet: Habba Khatoon | Era: 16th Century | Language: Kashmiri', hasError: false },
    { id: 'Q2', text: 'Artwork: Walnut Wood Plaque | Weight: 450 Kilograms (Expected: 450 Grams)', hasError: true },
    { id: 'Q3', text: 'Notice Date: February 31st, 2026 | Location: Hall A', hasError: true }
  ];

  function render() {
    if (inTutorial) {
      app.innerHTML = `
        <div>
          ${renderHeader('Part 3: The Exhibition Ledger', 'Reviewing exhibition cards for printing accuracy.')}
          ${renderTutorialCard({
            icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path></svg>`,
            goal: 'Proofread exhibition display cards and check any that contain typographical errors.',
            steps: [
              'Read through each exhibition placard text line.',
              'Check the box next to cards that contain obvious unit or calendar errors.',
              'Click Approve & Finish to verify the ledger.'
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
        ${renderHeader('Part 3: The Exhibition Ledger', 'Proofread the 3 label cards before final printing. Check any card containing an error.')}

        <div class="space-y-4 mb-6">
          ${cards.map((c, idx) => `
            <label class="flex items-start gap-3.5 p-4 bg-white border border-[var(--grid-border)] cursor-pointer hover:border-[var(--accent-gold)] transition shadow-xs">
              <input type="checkbox" id="check_${c.id}" class="mt-1 accent-[#bd6f5d] w-4 h-4">
              <div>
                <div class="text-xs font-semibold text-[var(--text-primary)]">Placard ${idx + 1}</div>
                <div class="text-xs text-[var(--text-secondary)] font-mono mt-1">${c.text}</div>
              </div>
            </label>
          `).join('')}
        </div>

        <div class="flex justify-end">
          <button id="a3SubmitBtn" class="px-7 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition shadow-sm">
            Approve & Finish &rarr;
          </button>
        </div>
      </div>
    `;

    document.getElementById('a3SubmitBtn')?.addEventListener('click', () => {
      let correctlySpotted = 0;
      cards.forEach(c => {
        const isChecked = document.getElementById(`check_${c.id}`)?.checked || false;
        if (isChecked === c.hasError) correctlySpotted++;
      });

      const accuracy = correctlySpotted / cards.length;
      logEvent('quality_check_completed', { accuracy });
      onComplete({
        mini_game: 'A3',
        observations_count: cards.length,
        accuracy
      });
    });
  }

  render();
}

