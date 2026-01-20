import Category from '@/domain/models/Category';
import Product from '@/domain/models/Product';
import mongoose from 'mongoose';

class CategoryService {
  /**
   * Crear una nueva categoría
   */
  async createCategory(categoryData) {
    const { name, description } = categoryData;

    // Verificar si ya existe una categoría con ese nombre
    const existingCategory = await Category.findOne({ 
      name: { $regex: new RegExp(`^${name}$`, 'i') } 
    });

    if (existingCategory) {
      throw new Error('Ya existe una categoría con ese nombre');
    }

    const category = await Category.create({
      name,
      description,
      active: true
    });

    return category;
  }

  /**
   * Obtener todas las categorías
   */
  async getCategories(filters = {}) {
    const { 
      active,
      page = 1, 
      limit = 50,
      sortBy = 'name',
      sortOrder = 'asc'
    } = filters;

    const query = {};
    
    // Filtro de activas/inactivas
    if (active !== undefined) {
      query.active = active;
    }

    // Paginación
    const skip = (page - 1) * limit;

    // Ordenamiento
    const sort = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

    const [categories, total] = await Promise.all([
      Category.find(query)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean(),
      Category.countDocuments(query)
    ]);

    // Contar productos por categoría
    const categoriesWithCounts = await Promise.all(
      categories.map(async (category) => {
        const productCount = await Product.countDocuments({ 
          category: category._id,
          active: true 
        });
        
        return {
          ...category,
          productCount
        };
      })
    );

    return {
      categories: categoriesWithCounts,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(total / limit)
      }
    };
  }

  /**
   * Obtener categorías activas
   */
  async getActiveCategories() {
    const categories = await Category.find({ active: true })
      .sort({ name: 1 })
      .lean();

    // Contar productos activos por categoría
    const categoriesWithCounts = await Promise.all(
      categories.map(async (category) => {
        const productCount = await Product.countDocuments({ 
          category: category._id,
          active: true 
        });
        
        return {
          ...category,
          productCount
        };
      })
    );

    return categoriesWithCounts;
  }

  /**
   * Obtener una categoría por ID
   */
  async getCategoryById(categoryId) {
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      throw new Error('ID de categoría inválido');
    }

    const category = await Category.findById(categoryId).lean();

    if (!category) {
      throw new Error('Categoría no encontrada');
    }

    // Contar productos
    const productCount = await Product.countDocuments({ 
      category: categoryId,
      active: true 
    });

    return {
      ...category,
      productCount
    };
  }

  /**
   * Obtener categoría por nombre
   */
  async getCategoryByName(name) {
    const category = await Category.findOne({ 
      name: { $regex: new RegExp(`^${name}$`, 'i') } 
    }).lean();

    if (!category) {
      throw new Error('Categoría no encontrada');
    }

    // Contar productos
    const productCount = await Product.countDocuments({ 
      category: category._id,
      active: true 
    });

    return {
      ...category,
      productCount
    };
  }

  /**
   * Actualizar una categoría
   */
  async updateCategory(categoryId, updateData) {
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      throw new Error('ID de categoría inválido');
    }

    // Si se actualiza el nombre, verificar que no exista otra con ese nombre
    if (updateData.name) {
      const existingCategory = await Category.findOne({
        name: { $regex: new RegExp(`^${updateData.name}$`, 'i') },
        _id: { $ne: categoryId }
      });

      if (existingCategory) {
        throw new Error('Ya existe otra categoría con ese nombre');
      }
    }

    const category = await Category.findByIdAndUpdate(
      categoryId,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!category) {
      throw new Error('Categoría no encontrada');
    }

    return category;
  }

  /**
   * Eliminar una categoría (soft delete)
   */
  async deleteCategory(categoryId) {
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      throw new Error('ID de categoría inválido');
    }

    // Verificar si tiene productos asociados
    const productCount = await Product.countDocuments({ 
      category: categoryId 
    });

    if (productCount > 0) {
      throw new Error(
        `No se puede eliminar la categoría porque tiene ${productCount} producto(s) asociado(s)`
      );
    }

    const category = await Category.findByIdAndUpdate(
      categoryId,
      { $set: { active: false } },
      { new: true }
    );

    if (!category) {
      throw new Error('Categoría no encontrada');
    }

    return { 
      success: true, 
      message: 'Categoría desactivada correctamente' 
    };
  }

  /**
   * Eliminar permanentemente una categoría
   */
  async permanentDeleteCategory(categoryId) {
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      throw new Error('ID de categoría inválido');
    }

    // Verificar si tiene productos asociados
    const productCount = await Product.countDocuments({ 
      category: categoryId 
    });

    if (productCount > 0) {
      throw new Error(
        `No se puede eliminar la categoría porque tiene ${productCount} producto(s) asociado(s). ` +
        `Primero debe eliminar o reasignar los productos.`
      );
    }

    const category = await Category.findByIdAndDelete(categoryId);

    if (!category) {
      throw new Error('Categoría no encontrada');
    }

    return { 
      success: true, 
      message: 'Categoría eliminada permanentemente' 
    };
  }

  /**
   * Activar/Desactivar categoría
   */
  async toggleCategoryStatus(categoryId) {
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      throw new Error('ID de categoría inválido');
    }

    const category = await Category.findById(categoryId);

    if (!category) {
      throw new Error('Categoría no encontrada');
    }

    category.active = !category.active;
    await category.save();

    return category;
  }

  /**
   * Obtener estadísticas de categorías
   */
  async getCategoryStats() {
    const [
      totalCategories,
      activeCategories,
      categoriesWithProducts
    ] = await Promise.all([
      Category.countDocuments(),
      Category.countDocuments({ active: true }),
      Category.aggregate([
        {
          $lookup: {
            from: 'products',
            localField: '_id',
            foreignField: 'category',
            as: 'products'
          }
        },
        {
          $project: {
            name: 1,
            active: 1,
            productCount: { $size: '$products' },
            activeProductCount: {
              $size: {
                $filter: {
                  input: '$products',
                  as: 'product',
                  cond: { $eq: ['$$product.active', true] }
                }
              }
            }
          }
        },
        {
          $sort: { productCount: -1 }
        }
      ])
    ]);

    return {
      totalCategories,
      activeCategories,
      inactiveCategories: totalCategories - activeCategories,
      categoriesWithProducts: categoriesWithProducts.filter(c => c.productCount > 0).length,
      topCategories: categoriesWithProducts.slice(0, 5)
    };
  }

  /**
   * Buscar categorías por nombre
   */
  async searchCategories(searchTerm) {
    const categories = await Category.find({
      name: { $regex: searchTerm, $options: 'i' },
      active: true
    })
      .sort({ name: 1 })
      .lean();

    // Contar productos por categoría
    const categoriesWithCounts = await Promise.all(
      categories.map(async (category) => {
        const productCount = await Product.countDocuments({ 
          category: category._id,
          active: true 
        });
        
        return {
          ...category,
          productCount
        };
      })
    );

    return categoriesWithCounts;
  }
}

// Exportar instancia singleton
export default new CategoryService();