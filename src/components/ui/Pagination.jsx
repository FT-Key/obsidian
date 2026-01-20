'use client';

import clsx from 'clsx';

export default function Pagination({
  page,
  totalPages,
  onPageChange,
  maxVisiblePages = 5,
  className = ''
}) {
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
    <nav className={clsx('flex items-center justify-center gap-2 mt-8', className)}>
      {/* Anterior */}
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className={clsx(
          baseBtn,
          page === 1 && disabledBtn
        )}
      >
        Anterior
      </button>

      {/* Primera página */}
      {start > 1 && (
        <>
          <PageButton page={1} current={page} onClick={onPageChange} />
          {start > 2 && <span className="px-2 text-gray-500">…</span>}
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
          {end < totalPages - 1 && <span className="px-2 text-gray-500">…</span>}
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
        Siguiente
      </button>
    </nav>
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
          ? 'bg-[#6b21a8] border-[#6b21a8] text-white'
          : 'bg-[#1a1a1a] border-[#3a3a3a] text-gray-300 hover:bg-[#2a2a2a]'
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
  'min-w-[40px] px-3 py-2 border rounded-md text-sm font-medium transition-colors';

const disabledBtn =
  'opacity-50 cursor-not-allowed';
