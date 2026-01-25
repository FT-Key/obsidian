'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Search, Bell, ChevronDown } from 'lucide-react';
import ThemeSwitcher from './ThemeSwitcher';

const menuTitles = {
  '/admin': 'Dashboard',
  '/admin/productos': 'Productos',
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
  const [dropdownOpen, setDropdownOpen] = useState(false);

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

  return (
    <header className="bg-[var(--color-gothic-shadow)] border-b border-[var(--color-gothic-iron)]">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4 flex-1">
          <h2 className="text-2xl font-black text-[var(--color-gothic-pearl)]">
            {getPageTitle()}
          </h2>
        </div>

        {/* Search and Actions */}
        <div className="flex items-center gap-4">
          {/* Theme Switcher */}
          <ThemeSwitcher />
          
          {/* Search */}
          <div className="relative">
            <Search 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--color-gothic-smoke)]" 
              size={18} 
            />
            <input
              type="text"
              placeholder="Buscar..."
              className="pl-10 pr-4 py-2 bg-[var(--color-gothic-void)] border border-[var(--color-gothic-iron)] rounded-lg text-[var(--color-gothic-silver)] placeholder:text-[var(--color-gothic-ash)] focus:outline-none focus:ring-2 focus:ring-[var(--color-gothic-amethyst)] w-64"
            />
          </div>
          
          {/* Notifications */}
          <button className="p-2 hover:bg-[var(--color-gothic-void)] rounded-lg relative transition-colors">
            <Bell size={20} className="text-[var(--color-gothic-silver)]" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 px-4 py-2 hover:bg-[var(--color-gothic-void)] rounded-lg transition-colors"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-[var(--color-gothic-amethyst)] to-[var(--color-gothic-plum)] rounded-full flex items-center justify-center text-white text-sm font-bold">
                A
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
                
                <div className="absolute right-0 mt-2 w-48 bg-[var(--color-gothic-shadow)] rounded-lg border border-[var(--color-gothic-iron)] py-2 z-50">
                  <a 
                    href="#" 
                    className="block px-4 py-2 text-sm text-[var(--color-gothic-silver)] hover:bg-[var(--color-gothic-void)] transition-colors"
                  >
                    Perfil
                  </a>
                  <a 
                    href="#" 
                    className="block px-4 py-2 text-sm text-[var(--color-gothic-silver)] hover:bg-[var(--color-gothic-void)] transition-colors"
                  >
                    Configuración
                  </a>
                  <hr className="my-2 border-[var(--color-gothic-iron)]" />
                  <a 
                    href="#" 
                    className="block px-4 py-2 text-sm text-red-400 hover:bg-[var(--color-gothic-void)] transition-colors"
                  >
                    Cerrar sesión
                  </a>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}