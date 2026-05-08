/* ========================================
   ALFAAZ COLLECTIVE — GLOBAL SCRIPTS
======================================== */

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

// 1. Magnetic Effects
window.initMagnetic = function() {
    const magneticElements = document.querySelectorAll('.magnetic');
    magneticElements.forEach((el) => {
        el.addEventListener('mousemove', function(e) {
            const pos = el.getBoundingClientRect();
            const x = e.clientX - pos.left - pos.width / 2;
            const y = e.clientY - pos.top - pos.height / 2;
            el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        el.addEventListener('mouseleave', function() {
            el.style.transform = 'translate(0px, 0px)';
        });
    });
};

// 2. Master UI Binding
window.refreshGlobalEffects = function() {
    if (window.lucide) { window.lucide.createIcons(); }
    window.initMagnetic();
};

document.addEventListener('DOMContentLoaded', () => {
    window.refreshGlobalEffects();
    
    // Navbar scroll effect
    const navbar = document.querySelector('alfaaz-nav nav');
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

// 3. Global Fetch Wrapper
window.globalApiFetch = async function(endpoint, options = {}) {
    const token = localStorage.getItem('alfaaz_token');
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    
    try {
        const response = await fetch(`${API_URL}${endpoint}`, { ...options, headers: { ...headers, ...(options.headers || {}) } });
        if (response.status === 401 || response.status === 403) { 
            localStorage.clear(); 
            if (!window.location.pathname.endsWith('login.html')) {
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
