'use client';

import React, { useState } from 'react';
import { clsx } from 'clsx';
import { Moon, Sun } from 'lucide-react';

export default function Pagination({
  page = 1,
  totalPages = 10,
  onPageChange = (p) => console.log('Page:', p),
  maxVisiblePages = 5,
  className = ''
}) {
  const [theme, setTheme] = useState('dark');

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  if (!totalPages || totalPages <= 1) return null;

  const half = Math.floor(maxVisiblePages / 2);

  let start = Math.max(1, page - half);
  let end = Math.min(totalPages, start + maxVisiblePages - 1);

  if (end - start < maxVisiblePages - 1) {
    start = Math.max(1, end - maxVisiblePages + 1);
  }

  const pages = [];
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return (
    <div className="flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Toggle Theme Button */}
      <button
        onClick={toggleTheme}
        className="fixed top-4 right-4 z-50 w-10 h-10 sm:w-12 sm:h-12 bg-[var(--color-gothic-obsidian)] border border-[var(--color-gothic-gunmetal)] rounded-lg flex items-center justify-center text-[var(--color-gothic-chrome)] hover:text-[var(--color-gothic-pearl)] hover:border-[var(--color-gothic-amethyst)] transition-all duration-300 hover:scale-110 shadow-lg"
        aria-label="Toggle theme"
      >
        {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>

      <nav className={clsx('flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mt-8', className)}>
        {/* Anterior */}
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className={clsx(
            baseBtn,
            page === 1 && disabledBtn
          )}
        >
          <span className="hidden sm:inline">Anterior</span>
          <span className="sm:hidden">Ant</span>
        </button>

        {/* Primera página */}
        {start > 1 && (
          <>
            <PageButton page={1} current={page} onClick={onPageChange} />
            {start > 2 && <span className="px-1 sm:px-2 text-[var(--color-gothic-pewter)] text-sm">…</span>}
          </>
        )}

        {/* Páginas visibles */}
        {pages.map((p) => (
          <PageButton
            key={p}
            page={p}
            current={page}
            onClick={onPageChange}
          />
        ))}

        {/* Última página */}
        {end < totalPages && (
          <>
            {end < totalPages - 1 && <span className="px-1 sm:px-2 text-[var(--color-gothic-pewter)] text-sm">…</span>}
            <PageButton
              page={totalPages}
              current={page}
              onClick={onPageChange}
            />
          </>
        )}

        {/* Siguiente */}
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          className={clsx(
            baseBtn,
            page === totalPages && disabledBtn
          )}
        >
          <span className="hidden sm:inline">Siguiente</span>
          <span className="sm:hidden">Sig</span>
        </button>
      </nav>
    </div>
  );
}

/* =======================
   Subcomponente interno
   ======================= */

function PageButton({ page, current, onClick }) {
  return (
    <button
      onClick={() => onClick(page)}
      className={clsx(
        baseBtn,
        page === current
          ? 'bg-[var(--color-gothic-amethyst)] border-[var(--color-gothic-amethyst)] text-white shadow-[0_0_12px_var(--color-gothic-amethyst)/30]'
          : 'bg-[var(--color-gothic-obsidian)] border-[var(--color-gothic-gunmetal)] text-[var(--color-gothic-silver)] hover:bg-[var(--color-gothic-iron)] hover:border-[var(--color-gothic-pewter)] hover:text-[var(--color-gothic-chrome)]'
      )}
    >
      {page}
    </button>
  );
}

/* =======================
   Estilos base
   ======================= */

const baseBtn =
  'min-w-[36px] sm:min-w-[40px] px-2 sm:px-3 py-1.5 sm:py-2 border rounded-md text-xs sm:text-sm font-medium transition-all duration-300';

const disabledBtn =
  'opacity-50 cursor-not-allowed';