"use client";

import React, { useState } from 'react';
import { Moon, Skull, Ghost, Flame, Github, Twitter, Mail, Sword, Shield, Crown } from 'lucide-react';
import Button from './components/ui/Button';
import Card from './components/ui/Card';
import Badge from './components/ui/Badge';
import ProductCard from './components/ui/ProductCard';
import Carousel from './components/ui/Carousel';
import { carouselItems } from '@/constants/carousel';

export default function Home() {
  const [activeCard, setActiveCard] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#050505] to-[#0a0a0a]">
      {/* Header */}
      <header className="border-b border-[#1a1a1a] bg-[#0a0a0a]/90 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#2d2d2d] to-[#1a1a1a] border border-[#3a3a3a] rounded-lg flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                <Skull className="w-6 h-6 text-gray-300" />
              </div>
              <h1 className="text-2xl font-bold text-gray-100">OBSIDIAN</h1>
              <Badge variant="primary" size="sm" glow>v1.0</Badge>
            </div>

            <nav className="hidden md:flex gap-4 items-center">
              <a href="#inicio" className="text-gray-400 hover:text-gray-200 transition-colors duration-200">
                Inicio
              </a>
              <a href="#features" className="text-gray-400 hover:text-gray-200 transition-colors duration-200">
                Características
              </a>
              <a href="#components" className="text-gray-400 hover:text-gray-200 transition-colors duration-200">
                Componentes
              </a>
              <Button variant="ghost" size="sm">
                Acceder
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="inicio" className="py-20 px-4 sm:py-32">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8 flex justify-center animate-fadeIn">
            <div className="relative animate-float">
              <Moon className="w-20 h-20 text-gray-400" />
              <div className="absolute inset-0 blur-2xl bg-gray-500/10 rounded-full animate-subtle-pulse"></div>
            </div>
          </div>

          <div className="flex justify-center gap-2 mb-6">
            <Badge variant="primary" icon={Crown} glow>Premium</Badge>
            <Badge variant="outline" icon={Shield}>Secure</Badge>
            <Badge variant="success" icon={Sword}>Powerful</Badge>
          </div>

          <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-300 via-gray-100 to-gray-300 bg-clip-text text-transparent animate-fadeIn">
            Gothic Dark Experience
          </h2>

          <p className="text-lg sm:text-xl text-gray-400 mb-10 max-w-2xl mx-auto animate-fadeIn">
            Sumérgete en una experiencia visual oscura y elegante, donde las sombras cobran vida y el diseño gótico moderno te envuelve.
          </p>

          <div className="flex gap-4 justify-center flex-wrap animate-fadeIn">
            <Button variant="primary" size="lg" icon={Flame}>
              Comenzar Ahora
            </Button>
            <Button variant="secondary" size="lg" icon={Ghost}>
              Explorar Más
            </Button>
            <Button variant="ghost" size="lg" icon={Skull}>
              Documentación
            </Button>
          </div>
        </div>
      </section>

      {/* Components Showcase */}
      <section id="components" className="py-16 px-4 bg-[#050505]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-gray-100 mb-4">
              Componentes Góticos
            </h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Colección de componentes con estilo gótico dark, bordes ornamentados y efectos sutiles
            </p>
          </div>

          {/* Buttons Demo */}
          <div className="mb-16">
            <h4 className="text-2xl font-bold text-gray-300 mb-6 text-center">Botones</h4>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="danger">Danger</Button>
              <Button variant="success">Success</Button>
              <Button variant="warning">Warning</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="primary" size="sm">Small</Button>
              <Button variant="primary" size="lg">Large</Button>
              <Button variant="primary" icon={Flame} iconPosition="left">With Icon</Button>
              <Button variant="secondary" loading>Loading...</Button>
              <Button variant="danger" disabled>Disabled</Button>
            </div>
          </div>

          {/* Badges Demo */}
          <div className="mb-16">
            <h4 className="text-2xl font-bold text-gray-300 mb-6 text-center">Badges</h4>
            <div className="flex flex-wrap gap-3 justify-center">
              <Badge variant="default">Default</Badge>
              <Badge variant="primary">Primary</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="danger">Danger</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="info">Info</Badge>
              <Badge variant="ghost">Ghost</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="primary" glow>Glow Effect</Badge>
              <Badge variant="success" icon={Shield}>With Icon</Badge>
              <Badge variant="danger" size="lg">Large</Badge>
              <Badge variant="primary" removable onRemove={() => alert('Removed!')}>
                Removable
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Cards Section */}
      <section id="features" className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl sm:text-4xl font-bold text-center mb-4 text-gray-100">
            Características Destacadas
          </h3>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            Cards con marcos ornamentados, esquinas angulares y efectos sutiles
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card
              variant="default"
              icon={Ghost}
              title="Diseño Oscuro"
              description="Paleta de colores gótica con negros profundos, grises elegantes y plateados místicos que crean una atmósfera única y envolvente."
              footer={
                <div className="flex gap-2">
                  <Badge variant="primary" size="sm">Dark</Badge>
                  <Badge variant="outline" size="sm">Elegant</Badge>
                </div>
              }
            />

            <Card
              variant="light"
              icon={Flame}
              title="Variante Clara"
              subtitle="Premium Feature"
              description="Card con fondo claro que contrasta perfectamente con el fondo oscuro de la aplicación."
              footer={
                <Button variant="primary" size="sm" className="w-full">
                  Ver Demo
                </Button>
              }
            />

            <Card
              variant="glass"
              icon={Skull}
              title="Componentes Modernos"
              description="UI components completamente personalizables construidos con las últimas tecnologías web y mejores prácticas de desarrollo moderno."
              footer={
                <div className="flex justify-between items-center">
                  <Badge variant="success" size="sm">Ready</Badge>
                  <Button variant="primary" size="sm">
                    Explorar
                  </Button>
                </div>
              }
            />
          </div>

          {/* Card Variants Demo */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card
              variant="outlined"
              title="Outlined Card"
              description="Card con borde sutil y fondo transparente, perfecto para destacar contenido importante."
            />

            <Card
              variant="danger"
              icon={Flame}
              title="Danger Card"
              description="Card con tono rojo para alertas, advertencias o contenido crítico que requiere atención."
            />
          </div>
        </div>
      </section>

      {/* Product Cards Section */}
      <section className="py-16 px-4 bg-[#050505]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-gray-100 mb-4">
              Product Cards Góticas
            </h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Cards de producto con imágenes que "flotan" fuera del contenedor, variantes claras y oscuras
            </p>
          </div>

          {/* Productos con variante oscura (default) */}
          <h4 className="text-2xl font-bold text-gray-300 mb-6 text-center">Variante Oscura</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <ProductCard
              image="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80"
              imageAlt="Audífonos Premium Inalámbricos"
              title="Audífonos Premium"
              description="Sonido envolvente de alta fidelidad con cancelación de ruido activa"
              price={299.99}
              originalPrice={399.99}
              rating={4.5}
              reviews={128}
              variant="default"
              imagePosition="float"
              imageSize="large"
              onAddToCart={() => alert('Agregado al carrito!')}
              onWishlist={() => alert('Agregado a favoritos!')}
              onQuickView={() => alert('Vista rápida!')}
            />

            <ProductCard
              image="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80"
              imageAlt="Reloj Inteligente Premium"
              title="Smartwatch Elite"
              description="Seguimiento avanzado de salud y fitness con pantalla AMOLED"
              price={449.99}
              originalPrice={599.99}
              rating={5}
              reviews={256}
              badge="NUEVO"
              variant="premium"
              imagePosition="float"
              imageSize="large"
              onAddToCart={() => alert('Agregado al carrito!')}
              onWishlist={() => alert('Agregado a favoritos!')}
              onQuickView={() => alert('Vista rápida!')}
            />

            <ProductCard
              image="https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80"
              imageAlt="Gafas de Sol Clásicas"
              title="Gafas de Sol Premium"
              description="Diseño atemporal con protección UV400 y lentes polarizadas"
              price={179.99}
              rating={4.8}
              reviews={89}
              variant="glass"
              imagePosition="float"
              imageSize="large"
              onAddToCart={() => alert('Agregado al carrito!')}
              onWishlist={() => alert('Agregado a favoritos!')}
            />
          </div>

          {/* Productos con variante clara */}
          <h4 className="text-2xl font-bold text-gray-300 mb-6 text-center">Variante Clara</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ProductCard
              image="https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800&q=80"
              imageAlt="Zapatillas Deportivas"
              title="Zapatillas Running Pro"
              description="Máximo confort y rendimiento para tus entrenamientos más intensos"
              price={159.99}
              originalPrice={199.99}
              rating={4.3}
              reviews={45}
              variant="light"
              imagePosition="float"
              imageSize="large"
              onAddToCart={() => alert('Agregado al carrito!')}
            />

            <ProductCard
              image="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80"
              imageAlt="Zapatillas Urbanas"
              title="Urban Sneakers"
              description="Estilo y comodidad para el día a día en la ciudad"
              price={129.99}
              rating={4.7}
              reviews={201}
              discount={35}
              variant="light"
              imagePosition="float"
              imageSize="large"
              onAddToCart={() => alert('Agregado al carrito!')}
            />

            <ProductCard
              image="https://images.unsplash.com/photo-1560343090-f0409e92791a?w=800&q=80"
              imageAlt="Cámara Profesional"
              title="Cámara DSLR Pro"
              description="Captura momentos inolvidables con calidad profesional"
              price={899.99}
              rating={4.9}
              reviews={512}
              badge="TOP"
              variant="light"
              imagePosition="float"
              imageSize="large"
              onAddToCart={() => alert('Agregado al carrito!')}
              onWishlist={() => alert('Agregado a favoritos!')}
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "100+", label: "Componentes", badge: "primary" },
              { number: "10K+", label: "Usuarios", badge: "success" },
              { number: "99%", label: "Satisfacción", badge: "warning" },
              { number: "24/7", label: "Soporte", badge: "default" }
            ].map((stat, index) => (
              <div key={index} className="text-center group cursor-pointer">
                <div className="text-4xl sm:text-5xl font-bold text-gray-300 mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.number}
                </div>
                <div className="text-gray-500 text-sm uppercase tracking-wide mb-2">
                  {stat.label}
                </div>
                <Badge variant={stat.badge} size="sm">{stat.label}</Badge>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <Card
            variant="glass"
            className="text-center"
          >
            <div className="p-12">
              <Badge variant="primary" size="lg" glow className="mb-6">
                ¡Únete Ahora!
              </Badge>
              <h3 className="text-3xl sm:text-4xl font-bold text-gray-100 mb-4">
                ¿Listo para comenzar?
              </h3>
              <p className="text-gray-400 mb-8 text-lg">
                Únete a la oscuridad y descubre un nuevo nivel de diseño web con componentes góticos únicos
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Button variant="primary" size="lg" icon={Crown}>
                  Comenzar Gratis
                </Button>
                <Button variant="outline" size="lg" icon={Shield}>
                  Ver Precios
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section>
        <Carousel items={carouselItems} />
      </section>

      {/* Footer */}
      <footer className="border-t border-[#1a1a1a] bg-[#0a0a0a] py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Skull className="w-6 h-6 text-gray-500" />
              <span className="text-gray-400 text-sm">
                © 2024 Obsidian. Todos los derechos reservados.
              </span>
            </div>

            <div className="flex gap-4">
              <Button variant="ghost" size="sm" icon={Twitter}>Twitter</Button>
              <Button variant="ghost" size="sm" icon={Github}>GitHub</Button>
              <Button variant="ghost" size="sm" icon={Mail}>Email</Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}