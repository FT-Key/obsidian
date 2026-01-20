// ===================================
// app/api/favorites/items/[itemId]/move-to-cart/route.js
// ===================================
import { NextResponse } from 'next/server';
import { favoriteService } from '@/domain/services/favorite.service.js';
import { connectDB } from '@/lib/mongodb';

/**
 * POST /api/favorites/items/[itemId]/move-to-cart
 * Mover un favorito al carrito
 */
export async function POST(request, { params }) {
  try {
    await connectDB();

    const { itemId } = await params;
    const body = await request.json();
    const { userId } = body;

    // TODO: Obtener userId del token/sesión
    if (!userId) {
      return NextResponse.json(
        { error: 'Se requiere userId (temporal)' },
        { status: 400 }
      );
    }

    const result = await favoriteService.moveToCart(userId, itemId);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('Error moving favorite to cart:', error);
    return NextResponse.json(
      { error: error.message || 'Error al mover a carrito' },
      { status: 400 }
    );
  }
}

