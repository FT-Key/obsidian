'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Package, Wrench, Tag, TrendingUp, Users, Eye, Plus, AlertCircle } from 'lucide-react';
import { productService } from '@/lib/api/services/productService';
import { categoryService } from '@/lib/api/services/categoryService';
import { couponService } from '@/lib/api/services/couponService';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    productos: { total: 0, activos: 0, destacados: 0, sinStock: 0, change: '+0%', loading: true },
    categorias: { total: 0, activas: 0, change: '+0%', loading: true },
    cupones: { total: 0, activos: 0, usados: 0, change: '+0', loading: true }
  });

  const [recentActivity, setRecentActivity] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setError(null);
      
      // Llamadas paralelas a todos los servicios
      const [productsRes, categoriesRes, couponsRes] = await Promise.all([
        productService.getAll({ active: undefined }).catch(err => ({ data: { products: [] } })),
        categoryService.getAll().catch(err => ({ data: { categories: [] } })),
        couponService.getAll().catch(err => ({ data: { coupons: [] } }))
      ]);

      console.log([productsRes, categoriesRes, couponsRes])

      const products = productsRes.products || [];
      const categories = categoriesRes.categories || [];
      const coupons = couponsRes.coupons || [];

      // Calcular estadísticas de productos
      const activeProducts = products.filter(p => p.active);
      const featuredProducts = products.filter(p => p.featured);
      const outOfStock = products.filter(p => p.stock === 0);

      // Calcular estadísticas de categorías
      const activeCategories = categories.filter(c => c.active);

      // Calcular estadísticas de cupones
      const activeCoupons = coupons.filter(c => c.active && new Date(c.expires_at) > new Date());
      const usedCoupons = coupons.reduce((sum, c) => sum + (c.times_used || 0), 0);

      setStats({
        productos: {
          total: products.length,
          activos: activeProducts.length,
          destacados: featuredProducts.length,
          sinStock: outOfStock.length,
          change: '+12%', // TODO: Calcular cambio real comparando con mes anterior
          loading: false
        },
        categorias: {
          total: categories.length,
          activas: activeCategories.length,
          change: '+5%',
          loading: false
        },
        cupones: {
          total: coupons.length,
          activos: activeCoupons.length,
          usados: usedCoupons,
          change: `+${usedCoupons}`,
          loading: false
        }
      });

      // Top 5 productos destacados
      setTopProducts(featuredProducts.slice(0, 5));

      // Actividad reciente (simulada por ahora)
      const activity = [];
      
      if (products.length > 0) {
        const latestProduct = products[0];
        activity.push({
          action: 'Nuevo producto añadido',
          item: latestProduct.name,
          time: 'Reciente',
          type: 'product'
        });
      }

      if (outOfStock.length > 0) {
        activity.push({
          action: 'Producto agotado',
          item: outOfStock[0].name,
          time: 'Hace 1 hora',
          type: 'alert'
        });
      }

      if (categories.length > 0) {
        activity.push({
          action: 'Categoría actualizada',
          item: categories[0].name,
          time: 'Hace 2 horas',
          type: 'category'
        });
      }

      if (coupons.length > 0) {
        activity.push({
          action: 'Cupón creado',
          item: coupons[0].code,
          time: 'Hace 3 horas',
          type: 'coupon'
        });
      }

      setRecentActivity(activity);

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setError(error.message);
      setStats(prev => ({
        ...prev,
        productos: { ...prev.productos, loading: false },
        categorias: { ...prev.categorias, loading: false },
        cupones: { ...prev.cupones, loading: false }
      }));
    }
  };

  const statCards = [
    { 
      title: 'Total Productos', 
      value: stats.productos.total,
      subtitle: `${stats.productos.activos} activos · ${stats.productos.destacados} destacados`,
      change: stats.productos.change,
      icon: Package,
      color: 'from-blue-600 to-blue-800',
      loading: stats.productos.loading,
      href: '/admin/productos'
    },
    { 
      title: 'Categorías', 
      value: stats.categorias.total,
      subtitle: `${stats.categorias.activas} activas`,
      change: stats.categorias.change,
      icon: Wrench,
      color: 'from-green-600 to-green-800',
      loading: stats.categorias.loading,
      href: '/admin/categorias'
    },
    { 
      title: 'Cupones Activos', 
      value: stats.cupones.activos,
      subtitle: `${stats.cupones.total} total · ${stats.cupones.usados} usos`,
      change: stats.cupones.change,
      icon: Tag,
      color: 'from-purple-600 to-purple-800',
      loading: stats.cupones.loading,
      href: '/admin/cupones'
    },
    { 
      title: 'Sin Stock', 
      value: stats.productos.sinStock,
      subtitle: 'Productos agotados',
      change: stats.productos.sinStock > 0 ? '⚠️' : '✓',
      icon: AlertCircle,
      color: stats.productos.sinStock > 0 ? 'from-red-600 to-red-800' : 'from-gray-600 to-gray-800',
      loading: stats.productos.loading,
      href: '/admin/productos?stock=0'
    },
  ];

  const quickActions = [
    { label: 'Nuevo Producto', icon: Package, href: '/admin/productos/nuevo', color: 'blue' },
    { label: 'Nueva Categoría', icon: Wrench, href: '/admin/categorias/nueva', color: 'green' },
    { label: 'Nuevo Cupón', icon: Tag, href: '/admin/cupones/nuevo', color: 'purple' },
    { label: 'Ver Analíticas', icon: TrendingUp, href: '/admin/analiticas', color: 'orange' }
  ];

  const getActivityColor = (type) => {
    const colors = {
      product: 'bg-blue-500',
      category: 'bg-green-500',
      coupon: 'bg-purple-500',
      alert: 'bg-orange-500'
    };
    return colors[type] || 'bg-gray-500';
  };

  return (
    <div className="space-y-6">
      {/* Error Alert */}
      {error && (
        <div className="p-4 bg-red-900/20 border border-red-500 rounded-lg flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="font-bold text-red-300 mb-1">Error al cargar datos</h3>
            <p className="text-sm text-red-200 mb-2">{error}</p>
            <button
              onClick={fetchDashboardData}
              className="text-sm font-semibold underline text-red-300 hover:text-red-200 transition-colors"
            >
              Reintentar
            </button>
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Link
              key={index}
              href={stat.href}
              className="bg-[var(--color-gothic-shadow)] rounded-xl p-6 border border-[var(--color-gothic-iron)] hover:border-[var(--color-gothic-amethyst)] transition-all hover:scale-105"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`bg-gradient-to-br ${stat.color} p-3 rounded-lg`}>
                  <Icon size={24} className="text-white" />
                </div>
                {!stat.loading && (
                  <span className={`text-sm font-bold ${
                    stat.change.startsWith('+') ? 'text-green-400' : 
                    stat.change.startsWith('⚠️') ? 'text-orange-400' : 
                    'text-green-400'
                  }`}>
                    {stat.change}
                  </span>
                )}
              </div>
              <h3 className="text-[var(--color-gothic-smoke)] text-sm font-medium mb-1">
                {stat.title}
              </h3>
              {stat.loading ? (
                <div className="space-y-2">
                  <div className="h-8 bg-[var(--color-gothic-void)] rounded animate-pulse"></div>
                  <div className="h-4 bg-[var(--color-gothic-void)] rounded animate-pulse w-3/4"></div>
                </div>
              ) : (
                <>
                  <p className="text-2xl font-black text-[var(--color-gothic-pearl)] mb-1">
                    {stat.value}
                  </p>
                  <p className="text-xs text-[var(--color-gothic-ash)]">
                    {stat.subtitle}
                  </p>
                </>
              )}
            </Link>
          );
        })}
      </div>

      {/* Charts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Products */}
        <div className="lg:col-span-2 bg-[var(--color-gothic-shadow)] rounded-xl p-6 border border-[var(--color-gothic-iron)]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-[var(--color-gothic-pearl)]">
              Productos Destacados
            </h3>
            <Link 
              href="/admin/productos?featured=true"
              className="text-sm text-[var(--color-gothic-amethyst)] hover:text-[var(--color-gothic-plum)] transition-colors"
            >
              Ver todos
            </Link>
          </div>
          
          {topProducts.length === 0 ? (
            <div className="h-64 flex items-center justify-center bg-[var(--color-gothic-void)] rounded-lg border-2 border-dashed border-[var(--color-gothic-iron)]">
              <div className="text-center">
                <Package size={48} className="text-[var(--color-gothic-ash)] mx-auto mb-3" />
                <p className="text-[var(--color-gothic-smoke)] text-sm">No hay productos destacados</p>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {topProducts.map((product) => (
                <Link
                  key={product._id}
                  href={`/admin/productos/${product._id}/editar`}
                  className="flex items-center gap-4 p-3 bg-[var(--color-gothic-void)] rounded-lg border border-[var(--color-gothic-iron)] hover:border-[var(--color-gothic-amethyst)] transition-colors"
                >
                  {product.main_image ? (
                    <img 
                      src={product.main_image} 
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-[var(--color-gothic-shadow)] rounded-lg flex items-center justify-center">
                      <Package className="w-8 h-8 text-[var(--color-gothic-ash)]" />
                    </div>
                  )}
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-[var(--color-gothic-chrome)] truncate">
                      {product.name}
                    </h4>
                    <p className="text-sm text-[var(--color-gothic-smoke)]">
                      ${product.price?.toLocaleString()} · Stock: {product.stock}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 text-xs rounded font-bold ${
                      product.stock > 0 
                        ? 'bg-green-900/30 text-green-400' 
                        : 'bg-red-900/30 text-red-400'
                    }`}>
                      {product.active ? 'Activo' : 'Inactivo'}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Recent Activity */}
        <div className="bg-[var(--color-gothic-shadow)] rounded-xl p-6 border border-[var(--color-gothic-iron)]">
          <h3 className="text-lg font-bold mb-4 text-[var(--color-gothic-pearl)]">
            Actividad Reciente
          </h3>
          
          {recentActivity.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-[var(--color-gothic-smoke)] text-sm">No hay actividad reciente</p>
            </div>
          ) : (
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 pb-4 border-b border-[var(--color-gothic-iron)] last:border-0">
                  <div className={`w-2 h-2 rounded-full mt-2 ${getActivityColor(activity.type)}`}></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[var(--color-gothic-chrome)]">
                      {activity.action}
                    </p>
                    <p className="text-xs text-[var(--color-gothic-smoke)] truncate">{activity.item}</p>
                    <p className="text-xs text-[var(--color-gothic-ash)] mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-[var(--color-gothic-shadow)] rounded-xl p-6 border border-[var(--color-gothic-iron)]">
        <h3 className="text-lg font-bold mb-4 text-[var(--color-gothic-pearl)]">
          Acciones Rápidas
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Link
                key={index}
                href={action.href}
                className="flex flex-col items-center gap-2 p-4 border-2 border-dashed border-[var(--color-gothic-iron)] rounded-lg hover:border-[var(--color-gothic-amethyst)] hover:bg-[var(--color-gothic-void)] transition-all"
              >
                <Icon size={24} className="text-[var(--color-gothic-silver)]" />
                <span className="text-sm font-medium text-[var(--color-gothic-chrome)] text-center">
                  {action.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}