// src/components/admin/ProductFormImages.jsx
'use client';

import { Upload, X, Plus } from 'lucide-react';

export default function ProductFormImages({ 
  mainImagePreview,
  currentAdditionalImages,
  additionalPreviews,
  onMainImageSelect,
  onMainImageRemove,
  onAdditionalImagesSelect,
  onRemoveCurrentAdditional,
  onRemoveNewAdditional
}) {
  return (
    <div className="bg-[var(--color-gothic-shadow)] border border-[var(--color-gothic-iron)] rounded-lg p-4 sm:p-6 space-y-4">
      <h2 className="text-lg sm:text-xl font-bold text-[var(--color-gothic-chrome)] mb-4">
        Imágenes
      </h2>

      {/* Imagen Principal */}
      <div>
        <label className="block text-sm font-semibold mb-2">
          Imagen Principal *
        </label>
        
        {mainImagePreview && (
          <div className="relative bg-[var(--color-gothic-void)] rounded-lg p-3 sm:p-4 mb-4">
            <img 
              src={mainImagePreview} 
              alt="Preview" 
              className="w-full h-48 sm:h-64 object-contain rounded-lg" 
            />
            <button
              type="button"
              onClick={onMainImageRemove}
              className="absolute top-4 sm:top-6 right-4 sm:right-6 p-1.5 sm:p-2 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
            >
              <X className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
            </button>
          </div>
        )}
        
        <label className="flex flex-col items-center justify-center w-full h-28 sm:h-32 border-2 border-dashed border-[var(--color-gothic-iron)] rounded-lg cursor-pointer hover:border-[var(--color-gothic-amethyst)] transition-colors">
          <Upload className="w-6 h-6 sm:w-8 sm:h-8 mb-2 text-[var(--color-gothic-smoke)]" />
          <span className="text-xs sm:text-sm text-[var(--color-gothic-smoke)]">
            {mainImagePreview ? 'Cambiar imagen' : 'Seleccionar imagen'}
          </span>
          <input
            type="file"
            accept="image/*"
            onChange={onMainImageSelect}
            className="hidden"
          />
        </label>
      </div>

      {/* Imágenes Adicionales */}
      <div>
        <label className="block text-sm font-semibold mb-2">
          Imágenes Adicionales (opcional, máx. 5)
        </label>
        
        <label className="flex flex-col items-center justify-center w-full h-24 sm:h-32 border-2 border-dashed border-[var(--color-gothic-iron)] rounded-lg cursor-pointer hover:border-[var(--color-gothic-amethyst)] transition-colors">
          <Plus className="w-6 h-6 sm:w-8 sm:h-8 mb-2 text-[var(--color-gothic-smoke)]" />
          <span className="text-xs sm:text-sm text-[var(--color-gothic-smoke)]">
            Agregar imágenes
          </span>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={onAdditionalImagesSelect}
            className="hidden"
          />
        </label>

        {(currentAdditionalImages.length > 0 || additionalPreviews.length > 0) && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mt-4">
            {/* Imágenes actuales */}
            {currentAdditionalImages.map((url, index) => (
              <div key={`current-${index}`} className="relative group">
                <img 
                  src={url} 
                  alt={`Current ${index + 1}`} 
                  className="w-full h-24 sm:h-32 object-cover rounded-lg" 
                />
                <button
                  type="button"
                  onClick={() => onRemoveCurrentAdditional(index)}
                  className="absolute top-1 sm:top-2 right-1 sm:right-2 p-1 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                </button>
              </div>
            ))}
            
            {/* Nuevas imágenes */}
            {additionalPreviews.map((preview, index) => (
              <div key={`new-${index}`} className="relative group">
                <img 
                  src={preview} 
                  alt={`New ${index + 1}`} 
                  className="w-full h-24 sm:h-32 object-cover rounded-lg" 
                />
                <div className="absolute top-1 sm:top-2 left-1 sm:left-2 px-1.5 sm:px-2 py-0.5 sm:py-1 bg-green-500 text-white text-[10px] sm:text-xs rounded font-semibold">
                  Nueva
                </div>
                <button
                  type="button"
                  onClick={() => onRemoveNewAdditional(index)}
                  className="absolute top-1 sm:top-2 right-1 sm:right-2 p-1 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}