import"./global-BiS7FSLa.js";document.addEventListener("DOMContentLoaded",async()=>{const i=localStorage.getItem("alfaaz_token"),m=localStorage.getItem("alfaaz_user");if(!i||!m){window.location.href="login.html";return}try{if(JSON.parse(m).status!=="ADMIN"){window.location.href="dashboard.html";return}}catch{localStorage.removeItem("alfaaz_token"),localStorage.removeItem("alfaaz_user"),window.location.href="login.html";return}ce(),await b()});function ce(){var i;(i=document.getElementById("logoutBtn"))==null||i.addEventListener("click",()=>{localStorage.removeItem("alfaaz_token"),window.location.href="login.html"})}async function b(i=""){var I,w;const m=document.getElementById("researchContent"),g=window.ALFAAZ_API_URL||"https://alfaaz-project.onrender.com";try{const v=localStorage.getItem("alfaaz_token"),T=`${g}/recruit/research/sessions${i?`?status=${encodeURIComponent(i)}`:""}`,x=await fetch(T,{headers:{Authorization:`Bearer ${v}`}});if(x.status===401||x.status===403){alert("Admin clearance required."),window.location.href="login.html";return}const f=await x.json(),k=`
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
 `;if(!f||f.length===0){m.innerHTML=`
 ${k}
 <div class="p-12 text-center text-black text-base bg-white border border-[var(--grid-border)] mt-4">
 No recruitment assessment sessions found for this status.
 </div>
 `,(I=document.getElementById("statusFilter"))==null||I.addEventListener("change",l=>{b(l.target.value)});return}const D=f.map(l=>`
 <tr class="border-b border-[var(--grid-border)] hover:bg-[#faf8f5] ">
 <td class="p-4 text-sm font-medium text-[var(--text-primary)]">${l.full_name}</td>
 <td class="p-4 text-xs text-black">${l.email}</td>
 <td class="p-4 text-xs text-black">${l.created_at?new Date(l.created_at).toLocaleString():"—"}</td>
 <td class="p-4 text-xs">
 <span class="px-2 py-0.5 bg-[#f4f1ea] border border-[var(--grid-border)] text-[10px] uppercase tracking-wider">${l.status}</span>
 </td>
 <td class="p-4 text-right">
 <button class="view-session-btn px-3 py-1 bg-[var(--text-primary)] text-white text-[10px] uppercase tracking-widest hover:bg-[var(--accent-gold)] " data-id="${l.session_id}">
 View Evidence &rarr;
 </button>
 </td>
 </tr>
 `).join("");m.innerHTML=`
 <div class="space-y-4">
 ${k}
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
 ${D}
 </tbody>
 </table>
 </div>
 </div>
 </div>
 `,(w=document.getElementById("statusFilter"))==null||w.addEventListener("change",l=>{b(l.target.value)}),m.querySelectorAll(".view-session-btn").forEach(l=>{l.addEventListener("click",()=>{const j=l.getAttribute("data-id");B(j)})}),window.lucide&&window.lucide.createIcons()}catch(v){m.innerHTML=`<div class="p-8 text-center text-red-600">Failed to load sessions: ${v.message}</div>`}}async function B(i,m=!1){var w,v,T,x,f,k,D,l,j,V,z,J,P;const g=document.getElementById("researchContent"),I=window.ALFAAZ_API_URL||"https://alfaaz-project.onrender.com";g.innerHTML=`
 <div class="mb-4">
 <button id="backToRegistryLoadingBtn" class="text-xs uppercase tracking-widest text-black hover:text-[var(--accent-gold)]">&larr; Back to Registry</button>
 </div>
 <div class="p-12 text-center text-[var(--text-secondary)] font-serif text-lg bg-white border border-[var(--grid-border)]">
 Loading applicant dossier${m?" (re-analyzing telemetry)...":"..."}
 </div>
 `,(w=document.getElementById("backToRegistryLoadingBtn"))==null||w.addEventListener("click",()=>b());try{const L=localStorage.getItem("alfaaz_token"),X=`${I}/recruit/research/sessions/${i}${m?"?recompute=true":""}`,_=await fetch(X,{headers:{Authorization:`Bearer ${L}`}});if(!_.ok){let t=_.statusText;try{const a=await _.json();a&&a.detail&&(t=a.detail)}catch{}throw new Error(`HTTP ${_.status}: ${t}`)}const y=await _.json(),u=y.metadata||{},H=u.applicant||{},pe=y.measurement_comparisons||{},ee=window.escapeHtml(H.full_name||"Candidate"),te=window.escapeHtml(H.email||"—"),ae=window.escapeHtml(H.phone_or_contact||"—"),re=u.duration_minutes!==null?`${u.duration_minutes} min`:"In progress",S=y.dimensions||[],se=(y.profile_summary||{}).completeness||"INSUFFICIENT",ge=t=>t==="RELATIVELY_STRONG"?'<span class="px-2 py-0.5 bg-[#f5efe6] text-[#8c651e] border border-[#d4be98] text-[10px] font-semibold uppercase tracking-wider">Relatively Strong</span>':t==="RELATIVELY_LOWER"?'<span class="px-2 py-0.5 bg-gray-100 text-black border border-gray-200 text-[10px] uppercase tracking-wider">Relatively Lower</span>':t==="ABOUT_EQUAL"?'<span class="px-2 py-0.5 bg-gray-100 text-gray-600 border border-gray-300 text-[10px] uppercase tracking-wider">About Equal</span>':t==="RELATIVELY_MIDDLE"?'<span class="px-2 py-0.5 bg-gray-50 text-gray-700 border border-gray-300 text-[10px] uppercase tracking-wider">Relatively Middle</span>':'<span class="px-2 py-0.5 bg-gray-50 text-black border border-gray-200 text-[10px] uppercase tracking-wider">Insufficient</span>',ne=t=>t==="ALIGNED"?'<span class="text-green-700 font-semibold uppercase text-[10px] tracking-wider">Aligned</span>':t==="PARTLY_ALIGNED"?'<span class="text-[var(--text-primary)] font-semibold uppercase text-[10px] tracking-wider">Partly Aligned</span>':t==="DIFFERENT"?'<span class="text-purple-700 font-semibold uppercase text-[10px] tracking-wider">Different</span>':t==="NOT_ENOUGH_EVIDENCE"?'<span class="text-stone-500 text-[10px]">Not Enough Evidence</span>':'<span class="text-black text-[10px]">Not Available</span>',ie=t=>{const a=t.sjt&&t.sjt.relative!==null&&t.sjt.relative!==void 0?Number(t.sjt.relative):null,e=t.game_relative!==null&&t.game_relative!==void 0?Number(t.game_relative):t.games&&t.games.relative!==null&&t.games.relative!==void 0?Number(t.games.relative):null,r=t.cross_method_delta!==null&&t.cross_method_delta!==void 0?Number(t.cross_method_delta):null,n=t.relationship||"NOT_AVAILABLE",d=t.confidence||"LIMITED",p=window.escapeHtml(t.display_name||t.parameter||"Dimension");if(a===null&&e===null)return'<span class="text-stone-500 italic">Insufficient observations across methods.</span>';if(a!==null&&e===null)return a>=.6?`High situational intent (${a.toFixed(2)}); deliberate scenario priority pending behavioral activity verification.`:a>=.4?`Balanced situational baseline (${a.toFixed(2)}); steady trade-off priority pending behavioral activity verification.`:`Lower situational priority (${a.toFixed(2)}); selective trade-off allocation pending behavioral activity verification.`;if(a===null&&e!==null)return e>=.6?`Elevated behavioral activity (${e.toFixed(2)}); strong task engagement pending situational trade-off confirmation.`:e>=.4?`Moderate behavioral activity (${e.toFixed(2)}); standard task engagement pending situational trade-off confirmation.`:`Lower behavioral activity (${e.toFixed(2)}); minimal task engagement pending situational trade-off confirmation.`;const o=r!==null?r.toFixed(2):Math.abs(a-e).toFixed(2),c=d==="SUBSTANTIAL"?'<span class="text-emerald-700 font-medium"> [High Confidence]</span>':d==="MODERATE"?'<span class="text-stone-600"> [Moderate Confidence]</span>':'<span class="text-amber-700"> [Limited Confidence]</span>';return n==="ALIGNED"||r!==null&&r<=.15?a>=.55&&e>=.55?`<strong>Strong convergent strength</strong> (&Delta; ${o}). High deliberate priority matches active simulation execution.${c}`:a<.38&&e<.38?`<strong>Consistently lower emphasis</strong> (&Delta; ${o}). Selectively allocated away across both judgment trade-offs and simulation.${c}`:`<strong>Harmonious baseline</strong> (&Delta; ${o}). Stated trade-offs closely mirror practical simulation actions.${c}`:n==="PARTLY_ALIGNED"||r!==null&&r<=.3?a>e?`<strong>Moderate judgment emphasis</strong> (&Delta; ${o}). Higher conceptual importance in trade-offs than manifested in simulation.${c}`:`<strong>Moderate behavioral emphasis</strong> (&Delta; ${o}). Higher hands-on task engagement than expressed in judgment trade-offs.${c}`:n==="DIFFERENT"||r!==null&&r>.3?a>e?`<strong>Marked divergence</strong> (&Delta; ${o}). High stated situational intent contrasts with lower task execution; explore aspirational values in interview.${c}`:`<strong>Marked divergence</strong> (&Delta; ${o}). Hands-on execution exceeds stated situational priority; suggests tacit, unstated capability. Explore in interview.${c}`:n==="NOT_ENOUGH_EVIDENCE"?`<span class="text-stone-500 italic">Inconclusive evidence (&Delta; ${o}); observations below verification threshold.${c}</span>`:`Provisional data (&Delta; ${o}): SJT ${a.toFixed(2)}, Games ${e.toFixed(2)}.${c}`};let s="sjt";const $=S.some(t=>t.sjt&&t.sjt.relative!==null&&t.sjt.relative!==void 0),E=S.some(t=>t.game_relative!==null&&t.game_relative!==void 0||t.games&&t.games.relative!==null&&t.games.relative!==void 0),A=S.some(t=>t.cross_method_delta!==null&&t.cross_method_delta!==void 0);!$&&E&&(s="game");const U=t=>[...S].sort((a,e)=>{var o,c,N,R,C,M,F,G,O,Q,Z,K;let r,n,d,p;return t==="game"?(r=a.game_relative!==null&&a.game_relative!==void 0?Number(a.game_relative):a.games&&a.games.relative!==null&&a.games.relative!==void 0?Number(a.games.relative):-1/0,n=e.game_relative!==null&&e.game_relative!==void 0?Number(e.game_relative):e.games&&e.games.relative!==null&&e.games.relative!==void 0?Number(e.games.relative):-1/0,d=((o=a.sjt)==null?void 0:o.relative)!==null&&((c=a.sjt)==null?void 0:c.relative)!==void 0?Number(a.sjt.relative):-1/0,p=((N=e.sjt)==null?void 0:N.relative)!==null&&((R=e.sjt)==null?void 0:R.relative)!==void 0?Number(e.sjt.relative):-1/0):t==="delta"?(r=a.cross_method_delta!==null&&a.cross_method_delta!==void 0?Number(a.cross_method_delta):-1/0,n=e.cross_method_delta!==null&&e.cross_method_delta!==void 0?Number(e.cross_method_delta):-1/0,d=((C=a.sjt)==null?void 0:C.relative)!==null&&((M=a.sjt)==null?void 0:M.relative)!==void 0?Number(a.sjt.relative):-1/0,p=((F=e.sjt)==null?void 0:F.relative)!==null&&((G=e.sjt)==null?void 0:G.relative)!==void 0?Number(e.sjt.relative):-1/0):(r=((O=a.sjt)==null?void 0:O.relative)!==null&&((Q=a.sjt)==null?void 0:Q.relative)!==void 0?Number(a.sjt.relative):-1/0,n=((Z=e.sjt)==null?void 0:Z.relative)!==null&&((K=e.sjt)==null?void 0:K.relative)!==void 0?Number(e.sjt.relative):-1/0,d=a.game_relative!==null&&a.game_relative!==void 0?Number(a.game_relative):a.games&&a.games.relative!==null&&a.games.relative!==void 0?Number(a.games.relative):-1/0,p=e.game_relative!==null&&e.game_relative!==void 0?Number(e.game_relative):e.games&&e.games.relative!==null&&e.games.relative!==void 0?Number(e.games.relative):-1/0),n!==r?n-r:p!==d?p-d:(a.display_name||a.parameter||"").localeCompare(e.display_name||e.parameter||"")}),W=(t,a)=>t.map((e,r)=>{const n=ne(e.relationship),d=e.confidence||"LIMITED",p=window.escapeHtml(e.display_name||e.parameter),o=e.sjt&&e.sjt.relative!==null&&e.sjt.relative!==void 0?e.sjt.relative.toFixed(2):"—",c=e.game_relative!==null&&e.game_relative!==void 0?e.game_relative.toFixed(2):e.games&&e.games.relative!==null&&e.games.relative!==void 0?e.games.relative.toFixed(2):"—",N=e.cross_method_delta!==null&&e.cross_method_delta!==void 0?e.cross_method_delta.toFixed(2):"—",R=window.escapeHtml(e.observed_behavior||"—"),C=ie(e);return`
      <tr class="border-b border-[var(--grid-border)] hover:bg-[#faf9f6] transition-colors">
        <td class="p-3 text-center font-mono text-xs font-semibold text-stone-500">${r+1}</td>
        <td class="p-3 font-medium text-[var(--text-primary)] min-w-[180px]">
          <div>${p}</div>
          <div class="text-[10px] text-black mt-0.5">${R}</div>
        </td>
        <td class="p-3 text-center font-mono text-xs ${a==="sjt"?"font-bold bg-[#faf8f5]":""}">${o}</td>
        <td class="p-3 text-center font-mono text-xs ${a==="game"?"font-bold bg-[#faf8f5]":""}">${c}</td>
        <td class="p-3 text-center font-mono text-xs ${a==="delta"?"font-bold bg-[#faf8f5]":""}">${N}</td>
        <td class="p-3 text-center text-xs whitespace-nowrap">${n}</td>
        <td class="p-3 text-center text-[10px] uppercase text-black font-semibold whitespace-nowrap">${d}</td>
        <td class="p-3 text-xs text-[var(--text-primary)] leading-relaxed min-w-[280px]">${C}</td>
      </tr>
      `}).join(""),oe=u.battery_version==="2.0"?"V2 (14-Game Candidate Core)":u.battery_version==="1.0"?"V1 (21-Game Historical Battery)":u.battery_version||"2.0 (Candidate Core)",Y=y.task_records||[],le=Y.filter(t=>t.battery_role==="candidate_core"||!t.battery_role&&!["F3","A3","C3","E3","Q3","CR2","M3"].includes(t.game_id)),de=Y.filter(t=>t.battery_role==="research_bank"||t.battery_role!=="candidate_core"&&["F3","A3","C3","E3","Q3","CR2","M3"].includes(t.game_id)),q=(t,a,e)=>!t||t.length===0?"":`
 <div class="mb-4">
 <div class="flex justify-between items-baseline mb-2">
 <h4 class="text-xs font-semibold tracking-wider uppercase text-[var(--text-primary)] flex items-center gap-2">
 <span class="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider" style="${e}">${a}</span>
 <span>Activities (${t.length})</span>
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
 ${t.map(r=>{const n=r.status==="RECORDED"?"background:#eaf5ea; color:#1e6624; border:1px solid #bce0bc;":r.status==="NOT_DERIVED"?"background:#f0eeea; color:var(--text-secondary); border:1px solid var(--grid-border);":"background:#fdf2e9; color:#9c4221; border:1px solid #f0cdb8;",d=r.status==="NOT_DERIVED"?'<span class="text-black italic">Unattempted &middot; Reserved in Research Bank</span>':window.escapeHtml(r.display_text||"—");return`
 <tr class="border-b border-[var(--grid-border)]">
 <td class="p-3 font-semibold text-[var(--text-primary)]">${r.game_id}: ${window.escapeHtml(r.game_name||r.game_id)}</td>
 <td class="p-3 text-black">${r.world_id}: ${window.escapeHtml(r.world_name||"")}</td>
 <td class="p-3"><span class="badge" style="font-size:10px; ${n}">${r.status}</span></td>
 <td class="p-3 text-black leading-relaxed">${d}</td>
 </tr>
 `}).join("")}
 </tbody>
 </table>
 </div>
 </div>
 `;g.innerHTML=`
 <div class="mb-4 flex justify-between items-center">
 <button id="backToRegistryBtn" class="text-xs uppercase tracking-widest text-black hover:text-[var(--accent-gold)]">&larr; Back to Registry</button>
 <button id="recomputeTelemetryBtn" class="px-3 py-1 bg-[#f4f1ea] border border-[var(--grid-border)] text-[10px] uppercase tracking-wider hover:bg-[#eae6dc] transition-colors">
 Re-analyze Telemetry
 </button>
 </div>
 
 <div class="bg-[#faf8f5] border border-[var(--grid-border)] p-6 mb-4">
 <h3 class="text-xs font-semibold tracking-widest uppercase text-[var(--accent-gold)] mb-4">1. Candidate & Session Overview</h3>
 <div class="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
 <div><strong class="block text-black text-xs uppercase tracking-wider mb-1">Name</strong>${ee}</div>
 <div><strong class="block text-black text-xs uppercase tracking-wider mb-1">Email</strong>${te}</div>
 <div><strong class="block text-black text-xs uppercase tracking-wider mb-1">Contact</strong>${ae}</div>
 <div><strong class="block text-black text-xs uppercase tracking-wider mb-1">Session Duration</strong>${re}</div>
 <div><strong class="block text-black text-xs uppercase tracking-wider mb-1">Battery Version</strong><span class="badge" style="font-size:10px; background:#f0eeea; color:var(--text-primary); border:1px solid var(--grid-border);">${oe}</span></div>
 </div>
 </div>

 <div class="bg-white border-l-4 border-[var(--accent-gold)] border-t border-r border-b border-[var(--grid-border)] p-4 mb-6 text-xs text-black leading-relaxed">
 <strong class="text-[var(--text-primary)] uppercase tracking-wider">Psychometric Safeguard Notice:</strong>
 This dossier provides a <em>provisional within-person relative profile</em> for exploratory human review only. It reflects the relative emphasis among dimensions for this candidate, NOT normative trait scores, clinical evaluation, or automated hiring decisions. Cross-method convergence is exploratory; empirical normative calibration is pending.
 <div class="mt-2 text-[11px] text-[var(--text-secondary)] italic">${((v=u.safeguards)==null?void 0:v.sjt_emphasis_note)||"Relative emphasis in this SJT's trade-offs: higher / middle / lower."}</div>
 </div>

 <div class="mb-6">
 <div class="flex flex-wrap justify-between items-center gap-3 mb-3">
 <div class="flex items-center gap-3 flex-wrap">
 <h3 class="text-xs font-semibold tracking-widest uppercase text-[var(--accent-gold)]">2. Evidence by parameter</h3>
 <div class="inline-flex items-center gap-1.5 p-1 bg-[#f0eeea] border border-[var(--grid-border)]">
 <span class="text-[10px] uppercase font-mono tracking-wider text-black px-1.5 font-semibold">Rank By:</span>
 <button id="sortBySjtBtn" class="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider transition-colors ${s==="sjt"?"bg-[var(--text-primary)] text-white":"text-stone-700 hover:bg-[#e4e1dc]"} ${$?"":"opacity-40 cursor-not-allowed"}" ${$?'title="Rank by Written Situational Trade-offs"':'disabled title="No SJT data"'}>
 Written (SJT) ${s==="sjt"?"&darr;":""}
 </button>
 <button id="sortByGameBtn" class="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider transition-colors ${s==="game"?"bg-[var(--text-primary)] text-white":"text-stone-700 hover:bg-[#e4e1dc]"} ${E?"":"opacity-40 cursor-not-allowed"}" ${E?'title="Rank by Practical Hands-On Game Performance"':'disabled title="Game data pending"'}>
 Hands-On (Games) ${s==="game"?"&darr;":""}
 </button>
 <button id="sortByDeltaBtn" class="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider transition-colors ${s==="delta"?"bg-[var(--text-primary)] text-white":"text-stone-700 hover:bg-[#e4e1dc]"} ${A?"":"opacity-40 cursor-not-allowed"}" ${A?'title="Rank by Largest Difference Between Words and Actions"':'disabled title="Requires both SJT and Game data"'}>
 Difference (&Delta;) ${s==="delta"?"&darr;":""}
 </button>
 </div>
 </div>
 <span class="text-xs uppercase tracking-wider text-black">Profile Completeness: <strong class="text-[var(--text-primary)]">${se}</strong></span>
 </div>
 <div class="overflow-x-auto border border-[var(--grid-border)] bg-white">
 <table class="w-full text-left text-sm">
 <thead class="bg-[#f0eeea] text-xs uppercase tracking-wider text-black select-none">
 <tr>
 <th class="p-3 text-center w-12">#</th>
 <th class="p-3">Dimension & Observed Context</th>
 <th id="thSjt" class="p-3 text-center cursor-pointer hover:bg-[#e4e1dc] transition-colors" title="Click to rank by SJT">SJT Rel <span id="thSjtArrow">${s==="sjt"?"&darr;":""}</span></th>
 <th id="thGame" class="p-3 text-center cursor-pointer hover:bg-[#e4e1dc] transition-colors" title="Click to rank by Game">Game Rel <span id="thGameArrow">${s==="game"?"&darr;":""}</span></th>
 <th id="thDelta" class="p-3 text-center cursor-pointer hover:bg-[#e4e1dc] transition-colors" title="Click to rank by Delta">Delta <span id="thDeltaArrow">${s==="delta"?"&darr;":""}</span></th>
 <th class="p-3 text-center">Relationship</th>
 <th class="p-3 text-center">Confidence</th>
 <th class="p-3">Interpretation</th>
 </tr>
 </thead>
 <tbody id="dimensionTableBody">
 ${W(U(s),s)}
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
 <span class="text-xs text-black">${y.task_records_statement||"Descriptive task counts; not a score."}</span>
 </div>
 ${q(le,"Core Battery","background:#eaf5ea; color:#1e6624; border:1px solid #bce0bc;")}
 ${q(de,"Research Bank","background:#f0eeea; color:var(--text-secondary); border:1px solid var(--grid-border);")}
 </div>
 `,(T=document.getElementById("backToRegistryBtn"))==null||T.addEventListener("click",()=>b()),(x=document.getElementById("recomputeTelemetryBtn"))==null||x.addEventListener("click",()=>B(i,!0));const h=t=>{s=t;const a=document.getElementById("dimensionTableBody");a&&(a.innerHTML=W(U(s),s));const e=document.getElementById("sortBySjtBtn"),r=document.getElementById("sortByGameBtn"),n=document.getElementById("sortByDeltaBtn");e&&$&&(e.className=`px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider transition-colors ${s==="sjt"?"bg-[var(--text-primary)] text-white":"text-stone-700 hover:bg-[#e4e1dc]"}`,e.innerHTML=`Written (SJT) ${s==="sjt"?"&darr;":""}`),r&&E&&(r.className=`px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider transition-colors ${s==="game"?"bg-[var(--text-primary)] text-white":"text-stone-700 hover:bg-[#e4e1dc]"}`,r.innerHTML=`Hands-On (Games) ${s==="game"?"&darr;":""}`),n&&A&&(n.className=`px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider transition-colors ${s==="delta"?"bg-[var(--text-primary)] text-white":"text-stone-700 hover:bg-[#e4e1dc]"}`,n.innerHTML=`Difference (&Delta;) ${s==="delta"?"&darr;":""}`);const d=document.getElementById("thSjtArrow"),p=document.getElementById("thGameArrow"),o=document.getElementById("thDeltaArrow");d&&(d.innerHTML=s==="sjt"?"&darr;":""),p&&(p.innerHTML=s==="game"?"&darr;":""),o&&(o.innerHTML=s==="delta"?"&darr;":"")};$&&((f=document.getElementById("sortBySjtBtn"))==null||f.addEventListener("click",()=>h("sjt")),(k=document.getElementById("thSjt"))==null||k.addEventListener("click",()=>h("sjt"))),E&&((D=document.getElementById("sortByGameBtn"))==null||D.addEventListener("click",()=>h("game")),(l=document.getElementById("thGame"))==null||l.addEventListener("click",()=>h("game"))),A&&((j=document.getElementById("sortByDeltaBtn"))==null||j.addEventListener("click",()=>h("delta")),(V=document.getElementById("thDelta"))==null||V.addEventListener("click",()=>h("delta"))),window.lucide&&window.lucide.createIcons()}catch(L){g.innerHTML=`
 <div class="mb-4">
 <button id="backToRegistryErrBtn" class="text-xs uppercase tracking-widest text-black hover:text-[var(--accent-gold)]">&larr; Back to Registry</button>
 </div>
 <div class="p-8 text-center bg-white border border-[var(--grid-border)] space-y-4">
 <div class="text-red-600 font-semibold">Failed to load dossier</div>
 <div class="text-xs text-stone-500 font-mono">${window.escapeHtml(L.message||String(L))}</div>
 <div class="flex justify-center gap-3 pt-2">
 <button id="retryDossierBtn" class="px-4 py-2 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition-colors">Retry</button>
 <button id="recomputeDossierBtn" class="px-4 py-2 bg-[#f4f1ea] border border-[var(--grid-border)] text-xs uppercase tracking-widest hover:bg-[#eae6dc] transition-colors">Re-analyze Telemetry</button>
 </div>
 </div>
 `,(z=document.getElementById("backToRegistryErrBtn"))==null||z.addEventListener("click",()=>b()),(J=document.getElementById("retryDossierBtn"))==null||J.addEventListener("click",()=>B(i,!1)),(P=document.getElementById("recomputeDossierBtn"))==null||P.addEventListener("click",()=>B(i,!0))}}window.loadSessionsList=b;window.loadSessionDetail=B;
