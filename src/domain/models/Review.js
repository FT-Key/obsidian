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
    trim: true
  },
  approved: {
    type: Boolean,
    default: false
  },
  created_at: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Validation: product reviews need product_id
reviewSchema.pre('save', function (next) {
  if (this.type === 'product' && !this.product) {
    return next(new Error('Product reviews require a product_id'));
  }
  next();
});

// Indexes
reviewSchema.index({ product: 1, approved: 1 });
reviewSchema.index({ type: 1, approved: 1 });
reviewSchema.index({ user: 1 });

export default mongoose.models.Review || mongoose.model('Review', reviewSchema);