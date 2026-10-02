// admin.js — Centralized Administration Logic
document.addEventListener('DOMContentLoaded', () => {
    const userData = localStorage.getItem('alfaaz_user');
    if (!userData) {
        window.location.href = 'login.html';
        return;
    }

    let user;
    try {
        user = JSON.parse(userData);
    } catch (error) {
        localStorage.removeItem('alfaaz_user');
        window.location.href = 'login.html';
        return;
    }

    if (!user || user.status !== 'ADMIN') {
        window.location.href = 'dashboard.html';
        return;
    }

    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => { localStorage.clear(); window.location.href = 'login.html'; });
    }

    const tabLoaded = {};
    window.switchTab = function(name) {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
      const targetBtn = document.querySelector(`[onclick="switchTab('${name}')"]`);
      if (targetBtn) targetBtn.classList.add('active');
      const targetPanel = document.getElementById(`tab-${name}`);
      if (targetPanel) targetPanel.classList.add('active');
      if (!tabLoaded[name]) { tabLoaded[name] = true; loadTab(name); }
    };

    function loadTab(name) {
      if (name === 'events') window.loadEvents(); 
      if (name === 'exhibitions') { window.loadExhibitionManager(); window.loadExhibitionsData('ALL'); }
      if (name === 'clubs') window.loadClubs('ALL'); 
      if (name === 'roster') window.loadRoster();
      if (name === 'recruitment') window.loadRecruitment();
    }

    // ==========================================
    // EVENTS LOGIC
    // ==========================================
    let allEvents = [];
    window.loadEvents = async function() {
      const container = document.getElementById('eventsContainer');
      if(!container) return;
      try {
        const res = await window.globalApiFetch('/admin/events');
        if(!res) return;
        allEvents = await res.json();
        if (!allEvents.length) { container.innerHTML = '<div class="empty-state">No events found.</div>'; return; }
        container.innerHTML = '';
        allEvents.forEach(e => {
          const card = document.createElement('div'); card.className = 'data-card event-card';
          const isOpen = e.registration_open; const capLabel = e.capacity === 0 ? '∞' : `${e.registered}/${e.capacity}`;
          const safeName = window.escapeHtml(e.name);
          const safeDesc = window.escapeHtml(e.description || '—');
          const safeDate = window.escapeHtml(e.event_date || '—');
          card.innerHTML = `
            <div><div class="data-label">Event</div><div class="data-display">${safeName}</div><div style="font-size:11px; color:var(--text-secondary); margin-top: 4px;">${safeDesc}</div></div>
            <div><div class="data-label">Date</div><div class="data-display" style="font-size:12px;">${safeDate}</div></div>
            <div><div class="data-label">Registered</div><div class="data-display">${capLabel}</div></div>
            <div><div class="data-label">Status</div><span class="badge ${isOpen ? 'badge-open' : 'badge-closed'}">${isOpen ? 'Open' : 'Closed'}</span></div>
            <div style="display:flex; flex-direction:column; gap:0.6rem;">
              <button class="action-btn ${isOpen ? '' : 'gold'}" style="padding: 0.6rem; font-size:9px;" onclick="toggleEvent(${e.id}, this)">${isOpen ? 'Close Registration' : 'Open Registration'}</button>
              <button class="action-btn gold" style="padding: 0.6rem; font-size:9px;" onclick="viewRegistrations(${e.id})">View List</button>
              <button class="action-btn" style="padding: 0.6rem; font-size:9px; border-color:var(--accent-red); color:var(--accent-red);" onclick="deleteEvent(${e.id}, '${safeName.replace(/'/g, "\\'")}', this)">Delete</button>
            </div>`;
          container.appendChild(card);
        });
        if(window.refreshGlobalEffects) window.refreshGlobalEffects();
      } catch (e) { container.innerHTML = '<div class="empty-state">Error loading events.</div>'; }
    };

    window.handleCreateEvent = async function() {
      const name = document.getElementById('ev-name').value.trim(), date = document.getElementById('ev-date').value.trim(), capacity = parseInt(document.getElementById('ev-capacity').value) || 0, desc = document.getElementById('ev-desc').value.trim(), msg = document.getElementById('ev-create-msg');
      if (!name) return; msg.textContent = 'Creating...';
      const res = await window.globalApiFetch('/admin/events/create', { method: 'POST', body: JSON.stringify({ name, description: desc, event_date: date, capacity }) });
      if (res && res.ok) { msg.textContent = '✓ Created.'; window.loadEvents(); }
    };
    window.toggleEvent = async function(id, btn) { btn.textContent = '...'; const res = await window.globalApiFetch(`/admin/events/${id}/toggle`, { method: 'PATCH' }); if (res && res.ok) window.loadEvents(); };
    window.deleteEvent = async function(id, name, btn) { if (!confirm(`Delete ${name}?`)) return; btn.textContent = '...'; const res = await window.globalApiFetch(`/admin/events/${id}`, { method: 'DELETE' }); if (res && res.ok) window.loadEvents(); };
    
    window.viewRegistrations = async function(id) {
      const event = allEvents.find(e => e.id === id); document.getElementById('modalTitle').textContent = event.name; document.getElementById('modalBody').innerHTML = 'Loading...'; document.getElementById('regModal').classList.add('open');
      const res = await window.globalApiFetch(`/admin/events/${id}/registrations`);
      if(!res) return;
      const data = await res.json();
      let html = `<div style="font-size:12px; margin-bottom:1.5rem; color:var(--accent-gold); font-weight:600; letter-spacing: 1px; text-transform: uppercase;">Total Approved: ${data.registrations.length}</div>`;
      data.registrations.forEach((r, i) => {
        const safeEmail = window.escapeHtml(r.email);
        const safeWa = r.whatsapp ? 'WA: ' + window.escapeHtml(r.whatsapp) : 'No WA provided';
        html += `<div style="padding:1rem 0; border-bottom:1px solid var(--grid-border); font-size:13px; display:flex; justify-content:space-between; align-items: center;"><span><strong style="color: var(--accent-gold); margin-right: 10px;">${i+1}.</strong> ${safeEmail}</span><span style="color:var(--text-primary); font-size: 11px; background: var(--bg-primary); padding: 4px 10px; border-radius: 2px;">${safeWa}</span></div>`;
      });
      document.getElementById('modalBody').innerHTML = html || '<div class="empty-state">No registrations.</div>';
    };
    window.closeModal = function() { document.getElementById('regModal').classList.remove('open'); };

    // ==========================================
    // EXHIBITIONS LOGIC (TRUE EVENTS MODEL)
    // ==========================================
    let allExhibs = [], activeCycleFilter = 'ALL';
    let currentCycleView = 'ALL'; 

    window.loadExhibitionManager = async function() {
      const res = await window.globalApiFetch('/admin/exhibitions/list');
      if (!res || !res.ok) return;
      
      const exhibitions = await res.json();
      const container = document.getElementById('exhibitionListContainer');
      const statusText = document.getElementById('portalLiveStatus');
      if(!container) return;
      container.innerHTML = '';

      const liveEx = exhibitions.find(e => e.is_active);
      if (liveEx) {
        statusText.innerHTML = `Currently Live: <strong style="color: var(--accent-green);">${window.escapeHtml(liveEx.title)}</strong>`;
      } else {
        statusText.innerHTML = `<strong style="color: var(--accent-red);">CLOSED</strong> (No active exhibition)`;
      }

      if (exhibitions.length === 0) {
        container.innerHTML = '<div style="font-size: 12px; color: var(--text-secondary);">No exhibitions created yet.</div>';
        return;
      }

      exhibitions.forEach(ex => {
        const card = document.createElement('div');
        card.style.cssText = `border: 1px solid ${ex.is_active ? 'var(--accent-gold)' : 'var(--grid-border)'}; padding: 1.5rem; background: ${ex.is_active ? 'var(--bg-primary)' : 'transparent'}; transition: all 0.3s;`;
        
        const statusBadge = ex.is_active 
          ? `<span style="font-size: 9px; padding: 3px 8px; background: var(--accent-gold); color: #fff; letter-spacing: 1px; text-transform: uppercase;">Live Now</span>`
          : `<span style="font-size: 9px; padding: 3px 8px; border: 1px solid var(--grid-border); color: var(--text-secondary); letter-spacing: 1px; text-transform: uppercase;">Inactive</span>`;
          
        const safeTitle = window.escapeHtml(ex.title);
        const safeDateText = window.escapeHtml(ex.date_text);
        const actionBtn = ex.is_active
          ? `<button disabled style="font-family: var(--font-body); font-size: 10px; text-transform: uppercase; letter-spacing: 1px; padding: 0.5rem 1rem; background: transparent; border: 1px solid var(--grid-border); color: var(--text-secondary); cursor: not-allowed;">Currently Active</button>`
          : `<button onclick="activateExhibition(${ex.id}, '${safeTitle.replace(/'/g, "\\'")}')" class="action-btn gold" style="padding: 0.5rem 1rem; font-size: 10px;">Set as Live</button>`;

        card.innerHTML = `
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
            <div>
              <div style="font-family: var(--font-heading); font-size: 1.3rem; color: var(--text-primary); margin-bottom: 0.2rem;">${safeTitle}</div>
              <div style="font-size: 11px; color: var(--text-secondary);">${safeDateText}</div>
            </div>
            ${statusBadge}
          </div>
          <div>${actionBtn}</div>
        `;
        container.appendChild(card);
      });
    };

    window.createNewExhibition = async function() {
      const btn = document.querySelector('button[onclick="createNewExhibition()"]');
      const msg = document.getElementById('createExMsg');
      
      const payload = {
        title: document.getElementById('newExTitle').value.trim(),
        date_text: document.getElementById('newExDate').value.trim(),
        venue: document.getElementById('newExVenue').value.trim(),
        about_text: document.getElementById('newExDesc').value.trim(),
        tnc_pdf_url: document.getElementById('newExTnc').value.trim(),
        registration_fee: document.getElementById('newExFee').value.trim(),
        payment_qr_url: document.getElementById('newExQr').value.trim(),
        payment_instructions: document.getElementById('newExPayInst').value.trim()
      };

      if (!payload.title || !payload.date_text || !payload.venue) {
        msg.textContent = "Title, Dates, and Venue are required.";
        msg.style.color = "var(--accent-red)";
        return;
      }

      btn.textContent = "Creating..."; btn.disabled = true;
      const res = await window.globalApiFetch('/admin/exhibitions/create', { method: 'POST', body: JSON.stringify(payload) });
      
      if (res && res.ok) {
        msg.textContent = "✓ Exhibition Created!";
        msg.style.color = "var(--accent-green)";
        document.querySelectorAll('#newExTitle, #newExDate, #newExVenue, #newExDesc, #newExTnc, #newExFee, #newExQr, #newExPayInst').forEach(el => el.value = '');
        await window.loadExhibitionManager(); 
      } else {
        msg.textContent = "Failed to create. Title might already exist.";
        msg.style.color = "var(--accent-red)";
      }
      
      btn.textContent = "Create Exhibition"; btn.disabled = false;
      setTimeout(() => msg.textContent = '', 4000);
    };

    window.activateExhibition = async function(id, title) {
      if (!confirm(`Are you sure you want to make "${title}" the live exhibition on the public portal?`)) return;
      const res = await window.globalApiFetch(`/admin/exhibitions/${id}/activate`, { method: 'PATCH' });
      if (res && res.ok) { await window.loadExhibitionManager(); await window.loadExhibitionsData('ALL'); } 
      else { alert("Failed to activate exhibition."); }
    };

    window.deactivateAllExhibitions = async function() {
      if (!confirm("Are you sure you want to CLOSE the exhibition portal? The public will not be able to apply until you set a cycle to live.")) return;
      const res = await window.globalApiFetch('/admin/exhibitions/deactivate-all', { method: 'PATCH' });
      if (res && res.ok) { await window.loadExhibitionManager(); alert("Portal successfully closed."); } 
      else { alert("Failed to close portal."); }
    };

    async function buildCycleSelector() {
      const res = await window.globalApiFetch('/admin/exhibitions/cycles');
      if (!res || !res.ok) return;
      const { cycles, current } = await res.json();
      const wrap = document.getElementById('cycleSelectWrap');
      if (!wrap) return;

      let opts = `<option value="">Active Now: ${current || 'None'}</option>`;
      cycles.forEach(c => { if (c !== current) opts += `<option value="${c}">${c}</option>`; });
      opts += `<option value="ALL">— All Archive —</option>`;

      wrap.innerHTML = `
        <label style="font-size:10px;color:var(--text-secondary);text-transform:uppercase;letter-spacing:1px;margin-right:0.8rem;">Viewing Cycle:</label>
        <select id="cycleSelect" style="background:transparent;border:none;border-bottom:1px solid var(--grid-border);color:var(--text-primary);font-family:var(--font-body);font-size:12px;padding:0.4rem 0;outline:none;">
          ${opts}
        </select>`;

      const sel = document.getElementById('cycleSelect');
      sel.value = currentCycleView;

      sel.addEventListener('change', async (e) => {
        currentCycleView = e.target.value; 
        const query = currentCycleView ? `?cycle=${encodeURIComponent(currentCycleView)}` : '';
        const r = await window.globalApiFetch(`/admin/exhibitions${query}`);
        if (r && r.ok) { allExhibs = await r.json(); window.filterExhibitions('ALL'); }
      });
    }

    window.loadExhibitionsData = async function(f) {
      currentCycleView = 'ALL'; 
      const res = await window.globalApiFetch('/admin/exhibitions?cycle=ALL');
      if (!res) return;
      allExhibs = await res.json();
      await buildCycleSelector();
      window.renderExhibitions(f);
    };

    const hasPaymentSubmission = (a) => a.registration_status === 'SUBMITTED' || a.registration_status === 'CONFIRMED' || Boolean(a.payment_proof_url);
    const getExhibitionLabel = (a) => a.registration_status === 'CONFIRMED' ? 'CONFIRMED' : hasPaymentSubmission(a) ? 'PAYMENT SUBMITTED' : a.status;

    window.filterExhibitions = function(f) {
      activeCycleFilter = f;
      document.querySelectorAll('[id^="filt-"]').forEach(b => b.classList.remove('gold'));
      const target = document.getElementById(`filt-${f}`);
      if (target) target.classList.add('gold');
      window.renderExhibitions(f);
    };

    window.renderExhibitions = function(f) {
      const container = document.getElementById('exhibitionsContainer');
      const apps = f === 'ALL' ? allExhibs : allExhibs.filter(a => f === 'FINALIZED' ? hasPaymentSubmission(a) : f === 'APPROVED' ? a.status === 'APPROVED' && !hasPaymentSubmission(a) : a.status === f);
      
      container.innerHTML = '';
      if (!apps.length) { container.innerHTML = '<div class="empty-state">No portfolios found.</div>'; return; }

      apps.forEach(a => {
        const card = document.createElement('div');
        card.className = 'data-card exhib-card';
        const displayStatus = getExhibitionLabel(a);
        const badge = a.status === 'PENDING' ? 'badge-pending' : a.status === 'APPROVED' ? 'badge-approved' : 'badge-rejected';

        let actionBtns = `<a href="${a.portfolio_url}" target="_blank" class="action-btn gold" style="padding:0.6rem;font-size:9px;text-align:center;">View Portfolio</a>`;

        if (a.status === 'PENDING') {
          actionBtns += `
            <button class="action-btn" style="padding:0.6rem;font-size:9px;" onclick="reviewExhibition(${a.id},'APPROVED',this)">Approve</button>
            <button class="action-btn" style="padding:0.6rem;font-size:9px;border-color:var(--accent-red);color:var(--accent-red);" onclick="reviewExhibition(${a.id},'REJECTED',this)">Reject</button>`;
        } else if (a.status === 'REJECTED') {
          actionBtns += `<button class="action-btn" style="padding:0.6rem;font-size:9px;" onclick="revertExhibition(${a.id},this)">Undo Rejection</button>`;
        }
        if (a.payment_proof_url) {
          actionBtns += `<a href="${a.payment_proof_url}" target="_blank" class="action-btn" style="padding:0.6rem;font-size:9px;border-color:var(--accent-green);color:var(--accent-green);text-align:center;margin-top:0.5rem;">View Payment Receipt</a>`;
        }
        if (a.registration_status === 'SUBMITTED') {
          actionBtns += `<button class="action-btn gold" style="padding:0.6rem;font-size:9px;" onclick="confirmExhibitionPayment(${a.id},this)">Confirm Payment</button>`;
        }

        const cycleName = window.escapeHtml(a.exhibition_cycle ? a.exhibition_cycle : 'LEGACY ARCHIVE');
        const cycleTag = `<div style="font-size:10px; margin-top:6px; color:var(--accent-gold); letter-spacing:1.5px; text-transform:uppercase; font-weight:600;">CYCLE: ${cycleName}</div>`;

        const safeFullName = window.escapeHtml(a.full_name);
        const safeUserEmail = window.escapeHtml(a.user_email);
        const safeGenre = window.escapeHtml(a.genre);
        const safeMedium = window.escapeHtml(a.medium);

        card.innerHTML = `
          <div>
            <div class="data-label">Artist</div>
            <div class="data-display">${safeFullName}</div>
            <div style="font-size:11px;color:var(--text-secondary);margin-top:4px;">${safeUserEmail}</div>
            ${cycleTag}
          </div>
          <div>
            <div class="data-label">Art Profile</div>
            <div class="data-display" style="font-size:13px;">${safeGenre}</div>
            <div style="font-size:11px;color:var(--text-secondary);margin-top:4px;">Medium: ${safeMedium}</div>
          </div>
          <div><div class="data-label">Status</div><span class="badge ${badge}">${displayStatus}</span></div>
          <div style="display:flex;flex-direction:column;gap:0.5rem;">${actionBtns}</div>`;
        container.appendChild(card);
      });
      if (window.refreshGlobalEffects) window.refreshGlobalEffects();
    };

    window.reviewExhibition = async function(id, status, btn) {
      const note = prompt('Curator Note to Artist (optional):');
      btn.textContent = '...'; btn.disabled = true;
      const res = await window.globalApiFetch('/admin/exhibitions/review', { method: 'POST', body: JSON.stringify({ application_id: id, status: status, curator_note: note || null }) });
      if (res && res.ok) { await window.loadExhibitionsData('ALL'); window.filterExhibitions(activeCycleFilter); } 
      else { btn.textContent = status === 'APPROVED' ? 'Approve' : 'Reject'; btn.disabled = false; }
    };

    window.revertExhibition = async function(id, btn) {
      if (!confirm('Undo rejection and return to Pending?')) return;
      btn.textContent = '...'; btn.disabled = true;
      const res = await window.globalApiFetch(`/admin/exhibitions/${id}/revert`, { method: 'PATCH' });
      if (res && res.ok) { await window.loadExhibitionsData('ALL'); window.filterExhibitions(activeCycleFilter); } 
      else { btn.textContent = 'Undo Rejection'; btn.disabled = false; }
    };

    window.confirmExhibitionPayment = async function(id, btn) {
      if (!confirm('Confirm this payment? This will notify the artist.')) return;
      btn.textContent = '...'; btn.disabled = true;
      const res = await window.globalApiFetch(`/admin/exhibitions/${id}/confirm-payment`, { method: 'PATCH' });
      if (res && res.ok) { await window.loadExhibitionsData('ALL'); window.filterExhibitions('FINALIZED'); } 
      else { btn.textContent = 'Confirm Payment'; btn.disabled = false; }
    };

    // ==========================================
    // CLUBS LOGIC
    // ==========================================
    let allClubApps = [];
    window.loadClubs = async function(f) { const res = await window.globalApiFetch('/admin/club-applications'); if(!res) return; allClubApps = await res.json(); window.renderClubs(f); };
    window.filterClubs = function(f) { document.querySelectorAll('[id^="filter-"]').forEach(b => { b.classList.remove('gold'); b.style.color = ''; b.style.borderColor = ''; }); const target = document.getElementById(`filter-${f}`); if(target) target.classList.add('gold'); window.renderClubs(f); };
    window.renderClubs = function(f) {
      const container = document.getElementById('clubsContainer'); const apps = f === 'ALL' ? allClubApps : allClubApps.filter(a => a.status === f); container.innerHTML = '';
      if (!apps.length) { container.innerHTML = '<div class="empty-state">No applications found.</div>'; return; }
      apps.forEach(a => {
        const card = document.createElement('div'); card.className = 'data-card club-card'; const badge = a.status === 'PENDING' ? 'badge-pending' : a.status === 'APPROVED' ? 'badge-approved' : 'badge-rejected';
        const safeEmail = window.escapeHtml(a.user_email);
        const safeClub = window.escapeHtml(a.club_name);
        card.innerHTML = `
          <div><div class="data-label">User</div><div class="data-display">${safeEmail}</div></div>
          <div><div class="data-label">Club</div><div class="data-display">${safeClub}</div></div>
          <div><div class="data-label">Status</div><span class="badge ${badge}">${a.status}</span></div>
          <div style="display:flex; flex-direction:column; gap:0.5rem;">
          ${a.status === 'PENDING' ? `<button class="action-btn" style="padding:0.6rem; font-size:9px;" onclick="reviewClub(${a.id}, 'APPROVED', this)">Approve</button><button class="action-btn" style="padding:0.6rem; font-size:9px; border-color:var(--accent-red); color:var(--accent-red);" onclick="reviewClub(${a.id}, 'REJECTED', this)">Reject</button>` : ''}
          ${a.status === 'REJECTED' ? `<button class="action-btn" style="padding:0.6rem; font-size:9px;" onclick="revertClub(${a.id}, this)">Undo</button>` : ''}
          </div>`;
        container.appendChild(card);
      });
      if(window.refreshGlobalEffects) window.refreshGlobalEffects();
    };
    window.reviewClub = async function(id, status, btn) { const note = status === 'REJECTED' ? prompt('Note:') : null; btn.textContent = '...'; const res = await window.globalApiFetch('/admin/club-applications/review', { method: 'POST', body: JSON.stringify({ application_id: id, status, admin_note: note }) }); if (res && res.ok) window.loadClubs('ALL'); };
    window.revertClub = async function(id, btn) { if (!confirm('Undo rejection?')) return; btn.textContent = '...'; btn.disabled = true; const res = await window.globalApiFetch(`/admin/club-applications/${id}/revert`, { method: 'PATCH' }); if (res && res.ok) { window.loadClubs('ALL'); window.filterClubs('ALL'); } };

    // ==========================================
    // ROSTER LOGIC
    // ==========================================
    window.loadRoster = async function() {
      const container = document.getElementById('rosterContainer'); const res = await window.globalApiFetch('/admin/users'); if(!res) return; const users = await res.json(); container.innerHTML = '';
      users.forEach((u, i) => {
        const card = document.createElement('div'); card.className = 'data-card user-card';
        const safeEmail = window.escapeHtml(u.email);
        card.innerHTML = `
          <div><div class="data-label">User</div><div class="data-display">${safeEmail}</div></div>
          <div><div class="data-label">Role</div><select id="st-${i}" style="margin:0;"><option value="PARTICIPANT" ${u.status==='PARTICIPANT'?'selected':''}>Participant</option><option value="ADMIN" ${u.status==='ADMIN'?'selected':''}>Admin</option></select></div>
          <button class="action-btn gold" style="padding:0.8rem; font-size:9px;" onclick="updateStatus('${u.email}', ${i}, this)">Save Role</button>`;
        container.appendChild(card);
      });
      if(window.refreshGlobalEffects) window.refreshGlobalEffects();
    };
    window.updateStatus = async function(email, i, btn) { const status = document.getElementById(`st-${i}`).value; btn.textContent = '...'; const res = await window.globalApiFetch('/admin/update_status', { method: 'POST', body: JSON.stringify({ email, status }) }); if (res && res.ok) { if (email === user.email && status === 'PARTICIPANT') { localStorage.clear(); window.location.href = 'login.html'; } btn.textContent = '✓'; setTimeout(() => btn.textContent = 'Save Role', 2000); } };

    // ==========================================
    // VOLUNTEER RECRUITMENT LOGIC
    // ==========================================
    window.loadRecruitment = async function() {
      const container = document.getElementById('recruitmentContainer');
      if (!container) return;
      container.innerHTML = '<div class="empty-state">Loading candidate records...</div>';

      try {
        const res = await window.globalApiFetch('/recruit/research/sessions');
        if (!res) return;
        const sessions = await res.json();
        if (!sessions || !sessions.length) {
          container.innerHTML = '<div class="empty-state">No recruitment assessment sessions found in registry.</div>';
          return;
        }

        container.innerHTML = '';
        sessions.forEach(s => {
          const card = document.createElement('div');
          card.className = 'data-card user-card';
          const safeName = window.escapeHtml(s.full_name || 'Anonymous Applicant');
          const safeEmail = window.escapeHtml(s.email || '—');
          const contactInfo = s.phone_or_contact ? ` · ${window.escapeHtml(s.phone_or_contact)}` : '';
          const dateStr = s.created_at ? new Date(s.created_at).toLocaleString() : '—';
          const sjtBadgeText = s.has_sjt ? 'SJT: Completed' : 'SJT: In Progress';
          const sjtBadgeClass = s.has_sjt ? 'badge-approved' : 'badge-pending';
          const tasksCount = s.completed_tasks_count || 0;
          const tasksText = `Tasks: ${tasksCount} / 21 completed`;
          const evidenceStatus = s.evidence_status || (tasksCount >= 21 && s.has_sjt ? 'Evidence Collected' : 'In Progress');
          const evidenceBadgeClass = evidenceStatus === 'Evidence Collected' ? 'badge-approved' : 'badge-pending';
          const sessionStatus = s.status || 'ACTIVE';
          const isSessionComplete = ['COMPLETE', 'COMPLETED'].includes(sessionStatus);
          const sessionStatusClass = isSessionComplete ? 'badge-approved' : (sessionStatus === 'CONSENTED' ? 'badge-pending' : 'badge-open');

          card.innerHTML = `
            <div style="flex:1;">
              <div class="data-label">Candidate · Status: <span class="badge ${sessionStatusClass}" style="font-size:9px; padding:1px 5px; margin-left:4px;">${sessionStatus}</span></div>
              <div class="data-display" style="font-weight: 500;">${safeName}</div>
              <div style="font-size:11px; color:var(--text-secondary); margin-top:4px;">${safeEmail}${contactInfo} · <span style="font-family:monospace; font-size:10px;">${s.session_id.slice(0, 8)}...</span></div>
              <div style="display:flex; flex-wrap:wrap; gap:6px; margin-top:8px;">
                <span class="badge ${sjtBadgeClass}" style="font-size:10px;">${sjtBadgeText}</span>
                <span class="badge" style="font-size:10px; background:#f0eeea; color:var(--text-primary); border:1px solid var(--grid-border);">${tasksText}</span>
                <span class="badge ${evidenceBadgeClass}" style="font-size:10px;">${evidenceStatus}</span>
              </div>
            </div>
            <div style="min-width:200px;">
              <div class="data-label">Evidence & Extractor Calibration</div>
              <div style="display:flex; flex-direction:column; gap:4px; margin-top:4px;">
                <span class="badge" style="font-size:10px; background:#e8f4f8; color:#1e5066; border:1px solid #bce0ed; align-self:flex-start;">Active Extractors: 2 / 2 (A1, A2)</span>
                <span style="font-size:10px; color:var(--text-secondary); font-style:italic;">19 extractors quarantined (Design Freeze v1.1)</span>
              </div>
              <div style="font-size:11px; color:var(--text-secondary); margin-top:6px;">Submitted: ${dateStr}</div>
            </div>
            <div style="display:flex; justify-content:flex-end; align-items:center;">
              <button class="action-btn gold" style="padding:0.8rem 1.2rem; font-size:10px;" onclick="viewCandidateDossier('${s.session_id}')">
                Inspect Dossier &rarr;
              </button>
            </div>
          `;
          container.appendChild(card);
        });

        if (window.refreshGlobalEffects) window.refreshGlobalEffects();
      } catch (err) {
        container.innerHTML = '<div class="empty-state">Error loading recruitment sessions.</div>';
      }
    };

    async function fetchCandidateDossier(sessionId) {
      let response = null;

      for (let attempt = 0; attempt < 3; attempt++) {
        try {
          response = await window.globalApiFetch(`/recruit/research/session/${sessionId}`);
          if (!response || response.ok || response.status < 500) return response;
        } catch (error) {
          if (attempt === 2) throw error;
        }

        await new Promise(resolve => setTimeout(resolve, 1200 * (attempt + 1)));
      }

      return response;
    }

    window.viewCandidateDossier = async function(sessionId) {
      document.getElementById('modalTitle').textContent = 'Candidate Evidence Dossier';
      const body = document.getElementById('modalBody');
      body.innerHTML = `
        <div style="padding: 3rem 1rem; text-align: center; color: var(--text-secondary);">
          <div class="w-8 h-8 border-2 border-[var(--accent-gold)] border-t-transparent rounded-full animate-spin mx-auto mb-3" style="width:28px; height:28px; border-radius:50%; border:2px solid var(--accent-gold); border-top-color:transparent; animation: spin 1s linear infinite; margin: 0 auto 12px auto;"></div>
          <div style="font-size: 13px; font-family: var(--font-heading);">Retrieving Candidate Dossier...</div>
          <div style="font-size: 11px; margin-top: 4px;">Loading telemetry records from research registry.</div>
        </div>
      `;
      document.getElementById('regModal').classList.add('open');

      try {
        const res = await fetchCandidateDossier(sessionId);
        if (!res) {
          body.innerHTML = '<div style="padding:2rem; text-align:center; color:var(--accent-red);">Session expired or network error. Please refresh and try again.</div>';
          return;
        }

        const data = await res.json();
        if (!res.ok) {
          body.innerHTML = `<div style="padding:2rem; text-align:center; color:var(--accent-red); font-size:13px;">Error loading dossier (${res.status}): ${window.escapeHtml(data.detail || 'Server error')}<br><br><button class="action-btn gold" onclick="viewCandidateDossier('${sessionId}')" style="font-size:11px; padding:0.5rem 1rem;">Retry</button></div>`;
          return;
        }

        const meta = data.metadata || {};
        const applicant = meta.applicant || {};
        const consent = meta.consent || {};
        const ev = data.evidence_by_parameter || {};
        const feats = data.features || [];
        const flags = data.data_quality_flags || [];
        const taskRecords = data.task_records || [];
        const comparisons = data.measurement_comparisons || {};
        const psychometric = data.psychometric_status || {};
        const taskStatement = data.task_records_statement || 'Descriptive task counts; not a score, not norm-referenced, and not a basis for automated decisions.';

        const candidateName = window.escapeHtml(applicant.full_name || 'Candidate');
        const candidateEmail = window.escapeHtml(applicant.email || '—');
        const candidatePhone = window.escapeHtml(applicant.phone_or_contact || '—');
        const consentDateStr = consent.timestamp ? new Date(consent.timestamp).toLocaleString() : (meta.created_at ? new Date(meta.created_at).toLocaleString() : '—');
        const dpdpVersion = window.escapeHtml(consent.consent_text_version || '1.0');
        const durationMin = meta.duration_minutes !== null && meta.duration_minutes !== undefined ? `${meta.duration_minutes} min` : 'In progress';
        const totalEvents = meta.telemetry_summary?.total_events ?? 'Unavailable';
        const sessionComplete = ['COMPLETE', 'COMPLETED'].includes(meta.status);

        document.getElementById('modalTitle').textContent = `${candidateName} — Assessment Evidence Dossier`;

        // 1. Candidate Identity & Consent
        const section1Html = `
          <div style="background:#faf8f5; border:1px solid var(--grid-border); padding:1.25rem; margin-bottom:1.5rem;">
            <div style="font-size:11px; font-weight:600; letter-spacing:1px; text-transform:uppercase; color:var(--accent-gold); margin-bottom:0.75rem;">1. Candidate Identity & Consent Verification</div>
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:1rem; font-size:12px;">
              <div><strong>Full Name:</strong> ${candidateName}</div>
              <div><strong>Email:</strong> ${candidateEmail}</div>
              <div><strong>Contact / Phone:</strong> ${candidatePhone}</div>
              <div><strong>Session ID:</strong> <span style="font-family:monospace; font-size:11px;">${sessionId}</span></div>
              <div><strong>Session Status:</strong> <span class="badge ${sessionComplete ? 'badge-approved' : 'badge-pending'}" style="font-size:9px;">${window.escapeHtml(meta.status || 'ACTIVE')}</span></div>
              <div><strong>Duration:</strong> ${durationMin}</div>
              <div><strong>Consent Recorded:</strong> ${consentDateStr}</div>
              <div><strong>DPDP Notice Version:</strong> <span style="font-family:monospace; font-size:11px;">v${dpdpVersion}</span></div>
              <div><strong>Age Confirmation:</strong> Confirmed 18+</div>
            </div>
          </div>
        `;

        // 2. 7 Parameter Summary (from SJT)
        const PARAM_NAMES = {
          'empathy': 'Empathy',
          'conscientiousness': 'Conscientiousness',
          'collaborative_spirit': 'Collaborative Spirit',
          'emotional_agility': 'Emotional Agility',
          'curiosity': 'Curiosity',
          'creative_initiative': 'Creative Initiative',
          'motivation': 'Motivation'
        };

        const mapBand = (rawBand) => {
          if (!rawBand) return 'DEVELOPING';
          const b = rawBand.toUpperCase();
          if (b === 'HIGH') return 'HIGH';
          if (b === 'MODERATE' || b === 'BALANCED') return 'BALANCED';
          return 'DEVELOPING';
        };

        let paramRows = '';
        const paramKeys = Object.keys(ev);
        if (paramKeys.length > 0) {
          paramRows = paramKeys.map(pKey => {
            const p = ev[pKey];
            const pName = PARAM_NAMES[pKey] || pKey.replace(/_/g, ' ').toUpperCase();
            const bandCategory = mapBand(p.sjt_band);
            const bandColor = bandCategory === 'HIGH' ? '#2e7d32' : (bandCategory === 'BALANCED' ? '#b5832a' : '#555');

            return `
              <div style="background:#ffffff; border:1px solid var(--grid-border); padding:1rem; margin-bottom:0.75rem;">
                <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--grid-border); padding-bottom:0.5rem; margin-bottom:0.5rem;">
                  <span style="font-size:12px; font-weight:600; color:var(--text-primary);">${pName}</span>
                  <span style="font-size:11px; font-weight:700; color:${bandColor}; letter-spacing:0.5px;">${bandCategory}</span>
                </div>
                <div style="font-size:11px; color:var(--text-secondary); line-height:1.5;">
                  ${window.escapeHtml(p.observed_behavior || 'Behavioral trade-off indicator recorded during situational judgment scenarios.')}
                </div>
              </div>
            `;
          }).join('');
        } else {
          paramRows = `<div style="padding:1rem; text-align:center; color:var(--text-secondary); font-size:11px; background:#fff; border:1px solid var(--grid-border);">Situational Judgment responses are currently being recorded for this session.</div>`;
        }

        const section2Html = `
          <div style="margin-bottom:1.5rem;">
            <div style="font-size:11px; font-weight:600; letter-spacing:1px; text-transform:uppercase; color:var(--accent-gold); margin-bottom:0.5rem;">2. Seven Parameter Summary (Situational Judgment)</div>
            <div style="font-size:11px; background:rgba(189,111,93,0.08); border-left:3px solid var(--accent-gold); padding:0.75rem 1rem; margin-bottom:1rem; line-height:1.5; color:var(--text-primary);">
              <strong>Notice:</strong> Parameters are derived from Situational Judgment responses. These are provisional ipsative indicators, NOT standardized scores.
            </div>
            ${paramRows}
          </div>
        `;

        // 3. Active Feature Extractors (2 of 21: A1, A2)
        const activeFeats = feats.filter(f => !f.is_quarantined);
        const a1Feat = activeFeats.find(f => f.mini_game === 'A1') || { value_raw: '—', label: 'Attention to Detail (A1 Folio Sorting)' };
        const a2Feat = activeFeats.find(f => f.mini_game === 'A2') || { value_raw: '—', label: 'Exception Handling (A2 Fragile Leaf)' };

        const formatRaw = (val) => (val !== null && val !== undefined && typeof val === 'number') ? (Number.isInteger(val) ? val : val.toFixed(2)) : (val || '—');

        const section3Html = `
          <div style="margin-bottom:1.5rem;">
            <div style="font-size:11px; font-weight:600; letter-spacing:1px; text-transform:uppercase; color:var(--accent-gold); margin-bottom:0.5rem;">3. Active Feature Extractors (2 of 21)</div>
            <div style="font-size:11px; background:#eef7f9; border-left:3px solid #3182ce; padding:0.75rem 1rem; margin-bottom:1rem; line-height:1.5; color:#1a365d;">
              <strong>Notice:</strong> Only A1 and A2 are active. The remaining 19 extractors are quarantined under Design Freeze v1.1 pending empirical calibration.
            </div>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
              <div style="background:#ffffff; border:1px solid var(--grid-border); padding:1rem;">
                <div style="font-size:10px; font-family:monospace; color:var(--accent-gold); font-weight:600; text-transform:uppercase;">A1 · The Archive</div>
                <div style="font-size:12px; font-weight:600; color:var(--text-primary); margin:2px 0 6px 0;">Attention to Detail (Sorting Precision)</div>
                <div style="font-size:11px; color:var(--text-secondary);">Raw Metric: <strong style="color:var(--text-primary);">${formatRaw(a1Feat.value_raw)}</strong></div>
                <div style="font-size:10px; color:var(--text-secondary); margin-top:2px;">Observations: 5 classification trials · Status: ACTIVE</div>
              </div>
              <div style="background:#ffffff; border:1px solid var(--grid-border); padding:1rem;">
                <div style="font-size:10px; font-family:monospace; color:var(--accent-gold); font-weight:600; text-transform:uppercase;">A2 · The Archive</div>
                <div style="font-size:12px; font-weight:600; color:var(--text-primary); margin:2px 0 6px 0;">Exception Handling (Fragile Foliar Review)</div>
                <div style="font-size:11px; color:var(--text-secondary);">Raw Metric: <strong style="color:var(--text-primary);">${formatRaw(a2Feat.value_raw)}</strong></div>
                <div style="font-size:10px; color:var(--text-secondary); margin-top:2px;">Observations: 4 exception trials · Status: ACTIVE</div>
              </div>
            </div>
          </div>
        `;

        // 4. Quarantined Feature Extractors (19 of 21)
        const quarantinedFeats = feats.filter(f => f.is_quarantined);
        let qTableRows = '';
        if (quarantinedFeats.length > 0) {
          qTableRows = quarantinedFeats.map(q => `
            <tr style="border-bottom:1px solid var(--grid-border); font-size:11px;">
              <td style="padding:0.5rem; color:var(--text-primary); font-weight:500;">${q.world_name}</td>
              <td style="padding:0.5rem; font-family:monospace; color:var(--text-secondary);">${q.mini_game}</td>
              <td style="padding:0.5rem; color:var(--text-primary);">${q.label || q.feature_name}</td>
              <td style="padding:0.5rem; text-align:center;"><span style="font-size:9px; background:#f0eeea; color:#666; padding:2px 6px; border:1px solid var(--grid-border); font-weight:600; letter-spacing:0.5px;">QUARANTINED</span></td>
              <td style="padding:0.5rem; font-size:10px; color:var(--text-secondary); font-style:italic;">Awaiting calibration data (Design Freeze v1.1)</td>
            </tr>
          `).join('');
        }

        const section4Html = `
          <div style="margin-bottom:1.5rem;">
            <div style="font-size:11px; font-weight:600; letter-spacing:1px; text-transform:uppercase; color:var(--accent-gold); margin-bottom:0.5rem;">4. Quarantined Feature Extractors (19 of 21)</div>
            <div style="overflow-x:auto; border:1px solid var(--grid-border); background:#ffffff;">
              <table style="width:100%; border-collapse:collapse; text-align:left;">
                <thead>
                  <tr style="background:#f0eeea; font-size:10px; text-transform:uppercase; letter-spacing:1px; color:var(--text-secondary); border-bottom:1px solid var(--grid-border);">
                    <th style="padding:0.5rem;">World</th>
                    <th style="padding:0.5rem;">ID</th>
                    <th style="padding:0.5rem;">Extractor Name</th>
                    <th style="padding:0.5rem; text-align:center;">Badge</th>
                    <th style="padding:0.5rem;">Quarantine Policy</th>
                  </tr>
                </thead>
                <tbody>
                  ${qTableRows || '<tr><td colspan="5" style="padding:1rem; text-align:center; font-size:11px; color:var(--text-secondary);">Quarantine catalog synchronized under Design Freeze v1.1.</td></tr>'}
                </tbody>
              </table>
            </div>
          </div>
        `;

        // 5. 21-Game Descriptive Task Records
        let trRows = '';
        if (taskRecords.length > 0) {
          trRows = taskRecords.map(r => `
            <tr style="border-bottom:1px solid var(--grid-border); font-size:11px;">
              <td style="padding:0.5rem; font-weight:500; color:var(--text-primary);">${window.escapeHtml(r.world_name || r.world_id)}</td>
              <td style="padding:0.5rem; color:var(--text-secondary);"><span style="font-family:monospace; font-size:10px; background:#f0eeea; padding:1px 4px; border-radius:2px; margin-right:4px;">${window.escapeHtml(r.game_id)}</span> ${window.escapeHtml(r.game_name || r.game_id)}</td>
              <td style="padding:0.5rem; color:var(--text-primary);">${window.escapeHtml(r.display_text)}</td>
              <td style="padding:0.5rem; text-align:right; font-family:monospace; font-size:10px; color:${r.status === 'RECORDED' ? '#2e7d32' : 'var(--text-secondary)'}; font-weight:600;">${r.status}</td>
            </tr>
          `).join('');
        }

        const section5Html = `
          <div style="margin-bottom:1.5rem;">
            <div style="font-size:11px; font-weight:600; letter-spacing:1px; text-transform:uppercase; color:var(--accent-gold); margin-bottom:0.25rem;">5. 21-Game Descriptive Task Records</div>
            <p style="font-size:11px; color:var(--text-secondary); font-style:italic; margin-bottom:0.5rem;">${taskStatement}</p>
            <div style="overflow-x:auto; border:1px solid var(--grid-border); background:#ffffff;">
              <table style="width:100%; border-collapse:collapse; text-align:left;">
                <thead>
                  <tr style="background:#f0eeea; font-size:10px; text-transform:uppercase; letter-spacing:1px; color:var(--text-secondary); border-bottom:1px solid var(--grid-border);">
                    <th style="padding:0.5rem;">World</th>
                    <th style="padding:0.5rem;">Interactive Task</th>
                    <th style="padding:0.5rem;">Factual Task Observation</th>
                    <th style="padding:0.5rem; text-align:right;">Status</th>
                  </tr>
                </thead>
                <tbody>
                  ${trRows || '<tr><td colspan="4" style="padding:1rem; text-align:center; font-size:11px; color:var(--text-secondary);">Task records will be logged upon game battery completion.</td></tr>'}
                </tbody>
              </table>
            </div>
          </div>
        `;

        // 6. Data Quality Flags & Telemetry Integrity
        const section6Html = `
          <div style="margin-bottom:1.5rem; background:#faf8f5; border:1px solid var(--grid-border); padding:1.25rem;">
            <div style="font-size:11px; font-weight:600; letter-spacing:1px; text-transform:uppercase; color:var(--accent-gold); margin-bottom:0.75rem;">6. Data Quality Flags & Telemetry Integrity</div>
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:1rem; font-size:12px; margin-bottom:0.75rem;">
              <div><strong>Total Duration:</strong> ${durationMin}</div>
              <div><strong>Raw Events Logged:</strong> ${totalEvents}</div>
              <div><strong>Throttling:</strong> Not reported by this dossier endpoint</div>
              <div><strong>Data quality flags:</strong> ${flags.length} recorded</div>
            </div>
            ${flags.length > 0 ? `
              <div style="margin-top:0.75rem; padding:0.75rem; background:#fff3e0; border:1px solid #ffe0b2; font-size:11px;">
                <strong style="color:#e65100; text-transform:uppercase;">Recorded Data Notices:</strong>
                <ul style="margin-top:0.25rem; margin-left:1.2rem; list-style-type:disc;">
                  ${flags.map(fl => `<li><span style="font-family:monospace;">${fl.scope}:</span> ${fl.flag} (${fl.detail || 'Standard observation'})</li>`).join('')}
                </ul>
              </div>
            ` : '<div style="font-size:11px; color:var(--text-secondary);">No data-quality flags are recorded. This does not independently verify telemetry completeness.</div>'}
          </div>
        `;

        // 7. Game-level measurement status and empirical calibration indicators
        const comparisonsByGame = new Map();
        Object.entries(comparisons).forEach(([parameter, comparison]) => {
          (comparison.mini_games || []).forEach(game => comparisonsByGame.set(game.mini_game, { parameter, game }));
        });
        const gameMeasurementRows = taskRecords.map(record => {
          const entry = comparisonsByGame.get(record.game_id);
          const measure = entry?.game;
          const gameFeatures = measure?.features || [];
          const value = measure?.feature_status === 'QUARANTINED'
            ? 'Withheld while extractor is quarantined'
            : gameFeatures.length
            ? gameFeatures.map(feature => `${window.escapeHtml(feature.name)}: ${window.escapeHtml(formatRaw(feature.value))}`).join('<br>')
            : 'No feature derived';
          const reliability = psychometric.reliability === 'ESTIMATED' ? 'See study estimate' : 'Not estimated';
          const validity = psychometric.validity === 'ESTIMATED' ? 'See study estimate' : 'Not estimated';
          return `<tr style="border-bottom:1px solid var(--grid-border); font-size:11px;">
            <td style="padding:0.5rem;">${window.escapeHtml(record.world_name || record.world_id)}</td>
            <td style="padding:0.5rem; font-family:monospace;">${window.escapeHtml(record.game_id)}</td>
            <td style="padding:0.5rem;">${window.escapeHtml(entry?.parameter || '—')}</td>
            <td style="padding:0.5rem;">${window.escapeHtml(measure?.feature_status || 'NOT_DERIVED')}</td>
            <td style="padding:0.5rem;">${value}</td>
            <td style="padding:0.5rem;">${reliability}</td>
            <td style="padding:0.5rem;">${validity}</td>
          </tr>`;
        }).join('');
        const constructRows = Object.entries(comparisons).map(([parameter, comparison]) => {
          const within = comparison.within_construct_pairwise_deltas || [];
          const withinText = within.length
            ? within.map(delta => `${window.escapeHtml(delta.left_game)}–${window.escapeHtml(delta.right_game)}: ${delta.delta_bands} band(s)`).join('<br>')
            : 'Not available until calibrated game bands exist';
          const withinTolerance = comparison.within_construct_delta_tolerance_bands == null
            ? 'Not set while uncalibrated'
            : `${comparison.within_construct_delta_tolerance_bands} band(s)`;
          const sjtDelta = comparison.sjt_game_delta_bands == null ? 'Not available until both methods are calibrated' : `${comparison.sjt_game_delta_bands} band(s)`;
          return `<tr style="border-bottom:1px solid var(--grid-border); font-size:11px;">
            <td style="padding:0.5rem;">${window.escapeHtml(parameter.replace(/_/g, ' '))}</td>
            <td style="padding:0.5rem;">${withinText}</td>
            <td style="padding:0.5rem;">${withinTolerance}</td>
            <td style="padding:0.5rem;">${window.escapeHtml(comparison.sjt_band || '—')} / ${window.escapeHtml(comparison.game_band || '—')}</td>
            <td style="padding:0.5rem;">${sjtDelta}</td>
            <td style="padding:0.5rem;">${window.escapeHtml(comparison.sjt_game_delta_tolerance == null ? 'Not set' : comparison.sjt_game_delta_tolerance)}</td>
          </tr>`;
        }).join('');
        const section7Html = `
          <div style="margin-bottom:1.5rem;">
            <div style="font-size:11px; font-weight:600; letter-spacing:1px; text-transform:uppercase; color:var(--accent-gold); margin-bottom:0.5rem;">7. Game Measurement & Calibration</div>
            <div style="font-size:11px; background:#fff3e0; border-left:3px solid #bd6f5d; padding:0.75rem 1rem; margin-bottom:1rem; line-height:1.5;">
              Reliability and validity are study-level estimates, not candidate-level scores. Current calibration: <strong>${window.escapeHtml(psychometric.calibration_status || 'UNKNOWN')}</strong>; regression: <strong>${window.escapeHtml(psychometric.regression || 'NOT_RUN')}</strong>. A single combined score is deliberately unavailable until its measurement model and thresholds are empirically calibrated.
            </div>
            <div style="overflow-x:auto; border:1px solid var(--grid-border); background:#fff; margin-bottom:1rem;">
              <table style="width:100%; border-collapse:collapse; text-align:left; min-width:760px;">
                <thead><tr style="background:#f0eeea; font-size:10px; text-transform:uppercase; color:var(--text-secondary);"><th style="padding:0.5rem;">World</th><th style="padding:0.5rem;">Game</th><th style="padding:0.5rem;">Intended construct</th><th style="padding:0.5rem;">Extractor state</th><th style="padding:0.5rem;">Observed feature(s)</th><th style="padding:0.5rem;">Reliability</th><th style="padding:0.5rem;">Validity</th></tr></thead>
                <tbody>${gameMeasurementRows || '<tr><td colspan="7" style="padding:1rem;">Game catalog unavailable.</td></tr>'}</tbody>
              </table>
            </div>
            <div style="overflow-x:auto; border:1px solid var(--grid-border); background:#fff;">
              <table style="width:100%; border-collapse:collapse; text-align:left; min-width:760px;">
                <thead><tr style="background:#f0eeea; font-size:10px; text-transform:uppercase; color:var(--text-secondary);"><th style="padding:0.5rem;">Construct</th><th style="padding:0.5rem;">Game-to-game delta</th><th style="padding:0.5rem;">Acceptable delta</th><th style="padding:0.5rem;">SJT / game bands</th><th style="padding:0.5rem;">SJT-to-game delta</th><th style="padding:0.5rem;">Acceptable delta</th></tr></thead>
                <tbody>${constructRows || '<tr><td colspan="6" style="padding:1rem;">Construct comparisons unavailable.</td></tr>'}</tbody>
              </table>
            </div>
            <div style="font-size:10px; color:var(--text-secondary); margin-top:0.5rem;">Delta is a descriptive band distance, not a validity statistic. Thresholds must be prespecified and empirically justified; cross-method tolerance is currently unset. ${window.escapeHtml(psychometric.reliability_note || '')} ${window.escapeHtml(psychometric.validity_note || '')}</div>
          </div>
        `;

        body.innerHTML = `
          ${section1Html}
          ${section2Html}
          ${section3Html}
          ${section4Html}
          ${section5Html}
          ${section6Html}
          ${section7Html}
        `;
      } catch (err) {
        console.error('Candidate dossier load error:', err);
        const errMsg = err?.message || 'Please check server connection.';
        body.innerHTML = `<div style="padding:2rem; text-align:center; color:var(--accent-red);">Failed to load candidate dossier.<br><span style="font-size:11px; color:var(--text-secondary); margin-top:6px; display:inline-block;">${window.escapeHtml(errMsg)}</span><br><br><button class="action-btn gold" onclick="viewCandidateDossier('${sessionId}')" style="font-size:11px; padding:0.5rem 1rem;">Retry</button></div>`;
      }
    };

    // INIT
    window.switchTab('events');
});
