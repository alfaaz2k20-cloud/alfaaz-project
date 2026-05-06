/* ========================================
   ALFAAZ COLLECTIVE — GLOBAL SCRIPTS
======================================== */

const API_URL = "https://alfaaz-project.onrender.com";

// 1. Master UI Binding
window.refreshGlobalEffects = function() {
    if (window.lucide) { lucide.createIcons(); }
    
    }
document.addEventListener('DOMContentLoaded', window.refreshGlobalEffects);

// 2. Global Fetch Wrapper
window.globalApiFetch = async function(endpoint, options = {}) {
    const token = localStorage.getItem('alfaaz_token');
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    
    try {
        const response = await fetch(`${API_URL}${endpoint}`, { ...options, headers: { ...headers, ...(options.headers || {}) } });
        if (response.status === 401 || response.status === 403) { localStorage.clear(); window.location.href = 'login.html'; return null; }
        return response;
    } catch (error) { console.error("API fetch error:", error); throw error; }
};

// 3. Staggered Cascading Translations (Rippling Heartbeat)
(function() {
  function startLanguageCycle() {
    const bilingualElements = document.querySelectorAll('.ur-hover');
    if (bilingualElements.length === 0) return;

    setInterval(() => {
      bilingualElements.forEach((el, index) => {
        // This sets off a beautiful cascading wave 120ms apart
        setTimeout(() => {
          el.classList.toggle('lang-swapped');
        }, index * 120); 
      });
    }, 5000); 
  }
  
  // Bind the new Mini Send Button to your existing Enter key logic
const phantomMiniSendBtn = document.getElementById('phantomMiniSendBtn');
const phantomMiniInput = document.getElementById('phantomMiniInput');

if (phantomMiniSendBtn && phantomMiniInput) {
    phantomMiniSendBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Prevent sending empty messages
        if (!phantomMiniInput.value.trim()) return; 
        
        // Create and dispatch a fake 'Enter' keypress to trigger your existing logic natively
        const enterEvent = new KeyboardEvent('keypress', {
            key: 'Enter',
            code: 'Enter',
            keyCode: 13,
            which: 13,
            bubbles: true
        });
        phantomMiniInput.dispatchEvent(enterEvent);
    });
}

  // Ensures it runs reliably
  if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', startLanguageCycle); } 
  else { startLanguageCycle(); }
})();