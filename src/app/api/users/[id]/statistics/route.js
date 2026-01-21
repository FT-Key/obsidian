// ===================================
// app/api/users/[id]/statistics/route.js
// ===================================
import { NextResponse } from 'next/server';
import userService from '@/domain/services/user.service.js';
import { connectDB } from '@/lib/mongodb';

/**
 * GET /api/users/[id]/statistics
 * Obtener estadísticas de un usuario específico (solo admin)
 */
export async function GET(request, { params }) {
  try {
    await connectDB();

    // TODO: Verificar que es admin
    // const user = await verifyAuth(request);
    // if (user.role !== 'admin') {
    //   return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
    // }

    const { id } = await params; // userId de la URL

    const stats = await userService.getUserStatistics(id);

    return NextResponse.json(stats, { status: 200 });
  } catch (error) {
    console.error('Error fetching user statistics:', error);
    return NextResponse.json(
      { error: error.message || 'Error al obtener estadísticas del usuario' },
      { status: 400 }
    );
  }
}