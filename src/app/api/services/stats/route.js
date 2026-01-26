// ===================================
// api/services/stats/route.js
// GET /api/services/stats - Estadísticas
// ===================================

import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Service from '@/domain/models/Service';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();

    const [total, active, inactive, avgPrice, avgDuration] = await Promise.all([
      Service.countDocuments(),
      Service.countDocuments({ active: true }),
      Service.countDocuments({ active: false }),
      Service.aggregate([
        { $group: { _id: null, avg: { $avg: '$base_price' } } }
      ]),
      Service.aggregate([
        { $group: { _id: null, avg: { $avg: '$duration_minutes' } } }
      ])
    ]);

    return NextResponse.json({
      success: true,
      data: {
        total,
        active,
        inactive,
        average_price: avgPrice[0]?.avg || 0,
        average_duration: avgDuration[0]?.avg || 0
      }
    });

  } catch (error) {
    console.error('Error fetching service stats:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}