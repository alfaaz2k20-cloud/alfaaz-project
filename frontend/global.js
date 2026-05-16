/* ========================================
   ALFAAZ COLLECTIVE — GLOBAL SCRIPTS
======================================== */

// 1. Master Configuration
const API_URL =
    import.meta.env.VITE_API_BASE_URL ||
    import.meta.env.VITE_API_URL ||
    'https://alfaaz-project.onrender.com';
const CLOUDINARY_CLOUD_NAME =
    import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'dmqwjpmjk';
const CLOUDINARY_UPLOAD_PRESET =
    import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'alfaaz_vault';

window.ALFAAZ_API_URL = API_URL;
window.ALFAAZ_CLOUDINARY = {
    cloudName: CLOUDINARY_CLOUD_NAME,
    uploadPreset: CLOUDINARY_UPLOAD_PRESET
};

// 2. Assertive Backend Waking (The Pulse)
// We create a promise that resolves once the backend responds for the first time.
let isServerReady = false;
const serverReadyPromise = (async () => {
    try {
        const start = Date.now();
        await fetch(`${API_URL}/`);
        isServerReady = true;
        console.log(`[ALFAAZ] Backend Pulse: OK (${Date.now() - start}ms)`);
    } catch (e) {
        console.warn("[ALFAAZ] Backend Pulse: Failed. Service might be starting...");
        // Resolve anyway after a timeout to prevent infinite hanging
        setTimeout(() => { isServerReady = true; }, 30000);
    }
})();

// 3. Global Fetch Wrapper (Upgraded with Cold-Start Protection)
window.globalApiFetch = async function(endpoint, options = {}) {
    // If the server hasn't responded yet, wait for the initial pulse to resolve.
    // This prevents multiple overlapping requests from hitting a sleeping server simultaneously.
    if (!isServerReady) {
        await serverReadyPromise;
    }

    const token = localStorage.getItem('alfaaz_token');
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    
    try {
        const response = await fetch(`${API_URL}${endpoint}`, { 
            ...options, 
            headers: { ...headers, ...(options.headers || {}) } 
        });
        
        if (response.status === 401 || response.status === 403) { 
            if (!window.location.pathname.endsWith('login.html')) {
                localStorage.clear(); 
                window.location.href = 'login.html'; 
            }
            return null; 
        }
        return response;
    } catch (error) { 
        console.error("API fetch error:", error); 
        throw error; 
    }
};

// 4. Master UI Binding
window.refreshGlobalEffects = function() {
    if (window.lucide) { window.lucide.createIcons(); }
};

document.addEventListener('DOMContentLoaded', () => {
    window.refreshGlobalEffects();
    
    const navbar = document.getElementById('navbar');
    if (navbar) {
        let lastY = window.scrollY;
        window.addEventListener('scroll', () => {
            const currentY = window.scrollY;
            if (currentY > 80) navbar.classList.add('scrolled');
            else navbar.classList.remove('scrolled');
            
            if (currentY > lastY && currentY > 120) navbar.classList.add('hidden');
            else navbar.classList.remove('hidden');
            
            lastY = currentY;
        }, { passive: true });
    }
});

// 5. Staggered Cascading Translations
(function() {
  function startLanguageCycle() {
    const bilingualElements = document.querySelectorAll('.ur-hover');
    if (bilingualElements.length === 0) return;

    setInterval(() => {
      bilingualElements.forEach((el, index) => {
        setTimeout(() => {
          el.classList.toggle('lang-swapped');
        }, index * 120); 
      });
    }, 5000); 
  }
  
  if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', startLanguageCycle); } 
  else { startLanguageCycle(); }
})();

// 6. Keep Render backend alive (Background Periodic Ping)
async function wakeBackend() {
  try { await fetch(`${API_URL}/`); } catch (e) {}
}
setInterval(wakeBackend, 10 * 60 * 1000);
