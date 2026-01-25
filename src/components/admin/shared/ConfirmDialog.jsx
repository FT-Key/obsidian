// ==========================================
// 📁 components/admin/shared/ConfirmDialog.jsx
// ==========================================
'use client';

import { AlertTriangle, X } from 'lucide-react';

export default function ConfirmDialog({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = '¿Estás seguro?',
  message,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  variant = 'danger'
}) {
  if (!isOpen) return null;

  const variantStyles = {
    danger: 'from-red-600 to-red-800',
    warning: 'from-yellow-600 to-yellow-800',
    info: 'from-blue-600 to-blue-800'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Dialog */}
      <div className="relative bg-[var(--color-gothic-shadow)] border border-[var(--color-gothic-iron)] rounded-xl p-6 max-w-md w-full">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 hover:bg-[var(--color-gothic-void)] rounded transition-colors"
        >
          <X size={20} className="text-[var(--color-gothic-ash)]" />
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 rounded-full bg-red-900/20 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-red-400" />
          </div>
        </div>

        {/* Content */}
        <h3 className="text-xl font-bold text-center mb-2 text-[var(--color-gothic-pearl)]">
          {title}
        </h3>
        
        {message && (
          <p className="text-center text-[var(--color-gothic-smoke)] mb-6">
            {message}
          </p>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-[var(--color-gothic-void)] border border-[var(--color-gothic-iron)] text-[var(--color-gothic-silver)] rounded-lg hover:bg-[var(--color-gothic-steel)] transition-colors"
          >
            {cancelLabel}
          </button>
          
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`flex-1 px-4 py-2 bg-gradient-to-br ${variantStyles[variant]} text-white font-semibold rounded-lg hover:scale-105 transition-transform`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}