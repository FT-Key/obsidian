// app/api/categories/[id]/toggle/route.js
import { NextResponse } from 'next/server';
import categoryService from '@/domain/services/category.service.js';
import { connectDB } from '@/lib/mongodb';

/**
 * PATCH /api/categories/[id]/toggle
 * Activar/Desactivar una categoría (solo admin)
 */
export async function PATCH(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    // TODO: Agregar middleware de autenticación
    // const user = await verifyAuth(request);
    // if (user.role !== 'admin') {
    //   return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
    // }

    const category = await categoryService.toggleCategoryStatus(id);

    return NextResponse.json(category, { status: 200 });
  } catch (error) {
    console.error('Error toggling category status:', error);
    return NextResponse.json(
      { error: error.message || 'Error al cambiar estado de categoría' },
      { status: 400 }
    );
  }
}

