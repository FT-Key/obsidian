// ===================================
// services/cartService.js
// ===================================
import api from '../client';

export const cartService = {
  /**
   * Obtener carrito del usuario
   */
  get: (userId) => {
    return api.get('/cart', { params: { userId } });
  },

  /**
   * Añadir item al carrito
   */
  addItem: (userId, productId, variantId = null, quantity = 1) => {
    return api.post('/cart/items', {
      userId,
      product_id: productId,
      variant_id: variantId,
      quantity
    });
  },

  /**
   * Actualizar cantidad de un item
   */
  updateItem: (userId, itemId, quantity) => {
    return api.patch(`/cart/items/${itemId}`, { userId, quantity });
  },

  /**
   * Eliminar item del carrito
   */
  removeItem: (userId, itemId) => {
    return api.delete(`/cart/items/${itemId}`, { params: { userId } });
  },

  /**
   * Limpiar todo el carrito
   */
  clear: (userId) => {
    return api.delete('/cart', { params: { userId } });
  },

  /**
   * Validar carrito (stock disponible)
   */
  validate: (userId) => {
    return api.post('/cart/validate', { userId });
  },
};