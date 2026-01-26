// ===================================
// api/services/[id]/toggle/route.js
// PATCH /api/services/[id]/toggle - Activar/desactivar
// ===================================

import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Service from '@/domain/models/Service';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function PATCH(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();

    const { id } = params;

    const service = await Service.findById(id);

    if (!service) {
      return NextResponse.json(
        { success: false, error: 'Service not found' },
        { status: 404 }
      );
    }

    service.active = !service.active;
    await service.save();

    return NextResponse.json({
      success: true,
      data: service
    });

  } catch (error) {
    console.error('Error toggling service:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}