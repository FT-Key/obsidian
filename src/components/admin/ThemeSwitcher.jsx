'use client';

import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

export default function ThemeSwitcher() {
  const { theme, toggleTheme, mounted } = useTheme();

  // Evitar flash durante SSR
  if (!mounted) {
    return (
      <div className="p-2 w-9 h-9 rounded-lg bg-[var(--color-gothic-shadow)] border border-[var(--color-gothic-iron)]" />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-[var(--color-gothic-shadow)] border border-[var(--color-gothic-iron)] hover:bg-[var(--color-gothic-void)] hover:border-[var(--color-gothic-amethyst)] transition-all"
      title={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
    >
      {theme === 'dark' ? (
        <Sun size={20} className="text-[var(--color-gothic-silver)]" />
      ) : (
        <Moon size={20} className="text-[var(--color-gothic-silver)]" />
      )}
    </button>
  );
}