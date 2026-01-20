// app/api/products/search/route.js
import { NextResponse } from 'next/server';
import productService from '@/domain/services/product.service.js';
import { connectDB } from '@/lib/mongodb';

/**
 * GET /api/products/search
 * Buscar productos por término
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

    const options = {
      page: searchParams.get('page') || 1,
      limit: searchParams.get('limit') || 20
    };

    const result = await productService.searchProducts(searchTerm, options);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('Error searching products:', error);
    return NextResponse.json(
      { error: error.message || 'Error al buscar productos' },
      { status: 500 }
    );
  }
}