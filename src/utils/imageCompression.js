import sharp from 'sharp';

/**
 * Configuraciones predefinidas de calidad
 */
const QUALITY_PRESETS = {
  thumbnail: {
    width: 300,
    height: 300,
    quality: 75,
    fit: 'cover'
  },
  medium: {
    width: 800,
    height: 800,
    quality: 82,
    fit: 'inside'
  },
  large: {
    width: 1920,
    height: 1920,
    quality: 85,
    fit: 'inside'
  },
  original: {
    width: 3840,
    height: 3840,
    quality: 90,
    fit: 'inside'
  }
};

/**
 * Comprime y procesa una imagen a formato WebP
 * @param {Buffer} buffer - Buffer de la imagen original
 * @param {string} preset - Preset de calidad ('thumbnail', 'medium', 'large', 'original')
 * @param {object} customOptions - Opciones personalizadas
 * @returns {Promise<Buffer>} Buffer de la imagen procesada
 */
export async function compressImage(buffer, preset = 'large', customOptions = {}) {
  try {
    const config = QUALITY_PRESETS[preset] || QUALITY_PRESETS.large;
    const options = { ...config, ...customOptions };

    let image = sharp(buffer);

    // Obtener metadata para verificar orientación EXIF
    const metadata = await image.metadata();

    // Auto-rotar según EXIF (importante para fotos de móviles)
    image = image.rotate();

    // Resize inteligente
    image = image.resize(options.width, options.height, {
      fit: options.fit,
      withoutEnlargement: true, // No agrandar imágenes pequeñas
      kernel: sharp.kernel.lanczos3 // Mejor algoritmo de resize
    });

    // Comprimir a WebP (mejor que JPEG)
    const compressed = await image
      .webp({ 
        quality: options.quality,
        effort: 6, // Nivel de esfuerzo de compresión (0-6, mayor = mejor compresión)
        smartSubsample: true // Mejor calidad en colores
      })
      .toBuffer();

    return compressed;

  } catch (error) {
    console.error('Error compressing image:', error);
    throw new Error(`Image compression failed: ${error.message}`);
  }
}

/**
 * Genera múltiples versiones de una imagen
 * @param {Buffer} buffer - Buffer de la imagen original
 * @returns {Promise<Object>} Objeto con todas las versiones
 */
export async function generateImageVersions(buffer) {
  try {
    const [thumbnail, medium, large] = await Promise.all([
      compressImage(buffer, 'thumbnail'),
      compressImage(buffer, 'medium'),
      compressImage(buffer, 'large')
    ]);

    return {
      thumbnail,
      medium,
      large,
      sizes: {
        thumbnail: thumbnail.length,
        medium: medium.length,
        large: large.length
      }
    };
  } catch (error) {
    console.error('Error generating image versions:', error);
    throw error;
  }
}

/**
 * Comprime a JPEG (fallback para compatibilidad)
 * @param {Buffer} buffer - Buffer de la imagen
 * @param {object} options - Opciones de compresión
 * @returns {Promise<Buffer>}
 */
export async function compressToJPEG(buffer, options = {}) {
  const defaultOptions = {
    width: 1920,
    quality: 85,
    progressive: true // JPEG progresivo carga más rápido
  };

  const finalOptions = { ...defaultOptions, ...options };

  try {
    return await sharp(buffer)
      .rotate() // Auto-rotar
      .resize(finalOptions.width, null, {
        fit: 'inside',
        withoutEnlargement: true,
        kernel: sharp.kernel.lanczos3
      })
      .jpeg({
        quality: finalOptions.quality,
        progressive: finalOptions.progressive,
        mozjpeg: true // Usa mozjpeg para mejor compresión
      })
      .toBuffer();
  } catch (error) {
    console.error('Error compressing to JPEG:', error);
    throw error;
  }
}

/**
 * Optimiza PNG (mantiene transparencia)
 * @param {Buffer} buffer - Buffer de la imagen
 * @param {object} options - Opciones
 * @returns {Promise<Buffer>}
 */
export async function compressPNG(buffer, options = {}) {
  const defaultOptions = {
    width: 1920,
    quality: 85
  };

  const finalOptions = { ...defaultOptions, ...options };

  try {
    return await sharp(buffer)
      .rotate()
      .resize(finalOptions.width, null, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .png({
        quality: finalOptions.quality,
        compressionLevel: 9, // Máxima compresión
        adaptiveFiltering: true,
        palette: true // Usar paleta si es posible
      })
      .toBuffer();
  } catch (error) {
    console.error('Error compressing PNG:', error);
    throw error;
  }
}

/**
 * Detecta y optimiza según el formato original
 * @param {Buffer} buffer - Buffer de la imagen
 * @param {object} options - Opciones
 * @returns {Promise<{buffer: Buffer, format: string}>}
 */
export async function smartCompress(buffer, options = {}) {
  try {
    const metadata = await sharp(buffer).metadata();
    
    let compressed;
    let format;

    // Si tiene transparencia, usar PNG o WebP
    if (metadata.hasAlpha) {
      compressed = await compressPNG(buffer, options);
      format = 'png';
    } else {
      // Sin transparencia, usar WebP (mejor que JPEG)
      compressed = await compressImage(buffer, 'large', options);
      format = 'webp';
    }

    return { buffer: compressed, format };
  } catch (error) {
    console.error('Error in smart compress:', error);
    throw error;
  }
}

/**
 * Obtiene información de la imagen
 * @param {Buffer} buffer - Buffer de la imagen
 * @returns {Promise<Object>} Metadata de la imagen
 */
export async function getImageInfo(buffer) {
  try {
    const metadata = await sharp(buffer).metadata();
    return {
      width: metadata.width,
      height: metadata.height,
      format: metadata.format,
      size: buffer.length,
      hasAlpha: metadata.hasAlpha,
      orientation: metadata.orientation
    };
  } catch (error) {
    console.error('Error getting image info:', error);
    throw error;
  }
}

/**
 * Valida si el buffer es una imagen válida
 * @param {Buffer} buffer - Buffer a validar
 * @returns {Promise<boolean>}
 */
export async function isValidImageBuffer(buffer) {
  try {
    await sharp(buffer).metadata();
    return true;
  } catch {
    return false;
  }
}

/**
 * Añade marca de agua a la imagen
 * @param {Buffer} buffer - Buffer de la imagen
 * @param {string} watermarkText - Texto de la marca de agua
 * @returns {Promise<Buffer>}
 */
export async function addWatermark(buffer, watermarkText = 'Obsidian') {
  try {
    const metadata = await sharp(buffer).metadata();
    
    // Crear SVG con texto
    const svgText = `
      <svg width="${metadata.width}" height="${metadata.height}">
        <style>
          .watermark { 
            fill: rgba(255, 255, 255, 0.3); 
            font-size: ${Math.floor(metadata.width / 20)}px;
            font-family: Arial, sans-serif;
            font-weight: bold;
          }
        </style>
        <text 
          x="50%" 
          y="95%" 
          text-anchor="middle" 
          class="watermark"
        >${watermarkText}</text>
      </svg>
    `;

    return await sharp(buffer)
      .composite([{
        input: Buffer.from(svgText),
        gravity: 'southeast'
      }])
      .toBuffer();
  } catch (error) {
    console.error('Error adding watermark:', error);
    throw error;
  }
}