// src/app/api/upload/route.js
import { NextResponse } from 'next/server';
import { uploadImageServer } from '@/lib/firebase/storage';
import { compressImage } from '@/utils/imageCompression'; // Sharp

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const folder = formData.get('folder') || 'products';

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Ya viene comprimido del frontend, pero lo recomprimimos a WebP
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Compresión final a WebP (mejor que JPEG)
    const compressed = await compressImage(buffer, 'large'); // Sharp

    const url = await uploadImageServer(compressed, file.name, folder);

    return NextResponse.json({ 
      url,
      success: true 
    }, { status: 200 });

  } catch (error) {
    console.error('Error uploading:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}