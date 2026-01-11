"use client";

import React, { useState, useEffect } from 'react';
import { clsx } from 'clsx';
import { Menu, X, Sparkles, ShoppingBag, Calendar, User, Search } from 'lucide-react';

/**
 * Navbar Component - Gothic Dark Medieval
 * Navbar sticky que cambia de estilo al hacer scroll
 */
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      // Calcular progreso de scroll
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (window.scrollY / windowHeight) * 100;
      setScrollProgress(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Inicio', href: '#hero' },
    { name: 'Servicios', href: '#servicios' },
    { name: 'Productos', href: '#productos' },
    { name: 'Nosotros', href: '#nosotros' },
    { name: 'Contacto', href: '#contacto' }
  ];

  return (
    <nav
      className={clsx(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        isScrolled
          ? 'bg-gothic-obsidian/95 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.8)] border-b border-gothic-steel'
          : 'bg-transparent'
      )}
    >
      {/* Barra de progreso de scroll */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gothic-steel/30">
        <div 
          className="h-full bg-gradient-to-r from-gothic-amethyst via-gothic-plum to-gothic-amethyst shadow-[0_0_10px_rgba(107,33,168,0.5)] transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        >
          {/* Calavera al final de la barra */}
          {scrollProgress > 0 && (
            <div className="absolute right-0 top-1/2 -translate-y-1/2">
              <div className="relative w-4 h-4">
                {/* Imagen de la calavera espejada y con filtro morado */}
                <img 
                  src="/navbar/progress-skull.png" 
                  alt=""
                  className="w-full h-full object-contain -scale-x-100"
                  style={{
                    filter: 'brightness(0) saturate(100%) invert(26%) sepia(89%) saturate(2476%) hue-rotate(262deg) brightness(91%) contrast(99%)',
                    dropShadow: '0 0 8px rgba(107, 33, 168, 0.8)'
                  }}
                />
                {/* Glow alrededor de la calavera */}
                <div className="absolute inset-0 bg-gothic-amethyst/40 rounded-full blur-md -z-10"></div>
                {/* Anillo pulsante */}
                <div className="absolute inset-[-4px] border border-gothic-amethyst/50 rounded-full animate-pulse"></div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="#hero" className="flex items-center gap-2 sm:gap-3 group">
              {/* Icono decorativo gótico */}
              <div className="relative w-8 h-8 sm:w-10 sm:h-10 clip-path-gothic-md bg-gradient-to-br from-gothic-chrome via-gothic-silver to-gothic-ash border border-gothic-pewter shadow-[0_2px_8px_rgba(0,0,0,0.6)] group-hover:shadow-[0_2px_12px_rgba(107,33,168,0.3)] transition-all duration-300">
                <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gothic-obsidian" />
              </div>
              
              {/* Nombre del negocio */}
              <div className="flex flex-col">
                <span className="text-gothic-pearl font-bold text-lg sm:text-xl tracking-wider text-shadow-metal">
                  OBSIDIAN
                </span>
                <span className="text-gothic-smoke text-[10px] sm:text-xs tracking-widest">
                  BEAUTY & STYLE
                </span>
              </div>
            </a>
          </div>

          {/* Links Desktop */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                className={clsx(
                  'relative px-3 xl:px-4 py-2 text-gothic-silver font-medium text-sm',
                  'hover:text-gothic-pearl transition-all duration-300',
                  'after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2',
                  'after:w-0 after:h-[2px] after:bg-gradient-to-r after:from-transparent after:via-gothic-amethyst after:to-transparent',
                  'after:transition-all after:duration-300',
                  'hover:after:w-full'
                )}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Actions Desktop */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-3">
            {/* Buscador */}
            <button className="p-2 text-gothic-silver hover:text-gothic-pearl hover:bg-gothic-iron rounded-md transition-all duration-300">
              <Search className="w-5 h-5" />
            </button>

            {/* Cuenta */}
            <button className="p-2 text-gothic-silver hover:text-gothic-pearl hover:bg-gothic-iron rounded-md transition-all duration-300">
              <User className="w-5 h-5" />
            </button>

            {/* Carrito */}
            <button className="relative p-2 text-gothic-silver hover:text-gothic-pearl hover:bg-gothic-iron rounded-md transition-all duration-300">
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-gothic-amethyst text-white text-xs font-bold rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(107,33,168,0.4)]">
                3
              </span>
            </button>

            {/* CTA */}
            <a
              href="#contacto"
              className={clsx(
                'relative px-4 xl:px-5 py-2 xl:py-2.5 ml-1 xl:ml-2',
                'bg-gradient-to-br from-gothic-chrome via-gothic-silver to-gothic-ash',
                'text-gothic-obsidian font-semibold text-sm',
                'clip-path-gothic-sm',
                'border border-gothic-pewter',
                'shadow-[0_2px_8px_rgba(0,0,0,0.6)]',
                'hover:shadow-[0_2px_12px_rgba(107,33,168,0.3)]',
                'hover:scale-[1.02]',
                'transition-all duration-300',
                'flex items-center gap-1.5 xl:gap-2'
              )}
            >
              <Calendar className="w-3.5 h-3.5 xl:w-4 xl:h-4" />
              <span className="hidden xl:inline">Reservar</span>
              <span className="xl:hidden">Agendar</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-gothic-silver hover:text-gothic-pearl hover:bg-gothic-iron rounded-md transition-all duration-300"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={clsx(
          'lg:hidden overflow-hidden transition-all duration-500',
          isMobileMenuOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className="px-4 py-6 bg-gothic-shadow/95 backdrop-blur-md border-t border-gothic-steel space-y-4">
          {/* Links */}
          {navLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-3 text-gothic-silver hover:text-gothic-pearl hover:bg-gothic-iron rounded-md transition-all duration-300 border-l-2 border-transparent hover:border-gothic-amethyst"
            >
              {link.name}
            </a>
          ))}

          {/* Divider */}
          <div className="h-[1px] bg-gradient-to-r from-transparent via-gothic-steel to-transparent my-4"></div>

          {/* Actions Mobile */}
          <div className="space-y-2">
            <button className="w-full flex items-center gap-3 px-4 py-3 text-gothic-silver hover:text-gothic-pearl hover:bg-gothic-iron rounded-md transition-all duration-300">
              <Search className="w-5 h-5" />
              <span>Buscar</span>
            </button>

            <button className="w-full flex items-center gap-3 px-4 py-3 text-gothic-silver hover:text-gothic-pearl hover:bg-gothic-iron rounded-md transition-all duration-300">
              <User className="w-5 h-5" />
              <span>Mi Cuenta</span>
            </button>

            <button className="w-full flex items-center justify-between px-4 py-3 text-gothic-silver hover:text-gothic-pearl hover:bg-gothic-iron rounded-md transition-all duration-300">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5" />
                <span>Carrito</span>
              </div>
              <span className="w-6 h-6 bg-gothic-amethyst text-white text-xs font-bold rounded-full flex items-center justify-center">
                3
              </span>
            </button>

            <a
              href="#contacto"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-br from-gothic-chrome via-gothic-silver to-gothic-ash text-gothic-obsidian font-semibold rounded-md shadow-[0_2px_8px_rgba(0,0,0,0.6)] hover:shadow-[0_2px_12px_rgba(107,33,168,0.3)] transition-all duration-300"
            >
              <Calendar className="w-5 h-5" />
              Reservar Turno
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;