// ==========================================
// 📄 app/admin/services/page.jsx
// Página de administración de servicios
// ==========================================
'use client';

import { useState, useEffect } from 'react';
import { serviceService } from '@/lib/api/services/serviceService';
import { Scissors, Edit, Trash2, Power } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// Componentes compartidos
import PageHeader from '@/components/admin/shared/PageHeader';
import LoadingSpinner from '@/components/admin/shared/LoadingSpinner';
import ErrorAlert from '@/components/admin/shared/ErrorAlert';
import EmptyState from '@/components/admin/shared/EmptyState';
import SearchBar from '@/components/admin/shared/SearchBar';
import Badge from '@/components/admin/shared/Badge';
import ConfirmDialog from '@/components/admin/shared/ConfirmDialog';
import Pagination from '@/components/ui/Pagination';

export default function AdminServicesPage() {
  // Estados
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all'); // 'all', 'active', 'inactive'
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0
  });

  // Estados para diálogos
  const [deleteDialog, setDeleteDialog] = useState({ isOpen: false, service: null });
  const [toggleDialog, setToggleDialog] = useState({ isOpen: false, service: null });

  // Cargar servicios
  useEffect(() => {
    fetchServices();
  }, [pagination.page, activeFilter, searchTerm]);

  const fetchServices = async () => {
    try {
      setLoading(true);
      setError(null);

      const filters = {
        page: pagination.page,
        limit: pagination.limit,
        search: searchTerm || undefined,
        active: activeFilter === 'all' ? undefined : activeFilter === 'active'
      };

      const response = await serviceService.getAll(filters);

      if (response.data.success) {
        setServices(response.data.data);
        setPagination(prev => ({
          ...prev,
          ...response.data.pagination
        }));
      }
    } catch (err) {
      console.error('Error fetching services:', err);
      setError(err.response?.data?.error || 'Error al cargar los servicios');
    } finally {
      setLoading(false);
    }
  };

  // Eliminar servicio
  const handleDelete = async (service) => {
    try {
      await serviceService.delete(service._id);
      fetchServices();
    } catch (err) {
      console.error('Error deleting service:', err);
      setError('Error al eliminar el servicio');
    }
  };

  // Toggle estado activo/inactivo
  const handleToggleStatus = async (service) => {
    try {
      await serviceService.toggleStatus(service._id);
      fetchServices();
    } catch (err) {
      console.error('Error toggling service:', err);
      setError('Error al cambiar el estado del servicio');
    }
  };

  // Buscar con debounce
  const handleSearch = (value) => {
    setSearchTerm(value);
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  // Cambiar filtro
  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  // Renderizado condicional
  if (loading && services.length === 0) {
    return (
      <div className="p-8">
        <PageHeader
          title="Servicios"
          description="Gestiona los servicios de tu negocio"
          showAction={false}
        />
        <LoadingSpinner message="Cargando servicios..." />
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <PageHeader
        title="Servicios"
        description="Gestiona los servicios de tu negocio"
        actionLabel="Nuevo Servicio"
        actionHref="/admin/services/new"
      />

      {/* Error Alert */}
      {error && (
        <ErrorAlert
          message={error}
          onRetry={fetchServices}
        />
      )}

      {/* Filters & Search */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        {/* Search */}
        <div className="flex-1">
          <SearchBar
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Buscar servicios por nombre o descripción..."
          />
        </div>

        {/* Filter buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => handleFilterChange('all')}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              activeFilter === 'all'
                ? 'bg-[var(--color-gothic-amethyst)] text-white'
                : 'bg-[var(--color-gothic-shadow)] text-[var(--color-gothic-silver)] hover:bg-[var(--color-gothic-void)]'
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => handleFilterChange('active')}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              activeFilter === 'active'
                ? 'bg-[var(--color-gothic-amethyst)] text-white'
                : 'bg-[var(--color-gothic-shadow)] text-[var(--color-gothic-silver)] hover:bg-[var(--color-gothic-void)]'
            }`}
          >
            Activos
          </button>
          <button
            onClick={() => handleFilterChange('inactive')}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              activeFilter === 'inactive'
                ? 'bg-[var(--color-gothic-amethyst)] text-white'
                : 'bg-[var(--color-gothic-shadow)] text-[var(--color-gothic-silver)] hover:bg-[var(--color-gothic-void)]'
            }`}
          >
            Inactivos
          </button>
        </div>
      </div>

      {/* Services List */}
      {services.length === 0 ? (
        <EmptyState
          icon={Scissors}
          title="No hay servicios"
          description="Comienza creando tu primer servicio para ofrecerlo a tus clientes"
          actionLabel="Crear Servicio"
          actionHref="/admin/services/new"
        />
      ) : (
        <>
          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {services.map((service) => (
              <ServiceCard
                key={service._id}
                service={service}
                onDelete={() => setDeleteDialog({ isOpen: true, service })}
                onToggle={() => setToggleDialog({ isOpen: true, service })}
              />
            ))}
          </div>

          {/* Pagination */}
          {pagination.pages > 1 && (
            <Pagination
              page={pagination.page}
              totalPages={pagination.pages}
              onPageChange={(page) => setPagination(prev => ({ ...prev, page }))}
            />
          )}
        </>
      )}

      {/* Delete Dialog */}
      <ConfirmDialog
        isOpen={deleteDialog.isOpen}
        onClose={() => setDeleteDialog({ isOpen: false, service: null })}
        onConfirm={() => handleDelete(deleteDialog.service)}
        title="¿Eliminar servicio?"
        message={`¿Estás seguro de que quieres eliminar "${deleteDialog.service?.name}"? Esta acción no se puede deshacer.`}
        confirmLabel="Eliminar"
        cancelLabel="Cancelar"
        variant="danger"
      />

      {/* Toggle Status Dialog */}
      <ConfirmDialog
        isOpen={toggleDialog.isOpen}
        onClose={() => setToggleDialog({ isOpen: false, service: null })}
        onConfirm={() => handleToggleStatus(toggleDialog.service)}
        title={toggleDialog.service?.active ? '¿Desactivar servicio?' : '¿Activar servicio?'}
        message={
          toggleDialog.service?.active
            ? `El servicio "${toggleDialog.service?.name}" dejará de estar disponible para reservas.`
            : `El servicio "${toggleDialog.service?.name}" estará disponible para reservas.`
        }
        confirmLabel={toggleDialog.service?.active ? 'Desactivar' : 'Activar'}
        cancelLabel="Cancelar"
        variant="warning"
      />
    </div>
  );
}

// ==========================================
// Componente: ServiceCard
// ==========================================
function ServiceCard({ service, onDelete, onToggle }) {
  return (
    <div className="bg-[var(--color-gothic-shadow)] border border-[var(--color-gothic-iron)] rounded-xl overflow-hidden hover:border-[var(--color-gothic-amethyst)] transition-colors">
      {/* Image */}
      <div className="relative h-48 bg-[var(--color-gothic-void)]">
        {service.main_image ? (
          <Image
            src={service.main_image}
            alt={service.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Scissors className="w-16 h-16 text-[var(--color-gothic-ash)]" />
          </div>
        )}
        
        {/* Status Badge */}
        <div className="absolute top-3 right-3">
          <Badge variant={service.active ? 'success' : 'danger'}>
            {service.active ? 'Activo' : 'Inactivo'}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-bold mb-2 text-[var(--color-gothic-pearl)]">
          {service.name}
        </h3>
        
        <p className="text-sm text-[var(--color-gothic-smoke)] mb-4 line-clamp-2">
          {service.description}
        </p>

        {/* Info */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-2xl font-black text-[var(--color-gothic-amethyst)]">
              ${service.base_price}
            </p>
            <p className="text-xs text-[var(--color-gothic-ash)]">
              {service.duration_minutes} minutos
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Link
            href={`/admin/services/${service._id}/edit`}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-[var(--color-gothic-void)] border border-[var(--color-gothic-iron)] text-[var(--color-gothic-silver)] rounded-lg hover:bg-[var(--color-gothic-steel)] transition-colors"
          >
            <Edit size={16} />
            <span className="text-sm font-semibold">Editar</span>
          </Link>

          <button
            onClick={onToggle}
            className="px-3 py-2 bg-[var(--color-gothic-void)] border border-[var(--color-gothic-iron)] text-[var(--color-gothic-silver)] rounded-lg hover:bg-[var(--color-gothic-steel)] transition-colors"
            title={service.active ? 'Desactivar' : 'Activar'}
          >
            <Power size={16} />
          </button>

          <button
            onClick={onDelete}
            className="px-3 py-2 bg-red-900/20 border border-red-500/50 text-red-400 rounded-lg hover:bg-red-900/30 transition-colors"
            title="Eliminar"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}