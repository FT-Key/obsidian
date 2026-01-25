// ==========================================
// 📁 components/admin/shared/ErrorAlert.jsx
// ==========================================
import { AlertCircle } from 'lucide-react';

export default function ErrorAlert({ 
  title = 'Error', 
  message, 
  onRetry 
}) {
  return (
    <div className="mb-6 p-4 bg-red-900/20 border border-red-500 rounded-lg flex items-start gap-3">
      <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
      <div className="flex-1">
        <h3 className="font-bold text-red-300 mb-1">{title}</h3>
        <p className="text-sm text-red-200 mb-2">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="text-sm font-semibold underline text-red-300 hover:text-red-200 transition-colors"
          >
            Reintentar
          </button>
        )}
      </div>
    </div>
  );
}


