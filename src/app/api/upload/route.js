// app/api/upload/route.js
import { NextResponse } from 'next/server';
import { uploadImageServer } from '@/lib/firebase/storage';
import { compressImage } from '@/utils/imageCompression';

/**
 * POST /api/upload
 * Sube una imagen a Firebase Storage con compresión WebP
 * 
 * FormData esperado:
 * - file: Archivo de imagen (File object)
 * - folder: Carpeta destino (opcional, default: 'products')
 * 
 * Respuesta:
 * - url: URL pública de la imagen en Firebase Storage
 */
export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const folder = formData.get('folder') || 'products';

    // Validación: archivo requerido
    if (!file) {
      return NextResponse.json(
        { error: 'No se proporcionó ningún archivo' }, 
        { status: 400 }
      );
    }

    // Validación: tipo de archivo
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Tipo de archivo no válido. Solo se permiten: JPEG, PNG, WebP, GIF' },
        { status: 400 }
      );
    }

    // Validación: tamaño máximo (5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'El archivo excede el tamaño máximo permitido (5MB)' },
        { status: 400 }
      );
    }

    // Validación: carpeta permitida
    const allowedFolders = ['products', 'categories', 'banners', 'users'];
    if (!allowedFolders.includes(folder)) {
      return NextResponse.json(
        { error: `Carpeta no válida. Carpetas permitidas: ${allowedFolders.join(', ')}` },
        { status: 400 }
      );
    }

    // TODO: Agregar autenticación
    // const user = await verifyAuth(request);
    // if (!user) {
    //   return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    // }

    // Convertir archivo a buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Compresión y conversión a WebP (mejor calidad/peso que JPEG)
    const compressed = await compressImage(buffer, 'large');

    // Subir a Firebase Storage
    const url = await uploadImageServer(compressed, file.name, folder);

    // Log para monitoreo
    console.log(`✅ Imagen subida: ${folder}/${file.name} -> ${url}`);

    return NextResponse.json({ 
      url,
      success: true,
      folder,
      originalSize: file.size,
      originalName: file.name
    }, { status: 200 });

  } catch (error) {
    console.error('❌ Error uploading image:', error);
    
    // Errores específicos
    if (error.message?.includes('Firebase')) {
      return NextResponse.json(
        { error: 'Error al subir la imagen a Firebase Storage' },
        { status: 500 }
      );
    }

    if (error.message?.includes('compression')) {
      return NextResponse.json(
        { error: 'Error al comprimir la imagen' },
        { status: 500 }
      );
    }

    // Error genérico
    return NextResponse.json(
      { error: error.message || 'Error al procesar la imagen' },
      { status: 500 }
    );
  }
}