// store/useFavoritesStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { favoriteService } from '@/lib/api/services/favoriteService';

const useFavoritesStore = create(
  persist(
    (set, get) => ({
      items: [],
      count: 0,
      loading: false,
      
      loadFavorites: async (userId) => {
        if (!userId) return;
        
        set({ loading: true });
        
        try {
          const data = await favoriteService.get(userId);
          
          if (data && (data.success !== false)) {
            set({
              items: data.items || [],
              count: data.items?.length || data.item_count || 0
            });
          }
        } catch (error) {
          console.error('Error loading favorites:', error);
        } finally {
          set({ loading: false });
        }
      },
      
      addFavorite: async (userId, productId) => {
        set({ loading: true });
        
        try {
          const data = await favoriteService.add(userId, productId);
          
          if (data && (data.success !== false)) {
            set({
              items: data.items || [],
              count: data.items?.length || data.item_count || 0
            });
          }
          
          return data;
        } catch (error) {
          console.error('Error adding favorite:', error);
          throw error;
        } finally {
          set({ loading: false });
        }
      },
      
      removeFavorite: async (userId, itemId) => {
        set({ loading: true });
        
        try {
          const data = await favoriteService.remove(userId, itemId);
          
          if (data && (data.success !== false)) {
            set({
              items: data.items || [],
              count: data.items?.length || data.item_count || 0
            });
          }
          
          return data;
        } catch (error) {
          console.error('Error removing favorite:', error);
          throw error;
        } finally {
          set({ loading: false });
        }
      },
      
      clearFavorites: () => {
        set({
          items: [],
          count: 0
        });
      }
    }),
    {
      name: 'favorites-storage',
      partialize: (state) => ({
        items: state.items,
        count: state.count
      })
    }
  )
);

export default useFavoritesStore;