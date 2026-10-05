import re

with open('frontend/global.css', 'r', encoding='utf-8') as f:
    css = f.read()

# restore vitrine-item
css = css.replace(
'''.vitrine-item {
  position: relative;
  width: clamp(260px, 75vw, 360px);
  scroll-snap-align: center;
  display: flex; flex-direction: column; gap: 1.2rem;
  
  
}
.vitrine-item:nth-child(even) {  margin-top: 2rem; }
.vitrine-item:nth-child(3n)   {  }
.vitrine-item:hover           {  z-index: 10; }''',
'''.vitrine-item {
  position: relative;
  width: clamp(260px, 75vw, 360px);
  scroll-snap-align: center;
  display: flex; flex-direction: column; gap: 1.2rem;
  transform: rotate(-0.8deg);
  transition: transform 0.5s var(--transition-smooth);
}
.vitrine-item:nth-child(even) { transform: rotate(0.8deg); margin-top: 2rem; }
.vitrine-item:nth-child(3n)   { transform: rotate(-1.2deg); }
.vitrine-item:hover           { transform: rotate(0deg) translateY(-5px); z-index: 10; }'''
)

# restore animations
css = css.replace(
'''@keyframes softFadeIn {
  0% { opacity: 0;  }
  100% { opacity: 1;  }
}

@keyframes gentlePulse {
  0%, 100% { opacity: 1;  }
  50% { opacity: 0.8;  }
}

@keyframes floatElement {
  0%, 100% {  }
  50% {  }
}''',
'''@keyframes softFadeIn {
  0% { opacity: 0; transform: translateY(10px); }
  100% { opacity: 1; transform: translateY(0); }
}

@keyframes gentlePulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(0.98); }
}

@keyframes floatElement {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
}'''
)

css = css.replace(
'''.animate-soft-fade-in {
  
}

.animate-gentle-pulse {
  
}

.animate-float {
  
}''',
'''.animate-soft-fade-in {
  animation: softFadeIn 0.5s ease-out forwards;
}

.animate-gentle-pulse {
  animation: gentlePulse 3s ease-in-out infinite;
}

.animate-float {
  animation: floatElement 4s ease-in-out infinite;
}'''
)

css = css.replace(
'''@keyframes soothingFade {
  0% { opacity: 0;  }
  100% { opacity: 1;  }
}''',
'''@keyframes soothingFade {
  0% { opacity: 0; transform: translateY(6px); }
  100% { opacity: 1; transform: translateY(0); }
}'''
)

css = css.replace(
'''.waiting-spinner {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid rgba(189, 111, 93, 0.2);
  border-top-color: var(--accent-gold);
  
  margin: 0 auto;
}''',
'''.waiting-spinner {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid rgba(189, 111, 93, 0.2);
  border-top-color: var(--accent-gold);
  animation: spin 1s linear infinite, gentlePulse 2s ease-in-out infinite;
  margin: 0 auto;
}'''
)

with open('frontend/global.css', 'w', encoding='utf-8') as f:
    f.write(css)
