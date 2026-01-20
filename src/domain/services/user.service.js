// ===================================
// services/UserService.js
// ===================================
import User from '@/domain/models/User';
import Order from '@/domain/models/Order';
import Appointment from '@/domain/models/Appointment';
import PointMovement from '@/domain/models/PointMovement';
import Notification from '@/domain/models/Notification';
import mongoose from 'mongoose';

class UserService {
  /**
   * Obtener perfil del usuario autenticado
   */
  async getProfile(userId) {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new Error('ID de usuario inválido');
    }

    const user = await User.findById(userId)
      .select('-password_hash')
      .lean();

    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    // Obtener estadísticas básicas
    const [orderCount, appointmentCount, pointMovements] = await Promise.all([
      Order.countDocuments({ user: userId }),
      Appointment.countDocuments({ user: userId }),
      PointMovement.find({ user: userId })
        .sort({ date: -1 })
        .limit(10)
        .lean()
    ]);

    return {
      ...user,
      statistics: {
        total_orders: orderCount,
        total_appointments: appointmentCount,
        loyalty_points: user.loyalty_points,
        customer_level: user.customer_level
      },
      recent_point_movements: pointMovements
    };
  }

  /**
   * Actualizar perfil del usuario autenticado
   */
  async updateProfile(userId, updateData) {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new Error('ID de usuario inválido');
    }

    // Campos permitidos para actualizar
    const allowedFields = ['name', 'phone'];
    const filteredData = {};

    Object.keys(updateData).forEach(key => {
      if (allowedFields.includes(key)) {
        filteredData[key] = updateData[key];
      }
    });

    if (Object.keys(filteredData).length === 0) {
      throw new Error('No hay campos válidos para actualizar');
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: filteredData },
      { new: true, runValidators: true }
    ).select('-password_hash');

    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    return user;
  }

  /**
   * Obtener órdenes del usuario
   */
  async getUserOrders(userId, options = {}) {
    const { page = 1, limit = 10, status } = options;
    const skip = (page - 1) * limit;

    const query = { user: userId };
    if (status) query.status = status;

    const [orders, total] = await Promise.all([
      Order.find(query)
        .sort({ created_at: -1 })
        .skip(skip)
        .limit(limit)
        .populate('coupon', 'code type value')
        .lean(),
      Order.countDocuments(query)
    ]);

    return {
      orders,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(total / limit)
      }
    };
  }

  /**
   * Obtener citas del usuario
   */
  async getUserAppointments(userId, options = {}) {
    const { page = 1, limit = 10, status, upcoming = false } = options;
    const skip = (page - 1) * limit;

    const query = { user: userId };
    if (status) query.status = status;
    if (upcoming) query.date = { $gte: new Date() };

    const [appointments, total] = await Promise.all([
      Appointment.find(query)
        .sort({ date: -1 })
        .skip(skip)
        .limit(limit)
        .populate('service', 'name description')
        .lean(),
      Appointment.countDocuments(query)
    ]);

    return {
      appointments,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(total / limit)
      }
    };
  }

  /**
   * Obtener movimientos de puntos del usuario
   */
  async getUserPointMovements(userId, options = {}) {
    const { page = 1, limit = 20 } = options;
    const skip = (page - 1) * limit;

    const [movements, total] = await Promise.all([
      PointMovement.find({ user: userId })
        .sort({ date: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      PointMovement.countDocuments({ user: userId })
    ]);

    return {
      movements,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(total / limit)
      }
    };
  }

  /**
   * Obtener notificaciones del usuario
   */
  async getUserNotifications(userId, options = {}) {
    const { page = 1, limit = 20, unreadOnly = false } = options;
    const skip = (page - 1) * limit;

    const query = { user: userId };
    if (unreadOnly) query.sent = false;

    const [notifications, total] = await Promise.all([
      Notification.find(query)
        .sort({ created_at: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Notification.countDocuments(query)
    ]);

    return {
      notifications,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(total / limit)
      }
    };
  }

  /**
   * Obtener estadísticas completas del usuario
   */
  async getUserStatistics(userId) {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new Error('ID de usuario inválido');
    }

    const user = await User.findById(userId).select('loyalty_points');
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    const [
      totalOrders,
      completedOrders,
      totalSpent,
      totalAppointments,
      completedAppointments,
      pointsEarned,
      pointsSpent
    ] = await Promise.all([
      Order.countDocuments({ user: userId }),
      Order.countDocuments({ user: userId, status: 'delivered' }),
      Order.aggregate([
        { $match: { user: new mongoose.Types.ObjectId(userId), status: 'delivered' } },
        { $group: { _id: null, total: { $sum: '$total' } } }
      ]),
      Appointment.countDocuments({ user: userId }),
      Appointment.countDocuments({ user: userId, status: 'completed' }),
      PointMovement.aggregate([
        { $match: { user: new mongoose.Types.ObjectId(userId), type: 'add' } },
        { $group: { _id: null, total: { $sum: '$points' } } }
      ]),
      PointMovement.aggregate([
        { $match: { user: new mongoose.Types.ObjectId(userId), type: 'subtract' } },
        { $group: { _id: null, total: { $sum: '$points' } } }
      ])
    ]);

    return {
      loyalty: {
        current_points: user.loyalty_points,
        customer_level: user.customer_level,
        points_earned: pointsEarned[0]?.total || 0,
        points_spent: pointsSpent[0]?.total || 0
      },
      orders: {
        total: totalOrders,
        completed: completedOrders,
        total_spent: totalSpent[0]?.total || 0
      },
      appointments: {
        total: totalAppointments,
        completed: completedAppointments
      }
    };
  }

  // ==================== ADMIN METHODS ====================

  /**
   * Listar todos los usuarios (admin)
   */
  async getAllUsers(filters = {}) {
    const {
      role,
      minPoints,
      maxPoints,
      search,
      page = 1,
      limit = 20,
      sortBy = 'created_at',
      sortOrder = 'desc'
    } = filters;

    const query = {};

    if (role) query.role = role;
    if (minPoints !== undefined || maxPoints !== undefined) {
      query.loyalty_points = {};
      if (minPoints !== undefined) query.loyalty_points.$gte = minPoints;
      if (maxPoints !== undefined) query.loyalty_points.$lte = maxPoints;
    }
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (page - 1) * limit;
    const sort = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

    const [users, total] = await Promise.all([
      User.find(query)
        .select('-password_hash')
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean(),
      User.countDocuments(query)
    ]);

    return {
      users,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(total / limit)
      }
    };
  }

  /**
   * Obtener usuario por ID (admin)
   */
  async getUserById(userId) {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new Error('ID de usuario inválido');
    }

    const user = await User.findById(userId)
      .select('-password_hash')
      .lean();

    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    // Obtener estadísticas completas
    const stats = await this.getUserStatistics(userId);

    return {
      ...user,
      statistics: stats
    };
  }

  /**
   * Actualizar usuario (admin)
   */
  async updateUser(userId, updateData) {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new Error('ID de usuario inválido');
    }

    // Campos permitidos para admin
    const allowedFields = ['name', 'phone', 'role', 'loyalty_points'];
    const filteredData = {};

    Object.keys(updateData).forEach(key => {
      if (allowedFields.includes(key)) {
        filteredData[key] = updateData[key];
      }
    });

    if (Object.keys(filteredData).length === 0) {
      throw new Error('No hay campos válidos para actualizar');
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: filteredData },
      { new: true, runValidators: true }
    ).select('-password_hash');

    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    return user;
  }

  /**
   * Eliminar usuario (admin)
   */
  async deleteUser(userId) {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new Error('ID de usuario inválido');
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // Verificar si tiene órdenes o citas
      const [orderCount, appointmentCount] = await Promise.all([
        Order.countDocuments({ user: userId }),
        Appointment.countDocuments({ user: userId })
      ]);

      if (orderCount > 0 || appointmentCount > 0) {
        throw new Error(
          `No se puede eliminar el usuario. Tiene ${orderCount} orden(es) y ${appointmentCount} cita(s) asociadas`
        );
      }

      // Eliminar datos relacionados
      await Promise.all([
        User.findByIdAndDelete(userId, { session }),
        PointMovement.deleteMany({ user: userId }, { session }),
        Notification.deleteMany({ user: userId }, { session })
      ]);

      await session.commitTransaction();

      return {
        success: true,
        message: 'Usuario eliminado correctamente'
      };
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }

  /**
   * Añadir puntos manualmente (admin)
   */
  async addPoints(userId, points, description) {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new Error('ID de usuario inválido');
    }

    if (!points || points <= 0) {
      throw new Error('Los puntos deben ser mayores a 0');
    }

    const user = await User.findById(userId);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    await PointMovement.create({
      user: userId,
      points,
      type: 'add',
      event: 'manual_adjustment',
      description: description || 'Ajuste manual de puntos por administrador',
      metadata: { admin_action: true }
    });

    // El post-save hook del PointMovement actualizará los puntos del usuario

    return {
      success: true,
      message: `${points} puntos añadidos correctamente`
    };
  }

  /**
   * Restar puntos manualmente (admin)
   */
  async subtractPoints(userId, points, description) {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new Error('ID de usuario inválido');
    }

    if (!points || points <= 0) {
      throw new Error('Los puntos deben ser mayores a 0');
    }

    const user = await User.findById(userId);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    if (user.loyalty_points < points) {
      throw new Error('El usuario no tiene suficientes puntos');
    }

    await PointMovement.create({
      user: userId,
      points,
      type: 'subtract',
      event: 'manual_adjustment',
      description: description || 'Ajuste manual de puntos por administrador',
      metadata: { admin_action: true }
    });

    return {
      success: true,
      message: `${points} puntos restados correctamente`
    };
  }

  /**
   * Obtener estadísticas generales de usuarios (admin)
   */
  async getUsersStatistics() {
    const [
      totalUsers,
      customerCount,
      adminCount,
      levelStats,
      topUsers
    ] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ role: 'customer' }),
      User.countDocuments({ role: 'admin' }),
      User.aggregate([
        {
          $addFields: {
            level: {
              $switch: {
                branches: [
                  { case: { $gte: ['$loyalty_points', 500] }, then: 'VIP' },
                  { case: { $gte: ['$loyalty_points', 300] }, then: 'Gold' },
                  { case: { $gte: ['$loyalty_points', 100] }, then: 'Silver' },
                  { case: { $gte: ['$loyalty_points', 0] }, then: 'Regular' }
                ],
                default: 'Regular'
              }
            }
          }
        },
        {
          $group: {
            _id: '$level',
            count: { $sum: 1 }
          }
        }
      ]),
      User.find()
        .select('name email loyalty_points')
        .sort({ loyalty_points: -1 })
        .limit(10)
        .lean()
    ]);

    return {
      total_users: totalUsers,
      by_role: {
        customers: customerCount,
        admins: adminCount
      },
      by_level: levelStats.reduce((acc, item) => {
        acc[item._id] = item.count;
        return acc;
      }, {}),
      top_users: topUsers
    };
  }
}

// Exportar instancia singleton
export default new UserService();