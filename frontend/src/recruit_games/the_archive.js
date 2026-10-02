/* ==========================================================================
   ALFAAZ RECRUIT — WORLD 2: THE LIVING ARCHIVE (دستاویز)
   Mini-games: A1 (The Manuscript Folios), A2 (The Fragile Leaf), A3 (The Exhibition Ledger)
   Adheres to Design Freeze v1 + Addendum v1.1.
   Emits raw behavioral telemetry only (no client-authored scores or correctness).
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
// A1: The Manuscript Folios (5 rule-governed classification items)
// --------------------------------------------------------------------------
function runA1Classification(app, renderHeader, logEvent, onComplete) {
  let inTutorial = true;
  let currentDocIdx = 0;
  let guideOpened = false;
  let docStartTime = 0;
  let lastInputModality = 'mouse';

  const documents = [
    {
      id: 'DOC_01',
      title: '19th-Century Calligraphic Diwan (1842)',
      rule_prompt: 'Filing Rule: Classify by Period',
      tags: ['Year: 1842', '19th Century', 'Parchment', 'Ghazal Verse']
    },
    {
      id: 'DOC_02',
      title: 'Lyrical Ghazal Couplets Manuscript',
      rule_prompt: 'Filing Rule: Classify by Genre',
      tags: ['Genre: Poetry', 'Lyrical Verse', 'Urdu', 'Paper Folio']
    },
    {
      id: 'DOC_03',
      title: 'Early 20th-Century Exhibition Register (1924)',
      rule_prompt: 'Filing Rule: Classify by Period',
      tags: ['Year: 1924', '20th Century', 'Official Register', 'Signatures']
    },
    {
      id: 'DOC_04',
      title: 'Lal Ded Vakh Verse Translations in Kashmiri',
      rule_prompt: 'Filing Rule: Classify by Language',
      tags: ['Language: Kashmiri', 'Vakh Verse', 'Vernacular Poetry']
    },
    {
      id: 'DOC_05',
      title: 'Historical Tarikh Chronicle of Kashmir Artists',
      rule_prompt: 'Filing Rule: Classify by Genre',
      tags: ['Genre: Chronicle', 'Tarikh History', 'Biographical Record']
    },
    {
      id: 'DOC_06',
      title: '19th-Century Calligraphic Diwan Supplement (1876)',
      rule_prompt: 'Filing Rule: Classify by Period',
      tags: ['Year: 1876', '19th Century', 'Manuscript Diwan', 'Illuminated Border']
    },
    {
      id: 'DOC_07',
      title: 'Mathnawi Rhymed Couplets Anthology',
      rule_prompt: 'Filing Rule: Classify by Genre',
      tags: ['Genre: Poetry', 'Mathnawi Verse', 'Poetic Meters']
    },
    {
      id: 'DOC_08',
      title: 'Mid-20th-Century Cultural Congress Charter (1948)',
      rule_prompt: 'Filing Rule: Classify by Period',
      tags: ['Year: 1948', '20th Century', 'Official Charter', 'Archival Record']
    },
    {
      id: 'DOC_09',
      title: 'Waqiat-i-Kashmir Historical Annals',
      rule_prompt: 'Filing Rule: Classify by Genre',
      tags: ['Genre: Chronicle', 'Historical Narrative', 'Atelier Register']
    },
    {
      id: 'DOC_10',
      title: 'Mahmud Gami Kashmiri Shireen-Khusraw Folio',
      rule_prompt: 'Filing Rule: Classify by Language',
      tags: ['Language: Kashmiri', 'Vernacular Verse', 'Sufi Couplets']
    },
    {
      id: 'DOC_11',
      title: 'Late 19th-Century Silk Route Revenue Survey (1885)',
      rule_prompt: 'Filing Rule: Classify by Period',
      tags: ['Year: 1885', '19th Century', 'Trade Ledger', 'Accession Seals']
    },
    {
      id: 'DOC_12',
      title: 'Rasul Mir Romantic Ghazal Folio',
      rule_prompt: 'Filing Rule: Classify by Genre',
      tags: ['Genre: Poetry', 'Lyric Ghazal', 'Calligraphic Rubrication']
    }
  ];

  const folders = [
    { id: '19th_century', label: '19th Century Shelf', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { id: '20th_century', label: '20th Century Shelf', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
    { id: 'poetry', label: 'Poetry & Verses Shelf', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
    { id: 'chronicle', label: 'Chronicle Shelf', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
    { id: 'kashmiri', label: 'Kashmiri Vernacular Shelf', icon: 'M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129' }
  ];

  function render() {
    if (inTutorial) {
      app.innerHTML = `
        <div>
          ${renderHeader('Part 1: The Manuscript Folios', 'Preserving and organizing historical folios and objects across 12 rule-based classification trials.')}
          ${renderTutorialCard({
            icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>`,
            goal: 'Organize each historical item into its designated archive shelf based on archival classification rules.',
            steps: [
              'Examine the item title and descriptor tags on each folio card.',
              'Click the shelf guide button at any time to verify filing rules.',
              'Select the appropriate shelf destination to file the folio.'
            ]
          })}
        </div>
      `;
      document.getElementById('startActivityBtn')?.addEventListener('click', () => {
        inTutorial = false;
        currentDocIdx = 0;
        docStartTime = performance.now();
        render();
      });
      return;
    }

    if (currentDocIdx >= documents.length) {
      onComplete({
        mini_game: 'A1',
        observations_count: documents.length
      });
      return;
    }

    const doc = documents[currentDocIdx];
    docStartTime = performance.now();

    app.innerHTML = `
      <div class="animate-fadeIn">
        <div class="flex justify-between items-center mb-2">
          ${renderHeader('Part 1: The Manuscript Folios', 'Select the correct shelf for each historical archive artifact.')}
          <span class="text-xs uppercase tracking-wider text-[var(--accent-gold)] font-mono font-medium">Folio ${currentDocIdx + 1} of ${documents.length}</span>
        </div>

        <div class="flex justify-between items-center mb-4">
          <span class="text-xs text-[var(--text-secondary)] font-medium flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full bg-[var(--accent-gold)] inline-block"></span>
            ${doc.rule_prompt}
          </span>
          <button id="guideBtn" class="text-xs text-[var(--accent-gold)] border border-[var(--accent-gold)]/40 px-3 py-1 hover:bg-amber-50 transition flex items-center gap-1.5 rounded-xs" tabindex="0">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            Shelf Guide
          </button>
        </div>

        <div id="guideModal" class="${guideOpened ? '' : 'hidden'} p-4 mb-4 bg-amber-50/80 border border-[var(--accent-gold)]/40 text-xs text-[var(--text-primary)] space-y-1 shadow-xs rounded-xs">
          <div>• <strong>Period Rule:</strong> Classify by creation century (19th Century vs 20th Century).</div>
          <div>• <strong>Genre Rule:</strong> Classify by literary format (Poetry vs Historical Chronicle).</div>
          <div>• <strong>Language Rule:</strong> Classify by primary linguistic medium (Kashmiri Vernacular).</div>
        </div>

        <div class="p-6 bg-[#faf8f5] border border-[var(--grid-border)] mb-6 text-center shadow-xs rounded-xs">
          <span class="text-[10px] tracking-widest text-[var(--text-secondary)] uppercase font-mono">${doc.id}</span>
          <h3 class="text-lg font-serif text-[var(--text-primary)] font-medium mt-1 mb-3">${doc.title}</h3>
          <div class="flex justify-center flex-wrap gap-2">
            ${doc.tags.map(t => `<span class="px-2.5 py-1 bg-white border border-[var(--grid-border)] text-xs text-[var(--text-secondary)] rounded-xs">${t}</span>`).join('')}
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          ${folders.map(f => `
            <button type="button" class="folder-btn p-4 bg-white border border-[var(--grid-border)] text-xs font-semibold uppercase tracking-wider hover:border-[var(--accent-gold)] hover:bg-amber-50/40 transition text-center shadow-xs flex flex-col items-center gap-1.5 rounded-xs" data-folder="${f.id}" tabindex="0">
              <svg class="w-4 h-4 text-[var(--accent-gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${f.icon}"></path></svg>
              ${f.label}
            </button>
          `).join('')}
        </div>
      </div>
    `;

    logEvent('item_presented', {
      trial_index: currentDocIdx,
      stimulus_id: doc.id,
      task_def_version: '1.0'
    });

    document.getElementById('guideBtn')?.addEventListener('click', () => {
      const modal = document.getElementById('guideModal');
      guideOpened = !modal?.classList.contains('hidden');
      modal?.classList.toggle('hidden');
      guideOpened = !guideOpened;
      logEvent('guide_viewed', {
        trial_index: currentDocIdx,
        stimulus_id: doc.id,
        task_def_version: '1.0'
      });
    });

    app.querySelectorAll('.folder-btn').forEach(btn => {
      const handleSelect = (modality) => {
        lastInputModality = modality;
        const folder = btn.getAttribute('data-folder');
        const dwell = performance.now() - docStartTime;

        logEvent('item_sorted', {
          trial_index: currentDocIdx,
          stimulus_id: doc.id,
          choice: folder,
          dwell_ms: Math.round(dwell),
          input_modality: lastInputModality,
          task_def_version: '1.0'
        });

        currentDocIdx++;
        render();
      };

      btn.addEventListener('click', () => handleSelect('mouse'));
      btn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleSelect('keyboard');
        }
      });
    });
  }

  render();
}

// --------------------------------------------------------------------------
// A2: The Fragile Leaf (>= 3 genuine exception decisions)
// Conditions: true_exception, clean_control, true_exception
// --------------------------------------------------------------------------
function runA2ExceptionHandling(app, renderHeader, logEvent, onComplete) {
  let inTutorial = true;
  let currentTrial = 0;
  let chosenAction = null;
  let lastInputModality = 'mouse';

  const trials = [
    {
      stimulus_id: 'EXC_01',
      title: '19th-Century Kashmiri Ghazal Leaf with Water Wear',
      anomaly_description: 'Water fading on lower margin. The accession year stamp is blurred and appears as "18--".',
      type_note: 'Physical Damage & Indeterminate Year Stamp'
    },
    {
      stimulus_id: 'EXC_02',
      title: 'Pristine Persian Couplet Calligraphy (1890)',
      anomaly_description: 'Intact rag fiber paper, clear black carbon ink, and standard accession stamp intact. No physical blemishes.',
      type_note: 'Standard Folio Inspection'
    },
    {
      stimulus_id: 'EXC_03',
      title: 'Disbound Manuscript Folio with Pagination Jump',
      anomaly_description: 'Binding threads severed. Margin numbering skips from Folio 14 directly to Folio 19 with missing text catchword.',
      type_note: 'Structural Discrepancy & Missing Catchword'
    }
  ];

  const actions = [
    {
      id: 'flag_exception',
      title: 'Flag for Conservator Review',
      desc: 'Quarantine folio in acid-free protective sleeve and attach an anomaly notice for specialized review.',
      tag: 'Specialized Preservation Quarantine'
    },
    {
      id: 'file_standard',
      title: 'Standard Catalog Accession',
      desc: 'Accession the folio directly into the general catalog shelves under standard routine processing.',
      tag: 'Routine Shelf Accession'
    },
    {
      id: 'defer_review',
      title: 'Hold in Pending Vault',
      desc: 'Hold folio in pending intake storage without accessioning until provenance paperwork arrives.',
      tag: 'Intake Deferral'
    }
  ];

  function render() {
    if (inTutorial) {
      app.innerHTML = `
        <div>
          ${renderHeader('Part 2: The Fragile Leaf', 'Handling archival folios across 3 distinct accession decisions.')}
          ${renderTutorialCard({
            icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>`,
            goal: 'Evaluate the physical condition of 3 folios and decide whether to flag an exception, file standardly, or hold.',
            steps: [
              'Review the condition notes and physical examination summary for each folio.',
              'Identify whether an anomaly or damage requires specialized conservation.',
              'Select your archival handling recommendation across all 3 trials.'
            ]
          })}
        </div>
      `;
      document.getElementById('startActivityBtn')?.addEventListener('click', () => {
        inTutorial = false;
        currentTrial = 0;
        chosenAction = null;
        render();
      });
      return;
    }

    const t = trials[currentTrial];

    app.innerHTML = `
      <div class="animate-fadeIn">
        <div class="flex justify-between items-center mb-2">
          ${renderHeader('Part 2: The Fragile Leaf', 'Examine the folio condition and select your archival handling recommendation.')}
          <span class="text-xs uppercase tracking-wider text-[var(--accent-gold)] font-mono font-medium">Item ${currentTrial + 1} of 3</span>
        </div>

        <div class="p-6 bg-[#faf8f5] border border-[var(--grid-border)] mb-6 text-center shadow-xs rounded-xs">
          <div class="w-10 h-10 rounded-full bg-amber-100 border border-[var(--accent-gold)] flex items-center justify-center text-[var(--accent-gold)] mx-auto mb-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
          </div>
          <span class="text-[10px] tracking-widest text-[#bd6f5d] uppercase font-semibold font-mono">${t.stimulus_id} • ${t.type_note}</span>
          <h3 class="text-base font-serif text-[var(--text-primary)] mt-1 mb-1 font-medium">${t.title}</h3>
          <p class="text-xs text-[var(--text-secondary)] max-w-md mx-auto leading-relaxed mt-2">
            ${t.anomaly_description}
          </p>
        </div>

        <div class="space-y-3 mb-6">
          ${actions.map(a => `
            <div class="a2-opt p-4 bg-white border ${chosenAction === a.id ? 'border-[var(--accent-gold)] bg-amber-50/40 shadow-xs' : 'border-[var(--grid-border)]'} cursor-pointer hover:border-[var(--accent-gold)] transition shadow-xs rounded-xs" data-action="${a.id}" tabindex="0" role="button">
              <div class="flex justify-between items-start">
                <div class="text-xs font-semibold text-[var(--text-primary)]">${a.title}</div>
                <span class="text-[10px] font-mono text-[var(--accent-gold)] uppercase tracking-wider">${a.tag}</span>
              </div>
              <div class="text-[11px] text-[var(--text-secondary)] mt-1 leading-relaxed">${a.desc}</div>
            </div>
          `).join('')}
        </div>

        <div class="flex justify-end">
          <button id="a2ConfirmBtn" ${chosenAction ? '' : 'disabled'} class="px-7 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] disabled:opacity-40 transition shadow-sm rounded-xs">
            ${currentTrial < 2 ? 'Confirm Handling Decision &rarr;' : 'Finish Exception Evaluation &rarr;'}
          </button>
        </div>
      </div>
    `;

    logEvent('item_presented', {
      trial_index: currentTrial,
      stimulus_id: t.stimulus_id,
      task_def_version: '1.0'
    });

    const btn = document.getElementById('a2ConfirmBtn');

    app.querySelectorAll('.a2-opt').forEach(opt => {
      const handleSelect = (modality) => {
        lastInputModality = modality;
        chosenAction = opt.getAttribute('data-action');
        app.querySelectorAll('.a2-opt').forEach(o => {
          o.classList.remove('border-[var(--accent-gold)]', 'bg-amber-50/40', 'shadow-xs');
          o.classList.add('border-[var(--grid-border)]');
        });
        opt.classList.add('border-[var(--accent-gold)]', 'bg-amber-50/40', 'shadow-xs');
        opt.classList.remove('border-[var(--grid-border)]');
        if (btn) btn.disabled = false;
      };

      opt.addEventListener('click', () => handleSelect('mouse'));
      opt.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleSelect('keyboard');
        }
      });
    });

    btn?.addEventListener('click', () => {
      logEvent('decision_logged', {
        trial_index: currentTrial,
        stimulus_id: t.stimulus_id,
        action_id: chosenAction,
        input_modality: lastInputModality,
        task_def_version: '1.0'
      });

      if (currentTrial < 2) {
        currentTrial++;
        chosenAction = null;
        render();
      } else {
        onComplete({
          mini_game: 'A2',
          observations_count: 3
        });
      }
    });
  }

  render();
}

// --------------------------------------------------------------------------
// A3: The Exhibition Ledger (5 QC records: true-error & clean controls)
// Granular inspect / toggle / verify telemetry. Extractor remains quarantined.
// --------------------------------------------------------------------------
function runA3QualityControl(app, renderHeader, logEvent, onComplete) {
  let inTutorial = true;
  let flaggedRecords = new Set();
  let inspectedRecords = new Set();
  let lastInputModality = 'mouse';

  const records = [
    {
      id: 'REC_01',
      title: 'Placard 1: Habba Khatoon Folio',
      text: 'Poet: Habba Khatoon | Era: 16th Century | Birthplace: Chandhara (Recorded as: Chanhadra)',
      note: 'Folio Label Verification'
    },
    {
      id: 'REC_02',
      title: 'Placard 2: Carved Walnut Pen Box',
      text: 'Artifact: Carved Walnut Calligraphy Pen Box | Dimensions: 24 cm x 6 cm | Medium: Seasoned Walnut',
      note: 'Object Metadata Verification'
    },
    {
      id: 'REC_03',
      title: 'Placard 3: River Verse Excerpt',
      text: 'Verse Excerpt: "The river remembers the boatman\'s song" | Translator: [Not Specified / Blank]',
      note: 'Folio Label Verification'
    },
    {
      id: 'REC_04',
      title: 'Placard 4: Kashmiri Vakh Folio Leaf',
      text: 'Folio Leaf: Kashmiri Vakh Lyric Leaf | Script: Sharda & Persian | Accession: AR-1892',
      note: 'Manuscript Leaf Verification'
    },
    {
      id: 'REC_05',
      title: 'Placard 5: Exhibition Opening Notice',
      text: 'Exhibition Opening Reception: February 31st, 2026 | Location: Main Pavilion',
      note: 'Public Schedule Verification'
    },
    {
      id: 'REC_06',
      title: 'Placard 6: Hand-Forged Brass Book Clasp',
      text: 'Artifact: Hand-Forged Brass Bookbinding Clasp | Provenance: Srinagar Royal Atelier | Era: 1880',
      note: 'Hardware Object Verification'
    },
    {
      id: 'REC_07',
      title: 'Placard 7: Silk Sash Exhibition Label',
      text: 'Accession: AR-1904 | Medium: Silk & Silver Zari | Cataloger Notes: Discrepancy in accession serial numbering [Duplicate Entry]',
      note: 'Accession Number Verification'
    },
    {
      id: 'REC_08',
      title: 'Placard 8: Valley Calligraphers Guild Roll',
      text: 'Roll of Scribes: 14 Registered Master Scribes | Inscription Language: Persian Nasta\'liq | Status: Verified Complete',
      note: 'Guild Roll Verification'
    }
  ];

  function render() {
    if (inTutorial) {
      app.innerHTML = `
        <div>
          ${renderHeader('Part 3: The Exhibition Ledger', 'Reviewing 8 exhibition placards for typographical, factual, and omission discrepancies.')}
          ${renderTutorialCard({
            icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path></svg>`,
            goal: 'Carefully proofread all 8 display records. Flag only those with genuine discrepancies or factual errors.',
            steps: [
              'Examine each display record description in the ledger.',
              'Click or toggle the discrepancy flag on any record containing concrete errors.',
              'Clean records should remain unflagged.',
              'Verify and finalize the exhibition ledger.'
            ]
          })}
        </div>
      `;
      document.getElementById('startActivityBtn')?.addEventListener('click', () => {
        inTutorial = false;
        flaggedRecords = new Set();
        inspectedRecords = new Set();
        render();
      });
      return;
    }

    app.innerHTML = `
      <div class="animate-fadeIn">
        <div class="flex justify-between items-center mb-2">
          ${renderHeader('Part 3: The Exhibition Ledger', 'Proofread all 8 exhibition records. Flag any record that contains a discrepancy.')}
          <span class="text-xs uppercase tracking-wider text-[var(--accent-gold)] font-mono font-medium">8 Records</span>
        </div>

        <div class="space-y-3.5 mb-6">
          ${records.map((r, idx) => {
            const isFlagged = flaggedRecords.has(r.id);
            return `
              <div class="record-card p-4 bg-white border ${isFlagged ? 'border-[#bd6f5d] bg-amber-50/20' : 'border-[var(--grid-border)]'} rounded-xs transition shadow-xs flex items-start justify-between gap-4" data-id="${r.id}" tabindex="0">
                <div class="space-y-1">
                  <div class="flex items-center gap-2">
                    <span class="text-[10px] font-mono text-[var(--accent-gold)] uppercase tracking-wider">${r.id} • ${r.note}</span>
                  </div>
                  <div class="text-xs font-semibold text-[var(--text-primary)]">${r.title}</div>
                  <div class="text-xs text-[var(--text-secondary)] font-mono leading-relaxed bg-[#faf8f5] p-2 border border-[var(--grid-border)]/60 rounded-xs mt-1">
                    ${r.text}
                  </div>
                </div>

                <button type="button" class="toggle-flag-btn px-3 py-2 border text-xs font-mono uppercase tracking-wider shrink-0 transition rounded-xs ${isFlagged ? 'bg-[#bd6f5d] text-white border-[#bd6f5d]' : 'bg-white text-[var(--text-secondary)] border-[var(--grid-border)] hover:border-[var(--accent-gold)]'}" data-id="${r.id}">
                  ${isFlagged ? 'Discrepancy Flagged' : 'Flag Discrepancy'}
                </button>
              </div>
            `;
          }).join('')}
        </div>

        <div class="flex justify-end">
          <button id="a3SubmitBtn" class="px-7 py-3 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition shadow-sm rounded-xs">
            Verify & Approve Ledger &rarr;
          </button>
        </div>
      </div>
    `;

    // Track record inspection events
    app.querySelectorAll('.record-card').forEach((card, idx) => {
      const recId = card.getAttribute('data-id');
      const inspect = () => {
        if (!inspectedRecords.has(recId)) {
          inspectedRecords.add(recId);
          logEvent('record_inspected', {
            trial_index: idx,
            stimulus_id: recId,
            task_def_version: '1.0'
          });
        }
      };

      card.addEventListener('focus', inspect);
      card.addEventListener('mouseenter', inspect);
    });

    // Toggle discrepancy buttons
    app.querySelectorAll('.toggle-flag-btn').forEach((btn, idx) => {
      const recId = btn.getAttribute('data-id');
      const toggle = (modality) => {
        lastInputModality = modality;
        const nowFlagged = !flaggedRecords.has(recId);
        if (nowFlagged) {
          flaggedRecords.add(recId);
        } else {
          flaggedRecords.delete(recId);
        }

        logEvent('discrepancy_toggled', {
          trial_index: idx,
          stimulus_id: recId,
          flagged_state: nowFlagged,
          input_modality: lastInputModality,
          task_def_version: '1.0'
        });

        render();
      };

      btn.addEventListener('click', () => toggle('mouse'));
      btn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggle('keyboard');
        }
      });
    });

    document.getElementById('a3SubmitBtn')?.addEventListener('click', () => {
      logEvent('verification_finalized', {
        action_id: 'approve_ledger',
        input_modality: lastInputModality,
        task_def_version: '1.0'
      });

      onComplete({
        mini_game: 'A3',
        observations_count: records.length
      });
    });
  }

  render();
}
