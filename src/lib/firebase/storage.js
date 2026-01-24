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
 * Sube una imagen a Firebase Storage (servidor)
 * @param {Buffer} buffer - Buffer de la imagen
 * @param {string} fileName - Nombre del archivo
 * @param {string} folder - Carpeta destino
 * @returns {Promise<string>} URL de descarga
 */
export async function uploadImageServer(buffer, fileName, folder = 'products') {
  try {
    const bucket = adminStorage.bucket();
    const file = bucket.file(`${folder}/${uuidv4()}-${fileName}`);
    
    await file.save(buffer, {
      metadata: {
        contentType: 'image/jpeg',
        cacheControl: 'public, max-age=31536000',
      },
    });

    await file.makePublic();
    
    return `https://storage.googleapis.com/${bucket.name}/${file.name}`;
  } catch (error) {
    console.error('Error uploading image to server:', error);
    throw error;
  }
}

/**
 * Elimina una imagen de Firebase Storage
 * @param {string} imageUrl - URL de la imagen
 */
export async function deleteImage(imageUrl) {
  try {
    // Extraer el path de la URL
    const baseUrl = `https://storage.googleapis.com/${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}/`;
    const imagePath = imageUrl.replace(baseUrl, '').split('?')[0];
    
    const storageRef = ref(storage, imagePath);
    await deleteObject(storageRef);
  } catch (error) {
    console.error('Error deleting image:', error);
    throw error;
  }
}

/**
 * Elimina una imagen desde el servidor
 * @param {string} imageUrl - URL de la imagen
 */
export async function deleteImageServer(imageUrl) {
  try {
    const bucket = adminStorage.bucket();
    const baseUrl = `https://storage.googleapis.com/${bucket.name}/`;
    const imagePath = imageUrl.replace(baseUrl, '').split('?')[0];
    
    await bucket.file(decodeURIComponent(imagePath)).delete();
  } catch (error) {
    console.error('Error deleting image from server:', error);
    throw error;
  }
}