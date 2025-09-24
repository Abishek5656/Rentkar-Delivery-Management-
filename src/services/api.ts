import axios from 'axios';

const api = axios.create({
  baseURL: "https://rentkar-delivery-management.onrender.com",
});

// Attach token automatically if available
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default api;
