import React from 'react';
import Badge from './Badge';
import Button from './Button';

/**
 * Gothic Dark Card Component - Optimizada y Ligera
 * Con clip-paths góticos y efectos visuales optimizados
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
    relative overflow-hidden
    transition-all duration-300 ease-out
    flex flex-col
    h-full
    clip-path-gothic-md
  `;

  const variants = {
    default: `
      bg-gradient-to-br from-[#1a1a1a]/90 via-[#121212]/85 to-[#0a0a0a]/90
      backdrop-blur-sm
      border border-[#3a3a3a]/50
      shadow-[0_4px_20px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(107,33,168,0.08)]
      ${hoverable ? 'hover:border-[#6b21a8]/60 hover:shadow-[0_8px_32px_rgba(0,0,0,0.9),0_0_24px_rgba(107,33,168,0.25)] hover:scale-[1.03] hover:-translate-y-1' : ''}
    `,

    light: `
      bg-gradient-to-br from-[#e5e7eb]/95 via-[#d1d5db]/90 to-[#9ca3af]/95
      backdrop-blur-sm
      border border-[#6b7280]/60
      shadow-[0_4px_20px_rgba(0,0,0,0.6),inset_0_2px_0_rgba(255,255,255,0.4)]
      ${hoverable ? 'hover:border-[#4b5563] hover:shadow-[0_8px_32px_rgba(0,0,0,0.7)] hover:scale-[1.03] hover:-translate-y-1' : ''}
    `,

    elevated: `
      bg-gradient-to-br from-[#2d2d2d]/85 via-[#1a1a1a]/90 to-[#121212]/85
      backdrop-blur-sm
      border-2 border-[#4a4a4a]/50
      shadow-[0_8px_32px_rgba(0,0,0,0.9),0_0_20px_rgba(107,33,168,0.1),inset_0_2px_0_rgba(255,255,255,0.08)]
      ${hoverable ? 'hover:border-[#6b21a8]/60 hover:shadow-[0_12px_48px_rgba(0,0,0,1),0_0_32px_rgba(107,33,168,0.3)] hover:-translate-y-2 hover:scale-[1.04]' : ''}
    `,

    glass: `
      bg-[#0a0a0a]/30 backdrop-blur-lg
      border border-[#3a3a3a]/40
      shadow-[0_4px_20px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(107,33,168,0.12)]
      ${hoverable ? 'hover:bg-[#1a1a1a]/40 hover:border-[#6b21a8]/50 hover:shadow-[0_8px_32px_rgba(107,33,168,0.25)] hover:scale-[1.03]' : ''}
    `,

    outlined: `
      bg-transparent backdrop-blur-sm
      border-2 border-[#4a4a4a]/60
      shadow-[0_0_16px_rgba(107,33,168,0.12)]
      ${hoverable ? 'hover:border-[#6b21a8]/80 hover:shadow-[0_0_28px_rgba(107,33,168,0.3)] hover:bg-[#1a1a1a]/20' : ''}
    `,

    danger: `
      bg-gradient-to-br from-[#1a0f0f]/90 via-[#121212]/85 to-[#0a0a0a]/90
      backdrop-blur-sm
      border border-[#991b1b]/50
      shadow-[0_4px_20px_rgba(153,27,27,0.5),inset_0_1px_0_rgba(220,38,38,0.12)]
      ${hoverable ? 'hover:border-[#991b1b]/70 hover:shadow-[0_8px_32px_rgba(153,27,27,0.7),0_0_24px_rgba(220,38,38,0.3)] hover:scale-[1.03]' : ''}
    `,

    success: `
      bg-gradient-to-br from-[#0f1a0f]/90 via-[#121212]/85 to-[#0a0a0a]/90
      backdrop-blur-sm
      border border-[#059669]/50
      shadow-[0_4px_20px_rgba(16,185,129,0.3),inset_0_1px_0_rgba(16,185,129,0.12)]
      ${hoverable ? 'hover:border-[#059669]/70 hover:shadow-[0_8px_32px_rgba(16,185,129,0.5),0_0_24px_rgba(16,185,129,0.25)] hover:scale-[1.03]' : ''}
    `
  };

  const cardClasses = `
    ${baseStyles}
    ${variants[variant]}
    ${onClick ? 'cursor-pointer' : ''}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <article
      className={cardClasses}
      onClick={onClick}
      {...props}
    >
      {/* Resplandor sutil optimizado */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#6b21a8]/0 via-[#6b21a8]/10 to-[#6b21a8]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

      {/* Línea decorativa superior con clip-path */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-[2px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#6b21a8]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Imagen con overlay gótico */}
      {image && (
        <div className="relative w-full h-48 overflow-hidden flex-shrink-0">
          <img
            src={image}
            alt={title || 'Card image'}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent"></div>
          <div className="absolute inset-0 bg-[#6b21a8]/0 group-hover:bg-[#6b21a8]/15 transition-colors duration-300"></div>
        </div>
      )}

      {/* Header con icono mejorado */}
      {(title || Icon) && (
        <header className={`relative px-6 pt-6 ${headerClassName}`}>
          {Icon && (
            <div className="mb-4 relative w-fit">
              <div className={`relative flex items-center justify-center w-12 h-12 clip-path-gothic-sm shadow-[0_2px_12px_rgba(0,0,0,0.6)] group-hover:shadow-[0_4px_16px_rgba(107,33,168,0.4)] transition-all duration-300 ${
                variant === 'light'
                  ? 'bg-gradient-to-br from-[#9ca3af] to-[#6b7280] border border-[#4b5563]'
                  : 'bg-gradient-to-br from-[#2d2d2d] to-[#1a1a1a] border border-[#4a4a4a]/50 group-hover:border-[#6b21a8]/40'
              }`}>
                <Icon className={`w-6 h-6 transition-all duration-300 ${
                  variant === 'light' 
                    ? 'text-gray-900' 
                    : 'text-[#d1d5db] group-hover:text-[#6b21a8]'
                }`} />
              </div>
            </div>
          )}

          {title && (
            <h3 className={`text-xl font-bold mb-2 transition-colors duration-300 leading-tight ${
              variant === 'light' 
                ? 'text-gray-900' 
                : 'text-[#e5e7eb] group-hover:text-[#f3f4f6]'
            }`}>
              {title}
            </h3>
          )}

          {subtitle && (
            <p className={`text-xs font-semibold uppercase tracking-widest transition-colors duration-300 ${
              variant === 'light' 
                ? 'text-gray-600' 
                : 'text-[#9ca3af] group-hover:text-[#6b21a8]'
            }`}>
              {subtitle}
            </p>
          )}
        </header>
      )}

      {/* Body */}
      <div className={`relative px-6 py-5 flex-grow ${bodyClassName}`}>
        {description && (
          <p className={`leading-relaxed text-sm transition-colors duration-300 ${
            variant === 'light' 
              ? 'text-gray-700' 
              : 'text-[#9ca3af] group-hover:text-[#d1d5db]'
          }`}>
            {description}
          </p>
        )}
        {children}
      </div>

      {/* Footer con línea decorativa */}
      {footer && (
        <footer className={`relative px-6 py-4 mt-auto ${footerClassName}`}>
          {/* Línea divisoria con gradiente */}
          <div className="absolute top-0 left-6 right-6 h-[1px]">
            <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-[#4a4a4a]/30 to-transparent ${
              variant === 'light' ? 'via-[#6b7280]/30' : ''
            }`}></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#6b21a8]/0 to-transparent group-hover:via-[#6b21a8]/40 transition-all duration-300"></div>
          </div>
          
          <div className="pt-4">
            {footer}
          </div>
        </footer>
      )}

      {/* Efecto de brillo en movimiento optimizado */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
      </div>
    </article>
  );
};

export default Card;