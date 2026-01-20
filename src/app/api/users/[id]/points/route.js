// ===================================
// app/api/users/[id]/points/route.js
// ===================================
import { NextResponse } from 'next/server';
import userService from '@/application/services/UserService';
import { connectDB } from '@/lib/mongodb';

/**
 * GET /api/users/[id]/points
 * Obtener movimientos de puntos de un usuario específico (solo admin)
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
    const { searchParams } = new URL(request.url);

    const options = {
      page: searchParams.get('page') || 1,
      limit: searchParams.get('limit') || 20
    };

    const result = await userService.getUserPointMovements(id, options);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('Error fetching user point movements:', error);
    return NextResponse.json(
      { error: error.message || 'Error al obtener movimientos de puntos del usuario' },
      { status: 400 }
    );
  }
}