// ===================================
// FavoriteService.js
// ===================================
import mongoose from 'mongoose';
import Favorite from '@/domain/models/Favorite';
import Product from '@/domain/models/Product';

class FavoriteService {
  /**
   * Obtener favoritos de un usuario
   */
  async getFavorites(userId) {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new Error('ID de usuario inválido');
    }

    let favorite = await Favorite.findOne({ user: userId })
      .populate({
        path: 'items.product',
        select: 'name price main_image stock active featured'
      });

    // Si no existe, crear uno nuevo
    if (!favorite) {
      favorite = await Favorite.create({
        user: userId,
        items: []
      });
    }

    return {
      favorite_id: favorite._id,
      items: favorite.items,
      item_count: favorite.items.length,
      created_at: favorite.created_at
    };
  }

  /**
   * Añadir producto a favoritos
   */
  async addFavorite(userId, product_id) {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new Error('ID de usuario inválido');
    }

    if (!mongoose.Types.ObjectId.isValid(product_id)) {
      throw new Error('ID de producto inválido');
    }

    // Verificar que el producto existe
    const product = await Product.findById(product_id);
    if (!product) {
      throw new Error('Producto no encontrado');
    }

    // Obtener o crear lista de favoritos
    let favorite = await Favorite.findOne({ user: userId });
    if (!favorite) {
      favorite = await Favorite.create({ user: userId, items: [] });
    }

    // Verificar si ya está en favoritos
    const exists = favorite.items.some(
      item => item.product.toString() === product_id
    );

    if (exists) {
      throw new Error('El producto ya está en favoritos');
    }

    // Añadir a favoritos
    favorite.items.push({
      product: product_id,
      added_at: new Date()
    });

    await favorite.save();

    // Repoblar y retornar
    await favorite.populate({
      path: 'items.product',
      select: 'name price main_image stock active featured'
    });

    return {
      favorite_id: favorite._id,
      items: favorite.items,
      item_count: favorite.items.length
    };
  }

  /**
   * Eliminar producto de favoritos
   */
  async removeFavorite(userId, itemId) {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new Error('ID de usuario inválido');
    }

    const favorite = await Favorite.findOne({ user: userId });
    if (!favorite) {
      throw new Error('Lista de favoritos no encontrada');
    }

    const itemExists = favorite.items.id(itemId);
    if (!itemExists) {
      throw new Error('Item no encontrado en favoritos');
    }

    favorite.items.pull(itemId);
    await favorite.save();

    await favorite.populate({
      path: 'items.product',
      select: 'name price main_image stock active featured'
    });

    return {
      favorite_id: favorite._id,
      items: favorite.items,
      item_count: favorite.items.length
    };
  }

  /**
   * Verificar si un producto está en favoritos
   */
  async isFavorite(userId, product_id) {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new Error('ID de usuario inválido');
    }

    const favorite = await Favorite.findOne({ user: userId });
    if (!favorite) {
      return { is_favorite: false };
    }

    const exists = favorite.items.some(
      item => item.product.toString() === product_id
    );

    return { is_favorite: exists };
  }

  /**
   * Limpiar todos los favoritos
   */
  async clearFavorites(userId) {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new Error('ID de usuario inválido');
    }

    const favorite = await Favorite.findOne({ user: userId });
    if (!favorite) {
      throw new Error('Lista de favoritos no encontrada');
    }

    favorite.items = [];
    await favorite.save();

    return {
      success: true,
      message: 'Favoritos eliminados correctamente'
    };
  }

  /**
   * Mover favorito al carrito
   */
  async moveToCart(userId, itemId) {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new Error('ID de usuario inválido');
    }

    const favorite = await Favorite.findOne({ user: userId });
    if (!favorite) {
      throw new Error('Lista de favoritos no encontrada');
    }

    const item = favorite.items.id(itemId);
    if (!item) {
      throw new Error('Item no encontrado en favoritos');
    }

    const product_id = item.product.toString();

    // Usar CartService para añadir al carrito
    const cartService = new CartService();
    await cartService.addItem(userId, {
      product_id,
      quantity: 1
    });

    // Eliminar de favoritos
    favorite.items.pull(itemId);
    await favorite.save();

    return {
      success: true,
      message: 'Producto movido al carrito'
    };
  }
}

// Exportar instancias singleton
export const favoriteService = new FavoriteService();