// ===================================
// services/serviceService.js
// ===================================
import api from '../client';

export const serviceService = {
  /**
   * Obtener todos los servicios
   */
  getAll: (filters = {}) => {
    return api.get('/services', { params: filters });
  },

  /**
   * Obtener solo servicios activos
   */
  getActive: () => {
    return api.get('/services/active');
  },

  /**
   * Obtener servicio por ID
   */
  getById: (id) => {
    return api.get(`/services/${id}`);
  },

  /**
   * Buscar servicios
   */
  search: (searchTerm) => {
    return api.get('/services/search', { params: { q: searchTerm } });
  },

  /**
   * Crear servicio (admin)
   */
  create: (serviceData) => {
    return api.post('/services', serviceData);
  },

  /**
   * Actualizar servicio (admin)
   */
  update: (id, serviceData) => {
    return api.put(`/services/${id}`, serviceData);
  },

  /**
   * Eliminar servicio (admin)
   */
  delete: (id) => {
    return api.delete(`/services/${id}`);
  },

  /**
   * Activar/Desactivar servicio (admin)
   */
  toggleStatus: (id) => {
    return api.patch(`/services/${id}/toggle`);
  },

  /**
   * Obtener estadísticas (admin)
   */
  getStats: () => {
    return api.get('/services/stats');
  },

  /**
   * Calcular precio con cupón
   */
  calculatePrice: (serviceId, couponCode = null) => {
    return api.post('/services/calculate-price', {
      service_id: serviceId,
      coupon_code: couponCode
    });
  },

  /**
   * Validar disponibilidad de horario
   */
  checkAvailability: (serviceId, date, time) => {
    return api.post('/services/check-availability', {
      service_id: serviceId,
      date,
      time
    });
  },
};