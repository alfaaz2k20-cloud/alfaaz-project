import"./global-DKWxUifK.js";document.addEventListener("DOMContentLoaded",async()=>{const i=localStorage.getItem("alfaaz_token"),c=localStorage.getItem("alfaaz_user");if(!i||!c){window.location.href="login.html";return}try{if(JSON.parse(c).status!=="ADMIN"){window.location.href="dashboard.html";return}}catch{localStorage.removeItem("alfaaz_token"),localStorage.removeItem("alfaaz_user"),window.location.href="login.html";return}Te(),await H()});function Te(){var i;(i=document.getElementById("logoutBtn"))==null||i.addEventListener("click",()=>{localStorage.removeItem("alfaaz_token"),window.location.href="login.html"})}async function H(i=""){var I,T,p,$,_;const c=document.getElementById("researchContent"),l=window.ALFAAZ_API_URL||"https://alfaaz-project.onrender.com";try{const w=localStorage.getItem("alfaaz_token"),A=`${l}/recruit/research/sessions${i?`?status=${encodeURIComponent(i)}`:""}`,C=await fetch(A,{headers:{Authorization:`Bearer ${w}`}});if(C.status===401||C.status===403){alert("Admin clearance required."),window.location.href="login.html";return}const S=await C.json(),L=`
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-white border border-[var(--grid-border)] p-4">
      <div>
        <h2 class="text-base sm:text-lg text-[var(--text-primary)] font-serif">Applicant Assessment Records</h2>
        <span class="text-xs text-black">Ordered strictly by submission time</span>
      </div>
      <div class="flex items-center gap-3 flex-wrap">
        <button id="manageInterviewHoursBtn" class="px-2.5 py-1 text-xs border border-[var(--grid-border)] bg-[#faf8f5] text-[var(--text-primary)] hover:bg-[#eae6dc] transition-colors flex items-center gap-1.5" title="Configure interview time windows and working days">
          <span>⏱️</span>
          <span>Interview Hours</span>
        </button>
        <div class="flex items-center gap-1.5">
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
    </div>
    `;if(!S||S.length===0){c.innerHTML=`
      ${L}
      <div class="p-12 text-center bg-white border border-[var(--grid-border)] mt-4 space-y-2">
        <div class="text-[var(--text-primary)] font-medium">No assessment sessions found for this status.</div>
        <div class="text-xs text-stone-500 max-w-md mx-auto">
          Candidate records will appear here as applicants consent and begin their assessment journeys. You can also select &ldquo;All Operational Statuses&rdquo; to review in-progress candidate sessions.
        </div>
      </div>
      `,(I=document.getElementById("statusFilter"))==null||I.addEventListener("change",s=>{H(s.target.value)}),(T=document.getElementById("manageInterviewHoursBtn"))==null||T.addEventListener("click",()=>{ve()});return}const m=S.map(s=>{const o=s.interview_booking,d=o?`<span class="inline-flex items-center gap-1 px-2 py-0.5 bg-[#eaf5ea] border border-[#bce0bc] text-[#1e6624] text-[10px] font-medium" title="Booked slot">
            <span>📅</span>
            <span>${window.escapeHtml(o.slot_display||`${o.slot_date} ${o.slot_time}`)}</span>
          </span>`:'<span class="text-stone-400 text-[10px] italic">Not scheduled</span>';return`
      <tr class="border-b border-[var(--grid-border)] hover:bg-[#faf8f5] transition-colors">
        <td class="p-4 text-sm font-medium text-[var(--text-primary)]">${window.escapeHtml(s.full_name||"Anonymous Applicant")}</td>
        <td class="p-4 text-xs text-black">${window.escapeHtml(s.email||"—")}</td>
        <td class="p-4 text-xs text-black">${s.linkedin_url?`<a href="${window.escapeHtml(s.linkedin_url.startsWith("http")?s.linkedin_url:"https://"+s.linkedin_url)}" target="_blank" rel="noopener noreferrer" class="text-[var(--accent-gold)] hover:underline inline-flex items-center gap-1" title="${window.escapeHtml(s.linkedin_url)}">Link &nearr;</a>`:"—"}</td>
        <td class="p-4 text-xs">${d}</td>
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
      `}).join("");c.innerHTML=`
    <div class="space-y-4">
      ${L}
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
              ${m}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    `,(p=document.getElementById("statusFilter"))==null||p.addEventListener("change",s=>{H(s.target.value)}),($=document.getElementById("manageInterviewHoursBtn"))==null||$.addEventListener("click",()=>{ve()}),c.querySelectorAll(".view-session-btn").forEach(s=>{s.addEventListener("click",()=>{const o=s.getAttribute("data-id");z(o)})}),window.lucide&&window.lucide.createIcons()}catch(w){console.error("Failed to load applicant assessment sessions:",w),c.innerHTML=`
      <div class="p-8 text-center bg-white border border-[var(--grid-border)] space-y-3">
        <div class="text-red-700 font-medium">Unable to load applicant assessment sessions.</div>
        <div class="text-xs text-stone-500">Please check your network connection or verify that the service is running.</div>
        <button id="retrySessionsBtn" class="px-4 py-2 bg-[var(--text-primary)] text-white text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] transition-colors">
          Retry
        </button>
      </div>
    `,(_=document.getElementById("retrySessionsBtn"))==null||_.addEventListener("click",()=>H(i))}}async function z(i,c=!1){var T,p,$,_,w,A,C,S,L,m,s,o,d,b;const l=document.getElementById("researchContent"),I=window.ALFAAZ_API_URL||"https://alfaaz-project.onrender.com";l.innerHTML=`
  <div class="mb-4">
    <button id="backToRegistryLoadingBtn" class="text-xs uppercase tracking-widest text-black hover:text-[var(--accent-gold)]">&larr; Back to Registry</button>
  </div>
  <div class="p-12 text-center text-[var(--text-secondary)] font-serif text-lg bg-white border border-[var(--grid-border)]">
    Loading applicant dossier${c?" (re-analyzing telemetry)...":"..."}
  </div>
  `,(T=document.getElementById("backToRegistryLoadingBtn"))==null||T.addEventListener("click",()=>H());try{const f=localStorage.getItem("alfaaz_token"),W=`${I}/recruit/research/sessions/${i}${c?"?recompute=true":""}`,N=await fetch(W,{headers:{Authorization:`Bearer ${f}`}});if(!N.ok){let e=N.statusText;try{const a=await N.json();a&&a.detail&&(e=a.detail)}catch{}throw new Error(`HTTP ${N.status}: ${e}`)}const E=await N.json(),k=E.metadata||{},v=k.applicant||{},D=E.measurement_comparisons||{},Y=window.escapeHtml(v.full_name||"Candidate"),Z=window.escapeHtml(v.email||"—"),ie=window.escapeHtml(v.phone_or_contact||"—"),P=v.linkedin_url?window.escapeHtml(v.linkedin_url):null,oe=k.duration_minutes!==null?`${k.duration_minutes} min`:"In progress",y=v.interview_booking||null,Q=(v.phone_or_contact||"").replace(/[^0-9]/g,""),fe=Q?`
      <a href="https://wa.me/${Q}?text=${encodeURIComponent(`Hello ${v.full_name||""}, this is the Alfaaz Collective recruitment team regarding your interview.`)}" target="_blank" rel="noopener noreferrer" class="text-[11px] text-[#1e6624] hover:underline inline-flex items-center gap-1 font-medium mt-1">
        <span>💬</span> Chat on WhatsApp &nearr;
      </a>`:"",R=E.dimensions||[],te=(E.profile_summary||{}).completeness||"INSUFFICIENT",je=e=>e==="RELATIVELY_STRONG"?'<span class="px-2 py-0.5 bg-[#f5efe6] text-[#8c651e] border border-[#d4be98] text-[10px] font-semibold uppercase tracking-wider">Relatively Strong</span>':e==="RELATIVELY_LOWER"?'<span class="px-2 py-0.5 bg-gray-100 text-black border border-gray-200 text-[10px] uppercase tracking-wider">Relatively Lower</span>':e==="ABOUT_EQUAL"?'<span class="px-2 py-0.5 bg-gray-100 text-gray-600 border border-gray-300 text-[10px] uppercase tracking-wider">About Equal</span>':e==="RELATIVELY_MIDDLE"?'<span class="px-2 py-0.5 bg-gray-50 text-gray-700 border border-gray-300 text-[10px] uppercase tracking-wider">Relatively Middle</span>':'<span class="px-2 py-0.5 bg-gray-50 text-black border border-gray-200 text-[10px] uppercase tracking-wider">Insufficient</span>',he=e=>e==="ALIGNED"?'<span class="text-green-700 font-semibold uppercase text-[10px] tracking-wider">Aligned</span>':e==="PARTLY_ALIGNED"?'<span class="text-[var(--text-primary)] font-semibold uppercase text-[10px] tracking-wider">Partly Aligned</span>':e==="DIFFERENT"?'<span class="text-purple-700 font-semibold uppercase text-[10px] tracking-wider">Different</span>':e==="NOT_ENOUGH_EVIDENCE"?'<span class="text-stone-500 text-[10px]">Not Enough Evidence</span>':'<span class="text-black text-[10px]">Not Available</span>',ye=e=>{const a=e.sjt&&e.sjt.relative!==null&&e.sjt.relative!==void 0?Number(e.sjt.relative):null,t=e.game_relative!==null&&e.game_relative!==void 0?Number(e.game_relative):e.games&&e.games.relative!==null&&e.games.relative!==void 0?Number(e.games.relative):null,r=e.cross_method_delta!==null&&e.cross_method_delta!==void 0?Number(e.cross_method_delta):null,u=e.relationship||"NOT_AVAILABLE",h=e.confidence||"LIMITED",B=window.escapeHtml(e.display_name||e.parameter||"Dimension");if(a===null&&t===null)return'<span class="text-stone-500 italic">Insufficient observations across methods.</span>';if(a!==null&&t===null)return a>=.6?`High situational intent (${a.toFixed(2)}); deliberate scenario priority pending behavioral activity verification.`:a>=.4?`Balanced situational baseline (${a.toFixed(2)}); steady trade-off priority pending behavioral activity verification.`:`Lower situational priority (${a.toFixed(2)}); selective trade-off allocation pending behavioral activity verification.`;if(a===null&&t!==null)return t>=.6?`Elevated behavioral activity (${t.toFixed(2)}); strong task engagement pending situational trade-off confirmation.`:t>=.4?`Moderate behavioral activity (${t.toFixed(2)}); standard task engagement pending situational trade-off confirmation.`:`Lower behavioral activity (${t.toFixed(2)}); minimal task engagement pending situational trade-off confirmation.`;const g=r!==null?r.toFixed(2):Math.abs(a-t).toFixed(2),x=h==="SUBSTANTIAL"?'<span class="text-emerald-700 font-medium"> [High Confidence]</span>':h==="MODERATE"?'<span class="text-stone-600"> [Moderate Confidence]</span>':'<span class="text-amber-700"> [Limited Confidence]</span>';return u==="ALIGNED"||r!==null&&r<=.15?a>=.55&&t>=.55?`<strong>Strong convergent strength</strong> (&Delta; ${g}). High deliberate priority matches active simulation execution.${x}`:a<.38&&t<.38?`<strong>Consistently lower emphasis</strong> (&Delta; ${g}). Selectively allocated away across both judgment trade-offs and simulation.${x}`:`<strong>Harmonious baseline</strong> (&Delta; ${g}). Stated trade-offs closely mirror practical simulation actions.${x}`:u==="PARTLY_ALIGNED"||r!==null&&r<=.3?a>t?`<strong>Moderate judgment emphasis</strong> (&Delta; ${g}). Higher conceptual importance in trade-offs than manifested in simulation.${x}`:`<strong>Moderate behavioral emphasis</strong> (&Delta; ${g}). Higher hands-on task engagement than expressed in judgment trade-offs.${x}`:u==="DIFFERENT"||r!==null&&r>.3?a>t?`<strong>Marked divergence</strong> (&Delta; ${g}). High stated situational intent contrasts with lower task execution; explore aspirational values in interview.${x}`:`<strong>Marked divergence</strong> (&Delta; ${g}). Hands-on execution exceeds stated situational priority; suggests tacit, unstated capability. Explore in interview.${x}`:u==="NOT_ENOUGH_EVIDENCE"?`<span class="text-stone-500 italic">Inconclusive evidence (&Delta; ${g}); observations below verification threshold.${x}</span>`:`Provisional data (&Delta; ${g}): SJT ${a.toFixed(2)}, Games ${t.toFixed(2)}.${x}`};let n="sjt";const U=R.some(e=>e.sjt&&e.sjt.relative!==null&&e.sjt.relative!==void 0),V=R.some(e=>e.game_relative!==null&&e.game_relative!==void 0||e.games&&e.games.relative!==null&&e.games.relative!==void 0),K=R.some(e=>e.cross_method_delta!==null&&e.cross_method_delta!==void 0);!U&&V&&(n="game");const le=e=>[...R].sort((a,t)=>{var g,x,O,M,ee,ae,se,re,ne,ge,xe,be;let r,u,h,B;return e==="game"?(r=a.game_relative!==null&&a.game_relative!==void 0?Number(a.game_relative):a.games&&a.games.relative!==null&&a.games.relative!==void 0?Number(a.games.relative):-1/0,u=t.game_relative!==null&&t.game_relative!==void 0?Number(t.game_relative):t.games&&t.games.relative!==null&&t.games.relative!==void 0?Number(t.games.relative):-1/0,h=((g=a.sjt)==null?void 0:g.relative)!==null&&((x=a.sjt)==null?void 0:x.relative)!==void 0?Number(a.sjt.relative):-1/0,B=((O=t.sjt)==null?void 0:O.relative)!==null&&((M=t.sjt)==null?void 0:M.relative)!==void 0?Number(t.sjt.relative):-1/0):e==="delta"?(r=a.cross_method_delta!==null&&a.cross_method_delta!==void 0?Number(a.cross_method_delta):-1/0,u=t.cross_method_delta!==null&&t.cross_method_delta!==void 0?Number(t.cross_method_delta):-1/0,h=((ee=a.sjt)==null?void 0:ee.relative)!==null&&((ae=a.sjt)==null?void 0:ae.relative)!==void 0?Number(a.sjt.relative):-1/0,B=((se=t.sjt)==null?void 0:se.relative)!==null&&((re=t.sjt)==null?void 0:re.relative)!==void 0?Number(t.sjt.relative):-1/0):(r=((ne=a.sjt)==null?void 0:ne.relative)!==null&&((ge=a.sjt)==null?void 0:ge.relative)!==void 0?Number(a.sjt.relative):-1/0,u=((xe=t.sjt)==null?void 0:xe.relative)!==null&&((be=t.sjt)==null?void 0:be.relative)!==void 0?Number(t.sjt.relative):-1/0,h=a.game_relative!==null&&a.game_relative!==void 0?Number(a.game_relative):a.games&&a.games.relative!==null&&a.games.relative!==void 0?Number(a.games.relative):-1/0,B=t.game_relative!==null&&t.game_relative!==void 0?Number(t.game_relative):t.games&&t.games.relative!==null&&t.games.relative!==void 0?Number(t.games.relative):-1/0),u!==r?u-r:B!==h?B-h:(a.display_name||a.parameter||"").localeCompare(t.display_name||t.parameter||"")}),de=(e,a)=>e.map((t,r)=>{const u=he(t.relationship),h=t.confidence||"LIMITED",B=window.escapeHtml(t.display_name||t.parameter),g=t.sjt&&t.sjt.relative!==null&&t.sjt.relative!==void 0?t.sjt.relative.toFixed(2):"—",x=t.game_relative!==null&&t.game_relative!==void 0?t.game_relative.toFixed(2):t.games&&t.games.relative!==null&&t.games.relative!==void 0?t.games.relative.toFixed(2):"—",O=t.cross_method_delta!==null&&t.cross_method_delta!==void 0?t.cross_method_delta.toFixed(2):"—",M=window.escapeHtml(t.observed_behavior||"—"),ee=ye(t);return`
        <tr class="group border-b border-[var(--grid-border)] hover:bg-[#faf9f6] transition-colors">
          <td scope="row" class="p-3 text-center font-mono text-xs font-semibold text-stone-500 w-12 min-w-[48px] max-w-[48px] sticky-col-rank bg-white group-hover:bg-[#faf9f6] transition-colors">${r+1}</td>
          <td class="p-3 font-medium text-[var(--text-primary)] min-w-[200px] sticky-col-dim bg-white group-hover:bg-[#faf9f6] transition-colors">
            <div>${B}</div>
            <div class="text-[10px] text-stone-600 mt-0.5 line-clamp-2" title="${M}">${M}</div>
          </td>
          <td class="p-3 text-center font-mono text-xs ${a==="sjt"?"font-bold bg-[#faf8f5]":""}">${g}</td>
          <td class="p-3 text-center font-mono text-xs ${a==="game"?"font-bold bg-[#faf8f5]":""}">${x}</td>
          <td class="p-3 text-center font-mono text-xs ${a==="delta"?"font-bold bg-[#faf8f5]":""}">${O}</td>
          <td class="p-3 text-center text-xs whitespace-nowrap">${u}</td>
          <td class="p-3 text-center text-[10px] uppercase text-black font-semibold whitespace-nowrap">${h}</td>
          <td class="p-3 text-xs text-[var(--text-primary)] leading-relaxed min-w-[280px]">${ee}</td>
        </tr>
        `}).join(""),ce=k.battery_version==="2.0"?"V2 (14-Game Candidate Core)":k.battery_version==="1.0"?"V1 (21-Game Historical Battery)":k.battery_version||"2.0 (Candidate Core)",pe=E.task_records||[],we=pe.filter(e=>e.battery_role==="candidate_core"||!e.battery_role&&!["F3","A3","C3","E3","Q3","CR2","M3"].includes(e.game_id)),ke=pe.filter(e=>e.battery_role==="research_bank"||e.battery_role!=="candidate_core"&&["F3","A3","C3","E3","Q3","CR2","M3"].includes(e.game_id)),me=R.filter(e=>e.cross_method_delta!==null&&e.cross_method_delta!==void 0).map(e=>({name:e.display_name||e.parameter||"Dimension",delta:Number(e.cross_method_delta),sjt:e.sjt&&e.sjt.relative!==null&&e.sjt.relative!==void 0?Number(e.sjt.relative):null,game:e.game_relative!==null&&e.game_relative!==void 0?Number(e.game_relative):e.games&&e.games.relative!==null&&e.games.relative!==void 0?Number(e.games.relative):null,rel:e.relationship||"NOT_AVAILABLE"})).sort((e,a)=>a.delta-e.delta),j=me.length>0?me[0]:null,$e=R.filter(e=>e.confidence==="SUBSTANTIAL").length,_e=R.filter(e=>e.confidence==="MODERATE").length,Ee=R.filter(e=>e.confidence==="LIMITED"||!e.confidence).length;let X="";if(j&&j.delta>.15){const e=j.sjt!==null&&j.game!==null?j.sjt>j.game?"Higher situational trade-off than simulation execution":"Higher simulation execution than situational trade-off":"Cross-method variance detected";X=`
        <div class="text-[var(--text-primary)] font-medium font-serif">${window.escapeHtml(j.name)} (&Delta; ${j.delta.toFixed(2)})</div>
        <div class="text-[11px] text-stone-600 mt-0.5">${e}. Explore balance during structured interview.</div>
      `}else j?X=`
        <div class="text-emerald-700 font-medium">Harmonious alignment across methods</div>
        <div class="text-[11px] text-stone-600 mt-0.5">Max divergence is minimal (&Delta; ${j.delta.toFixed(2)}). Stated trade-offs mirror task execution.</div>
      `:X=`
        <div class="text-stone-500 italic">Method triangulation pending</div>
        <div class="text-[11px] text-stone-500 mt-0.5">Divergence metrics will populate once both situational and game observations are recorded.</div>
      `;const Be=`
      <div class="flex items-center gap-2 text-xs">
        <span class="text-emerald-700 font-mono font-medium">${$e} High</span>
        <span class="text-stone-400">&bull;</span>
        <span class="text-stone-700 font-mono">${_e} Moderate</span>
        <span class="text-stone-400">&bull;</span>
        <span class="text-amber-800 font-mono">${Ee} Limited</span>
      </div>
      <div class="text-[11px] text-stone-600 mt-0.5">Evidence confidence reflects observation volume and stability.</div>
    `,Ie=`
      <div class="text-xs">${te==="COMPLETE"?'<span class="text-emerald-700 font-medium font-mono">COMPLETE</span>':te==="PARTIAL"?'<span class="text-stone-700 font-medium font-mono">PARTIAL</span>':'<span class="text-amber-800 font-medium font-mono">INSUFFICIENT</span>'} &mdash; <span class="font-mono">${ce}</span></div>
      <div class="text-[11px] text-stone-600 mt-0.5">Duration: ${oe}. All observations remain provisional.</div>
    `,ue=(e,a,t)=>!e||e.length===0?"":`
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
              ${e.map(r=>{const u=r.status==="RECORDED"?"background:#eaf5ea; color:#1e6624; border:1px solid #bce0bc;":r.status==="NOT_DERIVED"?"background:#f0eeea; color:var(--text-secondary); border:1px solid var(--grid-border);":"background:#fdf2e9; color:#9c4221; border:1px solid #f0cdb8;",h=r.status==="NOT_DERIVED"?'<span class="text-black italic">Unattempted &middot; Reserved in Research Bank</span>':window.escapeHtml(r.display_text||"—");return`
                <tr class="border-b border-[var(--grid-border)]">
                  <td class="p-3 font-semibold text-[var(--text-primary)]">${r.game_id}: ${window.escapeHtml(r.game_name||r.game_id)}</td>
                  <td class="p-3 text-black">${r.world_id}: ${window.escapeHtml(r.world_name||"")}</td>
                  <td class="p-3"><span class="badge" style="font-size:10px; ${u}">${r.status}</span></td>
                  <td class="p-3 text-black leading-relaxed">${h}</td>
                </tr>
                `}).join("")}
            </tbody>
          </table>
        </div>
      </div>
      `;l.innerHTML=`
    <div class="mb-4 flex justify-between items-center">
      <button id="backToRegistryBtn" class="text-xs uppercase tracking-widest text-black hover:text-[var(--accent-gold)]">&larr; Back to Registry</button>
      <button id="recomputeTelemetryBtn" class="px-3 py-1 bg-[#f4f1ea] border border-[var(--grid-border)] text-[10px] uppercase tracking-wider hover:bg-[#eae6dc] transition-colors" title="Re-extracts and re-scores behavioral game telemetry from scratch (opt-in recalculation)">
        Re-analyze Telemetry
      </button>
    </div>
    
    <div class="bg-[#faf8f5] border border-[var(--grid-border)] p-6 mb-4">
      <h3 class="text-xs font-semibold tracking-widest uppercase text-[var(--accent-gold)] mb-4">1. Candidate & Session Overview</h3>
      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 text-sm">
        <div><strong class="block text-black text-xs uppercase tracking-wider mb-1">Name</strong>${Y}</div>
        <div><strong class="block text-black text-xs uppercase tracking-wider mb-1">Email</strong>${Z}</div>
        <div>
          <strong class="block text-black text-xs uppercase tracking-wider mb-1">WhatsApp / Contact</strong>
          <div>${ie}</div>
          ${fe}
        </div>
        <div>
          <strong class="block text-black text-xs uppercase tracking-wider mb-1">Interview Slot</strong>
          ${y?`<span class="inline-flex items-center gap-1 px-2 py-0.5 bg-[#eaf5ea] border border-[#bce0bc] text-[#1e6624] text-xs font-semibold">📅 ${window.escapeHtml(y.slot_display||`${y.slot_date} ${y.slot_time}`)}</span>`:'<span class="text-stone-400 text-xs italic">Not scheduled</span>'}
        </div>
        <div><strong class="block text-black text-xs uppercase tracking-wider mb-1">LinkedIn / CV</strong>${P?`<a href="${P.startsWith("http")?P:"https://"+P}" target="_blank" rel="noopener noreferrer" class="text-[var(--accent-gold)] hover:underline block truncate" title="${P}">Open Link &nearr;</a>`:'<span class="text-stone-400">—</span>'}</div>
        <div><strong class="block text-black text-xs uppercase tracking-wider mb-1">Session Duration</strong>${oe}</div>
        <div><strong class="block text-black text-xs uppercase tracking-wider mb-1">Battery Version</strong><span class="badge" style="font-size:10px; background:#f0eeea; color:var(--text-primary); border:1px solid var(--grid-border);">${ce}</span></div>
      </div>
      ${y?`
      <div class="mt-4 pt-3 border-t border-[var(--grid-border)] flex flex-wrap items-center justify-between gap-3 text-xs bg-white p-3 border border-[#bce0bc]">
        <div class="flex items-center gap-2 text-[#1e6624]">
          <span class="text-base">📅</span>
          <div>
            <span class="font-semibold uppercase tracking-wider text-[10px]">Confirmed Interview Slot:</span>
            <span class="font-serif text-sm ml-1 text-black">${window.escapeHtml(y.slot_display||`${y.slot_date} at ${y.slot_time}`)}</span>
          </div>
        </div>
        <div class="flex items-center gap-2 flex-wrap">
          <button id="rescheduleBtn" class="px-2.5 py-1 bg-[var(--text-primary)] text-white text-[11px] font-medium hover:bg-[var(--accent-gold)] transition-colors inline-flex items-center gap-1">Change / Reschedule Slot</button>
          ${Q?`<a href="https://wa.me/${Q}?text=${encodeURIComponent(`Hello ${v.full_name||""}, this is the Alfaaz Collective recruitment team confirming your interview slot: ${y.slot_display||`${y.slot_date} ${y.slot_time}`}.`)}" target="_blank" rel="noopener noreferrer" class="px-2.5 py-1 bg-[#25D366] text-white rounded text-[11px] font-medium hover:opacity-90 inline-flex items-center gap-1">Open WhatsApp Chat &nearr;</a>`:""}
          <a href="mailto:${window.escapeHtml(v.email||"")}?subject=${encodeURIComponent(`Alfaaz Collective — Interview Confirmation: ${y.slot_display||y.slot_date}`)}" class="px-2.5 py-1 border border-[var(--grid-border)] bg-[#faf8f5] text-black text-[11px] font-medium hover:bg-stone-100">Send Email</a>
        </div>
      </div>
      `:`
      <div class="mt-4 pt-3 border-t border-[var(--grid-border)] flex flex-wrap items-center justify-between gap-3 text-xs bg-white p-3 border border-[var(--grid-border)]">
        <div class="text-stone-500 italic">Interview timing is currently unassigned for this candidate.</div>
        <div>
          <button id="rescheduleBtn" class="px-2.5 py-1 bg-[var(--text-primary)] text-white text-[11px] font-medium hover:bg-[var(--accent-gold)] transition-colors inline-flex items-center gap-1">Assign / Schedule Slot</button>
        </div>
      </div>
      `}
    </div>

    <div class="bg-white border-l-4 border-[var(--accent-gold)] border-t border-r border-b border-[var(--grid-border)] p-4 mb-4 text-xs text-black leading-relaxed">
      <strong class="text-[var(--text-primary)] uppercase tracking-wider">Psychometric Safeguard Notice:</strong>
      This dossier provides a <em>provisional within-person relative profile</em> for exploratory human review only. It reflects the relative emphasis among dimensions for this candidate, NOT normative trait scores, clinical evaluation, or automated hiring decisions. Cross-method convergence is exploratory; empirical normative calibration is pending.
      <div class="mt-2 text-[11px] text-[var(--text-secondary)] italic">${((p=k.safeguards)==null?void 0:p.sjt_emphasis_note)||"Relative emphasis in this SJT's trade-offs: higher / middle / lower."}</div>
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
          ${X}
        </div>
        <div>
          <span class="block text-[10px] uppercase tracking-wider text-black font-semibold mb-1">Confidence Distribution</span>
          ${Be}
        </div>
        <div>
          <span class="block text-[10px] uppercase tracking-wider text-black font-semibold mb-1">Profile Completeness</span>
          ${Ie}
        </div>
      </div>
    </details>

    <div class="mb-6">
      <div class="flex flex-wrap justify-between items-center gap-3 mb-3">
        <div class="flex items-center gap-3 flex-wrap">
          <h3 class="text-xs font-semibold tracking-widest uppercase text-[var(--accent-gold)]">2. Evidence by parameter</h3>
          <div class="inline-flex items-center gap-1.5 p-1 bg-[#f0eeea] border border-[var(--grid-border)]" role="group" aria-label="Sort dimensions">
            <span class="text-[10px] uppercase font-mono tracking-wider text-black px-1.5 font-semibold">Rank By:</span>
            <button id="sortBySjtBtn" class="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider transition-colors ${n==="sjt"?"bg-[var(--text-primary)] text-white":"text-stone-700 hover:bg-[#e4e1dc]"} ${U?"":"opacity-40 cursor-not-allowed"}" ${U?'title="Rank by Written Situational Trade-offs"':'disabled title="No SJT data"'}>
              Written (SJT) ${n==="sjt"?"&darr;":""}
            </button>
            <button id="sortByGameBtn" class="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider transition-colors ${n==="game"?"bg-[var(--text-primary)] text-white":"text-stone-700 hover:bg-[#e4e1dc]"} ${V?"":"opacity-40 cursor-not-allowed"}" ${V?'title="Rank by Practical Hands-On Game Performance"':'disabled title="Game data pending"'}>
              Hands-On (Games) ${n==="game"?"&darr;":""}
            </button>
            <button id="sortByDeltaBtn" class="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider transition-colors ${n==="delta"?"bg-[var(--text-primary)] text-white":"text-stone-700 hover:bg-[#e4e1dc]"} ${K?"":"opacity-40 cursor-not-allowed"}" ${K?'title="Rank by Largest Difference Between Words and Actions"':'disabled title="Requires both SJT and Game data"'}>
              Difference (&Delta;) ${n==="delta"?"&darr;":""}
            </button>
          </div>
        </div>
        <div class="flex items-center gap-3">
          <div class="inline-flex items-center gap-1 p-0.5 bg-[#f0eeea] border border-[var(--grid-border)]" role="group" aria-label="Table density">
            <button id="densityComfortableBtn" class="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider transition-colors bg-[var(--text-primary)] text-white" title="Comfortable row padding">Comfortable</button>
            <button id="densityCompactBtn" class="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider transition-colors text-stone-700 hover:bg-[#e4e1dc]" title="Compact row padding">Compact</button>
          </div>
          <span class="text-xs uppercase tracking-wider text-black">Profile Completeness: <strong class="text-[var(--text-primary)]">${te}</strong></span>
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
            ${de(le(n),n)}
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
        <span class="text-xs text-black">${E.task_records_statement||"Descriptive task counts; not a score."}</span>
      </div>
      ${ue(we,"Core Battery","background:#eaf5ea; color:#1e6624; border:1px solid #bce0bc;")}
      ${ue(ke,"Research Bank","background:#f0eeea; color:var(--text-secondary); border:1px solid var(--grid-border);")}
    </div>
    `,($=document.getElementById("backToRegistryBtn"))==null||$.addEventListener("click",()=>H()),(_=document.getElementById("recomputeTelemetryBtn"))==null||_.addEventListener("click",()=>z(i,!0)),(w=document.getElementById("rescheduleBtn"))==null||w.addEventListener("click",()=>Se(i,v,y));const F=e=>{n=e;const a=document.getElementById("dimensionTableBody");a&&(a.innerHTML=de(le(n),n));const t=document.getElementById("sortBySjtBtn"),r=document.getElementById("sortByGameBtn"),u=document.getElementById("sortByDeltaBtn");t&&U&&(t.className=`px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider transition-colors ${n==="sjt"?"bg-[var(--text-primary)] text-white":"text-stone-700 hover:bg-[#e4e1dc]"}`,t.innerHTML=`Written (SJT) ${n==="sjt"?"&darr;":""}`),r&&V&&(r.className=`px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider transition-colors ${n==="game"?"bg-[var(--text-primary)] text-white":"text-stone-700 hover:bg-[#e4e1dc]"}`,r.innerHTML=`Hands-On (Games) ${n==="game"?"&darr;":""}`),u&&K&&(u.className=`px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider transition-colors ${n==="delta"?"bg-[var(--text-primary)] text-white":"text-stone-700 hover:bg-[#e4e1dc]"}`,u.innerHTML=`Difference (&Delta;) ${n==="delta"?"&darr;":""}`);const h=document.getElementById("thSjtArrow"),B=document.getElementById("thGameArrow"),g=document.getElementById("thDeltaArrow");h&&(h.innerHTML=n==="sjt"?"&darr;":""),B&&(B.innerHTML=n==="game"?"&darr;":""),g&&(g.innerHTML=n==="delta"?"&darr;":"");const x=document.getElementById("thSjt"),O=document.getElementById("thGame"),M=document.getElementById("thDelta");x&&x.setAttribute("aria-sort",n==="sjt"?"descending":"none"),O&&O.setAttribute("aria-sort",n==="game"?"descending":"none"),M&&M.setAttribute("aria-sort",n==="delta"?"descending":"none")};U&&((A=document.getElementById("sortBySjtBtn"))==null||A.addEventListener("click",()=>F("sjt")),(C=document.getElementById("thSjt"))==null||C.addEventListener("click",()=>F("sjt"))),V&&((S=document.getElementById("sortByGameBtn"))==null||S.addEventListener("click",()=>F("game")),(L=document.getElementById("thGame"))==null||L.addEventListener("click",()=>F("game"))),K&&((m=document.getElementById("sortByDeltaBtn"))==null||m.addEventListener("click",()=>F("delta")),(s=document.getElementById("thDelta"))==null||s.addEventListener("click",()=>F("delta")));const G=document.getElementById("dimensionTable"),J=document.getElementById("densityComfortableBtn"),q=document.getElementById("densityCompactBtn");J==null||J.addEventListener("click",()=>{G==null||G.classList.remove("compact-table"),J.className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider transition-colors bg-[var(--text-primary)] text-white",q.className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider transition-colors text-stone-700 hover:bg-[#e4e1dc]"}),q==null||q.addEventListener("click",()=>{G==null||G.classList.add("compact-table"),q.className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider transition-colors bg-[var(--text-primary)] text-white",J.className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider transition-colors text-stone-700 hover:bg-[#e4e1dc]"}),window.lucide&&window.lucide.createIcons()}catch(f){console.error("Failed to load applicant dossier:",f),l.innerHTML=`
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
    `,(o=document.getElementById("backToRegistryErrBtn"))==null||o.addEventListener("click",()=>H()),(d=document.getElementById("retryDossierBtn"))==null||d.addEventListener("click",()=>z(i,!1)),(b=document.getElementById("recomputeDossierBtn"))==null||b.addEventListener("click",()=>z(i,!0))}}window.loadSessionsList=H;window.loadSessionDetail=z;async function ve(){var I,T,p,$;const i=window.ALFAAZ_API_URL||"https://alfaaz-project.onrender.com",c=localStorage.getItem("alfaaz_token");let l=document.getElementById("interviewSettingsModal");l||(l=document.createElement("div"),l.id="interviewSettingsModal",document.body.appendChild(l)),l.className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4",l.innerHTML=`
    <div class="bg-white border border-[var(--grid-border)] max-w-lg w-full p-6 space-y-4 shadow-xl">
      <div class="flex justify-between items-center border-b border-[var(--grid-border)] pb-3">
        <h3 class="font-serif text-lg text-[var(--text-primary)]">Interview Schedule & Working Hours</h3>
        <button id="closeSettingsModalBtn" class="text-stone-400 hover:text-black text-lg">&times;</button>
      </div>
      <div id="settingsModalBody" class="space-y-4 text-xs">
        <div class="text-stone-500">Loading current configuration...</div>
      </div>
    </div>
  `,(I=document.getElementById("closeSettingsModalBtn"))==null||I.addEventListener("click",()=>l.remove());try{const w=await(await fetch(`${i}/recruit/research/interview-settings`,{headers:{Authorization:`Bearer ${c}`}})).json(),A=(w.slots||[]).join(", "),C=w.skip_days||["Sunday"],S=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],L=document.getElementById("settingsModalBody");L.innerHTML=`
      <div>
        <label class="block font-semibold uppercase tracking-wider text-[11px] text-[var(--text-primary)] mb-1">
          Available Time Slots (Comma-separated)
        </label>
        <p class="text-[11px] text-stone-500 mb-2">Candidates will be offered these time windows on active interview days (e.g. 11:00 AM, 03:00 PM, 05:30 PM, 07:00 PM).</p>
        <input type="text" id="settingsSlotsInput" value="${window.escapeHtml(A)}" class="w-full p-2 border border-[var(--grid-border)] text-xs font-mono focus:outline-none focus:border-[var(--accent-gold)]" placeholder="11:00 AM, 03:00 PM, 05:30 PM, 07:00 PM" />
      </div>

      <div>
        <label class="block font-semibold uppercase tracking-wider text-[11px] text-[var(--text-primary)] mb-1">
          Days Off / Excluded Days
        </label>
        <p class="text-[11px] text-stone-500 mb-2">Slots will not be generated for designated off-days.</p>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
          ${S.map(m=>`
            <label class="inline-flex items-center gap-1.5 cursor-pointer">
              <input type="checkbox" name="skipDayCheck" value="${m}" ${C.includes(m)?"checked":""} class="accent-[var(--accent-gold)]" />
              <span>${m}</span>
            </label>
          `).join("")}
        </div>
      </div>

      <div class="pt-3 border-t border-[var(--grid-border)] space-y-1.5">
        <label class="block font-semibold uppercase tracking-wider text-[11px] text-[var(--text-primary)]">
          Make.com Webhook Test & Data Detection
        </label>
        <p class="text-[11px] text-stone-500">
          Click &ldquo;Detect new values&rdquo; in Make.com, then click below to transmit the standard <code>to</code>, <code>subject</code>, and <code>text</code> payload.
        </p>
        <div class="flex items-center gap-2">
          <input type="text" id="customWebhookUrlInput" placeholder="Optional: Paste Webhook URL if not configured in Render" class="flex-grow p-1.5 border border-[var(--grid-border)] text-xs font-mono focus:outline-none" />
          <button type="button" id="sendTestWebhookBtn" class="px-3 py-1.5 bg-[#f4f1ea] border border-[var(--grid-border)] text-xs text-[var(--text-primary)] hover:bg-[#eae6dc] transition-colors whitespace-nowrap">
            📡 Send Test Payload
          </button>
        </div>
        <div id="testWebhookFeedback" class="text-[11px] hidden"></div>
      </div>

      <div id="settingsFeedback" class="text-[11px] hidden"></div>

      <div class="pt-3 border-t border-[var(--grid-border)] flex justify-end gap-2">
        <button id="cancelSettingsBtn" class="px-3 py-1.5 border border-[var(--grid-border)] text-xs text-stone-600 hover:bg-stone-50">Cancel</button>
        <button id="saveSettingsBtn" class="px-4 py-1.5 bg-[var(--text-primary)] text-white text-xs uppercase tracking-wider hover:bg-[var(--accent-gold)] transition-colors">
          Save Schedule
        </button>
      </div>
    `,(T=document.getElementById("sendTestWebhookBtn"))==null||T.addEventListener("click",async()=>{var d;const m=document.getElementById("sendTestWebhookBtn"),s=document.getElementById("testWebhookFeedback"),o=(d=document.getElementById("customWebhookUrlInput"))==null?void 0:d.value.trim();m.disabled=!0,m.innerText="Sending...",s.className="text-[11px] text-stone-500 block",s.innerText="Transmitting sample payload to Make.com...";try{const b=await fetch(`${i}/recruit/research/webhook-test`,{method:"POST",headers:{Authorization:`Bearer ${c}`,"Content-Type":"application/json"},body:JSON.stringify({webhook_url:o||void 0})}),f=await b.json();if(!b.ok)throw new Error(f.detail||"Webhook test failed");s.className="text-[11px] text-emerald-700 block font-medium",s.innerText=`✓ Test payload sent successfully (HTTP ${f.response_status})! Make.com should now display 'Successfully determined'.`,m.disabled=!1,m.innerText="📡 Send Test Payload"}catch(b){s.className="text-[11px] text-red-600 block",s.innerText=`Error: ${b.message}`,m.disabled=!1,m.innerText="📡 Send Test Payload"}}),(p=document.getElementById("cancelSettingsBtn"))==null||p.addEventListener("click",()=>l.remove()),($=document.getElementById("saveSettingsBtn"))==null||$.addEventListener("click",async()=>{const s=document.getElementById("settingsSlotsInput").value.split(",").map(f=>f.trim()).filter(Boolean);if(s.length===0){alert("Please enter at least one time slot.");return}const o=Array.from(document.querySelectorAll('input[name="skipDayCheck"]:checked')).map(f=>f.value),d=document.getElementById("saveSettingsBtn"),b=document.getElementById("settingsFeedback");d.disabled=!0,d.innerText="Saving...";try{if(!(await fetch(`${i}/recruit/research/interview-settings`,{method:"POST",headers:{Authorization:`Bearer ${c}`,"Content-Type":"application/json"},body:JSON.stringify({slots:s,skip_days:o})})).ok)throw new Error("Failed to save settings");b.className="text-[11px] text-emerald-700 block font-medium",b.innerText="Interview schedule updated successfully!",setTimeout(()=>l.remove(),1200)}catch(f){b.className="text-[11px] text-red-600 block",b.innerText=`Error: ${f.message}`,d.disabled=!1,d.innerText="Save Schedule"}})}catch(_){document.getElementById("settingsModalBody").innerHTML=`<div class="text-red-600">Failed to load interview settings: ${_.message}</div>`}}async function Se(i,c,l){var $,_,w;const I=window.ALFAAZ_API_URL||"https://alfaaz-project.onrender.com",T=localStorage.getItem("alfaaz_token");let p=document.getElementById("rescheduleModal");p||(p=document.createElement("div"),p.id="rescheduleModal",document.body.appendChild(p)),p.className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4",p.innerHTML=`
    <div class="bg-white border border-[var(--grid-border)] max-w-lg w-full p-6 space-y-4 shadow-xl">
      <div class="flex justify-between items-center border-b border-[var(--grid-border)] pb-3">
        <div>
          <h3 class="font-serif text-lg text-[var(--text-primary)]">Change / Reschedule Interview</h3>
          <div class="text-xs text-stone-500">${window.escapeHtml(c.full_name||"Candidate")} &middot; ${window.escapeHtml(c.email||"")}</div>
        </div>
        <button id="closeRescheduleModalBtn" class="text-stone-400 hover:text-black text-lg">&times;</button>
      </div>

      <div id="rescheduleModalBody" class="space-y-4 text-xs">
        <div class="text-stone-500">Loading open slots...</div>
      </div>
    </div>
  `,($=document.getElementById("closeRescheduleModalBtn"))==null||$.addEventListener("click",()=>p.remove());try{const S=(await(await fetch(`${I}/recruit/interview-slots`)).json()).days||[],L=[];S.forEach(o=>{(o.times||[]).forEach(d=>{L.push({date:o.date,time:d,display:`${o.date_label} at ${d} IST`,fullDisplay:`${o.full_date_label} at ${d} IST`})})});const m=l?l.slot_display||`${l.slot_date} at ${l.slot_time}`:"None assigned",s=document.getElementById("rescheduleModalBody");s.innerHTML=`
      <div class="p-3 bg-[#faf8f5] border border-[var(--grid-border)]">
        <span class="text-[10px] uppercase font-semibold text-stone-500 block">Current Interview Slot:</span>
        <span class="text-sm font-serif text-black">${window.escapeHtml(m)}</span>
      </div>

      <div class="space-y-2">
        <label class="block font-semibold uppercase tracking-wider text-[11px] text-[var(--text-primary)]">
          Option 1: Choose from Open System Slots
        </label>
        <select id="openSlotSelect" class="w-full p-2 border border-[var(--grid-border)] bg-white text-xs focus:outline-none focus:border-[var(--accent-gold)]">
          <option value="">-- Choose an available slot --</option>
          ${L.map(o=>`
            <option value="${o.date}|${o.time}|${o.display}">${o.fullDisplay}</option>
          `).join("")}
        </select>
      </div>

      <div class="relative flex py-1 items-center">
        <div class="flex-grow border-t border-[var(--grid-border)]"></div>
        <span class="flex-shrink mx-2 text-[10px] uppercase tracking-wider text-stone-400">or specify custom timing</span>
        <div class="flex-grow border-t border-[var(--grid-border)]"></div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label class="block font-semibold uppercase tracking-wider text-[10px] text-stone-600 mb-1">Custom Date</label>
          <input type="date" id="customDateInput" class="w-full p-2 border border-[var(--grid-border)] text-xs focus:outline-none" />
        </div>
        <div>
          <label class="block font-semibold uppercase tracking-wider text-[10px] text-stone-600 mb-1">Custom Time (e.g. 04:00 PM IST)</label>
          <input type="text" id="customTimeInput" placeholder="04:00 PM IST" class="w-full p-2 border border-[var(--grid-border)] text-xs focus:outline-none" />
        </div>
      </div>

      <div>
        <label class="block font-semibold uppercase tracking-wider text-[10px] text-stone-600 mb-1">Recruiter Notes (Optional)</label>
        <input type="text" id="rescheduleNotesInput" placeholder="e.g. Candidate requested evening call" class="w-full p-2 border border-[var(--grid-border)] text-xs focus:outline-none" />
      </div>

      <div id="rescheduleFeedback" class="text-[11px] hidden"></div>

      <div class="pt-3 border-t border-[var(--grid-border)] flex justify-end gap-2">
        <button id="cancelRescheduleBtn" class="px-3 py-1.5 border border-[var(--grid-border)] text-xs text-stone-600 hover:bg-stone-50">Cancel</button>
        <button id="confirmRescheduleBtn" class="px-4 py-1.5 bg-[var(--text-primary)] text-white text-xs uppercase tracking-wider hover:bg-[var(--accent-gold)] transition-colors">
          Confirm Reschedule
        </button>
      </div>
    `,(_=document.getElementById("cancelRescheduleBtn"))==null||_.addEventListener("click",()=>p.remove()),(w=document.getElementById("confirmRescheduleBtn"))==null||w.addEventListener("click",async()=>{const o=document.getElementById("openSlotSelect").value,d=document.getElementById("customDateInput").value,b=document.getElementById("customTimeInput").value,f=document.getElementById("rescheduleNotesInput").value;let W,N,E;if(o){const D=o.split("|");W=D[0],N=D[1],E=D[2]}else if(d&&b)W=d,N=b.trim(),E=`${d} at ${b}`;else{alert("Please choose an available slot or enter a custom date and time.");return}const k=document.getElementById("confirmRescheduleBtn"),v=document.getElementById("rescheduleFeedback");k.disabled=!0,k.innerText="Updating...";try{const D=await fetch(`${I}/recruit/research/sessions/${i}/reschedule`,{method:"POST",headers:{Authorization:`Bearer ${T}`,"Content-Type":"application/json"},body:JSON.stringify({slot_date:W,slot_time:N,slot_display:E,notes:f||void 0})});if(!D.ok){const Z=await D.json();throw new Error(Z.detail||"Failed to reschedule")}const Y=await D.json();v.className="text-[11px] text-emerald-700 block font-medium",v.innerText="Interview rescheduled successfully! Updating dossier...",setTimeout(async()=>{p.remove(),await z(i),Y.whatsapp_notify_url&&(c.phone_or_contact||"").replace(/[^0-9]/g,"")&&confirm(`Interview updated to: ${E}

Would you like to open WhatsApp now to send the candidate the updated timing?`)&&window.open(Y.whatsapp_notify_url,"_blank")},800)}catch(D){v.className="text-[11px] text-red-600 block",v.innerText=`Error: ${D.message}`,k.disabled=!1,k.innerText="Confirm Reschedule"}})}catch(A){document.getElementById("rescheduleModalBody").innerHTML=`<div class="text-red-600">Failed to load open interview slots: ${A.message}</div>`}}
