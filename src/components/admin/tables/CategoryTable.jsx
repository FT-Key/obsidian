// ==========================================
// 📁 components/admin/tables/CategoryTable.jsx
// ==========================================
'use client';

import { Edit2, Trash2, Package } from 'lucide-react';
import Badge from '../shared/Badge';

export default function CategoryTable({ 
  categories, 
  onEdit, 
  onDelete, 
  onToggleStatus 
}) {
  if (!categories || categories.length === 0) {
    return null;
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('es-AR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-[var(--color-gothic-iron)]">
            <th className="text-left py-4 px-4 text-sm font-bold text-[var(--color-gothic-pearl)]">
              Nombre
            </th>
            <th className="text-left py-4 px-4 text-sm font-bold text-[var(--color-gothic-pearl)]">
              Descripción
            </th>
            <th className="text-center py-4 px-4 text-sm font-bold text-[var(--color-gothic-pearl)]">
              Productos
            </th>
            <th className="text-center py-4 px-4 text-sm font-bold text-[var(--color-gothic-pearl)]">
              Estado
            </th>
            <th className="text-center py-4 px-4 text-sm font-bold text-[var(--color-gothic-pearl)]">
              Creada
            </th>
            <th className="text-right py-4 px-4 text-sm font-bold text-[var(--color-gothic-pearl)]">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr 
              key={category._id} 
              className="border-b border-[var(--color-gothic-iron)] hover:bg-[var(--color-gothic-shadow)] transition-colors"
            >
              <td className="py-4 px-4">
                <div className="font-bold text-[var(--color-gothic-pearl)]">
                  {category.name}
                </div>
              </td>
              
              <td className="py-4 px-4">
                <div className="text-sm text-[var(--color-gothic-smoke)] max-w-xs truncate">
                  {category.description || 'Sin descripción'}
                </div>
              </td>
              
              <td className="py-4 px-4 text-center">
                <div className="flex items-center justify-center gap-2 text-[var(--color-gothic-smoke)]">
                  <Package className="w-4 h-4" />
                  <span className="text-sm font-semibold">
                    {category.productCount || 0}
                  </span>
                </div>
              </td>
              
              <td className="py-4 px-4 text-center">
                <button
                  onClick={() => onToggleStatus(category)}
                  className="transition-transform hover:scale-105"
                >
                  <Badge variant={category.active ? 'success' : 'danger'}>
                    {category.active ? 'Activa' : 'Inactiva'}
                  </Badge>
                </button>
              </td>
              
              <td className="py-4 px-4 text-center">
                <span className="text-sm text-[var(--color-gothic-smoke)]">
                  {formatDate(category.createdAt)}
                </span>
              </td>
              
              <td className="py-4 px-4">
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => onEdit(category)}
                    className="p-2 bg-[var(--color-gothic-steel)] border border-[var(--color-gothic-iron)] text-[var(--color-gothic-silver)] rounded-lg hover:bg-[var(--color-gothic-gunmetal)] transition-colors"
                    title="Editar categoría"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  
                  <button
                    onClick={() => onDelete(category)}
                    className="p-2 bg-red-900/20 border border-red-500/30 text-red-400 rounded-lg hover:bg-red-900/40 transition-colors"
                    title="Eliminar categoría"
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