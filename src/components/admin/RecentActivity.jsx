'use client';

import { useEffect, useState } from 'react';

export default function RecentActivity() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecentActivity();
  }, []);

  const fetchRecentActivity = async () => {
    try {
      // TODO: Llamada real a tu API
      // const response = await fetch('/api/admin/activity');
      // const data = await response.json();
      
      // Simulación de datos
      setTimeout(() => {
        setActivities([
          { 
            action: 'Nuevo producto añadido', 
            item: 'Laptop HP ProBook', 
            time: 'Hace 5 min', 
            type: 'product' 
          },
          { 
            action: 'Mensaje de contacto', 
            item: 'Juan Pérez - Consulta', 
            time: 'Hace 15 min', 
            type: 'message' 
          },
          { 
            action: 'Servicio actualizado', 
            item: 'Reparación de PC', 
            time: 'Hace 1 hora', 
            type: 'service' 
          },
          { 
            action: 'Producto agotado', 
            item: 'Monitor Samsung 24"', 
            time: 'Hace 2 horas', 
            type: 'alert' 
          },
          { 
            action: 'Nuevo pedido', 
            item: 'Pedido #1234', 
            time: 'Hace 3 horas', 
            type: 'order' 
          },
        ]);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching activity:', error);
      setLoading(false);
    }
  };

  const getActivityColor = (type) => {
    const colors = {
      product: 'bg-blue-500',
      message: 'bg-purple-500',
      service: 'bg-green-500',
      alert: 'bg-orange-500',
      order: 'bg-indigo-500'
    };
    return colors[type] || 'bg-gray-500';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Actividad Reciente</h3>
      
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-start gap-3 pb-4 border-b border-gray-100">
              <div className="w-2 h-2 rounded-full mt-2 bg-gray-200 animate-pulse"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                <div className="h-3 bg-gray-100 rounded animate-pulse w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0">
              <div className={`w-2 h-2 rounded-full mt-2 ${getActivityColor(activity.type)}`}></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800">{activity.action}</p>
                <p className="text-xs text-gray-500">{activity.item}</p>
                <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}