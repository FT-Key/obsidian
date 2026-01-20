// app/api/products/[id]/route.js
import { NextResponse } from 'next/server';
import productService from '@/domain/services/product.service.js';
import { connectDB } from '@/lib/mongodb';

/**
 * GET /api/products/[id]
 * Obtener un producto por ID
 */
export async function GET(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;
    const product = await productService.getProductById(id);

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: error.message || 'Error al obtener producto' },
      { status: error.message.includes('inválido') ? 400 : 404 }
    );
  }
}

/**
 * PUT /api/products/[id]
 * Actualizar un producto (solo admin)
 */
export async function PUT(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;
    const body = await request.json();

    // TODO: Agregar middleware de autenticación
    // const user = await verifyAuth(request);
    // if (user.role !== 'admin') {
    //   return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
    // }

    const product = await productService.updateProduct(id, body);

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { error: error.message || 'Error al actualizar producto' },
      { status: 400 }
    );
  }
}

/**
 * DELETE /api/products/[id]
 * Eliminar un producto (solo admin)
 */
export async function DELETE(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    // TODO: Agregar middleware de autenticación
    // const user = await verifyAuth(request);
    // if (user.role !== 'admin') {
    //   return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
    // }

    const result = await productService.deleteProduct(id);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { error: error.message || 'Error al eliminar producto' },
      { status: 400 }
    );
  }
}

