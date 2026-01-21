// app/api/coupons/code/[code]/route.js
import { NextResponse } from 'next/server';
import couponService from '@/domain/services/coupon.service.js';
import { connectDB } from '@/lib/mongodb';

/**
 * GET /api/coupons/code/[code]
 * Obtener un cupón por código
 */
export async function GET(request, { params }) {
  try {
    await connectDB();

    const { code } = await params;
    const coupon = await couponService.getCouponByCode(code);

    return NextResponse.json(coupon, { status: 200 });
  } catch (error) {
    console.error('Error fetching coupon by code:', error);
    return NextResponse.json(
      { error: error.message || 'Error al obtener cupón' },
      { status: 404 }
    );
  }
}

