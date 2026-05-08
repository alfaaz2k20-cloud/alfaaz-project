/* ========================================
   ALFAAZ COLLECTIVE — WEB COMPONENTS
======================================== */

class AlfaazNav extends HTMLElement {
  constructor() {
    super();
    this.isLoggedIn = !!localStorage.getItem('alfaaz_token');
  }

  connectedCallback() {
    this.render();
    this.setupEvents();
    this.updateActiveLinks();
  }

  render() {
    const loginLabel = this.isLoggedIn ? 'Dashboard' : 'Login / Register';
    const loginHref = this.isLoggedIn ? 'dashboard.html' : 'login.html';
    
    // Check if we are on a sub-page to fix relative paths
    const isSubPage = window.location.pathname.includes('/') && !window.location.pathname.endsWith('index.html') && window.location.pathname !== '/';
    const prefix = isSubPage ? '' : ''; // In current flat structure, no prefix needed.

    this.innerHTML = `
      <nav id="navbar">
        <a href="index.html" class="logo ur-hover" data-ur="الفاظ">
          <span class="en-text">ALFAAZ</span>
        </a>
        
        <div class="nav-links" id="navLinks">
          <a href="index.html#home" class="ur-hover" data-ur="ابتداء"><span class="en-text">Home</span></a>
          <a href="index.html#updates" class="ur-hover" data-ur="اطلاع"><span class="en-text">Updates</span></a>
          <a href="blogs.html" class="ur-hover" data-ur="رسالہ"><span class="en-text">Journal</span></a>
          <a href="submit.html" class="ur-hover" data-ur="ذخیرہ"><span class="en-text">Storage</span></a>
          <a href="${loginHref}" class="mobile-only-link ur-hover" data-ur="داخلہ"><span class="en-text">${loginLabel}</span></a>
        </div>

        <div class="nav-actions">
          <a href="${loginHref}" id="navLoginBtn" class="nav-login">${loginLabel}</a>
          <a href="https://tchandervar.neocities.org" target="_blank" class="cta-btn" style="padding: 0.6rem 1.2rem; font-size: 10px;">Tchandervar</a>
          
          <button id="menuToggle" aria-label="Toggle menu" aria-expanded="false">
            <i data-lucide="menu" class="w-6 h-6 hamburger-open"></i>
            <i data-lucide="x" class="w-6 h-6 hamburger-close"></i>
          </button>
        </div>
      </nav>
    `;
  }

  setupEvents() {
    const toggle = this.querySelector('#menuToggle');
    const links = this.querySelector('#navLinks');
    
    toggle?.addEventListener('click', () => {
      const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', !isExpanded);
      toggle.classList.toggle('active');
      links.classList.toggle('active');
    });

    // Re-run Lucide icons for the newly injected HTML
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  updateActiveLinks() {
    const currentPath = window.location.pathname;
    const links = this.querySelectorAll('.nav-links a');
    links.forEach(link => {
      if (link.getAttribute('href') === currentPath.split('/').pop()) {
        link.classList.add('active');
      }
    });
  }
}

customElements.define('alfaaz-nav', AlfaazNav);
