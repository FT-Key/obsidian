"use client";

import React from 'react';
import { clsx } from 'clsx';
import { Sparkles, Mail, Phone, MapPin, Instagram, Facebook, Twitter, Heart, Calendar, ShoppingBag } from 'lucide-react';

/**
 * Footer Component - Gothic Dark Medieval con Clip-Path Original
 * Footer con diseño gótico y mapa integrado
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' }
  ];

  const quickLinks = [
    { name: 'Servicios', href: '#servicios' },
    { name: 'Productos', href: '#productos' },
    { name: 'Nosotros', href: '#nosotros' },
    { name: 'Contacto', href: '#contacto' }
  ];

  const services = [
    { name: 'Esmaltado Premium', href: '#' },
    { name: 'Nail Art', href: '#' },
    { name: 'Manicure Completa', href: '#' },
    { name: 'Pedicure Spa', href: '#' }
  ];

  return (
    <footer className="relative bg-gothic-void overflow-hidden">
      {/* Decoración superior con clip-path gótico */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-gothic-abyss" style={{
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 95% 80%, 90% 100%, 85% 70%, 80% 100%, 75% 85%, 70% 100%, 65% 75%, 60% 100%, 55% 80%, 50% 100%, 45% 80%, 40% 100%, 35% 75%, 30% 100%, 25% 85%, 20% 100%, 15% 70%, 10% 100%, 5% 80%, 0 100%)'
      }}>
        {/* Decoración de puntos sutiles */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-2">
          <span className="w-1.5 h-1.5 bg-gothic-amethyst rounded-full shadow-[0_0_8px_rgba(107,33,168,0.4)]"></span>
          <span className="w-1.5 h-1.5 bg-gothic-silver rounded-full opacity-40"></span>
          <span className="w-1.5 h-1.5 bg-gothic-amethyst rounded-full shadow-[0_0_8px_rgba(107,33,168,0.4)]"></span>
        </div>
      </div>

      <div className="relative pt-24 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Main Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-12">
            
            {/* Brand & Info - 4 cols */}
            <div className="lg:col-span-4">
              {/* Logo */}
              <div className="flex items-center gap-3 mb-6">
                <div className="relative w-12 h-12 clip-path-gothic-md bg-gradient-to-br from-gothic-chrome via-gothic-silver to-gothic-ash border border-gothic-pewter shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                  <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-gothic-obsidian" />
                </div>
                <div className="flex flex-col">
                  <span className="text-gothic-pearl font-bold text-2xl tracking-wider text-shadow-metal">
                    OBSIDIAN
                  </span>
                  <span className="text-gothic-smoke text-xs tracking-widest">
                    BEAUTY & STYLE
                  </span>
                </div>
              </div>

              <p className="text-gothic-smoke text-sm leading-relaxed mb-6">
                Tu destino de belleza y estilo. Servicios profesionales de manicure y una selección exclusiva de productos de moda.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <a href="tel:+543814123456" className="flex items-center gap-3 text-gothic-silver hover:text-gothic-pearl transition-colors duration-300 group">
                  <div className="w-8 h-8 rounded-md bg-gothic-iron border border-gothic-steel flex items-center justify-center group-hover:bg-gothic-steel transition-colors duration-300">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span className="text-sm">+54 381 412-3456</span>
                </a>

                <a href="mailto:info@obsidian.com" className="flex items-center gap-3 text-gothic-silver hover:text-gothic-pearl transition-colors duration-300 group">
                  <div className="w-8 h-8 rounded-md bg-gothic-iron border border-gothic-steel flex items-center justify-center group-hover:bg-gothic-steel transition-colors duration-300">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span className="text-sm">info@obsidian.com</span>
                </a>

                <div className="flex items-start gap-3 text-gothic-silver">
                  <div className="w-8 h-8 rounded-md bg-gothic-iron border border-gothic-steel flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <span className="text-sm leading-relaxed">
                    San Miguel de Tucumán, Tucumán, Argentina
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Links - 2 cols */}
            <div className="lg:col-span-2">
              <h3 className="text-gothic-pearl font-bold text-sm uppercase tracking-wider mb-6 flex items-center gap-2">
                <span className="w-1 h-4 bg-gothic-amethyst shadow-[0_0_8px_rgba(107,33,168,0.4)]"></span>
                Links Rápidos
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((link, idx) => (
                  <li key={idx}>
                    <a
                      href={link.href}
                      className="text-gothic-silver hover:text-gothic-pearl text-sm transition-colors duration-300 hover:translate-x-1 inline-block"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services - 2 cols */}
            <div className="lg:col-span-2">
              <h3 className="text-gothic-pearl font-bold text-sm uppercase tracking-wider mb-6 flex items-center gap-2">
                <span className="w-1 h-4 bg-gothic-amethyst shadow-[0_0_8px_rgba(107,33,168,0.4)]"></span>
                Servicios
              </h3>
              <ul className="space-y-3">
                {services.map((service, idx) => (
                  <li key={idx}>
                    <a
                      href={service.href}
                      className="text-gothic-silver hover:text-gothic-pearl text-sm transition-colors duration-300 hover:translate-x-1 inline-block"
                    >
                      {service.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Map - 4 cols */}
            <div className="lg:col-span-4">
              <h3 className="text-gothic-pearl font-bold text-sm uppercase tracking-wider mb-6 flex items-center gap-2">
                <span className="w-1 h-4 bg-gothic-amethyst shadow-[0_0_8px_rgba(107,33,168,0.4)]"></span>
                Ubicación
              </h3>
              <div className="relative w-full h-48 rounded-lg overflow-hidden border-2 border-gothic-steel shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
                {/* Decoraciones de esquina */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-gothic-pewter opacity-60 z-10"></div>
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-gothic-pewter opacity-60 z-10"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-gothic-pewter opacity-60 z-10"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-gothic-pewter opacity-60 z-10"></div>
                
                {/* Google Maps Iframe */}
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56550.37634479701!2d-65.26485385!3d-26.8241!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94225c0e8d0271d7%3A0x7946062ac490db16!2sSan%20Miguel%20de%20Tucum%C3%A1n%2C%20Tucum%C3%A1n!5e0!3m2!1ses!2sar!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale contrast-125 opacity-80"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Divider Gótico */}
          <div className="relative h-[1px] bg-gradient-to-r from-transparent via-gothic-steel to-transparent mb-8">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-4">
              <span className="w-2 h-2 bg-gothic-amethyst rounded-full shadow-[0_0_8px_rgba(107,33,168,0.4)]"></span>
              <span className="w-2 h-2 bg-gothic-silver rounded-full opacity-40"></span>
              <span className="w-2 h-2 bg-gothic-amethyst rounded-full shadow-[0_0_8px_rgba(107,33,168,0.4)]"></span>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Copyright */}
            <div className="flex items-center gap-2 text-gothic-smoke text-sm">
              <span>© {currentYear} Obsidian Beauty & Style</span>
              <span className="text-gothic-steel">|</span>
              <span className="flex items-center gap-1">
                Hecho con <Heart className="w-4 h-4 text-gothic-crimson" fill="currentColor" /> en Tucumán
              </span>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  aria-label={social.label}
                  className={clsx(
                    'w-10 h-10 rounded-md',
                    'bg-gothic-iron border border-gothic-steel',
                    'flex items-center justify-center',
                    'text-gothic-silver hover:text-gothic-pearl',
                    'hover:bg-gothic-steel hover:border-gothic-amethyst/30',
                    'hover:shadow-[0_0_12px_rgba(107,33,168,0.2)]',
                    'transition-all duration-300',
                    'hover:scale-110'
                  )}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex items-center gap-3">
              <a
                href="#servicios"
                className={clsx(
                  'px-4 py-2 rounded-md',
                  'bg-gothic-iron border border-gothic-steel',
                  'text-gothic-silver hover:text-gothic-pearl text-sm font-medium',
                  'hover:bg-gothic-steel',
                  'transition-all duration-300',
                  'flex items-center gap-2'
                )}
              >
                <Calendar className="w-4 h-4" />
                <span className="hidden sm:inline">Reservar</span>
              </a>

              <a
                href="#productos"
                className={clsx(
                  'px-4 py-2 rounded-md',
                  'bg-gothic-iron border border-gothic-steel',
                  'text-gothic-silver hover:text-gothic-pearl text-sm font-medium',
                  'hover:bg-gothic-steel',
                  'transition-all duration-300',
                  'flex items-center gap-2'
                )}
              >
                <ShoppingBag className="w-4 h-4" />
                <span className="hidden sm:inline">Comprar</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Decoración inferior gótica */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gothic-amethyst/20 to-transparent"></div>
    </footer>
  );
};

export default Footer;