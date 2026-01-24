'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Upload, X, Loader2, Plus, Trash2, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { 
  compressImage, 
  validateImage, 
  generatePreview,
  getImageInfo 
} from '@/utils/clientImageCompression';

export default function NewProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: '', // ObjectId de la categoría
    featured: false,
    active: true
  });

  const [mainImage, setMainImage] = useState(null);
  const [mainImagePreview, setMainImagePreview] = useState(null);
  const [additionalImages, setAdditionalImages] = useState([]);
  const [additionalPreviews, setAdditionalPreviews] = useState([]);
  const [variants, setVariants] = useState([]);

  // Cargar categorías al montar el componente
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoadingCategories(true);
      const response = await fetch('/api/categories?active=true');
      
      if (!response.ok) {
        throw new Error('Error al cargar categorías');
      }

      const data = await response.json();
      console.log('Categorías cargadas:', data);
      
      setCategories(data.categories || []);
    } catch (err) {
      console.error('Error fetching categories:', err);
      setError('No se pudieron cargar las categorías. ' + err.message);
    } finally {
      setLoadingCategories(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleMainImageSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setError(null);

    try {
      const validation = await validateImage(file);
      if (!validation.valid) {
        setError(validation.errors.join(', '));
        return;
      }

      const info = await getImageInfo(file);
      console.log('Imagen principal:', info);

      const preview = await generatePreview(file);
      setMainImage(file);
      setMainImagePreview(preview);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleAdditionalImagesSelect = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    if (additionalImages.length + files.length > 5) {
      setError('Máximo 5 imágenes adicionales');
      return;
    }

    setError(null);

    try {
      const validations = await Promise.all(files.map(file => validateImage(file)));
      const invalidFiles = validations.filter(v => !v.valid);
      
      if (invalidFiles.length > 0) {
        setError(invalidFiles[0].errors.join(', '));
        return;
      }

      const previews = await Promise.all(files.map(generatePreview));
      setAdditionalImages([...additionalImages, ...files]);
      setAdditionalPreviews([...additionalPreviews, ...previews]);
    } catch (err) {
      setError(err.message);
    }
  };

  const removeAdditionalImage = (index) => {
    setAdditionalImages(additionalImages.filter((_, i) => i !== index));
    setAdditionalPreviews(additionalPreviews.filter((_, i) => i !== index));
  };

  const addVariant = () => {
    setVariants([...variants, { name: '', color: '', size: '', price: '', stock: '' }]);
  };

  const updateVariant = (index, field, value) => {
    const updated = [...variants];
    updated[index][field] = value;
    setVariants(updated);
  };

  const removeVariant = (index) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

  const uploadImage = async (file, folder = 'products') => {
    const compressed = await compressImage(file, 'product', (progress) => {
      console.log(`Comprimiendo: ${progress}%`);
    });

    const formData = new FormData();
    formData.append('file', compressed);
    formData.append('folder', folder);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Error subiendo imagen');
    }

    const data = await response.json();
    return data.url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validaciones
    if (!formData.category) {
      setError('Debes seleccionar una categoría');
      return;
    }

    if (!mainImage) {
      setError('Debes seleccionar una imagen principal');
      return;
    }

    setLoading(true);
    setUploadProgress(0);
    setError(null);

    try {
      // 1. Subir imagen principal
      setUploadProgress(10);
      const mainImageUrl = await uploadImage(mainImage);
      
      // 2. Subir imágenes adicionales
      const additionalUrls = [];
      if (additionalImages.length > 0) {
        for (let i = 0; i < additionalImages.length; i++) {
          const url = await uploadImage(additionalImages[i]);
          additionalUrls.push(url);
          setUploadProgress(10 + ((i + 1) / additionalImages.length) * 40);
        }
      } else {
        setUploadProgress(50);
      }

      // 3. Preparar datos del producto
      const productData = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        category: formData.category, // ObjectId de MongoDB
        featured: formData.featured,
        active: formData.active,
        main_image: mainImageUrl,
        images: additionalUrls,
        variants: variants
          .filter(v => v.name && v.price && v.stock)
          .map(v => ({
            name: v.name,
            color: v.color || '',
            size: v.size || '',
            price: parseFloat(v.price),
            stock: parseInt(v.stock)
          }))
      };

      console.log('Enviando producto:', productData);

      setUploadProgress(70);

      // 4. Crear producto
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
      });

      setUploadProgress(90);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error creando producto');
      }

      const product = await response.json();
      console.log('Producto creado:', product);

      setUploadProgress(100);
      alert('✅ Producto creado exitosamente!');
      router.push('/admin/productos');

    } catch (err) {
      console.error('Error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-gothic-abyss)] text-[var(--color-gothic-silver)] p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin/productos" className="p-2 hover:bg-[var(--color-gothic-shadow)] rounded-lg transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <div>
            <h1 className="text-4xl font-black" style={{ color: 'var(--color-gothic-pearl)' }}>
              Nuevo Producto
            </h1>
            <p className="text-[var(--color-gothic-smoke)]">Completa la información del producto</p>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 bg-red-900/20 border border-red-500 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-bold text-red-300 mb-1">Error</h3>
              <p className="text-sm text-red-200">{error}</p>
            </div>
            <button
              onClick={() => setError(null)}
              className="text-red-300 hover:text-red-200"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        <div className="space-y-8">
          {/* Información Básica */}
          <div className="bg-[var(--color-gothic-shadow)] border border-[var(--color-gothic-iron)] rounded-lg p-6 space-y-4">
            <h2 className="text-xl font-bold text-[var(--color-gothic-chrome)] mb-4">
              Información Básica
            </h2>

            <div>
              <label className="block text-sm font-semibold mb-2">Nombre del Producto *</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-[var(--color-gothic-void)] border border-[var(--color-gothic-iron)] rounded-lg text-[var(--color-gothic-silver)] focus:outline-none focus:ring-2 focus:ring-[var(--color-gothic-amethyst)]"
                placeholder="Ej: Bolso de Cuero Premium"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Descripción *</label>
              <textarea
                name="description"
                required
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 bg-[var(--color-gothic-void)] border border-[var(--color-gothic-iron)] rounded-lg text-[var(--color-gothic-silver)] focus:outline-none focus:ring-2 focus:ring-[var(--color-gothic-amethyst)]"
                placeholder="Describe el producto..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Precio *</label>
                <input
                  type="number"
                  name="price"
                  required
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-[var(--color-gothic-void)] border border-[var(--color-gothic-iron)] rounded-lg text-[var(--color-gothic-silver)] focus:outline-none focus:ring-2 focus:ring-[var(--color-gothic-amethyst)]"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Stock *</label>
                <input
                  type="number"
                  name="stock"
                  required
                  min="0"
                  value={formData.stock}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-[var(--color-gothic-void)] border border-[var(--color-gothic-iron)] rounded-lg text-[var(--color-gothic-silver)] focus:outline-none focus:ring-2 focus:ring-[var(--color-gothic-amethyst)]"
                  placeholder="0"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold mb-2">Categoría *</label>
                {loadingCategories ? (
                  <div className="flex items-center gap-2 px-4 py-3 bg-[var(--color-gothic-void)] border border-[var(--color-gothic-iron)] rounded-lg">
                    <Loader2 className="w-4 h-4 animate-spin text-[var(--color-gothic-amethyst)]" />
                    <span className="text-sm text-[var(--color-gothic-smoke)]">Cargando categorías...</span>
                  </div>
                ) : categories.length === 0 ? (
                  <div className="flex items-center justify-between px-4 py-3 bg-[var(--color-gothic-void)] border border-[var(--color-gothic-iron)] rounded-lg">
                    <span className="text-sm text-[var(--color-gothic-smoke)]">No hay categorías disponibles</span>
                    <button
                      type="button"
                      onClick={fetchCategories}
                      className="text-sm text-[var(--color-gothic-amethyst)] hover:text-[var(--color-gothic-plum)] font-semibold"
                    >
                      Reintentar
                    </button>
                  </div>
                ) : (
                  <select
                    name="category"
                    required
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-[var(--color-gothic-void)] border border-[var(--color-gothic-iron)] rounded-lg text-[var(--color-gothic-silver)] focus:outline-none focus:ring-2 focus:ring-[var(--color-gothic-amethyst)]"
                  >
                    <option value="">Selecciona una categoría</option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </div>

            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleInputChange}
                  className="w-5 h-5"
                />
                <span>Producto Destacado</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="active"
                  checked={formData.active}
                  onChange={handleInputChange}
                  className="w-5 h-5"
                />
                <span>Activo</span>
              </label>
            </div>
          </div>

          {/* Imágenes */}
          <div className="bg-[var(--color-gothic-shadow)] border border-[var(--color-gothic-iron)] rounded-lg p-6 space-y-4">
            <h2 className="text-xl font-bold text-[var(--color-gothic-chrome)] mb-4">Imágenes</h2>

            <div>
              <label className="block text-sm font-semibold mb-2">Imagen Principal *</label>
              
              {!mainImagePreview ? (
                <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-[var(--color-gothic-iron)] rounded-lg cursor-pointer hover:border-[var(--color-gothic-amethyst)] transition-colors">
                  <Upload className="w-12 h-12 mb-2 text-[var(--color-gothic-smoke)]" />
                  <span className="text-sm text-[var(--color-gothic-smoke)]">Click para seleccionar</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleMainImageSelect}
                    className="hidden"
                  />
                </label>
              ) : (
                <div className="relative bg-[var(--color-gothic-void)] rounded-lg p-4">
                  <img src={mainImagePreview} alt="Preview" className="w-full h-64 object-contain rounded-lg" />
                  <button
                    type="button"
                    onClick={() => {
                      setMainImage(null);
                      setMainImagePreview(null);
                    }}
                    className="absolute top-6 right-6 p-2 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
                  >
                    <X className="w-4 h-4 text-white" />
                  </button>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Imágenes Adicionales (opcional, máx. 5)</label>
              
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-[var(--color-gothic-iron)] rounded-lg cursor-pointer hover:border-[var(--color-gothic-amethyst)] transition-colors">
                <Plus className="w-8 h-8 mb-2 text-[var(--color-gothic-smoke)]" />
                <span className="text-sm text-[var(--color-gothic-smoke)]">Agregar imágenes</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleAdditionalImagesSelect}
                  className="hidden"
                />
              </label>

              {additionalPreviews.length > 0 && (
                <div className="grid grid-cols-3 gap-4 mt-4">
                  {additionalPreviews.map((preview, index) => (
                    <div key={index} className="relative group">
                      <img src={preview} alt={`Preview ${index + 1}`} className="w-full h-32 object-cover rounded-lg" />
                      <button
                        type="button"
                        onClick={() => removeAdditionalImage(index)}
                        className="absolute top-2 right-2 p-1 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Variantes */}
          <div className="bg-[var(--color-gothic-shadow)] border border-[var(--color-gothic-iron)] rounded-lg p-6 space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-[var(--color-gothic-chrome)]">
                Variantes (Opcional)
              </h2>
              <button
                type="button"
                onClick={addVariant}
                className="flex items-center gap-2 px-4 py-2 bg-[var(--color-gothic-amethyst)] text-white rounded-lg hover:bg-[var(--color-gothic-plum)] transition-colors"
              >
                <Plus className="w-4 h-4" />
                Agregar Variante
              </button>
            </div>

            {variants.map((variant, index) => (
              <div key={index} className="p-4 bg-[var(--color-gothic-void)] border border-[var(--color-gothic-iron)] rounded-lg space-y-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">Variante {index + 1}</span>
                  <button
                    type="button"
                    onClick={() => removeVariant(index)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  <input
                    type="text"
                    placeholder="Nombre *"
                    value={variant.name}
                    onChange={(e) => updateVariant(index, 'name', e.target.value)}
                    className="px-3 py-2 bg-[var(--color-gothic-shadow)] border border-[var(--color-gothic-iron)] rounded text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-gothic-amethyst)]"
                  />
                  <input
                    type="text"
                    placeholder="Color"
                    value={variant.color}
                    onChange={(e) => updateVariant(index, 'color', e.target.value)}
                    className="px-3 py-2 bg-[var(--color-gothic-shadow)] border border-[var(--color-gothic-iron)] rounded text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-gothic-amethyst)]"
                  />
                  <input
                    type="text"
                    placeholder="Talle"
                    value={variant.size}
                    onChange={(e) => updateVariant(index, 'size', e.target.value)}
                    className="px-3 py-2 bg-[var(--color-gothic-shadow)] border border-[var(--color-gothic-iron)] rounded text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-gothic-amethyst)]"
                  />
                  <input
                    type="number"
                    placeholder="Precio *"
                    step="0.01"
                    value={variant.price}
                    onChange={(e) => updateVariant(index, 'price', e.target.value)}
                    className="px-3 py-2 bg-[var(--color-gothic-shadow)] border border-[var(--color-gothic-iron)] rounded text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-gothic-amethyst)]"
                  />
                  <input
                    type="number"
                    placeholder="Stock *"
                    value={variant.stock}
                    onChange={(e) => updateVariant(index, 'stock', e.target.value)}
                    className="px-3 py-2 bg-[var(--color-gothic-shadow)] border border-[var(--color-gothic-iron)] rounded text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-gothic-amethyst)]"
                  />
                </div>
              </div>
            ))}

            {variants.length === 0 && (
              <p className="text-center text-[var(--color-gothic-smoke)] py-4">
                No hay variantes agregadas
              </p>
            )}
          </div>

          {/* Progress */}
          {loading && uploadProgress > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Procesando...</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="w-full bg-[var(--color-gothic-iron)] rounded-full h-2">
                <div
                  className="bg-[var(--color-gothic-amethyst)] h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-4">
            <button
              onClick={handleSubmit}
              disabled={loading || loadingCategories}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-br from-[var(--color-gothic-amethyst)] to-[var(--color-gothic-plum)] text-white font-bold rounded-lg hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Creando...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Crear Producto
                </>
              )}
            </button>

            <Link
              href="/admin/productos"
              className="px-6 py-4 bg-[var(--color-gothic-steel)] text-white font-bold rounded-lg hover:bg-[var(--color-gothic-gunmetal)] transition-colors flex items-center justify-center"
            >
              Cancelar
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}