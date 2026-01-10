'use client';

import Link from 'next/link';
import { Sparkles, Instagram, Facebook, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-[#6b21a8] to-[#4c1d95] rounded-lg flex items-center justify-center shadow-lg clip-path-gothic-sm">
                <Sparkles className="w-5 h-5 text-[#f3f4f6]" />
              </div>
              <span className="text-xl font-bold text-[#e5e7eb]">OBSIDIAN</span>
            </div>
            <p className="text-[#6b7280] text-sm mb-4">
              Tu destino para servicios de belleza premium y productos exclusivos de moda.
            </p>
            <div className="flex gap-3">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" 
                 className="w-10 h-10 bg-[#1a1a1a] rounded-lg flex items-center justify-center text-[#9ca3af] hover:text-[#6b21a8] hover:bg-[#242424] transition-all duration-300 clip-path-gothic-sm">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                 className="w-10 h-10 bg-[#1a1a1a] rounded-lg flex items-center justify-center text-[#9ca3af] hover:text-[#6b21a8] hover:bg-[#242424] transition-all duration-300 clip-path-gothic-sm">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="mailto:contacto@obsidian.com"
                 className="w-10 h-10 bg-[#1a1a1a] rounded-lg flex items-center justify-center text-[#9ca3af] hover:text-[#6b21a8] hover:bg-[#242424] transition-all duration-300 clip-path-gothic-sm">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Servicios */}
          <div>
            <h3 className="text-[#e5e7eb] font-semibold mb-4">Servicios</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/#servicios" className="text-[#9ca3af] hover:text-[#6b21a8] text-sm transition-colors duration-300">
                  Esmaltado
                </Link>
              </li>
              <li>
                <Link href="/#servicios" className="text-[#9ca3af] hover:text-[#6b21a8] text-sm transition-colors duration-300">
                  Nail Art
                </Link>
              </li>
              <li>
                <Link href="/#servicios" className="text-[#9ca3af] hover:text-[#6b21a8] text-sm transition-colors duration-300">
                  Manicure
                </Link>
              </li>
              <li>
                <Link href="/#servicios" className="text-[#9ca3af] hover:text-[#6b21a8] text-sm transition-colors duration-300">
                  Pedicure
                </Link>
              </li>
            </ul>
          </div>

          {/* Productos */}
          <div>
            <h3 className="text-[#e5e7eb] font-semibold mb-4">Productos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/#productos" className="text-[#9ca3af] hover:text-[#6b21a8] text-sm transition-colors duration-300">
                  Ropa
                </Link>
              </li>
              <li>
                <Link href="/#productos" className="text-[#9ca3af] hover:text-[#6b21a8] text-sm transition-colors duration-300">
                  Carteras
                </Link>
              </li>
              <li>
                <Link href="/#productos" className="text-[#9ca3af] hover:text-[#6b21a8] text-sm transition-colors duration-300">
                  Accesorios
                </Link>
              </li>
              <li>
                <Link href="/#productos" className="text-[#9ca3af] hover:text-[#6b21a8] text-sm transition-colors duration-300">
                  Joyería
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-[#e5e7eb] font-semibold mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-[#9ca3af] text-sm">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#6b21a8]" />
                <span>San Miguel de Tucumán, Tucumán, Argentina</span>
              </li>
              <li className="flex items-center gap-2 text-[#9ca3af] text-sm">
                <Phone className="w-4 h-4 flex-shrink-0 text-[#6b21a8]" />
                <a href="tel:+543814567890" className="hover:text-[#6b21a8] transition-colors duration-300">
                  +54 381 456-7890
                </a>
              </li>
              <li className="flex items-center gap-2 text-[#9ca3af] text-sm">
                <Mail className="w-4 h-4 flex-shrink-0 text-[#6b21a8]" />
                <a href="mailto:contacto@obsidian.com" className="hover:text-[#6b21a8] transition-colors duration-300">
                  contacto@obsidian.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="gothic-divider my-8"></div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[#6b7280]">
          <p>© 2024 Obsidian. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <Link href="/terminos" className="hover:text-[#6b21a8] transition-colors duration-300">
              Términos y Condiciones
            </Link>
            <Link href="/privacidad" className="hover:text-[#6b21a8] transition-colors duration-300">
              Privacidad
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}