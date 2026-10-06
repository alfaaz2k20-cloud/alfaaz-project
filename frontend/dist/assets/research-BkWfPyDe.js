import"./global-DxYxv3W5.js";/* empty css               */document.addEventListener("DOMContentLoaded",async()=>{const a=localStorage.getItem("alfaaz_token"),i=localStorage.getItem("alfaaz_user");if(!a||!i){window.location.href="login.html";return}try{if(JSON.parse(i).status!=="ADMIN"){window.location.href="dashboard.html";return}}catch{localStorage.removeItem("alfaaz_token"),localStorage.removeItem("alfaaz_user"),window.location.href="login.html";return}S(),await f()});function S(){var a;(a=document.getElementById("logoutBtn"))==null||a.addEventListener("click",()=>{localStorage.removeItem("alfaaz_token"),window.location.href="login.html"})}async function f(a=""){var d,l;const i=document.getElementById("researchContent"),c=window.ALFAAZ_API_URL||"";try{const p=localStorage.getItem("alfaaz_token"),b=`${c}/recruit/research/sessions${a?`?status=${encodeURIComponent(a)}`:""}`,o=await fetch(b,{headers:{Authorization:`Bearer ${p}`}});if(o.status===401||o.status===403){alert("Admin clearance required."),window.location.href="login.html";return}const s=await o.json(),n=`
 <div class="flex justify-between items-center bg-white border border-[var(--grid-border)] p-4">
 <div>
 <h2 class="text-lg text-[var(--text-primary)]">Applicant Assessment Records</h2>
 <span class="text-xs text-black">Ordered strictly by submission time</span>
 </div>
 <div class="flex items-center gap-2">
 <label for="statusFilter" class="text-xs uppercase tracking-wider text-black">Session Status:</label>
 <select id="statusFilter" class="px-2 py-1 text-xs border border-[var(--grid-border)] bg-[#faf8f5] text-[var(--text-primary)] focus:outline-none">
 <option value="" ${a===""?"selected":""}>All Operational Statuses</option>
 <option value="CONSENTED" ${a==="CONSENTED"?"selected":""}>Consented</option>
 <option value="SJT" ${a==="SJT"?"selected":""}>SJT</option>
 <option value="ACTIVE" ${a==="ACTIVE"?"selected":""}>Active (Games)</option>
 <option value="COMPLETE" ${a==="COMPLETE"?"selected":""}>Complete</option>
 </select>
 </div>
 </div>
 `;if(!s||s.length===0){i.innerHTML=`
 ${n}
 <div class="p-12 text-center text-black text-base bg-white border border-[var(--grid-border)] mt-4">
 No recruitment assessment sessions found for this status.
 </div>
 `,(d=document.getElementById("statusFilter"))==null||d.addEventListener("change",t=>{f(t.target.value)});return}const h=s.map(t=>`
 <tr class="border-b border-[var(--grid-border)] hover:bg-[#faf8f5] ">
 <td class="p-4 text-sm font-medium text-[var(--text-primary)]">${t.full_name}</td>
 <td class="p-4 text-xs text-black">${t.email}</td>
 <td class="p-4 text-xs text-black">${t.created_at?new Date(t.created_at).toLocaleString():"—"}</td>
 <td class="p-4 text-xs">
 <span class="px-2 py-0.5 bg-[#f4f1ea] border border-[var(--grid-border)] text-[10px] uppercase tracking-wider">${t.status}</span>
 </td>
 <td class="p-4 text-right">
 <button class="view-session-btn px-3 py-1 bg-[var(--text-primary)] text-white text-[10px] uppercase tracking-widest hover:bg-[var(--accent-gold)] " data-id="${t.session_id}">
 View Evidence &rarr;
 </button>
 </td>
 </tr>
 `).join("");i.innerHTML=`
 <div class="space-y-4">
 ${n}
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
 ${h}
 </tbody>
 </table>
 </div>
 </div>
 </div>
 `,(l=document.getElementById("statusFilter"))==null||l.addEventListener("change",t=>{f(t.target.value)}),i.querySelectorAll(".view-session-btn").forEach(t=>{t.addEventListener("click",()=>{const x=t.getAttribute("data-id");N(x)})}),window.lucide&&window.lucide.createIcons()}catch(p){i.innerHTML=`<div class="p-8 text-center text-red-600">Failed to load sessions: ${p.message}</div>`}}async function N(a){var d;const i=document.getElementById("researchContent"),c=window.ALFAAZ_API_URL||"";try{const l=localStorage.getItem("alfaaz_token"),p=`${c}/recruit/research/sessions/${a}?recompute=true`,b=await fetch(p,{headers:{Authorization:`Bearer ${l}`}});if(!b.ok)throw new Error("Failed to load dossier");const o=await b.json(),s=o.metadata||{},n=s.applicant||{},h=o.measurement_comparisons||{},t=window.escapeHtml(n.full_name||"Candidate"),x=window.escapeHtml(n.email||"—"),k=window.escapeHtml(n.phone_or_contact||"—"),_=s.duration_minutes!==null?`${s.duration_minutes} min`:"In progress",E=o.dimensions||[],$=(o.profile_summary||{}).completeness||"INSUFFICIENT",O=e=>e==="RELATIVELY_STRONG"?'<span class="px-2 py-0.5 bg-[#f5efe6] text-[#8c651e] border border-[#d4be98] text-[10px] font-semibold uppercase tracking-wider">Relatively Strong</span>':e==="RELATIVELY_LOWER"?'<span class="px-2 py-0.5 bg-gray-100 text-black border border-gray-200 text-[10px] uppercase tracking-wider">Relatively Lower</span>':e==="ABOUT_EQUAL"?'<span class="px-2 py-0.5 bg-gray-100 text-gray-600 border border-gray-300 text-[10px] uppercase tracking-wider">About Equal</span>':e==="RELATIVELY_MIDDLE"?'<span class="px-2 py-0.5 bg-gray-50 text-gray-700 border border-gray-300 text-[10px] uppercase tracking-wider">Relatively Middle</span>':'<span class="px-2 py-0.5 bg-gray-50 text-black border border-gray-200 text-[10px] uppercase tracking-wider">Insufficient</span>',A=e=>e==="ALIGNED"?'<span class="text-green-700 font-semibold uppercase text-[10px] tracking-wider">Aligned</span>':e==="PARTLY_ALIGNED"?'<span class="text-[var(--text-primary)] font-semibold uppercase text-[10px] tracking-wider">Partly Aligned</span>':e==="DIFFERENT"?'<span class="text-purple-700 font-semibold uppercase text-[10px] tracking-wider">Different</span>':e==="NOT_ENOUGH_EVIDENCE"?'<span class="text-stone-500 text-[10px]">Not Enough Evidence</span>':'<span class="text-black text-[10px]">Not Available</span>',I=E.map(e=>{const m=A(e.relationship),g=e.confidence||"LIMITED",r=window.escapeHtml(e.display_name||e.parameter),v=e.sjt&&e.sjt.relative!==null&&e.sjt.relative!==void 0?e.sjt.relative.toFixed(2):"—",u=e.game_relative!==null&&e.game_relative!==void 0?e.game_relative.toFixed(2):e.games&&e.games.relative!==null&&e.games.relative!==void 0?e.games.relative.toFixed(2):"—",R=e.cross_method_delta!==null&&e.cross_method_delta!==void 0?e.cross_method_delta.toFixed(2):"—",C=window.escapeHtml(e.observed_behavior||"—");return`
 <tr class="border-b border-[var(--grid-border)]">
 <td class="p-3 font-medium text-[var(--text-primary)]">
 <div>${r}</div>
 <div class="text-[10px] text-black mt-0.5">${C}</div>
 </td>
 <td class="p-3 text-center font-mono text-xs">${v}</td>
 <td class="p-3 text-center font-mono text-xs">${u}</td>
 <td class="p-3 text-center font-mono text-xs font-semibold">${R}</td>
 <td class="p-3 text-center text-xs">${m}</td>
 <td class="p-3 text-center text-[10px] uppercase text-black font-semibold">${g}</td>
 </tr>
 `}).join(""),T=s.battery_version==="2.0"?"V2 (14-Game Candidate Core)":s.battery_version==="1.0"?"V1 (21-Game Historical Battery)":s.battery_version||"2.0 (Candidate Core)",w=o.task_records||[],L=w.filter(e=>e.battery_role==="candidate_core"||!e.battery_role&&!["F3","A3","C3","E3","Q3","CR2","M3"].includes(e.game_id)),D=w.filter(e=>e.battery_role==="research_bank"||e.battery_role!=="candidate_core"&&["F3","A3","C3","E3","Q3","CR2","M3"].includes(e.game_id)),y=(e,m,g)=>!e||e.length===0?"":`
 <div class="mb-4">
 <div class="flex justify-between items-baseline mb-2">
 <h4 class="text-xs font-semibold tracking-wider uppercase text-[var(--text-primary)] flex items-center gap-2">
 <span class="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider" style="${g}">${m}</span>
 <span>Activities (${e.length})</span>
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
 ${e.map(r=>{const v=r.status==="RECORDED"?"background:#eaf5ea; color:#1e6624; border:1px solid #bce0bc;":r.status==="NOT_DERIVED"?"background:#f0eeea; color:var(--text-secondary); border:1px solid var(--grid-border);":"background:#fdf2e9; color:#9c4221; border:1px solid #f0cdb8;",u=r.status==="NOT_DERIVED"?'<span class="text-black italic">Unattempted &middot; Reserved in Research Bank</span>':window.escapeHtml(r.display_text||"—");return`
 <tr class="border-b border-[var(--grid-border)]">
 <td class="p-3 font-semibold text-[var(--text-primary)]">${r.game_id}: ${window.escapeHtml(r.game_name||r.game_id)}</td>
 <td class="p-3 text-black">${r.world_id}: ${window.escapeHtml(r.world_name||"")}</td>
 <td class="p-3"><span class="badge" style="font-size:10px; ${v}">${r.status}</span></td>
 <td class="p-3 text-black leading-relaxed">${u}</td>
 </tr>
 `}).join("")}
 </tbody>
 </table>
 </div>
 </div>
 `;i.innerHTML=`
 <div class="mb-4">
 <button onclick="loadSessionsList()" class="text-xs uppercase tracking-widest text-black hover:text-[var(--accent-gold)]">&larr; Back to Registry</button>
 </div>
 
 <div class="bg-[#faf8f5] border border-[var(--grid-border)] p-6 mb-4">
 <h3 class="text-xs font-semibold tracking-widest uppercase text-[var(--accent-gold)] mb-4">1. Candidate & Session Overview</h3>
 <div class="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
 <div><strong class="block text-black text-xs uppercase tracking-wider mb-1">Name</strong>${t}</div>
 <div><strong class="block text-black text-xs uppercase tracking-wider mb-1">Email</strong>${x}</div>
 <div><strong class="block text-black text-xs uppercase tracking-wider mb-1">Contact</strong>${k}</div>
 <div><strong class="block text-black text-xs uppercase tracking-wider mb-1">Session Duration</strong>${_}</div>
 <div><strong class="block text-black text-xs uppercase tracking-wider mb-1">Battery Version</strong><span class="badge" style="font-size:10px; background:#f0eeea; color:var(--text-primary); border:1px solid var(--grid-border);">${T}</span></div>
 </div>
 </div>

 <div class="bg-white border-l-4 border-[var(--accent-gold)] border-t border-r border-b border-[var(--grid-border)] p-4 mb-6 text-xs text-black leading-relaxed">
 <strong class="text-[var(--text-primary)] uppercase tracking-wider">Psychometric Safeguard Notice:</strong>
 This dossier provides a <em>provisional within-person relative profile</em> for exploratory human review only. It reflects the relative emphasis among dimensions for this candidate, NOT normative trait scores, clinical evaluation, or automated hiring decisions. Cross-method convergence is exploratory; empirical normative calibration is pending.
 <div class="mt-2 text-[11px] text-[var(--text-secondary)] italic">${((d=s.safeguards)==null?void 0:d.sjt_emphasis_note)||"Relative emphasis in this SJT's trade-offs: higher / middle / lower."}</div>
 </div>

 <div class="mb-6">
 <div class="flex justify-between items-baseline mb-3">
 <h3 class="text-xs font-semibold tracking-widest uppercase text-[var(--accent-gold)]">2. Evidence by parameter</h3>
 <span class="text-xs uppercase tracking-wider text-black">Profile Completeness: <strong class="text-[var(--text-primary)]">${$}</strong></span>
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
 </tr>
 </thead>
 <tbody>
 ${I}
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
 <span class="text-xs text-black">${o.task_records_statement||"Descriptive task counts; not a score."}</span>
 </div>
 ${y(L,"Core Battery","background:#eaf5ea; color:#1e6624; border:1px solid #bce0bc;")}
 ${y(D,"Research Bank","background:#f0eeea; color:var(--text-secondary); border:1px solid var(--grid-border);")}
 </div>
 `}catch{i.innerHTML='<div class="p-8 text-center text-red-600">Failed to load dossier.</div>'}}
