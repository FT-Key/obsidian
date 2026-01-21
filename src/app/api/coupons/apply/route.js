// app/api/coupons/apply/route.js
import { NextResponse } from 'next/server';
import couponService from '@/domain/services/coupon.service.js';
import { connectDB } from '@/lib/mongodb';

/**
 * POST /api/coupons/apply
 * Aplicar un cupón (incrementa el contador de usos)
 */
export async function POST(request) {
  try {
    await connectDB();

    // TODO: Agregar middleware de autenticación
    // const user = await verifyAuth(request);
    // if (!user) {
    //   return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
    // }

    const { code, amount } = await request.json();

    if (!code || amount === undefined) {
      return NextResponse.json(
        { error: 'Se requieren los campos code y amount' },
        { status: 400 }
      );
    }

    const result = await couponService.applyCoupon(code, amount);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('Error applying coupon:', error);
    return NextResponse.json(
      { error: error.message || 'Error al aplicar cupón' },
      { status: 400 }
    );
  }
}

