// app/api/categories/active/route.js
import { NextResponse } from 'next/server';
import categoryService from '@/domain/services/CategoryService';
import { connectDB } from '@/lib/mongodb';

/**
 * GET /api/categories/active
 * Obtener solo categorías activas
 */
export async function GET(request) {
  try {
    await connectDB();

    const categories = await categoryService.getActiveCategories();

    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    console.error('Error fetching active categories:', error);
    return NextResponse.json(
      { error: error.message || 'Error al obtener categorías activas' },
      { status: 500 }
    );
  }
}

