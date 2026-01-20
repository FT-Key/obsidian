// app/api/products/route.js
import { NextResponse } from 'next/server';
import productService from '@/domain/services/product.service.js';
import { connectDB } from '@/lib/mongodb';

/**
 * GET /api/products
 * Obtener todos los productos con filtros
 */
export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    
    const filters = {
      category: searchParams.get('category'),
      featured: searchParams.get('featured') === null ? undefined : searchParams.get('featured') === 'true',
      active: searchParams.get('active') !== 'false',
      search: searchParams.get('search'),
      minPrice: searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined,
      maxPrice: searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined,
      inStock: searchParams.get('inStock') === 'true',
      page: searchParams.get('page') || 1,
      limit: searchParams.get('limit') || 20,
      sortBy: searchParams.get('sortBy') || 'created_at',
      sortOrder: searchParams.get('sortOrder') || 'desc'
    };

    const result = await productService.getProducts(filters);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: error.message || 'Error al obtener productos' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/products
 * Crear un nuevo producto (solo admin)
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

    const product = await productService.createProduct(body);

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: error.message || 'Error al crear producto' },
      { status: 400 }
    );
  }
}

