// app/api/categories/search/route.js
import { NextResponse } from 'next/server';
import categoryService from '@/domain/services/CategoryService';
import { connectDB } from '@/lib/mongodb';

/**
 * GET /api/categories/search
 * Buscar categorías por nombre
 */
export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const searchTerm = searchParams.get('q');
    
    if (!searchTerm) {
      return NextResponse.json(
        { error: 'Se requiere el parámetro de búsqueda "q"' },
        { status: 400 }
      );
    }

    const categories = await categoryService.searchCategories(searchTerm);

    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    console.error('Error searching categories:', error);
    return NextResponse.json(
      { error: error.message || 'Error al buscar categorías' },
      { status: 500 }
    );
  }
}

