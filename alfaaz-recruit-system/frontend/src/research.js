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
      return '<span class="text-stone-500 italic">Insufficient observations across both methods to establish an interpretive profile.</span>';
    }

    // Case 2: Only SJT available (Game data pending or insufficient)
    if (sjtVal !== null && gameVal === null) {
      if (sjtVal >= 0.60) {
        return `High situational prioritization (${sjtVal.toFixed(2)}). Candidate deliberately prioritizes <strong>${name}</strong> in scenario trade-offs; awaiting interactive activity telemetry for behavioral verification.`;
      } else if (sjtVal >= 0.40) {
        return `Balanced situational prioritization (${sjtVal.toFixed(2)}). Candidate maintains a moderate baseline in scenario trade-offs; awaiting interactive activity telemetry for behavioral verification.`;
      } else {
        return `Lower situational prioritization (${sjtVal.toFixed(2)}). Candidate allocates lower relative emphasis to <strong>${name}</strong> in scenario trade-offs; awaiting interactive activity telemetry for behavioral verification.`;
      }
    }

    // Case 3: Only Games available (SJT missing)
    if (sjtVal === null && gameVal !== null) {
      if (gameVal >= 0.60) {
        return `Elevated behavioral activity (${gameVal.toFixed(2)}). Candidate demonstrated strong relative engagement in practical tasks; awaiting situational judgment trade-offs for cognitive comparison.`;
      } else if (gameVal >= 0.40) {
        return `Moderate behavioral activity (${gameVal.toFixed(2)}). Candidate demonstrated standard baseline engagement during tasks; awaiting situational judgment trade-offs for cognitive comparison.`;
      } else {
        return `Lower behavioral activity (${gameVal.toFixed(2)}). Candidate demonstrated minimal engagement during interactive tasks; awaiting situational judgment trade-offs for cognitive comparison.`;
      }
    }

    // Case 4: Both methods available - Cross-method triangulation
    const deltaStr = deltaVal !== null ? deltaVal.toFixed(2) : (Math.abs(sjtVal - gameVal)).toFixed(2);
    const confTag = conf === 'SUBSTANTIAL' 
      ? '<span class="text-emerald-700 font-medium"> [High Confidence]</span>' 
      : (conf === 'MODERATE' ? '<span class="text-stone-600"> [Moderate Confidence]</span>' : '<span class="text-amber-700"> [Limited Confidence &middot; Review Holistically]</span>');

    // 4A: ALIGNED (Delta <= 0.15)
    if (rel === 'ALIGNED' || (deltaVal !== null && deltaVal <= 0.15)) {
      if (sjtVal >= 0.55 && gameVal >= 0.55) {
        return `<strong>Strong convergent strength</strong> (&Delta; ${deltaStr}). Candidate places high deliberate value on ${name} and consistently exhibits strong behavioral follow-through during studio tasks.${confTag}`;
      } else if (sjtVal < 0.38 && gameVal < 0.38) {
        return `<strong>Consistently lower emphasis</strong> (&Delta; ${deltaStr}). Candidate consistently selects alternative priorities across both deliberate trade-offs and practical activities.${confTag}`;
      } else {
        return `<strong>Harmonious baseline</strong> (&Delta; ${deltaStr}). Stated judgment trade-offs closely mirror practical simulation behaviors, indicating stable and predictable self-regulation.${confTag}`;
      }
    }

    // 4B: PARTLY_ALIGNED (0.15 < Delta <= 0.30)
    if (rel === 'PARTLY_ALIGNED' || (deltaVal !== null && deltaVal <= 0.30)) {
      if (sjtVal > gameVal) {
        return `<strong>Moderate judgment emphasis</strong> (&Delta; ${deltaStr}). Candidate endorses higher theoretical importance in scenario trade-offs than directly manifested during active simulation tasks.${confTag}`;
      } else {
        return `<strong>Moderate behavioral emphasis</strong> (&Delta; ${deltaStr}). Candidate demonstrated higher practical engagement during active tasks than expressed in verbal judgment choices.${confTag}`;
      }
    }

    // 4C: DIFFERENT (Delta > 0.30)
    if (rel === 'DIFFERENT' || (deltaVal !== null && deltaVal > 0.30)) {
      if (sjtVal > gameVal) {
        return `<strong>Marked cross-method divergence</strong> (&Delta; ${deltaStr}). High stated situational intent contrasts with significantly lower interactive behavioral expression. May indicate aspirational values or hesitation under practical task constraints. Explore during interview.${confTag}`;
      } else {
        return `<strong>Marked cross-method divergence</strong> (&Delta; ${deltaStr}). Candidate instinctively demonstrates high behavioral execution during interactive tasks despite giving it lower priority in deliberate trade-offs. Suggests tacit competence exceeding stated preference. Explore during interview.${confTag}`;
      }
    }

    // Fallback for edge cases
    if (rel === 'NOT_ENOUGH_EVIDENCE') {
      return `<span class="text-stone-500 italic">Inconclusive cross-method evidence (&Delta; ${deltaStr}). Partial observations did not reach evidentiary thresholds for definitive triangulation.${confTag}</span>`;
    }

    return `Provisional profile data. Relative evidence spans SJT (${sjtVal.toFixed(2)}) and Games (${gameVal.toFixed(2)}).${confTag}`;
  };

