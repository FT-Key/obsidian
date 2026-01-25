// ==========================================
// 📁 components/admin/forms/CategoryForm.jsx
// ==========================================
'use client';

import { useState, useEffect } from 'react';
import { Save, X } from 'lucide-react';

export default function CategoryForm({ 
  category = null, 
  onSubmit, 
  onCancel, 
  isSubmitting = false 
}) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    active: true
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name || '',
        description: category.description || '',
        active: category.active ?? true
      });
    }
  }, [category]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es obligatorio';
    } else if (formData.name.length < 2) {
      newErrors.name = 'El nombre debe tener al menos 2 caracteres';
    }

    if (formData.description && formData.description.length > 500) {
      newErrors.description = 'La descripción no puede exceder 500 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Limpiar error del campo al escribir
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Nombre */}
      <div>
        <label 
          htmlFor="name" 
          className="block text-sm font-bold mb-2 text-[var(--color-gothic-pearl)]"
        >
          Nombre *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full px-4 py-3 bg-[var(--color-gothic-shadow)] border ${
            errors.name 
              ? 'border-red-500 focus:ring-red-500' 
              : 'border-[var(--color-gothic-iron)] focus:ring-[var(--color-gothic-amethyst)]'
          } rounded-lg text-[var(--color-gothic-silver)] placeholder:text-[var(--color-gothic-ash)] focus:outline-none focus:ring-2`}
          placeholder="Ej: Anillos, Collares, Pulseras"
          disabled={isSubmitting}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-400">{errors.name}</p>
        )}
      </div>

      {/* Descripción */}
      <div>
        <label 
          htmlFor="description" 
          className="block text-sm font-bold mb-2 text-[var(--color-gothic-pearl)]"
        >
          Descripción
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className={`w-full px-4 py-3 bg-[var(--color-gothic-shadow)] border ${
            errors.description 
              ? 'border-red-500 focus:ring-red-500' 
              : 'border-[var(--color-gothic-iron)] focus:ring-[var(--color-gothic-amethyst)]'
          } rounded-lg text-[var(--color-gothic-silver)] placeholder:text-[var(--color-gothic-ash)] focus:outline-none focus:ring-2 resize-none`}
          placeholder="Describe esta categoría (opcional)"
          disabled={isSubmitting}
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-400">{errors.description}</p>
        )}
        <p className="mt-1 text-xs text-[var(--color-gothic-smoke)]">
          {formData.description.length}/500 caracteres
        </p>
      </div>

      {/* Estado */}
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="active"
          name="active"
          checked={formData.active}
          onChange={handleChange}
          className="w-5 h-5 bg-[var(--color-gothic-shadow)] border-[var(--color-gothic-iron)] rounded text-[var(--color-gothic-amethyst)] focus:ring-2 focus:ring-[var(--color-gothic-amethyst)]"
          disabled={isSubmitting}
        />
        <label 
          htmlFor="active" 
          className="text-sm font-semibold text-[var(--color-gothic-silver)]"
        >
          Categoría activa
        </label>
      </div>

      {/* Botones */}
      <div className="flex gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="flex-1 px-6 py-3 bg-[var(--color-gothic-void)] border border-[var(--color-gothic-iron)] text-[var(--color-gothic-silver)] rounded-lg hover:bg-[var(--color-gothic-steel)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
        >
          <X className="w-5 h-5 inline mr-2" />
          Cancelar
        </button>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 px-6 py-3 bg-gradient-to-br from-[var(--color-gothic-amethyst)] to-[var(--color-gothic-plum)] text-white font-semibold rounded-lg hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          <Save className="w-5 h-5 inline mr-2" />
          {isSubmitting ? 'Guardando...' : (category ? 'Actualizar' : 'Crear Categoría')}
        </button>
      </div>
    </form>
  );
}