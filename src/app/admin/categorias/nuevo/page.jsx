// ==========================================
// 📁 app/admin/categories/nuevo/page.jsx
// ==========================================
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Layers } from 'lucide-react';
import Link from 'next/link';
import CategoryForm from '@/components/admin/forms/CategoryForm';
import ErrorAlert from '@/components/admin/shared/ErrorAlert';
import { categoryService } from '@/lib/api/services/categoryService';

export default function NewCategoryPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (formData) => {
    try {
      setIsSubmitting(true);
      setError(null);
      
      await categoryService.create(formData);
      
      // Redirigir a la lista de categorías
      router.push('/admin/categories');
      router.refresh();
    } catch (err) {
      setError(err.response?.data?.message || 'Error al crear la categoría');
      console.error('Error creating category:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.push('/admin/categories');
  };

  return (
    <div className="min-h-screen bg-[var(--color-gothic-abyss)] p-8">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Link
          href="/admin/categories"
          className="inline-flex items-center gap-2 text-[var(--color-gothic-smoke)] hover:text-[var(--color-gothic-silver)] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-semibold">Volver a Categorías</span>
        </Link>
      </div>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[var(--color-gothic-amethyst)] to-[var(--color-gothic-plum)] flex items-center justify-center">
            <Layers className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-4xl font-black text-[var(--color-gothic-pearl)]">
            Nueva Categoría
          </h1>
        </div>
        <p className="text-[var(--color-gothic-smoke)] ml-15">
          Crea una nueva categoría para organizar tus productos
        </p>
      </div>

      {/* Error Alert */}
      {error && (
        <ErrorAlert
          title="Error al crear categoría"
          message={error}
        />
      )}

      {/* Form Container */}
      <div className="max-w-3xl">
        <div className="bg-[var(--color-gothic-shadow)] border border-[var(--color-gothic-iron)] rounded-xl p-8">
          <CategoryForm
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isSubmitting={isSubmitting}
          />
        </div>

        {/* Info Card */}
        <div className="mt-6 bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
          <h3 className="font-bold text-blue-300 mb-2">💡 Consejos</h3>
          <ul className="text-sm text-blue-200 space-y-1 list-disc list-inside">
            <li>Usa nombres claros y descriptivos para tus categorías</li>
            <li>La descripción ayuda a los clientes a entender qué productos encontrarán</li>
            <li>Puedes desactivar una categoría temporalmente sin eliminarla</li>
          </ul>
        </div>
      </div>
    </div>
  );
}