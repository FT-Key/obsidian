"use client";

import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter, Heart, Calendar, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import useThemeStore from '@/store/useThemeStore';

/**
 * FooterBrandLogo - Componente de logo con flip idéntico al del Navbar
 */
const FooterBrandLogo = () => {
  const theme = useThemeStore((state) => state.theme);
  const [isFlipping, setIsFlipping] = useState(false);
  const [displayTheme, setDisplayTheme] = useState(theme);

  useEffect(() => {
    setIsFlipping(true);
    const timer = setTimeout(() => {
      setDisplayTheme(theme);
      setIsFlipping(false);
    }, 400);
    return () => clearTimeout(timer);
  }, [theme]);

  const darkLogo = '/logo-obsidian.png';
  const lightLogo = '/logo-zabina.jpg';
  const currentLogo = displayTheme === 'dark' ? darkLogo : lightLogo;
  const backLogo = displayTheme === 'dark' ? lightLogo : darkLogo;

  const darkName = 'OBSIDIAN';
  const lightName = 'ZABINA';
  const currentName = displayTheme === 'dark' ? darkName : lightName;
  const backName = displayTheme === 'dark' ? lightName : darkName;

  return (
    <div className={`flex items-center gap-2 sm:gap-3 group ${isFlipping ? 'brand-flipping' : ''}`}>
      {/* Logo con flip 3D */}
      <div className={`brand-logo-container ${isFlipping ? 'brand-logo-theme-flip' : ''}`}>
        <div className={`brand-logo-inner ${isFlipping ? 'brand-logo-theme-flip-inner' : ''}`}>
          {/* Frente */}
          <div
            className="brand-logo-front clip-path-gothic-md"
            style={{
              background: 'linear-gradient(to bottom right, #ffffff, #f5f5f5, #e0e0e0)',
            }}
          >
            <Image
              src={currentLogo}
              alt="Logo Front"
              className="object-contain p-1"
              width={40}
              height={40}
            />
          </div>
          {/* Atrás */}
          <div
            className="brand-logo-back clip-path-gothic-md"
            style={{
              background: 'linear-gradient(to bottom right, #ffffff, #f5f5f5, #e0e0e0)',
            }}
          >
            <Image
              src={backLogo}
              alt="Logo Back"
              className="object-contain p-1"
              width={40}
              height={40}
            />
          </div>
        </div>
      </div>

      {/* Texto con animación de quemado */}
      <div className="flex flex-col">
        <div className={`brand-name-container ${isFlipping ? 'brand-name-theme-flip' : ''}`}>
          <span className="brand-name">
            {currentName}
          </span>
          <span className={`brand-name brand-name-back ${isFlipping ? 'brand-name-theme-flip-back' : ''}`}>
            {backName}
          </span>
        </div>
        <span className="brand-subtitle">
          BEAUTY & STYLE
        </span>
      </div>
    </div>
  );
};

