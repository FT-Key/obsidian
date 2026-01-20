// ===================================
// app/api/users/[id]/points/subtract/route.js
// ===================================
import { NextResponse } from 'next/server';
import userService from '@/application/services/UserService';
import { connectDB } from '@/lib/mongodb';

/**
 * POST /api/users/[id]/points/subtract
 * Restar puntos a un usuario (solo admin)
 */
export async function POST(request, { params }) {
  try {
    await connectDB();

    // TODO: Verificar que es admin
    const { id } = await params;
    const { points, description } = await request.json();

    if (!points) {
      return NextResponse.json(
        { error: 'Se requiere el campo points' },
        { status: 400 }
      );
    }

    const result = await userService.subtractPoints(id, points, description);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('Error subtracting points:', error);
    return NextResponse.json(
      { error: error.message || 'Error al restar puntos' },
      { status: 400 }
    );
  }
}