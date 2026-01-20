// ===================================
// models/Review.js
// ===================================
import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    default: null
  },
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    default: null
  },
  type: {
    type: String,
    enum: ['general', 'product'],
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    required: true,
    trim: true,
    minlength: [10, 'El comentario debe tener al menos 10 caracteres'],
    maxlength: [1000, 'El comentario no puede exceder 1000 caracteres']
  },
  images: [{
    type: String
  }],
  approved: {
    type: Boolean,
    default: false
  },
  admin_response: {
    type: String,
    trim: true,
    default: null
  },
  admin_response_date: {
    type: Date,
    default: null
  },
  helpful_count: {
    type: Number,
    default: 0,
    min: 0
  },
  created_at: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual para nombre del usuario
reviewSchema.virtual('user_name', {
  ref: 'User',
  localField: 'user',
  foreignField: '_id',
  justOne: true
});

// Validation: product reviews need product_id
// ⚠️ IMPORTANTE: NO uses next() cuando usas async/await
reviewSchema.pre('save', async function() {
  if (this.type === 'product' && !this.product) {
    throw new Error('Las reseñas de producto requieren un product_id');
  }
});

// Evitar reseñas duplicadas del mismo usuario para el mismo producto
reviewSchema.index({ user: 1, product: 1 }, { 
  unique: true, 
  partialFilterExpression: { product: { $exists: true, $ne: null } }
});

// Indexes
reviewSchema.index({ product: 1, approved: 1, rating: -1 });
reviewSchema.index({ type: 1, approved: 1, created_at: -1 });
reviewSchema.index({ user: 1, created_at: -1 });
reviewSchema.index({ approved: 1, created_at: -1 });

export default mongoose.models.Review || mongoose.model('Review', reviewSchema);