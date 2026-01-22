'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Calendar, ShoppingBag, Heart, Star, ArrowRight, CheckCircle, Users, Award, TrendingUp } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import ProductCard from '@/components/ui/ProductCard';
import Carousel from '@/components/ui/Carousel';

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const heroRef = useRef(null);
  const heroTextRef = useRef(null);
  const heroBgOverlayRef = useRef(null);
  const heroBgRef = useRef(null);
  const servicesRef = useRef(null);
  const servicesTitleRef = useRef(null);
  const serviceCardsRef = useRef(null);
  const servicesBgRef = useRef(null);
  const productsRef = useRef(null);
  const productsTitleRef = useRef(null);
  const productCardsRef = useRef(null);
  const productsBgRef = useRef(null);
  const carouselRef = useRef(null);
  const carouselTitleRef = useRef(null);
  const carouselBgRef = useRef(null);
  const statsRef = useRef(null);
  const statsTitleRef = useRef(null);
  const statsCardsRef = useRef(null);
  const statsBgRef = useRef(null);
  const ctaRef = useRef(null);
  const ctaBgRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(heroBgOverlayRef.current,
      { 
        opacity: 1,
        backdropFilter: 'blur(20px) brightness(1.4)',
        WebkitBackdropFilter: 'blur(20px) brightness(1.4)'
      },
      { 
        opacity: 0.3,
        backdropFilter: 'blur(0px) brightness(1)',
        WebkitBackdropFilter: 'blur(0px) brightness(1)',
        duration: 2,
        ease: 'power2.inOut',
        delay: 0.2
      }
    );

    gsap.to(heroBgRef.current, {
      yPercent: 30,
      ease: 'none',
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });

    gsap.fromTo(heroTextRef.current,
      { opacity: 0, y: 120, scale: 0.95 },
      { 
        opacity: 1, 
        y: 0,
        scale: 1,
        duration: 1.4,
        ease: 'power3.out',
        delay: 0.3
      }
    );

    gsap.to(servicesBgRef.current, {
      yPercent: 20,
      scale: 1.1,
      ease: 'none',
      scrollTrigger: {
        trigger: servicesRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });

    gsap.fromTo(servicesTitleRef.current,
      { opacity: 0, y: 80 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: servicesTitleRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    const serviceCards = serviceCardsRef.current?.children;
    if (serviceCards) {
      const directions = [
        { x: -200, y: 200, rotation: -15 },
        { x: 0, y: 250, rotation: 0 },
        { x: 200, y: 200, rotation: 15 },
        { x: -150, y: -150, rotation: -10 }
      ];

      Array.from(serviceCards).forEach((card, index) => {
        const direction = directions[index % directions.length];
        
        gsap.fromTo(card,
          {
            opacity: 0,
            x: direction.x,
            y: direction.y,
            rotation: direction.rotation,
            scale: 0.7
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            rotation: 0,
            scale: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: serviceCardsRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse'
            },
            delay: index * 0.15
          }
        );
      });
    }

    gsap.to(productsBgRef.current, {
      yPercent: 15,
      scale: 1.08,
      ease: 'none',
      scrollTrigger: {
        trigger: productsRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });

    gsap.fromTo(productsTitleRef.current,
      { opacity: 0, y: 80 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: productsTitleRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    const productCards = productCardsRef.current?.children;
    if (productCards) {
      const directions = [
        { x: -250, y: 150, rotation: -20 },
        { x: 150, y: -200, rotation: 12 },
        { x: -180, y: -180, rotation: -15 },
        { x: 220, y: 180, rotation: 18 }
      ];

      Array.from(productCards).forEach((card, index) => {
        const direction = directions[index % directions.length];
        
        gsap.fromTo(card,
          {
            opacity: 0,
            x: direction.x,
            y: direction.y,
            rotation: direction.rotation,
            scale: 0.6
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            rotation: 0,
            scale: 1,
            duration: 1.3,
            ease: 'back.out(1.4)',
            scrollTrigger: {
              trigger: productCardsRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse'
            },
            delay: index * 0.2
          }
        );
      });
    }

    gsap.fromTo(carouselTitleRef.current,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: carouselTitleRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    gsap.to(carouselBgRef.current, {
      yPercent: 25,
      ease: 'none',
      scrollTrigger: {
        trigger: carouselRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });

    gsap.fromTo(carouselRef.current,
      { opacity: 0, y: 100, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: carouselRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    gsap.fromTo(statsTitleRef.current,
      { opacity: 0, y: 80 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: statsTitleRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    gsap.to(statsBgRef.current, {
      yPercent: 18,
      scale: 1.05,
      ease: 'none',
      scrollTrigger: {
        trigger: statsRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });

    const statsCards = statsCardsRef.current?.children;
    if (statsCards) {
      const directions = [
        { x: -180, y: -120, rotation: -25 },
        { x: 180, y: -120, rotation: 25 },
        { x: -180, y: 120, rotation: -25 },
        { x: 180, y: 120, rotation: 25 }
      ];

      Array.from(statsCards).forEach((card, index) => {
        const direction = directions[index % directions.length];
        
        gsap.fromTo(card,
          {
            opacity: 0,
            x: direction.x,
            y: direction.y,
            rotation: direction.rotation,
            scale: 0.5
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            rotation: 0,
            scale: 1,
            duration: 1.1,
            ease: 'back.out(1.6)',
            scrollTrigger: {
              trigger: statsCardsRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse'
            },
            delay: index * 0.12
          }
        );
      });
    }

    gsap.fromTo(ctaRef.current,
      { opacity: 0, scale: 0.9, y: 80 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ctaRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    gsap.to(ctaBgRef.current, {
      yPercent: 22,
      ease: 'none',
      scrollTrigger: {
        trigger: ctaRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const services = [
    {
      title: 'Esmaltado Premium',
      description: 'Acabado perfecto que dura semanas',
      price: 'Desde $2,500',
      image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&q=80'
    },
    {
      title: 'Nail Art',
      description: 'Diseños personalizados y creativos',
      price: 'Desde $3,500',
      image: 'https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=800&q=80'
    },
    {
      title: 'Manicure Completa',
      description: 'Tratamiento completo para tus manos',
      price: 'Desde $3,000',
      image: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=800&q=80'
    },
    {
      title: 'Pedicure Spa',
      description: 'Experiencia relajante completa',
      price: 'Desde $3,800',
      image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800&q=80'
    }
  ];

  const products = [
    {
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80',
      imageAlt: 'Bolso de Cuero Premium',
      title: 'Bolso de Cuero Premium',
      description: 'Elegante bolso de cuero genuino',
      price: 12999,
      originalPrice: 18999,
      rating: 4.8,
      reviews: 124,
      badge: 'OFERTA'
    },
    {
      image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80',
      imageAlt: 'Vestido Elegante',
      title: 'Vestido Elegante',
      description: 'Diseño sofisticado para ocasiones especiales',
      price: 8999,
      rating: 4.9,
      reviews: 89
    },
    {
      image: 'https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?w=800&q=80',
      imageAlt: 'Gafas de Sol',
      title: 'Gafas de Sol Premium',
      description: 'Protección UV400 con diseño moderno',
      price: 3499,
      originalPrice: 4999,
      rating: 4.7,
      reviews: 203
    },
    {
      image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800&q=80',
      imageAlt: 'Conjunto Casual',
      title: 'Conjunto Casual Chic',
      description: 'Comodidad y estilo para el día a día',
      price: 6999,
      rating: 4.6,
      reviews: 156,
      badge: 'NUEVO'
    }
  ];

  const carouselItems = [
    {
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&q=80',
      title: 'Nueva Colección',
      description: 'Descubre las últimas tendencias',
      category: 'Moda'
    },
    {
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&q=80',
      title: 'Ofertas Especiales',
      description: 'Hasta 40% de descuento',
      category: 'Promoción'
    },
    {
      image: 'https://images.unsplash.com/photo-1487412912498-0447578fcca8?w=1200&q=80',
      title: 'Belleza Premium',
      description: 'Servicios exclusivos',
      category: 'Servicios'
    }
  ];

  return (
    <div style={{ background: 'var(--color-gothic-abyss)' }}>
      
      <section 
        ref={heroRef}
        className="relative h-screen overflow-hidden min-h-[30vh]"
      >
        <div 
          ref={heroBgRef}
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1487412912498-0447578fcca8?w=1920&q=80')",
          }}
        >
          <div 
            ref={heroBgOverlayRef}
            className="absolute inset-0 transition-all duration-1000"
            style={{
              background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.15) 0%, rgba(10, 10, 10, 0.4) 50%, rgba(10, 10, 10, 0.8) 100%)',
              backdropFilter: 'blur(20px) brightness(1.4)',
              WebkitBackdropFilter: 'blur(20px) brightness(1.4)'
            }}
          ></div>
          
          <div className="absolute inset-0 hero-gradient" style={{ opacity: 0.6 }}></div>
        </div>

        <div 
          ref={heroTextRef}
          className="absolute bottom-16 md:bottom-24 left-6 md:left-16 lg:left-24 max-w-3xl"
        >
          <h1 
            className="text-7xl md:text-8xl lg:text-9xl font-black mb-8 leading-none text-shadow-metal"
            style={{ 
              color: 'var(--color-gothic-pearl)',
              fontFamily: 'ui-serif, Georgia, serif',
              letterSpacing: '-0.03em'
            }}
          >
            TU
            <br />
            <span 
              style={{ 
                background: 'linear-gradient(135deg, #a78bfa 0%, #c084fc 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              ESTILO
            </span>
          </h1>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="secondary" size="lg" icon={Calendar}>
              Reservar Turno
            </Button>
            <Button variant="outline" size="lg" icon={ShoppingBag}>
              Ver Productos
            </Button>
          </div>
        </div>
      </section>

      <div style={{ height: '30vh' }}></div>

      <section 
        ref={servicesRef}
        className="relative py-20 md:py-32 overflow-hidden min-h-[100vh]"
      >
        <div className="absolute inset-0 overflow-hidden">
          <div 
            ref={servicesBgRef}
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1604654894610-df63bc536371?w=1920&q=80')",
              willChange: 'transform'
            }}
          >
            <div className="absolute inset-0 section-gradient"></div>            
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 relative z-10">
          <div ref={servicesTitleRef} className="text-center mb-24 md:mb-32">
            <h2 
              className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 text-shadow-metal"
              style={{ 
                color: 'var(--color-gothic-pearl)',
                fontFamily: 'ui-serif, Georgia, serif',
                letterSpacing: '-0.02em'
              }}
            >
              Servicios
            </h2>
          </div>

          <div 
            ref={serviceCardsRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
          >
            {services.map((service, index) => (
              <div key={index}>
                <Card
                  variant="glass"
                  image={service.image}
                  title={service.title}
                  description={service.description}
                  hoverable
                  footer={
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" size="sm">{service.price}</Badge>
                      <Button variant="secondary" size="sm">
                        Reservar
                      </Button>
                    </div>
                  }
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{ height: '30vh' }}></div>

      <section 
        ref={productsRef}
        className="relative py-20 md:py-32 overflow-hidden"
      >
        <div className="absolute inset-0 overflow-hidden">
          <div 
            ref={productsBgRef}
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1920&q=80')",
              willChange: 'transform'
            }}
          >
            <div className="absolute inset-0 section-gradient"></div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 relative z-10">
          <div ref={productsTitleRef} className="text-center mb-24 md:mb-32">
            <h2 
              className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 text-shadow-metal"
              style={{ 
                color: 'var(--color-gothic-pearl)',
                fontFamily: 'ui-serif, Georgia, serif',
                letterSpacing: '-0.02em'
              }}
            >
              Productos
            </h2>
          </div>

          <div 
            ref={productCardsRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {products.map((product, index) => (
              <div key={index}>
                <ProductCard
                  {...product}
                  variant="premium"
                  imagePosition="float"
                  imageSize="large"
                  hoverable
                  onAddToCart={() => console.log('Agregar:', product.title)}
                  onWishlist={() => console.log('Favorito:', product.title)}
                  onQuickView={() => console.log('Vista rápida:', product.title)}
                />
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Button variant="ghost" size="lg" icon={ArrowRight} iconPosition="right">
              Ver Todos los Productos
            </Button>
          </div>
        </div>
      </section>

      <div style={{ height: '20vh' }}></div>

      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div 
            ref={carouselBgRef}
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920&q=80')",
              willChange: 'transform'
            }}
          >
            <div className="absolute inset-0 section-gradient"></div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 relative z-10">
          <div ref={carouselTitleRef} className="text-center mb-12">
            <Badge variant="secondary" icon={Star} glow className="mb-4">
              Destacados
            </Badge>
            <h2 
              className="text-4xl md:text-5xl font-black text-shadow-metal"
              style={{ 
                color: 'var(--color-gothic-pearl)',
                fontFamily: 'ui-serif, Georgia, serif'
              }}
            >
              Lo Más Popular
            </h2>
          </div>
          
          <div ref={carouselRef}>
            <Carousel items={carouselItems} />
          </div>
        </div>
      </section>

      <div style={{ height: '30vh' }}></div>

      <section 
        ref={statsRef}
        className="relative py-20 md:py-32 overflow-hidden"
      >
        <div className="absolute inset-0 overflow-hidden">
          <div 
            ref={statsBgRef}
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1920&q=80')",
              willChange: 'transform'
            }}
          >
            <div className="absolute inset-0 section-gradient"></div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 relative z-10">
          <div ref={statsTitleRef} className="text-center mb-24 md:mb-32">
            <h2 
              className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 text-shadow-metal"
              style={{ 
                color: 'var(--color-gothic-pearl)',
                fontFamily: 'ui-serif, Georgia, serif',
                letterSpacing: '-0.02em'
              }}
            >
              Nosotros
            </h2>
          </div>

          <div 
            ref={statsCardsRef}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { icon: Users, value: '5K+', label: 'Clientes' },
              { icon: Award, value: '98%', label: 'Satisfacción' },
              { icon: Star, value: '4.9', label: 'Rating' },
              { icon: TrendingUp, value: '3+', label: 'Años' }
            ].map((stat, index) => (
              <div key={index}>
                <Card variant="glass" hoverable className="text-center">
                  <div className="py-8">
                    <stat.icon 
                      className="w-12 h-12 mx-auto mb-4"
                      style={{ color: '#a78bfa' }}
                    />
                    <div 
                      className="text-4xl md:text-5xl font-black mb-3"
                      style={{ color: 'var(--color-gothic-pearl)' }}
                    >
                      {stat.value}
                    </div>
                    <p style={{ color: 'var(--color-gothic-smoke)' }}>{stat.label}</p>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{ height: '30vh' }}></div>

      <section 
        ref={ctaRef}
        className="relative py-20 md:py-32 overflow-hidden"
      >
        <div className="absolute inset-0 overflow-hidden">
          <div 
            ref={ctaBgRef}
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1920&q=80')",
              willChange: 'transform'
            }}
          >
            <div className="absolute inset-0 cta-gradient"></div>
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center relative z-10">
          <h2 
            className="text-5xl md:text-6xl lg:text-7xl font-black mb-12 text-shadow-metal"
            style={{ 
              color: 'var(--color-gothic-pearl)',
              fontFamily: 'ui-serif, Georgia, serif',
              letterSpacing: '-0.02em'
            }}
          >
            ¿Lista para
            <br />
            <span 
              style={{ 
                background: 'linear-gradient(135deg, #a78bfa 0%, #c084fc 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              brillar?
            </span>
          </h2>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Button variant="secondary" size="xl" icon={Calendar}>
              Reservar Ahora
            </Button>
            <Button variant="ghost" size="xl" icon={ShoppingBag}>
              Ver Catálogo
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Profesionales', desc: 'Equipo experto' },
              { title: 'Premium', desc: 'Mejores marcas' },
              { title: 'Personalizado', desc: 'Atención única' }
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-3 text-left">
                <CheckCircle 
                  className="w-6 h-6 flex-shrink-0 mt-1"
                  style={{ color: '#a78bfa' }}
                />
                <div>
                  <h4 
                    className="font-bold mb-1 text-lg"
                    style={{ color: 'var(--color-gothic-chrome)' }}
                  >
                    {item.title}
                  </h4>
                  <p style={{ color: 'var(--color-gothic-smoke)' }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{ height: '20vh' }}></div>
    </div>
  );
}