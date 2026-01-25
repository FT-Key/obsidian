// src/components/admin/ProductFormVariants.jsx
'use client';

import { Plus, Trash2 } from 'lucide-react';

export default function ProductFormVariants({ variants, onAdd, onUpdate, onRemove }) {
  return (
    <div className="bg-[var(--color-gothic-shadow)] border border-[var(--color-gothic-iron)] rounded-lg p-4 sm:p-6 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0 mb-4">
        <h2 className="text-lg sm:text-xl font-bold text-[var(--color-gothic-chrome)]">
          Variantes (Opcional)
        </h2>
        <button
          type="button"
          onClick={onAdd}
          className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-[var(--color-gothic-amethyst)] text-white rounded-lg hover:bg-[var(--color-gothic-plum)] transition-colors text-sm sm:text-base"
        >
          <Plus className="w-4 h-4" />
          Agregar Variante
        </button>
      </div>

      {variants.map((variant, index) => (
        <div 
          key={index} 
          className="p-3 sm:p-4 bg-[var(--color-gothic-void)] border border-[var(--color-gothic-iron)] rounded-lg space-y-3"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm sm:text-base font-semibold">
              Variante {index + 1}
              {variant._id && (
                <span className="ml-2 text-[10px] sm:text-xs text-green-400">
                  (Existente)
                </span>
              )}
            </span>
            <button
              type="button"
              onClick={() => onRemove(index)}
              className="text-red-400 hover:text-red-300 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3">
            <input
              type="text"
              placeholder="Nombre *"
              value={variant.name}
              onChange={(e) => onUpdate(index, 'name', e.target.value)}
              className="px-2 sm:px-3 py-1.5 sm:py-2 bg-[var(--color-gothic-shadow)] border border-[var(--color-gothic-iron)] rounded text-xs sm:text-sm text-[var(--color-gothic-silver)] focus:outline-none focus:ring-2 focus:ring-[var(--color-gothic-amethyst)]"
            />
            <input
              type="text"
              placeholder="Color"
              value={variant.color}
              onChange={(e) => onUpdate(index, 'color', e.target.value)}
              className="px-2 sm:px-3 py-1.5 sm:py-2 bg-[var(--color-gothic-shadow)] border border-[var(--color-gothic-iron)] rounded text-xs sm:text-sm text-[var(--color-gothic-silver)] focus:outline-none focus:ring-2 focus:ring-[var(--color-gothic-amethyst)]"
            />
            <input
              type="text"
              placeholder="Talle"
              value={variant.size}
              onChange={(e) => onUpdate(index, 'size', e.target.value)}
              className="px-2 sm:px-3 py-1.5 sm:py-2 bg-[var(--color-gothic-shadow)] border border-[var(--color-gothic-iron)] rounded text-xs sm:text-sm text-[var(--color-gothic-silver)] focus:outline-none focus:ring-2 focus:ring-[var(--color-gothic-amethyst)]"
            />
            <input
              type="number"
              placeholder="Precio *"
              step="0.01"
              value={variant.price}
              onChange={(e) => onUpdate(index, 'price', e.target.value)}
              className="px-2 sm:px-3 py-1.5 sm:py-2 bg-[var(--color-gothic-shadow)] border border-[var(--color-gothic-iron)] rounded text-xs sm:text-sm text-[var(--color-gothic-silver)] focus:outline-none focus:ring-2 focus:ring-[var(--color-gothic-amethyst)]"
            />
            <input
              type="number"
              placeholder="Stock *"
              value={variant.stock}
              onChange={(e) => onUpdate(index, 'stock', e.target.value)}
              className="px-2 sm:px-3 py-1.5 sm:py-2 bg-[var(--color-gothic-shadow)] border border-[var(--color-gothic-iron)] rounded text-xs sm:text-sm text-[var(--color-gothic-silver)] focus:outline-none focus:ring-2 focus:ring-[var(--color-gothic-amethyst)]"
            />
          </div>
        </div>
      ))}

      {variants.length === 0 && (
        <p className="text-center text-[var(--color-gothic-smoke)] py-4 text-sm">
          No hay variantes agregadas
        </p>
      )}
    </div>
  );
}