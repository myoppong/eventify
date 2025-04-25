// src/utils/auth.js
import { jwtDecode } from 'jwt-decode';
import api from '../services/api'; // Axios instance

const TOKEN_KEY = 'token';

export const saveToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const logout = async () => {
  try {
    const token = getToken();
    if (token) {
      await api.post('/logout', {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
    }
  } catch (error) {
    console.error('Logout API call failed:', error);
  } finally {
    removeToken();
  }
};

export const getUserFromToken = () => {
  const token = getToken();
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded;
  } catch (err) {
    console.error('Invalid token:', err);
    return null;
  }
};

export const isLoggedIn = () => {
  return !!getUserFromToken();
};
