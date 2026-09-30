/* ==========================================================================
   ALFAAZ RECRUIT — WORLD 2: THE ARCHIVE (CONSCIENTIOUSNESS)
   Mini-games: A1 (Classification), A2 (Exception Handling), A3 (Quality Control)
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
// A1: Classification
// --------------------------------------------------------------------------
function runA1Classification(app, renderHeader, logEvent, onComplete) {
  const documents = [
    { id: 'DOC-101', title: 'Calligraphic Ghazal Folio (1842)', tags: ['Manuscript', 'Ink on Parchment', '19th Century'], targetCategory: 'Manuscripts' },
    { id: 'DOC-102', title: 'Copper Engraved Astrolabe Plate', tags: ['Object', 'Metalwork', 'Classical'], targetCategory: 'Artifacts' },
    { id: 'DOC-103', title: 'Lal Ded Vakhs Translation Ledger', tags: ['Text', 'Poetry Commentary', 'Kashmiri'], targetCategory: 'Manuscripts' },
    { id: 'DOC-104', title: 'Silver Zari Textile Fragment', tags: ['Weaving', 'Silk & Metal', 'Decorative'], targetCategory: 'Artifacts' },
    { id: 'DOC-105', title: '1920 Exhibition Registration Roster', tags: ['Administrative', 'Official Record', 'Modern'], targetCategory: 'Records' },
    { id: 'DOC-106', title: 'Curatorial Letter on Paper Conservation', tags: ['Correspondence', 'Preservation', 'Archive'], targetCategory: 'Records' }
  ];

  let currentDocIdx = 0;
  let correctCount = 0;
  let ruleGuideOpens = 0;
  let ruleGuideTimeMs = 0;
  let docStartTime = performance.now();
  let ruleOpenTime = null;

  function render() {
    if (currentDocIdx >= documents.length) {
      const accuracy = correctCount / documents.length;
      onComplete({
        mini_game: 'A1',
        observations_count: documents.length,
        accuracy: accuracy,
        rule_guide_time_ms: ruleGuideTimeMs
      });
      return;
    }

    const doc = documents[currentDocIdx];
    docStartTime = performance.now();

    app.innerHTML = `
      <div>
        ${renderHeader('A1: Document Classification', 'Sort cultural items into designated archival vaults according to preservation criteria.')}

        <div class="flex justify-between items-center mb-4">
          <span class="text-xs text-[var(--text-secondary)] uppercase tracking-wider">Document ${currentDocIdx + 1} of ${documents.length}</span>
          <button id="ruleGuideBtn" class="text-xs text-[var(--accent-gold)] border border-[var(--accent-gold)]/40 px-3 py-1 hover:bg-amber-50 transition">
            <i data-lucide="book-open" class="w-3.5 h-3.5 inline mr-1"></i> View Archival Rubric
          </button>
        </div>

        <div id="ruleGuideModal" class="hidden p-4 mb-4 bg-amber-50/60 border border-[var(--accent-gold)]/30 text-xs text-[var(--text-primary)] space-y-1.5">
          <div class="font-semibold uppercase tracking-wider text-[var(--accent-gold)]">Archival Sorting Rubric:</div>
          <div>• <strong>Manuscripts:</strong> Handwritten poetry folios, literary commentary, vakhs, calligraphy.</div>
          <div>• <strong>Artifacts:</strong> Metalwork, decorative textiles, physical implements, copper plates.</div>
          <div>• <strong>Records:</strong> Official administrative rosters, letters, preservation logs, institutional documentation.</div>
        </div>

        <div class="p-6 bg-[#faf8f5] border border-[var(--grid-border)] mb-6 text-center">
          <span class="text-[10px] tracking-widest text-[var(--text-secondary)] uppercase">${doc.id}</span>
          <h3 class="text-xl font-serif text-[var(--text-primary)] mt-1 mb-3">${doc.title}</h3>
          <div class="flex justify-center gap-2">
            ${doc.tags.map(t => `<span class="px-2.5 py-0.5 bg-white border border-[var(--grid-border)] text-xs text-[var(--text-secondary)]">${t}</span>`).join('')}
          </div>
        </div>

        <div class="grid grid-cols-3 gap-4">
          <button class="cat-btn p-4 bg-white border border-[var(--grid-border)] text-xs uppercase tracking-wider hover:border-[var(--accent-gold)] hover:bg-amber-50/30 transition text-center font-medium" data-cat="Manuscripts">
            1. Manuscripts
          </button>
          <button class="cat-btn p-4 bg-white border border-[var(--grid-border)] text-xs uppercase tracking-wider hover:border-[var(--accent-gold)] hover:bg-amber-50/30 transition text-center font-medium" data-cat="Artifacts">
            2. Artifacts
          </button>
          <button class="cat-btn p-4 bg-white border border-[var(--grid-border)] text-xs uppercase tracking-wider hover:border-[var(--accent-gold)] hover:bg-amber-50/30 transition text-center font-medium" data-cat="Records">
            3. Records
          </button>
        </div>
      </div>
    `;

    logEvent('document_presented', { doc_id: doc.id, index: currentDocIdx });

    const ruleBtn = document.getElementById('ruleGuideBtn');
    const ruleModal = document.getElementById('ruleGuideModal');

    ruleBtn?.addEventListener('click', () => {
      const isHidden = ruleModal?.classList.contains('hidden');
      if (isHidden) {
        ruleModal?.classList.remove('hidden');
        ruleOpenTime = performance.now();
        ruleGuideOpens++;
        logEvent('rule_guide_viewed', { doc_id: doc.id });
      } else {
        ruleModal?.classList.add('hidden');
        if (ruleOpenTime) {
          ruleGuideTimeMs += (performance.now() - ruleOpenTime);
          ruleOpenTime = null;
        }
      }
    });

    app.querySelectorAll('.cat-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const selected = btn.getAttribute('data-cat');
        const isCorrect = selected === doc.targetCategory;
        if (isCorrect) correctCount++;

        logEvent('document_filed', {
          doc_id: doc.id,
          selected_category: selected,
          target_category: doc.targetCategory,
          is_correct: isCorrect,
          dwell_ms: performance.now() - docStartTime
        });

        currentDocIdx++;
        render();
      });
    });
  }

  render();
}

// --------------------------------------------------------------------------
// A2: Exception Handling
// --------------------------------------------------------------------------
function runA2ExceptionHandling(app, renderHeader, logEvent, onComplete) {
  const edgeCases = [
    {
      id: 'EXP-201',
      title: 'Bilingual Poetry Fragment with Mixed Binding',
      tags: ['Damaged Paper', 'Dual Period Inscription'],
      isException: true,
      description: 'Contains 17th century Persian script overlaid on 19th century binding. Exceeds standard single-vault criteria.'
    },
    {
      id: 'EXP-202',
      title: 'Standard Exhibition Catalog (1998)',
      tags: ['Printed Book', 'Single Subject'],
      isException: false,
      description: 'Standard publication catalog in pristine condition with complete metadata.'
    },
    {
      id: 'EXP-203',
      title: 'Severely Oxidized Metal Seal with Illegible Seal Script',
      tags: ['Physical Seal', 'Fragile', 'Verification Required'],
      isException: true,
      description: 'Requires metallurgical assessment before standard drawer assignment.'
    },
    {
      id: 'EXP-204',
      title: 'Curatorial Diary Notebook (2015)',
      tags: ['Manuscript', 'Modern Archive'],
      isException: false,
      description: 'Complete and verified curatorial notes from the Alfaaz inaugural salon.'
    }
  ];

  let currentIdx = 0;
  let correctDecisions = 0;

  function render() {
    if (currentIdx >= edgeCases.length) {
      const precision = correctDecisions / edgeCases.length;
      onComplete({
        mini_game: 'A2',
        observations_count: edgeCases.length,
        precision: precision
      });
      return;
    }

    const item = edgeCases[currentIdx];

    app.innerHTML = `
      <div>
        ${renderHeader('A2: Exception Protocol', 'Identify and quarantine records with protocol anomalies or conflicting criteria.')}

        <div class="text-xs text-[var(--text-secondary)] uppercase tracking-wider mb-4">
          Item ${currentIdx + 1} of ${edgeCases.length}
        </div>

        <div class="p-6 bg-[#faf8f5] border border-[var(--grid-border)] mb-6">
          <div class="flex justify-between items-start mb-2">
            <div>
              <span class="text-[10px] tracking-widest text-[var(--text-secondary)] uppercase">${item.id}</span>
              <h3 class="text-xl font-serif text-[var(--text-primary)] mt-0.5">${item.title}</h3>
            </div>
          </div>
          <div class="flex gap-2 my-3">
            ${item.tags.map(t => `<span class="px-2 py-0.5 bg-white border border-[var(--grid-border)] text-xs text-[var(--text-secondary)]">${t}</span>`).join('')}
          </div>
          <p class="text-xs text-[var(--text-primary)] leading-relaxed mt-2 border-t border-[var(--grid-border)] pt-2">
            <strong>Condition Notes:</strong> ${item.description}
          </p>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <button id="standardFileBtn" class="p-4 bg-white border border-[var(--grid-border)] text-xs uppercase tracking-wider hover:border-[var(--accent-gold)] hover:bg-amber-50/30 transition text-center font-medium">
            File into Standard Catalog
          </button>
          <button id="flagExceptionBtn" class="p-4 bg-white border border-amber-300 text-xs uppercase tracking-wider text-[#bd6f5d] hover:bg-amber-50 transition text-center font-medium">
            <i data-lucide="flag" class="w-3.5 h-3.5 inline mr-1"></i> Quarantine as Protocol Exception
          </button>
        </div>
      </div>
    `;

    logEvent('exception_presented', { item_id: item.id });

    document.getElementById('standardFileBtn')?.addEventListener('click', () => {
      const isCorrect = !item.isException;
      if (isCorrect) correctDecisions++;
      logEvent('decision_logged', { item_id: item.id, action: 'standard_file', is_correct: isCorrect });
      currentIdx++;
      render();
    });

    document.getElementById('flagExceptionBtn')?.addEventListener('click', () => {
      const isCorrect = item.isException;
      if (isCorrect) correctDecisions++;
      logEvent('decision_logged', { item_id: item.id, action: 'flag_exception', is_correct: isCorrect });
      currentIdx++;
      render();
    });
  }

  render();
}

// --------------------------------------------------------------------------
// A3: Quality Control
// --------------------------------------------------------------------------
function runA3QualityControl(app, renderHeader, logEvent, onComplete) {
  const ledger = [
    { id: 'REC-01', title: 'Lalla Vakhs (14th C)', category: 'Manuscripts', hasError: false },
    { id: 'REC-02', title: 'Copper Tray Engraving', category: 'Manuscripts', hasError: true, correctCat: 'Artifacts' }, // Error: should be Artifacts
    { id: 'REC-03', title: 'Kashmir Shawl Pattern', category: 'Artifacts', hasError: false },
    { id: 'REC-04', title: 'Curatorial Roster 2024', category: 'Records', hasError: false },
    { id: 'REC-05', title: 'Habba Khatoon Folio', category: 'Records', hasError: true, correctCat: 'Manuscripts' }, // Error: should be Manuscripts
    { id: 'REC-06', title: 'Clay Terracotta Vessel', category: 'Artifacts', hasError: false }
  ];

  let correctedMap = {};

  function render() {
    const rowsHtml = ledger.map(item => {
      const isEdited = correctedMap[item.id] !== undefined;
      const displayCat = isEdited ? correctedMap[item.id] : item.category;

      return `
        <tr class="border-b border-[var(--grid-border)] hover:bg-[#faf8f5]">
          <td class="p-3 font-mono text-xs text-[var(--text-secondary)]">${item.id}</td>
          <td class="p-3 font-serif text-sm text-[var(--text-primary)]">${item.title}</td>
          <td class="p-3 text-xs">
            <span class="px-2 py-0.5 bg-white border border-[var(--grid-border)] ${isEdited ? 'border-emerald-400 text-emerald-800' : 'text-[var(--text-secondary)]'}">
              ${displayCat} ${isEdited ? '&#10003;' : ''}
            </span>
          </td>
          <td class="p-3 text-right">
            <select class="cat-select text-xs p-1 bg-white border border-[var(--grid-border)] focus:outline-none" data-id="${item.id}">
              <option value="">Edit Tag...</option>
              <option value="Manuscripts">Manuscripts</option>
              <option value="Artifacts">Artifacts</option>
              <option value="Records">Records</option>
            </select>
          </td>
        </tr>
      `;
    }).join('');

    app.innerHTML = `
      <div>
        ${renderHeader('A3: Quality Control & Audit', 'Verify catalog records against standard criteria and correct any discrepancies before final archival seal.')}

        <div class="border border-[var(--grid-border)] bg-white overflow-hidden mb-6">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-[#faf8f5] border-b border-[var(--grid-border)] text-[10px] uppercase tracking-wider text-[var(--text-secondary)]">
                <th class="p-3">ID</th>
                <th class="p-3">Title</th>
                <th class="p-3">Current Vault</th>
                <th class="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              ${rowsHtml}
            </tbody>
          </table>
        </div>

        <div class="flex justify-between items-center pt-2">
          <span class="text-xs text-[var(--text-secondary)]">Take your time to review. You may approve as is or submit corrections.</span>
          <button id="finalizeLedgerBtn" class="px-6 py-2 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition">
            Finalize & Seal Archive &rarr;
          </button>
        </div>
      </div>
    `;

    logEvent('ledger_opened', { total_rows: ledger.length });

    app.querySelectorAll('.cat-select').forEach(sel => {
      sel.addEventListener('change', (e) => {
        const id = sel.getAttribute('data-id');
        const val = sel.value;
        if (val) {
          correctedMap[id] = val;
          logEvent('correction_applied', { row_id: id, new_category: val });
          render();
        }
      });
    });

    document.getElementById('finalizeLedgerBtn')?.addEventListener('click', () => {
      let trueErrorsDetected = 0;
      let falseAlarms = 0;

      ledger.forEach(item => {
        if (item.hasError) {
          if (correctedMap[item.id] === item.correctCat) {
            trueErrorsDetected++;
          }
        } else {
          if (correctedMap[item.id] !== undefined && correctedMap[item.id] !== item.category) {
            falseAlarms++;
          }
        }
      });

      const sensitivity = trueErrorsDetected / 2.0; // 2 true errors
      const falseAlarmRate = falseAlarms / 4.0; // 4 clean records

      logEvent('ledger_finalized', {
        true_errors_detected: trueErrorsDetected,
        false_alarms: falseAlarms,
        sensitivity: sensitivity,
        false_alarm_rate: falseAlarmRate
      });

      onComplete({
        mini_game: 'A3',
        observations_count: 1,
        sensitivity: sensitivity,
        false_alarm_rate: falseAlarmRate
      });
    });
  }

  render();
}
