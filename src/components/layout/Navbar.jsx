'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Sparkles, User, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[#1a1a1a] bg-[#0a0a0a]/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-[#6b21a8] to-[#4c1d95] rounded-lg flex items-center justify-center shadow-lg clip-path-gothic-sm transition-transform duration-300 group-hover:scale-110">
              <Sparkles className="w-5 h-5 text-[#f3f4f6]" />
            </div>
            <span className="text-xl font-bold text-[#e5e7eb]">OBSIDIAN</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/#servicios" className="text-[#9ca3af] hover:text-[#6b21a8] transition-colors duration-300">
              Servicios
            </Link>
            <Link href="/#productos" className="text-[#9ca3af] hover:text-[#6b21a8] transition-colors duration-300">
              Productos
            </Link>
            <Link href="/#nosotros" className="text-[#9ca3af] hover:text-[#6b21a8] transition-colors duration-300">
              Nosotros
            </Link>
            <Link href="/#contacto" className="text-[#9ca3af] hover:text-[#6b21a8] transition-colors duration-300">
              Contacto
            </Link>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <button className="relative p-2 text-[#9ca3af] hover:text-[#6b21a8] transition-colors duration-300">
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#6b21a8] text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </button>
            
            <Link href="/iniciar-sesion">
              <button className="px-4 py-2 text-[#d1d5db] hover:text-[#f3f4f6] transition-colors duration-300">
                Iniciar Sesión
              </button>
            </Link>
            
            <Link href="/registrarse">
              <button className="px-6 py-2 bg-gradient-to-r from-[#6b21a8] to-[#4c1d95] text-[#f3f4f6] rounded-lg clip-path-gothic-sm hover:shadow-[0_0_20px_rgba(107,33,168,0.4)] transition-all duration-300">
                Registrarse
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-[#9ca3af] hover:text-[#6b21a8] transition-colors duration-300"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-[#1a1a1a] bg-[#0a0a0a]/98 backdrop-blur-md">
          <div className="px-4 py-6 space-y-4">
            <Link 
              href="/#servicios" 
              className="block text-[#9ca3af] hover:text-[#6b21a8] transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Servicios
            </Link>
            <Link 
              href="/#productos" 
              className="block text-[#9ca3af] hover:text-[#6b21a8] transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Productos
            </Link>
            <Link 
              href="/#nosotros" 
              className="block text-[#9ca3af] hover:text-[#6b21a8] transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Nosotros
            </Link>
            <Link 
              href="/#contacto" 
              className="block text-[#9ca3af] hover:text-[#6b21a8] transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Contacto
            </Link>
            
            <div className="pt-4 space-y-3 border-t border-[#1a1a1a]">
              <button className="w-full flex items-center justify-center gap-2 px-4 py-2 text-[#9ca3af] hover:text-[#6b21a8] transition-colors duration-300">
                <ShoppingBag className="w-5 h-5" />
                <span>Carrito (3)</span>
              </button>
              
              <Link href="/iniciar-sesion" className="block w-full">
                <button className="w-full px-4 py-2 text-[#d1d5db] hover:text-[#f3f4f6] border border-[#3a3a3a] rounded-lg transition-colors duration-300">
                  Iniciar Sesión
                </button>
              </Link>
              
              <Link href="/registrarse" className="block w-full">
                <button className="w-full px-6 py-2 bg-gradient-to-r from-[#6b21a8] to-[#4c1d95] text-[#f3f4f6] rounded-lg clip-path-gothic-sm">
                  Registrarse
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}