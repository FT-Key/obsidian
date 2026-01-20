// ===================================
// app/api/favorites/check/route.js
// ===================================
import { NextResponse } from 'next/server';
import { favoriteService } from '@/domain/services/favorite.service.js';
import { connectDB } from '@/lib/mongodb';

/**
 * GET /api/favorites/check?userId=xxx&product_id=xxx
 * Verificar si un producto está en favoritos
 */
export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const product_id = searchParams.get('product_id');

    // TODO: Obtener userId del token/sesión
    if (!userId) {
      return NextResponse.json(
        { error: 'Se requiere userId (temporal)' },
        { status: 400 }
      );
    }

    if (!product_id) {
      return NextResponse.json(
        { error: 'Se requiere product_id' },
        { status: 400 }
      );
    }

    const result = await favoriteService.isFavorite(userId, product_id);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('Error checking favorite:', error);
    return NextResponse.json(
      { error: error.message || 'Error al verificar favorito' },
      { status: 400 }
    );
  }
}