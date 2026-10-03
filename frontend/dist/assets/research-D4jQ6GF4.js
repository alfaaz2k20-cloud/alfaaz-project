import"./global-DxYxv3W5.js";/* empty css               */document.addEventListener("DOMContentLoaded",async()=>{if(!localStorage.getItem("alfaaz_token")){window.location.href="login.html";return}T(),await g()});function T(){var r;(r=document.getElementById("logoutBtn"))==null||r.addEventListener("click",()=>{localStorage.removeItem("alfaaz_token"),window.location.href="login.html"})}async function g(r=""){var d,l;const s=document.getElementById("researchContent"),p=window.ALFAAZ_API_URL||"";try{const i=localStorage.getItem("alfaaz_token"),c=`${p}/recruit/research/sessions${r?`?status=${encodeURIComponent(r)}`:""}`,a=await fetch(c,{headers:{Authorization:`Bearer ${i}`}});if(a.status===401||a.status===403){alert("Admin clearance required."),window.location.href="login.html";return}const n=await a.json(),x=`
      <div class="flex justify-between items-center bg-white border border-[var(--grid-border)] p-4">
        <div>
          <h2 class="text-lg font-serif text-[var(--text-primary)]">Applicant Assessment Records</h2>
          <span class="text-xs text-[var(--text-secondary)]">Ordered strictly by submission time</span>
        </div>
        <div class="flex items-center gap-2">
          <label for="statusFilter" class="text-xs uppercase tracking-wider text-[var(--text-secondary)]">Session Status:</label>
          <select id="statusFilter" class="px-2 py-1 text-xs border border-[var(--grid-border)] bg-[#faf8f5] text-[var(--text-primary)] focus:outline-none">
            <option value="" ${r===""?"selected":""}>All Operational Statuses</option>
            <option value="CONSENTED" ${r==="CONSENTED"?"selected":""}>Consented</option>
            <option value="SJT" ${r==="SJT"?"selected":""}>SJT</option>
            <option value="ACTIVE" ${r==="ACTIVE"?"selected":""}>Active (Games)</option>
            <option value="COMPLETE" ${r==="COMPLETE"?"selected":""}>Complete</option>
          </select>
        </div>
      </div>
    `;if(!n||n.length===0){s.innerHTML=`
        ${x}
        <div class="p-12 text-center text-[var(--text-secondary)] font-serif text-base bg-white border border-[var(--grid-border)] mt-4">
          No recruitment assessment sessions found for this status.
        </div>
      `,(d=document.getElementById("statusFilter"))==null||d.addEventListener("change",t=>{g(t.target.value)});return}const m=n.map(t=>`
      <tr class="border-b border-[var(--grid-border)] hover:bg-[#faf8f5] transition">
        <td class="p-4 font-serif text-sm font-medium text-[var(--text-primary)]">${t.full_name}</td>
        <td class="p-4 text-xs text-[var(--text-secondary)]">${t.email}</td>
        <td class="p-4 text-xs text-[var(--text-secondary)]">${t.created_at?new Date(t.created_at).toLocaleString():"—"}</td>
        <td class="p-4 text-xs">
          <span class="px-2 py-0.5 bg-[#f4f1ea] border border-[var(--grid-border)] text-[10px] uppercase tracking-wider">${t.status}</span>
        </td>
        <td class="p-4 text-right">
          <button class="view-session-btn px-3 py-1 bg-[var(--text-primary)] text-white text-[10px] uppercase tracking-widest hover:bg-[var(--accent-gold)] transition" data-id="${t.session_id}">
            View Evidence &rarr;
          </button>
        </td>
      </tr>
    `).join("");s.innerHTML=`
      <div class="space-y-4">
        ${x}
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
                ${m}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `,(l=document.getElementById("statusFilter"))==null||l.addEventListener("change",t=>{g(t.target.value)}),s.querySelectorAll(".view-session-btn").forEach(t=>{t.addEventListener("click",()=>{const v=t.getAttribute("data-id");D(v)})}),window.lucide&&window.lucide.createIcons()}catch(i){s.innerHTML=`<div class="p-8 text-center text-red-600">Failed to load sessions: ${i.message}</div>`}}async function D(r){const s=document.getElementById("researchContent"),p=window.ALFAAZ_API_URL||"";try{const d=localStorage.getItem("alfaaz_token"),l=`${p}/recruit/research/sessions/${r}`,i=await fetch(l,{headers:{Authorization:`Bearer ${d}`}});if(!i.ok)throw new Error("Failed to load dossier");const c=await i.json(),a=c.metadata||{},n=a.applicant||{},x=c.measurement_comparisons||{},m=window.escapeHtml(n.full_name||"Candidate"),t=window.escapeHtml(n.email||"—"),v=window.escapeHtml(n.phone_or_contact||"—"),b=a.duration_minutes!==null?`${a.duration_minutes} min`:"In progress",u=c.dimensions||[],f=(c.profile_summary||{}).completeness||"INSUFFICIENT",h=e=>e==="RELATIVELY_STRONG"?'<span class="px-2 py-0.5 bg-[#f5efe6] text-[#8c651e] border border-[#d4be98] text-[10px] font-semibold uppercase tracking-wider">Relatively Strong</span>':e==="RELATIVELY_LOWER"?'<span class="px-2 py-0.5 bg-gray-100 text-gray-500 border border-gray-200 text-[10px] uppercase tracking-wider">Relatively Lower</span>':e==="ABOUT_EQUAL"?'<span class="px-2 py-0.5 bg-gray-100 text-gray-600 border border-gray-300 text-[10px] uppercase tracking-wider">About Equal</span>':e==="RELATIVELY_MIDDLE"?'<span class="px-2 py-0.5 bg-gray-50 text-gray-700 border border-gray-300 text-[10px] uppercase tracking-wider">Relatively Middle</span>':'<span class="px-2 py-0.5 bg-gray-50 text-gray-400 border border-gray-200 text-[10px] uppercase tracking-wider">Insufficient</span>',y=e=>e==="ALIGNED"?'<span class="text-green-700 font-medium">Aligned</span>':e==="PARTLY_ALIGNED"?'<span class="text-amber-700 font-medium">Partly Aligned</span>':e==="DIFFERENT"?'<span class="text-purple-700 font-medium">Divergent</span>':e==="NOT_ENOUGH_EVIDENCE"?'<span class="text-gray-500">Awaiting Data</span>':'<span class="text-gray-400">Not Available</span>',w=u.map(e=>{const o=e.profile||{},E=o.relative_score!==null&&o.relative_score!==void 0?`${o.relative_score} / 100`:"—",k=o.relative_rank!==null&&o.relative_rank!==void 0?`#${o.relative_rank}`:"—",$=h(o.relative_level),L=y(e.relationship),_=e.confidence||"LIMITED",A=window.escapeHtml(e.display_name||e.parameter),I=window.escapeHtml(e.observed_behavior||"—");return`
        <tr class="border-b border-[var(--grid-border)]">
            <td class="p-3 font-medium text-[var(--text-primary)]">
                <div>${A}</div>
                <div class="text-[10px] text-[var(--text-secondary)] mt-0.5">${I}</div>
            </td>
            <td class="p-3 text-center font-semibold text-xs">${k}</td>
            <td class="p-3 text-center font-serif text-sm font-semibold">${E}</td>
            <td class="p-3 text-center">${$}</td>
            <td class="p-3 text-center text-xs">${L}</td>
            <td class="p-3 text-center text-[10px] uppercase text-[var(--text-secondary)]">${_}</td>
        </tr>
        `}).join("");s.innerHTML=`
      <div class="mb-4">
        <button onclick="loadSessionsList()" class="text-xs uppercase tracking-widest text-[var(--text-secondary)] hover:text-[var(--accent-gold)]">&larr; Back to Registry</button>
      </div>
      
      <div class="bg-[#faf8f5] border border-[var(--grid-border)] p-6 mb-4">
        <h3 class="text-xs font-semibold tracking-widest uppercase text-[var(--accent-gold)] mb-4">1. Candidate & Session Overview</h3>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div><strong class="block text-[var(--text-secondary)] text-xs uppercase tracking-wider mb-1">Name</strong>${m}</div>
          <div><strong class="block text-[var(--text-secondary)] text-xs uppercase tracking-wider mb-1">Email</strong>${t}</div>
          <div><strong class="block text-[var(--text-secondary)] text-xs uppercase tracking-wider mb-1">Contact</strong>${v}</div>
          <div><strong class="block text-[var(--text-secondary)] text-xs uppercase tracking-wider mb-1">Session Duration</strong>${b}</div>
        </div>
      </div>

      <div class="bg-white border-l-4 border-[var(--accent-gold)] border-t border-r border-b border-[var(--grid-border)] p-4 mb-6 text-xs text-[var(--text-secondary)] leading-relaxed">
        <strong class="text-[var(--text-primary)] uppercase tracking-wider">Psychometric Safeguard Notice:</strong>
        This dossier provides a <em>provisional within-person relative profile</em> for exploratory human review only. It reflects the relative emphasis among dimensions for this candidate, NOT normative trait scores, clinical evaluation, or automated hiring recommendations. Cross-method convergence is exploratory; empirical normative calibration is pending.
      </div>

      <div class="mb-6">
        <div class="flex justify-between items-baseline mb-3">
          <h3 class="text-xs font-semibold tracking-widest uppercase text-[var(--accent-gold)]">2. Within-Person Relative Dimension Profile</h3>
          <span class="text-xs uppercase tracking-wider text-[var(--text-secondary)]">Profile Completeness: <strong class="text-[var(--text-primary)]">${f}</strong></span>
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
              ${w}
            </tbody>
          </table>
        </div>
      </div>
    `}catch{s.innerHTML='<div class="p-8 text-center text-red-600">Failed to load dossier.</div>'}}
