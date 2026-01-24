// src/app/api/products/route.js
import { NextResponse } from 'next/server';
import productService from '@/domain/services/product.service.js';
import { connectDB } from '@/lib/mongodb';

export async function POST(request) {
  try {
    await connectDB();
    
    // ✅ Recibir JSON en lugar de FormData
    const productData = await request.json();
    
    console.log('📦 Datos recibidos:', productData);
    
    // Validaciones básicas
    if (!productData.name || !productData.price || !productData.category) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos: name, price, category' },
        { status: 400 }
      );
    }

    if (!productData.main_image) {
      return NextResponse.json(
        { error: 'La imagen principal es requerida' },
        { status: 400 }
      );
    }

    // Crear el producto usando el servicio
    const product = await productService.createProduct(productData);
    
    console.log('✅ Producto creado:', product._id);
    
    return NextResponse.json(product, { status: 201 });
    
  } catch (error) {
    console.error('❌ Error creating product:', error);
    return NextResponse.json(
      { error: error.message || 'Error al crear producto' },
      { status: 400 }
    );
  }
}

export async function GET(request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    
    // Construir filtros desde query params
    const filters = {
      page: parseInt(searchParams.get('page')) || 1,
      limit: parseInt(searchParams.get('limit')) || 20,
      sortBy: searchParams.get('sortBy') || 'created_at',
      sortOrder: searchParams.get('sortOrder') || 'desc'
    };
    
    if (searchParams.get('category')) {
      filters.category = searchParams.get('category');
    }
    
    if (searchParams.get('featured') !== null) {
      filters.featured = searchParams.get('featured') === 'true';
    }
    
    if (searchParams.get('active') !== null) {
      filters.active = searchParams.get('active') === 'true';
    }
    
    if (searchParams.get('search')) {
      filters.search = searchParams.get('search');
    }
    
    if (searchParams.get('minPrice')) {
      filters.minPrice = parseFloat(searchParams.get('minPrice'));
    }
    
    if (searchParams.get('maxPrice')) {
      filters.maxPrice = parseFloat(searchParams.get('maxPrice'));
    }
    
    if (searchParams.get('inStock') !== null) {
      filters.inStock = searchParams.get('inStock') === 'true';
    }
    
    const result = await productService.getProducts(filters);
    
    return NextResponse.json(result, { status: 200 });
    
  } catch (error) {
    console.error('❌ Error fetching products:', error);
    return NextResponse.json(
      { error: error.message || 'Error al obtener productos' },
      { status: 500 }
    );
  }
}