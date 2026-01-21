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
 * Página de Lista de Productos - Diseño Gótico con Dark/Light Mode
 */
const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [categories, setCategories] = useState([]);
  const [favoriteProducts, setFavoriteProducts] = useState(new Set());
  const [togglingFavorite, setTogglingFavorite] = useState(null);
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
      const userId = user._id || user.id;
      
      const response = await cartService.addItem(
        userId,
        product._id,
        null,
        1
      );

      if (response.success) {
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

    if (togglingFavorite === product._id) {
      return;
    }

    try {
      setTogglingFavorite(product._id);
      const userId = user._id || user.id;
      
      const checkResponse = await favoriteService.check(userId, product._id);
      const isInFavorites = checkResponse?.is_favorite || false;
      
      if (isInFavorites) {
        const favoriteItem = favoriteItems.find(
          item => (item.product?._id || item.product) === product._id
        );
        
        if (favoriteItem) {
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
            setFavoriteProducts(prev => {
              const newSet = new Set(prev);
              newSet.add(product._id);
              return newSet;
            });
          }
        }
      } else {
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
          setFavoriteProducts(prev => {
            const newSet = new Set(prev);
            newSet.delete(product._id);
            return newSet;
          });
        }
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      
      const userId = user._id || user.id;
      await loadFavorites(userId);
      
      toast.error('Error al actualizar favoritos');
    } finally {
      setTogglingFavorite(null);
    }
  };

  return (
    <div 
      className="min-h-screen transition-colors duration-300"
      style={{ backgroundColor: 'var(--color-gothic-abyss)' }}
    >
      {/* Hero Section */}
      <div 
        className="relative border-b overflow-hidden"
        style={{ 
          background: 'linear-gradient(to bottom right, var(--color-gothic-obsidian), var(--color-gothic-abyss), var(--color-gothic-shadow))',
          borderColor: 'var(--color-gothic-steel)'
        }}
      >
        {/* Decorative overlay */}
        <div 
          className="absolute inset-0"
          style={{ 
            opacity: 0.05,
            background: 'radial-gradient(circle at 50% 50%, rgba(107, 33, 168, 0.2) 0%, transparent 50%)'
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
          <div className="text-center mb-12">
            {/* Decorative divider */}
            <div className="inline-flex items-center gap-3 mb-4">
              <div 
                className="h-[2px] w-12"
                style={{ 
                  background: 'linear-gradient(to right, transparent, var(--color-gothic-amethyst))'
                }}
              />
              <Sparkles 
                className="w-6 h-6"
                style={{ color: 'var(--color-gothic-amethyst)' }}
              />
              <div 
                className="h-[2px] w-12"
                style={{ 
                  background: 'linear-gradient(to left, transparent, var(--color-gothic-amethyst))'
                }}
              />
            </div>

            <h1 
              className="text-5xl md:text-6xl font-bold mb-4 text-shadow-metal"
              style={{ color: 'var(--color-gothic-pearl)' }}
            >
              Nuestros Productos
            </h1>

            <p 
              className="text-lg max-w-2xl mx-auto"
              style={{ color: 'var(--color-gothic-smoke)' }}
            >
              Descubre nuestra colección gótica de productos de belleza y estilo
            </p>
          </div>

          {/* Search */}
          <div className="max-w-3xl mx-auto">
            <div 
              className="relative flex items-center gap-3 border-2 p-2 rounded-md transition-all duration-300"
              style={{
                backgroundColor: 'var(--color-gothic-obsidian)',
                borderColor: 'var(--color-gothic-gunmetal)'
              }}
            >
              <Search 
                className="w-5 h-5 ml-3"
                style={{ color: 'var(--color-gothic-ash)' }}
              />
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="flex-1 bg-transparent outline-none py-3"
                style={{ color: 'var(--color-gothic-pearl)' }}
              />
              <button
                onClick={handleSearch}
                className="px-6 py-3 font-semibold rounded transition-all duration-300 clip-path-gothic-sm"
                style={{
                  background: 'linear-gradient(to bottom right, var(--color-gothic-chrome), var(--color-gothic-silver), var(--color-gothic-ash))',
                  color: 'var(--color-gothic-obsidian)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(107, 33, 168, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'none';
                }}
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
                className="flex items-center gap-2 px-4 py-2 border rounded-md transition-all duration-300"
                style={
                  sortBy === chip.value
                    ? {
                        backgroundColor: 'var(--color-gothic-amethyst)',
                        borderColor: 'var(--color-gothic-amethyst)',
                        color: 'var(--color-gothic-pearl)',
                        boxShadow: '0 0 12px rgba(107, 33, 168, 0.3)'
                      }
                    : {
                        backgroundColor: 'var(--color-gothic-obsidian)',
                        borderColor: 'var(--color-gothic-gunmetal)',
                        color: 'var(--color-gothic-smoke)'
                      }
                }
                onMouseEnter={(e) => {
                  if (sortBy !== chip.value) {
                    e.currentTarget.style.borderColor = 'var(--color-gothic-pewter)';
                    e.currentTarget.style.color = 'var(--color-gothic-silver)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (sortBy !== chip.value) {
                    e.currentTarget.style.borderColor = 'var(--color-gothic-gunmetal)';
                    e.currentTarget.style.color = 'var(--color-gothic-smoke)';
                  }
                }}
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
          {/* Sidebar Filters */}
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

          {/* Products Grid */}
          <main className="flex-1">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div 
                  className="w-12 h-12 border-4 border-t-transparent rounded-full animate-spin"
                  style={{ 
                    borderColor: 'var(--color-gothic-steel)',
                    borderTopColor: 'transparent'
                  }}
                />
              </div>
            ) : products.length > 0 ? (
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
            ) : (
              <div 
                className="text-center py-20 border-2 rounded-lg"
                style={{
                  backgroundColor: 'var(--color-gothic-obsidian)',
                  borderColor: 'var(--color-gothic-steel)'
                }}
              >
                <Sparkles 
                  className="w-16 h-16 mx-auto mb-4"
                  style={{ color: 'var(--color-gothic-ash)' }}
                />
                <h3 
                  className="text-xl font-bold mb-2"
                  style={{ color: 'var(--color-gothic-silver)' }}
                >
                  No se encontraron productos
                </h3>
                <p style={{ color: 'var(--color-gothic-smoke)' }}>
                  Intenta ajustar los filtros o buscar algo diferente
                </p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;