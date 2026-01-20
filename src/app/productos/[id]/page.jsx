"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { clsx } from 'clsx';
import Image from 'next/image';
import { 
  Heart, ShoppingBag, Share2, Star, Check, ChevronLeft, 
  ChevronRight, Sparkles, Shield, Truck, RotateCcw, Award,
  Minus, Plus, Info, Zap
} from 'lucide-react';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import ProductCard from '@/components/ui/ProductCard';
import { productService } from '@/lib/api/services/productService';
import useCartStore from '@/store/useCartStore';
import useFavoritesStore from '@/store/useFavoritesStore';
import useAuthStore from '@/store/useAuthStore';
import toast from 'react-hot-toast';

/**
 * Página de Detalle de Producto - Diseño Inmersivo Gótico
 */
const ProductDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const { addItem: addToCart } = useCartStore();
  const { addFavorite, removeFavorite, items: favorites } = useFavoritesStore();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [activeTab, setActiveTab] = useState('description');
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (params.id) {
      loadProduct(params.id);
    }
  }, [params.id]);

  const loadProduct = async (id) => {
    setLoading(true);
    try {
      const response = await productService.getById(id);
      setProduct(response);
      
      // Cargar productos relacionados
      if (response.category) {
        loadRelatedProducts(response.category._id, id);
      }
    } catch (error) {
      console.error('Error loading product:', error);
      toast.error('Error al cargar el producto');
    } finally {
      setLoading(false);
    }
  };

  const loadRelatedProducts = async (categoryId, excludeId) => {
    try {
      const response = await productService.getAll({ 
        category: categoryId,
        limit: 4 
      });
      console.log(response)
      setRelatedProducts(
        response.products.filter(p => p._id !== excludeId)
      );
    } catch (error) {
      console.error('Error loading related products:', error);
    }
  };

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      toast.error('Debes iniciar sesión', { icon: '🔒' });
      return;
    }

    if (product.stock === 0) {
      toast.error('Producto sin stock', { icon: '❌' });
      return;
    }

    try {
      await addToCart(user.id, product._id, selectedVariant?._id, quantity);
      toast.success(`${quantity} producto(s) agregado(s) al carrito`, { icon: '🛒' });
    } catch (error) {
      toast.error('Error al agregar al carrito');
    }
  };

  const isFavorite = favorites.some(fav => fav.product?._id === product?._id);

  const handleToggleFavorite = async () => {
    if (!isAuthenticated) {
      toast.error('Debes iniciar sesión', { icon: '🔒' });
      return;
    }

    try {
      if (isFavorite) {
        const favItem = favorites.find(fav => fav.product?._id === product._id);
        await removeFavorite(user.id, favItem._id);
        toast.success('Eliminado de favoritos', { icon: '💔' });
      } else {
        await addFavorite(user.id, product._id);
        toast.success('Agregado a favoritos', { icon: '💜' });
      }
    } catch (error) {
      toast.error('Error al actualizar favoritos');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-16 h-16 border-4 border-[#3a3a3a] border-t-[#6b21a8] rounded-full animate-spin"></div>
          <p className="text-[#9ca3af] mt-4">Cargando producto...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#e5e7eb] mb-2">Producto no encontrado</h2>
          <button
            onClick={() => router.push('/productos')}
            className="text-[#6b21a8] hover:text-[#4c1d95] transition-colors"
          >
            Volver a productos
          </button>
        </div>
      </div>
    );
  }

  const hasDiscount = product.discount_percentage > 0;
  const finalPrice = hasDiscount 
    ? product.price * (1 - product.discount_percentage / 100)
    : product.price;

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      
      {/* Breadcrumb */}
      <div className="bg-[#121212] border-b border-[#2d2d2d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm">
            <button 
              onClick={() => router.push('/')}
              className="text-[#9ca3af] hover:text-white transition-colors"
            >
              Inicio
            </button>
            <ChevronRight className="w-4 h-4 text-[#6b7280]" />
            <button 
              onClick={() => router.push('/productos')}
              className="text-[#9ca3af] hover:text-white transition-colors"
            >
              Productos
            </button>
            <ChevronRight className="w-4 h-4 text-[#6b7280]" />
            <span className="text-white font-medium">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          
          {/* Images Gallery - Lado Izquierdo */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-gradient-to-br from-[#1a1a1a] via-[#121212] to-[#1a1a1a] border-2 border-[#3a3a3a] clip-path-gothic-xl overflow-hidden group">
              {/* Decoraciones de esquinas */}
              <div className="absolute top-0 left-0 w-24 h-24 border-l-2 border-t-2 border-[#6b21a8]/30"></div>
              <div className="absolute top-0 right-0 w-24 h-24 border-r-2 border-t-2 border-[#6b21a8]/30"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 border-l-2 border-b-2 border-[#6b21a8]/30"></div>
              <div className="absolute bottom-0 right-0 w-24 h-24 border-r-2 border-b-2 border-[#6b21a8]/30"></div>
              
              {/* Badge de descuento */}
              {hasDiscount && (
                <div className="absolute top-6 left-6 z-20">
                  <Badge variant="danger" size="lg">
                    -{product.discount_percentage}%
                  </Badge>
                </div>
              )}

              {/* Imagen principal */}
              {product.images && product.images[selectedImage] && (
                <Image
                  src={product.images[selectedImage]}
                  alt={product.name}
                  fill
                  className="object-contain p-12 group-hover:scale-110 transition-transform duration-700"
                  priority
                />
              )}

              {/* Navegación de imágenes */}
              {product.images && product.images.length > 1 && (
                <>
                  <button
                    onClick={() => setSelectedImage((prev) => 
                      prev === 0 ? product.images.length - 1 : prev - 1
                    )}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-[#1a1a1a]/90 backdrop-blur-sm border border-[#3a3a3a] text-white hover:border-[#6b21a8] transition-all clip-path-gothic-sm"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setSelectedImage((prev) => 
                      prev === product.images.length - 1 ? 0 : prev + 1
                    )}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-[#1a1a1a]/90 backdrop-blur-sm border border-[#3a3a3a] text-white hover:border-[#6b21a8] transition-all clip-path-gothic-sm"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={clsx(
                      'aspect-square border-2 clip-path-gothic-md overflow-hidden transition-all duration-300',
                      selectedImage === index
                        ? 'border-[#6b21a8] shadow-[0_0_15px_rgba(107,33,168,0.3)]'
                        : 'border-[#3a3a3a] hover:border-[#4a4a4a]'
                    )}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      width={150}
                      height={150}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info - Lado Derecho */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              {product.category && (
                <div className="inline-flex items-center gap-2 mb-3">
                  <span className="text-[#6b21a8] text-sm font-semibold tracking-widest uppercase">
                    {product.category.name}
                  </span>
                  {product.stock <= 5 && product.stock > 0 && (
                    <>
                      <div className="w-[2px] h-4 bg-[#3a3a3a]"></div>
                      <span className="text-[#c2410c] text-sm font-semibold flex items-center gap-1">
                        <Zap className="w-3 h-3" />
                        ¡Últimas {product.stock} unidades!
                      </span>
                    </>
                  )}
                </div>
              )}
              
              <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-[#e5e7eb] to-[#d1d5db] mb-4 leading-tight">
                {product.name}
              </h1>

              {/* Rating */}
              {product.rating > 0 && (
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={clsx(
                          'w-5 h-5',
                          i < Math.floor(product.rating)
                            ? 'text-[#c2410c] fill-[#c2410c]'
                            : 'text-[#3a3a3a]'
                        )}
                      />
                    ))}
                  </div>
                  <span className="text-[#9ca3af]">
                    {product.rating.toFixed(1)} ({product.reviews || 0} reseñas)
                  </span>
                </div>
              )}
            </div>

            {/* Price */}
            <div className="p-6 bg-gradient-to-br from-[#1a1a1a] via-[#121212] to-[#1a1a1a] border border-[#3a3a3a] clip-path-gothic-lg">
              <div className="flex items-end gap-4">
                {hasDiscount && (
                  <span className="text-2xl text-[#6b7280] line-through">
                    ${product.price.toFixed(2)}
                  </span>
                )}
                <span className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-[#d1d5db]">
                  ${finalPrice.toFixed(2)}
                </span>
              </div>
              
              {hasDiscount && (
                <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 bg-[#7c2d12]/20 border border-[#991b1b] clip-path-gothic-sm">
                  <span className="text-red-300 text-sm font-semibold">
                    Ahorrás ${(product.price - finalPrice).toFixed(2)}
                  </span>
                </div>
              )}
            </div>

            {/* Quantity & Actions */}
            <div className="space-y-4">
              {/* Quantity Selector */}
              <div className="flex items-center gap-4">
                <span className="text-[#9ca3af] font-medium">Cantidad:</span>
                <div className="flex items-center gap-2 bg-[#1a1a1a] border border-[#3a3a3a] clip-path-gothic-sm">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="p-3 text-[#9ca3af] hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center text-white font-bold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    disabled={quantity >= product.stock}
                    className="p-3 text-[#9ca3af] hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-[#6b7280] text-sm">
                  ({product.stock} disponibles)
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  variant="primary"
                  size="lg"
                  icon={ShoppingBag}
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="flex-1"
                >
                  {product.stock === 0 ? 'Sin Stock' : 'Agregar al Carrito'}
                </Button>
                
                <button
                  onClick={handleToggleFavorite}
                  className={clsx(
                    'p-4 border transition-all duration-300 clip-path-gothic-sm',
                    isFavorite
                      ? 'bg-gradient-to-br from-[#6b21a8] via-[#4c1d95] to-[#6b21a8] border-[#6b21a8] text-white'
                      : 'bg-[#1a1a1a] border-[#3a3a3a] text-[#9ca3af] hover:border-[#6b21a8] hover:text-white'
                  )}
                >
                  <Heart className={clsx('w-6 h-6', isFavorite && 'fill-current')} />
                </button>
                
                <button className="p-4 bg-[#1a1a1a] border border-[#3a3a3a] text-[#9ca3af] hover:border-[#4a4a4a] hover:text-white transition-all clip-path-gothic-sm">
                  <Share2 className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Features - Grid de beneficios */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-[#2d2d2d]">
              {[
                { icon: Truck, text: 'Envío gratis >$50', color: 'text-[#065f46]' },
                { icon: RotateCcw, text: 'Devolución 30 días', color: 'text-[#6b21a8]' },
                { icon: Shield, text: 'Compra segura', color: 'text-[#0e7490]' },
                { icon: Award, text: 'Garantía oficial', color: 'text-[#c2410c]' }
              ].map((feature, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3 bg-[#1a1a1a]/50 border border-[#2d2d2d] clip-path-gothic-sm hover:border-[#3a3a3a] transition-colors"
                >
                  <feature.icon className={clsx('w-5 h-5', feature.color)} />
                  <span className="text-[#9ca3af] text-sm">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mb-20">
          {/* Tab Headers */}
          <div className="flex gap-4 mb-8 border-b border-[#2d2d2d]">
            {[
              { id: 'description', label: 'Descripción' },
              { id: 'specifications', label: 'Especificaciones' },
              { id: 'reviews', label: 'Reseñas' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={clsx(
                  'px-6 py-4 font-semibold transition-all duration-300 relative',
                  activeTab === tab.id
                    ? 'text-white'
                    : 'text-[#9ca3af] hover:text-white'
                )}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#6b21a8] via-[#4c1d95] to-[#6b21a8]"></div>
                )}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-8 bg-gradient-to-br from-[#1a1a1a] via-[#121212] to-[#1a1a1a] border border-[#3a3a3a] clip-path-gothic-lg">
            {activeTab === 'description' && (
              <div className="prose prose-invert max-w-none">
                <p className="text-[#d1d5db] text-lg leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}
            
            {activeTab === 'specifications' && (
              <div className="grid grid-cols-2 gap-4">
                {product.specifications?.map((spec, idx) => (
                  <div key={idx} className="flex justify-between p-4 bg-[#0a0a0a] border border-[#2d2d2d] clip-path-gothic-sm">
                    <span className="text-[#9ca3af]">{spec.name}</span>
                    <span className="text-white font-semibold">{spec.value}</span>
                  </div>
                ))}
              </div>
            )}
            
            {activeTab === 'reviews' && (
              <div className="text-center py-12">
                <p className="text-[#9ca3af]">No hay reseñas aún</p>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <div className="flex items-center gap-3 mb-8">
              <Sparkles className="w-6 h-6 text-[#6b21a8]" />
              <h2 className="text-3xl font-bold text-white">Productos Relacionados</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard
                  key={relatedProduct._id}
                  image={relatedProduct.images?.[0]}
                  title={relatedProduct.name}
                  description={relatedProduct.description}
                  price={relatedProduct.price}
                  variant="default"
                  imageSize="medium"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;