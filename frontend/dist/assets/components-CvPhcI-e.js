(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function a(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(e){if(e.ep)return;e.ep=!0;const r=a(e);fetch(e.href,r)}})();const i="https://alfaaz-project.onrender.com";window.refreshGlobalEffects=function(){window.lucide&&window.lucide.createIcons()};document.addEventListener("DOMContentLoaded",()=>{window.refreshGlobalEffects();const n=document.querySelector("alfaaz-nav nav");if(n){let t=window.scrollY;window.addEventListener("scroll",()=>{const a=window.scrollY;a>80?n.classList.add("scrolled"):n.classList.remove("scrolled"),a>t&&a>120?n.classList.add("hidden"):n.classList.remove("hidden"),t=a},{passive:!0})}});window.globalApiFetch=async function(n,t={}){const a=localStorage.getItem("alfaaz_token"),s={"Content-Type":"application/json"};a&&(s.Authorization=`Bearer ${a}`);try{const e=await fetch(`${i}${n}`,{...t,headers:{...s,...t.headers||{}}});return e.status===401||e.status===403?(localStorage.clear(),window.location.pathname.endsWith("login.html")||(window.location.href="login.html"),null):e}catch(e){throw console.error("API fetch error:",e),e}};(function(){function n(){const t=document.querySelectorAll(".ur-hover");t.length!==0&&setInterval(()=>{t.forEach((a,s)=>{setTimeout(()=>{a.classList.toggle("lang-swapped")},s*120)})},5e3)}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",n):n()})();async function c(){try{await fetch(`${i}/`)}catch{}}c();setInterval(c,10*60*1e3);class l extends HTMLElement{constructor(){super(),this.isLoggedIn=!!localStorage.getItem("alfaaz_token")}connectedCallback(){this.render(),this.setupEvents(),this.updateActiveLinks()}render(){const t=this.isLoggedIn?"Dashboard":"Login / Register",a=this.isLoggedIn?"dashboard.html":"login.html",e=window.location.pathname.endsWith("index.html")||window.location.pathname==="/"?"":"index.html";this.innerHTML=`
      <nav id="navbar">
        <a href="index.html" class="logo ur-hover" data-ur="الفاظ">
          <span class="en-text">ALFAAZ</span>
        </a>
        
        <div class="nav-links" id="navLinks">
          <a href="${e}#home" class="ur-hover" data-ur="ابتداء"><span class="en-text">Home</span></a>
          <a href="${e}#updates" class="ur-hover" data-ur="اطلاع"><span class="en-text">Updates</span></a>
          <a href="${e}#about" class="ur-hover" data-ur="تعارف"><span class="en-text">About</span></a>
          <a href="${e}#journey" class="ur-hover" data-ur="حاشِیہ"><span class="en-text">Margins</span></a>
          <a href="${e}#clubs" class="ur-hover" data-ur="حلقہ"><span class="en-text">Clubs</span></a>
          <a href="blogs.html" class="ur-hover" data-ur="رسالہ"><span class="en-text">Journal</span></a>
          <a href="${a}" class="mobile-only-link ur-hover" data-ur="داخلہ"><span class="en-text">${t}</span></a>
        </div>

        <div class="nav-actions">
          <a href="${a}" id="navLoginBtn" class="nav-login">${t}</a>
          <a href="https://tchandervar.neocities.org" target="_blank" class="cta-btn" style="padding: 0.6rem 1.2rem; font-size: 10px;">Tchandervar</a>
          
          <button id="menuToggle" aria-label="Toggle menu" aria-expanded="false">
            <i data-lucide="menu" class="w-6 h-6 hamburger-open"></i>
            <i data-lucide="x" class="w-6 h-6 hamburger-close"></i>
          </button>
        </div>
      </nav>
    `}setupEvents(){const t=this.querySelector("#menuToggle"),a=this.querySelector("#navLinks");t==null||t.addEventListener("click",s=>{s.stopPropagation();const e=t.getAttribute("aria-expanded")==="true";t.setAttribute("aria-expanded",!e),t.classList.toggle("active"),a.classList.toggle("active")}),a==null||a.querySelectorAll("a").forEach(s=>{s.addEventListener("click",()=>{t.setAttribute("aria-expanded","false"),t.classList.remove("active"),a.classList.remove("active")})}),document.addEventListener("click",s=>{!this.contains(s.target)&&a.classList.contains("active")&&(t.setAttribute("aria-expanded","false"),t.classList.remove("active"),a.classList.remove("active"))}),window.lucide&&window.lucide.createIcons()}updateActiveLinks(){const t=window.location.pathname.split("/").pop()||"index.html";this.querySelectorAll(".nav-links a").forEach(s=>{const e=s.getAttribute("href");(e===t||t==="index.html"&&e.startsWith("#"))&&s.classList.add("active")})}}customElements.define("alfaaz-nav",l);
