import { z } from 'zod';

// ============================================
// SCHEMAS DE VALIDACIÓN DE USUARIO
// ============================================

/**
 * Schema para registro de usuario
 */
export const registerSchema = z.object({
  name: z
    .string({
      required_error: 'El nombre es obligatorio',
      invalid_type_error: 'El nombre debe ser texto'
    })
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'El nombre no puede exceder 100 caracteres')
    .trim(),

  email: z
    .string({
      required_error: 'El email es obligatorio',
      invalid_type_error: 'El email debe ser texto'
    })
    .email('Email inválido')
    .toLowerCase()
    .trim(),

  password: z
    .string({
      required_error: 'La contraseña es obligatoria'
    })
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .max(100, 'La contraseña no puede exceder 100 caracteres'),

  phone: z
    .string({
      required_error: 'El teléfono es obligatorio'
    })
    .min(7, 'El teléfono debe tener al menos 7 dígitos')
    .max(20, 'El teléfono no puede exceder 20 caracteres')
    .trim()
    .regex(/^[0-9+\s()-]+$/, 'El teléfono solo puede contener números, espacios, paréntesis, guiones y el símbolo +')
});

/**
 * Schema para login de usuario
 */
export const loginSchema = z.object({
  email: z
    .string({
      required_error: 'El email es obligatorio',
      invalid_type_error: 'El email debe ser texto'
    })
    .email('Email inválido')
    .toLowerCase()
    .trim(),

  password: z
    .string({
      required_error: 'La contraseña es obligatoria'
    })
    .min(1, 'La contraseña es obligatoria')
});

/**
 * Schema para actualizar perfil (campos opcionales)
 */
export const updateProfileSchema = z.object({
  name: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'El nombre no puede exceder 100 caracteres')
    .trim()
    .optional(),

  phone: z
    .string()
    .min(7, 'El teléfono debe tener al menos 7 dígitos')
    .max(20, 'El teléfono no puede exceder 20 caracteres')
    .trim()
    .regex(/^[0-9+\s()-]+$/, 'El teléfono solo puede contener números, espacios, paréntesis, guiones y el símbolo +')
    .optional(),

  email: z
    .string()
    .email('Email inválido')
    .toLowerCase()
    .trim()
    .optional()
}).refine((data) => Object.keys(data).length > 0, {
  message: 'Debes proporcionar al menos un campo para actualizar'
});

/**
 * Schema para cambiar contraseña
 */
export const changePasswordSchema = z.object({
  currentPassword: z
    .string({
      required_error: 'La contraseña actual es obligatoria'
    })
    .min(1, 'La contraseña actual es obligatoria'),

  newPassword: z
    .string({
      required_error: 'La nueva contraseña es obligatoria'
    })
    .min(6, 'La nueva contraseña debe tener al menos 6 caracteres')
    .max(100, 'La nueva contraseña no puede exceder 100 caracteres'),

  confirmPassword: z
    .string({
      required_error: 'Debes confirmar la nueva contraseña'
    })
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmPassword']
});

/**
 * Schema para recuperar contraseña
 */
export const forgotPasswordSchema = z.object({
  email: z
    .string({
      required_error: 'El email es obligatorio'
    })
    .email('Email inválido')
    .toLowerCase()
    .trim()
});

/**
 * Schema para resetear contraseña
 */
export const resetPasswordSchema = z.object({
  token: z
    .string({
      required_error: 'El token es obligatorio'
    })
    .min(1, 'Token inválido'),

  password: z
    .string({
      required_error: 'La contraseña es obligatoria'
    })
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .max(100, 'La contraseña no puede exceder 100 caracteres'),

  confirmPassword: z
    .string({
      required_error: 'Debes confirmar la contraseña'
    })
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmPassword']
});

// ============================================
// FUNCIONES HELPER DE VALIDACIÓN
// ============================================

/**
 * Valida datos contra un schema de Zod
 * @param {ZodSchema} schema - Schema de Zod
 * @param {Object} data - Datos a validar
 * @returns {Object} - { success: boolean, data?: Object, errors?: Array }
 */
export function validate(schema, data) {
  try {
    const validatedData = schema.parse(data);
    return {
      success: true,
      data: validatedData
    };
  } catch (error) {
    if (error.errors) {
      const errors = error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message
      }));
      
      return {
        success: false,
        errors
      };
    }
    
    return {
      success: false,
      errors: [{ field: 'unknown', message: 'Error de validación' }]
    };
  }
}

/**
 * Formatea los errores de validación en un mensaje legible
 * @param {Array} errors - Array de errores
 * @returns {string} - Mensaje de error formateado
 */
export function formatErrors(errors) {
  if (!errors || errors.length === 0) return 'Error de validación';
  return errors.map(err => err.message).join(', ');
}

/**
 * Obtiene el primer error de validación
 * @param {Array} errors - Array de errores
 * @returns {string} - Primer mensaje de error
 */
export function getFirstError(errors) {
  if (!errors || errors.length === 0) return 'Error de validación';
  return errors[0].message;
}

/**
 * Valida y retorna solo el mensaje de error si falla
 * @param {ZodSchema} schema - Schema de Zod
 * @param {Object} data - Datos a validar
 * @returns {Object} - { success: boolean, data?: Object, error?: string }
 */
export function validateWithMessage(schema, data) {
  const result = validate(schema, data);
  
  if (result.success) {
    return result;
  }
  
  return {
    success: false,
    error: formatErrors(result.errors)
  };
}