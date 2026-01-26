// ===================================
// api/services/search/route.js
// GET /api/services/search - Búsqueda de servicios
// ===================================

import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Service from '@/domain/models/Service';

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const query = searchParams.get('q');

    if (!query) {
      return NextResponse.json(
        { success: false, error: 'Search query is required' },
        { status: 400 }
      );
    }

    const services = await Service.find({
      active: true,
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } }
      ]
    })
      .limit(10)
      .lean();

    return NextResponse.json({
      success: true,
      data: services
    });

  } catch (error) {
    console.error('Error searching services:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}