// ===================================
// app/api/cart/validate/route.js
// ===================================
import { NextResponse } from 'next/server';
import { cartService } from '@/domain/services/cart.service.js';
import { connectDB } from '@/lib/mongodb';

/**
 * POST /api/cart/validate
 * Validar disponibilidad de todos los items del carrito
 */
export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();
    const { userId } = body;

    // TODO: Obtener userId del token/sesión
    if (!userId) {
      return NextResponse.json(
        { error: 'Se requiere userId (temporal)' },
        { status: 400 }
      );
    }

    const validation = await cartService.validateCart(userId);

    return NextResponse.json(validation, { status: 200 });
  } catch (error) {
    console.error('Error validating cart:', error);
    return NextResponse.json(
      { error: error.message || 'Error al validar carrito' },
      { status: 400 }
    );
  }
}