// ===================================
// app/api/cart/items/[itemId]/route.js
// ===================================
import { NextResponse } from 'next/server';
import { cartService } from '@/domain/services/cart.service.js';
import { connectDB } from '@/lib/mongodb';

/**
 * PATCH /api/cart/items/[itemId]
 * Actualizar cantidad de un item del carrito
 */
export async function PATCH(request, { params }) {
  try {
    await connectDB();
    const { itemId } = await params;
    const body = await request.json();
    const { userId, quantity } = body;
    
    // TODO: Obtener userId del token/sesión
    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Se requiere userId (temporal)' },
        { status: 400 }
      );
    }
    
    if (!quantity || quantity < 1) {
      return NextResponse.json(
        { success: false, error: 'La cantidad debe ser al menos 1' },
        { status: 400 }
      );
    }
    
    const cart = await cartService.updateItemQuantity(userId, itemId, quantity);
    
    return NextResponse.json(
      { success: true, cart },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating cart item:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Error al actualizar item' },
      { status: 400 }
    );
  }
}

/**
 * DELETE /api/cart/items/[itemId]
 * Eliminar un item del carrito
 */
export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const { itemId } = await params;
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    
    // TODO: Obtener userId del token/sesión
    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Se requiere userId (temporal)' },
        { status: 400 }
      );
    }
    
    const cart = await cartService.removeItem(userId, itemId);
    
    return NextResponse.json(
      { success: true, cart },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error removing cart item:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Error al eliminar item' },
      { status: 400 }
    );
  }
}