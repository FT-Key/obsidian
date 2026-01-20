"use client";

import React, { useState, useEffect } from 'react';
import { clsx } from 'clsx';
import {
  Search,
  Grid3x3,
  LayoutList,
  SlidersHorizontal,
  Sparkles,
  TrendingUp,
  Clock,
  Tag
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import ProductCard from '@/components/ui/ProductCard';
import ProductFilters from '@/components/products/ProductFilters';
import Pagination from '@/components/ui/Pagination';
import { productService } from '@/lib/api/services/productService';
import { cartService } from '@/lib/api/services/cartService';
import { favoriteService } from '@/lib/api/services/favoriteService';
import useAuthStore from '@/store/useAuthStore';
import useCartStore from '@/store/useCartStore';
import useFavoritesStore from '@/store/useFavoritesStore';
import toast from 'react-hot-toast';

/**
 * Página de Lista de Productos - Diseño Gótico Creativo
 */
const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [categories, setCategories] = useState([]);
  const [favoriteProducts, setFavoriteProducts] = useState(new Set()); // IDs de productos en favoritos
  const [togglingFavorite, setTogglingFavorite] = useState(null); // ID del producto siendo toggleado
  const LIMIT = 9;

  const [filters, setFilters] = useState({
    category: null,
    minPrice: null,
    maxPrice: null,
    inStock: null,
    minRating: null
  });

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const router = useRouter();
  
  // Zustand stores
  const { user } = useAuthStore();
  const { addItem: addToCartStore, loadCart } = useCartStore();
  const { addFavorite, removeFavorite, loadFavorites, items: favoriteItems } = useFavoritesStore();

  // Cargar productos
  useEffect(() => {
    loadProducts();
  }, [filters, sortBy, page]);

  // Cargar favoritos al montar y actualizar set de IDs
  useEffect(() => {
    if (user) {
      const userId = user._id || user.id;
      loadFavorites(userId);
    }
  }, [user]);

  // Actualizar set de productos favoritos cuando cambian los items
  useEffect(() => {
    const favoriteIds = new Set(
      favoriteItems.map(item => item.product?._id || item.product)
    );
    setFavoriteProducts(favoriteIds);
  }, [favoriteItems]);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const params = {
        ...filters,
        sort: sortBy,
        search: searchTerm,
        page,
        limit: LIMIT
      };

      const response = await productService.getAll(params);

      setProducts(response.products || []);
      setTotalPages(response.pagination?.pages || 1);
    } catch (error) {
      console.error('Error loading products:', error);
      toast.error('Error al cargar productos');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setPage(1);
    loadProducts();
  };

  const handleClearFilters = () => {
    setFilters({
      category: null,
      minPrice: null,
      maxPrice: null,
      inStock: null,
      minRating: null
    });
    setSearchTerm('');
    setPage(1);
  };

  // Agregar al carrito
  const handleAddToCart = async (product) => {
    if (!user) {
      toast.error('Debes iniciar sesión para agregar al carrito');
      router.push('/iniciar-sesion');
      return;
    }

    try {
      // Extraer el ID del usuario correctamente
      const userId = user._id || user.id;
      
      const response = await cartService.addItem(
        userId,
        product._id,
        null, // variantId - ajustar si tienes variantes
        1 // quantity
      );

      if (response.success) {
        // Actualizar el store
        await loadCart(userId);
        toast.success(`${product.name} agregado al carrito`);
      } else {
        toast.error(response.message || 'Error al agregar al carrito');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Error al agregar al carrito');
    }
  };

  // Agregar a favoritos (Toggle)
  const handleAddToFavorites = async (product) => {
    if (!user) {
      toast.error('Debes iniciar sesión para agregar a favoritos');
      router.push('/iniciar-sesion');
      return;
    }

    // Prevenir clics múltiples
    if (togglingFavorite === product._id) {
      return;
    }

    try {
      setTogglingFavorite(product._id);
      const userId = user._id || user.id;
      
      // Verificar en el backend si el producto está en favoritos
      const checkResponse = await favoriteService.check(userId, product._id);
      const isInFavorites = checkResponse?.is_favorite || false;
      
      if (isInFavorites) {
        // Remover de favoritos
        // Buscar el item en la lista de favoritos para obtener su ID
        const favoriteItem = favoriteItems.find(
          item => (item.product?._id || item.product) === product._id
        );
        
        if (favoriteItem) {
          // Actualizar UI optimísticamente
          setFavoriteProducts(prev => {
            const newSet = new Set(prev);
            newSet.delete(product._id);
            return newSet;
          });

          const response = await favoriteService.remove(userId, favoriteItem._id);
          
          if (response && (response.success !== false)) {
            await loadFavorites(userId);
            toast.success(`${product.name} eliminado de favoritos`);
          } else {
            // Revertir cambio optimista si falló
            setFavoriteProducts(prev => {
              const newSet = new Set(prev);
              newSet.add(product._id);
              return newSet;
            });
          }
        }
      } else {
        // Agregar a favoritos
        // Actualizar UI optimísticamente
        setFavoriteProducts(prev => {
          const newSet = new Set(prev);
          newSet.add(product._id);
          return newSet;
        });

        const response = await favoriteService.add(userId, product._id);
        
        if (response && (response.success !== false)) {
          await loadFavorites(userId);
          toast.success(`${product.name} agregado a favoritos`);
        } else {
          // Revertir cambio optimista si falló
          setFavoriteProducts(prev => {
            const newSet = new Set(prev);
            newSet.delete(product._id);
            return newSet;
          });
        }
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      
      // Recargar favoritos para sincronizar estado
      const userId = user._id || user.id;
      await loadFavorites(userId);
      
      toast.error('Error al actualizar favoritos');
    } finally {
      setTogglingFavorite(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[#1a1a1a] via-[#0a0a0a] to-[#121212] border-b border-[#2d2d2d] overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_50%_50%,_rgba(107,33,168,0.2)_0%,_transparent_50%)]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="h-[2px] w-12 bg-gradient-to-r from-transparent to-[#6b21a8]" />
              <Sparkles className="w-6 h-6 text-[#6b21a8]" />
              <div className="h-[2px] w-12 bg-gradient-to-l from-transparent to-[#6b21a8]" />
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#e5e7eb] via-white to-[#d1d5db] mb-4">
              Nuestros Productos
            </h1>

            <p className="text-[#9ca3af] text-lg max-w-2xl mx-auto">
              Descubre nuestra colección gótica de productos de belleza y estilo
            </p>
          </div>

          {/* Search */}
          <div className="max-w-3xl mx-auto">
            <div className="relative flex items-center gap-3 bg-[#1a1a1a] border-2 border-[#3a3a3a] p-2">
              <Search className="w-5 h-5 text-[#6b7280] ml-3" />
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="flex-1 bg-transparent text-white outline-none py-3"
              />
              <button
                onClick={handleSearch}
                className="px-6 py-3 bg-gray-200 text-gray-900 font-semibold"
              >
                Buscar
              </button>
            </div>
          </div>

          {/* Quick filters */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {[
              { icon: TrendingUp, label: 'Más Vendidos', value: 'bestsellers' },
              { icon: Sparkles, label: 'Nuevos', value: 'newest' },
              { icon: Tag, label: 'En Oferta', value: 'discount' },
              { icon: Clock, label: 'Últimas Unidades', value: 'lowstock' }
            ].map((chip, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSortBy(chip.value);
                  setPage(1);
                }}
                className={clsx(
                  'flex items-center gap-2 px-4 py-2 border',
                  sortBy === chip.value
                    ? 'bg-[#6b21a8] border-[#6b21a8] text-white'
                    : 'bg-[#1a1a1a] border-[#3a3a3a] text-gray-400'
                )}
              >
                <chip.icon className="w-4 h-4" />
                {chip.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-80">
            <ProductFilters
              categories={categories}
              filters={filters}
              onFilterChange={(f) => {
                setFilters(f);
                setPage(1);
              }}
              onClearFilters={handleClearFilters}
            />
          </aside>

          <main className="flex-1">
            {!loading && products.length > 0 && (
              <>
                <div
                  className={clsx(
                    viewMode === 'grid'
                      ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                      : 'space-y-6'
                  )}
                >
                  {products.map((product) => (
                    <ProductCard
                      key={product._id}
                      image={product.images?.[0]}
                      title={product.name}
                      description={product.description}
                      price={product.price}
                      onAddToCart={() => handleAddToCart(product)}
                      onWishlist={() => handleAddToFavorites(product)}
                      onQuickView={() => { router.push(`/productos/${product._id}`) }}
                    />
                  ))}
                </div>

                <Pagination
                  page={page}
                  totalPages={totalPages}
                  onPageChange={setPage}
                />
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;