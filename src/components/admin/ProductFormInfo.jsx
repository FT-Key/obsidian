// src/components/admin/ProductFormInfo.jsx
'use client';

import { Loader2 } from 'lucide-react';

export default function ProductFormInfo({ formData, categories, loadingCategories, onChange }) {
  return (
    <div className="bg-[var(--color-gothic-shadow)] border border-[var(--color-gothic-iron)] rounded-lg p-4 sm:p-6 space-y-4">
      <h2 className="text-lg sm:text-xl font-bold text-[var(--color-gothic-chrome)] mb-4">
        Información Básica
      </h2>

      <div>
        <label className="block text-sm font-semibold mb-2">
          Nombre del Producto *
        </label>
        <input
          type="text"
          name="name"
          required
          value={formData.name}
          onChange={onChange}
          className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-[var(--color-gothic-void)] border border-[var(--color-gothic-iron)] rounded-lg text-[var(--color-gothic-silver)] focus:outline-none focus:ring-2 focus:ring-[var(--color-gothic-amethyst)] text-sm sm:text-base"
          placeholder="Ej: Bolso de Cuero Premium"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">
          Descripción *
        </label>
        <textarea
          name="description"
          required
          value={formData.description}
          onChange={onChange}
          rows={4}
          className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-[var(--color-gothic-void)] border border-[var(--color-gothic-iron)] rounded-lg text-[var(--color-gothic-silver)] focus:outline-none focus:ring-2 focus:ring-[var(--color-gothic-amethyst)] text-sm sm:text-base resize-none"
          placeholder="Describe el producto..."
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div>
          <label className="block text-sm font-semibold mb-2">Precio *</label>
          <input
            type="number"
            name="price"
            required
            min="0"
            step="0.01"
            value={formData.price}
            onChange={onChange}
            className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-[var(--color-gothic-void)] border border-[var(--color-gothic-iron)] rounded-lg text-[var(--color-gothic-silver)] focus:outline-none focus:ring-2 focus:ring-[var(--color-gothic-amethyst)] text-sm sm:text-base"
            placeholder="0.00"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Stock *</label>
          <input
            type="number"
            name="stock"
            required
            min="0"
            value={formData.stock}
            onChange={onChange}
            className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-[var(--color-gothic-void)] border border-[var(--color-gothic-iron)] rounded-lg text-[var(--color-gothic-silver)] focus:outline-none focus:ring-2 focus:ring-[var(--color-gothic-amethyst)] text-sm sm:text-base"
            placeholder="0"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-semibold mb-2">Categoría *</label>
          {loadingCategories ? (
            <div className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-3 bg-[var(--color-gothic-void)] border border-[var(--color-gothic-iron)] rounded-lg">
              <Loader2 className="w-4 h-4 animate-spin text-[var(--color-gothic-amethyst)]" />
              <span className="text-xs sm:text-sm text-[var(--color-gothic-smoke)]">
                Cargando categorías...
              </span>
            </div>
          ) : (
            <select
              name="category"
              required
              value={formData.category}
              onChange={onChange}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-[var(--color-gothic-void)] border border-[var(--color-gothic-iron)] rounded-lg text-[var(--color-gothic-silver)] focus:outline-none focus:ring-2 focus:ring-[var(--color-gothic-amethyst)] text-sm sm:text-base"
            >
              <option value="">Selecciona una categoría</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            name="featured"
            checked={formData.featured}
            onChange={onChange}
            className="w-4 h-4 sm:w-5 sm:h-5 accent-[var(--color-gothic-amethyst)]"
          />
          <span className="text-sm sm:text-base">Producto Destacado</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            name="active"
            checked={formData.active}
            onChange={onChange}
            className="w-4 h-4 sm:w-5 sm:h-5 accent-[var(--color-gothic-amethyst)]"
          />
          <span className="text-sm sm:text-base">Activo</span>
        </label>
      </div>
    </div>
  );
}