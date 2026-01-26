// ===================================
// services/couponService.js - VERSIÓN MEJORADA
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
    return api.get(`/coupons/${id}`);  // ✅ Corregido
  },

  /**
   * Obtener cupón por código
   */
  getByCode: (code) => {
    return api.get(`/coupons/code/${code}`);  // ✅ Corregido
  },

  /**
   * Validar cupón para productos O servicios
   */
  validate: (code, amount, type = 'product') => {
    return api.post('/coupons/validate', {
      code,
      amount,
      type  // 'product' o 'service'
    });
  },

  /**
   * Aplicar cupón a productos (carrito)
   */
  applyToCart: (code, items) => {
    return api.post('/coupons/apply', {
      code,
      items,
      type: 'product'
    });
  },

  /**
   * Aplicar cupón a servicio
   */
  applyToService: (code, serviceId, basePrice) => {
    return api.post('/coupons/apply', {
      code,
      service_id: serviceId,
      amount: basePrice,
      type: 'service'
    });
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
    return api.put(`/coupons/${id}`, couponData);  // ✅ Corregido
  },

  /**
   * Eliminar cupón (admin)
   */
  delete: (id, permanent = false) => {
    return api.delete(`/coupons/${id}`, { params: { permanent } });  // ✅ Corregido
  },

  /**
   * Activar/Desactivar cupón (admin)
   */
  toggleStatus: (id) => {
    return api.patch(`/coupons/${id}/toggle`);  // ✅ Corregido
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