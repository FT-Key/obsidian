"use client";

import React from 'react';
import { clsx } from 'clsx';

/**
 * Gothic Dark Badge Component
 * Características góticas: forma de escudo/blasón, bordes metálicos, efectos de joya
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
    inline-flex items-center gap-2 font-semibold
    transition-all duration-300 relative
    clip-path-badge
  `;

  const variants = {
    default: `
      bg-gradient-to-br from-gray-800 via-gray-900 to-black
      text-gray-300 border-2 border-gray-700/50
      shadow-[0_4px_12px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)]
      hover:border-gray-600/70 hover:text-gray-100
    `,
    primary: `
      bg-gradient-to-br from-purple-700 via-purple-800 to-purple-950
      text-white border-2 border-purple-500/40
      shadow-[0_4px_12px_rgba(124,58,237,0.4),inset_0_1px_0_rgba(255,255,255,0.15)]
      hover:shadow-[0_6px_16px_rgba(124,58,237,0.6)]
      ${glow ? 'shadow-[0_0_20px_rgba(124,58,237,0.6)]' : ''}
    `,
    success: `
      bg-gradient-to-br from-emerald-700 via-emerald-800 to-emerald-950
      text-white border-2 border-emerald-500/40
      shadow-[0_4px_12px_rgba(16,185,129,0.4),inset_0_1px_0_rgba(255,255,255,0.15)]
      hover:shadow-[0_6px_16px_rgba(16,185,129,0.6)]
      ${glow ? 'shadow-[0_0_20px_rgba(16,185,129,0.6)]' : ''}
    `,
    danger: `
      bg-gradient-to-br from-red-700 via-red-800 to-red-950
      text-white border-2 border-red-500/40
      shadow-[0_4px_12px_rgba(220,38,38,0.4),inset_0_1px_0_rgba(255,255,255,0.15)]
      hover:shadow-[0_6px_16px_rgba(220,38,38,0.6)]
      ${glow ? 'shadow-[0_0_20px_rgba(220,38,38,0.6)]' : ''}
    `,
    warning: `
      bg-gradient-to-br from-amber-700 via-amber-800 to-amber-950
      text-white border-2 border-amber-500/40
      shadow-[0_4px_12px_rgba(245,158,11,0.4),inset_0_1px_0_rgba(255,255,255,0.15)]
      hover:shadow-[0_6px_16px_rgba(245,158,11,0.6)]
      ${glow ? 'shadow-[0_0_20px_rgba(245,158,11,0.6)]' : ''}
    `,
    ghost: `
      bg-transparent text-purple-400
      border-2 border-purple-800/50
      shadow-[0_0_10px_rgba(124,58,237,0.2),inset_0_0_10px_rgba(124,58,237,0.1)]
      hover:bg-purple-950/30 hover:border-purple-600/70
      ${glow ? 'shadow-[0_0_20px_rgba(124,58,237,0.4)]' : ''}
    `,
    outline: `
      bg-transparent text-gray-300
      border-2 border-gray-700/50
      shadow-[0_0_8px_rgba(100,100,100,0.2)]
      hover:bg-gray-900/40 hover:border-gray-600/70 hover:text-white
    `
  };

  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  const badgeClasses = clsx(
    baseStyles,
    variants[variant],
    sizes[size],
    className
  );

  return (
    <span className={badgeClasses} {...props}>
      {/* Decoración superior de escudo */}
      <span className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent"></span>
      
      {/* Punto decorativo superior central (como una joya) */}
      <span className="absolute -top-[3px] left-1/2 -translate-x-1/2 w-1 h-1 bg-white/50 rounded-full shadow-[0_0_4px_rgba(255,255,255,0.8)]"></span>

      {Icon && iconPosition === 'left' && (
        <Icon className={clsx(
          'flex-shrink-0',
          size === 'sm' ? 'w-3 h-3' : size === 'md' ? 'w-4 h-4' : 'w-5 h-5'
        )} />
      )}

      <span className="relative z-10">{children}</span>

      {Icon && iconPosition === 'right' && (
        <Icon className={clsx(
          'flex-shrink-0',
          size === 'sm' ? 'w-3 h-3' : size === 'md' ? 'w-4 h-4' : 'w-5 h-5'
        )} />
      )}

      {removable && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove?.();
          }}
          className="ml-1 hover:text-white transition-colors flex-shrink-0"
          aria-label="Remove"
        >
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      )}

      {/* Decoración inferior de escudo */}
      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/3 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></span>
    </span>
  );
};

export default Badge;