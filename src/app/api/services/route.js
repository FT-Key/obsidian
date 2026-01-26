// ===================================
// api/services/route.js
// GET /api/services - Listar servicios
// POST /api/services - Crear servicio
// ===================================
import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Service from '@/domain/models/Service';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

// GET - Listar servicios con filtros y paginación
export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const active = searchParams.get('active');
    const search = searchParams.get('search');
    const sort = searchParams.get('sort') || '-created_at';

    const skip = (page - 1) * limit;

    // Construir filtros
    const filters = {};
    
    if (active !== null && active !== undefined) {
      filters.active = active === 'true';
    }

    if (search) {
      filters.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // Obtener servicios
    const services = await Service.find(filters)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean();

    // Contar total
    const total = await Service.countDocuments(filters);

    return NextResponse.json({
      success: true,
      data: services,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// POST - Crear nuevo servicio (solo admin)
export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();

    const body = await req.json();
    const {
      name,
      description,
      base_price,
      duration_minutes,
      main_image,
      images,
      active
    } = body;

    // Validaciones
    if (!name || !description || !base_price || !duration_minutes) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Crear servicio
    const service = await Service.create({
      name,
      description,
      base_price,
      duration_minutes,
      main_image,
      images: images || [],
      active: active !== undefined ? active : true
    });

    return NextResponse.json({
      success: true,
      data: service
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating service:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}