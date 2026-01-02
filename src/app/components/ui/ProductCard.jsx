"use client";

import React from 'react';
import Image from 'next/image';
import { clsx } from 'clsx';
import { ShoppingCart, Heart, Eye, Star, Zap } from 'lucide-react';

/**
 * Gothic Dark Product Card Component
 * Card optimizada para productos con imagen que "sale" del contenedor
 * Soporta imágenes PNG con fondo transparente y formatos rectangulares/cuadrados
 * Optimizada para SEO con Next Image
 * Layout con flexbox para alineación consistente
 */
const ProductCard = ({
  // Información del producto
  image,
  imageAlt = 'Producto',
  title,
  description,
  price,
  originalPrice,
  discount,
  rating = 0,
  reviews = 0,
  badge,
  
  // Configuración visual
  variant = 'default',
  imagePosition = 'float', // 'float', 'contained', 'background'
  imageSize = 'large', // 'small', 'medium', 'large'
  hoverable = true,
  
  // Acciones
  onAddToCart,
  onWishlist,
  onQuickView,
  
  // Estilos personalizados
  className = '',
  imageClassName = '',
  
  // Props de Next Image
  imagePriority = false,
  imageSizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  
  ...props
}) => {

  const baseStyles = `
    relative rounded-xl overflow-visible
    transition-all duration-500
    group
    flex flex-col
    h-full
  `;

  const variants = {
    default: `
      bg-gradient-to-br from-gray-900 via-gray-950 to-black
      border-2 border-gray-800
      shadow-[0_8px_32px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.05)]
      ${hoverable ? 'hover:border-purple-700/60 hover:shadow-[0_12px_48px_rgba(124,58,237,0.4)] hover:-translate-y-1' : ''}
    `,
    elevated: `
      bg-gradient-to-br from-gray-800 via-gray-900 to-gray-950
      border-2 border-gray-700/60
      shadow-[0_12px_40px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.1)]
      ${hoverable ? 'hover:border-purple-600/70 hover:shadow-[0_16px_56px_rgba(124,58,237,0.5)] hover:-translate-y-2' : ''}
    `,
    glass: `
      bg-gray-900/50 backdrop-blur-xl
      border-2 border-gray-700/40
      shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)]
      ${hoverable ? 'hover:bg-gray-900/70 hover:border-purple-500/50 hover:shadow-[0_12px_48px_rgba(124,58,237,0.4)]' : ''}
    `,
    premium: `
      bg-gradient-to-br from-purple-950/50 via-gray-900 to-black
      border-2 border-purple-800/50
      shadow-[0_8px_32px_rgba(124,58,237,0.3),inset_0_1px_0_rgba(255,255,255,0.1)]
      ${hoverable ? 'hover:border-purple-600/80 hover:shadow-[0_16px_56px_rgba(124,58,237,0.6)]' : ''}
    `
  };

  const imageSizeStyles = {
    small: 'h-40',
    medium: 'h-56',
    large: 'h-72'
  };

  const cardClasses = clsx(
    baseStyles,
    variants[variant],
    className
  );

  // Calcular porcentaje de descuento
  const discountPercent = discount || (originalPrice && price ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0);

  return (
    <article 
      className={cardClasses}
      itemScope 
      itemType="https://schema.org/Product"
      {...props}
    >
      {/* Decoraciones góticas en esquinas */}
      <div className="absolute top-0 left-0 w-20 h-20 border-l-2 border-t-2 border-purple-700/20 opacity-50 group-hover:opacity-100 group-hover:border-purple-500/40 transition-all duration-300 z-10">
        <div className="absolute top-0 left-0 w-2 h-2 bg-purple-500/60 rotate-45 transform -translate-x-1 -translate-y-1 group-hover:bg-purple-400 group-hover:shadow-[0_0_8px_rgba(124,58,237,0.8)]"></div>
      </div>
      <div className="absolute top-0 right-0 w-20 h-20 border-r-2 border-t-2 border-purple-700/20 opacity-50 group-hover:opacity-100 group-hover:border-purple-500/40 transition-all duration-300 z-10">
        <div className="absolute top-0 right-0 w-2 h-2 bg-purple-500/60 rotate-45 transform translate-x-1 -translate-y-1 group-hover:bg-purple-400 group-hover:shadow-[0_0_8px_rgba(124,58,237,0.8)]"></div>
      </div>

      {/* Badge de descuento o especial */}
      {(badge || discountPercent > 0) && (
        <div className="absolute top-4 left-4 z-20">
          <div className="relative">
            <div className="bg-gradient-to-br from-red-600 to-red-900 text-white px-3 py-1.5 text-sm font-bold shadow-[0_0_20px_rgba(220,38,38,0.6)] border-2 border-red-400/40 clip-path-badge">
              <span className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent"></span>
              {badge || `-${discountPercent}%`}
            </div>
          </div>
        </div>
      )}

      {/* Botones de acción rápida */}
      <div className="absolute top-4 right-4 flex flex-col gap-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {onWishlist && (
          <button
            onClick={onWishlist}
            className="w-10 h-10 bg-gray-900/90 backdrop-blur-sm border-2 border-gray-700/50 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-400 hover:border-red-500/50 hover:shadow-[0_0_15px_rgba(220,38,38,0.4)] transition-all duration-300"
            aria-label="Agregar a favoritos"
          >
            <Heart className="w-5 h-5" />
          </button>
        )}
        {onQuickView && (
          <button
            onClick={onQuickView}
            className="w-10 h-10 bg-gray-900/90 backdrop-blur-sm border-2 border-gray-700/50 rounded-lg flex items-center justify-center text-gray-400 hover:text-purple-400 hover:border-purple-500/50 hover:shadow-[0_0_15px_rgba(124,58,237,0.4)] transition-all duration-300"
            aria-label="Vista rápida"
          >
            <Eye className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Contenedor de imagen con altura FIJA - Siempre mismo tamaño */}
      <div className={clsx(
        'relative w-full flex-shrink-0',
        // Altura fija según tamaño seleccionado (no overflow-visible para contener la imagen)
        imageSize === 'small' && 'h-48',
        imageSize === 'medium' && 'h-64', 
        imageSize === 'large' && 'h-80',
        imagePosition === 'float' && 'pt-8 px-8 pb-4'
      )}>
        <div className={clsx(
          'relative w-full h-full',
          imagePosition === 'float' && 'group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-500',
          imagePosition === 'contained' && 'group-hover:scale-105 transition-transform duration-500'
        )}>
          {/* Fondo con gradiente para imágenes transparentes */}
          {imagePosition === 'float' && (
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-gray-500/10 rounded-lg opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
          )}
          
          {/* Imagen del producto con Next Image optimizado para SEO */}
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes={imageSizes}
            priority={imagePriority}
            className={clsx(
              'object-contain',
              imagePosition === 'background' && 'object-cover',
              'drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]',
              'group-hover:drop-shadow-[0_15px_40px_rgba(124,58,237,0.4)]',
              'transition-all duration-500',
              imageClassName
            )}
            itemProp="image"
          />

          {/* Brillo adicional en hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
        </div>
      </div>

      {/* Línea decorativa divisoria */}
      <div className="relative my-4 mx-6 flex-shrink-0">
        <div className="h-[2px] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent group-hover:via-purple-400/60 transition-colors duration-300"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-purple-500/50 rounded-full shadow-[0_0_8px_rgba(124,58,237,0.6)] group-hover:bg-purple-400 group-hover:shadow-[0_0_12px_rgba(124,58,237,0.9)] transition-all duration-300"></div>
      </div>

      {/* Contenido del producto - Flex grow para ocupar espacio disponible */}
      <div className="px-6 relative z-10 flex-grow flex flex-col">
        {/* Rating */}
        {rating > 0 && (
          <div className="flex items-center gap-2 mb-3 flex-shrink-0" itemProp="aggregateRating" itemScope itemType="https://schema.org/AggregateRating">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={clsx(
                    'w-4 h-4',
                    i < Math.floor(rating) ? 'text-amber-500 fill-amber-500' : 'text-gray-700'
                  )}
                />
              ))}
            </div>
            <span className="text-sm text-gray-400" itemProp="ratingValue">
              {rating}
            </span>
            {reviews > 0 && (
              <span className="text-sm text-gray-500" itemProp="reviewCount">
                ({reviews})
              </span>
            )}
          </div>
        )}

        {/* Título */}
        <h3 
          className="text-xl font-bold text-gray-100 mb-2 group-hover:text-purple-300 transition-colors duration-300 line-clamp-2 flex-shrink-0"
          itemProp="name"
        >
          {title}
        </h3>

        {/* Descripción - flex-grow para ocupar el espacio restante */}
        {description && (
          <p 
            className="text-sm text-gray-400 mb-4 line-clamp-3 flex-grow"
            itemProp="description"
          >
            {description}
          </p>
        )}

        {/* Espaciador cuando no hay descripción */}
        {!description && <div className="flex-grow"></div>}

        {/* Precio - Siempre al final antes del botón */}
        <div className="flex items-center gap-3 mb-4 flex-shrink-0" itemProp="offers" itemScope itemType="https://schema.org/Offer">
          <span 
            className="text-3xl font-bold text-purple-400 group-hover:text-purple-300 transition-colors"
            itemProp="price"
          >
            ${price}
          </span>
          {originalPrice && originalPrice > price && (
            <span className="text-lg text-gray-600 line-through">
              ${originalPrice}
            </span>
          )}
          <meta itemProp="priceCurrency" content="USD" />
          <meta itemProp="availability" content="https://schema.org/InStock" />
        </div>

        {/* Botón de agregar al carrito - Siempre al final */}
        {onAddToCart && (
          <button
            onClick={onAddToCart}
            className="w-full px-6 py-3 bg-gradient-to-br from-purple-600 via-purple-700 to-purple-900 text-white font-semibold rounded-lg border-2 border-purple-400/30 shadow-[0_0_20px_rgba(124,58,237,0.3),inset_0_1px_0_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(124,58,237,0.6),inset_0_1px_0_rgba(255,255,255,0.2)] hover:border-purple-300/50 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 group/btn clip-path-gothic flex-shrink-0"
          >
            <span className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></span>
            <ShoppingCart className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
            <span>Agregar al Carrito</span>
            <Zap className="w-4 h-4 group-hover/btn:text-yellow-300 transition-colors" />
          </button>
        )}
      </div>

      {/* Espaciado inferior */}
      <div className="pb-6"></div>

      {/* Decoraciones góticas inferiores */}
      <div className="absolute bottom-0 left-0 w-20 h-20 border-l-2 border-b-2 border-purple-700/20 opacity-50 group-hover:opacity-100 group-hover:border-purple-500/40 transition-all duration-300">
        <div className="absolute bottom-0 left-0 w-2 h-2 bg-purple-500/60 rotate-45 transform -translate-x-1 translate-y-1 group-hover:bg-purple-400 group-hover:shadow-[0_0_8px_rgba(124,58,237,0.8)]"></div>
      </div>
      <div className="absolute bottom-0 right-0 w-20 h-20 border-r-2 border-b-2 border-purple-700/20 opacity-50 group-hover:opacity-100 group-hover:border-purple-500/40 transition-all duration-300">
        <div className="absolute bottom-0 right-0 w-2 h-2 bg-purple-500/60 rotate-45 transform translate-x-1 translate-y-1 group-hover:bg-purple-400 group-hover:shadow-[0_0_8px_rgba(124,58,237,0.8)]"></div>
      </div>

      {/* Efecto de brillo general en hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-xl"></div>
    </article>
  );
};

export default ProductCard;