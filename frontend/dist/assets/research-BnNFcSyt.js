import"./global-DxYxv3W5.js";/* empty css               */document.addEventListener("DOMContentLoaded",async()=>{if(!localStorage.getItem("alfaaz_token")){window.location.href="login.html";return}O(),await h()});function O(){var a;(a=document.getElementById("logoutBtn"))==null||a.addEventListener("click",()=>{localStorage.removeItem("alfaaz_token"),window.location.href="login.html"})}async function h(a=""){var l,p;const n=document.getElementById("researchContent"),b=window.ALFAAZ_API_URL||"";try{const d=localStorage.getItem("alfaaz_token"),o=`${b}/recruit/research/sessions${a?`?status=${encodeURIComponent(a)}`:""}`,s=await fetch(o,{headers:{Authorization:`Bearer ${d}`}});if(s.status===401||s.status===403){alert("Admin clearance required."),window.location.href="login.html";return}const c=await s.json(),x=`
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
 `;if(!c||c.length===0){n.innerHTML=`
 ${x}
 <div class="p-12 text-center text-black text-base bg-white border border-[var(--grid-border)] mt-4">
 No recruitment assessment sessions found for this status.
 </div>
 `,(l=document.getElementById("statusFilter"))==null||l.addEventListener("change",t=>{h(t.target.value)});return}const m=c.map(t=>`
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
 `).join("");n.innerHTML=`
 <div class="space-y-4">
 ${x}
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
 ${m}
 </tbody>
 </table>
 </div>
 </div>
 </div>
 `,(p=document.getElementById("statusFilter"))==null||p.addEventListener("change",t=>{h(t.target.value)}),n.querySelectorAll(".view-session-btn").forEach(t=>{t.addEventListener("click",()=>{const g=t.getAttribute("data-id");H(g)})}),window.lucide&&window.lucide.createIcons()}catch(d){n.innerHTML=`<div class="p-8 text-center text-red-600">Failed to load sessions: ${d.message}</div>`}}async function H(a){const n=document.getElementById("researchContent"),b=window.ALFAAZ_API_URL||"";try{const l=localStorage.getItem("alfaaz_token"),p=`${b}/recruit/research/sessions/${a}?recompute=true`,d=await fetch(p,{headers:{Authorization:`Bearer ${l}`}});if(!d.ok)throw new Error("Failed to load dossier");const o=await d.json(),s=o.metadata||{},c=s.applicant||{},x=o.measurement_comparisons||{},m=window.escapeHtml(c.full_name||"Candidate"),t=window.escapeHtml(c.email||"—"),g=window.escapeHtml(c.phone_or_contact||"—"),k=s.duration_minutes!==null?`${s.duration_minutes} min`:"In progress",_=o.dimensions||[],E=(o.profile_summary||{}).completeness||"INSUFFICIENT",$=e=>e==="RELATIVELY_STRONG"?'<span class="px-2 py-0.5 bg-[#f5efe6] text-[#8c651e] border border-[#d4be98] text-[10px] font-semibold uppercase tracking-wider">Relatively Strong</span>':e==="RELATIVELY_LOWER"?'<span class="px-2 py-0.5 bg-gray-100 text-black border border-gray-200 text-[10px] uppercase tracking-wider">Relatively Lower</span>':e==="ABOUT_EQUAL"?'<span class="px-2 py-0.5 bg-gray-100 text-gray-600 border border-gray-300 text-[10px] uppercase tracking-wider">About Equal</span>':e==="RELATIVELY_MIDDLE"?'<span class="px-2 py-0.5 bg-gray-50 text-gray-700 border border-gray-300 text-[10px] uppercase tracking-wider">Relatively Middle</span>':'<span class="px-2 py-0.5 bg-gray-50 text-black border border-gray-200 text-[10px] uppercase tracking-wider">Insufficient</span>',A=e=>e==="ALIGNED"?'<span class="text-green-700 font-semibold uppercase text-[10px] tracking-wider">Aligned</span>':e==="PARTLY_ALIGNED"?'<span class="text-[var(--text-primary)] font-semibold uppercase text-[10px] tracking-wider">Partly Aligned</span>':e==="DIFFERENT"?'<span class="text-purple-700 font-semibold uppercase text-[10px] tracking-wider">Different</span>':e==="NOT_ENOUGH_EVIDENCE"?'<span class="text-stone-500 text-[10px]">Not Enough Evidence</span>':'<span class="text-black text-[10px]">Not Available</span>',T=_.map(e=>{const i=e.profile||{},v=i.relative_score!==null&&i.relative_score!==void 0?`${i.relative_score} / 100`:"—",r=i.relative_rank!==null&&i.relative_rank!==void 0?`#${i.relative_rank}`:"—",u=$(i.relative_level),f=A(e.relationship),R=e.confidence||"LIMITED",C=window.escapeHtml(e.display_name||e.parameter),N=e.sjt&&e.sjt.relative!==null&&e.sjt.relative!==void 0?e.sjt.relative.toFixed(2):"—",S=e.game_relative!==null&&e.game_relative!==void 0?e.game_relative.toFixed(2):e.games&&e.games.relative!==null&&e.games.relative!==void 0?e.games.relative.toFixed(2):"—",B=e.cross_method_delta!==null&&e.cross_method_delta!==void 0?e.cross_method_delta.toFixed(2):"—",F=window.escapeHtml(e.observed_behavior||"—");return`
 <tr class="border-b border-[var(--grid-border)]">
 <td class="p-3 font-medium text-[var(--text-primary)]">
 <div>${C}</div>
 <div class="text-[10px] text-black mt-0.5">${F}</div>
 </td>
 <td class="p-3 text-center font-mono text-xs">${N}</td>
 <td class="p-3 text-center font-mono text-xs">${S}</td>
 <td class="p-3 text-center font-mono text-xs font-semibold">${B}</td>
 <td class="p-3 text-center text-xs">${f}</td>
 <td class="p-3 text-center text-[10px] uppercase text-black font-semibold">${R}</td>
 <td class="p-3 text-center text-sm font-semibold">${v}</td>
 <td class="p-3 text-center font-semibold text-xs">${r}</td>
 <td class="p-3 text-center">${u}</td>
 </tr>
 `}).join(""),L=s.battery_version==="2.0"?"V2 (14-Game Candidate Core)":s.battery_version==="1.0"?"V1 (21-Game Historical Battery)":s.battery_version||"2.0 (Candidate Core)",w=o.task_records||[],D=w.filter(e=>e.battery_role==="candidate_core"||!e.battery_role&&!["F3","A3","C3","E3","Q3","CR2","M3"].includes(e.game_id)),I=w.filter(e=>e.battery_role==="research_bank"||e.battery_role!=="candidate_core"&&["F3","A3","C3","E3","Q3","CR2","M3"].includes(e.game_id)),y=(e,i,v)=>!e||e.length===0?"":`
 <div class="mb-4">
 <div class="flex justify-between items-baseline mb-2">
 <h4 class="text-xs font-semibold tracking-wider uppercase text-[var(--text-primary)] flex items-center gap-2">
 <span class="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider" style="${v}">${i}</span>
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
 ${e.map(r=>{const u=r.status==="RECORDED"?"background:#eaf5ea; color:#1e6624; border:1px solid #bce0bc;":r.status==="NOT_DERIVED"?"background:#f0eeea; color:var(--text-secondary); border:1px solid var(--grid-border);":"background:#fdf2e9; color:#9c4221; border:1px solid #f0cdb8;",f=r.status==="NOT_DERIVED"?'<span class="text-black italic">Unattempted &middot; Reserved in Research Bank</span>':window.escapeHtml(r.display_text||"—");return`
 <tr class="border-b border-[var(--grid-border)]">
 <td class="p-3 font-semibold text-[var(--text-primary)]">${r.game_id}: ${window.escapeHtml(r.game_name||r.game_id)}</td>
 <td class="p-3 text-black">${r.world_id}: ${window.escapeHtml(r.world_name||"")}</td>
 <td class="p-3"><span class="badge" style="font-size:10px; ${u}">${r.status}</span></td>
 <td class="p-3 text-black leading-relaxed">${f}</td>
 </tr>
 `}).join("")}
 </tbody>
 </table>
 </div>
 </div>
 `;n.innerHTML=`
 <div class="mb-4">
 <button onclick="loadSessionsList()" class="text-xs uppercase tracking-widest text-black hover:text-[var(--accent-gold)]">&larr; Back to Registry</button>
 </div>
 
 <div class="bg-[#faf8f5] border border-[var(--grid-border)] p-6 mb-4">
 <h3 class="text-xs font-semibold tracking-widest uppercase text-[var(--accent-gold)] mb-4">1. Candidate & Session Overview</h3>
 <div class="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
 <div><strong class="block text-black text-xs uppercase tracking-wider mb-1">Name</strong>${m}</div>
 <div><strong class="block text-black text-xs uppercase tracking-wider mb-1">Email</strong>${t}</div>
 <div><strong class="block text-black text-xs uppercase tracking-wider mb-1">Contact</strong>${g}</div>
 <div><strong class="block text-black text-xs uppercase tracking-wider mb-1">Session Duration</strong>${k}</div>
 <div><strong class="block text-black text-xs uppercase tracking-wider mb-1">Battery Version</strong><span class="badge" style="font-size:10px; background:#f0eeea; color:var(--text-primary); border:1px solid var(--grid-border);">${L}</span></div>
 </div>
 </div>

 <div class="bg-white border-l-4 border-[var(--accent-gold)] border-t border-r border-b border-[var(--grid-border)] p-4 mb-6 text-xs text-black leading-relaxed">
 <strong class="text-[var(--text-primary)] uppercase tracking-wider">Psychometric Safeguard Notice:</strong>
 This dossier provides a <em>provisional within-person relative profile</em> for exploratory human review only. It reflects the relative emphasis among dimensions for this candidate, NOT normative trait scores, clinical evaluation, or automated hiring recommendations. Cross-method convergence is exploratory; empirical normative calibration is pending.
 </div>

 <div class="mb-6">
 <div class="flex justify-between items-baseline mb-3">
 <h3 class="text-xs font-semibold tracking-widest uppercase text-[var(--accent-gold)]">2. Within-Person Relative Dimension Profile</h3>
 <span class="text-xs uppercase tracking-wider text-black">Profile Completeness: <strong class="text-[var(--text-primary)]">${E}</strong></span>
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
 <div class="bg-[#fcfbf9] border border-[var(--grid-border)] border-t-0 p-3 text-xs text-black leading-relaxed">
 <strong class="text-[var(--text-primary)]">Delta is the absolute difference between the candidate's SJT-relative evidence and Game-SJT-relative evidence for this dimension.</strong> Larger Delta indicates greater divergence and reduces evidence confidence. Delta is not a measure of honesty, reliability, or validity.
 </div>
 </div>

 <div class="mb-6">
 <div class="flex justify-between items-baseline mb-3">
 <h3 class="text-xs font-semibold tracking-widest uppercase text-[var(--accent-gold)]">3. Interactive Activity Behavioral Records</h3>
 <span class="text-xs text-black">${o.task_records_statement||"Descriptive task counts; not a score."}</span>
 </div>
 ${y(D,"Core Battery","background:#eaf5ea; color:#1e6624; border:1px solid #bce0bc;")}
 ${y(I,"Research Bank","background:#f0eeea; color:var(--text-secondary); border:1px solid var(--grid-border);")}
 </div>
 `}catch{n.innerHTML='<div class="p-8 text-center text-red-600">Failed to load dossier.</div>'}}
