// app/api/coupons/[id]/route.js
import { NextResponse } from 'next/server';
import couponService from '@/domain/services/CouponService';
import { connectDB } from '@/lib/mongodb';

/**
 * GET /api/coupons/[id]
 * Obtener un cupón por ID (solo admin)
 */
export async function GET(request, { params }) {
  try {
    await connectDB();

    // TODO: Agregar middleware de autenticación
    // const user = await verifyAuth(request);
    // if (user.role !== 'admin') {
    //   return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
    // }

    const { id } = await params;
    const coupon = await couponService.getCouponById(id);

    return NextResponse.json(coupon, { status: 200 });
  } catch (error) {
    console.error('Error fetching coupon:', error);
    return NextResponse.json(
      { error: error.message || 'Error al obtener cupón' },
      { status: error.message.includes('inválido') ? 400 : 404 }
    );
  }
}

/**
 * PUT /api/coupons/[id]
 * Actualizar un cupón (solo admin)
 */
export async function PUT(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;
    const body = await request.json();

    // TODO: Agregar middleware de autenticación
    // const user = await verifyAuth(request);
    // if (user.role !== 'admin') {
    //   return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
    // }

    const coupon = await couponService.updateCoupon(id, body);

    return NextResponse.json(coupon, { status: 200 });
  } catch (error) {
    console.error('Error updating coupon:', error);
    return NextResponse.json(
      { error: error.message || 'Error al actualizar cupón' },
      { status: 400 }
    );
  }
}

/**
 * DELETE /api/coupons/[id]
 * Eliminar un cupón (solo admin)
 */
export async function DELETE(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const permanent = searchParams.get('permanent') === 'true';

    // TODO: Agregar middleware de autenticación
    // const user = await verifyAuth(request);
    // if (user.role !== 'admin') {
    //   return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
    // }

    const result = permanent 
      ? await couponService.permanentDeleteCoupon(id)
      : await couponService.deleteCoupon(id);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('Error deleting coupon:', error);
    return NextResponse.json(
      { error: error.message || 'Error al eliminar cupón' },
      { status: 400 }
    );
  }
}

