// ===================================
// api/services/active/route.js
// GET /api/services/active - Servicios activos
// ===================================

import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Service from '@/domain/models/Service';

export async function GET() {
  try {
    await connectDB();

    const services = await Service.find({ active: true })
      .sort({ name: 1 })
      .lean();

    return NextResponse.json({
      success: true,
      data: services
    });

  } catch (error) {
    console.error('Error fetching active services:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}