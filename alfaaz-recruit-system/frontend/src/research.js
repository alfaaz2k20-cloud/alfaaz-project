/* ==========================================================================
 ALFAAZ RECRUIT — RECRUITER RESEARCH VIEW CLIENT
 ========================================================================== */

document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('alfaaz_token');
    const userData = localStorage.getItem('alfaaz_user');
    
    if (!token || !userData) {
        window.location.href = 'login.html';
        return;
    }
    
    try {
        const user = JSON.parse(userData);
        if (user.status !== 'ADMIN') {
            window.location.href = 'dashboard.html';
            return;
        }
    } catch (e) {
        localStorage.removeItem('alfaaz_token');
        localStorage.removeItem('alfaaz_user');
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
 const apiBase = window.ALFAAZ_API_URL || 'https://alfaaz-project.onrender.com';

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
 <h2 class="text-lg text-[var(--text-primary)]">Applicant Assessment Records</h2>
 <span class="text-xs text-black">Ordered strictly by submission time</span>
 </div>
 <div class="flex items-center gap-2">
 <label for="statusFilter" class="text-xs uppercase tracking-wider text-black">Session Status:</label>
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
 <div class="p-12 text-center text-black text-base bg-white border border-[var(--grid-border)] mt-4">
 No recruitment assessment sessions found for this status.
 </div>
 `;
 document.getElementById('statusFilter')?.addEventListener('change', (e) => {
 loadSessionsList(e.target.value);
 });
 return;
 }

 const rowsHtml = sessions.map(s => `
 <tr class="border-b border-[var(--grid-border)] hover:bg-[#faf8f5] ">
 <td class="p-4 text-sm font-medium text-[var(--text-primary)]">${s.full_name}</td>
 <td class="p-4 text-xs text-black">${s.email}</td>
 <td class="p-4 text-xs text-black">${s.created_at ? new Date(s.created_at).toLocaleString() : '—'}</td>
 <td class="p-4 text-xs">
 <span class="px-2 py-0.5 bg-[#f4f1ea] border border-[var(--grid-border)] text-[10px] uppercase tracking-wider">${s.status}</span>
 </td>
 <td class="p-4 text-right">
 <button class="view-session-btn px-3 py-1 bg-[var(--text-primary)] text-white text-[10px] uppercase tracking-widest hover:bg-[var(--accent-gold)] " data-id="${s.session_id}">
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
 <tr class="bg-[#faf8f5] border-b border-[var(--grid-border)] text-[10px] uppercase tracking-wider text-black">
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

async function loadSessionDetail(sessionId, forceRecompute = false) {
 const container = document.getElementById('researchContent');
 const apiBase = window.ALFAAZ_API_URL || 'https://alfaaz-project.onrender.com';

 container.innerHTML = `
 <div class="mb-4">
 <button id="backToRegistryLoadingBtn" class="text-xs uppercase tracking-widest text-black hover:text-[var(--accent-gold)]">&larr; Back to Registry</button>
 </div>
 <div class="p-12 text-center text-[var(--text-secondary)] font-serif text-lg bg-white border border-[var(--grid-border)]">
 Loading applicant dossier${forceRecompute ? ' (re-analyzing telemetry)...' : '...'}
 </div>
 `;
 document.getElementById('backToRegistryLoadingBtn')?.addEventListener('click', () => loadSessionsList());

 try {
 const token = localStorage.getItem('alfaaz_token');
 const url = `${apiBase}/recruit/research/sessions/${sessionId}${forceRecompute ? '?recompute=true' : ''}`;
 const resp = await fetch(url, { headers: { 'Authorization': `Bearer ${token}` } });

 if (!resp.ok) {
     let errDetail = resp.statusText;
     try {
         const errJson = await resp.json();
         if (errJson && errJson.detail) errDetail = errJson.detail;
     } catch (_) {}
     throw new Error(`HTTP ${resp.status}: ${errDetail}`);
 }
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
 if (lvl === 'RELATIVELY_LOWER') return '<span class="px-2 py-0.5 bg-gray-100 text-black border border-gray-200 text-[10px] uppercase tracking-wider">Relatively Lower</span>';
 if (lvl === 'ABOUT_EQUAL') return '<span class="px-2 py-0.5 bg-gray-100 text-gray-600 border border-gray-300 text-[10px] uppercase tracking-wider">About Equal</span>';
 if (lvl === 'RELATIVELY_MIDDLE') return '<span class="px-2 py-0.5 bg-gray-50 text-gray-700 border border-gray-300 text-[10px] uppercase tracking-wider">Relatively Middle</span>';
 return '<span class="px-2 py-0.5 bg-gray-50 text-black border border-gray-200 text-[10px] uppercase tracking-wider">Insufficient</span>';
 };

 const relBadge = (rel) => {
 if (rel === 'ALIGNED') return '<span class="text-green-700 font-semibold uppercase text-[10px] tracking-wider">Aligned</span>';
 if (rel === 'PARTLY_ALIGNED') return '<span class="text-[var(--text-primary)] font-semibold uppercase text-[10px] tracking-wider">Partly Aligned</span>';
 if (rel === 'DIFFERENT') return '<span class="text-purple-700 font-semibold uppercase text-[10px] tracking-wider">Different</span>';
 if (rel === 'NOT_ENOUGH_EVIDENCE') return '<span class="text-stone-500 text-[10px]">Not Enough Evidence</span>';
 return '<span class="text-black text-[10px]">Not Available</span>';
 };

   const getDossierInterpretation = (d) => {
    const sjtVal = (d.sjt && d.sjt.relative !== null && d.sjt.relative !== undefined) ? Number(d.sjt.relative) : null;
    const gameVal = (d.game_relative !== null && d.game_relative !== undefined)
      ? Number(d.game_relative)
      : ((d.games && d.games.relative !== null && d.games.relative !== undefined) ? Number(d.games.relative) : null);
    const deltaVal = (d.cross_method_delta !== null && d.cross_method_delta !== undefined) ? Number(d.cross_method_delta) : null;
    const rel = d.relationship || 'NOT_AVAILABLE';
    const conf = d.confidence || 'LIMITED';
    const name = window.escapeHtml(d.display_name || d.parameter || 'Dimension');

    // Case 1: Neither method available
    if (sjtVal === null && gameVal === null) {
      return '<span class="text-stone-500 italic">Insufficient observations across methods.</span>';
    }

    // Case 2: Only SJT available (Game data pending or insufficient)
    if (sjtVal !== null && gameVal === null) {
      if (sjtVal >= 0.60) {
        return `High situational intent (${sjtVal.toFixed(2)}); deliberate scenario priority pending behavioral activity verification.`;
      } else if (sjtVal >= 0.40) {
        return `Balanced situational baseline (${sjtVal.toFixed(2)}); steady trade-off priority pending behavioral activity verification.`;
      } else {
        return `Lower situational priority (${sjtVal.toFixed(2)}); selective trade-off allocation pending behavioral activity verification.`;
      }
    }

    // Case 3: Only Games available (SJT missing)
    if (sjtVal === null && gameVal !== null) {
      if (gameVal >= 0.60) {
        return `Elevated behavioral activity (${gameVal.toFixed(2)}); strong task engagement pending situational trade-off confirmation.`;
      } else if (gameVal >= 0.40) {
        return `Moderate behavioral activity (${gameVal.toFixed(2)}); standard task engagement pending situational trade-off confirmation.`;
      } else {
        return `Lower behavioral activity (${gameVal.toFixed(2)}); minimal task engagement pending situational trade-off confirmation.`;
      }
    }

    // Case 4: Both methods available - Cross-method triangulation
    const deltaStr = deltaVal !== null ? deltaVal.toFixed(2) : (Math.abs(sjtVal - gameVal)).toFixed(2);
    const confTag = conf === 'SUBSTANTIAL' 
      ? '<span class="text-emerald-700 font-medium"> [High Confidence]</span>' 
      : (conf === 'MODERATE' ? '<span class="text-stone-600"> [Moderate Confidence]</span>' : '<span class="text-amber-700"> [Limited Confidence]</span>');

    // 4A: ALIGNED (Delta <= 0.15)
    if (rel === 'ALIGNED' || (deltaVal !== null && deltaVal <= 0.15)) {
      if (sjtVal >= 0.55 && gameVal >= 0.55) {
        return `<strong>Strong convergent strength</strong> (&Delta; ${deltaStr}). High deliberate priority matches active simulation execution.${confTag}`;
      } else if (sjtVal < 0.38 && gameVal < 0.38) {
        return `<strong>Consistently lower emphasis</strong> (&Delta; ${deltaStr}). Selectively allocated away across both judgment trade-offs and simulation.${confTag}`;
      } else {
        return `<strong>Harmonious baseline</strong> (&Delta; ${deltaStr}). Stated trade-offs closely mirror practical simulation actions.${confTag}`;
      }
    }

    // 4B: PARTLY_ALIGNED (0.15 < Delta <= 0.30)
    if (rel === 'PARTLY_ALIGNED' || (deltaVal !== null && deltaVal <= 0.30)) {
      if (sjtVal > gameVal) {
        return `<strong>Moderate judgment emphasis</strong> (&Delta; ${deltaStr}). Higher conceptual importance in trade-offs than manifested in simulation.${confTag}`;
      } else {
        return `<strong>Moderate behavioral emphasis</strong> (&Delta; ${deltaStr}). Higher hands-on task engagement than expressed in judgment trade-offs.${confTag}`;
      }
    }

    // 4C: DIFFERENT (Delta > 0.30)
    if (rel === 'DIFFERENT' || (deltaVal !== null && deltaVal > 0.30)) {
      if (sjtVal > gameVal) {
        return `<strong>Marked divergence</strong> (&Delta; ${deltaStr}). High stated situational intent contrasts with lower task execution; explore aspirational values in interview.${confTag}`;
      } else {
        return `<strong>Marked divergence</strong> (&Delta; ${deltaStr}). Hands-on execution exceeds stated situational priority; suggests tacit, unstated capability. Explore in interview.${confTag}`;
      }
    }

    // Fallback for edge cases
    if (rel === 'NOT_ENOUGH_EVIDENCE') {
      return `<span class="text-stone-500 italic">Inconclusive evidence (&Delta; ${deltaStr}); observations below verification threshold.${confTag}</span>`;
    }

    return `Provisional data (&Delta; ${deltaStr}): SJT ${sjtVal.toFixed(2)}, Games ${gameVal.toFixed(2)}.${confTag}`;
  };

  let activeSortMode = 'sjt';
  const hasSjt = dims.some(d => d.sjt && d.sjt.relative !== null && d.sjt.relative !== undefined);
  const hasGame = dims.some(d => (d.game_relative !== null && d.game_relative !== undefined) || (d.games && d.games.relative !== null && d.games.relative !== undefined));
  const hasDelta = dims.some(d => d.cross_method_delta !== null && d.cross_method_delta !== undefined);

  if (!hasSjt && hasGame) {
    activeSortMode = 'game';
  }

  const sortDimensions = (mode) => {
    return [...dims].sort((a, b) => {
      let valA, valB, tieA, tieB;
      if (mode === 'game') {
        valA = a.game_relative !== null && a.game_relative !== undefined 
          ? Number(a.game_relative) 
          : ((a.games && a.games.relative !== null && a.games.relative !== undefined) ? Number(a.games.relative) : -Infinity);
        valB = b.game_relative !== null && b.game_relative !== undefined 
          ? Number(b.game_relative) 
          : ((b.games && b.games.relative !== null && b.games.relative !== undefined) ? Number(b.games.relative) : -Infinity);
        tieA = a.sjt?.relative !== null && a.sjt?.relative !== undefined ? Number(a.sjt.relative) : -Infinity;
        tieB = b.sjt?.relative !== null && b.sjt?.relative !== undefined ? Number(b.sjt.relative) : -Infinity;
      } else if (mode === 'delta') {
        valA = a.cross_method_delta !== null && a.cross_method_delta !== undefined ? Number(a.cross_method_delta) : -Infinity;
        valB = b.cross_method_delta !== null && b.cross_method_delta !== undefined ? Number(b.cross_method_delta) : -Infinity;
        tieA = a.sjt?.relative !== null && a.sjt?.relative !== undefined ? Number(a.sjt.relative) : -Infinity;
        tieB = b.sjt?.relative !== null && b.sjt?.relative !== undefined ? Number(b.sjt.relative) : -Infinity;
      } else {
        // default: 'sjt'
        valA = a.sjt?.relative !== null && a.sjt?.relative !== undefined ? Number(a.sjt.relative) : -Infinity;
        valB = b.sjt?.relative !== null && b.sjt?.relative !== undefined ? Number(b.sjt.relative) : -Infinity;
        tieA = a.game_relative !== null && a.game_relative !== undefined 
          ? Number(a.game_relative) 
          : ((a.games && a.games.relative !== null && a.games.relative !== undefined) ? Number(a.games.relative) : -Infinity);
        tieB = b.game_relative !== null && b.game_relative !== undefined 
          ? Number(b.game_relative) 
          : ((b.games && b.games.relative !== null && b.games.relative !== undefined) ? Number(b.games.relative) : -Infinity);
      }

      if (valB !== valA) return valB - valA;
      if (tieB !== tieA) return tieB - tieA;
      return (a.display_name || a.parameter || '').localeCompare(b.display_name || b.parameter || '');
    });
  };

  const renderDimensionRowsHtml = (sortedList, mode) => {
    return sortedList.map((d, index) => {
      const relDisp = relBadge(d.relationship);
      const confDisp = d.confidence || 'LIMITED';
      const safeName = window.escapeHtml(d.display_name || d.parameter);
      const sjtRel = (d.sjt && d.sjt.relative !== null && d.sjt.relative !== undefined) ? d.sjt.relative.toFixed(2) : '—';
      const gameRel = (d.game_relative !== null && d.game_relative !== undefined) ? d.game_relative.toFixed(2) : ((d.games && d.games.relative !== null && d.games.relative !== undefined) ? d.games.relative.toFixed(2) : '—');
      const deltaDisp = (d.cross_method_delta !== null && d.cross_method_delta !== undefined) ? d.cross_method_delta.toFixed(2) : '—';
      const obs = window.escapeHtml(d.observed_behavior || '—');
      const interp = getDossierInterpretation(d);
      const rankNum = index + 1;

      const sjtColStyle = mode === 'sjt' ? 'font-bold bg-[#faf8f5]' : '';
      const gameColStyle = mode === 'game' ? 'font-bold bg-[#faf8f5]' : '';
      const deltaColStyle = mode === 'delta' ? 'font-bold bg-[#faf8f5]' : '';

      return `
      <tr class="border-b border-[var(--grid-border)] hover:bg-[#faf9f6] transition-colors">
        <td class="p-3 text-center font-mono text-xs font-semibold text-stone-500">${rankNum}</td>
        <td class="p-3 font-medium text-[var(--text-primary)] min-w-[180px]">
          <div>${safeName}</div>
          <div class="text-[10px] text-black mt-0.5">${obs}</div>
        </td>
        <td class="p-3 text-center font-mono text-xs ${sjtColStyle}">${sjtRel}</td>
        <td class="p-3 text-center font-mono text-xs ${gameColStyle}">${gameRel}</td>
        <td class="p-3 text-center font-mono text-xs ${deltaColStyle}">${deltaDisp}</td>
        <td class="p-3 text-center text-xs whitespace-nowrap">${relDisp}</td>
        <td class="p-3 text-center text-[10px] uppercase text-black font-semibold whitespace-nowrap">${confDisp}</td>
        <td class="p-3 text-xs text-[var(--text-primary)] leading-relaxed min-w-[280px]">${interp}</td>
      </tr>
      `;
    }).join('');
  };

 const batteryVer = meta.battery_version === '2.0' ? 'V2 (14-Game Candidate Core)' : (meta.battery_version === '1.0' ? 'V1 (21-Game Historical Battery)' : (meta.battery_version || '2.0 (Candidate Core)'));
 const taskRecords = data.task_records || [];
 const coreTasks = taskRecords.filter(t => t.battery_role === 'candidate_core' || (!t.battery_role && !['F3','A3','C3','E3','Q3','CR2','M3'].includes(t.game_id)));
 const bankTasks = taskRecords.filter(t => t.battery_role === 'research_bank' || (t.battery_role !== 'candidate_core' && ['F3','A3','C3','E3','Q3','CR2','M3'].includes(t.game_id)));

 const renderTaskTable = (tasks, roleLabel, badgeStyle) => {
 if (!tasks || tasks.length === 0) return '';
 return `
 <div class="mb-4">
 <div class="flex justify-between items-baseline mb-2">
 <h4 class="text-xs font-semibold tracking-wider uppercase text-[var(--text-primary)] flex items-center gap-2">
 <span class="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider" style="${badgeStyle}">${roleLabel}</span>
 <span>Activities (${tasks.length})</span>
 </h4>
 </div>
 <div class="overflow-x-auto border border-[var(--grid-border)] bg-white">
 <table class="w-full text-left text-xs">
 <thead class="bg-[#f0eeea] text-[10px] uppercase tracking-wider text-black">
 <tr>
 <th class="p-3">Activity</th>
 <th class="p-3">World</th>
 <th class="p-3">Status</th>
 <th class="p-3">Descriptive Behavioral Observation</th>
 </tr>
 </thead>
 <tbody>
 ${tasks.map(t => {
 const statusBg = t.status === 'RECORDED' ? 'background:#eaf5ea; color:#1e6624; border:1px solid #bce0bc;' : (t.status === 'NOT_DERIVED' ? 'background:#f0eeea; color:var(--text-secondary); border:1px solid var(--grid-border);' : 'background:#fdf2e9; color:#9c4221; border:1px solid #f0cdb8;');
 const dispText = t.status === 'NOT_DERIVED' ? '<span class="text-black italic">Unattempted &middot; Reserved in Research Bank</span>' : window.escapeHtml(t.display_text || '—');
 return `
 <tr class="border-b border-[var(--grid-border)]">
 <td class="p-3 font-semibold text-[var(--text-primary)]">${t.game_id}: ${window.escapeHtml(t.game_name || t.game_id)}</td>
 <td class="p-3 text-black">${t.world_id}: ${window.escapeHtml(t.world_name || '')}</td>
 <td class="p-3"><span class="badge" style="font-size:10px; ${statusBg}">${t.status}</span></td>
 <td class="p-3 text-black leading-relaxed">${dispText}</td>
 </tr>
 `;
 }).join('')}
 </tbody>
 </table>
 </div>
 </div>
 `;
 };

 container.innerHTML = `
 <div class="mb-4 flex justify-between items-center">
 <button id="backToRegistryBtn" class="text-xs uppercase tracking-widest text-black hover:text-[var(--accent-gold)]">&larr; Back to Registry</button>
 <button id="recomputeTelemetryBtn" class="px-3 py-1 bg-[#f4f1ea] border border-[var(--grid-border)] text-[10px] uppercase tracking-wider hover:bg-[#eae6dc] transition-colors">
 Re-analyze Telemetry
 </button>
 </div>
 
 <div class="bg-[#faf8f5] border border-[var(--grid-border)] p-6 mb-4">
 <h3 class="text-xs font-semibold tracking-widest uppercase text-[var(--accent-gold)] mb-4">1. Candidate & Session Overview</h3>
 <div class="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
 <div><strong class="block text-black text-xs uppercase tracking-wider mb-1">Name</strong>${candidateName}</div>
 <div><strong class="block text-black text-xs uppercase tracking-wider mb-1">Email</strong>${candidateEmail}</div>
 <div><strong class="block text-black text-xs uppercase tracking-wider mb-1">Contact</strong>${candidatePhone}</div>
 <div><strong class="block text-black text-xs uppercase tracking-wider mb-1">Session Duration</strong>${durationMin}</div>
 <div><strong class="block text-black text-xs uppercase tracking-wider mb-1">Battery Version</strong><span class="badge" style="font-size:10px; background:#f0eeea; color:var(--text-primary); border:1px solid var(--grid-border);">${batteryVer}</span></div>
 </div>
 </div>

 <div class="bg-white border-l-4 border-[var(--accent-gold)] border-t border-r border-b border-[var(--grid-border)] p-4 mb-6 text-xs text-black leading-relaxed">
 <strong class="text-[var(--text-primary)] uppercase tracking-wider">Psychometric Safeguard Notice:</strong>
 This dossier provides a <em>provisional within-person relative profile</em> for exploratory human review only. It reflects the relative emphasis among dimensions for this candidate, NOT normative trait scores, clinical evaluation, or automated hiring decisions. Cross-method convergence is exploratory; empirical normative calibration is pending.
 <div class="mt-2 text-[11px] text-[var(--text-secondary)] italic">${meta.safeguards?.sjt_emphasis_note || "Relative emphasis in this SJT's trade-offs: higher / middle / lower."}</div>
 </div>

 <div class="mb-6">
 <div class="flex flex-wrap justify-between items-center gap-3 mb-3">
 <div class="flex items-center gap-3 flex-wrap">
 <h3 class="text-xs font-semibold tracking-widest uppercase text-[var(--accent-gold)]">2. Evidence by parameter</h3>
 <div class="inline-flex items-center gap-1.5 p-1 bg-[#f0eeea] border border-[var(--grid-border)]">
 <span class="text-[10px] uppercase font-mono tracking-wider text-black px-1.5 font-semibold">Rank By:</span>
 <button id="sortBySjtBtn" class="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider transition-colors ${activeSortMode === 'sjt' ? 'bg-[var(--text-primary)] text-white' : 'text-stone-700 hover:bg-[#e4e1dc]'} ${!hasSjt ? 'opacity-40 cursor-not-allowed' : ''}" ${!hasSjt ? 'disabled title="No SJT data"' : 'title="Rank by Written Situational Trade-offs"'}>
 Written (SJT) ${activeSortMode === 'sjt' ? '&darr;' : ''}
 </button>
 <button id="sortByGameBtn" class="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider transition-colors ${activeSortMode === 'game' ? 'bg-[var(--text-primary)] text-white' : 'text-stone-700 hover:bg-[#e4e1dc]'} ${!hasGame ? 'opacity-40 cursor-not-allowed' : ''}" ${!hasGame ? 'disabled title="Game data pending"' : 'title="Rank by Practical Hands-On Game Performance"'}>
 Hands-On (Games) ${activeSortMode === 'game' ? '&darr;' : ''}
 </button>
 <button id="sortByDeltaBtn" class="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider transition-colors ${activeSortMode === 'delta' ? 'bg-[var(--text-primary)] text-white' : 'text-stone-700 hover:bg-[#e4e1dc]'} ${!hasDelta ? 'opacity-40 cursor-not-allowed' : ''}" ${!hasDelta ? 'disabled title="Requires both SJT and Game data"' : 'title="Rank by Largest Difference Between Words and Actions"'}>
 Difference (&Delta;) ${activeSortMode === 'delta' ? '&darr;' : ''}
 </button>
 </div>
 </div>
 <span class="text-xs uppercase tracking-wider text-black">Profile Completeness: <strong class="text-[var(--text-primary)]">${completeness}</strong></span>
 </div>
 <div class="overflow-x-auto border border-[var(--grid-border)] bg-white">
 <table class="w-full text-left text-sm">
 <thead class="bg-[#f0eeea] text-xs uppercase tracking-wider text-black select-none">
 <tr>
 <th class="p-3 text-center w-12">#</th>
 <th class="p-3">Dimension & Observed Context</th>
 <th id="thSjt" class="p-3 text-center cursor-pointer hover:bg-[#e4e1dc] transition-colors" title="Click to rank by SJT">SJT Rel <span id="thSjtArrow">${activeSortMode === 'sjt' ? '&darr;' : ''}</span></th>
 <th id="thGame" class="p-3 text-center cursor-pointer hover:bg-[#e4e1dc] transition-colors" title="Click to rank by Game">Game Rel <span id="thGameArrow">${activeSortMode === 'game' ? '&darr;' : ''}</span></th>
 <th id="thDelta" class="p-3 text-center cursor-pointer hover:bg-[#e4e1dc] transition-colors" title="Click to rank by Delta">Delta <span id="thDeltaArrow">${activeSortMode === 'delta' ? '&darr;' : ''}</span></th>
 <th class="p-3 text-center">Relationship</th>
 <th class="p-3 text-center">Confidence</th>
 <th class="p-3">Interpretation</th>
 </tr>
 </thead>
 <tbody id="dimensionTableBody">
 ${renderDimensionRowsHtml(sortDimensions(activeSortMode), activeSortMode)}
 </tbody>
 </table>
 </div>
 <div class="bg-[#fcfbf9] border border-[var(--grid-border)] border-t-0 p-3 text-xs text-black leading-relaxed">
 <strong class="text-[var(--text-primary)]">Delta is the absolute difference between the candidate's SJT-relative evidence and Game-SJT-relative evidence for this dimension.</strong> Larger Delta indicates greater divergence and reduces evidence confidence. Delta is not a measure of honesty, reliability, or validity.
 </div>
 </div>

 <div class="mb-6">
 <div class="flex justify-between items-baseline mb-3">
 <h3 class="text-xs font-semibold tracking-widest uppercase text-[var(--accent-gold)]">3. Interactive Activity Behavioral Records</h3>
 <span class="text-xs text-black">${data.task_records_statement || 'Descriptive task counts; not a score.'}</span>
 </div>
 ${renderTaskTable(coreTasks, 'Core Battery', 'background:#eaf5ea; color:#1e6624; border:1px solid #bce0bc;')}
 ${renderTaskTable(bankTasks, 'Research Bank', 'background:#f0eeea; color:var(--text-secondary); border:1px solid var(--grid-border);')}
 </div>
 `;
 document.getElementById('backToRegistryBtn')?.addEventListener('click', () => loadSessionsList());
 document.getElementById('recomputeTelemetryBtn')?.addEventListener('click', () => loadSessionDetail(sessionId, true));

 const updateTableSort = (newMode) => {
 activeSortMode = newMode;
 const tbody = document.getElementById('dimensionTableBody');
 if (tbody) {
 tbody.innerHTML = renderDimensionRowsHtml(sortDimensions(activeSortMode), activeSortMode);
 }
 const btnSjt = document.getElementById('sortBySjtBtn');
 const btnGame = document.getElementById('sortByGameBtn');
 const btnDelta = document.getElementById('sortByDeltaBtn');
 if (btnSjt && hasSjt) {
 btnSjt.className = `px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider transition-colors ${activeSortMode === 'sjt' ? 'bg-[var(--text-primary)] text-white' : 'text-stone-700 hover:bg-[#e4e1dc]'}`;
 btnSjt.innerHTML = `Written (SJT) ${activeSortMode === 'sjt' ? '&darr;' : ''}`;
 }
 if (btnGame && hasGame) {
 btnGame.className = `px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider transition-colors ${activeSortMode === 'game' ? 'bg-[var(--text-primary)] text-white' : 'text-stone-700 hover:bg-[#e4e1dc]'}`;
 btnGame.innerHTML = `Hands-On (Games) ${activeSortMode === 'game' ? '&darr;' : ''}`;
 }
 if (btnDelta && hasDelta) {
 btnDelta.className = `px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider transition-colors ${activeSortMode === 'delta' ? 'bg-[var(--text-primary)] text-white' : 'text-stone-700 hover:bg-[#e4e1dc]'}`;
 btnDelta.innerHTML = `Difference (&Delta;) ${activeSortMode === 'delta' ? '&darr;' : ''}`;
 }
 const thSjtArrow = document.getElementById('thSjtArrow');
 const thGameArrow = document.getElementById('thGameArrow');
 const thDeltaArrow = document.getElementById('thDeltaArrow');
 if (thSjtArrow) thSjtArrow.innerHTML = activeSortMode === 'sjt' ? '&darr;' : '';
 if (thGameArrow) thGameArrow.innerHTML = activeSortMode === 'game' ? '&darr;' : '';
 if (thDeltaArrow) thDeltaArrow.innerHTML = activeSortMode === 'delta' ? '&darr;' : '';
 };

 if (hasSjt) {
 document.getElementById('sortBySjtBtn')?.addEventListener('click', () => updateTableSort('sjt'));
 document.getElementById('thSjt')?.addEventListener('click', () => updateTableSort('sjt'));
 }
 if (hasGame) {
 document.getElementById('sortByGameBtn')?.addEventListener('click', () => updateTableSort('game'));
 document.getElementById('thGame')?.addEventListener('click', () => updateTableSort('game'));
 }
 if (hasDelta) {
 document.getElementById('sortByDeltaBtn')?.addEventListener('click', () => updateTableSort('delta'));
 document.getElementById('thDelta')?.addEventListener('click', () => updateTableSort('delta'));
 }

 if (window.lucide) window.lucide.createIcons();
 } catch (err) {
 container.innerHTML = `
 <div class="mb-4">
 <button id="backToRegistryErrBtn" class="text-xs uppercase tracking-widest text-black hover:text-[var(--accent-gold)]">&larr; Back to Registry</button>
 </div>
 <div class="p-8 text-center bg-white border border-[var(--grid-border)] space-y-4">
 <div class="text-red-600 font-semibold">Failed to load dossier</div>
 <div class="text-xs text-stone-500 font-mono">${window.escapeHtml(err.message || String(err))}</div>
 <div class="flex justify-center gap-3 pt-2">
 <button id="retryDossierBtn" class="px-4 py-2 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition-colors">Retry</button>
 <button id="recomputeDossierBtn" class="px-4 py-2 bg-[#f4f1ea] border border-[var(--grid-border)] text-xs uppercase tracking-widest hover:bg-[#eae6dc] transition-colors">Re-analyze Telemetry</button>
 </div>
 </div>
 `;
 document.getElementById('backToRegistryErrBtn')?.addEventListener('click', () => loadSessionsList());
 document.getElementById('retryDossierBtn')?.addEventListener('click', () => loadSessionDetail(sessionId, false));
 document.getElementById('recomputeDossierBtn')?.addEventListener('click', () => loadSessionDetail(sessionId, true));
 }
}

window.loadSessionsList = loadSessionsList;
window.loadSessionDetail = loadSessionDetail;
