// ===================================
// models/Cart.js
// ===================================
import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  variant_id: {
    type: mongoose.Schema.Types.ObjectId,
    default: null
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1
  },
  unit_price: {
    type: Number,
    required: true,
    min: 0
  }
});

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  items: [cartItemSchema],
  updated_at: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual to calculate total
cartSchema.virtual('total').get(function() {
  return this.items.reduce((sum, item) => sum + (item.unit_price * item.quantity), 0);
});

// Update date on modification
// ⚠️ IMPORTANTE: NO uses next() cuando usas async/await
cartSchema.pre('save', async function() {
  this.updated_at = Date.now();
});

// Indexes
cartSchema.index({ user: 1 });

export default mongoose.models.Cart || mongoose.model('Cart', cartSchema);