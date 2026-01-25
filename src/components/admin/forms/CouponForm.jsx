// ==========================================
// 📁 components/admin/forms/CouponForm.jsx
// ==========================================
'use client';

import { useState, useEffect } from 'react';
import { Save, X, Percent, DollarSign, Calendar, Users, AlertCircle } from 'lucide-react';

export default function CouponForm({ 
  coupon = null, 
  onSubmit, 
  onCancel, 
  isSubmitting = false 
}) {
  const [formData, setFormData] = useState({
    code: '',
    type: 'percentage',
    value: '',
    minimum_amount: '',
    max_uses: '',
    start_date: '',
    end_date: '',
    active: true
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (coupon) {
      setFormData({
        code: coupon.code || '',
        type: coupon.type || 'percentage',
        value: coupon.value || '',
        minimum_amount: coupon.minimum_amount || '',
        max_uses: coupon.max_uses || '',
        start_date: coupon.start_date ? formatDateForInput(coupon.start_date) : '',
        end_date: coupon.end_date ? formatDateForInput(coupon.end_date) : '',
        active: coupon.active ?? true
      });
    } else {
      // Para nuevo cupón, establecer fecha de inicio a hoy
      const today = new Date();
      setFormData(prev => ({
        ...prev,
        start_date: formatDateForInput(today)
      }));
    }
  }, [coupon]);

  const formatDateForInput = (date) => {
    const d = new Date(date);
    return d.toISOString().slice(0, 16);
  };

  const validateForm = () => {
    const newErrors = {};

    // Código
    if (!formData.code.trim()) {
      newErrors.code = 'El código es obligatorio';
    } else if (formData.code.length < 3) {
      newErrors.code = 'El código debe tener al menos 3 caracteres';
    } else if (!/^[A-Z0-9]+$/.test(formData.code.toUpperCase())) {
      newErrors.code = 'El código solo puede contener letras y números';
    }

    // Valor
    if (!formData.value || formData.value <= 0) {
      newErrors.value = 'El valor debe ser mayor a 0';
    }

    if (formData.type === 'percentage' && formData.value > 100) {
      newErrors.value = 'El porcentaje no puede ser mayor a 100';
    }

    // Monto mínimo
    if (formData.minimum_amount && formData.minimum_amount < 0) {
      newErrors.minimum_amount = 'El monto mínimo no puede ser negativo';
    }

    // Usos máximos
    if (formData.max_uses && formData.max_uses <= 0) {
      newErrors.max_uses = 'Los usos máximos deben ser mayor a 0';
    }

    // Fechas
    if (!formData.start_date) {
      newErrors.start_date = 'La fecha de inicio es obligatoria';
    }

    if (!formData.end_date) {
      newErrors.end_date = 'La fecha de expiración es obligatoria';
    }

    if (formData.start_date && formData.end_date) {
      const start = new Date(formData.start_date);
      const end = new Date(formData.end_date);
      
      if (end <= start) {
        newErrors.end_date = 'La fecha de expiración debe ser posterior a la fecha de inicio';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Preparar datos para enviar
      const dataToSend = {
        ...formData,
        code: formData.code.toUpperCase(),
        value: parseFloat(formData.value),
        minimum_amount: formData.minimum_amount ? parseFloat(formData.minimum_amount) : 0,
        max_uses: formData.max_uses ? parseInt(formData.max_uses) : null,
      };
      
      onSubmit(dataToSend);
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

  const generateRandomCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 8; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setFormData(prev => ({ ...prev, code }));
    if (errors.code) {
      setErrors(prev => ({ ...prev, code: '' }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Código */}
      <div>
        <label 
          htmlFor="code" 
          className="block text-sm font-bold mb-2 text-[var(--color-gothic-pearl)]"
        >
          Código del Cupón *
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            id="code"
            name="code"
            value={formData.code}
            onChange={handleChange}
            className={`flex-1 px-4 py-3 bg-[var(--color-gothic-shadow)] border ${
              errors.code 
                ? 'border-red-500 focus:ring-red-500' 
                : 'border-[var(--color-gothic-iron)] focus:ring-[var(--color-gothic-amethyst)]'
            } rounded-lg text-[var(--color-gothic-silver)] placeholder:text-[var(--color-gothic-ash)] focus:outline-none focus:ring-2 uppercase font-mono`}
            placeholder="VERANO2024"
            disabled={isSubmitting}
            maxLength={20}
          />
          <button
            type="button"
            onClick={generateRandomCode}
            disabled={isSubmitting}
            className="px-4 py-3 bg-[var(--color-gothic-steel)] border border-[var(--color-gothic-iron)] text-[var(--color-gothic-silver)] rounded-lg hover:bg-[var(--color-gothic-gunmetal)] transition-colors font-semibold whitespace-nowrap"
          >
            Generar
          </button>
        </div>
        {errors.code && (
          <p className="mt-1 text-sm text-red-400">{errors.code}</p>
        )}
        <p className="mt-1 text-xs text-[var(--color-gothic-smoke)]">
          Solo letras mayúsculas y números, sin espacios
        </p>
      </div>

      {/* Tipo y Valor */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label 
            htmlFor="type" 
            className="block text-sm font-bold mb-2 text-[var(--color-gothic-pearl)]"
          >
            Tipo de Descuento *
          </label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-[var(--color-gothic-shadow)] border border-[var(--color-gothic-iron)] rounded-lg text-[var(--color-gothic-silver)] focus:outline-none focus:ring-2 focus:ring-[var(--color-gothic-amethyst)]"
            disabled={isSubmitting}
          >
            <option value="percentage">Porcentaje (%)</option>
            <option value="fixed">Monto Fijo ($)</option>
          </select>
        </div>

        <div>
          <label 
            htmlFor="value" 
            className="block text-sm font-bold mb-2 text-[var(--color-gothic-pearl)]"
          >
            Valor *
          </label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-gothic-smoke)]">
              {formData.type === 'percentage' ? <Percent className="w-5 h-5" /> : <DollarSign className="w-5 h-5" />}
            </div>
            <input
              type="number"
              id="value"
              name="value"
              value={formData.value}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-3 bg-[var(--color-gothic-shadow)] border ${
                errors.value 
                  ? 'border-red-500 focus:ring-red-500' 
                  : 'border-[var(--color-gothic-iron)] focus:ring-[var(--color-gothic-amethyst)]'
              } rounded-lg text-[var(--color-gothic-silver)] placeholder:text-[var(--color-gothic-ash)] focus:outline-none focus:ring-2`}
              placeholder={formData.type === 'percentage' ? '10' : '500'}
              disabled={isSubmitting}
              min="0"
              step={formData.type === 'percentage' ? '1' : '0.01'}
            />
          </div>
          {errors.value && (
            <p className="mt-1 text-sm text-red-400">{errors.value}</p>
          )}
        </div>
      </div>

      {/* Monto Mínimo y Usos Máximos */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label 
            htmlFor="minimum_amount" 
            className="block text-sm font-bold mb-2 text-[var(--color-gothic-pearl)]"
          >
            Monto Mínimo de Compra
          </label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-gothic-smoke)]">
              <DollarSign className="w-5 h-5" />
            </div>
            <input
              type="number"
              id="minimum_amount"
              name="minimum_amount"
              value={formData.minimum_amount}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-3 bg-[var(--color-gothic-shadow)] border ${
                errors.minimum_amount 
                  ? 'border-red-500 focus:ring-red-500' 
                  : 'border-[var(--color-gothic-iron)] focus:ring-[var(--color-gothic-amethyst)]'
              } rounded-lg text-[var(--color-gothic-silver)] placeholder:text-[var(--color-gothic-ash)] focus:outline-none focus:ring-2`}
              placeholder="0"
              disabled={isSubmitting}
              min="0"
              step="0.01"
            />
          </div>
          {errors.minimum_amount && (
            <p className="mt-1 text-sm text-red-400">{errors.minimum_amount}</p>
          )}
          <p className="mt-1 text-xs text-[var(--color-gothic-smoke)]">
            Opcional. Deja en 0 para sin mínimo
          </p>
        </div>

        <div>
          <label 
            htmlFor="max_uses" 
            className="block text-sm font-bold mb-2 text-[var(--color-gothic-pearl)]"
          >
            Usos Máximos
          </label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-gothic-smoke)]">
              <Users className="w-5 h-5" />
            </div>
            <input
              type="number"
              id="max_uses"
              name="max_uses"
              value={formData.max_uses}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-3 bg-[var(--color-gothic-shadow)] border ${
                errors.max_uses 
                  ? 'border-red-500 focus:ring-red-500' 
                  : 'border-[var(--color-gothic-iron)] focus:ring-[var(--color-gothic-amethyst)]'
              } rounded-lg text-[var(--color-gothic-silver)] placeholder:text-[var(--color-gothic-ash)] focus:outline-none focus:ring-2`}
              placeholder="Ilimitado"
              disabled={isSubmitting}
              min="1"
              step="1"
            />
          </div>
          {errors.max_uses && (
            <p className="mt-1 text-sm text-red-400">{errors.max_uses}</p>
          )}
          <p className="mt-1 text-xs text-[var(--color-gothic-smoke)]">
            Opcional. Deja vacío para ilimitado
          </p>
        </div>
      </div>

      {/* Fechas */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label 
            htmlFor="start_date" 
            className="block text-sm font-bold mb-2 text-[var(--color-gothic-pearl)]"
          >
            Fecha de Inicio *
          </label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-gothic-smoke)]">
              <Calendar className="w-5 h-5" />
            </div>
            <input
              type="datetime-local"
              id="start_date"
              name="start_date"
              value={formData.start_date}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-3 bg-[var(--color-gothic-shadow)] border ${
                errors.start_date 
                  ? 'border-red-500 focus:ring-red-500' 
                  : 'border-[var(--color-gothic-iron)] focus:ring-[var(--color-gothic-amethyst)]'
              } rounded-lg text-[var(--color-gothic-silver)] focus:outline-none focus:ring-2`}
              disabled={isSubmitting}
            />
          </div>
          {errors.start_date && (
            <p className="mt-1 text-sm text-red-400">{errors.start_date}</p>
          )}
        </div>

        <div>
          <label 
            htmlFor="end_date" 
            className="block text-sm font-bold mb-2 text-[var(--color-gothic-pearl)]"
          >
            Fecha de Expiración *
          </label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-gothic-smoke)]">
              <Calendar className="w-5 h-5" />
            </div>
            <input
              type="datetime-local"
              id="end_date"
              name="end_date"
              value={formData.end_date}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-3 bg-[var(--color-gothic-shadow)] border ${
                errors.end_date 
                  ? 'border-red-500 focus:ring-red-500' 
                  : 'border-[var(--color-gothic-iron)] focus:ring-[var(--color-gothic-amethyst)]'
              } rounded-lg text-[var(--color-gothic-silver)] focus:outline-none focus:ring-2`}
              disabled={isSubmitting}
            />
          </div>
          {errors.end_date && (
            <p className="mt-1 text-sm text-red-400">{errors.end_date}</p>
          )}
        </div>
      </div>

      {/* Estado */}
      <div className="flex items-center gap-3 p-4 bg-[var(--color-gothic-void)] border border-[var(--color-gothic-iron)] rounded-lg">
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
          Cupón activo y disponible para usar
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
          {isSubmitting ? 'Guardando...' : (coupon ? 'Actualizar' : 'Crear Cupón')}
        </button>
      </div>
    </form>
  );
}