// ==========================================
// 📁 components/admin/shared/EmptyState.jsx
// ==========================================
import Link from 'next/link';
import { Plus } from 'lucide-react';

export default function EmptyState({ 
  icon: Icon, 
  title, 
  description, 
  actionLabel, 
  actionHref,
  showAction = true 
}) {
  return (
    <div className="text-center py-20">
      {Icon && (
        <div className="flex justify-center mb-4">
          <Icon className="w-16 h-16 text-[var(--color-gothic-ash)]" />
        </div>
      )}
      
      <h3 className="text-xl font-bold mb-2 text-[var(--color-gothic-pearl)]">
        {title}
      </h3>
      
      <p className="text-[var(--color-gothic-smoke)] mb-6 max-w-md mx-auto">
        {description}
      </p>
      
      {showAction && actionHref && (
        <Link
          href={actionHref}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-br from-[var(--color-gothic-amethyst)] to-[var(--color-gothic-plum)] text-white font-semibold rounded-lg hover:scale-105 transition-transform"
        >
          <Plus className="w-5 h-5" />
          {actionLabel}
        </Link>
      )}
    </div>
  );
}


