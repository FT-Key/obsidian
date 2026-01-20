// ===================================
// CartService.js
// ===================================
import Cart from '@/domain/models/Cart';
import Product from '@/domain/models/Product';
import mongoose from 'mongoose';

class CartService {
  /**
   * Obtener el carrito de un usuario
   */
  async getCart(userId) {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new Error('ID de usuario inválido');
    }

    let cart = await Cart.findOne({ user: userId })
      .populate({
        path: 'items.product',
        select: 'name price main_image stock active variants'
      });

    // Si no existe, crear uno nuevo
    if (!cart) {
      cart = await Cart.create({
        user: userId,
        items: []
      });
    }

    return {
      cart_id: cart._id,
      items: cart.items,
      total: cart.total,
      item_count: cart.items.length,
      updated_at: cart.updated_at
    };
  }

  /**
   * Añadir item al carrito
   */
  async addItem(userId, { product_id, variant_id = null, quantity = 1 }) {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new Error('ID de usuario inválido');
    }

    if (!mongoose.Types.ObjectId.isValid(product_id)) {
      throw new Error('ID de producto inválido');
    }

    // Verificar que el producto existe y está activo
    const product = await Product.findById(product_id);
    if (!product) {
      throw new Error('Producto no encontrado');
    }

    if (!product.active) {
      throw new Error('Producto no disponible');
    }

    // Obtener o crear carrito
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = await Cart.create({ user: userId, items: [] });
    }

    // Determinar el precio
    let unit_price = product.price;
    let available_stock = product.stock;

    // Si hay variante, validar y obtener precio/stock de la variante
    if (variant_id) {
      const variant = product.variants.id(variant_id);
      if (!variant) {
        throw new Error('Variante no encontrada');
      }
      unit_price = variant.price;
      available_stock = variant.stock;
    }

    // Verificar stock disponible
    if (available_stock < quantity) {
      throw new Error(`Stock insuficiente. Solo hay ${available_stock} unidades disponibles`);
    }

    // Buscar si el item ya existe en el carrito
    const existingItemIndex = cart.items.findIndex(item =>
      item.product.toString() === product_id &&
      (variant_id ? item.variant_id?.toString() === variant_id : !item.variant_id)
    );

    if (existingItemIndex > -1) {
      // Si existe, actualizar cantidad
      const newQuantity = cart.items[existingItemIndex].quantity + quantity;

      if (available_stock < newQuantity) {
        throw new Error(`Stock insuficiente. Solo hay ${available_stock} unidades disponibles`);
      }

      cart.items[existingItemIndex].quantity = newQuantity;
      cart.items[existingItemIndex].unit_price = unit_price; // Actualizar precio por si cambió
    } else {
      // Si no existe, añadir nuevo item
      cart.items.push({
        product: product_id,
        variant_id,
        quantity,
        unit_price
      });
    }

    await cart.save();

    // Repoblar y retornar
    await cart.populate({
      path: 'items.product',
      select: 'name price main_image stock active variants'
    });

    return {
      cart_id: cart._id,
      items: cart.items,
      total: cart.total,
      item_count: cart.items.length
    };
  }

  /**
   * Actualizar cantidad de un item
   */
  async updateItemQuantity(userId, itemId, quantity) {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new Error('ID de usuario inválido');
    }

    if (quantity < 1) {
      throw new Error('La cantidad debe ser al menos 1');
    }

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      throw new Error('Carrito no encontrado');
    }

    const item = cart.items.id(itemId);
    if (!item) {
      throw new Error('Item no encontrado en el carrito');
    }

    // Verificar stock disponible
    const product = await Product.findById(item.product);
    if (!product) {
      throw new Error('Producto no encontrado');
    }

    let available_stock = product.stock;
    if (item.variant_id) {
      const variant = product.variants.id(item.variant_id);
      if (variant) {
        available_stock = variant.stock;
      }
    }

    if (available_stock < quantity) {
      throw new Error(`Stock insuficiente. Solo hay ${available_stock} unidades disponibles`);
    }

    item.quantity = quantity;
    await cart.save();

    await cart.populate({
      path: 'items.product',
      select: 'name price main_image stock active variants'
    });

    return {
      cart_id: cart._id,
      items: cart.items,
      total: cart.total,
      item_count: cart.items.length
    };
  }

  /**
   * Eliminar item del carrito
   */
  async removeItem(userId, itemId) {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new Error('ID de usuario inválido');
    }

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      throw new Error('Carrito no encontrado');
    }

    cart.items.pull(itemId);
    await cart.save();

    await cart.populate({
      path: 'items.product',
      select: 'name price main_image stock active variants'
    });

    return {
      cart_id: cart._id,
      items: cart.items,
      total: cart.total,
      item_count: cart.items.length
    };
  }

  /**
   * Limpiar todo el carrito
   */
  async clearCart(userId) {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new Error('ID de usuario inválido');
    }

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      throw new Error('Carrito no encontrado');
    }

    cart.items = [];
    await cart.save();

    return {
      success: true,
      message: 'Carrito vaciado correctamente'
    };
  }

  /**
   * Validar disponibilidad de todos los items del carrito
   */
  async validateCart(userId) {
    const cart = await Cart.findOne({ user: userId })
      .populate('items.product');

    if (!cart) {
      throw new Error('Carrito no encontrado');
    }

    const validation = {
      valid: true,
      issues: []
    };

    for (const item of cart.items) {
      if (!item.product) {
        validation.valid = false;
        validation.issues.push({
          item_id: item._id,
          issue: 'Producto no encontrado'
        });
        continue;
      }

      if (!item.product.active) {
        validation.valid = false;
        validation.issues.push({
          item_id: item._id,
          product_name: item.product.name,
          issue: 'Producto no disponible'
        });
        continue;
      }

      let available_stock = item.product.stock;
      if (item.variant_id) {
        const variant = item.product.variants.id(item.variant_id);
        if (!variant) {
          validation.valid = false;
          validation.issues.push({
            item_id: item._id,
            product_name: item.product.name,
            issue: 'Variante no encontrada'
          });
          continue;
        }
        available_stock = variant.stock;
      }

      if (available_stock < item.quantity) {
        validation.valid = false;
        validation.issues.push({
          item_id: item._id,
          product_name: item.product.name,
          requested: item.quantity,
          available: available_stock,
          issue: 'Stock insuficiente'
        });
      }
    }

    return validation;
  }
}

export const cartService = new CartService();