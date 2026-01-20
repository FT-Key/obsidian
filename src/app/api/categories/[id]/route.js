// app/api/categories/[id]/route.js
import { NextResponse } from 'next/server';
import categoryService from '@/domain/services/CategoryService';
import { connectDB } from '@/lib/mongodb';

/**
 * GET /api/categories/[id]
 * Obtener una categoría por ID
 */
export async function GET(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;
    const category = await categoryService.getCategoryById(id);

    return NextResponse.json(category, { status: 200 });
  } catch (error) {
    console.error('Error fetching category:', error);
    return NextResponse.json(
      { error: error.message || 'Error al obtener categoría' },
      { status: error.message.includes('inválido') ? 400 : 404 }
    );
  }
}

/**
 * PUT /api/categories/[id]
 * Actualizar una categoría (solo admin)
 */
export async function PUT(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;
    const body = await request.json();

    // TODO: Agregar middleware de autenticación
    // const user = await verifyAuth(request);
    // if (user.role !== 'admin') {
    //   return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
    // }

    const category = await categoryService.updateCategory(id, body);

    return NextResponse.json(category, { status: 200 });
  } catch (error) {
    console.error('Error updating category:', error);
    return NextResponse.json(
      { error: error.message || 'Error al actualizar categoría' },
      { status: 400 }
    );
  }
}

/**
 * DELETE /api/categories/[id]
 * Eliminar una categoría (solo admin)
 */
export async function DELETE(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const permanent = searchParams.get('permanent') === 'true';

    // TODO: Agregar middleware de autenticación
    // const user = await verifyAuth(request);
    // if (user.role !== 'admin') {
    //   return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
    // }

    const result = permanent 
      ? await categoryService.permanentDeleteCategory(id)
      : await categoryService.deleteCategory(id);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('Error deleting category:', error);
    return NextResponse.json(
      { error: error.message || 'Error al eliminar categoría' },
      { status: 400 }
    );
  }
}

