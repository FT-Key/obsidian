"use client";

import { create } from 'zustand';

/**
 * Zustand Store para manejar el tema global de la aplicación
 */
const useThemeStore = create((set, get) => ({
  // Estado inicial
  theme: 'dark',
  isLoaded: false,

  // Inicializar tema desde localStorage
  initTheme: () => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') || 'dark';
      
      set({ theme: savedTheme, isLoaded: true });
      
      if (savedTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
      } else {
        document.documentElement.removeAttribute('data-theme');
      }
    }
  },

  // Cambiar tema
  toggleTheme: () => {
    const currentTheme = get().theme;
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    set({ theme: newTheme });
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', newTheme);
      
      if (newTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
      } else {
        document.documentElement.removeAttribute('data-theme');
      }
    }
  },

  // Getters computados
  get logoSrc() {
    return get().theme === 'dark' ? '/logo-obsidian.jpg' : '/logo-zabina.jpg';
  },

  get brandName() {
    return get().theme === 'dark' ? 'OBSIDIAN' : 'ZABINA';
  }
}));

export default useThemeStore;