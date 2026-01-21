
// app/api/categories/route.js
import { NextResponse } from 'next/server';
import categoryService from '@/domain/services/category.service.js';
import { connectDB } from '@/lib/mongodb';

/**
 * GET /api/categories
 * Obtener todas las categorías con filtros
 */
export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    
    const filters = {
      active: searchParams.get('active') === 'false' ? false : 
              searchParams.get('active') === 'true' ? true : undefined,
      page: searchParams.get('page') || 1,
      limit: searchParams.get('limit') || 50,
      sortBy: searchParams.get('sortBy') || 'name',
      sortOrder: searchParams.get('sortOrder') || 'asc'
    };

    const result = await categoryService.getCategories(filters);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: error.message || 'Error al obtener categorías' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/categories
 * Crear una nueva categoría (solo admin)
 */
export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();
    
    // TODO: Agregar middleware de autenticación y verificar rol admin
    // const user = await verifyAuth(request);
    // if (user.role !== 'admin') {
    //   return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
    // }

    const category = await categoryService.createCategory(body);

    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.error('Error creating category:', error);
    return NextResponse.json(
      { error: error.message || 'Error al crear categoría' },
      { status: 400 }
    );
  }
}

