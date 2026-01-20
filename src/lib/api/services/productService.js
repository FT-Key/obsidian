// ===================================
// services/productService.js
// ===================================
import api from '../client';

export const productService = {
  /**
   * Obtener todos los productos con filtros
   */
  getAll: (filters = {}) => {
    return api.get('/products', { params: filters });
  },

  /**
   * Obtener un producto por ID
   */
  getById: (id) => {
    return api.get(`/products/${id}`);
  },

  /**
   * Obtener productos destacados
   */
  getFeatured: (limit = 8) => {
    return api.get('/products/featured', { params: { limit } });
  },

  /**
   * Buscar productos
   */
  search: (searchTerm, options = {}) => {
    return api.get('/products/search', { 
      params: { q: searchTerm, ...options } 
    });
  },

  /**
   * Crear producto (admin)
   */
  create: (productData) => {
    return api.post('/products', productData);
  },

  /**
   * Actualizar producto (admin)
   */
  update: (id, productData) => {
    return api.put(`/products/${id}`, productData);
  },

  /**
   * Eliminar producto (admin)
   */
  delete: (id) => {
    return api.delete(`/products/${id}`);
  },

  /**
   * Verificar stock disponible
   */
  checkStock: (id, quantity, variantId = null) => {
    const params = { quantity };
    if (variantId) params.variantId = variantId;
    return api.get(`/products/${id}/stock`, { params });
  },

  /**
   * Actualizar stock (admin)
   */
  updateStock: (id, quantity, variantId = null) => {
    return api.post(`/products/${id}/stock`, { quantity, variantId });
  },

  /**
   * Añadir variante (admin)
   */
  addVariant: (id, variantData) => {
    return api.post(`/products/${id}/variants`, variantData);
  },

  /**
   * Actualizar variante (admin)
   */
  updateVariant: (id, variantId, variantData) => {
    return api.put(`/products/${id}/variants/${variantId}`, variantData);
  },

  /**
   * Eliminar variante (admin)
   */
  deleteVariant: (id, variantId) => {
    return api.delete(`/products/${id}/variants/${variantId}`);
  },
};