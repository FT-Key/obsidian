// ==========================================
// 📁 components/admin/AdminHeader.jsx
// ==========================================
'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Bell, ChevronDown, User, Settings, LogOut } from 'lucide-react';
import ThemeSwitcher from './ThemeSwitcher';
import useAuthStore from '@/store/useAuthStore';

const menuTitles = {
  '/admin': 'Dashboard',
  '/admin/productos': 'Productos',
  '/admin/categories': 'Categorías',
  '/admin/coupons': 'Cupones',
  '/admin/servicios': 'Servicios',
  '/admin/contacto': 'Mensajes',
  '/admin/pedidos': 'Pedidos',
  '/admin/multimedia': 'Multimedia',
  '/admin/usuarios': 'Usuarios',
  '/admin/analiticas': 'Analíticas',
  '/admin/configuracion': 'Configuración',
};

export default function AdminHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, logout } = useAuthStore();

  const getPageTitle = () => {
    // Buscar coincidencia exacta
    if (menuTitles[pathname]) {
      return menuTitles[pathname];
    }
    
    // Buscar coincidencia parcial (para subrutas como /admin/productos/nuevo)
    const matchingPath = Object.keys(menuTitles).find(path => 
      pathname?.startsWith(path) && path !== '/admin'
    );
    
    return matchingPath ? menuTitles[matchingPath] : 'Admin';
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const handleProfile = () => {
    router.push('/admin/configuracion');
    setDropdownOpen(false);
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
    <header className="bg-[var(--color-gothic-shadow)] border-b border-[var(--color-gothic-iron)]">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4 flex-1">
          <h2 className="text-2xl font-black text-[var(--color-gothic-pearl)]">
            {getPageTitle()}
          </h2>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {/* Theme Switcher */}
          <ThemeSwitcher />
          
          {/* Notifications */}
          <button 
            className="p-2 hover:bg-[var(--color-gothic-void)] rounded-lg relative transition-colors"
            title="Notificaciones"
          >
            <Bell size={20} className="text-[var(--color-gothic-silver)]" />
            {/* Badge solo si hay notificaciones */}
            {/* <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span> */}
          </button>

          {/* User Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 px-4 py-2 hover:bg-[var(--color-gothic-void)] rounded-lg transition-colors"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-[var(--color-gothic-amethyst)] to-[var(--color-gothic-plum)] rounded-full flex items-center justify-center text-white text-sm font-bold">
                {getUserInitial()}
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-semibold text-[var(--color-gothic-pearl)]">
                  {user?.name || 'Admin'}
                </p>
                <p className="text-xs text-[var(--color-gothic-smoke)]">
                  {user?.role || 'Administrador'}
                </p>
              </div>
              <ChevronDown size={16} className="text-[var(--color-gothic-silver)]" />
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <>
                {/* Overlay para cerrar al hacer click afuera */}
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setDropdownOpen(false)}
                ></div>
                
                <div className="absolute right-0 mt-2 w-56 bg-[var(--color-gothic-shadow)] rounded-lg border border-[var(--color-gothic-iron)] py-2 z-50 shadow-xl">
                  {/* User Info */}
                  <div className="px-4 py-3 border-b border-[var(--color-gothic-iron)]">
                    <p className="text-sm font-semibold text-[var(--color-gothic-pearl)]">
                      {user?.name || 'Admin'}
                    </p>
                    <p className="text-xs text-[var(--color-gothic-smoke)] truncate">
                      {user?.email || 'admin@obsidian.com'}
                    </p>
                  </div>

                  {/* Menu Items */}
                  <button 
                    onClick={handleProfile}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-[var(--color-gothic-silver)] hover:bg-[var(--color-gothic-void)] transition-colors"
                  >
                    <User size={16} />
                    Mi Perfil
                  </button>
                  
                  <button 
                    onClick={() => {
                      router.push('/admin/configuracion');
                      setDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-[var(--color-gothic-silver)] hover:bg-[var(--color-gothic-void)] transition-colors"
                  >
                    <Settings size={16} />
                    Configuración
                  </button>
                  
                  <hr className="my-2 border-[var(--color-gothic-iron)]" />
                  
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:bg-red-900/20 transition-colors"
                  >
                    <LogOut size={16} />
                    Cerrar Sesión
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}