// ===================================
// app/api/users/[id]/route.js
// ===================================
import { NextResponse } from 'next/server';
import userService from '@/domain/services/user.service.js';
import { connectDB } from '@/lib/mongodb';

/**
 * GET /api/users/[id]
 * Obtener usuario por ID (solo admin)
 */
export async function GET(request, { params }) {
  try {
    await connectDB();

    // TODO: Verificar que es admin
    const { id } = await params;
    const user = await userService.getUserById(id);

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { error: error.message || 'Error al obtener usuario' },
      { status: error.message.includes('inválido') ? 400 : 404 }
    );
  }
}

/**
 * PATCH /api/users/[id]
 * Actualizar usuario (solo admin)
 */
export async function PATCH(request, { params }) {
  try {
    await connectDB();

    // TODO: Verificar que es admin
    const { id } = await params;
    const body = await request.json();

    const user = await userService.updateUser(id, body);

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      { error: error.message || 'Error al actualizar usuario' },
      { status: 400 }
    );
  }
}

/**
 * DELETE /api/users/[id]
 * Eliminar usuario (solo admin)
 */
export async function DELETE(request, { params }) {
  try {
    await connectDB();

    // TODO: Verificar que es admin
    const { id } = await params;

    const result = await userService.deleteUser(id);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json(
      { error: error.message || 'Error al eliminar usuario' },
      { status: 400 }
    );
  }
}