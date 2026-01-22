import React from 'react';

/**
 * Gothic Dark Card Component - Responsive y con soporte tema claro/oscuro
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
      bg-gradient-to-br from-[var(--color-gothic-obsidian)]/90 via-[var(--color-gothic-shadow)]/85 to-[var(--color-gothic-void)]/90
      backdrop-blur-sm
      border border-[var(--color-gothic-iron)]/50
      shadow-[0_4px_20px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(107,33,168,0.08)]
      ${hoverable ? 'hover:border-[var(--color-gothic-amethyst)]/60 hover:shadow-[0_8px_32px_rgba(0,0,0,0.9),0_0_24px_rgba(107,33,168,0.25)] hover:scale-[1.03] hover:-translate-y-1' : ''}
    `,

    light: `
      bg-gradient-to-br from-[var(--color-gothic-shadow)]/95 via-[var(--color-gothic-obsidian)]/90 to-[var(--color-gothic-iron)]/95
      backdrop-blur-sm
      border border-[var(--color-gothic-pewter)]/60
      shadow-[0_4px_20px_rgba(0,0,0,0.6),inset_0_2px_0_rgba(255,255,255,0.4)]
      ${hoverable ? 'hover:border-[var(--color-gothic-steel)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.7)] hover:scale-[1.03] hover:-translate-y-1' : ''}
    `,

    elevated: `
      bg-gradient-to-br from-[var(--color-gothic-gunmetal)]/85 via-[var(--color-gothic-obsidian)]/90 to-[var(--color-gothic-shadow)]/85
      backdrop-blur-sm
      border-2 border-[var(--color-gothic-pewter)]/50
      shadow-[0_8px_32px_rgba(0,0,0,0.9),0_0_20px_rgba(107,33,168,0.1),inset_0_2px_0_rgba(255,255,255,0.08)]
      ${hoverable ? 'hover:border-[var(--color-gothic-amethyst)]/60 hover:shadow-[0_12px_48px_rgba(0,0,0,1),0_0_32px_rgba(107,33,168,0.3)] hover:-translate-y-2 hover:scale-[1.04]' : ''}
    `,

    glass: `
      bg-[var(--color-gothic-void)]/30 backdrop-blur-lg
      border border-[var(--color-gothic-iron)]/40
      shadow-[0_4px_20px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(107,33,168,0.12)]
      ${hoverable ? 'hover:bg-[var(--color-gothic-obsidian)]/40 hover:border-[var(--color-gothic-amethyst)]/50 hover:shadow-[0_8px_32px_rgba(107,33,168,0.25)] hover:scale-[1.03]' : ''}
    `,

    outlined: `
      bg-transparent backdrop-blur-sm
      border-2 border-[var(--color-gothic-pewter)]/60
      shadow-[0_0_16px_rgba(107,33,168,0.12)]
      ${hoverable ? 'hover:border-[var(--color-gothic-amethyst)]/80 hover:shadow-[0_0_28px_rgba(107,33,168,0.3)] hover:bg-[var(--color-gothic-obsidian)]/20' : ''}
    `,

    danger: `
      bg-gradient-to-br from-[var(--color-gothic-void)]/90 via-[var(--color-gothic-shadow)]/85 to-[var(--color-gothic-void)]/90
      backdrop-blur-sm
      border border-[var(--color-gothic-crimson)]/50
      shadow-[0_4px_20px_rgba(153,27,27,0.5),inset_0_1px_0_rgba(220,38,38,0.12)]
      ${hoverable ? 'hover:border-[var(--color-gothic-crimson)]/70 hover:shadow-[0_8px_32px_rgba(153,27,27,0.7),0_0_24px_rgba(220,38,38,0.3)] hover:scale-[1.03]' : ''}
    `,

    success: `
      bg-gradient-to-br from-[var(--color-gothic-void)]/90 via-[var(--color-gothic-shadow)]/85 to-[var(--color-gothic-void)]/90
      backdrop-blur-sm
      border border-emerald-700/50
      shadow-[0_4px_20px_rgba(16,185,129,0.3),inset_0_1px_0_rgba(16,185,129,0.12)]
      ${hoverable ? 'hover:border-emerald-600/70 hover:shadow-[0_8px_32px_rgba(16,185,129,0.5),0_0_24px_rgba(16,185,129,0.25)] hover:scale-[1.03]' : ''}
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
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-gothic-amethyst)]/0 via-[var(--color-gothic-amethyst)]/10 to-[var(--color-gothic-amethyst)]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

      {/* Línea decorativa superior con clip-path */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 sm:w-24 h-[2px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--color-gothic-amethyst)]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Imagen con overlay gótico */}
      {image && (
        <div className="relative w-full h-40 sm:h-48 md:h-56 overflow-hidden flex-shrink-0">
          <img
            src={image}
            alt={title || 'Card image'}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-gothic-void)] via-[var(--color-gothic-void)]/50 to-transparent"></div>
          <div className="absolute inset-0 bg-[var(--color-gothic-amethyst)]/0 group-hover:bg-[var(--color-gothic-amethyst)]/15 transition-colors duration-300"></div>
        </div>
      )}

      {/* Header con icono mejorado */}
      {(title || Icon) && (
        <header className={`relative px-4 sm:px-5 md:px-6 pt-4 sm:pt-5 md:pt-6 ${headerClassName}`}>
          {Icon && (
            <div className="mb-3 sm:mb-4 relative w-fit">
              <div className={`relative flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 clip-path-gothic-sm shadow-[0_2px_12px_rgba(0,0,0,0.6)] group-hover:shadow-[0_4px_16px_rgba(107,33,168,0.4)] transition-all duration-300
                bg-gradient-to-br from-[var(--color-gothic-gunmetal)] to-[var(--color-gothic-obsidian)] 
                border border-[var(--color-gothic-pewter)]/50 
                group-hover:border-[var(--color-gothic-amethyst)]/40
              `}>
                <Icon className={`w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300 text-[var(--color-gothic-silver)] group-hover:text-[var(--color-gothic-amethyst)]`} />
              </div>
            </div>
          )}

          {title && (
            <h3 className={`text-lg sm:text-xl md:text-2xl font-bold mb-2 transition-colors duration-300 leading-tight text-[var(--color-gothic-chrome)] group-hover:text-[var(--color-gothic-pearl)]`}>
              {title}
            </h3>
          )}

          {subtitle && (
            <p className={`text-xs sm:text-sm font-semibold uppercase tracking-widest transition-colors duration-300 text-[var(--color-gothic-smoke)] group-hover:text-[var(--color-gothic-amethyst)]`}>
              {subtitle}
            </p>
          )}
        </header>
      )}

      {/* Body */}
      <div className={`relative px-4 sm:px-5 md:px-6 py-4 sm:py-5 flex-grow ${bodyClassName}`}>
        {description && (
          <p className={`leading-relaxed text-sm sm:text-base transition-colors duration-300 text-[var(--color-gothic-smoke)] group-hover:text-[var(--color-gothic-silver)]`}>
            {description}
          </p>
        )}
        {children}
      </div>

      {/* Footer con línea decorativa */}
      {footer && (
        <footer className={`relative px-4 sm:px-5 md:px-6 py-3 sm:py-4 mt-auto ${footerClassName}`}>
          {/* Línea divisoria con gradiente */}
          <div className="absolute top-0 left-4 sm:left-5 md:left-6 right-4 sm:right-5 md:right-6 h-[1px]">
            <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-[var(--color-gothic-pewter)]/30 to-transparent`}></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--color-gothic-amethyst)]/0 to-transparent group-hover:via-[var(--color-gothic-amethyst)]/40 transition-all duration-300"></div>
          </div>
          
          <div className="pt-3 sm:pt-4">
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