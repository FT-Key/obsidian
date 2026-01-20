// ===================================
// app/api/users/me/notifications/route.js
// ===================================
import { NextResponse } from 'next/server';
import userService from '@/application/services/UserService';
import { connectDB } from '@/lib/mongodb';

/**
 * GET /api/users/me/notifications
 * Obtener notificaciones del usuario autenticado
 */
export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId'); // TODO: del token

    if (!userId) {
      return NextResponse.json(
        { error: 'Se requiere userId (temporal)' },
        { status: 400 }
      );
    }

    const options = {
      page: searchParams.get('page') || 1,
      limit: searchParams.get('limit') || 20,
      unreadOnly: searchParams.get('unreadOnly') === 'true'
    };

    const result = await userService.getUserNotifications(userId, options);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return NextResponse.json(
      { error: error.message || 'Error al obtener notificaciones' },
      { status: 400 }
    );
  }
}