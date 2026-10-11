import"./global-DxYxv3W5.js";/* empty css               */document.addEventListener("DOMContentLoaded",async()=>{const i=localStorage.getItem("alfaaz_token"),g=localStorage.getItem("alfaaz_user");if(!i||!g){window.location.href="login.html";return}try{if(JSON.parse(g).status!=="ADMIN"){window.location.href="dashboard.html";return}}catch{localStorage.removeItem("alfaaz_token"),localStorage.removeItem("alfaaz_user"),window.location.href="login.html";return}Ee(),await h()});function Ee(){var i;(i=document.getElementById("logoutBtn"))==null||i.addEventListener("click",()=>{localStorage.removeItem("alfaaz_token"),window.location.href="login.html"})}async function h(i=""){var O,D,L;const g=document.getElementById("researchContent"),y=window.ALFAAZ_API_URL||"https://alfaaz-project.onrender.com";try{const $=localStorage.getItem("alfaaz_token"),F=`${y}/recruit/research/sessions${i?`?status=${encodeURIComponent(i)}`:""}`,_=await fetch(F,{headers:{Authorization:`Bearer ${$}`}});if(_.status===401||_.status===403){alert("Admin clearance required."),window.location.href="login.html";return}const E=await _.json(),j=`
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
    `;if(!E||E.length===0){g.innerHTML=`
      ${j}
      <div class="p-12 text-center bg-white border border-[var(--grid-border)] mt-4 space-y-2">
        <div class="text-[var(--text-primary)] font-medium">No assessment sessions found for this status.</div>
        <div class="text-xs text-stone-500 max-w-md mx-auto">
          Candidate records will appear here as applicants consent and begin their assessment journeys. You can also select &ldquo;All Operational Statuses&rdquo; to review in-progress candidate sessions.
        </div>
      </div>
      `,(O=document.getElementById("statusFilter"))==null||O.addEventListener("change",s=>{h(s.target.value)});return}const G=E.map(s=>{const b=s.interview_booking,P=b?`<span class="inline-flex items-center gap-1 px-2 py-0.5 bg-[#eaf5ea] border border-[#bce0bc] text-[#1e6624] text-[10px] font-medium" title="Booked slot">
            <span>📅</span>
            <span>${window.escapeHtml(b.slot_display||`${b.slot_date} ${b.slot_time}`)}</span>
          </span>`:'<span class="text-stone-400 text-[10px] italic">Not scheduled</span>';return`
      <tr class="border-b border-[var(--grid-border)] hover:bg-[#faf8f5] transition-colors">
        <td class="p-4 text-sm font-medium text-[var(--text-primary)]">${window.escapeHtml(s.full_name||"Anonymous Applicant")}</td>
        <td class="p-4 text-xs text-black">${window.escapeHtml(s.email||"—")}</td>
        <td class="p-4 text-xs text-black">${s.linkedin_url?`<a href="${window.escapeHtml(s.linkedin_url.startsWith("http")?s.linkedin_url:"https://"+s.linkedin_url)}" target="_blank" rel="noopener noreferrer" class="text-[var(--accent-gold)] hover:underline inline-flex items-center gap-1" title="${window.escapeHtml(s.linkedin_url)}">Link &nearr;</a>`:"—"}</td>
        <td class="p-4 text-xs">${P}</td>
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
      `}).join("");g.innerHTML=`
    <div class="space-y-4">
      ${j}
      <div class="bg-white border border-[var(--grid-border)] p-6 space-y-4">
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-[#faf8f5] border-b border-[var(--grid-border)] text-[10px] uppercase tracking-wider text-black">
                <th class="p-4">Applicant Name</th>
                <th class="p-4">Email</th>
                <th class="p-4">LinkedIn / CV</th>
                <th class="p-4">Interview Timing</th>
                <th class="p-4">Submission Date</th>
                <th class="p-4">Status</th>
                <th class="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              ${G}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    `,(D=document.getElementById("statusFilter"))==null||D.addEventListener("change",s=>{h(s.target.value)}),g.querySelectorAll(".view-session-btn").forEach(s=>{s.addEventListener("click",()=>{const b=s.getAttribute("data-id");M(b)})}),window.lucide&&window.lucide.createIcons()}catch($){console.error("Failed to load applicant assessment sessions:",$),g.innerHTML=`
      <div class="p-8 text-center bg-white border border-[var(--grid-border)] space-y-3">
        <div class="text-red-700 font-medium">Unable to load applicant assessment sessions.</div>
        <div class="text-xs text-stone-500">Please check your network connection or verify that the service is running.</div>
        <button id="retrySessionsBtn" class="px-4 py-2 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition-colors">
          Retry
        </button>
      </div>
    `,(L=document.getElementById("retrySessionsBtn"))==null||L.addEventListener("click",()=>h(i))}}async function M(i,g=!1){var D,L,$,F,_,E,j,G,s,b,P,X,ee;const y=document.getElementById("researchContent"),O=window.ALFAAZ_API_URL||"https://alfaaz-project.onrender.com";y.innerHTML=`
  <div class="mb-4">
    <button id="backToRegistryLoadingBtn" class="text-xs uppercase tracking-widest text-black hover:text-[var(--accent-gold)]">&larr; Back to Registry</button>
  </div>
  <div class="p-12 text-center text-[var(--text-secondary)] font-serif text-lg bg-white border border-[var(--grid-border)]">
    Loading applicant dossier${g?" (re-analyzing telemetry)...":"..."}
  </div>
  `,(D=document.getElementById("backToRegistryLoadingBtn"))==null||D.addEventListener("click",()=>h());try{const W=localStorage.getItem("alfaaz_token"),pe=`${O}/recruit/research/sessions/${i}${g?"?recompute=true":""}`,A=await fetch(pe,{headers:{Authorization:`Bearer ${W}`}});if(!A.ok){let e=A.statusText;try{const a=await A.json();a&&a.detail&&(e=a.detail)}catch{}throw new Error(`HTTP ${A.status}: ${e}`)}const I=await A.json(),w=I.metadata||{},x=w.applicant||{},Ie=I.measurement_comparisons||{},me=window.escapeHtml(x.full_name||"Candidate"),ge=window.escapeHtml(x.email||"—"),xe=window.escapeHtml(x.phone_or_contact||"—"),C=x.linkedin_url?window.escapeHtml(x.linkedin_url):null,te=w.duration_minutes!==null?`${w.duration_minutes} min`:"In progress",p=x.interview_booking||null,V=(x.phone_or_contact||"").replace(/[^0-9]/g,""),ue=V?`
      <a href="https://wa.me/${V}?text=${encodeURIComponent(`Hello ${x.full_name||""}, this is the Alfaaz Collective recruitment team regarding your interview.`)}" target="_blank" rel="noopener noreferrer" class="text-[11px] text-[#1e6624] hover:underline inline-flex items-center gap-1 font-medium mt-1">
        <span>💬</span> Chat on WhatsApp &nearr;
      </a>`:"",v=I.dimensions||[],Y=(I.profile_summary||{}).completeness||"INSUFFICIENT",De=e=>e==="RELATIVELY_STRONG"?'<span class="px-2 py-0.5 bg-[#f5efe6] text-[#8c651e] border border-[#d4be98] text-[10px] font-semibold uppercase tracking-wider">Relatively Strong</span>':e==="RELATIVELY_LOWER"?'<span class="px-2 py-0.5 bg-gray-100 text-black border border-gray-200 text-[10px] uppercase tracking-wider">Relatively Lower</span>':e==="ABOUT_EQUAL"?'<span class="px-2 py-0.5 bg-gray-100 text-gray-600 border border-gray-300 text-[10px] uppercase tracking-wider">About Equal</span>':e==="RELATIVELY_MIDDLE"?'<span class="px-2 py-0.5 bg-gray-50 text-gray-700 border border-gray-300 text-[10px] uppercase tracking-wider">Relatively Middle</span>':'<span class="px-2 py-0.5 bg-gray-50 text-black border border-gray-200 text-[10px] uppercase tracking-wider">Insufficient</span>',be=e=>e==="ALIGNED"?'<span class="text-green-700 font-semibold uppercase text-[10px] tracking-wider">Aligned</span>':e==="PARTLY_ALIGNED"?'<span class="text-[var(--text-primary)] font-semibold uppercase text-[10px] tracking-wider">Partly Aligned</span>':e==="DIFFERENT"?'<span class="text-purple-700 font-semibold uppercase text-[10px] tracking-wider">Different</span>':e==="NOT_ENOUGH_EVIDENCE"?'<span class="text-stone-500 text-[10px]">Not Enough Evidence</span>':'<span class="text-black text-[10px]">Not Available</span>',ve=e=>{const a=e.sjt&&e.sjt.relative!==null&&e.sjt.relative!==void 0?Number(e.sjt.relative):null,t=e.game_relative!==null&&e.game_relative!==void 0?Number(e.game_relative):e.games&&e.games.relative!==null&&e.games.relative!==void 0?Number(e.games.relative):null,r=e.cross_method_delta!==null&&e.cross_method_delta!==void 0?Number(e.cross_method_delta):null,o=e.relationship||"NOT_AVAILABLE",d=e.confidence||"LIMITED",m=window.escapeHtml(e.display_name||e.parameter||"Dimension");if(a===null&&t===null)return'<span class="text-stone-500 italic">Insufficient observations across methods.</span>';if(a!==null&&t===null)return a>=.6?`High situational intent (${a.toFixed(2)}); deliberate scenario priority pending behavioral activity verification.`:a>=.4?`Balanced situational baseline (${a.toFixed(2)}); steady trade-off priority pending behavioral activity verification.`:`Lower situational priority (${a.toFixed(2)}); selective trade-off allocation pending behavioral activity verification.`;if(a===null&&t!==null)return t>=.6?`Elevated behavioral activity (${t.toFixed(2)}); strong task engagement pending situational trade-off confirmation.`:t>=.4?`Moderate behavioral activity (${t.toFixed(2)}); standard task engagement pending situational trade-off confirmation.`:`Lower behavioral activity (${t.toFixed(2)}); minimal task engagement pending situational trade-off confirmation.`;const l=r!==null?r.toFixed(2):Math.abs(a-t).toFixed(2),c=d==="SUBSTANTIAL"?'<span class="text-emerald-700 font-medium"> [High Confidence]</span>':d==="MODERATE"?'<span class="text-stone-600"> [Moderate Confidence]</span>':'<span class="text-amber-700"> [Limited Confidence]</span>';return o==="ALIGNED"||r!==null&&r<=.15?a>=.55&&t>=.55?`<strong>Strong convergent strength</strong> (&Delta; ${l}). High deliberate priority matches active simulation execution.${c}`:a<.38&&t<.38?`<strong>Consistently lower emphasis</strong> (&Delta; ${l}). Selectively allocated away across both judgment trade-offs and simulation.${c}`:`<strong>Harmonious baseline</strong> (&Delta; ${l}). Stated trade-offs closely mirror practical simulation actions.${c}`:o==="PARTLY_ALIGNED"||r!==null&&r<=.3?a>t?`<strong>Moderate judgment emphasis</strong> (&Delta; ${l}). Higher conceptual importance in trade-offs than manifested in simulation.${c}`:`<strong>Moderate behavioral emphasis</strong> (&Delta; ${l}). Higher hands-on task engagement than expressed in judgment trade-offs.${c}`:o==="DIFFERENT"||r!==null&&r>.3?a>t?`<strong>Marked divergence</strong> (&Delta; ${l}). High stated situational intent contrasts with lower task execution; explore aspirational values in interview.${c}`:`<strong>Marked divergence</strong> (&Delta; ${l}). Hands-on execution exceeds stated situational priority; suggests tacit, unstated capability. Explore in interview.${c}`:o==="NOT_ENOUGH_EVIDENCE"?`<span class="text-stone-500 italic">Inconclusive evidence (&Delta; ${l}); observations below verification threshold.${c}</span>`:`Provisional data (&Delta; ${l}): SJT ${a.toFixed(2)}, Games ${t.toFixed(2)}.${c}`};let n="sjt";const N=v.some(e=>e.sjt&&e.sjt.relative!==null&&e.sjt.relative!==void 0),S=v.some(e=>e.game_relative!==null&&e.game_relative!==void 0||e.games&&e.games.relative!==null&&e.games.relative!==void 0),z=v.some(e=>e.cross_method_delta!==null&&e.cross_method_delta!==void 0);!N&&S&&(n="game");const ae=e=>[...v].sort((a,t)=>{var l,c,k,f,J,q,Q,K,Z,le,ce,de;let r,o,d,m;return e==="game"?(r=a.game_relative!==null&&a.game_relative!==void 0?Number(a.game_relative):a.games&&a.games.relative!==null&&a.games.relative!==void 0?Number(a.games.relative):-1/0,o=t.game_relative!==null&&t.game_relative!==void 0?Number(t.game_relative):t.games&&t.games.relative!==null&&t.games.relative!==void 0?Number(t.games.relative):-1/0,d=((l=a.sjt)==null?void 0:l.relative)!==null&&((c=a.sjt)==null?void 0:c.relative)!==void 0?Number(a.sjt.relative):-1/0,m=((k=t.sjt)==null?void 0:k.relative)!==null&&((f=t.sjt)==null?void 0:f.relative)!==void 0?Number(t.sjt.relative):-1/0):e==="delta"?(r=a.cross_method_delta!==null&&a.cross_method_delta!==void 0?Number(a.cross_method_delta):-1/0,o=t.cross_method_delta!==null&&t.cross_method_delta!==void 0?Number(t.cross_method_delta):-1/0,d=((J=a.sjt)==null?void 0:J.relative)!==null&&((q=a.sjt)==null?void 0:q.relative)!==void 0?Number(a.sjt.relative):-1/0,m=((Q=t.sjt)==null?void 0:Q.relative)!==null&&((K=t.sjt)==null?void 0:K.relative)!==void 0?Number(t.sjt.relative):-1/0):(r=((Z=a.sjt)==null?void 0:Z.relative)!==null&&((le=a.sjt)==null?void 0:le.relative)!==void 0?Number(a.sjt.relative):-1/0,o=((ce=t.sjt)==null?void 0:ce.relative)!==null&&((de=t.sjt)==null?void 0:de.relative)!==void 0?Number(t.sjt.relative):-1/0,d=a.game_relative!==null&&a.game_relative!==void 0?Number(a.game_relative):a.games&&a.games.relative!==null&&a.games.relative!==void 0?Number(a.games.relative):-1/0,m=t.game_relative!==null&&t.game_relative!==void 0?Number(t.game_relative):t.games&&t.games.relative!==null&&t.games.relative!==void 0?Number(t.games.relative):-1/0),o!==r?o-r:m!==d?m-d:(a.display_name||a.parameter||"").localeCompare(t.display_name||t.parameter||"")}),re=(e,a)=>e.map((t,r)=>{const o=be(t.relationship),d=t.confidence||"LIMITED",m=window.escapeHtml(t.display_name||t.parameter),l=t.sjt&&t.sjt.relative!==null&&t.sjt.relative!==void 0?t.sjt.relative.toFixed(2):"—",c=t.game_relative!==null&&t.game_relative!==void 0?t.game_relative.toFixed(2):t.games&&t.games.relative!==null&&t.games.relative!==void 0?t.games.relative.toFixed(2):"—",k=t.cross_method_delta!==null&&t.cross_method_delta!==void 0?t.cross_method_delta.toFixed(2):"—",f=window.escapeHtml(t.observed_behavior||"—"),J=ve(t);return`
        <tr class="group border-b border-[var(--grid-border)] hover:bg-[#faf9f6] transition-colors">
          <td scope="row" class="p-3 text-center font-mono text-xs font-semibold text-stone-500 w-12 min-w-[48px] max-w-[48px] sticky-col-rank bg-white group-hover:bg-[#faf9f6] transition-colors">${r+1}</td>
          <td class="p-3 font-medium text-[var(--text-primary)] min-w-[200px] sticky-col-dim bg-white group-hover:bg-[#faf9f6] transition-colors">
            <div>${m}</div>
            <div class="text-[10px] text-stone-600 mt-0.5 line-clamp-2" title="${f}">${f}</div>
          </td>
          <td class="p-3 text-center font-mono text-xs ${a==="sjt"?"font-bold bg-[#faf8f5]":""}">${l}</td>
          <td class="p-3 text-center font-mono text-xs ${a==="game"?"font-bold bg-[#faf8f5]":""}">${c}</td>
          <td class="p-3 text-center font-mono text-xs ${a==="delta"?"font-bold bg-[#faf8f5]":""}">${k}</td>
          <td class="p-3 text-center text-xs whitespace-nowrap">${o}</td>
          <td class="p-3 text-center text-[10px] uppercase text-black font-semibold whitespace-nowrap">${d}</td>
          <td class="p-3 text-xs text-[var(--text-primary)] leading-relaxed min-w-[280px]">${J}</td>
        </tr>
        `}).join(""),ne=w.battery_version==="2.0"?"V2 (14-Game Candidate Core)":w.battery_version==="1.0"?"V1 (21-Game Historical Battery)":w.battery_version||"2.0 (Candidate Core)",se=I.task_records||[],fe=se.filter(e=>e.battery_role==="candidate_core"||!e.battery_role&&!["F3","A3","C3","E3","Q3","CR2","M3"].includes(e.game_id)),he=se.filter(e=>e.battery_role==="research_bank"||e.battery_role!=="candidate_core"&&["F3","A3","C3","E3","Q3","CR2","M3"].includes(e.game_id)),ie=v.filter(e=>e.cross_method_delta!==null&&e.cross_method_delta!==void 0).map(e=>({name:e.display_name||e.parameter||"Dimension",delta:Number(e.cross_method_delta),sjt:e.sjt&&e.sjt.relative!==null&&e.sjt.relative!==void 0?Number(e.sjt.relative):null,game:e.game_relative!==null&&e.game_relative!==void 0?Number(e.game_relative):e.games&&e.games.relative!==null&&e.games.relative!==void 0?Number(e.games.relative):null,rel:e.relationship||"NOT_AVAILABLE"})).sort((e,a)=>a.delta-e.delta),u=ie.length>0?ie[0]:null,ye=v.filter(e=>e.confidence==="SUBSTANTIAL").length,we=v.filter(e=>e.confidence==="MODERATE").length,ke=v.filter(e=>e.confidence==="LIMITED"||!e.confidence).length;let U="";if(u&&u.delta>.15){const e=u.sjt!==null&&u.game!==null?u.sjt>u.game?"Higher situational trade-off than simulation execution":"Higher simulation execution than situational trade-off":"Cross-method variance detected";U=`
        <div class="text-[var(--text-primary)] font-medium font-serif">${window.escapeHtml(u.name)} (&Delta; ${u.delta.toFixed(2)})</div>
        <div class="text-[11px] text-stone-600 mt-0.5">${e}. Explore balance during structured interview.</div>
      `}else u?U=`
        <div class="text-emerald-700 font-medium">Harmonious alignment across methods</div>
        <div class="text-[11px] text-stone-600 mt-0.5">Max divergence is minimal (&Delta; ${u.delta.toFixed(2)}). Stated trade-offs mirror task execution.</div>
      `:U=`
        <div class="text-stone-500 italic">Method triangulation pending</div>
        <div class="text-[11px] text-stone-500 mt-0.5">Divergence metrics will populate once both situational and game observations are recorded.</div>
      `;const $e=`
      <div class="flex items-center gap-2 text-xs">
        <span class="text-emerald-700 font-mono font-medium">${ye} High</span>
        <span class="text-stone-400">&bull;</span>
        <span class="text-stone-700 font-mono">${we} Moderate</span>
        <span class="text-stone-400">&bull;</span>
        <span class="text-amber-800 font-mono">${ke} Limited</span>
      </div>
      <div class="text-[11px] text-stone-600 mt-0.5">Evidence confidence reflects observation volume and stability.</div>
    `,_e=`
      <div class="text-xs">${Y==="COMPLETE"?'<span class="text-emerald-700 font-medium font-mono">COMPLETE</span>':Y==="PARTIAL"?'<span class="text-stone-700 font-medium font-mono">PARTIAL</span>':'<span class="text-amber-800 font-medium font-mono">INSUFFICIENT</span>'} &mdash; <span class="font-mono">${ne}</span></div>
      <div class="text-[11px] text-stone-600 mt-0.5">Duration: ${te}. All observations remain provisional.</div>
    `,oe=(e,a,t)=>!e||e.length===0?"":`
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
      `;y.innerHTML=`
    <div class="mb-4 flex justify-between items-center">
      <button id="backToRegistryBtn" class="text-xs uppercase tracking-widest text-black hover:text-[var(--accent-gold)]">&larr; Back to Registry</button>
      <button id="recomputeTelemetryBtn" class="px-3 py-1 bg-[#f4f1ea] border border-[var(--grid-border)] text-[10px] uppercase tracking-wider hover:bg-[#eae6dc] transition-colors" title="Re-extracts and re-scores behavioral game telemetry from scratch (opt-in recalculation)">
        Re-analyze Telemetry
      </button>
    </div>
    
    <div class="bg-[#faf8f5] border border-[var(--grid-border)] p-6 mb-4">
      <h3 class="text-xs font-semibold tracking-widest uppercase text-[var(--accent-gold)] mb-4">1. Candidate & Session Overview</h3>
      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 text-sm">
        <div><strong class="block text-black text-xs uppercase tracking-wider mb-1">Name</strong>${me}</div>
        <div><strong class="block text-black text-xs uppercase tracking-wider mb-1">Email</strong>${ge}</div>
        <div>
          <strong class="block text-black text-xs uppercase tracking-wider mb-1">WhatsApp / Contact</strong>
          <div>${xe}</div>
          ${ue}
        </div>
        <div>
          <strong class="block text-black text-xs uppercase tracking-wider mb-1">Interview Slot</strong>
          ${p?`<span class="inline-flex items-center gap-1 px-2 py-0.5 bg-[#eaf5ea] border border-[#bce0bc] text-[#1e6624] text-xs font-semibold">📅 ${window.escapeHtml(p.slot_display||`${p.slot_date} ${p.slot_time}`)}</span>`:'<span class="text-stone-400 text-xs italic">Not scheduled</span>'}
        </div>
        <div><strong class="block text-black text-xs uppercase tracking-wider mb-1">LinkedIn / CV</strong>${C?`<a href="${C.startsWith("http")?C:"https://"+C}" target="_blank" rel="noopener noreferrer" class="text-[var(--accent-gold)] hover:underline block truncate" title="${C}">Open Link &nearr;</a>`:'<span class="text-stone-400">—</span>'}</div>
        <div><strong class="block text-black text-xs uppercase tracking-wider mb-1">Session Duration</strong>${te}</div>
        <div><strong class="block text-black text-xs uppercase tracking-wider mb-1">Battery Version</strong><span class="badge" style="font-size:10px; background:#f0eeea; color:var(--text-primary); border:1px solid var(--grid-border);">${ne}</span></div>
      </div>
      ${p?`
      <div class="mt-4 pt-3 border-t border-[var(--grid-border)] flex flex-wrap items-center justify-between gap-3 text-xs bg-white p-3 border border-[#bce0bc]">
        <div class="flex items-center gap-2 text-[#1e6624]">
          <span class="text-base">📅</span>
          <div>
            <span class="font-semibold uppercase tracking-wider text-[10px]">Confirmed Interview Slot:</span>
            <span class="font-serif text-sm ml-1 text-black">${window.escapeHtml(p.slot_display||`${p.slot_date} at ${p.slot_time}`)}</span>
          </div>
        </div>
        <div class="flex items-center gap-2">
          ${V?`<a href="https://wa.me/${V}?text=${encodeURIComponent(`Hello ${x.full_name||""}, this is the Alfaaz Collective recruitment team confirming your interview slot: ${p.slot_display||`${p.slot_date} ${p.slot_time}`}.`)}" target="_blank" rel="noopener noreferrer" class="px-2.5 py-1 bg-[#25D366] text-white rounded text-[11px] font-medium hover:opacity-90 inline-flex items-center gap-1">Open WhatsApp Chat &nearr;</a>`:""}
          <a href="mailto:${window.escapeHtml(x.email||"")}?subject=${encodeURIComponent(`Alfaaz Collective — Interview Confirmation: ${p.slot_display||p.slot_date}`)}" class="px-2.5 py-1 border border-[var(--grid-border)] bg-[#faf8f5] text-black text-[11px] font-medium hover:bg-stone-100">Send Email</a>
        </div>
      </div>
      `:""}
    </div>

    <div class="bg-white border-l-4 border-[var(--accent-gold)] border-t border-r border-b border-[var(--grid-border)] p-4 mb-4 text-xs text-black leading-relaxed">
      <strong class="text-[var(--text-primary)] uppercase tracking-wider">Psychometric Safeguard Notice:</strong>
      This dossier provides a <em>provisional within-person relative profile</em> for exploratory human review only. It reflects the relative emphasis among dimensions for this candidate, NOT normative trait scores, clinical evaluation, or automated hiring decisions. Cross-method convergence is exploratory; empirical normative calibration is pending.
      <div class="mt-2 text-[11px] text-[var(--text-secondary)] italic">${((L=w.safeguards)==null?void 0:L.sjt_emphasis_note)||"Relative emphasis in this SJT's trade-offs: higher / middle / lower."}</div>
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
          ${U}
        </div>
        <div>
          <span class="block text-[10px] uppercase tracking-wider text-black font-semibold mb-1">Confidence Distribution</span>
          ${$e}
        </div>
        <div>
          <span class="block text-[10px] uppercase tracking-wider text-black font-semibold mb-1">Profile Completeness</span>
          ${_e}
        </div>
      </div>
    </details>

    <div class="mb-6">
      <div class="flex flex-wrap justify-between items-center gap-3 mb-3">
        <div class="flex items-center gap-3 flex-wrap">
          <h3 class="text-xs font-semibold tracking-widest uppercase text-[var(--accent-gold)]">2. Evidence by parameter</h3>
          <div class="inline-flex items-center gap-1.5 p-1 bg-[#f0eeea] border border-[var(--grid-border)]" role="group" aria-label="Sort dimensions">
            <span class="text-[10px] uppercase font-mono tracking-wider text-black px-1.5 font-semibold">Rank By:</span>
            <button id="sortBySjtBtn" class="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider transition-colors ${n==="sjt"?"bg-[var(--text-primary)] text-white":"text-stone-700 hover:bg-[#e4e1dc]"} ${N?"":"opacity-40 cursor-not-allowed"}" ${N?'title="Rank by Written Situational Trade-offs"':'disabled title="No SJT data"'}>
              Written (SJT) ${n==="sjt"?"&darr;":""}
            </button>
            <button id="sortByGameBtn" class="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider transition-colors ${n==="game"?"bg-[var(--text-primary)] text-white":"text-stone-700 hover:bg-[#e4e1dc]"} ${S?"":"opacity-40 cursor-not-allowed"}" ${S?'title="Rank by Practical Hands-On Game Performance"':'disabled title="Game data pending"'}>
              Hands-On (Games) ${n==="game"?"&darr;":""}
            </button>
            <button id="sortByDeltaBtn" class="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider transition-colors ${n==="delta"?"bg-[var(--text-primary)] text-white":"text-stone-700 hover:bg-[#e4e1dc]"} ${z?"":"opacity-40 cursor-not-allowed"}" ${z?'title="Rank by Largest Difference Between Words and Actions"':'disabled title="Requires both SJT and Game data"'}>
              Difference (&Delta;) ${n==="delta"?"&darr;":""}
            </button>
          </div>
        </div>
        <div class="flex items-center gap-3">
          <div class="inline-flex items-center gap-1 p-0.5 bg-[#f0eeea] border border-[var(--grid-border)]" role="group" aria-label="Table density">
            <button id="densityComfortableBtn" class="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider transition-colors bg-[var(--text-primary)] text-white" title="Comfortable row padding">Comfortable</button>
            <button id="densityCompactBtn" class="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider transition-colors text-stone-700 hover:bg-[#e4e1dc]" title="Compact row padding">Compact</button>
          </div>
          <span class="text-xs uppercase tracking-wider text-black">Profile Completeness: <strong class="text-[var(--text-primary)]">${Y}</strong></span>
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
            ${re(ae(n),n)}
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
        <span class="text-xs text-black">${I.task_records_statement||"Descriptive task counts; not a score."}</span>
      </div>
      ${oe(fe,"Core Battery","background:#eaf5ea; color:#1e6624; border:1px solid #bce0bc;")}
      ${oe(he,"Research Bank","background:#f0eeea; color:var(--text-secondary); border:1px solid var(--grid-border);")}
    </div>
    `,($=document.getElementById("backToRegistryBtn"))==null||$.addEventListener("click",()=>h()),(F=document.getElementById("recomputeTelemetryBtn"))==null||F.addEventListener("click",()=>M(i,!0));const B=e=>{n=e;const a=document.getElementById("dimensionTableBody");a&&(a.innerHTML=re(ae(n),n));const t=document.getElementById("sortBySjtBtn"),r=document.getElementById("sortByGameBtn"),o=document.getElementById("sortByDeltaBtn");t&&N&&(t.className=`px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider transition-colors ${n==="sjt"?"bg-[var(--text-primary)] text-white":"text-stone-700 hover:bg-[#e4e1dc]"}`,t.innerHTML=`Written (SJT) ${n==="sjt"?"&darr;":""}`),r&&S&&(r.className=`px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider transition-colors ${n==="game"?"bg-[var(--text-primary)] text-white":"text-stone-700 hover:bg-[#e4e1dc]"}`,r.innerHTML=`Hands-On (Games) ${n==="game"?"&darr;":""}`),o&&z&&(o.className=`px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider transition-colors ${n==="delta"?"bg-[var(--text-primary)] text-white":"text-stone-700 hover:bg-[#e4e1dc]"}`,o.innerHTML=`Difference (&Delta;) ${n==="delta"?"&darr;":""}`);const d=document.getElementById("thSjtArrow"),m=document.getElementById("thGameArrow"),l=document.getElementById("thDeltaArrow");d&&(d.innerHTML=n==="sjt"?"&darr;":""),m&&(m.innerHTML=n==="game"?"&darr;":""),l&&(l.innerHTML=n==="delta"?"&darr;":"");const c=document.getElementById("thSjt"),k=document.getElementById("thGame"),f=document.getElementById("thDelta");c&&c.setAttribute("aria-sort",n==="sjt"?"descending":"none"),k&&k.setAttribute("aria-sort",n==="game"?"descending":"none"),f&&f.setAttribute("aria-sort",n==="delta"?"descending":"none")};N&&((_=document.getElementById("sortBySjtBtn"))==null||_.addEventListener("click",()=>B("sjt")),(E=document.getElementById("thSjt"))==null||E.addEventListener("click",()=>B("sjt"))),S&&((j=document.getElementById("sortByGameBtn"))==null||j.addEventListener("click",()=>B("game")),(G=document.getElementById("thGame"))==null||G.addEventListener("click",()=>B("game"))),z&&((s=document.getElementById("sortByDeltaBtn"))==null||s.addEventListener("click",()=>B("delta")),(b=document.getElementById("thDelta"))==null||b.addEventListener("click",()=>B("delta")));const T=document.getElementById("dimensionTable"),R=document.getElementById("densityComfortableBtn"),H=document.getElementById("densityCompactBtn");R==null||R.addEventListener("click",()=>{T==null||T.classList.remove("compact-table"),R.className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider transition-colors bg-[var(--text-primary)] text-white",H.className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider transition-colors text-stone-700 hover:bg-[#e4e1dc]"}),H==null||H.addEventListener("click",()=>{T==null||T.classList.add("compact-table"),H.className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider transition-colors bg-[var(--text-primary)] text-white",R.className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider transition-colors text-stone-700 hover:bg-[#e4e1dc]"}),window.lucide&&window.lucide.createIcons()}catch(W){console.error("Failed to load applicant dossier:",W),y.innerHTML=`
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
    `,(P=document.getElementById("backToRegistryErrBtn"))==null||P.addEventListener("click",()=>h()),(X=document.getElementById("retryDossierBtn"))==null||X.addEventListener("click",()=>M(i,!1)),(ee=document.getElementById("recomputeDossierBtn"))==null||ee.addEventListener("click",()=>M(i,!0))}}window.loadSessionsList=h;window.loadSessionDetail=M;
