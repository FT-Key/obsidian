'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Search, Edit, Trash2, Eye, Package, Loader2, AlertCircle } from 'lucide-react';

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');

  useEffect(() => {
    fetchProducts();
  }, [category]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const params = new URLSearchParams();
      if (category !== 'all') params.append('category', category);
      
      console.log('Fetching from:', `/api/products?${params}`);
      
      const response = await fetch(`/api/products?${params}`);
      
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const text = await response.text();
        console.error('Error response:', text);
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.error('Not JSON response:', text);
        throw new Error('La respuesta del servidor no es JSON válido');
      }
      
      const data = await response.json();
      console.log('Products data:', data);
      
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
    if (!confirm('¿Estás seguro de eliminar este producto?')) return;

    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setProducts(products.filter(p => p._id !== id));
        alert('Producto eliminado correctamente');
      } else {
        throw new Error('Error al eliminar producto');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Error al eliminar producto: ' + error.message);
    }
  };

  const filteredProducts = products.filter(product =>
    product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[var(--color-gothic-abyss)] text-[var(--color-gothic-silver)] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-black mb-2" style={{ color: 'var(--color-gothic-pearl)' }}>
              Productos
            </h1>
            <p className="text-[var(--color-gothic-smoke)]">
              Gestiona tu catálogo de productos
            </p>
          </div>

          <Link
            href="/admin/products/new"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-br from-[var(--color-gothic-amethyst)] to-[var(--color-gothic-plum)] text-white font-semibold rounded-lg hover:scale-105 transition-transform"
          >
            <Plus className="w-5 h-5" />
            Nuevo Producto
          </Link>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 bg-red-900/20 border border-red-500 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-bold text-red-300 mb-1">Error al cargar productos</h3>
              <p className="text-sm text-red-200 mb-2">{error}</p>
              <button
                onClick={fetchProducts}
                className="text-sm font-semibold underline text-red-300 hover:text-red-200 transition-colors"
              >
                Reintentar
              </button>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-gothic-smoke)]" />
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-[var(--color-gothic-shadow)] border border-[var(--color-gothic-iron)] rounded-lg text-[var(--color-gothic-silver)] placeholder:text-[var(--color-gothic-ash)] focus:outline-none focus:ring-2 focus:ring-[var(--color-gothic-amethyst)]"
            />
          </div>

          {/* Category Filter */}
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
        {loading && (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-[var(--color-gothic-amethyst)]" />
          </div>
        )}

        {/* Products Grid */}
        {!loading && !error && filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <Package className="w-16 h-16 mx-auto mb-4 text-[var(--color-gothic-ash)]" />
            <h3 className="text-xl font-bold mb-2">No hay productos</h3>
            <p className="text-[var(--color-gothic-smoke)] mb-6">
              {searchTerm ? 'No se encontraron resultados' : 'Comienza agregando tu primer producto'}
            </p>
            {!searchTerm && (
              <Link
                href="/admin/products/new"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-gothic-steel)] text-white font-semibold rounded-lg hover:bg-[var(--color-gothic-gunmetal)] transition-colors"
              >
                <Plus className="w-5 h-5" />
                Crear Producto
              </Link>
            )}
          </div>
        )}

        {!loading && !error && filteredProducts.length > 0 && (
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
                  
                  {/* Stock Badge */}
                  <div className="absolute top-2 right-2">
                    <span
                      className={`px-2 py-1 text-xs font-bold rounded ${
                        product.stock > 0
                          ? 'bg-green-900/80 text-green-300'
                          : 'bg-red-900/80 text-red-300'
                      }`}
                    >
                      {product.stock > 0 ? `Stock: ${product.stock}` : 'Sin stock'}
                    </span>
                  </div>

                  {/* Featured Badge */}
                  {product.featured && (
                    <div className="absolute top-2 left-2">
                      <span className="px-2 py-1 text-xs font-bold rounded bg-purple-900/80 text-purple-300">
                        Destacado
                      </span>
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
                    <span className={`px-2 py-1 text-xs rounded ${
                      product.active
                        ? 'bg-green-900/30 text-green-400'
                        : 'bg-gray-800 text-gray-400'
                    }`}>
                      {product.active ? 'Activo' : 'Inactivo'}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => window.open(`/products/${product._id}`, '_blank')}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-[var(--color-gothic-iron)] hover:bg-[var(--color-gothic-steel)] text-[var(--color-gothic-silver)] rounded transition-colors"
                      title="Ver"
                    >
                      <Eye className="w-4 h-4" />
                    </button>

                    <Link
                      href={`/admin/products/${product._id}/edit`}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-[var(--color-gothic-amethyst)] hover:bg-[var(--color-gothic-plum)] text-white rounded transition-colors"
                      title="Editar"
                    >
                      <Edit className="w-4 h-4" />
                    </Link>

                    <button
                      onClick={() => handleDelete(product._id)}
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
        )}

        {/* Stats */}
        {!loading && !error && filteredProducts.length > 0 && (
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
        )}
      </div>
    </div>
  );
}