import React from 'react';

/**
 * Gothic Medieval Dark Button Component - Refined
 * Diseño gótico minimalista con efectos de background animados
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
    font-semibold tracking-wide uppercase text-sm
    transition-all duration-300 ease-out
    overflow-hidden
    disabled:opacity-40 disabled:cursor-not-allowed
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0a0a0a]
    group
  `;

  const variants = {
    primary: `
      bg-gradient-to-br from-[#2a2a2a] via-[#1f1f1f] to-[#161616]
      text-[#e5e7eb] 
      border border-[#404040]
      shadow-[0_4px_16px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.06)]
      hover:shadow-[0_6px_24px_rgba(255,255,255,0.12),inset_0_1px_0_rgba(255,255,255,0.1)]
      hover:border-[#525252]
      hover:text-white
      active:shadow-[inset_0_3px_8px_rgba(0,0,0,0.4)]
      focus:ring-[#525252]
    `,
    
    secondary: `
      bg-gradient-to-br from-[#1f1a28] via-[#1a1524] to-[#15111f]
      text-[#c4b5fd] 
      border border-[#3d2a5c]
      shadow-[0_4px_16px_rgba(76,29,149,0.3),inset_0_1px_0_rgba(196,181,253,0.06)]
      hover:shadow-[0_6px_24px_rgba(107,33,168,0.5),inset_0_1px_0_rgba(196,181,253,0.1)]
      hover:border-[#5b3a8c]
      hover:text-[#ddd6fe]
      active:shadow-[inset_0_3px_8px_rgba(0,0,0,0.4)]
      focus:ring-[#6b21a8]
    `,
    
    danger: `
      bg-gradient-to-br from-[#5c1a1a] via-[#4a1515] to-[#3a1010]
      text-[#fecaca] 
      border border-[#7a2020]
      shadow-[0_4px_16px_rgba(153,27,27,0.4),inset_0_1px_0_rgba(254,202,202,0.06)]
      hover:shadow-[0_6px_24px_rgba(220,38,38,0.6),inset_0_1px_0_rgba(254,202,202,0.1)]
      hover:border-[#993030]
      hover:text-white
      active:shadow-[inset_0_3px_8px_rgba(0,0,0,0.4)]
      focus:ring-[#991b1b]
    `,
    
    success: `
      bg-gradient-to-br from-[#1a3d32] via-[#153329] to-[#102820]
      text-[#a7f3d0] 
      border border-[#2a5c4a]
      shadow-[0_4px_16px_rgba(6,78,59,0.4),inset_0_1px_0_rgba(167,243,208,0.06)]
      hover:shadow-[0_6px_24px_rgba(16,185,129,0.5),inset_0_1px_0_rgba(167,243,208,0.1)]
      hover:border-[#3a7c62]
      hover:text-white
      active:shadow-[inset_0_3px_8px_rgba(0,0,0,0.4)]
      focus:ring-[#047857]
    `,
    
    warning: `
      bg-gradient-to-br from-[#6d2f0d] via-[#5a2510] to-[#471c0a]
      text-[#fed7aa] 
      border border-[#8d4520]
      shadow-[0_4px_16px_rgba(194,65,12,0.4),inset_0_1px_0_rgba(254,215,170,0.06)]
      hover:shadow-[0_6px_24px_rgba(249,115,22,0.6),inset_0_1px_0_rgba(254,215,170,0.1)]
      hover:border-[#ad5a30]
      hover:text-white
      active:shadow-[inset_0_3px_8px_rgba(0,0,0,0.4)]
      focus:ring-[#ea580c]
    `,
    
    ghost: `
      bg-transparent
      text-[#9ca3af] 
      border border-[#2d2d2d]
      shadow-[0_0_12px_rgba(0,0,0,0.3),inset_0_0_12px_rgba(0,0,0,0.2)]
      hover:bg-[#1a1a1a]/40
      hover:border-[#404040]
      hover:shadow-[0_0_20px_rgba(107,33,168,0.25),inset_0_0_16px_rgba(107,33,168,0.08)]
      hover:text-[#d1d5db]
      active:bg-[#121212]/60
      focus:ring-[#404040]
    `,
    
    outline: `
      bg-transparent
      text-[#d1d5db] 
      border border-[#3a3a3a]
      shadow-[0_0_10px_rgba(0,0,0,0.3),inset_0_0_6px_rgba(255,255,255,0.02)]
      hover:bg-[#1a1a1a]/50
      hover:border-[#555555]
      hover:shadow-[0_0_16px_rgba(107,114,128,0.3),inset_0_0_10px_rgba(255,255,255,0.04)]
      hover:text-white
      active:bg-[#121212]/70
      focus:ring-[#555555]
    `,
    
    glass: `
      bg-[radial-gradient(ellipse_at_top,rgba(42,42,42,0.5),rgba(18,18,18,0.7))]
      backdrop-blur-md
      text-[#d1d5db] 
      border border-[#3a3a3a]/40
      shadow-[0_6px_24px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.08),inset_0_-1px_1px_rgba(0,0,0,0.4)]
      hover:border-[#4a4a4a]/60
      hover:text-white
      hover:shadow-[0_6px_28px_rgba(107,33,168,0.25),inset_0_1px_1px_rgba(255,255,255,0.12)]
      hover:bg-[radial-gradient(ellipse_at_top,rgba(107,33,168,0.15),rgba(18,18,18,0.8))]
      active:shadow-[inset_0_3px_8px_rgba(0,0,0,0.3)]
      focus:ring-[#6b21a8]/50
    `
  };

  const sizes = {
    sm: 'px-4 py-1.5 text-xs min-h-[32px]',
    md: 'px-5 py-2 text-sm min-h-[38px]',
    lg: 'px-6 py-2.5 text-base min-h-[42px]',
    xl: 'px-8 py-3 text-lg min-h-[48px]'
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
      {/* Ornamento gótico de fondo con imagen - se revela desde el centro */}
      <span className="absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
            filter: 'invert(1) brightness(1.3) contrast(1.2)',
            opacity: '0.5'
          }}
        />
        <span 
          className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-transparent to-[#0a0a0a] opacity-100 group-hover:opacity-0 transition-opacity duration-500 ease-out"
          style={{ transitionDelay: '100ms' }}
        />
      </span>

      {/* Gradiente radial sutil de respaldo */}
      <span 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out scale-x-0 group-hover:scale-x-100 origin-center"
        style={{
          background: variant === 'primary' ? 'radial-gradient(ellipse at center, rgba(255,255,255,0.06) 0%, transparent 70%)' :
                     variant === 'secondary' ? 'radial-gradient(ellipse at center, rgba(107,33,168,0.15) 0%, transparent 70%)' :
                     variant === 'danger' ? 'radial-gradient(ellipse at center, rgba(220,38,38,0.12) 0%, transparent 70%)' :
                     variant === 'success' ? 'radial-gradient(ellipse at center, rgba(16,185,129,0.12) 0%, transparent 70%)' :
                     variant === 'warning' ? 'radial-gradient(ellipse at center, rgba(249,115,22,0.12) 0%, transparent 70%)' :
                     variant === 'ghost' ? 'radial-gradient(ellipse at center, rgba(107,33,168,0.1) 0%, transparent 70%)' :
                     variant === 'outline' ? 'radial-gradient(ellipse at center, rgba(107,114,128,0.1) 0%, transparent 70%)' :
                     'radial-gradient(ellipse at center, rgba(107,33,168,0.1) 0%, transparent 70%)'
        }}
      />

      {/* Brillo sutil en el centro inferior */}
      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-[2px] bg-gradient-to-r from-transparent via-current to-transparent opacity-0 group-hover:opacity-40 transition-opacity duration-500 blur-[1px]"></span>

      {/* Cortes en las esquinas con terminaciones en punta gótica */}
      <span className="absolute top-0 left-0 w-2.5 h-2.5 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
        <svg viewBox="0 0 10 10" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <path d="M0 2 L0 0 L2 0" />
        </svg>
      </span>
      <span className="absolute top-0 right-0 w-2.5 h-2.5 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
        <svg viewBox="0 0 10 10" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <path d="M10 2 L10 0 L8 0" />
        </svg>
      </span>
      <span className="absolute bottom-0 left-0 w-2.5 h-2.5 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
        <svg viewBox="0 0 10 10" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <path d="M0 8 L0 10 L2 10" />
        </svg>
      </span>
      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
        <svg viewBox="0 0 10 10" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <path d="M10 8 L10 10 L8 10" />
        </svg>
      </span>

      {loading && (
        <svg className="animate-spin h-5 w-5 relative z-10" viewBox="0 0 24 24">
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
        <Icon className="w-5 h-5 flex-shrink-0 group-hover:scale-110 transition-transform duration-300 relative z-10" />
      )}
      
      <span className="relative z-10 drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]">
        {children}
      </span>
      
      {!loading && Icon && iconPosition === 'right' && (
        <Icon className="w-5 h-5 flex-shrink-0 group-hover:scale-110 transition-transform duration-300 relative z-10" />
      )}
    </button>
  );
};

export default Button;