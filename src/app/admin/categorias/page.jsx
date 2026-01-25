// ==========================================
// 📁 app/admin/categories/page.jsx
// ==========================================
'use client';

import { useState, useEffect } from 'react';
import { Layers, TrendingUp, Package, Archive } from 'lucide-react';
import PageHeader from '@/components/admin/shared/PageHeader';
import SearchBar from '@/components/admin/shared/SearchBar';
import LoadingSpinner from '@/components/admin/shared/LoadingSpinner';
import ErrorAlert from '@/components/admin/shared/ErrorAlert';
import EmptyState from '@/components/admin/shared/EmptyState';
import ConfirmDialog from '@/components/admin/shared/ConfirmDialog';
import CategoryTable from '@/components/admin/tables/CategoryTable';
import CategoryForm from '@/components/admin/forms/CategoryForm';
import { categoryService } from '@/lib/api/services/categoryService';

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modales
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Cargar datos iniciales
  useEffect(() => {
    loadData();
  }, []);

  // Filtrar categorías por búsqueda
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredCategories(categories);
    } else {
      const filtered = categories.filter(cat =>
        cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (cat.description && cat.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredCategories(filtered);
    }
  }, [searchTerm, categories]);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [categoriesRes, statsRes] = await Promise.all([
        categoryService.getAll(),
        categoryService.getStats()
      ]);
      
      console.log([categoriesRes, statsRes])
      setCategories(categoriesRes.categories || []);
      setStats(statsRes || {});
    } catch (err) {
      setError(err.response?.data?.message || 'Error al cargar las categorías');
      console.error('Error loading categories:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (formData) => {
    try {
      setIsSubmitting(true);
      await categoryService.create(formData);
      setShowCreateModal(false);
      loadData();
    } catch (err) {
      alert(err.response?.data?.message || 'Error al crear la categoría');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = async (formData) => {
    try {
      setIsSubmitting(true);
      await categoryService.update(selectedCategory._id, formData);
      setShowEditModal(false);
      setSelectedCategory(null);
      loadData();
    } catch (err) {
      alert(err.response?.data?.message || 'Error al actualizar la categoría');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    try {
      await categoryService.delete(selectedCategory._id);
      setShowDeleteDialog(false);
      setSelectedCategory(null);
      loadData();
    } catch (err) {
      alert(err.response?.data?.message || 'Error al eliminar la categoría');
    }
  };

  const handleToggleStatus = async (category) => {
    try {
      await categoryService.toggleStatus(category._id);
      loadData();
    } catch (err) {
      alert(err.response?.data?.message || 'Error al cambiar el estado');
    }
  };

  const openEditModal = (category) => {
    setSelectedCategory(category);
    setShowEditModal(true);
  };

  const openDeleteDialog = (category) => {
    setSelectedCategory(category);
    setShowDeleteDialog(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--color-gothic-abyss)] p-8">
        <LoadingSpinner message="Cargando categorías..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-gothic-abyss)] p-8">
      <PageHeader
        title="Categorías"
        description="Administra las categorías de productos"
        showAction={true}
      >
        <button
          onClick={() => setShowCreateModal(true)}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-br from-[var(--color-gothic-amethyst)] to-[var(--color-gothic-plum)] text-white font-semibold rounded-lg hover:scale-105 transition-transform"
        >
          <Layers className="w-5 h-5" />
          Nueva Categoría
        </button>
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={Layers}
            label="Total Categorías"
            value={stats.totalCategories || 0}
            variant="purple"
          />
          <StatCard
            icon={TrendingUp}
            label="Activas"
            value={stats.activeCategories || 0}
            variant="success"
          />
          <StatCard
            icon={Archive}
            label="Inactivas"
            value={stats.inactiveCategories || 0}
            variant="danger"
          />
          <StatCard
            icon={Package}
            label="Con Productos"
            value={stats.categoriesWithProducts || 0}
            variant="info"
          />
        </div>
      )}

      {/* Search Bar */}
      <div className="mb-6">
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Buscar categorías por nombre o descripción..."
        />
      </div>

      {/* Table or Empty State */}
      {filteredCategories.length === 0 ? (
        <EmptyState
          icon={Layers}
          title={searchTerm ? 'No se encontraron categorías' : 'No hay categorías'}
          description={searchTerm ? 'Intenta con otros términos de búsqueda' : 'Comienza creando tu primera categoría de productos'}
          actionLabel="Crear Primera Categoría"
          actionHref="#"
          showAction={!searchTerm}
        />
      ) : (
        <div className="bg-[var(--color-gothic-shadow)] border border-[var(--color-gothic-iron)] rounded-xl overflow-hidden">
          <CategoryTable
            categories={filteredCategories}
            onEdit={openEditModal}
            onDelete={openDeleteDialog}
            onToggleStatus={handleToggleStatus}
          />
        </div>
      )}

      {/* Create Modal */}
      {showCreateModal && (
        <Modal
          title="Crear Categoría"
          onClose={() => setShowCreateModal(false)}
        >
          <CategoryForm
            onSubmit={handleCreate}
            onCancel={() => setShowCreateModal(false)}
            isSubmitting={isSubmitting}
          />
        </Modal>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <Modal
          title="Editar Categoría"
          onClose={() => {
            setShowEditModal(false);
            setSelectedCategory(null);
          }}
        >
          <CategoryForm
            category={selectedCategory}
            onSubmit={handleEdit}
            onCancel={() => {
              setShowEditModal(false);
              setSelectedCategory(null);
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
          setSelectedCategory(null);
        }}
        onConfirm={handleDelete}
        title="¿Eliminar categoría?"
        message={`¿Estás seguro de eliminar "${selectedCategory?.name}"? Esta acción no se puede deshacer.`}
        confirmLabel="Eliminar"
        variant="danger"
      />
    </div>
  );
}

// Componente StatCard
function StatCard({ icon: Icon, label, value, variant = 'default' }) {
  const variants = {
    purple: 'from-purple-600 to-purple-800',
    success: 'from-green-600 to-green-800',
    danger: 'from-red-600 to-red-800',
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
      
      <div className="relative bg-[var(--color-gothic-shadow)] border border-[var(--color-gothic-iron)] rounded-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-black mb-6 text-[var(--color-gothic-pearl)]">
          {title}
        </h2>
        {children}
      </div>
    </div>
  );
}