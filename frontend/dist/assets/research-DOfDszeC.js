import"./global-DxYxv3W5.js";/* empty css               */document.addEventListener("DOMContentLoaded",async()=>{if(!localStorage.getItem("alfaaz_token")){window.location.href="login.html";return}g(),await v()});function g(){var t;(t=document.getElementById("logoutBtn"))==null||t.addEventListener("click",()=>{localStorage.removeItem("alfaaz_token"),window.location.href="login.html"})}async function v(t=""){var n,r;const s=document.getElementById("researchContent"),p=window.ALFAAZ_API_URL||"";try{const d=localStorage.getItem("alfaaz_token"),o=`${p}/recruit/research/sessions${t?`?status=${encodeURIComponent(t)}`:""}`,a=await fetch(o,{headers:{Authorization:`Bearer ${d}`}});if(a.status===401||a.status===403){alert("Admin clearance required."),window.location.href="login.html";return}const i=await a.json(),c=`
      <div class="flex justify-between items-center bg-white border border-[var(--grid-border)] p-4">
        <div>
          <h2 class="text-lg font-serif text-[var(--text-primary)]">Applicant Assessment Records</h2>
          <span class="text-xs text-[var(--text-secondary)]">Ordered strictly by submission time</span>
        </div>
        <div class="flex items-center gap-2">
          <label for="statusFilter" class="text-xs uppercase tracking-wider text-[var(--text-secondary)]">Session Status:</label>
          <select id="statusFilter" class="px-2 py-1 text-xs border border-[var(--grid-border)] bg-[#faf8f5] text-[var(--text-primary)] focus:outline-none">
            <option value="" ${t===""?"selected":""}>All Operational Statuses</option>
            <option value="CONSENTED" ${t==="CONSENTED"?"selected":""}>Consented</option>
            <option value="SJT" ${t==="SJT"?"selected":""}>SJT</option>
            <option value="ACTIVE" ${t==="ACTIVE"?"selected":""}>Active (Games)</option>
            <option value="COMPLETE" ${t==="COMPLETE"?"selected":""}>Complete</option>
          </select>
        </div>
      </div>
    `;if(!i||i.length===0){s.innerHTML=`
        ${c}
        <div class="p-12 text-center text-[var(--text-secondary)] font-serif text-base bg-white border border-[var(--grid-border)] mt-4">
          No recruitment assessment sessions found for this status.
        </div>
      `,(n=document.getElementById("statusFilter"))==null||n.addEventListener("change",e=>{v(e.target.value)});return}const l=i.map(e=>`
      <tr class="border-b border-[var(--grid-border)] hover:bg-[#faf8f5] transition">
        <td class="p-4 font-serif text-sm font-medium text-[var(--text-primary)]">${e.full_name}</td>
        <td class="p-4 text-xs text-[var(--text-secondary)]">${e.email}</td>
        <td class="p-4 text-xs text-[var(--text-secondary)]">${e.created_at?new Date(e.created_at).toLocaleString():"—"}</td>
        <td class="p-4 text-xs">
          <span class="px-2 py-0.5 bg-[#f4f1ea] border border-[var(--grid-border)] text-[10px] uppercase tracking-wider">${e.status}</span>
        </td>
        <td class="p-4 text-right">
          <button class="view-session-btn px-3 py-1 bg-[var(--text-primary)] text-white text-[10px] uppercase tracking-widest hover:bg-[var(--accent-gold)] transition" data-id="${e.session_id}">
            View Evidence &rarr;
          </button>
        </td>
      </tr>
    `).join("");s.innerHTML=`
      <div class="space-y-4">
        ${c}
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
                ${l}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `,(r=document.getElementById("statusFilter"))==null||r.addEventListener("change",e=>{v(e.target.value)}),s.querySelectorAll(".view-session-btn").forEach(e=>{e.addEventListener("click",()=>{const x=e.getAttribute("data-id");m(x)})}),window.lucide&&window.lucide.createIcons()}catch(d){s.innerHTML=`<div class="p-8 text-center text-red-600">Failed to load sessions: ${d.message}</div>`}}async function m(t){var n;const s=document.getElementById("researchContent"),p=window.ALFAAZ_API_URL||"";try{const r=localStorage.getItem("alfaaz_token"),o=await(await fetch(`${p}/recruit/research/session/${t}`,{headers:{Authorization:`Bearer ${r}`}})).json(),a=o.metadata,i=o.evidence_by_parameter,c=Object.keys(i).map(l=>{const e=i[l],x=l.replace(/_/g," ").toUpperCase(),b=e.random_responder_reference||{};return`
        <div class="param-card space-y-3">
          <div class="flex justify-between items-start border-b border-[var(--grid-border)] pb-2">
            <div>
              <span class="badge-neutral">${x}</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-xs text-[var(--text-secondary)]">SJT Band:</span>
              <strong class="text-xs text-[var(--accent-gold)]">${e.sjt_band||"UNAVAILABLE"}</strong>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4 text-xs">
            <div class="bg-[#faf8f5] p-3 border border-[var(--grid-border)] space-y-1">
              <div class="font-semibold text-[10px] text-[var(--text-secondary)] uppercase">SJT Score Metrics</div>
              <div>Raw Score: <strong>${e.sjt_raw!==null?e.sjt_raw:"—"}</strong> (Span: ${e.sjt_span})</div>
              <div>Relative Range: [${e.sjt_min} .. ${e.sjt_max}]</div>
              <div class="text-[10px] text-[var(--text-secondary)] mt-1">Random Baseline: LOW ${b.LOW||"—"} / MOD ${b.MODERATE||"—"} / HIGH ${b.HIGH||"—"}</div>
            </div>

            <div class="bg-[#faf8f5] p-3 border border-[var(--grid-border)] space-y-1">
              <div class="font-semibold text-[10px] text-[var(--text-secondary)] uppercase">Game Observational Evidence</div>
              <div>Status: <span class="badge-neutral">${e.game_status}</span></div>
              <div>Band: <span class="badge-neutral">${e.game_band}</span></div>
              <div>Consistency: <span class="badge-neutral">${e.consistency}</span></div>
              <div>Relationship with SJT: <span class="badge-neutral">${e.relationship}</span></div>
              <div>Confidence Level: <span class="badge-neutral">${e.confidence}</span></div>
            </div>
          </div>

          <div class="text-xs text-[var(--text-primary)] leading-relaxed border-t border-[var(--grid-border)] pt-2">
            <strong>Observed Behavioral Note:</strong> ${e.observed_behavior||"Completed micro-task sequence."}
          </div>
        </div>
      `}).join("");s.innerHTML=`
      <div class="space-y-6">
        <div class="flex justify-between items-center">
          <button id="backToListBtn" class="text-xs uppercase tracking-wider text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
            &larr; Back to Sessions List
          </button>
          <span class="font-mono text-xs text-[var(--text-secondary)]">${a.session_id}</span>
        </div>

        <div class="bg-white border border-[var(--grid-border)] p-6 space-y-4">
          <div class="flex justify-between items-start border-b border-[var(--grid-border)] pb-4">
            <div>
              <h2 class="text-xs uppercase tracking-widest text-[var(--accent-gold)]">Evidence by parameter</h2>
              <h1 class="text-2xl font-serif text-[var(--text-primary)] mt-1">${a.applicant.full_name||"Anonymous"}</h1>
              <p class="text-xs text-[var(--text-secondary)]">${a.applicant.email||""}</p>
            </div>
            <div class="text-right text-xs text-[var(--text-secondary)]">
              <div>Created: ${a.created_at?new Date(a.created_at).toLocaleString():"—"}</div>
              <div>Status: <span class="badge-neutral">${a.status}</span></div>
            </div>
          </div>

          <div class="p-4 bg-amber-50/50 border border-[var(--accent-gold)]/30 text-xs text-[var(--text-primary)] leading-relaxed space-y-1">
            <div><strong>Methodological Note:</strong> ${a.safeguards.ipsative_note}</div>
            <div class="text-[11px] text-[var(--text-secondary)] italic">${a.safeguards.sjt_emphasis_note||"Relative emphasis in this SJT's trade-offs: higher / middle / lower."}</div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            ${c}
          </div>
        </div>
      </div>
    `,(n=document.getElementById("backToListBtn"))==null||n.addEventListener("click",()=>{v()}),window.lucide&&window.lucide.createIcons()}catch(r){s.innerHTML=`<div class="p-8 text-center text-red-600">Failed to load session details: ${r.message}</div>`}}
