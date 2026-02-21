import axios from 'axios';

// Render se live URL uthayega, warna local URL
const BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

const API = axios.create({
    // Dhyan dein: Yahan '/api/' add kiya hai taake components mein bar bar na likhna paray
    baseURL: `${BASE_URL}/api/`, 
});

// Django ki strict routing ke liye aakhir mein slash (/) auto-add karna
API.interceptors.request.use((config) => {
    if (config.url && !config.url.endsWith('/')) {
        config.url += '/';
    }
    return config;
});

export default API;