// ==========================================
// 📁 app/admin/categories/[id]/editar/page.jsx
// ==========================================
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Layers, Package, Calendar, Trash2 } from 'lucide-react';
import Link from 'next/link';
import CategoryForm from '@/components/admin/forms/CategoryForm';
import ErrorAlert from '@/components/admin/shared/ErrorAlert';
import LoadingSpinner from '@/components/admin/shared/LoadingSpinner';
import ConfirmDialog from '@/components/admin/shared/ConfirmDialog';
import Badge from '@/components/admin/shared/Badge';
import { categoryService } from '@/lib/api/services/categoryService';

export default function EditCategoryPage({ params }) {
  const router = useRouter();
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  useEffect(() => {
    loadCategory();
  }, [params.id]);

  const loadCategory = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await categoryService.getById(params.id);
      setCategory(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Error al cargar la categoría');
      console.error('Error loading category:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      setIsSubmitting(true);
      setError(null);
      
      await categoryService.update(params.id, formData);
      
      router.push('/admin/categories');
      router.refresh();
    } catch (err) {
      setError(err.response?.data?.message || 'Error al actualizar la categoría');
      console.error('Error updating category:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    try {
      await categoryService.delete(params.id);
      router.push('/admin/categories');
      router.refresh();
    } catch (err) {
      alert(err.response?.data?.message || 'Error al eliminar la categoría');
      setShowDeleteDialog(false);
    }
  };

  const handleCancel = () => {
    router.push('/admin/categories');
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('es-AR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--color-gothic-abyss)] p-8">
        <LoadingSpinner message="Cargando categoría..." />
      </div>
    );
  }

  if (error && !category) {
    return (
      <div className="min-h-screen bg-[var(--color-gothic-abyss)] p-8">
        <ErrorAlert
          title="Error"
          message={error}
          onRetry={loadCategory}
        />
        <Link
          href="/admin/categories"
          className="inline-flex items-center gap-2 text-[var(--color-gothic-smoke)] hover:text-[var(--color-gothic-silver)] transition-colors mt-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-semibold">Volver a Categorías</span>
        </Link>
      </div>
    );
  }

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
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[var(--color-gothic-amethyst)] to-[var(--color-gothic-plum)] flex items-center justify-center">
              <Layers className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-black text-[var(--color-gothic-pearl)]">
                Editar Categoría
              </h1>
              <p className="text-[var(--color-gothic-smoke)] mt-1">
                {category?.name}
              </p>
            </div>
          </div>

          {/* Delete Button */}
          <button
            onClick={() => setShowDeleteDialog(true)}
            className="px-4 py-2 bg-red-900/20 border border-red-500/30 text-red-400 rounded-lg hover:bg-red-900/40 transition-colors font-semibold flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Eliminar
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Section */}
        <div className="lg:col-span-2">
          {error && (
            <ErrorAlert
              title="Error al actualizar categoría"
              message={error}
            />
          )}

          <div className="bg-[var(--color-gothic-shadow)] border border-[var(--color-gothic-iron)] rounded-xl p-8">
            <CategoryForm
              category={category}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
              isSubmitting={isSubmitting}
            />
          </div>
        </div>

        {/* Info Sidebar */}
        <div className="space-y-6">
          {/* Estado */}
          <div className="bg-[var(--color-gothic-shadow)] border border-[var(--color-gothic-iron)] rounded-xl p-6">
            <h3 className="text-lg font-bold text-[var(--color-gothic-pearl)] mb-4">
              Estado
            </h3>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[var(--color-gothic-smoke)]">
                Estado actual
              </span>
              <Badge variant={category?.active ? 'success' : 'danger'}>
                {category?.active ? 'Activa' : 'Inactiva'}
              </Badge>
            </div>
          </div>

          {/* Productos */}
          <div className="bg-[var(--color-gothic-shadow)] border border-[var(--color-gothic-iron)] rounded-xl p-6">
            <h3 className="text-lg font-bold text-[var(--color-gothic-pearl)] mb-4 flex items-center gap-2">
              <Package className="w-5 h-5" />
              Productos
            </h3>
            <div className="text-center py-4">
              <p className="text-4xl font-black text-[var(--color-gothic-pearl)] mb-2">
                {category?.productCount || 0}
              </p>
              <p className="text-sm text-[var(--color-gothic-smoke)]">
                productos en esta categoría
              </p>
            </div>
            {category?.productCount > 0 && (
              <Link
                href={`/admin/products?category=${params.id}`}
                className="block mt-4 text-center px-4 py-2 bg-[var(--color-gothic-steel)] border border-[var(--color-gothic-iron)] text-[var(--color-gothic-silver)] rounded-lg hover:bg-[var(--color-gothic-gunmetal)] transition-colors text-sm font-semibold"
              >
                Ver Productos
              </Link>
            )}
          </div>

          {/* Metadatos */}
          <div className="bg-[var(--color-gothic-shadow)] border border-[var(--color-gothic-iron)] rounded-xl p-6">
            <h3 className="text-lg font-bold text-[var(--color-gothic-pearl)] mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Información
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-[var(--color-gothic-ash)] mb-1">
                  Creada
                </p>
                <p className="text-sm text-[var(--color-gothic-silver)] font-semibold">
                  {category?.createdAt ? formatDate(category.createdAt) : '-'}
                </p>
              </div>
              <div className="border-t border-[var(--color-gothic-iron)] pt-3">
                <p className="text-xs text-[var(--color-gothic-ash)] mb-1">
                  Última actualización
                </p>
                <p className="text-sm text-[var(--color-gothic-silver)] font-semibold">
                  {category?.updatedAt ? formatDate(category.updatedAt) : '-'}
                </p>
              </div>
              <div className="border-t border-[var(--color-gothic-iron)] pt-3">
                <p className="text-xs text-[var(--color-gothic-ash)] mb-1">
                  ID
                </p>
                <p className="text-xs text-[var(--color-gothic-smoke)] font-mono break-all">
                  {category?._id || '-'}
                </p>
              </div>
            </div>
          </div>

          {/* Zona de Peligro */}
          <div className="bg-red-900/10 border border-red-500/30 rounded-xl p-6">
            <h3 className="text-lg font-bold text-red-300 mb-2">
              Zona de Peligro
            </h3>
            <p className="text-sm text-red-200 mb-4">
              Eliminar esta categoría es una acción permanente y no se puede deshacer.
            </p>
            <button
              onClick={() => setShowDeleteDialog(true)}
              className="w-full px-4 py-2 bg-red-900/30 border border-red-500/50 text-red-300 rounded-lg hover:bg-red-900/50 transition-colors font-semibold flex items-center justify-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Eliminar Categoría
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleDelete}
        title="¿Eliminar categoría?"
        message={`¿Estás seguro de eliminar "${category?.name}"? ${
          category?.productCount > 0 
            ? `Esta categoría tiene ${category.productCount} producto(s) asociado(s).` 
            : ''
        } Esta acción no se puede deshacer.`}
        confirmLabel="Eliminar"
        variant="danger"
      />
    </div>
  );
}

function formatDate(date) {
  return new Date(date).toLocaleDateString('es-AR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}