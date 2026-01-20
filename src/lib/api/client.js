// ===================================
// lib/api/client.js
// ===================================
import axios from 'axios';

/**
 * Cliente Axios centralizado para todas las llamadas a la API
 */
const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar token a todas las requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar respuestas y errores
apiClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // Manejar errores de autenticación
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/iniciar-sesion';
    }

    // Extraer mensaje de error
    const message = error.response?.data?.error || error.message || 'Error en la petición';
    
    console.error('API Error:', message);
    return Promise.reject(new Error(message));
  }
);

export default apiClient;