"use client";

import React from 'react';
import { clsx } from 'clsx';
import { Sun, Moon, Heart, ShoppingBag, LogOut, User } from 'lucide-react';

export const MobileMenu = ({
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

      <div 
        className="h-[1px] my-4" 
        style={{ 
          background: 'linear-gradient(to right, transparent, var(--color-gothic-steel), transparent)' 
        }}
      ></div>

      <div className="space-y-2">
        <button
          onClick={toggleTheme}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-md transition-all nav-action-button"
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
              className="w-full flex items-center justify-between px-4 py-3 rounded-md transition-all nav-action-button"
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
              className="w-full flex items-center justify-between px-4 py-3 rounded-md transition-all nav-action-button"
            >
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5" />
                <span>Carrito</span>
              </div>
              {itemCount > 0 && (
                <span 
                  className="min-w-[24px] h-6 px-2 text-white text-xs font-bold rounded-full flex items-center justify-center"
                  style={{ 
                    background: 'linear-gradient(135deg, var(--color-gothic-amethyst), var(--color-gothic-plum))' 
                  }}
                >
                  {itemCount}
                </span>
              )}
            </button>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 rounded-md transition-all"
              style={{
                backgroundColor: 'transparent'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-gothic-iron)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
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
            className="w-full flex items-center gap-3 px-4 py-3 rounded-md transition-all nav-action-button"
          >
            <User className="w-5 h-5" />
            <span>Iniciar Sesión</span>
          </button>
        )}
      </div>
    </div>
  </div>
);