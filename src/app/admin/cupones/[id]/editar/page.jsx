// ==========================================
// 📁 app/admin/coupons/[id]/editar/page.jsx
// ==========================================
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Ticket, Calendar, Users, Trash2, TrendingUp, DollarSign, Percent } from 'lucide-react';
import Link from 'next/link';
import CouponForm from '@/components/admin/forms/CouponForm';
import ErrorAlert from '@/components/admin/shared/ErrorAlert';
import LoadingSpinner from '@/components/admin/shared/LoadingSpinner';
import ConfirmDialog from '@/components/admin/shared/ConfirmDialog';
import Badge from '@/components/admin/shared/Badge';
import { couponService } from '@/lib/api/services/couponService';

export default function EditCouponPage({ params }) {
  const router = useRouter();
  const [coupon, setCoupon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  useEffect(() => {
    loadCoupon();
  }, [params.id]);

  const loadCoupon = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await couponService.getById(params.id);
      setCoupon(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Error al cargar el cupón');
      console.error('Error loading coupon:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      setIsSubmitting(true);
      setError(null);
      
      await couponService.update(params.id, formData);
      
      router.push('/admin/coupons');
      router.refresh();
    } catch (err) {
      setError(err.response?.data?.message || 'Error al actualizar el cupón');
      console.error('Error updating coupon:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    try {
      await couponService.delete(params.id);
      router.push('/admin/coupons');
      router.refresh();
    } catch (err) {
      alert(err.response?.data?.message || 'Error al eliminar el cupón');
      setShowDeleteDialog(false);
    }
  };

  const handleCancel = () => {
    router.push('/admin/coupons');
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

  const getStatusInfo = (coupon) => {
    if (!coupon) return null;
    
    const now = new Date();
    const start = new Date(coupon.start_date);
    const end = new Date(coupon.end_date);
    const isExpired = now > end;
    const hasMaxUses = coupon.max_uses && coupon.uses_count >= coupon.max_uses;
    const notStarted = now < start;

    if (!coupon.active) {
      return { label: 'Inactivo', variant: 'danger', description: 'El cupón está desactivado' };
    }
    if (isExpired) {
      return { label: 'Expirado', variant: 'danger', description: 'La fecha de vigencia ha pasado' };
    }
    if (hasMaxUses) {
      return { label: 'Agotado', variant: 'warning', description: 'Se alcanzó el límite de usos' };
    }
    if (notStarted) {
      return { label: 'Programado', variant: 'info', description: 'Aún no está disponible' };
    }
    return { label: 'Activo', variant: 'success', description: 'Disponible para usar' };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--color-gothic-abyss)] p-8">
        <LoadingSpinner message="Cargando cupón..." />
      </div>
    );
  }

  if (error && !coupon) {
    return (
      <div className="min-h-screen bg-[var(--color-gothic-abyss)] p-8">
        <ErrorAlert
          title="Error"
          message={error}
          onRetry={loadCoupon}
        />
        <Link
          href="/admin/coupons"
          className="inline-flex items-center gap-2 text-[var(--color-gothic-smoke)] hover:text-[var(--color-gothic-silver)] transition-colors mt-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-semibold">Volver a Cupones</span>
        </Link>
      </div>
    );
  }

  const statusInfo = getStatusInfo(coupon);

  return (
    <div className="min-h-screen bg-[var(--color-gothic-abyss)] p-8">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Link
          href="/admin/coupons"
          className="inline-flex items-center gap-2 text-[var(--color-gothic-smoke)] hover:text-[var(--color-gothic-silver)] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-semibold">Volver a Cupones</span>
        </Link>
      </div>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[var(--color-gothic-amethyst)] to-[var(--color-gothic-plum)] flex items-center justify-center">
              <Ticket className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-black text-[var(--color-gothic-pearl)]">
                Editar Cupón
              </h1>
              <code className="text-xl font-mono font-bold text-[var(--color-gothic-smoke)] mt-1">
                {coupon?.code}
              </code>
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
              title="Error al actualizar cupón"
              message={error}
            />
          )}

          <div className="bg-[var(--color-gothic-shadow)] border border-[var(--color-gothic-iron)] rounded-xl p-8">
            <CouponForm
              coupon={coupon}
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
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[var(--color-gothic-smoke)]">
                  Estado actual
                </span>
                <Badge variant={statusInfo?.variant}>
                  {statusInfo?.label}
                </Badge>
              </div>
              <p className="text-xs text-[var(--color-gothic-smoke)]">
                {statusInfo?.description}
              </p>
            </div>
          </div>

          {/* Estadísticas de Uso */}
          <div className="bg-[var(--color-gothic-shadow)] border border-[var(--color-gothic-iron)] rounded-xl p-6">
            <h3 className="text-lg font-bold text-[var(--color-gothic-pearl)] mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Uso del Cupón
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-[var(--color-gothic-smoke)]">
                    Veces usado
                  </span>
                  <span className="text-2xl font-black text-[var(--color-gothic-pearl)]">
                    {coupon?.uses_count || 0}
                    {coupon?.max_uses ? ` / ${coupon.max_uses}` : ''}
                  </span>
                </div>
                {coupon?.max_uses && (
                  <div className="w-full bg-[var(--color-gothic-void)] rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-[var(--color-gothic-amethyst)] to-[var(--color-gothic-plum)] h-2 rounded-full transition-all"
                      style={{ 
                        width: `${Math.min((coupon.uses_count / coupon.max_uses) * 100, 100)}%` 
                      }}
                    ></div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Información del Descuento */}
          <div className="bg-[var(--color-gothic-shadow)] border border-[var(--color-gothic-iron)] rounded-xl p-6">
            <h3 className="text-lg font-bold text-[var(--color-gothic-pearl)] mb-4">
              Descuento
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-center py-4 bg-[var(--color-gothic-void)] rounded-lg">
                {coupon?.type === 'percentage' ? (
                  <div className="flex items-center gap-2">
                    <Percent className="w-8 h-8 text-[var(--color-gothic-amethyst)]" />
                    <span className="text-4xl font-black text-[var(--color-gothic-pearl)]">
                      {coupon?.value}%
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-8 h-8 text-[var(--color-gothic-amethyst)]" />
                    <span className="text-4xl font-black text-[var(--color-gothic-pearl)]">
                      {coupon?.value}
                    </span>
                  </div>
                )}
              </div>
              {coupon?.minimum_amount > 0 && (
                <div className="text-center text-sm text-[var(--color-gothic-smoke)]">
                  Mínimo de compra: ${coupon.minimum_amount}
                </div>
              )}
            </div>
          </div>

          {/* Vigencia */}
          <div className="bg-[var(--color-gothic-shadow)] border border-[var(--color-gothic-iron)] rounded-xl p-6">
            <h3 className="text-lg font-bold text-[var(--color-gothic-pearl)] mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Vigencia
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-[var(--color-gothic-ash)] mb-1">
                  Inicio
                </p>
                <p className="text-sm text-[var(--color-gothic-silver)] font-semibold">
                  {coupon?.start_date ? formatDate(coupon.start_date) : '-'}
                </p>
              </div>
              <div className="border-t border-[var(--color-gothic-iron)] pt-3">
                <p className="text-xs text-[var(--color-gothic-ash)] mb-1">
                  Expiración
                </p>
                <p className="text-sm text-[var(--color-gothic-silver)] font-semibold">
                  {coupon?.end_date ? formatDate(coupon.end_date) : '-'}
                </p>
              </div>
            </div>
          </div>

          {/* Metadatos */}
          <div className="bg-[var(--color-gothic-shadow)] border border-[var(--color-gothic-iron)] rounded-xl p-6">
            <h3 className="text-lg font-bold text-[var(--color-gothic-pearl)] mb-4">
              Información
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-[var(--color-gothic-ash)] mb-1">
                  Creado
                </p>
                <p className="text-sm text-[var(--color-gothic-silver)] font-semibold">
                  {coupon?.createdAt ? formatDate(coupon.createdAt) : '-'}
                </p>
              </div>
              <div className="border-t border-[var(--color-gothic-iron)] pt-3">
                <p className="text-xs text-[var(--color-gothic-ash)] mb-1">
                  Última actualización
                </p>
                <p className="text-sm text-[var(--color-gothic-silver)] font-semibold">
                  {coupon?.updatedAt ? formatDate(coupon.updatedAt) : '-'}
                </p>
              </div>
              <div className="border-t border-[var(--color-gothic-iron)] pt-3">
                <p className="text-xs text-[var(--color-gothic-ash)] mb-1">
                  ID
                </p>
                <p className="text-xs text-[var(--color-gothic-smoke)] font-mono break-all">
                  {coupon?._id || '-'}
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
              Eliminar este cupón es una acción permanente y no se puede deshacer.
            </p>
            <button
              onClick={() => setShowDeleteDialog(true)}
              className="w-full px-4 py-2 bg-red-900/30 border border-red-500/50 text-red-300 rounded-lg hover:bg-red-900/50 transition-colors font-semibold flex items-center justify-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Eliminar Cupón
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleDelete}
        title="¿Eliminar cupón?"
        message={`¿Estás seguro de eliminar el cupón "${coupon?.code}"? ${
          coupon?.uses_count > 0 
            ? `Este cupón ya ha sido usado ${coupon.uses_count} veces.` 
            : ''
        } Esta acción no se puede deshacer.`}
        confirmLabel="Eliminar"
        variant="danger"
      />
    </div>
  );
}