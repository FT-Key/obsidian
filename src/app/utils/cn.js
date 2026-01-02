import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function to merge Tailwind CSS classes
 * Combina clsx y tailwind-merge para manejar clases condicionales
 * y evitar conflictos de clases de Tailwind
 * 
 * @param {...any} inputs - Clases CSS a combinar
 * @returns {string} - String de clases combinadas y optimizadas
 * 
 * @example
 * cn('px-4 py-2', 'bg-red-500', condition && 'hover:bg-red-600')
 * cn('px-4', 'px-8') // Retorna 'px-8' (la última gana)
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}