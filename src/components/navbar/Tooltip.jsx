/**
 * Tooltip Component - Componente reutilizable de tooltip gótico
 * Ubicación: components/navbar/Tooltip.jsx
 */
const Tooltip = ({ children, content, position = 'bottom' }) => {
  const positionClasses = {
    top: 'bottom-full mb-2 left-1/2 -translate-x-1/2',
    bottom: 'top-full mt-2 left-1/2 -translate-x-1/2',
    left: 'right-full mr-2 top-1/2 -translate-y-1/2',
    right: 'left-full ml-2 top-1/2 -translate-y-1/2'
  };

  return (
    <div className="relative group">
      {children}
      <div
        className={`
          absolute ${positionClasses[position]}
          px-3 py-2 backdrop-blur-md 
          border rounded-md shadow-lg 
          opacity-0 invisible group-hover:opacity-100 group-hover:visible 
          transition-all duration-300 z-50 whitespace-nowrap
          pointer-events-none
        `}
        style={{
          backgroundColor: 'var(--color-gothic-shadow)',
          opacity: 0.95,
          borderColor: 'var(--color-gothic-steel)'
        }}
      >
        <p className="text-sm font-medium" style={{ color: 'var(--color-gothic-pearl)' }}>
          {content}
        </p>
      </div>
    </div>
  );
};

export default Tooltip;