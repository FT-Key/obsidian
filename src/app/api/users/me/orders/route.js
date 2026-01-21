// ===================================
// app/api/users/me/orders/route.js
// ===================================
import { NextResponse } from 'next/server';
import userService from '@/domain/services/user.service.js';
import { connectDB } from '@/lib/mongodb';

/**
 * GET /api/users/me/orders
 * Obtener órdenes del usuario autenticado
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
      limit: searchParams.get('limit') || 10,
      status: searchParams.get('status')
    };

    const result = await userService.getUserOrders(userId, options);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('Error fetching user orders:', error);
    return NextResponse.json(
      { error: error.message || 'Error al obtener órdenes' },
      { status: 400 }
    );
  }
}