// ===================================
// app/api/users/route.js
// ===================================
import { NextResponse } from 'next/server';
import userService from '@/domain/services/user.service.js';
import { connectDB } from '@/lib/mongodb';

/**
 * GET /api/users
 * Listar todos los usuarios (solo admin)
 */
export async function GET(request) {
  try {
    await connectDB();

    // TODO: Verificar que es admin
    // const user = await verifyAuth(request);
    // if (user.role !== 'admin') {
    //   return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
    // }

    const { searchParams } = new URL(request.url);
    
    const filters = {
      role: searchParams.get('role'),
      minPoints: searchParams.get('minPoints') ? Number(searchParams.get('minPoints')) : undefined,
      maxPoints: searchParams.get('maxPoints') ? Number(searchParams.get('maxPoints')) : undefined,
      search: searchParams.get('search'),
      page: searchParams.get('page') || 1,
      limit: searchParams.get('limit') || 20,
      sortBy: searchParams.get('sortBy') || 'created_at',
      sortOrder: searchParams.get('sortOrder') || 'desc'
    };

    const result = await userService.getAllUsers(filters);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: error.message || 'Error al obtener usuarios' },
      { status: 500 }
    );
  }
}