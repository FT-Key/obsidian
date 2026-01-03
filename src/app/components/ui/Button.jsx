"use client";

import React from 'react';
import { clsx } from 'clsx';

/**
 * Gothic Dark Button Component - Versión Ajustada Final
 * Primary: Blanco grisáceo con bordes oscuros
 * Secondary: Grisáceo con decoraciones moradas
 * Danger: Rojo vino oscuro
 * Success: Verde sutil
 * Warning: Naranja/ámbar
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
    disabled:opacity-40 disabled:cursor-not-allowed
    focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-offset-black
  `;

  const variants = {
    // Botón principal - BLANCO GRISÁCEO con bordes oscuros
    primary: `
      bg-gradient-to-b from-[#e5e7eb] via-[#d1d5db] to-[#9ca3af]
      text-gray-900 border border-[#6b7280]
      shadow-[0_2px_8px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.5)]
      hover:shadow-[0_4px_12px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.6)]
      hover:border-[#4b5563] hover:from-[#f3f4f6] hover:scale-[1.02]
      active:scale-[0.98] active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]
      focus:ring-gray-400
      before:absolute before:inset-0 
      before:bg-gradient-to-t before:from-transparent before:to-white/20
      after:absolute after:inset-0 
      after:bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.2)_50%,transparent_100%)]
      after:bg-[length:200%_100%] after:animate-metal-sheen
    `,
    
    // Botón secundario - GRISÁCEO CLARO con decoraciones MORADAS
    secondary: `
      bg-gradient-to-b from-[#d1d5db] via-[#9ca3af] to-[#6b7280]
      text-gray-900 border border-[#4b5563]
      shadow-[0_2px_8px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.3),0_0_0_1px_rgba(107,33,168,0.3)]
      hover:shadow-[0_4px_12px_rgba(107,33,168,0.4),inset_0_1px_0_rgba(255,255,255,0.4),0_0_20px_rgba(107,33,168,0.3)]
      hover:border-[#6b21a8]/50 hover:from-[#e5e7eb] hover:scale-[1.02]
      active:scale-[0.98]
      focus:ring-purple-900
      before:absolute before:inset-0 
      before:bg-gradient-to-t before:from-transparent before:via-transparent before:to-purple-500/10
    `,
    
    // Botón de peligro - ROJO VINO OSCURO
    danger: `
      bg-gradient-to-b from-[#7c2d12] via-[#991b1b] to-[#7f1d1d]
      text-red-100 border border-[#991b1b]
      shadow-[0_2px_8px_rgba(153,27,27,0.6),inset_0_1px_0_rgba(255,100,100,0.15),0_0_0_1px_rgba(220,38,38,0.4)]
      hover:shadow-[0_4px_12px_rgba(220,38,38,0.7),inset_0_1px_0_rgba(255,100,100,0.2),0_0_25px_rgba(220,38,38,0.4)]
      hover:border-red-700/70 hover:text-white hover:scale-[1.02]
      active:scale-[0.98]
      focus:ring-red-900
      before:absolute before:inset-0 
      before:bg-gradient-to-t before:from-transparent before:via-transparent before:to-red-500/15
    `,
    
    // Botón de éxito - Base oscura con VERDE SUTIL
    success: `
      bg-gradient-to-b from-[#065f46] via-[#047857] to-[#064e3b]
      text-emerald-100 border border-[#059669]
      shadow-[0_2px_8px_rgba(16,185,129,0.5),inset_0_1px_0_rgba(110,231,183,0.15),0_0_0_1px_rgba(16,185,129,0.3)]
      hover:shadow-[0_4px_12px_rgba(16,185,129,0.6),inset_0_1px_0_rgba(110,231,183,0.2),0_0_25px_rgba(16,185,129,0.4)]
      hover:border-emerald-500/70 hover:text-white hover:scale-[1.02]
      active:scale-[0.98]
      focus:ring-emerald-900
      before:absolute before:inset-0 
      before:bg-gradient-to-t before:from-transparent before:via-transparent before:to-emerald-500/15
    `,
    
    // Botón de advertencia - NARANJA/ÁMBAR
    warning: `
      bg-gradient-to-b from-[#c2410c] via-[#ea580c] to-[#9a3412]
      text-orange-100 border border-[#ea580c]
      shadow-[0_2px_8px_rgba(234,88,12,0.5),inset_0_1px_0_rgba(253,186,116,0.15),0_0_0_1px_rgba(249,115,22,0.3)]
      hover:shadow-[0_4px_12px_rgba(249,115,22,0.6),inset_0_1px_0_rgba(253,186,116,0.2),0_0_25px_rgba(249,115,22,0.4)]
      hover:border-orange-600/70 hover:text-white hover:scale-[1.02]
      active:scale-[0.98]
      focus:ring-orange-900
      before:absolute before:inset-0 
      before:bg-gradient-to-t before:from-transparent before:via-transparent before:to-orange-500/15
    `,
    
    // Botón fantasma - Transparente con bordes sutiles
    ghost: `
      bg-transparent text-gray-400 border border-[#2d2d2d]
      shadow-[0_0_6px_rgba(0,0,0,0.4),inset_0_0_8px_rgba(255,255,255,0.02)]
      hover:bg-[#1a1a1a]/50 hover:border-[#4a4a4a]
      hover:shadow-[0_0_10px_rgba(107,33,168,0.15)]
      hover:text-gray-200 hover:scale-[1.02]
      active:scale-[0.98]
      focus:ring-gray-700
    `,
    
    // Botón outline - Solo bordes, elegante
    outline: `
      bg-transparent text-gray-300 border border-[#3a3a3a]
      shadow-[0_0_8px_rgba(0,0,0,0.3),inset_0_0_4px_rgba(255,255,255,0.03)]
      hover:bg-[#1a1a1a]/60 hover:border-[#4a4a4a]
      hover:text-white hover:scale-[1.02]
      active:scale-[0.98]
      focus:ring-gray-600
    `,
    
    // Botón de vidrio - Efecto glassmorphism oscuro
    glass: `
      bg-gradient-to-b from-[#1a1a1a]/70 to-[#0a0a0a]/70
      backdrop-blur-md text-gray-300 border border-[#3a3a3a]/50
      shadow-[0_4px_16px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.06)]
      hover:border-[#4a4a4a]/70 hover:text-white hover:scale-[1.02]
      hover:shadow-[0_6px_20px_rgba(107,33,168,0.1)]
      active:scale-[0.98]
      focus:ring-gray-600
    `
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm min-h-[36px]',
    md: 'px-6 py-2.5 text-base min-h-[42px]',
    lg: 'px-8 py-3 text-lg min-h-[48px]',
    xl: 'px-10 py-4 text-xl min-h-[56px]'
  };

  // Decoraciones de color según variante
  const decorationColors = {
    primary: 'via-gray-400/20',
    secondary: 'via-purple-500/25',
    danger: 'via-red-500/30',
    success: 'via-emerald-500/30',
    warning: 'via-orange-500/30',
    ghost: 'via-purple-500/15',
    outline: 'via-white/15',
    glass: 'via-purple-500/15'
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
      {/* Decoración gótica superior con color según variante */}
      <span className={clsx(
        "absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-[1px]",
        "bg-gradient-to-r from-transparent to-transparent",
        decorationColors[variant]
      )}></span>
      
      {/* Punto decorativo superior izquierdo */}
      <span className="absolute top-1 left-2 w-[2px] h-[2px] bg-white/20 rounded-full"></span>
      
      {/* Punto decorativo superior derecho */}
      <span className="absolute top-1 right-2 w-[2px] h-[2px] bg-white/20 rounded-full"></span>

      {loading && (
        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
          <circle 
            className="opacity-20" 
            cx="12" 
            cy="12" 
            r="10" 
            stroke="currentColor" 
            strokeWidth="3" 
            fill="none" 
          />
          <path 
            className="opacity-75" 
            fill="currentColor" 
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" 
          />
        </svg>
      )}
      
      {!loading && Icon && iconPosition === 'left' && (
        <Icon className="w-5 h-5 flex-shrink-0" />
      )}
      
      <span className="relative z-10">{children}</span>
      
      {!loading && Icon && iconPosition === 'right' && (
        <Icon className="w-5 h-5 flex-shrink-0" />
      )}

      {/* Decoración gótica inferior con color según variante */}
      <span className={clsx(
        "absolute bottom-0 left-1/2 -translate-x-1/2 w-1/3 h-[1px]",
        "bg-gradient-to-r from-transparent to-transparent",
        decorationColors[variant]
      )}></span>
    </button>
  );
};

export default Button;