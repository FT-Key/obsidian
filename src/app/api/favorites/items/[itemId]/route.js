// ===================================
// app/api/favorites/items/[itemId]/route.js
// ===================================
import { NextResponse } from 'next/server';
import { favoriteService } from '@/domain/services/favorite.service.js';
import { connectDB } from '@/lib/mongodb';

/**
 * DELETE /api/favorites/items/[itemId]
 * Eliminar un producto de favoritos
 */
export async function DELETE(request, { params }) {
  try {
    await connectDB();

    const { itemId } = await params;
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    // TODO: Obtener userId del token/sesión
    if (!userId) {
      return NextResponse.json(
        { error: 'Se requiere userId (temporal)' },
        { status: 400 }
      );
    }

    const favorites = await favoriteService.removeFavorite(userId, itemId);

    return NextResponse.json(favorites, { status: 200 });
  } catch (error) {
    console.error('Error removing favorite:', error);
    return NextResponse.json(
      { error: error.message || 'Error al eliminar favorito' },
      { status: 400 }
    );
  }
}

