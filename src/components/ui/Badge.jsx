"use client";

import React from 'react';
import { clsx } from 'clsx';

/**
 * Gothic Dark Badge Component - Sin Metalizado
 * Diseño gótico oscuro con colores planos y sutiles
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
    rounded-md
  `;

  const variants = {
    // Badge por defecto - Gris oscuro simple
    default: `
      bg-[#1f1f1f]
      text-gray-300 border border-[#2d2d2d]
      hover:bg-[#252525] hover:border-[#353535]
      hover:text-gray-100
      ${glow ? 'shadow-[0_0_15px_rgba(255,255,255,0.1)]' : 'shadow-sm'}
    `,
    
    // Badge primario - Blanco/gris claro
    primary: `
      bg-[#e5e7eb]
      text-gray-900 border border-[#d1d5db]
      hover:bg-[#f3f4f6] hover:border-[#c2c6cc]
      ${glow ? 'shadow-[0_0_20px_rgba(229,231,235,0.4)]' : 'shadow-sm'}
    `,
    
    // Badge secundario - Morado amatista (color principal)
    secondary: `
      bg-[#6b21a8]
      text-white border border-[#4c1d95]
      hover:bg-[#7c3aed] hover:border-[#6b21a8]
      ${glow ? 'shadow-[0_0_20px_rgba(107,33,168,0.5)]' : 'shadow-sm'}
    `,
    
    // Badge de éxito - Verde esmeralda
    success: `
      bg-[#059669]
      text-white border border-[#047857]
      hover:bg-[#10b981] hover:border-[#059669]
      ${glow ? 'shadow-[0_0_20px_rgba(16,185,129,0.4)]' : 'shadow-sm'}
    `,
    
    // Badge de peligro - Rojo vino
    danger: `
      bg-[#991b1b]
      text-white border border-[#7f1d1d]
      hover:bg-[#b91c1c] hover:border-[#991b1b]
      ${glow ? 'shadow-[0_0_20px_rgba(220,38,38,0.4)]' : 'shadow-sm'}
    `,
    
    // Badge de advertencia - Naranja
    warning: `
      bg-[#ea580c]
      text-white border border-[#c2410c]
      hover:bg-[#f97316] hover:border-[#ea580c]
      ${glow ? 'shadow-[0_0_20px_rgba(249,115,22,0.4)]' : 'shadow-sm'}
    `,
    
    // Badge info - Cyan
    info: `
      bg-[#0891b2]
      text-white border border-[#0e7490]
      hover:bg-[#06b6d4] hover:border-[#0891b2]
      ${glow ? 'shadow-[0_0_20px_rgba(6,182,212,0.4)]' : 'shadow-sm'}
    `,
    
    // Badge fantasma - Transparente
    ghost: `
      bg-transparent text-gray-400
      border border-[#2d2d2d]
      hover:bg-[#1a1a1a]/40 hover:border-[#3a3a3a]
      hover:text-gray-200
      ${glow ? 'shadow-[0_0_15px_rgba(107,33,168,0.2)]' : ''}
    `,
    
    // Badge outline - Solo bordes
    outline: `
      bg-transparent text-gray-300
      border border-[#3a3a3a]
      hover:bg-[#1a1a1a]/50 hover:border-[#4a4a4a] 
      hover:text-white
    `
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base'
  };

  // Colores de decoración según variante
  const decorationColors = {
    default: 'bg-white/20',
    primary: 'bg-gray-500/40',
    secondary: 'bg-purple-500/40',
    success: 'bg-emerald-400/50',
    danger: 'bg-red-400/50',
    warning: 'bg-orange-400/50',
    info: 'bg-cyan-400/50',
    ghost: 'bg-purple-500/30',
    outline: 'bg-white/20'
  };

  const badgeClasses = clsx(
    baseStyles,
    variants[variant],
    sizes[size],
    className
  );

  return (
    <span className={badgeClasses} {...props}>
      {/* Punto decorativo superior */}
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
    </span>
  );
};

export default Badge;