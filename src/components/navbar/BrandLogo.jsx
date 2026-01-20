"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const BrandLogo = ({ theme, logoSrc, brandName, onClick }) => {
  const [isFlipping, setIsFlipping] = useState(false);
  const [displayTheme, setDisplayTheme] = useState(theme);

  useEffect(() => {
    setIsFlipping(true);
    const timer = setTimeout(() => {
      setDisplayTheme(theme);
      setIsFlipping(false);
    }, 400); // Cambia el logo a mitad de la animación (cuando está al revés)
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
    <button onClick={onClick} className={`flex items-center gap-2 sm:gap-3 group ${isFlipping ? 'brand-flipping' : ''}`}>
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
    </button>
  );
};

export default BrandLogo;