// store/useCartStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { cartService } from '@/lib/api/services/cartService';

const useCartStore = create(
  persist(
    (set, get) => ({
      // Estado
      items: [],
      total: 0,
      itemCount: 0,
      loading: false,
      
      // Cargar carrito desde el servidor
      loadCart: async (userId) => {
        if (!userId) return;
        
        set({ loading: true });
        
        try {
          const data = await cartService.get(userId);
          
          if (data && (data.success !== false)) {
            set({
              items: data.cart?.items || data.items || [],
              total: data.cart?.total || data.total || 0,
              itemCount: (data.cart?.items || data.items || []).reduce((sum, item) => sum + item.quantity, 0) || 0
            });
          }
        } catch (error) {
          console.error('Error loading cart:', error);
        } finally {
          set({ loading: false });
        }
      },
      
      // Agregar producto
      addItem: async (userId, productId, variantId = null, quantity = 1) => {
        set({ loading: true });
        
        try {
          const data = await cartService.addItem(userId, productId, variantId, quantity);
          
          if (data && (data.success !== false)) {
            set({
              items: data.cart?.items || data.items || [],
              total: data.cart?.total || data.total || 0,
              itemCount: (data.cart?.items || data.items || []).reduce((sum, item) => sum + item.quantity, 0) || 0
            });
          }
          
          return data;
        } catch (error) {
          console.error('Error adding item:', error);
          throw error;
        } finally {
          set({ loading: false });
        }
      },
      
      // Actualizar cantidad
      updateQuantity: async (userId, itemId, quantity) => {
        set({ loading: true });
        
        try {
          const data = await cartService.updateItem(userId, itemId, quantity);
          
          if (data && (data.success !== false)) {
            set({
              items: data.cart?.items || data.items || [],
              total: data.cart?.total || data.total || 0,
              itemCount: (data.cart?.items || data.items || []).reduce((sum, item) => sum + item.quantity, 0) || 0
            });
          }
          
          return data;
        } catch (error) {
          console.error('Error updating quantity:', error);
          throw error;
        } finally {
          set({ loading: false });
        }
      },
      
      // Eliminar item
      removeItem: async (userId, itemId) => {
        set({ loading: true });
        
        try {
          const data = await cartService.removeItem(userId, itemId);
          
          if (data && (data.success !== false)) {
            set({
              items: data.cart?.items || data.items || [],
              total: data.cart?.total || data.total || 0,
              itemCount: (data.cart?.items || data.items || []).reduce((sum, item) => sum + item.quantity, 0) || 0
            });
          }
          
          return data;
        } catch (error) {
          console.error('Error removing item:', error);
          throw error;
        } finally {
          set({ loading: false });
        }
      },
      
      // Limpiar carrito completo en el servidor
      clearCart: async (userId) => {
        if (!userId) {
          // Si no hay userId, solo limpiar local
          set({
            items: [],
            total: 0,
            itemCount: 0
          });
          return;
        }

        set({ loading: true });
        
        try {
          const data = await cartService.clear(userId);
          
          if (data && (data.success !== false)) {
            set({
              items: [],
              total: 0,
              itemCount: 0
            });
          }
          
          return data;
        } catch (error) {
          console.error('Error clearing cart:', error);
          throw error;
        } finally {
          set({ loading: false });
        }
      }
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({
        items: state.items,
        total: state.total,
        itemCount: state.itemCount
      })
    }
  )
);

export default useCartStore;