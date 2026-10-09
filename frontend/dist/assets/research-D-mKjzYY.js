import"./global-DxYxv3W5.js";/* empty css               */document.addEventListener("DOMContentLoaded",async()=>{const i=localStorage.getItem("alfaaz_token"),m=localStorage.getItem("alfaaz_user");if(!i||!m){window.location.href="login.html";return}try{if(JSON.parse(m).status!=="ADMIN"){window.location.href="dashboard.html";return}}catch{localStorage.removeItem("alfaaz_token"),localStorage.removeItem("alfaaz_user"),window.location.href="login.html";return}ke(),await b()});function ke(){var i;(i=document.getElementById("logoutBtn"))==null||i.addEventListener("click",()=>{localStorage.removeItem("alfaaz_token"),window.location.href="login.html"})}async function b(i=""){var H,B,I;const m=document.getElementById("researchContent"),v=window.ALFAAZ_API_URL||"https://alfaaz-project.onrender.com";try{const y=localStorage.getItem("alfaaz_token"),M=`${v}/recruit/research/sessions${i?`?status=${encodeURIComponent(i)}`:""}`,w=await fetch(M,{headers:{Authorization:`Bearer ${y}`}});if(w.status===401||w.status===403){alert("Admin clearance required."),window.location.href="login.html";return}const k=await w.json(),T=`
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-white border border-[var(--grid-border)] p-4">
      <div>
        <h2 class="text-base sm:text-lg text-[var(--text-primary)] font-serif">Applicant Assessment Records</h2>
        <span class="text-xs text-black">Ordered strictly by submission time</span>
      </div>
      <div class="flex items-center gap-2 flex-wrap">
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
    `;if(!k||k.length===0){m.innerHTML=`
      ${T}
      <div class="p-12 text-center bg-white border border-[var(--grid-border)] mt-4 space-y-2">
        <div class="text-[var(--text-primary)] font-medium">No assessment sessions found for this status.</div>
        <div class="text-xs text-stone-500 max-w-md mx-auto">
          Candidate records will appear here as applicants consent and begin their assessment journeys. You can also select &ldquo;All Operational Statuses&rdquo; to review in-progress candidate sessions.
        </div>
      </div>
      `,(H=document.getElementById("statusFilter"))==null||H.addEventListener("change",s=>{b(s.target.value)});return}const O=k.map(s=>`
    <tr class="border-b border-[var(--grid-border)] hover:bg-[#faf8f5] transition-colors">
      <td class="p-4 text-sm font-medium text-[var(--text-primary)]">${window.escapeHtml(s.full_name||"Anonymous Applicant")}</td>
      <td class="p-4 text-xs text-black">${window.escapeHtml(s.email||"—")}</td>
      <td class="p-4 text-xs text-black">${s.linkedin_url?`<a href="${window.escapeHtml(s.linkedin_url.startsWith("http")?s.linkedin_url:"https://"+s.linkedin_url)}" target="_blank" rel="noopener noreferrer" class="text-[var(--accent-gold)] hover:underline inline-flex items-center gap-1" title="${window.escapeHtml(s.linkedin_url)}">Link &nearr;</a>`:"—"}</td>
      <td class="p-4 text-xs text-black">${s.created_at?new Date(s.created_at).toLocaleString():"—"}</td>
      <td class="p-4 text-xs">
        <span class="px-2 py-0.5 bg-[#f4f1ea] border border-[var(--grid-border)] text-[10px] uppercase tracking-wider">${s.status}</span>
      </td>
      <td class="p-4 text-right">
        <button class="view-session-btn px-3 py-1 bg-[var(--text-primary)] text-white text-[10px] uppercase tracking-widest hover:bg-[var(--accent-gold)] transition-colors" data-id="${s.session_id}">
          View Evidence &rarr;
        </button>
      </td>
    </tr>
    `).join("");m.innerHTML=`
    <div class="space-y-4">
      ${T}
      <div class="bg-white border border-[var(--grid-border)] p-6 space-y-4">
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-[#faf8f5] border-b border-[var(--grid-border)] text-[10px] uppercase tracking-wider text-black">
                <th class="p-4">Applicant Name</th>
                <th class="p-4">Email</th>
                <th class="p-4">LinkedIn / CV</th>
                <th class="p-4">Submission Date</th>
                <th class="p-4">Status</th>
                <th class="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              ${O}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    `,(B=document.getElementById("statusFilter"))==null||B.addEventListener("change",s=>{b(s.target.value)}),m.querySelectorAll(".view-session-btn").forEach(s=>{s.addEventListener("click",()=>{const F=s.getAttribute("data-id");R(F)})}),window.lucide&&window.lucide.createIcons()}catch(y){console.error("Failed to load applicant assessment sessions:",y),m.innerHTML=`
      <div class="p-8 text-center bg-white border border-[var(--grid-border)] space-y-3">
        <div class="text-red-700 font-medium">Unable to load applicant assessment sessions.</div>
        <div class="text-xs text-stone-500">Please check your network connection or verify that the service is running.</div>
        <button id="retrySessionsBtn" class="px-4 py-2 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition-colors">
          Retry
        </button>
      </div>
    `,(I=document.getElementById("retrySessionsBtn"))==null||I.addEventListener("click",()=>b(i))}}async function R(i,m=!1){var B,I,y,M,w,k,T,O,s,F,Q,K,Z;const v=document.getElementById("researchContent"),H=window.ALFAAZ_API_URL||"https://alfaaz-project.onrender.com";v.innerHTML=`
  <div class="mb-4">
    <button id="backToRegistryLoadingBtn" class="text-xs uppercase tracking-widest text-black hover:text-[var(--accent-gold)]">&larr; Back to Registry</button>
  </div>
  <div class="p-12 text-center text-[var(--text-secondary)] font-serif text-lg bg-white border border-[var(--grid-border)]">
    Loading applicant dossier${m?" (re-analyzing telemetry)...":"..."}
  </div>
  `,(B=document.getElementById("backToRegistryLoadingBtn"))==null||B.addEventListener("click",()=>b());try{const z=localStorage.getItem("alfaaz_token"),ce=`${H}/recruit/research/sessions/${i}${m?"?recompute=true":""}`,D=await fetch(ce,{headers:{Authorization:`Bearer ${z}`}});if(!D.ok){let e=D.statusText;try{const a=await D.json();a&&a.detail&&(e=a.detail)}catch{}throw new Error(`HTTP ${D.status}: ${e}`)}const _=await D.json(),f=_.metadata||{},L=f.applicant||{},_e=_.measurement_comparisons||{},de=window.escapeHtml(L.full_name||"Candidate"),pe=window.escapeHtml(L.email||"—"),me=window.escapeHtml(L.phone_or_contact||"—"),j=L.linkedin_url?window.escapeHtml(L.linkedin_url):null,X=f.duration_minutes!==null?`${f.duration_minutes} min`:"In progress",u=_.dimensions||[],J=(_.profile_summary||{}).completeness||"INSUFFICIENT",Ee=e=>e==="RELATIVELY_STRONG"?'<span class="px-2 py-0.5 bg-[#f5efe6] text-[#8c651e] border border-[#d4be98] text-[10px] font-semibold uppercase tracking-wider">Relatively Strong</span>':e==="RELATIVELY_LOWER"?'<span class="px-2 py-0.5 bg-gray-100 text-black border border-gray-200 text-[10px] uppercase tracking-wider">Relatively Lower</span>':e==="ABOUT_EQUAL"?'<span class="px-2 py-0.5 bg-gray-100 text-gray-600 border border-gray-300 text-[10px] uppercase tracking-wider">About Equal</span>':e==="RELATIVELY_MIDDLE"?'<span class="px-2 py-0.5 bg-gray-50 text-gray-700 border border-gray-300 text-[10px] uppercase tracking-wider">Relatively Middle</span>':'<span class="px-2 py-0.5 bg-gray-50 text-black border border-gray-200 text-[10px] uppercase tracking-wider">Insufficient</span>',ge=e=>e==="ALIGNED"?'<span class="text-green-700 font-semibold uppercase text-[10px] tracking-wider">Aligned</span>':e==="PARTLY_ALIGNED"?'<span class="text-[var(--text-primary)] font-semibold uppercase text-[10px] tracking-wider">Partly Aligned</span>':e==="DIFFERENT"?'<span class="text-purple-700 font-semibold uppercase text-[10px] tracking-wider">Different</span>':e==="NOT_ENOUGH_EVIDENCE"?'<span class="text-stone-500 text-[10px]">Not Enough Evidence</span>':'<span class="text-black text-[10px]">Not Available</span>',ue=e=>{const a=e.sjt&&e.sjt.relative!==null&&e.sjt.relative!==void 0?Number(e.sjt.relative):null,t=e.game_relative!==null&&e.game_relative!==void 0?Number(e.game_relative):e.games&&e.games.relative!==null&&e.games.relative!==void 0?Number(e.games.relative):null,r=e.cross_method_delta!==null&&e.cross_method_delta!==void 0?Number(e.cross_method_delta):null,o=e.relationship||"NOT_AVAILABLE",d=e.confidence||"LIMITED",p=window.escapeHtml(e.display_name||e.parameter||"Dimension");if(a===null&&t===null)return'<span class="text-stone-500 italic">Insufficient observations across methods.</span>';if(a!==null&&t===null)return a>=.6?`High situational intent (${a.toFixed(2)}); deliberate scenario priority pending behavioral activity verification.`:a>=.4?`Balanced situational baseline (${a.toFixed(2)}); steady trade-off priority pending behavioral activity verification.`:`Lower situational priority (${a.toFixed(2)}); selective trade-off allocation pending behavioral activity verification.`;if(a===null&&t!==null)return t>=.6?`Elevated behavioral activity (${t.toFixed(2)}); strong task engagement pending situational trade-off confirmation.`:t>=.4?`Moderate behavioral activity (${t.toFixed(2)}); standard task engagement pending situational trade-off confirmation.`:`Lower behavioral activity (${t.toFixed(2)}); minimal task engagement pending situational trade-off confirmation.`;const l=r!==null?r.toFixed(2):Math.abs(a-t).toFixed(2),c=d==="SUBSTANTIAL"?'<span class="text-emerald-700 font-medium"> [High Confidence]</span>':d==="MODERATE"?'<span class="text-stone-600"> [Moderate Confidence]</span>':'<span class="text-amber-700"> [Limited Confidence]</span>';return o==="ALIGNED"||r!==null&&r<=.15?a>=.55&&t>=.55?`<strong>Strong convergent strength</strong> (&Delta; ${l}). High deliberate priority matches active simulation execution.${c}`:a<.38&&t<.38?`<strong>Consistently lower emphasis</strong> (&Delta; ${l}). Selectively allocated away across both judgment trade-offs and simulation.${c}`:`<strong>Harmonious baseline</strong> (&Delta; ${l}). Stated trade-offs closely mirror practical simulation actions.${c}`:o==="PARTLY_ALIGNED"||r!==null&&r<=.3?a>t?`<strong>Moderate judgment emphasis</strong> (&Delta; ${l}). Higher conceptual importance in trade-offs than manifested in simulation.${c}`:`<strong>Moderate behavioral emphasis</strong> (&Delta; ${l}). Higher hands-on task engagement than expressed in judgment trade-offs.${c}`:o==="DIFFERENT"||r!==null&&r>.3?a>t?`<strong>Marked divergence</strong> (&Delta; ${l}). High stated situational intent contrasts with lower task execution; explore aspirational values in interview.${c}`:`<strong>Marked divergence</strong> (&Delta; ${l}). Hands-on execution exceeds stated situational priority; suggests tacit, unstated capability. Explore in interview.${c}`:o==="NOT_ENOUGH_EVIDENCE"?`<span class="text-stone-500 italic">Inconclusive evidence (&Delta; ${l}); observations below verification threshold.${c}</span>`:`Provisional data (&Delta; ${l}): SJT ${a.toFixed(2)}, Games ${t.toFixed(2)}.${c}`};let n="sjt";const A=u.some(e=>e.sjt&&e.sjt.relative!==null&&e.sjt.relative!==void 0),N=u.some(e=>e.game_relative!==null&&e.game_relative!==void 0||e.games&&e.games.relative!==null&&e.games.relative!==void 0),G=u.some(e=>e.cross_method_delta!==null&&e.cross_method_delta!==void 0);!A&&N&&(n="game");const ee=e=>[...u].sort((a,t)=>{var l,c,h,x,V,U,W,Y,q,ie,oe,le;let r,o,d,p;return e==="game"?(r=a.game_relative!==null&&a.game_relative!==void 0?Number(a.game_relative):a.games&&a.games.relative!==null&&a.games.relative!==void 0?Number(a.games.relative):-1/0,o=t.game_relative!==null&&t.game_relative!==void 0?Number(t.game_relative):t.games&&t.games.relative!==null&&t.games.relative!==void 0?Number(t.games.relative):-1/0,d=((l=a.sjt)==null?void 0:l.relative)!==null&&((c=a.sjt)==null?void 0:c.relative)!==void 0?Number(a.sjt.relative):-1/0,p=((h=t.sjt)==null?void 0:h.relative)!==null&&((x=t.sjt)==null?void 0:x.relative)!==void 0?Number(t.sjt.relative):-1/0):e==="delta"?(r=a.cross_method_delta!==null&&a.cross_method_delta!==void 0?Number(a.cross_method_delta):-1/0,o=t.cross_method_delta!==null&&t.cross_method_delta!==void 0?Number(t.cross_method_delta):-1/0,d=((V=a.sjt)==null?void 0:V.relative)!==null&&((U=a.sjt)==null?void 0:U.relative)!==void 0?Number(a.sjt.relative):-1/0,p=((W=t.sjt)==null?void 0:W.relative)!==null&&((Y=t.sjt)==null?void 0:Y.relative)!==void 0?Number(t.sjt.relative):-1/0):(r=((q=a.sjt)==null?void 0:q.relative)!==null&&((ie=a.sjt)==null?void 0:ie.relative)!==void 0?Number(a.sjt.relative):-1/0,o=((oe=t.sjt)==null?void 0:oe.relative)!==null&&((le=t.sjt)==null?void 0:le.relative)!==void 0?Number(t.sjt.relative):-1/0,d=a.game_relative!==null&&a.game_relative!==void 0?Number(a.game_relative):a.games&&a.games.relative!==null&&a.games.relative!==void 0?Number(a.games.relative):-1/0,p=t.game_relative!==null&&t.game_relative!==void 0?Number(t.game_relative):t.games&&t.games.relative!==null&&t.games.relative!==void 0?Number(t.games.relative):-1/0),o!==r?o-r:p!==d?p-d:(a.display_name||a.parameter||"").localeCompare(t.display_name||t.parameter||"")}),te=(e,a)=>e.map((t,r)=>{const o=ge(t.relationship),d=t.confidence||"LIMITED",p=window.escapeHtml(t.display_name||t.parameter),l=t.sjt&&t.sjt.relative!==null&&t.sjt.relative!==void 0?t.sjt.relative.toFixed(2):"—",c=t.game_relative!==null&&t.game_relative!==void 0?t.game_relative.toFixed(2):t.games&&t.games.relative!==null&&t.games.relative!==void 0?t.games.relative.toFixed(2):"—",h=t.cross_method_delta!==null&&t.cross_method_delta!==void 0?t.cross_method_delta.toFixed(2):"—",x=window.escapeHtml(t.observed_behavior||"—"),V=ue(t);return`
        <tr class="group border-b border-[var(--grid-border)] hover:bg-[#faf9f6] transition-colors">
          <td scope="row" class="p-3 text-center font-mono text-xs font-semibold text-stone-500 w-12 min-w-[48px] max-w-[48px] sticky-col-rank bg-white group-hover:bg-[#faf9f6] transition-colors">${r+1}</td>
          <td class="p-3 font-medium text-[var(--text-primary)] min-w-[200px] sticky-col-dim bg-white group-hover:bg-[#faf9f6] transition-colors">
            <div>${p}</div>
            <div class="text-[10px] text-stone-600 mt-0.5 line-clamp-2" title="${x}">${x}</div>
          </td>
          <td class="p-3 text-center font-mono text-xs ${a==="sjt"?"font-bold bg-[#faf8f5]":""}">${l}</td>
          <td class="p-3 text-center font-mono text-xs ${a==="game"?"font-bold bg-[#faf8f5]":""}">${c}</td>
          <td class="p-3 text-center font-mono text-xs ${a==="delta"?"font-bold bg-[#faf8f5]":""}">${h}</td>
          <td class="p-3 text-center text-xs whitespace-nowrap">${o}</td>
          <td class="p-3 text-center text-[10px] uppercase text-black font-semibold whitespace-nowrap">${d}</td>
          <td class="p-3 text-xs text-[var(--text-primary)] leading-relaxed min-w-[280px]">${V}</td>
        </tr>
        `}).join(""),ae=f.battery_version==="2.0"?"V2 (14-Game Candidate Core)":f.battery_version==="1.0"?"V1 (21-Game Historical Battery)":f.battery_version||"2.0 (Candidate Core)",re=_.task_records||[],xe=re.filter(e=>e.battery_role==="candidate_core"||!e.battery_role&&!["F3","A3","C3","E3","Q3","CR2","M3"].includes(e.game_id)),be=re.filter(e=>e.battery_role==="research_bank"||e.battery_role!=="candidate_core"&&["F3","A3","C3","E3","Q3","CR2","M3"].includes(e.game_id)),ne=u.filter(e=>e.cross_method_delta!==null&&e.cross_method_delta!==void 0).map(e=>({name:e.display_name||e.parameter||"Dimension",delta:Number(e.cross_method_delta),sjt:e.sjt&&e.sjt.relative!==null&&e.sjt.relative!==void 0?Number(e.sjt.relative):null,game:e.game_relative!==null&&e.game_relative!==void 0?Number(e.game_relative):e.games&&e.games.relative!==null&&e.games.relative!==void 0?Number(e.games.relative):null,rel:e.relationship||"NOT_AVAILABLE"})).sort((e,a)=>a.delta-e.delta),g=ne.length>0?ne[0]:null,ve=u.filter(e=>e.confidence==="SUBSTANTIAL").length,fe=u.filter(e=>e.confidence==="MODERATE").length,he=u.filter(e=>e.confidence==="LIMITED"||!e.confidence).length;let P="";if(g&&g.delta>.15){const e=g.sjt!==null&&g.game!==null?g.sjt>g.game?"Higher situational trade-off than simulation execution":"Higher simulation execution than situational trade-off":"Cross-method variance detected";P=`
        <div class="text-[var(--text-primary)] font-medium font-serif">${window.escapeHtml(g.name)} (&Delta; ${g.delta.toFixed(2)})</div>
        <div class="text-[11px] text-stone-600 mt-0.5">${e}. Explore balance during structured interview.</div>
      `}else g?P=`
        <div class="text-emerald-700 font-medium">Harmonious alignment across methods</div>
        <div class="text-[11px] text-stone-600 mt-0.5">Max divergence is minimal (&Delta; ${g.delta.toFixed(2)}). Stated trade-offs mirror task execution.</div>
      `:P=`
        <div class="text-stone-500 italic">Method triangulation pending</div>
        <div class="text-[11px] text-stone-500 mt-0.5">Divergence metrics will populate once both situational and game observations are recorded.</div>
      `;const ye=`
      <div class="flex items-center gap-2 text-xs">
        <span class="text-emerald-700 font-mono font-medium">${ve} High</span>
        <span class="text-stone-400">&bull;</span>
        <span class="text-stone-700 font-mono">${fe} Moderate</span>
        <span class="text-stone-400">&bull;</span>
        <span class="text-amber-800 font-mono">${he} Limited</span>
      </div>
      <div class="text-[11px] text-stone-600 mt-0.5">Evidence confidence reflects observation volume and stability.</div>
    `,we=`
      <div class="text-xs">${J==="COMPLETE"?'<span class="text-emerald-700 font-medium font-mono">COMPLETE</span>':J==="PARTIAL"?'<span class="text-stone-700 font-medium font-mono">PARTIAL</span>':'<span class="text-amber-800 font-medium font-mono">INSUFFICIENT</span>'} &mdash; <span class="font-mono">${ae}</span></div>
      <div class="text-[11px] text-stone-600 mt-0.5">Duration: ${X}. All observations remain provisional.</div>
    `,se=(e,a,t)=>!e||e.length===0?"":`
      <div class="mb-4">
        <div class="flex justify-between items-baseline mb-2">
          <h4 class="text-xs font-semibold tracking-wider uppercase text-[var(--text-primary)] flex items-center gap-2">
            <span class="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider" style="${t}">${a}</span>
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
              ${e.map(r=>{const o=r.status==="RECORDED"?"background:#eaf5ea; color:#1e6624; border:1px solid #bce0bc;":r.status==="NOT_DERIVED"?"background:#f0eeea; color:var(--text-secondary); border:1px solid var(--grid-border);":"background:#fdf2e9; color:#9c4221; border:1px solid #f0cdb8;",d=r.status==="NOT_DERIVED"?'<span class="text-black italic">Unattempted &middot; Reserved in Research Bank</span>':window.escapeHtml(r.display_text||"—");return`
                <tr class="border-b border-[var(--grid-border)]">
                  <td class="p-3 font-semibold text-[var(--text-primary)]">${r.game_id}: ${window.escapeHtml(r.game_name||r.game_id)}</td>
                  <td class="p-3 text-black">${r.world_id}: ${window.escapeHtml(r.world_name||"")}</td>
                  <td class="p-3"><span class="badge" style="font-size:10px; ${o}">${r.status}</span></td>
                  <td class="p-3 text-black leading-relaxed">${d}</td>
                </tr>
                `}).join("")}
            </tbody>
          </table>
        </div>
      </div>
      `;v.innerHTML=`
    <div class="mb-4 flex justify-between items-center">
      <button id="backToRegistryBtn" class="text-xs uppercase tracking-widest text-black hover:text-[var(--accent-gold)]">&larr; Back to Registry</button>
      <button id="recomputeTelemetryBtn" class="px-3 py-1 bg-[#f4f1ea] border border-[var(--grid-border)] text-[10px] uppercase tracking-wider hover:bg-[#eae6dc] transition-colors" title="Re-extracts and re-scores behavioral game telemetry from scratch (opt-in recalculation)">
        Re-analyze Telemetry
      </button>
    </div>
    
    <div class="bg-[#faf8f5] border border-[var(--grid-border)] p-6 mb-4">
      <h3 class="text-xs font-semibold tracking-widest uppercase text-[var(--accent-gold)] mb-4">1. Candidate & Session Overview</h3>
      <div class="grid grid-cols-2 md:grid-cols-6 gap-4 text-sm">
        <div><strong class="block text-black text-xs uppercase tracking-wider mb-1">Name</strong>${de}</div>
        <div><strong class="block text-black text-xs uppercase tracking-wider mb-1">Email</strong>${pe}</div>
        <div><strong class="block text-black text-xs uppercase tracking-wider mb-1">LinkedIn / CV</strong>${j?`<a href="${j.startsWith("http")?j:"https://"+j}" target="_blank" rel="noopener noreferrer" class="text-[var(--accent-gold)] hover:underline block truncate" title="${j}">Open Link &nearr;</a>`:'<span class="text-stone-400">—</span>'}</div>
        <div><strong class="block text-black text-xs uppercase tracking-wider mb-1">Contact</strong>${me}</div>
        <div><strong class="block text-black text-xs uppercase tracking-wider mb-1">Session Duration</strong>${X}</div>
        <div><strong class="block text-black text-xs uppercase tracking-wider mb-1">Battery Version</strong><span class="badge" style="font-size:10px; background:#f0eeea; color:var(--text-primary); border:1px solid var(--grid-border);">${ae}</span></div>
      </div>
    </div>

    <div class="bg-white border-l-4 border-[var(--accent-gold)] border-t border-r border-b border-[var(--grid-border)] p-4 mb-4 text-xs text-black leading-relaxed">
      <strong class="text-[var(--text-primary)] uppercase tracking-wider">Psychometric Safeguard Notice:</strong>
      This dossier provides a <em>provisional within-person relative profile</em> for exploratory human review only. It reflects the relative emphasis among dimensions for this candidate, NOT normative trait scores, clinical evaluation, or automated hiring decisions. Cross-method convergence is exploratory; empirical normative calibration is pending.
      <div class="mt-2 text-[11px] text-[var(--text-secondary)] italic">${((I=f.safeguards)==null?void 0:I.sjt_emphasis_note)||"Relative emphasis in this SJT's trade-offs: higher / middle / lower."}</div>
    </div>

    <!-- Key Observations & Method Triangulation Card -->
    <details class="bg-white border border-[var(--grid-border)] p-4 mb-6 text-xs group" open>
      <summary class="font-semibold text-xs uppercase tracking-widest text-[var(--accent-gold)] cursor-pointer flex justify-between items-center select-none">
        <span>Key Observations & Method Triangulation</span>
        <span class="text-[10px] text-stone-500 font-normal lowercase tracking-normal group-open:hidden">(click to expand)</span>
        <span class="text-[10px] text-stone-500 font-normal lowercase tracking-normal hidden group-open:inline">(click to collapse)</span>
      </summary>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3 pt-3 border-t border-[var(--grid-border)]">
        <div>
          <span class="block text-[10px] uppercase tracking-wider text-black font-semibold mb-1">Top Method Divergence</span>
          ${P}
        </div>
        <div>
          <span class="block text-[10px] uppercase tracking-wider text-black font-semibold mb-1">Confidence Distribution</span>
          ${ye}
        </div>
        <div>
          <span class="block text-[10px] uppercase tracking-wider text-black font-semibold mb-1">Profile Completeness</span>
          ${we}
        </div>
      </div>
    </details>

    <div class="mb-6">
      <div class="flex flex-wrap justify-between items-center gap-3 mb-3">
        <div class="flex items-center gap-3 flex-wrap">
          <h3 class="text-xs font-semibold tracking-widest uppercase text-[var(--accent-gold)]">2. Evidence by parameter</h3>
          <div class="inline-flex items-center gap-1.5 p-1 bg-[#f0eeea] border border-[var(--grid-border)]" role="group" aria-label="Sort dimensions">
            <span class="text-[10px] uppercase font-mono tracking-wider text-black px-1.5 font-semibold">Rank By:</span>
            <button id="sortBySjtBtn" class="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider transition-colors ${n==="sjt"?"bg-[var(--text-primary)] text-white":"text-stone-700 hover:bg-[#e4e1dc]"} ${A?"":"opacity-40 cursor-not-allowed"}" ${A?'title="Rank by Written Situational Trade-offs"':'disabled title="No SJT data"'}>
              Written (SJT) ${n==="sjt"?"&darr;":""}
            </button>
            <button id="sortByGameBtn" class="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider transition-colors ${n==="game"?"bg-[var(--text-primary)] text-white":"text-stone-700 hover:bg-[#e4e1dc]"} ${N?"":"opacity-40 cursor-not-allowed"}" ${N?'title="Rank by Practical Hands-On Game Performance"':'disabled title="Game data pending"'}>
              Hands-On (Games) ${n==="game"?"&darr;":""}
            </button>
            <button id="sortByDeltaBtn" class="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider transition-colors ${n==="delta"?"bg-[var(--text-primary)] text-white":"text-stone-700 hover:bg-[#e4e1dc]"} ${G?"":"opacity-40 cursor-not-allowed"}" ${G?'title="Rank by Largest Difference Between Words and Actions"':'disabled title="Requires both SJT and Game data"'}>
              Difference (&Delta;) ${n==="delta"?"&darr;":""}
            </button>
          </div>
        </div>
        <div class="flex items-center gap-3">
          <div class="inline-flex items-center gap-1 p-0.5 bg-[#f0eeea] border border-[var(--grid-border)]" role="group" aria-label="Table density">
            <button id="densityComfortableBtn" class="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider transition-colors bg-[var(--text-primary)] text-white" title="Comfortable row padding">Comfortable</button>
            <button id="densityCompactBtn" class="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider transition-colors text-stone-700 hover:bg-[#e4e1dc]" title="Compact row padding">Compact</button>
          </div>
          <span class="text-xs uppercase tracking-wider text-black">Profile Completeness: <strong class="text-[var(--text-primary)]">${J}</strong></span>
        </div>
      </div>
      <div class="overflow-x-auto border border-[var(--grid-border)] bg-white max-h-[600px]">
        <table id="dimensionTable" class="w-full text-left text-sm border-collapse">
          <thead class="bg-[#f0eeea] text-xs uppercase tracking-wider text-black select-none">
            <tr>
              <th scope="col" class="p-3 text-center w-12 min-w-[48px] max-w-[48px] sticky-th bg-[#f0eeea] sticky-col-rank sticky-th-corner">#</th>
              <th scope="col" class="p-3 sticky-th bg-[#f0eeea] sticky-col-dim">Dimension & Observed Context</th>
              <th scope="col" id="thSjt" class="p-3 text-center cursor-pointer hover:bg-[#e4e1dc] transition-colors sticky-th bg-[#f0eeea]" title="Click to rank by SJT" aria-sort="${n==="sjt"?"descending":"none"}" aria-label="Rank by Written Situational Trade-offs">SJT Rel <span id="thSjtArrow">${n==="sjt"?"&darr;":""}</span></th>
              <th scope="col" id="thGame" class="p-3 text-center cursor-pointer hover:bg-[#e4e1dc] transition-colors sticky-th bg-[#f0eeea]" title="Click to rank by Game" aria-sort="${n==="game"?"descending":"none"}" aria-label="Rank by Practical Hands-On Game Performance">Game Rel <span id="thGameArrow">${n==="game"?"&darr;":""}</span></th>
              <th scope="col" id="thDelta" class="p-3 text-center cursor-pointer hover:bg-[#e4e1dc] transition-colors sticky-th bg-[#f0eeea]" title="Click to rank by Delta" aria-sort="${n==="delta"?"descending":"none"}" aria-label="Rank by Largest Difference Between Words and Actions">Delta <span id="thDeltaArrow">${n==="delta"?"&darr;":""}</span></th>
              <th scope="col" class="p-3 text-center sticky-th bg-[#f0eeea]">Relationship</th>
              <th scope="col" class="p-3 text-center sticky-th bg-[#f0eeea]">Confidence</th>
              <th scope="col" class="p-3 sticky-th bg-[#f0eeea]">Interpretation</th>
            </tr>
          </thead>
          <tbody id="dimensionTableBody">
            ${te(ee(n),n)}
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
        <span class="text-xs text-black">${_.task_records_statement||"Descriptive task counts; not a score."}</span>
      </div>
      ${se(xe,"Core Battery","background:#eaf5ea; color:#1e6624; border:1px solid #bce0bc;")}
      ${se(be,"Research Bank","background:#f0eeea; color:var(--text-secondary); border:1px solid var(--grid-border);")}
    </div>
    `,(y=document.getElementById("backToRegistryBtn"))==null||y.addEventListener("click",()=>b()),(M=document.getElementById("recomputeTelemetryBtn"))==null||M.addEventListener("click",()=>R(i,!0));const $=e=>{n=e;const a=document.getElementById("dimensionTableBody");a&&(a.innerHTML=te(ee(n),n));const t=document.getElementById("sortBySjtBtn"),r=document.getElementById("sortByGameBtn"),o=document.getElementById("sortByDeltaBtn");t&&A&&(t.className=`px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider transition-colors ${n==="sjt"?"bg-[var(--text-primary)] text-white":"text-stone-700 hover:bg-[#e4e1dc]"}`,t.innerHTML=`Written (SJT) ${n==="sjt"?"&darr;":""}`),r&&N&&(r.className=`px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider transition-colors ${n==="game"?"bg-[var(--text-primary)] text-white":"text-stone-700 hover:bg-[#e4e1dc]"}`,r.innerHTML=`Hands-On (Games) ${n==="game"?"&darr;":""}`),o&&G&&(o.className=`px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider transition-colors ${n==="delta"?"bg-[var(--text-primary)] text-white":"text-stone-700 hover:bg-[#e4e1dc]"}`,o.innerHTML=`Difference (&Delta;) ${n==="delta"?"&darr;":""}`);const d=document.getElementById("thSjtArrow"),p=document.getElementById("thGameArrow"),l=document.getElementById("thDeltaArrow");d&&(d.innerHTML=n==="sjt"?"&darr;":""),p&&(p.innerHTML=n==="game"?"&darr;":""),l&&(l.innerHTML=n==="delta"?"&darr;":"");const c=document.getElementById("thSjt"),h=document.getElementById("thGame"),x=document.getElementById("thDelta");c&&c.setAttribute("aria-sort",n==="sjt"?"descending":"none"),h&&h.setAttribute("aria-sort",n==="game"?"descending":"none"),x&&x.setAttribute("aria-sort",n==="delta"?"descending":"none")};A&&((w=document.getElementById("sortBySjtBtn"))==null||w.addEventListener("click",()=>$("sjt")),(k=document.getElementById("thSjt"))==null||k.addEventListener("click",()=>$("sjt"))),N&&((T=document.getElementById("sortByGameBtn"))==null||T.addEventListener("click",()=>$("game")),(O=document.getElementById("thGame"))==null||O.addEventListener("click",()=>$("game"))),G&&((s=document.getElementById("sortByDeltaBtn"))==null||s.addEventListener("click",()=>$("delta")),(F=document.getElementById("thDelta"))==null||F.addEventListener("click",()=>$("delta")));const E=document.getElementById("dimensionTable"),S=document.getElementById("densityComfortableBtn"),C=document.getElementById("densityCompactBtn");S==null||S.addEventListener("click",()=>{E==null||E.classList.remove("compact-table"),S.className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider transition-colors bg-[var(--text-primary)] text-white",C.className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider transition-colors text-stone-700 hover:bg-[#e4e1dc]"}),C==null||C.addEventListener("click",()=>{E==null||E.classList.add("compact-table"),C.className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider transition-colors bg-[var(--text-primary)] text-white",S.className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider transition-colors text-stone-700 hover:bg-[#e4e1dc]"}),window.lucide&&window.lucide.createIcons()}catch(z){console.error("Failed to load applicant dossier:",z),v.innerHTML=`
    <div class="mb-4">
      <button id="backToRegistryErrBtn" class="text-xs uppercase tracking-widest text-black hover:text-[var(--accent-gold)]">&larr; Back to Registry</button>
    </div>
    <div class="p-8 text-center bg-white border border-[var(--grid-border)] space-y-4">
      <div class="text-red-700 font-semibold">Unable to load applicant dossier</div>
      <div class="text-xs text-stone-600 max-w-md mx-auto">An error occurred while compiling the evidence record. You can attempt to reload or trigger an opt-in telemetry recalculation.</div>
      <div class="flex justify-center gap-3 pt-2">
        <button id="retryDossierBtn" class="px-4 py-2 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition-colors">Retry</button>
        <button id="recomputeDossierBtn" class="px-4 py-2 bg-[#f4f1ea] border border-[var(--grid-border)] text-xs uppercase tracking-widest hover:bg-[#eae6dc] transition-colors" title="Re-extracts and re-scores behavioral game telemetry from scratch (opt-in recalculation)">Re-analyze Telemetry</button>
      </div>
    </div>
    `,(Q=document.getElementById("backToRegistryErrBtn"))==null||Q.addEventListener("click",()=>b()),(K=document.getElementById("retryDossierBtn"))==null||K.addEventListener("click",()=>R(i,!1)),(Z=document.getElementById("recomputeDossierBtn"))==null||Z.addEventListener("click",()=>R(i,!0))}}window.loadSessionsList=b;window.loadSessionDetail=R;
