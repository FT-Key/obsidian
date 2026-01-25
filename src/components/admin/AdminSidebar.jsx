'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Package, 
  Wrench, 
  Mail, 
  Settings,
  Users,
  BarChart3,
  Image,
  ShoppingCart,
  Menu,
  X,
  LogOut
} from 'lucide-react';

export default function AdminSidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();

  const menuItems = [
    { 
      id: 'dashboard', 
      label: 'Dashboard', 
      icon: LayoutDashboard, 
      href: '/admin' 
    },
    { 
      id: 'productos', 
      label: 'Productos', 
      icon: Package, 
      href: '/admin/productos' 
    },
    { 
      id: 'servicios', 
      label: 'Servicios', 
      icon: Wrench, 
      href: '/admin/servicios' 
    },
    { 
      id: 'contacto', 
      label: 'Mensajes', 
      icon: Mail, 
      href: '/admin/contacto', 
      badge: '18' 
    },
    { 
      id: 'pedidos', 
      label: 'Pedidos', 
      icon: ShoppingCart, 
      href: '/admin/pedidos' 
    },
    { 
      id: 'multimedia', 
      label: 'Multimedia', 
      icon: Image, 
      href: '/admin/multimedia' 
    },
    { 
      id: 'usuarios', 
      label: 'Usuarios', 
      icon: Users, 
      href: '/admin/usuarios' 
    },
    { 
      id: 'analiticas', 
      label: 'Analíticas', 
      icon: BarChart3, 
      href: '/admin/analiticas' 
    },
    { 
      id: 'configuracion', 
      label: 'Configuración', 
      icon: Settings, 
      href: '/admin/configuracion' 
    },
  ];

  const isActive = (href) => {
    if (href === '/admin') {
      return pathname === '/admin';
    }
    return pathname?.startsWith(href);
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

      {/* Navegación */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          
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
      {sidebarOpen && (
        <div className="p-4 border-t border-[var(--color-gothic-iron)]">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[var(--color-gothic-shadow)] transition-colors">
            <div className="w-8 h-8 bg-gradient-to-br from-[var(--color-gothic-amethyst)] to-[var(--color-gothic-plum)] rounded-full flex items-center justify-center font-bold">
              A
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-medium text-[var(--color-gothic-chrome)]">Admin</p>
              <p className="text-xs text-[var(--color-gothic-smoke)]">admin@obsidian.com</p>
            </div>
            <LogOut size={18} className="text-[var(--color-gothic-ash)]" />
          </button>
        </div>
      )}
    </aside>
  );
}