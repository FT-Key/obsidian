// ==========================================
// 📁 components/admin/shared/LoadingSpinner.jsx
// ==========================================
import { Loader2 } from 'lucide-react';

export default function LoadingSpinner({ message = 'Cargando...' }) {
  return (
    <div className="flex flex-col justify-center items-center py-20">
      <Loader2 className="w-10 h-10 animate-spin text-[var(--color-gothic-amethyst)] mb-4" />
      <p className="text-[var(--color-gothic-smoke)] text-sm">{message}</p>
    </div>
  );
}


