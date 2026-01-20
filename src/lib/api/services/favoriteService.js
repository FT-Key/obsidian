// ===================================
// services/favoriteService.js
// ===================================
import api from '../client';

export const favoriteService = {
  /**
   * Obtener favoritos del usuario
   */
  get: (userId) => {
    return api.get('/favorites', { params: { userId } });
  },

  /**
   * Añadir producto a favoritos
   */
  add: (userId, productId) => {
    return api.post('/favorites/items', { userId, product_id: productId });
  },

  /**
   * Eliminar de favoritos
   */
  remove: (userId, itemId) => {
    return api.delete(`/favorites/items/${itemId}`, { params: { userId } }); // ← FIX: usar template string normal
  },

  /**
   * Verificar si un producto está en favoritos
   */
  check: (userId, productId) => {
    return api.get('/favorites/check', { 
      params: { userId, product_id: productId } 
    });
  },

  /**
   * Limpiar todos los favoritos
   */
  clear: (userId) => {
    return api.delete('/favorites', { params: { userId } });
  },

  /**
   * Mover favorito al carrito
   */
  moveToCart: (userId, itemId) => {
    return api.post(`/favorites/items/${itemId}/move-to-cart`, { userId }); // ← FIX: usar template string normal
  },
};