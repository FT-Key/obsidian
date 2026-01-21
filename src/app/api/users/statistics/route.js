

// ===================================
// app/api/users/statistics/route.js
// ===================================
import { NextResponse } from 'next/server';
import userService from '@/domain/services/user.service.js';
import { connectDB } from '@/lib/mongodb';

/**
 * GET /api/users/statistics
 * Obtener estadísticas generales de usuarios (solo admin)
 */
export async function GET(request) {
  try {
    await connectDB();

    // TODO: Verificar que es admin
    const stats = await userService.getUsersStatistics();

    return NextResponse.json(stats, { status: 200 });
  } catch (error) {
    console.error('Error fetching users statistics:', error);
    return NextResponse.json(
      { error: error.message || 'Error al obtener estadísticas' },
      { status: 500 }
    );
  }
}