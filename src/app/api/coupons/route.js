// app/api/coupons/route.js
import { NextResponse } from 'next/server';
import couponService from '@/domain/services/CouponService';
import { connectDB } from '@/lib/mongodb';

/**
 * GET /api/coupons
 * Obtener todos los cupones con filtros (solo admin)
 */
export async function GET(request) {
  try {
    await connectDB();

    // TODO: Agregar middleware de autenticación
    // const user = await verifyAuth(request);
    // if (user.role !== 'admin') {
    //   return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
    // }

    const { searchParams } = new URL(request.url);
    
    const filters = {
      active: searchParams.get('active') === 'false' ? false : 
              searchParams.get('active') === 'true' ? true : undefined,
      type: searchParams.get('type'),
      valid: searchParams.get('valid') === 'true',
      page: searchParams.get('page') || 1,
      limit: searchParams.get('limit') || 20,
      sortBy: searchParams.get('sortBy') || 'created_at',
      sortOrder: searchParams.get('sortOrder') || 'desc'
    };

    const result = await couponService.getCoupons(filters);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('Error fetching coupons:', error);
    return NextResponse.json(
      { error: error.message || 'Error al obtener cupones' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/coupons
 * Crear un nuevo cupón (solo admin)
 */
export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();
    
    // TODO: Agregar middleware de autenticación y verificar rol admin
    // const user = await verifyAuth(request);
    // if (user.role !== 'admin') {
    //   return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
    // }

    const coupon = await couponService.createCoupon(body);

    return NextResponse.json(coupon, { status: 201 });
  } catch (error) {
    console.error('Error creating coupon:', error);
    return NextResponse.json(
      { error: error.message || 'Error al crear cupón' },
      { status: 400 }
    );
  }
}