/**
 * Footer Component - Gothic Dark Medieval con soporte Dark/Light Mode
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
    <footer className="relative overflow-hidden" style={{ backgroundColor: 'var(--color-gothic-void)' }}>
      {/* Decoración superior con clip-path gótico */}
      <div 
        className="absolute top-0 left-0 right-0 h-16" 
        style={{
          backgroundColor: 'var(--color-gothic-abyss)',
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 95% 80%, 90% 100%, 85% 70%, 80% 100%, 75% 85%, 70% 100%, 65% 75%, 60% 100%, 55% 80%, 50% 100%, 45% 80%, 40% 100%, 35% 75%, 30% 100%, 25% 85%, 20% 100%, 15% 70%, 10% 100%, 5% 80%, 0 100%)'
        }}
      >
        {/* Decoración de puntos sutiles */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-2">
          <span 
            className="w-1.5 h-1.5 rounded-full"
            style={{
              backgroundColor: 'var(--color-gothic-amethyst)',
              boxShadow: '0 0 8px rgba(107, 33, 168, 0.4)'
            }}
          />
          <span 
            className="w-1.5 h-1.5 rounded-full opacity-40"
            style={{ backgroundColor: 'var(--color-gothic-silver)' }}
          />
          <span 
            className="w-1.5 h-1.5 rounded-full"
            style={{
              backgroundColor: 'var(--color-gothic-amethyst)',
              boxShadow: '0 0 8px rgba(107, 33, 168, 0.4)'
            }}
          />
        </div>
      </div>

      <div className="relative pt-24 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Main Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-12">

            {/* Brand & Info - 4 cols */}
            <div className="lg:col-span-4">
              {/* Logo con flip animado */}
              <div className="mb-6">
                <FooterBrandLogo />
              </div>

              <p 
                className="text-sm leading-relaxed mb-6"
                style={{ color: 'var(--color-gothic-smoke)' }}
              >
                Tu destino de belleza y estilo. Servicios profesionales de manicure y una selección exclusiva de productos de moda.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <a 
                  href="tel:+543814123456" 
                  className="flex items-center gap-3 transition-colors duration-300 group"
                  style={{ color: 'var(--color-gothic-silver)' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-gothic-pearl)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-gothic-silver)'}
                >
                  <div 
                    className="w-8 h-8 rounded-md border flex items-center justify-center transition-colors duration-300"
                    style={{
                      backgroundColor: 'var(--color-gothic-iron)',
                      borderColor: 'var(--color-gothic-steel)'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-gothic-steel)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--color-gothic-iron)'}
                  >
                    <Phone className="w-4 h-4" />
                  </div>
                  <span className="text-sm">+54 381 412-3456</span>
                </a>

                <a 
                  href="mailto:info@obsidian.com" 
                  className="flex items-center gap-3 transition-colors duration-300 group"
                  style={{ color: 'var(--color-gothic-silver)' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-gothic-pearl)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-gothic-silver)'}
                >
                  <div 
                    className="w-8 h-8 rounded-md border flex items-center justify-center transition-colors duration-300"
                    style={{
                      backgroundColor: 'var(--color-gothic-iron)',
                      borderColor: 'var(--color-gothic-steel)'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-gothic-steel)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--color-gothic-iron)'}
                  >
                    <Mail className="w-4 h-4" />
                  </div>
                  <span className="text-sm">info@obsidian.com</span>
                </a>

                <div 
                  className="flex items-start gap-3"
                  style={{ color: 'var(--color-gothic-silver)' }}
                >
                  <div 
                    className="w-8 h-8 rounded-md border flex items-center justify-center flex-shrink-0"
                    style={{
                      backgroundColor: 'var(--color-gothic-iron)',
                      borderColor: 'var(--color-gothic-steel)'
                    }}
                  >
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
              <h3 
                className="font-bold text-sm uppercase tracking-wider mb-6 flex items-center gap-2"
                style={{ color: 'var(--color-gothic-pearl)' }}
              >
                <span 
                  className="w-1 h-4"
                  style={{
                    backgroundColor: 'var(--color-gothic-amethyst)',
                    boxShadow: '0 0 8px rgba(107, 33, 168, 0.4)'
                  }}
                />
                Links Rápidos
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((link, idx) => (
                  <li key={idx}>
                    <a
                      href={link.href}
                      className="text-sm transition-all duration-300 inline-block"
                      style={{ color: 'var(--color-gothic-silver)' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = 'var(--color-gothic-pearl)';
                        e.currentTarget.style.transform = 'translateX(4px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = 'var(--color-gothic-silver)';
                        e.currentTarget.style.transform = 'translateX(0)';
                      }}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services - 2 cols */}
            <div className="lg:col-span-2">
              <h3 
                className="font-bold text-sm uppercase tracking-wider mb-6 flex items-center gap-2"
                style={{ color: 'var(--color-gothic-pearl)' }}
              >
                <span 
                  className="w-1 h-4"
                  style={{
                    backgroundColor: 'var(--color-gothic-amethyst)',
                    boxShadow: '0 0 8px rgba(107, 33, 168, 0.4)'
                  }}
                />
                Servicios
              </h3>
              <ul className="space-y-3">
                {services.map((service, idx) => (
                  <li key={idx}>
                    <a
                      href={service.href}
                      className="text-sm transition-all duration-300 inline-block"
                      style={{ color: 'var(--color-gothic-silver)' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = 'var(--color-gothic-pearl)';
                        e.currentTarget.style.transform = 'translateX(4px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = 'var(--color-gothic-silver)';
                        e.currentTarget.style.transform = 'translateX(0)';
                      }}
                    >
                      {service.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Map - 4 cols */}
            <div className="lg:col-span-4">
              <h3 
                className="font-bold text-sm uppercase tracking-wider mb-6 flex items-center gap-2"
                style={{ color: 'var(--color-gothic-pearl)' }}
              >
                <span 
                  className="w-1 h-4"
                  style={{
                    backgroundColor: 'var(--color-gothic-amethyst)',
                    boxShadow: '0 0 8px rgba(107, 33, 168, 0.4)'
                  }}
                />
                Ubicación
              </h3>
              <div 
                className="relative w-full h-48 rounded-lg overflow-hidden border-2"
                style={{
                  borderColor: 'var(--color-gothic-steel)',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.8)'
                }}
              >
                {/* Decoraciones de esquina */}
                <div 
                  className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 opacity-60 z-10"
                  style={{ borderColor: 'var(--color-gothic-pewter)' }}
                />
                <div 
                  className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 opacity-60 z-10"
                  style={{ borderColor: 'var(--color-gothic-pewter)' }}
                />
                <div 
                  className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 opacity-60 z-10"
                  style={{ borderColor: 'var(--color-gothic-pewter)' }}
                />
                <div 
                  className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 opacity-60 z-10"
                  style={{ borderColor: 'var(--color-gothic-pewter)' }}
                />

                {/* Google Maps Iframe - SIN grayscale */}
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d890.2285395808054!2d-65.14930727145226!3d-26.81086179853819!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94225f001532fc0f%3A0x3dfa068fd3ec01f9!2sZabina%20Nails!5e0!3m2!1ses-419!2sus!4v1768697504833!5m2!1ses-419!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="opacity-90"
                />
              </div>
            </div>
          </div>

          {/* Divider Gótico */}
          <div className="relative h-[1px] mb-8" style={{ background: 'linear-gradient(to right, transparent, var(--color-gothic-steel), transparent)' }}>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-4">
              <span 
                className="w-2 h-2 rounded-full"
                style={{
                  backgroundColor: 'var(--color-gothic-amethyst)',
                  boxShadow: '0 0 8px rgba(107, 33, 168, 0.4)'
                }}
              />
              <span 
                className="w-2 h-2 rounded-full opacity-40"
                style={{ backgroundColor: 'var(--color-gothic-silver)' }}
              />
              <span 
                className="w-2 h-2 rounded-full"
                style={{
                  backgroundColor: 'var(--color-gothic-amethyst)',
                  boxShadow: '0 0 8px rgba(107, 33, 168, 0.4)'
                }}
              />
            </div>
          </div>

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">

            {/* Copyright */}
            <div 
              className="flex items-center gap-2 text-sm"
              style={{ color: 'var(--color-gothic-smoke)' }}
            >
              <span>© {currentYear} Obsidian Beauty & Style</span>
              <span style={{ color: 'var(--color-gothic-steel)' }}>|</span>
              <span className="flex items-center gap-1">
                Hecho con <Heart className="w-4 h-4" style={{ color: 'var(--color-gothic-crimson)' }} fill="currentColor" /> en Tucumán
              </span>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-md border flex items-center justify-center transition-all duration-300"
                  style={{
                    backgroundColor: 'var(--color-gothic-iron)',
                    borderColor: 'var(--color-gothic-steel)',
                    color: 'var(--color-gothic-silver)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-gothic-steel)';
                    e.currentTarget.style.borderColor = 'rgba(107, 33, 168, 0.3)';
                    e.currentTarget.style.color = 'var(--color-gothic-pearl)';
                    e.currentTarget.style.boxShadow = '0 0 12px rgba(107, 33, 168, 0.2)';
                    e.currentTarget.style.transform = 'scale(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-gothic-iron)';
                    e.currentTarget.style.borderColor = 'var(--color-gothic-steel)';
                    e.currentTarget.style.color = 'var(--color-gothic-silver)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex items-center gap-3">
              <a
                href="#servicios"
                className="px-4 py-2 rounded-md border text-sm font-medium transition-all duration-300 flex items-center gap-2"
                style={{
                  backgroundColor: 'var(--color-gothic-iron)',
                  borderColor: 'var(--color-gothic-steel)',
                  color: 'var(--color-gothic-silver)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-gothic-steel)';
                  e.currentTarget.style.color = 'var(--color-gothic-pearl)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-gothic-iron)';
                  e.currentTarget.style.color = 'var(--color-gothic-silver)';
                }}
              >
                <Calendar className="w-4 h-4" />
                <span className="hidden sm:inline">Reservar</span>
              </a>

              <a
                href="#productos"
                className="px-4 py-2 rounded-md border text-sm font-medium transition-all duration-300 flex items-center gap-2"
                style={{
                  backgroundColor: 'var(--color-gothic-iron)',
                  borderColor: 'var(--color-gothic-steel)',
                  color: 'var(--color-gothic-silver)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-gothic-steel)';
                  e.currentTarget.style.color = 'var(--color-gothic-pearl)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-gothic-iron)';
                  e.currentTarget.style.color = 'var(--color-gothic-silver)';
                }}
              >
                <ShoppingBag className="w-4 h-4" />
                <span className="hidden sm:inline">Comprar</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Decoración inferior gótica */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-1"
        style={{ background: 'linear-gradient(to right, transparent, rgba(107, 33, 168, 0.2), transparent)' }}
      />
    </footer>
  );
};

export default Footer;