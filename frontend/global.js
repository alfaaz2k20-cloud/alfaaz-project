/* ========================================
   ALFAAZ COLLECTIVE — GLOBAL SCRIPTS
======================================== */

// 1. Master Configuration
const API_URL = import.meta.env.VITE_API_BASE_URL || 'https://alfaaz-project.onrender.com';

// 2. Global Fetch Wrapper
window.globalApiFetch = async function(endpoint, options = {}) {
    const token = localStorage.getItem('alfaaz_token');
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    
    try {
        const response = await fetch(`${API_URL}${endpoint}`, { 
            ...options, 
            headers: { ...headers, ...(options.headers || {}) } 
        });
        
        if (response.status === 401 || response.status === 403) { 
            // Only clear and redirect if we aren't already on login
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

// 3. Master UI Binding
window.refreshGlobalEffects = function() {
    if (window.lucide) { window.lucide.createIcons(); }
};

document.addEventListener('DOMContentLoaded', () => {
    window.refreshGlobalEffects();
    
    // Global Scroll Navbar Effect
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

// 4. Staggered Cascading Translations
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

// 5. Keep Render backend alive
async function wakeBackend() {
  try { await fetch(`${API_URL}/`); } catch (e) {}
}
wakeBackend();
setInterval(wakeBackend, 10 * 60 * 1000);
