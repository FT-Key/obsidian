"use client";

import { useState, useEffect } from 'react';

/**
 * Custom Hook para manejar el tema claro/oscuro
 */
export const useTheme = () => {
  const [theme, setTheme] = useState('dark');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    
    if (savedTheme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    
    setIsLoaded(true);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    
    if (newTheme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  };

  const logoSrc = theme === 'dark' ? '/logo-obsidian.jpg' : '/logo-zabina.jpg';
  const brandName = theme === 'dark' ? 'OBSIDIAN' : 'ZABINA';

  return { theme, toggleTheme, logoSrc, brandName, isLoaded };
};

export default useTheme;