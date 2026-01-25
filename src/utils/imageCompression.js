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
    // Validar buffer
    if (!Buffer.isBuffer(buffer)) {
      throw new Error('Invalid buffer provided');
    }

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

    console.log(`✅ Imagen comprimida: ${buffer.length} bytes -> ${compressed.length} bytes (${Math.round((1 - compressed.length / buffer.length) * 100)}% reducción)`);

    return compressed;

  } catch (error) {
    console.error('❌ Error compressing image:', error);
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
    if (!Buffer.isBuffer(buffer)) {
      throw new Error('Invalid buffer provided');
    }

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
        large: large.length,
        total: thumbnail.length + medium.length + large.length
      }
    };
  } catch (error) {
    console.error('❌ Error generating image versions:', error);
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
    if (!Buffer.isBuffer(buffer)) {
      throw new Error('Invalid buffer provided');
    }

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
    console.error('❌ Error compressing to JPEG:', error);
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
    if (!Buffer.isBuffer(buffer)) {
      throw new Error('Invalid buffer provided');
    }

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
    console.error('❌ Error compressing PNG:', error);
    throw error;
  }
}

/**
 * Detecta y optimiza según el formato original
 * @param {Buffer} buffer - Buffer de la imagen
 * @param {object} options - Opciones
 * @returns {Promise<{buffer: Buffer, format: string, metadata: Object}>}
 */
export async function smartCompress(buffer, options = {}) {
  try {
    if (!Buffer.isBuffer(buffer)) {
      throw new Error('Invalid buffer provided');
    }

    const metadata = await sharp(buffer).metadata();
    
    let compressed;
    let format;

    // Si tiene transparencia, usar PNG o WebP con alpha
    if (metadata.hasAlpha) {
      // WebP soporta transparencia y es más eficiente que PNG
      compressed = await sharp(buffer)
        .rotate()
        .resize(options.width || 1920, options.height || 1920, {
          fit: 'inside',
          withoutEnlargement: true
        })
        .webp({
          quality: options.quality || 85,
          alphaQuality: 100, // Mantener calidad del canal alpha
          effort: 6
        })
        .toBuffer();
      format = 'webp';
    } else {
      // Sin transparencia, usar WebP (mejor que JPEG)
      compressed = await compressImage(buffer, options.preset || 'large', options);
      format = 'webp';
    }

    return { 
      buffer: compressed, 
      format,
      metadata: {
        originalSize: buffer.length,
        compressedSize: compressed.length,
        reduction: Math.round((1 - compressed.length / buffer.length) * 100),
        dimensions: {
          width: metadata.width,
          height: metadata.height
        }
      }
    };
  } catch (error) {
    console.error('❌ Error in smart compress:', error);
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
    if (!Buffer.isBuffer(buffer)) {
      throw new Error('Invalid buffer provided');
    }

    const metadata = await sharp(buffer).metadata();
    return {
      width: metadata.width,
      height: metadata.height,
      format: metadata.format,
      size: buffer.length,
      hasAlpha: metadata.hasAlpha,
      orientation: metadata.orientation,
      space: metadata.space,
      channels: metadata.channels,
      depth: metadata.depth
    };
  } catch (error) {
    console.error('❌ Error getting image info:', error);
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
    if (!Buffer.isBuffer(buffer)) {
      return false;
    }
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
 * @param {object} options - Opciones de marca de agua
 * @returns {Promise<Buffer>}
 */
export async function addWatermark(buffer, watermarkText = 'Obsidian', options = {}) {
  try {
    if (!Buffer.isBuffer(buffer)) {
      throw new Error('Invalid buffer provided');
    }

    const metadata = await sharp(buffer).metadata();
    
    const defaultOptions = {
      opacity: 0.3,
      fontSize: Math.floor(metadata.width / 20),
      position: 'southeast', // 'southeast', 'southwest', 'northeast', 'northwest', 'center'
      color: 'white'
    };

    const finalOptions = { ...defaultOptions, ...options };
    
    // Crear SVG con texto
    const svgText = `
      <svg width="${metadata.width}" height="${metadata.height}">
        <style>
          .watermark { 
            fill: ${finalOptions.color === 'white' ? `rgba(255, 255, 255, ${finalOptions.opacity})` : `rgba(0, 0, 0, ${finalOptions.opacity})`}; 
            font-size: ${finalOptions.fontSize}px;
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
        gravity: finalOptions.position
      }])
      .toBuffer();
  } catch (error) {
    console.error('❌ Error adding watermark:', error);
    throw error;
  }
}

/**
 * Recorta una imagen según coordenadas
 * @param {Buffer} buffer - Buffer de la imagen
 * @param {Object} cropData - { left, top, width, height }
 * @returns {Promise<Buffer>}
 */
export async function cropImage(buffer, cropData) {
  try {
    if (!Buffer.isBuffer(buffer)) {
      throw new Error('Invalid buffer provided');
    }

    const { left, top, width, height } = cropData;

    return await sharp(buffer)
      .extract({ left, top, width, height })
      .toBuffer();
  } catch (error) {
    console.error('❌ Error cropping image:', error);
    throw error;
  }
}

/**
 * Convierte imagen a base64
 * @param {Buffer} buffer - Buffer de la imagen
 * @param {string} format - Formato de salida ('webp', 'jpeg', 'png')
 * @returns {Promise<string>}
 */
export async function toBase64(buffer, format = 'webp') {
  try {
    if (!Buffer.isBuffer(buffer)) {
      throw new Error('Invalid buffer provided');
    }

    let processed = sharp(buffer);

    if (format === 'webp') {
      processed = processed.webp({ quality: 85 });
    } else if (format === 'jpeg') {
      processed = processed.jpeg({ quality: 85 });
    } else if (format === 'png') {
      processed = processed.png({ quality: 85 });
    }

    const resultBuffer = await processed.toBuffer();
    return `data:image/${format};base64,${resultBuffer.toString('base64')}`;
  } catch (error) {
    console.error('❌ Error converting to base64:', error);
    throw error;
  }
}