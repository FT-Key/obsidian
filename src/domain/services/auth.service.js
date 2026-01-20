import User from '@/domain/models/User';
import Cart from '@/domain/models/Cart';
import Favorite from '@/domain/models/Favorite';
import { signToken } from '@/lib/jwt';
import mongoose from 'mongoose';

class AuthService {
  /**
   * Registra un nuevo usuario y crea su carrito y favoritos
   */
  async register({ name, email, password, phone }) {
    // Usar sesión de MongoDB para transacción atómica
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // Verificar si el usuario ya existe
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error('El email ya está registrado');
      }

      // Crear usuario
      const [user] = await User.create([{
        name,
        email,
        password_hash: password,
        phone,
        role: 'customer'
      }], { session });

      // Crear carrito vacío para el usuario
      await Cart.create([{
        user: user._id,
        items: []
      }], { session });

      // Crear lista de favoritos vacía para el usuario
      await Favorite.create([{
        user: user._id,
        items: []
      }], { session });

      // Confirmar transacción
      await session.commitTransaction();

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

    } catch (error) {
      // Revertir transacción en caso de error
      await session.abortTransaction();
      throw error;
    } finally {
      // Cerrar sesión
      session.endSession();
    }
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

    // Verificar que el usuario tenga carrito y favoritos
    // Si no existen, crearlos (por si se registró antes de esta actualización)
    const [cart, favorite] = await Promise.all([
      Cart.findOne({ user: user._id }),
      Favorite.findOne({ user: user._id })
    ]);

    if (!cart) {
      await Cart.create({
        user: user._id,
        items: []
      });
    }

    if (!favorite) {
      await Favorite.create({
        user: user._id,
        items: []
      });
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
   * Obtiene un usuario por ID con sus datos relacionados
   */
  async getUserById(userId) {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    // Obtener carrito y favoritos en paralelo
    const [cart, favorite] = await Promise.all([
      Cart.findOne({ user: userId }).populate('items.product'),
      Favorite.findOne({ user: userId }).populate('items.product')
    ]);

    return {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      loyalty_points: user.loyalty_points,
      customer_level: user.customer_level,
      cart: cart ? {
        items: cart.items,
        total: cart.total,
        itemCount: cart.items.length
      } : null,
      favorites: favorite ? {
        items: favorite.items,
        count: favorite.items.length
      } : null
    };
  }

  /**
   * Obtiene el carrito de un usuario
   */
  async getUserCart(userId) {
    const cart = await Cart.findOne({ user: userId })
      .populate({
        path: 'items.product',
        select: 'name price images stock status'
      });

    if (!cart) {
      // Si no existe, crear uno nuevo
      const newCart = await Cart.create({
        user: userId,
        items: []
      });
      return newCart;
    }

    return cart;
  }

  /**
   * Obtiene los favoritos de un usuario
   */
  async getUserFavorites(userId) {
    const favorite = await Favorite.findOne({ user: userId })
      .populate({
        path: 'items.product',
        select: 'name price images stock status'
      });

    if (!favorite) {
      // Si no existe, crear uno nuevo
      const newFavorite = await Favorite.create({
        user: userId,
        items: []
      });
      return newFavorite;
    }

    return favorite;
  }

  /**
   * Elimina un usuario y todos sus datos relacionados
   */
  async deleteUser(userId) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // Eliminar usuario, carrito y favoritos en una transacción
      await Promise.all([
        User.findByIdAndDelete(userId, { session }),
        Cart.findOneAndDelete({ user: userId }, { session }),
        Favorite.findOneAndDelete({ user: userId }, { session })
      ]);

      await session.commitTransaction();
      return { success: true, message: 'Usuario eliminado correctamente' };

    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }
}

// Exportar una instancia singleton
export default new AuthService();