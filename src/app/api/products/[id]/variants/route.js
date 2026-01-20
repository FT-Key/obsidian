// app/api/products/[id]/variants/route.js
import { NextResponse } from 'next/server';
import productService from '@/domain/services/product.service.js';
import { connectDB } from '@/lib/mongodb';

/**
 * POST /api/products/[id]/variants
 * Añadir variante a un producto (solo admin)
 */
export async function POST(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;
    const variantData = await request.json();

    // TODO: Agregar middleware de autenticación
    // const user = await verifyAuth(request);
    // if (user.role !== 'admin') {
    //   return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
    // }

    const product = await productService.addVariant(id, variantData);

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Error adding variant:', error);
    return NextResponse.json(
      { error: error.message || 'Error al añadir variante' },
      { status: 400 }
    );
  }
}

