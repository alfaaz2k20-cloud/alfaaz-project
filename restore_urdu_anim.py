import re

with open('frontend/global.css', 'r', encoding='utf-8') as f:
    css = f.read()

css = css.replace(
'''.ur-hover .en-text {
    
  }''',
'''.ur-hover .en-text {
    transition: opacity 1.2s var(--transition-smooth), transform 1.2s var(--transition-smooth);
  }'''
)

css = css.replace(
'''  .ur-hover::before {
    content: attr(data-ur);
    position: absolute; top: 50%; left: 50%;
    
    font-family: var(--font-urdu); font-size: 1.4em; line-height: 1;
    font-style: normal; font-weight: 400;
    color: var(--accent-gold); opacity: 0;
    
    pointer-events: none; white-space: nowrap;
  }''',
'''  .ur-hover::before {
    content: attr(data-ur);
    position: absolute; top: 50%; left: 50%;
    transform: translate(-50%, -50%) translateY(8px);
    font-family: var(--font-urdu); font-size: 1.4em; line-height: 1;
    font-style: normal; font-weight: 400;
    color: var(--accent-gold); opacity: 0;
    transition: opacity 1.2s var(--transition-smooth), transform 1.2s var(--transition-smooth);
    pointer-events: none; white-space: nowrap;
  }'''
)

css = css.replace(
'''.ur-hover:hover .en-text,
.ur-hover.lang-swapped .en-text { opacity: 0;  }''',
'''.ur-hover:hover .en-text,
.ur-hover.lang-swapped .en-text { opacity: 0; transform: translateY(-8px); }'''
)

css = css.replace(
'''.ur-hover:hover::before,
.ur-hover.lang-swapped::before { opacity: 1;  }''',
'''.ur-hover:hover::before,
.ur-hover.lang-swapped::before { opacity: 1; transform: translate(-50%, -50%) translateY(0); }'''
)

css = css.replace(
'''  .hero-title .en-text {
    display: block; width: 100%;
    white-space: normal; text-align: center; line-height: 1.05;
    
  }''',
'''  .hero-title .en-text {
    display: block; width: 100%;
    white-space: normal; text-align: center; line-height: 1.05;
    transition: opacity 1.2s var(--transition-smooth), transform 1.2s var(--transition-smooth);
  }'''
)

with open('frontend/global.css', 'w', encoding='utf-8') as f:
    f.write(css)
