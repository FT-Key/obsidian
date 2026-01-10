import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import authService from '@/domain/services/authService';
import { loginSchema, validate, formatErrors } from '@/domain/validators/user.schema';

export async function POST(request) {
  try {
    await connectDB();
    
    const body = await request.json();

    // Validar con Zod
    const validation = validate(loginSchema, body);
    
    if (!validation.success) {
      return NextResponse.json(
        { 
          error: formatErrors(validation.errors),
          errors: validation.errors
        },
        { status: 400 }
      );
    }

    // Usar datos validados
    const result = await authService.login(validation.data);

    return NextResponse.json({
      success: true,
      message: 'Inicio de sesión exitoso',
      ...result
    }, { status: 200 });

  } catch (error) {
    console.error('Error en login:', error);
    
    if (error.message === 'Credenciales inválidas') {
      return NextResponse.json(
        { error: error.message },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: 'Error al iniciar sesión' },
      { status: 500 }
    );
  }
}