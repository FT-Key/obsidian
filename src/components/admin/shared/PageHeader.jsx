// ==========================================
// 📁 components/admin/shared/PageHeader.jsx
// ==========================================
import Link from 'next/link';
import { Plus } from 'lucide-react';

export default function PageHeader({ 
  title, 
  description, 
  actionLabel, 
  actionHref,
  showAction = true,
  children 
}) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
      <div>
        <h1 className="text-4xl font-black mb-2 text-[var(--color-gothic-pearl)]">
          {title}
        </h1>
        {description && (
          <p className="text-[var(--color-gothic-smoke)]">
            {description}
          </p>
        )}
      </div>

      {showAction && actionHref && (
        <Link
          href={actionHref}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-br from-[var(--color-gothic-amethyst)] to-[var(--color-gothic-plum)] text-white font-semibold rounded-lg hover:scale-105 transition-transform"
        >
          <Plus className="w-5 h-5" />
          {actionLabel}
        </Link>
      )}

      {children}
    </div>
  );
}


