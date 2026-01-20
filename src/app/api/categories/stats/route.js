// app/api/categories/stats/route.js
import { NextResponse } from 'next/server';
import categoryService from '@/domain/services/CategoryService';
import { connectDB } from '@/lib/mongodb';

/**
 * GET /api/categories/stats
 * Obtener estadísticas de categorías (solo admin)
 */
export async function GET(request) {
  try {
    await connectDB();

    // TODO: Agregar middleware de autenticación
    // const user = await verifyAuth(request);
    // if (user.role !== 'admin') {
    //   return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
    // }

    const stats = await categoryService.getCategoryStats();

    return NextResponse.json(stats, { status: 200 });
  } catch (error) {
    console.error('Error fetching category stats:', error);
    return NextResponse.json(
      { error: error.message || 'Error al obtener estadísticas' },
      { status: 500 }
    );
  }
}

