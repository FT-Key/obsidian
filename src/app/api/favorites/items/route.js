// ===================================
// app/api/favorites/items/route.js
// ===================================
import { NextResponse } from 'next/server';
import { favoriteService } from '@/domain/services/favorite.service.js';
import { connectDB } from '@/lib/mongodb';

/**
 * POST /api/favorites/items
 * Añadir un producto a favoritos
 */
export async function POST(request) {
  try {
    await connectDB();

    // TODO: Obtener userId del token/sesión
    const body = await request.json();
    const { userId, product_id } = body;
    
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

    const favorites = await favoriteService.addFavorite(userId, product_id);

    return NextResponse.json(favorites, { status: 201 });
  } catch (error) {
    console.error('Error adding favorite:', error);
    return NextResponse.json(
      { error: error.message || 'Error al añadir a favoritos' },
      { status: 400 }
    );
  }
}

