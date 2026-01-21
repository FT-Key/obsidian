// app/api/coupons/[id]/toggle/route.js
import { NextResponse } from 'next/server';
import couponService from '@/domain/services/coupon.service.js';
import { connectDB } from '@/lib/mongodb';

/**
 * PATCH /api/coupons/[id]/toggle
 * Activar/Desactivar un cupón (solo admin)
 */
export async function PATCH(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    // TODO: Agregar middleware de autenticación
    // const user = await verifyAuth(request);
    // if (user.role !== 'admin') {
    //   return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
    // }

    const coupon = await couponService.toggleCouponStatus(id);

    return NextResponse.json(coupon, { status: 200 });
  } catch (error) {
    console.error('Error toggling coupon status:', error);
    return NextResponse.json(
      { error: error.message || 'Error al cambiar estado del cupón' },
      { status: 400 }
    );
  }
}

