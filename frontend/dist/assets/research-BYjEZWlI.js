import"./global-DxYxv3W5.js";/* empty css               */document.addEventListener("DOMContentLoaded",async()=>{const i=localStorage.getItem("alfaaz_token"),o=localStorage.getItem("alfaaz_user");if(!i||!o){window.location.href="login.html";return}try{if(JSON.parse(o).status!=="ADMIN"){window.location.href="dashboard.html";return}}catch{localStorage.removeItem("alfaaz_token"),localStorage.removeItem("alfaaz_user"),window.location.href="login.html";return}V(),await g()});function V(){var i;(i=document.getElementById("logoutBtn"))==null||i.addEventListener("click",()=>{localStorage.removeItem("alfaaz_token"),window.location.href="login.html"})}async function g(i=""){var E,f;const o=document.getElementById("researchContent"),l=window.ALFAAZ_API_URL||"https://alfaaz-project.onrender.com";try{const b=localStorage.getItem("alfaaz_token"),$=`${l}/recruit/research/sessions${i?`?status=${encodeURIComponent(i)}`:""}`,m=await fetch($,{headers:{Authorization:`Bearer ${b}`}});if(m.status===401||m.status===403){alert("Admin clearance required."),window.location.href="login.html";return}const x=await m.json(),h=`
 <div class="flex justify-between items-center bg-white border border-[var(--grid-border)] p-4">
 <div>
 <h2 class="text-lg text-[var(--text-primary)]">Applicant Assessment Records</h2>
 <span class="text-xs text-black">Ordered strictly by submission time</span>
 </div>
 <div class="flex items-center gap-2">
 <label for="statusFilter" class="text-xs uppercase tracking-wider text-black">Session Status:</label>
 <select id="statusFilter" class="px-2 py-1 text-xs border border-[var(--grid-border)] bg-[#faf8f5] text-[var(--text-primary)] focus:outline-none">
 <option value="" ${i===""?"selected":""}>All Operational Statuses</option>
 <option value="CONSENTED" ${i==="CONSENTED"?"selected":""}>Consented</option>
 <option value="SJT" ${i==="SJT"?"selected":""}>SJT</option>
 <option value="ACTIVE" ${i==="ACTIVE"?"selected":""}>Active (Games)</option>
 <option value="COMPLETE" ${i==="COMPLETE"?"selected":""}>Complete</option>
 </select>
 </div>
 </div>
 `;if(!x||x.length===0){o.innerHTML=`
 ${h}
 <div class="p-12 text-center text-black text-base bg-white border border-[var(--grid-border)] mt-4">
 No recruitment assessment sessions found for this status.
 </div>
 `,(E=document.getElementById("statusFilter"))==null||E.addEventListener("change",r=>{g(r.target.value)});return}const _=x.map(r=>`
 <tr class="border-b border-[var(--grid-border)] hover:bg-[#faf8f5] ">
 <td class="p-4 text-sm font-medium text-[var(--text-primary)]">${r.full_name}</td>
 <td class="p-4 text-xs text-black">${r.email}</td>
 <td class="p-4 text-xs text-black">${r.created_at?new Date(r.created_at).toLocaleString():"—"}</td>
 <td class="p-4 text-xs">
 <span class="px-2 py-0.5 bg-[#f4f1ea] border border-[var(--grid-border)] text-[10px] uppercase tracking-wider">${r.status}</span>
 </td>
 <td class="p-4 text-right">
 <button class="view-session-btn px-3 py-1 bg-[var(--text-primary)] text-white text-[10px] uppercase tracking-widest hover:bg-[var(--accent-gold)] " data-id="${r.session_id}">
 View Evidence &rarr;
 </button>
 </td>
 </tr>
 `).join("");o.innerHTML=`
 <div class="space-y-4">
 ${h}
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
 ${_}
 </tbody>
 </table>
 </div>
 </div>
 </div>
 `,(f=document.getElementById("statusFilter"))==null||f.addEventListener("change",r=>{g(r.target.value)}),o.querySelectorAll(".view-session-btn").forEach(r=>{r.addEventListener("click",()=>{const T=r.getAttribute("data-id");k(T)})}),window.lucide&&window.lucide.createIcons()}catch(b){o.innerHTML=`<div class="p-8 text-center text-red-600">Failed to load sessions: ${b.message}</div>`}}async function k(i,o=!1){var f,b,$,m,x,h,_;const l=document.getElementById("researchContent"),E=window.ALFAAZ_API_URL||"https://alfaaz-project.onrender.com";l.innerHTML=`
 <div class="mb-4">
 <button id="backToRegistryLoadingBtn" class="text-xs uppercase tracking-widest text-black hover:text-[var(--accent-gold)]">&larr; Back to Registry</button>
 </div>
 <div class="p-12 text-center text-[var(--text-secondary)] font-serif text-lg bg-white border border-[var(--grid-border)]">
 Loading applicant dossier${o?" (re-analyzing telemetry)...":"..."}
 </div>
 `,(f=document.getElementById("backToRegistryLoadingBtn"))==null||f.addEventListener("click",()=>g());try{const r=localStorage.getItem("alfaaz_token"),T=`${E}/recruit/research/sessions/${i}${o?"?recompute=true":""}`,y=await fetch(T,{headers:{Authorization:`Bearer ${r}`}});if(!y.ok){let e=y.statusText;try{const t=await y.json();t&&t.detail&&(e=t.detail)}catch{}throw new Error(`HTTP ${y.status}: ${e}`)}const u=await y.json(),p=u.metadata||{},L=p.applicant||{},G=u.measurement_comparisons||{},A=window.escapeHtml(L.full_name||"Candidate"),R=window.escapeHtml(L.email||"—"),C=window.escapeHtml(L.phone_or_contact||"—"),B=p.duration_minutes!==null?`${p.duration_minutes} min`:"In progress",N=u.dimensions||[],S=(u.profile_summary||{}).completeness||"INSUFFICIENT",J=e=>e==="RELATIVELY_STRONG"?'<span class="px-2 py-0.5 bg-[#f5efe6] text-[#8c651e] border border-[#d4be98] text-[10px] font-semibold uppercase tracking-wider">Relatively Strong</span>':e==="RELATIVELY_LOWER"?'<span class="px-2 py-0.5 bg-gray-100 text-black border border-gray-200 text-[10px] uppercase tracking-wider">Relatively Lower</span>':e==="ABOUT_EQUAL"?'<span class="px-2 py-0.5 bg-gray-100 text-gray-600 border border-gray-300 text-[10px] uppercase tracking-wider">About Equal</span>':e==="RELATIVELY_MIDDLE"?'<span class="px-2 py-0.5 bg-gray-50 text-gray-700 border border-gray-300 text-[10px] uppercase tracking-wider">Relatively Middle</span>':'<span class="px-2 py-0.5 bg-gray-50 text-black border border-gray-200 text-[10px] uppercase tracking-wider">Insufficient</span>',j=e=>e==="ALIGNED"?'<span class="text-green-700 font-semibold uppercase text-[10px] tracking-wider">Aligned</span>':e==="PARTLY_ALIGNED"?'<span class="text-[var(--text-primary)] font-semibold uppercase text-[10px] tracking-wider">Partly Aligned</span>':e==="DIFFERENT"?'<span class="text-purple-700 font-semibold uppercase text-[10px] tracking-wider">Different</span>':e==="NOT_ENOUGH_EVIDENCE"?'<span class="text-stone-500 text-[10px]">Not Enough Evidence</span>':'<span class="text-black text-[10px]">Not Available</span>',F=e=>{const t=e.sjt&&e.sjt.relative!==null&&e.sjt.relative!==void 0?Number(e.sjt.relative):null,s=e.game_relative!==null&&e.game_relative!==void 0?Number(e.game_relative):e.games&&e.games.relative!==null&&e.games.relative!==void 0?Number(e.games.relative):null,a=e.cross_method_delta!==null&&e.cross_method_delta!==void 0?Number(e.cross_method_delta):null,c=e.relationship||"NOT_AVAILABLE",v=e.confidence||"LIMITED",w=window.escapeHtml(e.display_name||e.parameter||"Dimension");if(t===null&&s===null)return'<span class="text-stone-500 italic">Insufficient observations across both methods to establish an interpretive profile.</span>';if(t!==null&&s===null)return t>=.6?`High situational prioritization (${t.toFixed(2)}). Candidate deliberately prioritizes <strong>${w}</strong> in scenario trade-offs; awaiting interactive activity telemetry for behavioral verification.`:t>=.4?`Balanced situational prioritization (${t.toFixed(2)}). Candidate maintains a moderate baseline in scenario trade-offs; awaiting interactive activity telemetry for behavioral verification.`:`Lower situational prioritization (${t.toFixed(2)}). Candidate allocates lower relative emphasis to <strong>${w}</strong> in scenario trade-offs; awaiting interactive activity telemetry for behavioral verification.`;if(t===null&&s!==null)return s>=.6?`Elevated behavioral activity (${s.toFixed(2)}). Candidate demonstrated strong relative engagement in practical tasks; awaiting situational judgment trade-offs for cognitive comparison.`:s>=.4?`Moderate behavioral activity (${s.toFixed(2)}). Candidate demonstrated standard baseline engagement during tasks; awaiting situational judgment trade-offs for cognitive comparison.`:`Lower behavioral activity (${s.toFixed(2)}). Candidate demonstrated minimal engagement during interactive tasks; awaiting situational judgment trade-offs for cognitive comparison.`;const d=a!==null?a.toFixed(2):Math.abs(t-s).toFixed(2),n=v==="SUBSTANTIAL"?'<span class="text-emerald-700 font-medium"> [High Confidence]</span>':v==="MODERATE"?'<span class="text-stone-600"> [Moderate Confidence]</span>':'<span class="text-amber-700"> [Limited Confidence &middot; Review Holistically]</span>';return c==="ALIGNED"||a!==null&&a<=.15?t>=.55&&s>=.55?`<strong>Strong convergent strength</strong> (&Delta; ${d}). Candidate places high deliberate value on ${w} and consistently exhibits strong behavioral follow-through during studio tasks.${n}`:t<.38&&s<.38?`<strong>Consistently lower emphasis</strong> (&Delta; ${d}). Candidate consistently selects alternative priorities across both deliberate trade-offs and practical activities.${n}`:`<strong>Harmonious baseline</strong> (&Delta; ${d}). Stated judgment trade-offs closely mirror practical simulation behaviors, indicating stable and predictable self-regulation.${n}`:c==="PARTLY_ALIGNED"||a!==null&&a<=.3?t>s?`<strong>Moderate judgment emphasis</strong> (&Delta; ${d}). Candidate endorses higher theoretical importance in scenario trade-offs than directly manifested during active simulation tasks.${n}`:`<strong>Moderate behavioral emphasis</strong> (&Delta; ${d}). Candidate demonstrated higher practical engagement during active tasks than expressed in verbal judgment choices.${n}`:c==="DIFFERENT"||a!==null&&a>.3?t>s?`<strong>Marked cross-method divergence</strong> (&Delta; ${d}). High stated situational intent contrasts with significantly lower interactive behavioral expression. May indicate aspirational values or hesitation under practical task constraints. Explore during interview.${n}`:`<strong>Marked cross-method divergence</strong> (&Delta; ${d}). Candidate instinctively demonstrates high behavioral execution during interactive tasks despite giving it lower priority in deliberate trade-offs. Suggests tacit competence exceeding stated preference. Explore during interview.${n}`:c==="NOT_ENOUGH_EVIDENCE"?`<span class="text-stone-500 italic">Inconclusive cross-method evidence (&Delta; ${d}). Partial observations did not reach evidentiary thresholds for definitive triangulation.${n}</span>`:`Provisional profile data. Relative evidence spans SJT (${t.toFixed(2)}) and Games (${s.toFixed(2)}).${n}`},H=N.map(e=>{const t=j(e.relationship),s=e.confidence||"LIMITED",a=window.escapeHtml(e.display_name||e.parameter),c=e.sjt&&e.sjt.relative!==null&&e.sjt.relative!==void 0?e.sjt.relative.toFixed(2):"—",v=e.game_relative!==null&&e.game_relative!==void 0?e.game_relative.toFixed(2):e.games&&e.games.relative!==null&&e.games.relative!==void 0?e.games.relative.toFixed(2):"—",w=e.cross_method_delta!==null&&e.cross_method_delta!==void 0?e.cross_method_delta.toFixed(2):"—",d=window.escapeHtml(e.observed_behavior||"—"),n=F(e);return`
    <tr class="border-b border-[var(--grid-border)]">
      <td class="p-3 font-medium text-[var(--text-primary)] min-w-[180px]">
        <div>${a}</div>
        <div class="text-[10px] text-black mt-0.5">${d}</div>
      </td>
      <td class="p-3 text-center font-mono text-xs">${c}</td>
      <td class="p-3 text-center font-mono text-xs">${v}</td>
      <td class="p-3 text-center font-mono text-xs font-semibold">${w}</td>
      <td class="p-3 text-center text-xs whitespace-nowrap">${t}</td>
      <td class="p-3 text-center text-[10px] uppercase text-black font-semibold whitespace-nowrap">${s}</td>
      <td class="p-3 text-xs text-[var(--text-primary)] leading-relaxed min-w-[280px]">${n}</td>
    </tr>
    `}).join(""),M=p.battery_version==="2.0"?"V2 (14-Game Candidate Core)":p.battery_version==="1.0"?"V1 (21-Game Historical Battery)":p.battery_version||"2.0 (Candidate Core)",D=u.task_records||[],O=D.filter(e=>e.battery_role==="candidate_core"||!e.battery_role&&!["F3","A3","C3","E3","Q3","CR2","M3"].includes(e.game_id)),z=D.filter(e=>e.battery_role==="research_bank"||e.battery_role!=="candidate_core"&&["F3","A3","C3","E3","Q3","CR2","M3"].includes(e.game_id)),I=(e,t,s)=>!e||e.length===0?"":`
 <div class="mb-4">
 <div class="flex justify-between items-baseline mb-2">
 <h4 class="text-xs font-semibold tracking-wider uppercase text-[var(--text-primary)] flex items-center gap-2">
 <span class="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider" style="${s}">${t}</span>
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
 ${e.map(a=>{const c=a.status==="RECORDED"?"background:#eaf5ea; color:#1e6624; border:1px solid #bce0bc;":a.status==="NOT_DERIVED"?"background:#f0eeea; color:var(--text-secondary); border:1px solid var(--grid-border);":"background:#fdf2e9; color:#9c4221; border:1px solid #f0cdb8;",v=a.status==="NOT_DERIVED"?'<span class="text-black italic">Unattempted &middot; Reserved in Research Bank</span>':window.escapeHtml(a.display_text||"—");return`
 <tr class="border-b border-[var(--grid-border)]">
 <td class="p-3 font-semibold text-[var(--text-primary)]">${a.game_id}: ${window.escapeHtml(a.game_name||a.game_id)}</td>
 <td class="p-3 text-black">${a.world_id}: ${window.escapeHtml(a.world_name||"")}</td>
 <td class="p-3"><span class="badge" style="font-size:10px; ${c}">${a.status}</span></td>
 <td class="p-3 text-black leading-relaxed">${v}</td>
 </tr>
 `}).join("")}
 </tbody>
 </table>
 </div>
 </div>
 `;l.innerHTML=`
 <div class="mb-4 flex justify-between items-center">
 <button id="backToRegistryBtn" class="text-xs uppercase tracking-widest text-black hover:text-[var(--accent-gold)]">&larr; Back to Registry</button>
 <button id="recomputeTelemetryBtn" class="px-3 py-1 bg-[#f4f1ea] border border-[var(--grid-border)] text-[10px] uppercase tracking-wider hover:bg-[#eae6dc] transition-colors">
 Re-analyze Telemetry
 </button>
 </div>
 
 <div class="bg-[#faf8f5] border border-[var(--grid-border)] p-6 mb-4">
 <h3 class="text-xs font-semibold tracking-widest uppercase text-[var(--accent-gold)] mb-4">1. Candidate & Session Overview</h3>
 <div class="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
 <div><strong class="block text-black text-xs uppercase tracking-wider mb-1">Name</strong>${A}</div>
 <div><strong class="block text-black text-xs uppercase tracking-wider mb-1">Email</strong>${R}</div>
 <div><strong class="block text-black text-xs uppercase tracking-wider mb-1">Contact</strong>${C}</div>
 <div><strong class="block text-black text-xs uppercase tracking-wider mb-1">Session Duration</strong>${B}</div>
 <div><strong class="block text-black text-xs uppercase tracking-wider mb-1">Battery Version</strong><span class="badge" style="font-size:10px; background:#f0eeea; color:var(--text-primary); border:1px solid var(--grid-border);">${M}</span></div>
 </div>
 </div>

 <div class="bg-white border-l-4 border-[var(--accent-gold)] border-t border-r border-b border-[var(--grid-border)] p-4 mb-6 text-xs text-black leading-relaxed">
 <strong class="text-[var(--text-primary)] uppercase tracking-wider">Psychometric Safeguard Notice:</strong>
 This dossier provides a <em>provisional within-person relative profile</em> for exploratory human review only. It reflects the relative emphasis among dimensions for this candidate, NOT normative trait scores, clinical evaluation, or automated hiring decisions. Cross-method convergence is exploratory; empirical normative calibration is pending.
 <div class="mt-2 text-[11px] text-[var(--text-secondary)] italic">${((b=p.safeguards)==null?void 0:b.sjt_emphasis_note)||"Relative emphasis in this SJT's trade-offs: higher / middle / lower."}</div>
 </div>

 <div class="mb-6">
 <div class="flex justify-between items-baseline mb-3">
 <h3 class="text-xs font-semibold tracking-widest uppercase text-[var(--accent-gold)]">2. Evidence by parameter</h3>
 <span class="text-xs uppercase tracking-wider text-black">Profile Completeness: <strong class="text-[var(--text-primary)]">${S}</strong></span>
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
 ${H}
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
 <span class="text-xs text-black">${u.task_records_statement||"Descriptive task counts; not a score."}</span>
 </div>
 ${I(O,"Core Battery","background:#eaf5ea; color:#1e6624; border:1px solid #bce0bc;")}
 ${I(z,"Research Bank","background:#f0eeea; color:var(--text-secondary); border:1px solid var(--grid-border);")}
 </div>
 `,($=document.getElementById("backToRegistryBtn"))==null||$.addEventListener("click",()=>g()),(m=document.getElementById("recomputeTelemetryBtn"))==null||m.addEventListener("click",()=>k(i,!0)),window.lucide&&window.lucide.createIcons()}catch(r){l.innerHTML=`
 <div class="mb-4">
 <button id="backToRegistryErrBtn" class="text-xs uppercase tracking-widest text-black hover:text-[var(--accent-gold)]">&larr; Back to Registry</button>
 </div>
 <div class="p-8 text-center bg-white border border-[var(--grid-border)] space-y-4">
 <div class="text-red-600 font-semibold">Failed to load dossier</div>
 <div class="text-xs text-stone-500 font-mono">${window.escapeHtml(r.message||String(r))}</div>
 <div class="flex justify-center gap-3 pt-2">
 <button id="retryDossierBtn" class="px-4 py-2 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition-colors">Retry</button>
 <button id="recomputeDossierBtn" class="px-4 py-2 bg-[#f4f1ea] border border-[var(--grid-border)] text-xs uppercase tracking-widest hover:bg-[#eae6dc] transition-colors">Re-analyze Telemetry</button>
 </div>
 </div>
 `,(x=document.getElementById("backToRegistryErrBtn"))==null||x.addEventListener("click",()=>g()),(h=document.getElementById("retryDossierBtn"))==null||h.addEventListener("click",()=>k(i,!1)),(_=document.getElementById("recomputeDossierBtn"))==null||_.addEventListener("click",()=>k(i,!0))}}window.loadSessionsList=g;window.loadSessionDetail=k;
