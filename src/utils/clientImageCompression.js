import imageCompression from 'browser-image-compression';

/**
 * Configuraciones de compresión por caso de uso
 */
const COMPRESSION_PRESETS = {
  // Para productos (balance calidad/tamaño)
  product: {
    maxSizeMB: 1,
    maxWidthOrHeight: 2048,
    useWebWorker: true,
    initialQuality: 0.85,
    fileType: 'image/jpeg'
  },
  
  // Para avatares/perfiles (más agresivo)
  avatar: {
    maxSizeMB: 0.3,
    maxWidthOrHeight: 800,
    useWebWorker: true,
    initialQuality: 0.8,
    fileType: 'image/jpeg'
  },
  
  // Para banners/heros (mantener calidad)
  banner: {
    maxSizeMB: 2,
    maxWidthOrHeight: 3840,
    useWebWorker: true,
    initialQuality: 0.9,
    fileType: 'image/jpeg'
  },
  
  // Para thumbnails (máxima compresión)
  thumbnail: {
    maxSizeMB: 0.1,
    maxWidthOrHeight: 400,
    useWebWorker: true,
    initialQuality: 0.75,
    fileType: 'image/jpeg'
  }
};

/**
 * Comprime una imagen en el navegador
 * @param {File} file - Archivo de imagen
 * @param {string} preset - Preset de compresión
 * @param {function} onProgress - Callback de progreso (0-100)
 * @returns {Promise<File>} Imagen comprimida
 */
export async function compressImage(file, preset = 'product', onProgress = null) {
  try {
    const options = COMPRESSION_PRESETS[preset] || COMPRESSION_PRESETS.product;

    // Validar que sea una imagen
    if (!file.type.startsWith('image/')) {
      throw new Error('El archivo no es una imagen válida');
    }

    // Validar tamaño máximo (20MB)
    const maxSize = 20 * 1024 * 1024;
    if (file.size > maxSize) {
      throw new Error('La imagen es demasiado grande (máx. 20MB)');
    }

    const compressedFile = await imageCompression(file, {
      ...options,
      onProgress: onProgress ? (progress) => onProgress(progress) : undefined
    });

    // Log de reducción
    const reduction = ((1 - compressedFile.size / file.size) * 100).toFixed(1);
    console.log(`✅ Compresión: ${formatBytes(file.size)} → ${formatBytes(compressedFile.size)} (${reduction}% reducción)`);

    return compressedFile;

  } catch (error) {
    console.error('Error comprimiendo imagen:', error);
    throw new Error(`Error de compresión: ${error.message}`);
  }
}

/**
 * Comprime múltiples imágenes en paralelo
 * @param {File[]} files - Array de archivos
 * @param {string} preset - Preset de compresión
 * @param {function} onProgress - Callback con progreso total
 * @returns {Promise<File[]>} Imágenes comprimidas
 */
export async function compressMultipleImages(files, preset = 'product', onProgress = null) {
  const totalFiles = files.length;
  let completedFiles = 0;

  const compressionPromises = files.map((file) => 
    compressImage(file, preset, (fileProgress) => {
      if (onProgress) {
        const totalProgress = ((completedFiles + (fileProgress / 100)) / totalFiles) * 100;
        onProgress(Math.round(totalProgress));
      }
    }).then((compressedFile) => {
      completedFiles++;
      return compressedFile;
    })
  );

  return Promise.all(compressionPromises);
}

/**
 * Valida una imagen antes de comprimir
 * @param {File} file - Archivo a validar
 * @param {object} constraints - Restricciones
 * @returns {object} Resultado de validación
 */
export function validateImage(file, constraints = {}) {
  const {
    maxSizeMB = 20,
    minWidth = 100,
    minHeight = 100,
    allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
  } = constraints;

  const errors = [];

  // Validar tipo
  if (!allowedTypes.includes(file.type)) {
    errors.push(`Formato no permitido. Use: ${allowedTypes.join(', ')}`);
  }

  // Validar tamaño
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  if (file.size > maxSizeBytes) {
    errors.push(`Tamaño máximo: ${maxSizeMB}MB`);
  }

  // Validar dimensiones (requiere cargar imagen)
  return new Promise((resolve) => {
    if (errors.length > 0) {
      resolve({ valid: false, errors });
      return;
    }

    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);

      if (img.width < minWidth || img.height < minHeight) {
        errors.push(`Dimensiones mínimas: ${minWidth}x${minHeight}px`);
      }

      resolve({
        valid: errors.length === 0,
        errors,
        info: {
          width: img.width,
          height: img.height,
          size: file.size,
          type: file.type
        }
      });
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      resolve({
        valid: false,
        errors: ['Imagen corrupta o inválida']
      });
    };

    img.src = url;
  });
}

/**
 * Genera preview de la imagen
 * @param {File} file - Archivo de imagen
 * @returns {Promise<string>} Data URL del preview
 */
export function generatePreview(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = (e) => reject(new Error('Error generando preview'));
    
    reader.readAsDataURL(file);
  });
}

/**
 * Formatea bytes a formato legible
 * @param {number} bytes - Bytes a formatear
 * @returns {string} Tamaño formateado
 */
function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Obtiene información de la imagen sin cargarla completamente
 * @param {File} file - Archivo de imagen
 * @returns {Promise<object>} Info de la imagen
 */
export async function getImageInfo(file) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve({
        width: img.width,
        height: img.height,
        aspectRatio: (img.width / img.height).toFixed(2),
        size: file.size,
        sizeFormatted: formatBytes(file.size),
        type: file.type,
        name: file.name
      });
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Error cargando imagen'));
    };

    img.src = url;
  });
}