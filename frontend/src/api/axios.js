import axios from 'axios';

// Agar Render par VITE_API_URL set hai to wo uthayega, 
// warna local (Sirf check karne ke liye live URL direct bhi daal sakte hain)
const BASE_URL = import.meta.env.VITE_API_URL || "https://e-shop-backend-em02.onrender.com";

const API = axios.create({
    baseURL: `${BASE_URL}/api/`, 
});

API.interceptors.request.use((config) => {
    if (config.url && !config.url.endsWith('/')) {
        config.url += '/';
    }
    return config;
});

export default API;