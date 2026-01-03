"use client";

import React from 'react';
import { clsx } from 'clsx';

/**
 * Gothic Dark Card Component - Versión Refinada
 * Base oscura elegante con decoraciones góticas sutiles
 * NO neon, sino medieval con metales
 */
const Card = ({
  children,
  title,
  subtitle,
  description,
  image,
  icon: Icon,
  variant = 'default',
  hoverable = true,
  className = '',
  headerClassName = '',
  bodyClassName = '',
  footerClassName = '',
  footer,
  onClick,
  ...props
}) => {

  const baseStyles = `
    relative rounded-lg overflow-hidden
    transition-all duration-300
    group
  `;

  const variants = {
    // Default - Base negra con detalles grises
    default: `
      bg-gradient-to-br from-[#1a1a1a] via-[#121212] to-[#0a0a0a]
      border border-[#2d2d2d]
      shadow-[0_4px_16px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.05)]
      ${hoverable ? 'hover:border-[#3a3a3a] hover:shadow-[0_6px_20px_rgba(0,0,0,0.8),0_0_15px_rgba(107,33,168,0.15)] hover:scale-[1.01]' : ''}
    `,
    
    // Light - Base clara que contrasta con fondo oscuro
    light: `
      bg-gradient-to-br from-[#e5e7eb] via-[#d1d5db] to-[#9ca3af]
      border border-[#6b7280]
      shadow-[0_4px_16px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.4)]
      ${hoverable ? 'hover:border-[#4b5563] hover:shadow-[0_6px_20px_rgba(0,0,0,0.7)] hover:scale-[1.01]' : ''}
    `,
    
    // Elevated - Un poco más claro
    elevated: `
      bg-gradient-to-br from-[#2d2d2d] via-[#242424] to-[#1a1a1a]
      border border-[#3a3a3a]
      shadow-[0_6px_20px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.08)]
      ${hoverable ? 'hover:border-[#4a4a4a] hover:shadow-[0_8px_24px_rgba(0,0,0,0.9),0_0_15px_rgba(107,33,168,0.2)] hover:-translate-y-1' : ''}
    `,
    
    // Glass - Efecto vidrio oscuro
    glass: `
      bg-[#1a1a1a]/60 backdrop-blur-xl
      border border-[#2d2d2d]/70
      shadow-[0_4px_16px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.06)]
      ${hoverable ? 'hover:bg-[#1a1a1a]/80 hover:border-[#3a3a3a]/80 hover:shadow-[0_6px_20px_rgba(0,0,0,0.7),0_0_12px_rgba(107,33,168,0.15)]' : ''}
    `,
    
    // Outlined - Transparente con bordes
    outlined: `
      bg-transparent backdrop-blur-sm
      border border-[#3a3a3a]
      shadow-[0_0_12px_rgba(0,0,0,0.5),inset_0_0_12px_rgba(107,33,168,0.05)]
      ${hoverable ? 'hover:border-[#4a4a4a] hover:shadow-[0_0_16px_rgba(107,33,168,0.2)] hover:bg-[#1a1a1a]/30' : ''}
    `,
    
    // Danger - Para contenido crítico
    danger: `
      bg-gradient-to-br from-[#1a0f0f] via-[#121212] to-[#0a0a0a]
      border border-[#7c2d12]
      shadow-[0_4px_16px_rgba(153,27,27,0.4),inset_0_1px_0_rgba(255,100,100,0.08)]
      ${hoverable ? 'hover:border-[#991b1b] hover:shadow-[0_6px_20px_rgba(220,38,38,0.5)]' : ''}
    `,
    
    // Success - Para contenido positivo
    success: `
      bg-gradient-to-br from-[#0f1a0f] via-[#121212] to-[#0a0a0a]
      border border-[#166534]
      shadow-[0_4px_16px_rgba(16,185,129,0.3),inset_0_1px_0_rgba(100,255,150,0.06)]
      ${hoverable ? 'hover:border-[#059669] hover:shadow-[0_6px_20px_rgba(16,185,129,0.4)]' : ''}
    `
  };

  const cardClasses = clsx(
    baseStyles,
    variants[variant],
    onClick && 'cursor-pointer',
    className
  );

  // Colores de decoración según variante
  const decorationColors = {
    default: { border: 'border-[#3a3a3a]', dot: 'bg-white/15', glow: 'shadow-[0_0_4px_rgba(255,255,255,0.2)]' },
    light: { border: 'border-[#6b7280]', dot: 'bg-gray-600/40', glow: 'shadow-[0_0_4px_rgba(107,114,128,0.5)]' },
    elevated: { border: 'border-[#4a4a4a]', dot: 'bg-white/20', glow: 'shadow-[0_0_4px_rgba(255,255,255,0.3)]' },
    glass: { border: 'border-[#3a3a3a]/50', dot: 'bg-purple-400/20', glow: 'shadow-[0_0_4px_rgba(107,33,168,0.4)]' },
    outlined: { border: 'border-[#4a4a4a]', dot: 'bg-purple-400/25', glow: 'shadow-[0_0_5px_rgba(107,33,168,0.5)]' },
    danger: { border: 'border-[#7c2d12]', dot: 'bg-red-400/30', glow: 'shadow-[0_0_5px_rgba(220,38,38,0.5)]' },
    success: { border: 'border-[#166534]', dot: 'bg-emerald-400/30', glow: 'shadow-[0_0_5px_rgba(16,185,129,0.5)]' }
  };

  const colors = decorationColors[variant] || decorationColors.default;

  return (
    <div 
      className={cardClasses}
      onClick={onClick}
      {...props}
    >
      {/* Decoración gótica superior izquierda - MÁS SUTIL */}
      <div className={clsx(
        'absolute top-0 left-0 w-12 h-12 border-l border-t',
        colors.border,
        'opacity-30 group-hover:opacity-60 transition-opacity duration-300'
      )}>
        <div className={clsx(
          'absolute top-0 left-0 w-[3px] h-[3px] rounded-full',
          colors.dot,
          colors.glow,
          'transform -translate-x-[1.5px] -translate-y-[1.5px]'
        )}></div>
      </div>

      {/* Decoración gótica superior derecha */}
      <div className={clsx(
        'absolute top-0 right-0 w-12 h-12 border-r border-t',
        colors.border,
        'opacity-30 group-hover:opacity-60 transition-opacity duration-300'
      )}>
        <div className={clsx(
          'absolute top-0 right-0 w-[3px] h-[3px] rounded-full',
          colors.dot,
          colors.glow,
          'transform translate-x-[1.5px] -translate-y-[1.5px]'
        )}></div>
      </div>

      {/* Decoración gótica inferior izquierda */}
      <div className={clsx(
        'absolute bottom-0 left-0 w-12 h-12 border-l border-b',
        colors.border,
        'opacity-30 group-hover:opacity-60 transition-opacity duration-300'
      )}>
        <div className={clsx(
          'absolute bottom-0 left-0 w-[3px] h-[3px] rounded-full',
          colors.dot,
          colors.glow,
          'transform -translate-x-[1.5px] translate-y-[1.5px]'
        )}></div>
      </div>

      {/* Decoración gótica inferior derecha */}
      <div className={clsx(
        'absolute bottom-0 right-0 w-12 h-12 border-r border-b',
        colors.border,
        'opacity-30 group-hover:opacity-60 transition-opacity duration-300'
      )}>
        <div className={clsx(
          'absolute bottom-0 right-0 w-[3px] h-[3px] rounded-full',
          colors.dot,
          colors.glow,
          'transform translate-x-[1.5px] translate-y-[1.5px]'
        )}></div>
      </div>

      {/* Línea decorativa central superior - MUY SUTIL */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:via-white/20 transition-colors duration-300"></div>

      {/* Imagen */}
      {image && (
        <div className="relative w-full h-48 overflow-hidden">
          <img 
            src={image} 
            alt={title || 'Card image'} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
        </div>
      )}

      {/* Header con icono */}
      {(title || Icon) && (
        <div className={clsx('relative p-6', headerClassName)}>
          {Icon && (
            <div className={clsx(
              "mb-4 flex items-center justify-center w-12 h-12 rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.08)]",
              variant === 'light' 
                ? 'bg-gradient-to-br from-[#9ca3af] to-[#6b7280] border border-[#4b5563]'
                : 'bg-gradient-to-br from-[#2d2d2d] to-[#1a1a1a] border border-[#3a3a3a]'
            )}>
              <Icon className={clsx(
                "w-6 h-6",
                variant === 'light' ? 'text-gray-900' : 'text-gray-300'
              )} />
            </div>
          )}
          
          {title && (
            <h3 className={clsx(
              "text-2xl font-bold mb-2 transition-colors duration-300",
              variant === 'light' ? 'text-gray-900 group-hover:text-gray-900' : 'text-gray-100 group-hover:text-gray-50'
            )}>
              {title}
            </h3>
          )}
          
          {subtitle && (
            <p className={clsx(
              "text-sm font-semibold uppercase tracking-wider",
              variant === 'light' ? 'text-gray-600' : 'text-gray-400'
            )}>
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Body */}
      <div className={clsx('relative px-6', !footer && 'pb-6', bodyClassName)}>
        {description && (
          <p className={clsx(
            "leading-relaxed",
            variant === 'light' ? 'text-gray-700' : 'text-gray-400'
          )}>
            {description}
          </p>
        )}
        {children}
      </div>

      {/* Footer */}
      {footer && (
        <div className={clsx('relative p-6 border-t border-[#2d2d2d] bg-black/30', footerClassName)}>
          {footer}
        </div>
      )}

      {/* Efecto de brillo sutil en hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
    </div>
  );
};

export default Card;