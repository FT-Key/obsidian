// app/api/coupons/apply/route.js
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Coupon from '@/domain/models/Coupon';

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();
    const { code, items, service_id, amount, type = 'product' } = body;

    if (!code) {
      return NextResponse.json(
        { error: 'Coupon code is required' },
        { status: 400 }
      );
    }

    // Buscar cupón
    const coupon = await Coupon.findOne({ code: code.toUpperCase() });

    if (!coupon) {
      return NextResponse.json(
        { error: 'Invalid coupon code' },
        { status: 404 }
      );
    }

    // Validar cupón
    if (!coupon.is_valid) {
      return NextResponse.json(
        { error: 'Coupon is not valid or has expired' },
        { status: 400 }
      );
    }

    let totalAmount = 0;
    let discount = 0;

    // PRODUCTOS: Calcular total del carrito
    if (type === 'product' && items && items.length > 0) {
      totalAmount = items.reduce((sum, item) => {
        return sum + (item.price * item.quantity);
      }, 0);
    }
    
    // SERVICIOS: Usar el monto directo
    if (type === 'service' && amount) {
      totalAmount = amount;
    }

    // Validar monto mínimo
    if (totalAmount < coupon.minimum_amount) {
      return NextResponse.json(
        { 
          error: `Minimum amount required: $${coupon.minimum_amount}` 
        },
        { status: 400 }
      );
    }

    // Calcular descuento
    discount = coupon.calculateDiscount(totalAmount);
    const finalAmount = Math.max(0, totalAmount - discount);

    // Incrementar contador de usos
    coupon.uses_count += 1;
    await coupon.save();

    return NextResponse.json({
      success: true,
      data: {
        coupon: {
          code: coupon.code,
          type: coupon.type,
          value: coupon.value
        },
        original_amount: totalAmount,
        discount,
        final_amount: finalAmount,
        savings_percentage: totalAmount > 0 
          ? ((discount / totalAmount) * 100).toFixed(2) 
          : 0
      }
    }, { status: 200 });

  } catch (error) {
    console.error('Error applying coupon:', error);
    return NextResponse.json(
      { error: error.message || 'Error al aplicar cupón' },
      { status: 400 }
    );
  }
}