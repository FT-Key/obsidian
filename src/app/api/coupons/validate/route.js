// app/api/coupons/validate/route.js
import { NextResponse } from 'next/server';
import couponService from '@/domain/services/coupon.service.js';
import { connectDB } from '@/lib/mongodb';

/**
 * POST /api/coupons/validate
 * Validar un cupón sin aplicarlo
 */
export async function POST(request) {
  try {
    await connectDB();

    const { code, amount } = await request.json();

    if (!code || amount === undefined) {
      return NextResponse.json(
        { error: 'Se requieren los campos code y amount' },
        { status: 400 }
      );
    }

    const validation = await couponService.validateCoupon(code, amount);

    return NextResponse.json(validation, { status: 200 });
  } catch (error) {
    console.error('Error validating coupon:', error);
    return NextResponse.json(
      { error: error.message || 'Error al validar cupón' },
      { status: 400 }
    );
  }
}

