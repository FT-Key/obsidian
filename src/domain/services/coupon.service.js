import Coupon from '@/domain/models/Coupon';
import mongoose from 'mongoose';

class CouponService {
  /**
   * Crear un nuevo cupón
   */
  async createCoupon(couponData) {
    const { 
      code, 
      type, 
      value, 
      minimum_amount = 0,
      max_uses = null,
      start_date = new Date(),
      end_date 
    } = couponData;

    // Validar código único
    const existingCoupon = await Coupon.findOne({ 
      code: code.toUpperCase() 
    });

    if (existingCoupon) {
      throw new Error('Ya existe un cupón con ese código');
    }

    // Validar tipo de cupón
    if (!['percentage', 'fixed'].includes(type)) {
      throw new Error('Tipo de cupón inválido. Debe ser "percentage" o "fixed"');
    }

    // Validar valor según tipo
    if (type === 'percentage' && (value <= 0 || value > 100)) {
      throw new Error('El porcentaje debe estar entre 1 y 100');
    }

    if (type === 'fixed' && value <= 0) {
      throw new Error('El valor fijo debe ser mayor a 0');
    }

    // Validar fechas
    if (new Date(start_date) >= new Date(end_date)) {
      throw new Error('La fecha de inicio debe ser anterior a la fecha de fin');
    }

    const coupon = await Coupon.create({
      code: code.toUpperCase(),
      type,
      value,
      minimum_amount,
      max_uses,
      uses_count: 0,
      start_date,
      end_date,
      active: true
    });

    return coupon;
  }

