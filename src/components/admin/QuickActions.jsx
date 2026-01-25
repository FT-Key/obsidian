'use client';

import { Package, Wrench, Mail, ShoppingCart } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function StatsCards() {
  const [stats, setStats] = useState([
    { 
      title: 'Total Productos', 
      value: '0', 
      change: '+0%', 
      icon: Package,
      color: 'bg-blue-500',
      loading: true
    },
    { 
      title: 'Servicios Activos', 
      value: '0', 
      change: '+0%', 
      icon: Wrench,
      color: 'bg-green-500',
      loading: true
    },
    { 
      title: 'Mensajes Nuevos', 
      value: '0', 
      change: '+0', 
      icon: Mail,
      color: 'bg-purple-500',
      loading: true
    },
    { 
      title: 'Ventas del Mes', 
      value: '$0', 
      change: '+0%', 
      icon: ShoppingCart,
      color: 'bg-orange-500',
      loading: true
    },
  ]);

  useEffect(() => {
    // Aquí harás las llamadas a tu API
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // TODO: Reemplazar con llamadas reales a tu API
      // const [products, services, messages, sales] = await Promise.all([
      //   fetch('/api/products/stats').then(r => r.json()),
      //   fetch('/api/services/stats').then(r => r.json()),
      //   fetch('/api/contact/stats').then(r => r.json()),
      //   fetch('/api/sales/stats').then(r => r.json()),
      // ]);

      // Simulación de datos
      setTimeout(() => {
        setStats([
          { 
            title: 'Total Productos', 
            value: '156', 
            change: '+12%', 
            icon: Package,
            color: 'bg-blue-500',
            loading: false
          },
          { 
            title: 'Servicios Activos', 
            value: '24', 
            change: '+5%', 
            icon: Wrench,
            color: 'bg-green-500',
            loading: false
          },
          { 
            title: 'Mensajes Nuevos', 
            value: '18', 
            change: '+8', 
            icon: Mail,
            color: 'bg-purple-500',
            loading: false
          },
          { 
            title: 'Ventas del Mes', 
            value: '$45,231', 
            change: '+23%', 
            icon: ShoppingCart,
            color: 'bg-orange-500',
            loading: false
          },
        ]);
      }, 1000);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <Icon size={24} className="text-white" />
              </div>
              {!stat.loading && (
                <span className={`text-sm font-medium ${
                  stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </span>
              )}
            </div>
            <h3 className="text-gray-500 text-sm font-medium mb-1">{stat.title}</h3>
            {stat.loading ? (
              <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
            ) : (
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}