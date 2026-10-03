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
    const url = `${apiBase}/recruit/research/sessions/${sessionId}`;
    const resp = await fetch(url, { headers: { 'Authorization': `Bearer ${token}` } });

    if (!resp.ok) throw new Error("Failed to load dossier");
    const data = await resp.json();

    const meta = data.metadata || {};
    const applicant = meta.applicant || {};
    const comparisons = data.measurement_comparisons || {};
    
    const candidateName = window.escapeHtml(applicant.full_name || 'Candidate');
    const candidateEmail = window.escapeHtml(applicant.email || '—');
    const candidatePhone = window.escapeHtml(applicant.phone_or_contact || '—');
    const durationMin = meta.duration_minutes !== null ? `${meta.duration_minutes} min` : 'In progress';

    const dims = data.dimensions || [];
    const summary = data.profile_summary || {};
    const completeness = summary.completeness || 'INSUFFICIENT';

    const levelBadge = (lvl) => {
        if (lvl === 'RELATIVELY_STRONG') return '<span class="px-2 py-0.5 bg-[#f5efe6] text-[#8c651e] border border-[#d4be98] text-[10px] font-semibold uppercase tracking-wider">Relatively Strong</span>';
        if (lvl === 'RELATIVELY_LOWER') return '<span class="px-2 py-0.5 bg-gray-100 text-gray-500 border border-gray-200 text-[10px] uppercase tracking-wider">Relatively Lower</span>';
        if (lvl === 'ABOUT_EQUAL') return '<span class="px-2 py-0.5 bg-gray-100 text-gray-600 border border-gray-300 text-[10px] uppercase tracking-wider">About Equal</span>';
        if (lvl === 'RELATIVELY_MIDDLE') return '<span class="px-2 py-0.5 bg-gray-50 text-gray-700 border border-gray-300 text-[10px] uppercase tracking-wider">Relatively Middle</span>';
        return '<span class="px-2 py-0.5 bg-gray-50 text-gray-400 border border-gray-200 text-[10px] uppercase tracking-wider">Insufficient</span>';
    };

    const relBadge = (rel) => {
        if (rel === 'ALIGNED') return '<span class="text-green-700 font-medium">Aligned</span>';
        if (rel === 'PARTLY_ALIGNED') return '<span class="text-amber-700 font-medium">Partly Aligned</span>';
        if (rel === 'DIFFERENT') return '<span class="text-purple-700 font-medium">Divergent</span>';
        if (rel === 'NOT_ENOUGH_EVIDENCE') return '<span class="text-gray-500">Awaiting Data</span>';
        return '<span class="text-gray-400">Not Available</span>';
    };

    const dimensionRows = dims.map(d => {
        const p = d.profile || {};
        const scoreDisp = p.relative_score !== null && p.relative_score !== undefined ? `${p.relative_score} / 100` : '—';
        const rankDisp = p.relative_rank !== null && p.relative_rank !== undefined ? `#${p.relative_rank}` : '—';
        const levelDisp = levelBadge(p.relative_level);
        const relDisp = relBadge(d.relationship);
        const confDisp = d.confidence || 'LIMITED';
        const safeName = window.escapeHtml(d.display_name || d.parameter);
        const obs = window.escapeHtml(d.observed_behavior || '—');

        return `
        <tr class="border-b border-[var(--grid-border)]">
            <td class="p-3 font-medium text-[var(--text-primary)]">
                <div>${safeName}</div>
                <div class="text-[10px] text-[var(--text-secondary)] mt-0.5">${obs}</div>
            </td>
            <td class="p-3 text-center font-semibold text-xs">${rankDisp}</td>
            <td class="p-3 text-center font-serif text-sm font-semibold">${scoreDisp}</td>
            <td class="p-3 text-center">${levelDisp}</td>
            <td class="p-3 text-center text-xs">${relDisp}</td>
            <td class="p-3 text-center text-[10px] uppercase text-[var(--text-secondary)]">${confDisp}</td>
        </tr>
        `;
    }).join('');

    container.innerHTML = `
      <div class="mb-4">
        <button onclick="loadSessionsList()" class="text-xs uppercase tracking-widest text-[var(--text-secondary)] hover:text-[var(--accent-gold)]">&larr; Back to Registry</button>
      </div>
      
      <div class="bg-[#faf8f5] border border-[var(--grid-border)] p-6 mb-4">
        <h3 class="text-xs font-semibold tracking-widest uppercase text-[var(--accent-gold)] mb-4">1. Candidate & Session Overview</h3>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div><strong class="block text-[var(--text-secondary)] text-xs uppercase tracking-wider mb-1">Name</strong>${candidateName}</div>
          <div><strong class="block text-[var(--text-secondary)] text-xs uppercase tracking-wider mb-1">Email</strong>${candidateEmail}</div>
          <div><strong class="block text-[var(--text-secondary)] text-xs uppercase tracking-wider mb-1">Contact</strong>${candidatePhone}</div>
          <div><strong class="block text-[var(--text-secondary)] text-xs uppercase tracking-wider mb-1">Session Duration</strong>${durationMin}</div>
        </div>
      </div>

      <div class="bg-white border-l-4 border-[var(--accent-gold)] border-t border-r border-b border-[var(--grid-border)] p-4 mb-6 text-xs text-[var(--text-secondary)] leading-relaxed">
        <strong class="text-[var(--text-primary)] uppercase tracking-wider">Psychometric Safeguard Notice:</strong>
        This dossier provides a <em>provisional within-person relative profile</em> for exploratory human review only. It reflects the relative emphasis among dimensions for this candidate, NOT normative trait scores, clinical evaluation, or automated hiring recommendations. Cross-method convergence is exploratory; empirical normative calibration is pending.
      </div>

      <div class="mb-6">
        <div class="flex justify-between items-baseline mb-3">
          <h3 class="text-xs font-semibold tracking-widest uppercase text-[var(--accent-gold)]">2. Within-Person Relative Dimension Profile</h3>
          <span class="text-xs uppercase tracking-wider text-[var(--text-secondary)]">Profile Completeness: <strong class="text-[var(--text-primary)]">${completeness}</strong></span>
        </div>
        <div class="overflow-x-auto border border-[var(--grid-border)] bg-white">
          <table class="w-full text-left text-sm">
            <thead class="bg-[#f0eeea] text-xs uppercase tracking-wider text-[var(--text-secondary)]">
              <tr>
                <th class="p-3">Dimension & Observed Context</th>
                <th class="p-3 text-center">Relative Rank</th>
                <th class="p-3 text-center">Score (0–100)</th>
                <th class="p-3 text-center">Profile Position</th>
                <th class="p-3 text-center">Cross-Method Relationship</th>
                <th class="p-3 text-center">Confidence</th>
              </tr>
            </thead>
            <tbody>
              ${dimensionRows}
            </tbody>
          </table>
        </div>
      </div>
    `;
  } catch (err) {
    container.innerHTML = `<div class="p-8 text-center text-red-600">Failed to load dossier.</div>`;
  }
}
