import axios from 'axios';

const api = axios.create({
  // This uses your Vercel URL in production and localhost in development
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
});

export default api;