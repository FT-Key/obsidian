"use client";

import React, { useState, useEffect } from 'react';
import { clsx } from 'clsx';
import './Navbar.css';
import { Menu, X, Calendar, User, LogOut, Sun, Moon } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import useAuthStore from '@/store/useAuthStore';
import useCartStore from '@/store/useCartStore';
import useFavoritesStore from '@/store/useFavoritesStore';
import AuthModal from '@/components/navbar/AuthModal';
import Tooltip from '@/components/navbar/Tooltip';
import BrandLogo from '@/components/navbar/BrandLogo';
import { FavoritesButton, CartButton, SearchButton } from '@/components/navbar/NavbarActionButtons';
import useThemeStore from '@/store/useThemeStore';
import { MobileMenu } from '@/components/navbar/MobileMenu';
import { UserDropdown } from '@/components/navbar/UserDropdown';

const navLinks = [
  { name: 'Inicio', href: '/' },
  { name: 'Servicios', href: '/servicios' },
  { name: 'Productos', href: '/productos' },
  { name: 'Nosotros', href: '/nosotros' },
  { name: 'Contacto', href: '/contacto' }
];

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const isHomePage = pathname === '/';

  // Zustand stores
  const { user, isAuthenticated, logout } = useAuthStore();
  const { itemCount, items: cartItems, total, loadCart, clearCart, removeItem } = useCartStore();
  const { count: favCount, loadFavorites } = useFavoritesStore();

  // Custom hooks
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const logoSrc = useThemeStore((state) => state.logoSrc);
  const brandName = useThemeStore((state) => state.brandName);
  const isLoaded = useThemeStore((state) => state.isLoaded);
  const initTheme = useThemeStore((state) => state.initTheme);

  // Local state
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [isAuthLoading, setIsAuthLoading] = useState(true);

   useEffect(() => {
    initTheme();
  }, [initTheme]);

  // Cargar carrito y favoritos cuando el usuario esté autenticado
  useEffect(() => {
    if (isAuthenticated && user) {
      const userId = user._id || user.id;
      loadCart(userId);
      loadFavorites(userId);
    }
    setIsAuthLoading(false);
  }, [isAuthenticated, user, loadCart, loadFavorites]);

  // Manejar scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (window.scrollY / windowHeight) * 100;
      setScrollProgress(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Bloquear scroll cuando hay modales abiertos
  useEffect(() => {
    if (showAuthModal || isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showAuthModal, isMobileMenuOpen]);

  const handleLogout = () => {
    logout();
    clearCart();
    toast.success('Sesión cerrada correctamente', { icon: '👋' });
    setIsMobileMenuOpen(false);
    router.push('/');
  };

  return (
    <>
      <nav
        className={clsx(
          'top-0 left-0 right-0 z-50 transition-all duration-500',
          isHomePage ? 'fixed' : 'sticky',
          isScrolled
            ? 'backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.8)]'
            : 'bg-transparent'
        )}
        style={isScrolled ? {
          backgroundColor: 'var(--color-gothic-obsidian)',
          opacity: 0.95,
          borderBottom: '1px solid var(--color-gothic-steel)'
        } : {}}
      >
        {/* Barra de progreso */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-[2px]" 
          style={{ backgroundColor: 'var(--color-gothic-steel)', opacity: 0.3 }}
        >
          <div
            className="h-full transition-all duration-150"
            style={{ 
              width: `${scrollProgress}%`,
              background: 'linear-gradient(to right, var(--color-gothic-amethyst), var(--color-gothic-plum), var(--color-gothic-amethyst))',
              boxShadow: '0 0 10px rgba(107,33,168,0.5)'
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">

            {/* Logo */}
            <div className="flex-shrink-0">
              {isLoaded && (
                <BrandLogo
                  theme={theme}
                  logoSrc={logoSrc}
                  brandName={brandName}
                  onClick={() => router.push('/')}
                />
              )}
            </div>

            {/* Links Desktop */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link, idx) => (
                <button
                  key={idx}
                  onClick={() => router.push(link.href)}
                  className="relative px-3 xl:px-4 py-2 font-medium text-sm transition-all duration-300"
                  style={{
                    color: pathname === link.href ? 'var(--color-gothic-pearl)' : 'var(--color-gothic-silver)',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-gothic-pearl)'}
                  onMouseLeave={(e) => {
                    if (pathname !== link.href) {
                      e.currentTarget.style.color = 'var(--color-gothic-silver)';
                    }
                  }}
                >
                  <span className="relative z-10">{link.name}</span>
                  <span 
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] transition-all duration-300"
                    style={{
                      width: pathname === link.href ? '100%' : '0%',
                      background: 'linear-gradient(to right, transparent, var(--color-gothic-amethyst), transparent)'
                    }}
                  />
                </button>
              ))}
            </div>

            {/* Actions Desktop */}
            <div className="hidden lg:flex items-center gap-2 xl:gap-3">
              {/* Theme Toggle */}
              <Tooltip content={theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}>
                <button
                  onClick={toggleTheme}
                  className="nav-action-button"
                >
                  {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
              </Tooltip>

              {/* Search */}
              <SearchButton />

              {/* Usuario */}
              {isAuthLoading ? (
                <UserSkeleton />
              ) : isAuthenticated ? (
                <UserDropdown user={user} handleLogout={handleLogout} router={router} />
              ) : (
                <Tooltip content="Iniciar sesión">
                  <button
                    onClick={() => {
                      setAuthMode('login');
                      setShowAuthModal(true);
                    }}
                    className="nav-action-button"
                  >
                    <User className="w-5 h-5" />
                  </button>
                </Tooltip>
              )}

              {/* Favoritos */}
              <FavoritesButton count={favCount} />

              {/* Carrito */}
              <CartButton
                itemCount={itemCount}
                cartItems={cartItems}
                total={total}
                user={user}
                removeItem={removeItem}
              />

              {/* Botón Reservar */}
              <button
                onClick={() => router.push('/contacto')}
                className="relative px-4 xl:px-5 py-2 xl:py-2.5 ml-1 xl:ml-2 font-semibold text-sm clip-path-gothic-sm border transition-all duration-300 hover:scale-[1.02] flex items-center gap-1.5 xl:gap-2"
                style={{
                  background: 'linear-gradient(to bottom right, var(--color-gothic-chrome), var(--color-gothic-silver), var(--color-gothic-ash))',
                  color: 'var(--color-gothic-obsidian)',
                  borderColor: 'var(--color-gothic-pewter)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.6)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 2px 12px rgba(107,33,168,0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.6)';
                }}
              >
                <Calendar className="w-3.5 h-3.5 xl:w-4 xl:h-4" />
                <span className="hidden xl:inline">Reservar</span>
                <span className="xl:hidden">Agendar</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden nav-action-button"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <MobileMenu
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          navLinks={navLinks}
          router={router}
          isAuthenticated={isAuthenticated}
          user={user}
          handleLogout={handleLogout}
          setAuthMode={setAuthMode}
          setShowAuthModal={setShowAuthModal}
          itemCount={itemCount}
          favCount={favCount}
          theme={theme}
          toggleTheme={toggleTheme}
          pathname={pathname}
        />
      </nav>

      {/* Modal de Autenticación */}
      {showAuthModal && (
        <AuthModal
          mode={authMode}
          setMode={setAuthMode}
          onClose={() => setShowAuthModal(false)}
          router={router}
        />
      )}
    </>
  );
};

// Componente Skeleton para estado de carga
const UserSkeleton = () => (
  <div className="flex items-center gap-2 px-3 py-2 rounded-md" style={{ minWidth: '120px' }}>
    <div 
      className="w-5 h-5 rounded-full animate-pulse"
      style={{ backgroundColor: 'var(--color-gothic-steel)' }}
    />
    <div 
      className="h-4 w-16 rounded animate-pulse"
      style={{ backgroundColor: 'var(--color-gothic-steel)' }}
    />
  </div>
);

export default Navbar;