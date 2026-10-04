import"./global-DxYxv3W5.js";/* empty css               */document.addEventListener("DOMContentLoaded",async()=>{if(!localStorage.getItem("alfaaz_token")){window.location.href="login.html";return}O(),await h()});function O(){var r;(r=document.getElementById("logoutBtn"))==null||r.addEventListener("click",()=>{localStorage.removeItem("alfaaz_token"),window.location.href="login.html"})}async function h(r=""){var l,p;const i=document.getElementById("researchContent"),x=window.ALFAAZ_API_URL||"";try{const c=localStorage.getItem("alfaaz_token"),o=`${x}/recruit/research/sessions${r?`?status=${encodeURIComponent(r)}`:""}`,a=await fetch(o,{headers:{Authorization:`Bearer ${c}`}});if(a.status===401||a.status===403){alert("Admin clearance required."),window.location.href="login.html";return}const d=await a.json(),b=`
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
    `;if(!d||d.length===0){i.innerHTML=`
        ${b}
        <div class="p-12 text-center text-[var(--text-secondary)] font-serif text-base bg-white border border-[var(--grid-border)] mt-4">
          No recruitment assessment sessions found for this status.
        </div>
      `,(l=document.getElementById("statusFilter"))==null||l.addEventListener("change",t=>{h(t.target.value)});return}const v=d.map(t=>`
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
    `).join("");i.innerHTML=`
      <div class="space-y-4">
        ${b}
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
                ${v}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `,(p=document.getElementById("statusFilter"))==null||p.addEventListener("change",t=>{h(t.target.value)}),i.querySelectorAll(".view-session-btn").forEach(t=>{t.addEventListener("click",()=>{const m=t.getAttribute("data-id");H(m)})}),window.lucide&&window.lucide.createIcons()}catch(c){i.innerHTML=`<div class="p-8 text-center text-red-600">Failed to load sessions: ${c.message}</div>`}}async function H(r){const i=document.getElementById("researchContent"),x=window.ALFAAZ_API_URL||"";try{const l=localStorage.getItem("alfaaz_token"),p=`${x}/recruit/research/sessions/${r}?recompute=true`,c=await fetch(p,{headers:{Authorization:`Bearer ${l}`}});if(!c.ok)throw new Error("Failed to load dossier");const o=await c.json(),a=o.metadata||{},d=a.applicant||{},b=o.measurement_comparisons||{},v=window.escapeHtml(d.full_name||"Candidate"),t=window.escapeHtml(d.email||"—"),m=window.escapeHtml(d.phone_or_contact||"—"),_=a.duration_minutes!==null?`${a.duration_minutes} min`:"In progress",k=o.dimensions||[],E=(o.profile_summary||{}).completeness||"INSUFFICIENT",$=e=>e==="RELATIVELY_STRONG"?'<span class="px-2 py-0.5 bg-[#f5efe6] text-[#8c651e] border border-[#d4be98] text-[10px] font-semibold uppercase tracking-wider">Relatively Strong</span>':e==="RELATIVELY_LOWER"?'<span class="px-2 py-0.5 bg-gray-100 text-gray-500 border border-gray-200 text-[10px] uppercase tracking-wider">Relatively Lower</span>':e==="ABOUT_EQUAL"?'<span class="px-2 py-0.5 bg-gray-100 text-gray-600 border border-gray-300 text-[10px] uppercase tracking-wider">About Equal</span>':e==="RELATIVELY_MIDDLE"?'<span class="px-2 py-0.5 bg-gray-50 text-gray-700 border border-gray-300 text-[10px] uppercase tracking-wider">Relatively Middle</span>':'<span class="px-2 py-0.5 bg-gray-50 text-gray-400 border border-gray-200 text-[10px] uppercase tracking-wider">Insufficient</span>',A=e=>e==="ALIGNED"?'<span class="text-green-700 font-semibold uppercase text-[10px] tracking-wider">Aligned</span>':e==="PARTLY_ALIGNED"?'<span class="text-amber-700 font-semibold uppercase text-[10px] tracking-wider">Partly Aligned</span>':e==="DIFFERENT"?'<span class="text-purple-700 font-semibold uppercase text-[10px] tracking-wider">Different</span>':e==="NOT_ENOUGH_EVIDENCE"?'<span class="text-stone-500 text-[10px]">Not Enough Evidence</span>':'<span class="text-stone-400 text-[10px]">Not Available</span>',T=k.map(e=>{const n=e.profile||{},g=n.relative_score!==null&&n.relative_score!==void 0?`${n.relative_score} / 100`:"—",s=n.relative_rank!==null&&n.relative_rank!==void 0?`#${n.relative_rank}`:"—",u=$(n.relative_level),f=A(e.relationship),R=e.confidence||"LIMITED",C=window.escapeHtml(e.display_name||e.parameter),N=e.sjt&&e.sjt.relative!==null&&e.sjt.relative!==void 0?e.sjt.relative.toFixed(2):"—",S=e.game_relative!==null&&e.game_relative!==void 0?e.game_relative.toFixed(2):e.games&&e.games.relative!==null&&e.games.relative!==void 0?e.games.relative.toFixed(2):"—",B=e.cross_method_delta!==null&&e.cross_method_delta!==void 0?e.cross_method_delta.toFixed(2):"—",F=window.escapeHtml(e.observed_behavior||"—");return`
        <tr class="border-b border-[var(--grid-border)]">
            <td class="p-3 font-medium text-[var(--text-primary)]">
                <div>${C}</div>
                <div class="text-[10px] text-[var(--text-secondary)] mt-0.5">${F}</div>
            </td>
            <td class="p-3 text-center font-mono text-xs">${N}</td>
            <td class="p-3 text-center font-mono text-xs">${S}</td>
            <td class="p-3 text-center font-mono text-xs font-semibold">${B}</td>
            <td class="p-3 text-center text-xs">${f}</td>
            <td class="p-3 text-center text-[10px] uppercase text-[var(--text-secondary)] font-semibold">${R}</td>
            <td class="p-3 text-center font-serif text-sm font-semibold">${g}</td>
            <td class="p-3 text-center font-semibold text-xs">${s}</td>
            <td class="p-3 text-center">${u}</td>
        </tr>
        `}).join(""),L=a.battery_version==="2.0"?"V2 (14-Game Candidate Core)":a.battery_version==="1.0"?"V1 (21-Game Historical Battery)":a.battery_version||"2.0 (Candidate Core)",y=o.task_records||[],D=y.filter(e=>e.battery_role==="candidate_core"||!e.battery_role&&!["F3","A3","C3","E3","Q3","CR2","M3"].includes(e.game_id)),I=y.filter(e=>e.battery_role==="research_bank"||e.battery_role!=="candidate_core"&&["F3","A3","C3","E3","Q3","CR2","M3"].includes(e.game_id)),w=(e,n,g)=>!e||e.length===0?"":`
        <div class="mb-4">
          <div class="flex justify-between items-baseline mb-2">
            <h4 class="text-xs font-semibold tracking-wider uppercase text-[var(--text-primary)] flex items-center gap-2">
              <span class="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider" style="${g}">${n}</span>
              <span>Activities (${e.length})</span>
            </h4>
          </div>
          <div class="overflow-x-auto border border-[var(--grid-border)] bg-white">
            <table class="w-full text-left text-xs">
              <thead class="bg-[#f0eeea] text-[10px] uppercase tracking-wider text-[var(--text-secondary)]">
                <tr>
                  <th class="p-3">Activity</th>
                  <th class="p-3">World</th>
                  <th class="p-3">Status</th>
                  <th class="p-3">Descriptive Behavioral Observation</th>
                </tr>
              </thead>
              <tbody>
                ${e.map(s=>{const u=s.status==="RECORDED"?"background:#eaf5ea; color:#1e6624; border:1px solid #bce0bc;":s.status==="NOT_DERIVED"?"background:#f0eeea; color:var(--text-secondary); border:1px solid var(--grid-border);":"background:#fdf2e9; color:#9c4221; border:1px solid #f0cdb8;",f=s.status==="NOT_DERIVED"?'<span class="text-stone-400 italic">Unattempted &middot; Reserved in Research Bank</span>':window.escapeHtml(s.display_text||"—");return`
                    <tr class="border-b border-[var(--grid-border)]">
                      <td class="p-3 font-semibold text-[var(--text-primary)]">${s.game_id}: ${window.escapeHtml(s.game_name||s.game_id)}</td>
                      <td class="p-3 text-[var(--text-secondary)]">${s.world_id}: ${window.escapeHtml(s.world_name||"")}</td>
                      <td class="p-3"><span class="badge" style="font-size:10px; ${u}">${s.status}</span></td>
                      <td class="p-3 text-[var(--text-secondary)] leading-relaxed">${f}</td>
                    </tr>
                  `}).join("")}
              </tbody>
            </table>
          </div>
        </div>
      `;i.innerHTML=`
      <div class="mb-4">
        <button onclick="loadSessionsList()" class="text-xs uppercase tracking-widest text-[var(--text-secondary)] hover:text-[var(--accent-gold)]">&larr; Back to Registry</button>
      </div>
      
      <div class="bg-[#faf8f5] border border-[var(--grid-border)] p-6 mb-4">
        <h3 class="text-xs font-semibold tracking-widest uppercase text-[var(--accent-gold)] mb-4">1. Candidate & Session Overview</h3>
        <div class="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
          <div><strong class="block text-[var(--text-secondary)] text-xs uppercase tracking-wider mb-1">Name</strong>${v}</div>
          <div><strong class="block text-[var(--text-secondary)] text-xs uppercase tracking-wider mb-1">Email</strong>${t}</div>
          <div><strong class="block text-[var(--text-secondary)] text-xs uppercase tracking-wider mb-1">Contact</strong>${m}</div>
          <div><strong class="block text-[var(--text-secondary)] text-xs uppercase tracking-wider mb-1">Session Duration</strong>${_}</div>
          <div><strong class="block text-[var(--text-secondary)] text-xs uppercase tracking-wider mb-1">Battery Version</strong><span class="badge" style="font-size:10px; background:#f0eeea; color:var(--text-primary); border:1px solid var(--grid-border);">${L}</span></div>
        </div>
      </div>

      <div class="bg-white border-l-4 border-[var(--accent-gold)] border-t border-r border-b border-[var(--grid-border)] p-4 mb-6 text-xs text-[var(--text-secondary)] leading-relaxed">
        <strong class="text-[var(--text-primary)] uppercase tracking-wider">Psychometric Safeguard Notice:</strong>
        This dossier provides a <em>provisional within-person relative profile</em> for exploratory human review only. It reflects the relative emphasis among dimensions for this candidate, NOT normative trait scores, clinical evaluation, or automated hiring recommendations. Cross-method convergence is exploratory; empirical normative calibration is pending.
      </div>

      <div class="mb-6">
        <div class="flex justify-between items-baseline mb-3">
          <h3 class="text-xs font-semibold tracking-widest uppercase text-[var(--accent-gold)]">2. Within-Person Relative Dimension Profile</h3>
          <span class="text-xs uppercase tracking-wider text-[var(--text-secondary)]">Profile Completeness: <strong class="text-[var(--text-primary)]">${E}</strong></span>
        </div>
        <div class="overflow-x-auto border border-[var(--grid-border)] bg-white">
          <table class="w-full text-left text-sm">
            <thead class="bg-[#f0eeea] text-xs uppercase tracking-wider text-[var(--text-secondary)]">
              <tr>
                <th class="p-3">Dimension & Observed Context</th>
                <th class="p-3 text-center">SJT Rel</th>
                <th class="p-3 text-center">Game Rel</th>
                <th class="p-3 text-center">Delta</th>
                <th class="p-3 text-center">Relationship</th>
                <th class="p-3 text-center">Confidence</th>
                <th class="p-3 text-center">Score (0–100)</th>
                <th class="p-3 text-center">Rank</th>
                <th class="p-3 text-center">Profile Position</th>
              </tr>
            </thead>
            <tbody>
              ${T}
            </tbody>
          </table>
        </div>
        <div class="bg-[#fcfbf9] border border-[var(--grid-border)] border-t-0 p-3 text-xs text-[var(--text-secondary)] leading-relaxed">
          <strong class="text-[var(--text-primary)]">Delta is the absolute difference between the candidate's SJT-relative evidence and Game-SJT-relative evidence for this dimension.</strong> Larger Delta indicates greater divergence and reduces evidence confidence. Delta is not a measure of honesty, reliability, or validity.
        </div>
      </div>

      <div class="mb-6">
        <div class="flex justify-between items-baseline mb-3">
          <h3 class="text-xs font-semibold tracking-widest uppercase text-[var(--accent-gold)]">3. Interactive Activity Behavioral Records</h3>
          <span class="text-xs text-[var(--text-secondary)]">${o.task_records_statement||"Descriptive task counts; not a score."}</span>
        </div>
        ${w(D,"Core Battery","background:#eaf5ea; color:#1e6624; border:1px solid #bce0bc;")}
        ${w(I,"Research Bank","background:#f0eeea; color:var(--text-secondary); border:1px solid var(--grid-border);")}
      </div>
    `}catch{i.innerHTML='<div class="p-8 text-center text-red-600">Failed to load dossier.</div>'}}
