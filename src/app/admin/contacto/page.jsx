// ==========================================
// 📁 app/admin/contact/page.jsx
// ==========================================
/* import ContactMessages from '@/components/admin/ContactMessages'; */

export const metadata = {
  title: 'Mensajes - Admin',
};

export default function ContactPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Mensajes de Contacto</h1>
        <div className="flex gap-2">
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            Marcar todos como leídos
          </button>
          <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
            Eliminar seleccionados
          </button>
        </div>
      </div>
      
     {/*  <ContactMessages /> */}
    </div>
  );
}
