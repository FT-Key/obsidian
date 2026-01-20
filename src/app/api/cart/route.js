// ===================================
// app/api/cart/route.js
// ===================================
import { NextResponse } from 'next/server';
import { cartService } from '@/domain/services/cart.service.js';
import { connectDB } from '@/lib/mongodb';

/**
 * GET /api/cart
 * Obtener el carrito del usuario autenticado
 */
export async function GET(request) {
  try {
    await connectDB();

    // TODO: Obtener userId del token/sesión
    // const user = await verifyAuth(request);
    // if (!user) {
    //   return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
    // }
    // const userId = user.userId;

    // TEMPORAL: Para pruebas, obtener userId de query params
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Se requiere userId (temporal)' },
        { status: 400 }
      );
    }

    const cart = await cartService.getCart(userId);

    return NextResponse.json(cart, { status: 200 });
  } catch (error) {
    console.error('Error fetching cart:', error);
    return NextResponse.json(
      { error: error.message || 'Error al obtener carrito' },
      { status: 400 }
    );
  }
}

/**
 * DELETE /api/cart
 * Limpiar todo el carrito del usuario
 */
export async function DELETE(request) {
  try {
    await connectDB();

    // TODO: Obtener userId del token/sesión
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Se requiere userId (temporal)' },
        { status: 400 }
      );
    }

    const result = await cartService.clearCart(userId);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('Error clearing cart:', error);
    return NextResponse.json(
      { error: error.message || 'Error al limpiar carrito' },
      { status: 400 }
    );
  }
}

