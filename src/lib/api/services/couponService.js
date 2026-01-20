// ===================================
// services/couponService.js
// ===================================
import api from '../client';

export const couponService = {
  /**
   * Obtener todos los cupones (admin)
   */
  getAll: (filters = {}) => {
    return api.get('/coupons', { params: filters });
  },

  /**
   * Obtener cupón por ID (admin)
   */
  getById: (id) => {
    return api.get(`/coupons/${id}`);
  },

  /**
   * Obtener cupón por código
   */
  getByCode: (code) => {
    return api.get(`/coupons/code/${code}`);
  },

  /**
   * Validar cupón (sin aplicar)
   */
  validate: (code, amount) => {
    return api.post('/coupons/validate', { code, amount });
  },

  /**
   * Aplicar cupón (incrementa usos)
   */
  apply: (code, amount) => {
    return api.post('/coupons/apply', { code, amount });
  },

  /**
   * Crear cupón (admin)
   */
  create: (couponData) => {
    return api.post('/coupons', couponData);
  },

  /**
   * Actualizar cupón (admin)
   */
  update: (id, couponData) => {
    return api.put(`/coupons/${id}`, couponData);
  },

  /**
   * Eliminar cupón (admin)
   */
  delete: (id, permanent = false) => {
    return api.delete(`/coupons/${id}`, { params: { permanent } });
  },

  /**
   * Activar/Desactivar cupón (admin)
   */
  toggleStatus: (id) => {
    return api.patch(`/coupons/${id}/toggle`);
  },

  /**
   * Obtener estadísticas (admin)
   */
  getStats: () => {
    return api.get('/coupons/stats');
  },

  /**
   * Limpiar cupones expirados (admin)
   */
  cleanup: () => {
    return api.post('/coupons/cleanup');
  },
};