  /**
   * Obtener todos los cupones con filtros
   */
  async getCoupons(filters = {}) {
    const {
      active,
      type,
      valid, // Solo cupones válidos (vigentes y con usos disponibles)
      page = 1,
      limit = 20,
      sortBy = 'created_at',
      sortOrder = 'desc'
    } = filters;

    const query = {};

    // Filtros básicos
    if (active !== undefined) query.active = active;
    if (type) query.type = type;

    // Filtro de cupones válidos
    if (valid) {
      const now = new Date();
      query.active = true;
      query.start_date = { $lte: now };
      query.end_date = { $gte: now };
    }

    // Paginación
    const skip = (page - 1) * limit;

    // Ordenamiento
    const sort = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

    const [coupons, total] = await Promise.all([
      Coupon.find(query)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean(),
      Coupon.countDocuments(query)
    ]);

    // Añadir información de validez
    const couponsWithValidation = coupons.map(coupon => {
      const now = new Date();
      const isValid = coupon.active &&
        now >= new Date(coupon.start_date) &&
        now <= new Date(coupon.end_date) &&
        (coupon.max_uses === null || coupon.uses_count < coupon.max_uses);

      return {
        ...coupon,
        is_valid: isValid,
        remaining_uses: coupon.max_uses ? coupon.max_uses - coupon.uses_count : null
      };
    });

    return {
      coupons: couponsWithValidation,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(total / limit)
      }
    };
  }

  /**
   * Obtener cupón por ID
   */
  async getCouponById(couponId) {
    if (!mongoose.Types.ObjectId.isValid(couponId)) {
      throw new Error('ID de cupón inválido');
    }

    const coupon = await Coupon.findById(couponId).lean();

    if (!coupon) {
      throw new Error('Cupón no encontrado');
    }

    const now = new Date();
    const isValid = coupon.active &&
      now >= new Date(coupon.start_date) &&
      now <= new Date(coupon.end_date) &&
      (coupon.max_uses === null || coupon.uses_count < coupon.max_uses);

    return {
      ...coupon,
      is_valid: isValid,
      remaining_uses: coupon.max_uses ? coupon.max_uses - coupon.uses_count : null
    };
  }

  /**
   * Obtener cupón por código
   */
  async getCouponByCode(code) {
    const coupon = await Coupon.findOne({ 
      code: code.toUpperCase() 
    }).lean();

    if (!coupon) {
      throw new Error('Cupón no encontrado');
    }

    const now = new Date();
    const isValid = coupon.active &&
      now >= new Date(coupon.start_date) &&
      now <= new Date(coupon.end_date) &&
      (coupon.max_uses === null || coupon.uses_count < coupon.max_uses);

    return {
      ...coupon,
      is_valid: isValid,
      remaining_uses: coupon.max_uses ? coupon.max_uses - coupon.uses_count : null
    };
  }

  /**
   * Validar un cupón para un monto específico
   */
  async validateCoupon(code, amount) {
    const coupon = await Coupon.findOne({ 
      code: code.toUpperCase() 
    });

    if (!coupon) {
      return {
        valid: false,
        message: 'Cupón no encontrado'
      };
    }

    // Verificar si está activo
    if (!coupon.active) {
      return {
        valid: false,
        message: 'Cupón inactivo'
      };
    }

    // Verificar fechas
    const now = new Date();
    if (now < coupon.start_date) {
      return {
        valid: false,
        message: 'Cupón aún no está vigente'
      };
    }

    if (now > coupon.end_date) {
      return {
        valid: false,
        message: 'Cupón expirado'
      };
    }

    // Verificar usos máximos
    if (coupon.max_uses !== null && coupon.uses_count >= coupon.max_uses) {
      return {
        valid: false,
        message: 'Cupón agotado'
      };
    }

    // Verificar monto mínimo
    if (amount < coupon.minimum_amount) {
      return {
        valid: false,
        message: `Monto mínimo requerido: $${coupon.minimum_amount}`,
        minimum_amount: coupon.minimum_amount
      };
    }

    // Calcular descuento
    const discount = coupon.calculateDiscount(amount);

    return {
      valid: true,
      coupon: {
        id: coupon._id,
        code: coupon.code,
        type: coupon.type,
        value: coupon.value
      },
      discount,
      final_amount: amount - discount
    };
  }

  /**
   * Aplicar/usar un cupón (incrementar contador de usos)
   */
  async applyCoupon(code, amount) {
    // Primero validar
    const validation = await this.validateCoupon(code, amount);

    if (!validation.valid) {
      throw new Error(validation.message);
    }

    // Incrementar contador de usos
    const coupon = await Coupon.findOneAndUpdate(
      { code: code.toUpperCase() },
      { $inc: { uses_count: 1 } },
      { new: true }
    );

    return {
      coupon: {
        id: coupon._id,
        code: coupon.code,
        type: coupon.type,
        value: coupon.value
      },
      discount: validation.discount,
      final_amount: validation.final_amount,
      uses_count: coupon.uses_count
    };
  }

  /**
   * Actualizar un cupón
   */
  async updateCoupon(couponId, updateData) {
    if (!mongoose.Types.ObjectId.isValid(couponId)) {
      throw new Error('ID de cupón inválido');
    }

    // Si se actualiza el código, verificar que no exista otro con ese código
    if (updateData.code) {
      const existingCoupon = await Coupon.findOne({
        code: updateData.code.toUpperCase(),
        _id: { $ne: couponId }
      });

      if (existingCoupon) {
        throw new Error('Ya existe otro cupón con ese código');
      }

      updateData.code = updateData.code.toUpperCase();
    }

    // Validar tipo y valor si se actualizan
    if (updateData.type && !['percentage', 'fixed'].includes(updateData.type)) {
      throw new Error('Tipo de cupón inválido');
    }

    if (updateData.type === 'percentage' && updateData.value && (updateData.value <= 0 || updateData.value > 100)) {
      throw new Error('El porcentaje debe estar entre 1 y 100');
    }

    if (updateData.type === 'fixed' && updateData.value && updateData.value <= 0) {
      throw new Error('El valor fijo debe ser mayor a 0');
    }

    const coupon = await Coupon.findByIdAndUpdate(
      couponId,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!coupon) {
      throw new Error('Cupón no encontrado');
    }

    return coupon;
  }

  /**
   * Eliminar un cupón (soft delete)
   */
  async deleteCoupon(couponId) {
    if (!mongoose.Types.ObjectId.isValid(couponId)) {
      throw new Error('ID de cupón inválido');
    }

    const coupon = await Coupon.findByIdAndUpdate(
      couponId,
      { $set: { active: false } },
      { new: true }
    );

    if (!coupon) {
      throw new Error('Cupón no encontrado');
    }

    return { 
      success: true, 
      message: 'Cupón desactivado correctamente' 
    };
  }

  /**
   * Eliminar permanentemente un cupón
   */
  async permanentDeleteCoupon(couponId) {
    if (!mongoose.Types.ObjectId.isValid(couponId)) {
      throw new Error('ID de cupón inválido');
    }

    const coupon = await Coupon.findByIdAndDelete(couponId);

    if (!coupon) {
      throw new Error('Cupón no encontrado');
    }

    return { 
      success: true, 
      message: 'Cupón eliminado permanentemente' 
    };
  }

  /**
   * Activar/Desactivar cupón
   */
  async toggleCouponStatus(couponId) {
    if (!mongoose.Types.ObjectId.isValid(couponId)) {
      throw new Error('ID de cupón inválido');
    }

    const coupon = await Coupon.findById(couponId);

    if (!coupon) {
      throw new Error('Cupón no encontrado');
    }

    coupon.active = !coupon.active;
    await coupon.save();

    return coupon;
  }

  /**
   * Obtener estadísticas de cupones
   */
  async getCouponStats() {
    const now = new Date();

    const [
      totalCoupons,
      activeCoupons,
      validCoupons,
      expiredCoupons,
      usageStats
    ] = await Promise.all([
      Coupon.countDocuments(),
      Coupon.countDocuments({ active: true }),
      Coupon.countDocuments({
        active: true,
        start_date: { $lte: now },
        end_date: { $gte: now }
      }),
      Coupon.countDocuments({
        end_date: { $lt: now }
      }),
      Coupon.aggregate([
        {
          $group: {
            _id: null,
            totalUses: { $sum: '$uses_count' },
            averageUses: { $avg: '$uses_count' }
          }
        }
      ])
    ]);

    const mostUsedCoupons = await Coupon.find()
      .sort({ uses_count: -1 })
      .limit(5)
      .select('code type value uses_count max_uses')
      .lean();

    return {
      totalCoupons,
      activeCoupons,
      inactiveCoupons: totalCoupons - activeCoupons,
      validCoupons,
      expiredCoupons,
      totalUses: usageStats[0]?.totalUses || 0,
      averageUses: Math.round(usageStats[0]?.averageUses || 0),
      mostUsedCoupons
    };
  }

  /**
   * Limpiar cupones expirados (desactivarlos automáticamente)
   */
  async cleanExpiredCoupons() {
    const now = new Date();

    const result = await Coupon.updateMany(
      {
        end_date: { $lt: now },
        active: true
      },
      {
        $set: { active: false }
      }
    );

    return {
      success: true,
      message: `${result.modifiedCount} cupón(es) expirado(s) desactivado(s)`
    };
  }
}

// Exportar instancia singleton
export default new CouponService();