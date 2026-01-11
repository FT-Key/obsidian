'use client';

import { Sparkles, Calendar, ShoppingBag, Heart, Star, ArrowRight, CheckCircle, Users, Award, TrendingUp, Crown, Shield, Flame } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import ProductCard from '@/components/ui/ProductCard';
import Carousel from '@/components/ui/Carousel';
import { carouselItems } from '@/constants/carousel';

export default function HomePage() {
  const services = [
    {
      title: 'Esmaltado Premium',
      description: 'Esmaltado de uñas con productos de alta calidad y acabado perfecto',
      price: 'Desde $2,500',
      icon: Sparkles
    },
    {
      title: 'Nail Art',
      description: 'Diseños personalizados y creativos para tus uñas',
      price: 'Desde $3,500',
      icon: Star
    },
    {
      title: 'Manicure Completa',
      description: 'Tratamiento completo para el cuidado y embellecimiento de tus manos',
      price: 'Desde $3,000',
      icon: Crown
    },
    {
      title: 'Pedicure Spa',
      description: 'Experiencia relajante con tratamiento completo para tus pies',
      price: 'Desde $3,800',
      icon: Flame
    }
  ];

  const products = [
    {
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80',
      imageAlt: 'Bolso de Cuero Premium',
      title: 'Bolso de Cuero Premium',
      description: 'Elegante bolso de cuero genuino con acabados de alta calidad',
      price: 12999,
      originalPrice: 18999,
      rating: 4.8,
      reviews: 124,
      badge: 'OFERTA',
      variant: 'default'
    },
    {
      image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80',
      imageAlt: 'Vestido Elegante',
      title: 'Vestido Elegante',
      description: 'Diseño sofisticado perfecto para cualquier ocasión especial',
      price: 8999,
      rating: 4.9,
      reviews: 89,
      variant: 'premium'
    },
    {
      image: 'https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?w=800&q=80',
      imageAlt: 'Gafas de Sol',
      title: 'Gafas de Sol Premium',
      description: 'Protección UV400 con diseño moderno y elegante',
      price: 3499,
      originalPrice: 4999,
      rating: 4.7,
      reviews: 203,
      variant: 'glass'
    },
    {
      image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800&q=80',
      imageAlt: 'Conjunto Casual',
      title: 'Conjunto Casual Chic',
      description: 'Comodidad y estilo para el día a día',
      price: 6999,
      rating: 4.6,
      reviews: 156,
      badge: 'NUEVO',
      variant: 'light'
    }
  ];

  return (
    <div className="bg-[#0a0a0a]">
      
      {/* Hero Section - Fixed Background */}
      <section 
        id="hero" 
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1604654894610-df63bc536371?w=1920&q=80')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/70 via-[#0a0a0a]/85 to-[#0a0a0a]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="primary" icon={Sparkles} glow className="mb-8">
            Belleza y Estilo Premium
          </Badge>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 text-shadow-metal">
            <span className="bg-gradient-to-r from-[#f3f4f6] via-[#e5e7eb] to-[#d1d5db] bg-clip-text text-transparent">
              Descubre Tu
            </span>
            <br />
            <span className="bg-gradient-to-r from-[#6b21a8] via-[#7c2d95] to-[#6b21a8] bg-clip-text text-transparent">
              Estilo Único
            </span>
          </h1>

          <p className="text-xl text-[#9ca3af] mb-12 max-w-2xl mx-auto">
            Servicios de belleza premium y productos exclusivos de moda para realzar tu personalidad
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg" icon={Calendar}>
              Reservar Turno
            </Button>
            <Button variant="secondary" size="lg" icon={ShoppingBag}>
              Ver Productos
            </Button>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-[#6b21a8] rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-[#6b21a8] rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section 
        id="servicios" 
        className="relative min-h-screen flex items-center py-20 overflow-hidden"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1604654894610-df63bc536371?w=1920&q=80')",
            filter: 'brightness(0.3)',
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a]"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Nuestros Servicios</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-[#f3f4f6] mb-4 text-shadow-metal">
              Servicios de Belleza Premium
            </h2>
            <p className="text-[#9ca3af] text-lg max-w-2xl mx-auto">
              Tratamientos profesionales con productos de alta calidad
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card
                key={index}
                variant="glass"
                icon={service.icon}
                title={service.title}
                description={service.description}
                hoverable
                footer={
                  <div className="flex items-center justify-between">
                    <Badge variant="primary" size="sm">{service.price}</Badge>
                    <Button variant="primary" size="sm">
                      Reservar
                    </Button>
                  </div>
                }
              />
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section 
        id="productos" 
        className="relative min-h-screen flex items-center py-20 overflow-hidden"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1920&q=80')",
            filter: 'brightness(0.25)',
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a]"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center mb-16">
            <Badge variant="success" icon={ShoppingBag} className="mb-4">
              Tienda Online
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-[#f3f4f6] mb-4 text-shadow-metal">
              Productos Exclusivos
            </h2>
            <p className="text-[#9ca3af] text-lg max-w-2xl mx-auto">
              Ropa, carteras y accesorios seleccionados especialmente para ti
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <ProductCard
                key={index}
                {...product}
                imagePosition="float"
                imageSize="large"
                hoverable
                onAddToCart={() => console.log('Agregar:', product.title)}
                onWishlist={() => console.log('Favorito:', product.title)}
                onQuickView={() => console.log('Vista rápida:', product.title)}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg" icon={ArrowRight} iconPosition="right">
              Ver Todos los Productos
            </Button>
          </div>
        </div>
      </section>

      {/* Carousel Section */}
    <section className="relative py-20 overflow-hidden">
  <div 
    className="absolute inset-0 bg-cover bg-center bg-fixed"
    style={{
      backgroundImage: "url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920&q=80')",
      filter: 'brightness(0.25)',
    }}
  ></div>
  <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a]"></div>

  <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-12">
      <Badge variant="primary" icon={Star} glow className="mb-4">
        Destacados
      </Badge>
      <h2 className="text-4xl md:text-5xl font-bold text-[#f3f4f6] mb-4 text-shadow-metal">
        Lo Más Popular
      </h2>
    </div>
    
    <Carousel items={carouselItems} />
  </div>
</section>

      {/* Stats Section */}
      <section 
        id="nosotros" 
        className="relative min-h-screen flex items-center py-20 overflow-hidden"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1920&q=80')",
            filter: 'brightness(0.3)',
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a]/90 to-[#0a0a0a]"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center mb-16">
            <Badge variant="warning" icon={Crown} className="mb-4">
              Sobre Nosotros
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-[#f3f4f6] mb-6 text-shadow-metal">
              Tu Destino de Belleza y Estilo
            </h2>
            <p className="text-[#9ca3af] text-lg max-w-3xl mx-auto leading-relaxed mb-12">
              En Obsidian, fusionamos la elegancia gótica con la belleza moderna. Ofrecemos servicios profesionales de manicure y una selección exclusiva de productos de moda para que expreses tu estilo único.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            <Card variant="glass" hoverable className="text-center">
              <div className="py-6">
                <Users className="w-12 h-12 text-[#6b21a8] mx-auto mb-4" />
                <div className="text-4xl font-bold text-[#f3f4f6] mb-2">5K+</div>
                <Badge variant="default" size="sm">Clientes Felices</Badge>
              </div>
            </Card>

            <Card variant="glass" hoverable className="text-center">
              <div className="py-6">
                <Award className="w-12 h-12 text-[#6b21a8] mx-auto mb-4" />
                <div className="text-4xl font-bold text-[#f3f4f6] mb-2">98%</div>
                <Badge variant="success" size="sm">Satisfacción</Badge>
              </div>
            </Card>

            <Card variant="glass" hoverable className="text-center">
              <div className="py-6">
                <Star className="w-12 h-12 text-[#6b21a8] mx-auto mb-4" />
                <div className="text-4xl font-bold text-[#f3f4f6] mb-2">4.9</div>
                <Badge variant="warning" size="sm">Rating</Badge>
              </div>
            </Card>

            <Card variant="glass" hoverable className="text-center">
              <div className="py-6">
                <TrendingUp className="w-12 h-12 text-[#6b21a8] mx-auto mb-4" />
                <div className="text-4xl font-bold text-[#f3f4f6] mb-2">3+</div>
                <Badge variant="primary" size="sm">Años</Badge>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        id="contacto" 
        className="relative min-h-screen flex items-center py-20 overflow-hidden"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1920&q=80')",
            filter: 'brightness(0.25)',
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a]/85 to-[#0a0a0a]"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <Card variant="glass" className="text-center">
            <div className="py-16 px-8">
              <Sparkles className="w-16 h-16 text-[#6b21a8] mx-auto mb-6" />
              
              <Badge variant="primary" size="lg" glow className="mb-6">
                ¡Únete Ahora!
              </Badge>

              <h2 className="text-4xl md:text-5xl font-bold text-[#f3f4f6] mb-6 text-shadow-metal">
                ¿Lista para Brillar?
              </h2>

              <p className="text-xl text-[#9ca3af] mb-12 max-w-2xl mx-auto">
                Reserva tu cita ahora y descubre la experiencia Obsidian. Belleza, elegancia y estilo en un solo lugar.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button variant="primary" size="lg" icon={Calendar}>
                  Reservar Ahora
                </Button>
                <Button variant="outline" size="lg" icon={ShoppingBag}>
                  Ver Catálogo
                </Button>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex items-start gap-3 text-left">
                  <CheckCircle className="w-6 h-6 text-[#6b21a8] flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-[#e5e7eb] font-semibold mb-1">Profesionales Certificadas</h4>
                    <p className="text-[#9ca3af] text-sm">Equipo experto y capacitado</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-left">
                  <CheckCircle className="w-6 h-6 text-[#6b21a8] flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-[#e5e7eb] font-semibold mb-1">Productos Premium</h4>
                    <p className="text-[#9ca3af] text-sm">Solo las mejores marcas</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-left">
                  <CheckCircle className="w-6 h-6 text-[#6b21a8] flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-[#e5e7eb] font-semibold mb-1">Atención Personalizada</h4>
                    <p className="text-[#9ca3af] text-sm">Cuidamos cada detalle</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}