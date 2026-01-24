'use client';

import React, { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react';
import { 
  compressImage, 
  validateImage, 
  generatePreview,
  getImageInfo 
} from '@/utils/clientImageCompression';

export default function ImageUploader({ 
  onUploadComplete,
  preset = 'product',
  multiple = false,
  maxFiles = 5
}) {
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);

  const handleFileSelect = async (e) => {
    const selectedFiles = Array.from(e.target.files);
    setError(null);

    if (selectedFiles.length === 0) return;

    // Validar límite de archivos
    if (multiple && files.length + selectedFiles.length > maxFiles) {
      setError(`Máximo ${maxFiles} archivos permitidos`);
      return;
    }

    try {
      // Validar cada archivo
      const validations = await Promise.all(
        selectedFiles.map(file => validateImage(file))
      );

      const invalidFiles = validations.filter(v => !v.valid);
      if (invalidFiles.length > 0) {
        setError(invalidFiles[0].errors.join(', '));
        return;
      }

      // Generar previews
      const newPreviews = await Promise.all(
        selectedFiles.map(generatePreview)
      );

      // Obtener info
      const filesInfo = await Promise.all(
        selectedFiles.map(getImageInfo)
      );

      if (multiple) {
        setFiles([...files, ...selectedFiles]);
        setPreviews([...previews, ...newPreviews]);
      } else {
        setFiles(selectedFiles);
        setPreviews(newPreviews);
      }

      console.log('Archivos seleccionados:', filesInfo);

    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpload = async () => {
    if (files.length === 0) return;

    setUploading(true);
    setProgress(0);
    setError(null);

    try {
      // 1. Comprimir en el frontend
      const compressedFiles = [];
      for (let i = 0; i < files.length; i++) {
        const compressed = await compressImage(
          files[i], 
          preset,
          (fileProgress) => {
            const totalProgress = ((i + (fileProgress / 100)) / files.length) * 50;
            setProgress(Math.round(totalProgress));
          }
        );
        compressedFiles.push(compressed);
      }

      // 2. Subir al backend
      const uploadedUrls = [];
      for (let i = 0; i < compressedFiles.length; i++) {
        const formData = new FormData();
        formData.append('file', compressedFiles[i]);
        formData.append('folder', 'products');

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData
        });

        if (!response.ok) throw new Error('Error subiendo archivo');

        const data = await response.json();
        uploadedUrls.push(data.url);

        const uploadProgress = 50 + ((i + 1) / compressedFiles.length) * 50;
        setProgress(Math.round(uploadProgress));
      }

      // 3. Callback con URLs
      if (onUploadComplete) {
        onUploadComplete(multiple ? uploadedUrls : uploadedUrls[0]);
      }

      // Reset
      setFiles([]);
      setPreviews([]);
      setProgress(0);

    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
    setPreviews(previews.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full space-y-4">
      {/* Drop Zone */}
      <div
        onClick={() => inputRef.current?.click()}
        className="relative border-2 border-dashed border-gray-600 rounded-lg p-8 text-center cursor-pointer hover:border-purple-500 transition-colors"
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple={multiple}
          onChange={handleFileSelect}
          className="hidden"
        />

        <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
        <p className="text-gray-300 mb-2">
          Click para seleccionar {multiple ? 'imágenes' : 'una imagen'}
        </p>
        <p className="text-sm text-gray-500">
          PNG, JPG, WebP hasta 20MB
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-900/20 border border-red-500 rounded-lg p-3 text-red-300 text-sm">
          {error}
        </div>
      )}

      {/* Previews */}
      {previews.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {previews.map((preview, index) => (
            <div key={index} className="relative group">
              <img
                src={preview}
                alt={`Preview ${index + 1}`}
                className="w-full h-40 object-cover rounded-lg"
              />
              <button
                onClick={() => removeFile(index)}
                className="absolute top-2 right-2 p-1 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Progress */}
      {uploading && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm text-gray-400">
            <span>Subiendo...</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Upload Button */}
      {files.length > 0 && !uploading && (
        <button
          onClick={handleUpload}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          {uploading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Subiendo...
            </>
          ) : (
            <>
              <ImageIcon className="w-5 h-5" />
              Subir {files.length} {files.length === 1 ? 'imagen' : 'imágenes'}
            </>
          )}
        </button>
      )}
    </div>
  );
}