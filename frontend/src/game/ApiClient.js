// Uses relative API URL logic similar to global.js
export const API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:8000'
    : 'https://alfaaz-project.onrender.com';
