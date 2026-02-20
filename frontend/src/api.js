import axios from 'axios';

// Agar Render par VITE_API_URL set hai to wo uthayega, warna local
const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

const api = axios.create({
    baseURL: API_URL,
});

// Request ke aakhir mein slash (/) khud add karne ke liye
api.interceptors.request.use((config) => {
    if (config.url && !config.url.endsWith('/')) {
        config.url += '/';
    }
    return config;
});

export default api;