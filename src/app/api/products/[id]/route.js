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
 * Elimina automáticamente las imágenes antiguas que ya no se usan
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

    // El servicio se encarga de eliminar las imágenes antiguas
    const product = await productService.updateProduct(id, body);

    return NextResponse.json(
      { 
        ...product.toObject(),
        message: 'Producto actualizado exitosamente. Las imágenes antiguas se eliminarán automáticamente.'
      }, 
      { status: 200 }
    );
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
 * Elimina automáticamente todas las imágenes asociadas
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

    // El servicio se encarga de eliminar todas las imágenes
    const result = await productService.deleteProduct(id);

    return NextResponse.json(
      { 
        ...result,
        message: `Producto eliminado exitosamente. ${result.deletedImages} imágenes se eliminarán automáticamente.`
      }, 
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { error: error.message || 'Error al eliminar producto' },
      { status: 400 }
    );
  }
}