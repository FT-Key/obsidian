// app/api/coupons/cleanup/route.js
import { NextResponse } from 'next/server';
import couponService from '@/domain/services/coupon.service.js';
import { connectDB } from '@/lib/mongodb';

/**
 * POST /api/coupons/cleanup
 * Limpiar cupones expirados (desactivarlos automáticamente) - solo admin
 */
export async function POST(request) {
  try {
    await connectDB();

    // TODO: Agregar middleware de autenticación
    // const user = await verifyAuth(request);
    // if (user.role !== 'admin') {
    //   return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
    // }

    const result = await couponService.cleanExpiredCoupons();

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('Error cleaning expired coupons:', error);
    return NextResponse.json(
      { error: error.message || 'Error al limpiar cupones expirados' },
      { status: 500 }
    );
  }
}