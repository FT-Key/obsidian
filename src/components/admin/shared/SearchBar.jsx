// ==========================================
// 📁 components/admin/shared/SearchBar.jsx
// ==========================================
import { Search } from 'lucide-react';

export default function SearchBar({ 
  value, 
  onChange, 
  placeholder = 'Buscar...' 
}) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-gothic-smoke)]" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-10 pr-4 py-3 bg-[var(--color-gothic-shadow)] border border-[var(--color-gothic-iron)] rounded-lg text-[var(--color-gothic-silver)] placeholder:text-[var(--color-gothic-ash)] focus:outline-none focus:ring-2 focus:ring-[var(--color-gothic-amethyst)]"
      />
    </div>
  );
}


