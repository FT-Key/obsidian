"use client";

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Carousel = ({ items = [] }) => {
  if (!items || items.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gothic-smoke text-lg">No hay elementos para mostrar</p>
      </div>
    );
  }

  const carouselItems = items;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState('next');

  const nextSlide = () => {
    if (isTransitioning) return;
    setDirection('next');
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
      setIsTransitioning(false);
    }, 800);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setDirection('prev');
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
      setIsTransitioning(false);
    }, 800);
  };

  const goToSlide = (index) => {
    if (isTransitioning || index === currentIndex) return;
    setDirection(index > currentIndex ? 'next' : 'prev');
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsTransitioning(false);
    }, 800);
  };

  const getVisibleItems = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % carouselItems.length;
      visible.push({ ...carouselItems[index], originalIndex: index, position: i });
    }
    return visible;
  };

  const visibleItems = getVisibleItems();
  const currentItem = carouselItems[currentIndex];

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 py-8">
      {/* Decoración gótica superior */}
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-16 opacity-30 z-0">
        <svg viewBox="0 0 128 64" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full text-gothic-ash">
          <path d="M0 64 Q32 0, 64 0 Q96 0, 128 64" />
          <path d="M20 64 Q40 20, 64 20 Q88 20, 108 64" />
        </svg>
      </div>

      <div className="relative">
        {/* Contenedor principal del carousel */}
        <div className="grid grid-cols-12 gap-6 items-start">

          {/* ZONA IZQUIERDA: Imagen grande con card a la IZQUIERDA */}
          <div className="col-span-8 relative z-10">
            {/* Frame gótico para la imagen */}
            <div className="relative aspect-[16/10] rounded-lg overflow-hidden border-4 border-gothic-steel shadow-[0_0_50px_rgba(0,0,0,0.9),inset_0_0_80px_rgba(0,0,0,0.5)]">
              {/* Decoraciones de esquina */}
              <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-gothic-pewter opacity-60 z-10"></div>
              <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-gothic-pewter opacity-60 z-10"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-gothic-pewter opacity-60 z-10"></div>
              <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-gothic-pewter opacity-60 z-10"></div>

              {/* Imagen principal con transición */}
              <div className={`absolute inset-0 transition-all duration-700 ${isTransitioning ? 'opacity-0 scale-95 blur-sm' : 'opacity-100 scale-100 blur-0'}`}>
                <img
                  src={currentItem.image}
                  alt={currentItem.title}
                  className="w-full h-full object-cover"
                />
                {/* Overlay oscuro gótico */}
                <div className="absolute inset-0 bg-gradient-to-t from-gothic-void via-transparent to-gothic-shadow/30"></div>
              </div>
            </div>

            {/* CARD DE INFORMACIÓN SUPERPUESTA - AHORA A LA IZQUIERDA con z-index ALTO */}
            <div className={`absolute -left-60 top-1/2 -translate-y-1/2 w-96 transition-all duration-700 z-50 ${isTransitioning
              ? 'opacity-0 -translate-x-12 scale-95'
              : 'opacity-100 translate-x-0 scale-100'
              }`}> 
              
              {/* Número del item */}
              <div className="absolute z-2 -top-4 right-8 w-12 h-12 bg-gradient-to-br from-gothic-amethyst to-gothic-plum rounded-full flex items-center justify-center text-gothic-pearl font-bold text-xl shadow-[0_6px_20px_rgba(107,33,168,0.8)] border-2 border-gothic-obsidian">
                {currentIndex + 1}
              </div>

              {/* Marco de la card con forma gótica */}
              <div className="relative bg-gradient-to-br from-gothic-obsidian via-gothic-shadow to-gothic-void border-2 border-gothic-steel shadow-[0_25px_70px_rgba(0,0,0,0.95),0_0_40px_rgba(107,33,168,0.3),inset_0_1px_0_rgba(255,255,255,0.05)] clip-path-card-gothic p-7 backdrop-blur-md">
                {/* Glow amatista */}
                <div className="absolute inset-0 bg-gradient-to-br from-gothic-amethyst/10 via-transparent to-transparent pointer-events-none"></div>



                {/* Badge de categoría */}
                <div className="inline-block px-4 py-1.5 mb-4 text-xs uppercase tracking-widest font-semibold bg-gothic-amethyst/20 border border-gothic-amethyst/40 text-gothic-chrome rounded-sm shadow-[0_0_15px_rgba(107,33,168,0.4)]">
                  {currentItem.category}
                </div>

                {/* Título */}
                <h3 className="text-2xl font-bold text-gothic-pearl mb-3 drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] leading-tight">
                  {currentItem.title}
                </h3>

                {/* Precio si existe */}
                {currentItem.price && (
                  <div className="mb-3">
                    <span className="text-3xl font-bold text-gothic-amethyst drop-shadow-[0_0_10px_rgba(107,33,168,0.8)]">
                      {currentItem.price}
                    </span>
                    {currentItem.originalPrice && (
                      <span className="ml-3 text-lg text-gothic-ash line-through opacity-60">
                        {currentItem.originalPrice}
                      </span>
                    )}
                  </div>
                )}

                {/* Descripción */}
                <p className="text-gothic-smoke text-sm leading-relaxed mb-4">
                  {currentItem.description}
                </p>

                {/* Características especiales si existen */}
                {currentItem.features && currentItem.features.length > 0 && (
                  <div className="mb-4 space-y-1.5">
                    {currentItem.features.slice(0, 3).map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-gothic-silver">
                        <span className="w-1 h-1 bg-gothic-amethyst rounded-full shadow-[0_0_6px_rgba(107,33,168,0.8)]"></span>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Detalles adicionales */}
                <div className="flex items-center gap-4 text-xs text-gothic-ash border-t border-gothic-steel/30 pt-3">
                  {currentItem.stock !== undefined && (
                    <span className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full shadow-[0_0_6px_rgba(107,33,168,0.8)] ${currentItem.stock > 0 ? 'bg-emerald-500' : 'bg-gothic-crimson'
                        }`}></span>
                      {currentItem.stock > 0 ? `${currentItem.stock} disponibles` : 'Agotado'}
                    </span>
                  )}
                  {currentItem.duration && (
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-gothic-silver rounded-full shadow-[0_0_4px_rgba(209,213,219,0.5)]"></span>
                      {currentItem.duration}
                    </span>
                  )}
                  {currentItem.rating && (
                    <span className="flex items-center gap-1">
                      <span className="text-gothic-amethyst">★</span>
                      <span>{currentItem.rating}</span>
                    </span>
                  )}
                </div>

                {/* Decoración inferior */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-[2px] bg-gradient-to-r from-transparent via-gothic-amethyst to-transparent shadow-[0_0_10px_rgba(107,33,168,0.6)]"></div>

                {/* Clavos decorativos */}
                <div className="absolute bottom-2 left-4 w-1.5 h-1.5 bg-gothic-pewter rounded-full opacity-40"></div>
                <div className="absolute bottom-2 right-4 w-1.5 h-1.5 bg-gothic-pewter rounded-full opacity-40"></div>
              </div>
            </div>

            {/* CONTROLES DE NAVEGACIÓN - SIMPLIFICADOS */}
            <div className="relative mt-8 flex items-center justify-center gap-6 z-30">
              {/* Botón anterior */}
              <button
                onClick={prevSlide}
                disabled={isTransitioning}
                className="group relative w-12 h-12 bg-gothic-shadow border border-gothic-gunmetal rounded-md shadow-[0_4px_12px_rgba(0,0,0,0.6)] hover:bg-gothic-iron hover:border-gothic-pewter hover:shadow-[0_4px_16px_rgba(107,33,168,0.4)] transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-gothic-silver group-hover:text-gothic-pearl transition-colors duration-300" strokeWidth={2} />
              </button>

              {/* Indicadores de página */}
              <div className="flex gap-3 px-6 py-3 bg-gothic-shadow/50 backdrop-blur-sm border border-gothic-steel/30 rounded-lg shadow-[0_8px_25px_rgba(0,0,0,0.8)]">
                {carouselItems.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => goToSlide(idx)}
                    disabled={isTransitioning}
                    className={`relative transition-all duration-500 rounded-full ${idx === currentIndex
                      ? 'bg-gothic-amethyst shadow-[0_0_15px_rgba(107,33,168,0.9)] w-10 h-3'
                      : 'bg-gothic-steel hover:bg-gothic-gunmetal w-3 h-3'
                      }`}
                  >
                    {idx === currentIndex && (
                      <span className="absolute inset-0 rounded-full bg-gothic-amethyst animate-ping opacity-75"></span>
                    )}
                  </button>
                ))}
              </div>

              {/* Botón siguiente */}
              <button
                onClick={nextSlide}
                disabled={isTransitioning}
                className="group relative w-12 h-12 bg-gothic-shadow border border-gothic-gunmetal rounded-md shadow-[0_4px_12px_rgba(0,0,0,0.6)] hover:bg-gothic-iron hover:border-gothic-pewter hover:shadow-[0_4px_16px_rgba(107,33,168,0.4)] transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronRight className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-gothic-silver group-hover:text-gothic-pearl transition-colors duration-300" strokeWidth={2} />
              </button>
            </div>
          </div>

          {/* ZONA DERECHA: Stack de cards preview con animación mejorada */}
          <div className="col-span-4 relative h-[500px] z-20">
            <div className="relative w-full h-full perspective-1000">
              {visibleItems.map((item, idx) => {
                // Animación: la primera card se va al fondo, las demás avanzan
                let zIndex, scale, translateY, translateX, opacity, rotateY;

                if (isTransitioning && direction === 'next') {
                  // Animación NEXT: primera se va atrás
                  if (idx === 0) {
                    // La primera se va al fondo (a la posición 2)
                    zIndex = 5;
                    scale = 0.84;
                    translateY = 100;
                    translateX = 30;
                    opacity = 0.5;
                    rotateY = -15;
                  } else if (idx === 1) {
                    // La segunda pasa al frente (posición 0)
                    zIndex = 20;
                    scale = 1;
                    translateY = 0;
                    translateX = 0;
                    opacity = 1;
                    rotateY = 0;
                  } else {
                    // La tercera pasa a segunda (posición 1)
                    zIndex = 15;
                    scale = 0.92;
                    translateY = 50;
                    translateX = 15;
                    opacity = 0.75;
                    rotateY = -5;
                  }
                } else if (isTransitioning && direction === 'prev') {
                  // Animación PREV: última viene al frente
                  if (idx === 0) {
                    // La primera pasa a segunda (posición 1)
                    zIndex = 15;
                    scale = 0.92;
                    translateY = 50;
                    translateX = 15;
                    opacity = 0.75;
                    rotateY = -5;
                  } else if (idx === 1) {
                    // La segunda se va atrás (posición 2)
                    zIndex = 5;
                    scale = 0.84;
                    translateY = 100;
                    translateX = 30;
                    opacity = 0.5;
                    rotateY = -15;
                  } else {
                    // La tercera pasa al frente (posición 0)
                    zIndex = 20;
                    scale = 1;
                    translateY = 0;
                    translateX = 0;
                    opacity = 1;
                    rotateY = 0;
                  }
                } else {
                  // Estado normal sin transición
                  zIndex = 20 - idx * 5;
                  scale = 1 - idx * 0.08;
                  translateY = idx * 50;
                  translateX = idx * 15;
                  opacity = 1 - idx * 0.25;
                  rotateY = -idx * 5;
                }

                return (
                  <div
                    key={`${item.originalIndex}-${idx}`}
                    onClick={() => idx === 1 ? nextSlide() : null}
                    className={`absolute top-1/5 left-0 w-full transition-all duration-800 ease-out ${idx === 1 ? 'cursor-pointer hover:scale-105 hover:shadow-[0_15px_50px_rgba(107,33,168,0.4)]' : 'cursor-default'
                      }`}
                    style={{
                      zIndex,
                      transform: `translateY(${translateY}px) translateX(${translateX}px) scale(${scale}) rotateY(${rotateY}deg)`,
                      opacity,
                      transformStyle: 'preserve-3d'
                    }}
                  >
                    {/* Card preview */}
                    <div className="bg-gradient-to-br from-gothic-iron via-gothic-shadow to-gothic-obsidian border-2 border-gothic-gunmetal rounded-lg overflow-hidden shadow-[0_12px_45px_rgba(0,0,0,0.85)] clip-path-preview-gothic">
                      {/* Imagen preview */}
                      <div className="relative h-40 overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gothic-void via-transparent to-transparent"></div>

                        {/* Badge si es el siguiente */}
                        {idx === 1 && (
                          <div className="absolute top-3 right-3 px-3 py-1.5 bg-gothic-amethyst/90 backdrop-blur-sm text-gothic-pearl text-xs font-bold rounded-sm shadow-[0_0_15px_rgba(107,33,168,0.8)] border border-gothic-amethyst">
                            SIGUIENTE
                          </div>
                        )}
                      </div>

                      {/* Info preview */}
                      <div className="p-4">
                        <div className="text-xs text-gothic-amethyst uppercase tracking-wider mb-1.5 font-semibold">
                          {item.category}
                        </div>
                        <h4 className="text-gothic-silver font-semibold text-sm line-clamp-2 leading-snug">
                          {item.title}
                        </h4>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Decoración gótica inferior */}
      <div className="relative mt-12 flex justify-center">
        <div className="w-80 h-[1px] bg-gradient-to-r from-transparent via-gothic-amethyst to-transparent opacity-60 shadow-[0_0_15px_rgba(107,33,168,0.6)]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-gothic-amethyst rounded-full shadow-[0_0_15px_rgba(107,33,168,0.9)]"></div>
      </div>
    </div>
  );
};

// Estilos personalizados para clip-path
const styles = `
  .clip-path-card-gothic {
    clip-path: polygon(
      0 16px,
      16px 0,
      calc(100% - 16px) 0,
      100% 16px,
      100% calc(100% - 16px),
      calc(100% - 16px) 100%,
      16px 100%,
      0 calc(100% - 16px)
    );
  }
  
  .clip-path-preview-gothic {
    clip-path: polygon(
      0 10px,
      10px 0,
      calc(100% - 10px) 0,
      100% 10px,
      100% calc(100% - 10px),
      calc(100% - 10px) 100%,
      10px 100%,
      0 calc(100% - 10px)
    );
  }

  .perspective-1000 {
    perspective: 1000px;
  }
`;

// Inyectar estilos
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}

export default Carousel;