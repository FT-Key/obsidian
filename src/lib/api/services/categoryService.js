// ===================================
// services/categoryService.js
// ===================================
import api from '../client';

export const categoryService = {
  /**
   * Obtener todas las categorías
   */
  getAll: (filters = {}) => {
    return api.get('/categories', { params: filters });
  },

  /**
   * Obtener solo categorías activas
   */
  getActive: () => {
    return api.get('/categories/active');
  },

  /**
   * Obtener categoría por ID
   */
  getById: (id) => {
    return api.get(`/categories/${id}`);
  },

  /**
   * Buscar categorías
   */
  search: (searchTerm) => {
    return api.get('/categories/search', { params: { q: searchTerm } });
  },

  /**
   * Obtener productos de una categoría
   */
  getProducts: (id, options = {}) => {
    return api.get(`/categories/${id}/products`, { params: options });
  },

  /**
   * Crear categoría (admin)
   */
  create: (categoryData) => {
    return api.post('/categories', categoryData);
  },

  /**
   * Actualizar categoría (admin)
   */
  update: (id, categoryData) => {
    return api.put(`/categories/${id}`, categoryData);
  },

  /**
   * Eliminar categoría (admin)
   */
  delete: (id, permanent = false) => {
    return api.delete(`/categories/${id}`, { params: { permanent } });
  },

  /**
   * Activar/Desactivar categoría (admin)
   */
  toggleStatus: (id) => {
    return api.patch(`/categories/${id}/toggle`);
  },

  /**
   * Obtener estadísticas (admin)
   */
  getStats: () => {
    return api.get('/categories/stats');
  },
};