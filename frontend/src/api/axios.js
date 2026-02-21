import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || "https://e-shop-backend-em02.onrender.com";

const API = axios.create({
    // baseURL mein /api/ shamil hai
    baseURL: `${BASE_URL}/api/`, 
});

API.interceptors.request.use((config) => {
    if (config.url && !config.url.endsWith('/')) {
        config.url += '/';
    }
    return config;
});

export default API;