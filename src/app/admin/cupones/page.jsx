// ==========================================
// 📁 app/admin/coupons/page.jsx
// ==========================================
'use client';

import { useState, useEffect } from 'react';
import { Ticket, TrendingUp, Clock, CheckCircle, Trash2, XCircle, Users } from 'lucide-react';
import PageHeader from '@/components/admin/shared/PageHeader';
import SearchBar from '@/components/admin/shared/SearchBar';
import LoadingSpinner from '@/components/admin/shared/LoadingSpinner';
import ErrorAlert from '@/components/admin/shared/ErrorAlert';
import EmptyState from '@/components/admin/shared/EmptyState';
import ConfirmDialog from '@/components/admin/shared/ConfirmDialog';
import CouponTable from '@/components/admin/tables/CouponTable';
import CouponForm from '@/components/admin/forms/CouponForm';
import { couponService } from '@/lib/api/services/couponService';

export default function CouponsPage() {
  const [coupons, setCoupons] = useState([]);
  const [filteredCoupons, setFilteredCoupons] = useState([]);
  const [stats, setStats] = useState(null);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modales
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showCleanupDialog, setShowCleanupDialog] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredCoupons(coupons);
    } else {
      const filtered = coupons.filter(coupon =>
        coupon.code.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCoupons(filtered);
    }
  }, [searchTerm, coupons]);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [couponsRes, statsRes] = await Promise.all([
        couponService.getAll(),
        couponService.getStats()
      ]);
      
      // Estructura correcta según el backend
      setCoupons(couponsRes.coupons || []);
      setPagination(couponsRes.pagination || null);
      
      // Stats con estructura completa del backend
      setStats({
        total: statsRes.totalCoupons || 0,
        active: statsRes.activeCoupons || 0,
        inactive: statsRes.inactiveCoupons || 0,
        expired: statsRes.expiredCoupons || 0,
        valid: statsRes.validCoupons || 0,
        totalUsage: statsRes.totalUsage || 0,
        averageUsage: statsRes.averageUsage || 0,
        mostUsedCoupons: statsRes.mostUsedCoupons || [],
        expiringCoupons: statsRes.expiringCoupons || []
      });
    } catch (err) {
      setError(err.response?.message || 'Error al cargar los cupones');
      console.error('Error loading coupons:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (formData) => {
    try {
      setIsSubmitting(true);
      await couponService.create(formData);
      setShowCreateModal(false);
      loadData();
    } catch (err) {
      alert(err.response?.data?.message || 'Error al crear el cupón');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = async (formData) => {
    try {
      setIsSubmitting(true);
      await couponService.update(selectedCoupon._id, formData);
      setShowEditModal(false);
      setSelectedCoupon(null);
      loadData();
    } catch (err) {
      alert(err.response?.data?.message || 'Error al actualizar el cupón');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    try {
      await couponService.delete(selectedCoupon._id);
      setShowDeleteDialog(false);
      setSelectedCoupon(null);
      loadData();
    } catch (err) {
      alert(err.response?.data?.message || 'Error al eliminar el cupón');
    }
  };

  const handleCleanup = async () => {
    try {
      const response = await couponService.cleanup();
      setShowCleanupDialog(false);
      alert(response.data.message || 'Cupones expirados eliminados');
      loadData();
    } catch (err) {
      alert(err.response?.data?.message || 'Error al limpiar cupones');
    }
  };

  const handleToggleStatus = async (coupon) => {
    try {
      await couponService.toggleStatus(coupon._id);
      loadData();
    } catch (err) {
      alert(err.response?.data?.message || 'Error al cambiar el estado');
    }
  };

  const openEditModal = (coupon) => {
    setSelectedCoupon(coupon);
    setShowEditModal(true);
  };

  const openDeleteDialog = (coupon) => {
    setSelectedCoupon(coupon);
    setShowDeleteDialog(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--color-gothic-abyss)] p-8">
        <LoadingSpinner message="Cargando cupones..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-gothic-abyss)] p-8">
      <PageHeader
        title="Cupones de Descuento"
        description="Administra los cupones promocionales"
        showAction={false}
      >
        <div className="flex gap-3">
          {stats?.expired > 0 && (
            <button
              onClick={() => setShowCleanupDialog(true)}
              className="inline-flex items-center gap-2 px-4 py-3 bg-red-900/20 border border-red-500/30 text-red-300 rounded-lg hover:bg-red-900/40 transition-colors font-semibold"
            >
              <Trash2 className="w-5 h-5" />
              Limpiar Expirados ({stats.expired})
            </button>
          )}
          <button
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-br from-[var(--color-gothic-amethyst)] to-[var(--color-gothic-plum)] text-white font-semibold rounded-lg hover:scale-105 transition-transform"
          >
            <Ticket className="w-5 h-5" />
            Nuevo Cupón
          </button>
        </div>
      </PageHeader>

      {error && (
        <ErrorAlert
          title="Error"
          message={error}
          onRetry={loadData}
        />
      )}

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <StatCard
            icon={Ticket}
            label="Total Cupones"
            value={stats.total}
            variant="purple"
          />
          <StatCard
            icon={CheckCircle}
            label="Válidos"
            value={stats.valid}
            subtitle="Activos y no expirados"
            variant="success"
          />
          <StatCard
            icon={Clock}
            label="Expirados"
            value={stats.expired}
            variant="danger"
          />
          <StatCard
            icon={XCircle}
            label="Inactivos"
            value={stats.inactive}
            variant="warning"
          />
          <StatCard
            icon={TrendingUp}
            label="Total Usos"
            value={stats.totalUsage}
            subtitle={`Promedio: ${stats.averageUsage.toFixed(1)}`}
            variant="info"
          />
        </div>
      )}

      {/* Cupones por Expirar (si hay) */}
      {stats?.expiringCoupons && stats.expiringCoupons.length > 0 && (
        <div className="mb-6 p-4 bg-yellow-900/20 border border-yellow-500/30 rounded-lg">
          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-bold text-yellow-300 mb-2">⚠️ Cupones por expirar (próximos 7 días)</h3>
              <div className="space-y-1">
                {stats.expiringCoupons.map((coupon) => (
                  <p key={coupon._id} className="text-sm text-yellow-200">
                    <span className="font-mono font-bold">{coupon.code}</span> - Expira: {new Date(coupon.end_date).toLocaleDateString('es-AR')}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cupones más usados */}
      {stats?.mostUsedCoupons && stats.mostUsedCoupons.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-bold text-[var(--color-gothic-pearl)] mb-4">
            🏆 Cupones Más Usados
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {stats.mostUsedCoupons.slice(0, 3).map((coupon, index) => (
              <div
                key={coupon._id}
                className="bg-[var(--color-gothic-shadow)] border border-[var(--color-gothic-iron)] rounded-lg p-4"
              >
                <div className="flex items-start justify-between mb-2">
                  <code className="font-mono font-bold text-[var(--color-gothic-pearl)] bg-[var(--color-gothic-void)] px-2 py-1 rounded">
                    {coupon.code}
                  </code>
                  <span className="text-2xl">{index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}</span>
                </div>
                <div className="flex items-center gap-2 text-[var(--color-gothic-smoke)]">
                  <Users className="w-4 h-4" />
                  <span className="text-sm font-semibold">{coupon.uses_count} usos</span>
                </div>
                {coupon.type === 'percentage' ? (
                  <p className="text-xs text-[var(--color-gothic-ash)] mt-1">
                    {coupon.value}% de descuento
                  </p>
                ) : (
                  <p className="text-xs text-[var(--color-gothic-ash)] mt-1">
                    ${coupon.value} de descuento
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Search Bar */}
      <div className="mb-6">
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Buscar cupones por código..."
        />
      </div>

      {/* Pagination Info */}
      {pagination && (
        <div className="mb-4 text-sm text-[var(--color-gothic-smoke)]">
          Mostrando {coupons.length} de {pagination.total} cupones
          {pagination.pages > 1 && ` - Página ${pagination.page} de ${pagination.pages}`}
        </div>
      )}

      {/* Table or Empty State */}
      {filteredCoupons.length === 0 ? (
        <EmptyState
          icon={Ticket}
          title={searchTerm ? 'No se encontraron cupones' : 'No hay cupones'}
          description={searchTerm ? 'Intenta con otros términos de búsqueda' : 'Comienza creando tu primer cupón promocional'}
          actionLabel="Crear Primer Cupón"
          actionHref="#"
          showAction={!searchTerm}
        />
      ) : (
        <div className="bg-[var(--color-gothic-shadow)] border border-[var(--color-gothic-iron)] rounded-xl overflow-hidden">
          <CouponTable
            coupons={filteredCoupons}
            onEdit={openEditModal}
            onDelete={openDeleteDialog}
            onToggleStatus={handleToggleStatus}
          />
        </div>
      )}

      {/* Create Modal */}
      {showCreateModal && (
        <Modal
          title="Crear Cupón de Descuento"
          onClose={() => setShowCreateModal(false)}
        >
          <CouponForm
            onSubmit={handleCreate}
            onCancel={() => setShowCreateModal(false)}
            isSubmitting={isSubmitting}
          />
        </Modal>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <Modal
          title="Editar Cupón"
          onClose={() => {
            setShowEditModal(false);
            setSelectedCoupon(null);
          }}
        >
          <CouponForm
            coupon={selectedCoupon}
            onSubmit={handleEdit}
            onCancel={() => {
              setShowEditModal(false);
              setSelectedCoupon(null);
            }}
            isSubmitting={isSubmitting}
          />
        </Modal>
      )}

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => {
          setShowDeleteDialog(false);
          setSelectedCoupon(null);
        }}
        onConfirm={handleDelete}
        title="¿Eliminar cupón?"
        message={`¿Estás seguro de eliminar el cupón "${selectedCoupon?.code}"? Esta acción no se puede deshacer.`}
        confirmLabel="Eliminar"
        variant="danger"
      />

      {/* Cleanup Confirmation */}
      <ConfirmDialog
        isOpen={showCleanupDialog}
        onClose={() => setShowCleanupDialog(false)}
        onConfirm={handleCleanup}
        title="¿Limpiar cupones expirados?"
        message={`Se eliminarán permanentemente ${stats?.expired || 0} cupones expirados. Esta acción no se puede deshacer.`}
        confirmLabel="Limpiar"
        variant="warning"
      />
    </div>
  );
}

// Componente StatCard
function StatCard({ icon: Icon, label, value, subtitle, variant = 'default' }) {
  const variants = {
    purple: 'from-purple-600 to-purple-800',
    success: 'from-green-600 to-green-800',
    danger: 'from-red-600 to-red-800',
    warning: 'from-yellow-600 to-yellow-800',
    info: 'from-blue-600 to-blue-800',
    default: 'from-gray-600 to-gray-800'
  };

  return (
    <div className="bg-[var(--color-gothic-shadow)] border border-[var(--color-gothic-iron)] rounded-xl p-6">
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${variants[variant]} flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div>
          <p className="text-sm text-[var(--color-gothic-smoke)] mb-1">{label}</p>
          <p className="text-3xl font-black text-[var(--color-gothic-pearl)]">{value}</p>
          {subtitle && (
            <p className="text-xs text-[var(--color-gothic-ash)] mt-1">{subtitle}</p>
          )}
        </div>
      </div>
    </div>
  );
}

// Componente Modal
function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      <div className="relative bg-[var(--color-gothic-shadow)] border border-[var(--color-gothic-iron)] rounded-xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-black mb-6 text-[var(--color-gothic-pearl)]">
          {title}
        </h2>
        {children}
      </div>
    </div>
  );
}