import"./global-DxYxv3W5.js";/* empty css               */document.addEventListener("DOMContentLoaded",async()=>{if(!localStorage.getItem("alfaaz_token")){window.location.href="login.html";return}g(),await p()});function g(){var a;(a=document.getElementById("logoutBtn"))==null||a.addEventListener("click",()=>{localStorage.removeItem("alfaaz_token"),window.location.href="login.html"})}async function p(){const a=document.getElementById("researchContent"),d=window.ALFAAZ_API_URL||"";try{const n=localStorage.getItem("alfaaz_token"),i=await fetch(`${d}/recruit/research/sessions`,{headers:{Authorization:`Bearer ${n}`}});if(i.status===401||i.status===403){alert("Admin clearance required."),window.location.href="login.html";return}const r=await i.json();if(!r||r.length===0){a.innerHTML=`
        <div class="p-12 text-center text-[var(--text-secondary)] font-serif text-base bg-white border border-[var(--grid-border)]">
          No recruitment assessment sessions have been recorded yet.
        </div>
      `;return}const c=r.map(e=>`
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
    `).join("");a.innerHTML=`
      <div class="bg-white border border-[var(--grid-border)] p-6 space-y-4">
        <div class="flex justify-between items-center">
          <h2 class="text-xl font-serif text-[var(--text-primary)]">Applicant Assessment Records</h2>
          <span class="text-xs text-[var(--text-secondary)]">Ordered strictly by submission time</span>
        </div>

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
              ${c}
            </tbody>
          </table>
        </div>
      </div>
    `,a.querySelectorAll(".view-session-btn").forEach(e=>{e.addEventListener("click",()=>{const s=e.getAttribute("data-id");m(s)})}),window.lucide&&window.lucide.createIcons()}catch(n){a.innerHTML=`<div class="p-8 text-center text-red-600">Failed to load sessions: ${n.message}</div>`}}async function m(a){var i;const d=document.getElementById("researchContent"),n=window.ALFAAZ_API_URL||"";try{const r=localStorage.getItem("alfaaz_token"),e=await(await fetch(`${n}/recruit/research/session/${a}`,{headers:{Authorization:`Bearer ${r}`}})).json(),s=e.metadata,l=e.evidence_by_parameter,x=Object.keys(l).map(v=>{const t=l[v],b=v.replace(/_/g," ").toUpperCase(),o=t.random_responder_reference||{};return`
        <div class="param-card space-y-3">
          <div class="flex justify-between items-start border-b border-[var(--grid-border)] pb-2">
            <div>
              <span class="badge-neutral">${b}</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-xs text-[var(--text-secondary)]">SJT Band:</span>
              <strong class="text-xs text-[var(--accent-gold)]">${t.sjt_band||"UNAVAILABLE"}</strong>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4 text-xs">
            <div class="bg-[#faf8f5] p-3 border border-[var(--grid-border)] space-y-1">
              <div class="font-semibold text-[10px] text-[var(--text-secondary)] uppercase">SJT Score Metrics</div>
              <div>Raw Score: <strong>${t.sjt_raw!==null?t.sjt_raw:"—"}</strong> (Span: ${t.sjt_span})</div>
              <div>Relative Range: [${t.sjt_min} .. ${t.sjt_max}]</div>
              <div class="text-[10px] text-[var(--text-secondary)] mt-1">Random Baseline: LOW ${o.LOW||"—"} / MOD ${o.MODERATE||"—"} / HIGH ${o.HIGH||"—"}</div>
            </div>

            <div class="bg-[#faf8f5] p-3 border border-[var(--grid-border)] space-y-1">
              <div class="font-semibold text-[10px] text-[var(--text-secondary)] uppercase">Game Observational Evidence</div>
              <div>Status: <span class="badge-neutral">${t.game_status}</span></div>
              <div>Relationship with SJT: <span class="badge-neutral">${t.relationship}</span></div>
              <div>Confidence Level: <span class="badge-neutral">${t.confidence}</span></div>
            </div>
          </div>

          <div class="text-xs text-[var(--text-primary)] leading-relaxed border-t border-[var(--grid-border)] pt-2">
            <strong>Observed Behavioral Note:</strong> ${t.observed_behavior||"Completed micro-task sequence."}
          </div>
        </div>
      `}).join("");d.innerHTML=`
      <div class="space-y-6">
        <div class="flex justify-between items-center">
          <button id="backToListBtn" class="text-xs uppercase tracking-wider text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
            &larr; Back to Sessions List
          </button>
          <span class="font-mono text-xs text-[var(--text-secondary)]">${s.session_id}</span>
        </div>

        <div class="bg-white border border-[var(--grid-border)] p-6 space-y-4">
          <div class="flex justify-between items-start border-b border-[var(--grid-border)] pb-4">
            <div>
              <span class="text-xs uppercase tracking-widest text-[var(--accent-gold)]">Applicant Evidence Dossier</span>
              <h1 class="text-2xl font-serif text-[var(--text-primary)] mt-1">${s.applicant.full_name||"Anonymous"}</h1>
              <p class="text-xs text-[var(--text-secondary)]">${s.applicant.email||""}</p>
            </div>
            <div class="text-right text-xs text-[var(--text-secondary)]">
              <div>Created: ${s.created_at?new Date(s.created_at).toLocaleString():"—"}</div>
              <div>Status: <span class="badge-neutral">${s.status}</span></div>
            </div>
          </div>

          <div class="p-4 bg-amber-50/50 border border-[var(--accent-gold)]/30 text-xs text-[var(--text-primary)] leading-relaxed">
            <strong>Methodological Note:</strong> ${s.safeguards.ipsative_note}
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            ${x}
          </div>
        </div>
      </div>
    `,(i=document.getElementById("backToListBtn"))==null||i.addEventListener("click",()=>{p()}),window.lucide&&window.lucide.createIcons()}catch(r){d.innerHTML=`<div class="p-8 text-center text-red-600">Failed to load session details: ${r.message}</div>`}}
