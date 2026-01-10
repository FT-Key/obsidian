import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import authService from '@/domain/services/authService';
import { registerSchema, validate, formatErrors } from '@/domain/validators/user.schema';

export async function POST(request) {
  try {
    await connectDB();
    
    const body = await request.json();

    // Validar con Zod
    const validation = validate(registerSchema, body);
    
    if (!validation.success) {
      return NextResponse.json(
        { 
          error: formatErrors(validation.errors),
          errors: validation.errors // Opcional: errores por campo
        },
        { status: 400 }
      );
    }

    // Usar datos validados y sanitizados
    const result = await authService.register(validation.data);

    return NextResponse.json({
      success: true,
      message: 'Usuario registrado exitosamente',
      ...result
    }, { status: 201 });

  } catch (error) {
    console.error('Error en registro:', error);
    
    if (error.message === 'El email ya está registrado') {
      return NextResponse.json(
        { error: error.message },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Error al registrar usuario' },
      { status: 500 }
    );
  }
}