import axios from 'axios';

const api = axios.create({
  baseURL: 'https://eventkit.onrender.com',
  withCredentials: true, 
  headers: {
    'Content-Type': 'application/json',
  },
});

// ** Add an interceptor that injects the token on every request **
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export default api;
