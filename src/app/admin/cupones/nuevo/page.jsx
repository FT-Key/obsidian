// ==========================================
// 📁 app/admin/coupons/nuevo/page.jsx
// ==========================================
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Ticket } from 'lucide-react';
import Link from 'next/link';
import CouponForm from '@/components/admin/forms/CouponForm';
import ErrorAlert from '@/components/admin/shared/ErrorAlert';
import { couponService } from '@/lib/api/services/couponService';

export default function NewCouponPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (formData) => {
    try {
      setIsSubmitting(true);
      setError(null);
      
      await couponService.create(formData);
      
      router.push('/admin/coupons');
      router.refresh();
    } catch (err) {
      setError(err.response?.data?.message || 'Error al crear el cupón');
      console.error('Error creating coupon:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.push('/admin/coupons');
  };

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
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[var(--color-gothic-amethyst)] to-[var(--color-gothic-plum)] flex items-center justify-center">
            <Ticket className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-4xl font-black text-[var(--color-gothic-pearl)]">
            Nuevo Cupón de Descuento
          </h1>
        </div>
        <p className="text-[var(--color-gothic-smoke)] ml-15">
          Crea un cupón promocional para tus clientes
        </p>
      </div>

      {/* Error Alert */}
      {error && (
        <ErrorAlert
          title="Error al crear cupón"
          message={error}
        />
      )}

      {/* Form Container */}
      <div className="max-w-4xl">
        <div className="bg-[var(--color-gothic-shadow)] border border-[var(--color-gothic-iron)] rounded-xl p-8">
          <CouponForm
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isSubmitting={isSubmitting}
          />
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
            <h3 className="font-bold text-blue-300 mb-2 flex items-center gap-2">
              <Ticket className="w-4 h-4" />
              Tipos de Descuento
            </h3>
            <ul className="text-sm text-blue-200 space-y-1">
              <li><strong>Porcentaje:</strong> Descuento del X% sobre el total</li>
              <li><strong>Monto Fijo:</strong> Descuento de $X en la compra</li>
            </ul>
          </div>

          <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
            <h3 className="font-bold text-purple-300 mb-2">💡 Consejos</h3>
            <ul className="text-sm text-purple-200 space-y-1">
              <li>Usa códigos memorables y cortos</li>
              <li>Define fechas de inicio y fin claras</li>
              <li>Establece un mínimo de compra si es necesario</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}