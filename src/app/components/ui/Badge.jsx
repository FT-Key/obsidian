"use client";

import React from 'react';
import { clsx } from 'clsx';

/**
 * Gothic Dark Badge Component - Versión Ajustada Final
 * Primary: Blanco grisáceo
 * Secondary: Grisáceo con morado
 * Danger: Rojo vino
 * Success: Verde
 * Warning: Naranja
 * Hover: Sombras suavizadas (no neon intenso)
 */
const Badge = ({
  children,
  variant = 'default',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  className = '',
  glow = false,
  removable = false,
  onRemove,
  ...props
}) => {

  const baseStyles = `
    inline-flex items-center gap-1.5 font-semibold
    transition-all duration-300 relative
    clip-path-badge
  `;

  const variants = {
    // Badge por defecto - Gris metálico neutral
    default: `
      bg-gradient-to-br from-[#2d2d2d] via-[#242424] to-[#1a1a1a]
      text-gray-300 border border-[#3a3a3a]
      shadow-[0_2px_6px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.08)]
      hover:border-[#4a4a4a] hover:text-gray-100
      hover:shadow-[0_2px_8px_rgba(0,0,0,0.7),0_0_8px_rgba(255,255,255,0.08)]
    `,
    
    // Badge primario - BLANCO GRISÁCEO con bordes oscuros
    primary: `
      bg-gradient-to-br from-[#e5e7eb] via-[#d1d5db] to-[#9ca3af]
      text-gray-900 border border-[#6b7280]
      shadow-[0_2px_6px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.4)]
      hover:shadow-[0_2px_8px_rgba(0,0,0,0.6),0_0_8px_rgba(0,0,0,0.15)]
      hover:border-[#4b5563] hover:from-[#f3f4f6]
      ${glow ? 'shadow-[0_0_12px_rgba(0,0,0,0.3)]' : ''}
    `,
    
    // Badge secundario - GRISÁCEO CLARO con decoraciones MORADAS
    secondary: `
      bg-gradient-to-br from-[#d1d5db] via-[#9ca3af] to-[#6b7280]
      text-gray-900 border border-[#4b5563]
      shadow-[0_2px_6px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.3),0_0_0_1px_rgba(107,33,168,0.25)]
      hover:shadow-[0_2px_8px_rgba(107,33,168,0.3),0_0_10px_rgba(107,33,168,0.2)]
      hover:border-[#6b21a8]/40 hover:from-[#e5e7eb]
      ${glow ? 'shadow-[0_0_12px_rgba(107,33,168,0.3)]' : ''}
    `,
    
    // Badge de éxito - Base oscura con VERDE
    success: `
      bg-gradient-to-br from-[#065f46] via-[#047857] to-[#064e3b]
      text-emerald-100 border border-[#059669]
      shadow-[0_2px_6px_rgba(16,185,129,0.4),inset_0_1px_0_rgba(110,231,183,0.12),0_0_0_1px_rgba(16,185,129,0.25)]
      hover:shadow-[0_2px_8px_rgba(16,185,129,0.5),0_0_10px_rgba(16,185,129,0.25)]
      hover:border-emerald-500/60 hover:text-white
      ${glow ? 'shadow-[0_0_12px_rgba(16,185,129,0.35)]' : ''}
    `,
    
    // Badge de peligro - ROJO VINO
    danger: `
      bg-gradient-to-br from-[#7c2d12] via-[#991b1b] to-[#7f1d1d]
      text-red-100 border border-[#991b1b]
      shadow-[0_2px_6px_rgba(153,27,27,0.5),inset_0_1px_0_rgba(255,100,100,0.12),0_0_0_1px_rgba(220,38,38,0.3)]
      hover:shadow-[0_2px_8px_rgba(220,38,38,0.6),0_0_10px_rgba(220,38,38,0.25)]
      hover:border-red-700/60 hover:text-white
      ${glow ? 'shadow-[0_0_12px_rgba(220,38,38,0.4)]' : ''}
    `,
    
    // Badge de advertencia - NARANJA/ÁMBAR
    warning: `
      bg-gradient-to-br from-[#c2410c] via-[#ea580c] to-[#9a3412]
      text-orange-100 border border-[#ea580c]
      shadow-[0_2px_6px_rgba(234,88,12,0.4),inset_0_1px_0_rgba(253,186,116,0.12),0_0_0_1px_rgba(249,115,22,0.25)]
      hover:shadow-[0_2px_8px_rgba(249,115,22,0.5),0_0_10px_rgba(249,115,22,0.25)]
      hover:border-orange-600/60 hover:text-white
      ${glow ? 'shadow-[0_0_12px_rgba(249,115,22,0.35)]' : ''}
    `,
    
    // Badge info - Azul cyan con base oscura
    info: `
      bg-gradient-to-br from-[#0e7490] via-[#0891b2] to-[#155e75]
      text-cyan-100 border border-[#06b6d4]
      shadow-[0_2px_6px_rgba(6,182,212,0.4),inset_0_1px_0_rgba(165,243,252,0.12),0_0_0_1px_rgba(6,182,212,0.25)]
      hover:shadow-[0_2px_8px_rgba(6,182,212,0.5),0_0_10px_rgba(6,182,212,0.25)]
      hover:border-cyan-500/60 hover:text-white
      ${glow ? 'shadow-[0_0_12px_rgba(6,182,212,0.35)]' : ''}
    `,
    
    // Badge fantasma - Transparente con toque púrpura
    ghost: `
      bg-transparent text-gray-400
      border border-[#2d2d2d]
      shadow-[0_0_6px_rgba(0,0,0,0.4),inset_0_0_6px_rgba(107,33,168,0.08)]
      hover:bg-[#1a1a1a]/40 hover:border-[#3a3a3a]
      hover:text-gray-200
      hover:shadow-[0_0_8px_rgba(107,33,168,0.15)]
      ${glow ? 'shadow-[0_0_10px_rgba(107,33,168,0.25)]' : ''}
    `,
    
    // Badge outline - Solo bordes neutrales
    outline: `
      bg-transparent text-gray-300
      border border-[#3a3a3a]
      shadow-[0_0_4px_rgba(0,0,0,0.3)]
      hover:bg-[#1a1a1a]/50 hover:border-[#4a4a4a] hover:text-white
      hover:shadow-[0_0_6px_rgba(255,255,255,0.08)]
    `
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base'
  };

  // Colores de decoración según variante - SUTILES
  const decorationColors = {
    default: 'bg-white/15 shadow-[0_0_3px_rgba(255,255,255,0.3)]',
    primary: 'bg-gray-400/40 shadow-[0_0_4px_rgba(156,163,175,0.5)]',
    secondary: 'bg-purple-500/30 shadow-[0_0_5px_rgba(107,33,168,0.5)]',
    success: 'bg-emerald-400/35 shadow-[0_0_5px_rgba(16,185,129,0.5)]',
    danger: 'bg-red-400/35 shadow-[0_0_5px_rgba(220,38,38,0.5)]',
    warning: 'bg-orange-400/35 shadow-[0_0_5px_rgba(249,115,22,0.5)]',
    info: 'bg-cyan-400/35 shadow-[0_0_5px_rgba(6,182,212,0.5)]',
    ghost: 'bg-purple-500/20 shadow-[0_0_4px_rgba(107,33,168,0.4)]',
    outline: 'bg-white/15 shadow-[0_0_3px_rgba(255,255,255,0.3)]'
  };

  // Color de la línea superior según variante
  const topLineColors = {
    default: 'via-white/15',
    primary: 'via-gray-400/25',
    secondary: 'via-purple-400/25',
    success: 'via-emerald-400/25',
    danger: 'via-red-400/25',
    warning: 'via-orange-400/25',
    info: 'via-cyan-400/25',
    ghost: 'via-purple-400/20',
    outline: 'via-white/15'
  };

  const badgeClasses = clsx(
    baseStyles,
    variants[variant],
    sizes[size],
    className
  );

  return (
    <span className={badgeClasses} {...props}>
      {/* Decoración superior con color según variante - MUY SUTIL */}
      <span className={clsx(
        "absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-[1px]",
        "bg-gradient-to-r from-transparent to-transparent",
        topLineColors[variant]
      )}></span>
      
      {/* Punto decorativo superior - Color según variante SUTIL */}
      <span className={clsx(
        "absolute -top-[2px] left-1/2 -translate-x-1/2 w-[3px] h-[3px] rounded-full",
        decorationColors[variant]
      )}></span>

      {Icon && iconPosition === 'left' && (
        <Icon className={clsx(
          'flex-shrink-0',
          size === 'sm' ? 'w-3 h-3' : size === 'md' ? 'w-3.5 h-3.5' : 'w-4 h-4'
        )} />
      )}

      <span className="relative z-10">{children}</span>

      {Icon && iconPosition === 'right' && (
        <Icon className={clsx(
          'flex-shrink-0',
          size === 'sm' ? 'w-3 h-3' : size === 'md' ? 'w-3.5 h-3.5' : 'w-4 h-4'
        )} />
      )}

      {removable && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove?.();
          }}
          className="ml-1 hover:text-white transition-colors flex-shrink-0 opacity-60 hover:opacity-100"
          aria-label="Remove"
        >
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path 
              fillRule="evenodd" 
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" 
              clipRule="evenodd" 
            />
          </svg>
        </button>
      )}

      {/* Decoración inferior sutil - neutral */}
      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/4 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></span>
    </span>
  );
};

export default Badge;