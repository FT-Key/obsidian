// ===================================
// app/api/users/me/route.js
// ===================================
import { NextResponse } from 'next/server';
import userService from '@/application/services/UserService';
import { connectDB } from '@/lib/mongodb';

/**
 * GET /api/users/me
 * Obtener perfil del usuario autenticado
 */
export async function GET(request) {
  try {
    await connectDB();

    // TODO: Obtener userId del token
    // const user = await verifyAuth(request);
    // const userId = user.userId;

    // TEMPORAL
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'Se requiere userId (temporal)' },
        { status: 400 }
      );
    }

    const profile = await userService.getProfile(userId);

    return NextResponse.json(profile, { status: 200 });
  } catch (error) {
    console.error('Error fetching profile:', error);
    return NextResponse.json(
      { error: error.message || 'Error al obtener perfil' },
      { status: 400 }
    );
  }
}

/**
 * PATCH /api/users/me
 * Actualizar perfil del usuario autenticado
 */
export async function PATCH(request) {
  try {
    await connectDB();

    // TODO: Obtener userId del token
    const body = await request.json();
    const { userId, ...updateData } = body;

    if (!userId) {
      return NextResponse.json(
        { error: 'Se requiere userId (temporal)' },
        { status: 400 }
      );
    }

    const user = await userService.updateProfile(userId, updateData);

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json(
      { error: error.message || 'Error al actualizar perfil' },
      { status: 400 }
    );
  }
}