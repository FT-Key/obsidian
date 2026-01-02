"use client";

import React from 'react';
import { clsx } from 'clsx';

/**
 * Gothic Dark Card Component
 * Características góticas: marcos ornamentados, esquinas angulares, efectos de vidrio emplomado
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
    transition-all duration-500
    group
  `;

  const variants = {
    default: `
      bg-gradient-to-br from-gray-900 via-gray-950 to-black
      border-2 border-gray-800
      shadow-[0_0_20px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.05)]
      ${hoverable ? 'hover:border-purple-700/50 hover:shadow-[0_0_40px_rgba(124,58,237,0.3)] hover:scale-[1.02]' : ''}
    `,
    elevated: `
      bg-gradient-to-br from-gray-800 via-gray-900 to-gray-950
      border-2 border-gray-700/50
      shadow-[0_8px_32px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.1)]
      ${hoverable ? 'hover:border-purple-600/60 hover:shadow-[0_12px_48px_rgba(124,58,237,0.4)] hover:-translate-y-2' : ''}
    `,
    glass: `
      bg-gray-900/40 backdrop-blur-xl
      border-2 border-gray-700/30
      shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)]
      ${hoverable ? 'hover:bg-gray-900/60 hover:border-purple-500/40 hover:shadow-[0_12px_48px_rgba(124,58,237,0.3)]' : ''}
    `,
    outlined: `
      bg-transparent backdrop-blur-sm
      border-2 border-purple-800/50
      shadow-[0_0_20px_rgba(124,58,237,0.2),inset_0_0_20px_rgba(124,58,237,0.05)]
      ${hoverable ? 'hover:border-purple-600/70 hover:shadow-[0_0_30px_rgba(124,58,237,0.4)] hover:bg-purple-950/20' : ''}
    `,
    danger: `
      bg-gradient-to-br from-red-950 via-gray-900 to-black
      border-2 border-red-900/50
      shadow-[0_0_20px_rgba(220,38,38,0.3),inset_0_1px_0_rgba(255,255,255,0.05)]
      ${hoverable ? 'hover:border-red-700/60 hover:shadow-[0_0_40px_rgba(220,38,38,0.5)]' : ''}
    `
  };

  const cardClasses = clsx(
    baseStyles,
    variants[variant],
    onClick && 'cursor-pointer',
    className
  );

  return (
    <div 
      className={cardClasses}
      onClick={onClick}
      {...props}
    >
      {/* Decoración gótica superior izquierda */}
      <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-purple-700/30 opacity-50 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute top-0 left-0 w-2 h-2 bg-purple-500/50 rotate-45 transform -translate-x-1 -translate-y-1"></div>
      </div>

      {/* Decoración gótica superior derecha */}
      <div className="absolute top-0 right-0 w-16 h-16 border-r-2 border-t-2 border-purple-700/30 opacity-50 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute top-0 right-0 w-2 h-2 bg-purple-500/50 rotate-45 transform translate-x-1 -translate-y-1"></div>
      </div>

      {/* Decoración gótica inferior izquierda */}
      <div className="absolute bottom-0 left-0 w-16 h-16 border-l-2 border-b-2 border-purple-700/30 opacity-50 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute bottom-0 left-0 w-2 h-2 bg-purple-500/50 rotate-45 transform -translate-x-1 translate-y-1"></div>
      </div>

      {/* Decoración gótica inferior derecha */}
      <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-purple-700/30 opacity-50 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute bottom-0 right-0 w-2 h-2 bg-purple-500/50 rotate-45 transform translate-x-1 translate-y-1"></div>
      </div>

      {/* Línea decorativa central superior */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[2px] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent group-hover:via-purple-400/60 transition-colors duration-300"></div>

      {/* Imagen */}
      {image && (
        <div className="relative w-full h-48 overflow-hidden">
          <img 
            src={image} 
            alt={title || 'Card image'} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
        </div>
      )}

      {/* Header con icono */}
      {(title || Icon) && (
        <div className={clsx('relative p-6', headerClassName)}>
          {Icon && (
            <div className="mb-4 flex items-center justify-center w-14 h-14 rounded-lg bg-gradient-to-br from-purple-600 to-purple-900 shadow-[0_0_20px_rgba(124,58,237,0.4)]">
              <Icon className="w-7 h-7 text-white" />
            </div>
          )}
          
          {title && (
            <h3 className="text-2xl font-bold text-gray-100 mb-2 group-hover:text-purple-300 transition-colors duration-300">
              {title}
            </h3>
          )}
          
          {subtitle && (
            <p className="text-sm text-purple-400 font-semibold uppercase tracking-wider">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Body */}
      <div className={clsx('relative px-6', !footer && 'pb-6', bodyClassName)}>
        {description && (
          <p className="text-gray-400 leading-relaxed">
            {description}
          </p>
        )}
        {children}
      </div>

      {/* Footer */}
      {footer && (
        <div className={clsx('relative p-6 border-t border-gray-800/50 bg-black/20', footerClassName)}>
          {footer}
        </div>
      )}

      {/* Efecto de brillo en hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
    </div>
  );
};

export default Card;