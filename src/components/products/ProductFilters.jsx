"use client";

import React, { useState } from 'react';
import { clsx } from 'clsx';
import { X, ChevronDown, SlidersHorizontal } from 'lucide-react';

/**
 * ProductFilters - Panel de filtros estilo Gótico Dark
 */
const ProductFilters = ({ 
  categories = [],
  filters = {},
  onFilterChange,
  onClearFilters,
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
    <div className={clsx(
      'bg-gradient-to-br from-[#121212] via-[#1a1a1a] to-[#121212] border border-[#3a3a3a] clip-path-gothic-lg p-6 space-y-6',
      className
    )}>
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#2d2d2d]">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5 text-[#6b21a8]" />
          <h3 className="text-[#e5e7eb] font-bold text-lg tracking-wide">
            FILTROS
          </h3>
        </div>
        
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="text-[#9ca3af] hover:text-[#e5e7eb] text-sm flex items-center gap-1 transition-colors duration-300"
          >
            <X className="w-4 h-4" />
            Limpiar
          </button>
        )}
      </div>

      {/* Categorías */}
      <div className="space-y-3">
        <button
          onClick={() => toggleSection('category')}
          className="w-full flex items-center justify-between text-[#d1d5db] hover:text-[#e5e7eb] transition-colors"
        >
          <span className="font-semibold text-sm tracking-wide">CATEGORÍA</span>
          <ChevronDown className={clsx(
            'w-4 h-4 transition-transform duration-300',
            expandedSections.category && 'rotate-180'
          )} />
        </button>

        {expandedSections.category && (
          <div className="space-y-2 pl-1">
            {categories.map((category) => (
              <label
                key={category._id}
                className="flex items-center gap-2 cursor-pointer group"
              >
                <div className={clsx(
                  'w-4 h-4 border transition-all duration-300 clip-path-gothic-xs',
                  filters.category === category._id
                    ? 'bg-[#6b21a8] border-[#6b21a8]'
                    : 'border-[#3a3a3a] group-hover:border-[#4a4a4a]'
                )}>
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
                <span className="text-[#9ca3af] group-hover:text-[#d1d5db] text-sm transition-colors">
                  {category.name}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Precio */}
      <div className="space-y-3 pt-3 border-t border-[#2d2d2d]">
        <button
          onClick={() => toggleSection('price')}
          className="w-full flex items-center justify-between text-[#d1d5db] hover:text-[#e5e7eb] transition-colors"
        >
          <span className="font-semibold text-sm tracking-wide">PRECIO</span>
          <ChevronDown className={clsx(
            'w-4 h-4 transition-transform duration-300',
            expandedSections.price && 'rotate-180'
          )} />
        </button>

        {expandedSections.price && (
          <div className="space-y-3 pl-1">
            <div className="flex items-center gap-2">
              <input
                type="number"
                placeholder="Mín"
                value={priceRange.min}
                onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#3a3a3a] text-[#e5e7eb] text-sm placeholder-[#6b7280] focus:border-[#6b21a8] focus:outline-none transition-colors clip-path-gothic-sm"
              />
              <span className="text-[#6b7280]">-</span>
              <input
                type="number"
                placeholder="Máx"
                value={priceRange.max}
                onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#3a3a3a] text-[#e5e7eb] text-sm placeholder-[#6b7280] focus:border-[#6b21a8] focus:outline-none transition-colors clip-path-gothic-sm"
              />
            </div>
            <button
              onClick={handlePriceChange}
              className="w-full py-2 bg-gradient-to-r from-[#e5e7eb] via-[#d1d5db] to-[#9ca3af] text-gray-900 font-semibold text-sm border border-[#6b7280] clip-path-gothic-sm hover:scale-[1.02] transition-transform duration-300"
            >
              Aplicar
            </button>
          </div>
        )}
      </div>

      {/* Disponibilidad */}
      <div className="space-y-3 pt-3 border-t border-[#2d2d2d]">
        <button
          onClick={() => toggleSection('stock')}
          className="w-full flex items-center justify-between text-[#d1d5db] hover:text-[#e5e7eb] transition-colors"
        >
          <span className="font-semibold text-sm tracking-wide">DISPONIBILIDAD</span>
          <ChevronDown className={clsx(
            'w-4 h-4 transition-transform duration-300',
            expandedSections.stock && 'rotate-180'
          )} />
        </button>

        {expandedSections.stock && (
          <div className="space-y-2 pl-1">
            {[
              { value: true, label: 'En stock' },
              { value: false, label: 'Sin stock' }
            ].map((option) => (
              <label
                key={option.label}
                className="flex items-center gap-2 cursor-pointer group"
              >
                <div className={clsx(
                  'w-4 h-4 border transition-all duration-300 clip-path-gothic-xs',
                  filters.inStock === option.value
                    ? 'bg-[#6b21a8] border-[#6b21a8]'
                    : 'border-[#3a3a3a] group-hover:border-[#4a4a4a]'
                )}>
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
                <span className="text-[#9ca3af] group-hover:text-[#d1d5db] text-sm transition-colors">
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Rating */}
      <div className="space-y-3 pt-3 border-t border-[#2d2d2d]">
        <button
          onClick={() => toggleSection('rating')}
          className="w-full flex items-center justify-between text-[#d1d5db] hover:text-[#e5e7eb] transition-colors"
        >
          <span className="font-semibold text-sm tracking-wide">VALORACIÓN</span>
          <ChevronDown className={clsx(
            'w-4 h-4 transition-transform duration-300',
            expandedSections.rating && 'rotate-180'
          )} />
        </button>

        {expandedSections.rating && (
          <div className="space-y-2 pl-1">
            {[4, 3, 2, 1].map((rating) => (
              <button
                key={rating}
                onClick={() => handleRatingChange(rating)}
                className={clsx(
                  'w-full flex items-center gap-2 px-2 py-1.5 transition-all duration-300 clip-path-gothic-xs',
                  filters.minRating === rating
                    ? 'bg-[#6b21a8]/20 border border-[#6b21a8]'
                    : 'hover:bg-[#1a1a1a]'
                )}
              >
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      key={i}
                      className={clsx(
                        'w-3 h-3',
                        i < rating ? 'text-[#c2410c] fill-current' : 'text-[#3a3a3a]'
                      )}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-[#9ca3af] text-sm">y más</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Decoraciones */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-[2px] bg-gradient-to-r from-transparent via-[#6b21a8]/30 to-transparent"></div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-[2px] bg-gradient-to-r from-transparent via-[#6b21a8]/20 to-transparent"></div>
    </div>
  );
};

export default ProductFilters;