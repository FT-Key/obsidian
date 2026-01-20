// ===================================
// app/api/users/[id]/appointments/route.js
// ===================================
import { NextResponse } from 'next/server';
import userService from '@/application/services/UserService';
import { connectDB } from '@/lib/mongodb';

/**
 * GET /api/users/[id]/appointments
 * Obtener citas de un usuario específico (solo admin)
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
      limit: searchParams.get('limit') || 10,
      status: searchParams.get('status'),
      upcoming: searchParams.get('upcoming') === 'true'
    };

    const result = await userService.getUserAppointments(id, options);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('Error fetching user appointments:', error);
    return NextResponse.json(
      { error: error.message || 'Error al obtener citas del usuario' },
      { status: 400 }
    );
  }
}