// ===================================
// services/authService.js
// ===================================
import api from '../client';

export const authService = {
  /**
   * Registrar nuevo usuario
   */
  register: (userData) => {
    return api.post('/auth/register', userData);
  },

  /**
   * Iniciar sesión
   */
  login: (credentials) => {
    return api.post('/auth/login', credentials);
  },

  /**
   * Cerrar sesión
   */
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  /**
   * Obtener usuario actual
   */
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  /**
   * Verificar si está autenticado
   */
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  /**
   * Obtener token
   */
  getToken: () => {
    return localStorage.getItem('token');
  },
};