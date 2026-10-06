import"./global-BiS7FSLa.js";document.addEventListener("DOMContentLoaded",async()=>{const r=localStorage.getItem("alfaaz_token"),s=localStorage.getItem("alfaaz_user");if(!r||!s){window.location.href="login.html";return}try{if(JSON.parse(s).status!=="ADMIN"){window.location.href="dashboard.html";return}}catch{localStorage.removeItem("alfaaz_token"),localStorage.removeItem("alfaaz_user"),window.location.href="login.html";return}z(),await c()});function z(){var r;(r=document.getElementById("logoutBtn"))==null||r.addEventListener("click",()=>{localStorage.removeItem("alfaaz_token"),window.location.href="login.html"})}async function c(r=""){var u,x;const s=document.getElementById("researchContent"),o=window.ALFAAZ_API_URL||"https://alfaaz-project.onrender.com";try{const d=localStorage.getItem("alfaaz_token"),f=`${o}/recruit/research/sessions${r?`?status=${encodeURIComponent(r)}`:""}`,l=await fetch(f,{headers:{Authorization:`Bearer ${d}`}});if(l.status===401||l.status===403){alert("Admin clearance required."),window.location.href="login.html";return}const p=await l.json(),g=`
 <div class="flex justify-between items-center bg-white border border-[var(--grid-border)] p-4">
 <div>
 <h2 class="text-lg text-[var(--text-primary)]">Applicant Assessment Records</h2>
 <span class="text-xs text-black">Ordered strictly by submission time</span>
 </div>
 <div class="flex items-center gap-2">
 <label for="statusFilter" class="text-xs uppercase tracking-wider text-black">Session Status:</label>
 <select id="statusFilter" class="px-2 py-1 text-xs border border-[var(--grid-border)] bg-[#faf8f5] text-[var(--text-primary)] focus:outline-none">
 <option value="" ${r===""?"selected":""}>All Operational Statuses</option>
 <option value="CONSENTED" ${r==="CONSENTED"?"selected":""}>Consented</option>
 <option value="SJT" ${r==="SJT"?"selected":""}>SJT</option>
 <option value="ACTIVE" ${r==="ACTIVE"?"selected":""}>Active (Games)</option>
 <option value="COMPLETE" ${r==="COMPLETE"?"selected":""}>Complete</option>
 </select>
 </div>
 </div>
 `;if(!p||p.length===0){s.innerHTML=`
 ${g}
 <div class="p-12 text-center text-black text-base bg-white border border-[var(--grid-border)] mt-4">
 No recruitment assessment sessions found for this status.
 </div>
 `,(u=document.getElementById("statusFilter"))==null||u.addEventListener("change",t=>{c(t.target.value)});return}const h=p.map(t=>`
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
 `).join("");s.innerHTML=`
 <div class="space-y-4">
 ${g}
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
 `,(x=document.getElementById("statusFilter"))==null||x.addEventListener("change",t=>{c(t.target.value)}),s.querySelectorAll(".view-session-btn").forEach(t=>{t.addEventListener("click",()=>{const y=t.getAttribute("data-id");v(y)})}),window.lucide&&window.lucide.createIcons()}catch(d){s.innerHTML=`<div class="p-8 text-center text-red-600">Failed to load sessions: ${d.message}</div>`}}async function v(r,s=!1){var x,d,f,l,p,g,h;const o=document.getElementById("researchContent"),u=window.ALFAAZ_API_URL||"https://alfaaz-project.onrender.com";o.innerHTML=`
 <div class="mb-4">
 <button id="backToRegistryLoadingBtn" class="text-xs uppercase tracking-widest text-black hover:text-[var(--accent-gold)]">&larr; Back to Registry</button>
 </div>
 <div class="p-12 text-center text-[var(--text-secondary)] font-serif text-lg bg-white border border-[var(--grid-border)]">
 Loading applicant dossier${s?" (re-analyzing telemetry)...":"..."}
 </div>
 `,(x=document.getElementById("backToRegistryLoadingBtn"))==null||x.addEventListener("click",()=>c());try{const t=localStorage.getItem("alfaaz_token"),y=`${u}/recruit/research/sessions/${r}${s?"?recompute=true":""}`,m=await fetch(y,{headers:{Authorization:`Bearer ${t}`}});if(!m.ok){let e=m.statusText;try{const i=await m.json();i&&i.detail&&(e=i.detail)}catch{}throw new Error(`HTTP ${m.status}: ${e}`)}const b=await m.json(),n=b.metadata||{},w=n.applicant||{},M=b.measurement_comparisons||{},L=window.escapeHtml(w.full_name||"Candidate"),I=window.escapeHtml(w.email||"—"),R=window.escapeHtml(w.phone_or_contact||"—"),B=n.duration_minutes!==null?`${n.duration_minutes} min`:"In progress",A=b.dimensions||[],D=(b.profile_summary||{}).completeness||"INSUFFICIENT",P=e=>e==="RELATIVELY_STRONG"?'<span class="px-2 py-0.5 bg-[#f5efe6] text-[#8c651e] border border-[#d4be98] text-[10px] font-semibold uppercase tracking-wider">Relatively Strong</span>':e==="RELATIVELY_LOWER"?'<span class="px-2 py-0.5 bg-gray-100 text-black border border-gray-200 text-[10px] uppercase tracking-wider">Relatively Lower</span>':e==="ABOUT_EQUAL"?'<span class="px-2 py-0.5 bg-gray-100 text-gray-600 border border-gray-300 text-[10px] uppercase tracking-wider">About Equal</span>':e==="RELATIVELY_MIDDLE"?'<span class="px-2 py-0.5 bg-gray-50 text-gray-700 border border-gray-300 text-[10px] uppercase tracking-wider">Relatively Middle</span>':'<span class="px-2 py-0.5 bg-gray-50 text-black border border-gray-200 text-[10px] uppercase tracking-wider">Insufficient</span>',C=e=>e==="ALIGNED"?'<span class="text-green-700 font-semibold uppercase text-[10px] tracking-wider">Aligned</span>':e==="PARTLY_ALIGNED"?'<span class="text-[var(--text-primary)] font-semibold uppercase text-[10px] tracking-wider">Partly Aligned</span>':e==="DIFFERENT"?'<span class="text-purple-700 font-semibold uppercase text-[10px] tracking-wider">Different</span>':e==="NOT_ENOUGH_EVIDENCE"?'<span class="text-stone-500 text-[10px]">Not Enough Evidence</span>':'<span class="text-black text-[10px]">Not Available</span>',S=A.map(e=>{const i=C(e.relationship),k=e.confidence||"LIMITED",a=window.escapeHtml(e.display_name||e.parameter),E=e.sjt&&e.sjt.relative!==null&&e.sjt.relative!==void 0?e.sjt.relative.toFixed(2):"—",_=e.game_relative!==null&&e.game_relative!==void 0?e.game_relative.toFixed(2):e.games&&e.games.relative!==null&&e.games.relative!==void 0?e.games.relative.toFixed(2):"—",H=e.cross_method_delta!==null&&e.cross_method_delta!==void 0?e.cross_method_delta.toFixed(2):"—",F=window.escapeHtml(e.observed_behavior||"—");return`
 <tr class="border-b border-[var(--grid-border)]">
 <td class="p-3 font-medium text-[var(--text-primary)]">
 <div>${a}</div>
 <div class="text-[10px] text-black mt-0.5">${F}</div>
 </td>
 <td class="p-3 text-center font-mono text-xs">${E}</td>
 <td class="p-3 text-center font-mono text-xs">${_}</td>
 <td class="p-3 text-center font-mono text-xs font-semibold">${H}</td>
 <td class="p-3 text-center text-xs">${i}</td>
 <td class="p-3 text-center text-[10px] uppercase text-black font-semibold">${k}</td>
 </tr>
 `}).join(""),N=n.battery_version==="2.0"?"V2 (14-Game Candidate Core)":n.battery_version==="1.0"?"V1 (21-Game Historical Battery)":n.battery_version||"2.0 (Candidate Core)",$=b.task_records||[],j=$.filter(e=>e.battery_role==="candidate_core"||!e.battery_role&&!["F3","A3","C3","E3","Q3","CR2","M3"].includes(e.game_id)),O=$.filter(e=>e.battery_role==="research_bank"||e.battery_role!=="candidate_core"&&["F3","A3","C3","E3","Q3","CR2","M3"].includes(e.game_id)),T=(e,i,k)=>!e||e.length===0?"":`
 <div class="mb-4">
 <div class="flex justify-between items-baseline mb-2">
 <h4 class="text-xs font-semibold tracking-wider uppercase text-[var(--text-primary)] flex items-center gap-2">
 <span class="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider" style="${k}">${i}</span>
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
 ${e.map(a=>{const E=a.status==="RECORDED"?"background:#eaf5ea; color:#1e6624; border:1px solid #bce0bc;":a.status==="NOT_DERIVED"?"background:#f0eeea; color:var(--text-secondary); border:1px solid var(--grid-border);":"background:#fdf2e9; color:#9c4221; border:1px solid #f0cdb8;",_=a.status==="NOT_DERIVED"?'<span class="text-black italic">Unattempted &middot; Reserved in Research Bank</span>':window.escapeHtml(a.display_text||"—");return`
 <tr class="border-b border-[var(--grid-border)]">
 <td class="p-3 font-semibold text-[var(--text-primary)]">${a.game_id}: ${window.escapeHtml(a.game_name||a.game_id)}</td>
 <td class="p-3 text-black">${a.world_id}: ${window.escapeHtml(a.world_name||"")}</td>
 <td class="p-3"><span class="badge" style="font-size:10px; ${E}">${a.status}</span></td>
 <td class="p-3 text-black leading-relaxed">${_}</td>
 </tr>
 `}).join("")}
 </tbody>
 </table>
 </div>
 </div>
 `;o.innerHTML=`
 <div class="mb-4 flex justify-between items-center">
 <button id="backToRegistryBtn" class="text-xs uppercase tracking-widest text-black hover:text-[var(--accent-gold)]">&larr; Back to Registry</button>
 <button id="recomputeTelemetryBtn" class="px-3 py-1 bg-[#f4f1ea] border border-[var(--grid-border)] text-[10px] uppercase tracking-wider hover:bg-[#eae6dc] transition-colors">
 Re-analyze Telemetry
 </button>
 </div>
 
 <div class="bg-[#faf8f5] border border-[var(--grid-border)] p-6 mb-4">
 <h3 class="text-xs font-semibold tracking-widest uppercase text-[var(--accent-gold)] mb-4">1. Candidate & Session Overview</h3>
 <div class="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
 <div><strong class="block text-black text-xs uppercase tracking-wider mb-1">Name</strong>${L}</div>
 <div><strong class="block text-black text-xs uppercase tracking-wider mb-1">Email</strong>${I}</div>
 <div><strong class="block text-black text-xs uppercase tracking-wider mb-1">Contact</strong>${R}</div>
 <div><strong class="block text-black text-xs uppercase tracking-wider mb-1">Session Duration</strong>${B}</div>
 <div><strong class="block text-black text-xs uppercase tracking-wider mb-1">Battery Version</strong><span class="badge" style="font-size:10px; background:#f0eeea; color:var(--text-primary); border:1px solid var(--grid-border);">${N}</span></div>
 </div>
 </div>

 <div class="bg-white border-l-4 border-[var(--accent-gold)] border-t border-r border-b border-[var(--grid-border)] p-4 mb-6 text-xs text-black leading-relaxed">
 <strong class="text-[var(--text-primary)] uppercase tracking-wider">Psychometric Safeguard Notice:</strong>
 This dossier provides a <em>provisional within-person relative profile</em> for exploratory human review only. It reflects the relative emphasis among dimensions for this candidate, NOT normative trait scores, clinical evaluation, or automated hiring decisions. Cross-method convergence is exploratory; empirical normative calibration is pending.
 <div class="mt-2 text-[11px] text-[var(--text-secondary)] italic">${((d=n.safeguards)==null?void 0:d.sjt_emphasis_note)||"Relative emphasis in this SJT's trade-offs: higher / middle / lower."}</div>
 </div>

 <div class="mb-6">
 <div class="flex justify-between items-baseline mb-3">
 <h3 class="text-xs font-semibold tracking-widest uppercase text-[var(--accent-gold)]">2. Evidence by parameter</h3>
 <span class="text-xs uppercase tracking-wider text-black">Profile Completeness: <strong class="text-[var(--text-primary)]">${D}</strong></span>
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
 ${S}
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
 <span class="text-xs text-black">${b.task_records_statement||"Descriptive task counts; not a score."}</span>
 </div>
 ${T(j,"Core Battery","background:#eaf5ea; color:#1e6624; border:1px solid #bce0bc;")}
 ${T(O,"Research Bank","background:#f0eeea; color:var(--text-secondary); border:1px solid var(--grid-border);")}
 </div>
 `,(f=document.getElementById("backToRegistryBtn"))==null||f.addEventListener("click",()=>c()),(l=document.getElementById("recomputeTelemetryBtn"))==null||l.addEventListener("click",()=>v(r,!0)),window.lucide&&window.lucide.createIcons()}catch(t){o.innerHTML=`
 <div class="mb-4">
 <button id="backToRegistryErrBtn" class="text-xs uppercase tracking-widest text-black hover:text-[var(--accent-gold)]">&larr; Back to Registry</button>
 </div>
 <div class="p-8 text-center bg-white border border-[var(--grid-border)] space-y-4">
 <div class="text-red-600 font-semibold">Failed to load dossier</div>
 <div class="text-xs text-stone-500 font-mono">${window.escapeHtml(t.message||String(t))}</div>
 <div class="flex justify-center gap-3 pt-2">
 <button id="retryDossierBtn" class="px-4 py-2 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition-colors">Retry</button>
 <button id="recomputeDossierBtn" class="px-4 py-2 bg-[#f4f1ea] border border-[var(--grid-border)] text-xs uppercase tracking-widest hover:bg-[#eae6dc] transition-colors">Re-analyze Telemetry</button>
 </div>
 </div>
 `,(p=document.getElementById("backToRegistryErrBtn"))==null||p.addEventListener("click",()=>c()),(g=document.getElementById("retryDossierBtn"))==null||g.addEventListener("click",()=>v(r,!1)),(h=document.getElementById("recomputeDossierBtn"))==null||h.addEventListener("click",()=>v(r,!0))}}window.loadSessionsList=c;window.loadSessionDetail=v;
