// lib/firebase/storage.js
import { storage } from './config';
import { adminStorage } from './admin';
import { 
  ref, 
  uploadBytesResumable, 
  getDownloadURL, 
  deleteObject 
} from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

/**
 * Sube una imagen a Firebase Storage (cliente)
 * @param {File} file - Archivo a subir
 * @param {string} folder - Carpeta destino (ej: 'products', 'categories')
 * @param {function} onProgress - Callback de progreso
 * @returns {Promise<string>} URL de descarga
 */
export async function uploadImageClient(file, folder = 'products', onProgress = null) {
  try {
    const fileName = `${folder}/${uuidv4()}-${file.name}`;
    const storageRef = ref(storage, fileName);
    
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          if (onProgress) onProgress(progress);
        },
        (error) => {
          console.error('Upload error:', error);
          reject(error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        }
      );
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
}

/**
 * Sube una imagen a Firebase Storage (servidor) - MEJORADO PARA WEBP
 * @param {Buffer} buffer - Buffer de la imagen
 * @param {string} fileName - Nombre del archivo
 * @param {string} folder - Carpeta destino
 * @returns {Promise<string>} URL de descarga
 */
export async function uploadImageServer(buffer, fileName, folder = 'products') {
  try {
    const bucket = adminStorage.bucket();
    
    // Detectar el tipo de archivo por extensión
    const extension = fileName.split('.').pop().toLowerCase();
    let contentType = 'image/jpeg'; // default
    
    if (extension === 'webp') {
      contentType = 'image/webp';
    } else if (extension === 'png') {
      contentType = 'image/png';
    } else if (extension === 'gif') {
      contentType = 'image/gif';
    }
    
    // Generar nombre único con extensión correcta
    const uniqueFileName = `${folder}/${uuidv4()}-${fileName}`;
    const file = bucket.file(uniqueFileName);
    
    // Subir con metadata optimizada
    await file.save(buffer, {
      metadata: {
        contentType,
        cacheControl: 'public, max-age=31536000', // 1 año
      },
      resumable: false, // Más rápido para archivos pequeños
      validation: false // Evita re-descarga para validación
    });

    // Hacer público el archivo
    await file.makePublic();
    
    // Retornar URL pública
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${file.name}`;
    
    console.log(`✅ Imagen subida a Firebase: ${uniqueFileName}`);
    
    return publicUrl;
  } catch (error) {
    console.error('❌ Error uploading image to server:', error);
    throw new Error(`Error al subir imagen a Firebase: ${error.message}`);
  }
}

/**
 * Elimina una imagen de Firebase Storage (cliente)
 * @param {string} imageUrl - URL de la imagen
 */
export async function deleteImage(imageUrl) {
  try {
    if (!imageUrl) {
      console.warn('No image URL provided for deletion');
      return;
    }

    // Extraer el path de la URL
    const baseUrl = `https://storage.googleapis.com/${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}/`;
    
    if (!imageUrl.startsWith(baseUrl)) {
      console.warn('Invalid Firebase Storage URL:', imageUrl);
      return;
    }

    const imagePath = imageUrl.replace(baseUrl, '').split('?')[0];
    const decodedPath = decodeURIComponent(imagePath);
    
    const storageRef = ref(storage, decodedPath);
    await deleteObject(storageRef);
    
    console.log('✅ Image deleted successfully:', decodedPath);
  } catch (error) {
    // Si el archivo no existe, no es un error crítico
    if (error.code === 'storage/object-not-found') {
      console.warn('Image not found (may have been already deleted):', imageUrl);
      return;
    }
    console.error('Error deleting image:', error);
    throw error;
  }
}

/**
 * Elimina una imagen desde el servidor (MEJORADA)
 * @param {string} imageUrl - URL de la imagen
 */
export async function deleteImageServer(imageUrl) {
  try {
    if (!imageUrl) {
      console.warn('⚠️ No image URL provided for deletion');
      return;
    }

    if (!adminStorage) {
      console.error('❌ Firebase Admin not initialized');
      return;
    }

    const bucket = adminStorage.bucket();
    const baseUrl = `https://storage.googleapis.com/${bucket.name}/`;
    
    // Validar que la URL pertenece a nuestro bucket
    if (!imageUrl.startsWith(baseUrl)) {
      console.warn('⚠️ Invalid Firebase Storage URL:', imageUrl);
      return;
    }

    // Extraer el path limpiando la URL
    let imagePath = imageUrl.replace(baseUrl, '');
    
    // Remover query params si existen
    imagePath = imagePath.split('?')[0];
    
    // Decodificar URL encoding
    imagePath = decodeURIComponent(imagePath);

    console.log('🗑️ Intentando eliminar:', imagePath);

    const file = bucket.file(imagePath);
    
    // Verificar si el archivo existe antes de intentar eliminarlo
    const [exists] = await file.exists();
    
    if (!exists) {
      console.warn('⚠️ Archivo no encontrado (puede haber sido eliminado previamente):', imagePath);
      return;
    }

    // Eliminar el archivo
    await file.delete();
    console.log('✅ Imagen eliminada exitosamente:', imagePath);
    
  } catch (error) {
    // Manejar errores comunes sin lanzar excepciones
    if (error.code === 404 || error.message?.includes('No such object')) {
      console.warn('⚠️ Archivo no encontrado:', imageUrl);
      return;
    }
    
    if (error.code === 403) {
      console.error('❌ Permisos insuficientes para eliminar:', imageUrl);
      return;
    }

    console.error('❌ Error eliminando imagen:', {
      url: imageUrl,
      error: error.message,
      code: error.code
    });
    
    // No lanzar error para no interrumpir el flujo
    // En producción, podrías registrar esto en un servicio de logging
  }
}

/**
 * Extraer el path de una URL de Firebase Storage
 * @param {string} imageUrl - URL completa de la imagen
 * @returns {string|null} Path del archivo o null si la URL es inválida
 */
export function extractFirebaseStoragePath(imageUrl) {
  try {
    if (!imageUrl) return null;

    const bucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;
    const baseUrl = `https://storage.googleapis.com/${bucket}/`;
    
    if (!imageUrl.startsWith(baseUrl)) {
      return null;
    }

    let path = imageUrl.replace(baseUrl, '').split('?')[0];
    return decodeURIComponent(path);
  } catch (error) {
    console.error('Error extracting Firebase path:', error);
    return null;
  }
}