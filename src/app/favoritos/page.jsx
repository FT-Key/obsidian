"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Heart,
  ShoppingCart,
  Trash2,
  Package,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import ProductCard from '@/components/ui/ProductCard';
import { favoriteService } from '@/lib/api/services/favoriteService';
import { cartService } from '@/lib/api/services/cartService';
import useAuthStore from '@/store/useAuthStore';
import useFavoritesStore from '@/store/useFavoritesStore';
import useCartStore from '@/store/useCartStore';
import toast from 'react-hot-toast';

/**
 * Página de Favoritos - Diseño Gótico
 */
const FavoritesPage = () => {
  const [loading, setLoading] = useState(true);
  const [movingToCart, setMovingToCart] = useState(null);
  const [removing, setRemoving] = useState(null);
  const [isHydrated, setIsHydrated] = useState(false);

  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const { items: favoriteItems, loadFavorites, removeFavorite, count } = useFavoritesStore();
  const { loadCart } = useCartStore();

  // Esperar a que Zustand se hidrate
  useEffect(() => {
    console.log('🚀 Componente montado, esperando hidratación...');
    setIsHydrated(true);
  }, []);

  // Debug logs
  useEffect(() => {
    console.log('🔍 AUTH DEBUG:', {
      user,
      isAuthenticated,
      isHydrated,
      userExists: !!user,
      userId: user?._id || user?.id
    });
  }, [user, isAuthenticated, isHydrated]);

  // Verificar autenticación SOLO después de hidratar
  useEffect(() => {
    if (!isHydrated) {
      console.log('⏸️ Esperando hidratación del store...');
      return;
    }

    console.log('✅ Store hidratado, verificando autenticación...', {
      user,
      isAuthenticated
    });

    if (!user && !isAuthenticated) {
      console.log('❌ No autenticado, redirigiendo a login...');
      router.push('/iniciar-sesion');
    } else {
      console.log('✅ Usuario autenticado!', { user, isAuthenticated });
    }
  }, [isHydrated, user, isAuthenticated]);

  // Cargar favoritos cuando el usuario esté disponible
  useEffect(() => {
    console.log('📦 useEffect favoritos ejecutado:', { user, isHydrated });
    
    if (user && isHydrated) {
      console.log('✅ Cargando favoritos para usuario:', user._id || user.id);
      loadUserFavorites();
    } else {
      console.log('⏸️ No se cargan favoritos:', {
        hasUser: !!user,
        isHydrated
      });
    }
  }, [user, isHydrated]);

  const loadUserFavorites = async () => {
    if (!user) {
      console.log('⚠️ loadUserFavorites: No hay usuario');
      return;
    }
    
    console.log('🔄 Cargando favoritos...');
    setLoading(true);
    try {
      const userId = user._id || user.id;
      console.log('📞 Llamando loadFavorites con userId:', userId);
      await loadFavorites(userId);
      console.log('✅ Favoritos cargados exitosamente');
    } catch (error) {
      console.error('❌ Error loading favorites:', error);
      toast.error('Error al cargar favoritos');
    } finally {
      setLoading(false);
      console.log('🏁 Carga de favoritos completada');
    }
  };

  // Eliminar de favoritos
  const handleRemoveFavorite = async (item) => {
    if (!user || removing === item._id) return;

    try {
      setRemoving(item._id);
      const userId = user._id || user.id;
      
      const response = await favoriteService.remove(userId, item._id);
      
      if (response && response.success !== false) {
        await loadFavorites(userId);
        toast.success('Producto eliminado de favoritos');
      }
    } catch (error) {
      console.error('Error removing favorite:', error);
      toast.error('Error al eliminar de favoritos');
    } finally {
      setRemoving(null);
    }
  };

  // Mover al carrito
  const handleMoveToCart = async (item) => {
    if (!user || movingToCart === item._id) return;

    try {
      setMovingToCart(item._id);
      const userId = user._id || user.id;
      const productId = item.product?._id || item.product;

      // Agregar al carrito
      const cartResponse = await cartService.addItem(userId, productId, null, 1);
      
      if (cartResponse && cartResponse.success !== false) {
        // Eliminar de favoritos
        await favoriteService.remove(userId, item._id);
        
        // Recargar ambos
        await Promise.all([
          loadFavorites(userId),
          loadCart(userId)
        ]);
        
        toast.success('Producto movido al carrito');
      }
    } catch (error) {
      console.error('Error moving to cart:', error);
      toast.error('Error al mover al carrito');
    } finally {
      setMovingToCart(null);
    }
  };

  // Limpiar todos los favoritos
  const handleClearAll = async () => {
    if (!user) return;
    
    const confirmed = window.confirm('¿Estás seguro de eliminar todos los favoritos?');
    if (!confirmed) return;

    try {
      const userId = user._id || user.id;
      const response = await favoriteService.clear(userId);
      
      if (response && response.success !== false) {
        await loadFavorites(userId);
        toast.success('Favoritos eliminados');
      }
    } catch (error) {
      console.error('Error clearing favorites:', error);
      toast.error('Error al limpiar favoritos');
    }
  };

  if (!isHydrated || loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#6b21a8] border-t-transparent"></div>
          <p className="text-gray-400 mt-4">
            {!isHydrated ? 'Verificando sesión...' : 'Cargando favoritos...'}
          </p>
        </div>
      </div>
    );
  }

  // Si no está autenticado después del check, no renderizar nada
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
              <Heart className="w-6 h-6 text-[#6b21a8] fill-[#6b21a8]" />
              <div className="h-[2px] w-12 bg-gradient-to-l from-transparent to-[#6b21a8]" />
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#e5e7eb] via-white to-[#d1d5db] mb-4">
              Mis Favoritos
            </h1>

            <p className="text-[#9ca3af] text-lg max-w-2xl mx-auto">
              {count > 0 
                ? `Tienes ${count} ${count === 1 ? 'producto' : 'productos'} en tu lista de favoritos`
                : 'Aún no tienes productos favoritos'}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {favoriteItems.length === 0 ? (
          // Empty State
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-[#1a1a1a] border-2 border-[#3a3a3a] mb-6">
              <Heart className="w-12 h-12 text-gray-600" />
            </div>
            
            <h2 className="text-2xl font-bold text-white mb-4">
              No tienes favoritos aún
            </h2>
            
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              Explora nuestros productos y agrega tus favoritos para encontrarlos fácilmente más tarde
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
          <>
            {/* Actions Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 p-4 bg-[#1a1a1a] border border-[#2d2d2d]">
              <div className="flex items-center gap-2 text-gray-300">
                <Package className="w-5 h-5 text-[#6b21a8]" />
                <span className="font-semibold">{count}</span>
                <span className="text-gray-400">
                  {count === 1 ? 'producto' : 'productos'}
                </span>
              </div>

              <button
                onClick={handleClearAll}
                className="flex items-center gap-2 px-4 py-2 text-red-400 hover:text-red-300 border border-red-400/30 hover:border-red-400/50 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Limpiar todo
              </button>
            </div>

            {/* Favorites Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {favoriteItems.map((item) => {
                const product = item.product;
                const productId = product?._id || product;
                const isMoving = movingToCart === item._id;
                const isRemoving = removing === item._id;

                return (
                  <div key={item._id} className="relative h-full">
                    {/* Loading Overlay */}
                    {(isMoving || isRemoving) && (
                      <div className="absolute inset-0 bg-black/50 z-10 flex items-center justify-center rounded-sm">
                        <div className="animate-spin rounded-full h-8 w-8 border-4 border-[#6b21a8] border-t-transparent"></div>
                      </div>
                    )}

                    {/* ProductCard Component */}
                    <ProductCard
                      image={product?.main_image}
                      title={product?.name || 'Producto sin nombre'}
                      description={product?.description}
                      price={product?.price}
                      stock={product?.stock}
                      onAddToCart={() => handleMoveToCart(item)}
                      onWishlist={() => handleRemoveFavorite(item)}
                      onQuickView={() => router.push(`/productos/${productId}`)}
                      isInFavorites={true}
                      addedDate={item.added_at}
                    />
                  </div>
                );
              })}
            </div>

            {/* Continue Shopping */}
            <div className="mt-12 text-center">
              <button
                onClick={() => router.push('/productos')}
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#6b21a8] text-[#6b21a8] hover:bg-[#6b21a8] hover:text-white font-semibold transition-colors"
              >
                <Sparkles className="w-5 h-5" />
                Seguir Explorando
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;