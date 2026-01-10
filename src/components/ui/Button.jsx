/**
 * Gothic Medieval Dark Button Component
 * Inspirado en arquitectura gótica medieval: arcos ojivales, texturas de piedra,
 * herrajes de hierro forjado, y vitrales antiguos
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
    transition-all duration-500 ease-out
    overflow-visible
    disabled:opacity-40 disabled:cursor-not-allowed
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0a0a0a]
    group
  `;

  const variants = {
    // Botón principal - Piedra tallada con herrajes de plata
    primary: `
      bg-gradient-to-b from-[#2d2d2d] via-[#242424] to-[#1a1a1a]
      text-[#d1d5db] 
      border-2 border-[#4a4a4a]
      shadow-[0_6px_0_0_#121212,0_8px_20px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.1)]
      hover:shadow-[0_4px_0_0_#121212,0_6px_25px_rgba(209,213,219,0.3),inset_0_1px_0_rgba(255,255,255,0.15)]
      hover:translate-y-[2px] hover:text-[#e5e7eb]
      active:shadow-[0_0_0_0_#121212,inset_0_4px_8px_rgba(0,0,0,0.6)]
      active:translate-y-[6px]
      focus:ring-[#4a4a4a]
      before:absolute before:inset-0 before:opacity-0
      before:bg-[repeating-linear-gradient(90deg,transparent,transparent_2px,rgba(255,255,255,0.02)_2px,rgba(255,255,255,0.02)_4px)]
      hover:before:opacity-100 before:transition-opacity before:duration-500
      after:absolute after:top-0 after:left-0 after:right-0 after:h-[2px]
      after:bg-gradient-to-r after:from-transparent after:via-[#6b7280]/50 after:to-transparent
      after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-500
    `,
    
    // Botón secundario - Amatista oscura con vitrales
    secondary: `
      bg-gradient-to-b from-[#1a1a1a] via-[#2d2d2d] to-[#1a1a1a]
      text-[#c4b5fd] 
      border-2 border-[#4c1d95]
      shadow-[0_6px_0_0_#0a0a0a,0_8px_20px_rgba(76,29,149,0.4),inset_0_1px_0_rgba(196,181,253,0.1)]
      hover:shadow-[0_4px_0_0_#0a0a0a,0_6px_30px_rgba(107,33,168,0.6),inset_0_2px_4px_rgba(196,181,253,0.15)]
      hover:translate-y-[2px] hover:text-[#ddd6fe] hover:border-[#6b21a8]
      active:shadow-[0_0_0_0_#0a0a0a,inset_0_4px_8px_rgba(0,0,0,0.6)]
      active:translate-y-[6px]
      focus:ring-[#6b21a8]
      before:absolute before:inset-0 before:opacity-0
      before:bg-[radial-gradient(circle_at_50%_0%,rgba(107,33,168,0.15),transparent_70%)]
      hover:before:opacity-100 before:transition-opacity before:duration-500
      after:absolute after:inset-x-4 after:top-0 after:h-[1px]
      after:bg-gradient-to-r after:from-transparent after:via-[#6b21a8] after:to-transparent
      after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-500
    `,
    
    // Botón de peligro - Sangre y hierro oxidado
    danger: `
      bg-gradient-to-b from-[#7c2d12] via-[#991b1b] to-[#7c2d12]
      text-[#fecaca] 
      border-2 border-[#991b1b]
      shadow-[0_6px_0_0_#3f0e06,0_8px_20px_rgba(153,27,27,0.6),inset_0_1px_0_rgba(254,202,202,0.1)]
      hover:shadow-[0_4px_0_0_#3f0e06,0_6px_30px_rgba(220,38,38,0.7),inset_0_2px_4px_rgba(254,202,202,0.15)]
      hover:translate-y-[2px] hover:text-white hover:border-[#b91c1c]
      active:shadow-[0_0_0_0_#3f0e06,inset_0_4px_8px_rgba(0,0,0,0.6)]
      active:translate-y-[6px]
      focus:ring-[#991b1b]
      before:absolute before:inset-0 before:opacity-0
      before:bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(220,38,38,0.1)_10px,rgba(220,38,38,0.1)_20px)]
      hover:before:opacity-100 before:transition-opacity before:duration-500
    `,
    
    // Botón de éxito - Musgo ancestral
    success: `
      bg-gradient-to-b from-[#064e3b] via-[#065f46] to-[#064e3b]
      text-[#a7f3d0] 
      border-2 border-[#047857]
      shadow-[0_6px_0_0_#022c22,0_8px_20px_rgba(6,78,59,0.6),inset_0_1px_0_rgba(167,243,208,0.1)]
      hover:shadow-[0_4px_0_0_#022c22,0_6px_30px_rgba(16,185,129,0.6),inset_0_2px_4px_rgba(167,243,208,0.15)]
      hover:translate-y-[2px] hover:text-white hover:border-[#059669]
      active:shadow-[0_0_0_0_#022c22,inset_0_4px_8px_rgba(0,0,0,0.6)]
      active:translate-y-[6px]
      focus:ring-[#047857]
      before:absolute before:inset-0 before:opacity-0
      before:bg-[repeating-linear-gradient(90deg,transparent,transparent_3px,rgba(16,185,129,0.05)_3px,rgba(16,185,129,0.05)_6px)]
      hover:before:opacity-100 before:transition-opacity before:duration-500
    `,
    
    // Botón de advertencia - Ámbar de forja
    warning: `
      bg-gradient-to-b from-[#c2410c] via-[#ea580c] to-[#c2410c]
      text-[#fed7aa] 
      border-2 border-[#ea580c]
      shadow-[0_6px_0_0_#6c2305,0_8px_20px_rgba(194,65,12,0.6),inset_0_1px_0_rgba(254,215,170,0.1)]
      hover:shadow-[0_4px_0_0_#6c2305,0_6px_30px_rgba(249,115,22,0.7),inset_0_2px_4px_rgba(254,215,170,0.15)]
      hover:translate-y-[2px] hover:text-white hover:border-[#f97316]
      active:shadow-[0_0_0_0_#6c2305,inset_0_4px_8px_rgba(0,0,0,0.6)]
      active:translate-y-[6px]
      focus:ring-[#ea580c]
      before:absolute before:inset-0 before:opacity-0
      before:bg-[radial-gradient(circle_at_50%_50%,rgba(249,115,22,0.2),transparent_70%)]
      hover:before:opacity-100 before:transition-opacity before:duration-300
      hover:before:animate-pulse
    `,
    
    // Botón fantasma - Espectro etéreo
    ghost: `
      bg-transparent
      text-[#9ca3af] 
      border-2 border-[#2d2d2d]
      shadow-[0_0_20px_rgba(0,0,0,0.5),inset_0_0_20px_rgba(0,0,0,0.3)]
      hover:bg-[#1a1a1a]/30 hover:border-[#4a4a4a]
      hover:shadow-[0_0_25px_rgba(107,33,168,0.3),inset_0_0_20px_rgba(107,33,168,0.1)]
      hover:text-[#d1d5db]
      active:bg-[#121212]/50
      focus:ring-[#4a4a4a]
      before:absolute before:inset-0 before:opacity-0
      before:border-2 before:border-[#6b21a8]/0
      hover:before:opacity-100 hover:before:border-[#6b21a8]/30
      before:transition-all before:duration-500
      before:animate-[ping_2s_ease-in-out_infinite]
    `,
    
    // Botón outline - Herraje fino
    outline: `
      bg-transparent
      text-[#d1d5db] 
      border-2 border-[#3a3a3a]
      shadow-[0_0_15px_rgba(0,0,0,0.4),inset_0_0_10px_rgba(255,255,255,0.02)]
      hover:bg-[#1a1a1a]/40 hover:border-[#6b7280]
      hover:shadow-[0_0_20px_rgba(107,114,128,0.4),inset_0_0_15px_rgba(255,255,255,0.05)]
      hover:text-white
      active:bg-[#121212]/60
      focus:ring-[#6b7280]
      after:absolute after:inset-x-0 after:top-1/2 after:-translate-y-1/2 after:h-[1px]
      after:bg-gradient-to-r after:from-transparent after:via-[#6b7280]/0 after:to-transparent
      hover:after:via-[#6b7280]/50 after:transition-all after:duration-500
    `,
    
    // Botón de vidrio - Vitral antiguo
    glass: `
      bg-[radial-gradient(ellipse_at_top,rgba(42,42,42,0.6),rgba(18,18,18,0.8))]
      backdrop-blur-md
      text-[#d1d5db] 
      border border-[#3a3a3a]/50
      shadow-[0_8px_32px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.1),inset_0_-1px_1px_rgba(0,0,0,0.5)]
      hover:border-[#4a4a4a]/70 hover:text-white
      hover:shadow-[0_8px_32px_rgba(107,33,168,0.3),inset_0_1px_1px_rgba(255,255,255,0.15)]
      hover:bg-[radial-gradient(ellipse_at_top,rgba(107,33,168,0.2),rgba(18,18,18,0.9))]
      active:shadow-[inset_0_4px_8px_rgba(0,0,0,0.4)]
      focus:ring-[#6b21a8]/50
      before:absolute before:inset-[2px] before:opacity-0
      before:bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(107,33,168,0.03)_10px,rgba(107,33,168,0.03)_20px)]
      hover:before:opacity-100 before:transition-opacity before:duration-700
    `
  };

  const sizes = {
    sm: 'px-5 py-2 text-xs min-h-[38px] clip-path-gothic-sm',
    md: 'px-7 py-3 text-sm min-h-[46px] clip-path-gothic-md',
    lg: 'px-9 py-4 text-base min-h-[54px] clip-path-gothic-lg',
    xl: 'px-12 py-5 text-lg min-h-[62px] clip-path-gothic-xl'
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
      {/* Gárgola decorativa superior izquierda */}
      <span className="absolute -top-2 -left-2 w-4 h-4 opacity-40 group-hover:opacity-70 transition-opacity duration-500">
        <svg viewBox="0 0 16 16" fill="currentColor" className="w-full h-full">
          <path d="M8 2L4 6h2v4h4V6h2L8 2z" opacity="0.6"/>
          <circle cx="8" cy="8" r="1.5" />
        </svg>
      </span>
      
      {/* Gárgola decorativa superior derecha */}
      <span className="absolute -top-2 -right-2 w-4 h-4 opacity-40 group-hover:opacity-70 transition-opacity duration-500">
        <svg viewBox="0 0 16 16" fill="currentColor" className="w-full h-full rotate-90">
          <path d="M8 2L4 6h2v4h4V6h2L8 2z" opacity="0.6"/>
          <circle cx="8" cy="8" r="1.5" />
        </svg>
      </span>

      {/* Arco ojival superior (decoración arquitectónica) */}
      <span className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-4 opacity-0 group-hover:opacity-60 transition-all duration-500">
        <svg viewBox="0 0 32 16" fill="none" stroke="currentColor" strokeWidth="1" className="w-full h-full">
          <path d="M0 16 Q8 0, 16 0 Q24 0, 32 16" />
        </svg>
      </span>

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
        <Icon className="w-5 h-5 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
      )}
      
      <span className="relative z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
        {children}
      </span>
      
      {!loading && Icon && iconPosition === 'right' && (
        <Icon className="w-5 h-5 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
      )}

      {/* Herraje decorativo inferior */}
      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-[2px] bg-gradient-to-r from-transparent via-current to-transparent opacity-30 group-hover:opacity-60 transition-opacity duration-500"></span>
      
      {/* Clavos decorativos de hierro (corners) */}
      <span className="absolute bottom-1 left-2 w-1 h-1 bg-current rounded-full opacity-30"></span>
      <span className="absolute bottom-1 right-2 w-1 h-1 bg-current rounded-full opacity-30"></span>
    </button>
  );
};

export default Button;