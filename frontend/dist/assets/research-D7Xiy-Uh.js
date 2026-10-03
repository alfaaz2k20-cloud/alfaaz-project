import"./global-DxYxv3W5.js";/* empty css               */document.addEventListener("DOMContentLoaded",async()=>{if(!localStorage.getItem("alfaaz_token")){window.location.href="login.html";return}I(),await y()});function I(){var e;(e=document.getElementById("logoutBtn"))==null||e.addEventListener("click",()=>{localStorage.removeItem("alfaaz_token"),window.location.href="login.html"})}async function y(e=""){var i,n;const a=document.getElementById("researchContent"),v=window.ALFAAZ_API_URL||"";try{const o=localStorage.getItem("alfaaz_token"),d=`${v}/recruit/research/sessions${e?`?status=${encodeURIComponent(e)}`:""}`,s=await fetch(d,{headers:{Authorization:`Bearer ${o}`}});if(s.status===401||s.status===403){alert("Admin clearance required."),window.location.href="login.html";return}const r=await s.json(),c=`
      <div class="flex justify-between items-center bg-white border border-[var(--grid-border)] p-4">
        <div>
          <h2 class="text-lg font-serif text-[var(--text-primary)]">Applicant Assessment Records</h2>
          <span class="text-xs text-[var(--text-secondary)]">Ordered strictly by submission time</span>
        </div>
        <div class="flex items-center gap-2">
          <label for="statusFilter" class="text-xs uppercase tracking-wider text-[var(--text-secondary)]">Session Status:</label>
          <select id="statusFilter" class="px-2 py-1 text-xs border border-[var(--grid-border)] bg-[#faf8f5] text-[var(--text-primary)] focus:outline-none">
            <option value="" ${e===""?"selected":""}>All Operational Statuses</option>
            <option value="CONSENTED" ${e==="CONSENTED"?"selected":""}>Consented</option>
            <option value="SJT" ${e==="SJT"?"selected":""}>SJT</option>
            <option value="ACTIVE" ${e==="ACTIVE"?"selected":""}>Active (Games)</option>
            <option value="COMPLETE" ${e==="COMPLETE"?"selected":""}>Complete</option>
          </select>
        </div>
      </div>
    `;if(!r||r.length===0){a.innerHTML=`
        ${c}
        <div class="p-12 text-center text-[var(--text-secondary)] font-serif text-base bg-white border border-[var(--grid-border)] mt-4">
          No recruitment assessment sessions found for this status.
        </div>
      `,(i=document.getElementById("statusFilter"))==null||i.addEventListener("change",t=>{y(t.target.value)});return}const x=r.map(t=>`
      <tr class="border-b border-[var(--grid-border)] hover:bg-[#faf8f5] transition">
        <td class="p-4 font-serif text-sm font-medium text-[var(--text-primary)]">${t.full_name}</td>
        <td class="p-4 text-xs text-[var(--text-secondary)]">${t.email}</td>
        <td class="p-4 text-xs text-[var(--text-secondary)]">${t.created_at?new Date(t.created_at).toLocaleString():"—"}</td>
        <td class="p-4 text-xs">
          <span class="px-2 py-0.5 bg-[#f4f1ea] border border-[var(--grid-border)] text-[10px] uppercase tracking-wider">${t.status}</span>
        </td>
        <td class="p-4 text-right">
          <button class="view-session-btn px-3 py-1 bg-[var(--text-primary)] text-white text-[10px] uppercase tracking-widest hover:bg-[var(--accent-gold)] transition" data-id="${t.session_id}">
            View Evidence &rarr;
          </button>
        </td>
      </tr>
    `).join("");a.innerHTML=`
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
                ${x}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `,(n=document.getElementById("statusFilter"))==null||n.addEventListener("change",t=>{y(t.target.value)}),a.querySelectorAll(".view-session-btn").forEach(t=>{t.addEventListener("click",()=>{const b=t.getAttribute("data-id");D(b)})}),window.lucide&&window.lucide.createIcons()}catch(o){a.innerHTML=`<div class="p-8 text-center text-red-600">Failed to load sessions: ${o.message}</div>`}}async function D(e){const a=document.getElementById("researchContent"),v=window.ALFAAZ_API_URL||"";try{const i=localStorage.getItem("alfaaz_token"),n=`${v}/recruit/research/sessions/${e}`,o=await fetch(n,{headers:{Authorization:`Bearer ${i}`}});if(!o.ok)throw new Error("Failed to load dossier");const d=await o.json(),s=d.metadata||{},r=s.applicant||{},c=d.measurement_comparisons||{},x=window.escapeHtml(r.full_name||"Candidate"),t=window.escapeHtml(r.email||"—"),b=window.escapeHtml(r.phone_or_contact||"—"),T=s.duration_minutes!==null?`${s.duration_minutes} min`:"In progress",l={LOW:0,MODERATE:1,HIGH:2};let $=0,k=0;const M={empathy:"Ability to understand and adjust to others",conscientiousness:"Diligence and attention to detail",collaborative_spirit:"Teamwork and resource sharing",emotional_agility:"Adaptability to sudden changes",curiosity:"Desire to explore and learn",creative_initiative:"Problem-solving with limited tools",motivation:"Persistence in repetitive tasks"},S=Object.entries(c).map(([C,A])=>{const u=A.sjt_band||"MODERATE",h=A.game_band||"MODERATE",_=l[u]!==void 0?l[u]:1,L=l[h]!==void 0?l[h]:1;$+=_+L,k+=2;const f=Math.abs(_-L);let w="Strong Reliability - Consistent across methods.",m="#2e7d32";return f===1?(w="Moderate Divergence - Acceptable variation in context.",m="#b5832a"):f>1&&(w="High Divergence - Requires deeper interview probing.",m="#c62828"),`
        <tr class="border-b border-[var(--grid-border)]">
            <td class="p-3 font-medium capitalize text-[var(--text-primary)]">${C.replace(/_/g," ")}</td>
            <td class="p-3 text-[var(--text-secondary)]">${u}</td>
            <td class="p-3 text-[var(--text-secondary)]">${h}</td>
            <td class="p-3 font-bold" style="color: ${m};">${f}</td>
            <td class="p-3" style="color: ${m};">${w}</td>
        </tr>
        `}).join(""),E=k*2;let p=0;E>0&&(p=Math.round($/E*100));let g="Developing Candidate";p>=75?g="Highly Recommended":p>=50&&(g="Recommended"),a.innerHTML=`
      <div class="mb-4">
        <button onclick="loadSessionsList()" class="text-xs uppercase tracking-widest text-[var(--text-secondary)] hover:text-[var(--accent-gold)]">&larr; Back to Registry</button>
      </div>
      
      <div class="bg-[#faf8f5] border border-[var(--grid-border)] p-6 mb-6">
        <h3 class="text-xs font-semibold tracking-widest uppercase text-[var(--accent-gold)] mb-4">1. Candidate Overview</h3>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div><strong class="block text-[var(--text-secondary)] text-xs uppercase tracking-wider mb-1">Name</strong>${x}</div>
          <div><strong class="block text-[var(--text-secondary)] text-xs uppercase tracking-wider mb-1">Email</strong>${t}</div>
          <div><strong class="block text-[var(--text-secondary)] text-xs uppercase tracking-wider mb-1">Contact</strong>${b}</div>
          <div><strong class="block text-[var(--text-secondary)] text-xs uppercase tracking-wider mb-1">Duration</strong>${T}</div>
        </div>
      </div>
      
      <div class="bg-white border border-[var(--grid-border)] p-8 mb-6 text-center">
        <h3 class="text-xs font-semibold tracking-widest uppercase text-[var(--accent-gold)] mb-2">Overall Assessment Score</h3>
        <div class="text-5xl font-serif text-[var(--text-primary)] mb-2">${p}/100</div>
        <div class="text-sm font-medium uppercase tracking-widest text-[var(--text-secondary)]">${g}</div>
      </div>

      <div class="mb-6">
        <h3 class="text-xs font-semibold tracking-widest uppercase text-[var(--accent-gold)] mb-3">2. Parameter Construct Analysis & Deltas</h3>
        <p class="text-xs text-[var(--text-secondary)] mb-4 leading-relaxed">
          This table compares the candidate's self-reported Situational Judgment (SJT) with their actual performative tasks (Games). The Delta measures reliability between what they said and what they did.
        </p>
        <div class="overflow-x-auto border border-[var(--grid-border)] bg-white">
          <table class="w-full text-left text-sm">
            <thead class="bg-[#f0eeea] text-xs uppercase tracking-wider text-[var(--text-secondary)]">
              <tr>
                <th class="p-3">Parameter</th>
                <th class="p-3">SJT Score</th>
                <th class="p-3">Games Score</th>
                <th class="p-3">Delta</th>
                <th class="p-3">Interpretation</th>
              </tr>
            </thead>
            <tbody>
              ${S}
            </tbody>
          </table>
        </div>
      </div>
    `}catch{a.innerHTML='<div class="p-8 text-center text-red-600">Failed to load dossier.</div>'}}
