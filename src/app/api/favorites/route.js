// ===================================
// app/api/favorites/route.js
// ===================================
import { NextResponse } from 'next/server';
import { favoriteService } from '@/domain/services/favorite.service.js';
import { connectDB } from '@/lib/mongodb';

/**
 * GET /api/favorites
 * Obtener los favoritos del usuario autenticado
 */
export async function GET(request) {
  try {
    await connectDB();

    // TODO: Obtener userId del token/sesión
    // const user = await verifyAuth(request);
    // if (!user) {
    //   return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
    // }
    // const userId = user.userId;

    // TEMPORAL: Para pruebas, obtener userId de query params
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Se requiere userId (temporal)' },
        { status: 400 }
      );
    }

    const favorites = await favoriteService.getFavorites(userId);

    return NextResponse.json(favorites, { status: 200 });
  } catch (error) {
    console.error('Error fetching favorites:', error);
    return NextResponse.json(
      { error: error.message || 'Error al obtener favoritos' },
      { status: 400 }
    );
  }
}

/**
 * DELETE /api/favorites
 * Limpiar todos los favoritos del usuario
 */
export async function DELETE(request) {
  try {
    await connectDB();

    // TODO: Obtener userId del token/sesión
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Se requiere userId (temporal)' },
        { status: 400 }
      );
    }

    const result = await favoriteService.clearFavorites(userId);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('Error clearing favorites:', error);
    return NextResponse.json(
      { error: error.message || 'Error al limpiar favoritos' },
      { status: 400 }
    );
  }
}

