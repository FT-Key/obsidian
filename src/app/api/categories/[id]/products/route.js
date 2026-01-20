// app/api/categories/[id]/products/route.js
import { NextResponse } from 'next/server';
import productService from '@/domain/services/product.service.js';
import { connectDB } from '@/lib/mongodb';

/**
 * GET /api/categories/[id]/products
 * Obtener productos de una categoría específica
 */
export async function GET(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;
    const { searchParams } = new URL(request.url);
    
    const options = {
      page: searchParams.get('page') || 1,
      limit: searchParams.get('limit') || 20,
      sortBy: searchParams.get('sortBy') || 'created_at',
      sortOrder: searchParams.get('sortOrder') || 'desc',
      inStock: searchParams.get('inStock') === 'true'
    };

    const result = await productService.getProductsByCategory(id, options);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('Error fetching category products:', error);
    return NextResponse.json(
      { error: error.message || 'Error al obtener productos de la categoría' },
      { status: 400 }
    );
  }
}
