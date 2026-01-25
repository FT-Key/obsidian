'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Edit, Trash2, Eye, Package } from 'lucide-react';
import PageHeader from '@/components/admin/shared/PageHeader';
import SearchBar from '@/components/admin/shared/SearchBar';
import LoadingSpinner from '@/components/admin/shared/LoadingSpinner';
import ErrorAlert from '@/components/admin/shared/ErrorAlert';
import EmptyState from '@/components/admin/shared/EmptyState';
import Badge from '@/components/admin/shared/Badge';
import ConfirmDialog from '@/components/admin/shared/ConfirmDialog';

export default function AdminProductosPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [deleteDialog, setDeleteDialog] = useState({ isOpen: false, productId: null });

  useEffect(() => {
    fetchProducts();
  }, [category]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const params = new URLSearchParams();
      if (category !== 'all') params.append('category', category);
      
      const response = await fetch(`/api/products?${params}`);
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      setProducts(Array.isArray(data.products) ? data.products : []);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError(error.message);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setProducts(products.filter(p => p._id !== id));
        // TODO: Mostrar toast de éxito
      } else {
        throw new Error('Error al eliminar producto');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      // TODO: Mostrar toast de error
    }
  };

  const filteredProducts = products.filter(product =>
    product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <PageHeader
        title="Productos"
        description="Gestiona tu catálogo de productos"
        actionLabel="Nuevo Producto"
        actionHref="/admin/productos/nuevo"
      />

      {/* Error Alert */}
      {error && (
        <ErrorAlert
          title="Error al cargar productos"
          message={error}
          onRetry={fetchProducts}
        />
      )}

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Buscar productos..."
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-3 bg-[var(--color-gothic-shadow)] border border-[var(--color-gothic-iron)] rounded-lg text-[var(--color-gothic-silver)] focus:outline-none focus:ring-2 focus:ring-[var(--color-gothic-amethyst)]"
        >
          <option value="all">Todas las categorías</option>
          <option value="ropa">Ropa</option>
          <option value="accesorios">Accesorios</option>
          <option value="calzado">Calzado</option>
        </select>
      </div>

      {/* Loading */}
      {loading && <LoadingSpinner message="Cargando productos..." />}

      {/* Empty State */}
      {!loading && !error && filteredProducts.length === 0 && (
        <EmptyState
          icon={Package}
          title={searchTerm ? 'No se encontraron resultados' : 'No hay productos'}
          description={
            searchTerm 
              ? 'Intenta con otros términos de búsqueda' 
              : 'Comienza agregando tu primer producto'
          }
          actionLabel="Crear Producto"
          actionHref="/admin/productos/nuevo"
          showAction={!searchTerm}
        />
      )}

      {/* Products Grid */}
      {!loading && !error && filteredProducts.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className="bg-[var(--color-gothic-shadow)] border border-[var(--color-gothic-iron)] rounded-lg overflow-hidden hover:border-[var(--color-gothic-amethyst)] transition-colors"
              >
                {/* Image */}
                <div className="relative h-48 bg-[var(--color-gothic-void)]">
                  {product.main_image ? (
                    <img
                      src={product.main_image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <Package className="w-12 h-12 text-[var(--color-gothic-ash)]" />
                    </div>
                  )}
                  
                  {/* Badges */}
                  <div className="absolute top-2 right-2 flex flex-col gap-2">
                    <Badge variant={product.stock > 0 ? 'success' : 'danger'}>
                      {product.stock > 0 ? `Stock: ${product.stock}` : 'Sin stock'}
                    </Badge>
                  </div>

                  {product.featured && (
                    <div className="absolute top-2 left-2">
                      <Badge variant="purple">Destacado</Badge>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="text-lg font-bold mb-2 text-[var(--color-gothic-chrome)] line-clamp-1">
                    {product.name}
                  </h3>
                  
                  <p className="text-sm text-[var(--color-gothic-smoke)] mb-3 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-[var(--color-gothic-amethyst)]">
                      ${product.price?.toLocaleString() || '0'}
                    </span>
                    <Badge variant={product.active ? 'success' : 'default'}>
                      {product.active ? 'Activo' : 'Inactivo'}
                    </Badge>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => window.open(`/productos/${product._id}`, '_blank')}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-[var(--color-gothic-iron)] hover:bg-[var(--color-gothic-steel)] text-[var(--color-gothic-silver)] rounded transition-colors"
                      title="Ver"
                    >
                      <Eye className="w-4 h-4" />
                    </button>

                    <Link
                      href={`/admin/productos/${product._id}/editar`}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-[var(--color-gothic-amethyst)] hover:bg-[var(--color-gothic-plum)] text-white rounded transition-colors"
                      title="Editar"
                    >
                      <Edit className="w-4 h-4" />
                    </Link>

                    <button
                      onClick={() => setDeleteDialog({ isOpen: true, productId: product._id })}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-900 hover:bg-red-800 text-white rounded transition-colors"
                      title="Eliminar"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="mt-8 p-4 bg-[var(--color-gothic-shadow)] border border-[var(--color-gothic-iron)] rounded-lg">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-[var(--color-gothic-pearl)]">
                  {filteredProducts.length}
                </div>
                <div className="text-sm text-[var(--color-gothic-smoke)]">
                  Total productos
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-400">
                  {filteredProducts.filter(p => p.stock > 0).length}
                </div>
                <div className="text-sm text-[var(--color-gothic-smoke)]">
                  Con stock
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-400">
                  {filteredProducts.filter(p => p.featured).length}
                </div>
                <div className="text-sm text-[var(--color-gothic-smoke)]">
                  Destacados
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-400">
                  {filteredProducts.filter(p => !p.active).length}
                </div>
                <div className="text-sm text-[var(--color-gothic-smoke)]">
                  Inactivos
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        isOpen={deleteDialog.isOpen}
        onClose={() => setDeleteDialog({ isOpen: false, productId: null })}
        onConfirm={() => handleDelete(deleteDialog.productId)}
        title="¿Eliminar producto?"
        message="Esta acción no se puede deshacer. El producto y sus imágenes se eliminarán permanentemente."
        confirmLabel="Eliminar"
        cancelLabel="Cancelar"
        variant="danger"
      />
    </div>
  );
}