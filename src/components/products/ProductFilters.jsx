"use client";

import React, { useState } from 'react';
import { X, ChevronDown, SlidersHorizontal, Moon, Sun } from 'lucide-react';

/**
 * ProductFilters - Panel de filtros Responsive + Dark/Light Mode
 */
const ProductFilters = ({ 
  categories = [
    { _id: '1', name: 'Electrónica' },
    { _id: '2', name: 'Ropa' },
    { _id: '3', name: 'Hogar' },
    { _id: '4', name: 'Deportes' },
    { _id: '5', name: 'Libros' }
  ],
  filters = {},
  onFilterChange = () => {},
  onClearFilters = () => {},
  className = ''
}) => {
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    price: true,
    stock: true,
    rating: false
  });

  const [priceRange, setPriceRange] = useState({
    min: filters.minPrice || '',
    max: filters.maxPrice || ''
  });

  const [theme, setTheme] = useState('dark');

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleCategoryChange = (categoryId) => {
    onFilterChange({ 
      ...filters, 
      category: filters.category === categoryId ? null : categoryId 
    });
  };

  const handlePriceChange = () => {
    onFilterChange({ 
      ...filters, 
      minPrice: priceRange.min ? parseFloat(priceRange.min) : null,
      maxPrice: priceRange.max ? parseFloat(priceRange.max) : null
    });
  };

  const handleStockChange = (value) => {
    onFilterChange({ 
      ...filters, 
      inStock: filters.inStock === value ? null : value 
    });
  };

  const handleRatingChange = (rating) => {
    onFilterChange({ 
      ...filters, 
      minRating: filters.minRating === rating ? null : rating 
    });
  };

  const hasActiveFilters = 
    filters.category || 
    filters.minPrice || 
    filters.maxPrice || 
    filters.inStock !== null || 
    filters.minRating;

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Toggle Theme Button */}
      <button
        onClick={toggleTheme}
        className="fixed top-4 right-4 z-50 w-10 h-10 sm:w-12 sm:h-12 bg-[var(--color-gothic-obsidian)] border border-[var(--color-gothic-gunmetal)] clip-path-gothic-sm flex items-center justify-center text-[var(--color-gothic-chrome)] hover:text-[var(--color-gothic-pearl)] hover:border-[var(--color-gothic-amethyst)] transition-all duration-300 hover:scale-110 shadow-lg"
        aria-label="Toggle theme"
      >
        {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>

      {/* Filters Container */}
      <div className={`
        max-w-sm mx-auto lg:max-w-md
        bg-gradient-to-br from-[var(--color-gothic-shadow)] via-[var(--color-gothic-obsidian)] to-[var(--color-gothic-shadow)]
        border border-[var(--color-gothic-gunmetal)]
        clip-path-gothic-lg
        p-4 sm:p-6
        space-y-4 sm:space-y-6
        relative
        shadow-[0_8px_24px_rgba(0,0,0,0.4)]
        ${className}
      `}>
        {/* Header */}
        <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-[var(--color-gothic-steel)]">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--color-gothic-amethyst)]" />
            <h3 className="text-[var(--color-gothic-chrome)] font-bold text-base sm:text-lg tracking-wide">
              FILTROS
            </h3>
          </div>
          
          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="text-[var(--color-gothic-smoke)] hover:text-[var(--color-gothic-chrome)] text-xs sm:text-sm flex items-center gap-1 transition-colors duration-300"
            >
              <X className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Limpiar</span>
            </button>
          )}
        </div>

        {/* Categorías */}
        <div className="space-y-2 sm:space-y-3">
          <button
            onClick={() => toggleSection('category')}
            className="w-full flex items-center justify-between text-[var(--color-gothic-silver)] hover:text-[var(--color-gothic-chrome)] transition-colors"
          >
            <span className="font-semibold text-xs sm:text-sm tracking-wide">CATEGORÍA</span>
            <ChevronDown className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-300 ${expandedSections.category ? 'rotate-180' : ''}`} />
          </button>

          {expandedSections.category && (
            <div className="space-y-1.5 sm:space-y-2 pl-1 animate-fadeIn">
              {categories.map((category) => (
                <label
                  key={category._id}
                  className="flex items-center gap-2 cursor-pointer group"
                >
                  <div className={`
                    w-3.5 h-3.5 sm:w-4 sm:h-4
                    border transition-all duration-300 clip-path-gothic-xs
                    ${filters.category === category._id
                      ? 'bg-[var(--color-gothic-amethyst)] border-[var(--color-gothic-amethyst)]'
                      : 'border-[var(--color-gothic-gunmetal)] group-hover:border-[var(--color-gothic-pewter)]'
                    }
                  `}>
                    {filters.category === category._id && (
                      <svg className="w-full h-full text-white p-0.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <input
                    type="checkbox"
                    checked={filters.category === category._id}
                    onChange={() => handleCategoryChange(category._id)}
                    className="sr-only"
                  />
                  <span className="text-[var(--color-gothic-smoke)] group-hover:text-[var(--color-gothic-silver)] text-xs sm:text-sm transition-colors">
                    {category.name}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Precio */}
        <div className="space-y-2 sm:space-y-3 pt-2 sm:pt-3 border-t border-[var(--color-gothic-steel)]">
          <button
            onClick={() => toggleSection('price')}
            className="w-full flex items-center justify-between text-[var(--color-gothic-silver)] hover:text-[var(--color-gothic-chrome)] transition-colors"
          >
            <span className="font-semibold text-xs sm:text-sm tracking-wide">PRECIO</span>
            <ChevronDown className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-300 ${expandedSections.price ? 'rotate-180' : ''}`} />
          </button>

          {expandedSections.price && (
            <div className="space-y-2 sm:space-y-3 pl-1 animate-fadeIn">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <input
                  type="number"
                  placeholder="Mín"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                  className="w-full px-2 sm:px-3 py-1.5 sm:py-2 bg-[var(--color-gothic-abyss)] border border-[var(--color-gothic-gunmetal)] text-[var(--color-gothic-chrome)] text-xs sm:text-sm placeholder-[var(--color-gothic-ash)] focus:border-[var(--color-gothic-amethyst)] focus:outline-none transition-colors clip-path-gothic-sm"
                />
                <span className="text-[var(--color-gothic-ash)] text-sm text-center sm:text-left">-</span>
                <input
                  type="number"
                  placeholder="Máx"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                  className="w-full px-2 sm:px-3 py-1.5 sm:py-2 bg-[var(--color-gothic-abyss)] border border-[var(--color-gothic-gunmetal)] text-[var(--color-gothic-chrome)] text-xs sm:text-sm placeholder-[var(--color-gothic-ash)] focus:border-[var(--color-gothic-amethyst)] focus:outline-none transition-colors clip-path-gothic-sm"
                />
              </div>
              <button
                onClick={handlePriceChange}
                className="w-full py-1.5 sm:py-2 bg-gradient-to-r from-[var(--color-gothic-chrome)] via-[var(--color-gothic-silver)] to-[var(--color-gothic-smoke)] text-[var(--color-gothic-void)] font-semibold text-xs sm:text-sm border border-[var(--color-gothic-ash)] clip-path-gothic-sm hover:scale-[1.02] active:scale-[0.98] transition-transform duration-300"
              >
                Aplicar
              </button>
            </div>
          )}
        </div>

        {/* Disponibilidad */}
        <div className="space-y-2 sm:space-y-3 pt-2 sm:pt-3 border-t border-[var(--color-gothic-steel)]">
          <button
            onClick={() => toggleSection('stock')}
            className="w-full flex items-center justify-between text-[var(--color-gothic-silver)] hover:text-[var(--color-gothic-chrome)] transition-colors"
          >
            <span className="font-semibold text-xs sm:text-sm tracking-wide">DISPONIBILIDAD</span>
            <ChevronDown className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-300 ${expandedSections.stock ? 'rotate-180' : ''}`} />
          </button>

          {expandedSections.stock && (
            <div className="space-y-1.5 sm:space-y-2 pl-1 animate-fadeIn">
              {[
                { value: true, label: 'En stock' },
                { value: false, label: 'Sin stock' }
              ].map((option) => (
                <label
                  key={option.label}
                  className="flex items-center gap-2 cursor-pointer group"
                >
                  <div className={`
                    w-3.5 h-3.5 sm:w-4 sm:h-4
                    border transition-all duration-300 clip-path-gothic-xs
                    ${filters.inStock === option.value
                      ? 'bg-[var(--color-gothic-amethyst)] border-[var(--color-gothic-amethyst)]'
                      : 'border-[var(--color-gothic-gunmetal)] group-hover:border-[var(--color-gothic-pewter)]'
                    }
                  `}>
                    {filters.inStock === option.value && (
                      <svg className="w-full h-full text-white p-0.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <input
                    type="checkbox"
                    checked={filters.inStock === option.value}
                    onChange={() => handleStockChange(option.value)}
                    className="sr-only"
                  />
                  <span className="text-[var(--color-gothic-smoke)] group-hover:text-[var(--color-gothic-silver)] text-xs sm:text-sm transition-colors">
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Rating */}
        <div className="space-y-2 sm:space-y-3 pt-2 sm:pt-3 border-t border-[var(--color-gothic-steel)]">
          <button
            onClick={() => toggleSection('rating')}
            className="w-full flex items-center justify-between text-[var(--color-gothic-silver)] hover:text-[var(--color-gothic-chrome)] transition-colors"
          >
            <span className="font-semibold text-xs sm:text-sm tracking-wide">VALORACIÓN</span>
            <ChevronDown className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-300 ${expandedSections.rating ? 'rotate-180' : ''}`} />
          </button>

          {expandedSections.rating && (
            <div className="space-y-1.5 sm:space-y-2 pl-1 animate-fadeIn">
              {[4, 3, 2, 1].map((rating) => (
                <button
                  key={rating}
                  onClick={() => handleRatingChange(rating)}
                  className={`
                    w-full flex items-center gap-2 px-2 py-1 sm:py-1.5
                    transition-all duration-300 clip-path-gothic-xs
                    ${filters.minRating === rating
                      ? 'bg-[var(--color-gothic-amethyst)]/20 border border-[var(--color-gothic-amethyst)]'
                      : 'hover:bg-[var(--color-gothic-obsidian)]'
                    }
                  `}
                >
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg
                        key={i}
                        className={`w-2.5 h-2.5 sm:w-3 sm:h-3 ${i < rating ? 'text-[var(--color-gothic-crimson)] fill-current' : 'text-[var(--color-gothic-gunmetal)]'}`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-[var(--color-gothic-smoke)] text-xs sm:text-sm">y más</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Decoraciones */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 sm:w-24 h-[2px] bg-gradient-to-r from-transparent via-[var(--color-gothic-amethyst)]/30 to-transparent"></div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 sm:w-32 h-[2px] bg-gradient-to-r from-transparent via-[var(--color-gothic-amethyst)]/20 to-transparent"></div>
      </div>
    </div>
  );
};

export default ProductFilters;