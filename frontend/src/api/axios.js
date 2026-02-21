import axios from 'axios';

// ⚠️ Sab se aham line: Render dashboard se URL uthayega
const BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

const API = axios.create({
    // Is se base path '/api/' set ho jayega
    baseURL: `${BASE_URL}/api/`, 
});

// Django ki strict routing ke liye (trailing slash logic)
API.interceptors.request.use((config) => {
    if (config.url && !config.url.endsWith('/')) {
        config.url += '/';
    }
    return config;
});

export default API;