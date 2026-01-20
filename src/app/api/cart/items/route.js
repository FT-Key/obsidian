// ===================================
// app/api/cart/items/route.js
// ===================================
import { NextResponse } from 'next/server';
import { cartService } from '@/domain/services/cart.service.js';
import { connectDB } from '@/lib/mongodb';

/**
 * POST /api/cart/items
 * Añadir un item al carrito
 */
export async function POST(request) {
  try {
    await connectDB();
    // TODO: Obtener userId del token/sesión
    const body = await request.json();
    const { userId, product_id, variant_id, quantity } = body;
    
    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Se requiere userId (temporal)' },
        { status: 400 }
      );
    }
    
    if (!product_id) {
      return NextResponse.json(
        { success: false, error: 'Se requiere product_id' },
        { status: 400 }
      );
    }
    
    const cart = await cartService.addItem(userId, {
      product_id,
      variant_id,
      quantity: quantity || 1
    });
    
    return NextResponse.json(
      { success: true, cart },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error adding item to cart:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Error al añadir item al carrito' },
      { status: 400 }
    );
  }
}