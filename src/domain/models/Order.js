// ===================================
// models/Order.js
// ===================================
import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  product_name: {
    type: String,
    required: true
  },
  variant_id: {
    type: mongoose.Schema.Types.ObjectId,
    default: null
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  unit_price: {
    type: Number,
    required: true,
    min: 0
  },
  subtotal: {
    type: Number,
    required: true,
    min: 0
  }
});

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  order_number: {
    type: String,
    required: true,
    unique: true
  },
  items: [orderItemSchema],
  subtotal: {
    type: Number,
    required: true,
    min: 0
  },
  discount: {
    type: Number,
    default: 0,
    min: 0
  },
  total: {
    type: Number,
    required: true,
    min: 0
  },
  coupon: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Coupon',
    default: null
  },
  status: {
    type: String,
    enum: ['pending', 'paid', 'preparing', 'ready', 'delivered', 'cancelled'],
    default: 'pending'
  },
  notes: {
    type: String,
    trim: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Auto-generate order number
orderSchema.pre('save', async function (next) {
  if (this.isNew && !this.order_number) {
    const count = await mongoose.model('Order').countDocuments();
    this.order_number = `P${String(count + 1).padStart(6, '0')}`;
  }
  next();
});

// Indexes
orderSchema.index({ user: 1, created_at: -1 });
orderSchema.index({ order_number: 1 });
orderSchema.index({ status: 1 });

export default mongoose.models.Order || mongoose.model('Order', orderSchema);