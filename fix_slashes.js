const fs = require('fs');

let code = fs.readFileSync('frontend/src/recruit.js', 'utf8');

code = code.replace(/app\.innerHTML = \\\/g, 'app.innerHTML = ');
code = code.replace(/    \\\;/g, '    ;');
code = code.replace(/fetch\(\\\\\\$\{apiBase\}\/recruit\/session\\\/g, 'fetch(${apiBase}/recruit/session');
code = code.replace(/Error\(\\\Network error: \\\$\{res\.status\}\\\\);/g, 'Error(Network error: );');

fs.writeFileSync('frontend/src/recruit.js', code);
