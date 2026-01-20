// ===================================
// index.js - Exportar todo
// ===================================
export { productService } from './productService';
export { categoryService } from './categoryService';
export { couponService } from './couponService';
export { cartService } from './cartService';
export { favoriteService } from './favoriteService';
export { authService } from './authService';

export default {
  products: productService,
  categories: categoryService,
  coupons: couponService,
  cart: cartService,
  favorites: favoriteService,
  auth: authService,
};