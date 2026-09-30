/* ==========================================================================
   ALFAAZ RECRUIT — WORLD 2: THE ARCHIVE (CONSCIENTIOUSNESS)
   Mini-games: A1 (Item Sorting), A2 (Care for Damaged Item), A3 (Quality Check)
   ========================================================================== */

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
// A1: Item Sorting
// --------------------------------------------------------------------------
function runA1Classification(app, renderHeader, logEvent, onComplete) {
  const documents = [
    { id: 'ITEM-1', title: 'Handwritten Ghazal Manuscript (1842)', tags: ['Poetry', 'Parchment', 'Ink'], targetCategory: 'Books & Poetry' },
    { id: 'ITEM-2', title: 'Carved Wooden Printing Block', tags: ['Object', 'Craft Tool', 'Walnut Wood'], targetCategory: 'Art Objects' },
    { id: 'ITEM-3', title: 'Lal Ded Verse Translations', tags: ['Poetry Book', 'Kashmiri', 'Paper'], targetCategory: 'Books & Poetry' },
    { id: 'ITEM-4', title: 'Silver Thread Embroidery Sample', tags: ['Fabric', 'Silk & Metal', 'Decorative'], targetCategory: 'Art Objects' },
    { id: 'ITEM-5', title: '1924 Exhibition Visitor Guestbook', tags: ['Official Record', 'Signatures', 'Archive'], targetCategory: 'Letters & Records' },
    { id: 'ITEM-6', title: 'Letter from Founder on Art Care', tags: ['Letter', 'Preservation Guide', 'Archive'], targetCategory: 'Letters & Records' }
  ];

  let currentDocIdx = 0;
  let correctCount = 0;
  let guideOpened = false;

  function render() {
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
      <div>
        ${renderHeader('Task 1: Archiving Items', 'Place each historical item into the correct shelf.')}

        <div class="flex justify-between items-center mb-4">
          <span class="text-xs text-[var(--text-secondary)] font-medium">Item ${currentDocIdx + 1} of ${documents.length}</span>
          <button id="guideBtn" class="text-xs text-[var(--accent-gold)] border border-[var(--accent-gold)]/40 px-3 py-1 hover:bg-amber-50 transition">
            &#128214; Shelf Guide
          </button>
        </div>

        <div id="guideModal" class="hidden p-4 mb-4 bg-amber-50/70 border border-[var(--accent-gold)]/30 text-xs text-[var(--text-primary)] space-y-1">
          <div>• <strong>1. Books & Poetry:</strong> Handwritten manuscripts, poetry books, written verse folios.</div>
          <div>• <strong>2. Art Objects:</strong> Wooden blocks, textile fragments, carved crafts, copper tools.</div>
          <div>• <strong>3. Letters & Records:</strong> Guestbooks, official letters, event rosters, receipts.</div>
        </div>

        <div class="p-6 bg-[#faf8f5] border border-[var(--grid-border)] mb-6 text-center shadow-sm">
          <span class="text-[10px] tracking-widest text-[var(--text-secondary)] uppercase font-mono">${doc.id}</span>
          <h3 class="text-lg font-serif text-[var(--text-primary)] font-medium mt-1 mb-3">${doc.title}</h3>
          <div class="flex justify-center gap-2">
            ${doc.tags.map(t => `<span class="px-2.5 py-0.5 bg-white border border-[var(--grid-border)] text-xs text-[var(--text-secondary)]">${t}</span>`).join('')}
          </div>
        </div>

        <div class="grid grid-cols-3 gap-4">
          <button class="cat-btn p-4 bg-white border border-[var(--grid-border)] text-xs font-semibold uppercase tracking-wider hover:border-[var(--accent-gold)] hover:bg-amber-50/40 transition text-center" data-cat="Books & Poetry">
            1. Books & Poetry
          </button>
          <button class="cat-btn p-4 bg-white border border-[var(--grid-border)] text-xs font-semibold uppercase tracking-wider hover:border-[var(--accent-gold)] hover:bg-amber-50/40 transition text-center" data-cat="Art Objects">
            2. Art Objects
          </button>
          <button class="cat-btn p-4 bg-white border border-[var(--grid-border)] text-xs font-semibold uppercase tracking-wider hover:border-[var(--accent-gold)] hover:bg-amber-50/40 transition text-center" data-cat="Letters & Records">
            3. Letters & Records
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
// A2: Care for Damaged Item
// --------------------------------------------------------------------------
function runA2ExceptionHandling(app, renderHeader, logEvent, onComplete) {
  let chosenAction = null;

  app.innerHTML = `
    <div>
      ${renderHeader('Task 2: Damaged Item Care', 'An old poem folio has faint water spots and the year stamp is partly blurred. How would you record it?')}

      <div class="p-6 bg-[#faf8f5] border border-[var(--grid-border)] mb-6 text-center">
        <span class="text-[10px] tracking-widest text-[#bd6f5d] uppercase font-semibold">Special Inspection</span>
        <h3 class="text-base font-serif text-[var(--text-primary)] mt-1 mb-2">19th Century Kashmiri Ghazal Leaf</h3>
        <p class="text-xs text-[var(--text-secondary)] max-w-md mx-auto">
          Condition: Light water fading on the lower corner. Year is smudged as "18--".
        </p>
      </div>

      <div class="space-y-3 mb-6">
        <div class="a2-opt p-4 bg-white border border-[var(--grid-border)] cursor-pointer hover:border-[var(--accent-gold)] transition" data-action="FLAG_CARE">
          <div class="text-xs font-semibold text-[var(--text-primary)]">Place in protective envelope and mark: "Year Estimated, Needs Conservator Review"</div>
          <div class="text-[11px] text-[var(--text-secondary)] mt-1">Protects the item and alerts senior archivists to examine with magnifying tools.</div>
        </div>

        <div class="a2-opt p-4 bg-white border border-[var(--grid-border)] cursor-pointer hover:border-[var(--accent-gold)] transition" data-action="ESTIMATE">
          <div class="text-xs font-semibold text-[var(--text-primary)]">Record as "Circa 1850" based on similar handwriting styles</div>
          <div class="text-[11px] text-[var(--text-secondary)] mt-1">Assigns a working estimate so it can be cataloged quickly.</div>
        </div>

        <div class="a2-opt p-4 bg-white border border-[var(--grid-border)] cursor-pointer hover:border-[var(--accent-gold)] transition" data-action="HOLD">
          <div class="text-xs font-semibold text-[var(--text-primary)]">Set aside in the pending box until the original donor is contacted</div>
          <div class="text-[11px] text-[var(--text-secondary)] mt-1">Waits for complete confirmation before adding to the collection.</div>
        </div>
      </div>

      <div class="flex justify-end">
        <button id="a2ConfirmBtn" disabled class="px-6 py-2.5 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] disabled:opacity-40 transition">
          Confirm Action &rarr;
        </button>
      </div>
    </div>
  `;

  const btn = document.getElementById('a2ConfirmBtn');
  app.querySelectorAll('.a2-opt').forEach(opt => {
    opt.addEventListener('click', () => {
      app.querySelectorAll('.a2-opt').forEach(o => o.classList.remove('border-[var(--accent-gold)]', 'bg-amber-50/30'));
      opt.classList.add('border-[var(--accent-gold)]', 'bg-amber-50/30');
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

// --------------------------------------------------------------------------
// A3: Quality Check
// --------------------------------------------------------------------------
function runA3QualityControl(app, renderHeader, logEvent, onComplete) {
  const cards = [
    { id: 'Q1', text: 'Poet: Habba Khatoon | Era: 16th Century | Language: Kashmiri', hasError: false },
    { id: 'Q2', text: 'Artwork: Walnut Wood Plaque | Weight: 450 Kilograms (Expected: 450 Grams)', hasError: true },
    { id: 'Q3', text: 'Notice Date: February 31st, 2026 | Location: Hall A', hasError: true }
  ];

  let checks = {};

  app.innerHTML = `
    <div>
      ${renderHeader('Task 3: Catalog Proofreading', 'Check the cards below before printing. Select any card that contains an error.')}

      <div class="space-y-4 mb-6">
        ${cards.map((c, idx) => `
          <label class="flex items-start gap-3 p-4 bg-white border border-[var(--grid-border)] cursor-pointer hover:border-[var(--accent-gold)] transition">
            <input type="checkbox" id="check_${c.id}" class="mt-1 accent-[#bd6f5d]">
            <div>
              <div class="text-xs font-semibold text-[var(--text-primary)]">Label Card ${idx + 1}</div>
              <div class="text-xs text-[var(--text-secondary)] font-mono mt-1">${c.text}</div>
            </div>
          </label>
        `).join('')}
      </div>

      <div class="flex justify-end">
        <button id="a3SubmitBtn" class="px-6 py-2.5 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition">
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
