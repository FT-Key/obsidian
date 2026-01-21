// app/api/coupons/stats/route.js
import { NextResponse } from 'next/server';
import couponService from '@/domain/services/coupon.service.js';
import { connectDB } from '@/lib/mongodb';

/**
 * GET /api/coupons/stats
 * Obtener estadísticas de cupones (solo admin)
 */
export async function GET(request) {
  try {
    await connectDB();

    // TODO: Agregar middleware de autenticación
    // const user = await verifyAuth(request);
    // if (user.role !== 'admin') {
    //   return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
    // }

    const stats = await couponService.getCouponStats();

    return NextResponse.json(stats, { status: 200 });
  } catch (error) {
    console.error('Error fetching coupon stats:', error);
    return NextResponse.json(
      { error: error.message || 'Error al obtener estadísticas' },
      { status: 500 }
    );
  }
}

