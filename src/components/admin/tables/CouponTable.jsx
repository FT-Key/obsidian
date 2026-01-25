// ==========================================
// 📁 components/admin/tables/CouponTable.jsx
// ==========================================
'use client';

import { Edit2, Trash2, Copy, Calendar, Users, DollarSign, Percent } from 'lucide-react';
import Badge from '../shared/Badge';

export default function CouponTable({ 
  coupons, 
  onEdit, 
  onDelete, 
  onToggleStatus 
}) {
  if (!coupons || coupons.length === 0) {
    return null;
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('es-AR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatDateTime = (date) => {
    return new Date(date).toLocaleDateString('es-AR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code);
    // Aquí podrías agregar un toast/notification
    alert(`Código ${code} copiado al portapapeles`);
  };

  const getStatusBadge = (coupon) => {
    const now = new Date();
    const start = new Date(coupon.start_date);
    const end = new Date(coupon.end_date);
    const isExpired = now > end;
    const hasMaxUses = coupon.max_uses && coupon.uses_count >= coupon.max_uses;
    const notStarted = now < start;

    if (!coupon.active) {
      return <Badge variant="danger">Inactivo</Badge>;
    }
    if (isExpired) {
      return <Badge variant="danger">Expirado</Badge>;
    }
    if (hasMaxUses) {
      return <Badge variant="warning">Agotado</Badge>;
    }
    if (notStarted) {
      return <Badge variant="info">Programado</Badge>;
    }
    return <Badge variant="success">Activo</Badge>;
  };

  const getDiscountDisplay = (coupon) => {
    if (coupon.type === 'percentage') {
      return (
        <div className="flex items-center gap-1 text-[var(--color-gothic-pearl)]">
          <Percent className="w-4 h-4" />
          <span className="font-bold">{coupon.value}%</span>
        </div>
      );
    }
    return (
      <div className="flex items-center gap-1 text-[var(--color-gothic-pearl)]">
        <DollarSign className="w-4 h-4" />
        <span className="font-bold">${coupon.value}</span>
      </div>
    );
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-[var(--color-gothic-iron)]">
            <th className="text-left py-4 px-4 text-sm font-bold text-[var(--color-gothic-pearl)]">
              Código
            </th>
            <th className="text-center py-4 px-4 text-sm font-bold text-[var(--color-gothic-pearl)]">
              Descuento
            </th>
            <th className="text-center py-4 px-4 text-sm font-bold text-[var(--color-gothic-pearl)]">
              Usos
            </th>
            <th className="text-center py-4 px-4 text-sm font-bold text-[var(--color-gothic-pearl)]">
              Vigencia
            </th>
            <th className="text-center py-4 px-4 text-sm font-bold text-[var(--color-gothic-pearl)]">
              Estado
            </th>
            <th className="text-right py-4 px-4 text-sm font-bold text-[var(--color-gothic-pearl)]">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {coupons.map((coupon) => (
            <tr 
              key={coupon._id} 
              className="border-b border-[var(--color-gothic-iron)] hover:bg-[var(--color-gothic-shadow)] transition-colors"
            >
              {/* Código */}
              <td className="py-4 px-4">
                <div className="flex items-center gap-2">
                  <code className="font-mono font-bold text-[var(--color-gothic-pearl)] bg-[var(--color-gothic-void)] px-2 py-1 rounded">
                    {coupon.code}
                  </code>
                  <button
                    onClick={() => copyToClipboard(coupon.code)}
                    className="p-1 hover:bg-[var(--color-gothic-steel)] rounded transition-colors"
                    title="Copiar código"
                  >
                    <Copy className="w-4 h-4 text-[var(--color-gothic-smoke)]" />
                  </button>
                </div>
                {coupon.minimum_amount > 0 && (
                  <p className="text-xs text-[var(--color-gothic-smoke)] mt-1">
                    Mínimo: ${coupon.minimum_amount}
                  </p>
                )}
              </td>
              
              {/* Descuento */}
              <td className="py-4 px-4 text-center">
                {getDiscountDisplay(coupon)}
                <p className="text-xs text-[var(--color-gothic-smoke)] mt-1">
                  {coupon.type === 'percentage' ? 'Porcentaje' : 'Monto fijo'}
                </p>
              </td>
              
              {/* Usos */}
              <td className="py-4 px-4 text-center">
                <div className="flex items-center justify-center gap-2">
                  <Users className="w-4 h-4 text-[var(--color-gothic-smoke)]" />
                  <span className="text-sm font-semibold text-[var(--color-gothic-silver)]">
                    {coupon.uses_count}
                    {coupon.max_uses ? ` / ${coupon.max_uses}` : ' / ∞'}
                  </span>
                </div>
                {coupon.max_uses && (
                  <div className="mt-1 w-full bg-[var(--color-gothic-void)] rounded-full h-1.5">
                    <div 
                      className="bg-[var(--color-gothic-amethyst)] h-1.5 rounded-full"
                      style={{ 
                        width: `${Math.min((coupon.uses_count / coupon.max_uses) * 100, 100)}%` 
                      }}
                    ></div>
                  </div>
                )}
              </td>
              
              {/* Vigencia */}
              <td className="py-4 px-4 text-center">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-center gap-1 text-xs text-[var(--color-gothic-smoke)]">
                    <Calendar className="w-3 h-3" />
                    <span>{formatDate(coupon.start_date)}</span>
                  </div>
                  <div className="text-xs text-[var(--color-gothic-ash)]">hasta</div>
                  <div className="flex items-center justify-center gap-1 text-xs text-[var(--color-gothic-smoke)]">
                    <Calendar className="w-3 h-3" />
                    <span>{formatDate(coupon.end_date)}</span>
                  </div>
                </div>
              </td>
              
              {/* Estado */}
              <td className="py-4 px-4 text-center">
                <button
                  onClick={() => onToggleStatus(coupon)}
                  className="transition-transform hover:scale-105"
                >
                  {getStatusBadge(coupon)}
                </button>
              </td>
              
              {/* Acciones */}
              <td className="py-4 px-4">
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => onEdit(coupon)}
                    className="p-2 bg-[var(--color-gothic-steel)] border border-[var(--color-gothic-iron)] text-[var(--color-gothic-silver)] rounded-lg hover:bg-[var(--color-gothic-gunmetal)] transition-colors"
                    title="Editar cupón"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  
                  <button
                    onClick={() => onDelete(coupon)}
                    className="p-2 bg-red-900/20 border border-red-500/30 text-red-400 rounded-lg hover:bg-red-900/40 transition-colors"
                    title="Eliminar cupón"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}