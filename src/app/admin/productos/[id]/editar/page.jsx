// src/app/admin/productos/[id]/editar/page.jsx
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Save, Loader2, AlertCircle, X } from 'lucide-react';
import Link from 'next/link';
import { 
  compressImage, 
  validateImage, 
  generatePreview 
} from '@/utils/clientImageCompression';
import ProductFormInfo from '@/components/admin/ProductFormInfo';
import ProductFormImages from '@/components/admin/ProductFormImages';
import ProductFormVariants from '@/components/admin/ProductFormVariants';

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params.id;

  const [loading, setLoading] = useState(false);
  const [loadingProduct, setLoadingProduct] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: '',
    featured: false,
    active: true
  });

  const [mainImage, setMainImage] = useState(null);
  const [mainImagePreview, setMainImagePreview] = useState(null);
  const [currentMainImage, setCurrentMainImage] = useState('');
  
  const [additionalImages, setAdditionalImages] = useState([]);
  const [additionalPreviews, setAdditionalPreviews] = useState([]);
  const [currentAdditionalImages, setCurrentAdditionalImages] = useState([]);
  const [imagesToDelete, setImagesToDelete] = useState([]);
  
  const [variants, setVariants] = useState([]);

  useEffect(() => {
    fetchProduct();
    fetchCategories();
  }, [productId]);

  const fetchProduct = async () => {
    try {
      setLoadingProduct(true);
      const response = await fetch(`/api/products/${productId}`);
      
      if (!response.ok) throw new Error('Producto no encontrado');

      const product = await response.json();

      setFormData({
        name: product.name || '',
        description: product.description || '',
        price: product.price || '',
        stock: product.stock || '',
        category: product.category?._id || product.category || '',
        featured: product.featured || false,
        active: product.active !== undefined ? product.active : true
      });

      setCurrentMainImage(product.main_image || '');
      setMainImagePreview(product.main_image || '');
      
      if (product.images?.length > 0) {
        setCurrentAdditionalImages(product.images);
        setAdditionalPreviews(product.images);
      }

      if (product.variants?.length > 0) {
        setVariants(product.variants.map(v => ({
          _id: v._id,
          name: v.name || '',
          color: v.color || '',
          size: v.size || '',
          price: v.price || '',
          stock: v.stock || ''
        })));
      }
    } catch (err) {
      setError('No se pudo cargar el producto');
    } finally {
      setLoadingProduct(false);
    }
  };

  const fetchCategories = async () => {
    try {
      setLoadingCategories(true);
      const response = await fetch('/api/categories?active=true');
      if (!response.ok) throw new Error('Error al cargar categorías');
      const data = await response.json();
      setCategories(data.categories || []);
    } catch (err) {
      setError('No se pudieron cargar las categorías');
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

    try {
      const validation = await validateImage(file);
      if (!validation.valid) {
        setError(validation.errors.join(', '));
        return;
      }

      const preview = await generatePreview(file);
      setMainImage(file);
      setMainImagePreview(preview);
      
      if (currentMainImage) {
        setImagesToDelete(prev => [...prev, currentMainImage]);
      }
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleMainImageRemove = () => {
    if (currentMainImage) {
      setImagesToDelete(prev => [...prev, currentMainImage]);
    }
    setMainImage(null);
    setMainImagePreview(null);
    setCurrentMainImage('');
  };

  const handleAdditionalImagesSelect = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const totalImages = currentAdditionalImages.length + additionalImages.length + files.length;
    if (totalImages > 5) {
      setError('Máximo 5 imágenes adicionales');
      return;
    }

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
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const removeCurrentAdditionalImage = (index) => {
    const imageUrl = currentAdditionalImages[index];
    setImagesToDelete(prev => [...prev, imageUrl]);
    setCurrentAdditionalImages(currentAdditionalImages.filter((_, i) => i !== index));
  };

  const removeNewAdditionalImage = (index) => {
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

  const uploadImage = async (file) => {
    const compressed = await compressImage(file, 'product');
    const formData = new FormData();
    formData.append('file', compressed);
    formData.append('folder', 'products');

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

  const deleteImage = async (url) => {
    try {
      await fetch('/api/upload', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });
    } catch (err) {
      console.error('Error eliminando imagen:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.category) {
      setError('Debes seleccionar una categoría');
      return;
    }

    setLoading(true);
    setUploadProgress(0);
    setError(null);

    try {
      let mainImageUrl = currentMainImage;
      
      if (mainImage) {
        setUploadProgress(10);
        mainImageUrl = await uploadImage(mainImage);
      }
      
      const newAdditionalUrls = [];
      if (additionalImages.length > 0) {
        for (let i = 0; i < additionalImages.length; i++) {
          const url = await uploadImage(additionalImages[i]);
          newAdditionalUrls.push(url);
          setUploadProgress(10 + ((i + 1) / additionalImages.length) * 30);
        }
      } else {
        setUploadProgress(40);
      }

      const allAdditionalImages = [...currentAdditionalImages, ...newAdditionalUrls];

      const productData = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        category: formData.category,
        featured: formData.featured,
        active: formData.active,
        main_image: mainImageUrl,
        images: allAdditionalImages,
        variants: variants
          .filter(v => v.name && v.price && v.stock)
          .map(v => ({
            ...(v._id && { _id: v._id }),
            name: v.name,
            color: v.color || '',
            size: v.size || '',
            price: parseFloat(v.price),
            stock: parseInt(v.stock)
          }))
      };

      setUploadProgress(60);

      const response = await fetch(`/api/products/${productId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
      });

      setUploadProgress(80);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error actualizando producto');
      }

      if (imagesToDelete.length > 0) {
        await Promise.all(imagesToDelete.map(url => deleteImage(url)));
      }

      setUploadProgress(100);
      alert('✅ Producto actualizado exitosamente!');
      router.push('/admin/productos');

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  };

  if (loadingProduct) {
    return (
      <div className="min-h-screen bg-[var(--color-gothic-abyss)] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-[var(--color-gothic-amethyst)] mx-auto mb-4" />
          <p className="text-[var(--color-gothic-silver)]">Cargando producto...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-gothic-abyss)] text-[var(--color-gothic-silver)] p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
          <Link 
            href="/admin/productos" 
            className="p-2 hover:bg-[var(--color-gothic-shadow)] rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </Link>
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[var(--color-gothic-pearl)]">
              Editar Producto
            </h1>
            <p className="text-sm sm:text-base text-[var(--color-gothic-smoke)]">
              Modifica la información del producto
            </p>
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
            <button onClick={() => setError(null)} className="text-red-300 hover:text-red-200">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
          {/* Componente: Información Básica */}
          <ProductFormInfo
            formData={formData}
            categories={categories}
            loadingCategories={loadingCategories}
            onChange={handleInputChange}
          />

          {/* Componente: Imágenes */}
          <ProductFormImages
            mainImagePreview={mainImagePreview}
            currentAdditionalImages={currentAdditionalImages}
            additionalPreviews={additionalPreviews}
            onMainImageSelect={handleMainImageSelect}
            onMainImageRemove={handleMainImageRemove}
            onAdditionalImagesSelect={handleAdditionalImagesSelect}
            onRemoveCurrentAdditional={removeCurrentAdditionalImage}
            onRemoveNewAdditional={removeNewAdditionalImage}
          />

          {/* Componente: Variantes */}
          <ProductFormVariants
            variants={variants}
            onAdd={addVariant}
            onUpdate={updateVariant}
            onRemove={removeVariant}
          />

          {/* Progress Bar */}
          {loading && uploadProgress > 0 && (
            <div className="bg-[var(--color-gothic-shadow)] border border-[var(--color-gothic-iron)] rounded-lg p-4 space-y-2">
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="font-semibold">Procesando...</span>
                <span className="text-[var(--color-gothic-amethyst)] font-bold">{uploadProgress}%</span>
              </div>
              <div className="w-full bg-[var(--color-gothic-iron)] rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-[var(--color-gothic-amethyst)] to-[var(--color-gothic-plum)] h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
            <button
              type="submit"
              disabled={loading || loadingCategories}
              className="flex-1 flex items-center justify-center gap-2 px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-br from-[var(--color-gothic-amethyst)] to-[var(--color-gothic-plum)] text-white font-bold rounded-lg hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 text-sm sm:text-base"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                  Guardando...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 sm:w-5 sm:h-5" />
                  Guardar Cambios
                </>
              )}
            </button>

            <Link
              href="/admin/productos"
              className="px-4 sm:px-6 py-3 sm:py-4 bg-[var(--color-gothic-steel)] text-white font-bold rounded-lg hover:bg-[var(--color-gothic-gunmetal)] transition-colors flex items-center justify-center text-sm sm:text-base"
            >
              Cancelar
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}