const dimensionRows = dims.map(d => {
 const relDisp = relBadge(d.relationship);
 const confDisp = d.confidence || 'LIMITED';
 const safeName = window.escapeHtml(d.display_name || d.parameter);
 const sjtRel = (d.sjt && d.sjt.relative !== null && d.sjt.relative !== undefined) ? d.sjt.relative.toFixed(2) : '—';
 const gameRel = (d.game_relative !== null && d.game_relative !== undefined) ? d.game_relative.toFixed(2) : ((d.games && d.games.relative !== null && d.games.relative !== undefined) ? d.games.relative.toFixed(2) : '—');
 const deltaDisp = (d.cross_method_delta !== null && d.cross_method_delta !== undefined) ? d.cross_method_delta.toFixed(2) : '—';
 const obs = window.escapeHtml(d.observed_behavior || '—');
    const interp = getDossierInterpretation(d);

    return `
    <tr class="border-b border-[var(--grid-border)]">
      <td class="p-3 font-medium text-[var(--text-primary)] min-w-[180px]">
        <div>${safeName}</div>
        <div class="text-[10px] text-black mt-0.5">${obs}</div>
      </td>
      <td class="p-3 text-center font-mono text-xs">${sjtRel}</td>
      <td class="p-3 text-center font-mono text-xs">${gameRel}</td>
      <td class="p-3 text-center font-mono text-xs font-semibold">${deltaDisp}</td>
      <td class="p-3 text-center text-xs whitespace-nowrap">${relDisp}</td>
      <td class="p-3 text-center text-[10px] uppercase text-black font-semibold whitespace-nowrap">${confDisp}</td>
      <td class="p-3 text-xs text-[var(--text-primary)] leading-relaxed min-w-[280px]">${interp}</td>
    </tr>
    `;
 }).join('');

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
 <div class="flex justify-between items-baseline mb-3">
 <h3 class="text-xs font-semibold tracking-widest uppercase text-[var(--accent-gold)]">2. Evidence by parameter</h3>
 <span class="text-xs uppercase tracking-wider text-black">Profile Completeness: <strong class="text-[var(--text-primary)]">${completeness}</strong></span>
 </div>
 <div class="overflow-x-auto border border-[var(--grid-border)] bg-white">
 <table class="w-full text-left text-sm">
 <thead class="bg-[#f0eeea] text-xs uppercase tracking-wider text-black">
 <tr>
 <th class="p-3">Dimension & Observed Context</th>
 <th class="p-3 text-center">SJT Rel</th>
 <th class="p-3 text-center">Game Rel</th>
 <th class="p-3 text-center">Delta</th>
 <th class="p-3 text-center">Relationship</th>
 <th class="p-3 text-center">Confidence</th>
                <th class="p-3">Interpretation</th>
              </tr>
 </thead>
 <tbody>
 ${dimensionRows}
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
