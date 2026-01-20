"use client";

import React, { useState, useEffect } from 'react';
import { clsx } from 'clsx';
import { Menu, X, ShoppingBag, Calendar, User, Search, LogOut, Heart, Sun, Moon, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import useAuthStore from '@/store/useAuthStore';
import useCartStore from '@/store/useCartStore';
import useFavoritesStore from '@/store/useFavoritesStore';
import AuthModal from '@/components/navbar/AuthModal';
import Tooltip from '@/components/navbar/Tooltip';

/**
 * Navbar Component - Con tema claro/oscuro y cart preview
 */
const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const isHomePage = pathname === '/';

  // Zustand stores
  const { user, isAuthenticated, logout } = useAuthStore();
  const { itemCount, items: cartItems, total, loadCart, clearCart, removeItem } = useCartStore();
  const { count: favCount, loadFavorites } = useFavoritesStore();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [theme, setTheme] = useState('dark'); // 'dark' | 'light'
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  // Cargar carrito y favoritos cuando el usuario esté autenticado
  useEffect(() => {
    if (isAuthenticated && user) {
      const userId = user._id || user.id;
      loadCart(userId);
      loadFavorites(userId);
    }
    // Marcar como cargado después de verificar auth
    setIsAuthLoading(false);
  }, [isAuthenticated, user]);

  // Cargar tema desde localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    if (savedTheme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    
    if (newTheme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  };

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

  const navLinks = [
    { name: 'Inicio', href: '/' },
    { name: 'Servicios', href: '/servicios' },
    { name: 'Productos', href: '/productos' },
    { name: 'Nosotros', href: '/nosotros' },
    { name: 'Contacto', href: '/contacto' }
  ];

  const logoSrc = theme === 'dark' ? '/logo-obsidian.png' : '/logo-zabina.png';
  const brandName = theme === 'dark' ? 'OBSIDIAN' : 'ZABINA';

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
        <div className="absolute bottom-0 left-0 right-0 h-[2px]" style={{ backgroundColor: 'var(--color-gothic-steel)', opacity: 0.3 }}>
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
              <button onClick={() => router.push('/')} className="flex items-center gap-2 sm:gap-3 group">
                <div 
                  className="relative w-8 h-8 sm:w-10 sm:h-10 clip-path-gothic-md border transition-all duration-300 group-hover:shadow-[0_2px_12px_rgba(107,33,168,0.3)] overflow-hidden"
                  style={{
                    background: theme === 'dark' 
                      ? 'linear-gradient(to bottom right, var(--color-gothic-chrome), var(--color-gothic-silver), var(--color-gothic-ash))'
                      : 'linear-gradient(to bottom right, #ffffff, #f5f5f5, #e0e0e0)',
                    borderColor: 'var(--color-gothic-pewter)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.6)'
                  }}
                >
                  <Image 
                    src={logoSrc} 
                    alt="Logo" 
                    className="object-contain transition-opacity duration-300 p-1" 
                    width={40} 
                    height={40}
                    key={theme}
                  />
                </div>

                <div className="flex flex-col">
                  <span 
                    className="font-bold text-lg sm:text-xl tracking-wider text-shadow-metal"
                    style={{ color: 'var(--color-gothic-pearl)' }}
                  >
                    {brandName}
                  </span>
                  <span 
                    className="text-[10px] sm:text-xs tracking-widest"
                    style={{ color: 'var(--color-gothic-smoke)' }}
                  >
                    BEAUTY & STYLE
                  </span>
                </div>
              </button>
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
                  className="p-2 rounded-md transition-all duration-300"
                  style={{ color: 'var(--color-gothic-silver)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--color-gothic-pearl)';
                    e.currentTarget.style.backgroundColor = 'var(--color-gothic-iron)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--color-gothic-silver)';
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
              </Tooltip>

              <Tooltip content="Buscar">
                <button 
                  className="p-2 rounded-md transition-all duration-300"
                  style={{ color: 'var(--color-gothic-silver)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--color-gothic-pearl)';
                    e.currentTarget.style.backgroundColor = 'var(--color-gothic-iron)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--color-gothic-silver)';
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <Search className="w-5 h-5" />
                </button>
              </Tooltip>

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
                    className="p-2 rounded-md transition-all duration-300"
                    style={{ color: 'var(--color-gothic-silver)' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'var(--color-gothic-pearl)';
                      e.currentTarget.style.backgroundColor = 'var(--color-gothic-iron)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'var(--color-gothic-silver)';
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <User className="w-5 h-5" />
                  </button>
                </Tooltip>
              )}

              {/* Favoritos */}
              <FavoritesButton count={favCount} router={router} />

              {/* Carrito con preview */}
              <CartButton
                itemCount={itemCount}
                cartItems={cartItems}
                total={total}
                router={router}
                removeItem={removeItem}
                user={user}
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
              className="lg:hidden p-2 rounded-md transition-all duration-300"
              style={{ color: 'var(--color-gothic-silver)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--color-gothic-pearl)';
                e.currentTarget.style.backgroundColor = 'var(--color-gothic-iron)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--color-gothic-silver)';
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
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

// Componente de Dropdown de Usuario
const UserDropdown = ({ user, handleLogout, router }) => (
  <div className="relative group">
    <button 
      className="flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-300"
      style={{ 
        color: 'var(--color-gothic-silver)',
        minWidth: '120px' // Ancho mínimo para evitar saltos
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = 'var(--color-gothic-pearl)';
        e.currentTarget.style.backgroundColor = 'var(--color-gothic-iron)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = 'var(--color-gothic-silver)';
        e.currentTarget.style.backgroundColor = 'transparent';
      }}
    >
      <User className="w-5 h-5 flex-shrink-0" />
      <span className="text-sm font-medium max-w-[100px] truncate">
        {user?.name}
      </span>
    </button>

    <div 
      className="absolute right-0 top-full mt-2 w-56 backdrop-blur-md border rounded-md shadow-[0_4px_20px_rgba(0,0,0,0.8)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50"
      style={{
        backgroundColor: 'var(--color-gothic-shadow)',
        opacity: 0.95,
        borderColor: 'var(--color-gothic-steel)'
      }}
    >
      <div className="p-4 border-b" style={{ borderBottomColor: 'var(--color-gothic-steel)' }}>
        <p className="font-medium truncate" style={{ color: 'var(--color-gothic-pearl)' }}>{user?.name}</p>
        <p className="text-xs truncate mt-0.5" style={{ color: 'var(--color-gothic-smoke)' }}>{user?.email}</p>
      </div>

      <div className="py-1">
        <button 
          onClick={() => router.push('/perfil')} 
          className="w-full flex items-center gap-2 px-4 py-2 transition-all"
          style={{ color: 'var(--color-gothic-silver)' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'var(--color-gothic-pearl)';
            e.currentTarget.style.backgroundColor = 'var(--color-gothic-iron)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'var(--color-gothic-silver)';
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <User className="w-4 h-4" />
          <span className="text-sm">Mi Perfil</span>
        </button>
        <button 
          onClick={() => router.push('/turnos')} 
          className="w-full flex items-center gap-2 px-4 py-2 transition-all"
          style={{ color: 'var(--color-gothic-silver)' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'var(--color-gothic-pearl)';
            e.currentTarget.style.backgroundColor = 'var(--color-gothic-iron)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'var(--color-gothic-silver)';
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <Calendar className="w-4 h-4" />
          <span className="text-sm">Mis Turnos</span>
        </button>
        <button 
          onClick={() => router.push('/pedidos')} 
          className="w-full flex items-center gap-2 px-4 py-2 transition-all"
          style={{ color: 'var(--color-gothic-silver)' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'var(--color-gothic-pearl)';
            e.currentTarget.style.backgroundColor = 'var(--color-gothic-iron)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'var(--color-gothic-silver)';
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <ShoppingBag className="w-4 h-4" />
          <span className="text-sm">Mis Pedidos</span>
        </button>
      </div>

      <div className="border-t" style={{ borderTopColor: 'var(--color-gothic-steel)' }}>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-4 py-2 text-red-400 hover:text-red-300 transition-all"
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--color-gothic-iron)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <LogOut className="w-4 h-4" />
          <span className="text-sm">Cerrar Sesión</span>
        </button>
      </div>
    </div>
  </div>
);

// Componente de Botón de Favoritos
const FavoritesButton = ({ count, router }) => (
  <Tooltip content={count === 0 ? 'Sin favoritos' : `${count} ${count === 1 ? 'favorito' : 'favoritos'}`}>
    <button
      onClick={() => router.push('/favoritos')}
      className="relative p-2 rounded-md transition-all duration-300"
      style={{ color: 'var(--color-gothic-silver)' }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = 'var(--color-gothic-pearl)';
        e.currentTarget.style.backgroundColor = 'var(--color-gothic-iron)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = 'var(--color-gothic-silver)';
        e.currentTarget.style.backgroundColor = 'transparent';
      }}
    >
      <Heart className="w-5 h-5" />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(239,68,68,0.4)]">
          {count > 99 ? '99+' : count}
        </span>
      )}
    </button>
  </Tooltip>
);

// Componente de Botón de Carrito con Preview
const CartButton = ({ itemCount, cartItems, total, router, removeItem, user }) => {
  const [showPreview, setShowPreview] = useState(false);

  const handleRemove = async (e, item) => {
    e.stopPropagation();
    if (user) {
      try {
        const userId = user._id || user.id;
        await removeItem(userId, item._id);
        toast.success('Producto eliminado');
      } catch (error) {
        toast.error('Error al eliminar');
      }
    }
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setShowPreview(true)}
      onMouseLeave={() => setShowPreview(false)}
    >
      <button
        onClick={() => router.push('/carrito')}
        className="relative p-2 text-gothic-silver hover:text-gothic-pearl hover:bg-gothic-iron rounded-md transition-all duration-300"
      >
        <ShoppingBag className="w-5 h-5" />
        {itemCount > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 bg-gothic-amethyst text-white text-xs font-bold rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(107,33,168,0.4)]">
            {itemCount > 99 ? '99+' : itemCount}
          </span>
        )}
      </button>

      {/* Cart Preview */}
      {showPreview && (
        <div className="absolute right-0 top-full mt-2 w-80 max-h-96 overflow-hidden bg-gothic-shadow/95 backdrop-blur-md border border-gothic-steel rounded-md shadow-[0_8px_32px_rgba(0,0,0,0.8)] opacity-100 visible transition-all duration-300 z-50">
          {cartItems.length === 0 ? (
            <div className="p-6 text-center">
              <ShoppingBag className="w-12 h-12 mx-auto text-gothic-steel mb-3" />
              <p className="text-gothic-smoke text-sm">Tu carrito está vacío</p>
            </div>
          ) : (
            <>
              <div className="max-h-64 overflow-y-auto">
                {cartItems.slice(0, 3).map((item) => {
                  const product = item.product;
                  return (
                    <div key={item._id} className="p-3 border-b border-gothic-steel hover:bg-gothic-iron/50 transition-colors">
                      <div className="flex gap-3">
                        <div className="w-16 h-16 bg-gothic-obsidian flex-shrink-0 rounded overflow-hidden">
                          {product?.main_image ? (
                            <img src={product.main_image} alt={product.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <ShoppingBag className="w-6 h-6 text-gothic-steel" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-gothic-pearl text-sm font-medium truncate">{product?.name}</p>
                          <p className="text-gothic-smoke text-xs">Cantidad: {item.quantity}</p>
                          <p className="text-gothic-amethyst text-sm font-bold mt-1">
                            ${((item.price || product?.price || 0) * item.quantity).toFixed(2)}
                          </p>
                        </div>
                        <button
                          onClick={(e) => handleRemove(e, item)}
                          className="p-1 text-gothic-smoke hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {cartItems.length > 3 && (
                <div className="px-3 py-2 bg-gothic-iron/30 text-center">
                  <p className="text-gothic-smoke text-xs">
                    +{cartItems.length - 3} productos más
                  </p>
                </div>
              )}

              <div className="p-4 border-t border-gothic-steel bg-gothic-obsidian/50">
                <div className="flex justify-between mb-3">
                  <span className="text-gothic-silver font-semibold">Total:</span>
                  <span className="text-gothic-amethyst font-bold text-lg">${total.toFixed(2)}</span>
                </div>
                <button
                  onClick={() => router.push('/carrito')}
                  className="w-full py-2 bg-gradient-to-r from-gothic-amethyst to-gothic-plum text-white font-semibold rounded hover:shadow-lg transition-all"
                >
                  Ver Carrito
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

// Componente de Menú Móvil
const MobileMenu = ({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  navLinks,
  router,
  isAuthenticated,
  user,
  handleLogout,
  setAuthMode,
  setShowAuthModal,
  itemCount,
  favCount,
  theme,
  toggleTheme,
  pathname
}) => (
  <div
    className={clsx(
      'lg:hidden overflow-hidden transition-all duration-500',
      isMobileMenuOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
    )}
  >
    <div 
      className="px-4 py-6 backdrop-blur-md border-t space-y-4"
      style={{
        backgroundColor: 'var(--color-gothic-shadow)',
        opacity: 0.95,
        borderTopColor: 'var(--color-gothic-steel)'
      }}
    >
      {navLinks.map((link, idx) => (
        <button
          key={idx}
          onClick={() => {
            router.push(link.href);
            setIsMobileMenuOpen(false);
          }}
          className={clsx(
            "block w-full text-left px-4 py-3 rounded-md transition-all duration-300 border-l-2"
          )}
          style={{
            color: pathname === link.href ? 'var(--color-gothic-pearl)' : 'var(--color-gothic-silver)',
            backgroundColor: pathname === link.href ? 'rgba(var(--color-gothic-iron), 0.5)' : 'transparent',
            borderLeftColor: pathname === link.href ? 'var(--color-gothic-amethyst)' : 'transparent'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'var(--color-gothic-pearl)';
            e.currentTarget.style.backgroundColor = 'var(--color-gothic-iron)';
          }}
          onMouseLeave={(e) => {
            if (pathname !== link.href) {
              e.currentTarget.style.color = 'var(--color-gothic-silver)';
              e.currentTarget.style.backgroundColor = 'transparent';
            }
          }}
        >
          {link.name}
        </button>
      ))}

      <div className="h-[1px] my-4" style={{ background: 'linear-gradient(to right, transparent, var(--color-gothic-steel), transparent)' }}></div>

      <div className="space-y-2">
        <button
          onClick={toggleTheme}
          className="w-full flex items-center gap-3 px-4 py-3 text-gothic-silver hover:text-gothic-pearl hover:bg-gothic-iron rounded-md transition-all"
        >
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          <span>{theme === 'dark' ? 'Modo Claro' : 'Modo Oscuro'}</span>
        </button>

        {isAuthenticated ? (
          <>
            <button
              onClick={() => {
                router.push('/favoritos');
                setIsMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-between px-4 py-3 text-gothic-silver hover:text-gothic-pearl hover:bg-gothic-iron rounded-md transition-all"
            >
              <div className="flex items-center gap-3">
                <Heart className="w-5 h-5" />
                <span>Favoritos</span>
              </div>
              {favCount > 0 && (
                <span className="min-w-[24px] h-6 px-2 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {favCount}
                </span>
              )}
            </button>

            <button
              onClick={() => {
                router.push('/carrito');
                setIsMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-between px-4 py-3 text-gothic-silver hover:text-gothic-pearl hover:bg-gothic-iron rounded-md transition-all"
            >
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5" />
                <span>Carrito</span>
              </div>
              {itemCount > 0 && (
                <span className="min-w-[24px] h-6 px-2 bg-gothic-amethyst text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-gothic-iron rounded-md transition-all"
            >
              <LogOut className="w-5 h-5" />
              <span>Cerrar Sesión</span>
            </button>
          </>
        ) : (
          <button
            onClick={() => {
              setAuthMode('login');
              setShowAuthModal(true);
              setIsMobileMenuOpen(false);
            }}
            className="w-full flex items-center gap-3 px-4 py-3 text-gothic-silver hover:text-gothic-pearl hover:bg-gothic-iron rounded-md transition-all"
          >
            <User className="w-5 h-5" />
            <span>Iniciar Sesión</span>
          </button>
        )}
      </div>
    </div>
  </div>
);

export default Navbar;