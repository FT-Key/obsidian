// app/api/products/[id]/stock/route.js
import { NextResponse } from 'next/server';
import productService from '@/domain/services/product.service.js';
import { connectDB } from '@/lib/mongodb';

/**
 * POST /api/products/[id]/stock
 * Actualizar stock de un producto (solo admin)
 */
export async function POST(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;
    const { quantity, variantId } = await request.json();

    // TODO: Agregar middleware de autenticación
    // const user = await verifyAuth(request);
    // if (user.role !== 'admin') {
    //   return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
    // }

    if (quantity === undefined) {
      return NextResponse.json(
        { error: 'Se requiere el campo quantity' },
        { status: 400 }
      );
    }

    const product = await productService.updateStock(id, quantity, variantId);

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error('Error updating stock:', error);
    return NextResponse.json(
      { error: error.message || 'Error al actualizar stock' },
      { status: 400 }
    );
  }
}

/**
 * GET /api/products/[id]/stock
 * Verificar disponibilidad de stock
 */
export async function GET(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const quantity = Number(searchParams.get('quantity')) || 1;
    const variantId = searchParams.get('variantId');

    const result = await productService.checkStock(id, quantity, variantId);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('Error checking stock:', error);
    return NextResponse.json(
      { error: error.message || 'Error al verificar stock' },
      { status: 400 }
    );
  }
}

