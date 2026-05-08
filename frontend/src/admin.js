// admin.js — Centralized Administration Logic
document.addEventListener('DOMContentLoaded', () => {
    const userData = localStorage.getItem('alfaaz_user');
    if (!userData) window.location.href = 'login.html';
    const user = JSON.parse(userData); 
    if (user.status !== 'ADMIN') window.location.href = 'dashboard.html';

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
          const card = document.createElement('div'); card.className = 'data-card event-card magnetic';
          const isOpen = e.registration_open; const capLabel = e.capacity === 0 ? '∞' : `${e.registered}/${e.capacity}`;
          card.innerHTML = `
            <div><div class="data-label">Event</div><div class="data-display">${e.name}</div><div style="font-size:11px; color:var(--text-secondary); margin-top: 4px;">${e.description || '—'}</div></div>
            <div><div class="data-label">Date</div><div class="data-display" style="font-size:12px;">${e.event_date || '—'}</div></div>
            <div><div class="data-label">Registered</div><div class="data-display">${capLabel}</div></div>
            <div><div class="data-label">Status</div><span class="badge ${isOpen ? 'badge-open' : 'badge-closed'}">${isOpen ? 'Open' : 'Closed'}</span></div>
            <div style="display:flex; flex-direction:column; gap:0.6rem;">
              <button class="action-btn ${isOpen ? '' : 'gold'}" style="padding: 0.6rem; font-size:9px;" onclick="toggleEvent(${e.id}, this)">${isOpen ? 'Close Registration' : 'Open Registration'}</button>
              <button class="action-btn gold" style="padding: 0.6rem; font-size:9px;" onclick="viewRegistrations(${e.id})">View List</button>
              <button class="action-btn" style="padding: 0.6rem; font-size:9px; border-color:var(--accent-red); color:var(--accent-red);" onclick="deleteEvent(${e.id}, '${e.name.replace(/'/g, "\\'")}', this)">Delete</button>
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
      data.registrations.forEach((r, i) => { html += `<div style="padding:1rem 0; border-bottom:1px solid var(--grid-border); font-size:13px; display:flex; justify-content:space-between; align-items: center;"><span><strong style="color: var(--accent-gold); margin-right: 10px;">${i+1}.</strong> ${r.email}</span><span style="color:var(--text-primary); font-size: 11px; background: var(--bg-primary); padding: 4px 10px; border-radius: 2px;">${r.whatsapp ? 'WA: ' + r.whatsapp : 'No WA provided'}</span></div>`; });
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
        statusText.innerHTML = `Currently Live: <strong style="color: var(--accent-green);">${liveEx.title}</strong>`;
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
          
        const actionBtn = ex.is_active
          ? `<button disabled style="font-family: var(--font-body); font-size: 10px; text-transform: uppercase; letter-spacing: 1px; padding: 0.5rem 1rem; background: transparent; border: 1px solid var(--grid-border); color: var(--text-secondary); cursor: not-allowed;">Currently Active</button>`
          : `<button onclick="activateExhibition(${ex.id}, '${ex.title.replace(/'/g, "\\'")}')" class="action-btn gold" style="padding: 0.5rem 1rem; font-size: 10px;">Set as Live</button>`;

        card.innerHTML = `
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
            <div>
              <div style="font-family: var(--font-heading); font-size: 1.3rem; color: var(--text-primary); margin-bottom: 0.2rem;">${ex.title}</div>
              <div style="font-size: 11px; color: var(--text-secondary);">${ex.date_text}</div>
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
        payment_instructions: document.getElementById('newExPayInst').value.trim(),
        is_open: false 
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
        card.className = 'data-card exhib-card magnetic';
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

        const cycleName = a.exhibition_cycle ? a.exhibition_cycle : 'LEGACY ARCHIVE';
        const cycleTag = `<div style="font-size:10px; margin-top:6px; color:var(--accent-gold); letter-spacing:1.5px; text-transform:uppercase; font-weight:600;">CYCLE: ${cycleName}</div>`;

        card.innerHTML = `
          <div>
            <div class="data-label">Artist</div>
            <div class="data-display">${a.full_name}</div>
            <div style="font-size:11px;color:var(--text-secondary);margin-top:4px;">${a.user_email}</div>
            ${cycleTag}
          </div>
          <div>
            <div class="data-label">Art Profile</div>
            <div class="data-display" style="font-size:13px;">${a.genre}</div>
            <div style="font-size:11px;color:var(--text-secondary);margin-top:4px;">Medium: ${a.medium}</div>
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
        const card = document.createElement('div'); card.className = 'data-card club-card magnetic'; const badge = a.status === 'PENDING' ? 'badge-pending' : a.status === 'APPROVED' ? 'badge-approved' : 'badge-rejected';
        card.innerHTML = `
          <div><div class="data-label">User</div><div class="data-display">${a.user_email}</div></div>
          <div><div class="data-label">Club</div><div class="data-display">${a.club_name}</div></div>
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
        const card = document.createElement('div'); card.className = 'data-card user-card magnetic';
        card.innerHTML = `
          <div><div class="data-label">User</div><div class="data-display">${u.email}</div></div>
          <div><div class="data-label">Role</div><select id="st-${i}" style="margin:0;"><option value="PARTICIPANT" ${u.status==='PARTICIPANT'?'selected':''}>Participant</option><option value="ADMIN" ${u.status==='ADMIN'?'selected':''}>Admin</option></select></div>
          <button class="action-btn gold" style="padding:0.8rem; font-size:9px;" onclick="updateStatus('${u.email}', ${i}, this)">Save Role</button>`;
        container.appendChild(card);
      });
      if(window.refreshGlobalEffects) window.refreshGlobalEffects();
    };
    window.updateStatus = async function(email, i, btn) { const status = document.getElementById(`st-${i}`).value; btn.textContent = '...'; const res = await window.globalApiFetch('/admin/update_status', { method: 'POST', body: JSON.stringify({ email, status }) }); if (res && res.ok) { if (email === user.email && status === 'PARTICIPANT') { localStorage.clear(); window.location.href = 'login.html'; } btn.textContent = '✓'; setTimeout(() => btn.textContent = 'Save Role', 2000); } };

    // INIT
    window.switchTab('events'); 
});
