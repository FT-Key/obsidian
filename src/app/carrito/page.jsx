"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  Heart,
  Package,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CreditCard,
  Tag
} from 'lucide-react';
import { cartService } from '@/lib/api/services/cartService';
import { favoriteService } from '@/lib/api/services/favoriteService';
// import { paymentService } from '@/lib/api/services/paymentService'; // TODO: Crear este servicio
import useAuthStore from '@/store/useAuthStore';
import useCartStore from '@/store/useCartStore';
import useFavoritesStore from '@/store/useFavoritesStore';
import toast from 'react-hot-toast';

/**
 * Página de Carrito de Compras - Diseño Gótico
 */
const CartPage = () => {
  const [loading, setLoading] = useState(true);
  const [updatingItem, setUpdatingItem] = useState(null);
  const [removingItem, setRemovingItem] = useState(null);
  const [isHydrated, setIsHydrated] = useState(false);
  const [processingCheckout, setProcessingCheckout] = useState(false);
  const [editingQuantity, setEditingQuantity] = useState({}); // {itemId: quantity}
  const [updateTimeout, setUpdateTimeout] = useState(null);

  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const { items: cartItems, total, itemCount, loadCart, updateQuantity, removeItem } = useCartStore();
  const { addFavorite } = useFavoritesStore();

  // Esperar hidratación
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Verificar autenticación y cargar carrito
  useEffect(() => {
    if (!isHydrated) return;

    if (!user && !isAuthenticated) {
      router.push('/iniciar-sesion');
      return;
    }

    loadUserCart();
  }, [isHydrated, user, isAuthenticated]);

  const loadUserCart = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const userId = user._id || user.id;
      await loadCart(userId);
    } catch (error) {
      console.error('Error loading cart:', error);
      toast.error('Error al cargar el carrito');
    } finally {
      setLoading(false);
    }
  };

  // Actualizar cantidad con debounce
  const handleUpdateQuantity = async (item, newQuantity) => {
    if (!user) return;

    const product = item.product;
    const maxStock = product?.stock || 0;

    // Validar rango
    if (newQuantity < 1) newQuantity = 1;
    if (newQuantity > maxStock) {
      toast.error(`Solo hay ${maxStock} unidades disponibles`);
      newQuantity = maxStock;
    }

    // Actualizar UI inmediatamente (optimistic update)
    setEditingQuantity(prev => ({
      ...prev,
      [item._id]: newQuantity
    }));

    // Cancelar timeout anterior si existe
    if (updateTimeout) {
      clearTimeout(updateTimeout);
    }

    // Esperar 800ms antes de enviar al backend (debounce)
    const timeout = setTimeout(async () => {
      try {
        setUpdatingItem(item._id);
        const userId = user._id || user.id;

        const response = await cartService.updateItem(userId, item._id, newQuantity);

        if (response && response.success !== false) {
          await loadCart(userId);
          // Limpiar estado de edición
          setEditingQuantity(prev => {
            const newState = { ...prev };
            delete newState[item._id];
            return newState;
          });
        }
      } catch (error) {
        console.error('Error updating quantity:', error);
        toast.error('Error al actualizar cantidad');
        // Recargar para obtener el estado correcto del servidor
        await loadCart(user._id || user.id);
      } finally {
        setUpdatingItem(null);
      }
    }, 800);

    setUpdateTimeout(timeout);
  };

  // Manejar cambio en input de cantidad
  const handleQuantityInputChange = (item, value) => {
    const newQuantity = parseInt(value) || 1;
    handleUpdateQuantity(item, newQuantity);
  };

  // Incrementar cantidad
  const handleIncrementQuantity = (item) => {
    const currentQty = editingQuantity[item._id] ?? item.quantity;
    handleUpdateQuantity(item, currentQty + 1);
  };

  // Decrementar cantidad
  const handleDecrementQuantity = (item) => {
    const currentQty = editingQuantity[item._id] ?? item.quantity;
    handleUpdateQuantity(item, currentQty - 1);
  };

  // Eliminar del carrito
  const handleRemoveItem = async (item) => {
    if (!user || removingItem === item._id) return;

    try {
      setRemovingItem(item._id);
      const userId = user._id || user.id;

      const response = await cartService.removeItem(userId, item._id);

      if (response && response.success !== false) {
        await loadCart(userId);
        toast.success('Producto eliminado del carrito');
      }
    } catch (error) {
      console.error('Error removing item:', error);
      toast.error('Error al eliminar producto');
    } finally {
      setRemovingItem(null);
    }
  };

  // Mover a favoritos
  const handleMoveToFavorites = async (item) => {
    if (!user) return;

    try {
      const userId = user._id || user.id;
      const productId = item.product?._id || item.product;

      // Agregar a favoritos
      await favoriteService.add(userId, productId);
      
      // Eliminar del carrito
      await cartService.removeItem(userId, item._id);
      
      // Recargar carrito
      await loadCart(userId);
      
      toast.success('Movido a favoritos');
    } catch (error) {
      console.error('Error moving to favorites:', error);
      toast.error('Error al mover a favoritos');
    }
  };

  // Limpiar carrito
  const handleClearCart = async () => {
    if (!user) return;

    const confirmed = window.confirm('¿Estás seguro de vaciar el carrito?');
    if (!confirmed) return;

    try {
      const userId = user._id || user.id;
      const response = await cartService.clear(userId);

      if (response && response.success !== false) {
        await loadCart(userId);
        toast.success('Carrito vaciado');
      }
    } catch (error) {
      console.error('Error clearing cart:', error);
      toast.error('Error al vaciar el carrito');
    }
  };

  // Proceder al checkout
  const handleCheckout = async () => {
    if (!user || cartItems.length === 0) return;

    setProcessingCheckout(true);

    try {
      const userId = user._id || user.id;

      // TODO: Validar carrito antes de proceder
      // const validation = await cartService.validate(userId);
      // if (!validation.valid) {
      //   toast.error('Algunos productos no están disponibles');
      //   await loadCart(userId);
      //   return;
      // }

      // TODO: Crear orden y procesar pago
      // const orderData = {
      //   userId,
      //   items: cartItems.map(item => ({
      //     product_id: item.product._id,
      //     variant_id: item.variant_id,
      //     quantity: item.quantity,
      //     price: item.price
      //   })),
      //   total: total,
      //   payment_method: 'pending' // Se seleccionará en el checkout
      // };

      // const paymentResponse = await paymentService.createOrder(orderData);
      
      // if (paymentResponse.success) {
      //   router.push(`/checkout/${paymentResponse.order_id}`);
      // }

      // Temporal: Navegar a checkout (crear esta página después)
      toast.info('Redirigiendo al checkout...');
      // router.push('/checkout');
      
    } catch (error) {
      console.error('Error processing checkout:', error);
      toast.error('Error al procesar el pedido');
    } finally {
      setProcessingCheckout(false);
    }
  };

  if (!isHydrated || loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#6b21a8] border-t-transparent"></div>
          <p className="text-gray-400 mt-4">
            {!isHydrated ? 'Verificando sesión...' : 'Cargando carrito...'}
          </p>
        </div>
      </div>
    );
  }

  if (!user && !isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <div className="relative bg-gradient-to-br from-[#1a1a1a] via-[#0a0a0a] to-[#121212] border-b border-[#2d2d2d] overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_50%_50%,_rgba(107,33,168,0.2)_0%,_transparent_50%)]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="h-[2px] w-12 bg-gradient-to-r from-transparent to-[#6b21a8]" />
              <ShoppingCart className="w-6 h-6 text-[#6b21a8]" />
              <div className="h-[2px] w-12 bg-gradient-to-l from-transparent to-[#6b21a8]" />
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#e5e7eb] via-white to-[#d1d5db] mb-4">
              Carrito de Compras
            </h1>

            <p className="text-[#9ca3af] text-lg max-w-2xl mx-auto">
              {itemCount > 0
                ? `Tienes ${itemCount} ${itemCount === 1 ? 'producto' : 'productos'} en tu carrito`
                : 'Tu carrito está vacío'}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {cartItems.length === 0 ? (
          // Empty State
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-[#1a1a1a] border-2 border-[#3a3a3a] mb-6">
              <ShoppingCart className="w-12 h-12 text-gray-600" />
            </div>

            <h2 className="text-2xl font-bold text-white mb-4">
              Tu carrito está vacío
            </h2>

            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              Descubre nuestros productos y comienza a agregar tus favoritos
            </p>

            <button
              onClick={() => router.push('/productos')}
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#6b21a8] text-white font-semibold hover:bg-[#7c3aed] transition-colors"
            >
              <Sparkles className="w-5 h-5" />
              Explorar Productos
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {/* Actions Bar */}
              <div className="flex justify-between items-center p-4 bg-[#1a1a1a] border border-[#2d2d2d]">
                <div className="flex items-center gap-2 text-gray-300">
                  <Package className="w-5 h-5 text-[#6b21a8]" />
                  <span className="font-semibold">{itemCount}</span>
                  <span className="text-gray-400">
                    {itemCount === 1 ? 'producto' : 'productos'}
                  </span>
                </div>

                <button
                  onClick={handleClearCart}
                  className="flex items-center gap-2 px-4 py-2 text-red-400 hover:text-red-300 border border-red-400/30 hover:border-red-400/50 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Vaciar carrito
                </button>
              </div>

              {/* Cart Items List */}
              <div className="space-y-4">
                {cartItems.map((item) => {
                  const product = item.product;
                  const productId = product?._id || product;
                  const isUpdating = updatingItem === item._id;
                  const isRemoving = removingItem === item._id;

                  return (
                    <div
                      key={item._id}
                      className="relative bg-[#1a1a1a] border border-[#2d2d2d] p-4 hover:border-[#6b21a8] transition-colors"
                    >
                      {/* Loading Overlay */}
                      {(isUpdating || isRemoving) && (
                        <div className="absolute inset-0 bg-black/50 z-10 flex items-center justify-center">
                          <div className="animate-spin rounded-full h-8 w-8 border-4 border-[#6b21a8] border-t-transparent"></div>
                        </div>
                      )}

                      <div className="flex gap-4">
                        {/* Image */}
                        <div
                          className="w-24 h-24 bg-[#0a0a0a] flex-shrink-0 cursor-pointer overflow-hidden"
                          onClick={() => router.push(`/productos/${productId}`)}
                        >
                          {product?.main_image ? (
                            <img
                              src={product.main_image}
                              alt={product?.name}
                              className="w-full h-full object-cover hover:scale-105 transition-transform"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Package className="w-8 h-8 text-gray-700" />
                            </div>
                          )}
                        </div>

                        {/* Info */}
                        <div className="flex-grow">
                          <h3
                            className="text-white font-semibold mb-1 cursor-pointer hover:text-[#6b21a8] transition-colors"
                            onClick={() => router.push(`/productos/${productId}`)}
                          >
                            {product?.name || 'Producto'}
                          </h3>

                          {/* Variant info if exists */}
                          {item.variant_id && (
                            <p className="text-sm text-gray-400 mb-2">
                              Variante: {item.variant_id}
                            </p>
                          )}

                          {/* Price */}
                          <p className="text-[#6b21a8] font-bold text-lg mb-3">
                            ${(item.price || product?.price || 0).toFixed(2)}
                          </p>

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-4">
                            <div className="flex items-center border border-[#3a3a3a]">
                              <button
                                onClick={() => handleDecrementQuantity(item)}
                                disabled={updatingItem === item._id}
                                className="p-2 hover:bg-[#2d2d2d] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                              >
                                <Minus className="w-4 h-4 text-gray-300" />
                              </button>

                              <input
                                type="number"
                                min="1"
                                max={product?.stock || 999}
                                value={editingQuantity[item._id] ?? item.quantity}
                                onChange={(e) => handleQuantityInputChange(item, e.target.value)}
                                disabled={updatingItem === item._id}
                                className="w-16 px-2 py-2 text-center bg-transparent text-white font-semibold border-x border-[#3a3a3a] outline-none focus:bg-[#2d2d2d] disabled:opacity-50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                              />

                              <button
                                onClick={() => handleIncrementQuantity(item)}
                                disabled={updatingItem === item._id}
                                className="p-2 hover:bg-[#2d2d2d] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                              >
                                <Plus className="w-4 h-4 text-gray-300" />
                              </button>
                            </div>

                            {/* Stock info */}
                            <div className="flex flex-col">
                              <span className="text-sm text-gray-500">
                                Stock: {product?.stock || 0}
                              </span>
                              {updatingItem === item._id && (
                                <span className="text-xs text-[#6b21a8]">
                                  Actualizando...
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col gap-2 justify-start">
                          <button
                            onClick={() => handleMoveToFavorites(item)}
                            className="p-2 border border-[#3a3a3a] text-gray-400 hover:border-[#6b21a8] hover:text-[#6b21a8] transition-colors"
                            title="Mover a favoritos"
                          >
                            <Heart className="w-5 h-5" />
                          </button>

                          <button
                            onClick={() => handleRemoveItem(item)}
                            disabled={isRemoving}
                            className="p-2 border border-red-400/30 text-red-400 hover:border-red-400 hover:text-red-300 transition-colors disabled:opacity-50"
                            title="Eliminar"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>

                      {/* Subtotal */}
                      <div className="mt-4 pt-4 border-t border-[#2d2d2d] flex justify-between items-center">
                        <span className="text-gray-400 text-sm">Subtotal:</span>
                        <span className="text-white font-bold text-lg">
                          ${((item.price || product?.price || 0) * (editingQuantity[item._id] ?? item.quantity)).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-[#1a1a1a] border border-[#2d2d2d] p-6 sticky top-4">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <Tag className="w-6 h-6 text-[#6b21a8]" />
                  Resumen del Pedido
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-300">
                    <span>Subtotal ({itemCount} productos)</span>
                    <span>${total.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between text-gray-300">
                    <span>Envío</span>
                    <span className="text-sm">Calculado en checkout</span>
                  </div>

                  <div className="border-t border-[#2d2d2d] pt-4">
                    <div className="flex justify-between text-white text-xl font-bold">
                      <span>Total</span>
                      <span className="text-[#6b21a8]">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={handleCheckout}
                  disabled={processingCheckout || cartItems.length === 0}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-[#6b21a8] text-white font-bold text-lg hover:bg-[#7c3aed] disabled:opacity-50 disabled:cursor-not-allowed transition-colors mb-4"
                >
                  {processingCheckout ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                      Procesando...
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5" />
                      Proceder al Pago
                    </>
                  )}
                </button>

                {/* Continue Shopping */}
                <button
                  onClick={() => router.push('/productos')}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 border-2 border-[#3a3a3a] text-gray-300 hover:border-[#6b21a8] hover:text-white font-semibold transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Seguir Comprando
                </button>

                {/* Security badges */}
                <div className="mt-6 pt-6 border-t border-[#2d2d2d]">
                  <p className="text-xs text-gray-500 text-center">
                    🔒 Compra 100% segura y protegida
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;