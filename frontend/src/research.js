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

    const bandOrder = { "LOW": 0, "MODERATE": 1, "HIGH": 2 };
    let totalScore = 0;
    let paramCount = 0;
    
    const traits = {'empathy': 'Ability to understand and adjust to others', 'conscientiousness': 'Diligence and attention to detail', 'collaborative_spirit': 'Teamwork and resource sharing', 'emotional_agility': 'Adaptability to sudden changes', 'curiosity': 'Desire to explore and learn', 'creative_initiative': 'Problem-solving with limited tools', 'motivation': 'Persistence in repetitive tasks'};
        const paramRows = Object.entries(comparisons).map(([parameter, comp]) => {
        const sjtBand = comp.sjt_band || 'MODERATE';
        const gameBand = comp.game_band || 'MODERATE';
        
        const sjtVal = bandOrder[sjtBand] !== undefined ? bandOrder[sjtBand] : 1;
        const gameVal = bandOrder[gameBand] !== undefined ? bandOrder[gameBand] : 1;
        
        totalScore += (sjtVal + gameVal);
        paramCount += 2;
        
        const delta = Math.abs(sjtVal - gameVal);
        let interpretation = "Strong Reliability - Consistent across methods.";
        let color = "#2e7d32";
        
        if (delta === 1) {
            interpretation = "Moderate Divergence - Acceptable variation in context.";
            color = "#b5832a";
        } else if (delta > 1) {
            interpretation = "High Divergence - Requires deeper interview probing.";
            color = "#c62828";
        }
        
        return `
        <tr class="border-b border-[var(--grid-border)]">
            <td class="p-3 font-medium capitalize text-[var(--text-primary)]">${parameter.replace(/_/g, ' ')}</td>
            <td class="p-3 text-[var(--text-secondary)]">${sjtBand}</td>
            <td class="p-3 text-[var(--text-secondary)]">${gameBand}</td>
            <td class="p-3 font-bold" style="color: ${color};">${delta}</td>
            <td class="p-3" style="color: ${color};">${interpretation}</td>
        </tr>
        `;
    }).join('');
    
    const maxPossible = paramCount * 2;
    let finalScorePercent = 0;
    if (maxPossible > 0) {
        finalScorePercent = Math.round((totalScore / maxPossible) * 100);
    }
    
    let overallLabel = "Developing Candidate";
    if (finalScorePercent >= 75) overallLabel = "Highly Recommended";
    else if (finalScorePercent >= 50) overallLabel = "Recommended";

    container.innerHTML = `
      <div class="mb-4">
        <button onclick="loadSessionsList()" class="text-xs uppercase tracking-widest text-[var(--text-secondary)] hover:text-[var(--accent-gold)]">&larr; Back to Registry</button>
      </div>
      
      <div class="bg-[#faf8f5] border border-[var(--grid-border)] p-6 mb-6">
        <h3 class="text-xs font-semibold tracking-widest uppercase text-[var(--accent-gold)] mb-4">1. Candidate Overview</h3>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div><strong class="block text-[var(--text-secondary)] text-xs uppercase tracking-wider mb-1">Name</strong>${candidateName}</div>
          <div><strong class="block text-[var(--text-secondary)] text-xs uppercase tracking-wider mb-1">Email</strong>${candidateEmail}</div>
          <div><strong class="block text-[var(--text-secondary)] text-xs uppercase tracking-wider mb-1">Contact</strong>${candidatePhone}</div>
          <div><strong class="block text-[var(--text-secondary)] text-xs uppercase tracking-wider mb-1">Duration</strong>${durationMin}</div>
        </div>
      </div>
      
      <div class="bg-white border border-[var(--grid-border)] p-8 mb-6 text-center">
        <h3 class="text-xs font-semibold tracking-widest uppercase text-[var(--accent-gold)] mb-2">Overall Assessment Score</h3>
        <div class="text-5xl font-serif text-[var(--text-primary)] mb-2">${finalScorePercent}/100</div>
        <div class="text-sm font-medium uppercase tracking-widest text-[var(--text-secondary)]">${overallLabel}</div>
      </div>

      <div class="mb-6">
        <h3 class="text-xs font-semibold tracking-widest uppercase text-[var(--accent-gold)] mb-3">2. Parameter Construct Analysis & Deltas</h3>
        <p class="text-xs text-[var(--text-secondary)] mb-4 leading-relaxed">
          This table compares the candidate's self-reported Situational Judgment (SJT) with their actual performative tasks (Games). The Delta measures reliability between what they said and what they did.
        </p>
        <div class="overflow-x-auto border border-[var(--grid-border)] bg-white">
          <table class="w-full text-left text-sm">
            <thead class="bg-[#f0eeea] text-xs uppercase tracking-wider text-[var(--text-secondary)]">
              <tr>
                <th class="p-3">Parameter</th>
                <th class="p-3">SJT Score</th>
                <th class="p-3">Games Score</th>
                <th class="p-3">Delta</th>
                <th class="p-3">Interpretation</th>
              </tr>
            </thead>
            <tbody>
              ${paramRows}
            </tbody>
          </table>
        </div>
      </div>
    `;
  } catch (err) {
    container.innerHTML = `<div class="p-8 text-center text-red-600">Failed to load dossier.</div>`;
  }
}
