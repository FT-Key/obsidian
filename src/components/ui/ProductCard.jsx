"use client";

import React from 'react';
import { clsx } from 'clsx';
import { ShoppingCart, Heart, Eye, Star } from 'lucide-react';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';

/**
 * ProductCard Component - Refinado con imagen sobresaliente
 */
const ProductCard = ({
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
  variant = 'default',
  imagePosition = 'float',
  imageSize = 'medium',
  hoverable = true,
  onAddToCart,
  onWishlist,
  onQuickView,
  className = '',
  imageClassName = '',
  imagePriority = false,
  imageSizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  ...props
}) => {

  const baseStyles = `
    relative rounded-xl overflow-visible
    transition-all duration-300
    group
    flex flex-col
    h-full
  `;

  const variants = {
    default: `
      bg-gradient-to-br from-[#1a1a1a] via-[#121212] to-[#0a0a0a]
      border border-[#2d2d2d]
      shadow-[0_6px_20px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.05)]
      ${hoverable ? 'hover:border-[#3a3a3a] hover:shadow-[0_8px_24px_rgba(0,0,0,0.8),0_0_15px_rgba(107,33,168,0.15)] hover:-translate-y-1' : ''}
    `,
    light: `
      bg-gradient-to-br from-[#e5e7eb] via-[#d1d5db] to-[#9ca3af]
      border border-[#6b7280]
      shadow-[0_6px_20px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.4)]
      ${hoverable ? 'hover:border-[#4b5563] hover:shadow-[0_8px_24px_rgba(0,0,0,0.7)] hover:-translate-y-1' : ''}
    `,
    elevated: `
      bg-gradient-to-br from-[#2d2d2d] via-[#242424] to-[#1a1a1a]
      border border-[#3a3a3a]
      shadow-[0_8px_24px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.08)]
      ${hoverable ? 'hover:border-[#4a4a4a] hover:shadow-[0_10px_28px_rgba(0,0,0,0.9),0_0_15px_rgba(107,33,168,0.2)] hover:-translate-y-1' : ''}
    `,
    glass: `
      bg-[#1a1a1a]/60 backdrop-blur-xl
      border border-[#2d2d2d]/70
      shadow-[0_6px_20px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.06)]
      ${hoverable ? 'hover:bg-[#1a1a1a]/80 hover:border-[#3a3a3a]/80 hover:shadow-[0_8px_24px_rgba(0,0,0,0.7),0_0_12px_rgba(107,33,168,0.15)]' : ''}
    `,
    premium: `
      bg-gradient-to-br from-[#2d1a2d] via-[#1a1a1a] to-[#0a0a0a]
      border border-[#6b21a8]/30
      shadow-[0_6px_20px_rgba(107,33,168,0.2),inset_0_1px_0_rgba(167,139,250,0.08)]
      ${hoverable ? 'hover:border-[#6b21a8]/50 hover:shadow-[0_8px_24px_rgba(107,33,168,0.3),0_0_15px_rgba(107,33,168,0.2)]' : ''}
    `
  };

  const cardClasses = clsx(
    baseStyles,
    variants[variant],
    className
  );

  const discountPercent = discount || (originalPrice && price ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0);

  return (
    <article 
      className={cardClasses}
      itemScope 
      itemType="https://schema.org/Product"
      {...props}
    >
      {/* Decoraciones góticas en esquinas superiores */}
      <div className={clsx(
        "absolute top-0 left-0 w-16 h-16 border-l border-t opacity-30 group-hover:opacity-50 transition-all duration-300 z-10",
        variant === 'light' ? 'border-[#6b7280]' : 'border-[#3a3a3a]'
      )}>
        <div className={clsx(
          "absolute top-0 left-0 w-[3px] h-[3px] rounded-full transform -translate-x-[1.5px] -translate-y-[1.5px]",
          variant === 'light' ? 'bg-gray-600/40 group-hover:bg-gray-600/60' : 'bg-white/15 group-hover:bg-white/25'
        )}></div>
      </div>
      <div className={clsx(
        "absolute top-0 right-0 w-16 h-16 border-r border-t opacity-30 group-hover:opacity-50 transition-all duration-300 z-10",
        variant === 'light' ? 'border-[#6b7280]' : 'border-[#3a3a3a]'
      )}>
        <div className={clsx(
          "absolute top-0 right-0 w-[3px] h-[3px] rounded-full transform translate-x-[1.5px] -translate-y-[1.5px]",
          variant === 'light' ? 'bg-gray-600/40 group-hover:bg-gray-600/60' : 'bg-white/15 group-hover:bg-white/25'
        )}></div>
      </div>

      {/* Badge con componente importado */}
      {(badge || discountPercent > 0) && (
        <div className="absolute top-4 left-4 z-20">
          <Badge variant="danger" size="sm">
            {badge || `-${discountPercent}%`}
          </Badge>
        </div>
      )}

      {/* Botones de acción */}
      <div className="absolute top-4 right-4 flex flex-col gap-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {onWishlist && (
          <button
            onClick={onWishlist}
            className="w-10 h-10 bg-[#1a1a1a]/90 backdrop-blur-sm border border-[#2d2d2d] rounded-lg flex items-center justify-center text-gray-400 hover:text-red-300 hover:border-[#7c2d12] hover:shadow-[0_0_10px_rgba(153,27,27,0.3)] transition-all duration-300"
            aria-label="Agregar a favoritos"
          >
            <Heart className="w-5 h-5" />
          </button>
        )}
        {onQuickView && (
          <button
            onClick={onQuickView}
            className="w-10 h-10 bg-[#1a1a1a]/90 backdrop-blur-sm border border-[#2d2d2d] rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-200 hover:border-[#3a3a3a] hover:shadow-[0_0_10px_rgba(107,33,168,0.2)] transition-all duration-300"
            aria-label="Vista rápida"
          >
            <Eye className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Contenedor de imagen con marco interno y clip-path */}
      <div className={clsx(
        'relative w-full flex-shrink-0 px-6 pt-6',
        imageSize === 'small' && 'h-40',
        imageSize === 'medium' && 'h-56', 
        imageSize === 'large' && 'h-72'
      )}>
        {/* Marco interior decorativo */}
        <div className="absolute inset-6 border-2 border-dashed border-[#3a3a3a]/30 rounded-lg group-hover:border-[#6b21a8]/30 transition-colors duration-500"></div>
        
        {/* Imagen con clip-path que sobresale */}
        <div 
          className={clsx(
            'relative w-full h-full',
            'group-hover:scale-105 transition-transform duration-500'
          )}
          style={{
            clipPath: 'polygon(10% 0%, 100% 5%, 95% 100%, 0% 90%)'
          }}
        >
          {/* Fondo con gradiente */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#2d2d2d]/30 via-transparent to-[#6b21a8]/10 rounded-lg opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
          
          {/* Imagen del producto */}
          <img
            src={image}
            alt={imageAlt}
            className={clsx(
              'w-full h-full object-contain',
              'drop-shadow-[0_8px_24px_rgba(0,0,0,0.6)]',
              'group-hover:drop-shadow-[0_10px_28px_rgba(107,33,168,0.4)]',
              'transition-all duration-500',
              imageClassName
            )}
            itemProp="image"
          />

          {/* Brillo decorativo */}
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
        </div>
      </div>

      {/* Línea decorativa divisoria */}
      <div className="relative my-4 mx-6 flex-shrink-0">
        <div className="h-[1px] bg-gradient-to-r from-transparent via-[#3a3a3a] to-transparent group-hover:via-[#6b21a8]/40 transition-colors duration-300"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[3px] h-[3px] bg-white/15 rounded-full shadow-[0_0_4px_rgba(255,255,255,0.2)] group-hover:bg-[#6b21a8]/60 group-hover:shadow-[0_0_8px_rgba(107,33,168,0.5)] transition-all duration-300"></div>
      </div>

      {/* Contenido del producto */}
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
          className={clsx(
            "text-lg font-bold mb-2 transition-colors duration-300 line-clamp-2 flex-shrink-0",
            variant === 'light' 
              ? 'text-gray-900 group-hover:text-black'
              : 'text-gray-100 group-hover:text-gray-50'
          )}
          itemProp="name"
        >
          {title}
        </h3>

        {/* Descripción */}
        {description && (
          <p 
            className={clsx(
              "text-sm mb-4 line-clamp-2 flex-grow",
              variant === 'light' ? 'text-gray-700' : 'text-gray-400'
            )}
            itemProp="description"
          >
            {description}
          </p>
        )}

        {!description && <div className="flex-grow"></div>}

        {/* Precio */}
        <div className="flex items-center gap-3 mb-4 flex-shrink-0" itemProp="offers" itemScope itemType="https://schema.org/Offer">
          <span 
            className={clsx(
              "text-2xl font-bold transition-colors",
              variant === 'light'
                ? 'text-gray-900 group-hover:text-black'
                : 'text-gray-100 group-hover:text-white'
            )}
            itemProp="price"
          >
            ${price}
          </span>
          {originalPrice && originalPrice > price && (
            <span className={clsx(
              "text-base line-through",
              variant === 'light' ? 'text-gray-500' : 'text-gray-600'
            )}>
              ${originalPrice}
            </span>
          )}
          <meta itemProp="priceCurrency" content="USD" />
          <meta itemProp="availability" content="https://schema.org/InStock" />
        </div>

        {/* Botón con componente importado - aislado del hover de la card */}
        {onAddToCart && (
          <div 
            className="relative z-20"
            onMouseEnter={(e) => e.stopPropagation()} 
            onMouseLeave={(e) => e.stopPropagation()}
            onMouseOver={(e) => e.stopPropagation()}
            onMouseOut={(e) => e.stopPropagation()}
          >
            <Button
              variant="primary"
              size="md"
              icon={ShoppingCart}
              onClick={onAddToCart}
              className="w-full pointer-events-auto"
            >
              Agregar al Carrito
            </Button>
          </div>
        )}
      </div>

      {/* Espaciado inferior */}
      <div className="pb-6"></div>

      {/* Decoraciones góticas inferiores */}
      <div className={clsx(
        "absolute bottom-0 left-0 w-16 h-16 border-l border-b opacity-30 group-hover:opacity-50 transition-all duration-300",
        variant === 'light' ? 'border-[#6b7280]' : 'border-[#3a3a3a]'
      )}>
        <div className={clsx(
          "absolute bottom-0 left-0 w-[3px] h-[3px] rounded-full transform -translate-x-[1.5px] translate-y-[1.5px]",
          variant === 'light' ? 'bg-gray-600/40 group-hover:bg-gray-600/60' : 'bg-white/15 group-hover:bg-white/25'
        )}></div>
      </div>
      <div className={clsx(
        "absolute bottom-0 right-0 w-16 h-16 border-r border-b opacity-30 group-hover:opacity-50 transition-all duration-300",
        variant === 'light' ? 'border-[#6b7280]' : 'border-[#3a3a3a]'
      )}>
        <div className={clsx(
          "absolute bottom-0 right-0 w-[3px] h-[3px] rounded-full transform translate-x-[1.5px] translate-y-[1.5px]",
          variant === 'light' ? 'bg-gray-600/40 group-hover:bg-gray-600/60' : 'bg-white/15 group-hover:bg-white/25'
        )}></div>
      </div>

      {/* Efecto de brillo general */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-xl"></div>
    </article>
  );
};

export default ProductCard;