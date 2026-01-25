// ==========================================
// 📁 app/admin/services/page.jsx
// ==========================================
/* import ServicesTable from '@/components/admin/ServicesTable'; */

export const metadata = {
  title: 'Servicios - Admin',
};

export default function ServicesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Gestión de Servicios</h1>
        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
          + Nuevo Servicio
        </button>
      </div>
      
     {/*  <ServicesTable /> */}
    </div>
  );
}