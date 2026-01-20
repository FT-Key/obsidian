// ===================================
// app/api/users/[id]/points/add/route.js
// ===================================
import { NextResponse } from 'next/server';
import userService from '@/application/services/UserService';
import { connectDB } from '@/lib/mongodb';

/**
 * POST /api/users/[id]/points/add
 * Añadir puntos a un usuario (solo admin)
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

    const result = await userService.addPoints(id, points, description);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('Error adding points:', error);
    return NextResponse.json(
      { error: error.message || 'Error al añadir puntos' },
      { status: 400 }
    );
  }
}