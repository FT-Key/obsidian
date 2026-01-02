"use client";

import React from 'react';
import { clsx } from 'clsx';

/**
 * Gothic Dark Button Component
 * Características góticas: bordes angulares, sombras profundas, efectos de brillo
 */
const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  className = '',
  icon: Icon,
  iconPosition = 'left',
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
  ...props 
}) => {
  
  const baseStyles = `
    relative inline-flex items-center justify-center gap-2
    font-semibold transition-all duration-300
    clip-path-gothic overflow-hidden
    disabled:opacity-50 disabled:cursor-not-allowed
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black
  `;

  const variants = {
    primary: `
      bg-gradient-to-br from-purple-600 via-purple-700 to-purple-900
      text-white border-2 border-purple-400/30
      shadow-[0_0_20px_rgba(124,58,237,0.3),inset_0_1px_0_rgba(255,255,255,0.1)]
      hover:shadow-[0_0_30px_rgba(124,58,237,0.6),inset_0_1px_0_rgba(255,255,255,0.2)]
      hover:border-purple-300/50 hover:scale-105
      active:scale-95
      focus:ring-purple-500
      before:absolute before:inset-0 before:bg-gradient-to-t before:from-transparent before:to-white/10
      after:absolute after:inset-0 after:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)]
      after:bg-[length:250%_250%] after:animate-shimmer
    `,
    secondary: `
      bg-gradient-to-br from-gray-800 via-gray-900 to-black
      text-gray-200 border-2 border-gray-600/50
      shadow-[0_0_15px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.05)]
      hover:shadow-[0_0_25px_rgba(100,100,100,0.4),inset_0_1px_0_rgba(255,255,255,0.1)]
      hover:border-gray-500/70 hover:text-white hover:scale-105
      active:scale-95
      focus:ring-gray-500
    `,
    danger: `
      bg-gradient-to-br from-red-700 via-red-800 to-red-950
      text-white border-2 border-red-500/40
      shadow-[0_0_20px_rgba(220,38,38,0.4),inset_0_1px_0_rgba(255,255,255,0.1)]
      hover:shadow-[0_0_30px_rgba(220,38,38,0.7),inset_0_1px_0_rgba(255,255,255,0.2)]
      hover:border-red-400/60 hover:scale-105
      active:scale-95
      focus:ring-red-500
    `,
    ghost: `
      bg-transparent text-purple-400 border-2 border-purple-700/50
      shadow-[0_0_10px_rgba(124,58,237,0.2),inset_0_0_10px_rgba(124,58,237,0.1)]
      hover:bg-purple-950/30 hover:border-purple-500/70
      hover:shadow-[0_0_20px_rgba(124,58,237,0.4)]
      hover:text-purple-300 hover:scale-105
      active:scale-95
      focus:ring-purple-500
    `,
    outline: `
      bg-transparent text-gray-300 border-2 border-gray-600/70
      shadow-[0_0_10px_rgba(100,100,100,0.2),inset_0_0_5px_rgba(255,255,255,0.05)]
      hover:bg-gray-900/50 hover:border-gray-400
      hover:text-white hover:scale-105
      active:scale-95
      focus:ring-gray-500
    `
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm min-h-[36px]',
    md: 'px-6 py-3 text-base min-h-[44px]',
    lg: 'px-8 py-4 text-lg min-h-[52px]',
    xl: 'px-10 py-5 text-xl min-h-[60px]'
  };

  const buttonClasses = clsx(
    baseStyles,
    variants[variant],
    sizes[size],
    className
  );

  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {/* Decoración gótica superior */}
      <span className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></span>
      
      {/* Decoración gótica inferior */}
      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/3 h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></span>

      {loading && (
        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      
      {!loading && Icon && iconPosition === 'left' && <Icon className="w-5 h-5" />}
      
      <span className="relative z-10">{children}</span>
      
      {!loading && Icon && iconPosition === 'right' && <Icon className="w-5 h-5" />}
    </button>
  );
};

export default Button;

// Estilos adicionales para el efecto shimmer (agregar al globals.css si no existe)
/*
@keyframes shimmer {
  0% { background-position: -250% 0; }
  100% { background-position: 250% 0; }
}

.animate-shimmer {
  animation: shimmer 3s infinite linear;
}
*/