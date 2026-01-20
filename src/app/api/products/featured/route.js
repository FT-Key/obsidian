// app/api/products/featured/route.js
import { NextResponse } from 'next/server';
import productService from '@/domain/services/product.service.js';
import { connectDB } from '@/lib/mongodb';

/**
 * GET /api/products/featured
 * Obtener productos destacados
 */
export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit') || 8;

    const products = await productService.getFeaturedProducts(Number(limit));

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error('Error fetching featured products:', error);
    return NextResponse.json(
      { error: error.message || 'Error al obtener productos destacados' },
      { status: 500 }
    );
  }
}

