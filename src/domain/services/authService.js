import User from '@/domain/models/User';
import { signToken } from '@/lib/jwt';

class AuthService {
  /**
   * Registra un nuevo usuario
   */
  async register({ name, email, password, phone }) {
    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('El email ya está registrado');
    }

    // Crear usuario
    const user = await User.create({
      name,
      email,
      password_hash: password,
      phone,
      role: 'customer'
    });

    // Generar token
    const token = signToken({ 
      userId: user._id, 
      email: user.email,
      role: user.role 
    });

    // Retornar datos sin el password
    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        loyalty_points: user.loyalty_points,
        customer_level: user.customer_level
      },
      token
    };
  }

  /**
   * Inicia sesión de un usuario
   */
  async login({ email, password }) {
    // Buscar usuario con password
    const user = await User.findOne({ email }).select('+password_hash');
    
    if (!user) {
      throw new Error('Credenciales inválidas');
    }

    // Verificar contraseña
    const isPasswordValid = await user.comparePassword(password);
    
    if (!isPasswordValid) {
      throw new Error('Credenciales inválidas');
    }

    // Generar token
    const token = signToken({ 
      userId: user._id, 
      email: user.email,
      role: user.role 
    });

    // Retornar datos sin el password
    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        loyalty_points: user.loyalty_points,
        customer_level: user.customer_level
      },
      token
    };
  }

  /**
   * Verifica si un email ya está registrado
   */
  async emailExists(email) {
    const user = await User.findOne({ email });
    return !!user;
  }

  /**
   * Obtiene un usuario por ID
   */
  async getUserById(userId) {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    return {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      loyalty_points: user.loyalty_points,
      customer_level: user.customer_level
    };
  }
}

// Exportar una instancia singleton
export default new AuthService();