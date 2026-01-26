// ==========================================
// 📁 components/admin/AdminSidebar.jsx
// ==========================================
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Package, 
  Wrench, 
  Mail, 
  Settings,
  Users,
  BarChart3,
  ShoppingCart,
  Menu,
  X,
  LogOut,
  Home,
  Ticket,
  Layers
} from 'lucide-react';
import useAuthStore from '@/store/useAuthStore';

export default function AdminSidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuthStore();

  const menuItems = [
    { 
      id: 'dashboard', 
      label: 'Dashboard', 
      icon: LayoutDashboard, 
      href: '/admin',
      enabled: true
    },
    { 
      id: 'productos', 
      label: 'Productos', 
      icon: Package, 
      href: '/admin/productos',
      enabled: true
    },
    { 
      id: 'categorias', 
      label: 'Categorías', 
      icon: Layers, 
      href: '/admin/categorias',
      enabled: true
    },
    { 
      id: 'cupones', 
      label: 'Cupones', 
      icon: Ticket, 
      href: '/admin/cupones',
      enabled: true
    },
    { 
      id: 'servicios', 
      label: 'Servicios', 
      icon: Wrench, 
      href: '/admin/servicios',
      enabled: true
    },
    { 
      id: 'pedidos', 
      label: 'Pedidos', 
      icon: ShoppingCart, 
      href: '/admin/pedidos',
      enabled: false
    },
    { 
      id: 'contacto', 
      label: 'Mensajes', 
      icon: Mail, 
      href: '/admin/contacto',
      enabled: false,
      badge: '0'
    },
    { 
      id: 'usuarios', 
      label: 'Usuarios', 
      icon: Users, 
      href: '/admin/usuarios',
      enabled: false
    },
    { 
      id: 'analiticas', 
      label: 'Analíticas', 
      icon: BarChart3, 
      href: '/admin/analiticas',
      enabled: false
    },
    { 
      id: 'configuracion', 
      label: 'Configuración', 
      icon: Settings, 
      href: '/admin/configuracion',
      enabled: false
    },
  ];

  const isActive = (href) => {
    if (href === '/admin') {
      return pathname === '/admin';
    }
    return pathname?.startsWith(href);
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const handleGoHome = () => {
    router.push('/');
  };

  const getUserInitial = () => {
    if (user?.name) {
      return user.name.charAt(0).toUpperCase();
    }
    if (user?.email) {
      return user.email.charAt(0).toUpperCase();
    }
    return 'A';
  };

  return (
    <aside 
      className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-[var(--color-gothic-void)] text-[var(--color-gothic-silver)] transition-all duration-300 flex flex-col border-r border-[var(--color-gothic-iron)]`}
    >
      {/* Logo */}
      <div className="p-4 flex items-center justify-between border-b border-[var(--color-gothic-iron)]">
        {sidebarOpen && (
          <h1 className="text-xl font-black bg-gradient-to-br from-[var(--color-gothic-amethyst)] to-[var(--color-gothic-plum)] bg-clip-text text-transparent">
            Obsidian Admin
          </h1>
        )}
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg hover:bg-[var(--color-gothic-shadow)] transition-colors"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Ir a Inicio */}
      <div className="px-4 pt-4">
        <button
          onClick={handleGoHome}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all bg-[var(--color-gothic-shadow)] hover:bg-[var(--color-gothic-steel)] text-[var(--color-gothic-silver)]`}
        >
          <Home size={20} />
          {sidebarOpen && (
            <span className="flex-1 text-left font-medium">Ir a Inicio</span>
          )}
        </button>
      </div>

      {/* Navegación */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          
          if (!item.enabled) {
            return (
              <div
                key={item.id}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg opacity-50 cursor-not-allowed text-[var(--color-gothic-ash)]"
                title="Próximamente"
              >
                <Icon size={20} />
                {sidebarOpen && (
                  <>
                    <span className="flex-1 text-left font-medium">{item.label}</span>
                    <span className="text-xs bg-[var(--color-gothic-steel)] px-2 py-1 rounded">
                      Próximo
                    </span>
                  </>
                )}
              </div>
            );
          }
          
          return (
            <Link
              key={item.id}
              href={item.href}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                active 
                  ? 'bg-gradient-to-br from-[var(--color-gothic-amethyst)] to-[var(--color-gothic-plum)] text-white shadow-lg' 
                  : 'hover:bg-[var(--color-gothic-shadow)] text-[var(--color-gothic-ash)]'
              }`}
            >
              <Icon size={20} />
              {sidebarOpen && (
                <>
                  <span className="flex-1 text-left font-medium">{item.label}</span>
                  {item.badge && (
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User section */}
      {sidebarOpen ? (
        <div className="p-4 border-t border-[var(--color-gothic-iron)] space-y-2">
          <div className="px-4 py-3 rounded-lg bg-[var(--color-gothic-shadow)]">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[var(--color-gothic-amethyst)] to-[var(--color-gothic-plum)] rounded-full flex items-center justify-center font-bold text-white">
                {getUserInitial()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[var(--color-gothic-chrome)] truncate">
                  {user?.name || 'Admin'}
                </p>
                <p className="text-xs text-[var(--color-gothic-smoke)] truncate">
                  {user?.email || 'admin@obsidian.com'}
                </p>
              </div>
            </div>
          </div>
          
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-900/20 text-red-400 transition-colors"
          >
            <LogOut size={18} />
            <span className="font-medium">Cerrar Sesión</span>
          </button>
        </div>
      ) : (
        <div className="p-4 border-t border-[var(--color-gothic-iron)]">
          <button 
            onClick={handleLogout}
            className="w-full p-3 rounded-lg hover:bg-red-900/20 text-red-400 transition-colors"
            title="Cerrar Sesión"
          >
            <LogOut size={20} className="mx-auto" />
          </button>
        </div>
      )}
    </aside>
  );
}