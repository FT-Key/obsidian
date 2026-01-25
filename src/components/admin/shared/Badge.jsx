// ==========================================
// 📁 components/admin/shared/Badge.jsx
// ==========================================
export default function Badge({ 
  children, 
  variant = 'default',
  size = 'md' 
}) {
  const variants = {
    success: 'bg-green-900/30 text-green-400',
    danger: 'bg-red-900/30 text-red-400',
    warning: 'bg-yellow-900/30 text-yellow-400',
    info: 'bg-blue-900/30 text-blue-400',
    purple: 'bg-purple-900/30 text-purple-400',
    default: 'bg-gray-800 text-gray-400'
  };

  const sizes = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-xs px-2 py-1',
    lg: 'text-sm px-3 py-1.5'
  };

  return (
    <span className={`inline-block rounded font-bold ${variants[variant]} ${sizes[size]}`}>
      {children}
    </span>
  );
}


