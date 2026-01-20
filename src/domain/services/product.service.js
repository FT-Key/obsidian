import Product from '@/domain/models/Product';
import Category from '@/domain/models/Category';
import mongoose from 'mongoose';

class ProductService {
  /**
   * Crear un nuevo producto
   */
  async createProduct(productData) {
    const { category, ...data } = productData;

    // Verificar que la categoría existe
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      throw new Error('La categoría no existe');
    }

    if (!categoryExists.active) {
      throw new Error('La categoría no está activa');
    }

    const product = await Product.create({
      ...data,
      category
    });

    return await product.populate('category');
  }

  /**
   * Obtener todos los productos con filtros
   */
  async getProducts(filters = {}) {
    const {
      category,
      featured,
      active = true,
      search,
      minPrice,
      maxPrice,
      inStock,
      page = 1,
      limit = 20,
      sortBy = 'created_at',
      sortOrder = 'desc'
    } = filters;

    const query = {};

    // Filtros básicos
    if (active !== undefined) query.active = active;
    if (featured !== undefined) query.featured = featured;
    if (category) query.category = category;

    // Filtro de búsqueda por texto
    if (search) {
      query.$text = { $search: search };
    }

    // Filtro de rango de precios
    if (minPrice !== undefined || maxPrice !== undefined) {
      query.price = {};
      if (minPrice !== undefined) query.price.$gte = minPrice;
      if (maxPrice !== undefined) query.price.$lte = maxPrice;
    }

    // Filtro de stock disponible
    if (inStock) {
      query.stock = { $gt: 0 };
    }

    // Paginación
    const skip = (page - 1) * limit;

    // Ordenamiento
    const sort = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

    // Ejecutar consulta con paginación
    const [products, total] = await Promise.all([
      Product.find(query)
        .populate('category')
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean(),
      Product.countDocuments(query)
    ]);

    return {
      products,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(total / limit)
      }
    };
  }

  /**
   * Obtener un producto por ID
   */
  async getProductById(productId) {
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      throw new Error('ID de producto inválido');
    }

    const product = await Product.findById(productId).populate('category');

    if (!product) {
      throw new Error('Producto no encontrado');
    }

    return product;
  }

  /**
   * Obtener productos destacados
   */
  async getFeaturedProducts(limit = 8) {
    const products = await Product.find({ 
      featured: true, 
      active: true 
    })
      .populate('category')
      .limit(limit)
      .sort({ created_at: -1 })
      .lean();

    return products;
  }

  /**
   * Obtener productos por categoría
   */
  async getProductsByCategory(categoryId, options = {}) {
    const { page = 1, limit = 20 } = options;

    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      throw new Error('ID de categoría inválido');
    }

    return this.getProducts({
      category: categoryId,
      page,
      limit,
      ...options
    });
  }

  /**
   * Actualizar un producto
   */
  async updateProduct(productId, updateData) {
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      throw new Error('ID de producto inválido');
    }

    // Si se actualiza la categoría, verificar que existe
    if (updateData.category) {
      const categoryExists = await Category.findById(updateData.category);
      if (!categoryExists) {
        throw new Error('La categoría no existe');
      }
    }

    const product = await Product.findByIdAndUpdate(
      productId,
      { $set: updateData },
      { new: true, runValidators: true }
    ).populate('category');

    if (!product) {
      throw new Error('Producto no encontrado');
    }

    return product;
  }

  /**
   * Eliminar un producto (soft delete)
   */
  async deleteProduct(productId) {
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      throw new Error('ID de producto inválido');
    }

    const product = await Product.findByIdAndUpdate(
      productId,
      { $set: { active: false } },
      { new: true }
    );

    if (!product) {
      throw new Error('Producto no encontrado');
    }

    return { success: true, message: 'Producto desactivado correctamente' };
  }

  /**
   * Eliminar permanentemente un producto
   */
  async permanentDeleteProduct(productId) {
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      throw new Error('ID de producto inválido');
    }

    const product = await Product.findByIdAndDelete(productId);

    if (!product) {
      throw new Error('Producto no encontrado');
    }

    return { success: true, message: 'Producto eliminado permanentemente' };
  }

  /**
   * Actualizar stock de un producto
   */
  async updateStock(productId, quantity, variantId = null) {
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      throw new Error('ID de producto inválido');
    }

    const product = await Product.findById(productId);

    if (!product) {
      throw new Error('Producto no encontrado');
    }

    if (variantId) {
      // Actualizar stock de variante
      const variant = product.variants.id(variantId);
      if (!variant) {
        throw new Error('Variante no encontrada');
      }

      variant.stock += quantity;
      if (variant.stock < 0) {
        throw new Error('Stock insuficiente');
      }
    } else {
      // Actualizar stock del producto base
      product.stock += quantity;
      if (product.stock < 0) {
        throw new Error('Stock insuficiente');
      }
    }

    await product.save();
    return product;
  }

  /**
   * Verificar disponibilidad de stock
   */
  async checkStock(productId, quantity, variantId = null) {
    const product = await Product.findById(productId);

    if (!product) {
      throw new Error('Producto no encontrado');
    }

    if (!product.active) {
      return { available: false, reason: 'Producto no disponible' };
    }

    if (variantId) {
      const variant = product.variants.id(variantId);
      if (!variant) {
        return { available: false, reason: 'Variante no encontrada' };
      }
      if (variant.stock < quantity) {
        return { 
          available: false, 
          reason: 'Stock insuficiente',
          available_stock: variant.stock 
        };
      }
      return { available: true, available_stock: variant.stock };
    }

    if (product.stock < quantity) {
      return { 
        available: false, 
        reason: 'Stock insuficiente',
        available_stock: product.stock 
      };
    }

    return { available: true, available_stock: product.stock };
  }

  /**
   * Añadir variante a un producto
   */
  async addVariant(productId, variantData) {
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      throw new Error('ID de producto inválido');
    }

    const product = await Product.findById(productId);

    if (!product) {
      throw new Error('Producto no encontrado');
    }

    product.variants.push(variantData);
    await product.save();

    return product;
  }

  /**
   * Actualizar variante
   */
  async updateVariant(productId, variantId, variantData) {
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      throw new Error('ID de producto inválido');
    }

    const product = await Product.findById(productId);

    if (!product) {
      throw new Error('Producto no encontrado');
    }

    const variant = product.variants.id(variantId);
    if (!variant) {
      throw new Error('Variante no encontrada');
    }

    Object.assign(variant, variantData);
    await product.save();

    return product;
  }

  /**
   * Eliminar variante
   */
  async deleteVariant(productId, variantId) {
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      throw new Error('ID de producto inválido');
    }

    const product = await Product.findById(productId);

    if (!product) {
      throw new Error('Producto no encontrado');
    }

    product.variants.pull(variantId);
    await product.save();

    return product;
  }

  /**
   * Buscar productos (búsqueda avanzada)
   */
  async searchProducts(searchTerm, options = {}) {
    const { limit = 20, page = 1 } = options;

    return this.getProducts({
      search: searchTerm,
      active: true,
      limit,
      page,
      ...options
    });
  }
}

// Exportar instancia singleton
export default new ProductService();