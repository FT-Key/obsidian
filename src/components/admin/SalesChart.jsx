'use client';

import { BarChart3 } from 'lucide-react';

export default function SalesChart() {
  // TODO: Integrar con recharts cuando tengas datos reales
  // import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

  return (
    <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Ventas del Mes</h3>
        <select className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>Últimos 7 días</option>
          <option>Últimos 30 días</option>
          <option>Últimos 3 meses</option>
          <option>Este año</option>
        </select>
      </div>
      
      <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
        <div className="text-center">
          <BarChart3 size={48} className="text-gray-300 mx-auto mb-3" />
          <p className="text-gray-400 text-sm">Gráfico de ventas</p>
          <p className="text-gray-300 text-xs mt-1">Integración con Recharts pendiente</p>
        </div>
      </div>

      {/* Mini stats debajo del gráfico */}
      <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-200">
        <div>
          <p className="text-xs text-gray-500 mb-1">Ventas Totales</p>
          <p className="text-lg font-semibold text-gray-800">$45,231</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Promedio Diario</p>
          <p className="text-lg font-semibold text-gray-800">$1,508</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Crecimiento</p>
          <p className="text-lg font-semibold text-green-600">+23%</p>
        </div>
      </div>
    </div>
  );
}

/* 
EJEMPLO DE INTEGRACIÓN CON RECHARTS:

'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Lun', ventas: 4000 },
  { name: 'Mar', ventas: 3000 },
  { name: 'Mié', ventas: 5000 },
  { name: 'Jue', ventas: 2780 },
  { name: 'Vie', ventas: 6890 },
  { name: 'Sáb', ventas: 2390 },
  { name: 'Dom', ventas: 3490 },
];

export default function SalesChart() {
  return (
    <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6 border border-gray-200">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Ventas del Mes</h3>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="ventas" stroke="#3b82f6" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
*/