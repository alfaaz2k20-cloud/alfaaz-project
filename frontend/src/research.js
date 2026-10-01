/* ==========================================================================
   ALFAAZ RECRUIT — RECRUITER RESEARCH VIEW CLIENT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', async () => {
  const token = localStorage.getItem('alfaaz_token');
  if (!token) {
    window.location.href = 'login.html';
    return;
  }

  setupLogout();
  await loadSessionsList();
});

function setupLogout() {
  document.getElementById('logoutBtn')?.addEventListener('click', () => {
    localStorage.removeItem('alfaaz_token');
    window.location.href = 'login.html';
  });
}

async function loadSessionsList(selectedStatus = '') {
  const container = document.getElementById('researchContent');
  const apiBase = window.ALFAAZ_API_URL || '';

  try {
    const token = localStorage.getItem('alfaaz_token');
    const url = `${apiBase}/recruit/research/sessions${selectedStatus ? `?status=${encodeURIComponent(selectedStatus)}` : ''}`;
    const resp = await fetch(url, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (resp.status === 401 || resp.status === 403) {
      alert('Admin clearance required.');
      window.location.href = 'login.html';
      return;
    }

    const sessions = await resp.json();

    const filterToolbar = `
      <div class="flex justify-between items-center bg-white border border-[var(--grid-border)] p-4">
        <div>
          <h2 class="text-lg font-serif text-[var(--text-primary)]">Applicant Assessment Records</h2>
          <span class="text-xs text-[var(--text-secondary)]">Ordered strictly by submission time</span>
        </div>
        <div class="flex items-center gap-2">
          <label for="statusFilter" class="text-xs uppercase tracking-wider text-[var(--text-secondary)]">Session Status:</label>
          <select id="statusFilter" class="px-2 py-1 text-xs border border-[var(--grid-border)] bg-[#faf8f5] text-[var(--text-primary)] focus:outline-none">
            <option value="" ${selectedStatus === '' ? 'selected' : ''}>All Operational Statuses</option>
            <option value="CONSENTED" ${selectedStatus === 'CONSENTED' ? 'selected' : ''}>Consented</option>
            <option value="SJT" ${selectedStatus === 'SJT' ? 'selected' : ''}>SJT</option>
            <option value="ACTIVE" ${selectedStatus === 'ACTIVE' ? 'selected' : ''}>Active (Games)</option>
            <option value="COMPLETE" ${selectedStatus === 'COMPLETE' ? 'selected' : ''}>Complete</option>
          </select>
        </div>
      </div>
    `;

    if (!sessions || sessions.length === 0) {
      container.innerHTML = `
        ${filterToolbar}
        <div class="p-12 text-center text-[var(--text-secondary)] font-serif text-base bg-white border border-[var(--grid-border)] mt-4">
          No recruitment assessment sessions found for this status.
        </div>
      `;
      document.getElementById('statusFilter')?.addEventListener('change', (e) => {
        loadSessionsList(e.target.value);
      });
      return;
    }

    const rowsHtml = sessions.map(s => `
      <tr class="border-b border-[var(--grid-border)] hover:bg-[#faf8f5] transition">
        <td class="p-4 font-serif text-sm font-medium text-[var(--text-primary)]">${s.full_name}</td>
        <td class="p-4 text-xs text-[var(--text-secondary)]">${s.email}</td>
        <td class="p-4 text-xs text-[var(--text-secondary)]">${s.created_at ? new Date(s.created_at).toLocaleString() : '—'}</td>
        <td class="p-4 text-xs">
          <span class="px-2 py-0.5 bg-[#f4f1ea] border border-[var(--grid-border)] text-[10px] uppercase tracking-wider">${s.status}</span>
        </td>
        <td class="p-4 text-right">
          <button class="view-session-btn px-3 py-1 bg-[var(--text-primary)] text-white text-[10px] uppercase tracking-widest hover:bg-[var(--accent-gold)] transition" data-id="${s.session_id}">
            View Evidence &rarr;
          </button>
        </td>
      </tr>
    `).join('');

    container.innerHTML = `
      <div class="space-y-4">
        ${filterToolbar}
        <div class="bg-white border border-[var(--grid-border)] p-6 space-y-4">
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="bg-[#faf8f5] border-b border-[var(--grid-border)] text-[10px] uppercase tracking-wider text-[var(--text-secondary)]">
                  <th class="p-4">Applicant Name</th>
                  <th class="p-4">Email</th>
                  <th class="p-4">Submission Date</th>
                  <th class="p-4">Status</th>
                  <th class="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                ${rowsHtml}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    document.getElementById('statusFilter')?.addEventListener('change', (e) => {
      loadSessionsList(e.target.value);
    });

    container.querySelectorAll('.view-session-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const sId = btn.getAttribute('data-id');
        loadSessionDetail(sId);
      });
    });

    if (window.lucide) window.lucide.createIcons();
  } catch (err) {
    container.innerHTML = `<div class="p-8 text-center text-red-600">Failed to load sessions: ${err.message}</div>`;
  }
}

async function loadSessionDetail(sessionId) {
  const container = document.getElementById('researchContent');
  const apiBase = window.ALFAAZ_API_URL || '';

  try {
    const token = localStorage.getItem('alfaaz_token');
    const resp = await fetch(`${apiBase}/recruit/research/session/${sessionId}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    const data = await resp.json();
    const meta = data.metadata;
    const evidence = data.evidence_by_parameter;

    const paramCardsHtml = Object.keys(evidence).map(pKey => {
      const p = evidence[pKey];
      const pTitle = pKey.replace(/_/g, ' ').toUpperCase();
      const refDist = p.random_responder_reference || {};

      return `
        <div class="param-card space-y-3">
          <div class="flex justify-between items-start border-b border-[var(--grid-border)] pb-2">
            <div>
              <span class="badge-neutral">${pTitle}</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-xs text-[var(--text-secondary)]">SJT Band:</span>
              <strong class="text-xs text-[var(--accent-gold)]">${p.sjt_band || 'UNAVAILABLE'}</strong>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4 text-xs">
            <div class="bg-[#faf8f5] p-3 border border-[var(--grid-border)] space-y-1">
              <div class="font-semibold text-[10px] text-[var(--text-secondary)] uppercase">SJT Score Metrics</div>
              <div>Raw Score: <strong>${p.sjt_raw !== null ? p.sjt_raw : '—'}</strong> (Span: ${p.sjt_span})</div>
              <div>Relative Range: [${p.sjt_min} .. ${p.sjt_max}]</div>
              <div class="text-[10px] text-[var(--text-secondary)] mt-1">Random Baseline: LOW ${refDist.LOW || '—'} / MOD ${refDist.MODERATE || '—'} / HIGH ${refDist.HIGH || '—'}</div>
            </div>

            <div class="bg-[#faf8f5] p-3 border border-[var(--grid-border)] space-y-1">
              <div class="font-semibold text-[10px] text-[var(--text-secondary)] uppercase">Game Observational Evidence</div>
              <div>Status: <span class="badge-neutral">${p.game_status}</span></div>
              <div>Band: <span class="badge-neutral">${p.game_band}</span></div>
              <div>Consistency: <span class="badge-neutral">${p.consistency}</span></div>
              <div>Relationship with SJT: <span class="badge-neutral">${p.relationship}</span></div>
              <div>Confidence Level: <span class="badge-neutral">${p.confidence}</span></div>
            </div>
          </div>

          <div class="text-xs text-[var(--text-primary)] leading-relaxed border-t border-[var(--grid-border)] pt-2">
            <strong>Observed Behavioral Note:</strong> ${p.observed_behavior || 'Completed micro-task sequence.'}
          </div>
        </div>
      `;
    }).join('');

    container.innerHTML = `
      <div class="space-y-6">
        <div class="flex justify-between items-center">
          <button id="backToListBtn" class="text-xs uppercase tracking-wider text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
            &larr; Back to Sessions List
          </button>
          <span class="font-mono text-xs text-[var(--text-secondary)]">${meta.session_id}</span>
        </div>

        <div class="bg-white border border-[var(--grid-border)] p-6 space-y-4">
          <div class="flex justify-between items-start border-b border-[var(--grid-border)] pb-4">
            <div>
              <h2 class="text-xs uppercase tracking-widest text-[var(--accent-gold)]">Evidence by parameter</h2>
              <h1 class="text-2xl font-serif text-[var(--text-primary)] mt-1">${meta.applicant.full_name || 'Anonymous'}</h1>
              <p class="text-xs text-[var(--text-secondary)]">${meta.applicant.email || ''}</p>
            </div>
            <div class="text-right text-xs text-[var(--text-secondary)]">
              <div>Created: ${meta.created_at ? new Date(meta.created_at).toLocaleString() : '—'}</div>
              <div>Status: <span class="badge-neutral">${meta.status}</span></div>
            </div>
          </div>

          <div class="p-4 bg-amber-50/50 border border-[var(--accent-gold)]/30 text-xs text-[var(--text-primary)] leading-relaxed space-y-1">
            <div><strong>Methodological Note:</strong> ${meta.safeguards.ipsative_note}</div>
            <div class="text-[11px] text-[var(--text-secondary)] italic">${meta.safeguards.sjt_emphasis_note || "Relative emphasis in this SJT's trade-offs: higher / middle / lower."}</div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            ${paramCardsHtml}
          </div>
        </div>
      </div>
    `;

    document.getElementById('backToListBtn')?.addEventListener('click', () => {
      loadSessionsList();
    });

    if (window.lucide) window.lucide.createIcons();
  } catch (err) {
    container.innerHTML = `<div class="p-8 text-center text-red-600">Failed to load session details: ${err.message}</div>`;
  }
}
