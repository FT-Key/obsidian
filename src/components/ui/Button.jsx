import React from 'react';

/**
 * Gothic Medieval Dark Button Component - Refined & Responsive
 * Diseño gótico minimalista con soporte para tema claro/oscuro
 */
const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'lg', // Cambiado default a 'lg' para ser más grande
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
    relative inline-flex items-center justify-center gap-3
    font-semibold tracking-wide uppercase
    transition-all duration-300 ease-out
    overflow-hidden
    disabled:opacity-40 disabled:cursor-not-allowed
    focus:outline-none focus:ring-2 focus:ring-offset-2
    group/button
  `;

  // Variantes adaptadas para tema claro/oscuro usando variables CSS
  const variants = {
    primary: `
      bg-gradient-to-br from-[var(--color-gothic-steel)] via-[var(--color-gothic-gunmetal)] to-[var(--color-gothic-pewter)]
      text-[var(--color-gothic-pearl)] 
      border border-[var(--color-gothic-pewter)]
      shadow-[0_4px_16px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.06)]
      hover:shadow-[0_6px_24px_rgba(255,255,255,0.12),inset_0_1px_0_rgba(255,255,255,0.1)]
      hover:border-[var(--color-gothic-chrome)]
      hover:text-[var(--color-gothic-pearl)]
      active:shadow-[inset_0_3px_8px_rgba(0,0,0,0.4)]
      focus:ring-[var(--color-gothic-pewter)]
      focus:ring-offset-[var(--color-gothic-abyss)]
    `,
    
    secondary: `
      bg-gradient-to-br from-[var(--color-gothic-amethyst)] via-[var(--color-gothic-plum)] to-[var(--color-gothic-amethyst)]
      text-white
      border border-[var(--color-gothic-amethyst)]
      shadow-[0_4px_16px_rgba(107,33,168,0.3),inset_0_1px_0_rgba(196,181,253,0.06)]
      hover:shadow-[0_6px_24px_rgba(107,33,168,0.5),inset_0_1px_0_rgba(196,181,253,0.1)]
      hover:border-[var(--color-gothic-plum)]
      hover:text-white
      active:shadow-[inset_0_3px_8px_rgba(0,0,0,0.4)]
      focus:ring-[var(--color-gothic-amethyst)]
      focus:ring-offset-[var(--color-gothic-abyss)]
    `,
    
    danger: `
      bg-gradient-to-br from-[var(--color-gothic-wine)] via-[var(--color-gothic-crimson)] to-[var(--color-gothic-wine)]
      text-[var(--color-gothic-pearl)] 
      border border-[var(--color-gothic-crimson)]
      shadow-[0_4px_16px_rgba(153,27,27,0.4),inset_0_1px_0_rgba(254,202,202,0.06)]
      hover:shadow-[0_6px_24px_rgba(220,38,38,0.6),inset_0_1px_0_rgba(254,202,202,0.1)]
      hover:border-[var(--color-gothic-crimson)]
      hover:text-white
      active:shadow-[inset_0_3px_8px_rgba(0,0,0,0.4)]
      focus:ring-[var(--color-gothic-crimson)]
      focus:ring-offset-[var(--color-gothic-abyss)]
    `,
    
    success: `
      bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-900
      text-[var(--color-gothic-pearl)] 
      border border-emerald-700
      shadow-[0_4px_16px_rgba(6,78,59,0.4),inset_0_1px_0_rgba(167,243,208,0.06)]
      hover:shadow-[0_6px_24px_rgba(16,185,129,0.5),inset_0_1px_0_rgba(167,243,208,0.1)]
      hover:border-emerald-600
      hover:text-white
      active:shadow-[inset_0_3px_8px_rgba(0,0,0,0.4)]
      focus:ring-emerald-700
      focus:ring-offset-[var(--color-gothic-abyss)]
    `,
    
    warning: `
      bg-gradient-to-br from-orange-900 via-orange-800 to-orange-900
      text-[var(--color-gothic-pearl)] 
      border border-orange-700
      shadow-[0_4px_16px_rgba(194,65,12,0.4),inset_0_1px_0_rgba(254,215,170,0.06)]
      hover:shadow-[0_6px_24px_rgba(249,115,22,0.6),inset_0_1px_0_rgba(254,215,170,0.1)]
      hover:border-orange-600
      hover:text-white
      active:shadow-[inset_0_3px_8px_rgba(0,0,0,0.4)]
      focus:ring-orange-700
      focus:ring-offset-[var(--color-gothic-abyss)]
    `,
    
    ghost: `
      bg-transparent
      text-[var(--color-gothic-smoke)] 
      border border-[var(--color-gothic-steel)]
      shadow-[0_0_12px_rgba(0,0,0,0.3),inset_0_0_12px_rgba(0,0,0,0.2)]
      hover:bg-[var(--color-gothic-shadow)]/40
      hover:border-[var(--color-gothic-pewter)]
      hover:shadow-[0_0_20px_rgba(107,33,168,0.25),inset_0_0_16px_rgba(107,33,168,0.08)]
      hover:text-[var(--color-gothic-silver)]
      active:bg-[var(--color-gothic-shadow)]/60
      focus:ring-[var(--color-gothic-pewter)]
      focus:ring-offset-[var(--color-gothic-abyss)]
    `,
    
    outline: `
      bg-transparent
      text-[var(--color-gothic-silver)] 
      border-2 border-[var(--color-gothic-pewter)]
      shadow-[0_0_10px_rgba(0,0,0,0.3),inset_0_0_6px_rgba(255,255,255,0.02)]
      hover:bg-[var(--color-gothic-shadow)]/50
      hover:border-[var(--color-gothic-amethyst)]
      hover:shadow-[0_0_16px_rgba(107,33,168,0.3),inset_0_0_10px_rgba(107,33,168,0.04)]
      hover:text-[var(--color-gothic-pearl)]
      active:bg-[var(--color-gothic-shadow)]/70
      focus:ring-[var(--color-gothic-amethyst)]
      focus:ring-offset-[var(--color-gothic-abyss)]
    `,
    
    glass: `
      bg-[var(--color-gothic-shadow)]/60 backdrop-blur-md
      text-[var(--color-gothic-silver)] 
      border border-[var(--color-gothic-pewter)]/40
      shadow-[0_6px_24px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.08),inset_0_-1px_1px_rgba(0,0,0,0.4)]
      hover:border-[var(--color-gothic-pewter)]/60
      hover:text-[var(--color-gothic-pearl)]
      hover:shadow-[0_6px_28px_rgba(107,33,168,0.25),inset_0_1px_1px_rgba(255,255,255,0.12)]
      hover:bg-[var(--color-gothic-amethyst)]/10
      active:shadow-[inset_0_3px_8px_rgba(0,0,0,0.3)]
      focus:ring-[var(--color-gothic-amethyst)]/50
      focus:ring-offset-[var(--color-gothic-abyss)]
    `
  };

  // Tamaños más grandes y responsive
  const sizes = {
    sm: 'px-4 py-2 text-xs sm:text-sm min-h-[36px] sm:min-h-[40px]',
    md: 'px-6 py-3 text-sm sm:text-base min-h-[44px] sm:min-h-[48px]',
    lg: 'px-8 py-4 text-base sm:text-lg min-h-[52px] sm:min-h-[56px]',
    xl: 'px-10 py-5 text-lg sm:text-xl min-h-[60px] sm:min-h-[68px]'
  };

  // Tamaños de íconos responsive
  const iconSizes = {
    sm: 'w-4 h-4 sm:w-4 sm:h-4',
    md: 'w-5 h-5 sm:w-5 sm:h-5',
    lg: 'w-5 h-5 sm:w-6 sm:h-6',
    xl: 'w-6 h-6 sm:w-7 sm:h-7'
  };

  const buttonClasses = `
    ${baseStyles}
    ${variants[variant]}
    ${sizes[size]}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {/* Ornamento gótico de fondo con imagen - AISLADO con group/button */}
      <span className="absolute inset-0 overflow-hidden opacity-0 group-hover/button:opacity-100 transition-opacity duration-300">
        <span
          className="absolute inset-0 bg-center bg-no-repeat bg-contain"
          style={{
            backgroundImage: variant === 'primary' ? 'url(/button-bg/bg-btn-primary.png)' :
                             variant === 'secondary' ? 'url(/button-bg/bg-btn-secondary.png)' :
                             variant === 'danger' ? 'url(/button-bg/bg-btn-danger.png)' :
                             variant === 'success' ? 'url(/button-bg/bg-btn-success.png)' :
                             variant === 'warning' ? 'url(/button-bg/bg-btn-warning.png)' :
                             variant === 'ghost' ? 'url(/button-bg/bg-btn-ghost.png)' :
                             variant === 'outline' ? 'url(/button-bg/bg-btn-outline.png)' :
                             'url(/button-bg/bg-btn-glass.png)',
            filter: variant === 'outline' 
              ? 'brightness(0.7) contrast(1.3) saturate(1.2)' 
              : 'invert(1) brightness(1.3) contrast(1.2)',
            opacity: variant === 'outline' ? '0.4' : '0.5'
          }}
        />
        <span 
          className="absolute inset-0 bg-gradient-to-r from-[var(--color-gothic-abyss)] via-transparent to-[var(--color-gothic-abyss)] opacity-100 group-hover/button:opacity-0 transition-opacity duration-500 ease-out"
          style={{ transitionDelay: '100ms' }}
        />
      </span>

      {/* Gradiente radial sutil de respaldo */}
      <span 
        className="absolute inset-0 opacity-0 group-hover/button:opacity-100 transition-all duration-500 ease-out scale-x-0 group-hover/button:scale-x-100 origin-center"
        style={{
          background: variant === 'primary' ? 'radial-gradient(ellipse at center, rgba(255,255,255,0.06) 0%, transparent 70%)' :
                     variant === 'secondary' ? 'radial-gradient(ellipse at center, rgba(107,33,168,0.15) 0%, transparent 70%)' :
                     variant === 'danger' ? 'radial-gradient(ellipse at center, rgba(220,38,38,0.12) 0%, transparent 70%)' :
                     variant === 'success' ? 'radial-gradient(ellipse at center, rgba(16,185,129,0.12) 0%, transparent 70%)' :
                     variant === 'warning' ? 'radial-gradient(ellipse at center, rgba(249,115,22,0.12) 0%, transparent 70%)' :
                     variant === 'ghost' ? 'radial-gradient(ellipse at center, rgba(107,33,168,0.1) 0%, transparent 70%)' :
                     variant === 'outline' ? 'radial-gradient(ellipse at center, rgba(107,33,168,0.12) 0%, transparent 70%)' :
                     'radial-gradient(ellipse at center, rgba(107,33,168,0.1) 0%, transparent 70%)'
        }}
      />

      {/* Brillo sutil en el centro inferior */}
      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-[2px] bg-gradient-to-r from-transparent via-current to-transparent opacity-0 group-hover/button:opacity-40 transition-opacity duration-500 blur-[1px]"></span>

      {/* Cortes en las esquinas con terminaciones en punta gótica */}
      <span className="absolute top-0 left-0 w-2.5 h-2.5 opacity-20 group-hover/button:opacity-40 transition-opacity duration-300">
        <svg viewBox="0 0 10 10" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <path d="M0 2 L0 0 L2 0" />
        </svg>
      </span>
      <span className="absolute top-0 right-0 w-2.5 h-2.5 opacity-20 group-hover/button:opacity-40 transition-opacity duration-300">
        <svg viewBox="0 0 10 10" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <path d="M10 2 L10 0 L8 0" />
        </svg>
      </span>
      <span className="absolute bottom-0 left-0 w-2.5 h-2.5 opacity-20 group-hover/button:opacity-40 transition-opacity duration-300">
        <svg viewBox="0 0 10 10" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <path d="M0 8 L0 10 L2 10" />
        </svg>
      </span>
      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 opacity-20 group-hover/button:opacity-40 transition-opacity duration-300">
        <svg viewBox="0 0 10 10" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <path d="M10 8 L10 10 L8 10" />
        </svg>
      </span>

      {loading && (
        <svg className={`animate-spin ${iconSizes[size]} relative z-10`} viewBox="0 0 24 24">
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
        <Icon className={`${iconSizes[size]} flex-shrink-0 group-hover/button:scale-110 transition-transform duration-300 relative z-10`} />
      )}
      
      <span className="relative z-10 drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]">
        {children}
      </span>
      
      {!loading && Icon && iconPosition === 'right' && (
        <Icon className={`${iconSizes[size]} flex-shrink-0 group-hover/button:scale-110 transition-transform duration-300 relative z-10`} />
      )}
    </button>
  );
};

export default Button;