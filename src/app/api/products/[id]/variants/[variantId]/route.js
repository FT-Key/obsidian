// app/api/products/[id]/variants/[variantId]/route.js
import { NextResponse } from 'next/server';
import productService from '@/domain/services/product.service.js';
import { connectDB } from '@/lib/mongodb';

/**
 * PUT /api/products/[id]/variants/[variantId]
 * Actualizar una variante (solo admin)
 */
export async function PUT(request, { params }) {
  try {
    await connectDB();

    const { id, variantId } = await params;
    const variantData = await request.json();

    // TODO: Agregar middleware de autenticación
    const product = await productService.updateVariant(id, variantId, variantData);

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error('Error updating variant:', error);
    return NextResponse.json(
      { error: error.message || 'Error al actualizar variante' },
      { status: 400 }
    );
  }
}

/**
 * DELETE /api/products/[id]/variants/[variantId]
 * Eliminar una variante (solo admin)
 */
export async function DELETE(request, { params }) {
  try {
    await connectDB();

    const { id, variantId } = await params;

    // TODO: Agregar middleware de autenticación
    const product = await productService.deleteVariant(id, variantId);

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error('Error deleting variant:', error);
    return NextResponse.json(
      { error: error.message || 'Error al eliminar variante' },
      { status: 400 }
    );
  }
}

