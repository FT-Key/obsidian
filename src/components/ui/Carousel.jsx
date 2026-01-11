"use client";

import React, { useState, useMemo, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// ============== CONSTANTES ==============
const TRANSITION_DURATION = 800;
const VISIBLE_ITEMS_COUNT = 3;

const CARD_POSITIONS = {
  FRONT: { zIndex: 20, scale: 1, translateY: 0, translateX: 0, opacity: 1, rotateY: 0 },
  MIDDLE: { zIndex: 15, scale: 0.92, translateY: 50, translateX: 15, opacity: 0.75, rotateY: -5 },
  BACK: { zIndex: 5, scale: 0.84, translateY: 100, translateX: 30, opacity: 0.5, rotateY: -15 }
};

// ============== UTILIDADES ==============
const getCardPosition = (position) => CARD_POSITIONS[position];

const calculateNormalPosition = (idx) => ({
  zIndex: 20 - idx * 5,
  scale: 1 - idx * 0.08,
  translateY: idx * 50,
  translateX: idx * 15,
  opacity: 1 - idx * 0.25,
  rotateY: -idx * 5
});

const getTransitionPosition = (idx, direction) => {
  if (direction === 'next') {
    if (idx === 0) return getCardPosition('BACK');
    if (idx === 1) return getCardPosition('FRONT');
    return getCardPosition('MIDDLE');
  } else {
    if (idx === 0) return getCardPosition('MIDDLE');
    if (idx === 1) return getCardPosition('BACK');
    return getCardPosition('FRONT');
  }
};

// ============== SUB-COMPONENTES ==============
const CornerDecorations = () => {
  const cornerClass = "absolute w-8 h-8 md:w-12 lg:w-16 md:h-12 lg:h-16 opacity-60 z-10";
  return (
    <>
      <div className={`${cornerClass} top-0 left-0 border-t-4 border-l-4 border-gothic-pewter`}></div>
      <div className={`${cornerClass} top-0 right-0 border-t-4 border-r-4 border-gothic-pewter`}></div>
      <div className={`${cornerClass} bottom-0 left-0 border-b-4 border-l-4 border-gothic-pewter`}></div>
      <div className={`${cornerClass} bottom-0 right-0 border-b-4 border-r-4 border-gothic-pewter`}></div>
    </>
  );
};

const InfoCard = ({ item, index, isTransitioning }) => (
  <div className={`
    absolute top-1/2 -translate-y-1/2 
    w-[90%] sm:w-80 md:w-96
    -left-2 sm:-left-8 md:-left-20 lg:-left-32 xl:-left-60
    transition-all duration-700 z-50 
    ${isTransitioning ? 'opacity-0 -translate-x-12 scale-95' : 'opacity-100 translate-x-0 scale-100'}
  `}>
    <div className="absolute z-2 -top-4 right-8 w-12 h-12 bg-gradient-to-br from-gothic-amethyst to-gothic-plum rounded-full flex items-center justify-center text-gothic-pearl font-bold text-xl shadow-[0_6px_20px_rgba(107,33,168,0.8)] border-2 border-gothic-obsidian">
      {index + 1}
    </div>

    <div className="relative bg-gradient-to-br from-gothic-obsidian via-gothic-shadow to-gothic-void border-2 border-gothic-steel shadow-[0_25px_70px_rgba(0,0,0,0.95),0_0_40px_rgba(107,33,168,0.3),inset_0_1px_0_rgba(255,255,255,0.05)] clip-path-card-gothic p-4 sm:p-5 md:p-6 lg:p-7 backdrop-blur-md">
      <div className="absolute inset-0 bg-gradient-to-br from-gothic-amethyst/10 via-transparent to-transparent pointer-events-none"></div>

      <div className="inline-block px-4 py-1.5 mb-4 text-xs uppercase tracking-widest font-semibold bg-gothic-amethyst/20 border border-gothic-amethyst/40 text-gothic-chrome rounded-sm shadow-[0_0_15px_rgba(107,33,168,0.4)]">
        {item.category}
      </div>

      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gothic-pearl mb-2 md:mb-3 drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] leading-tight">
        {item.title}
      </h3>

      {item.price && (
        <div className="mb-2 md:mb-3">
          <span className="text-2xl sm:text-2xl md:text-3xl font-bold text-gothic-amethyst drop-shadow-[0_0_10px_rgba(107,33,168,0.8)]">
            {item.price}
          </span>
          {item.originalPrice && (
            <span className="ml-2 md:ml-3 text-base md:text-lg text-gothic-ash line-through opacity-60">
              {item.originalPrice}
            </span>
          )}
        </div>
      )}

      <p className="text-gothic-smoke text-xs sm:text-sm leading-relaxed mb-3 md:mb-4 line-clamp-3">
        {item.description}
      </p>

      {item.features && item.features.length > 0 && (
        <div className="mb-3 md:mb-4 space-y-1 md:space-y-1.5 hidden sm:block">
          {item.features.slice(0, 3).map((feature, idx) => (
            <div key={idx} className="flex items-center gap-2 text-xs text-gothic-silver">
              <span className="w-1 h-1 bg-gothic-amethyst rounded-full shadow-[0_0_6px_rgba(107,33,168,0.8)]"></span>
              <span>{feature}</span>
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs text-gothic-ash border-t border-gothic-steel/30 pt-2 md:pt-3">
        {item.stock !== undefined && (
          <span className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full shadow-[0_0_6px_rgba(107,33,168,0.8)] ${item.stock > 0 ? 'bg-emerald-500' : 'bg-gothic-crimson'}`}></span>
            {item.stock > 0 ? `${item.stock} disponibles` : 'Agotado'}
          </span>
        )}
        {item.duration && (
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 bg-gothic-silver rounded-full shadow-[0_0_4px_rgba(209,213,219,0.5)]"></span>
            {item.duration}
          </span>
        )}
        {item.rating && (
          <span className="flex items-center gap-1">
            <span className="text-gothic-amethyst">★</span>
            <span>{item.rating}</span>
          </span>
        )}
      </div>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-[2px] bg-gradient-to-r from-transparent via-gothic-amethyst to-transparent shadow-[0_0_10px_rgba(107,33,168,0.6)]"></div>
      <div className="absolute bottom-2 left-4 w-1.5 h-1.5 bg-gothic-pewter rounded-full opacity-40"></div>
      <div className="absolute bottom-2 right-4 w-1.5 h-1.5 bg-gothic-pewter rounded-full opacity-40"></div>
    </div>
  </div>
);

const NavigationButton = ({ direction, onClick, disabled }) => {
  const Icon = direction === 'prev' ? ChevronLeft : ChevronRight;
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="group relative w-10 h-10 md:w-12 md:h-12 bg-gothic-shadow border border-gothic-gunmetal rounded-md shadow-[0_4px_12px_rgba(0,0,0,0.6)] hover:bg-gothic-iron hover:border-gothic-pewter hover:shadow-[0_4px_16px_rgba(107,33,168,0.4)] transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
    >
      <Icon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 md:w-6 md:h-6 text-gothic-silver group-hover:text-gothic-pearl transition-colors duration-300" strokeWidth={2} />
    </button>
  );
};

const PageIndicators = ({ items, currentIndex, onGoToSlide, isTransitioning }) => (
  <div className="flex gap-2 md:gap-3 px-4 md:px-6 py-2 md:py-3 bg-gothic-shadow/50 backdrop-blur-sm border border-gothic-steel/30 rounded-lg shadow-[0_8px_25px_rgba(0,0,0,0.8)]">
    {items.map((_, idx) => (
      <button
        key={idx}
        onClick={() => onGoToSlide(idx)}
        disabled={isTransitioning}
        className={`relative transition-all duration-500 rounded-full ${
          idx === currentIndex
            ? 'bg-gothic-amethyst shadow-[0_0_15px_rgba(107,33,168,0.9)] w-8 md:w-10 h-2.5 md:h-3'
            : 'bg-gothic-steel hover:bg-gothic-gunmetal w-2.5 md:w-3 h-2.5 md:h-3'
        }`}
      >
        {idx === currentIndex && (
          <span className="absolute inset-0 rounded-full bg-gothic-amethyst animate-ping opacity-75"></span>
        )}
      </button>
    ))}
  </div>
);

const PreviewCard = ({ item, position, onClick, isClickable, isTransitioning, direction }) => {
  const { zIndex, scale, translateY, translateX, opacity, rotateY } = useMemo(
    () => isTransitioning ? getTransitionPosition(position, direction) : calculateNormalPosition(position),
    [isTransitioning, position, direction]
  );

  return (
    <div
      onClick={onClick}
      className={`absolute top-1/5 left-0 w-full transition-all duration-800 ease-out ${
        isClickable ? 'cursor-pointer hover:scale-105 hover:shadow-[0_15px_50px_rgba(107,33,168,0.4)]' : 'cursor-default'
      }`}
      style={{
        zIndex,
        transform: `translateY(${translateY}px) translateX(${translateX}px) scale(${scale}) rotateY(${rotateY}deg)`,
        opacity,
        transformStyle: 'preserve-3d'
      }}
    >
      <div className="bg-gradient-to-br from-gothic-iron via-gothic-shadow to-gothic-obsidian border-2 border-gothic-gunmetal rounded-lg overflow-hidden shadow-[0_12px_45px_rgba(0,0,0,0.85)] clip-path-preview-gothic">
        <div className="relative h-32 xl:h-40 overflow-hidden">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gothic-void via-transparent to-transparent"></div>
          {isClickable && (
            <div className="absolute top-2 right-2 px-2 py-1 bg-gothic-amethyst/90 backdrop-blur-sm text-gothic-pearl text-[10px] font-bold rounded-sm shadow-[0_0_15px_rgba(107,33,168,0.8)] border border-gothic-amethyst">
              SIGUIENTE
            </div>
          )}
        </div>
        <div className="p-3 xl:p-4">
          <div className="text-[10px] xl:text-xs text-gothic-amethyst uppercase tracking-wider mb-1 font-semibold">
            {item.category}
          </div>
          <h4 className="text-gothic-silver font-semibold text-xs xl:text-sm line-clamp-2 leading-snug">
            {item.title}
          </h4>
        </div>
      </div>
    </div>
  );
};

// ============== COMPONENTE PRINCIPAL ==============
const Carousel = ({ items = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState('next');

  if (!items || items.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gothic-smoke text-lg">No hay elementos para mostrar</p>
      </div>
    );
  }

  const handleTransition = useCallback((newIndex, newDirection) => {
    if (isTransitioning) return;
    setDirection(newDirection);
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(newIndex);
      setIsTransitioning(false);
    }, TRANSITION_DURATION);
  }, [isTransitioning]);

  const nextSlide = useCallback(() => {
    handleTransition((currentIndex + 1) % items.length, 'next');
  }, [currentIndex, items.length, handleTransition]);

  const prevSlide = useCallback(() => {
    handleTransition((currentIndex - 1 + items.length) % items.length, 'prev');
  }, [currentIndex, items.length, handleTransition]);

  const goToSlide = useCallback((index) => {
    if (index === currentIndex) return;
    handleTransition(index, index > currentIndex ? 'next' : 'prev');
  }, [currentIndex, handleTransition]);

  const visibleItems = useMemo(() => {
    const visible = [];
    for (let i = 0; i < VISIBLE_ITEMS_COUNT; i++) {
      const index = (currentIndex + i) % items.length;
      visible.push({ ...items[index], originalIndex: index, position: i });
    }
    return visible;
  }, [currentIndex, items]);

  const currentItem = items[currentIndex];

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 py-8">
      <div className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* ZONA IZQUIERDA */}
          <div className="lg:col-span-8 relative z-10 w-full">
            <div className="relative aspect-[16/10] w-full rounded-lg overflow-hidden border-4 border-gothic-steel shadow-[0_0_50px_rgba(0,0,0,0.9),inset_0_0_80px_rgba(0,0,0,0.5)]">
              <CornerDecorations />
              <div className={`absolute inset-0 transition-all duration-700 ${isTransitioning ? 'opacity-0 scale-95 blur-sm' : 'opacity-100 scale-100 blur-0'}`}>
                <img
                  src={currentItem.image}
                  alt={currentItem.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gothic-void via-transparent to-gothic-shadow/30"></div>
              </div>
            </div>

            <InfoCard item={currentItem} index={currentIndex} isTransitioning={isTransitioning} />

            <div className="relative mt-6 md:mt-8 flex items-center justify-center gap-3 md:gap-6 z-30">
              <NavigationButton direction="prev" onClick={prevSlide} disabled={isTransitioning} />
              <PageIndicators items={items} currentIndex={currentIndex} onGoToSlide={goToSlide} isTransitioning={isTransitioning} />
              <NavigationButton direction="next" onClick={nextSlide} disabled={isTransitioning} />
            </div>
          </div>

          {/* ZONA DERECHA */}
          <div className="hidden lg:block lg:col-span-4 relative h-[400px] xl:h-[500px] z-20">
            <div className="relative w-full h-full perspective-1000">
              {visibleItems.map((item) => (
                <PreviewCard
                  key={`${item.originalIndex}-${item.position}`}
                  item={item}
                  position={item.position}
                  onClick={item.position === 1 ? nextSlide : null}
                  isClickable={item.position === 1}
                  isTransitioning={isTransitioning}
                  direction={direction}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="relative mt-8 md:mt-12 flex justify-center">
        <div className="w-60 md:w-80 h-[1px] bg-gradient-to-r from-transparent via-gothic-amethyst to-transparent opacity-60 shadow-[0_0_15px_rgba(107,33,168,0.6)]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 md:w-3 md:h-3 bg-gothic-amethyst rounded-full shadow-[0_0_15px_rgba(107,33,168,0.9)]"></div>
      </div>
    </div>
  );
};

// ============== ESTILOS ==============
const styles = `
  .clip-path-card-gothic {
    clip-path: polygon(
      0 16px, 16px 0, calc(100% - 16px) 0, 100% 16px,
      100% calc(100% - 16px), calc(100% - 16px) 100%,
      16px 100%, 0 calc(100% - 16px)
    );
  }
  
  .clip-path-preview-gothic {
    clip-path: polygon(
      0 10px, 10px 0, calc(100% - 10px) 0, 100% 10px,
      100% calc(100% - 10px), calc(100% - 10px) 100%,
      10px 100%, 0 calc(100% - 10px)
    );
  }

  .perspective-1000 {
    perspective: 1000px;
  }
`;

if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}

export default Carousel;