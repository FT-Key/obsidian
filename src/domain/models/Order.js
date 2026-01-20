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
  variant_name: {
    type: String,
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
  coupon_code: {
    type: String,
    default: null
  },
  status: {
    type: String,
    enum: ['pending', 'paid', 'preparing', 'ready', 'delivered', 'cancelled'],
    default: 'pending'
  },
  payment_method: {
    type: String,
    enum: ['cash', 'card', 'transfer', 'mercadopago'],
    default: 'cash'
  },
  payment_status: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending'
  },
  delivery_type: {
    type: String,
    enum: ['pickup', 'delivery'],
    default: 'pickup'
  },
  delivery_address: {
    type: String,
    trim: true
  },
  customer_name: {
    type: String,
    required: true,
    trim: true
  },
  customer_email: {
    type: String,
    required: true,
    trim: true
  },
  customer_phone: {
    type: String,
    required: true,
    trim: true
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
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual para el estado legible
orderSchema.virtual('status_label').get(function() {
  const labels = {
    pending: 'Pendiente',
    paid: 'Pagado',
    preparing: 'En preparación',
    ready: 'Listo',
    delivered: 'Entregado',
    cancelled: 'Cancelado'
  };
  return labels[this.status] || this.status;
});

// Auto-generate order number
// ⚠️ IMPORTANTE: NO uses next() cuando usas async/await
orderSchema.pre('save', async function() {
  if (this.isNew && !this.order_number) {
    const count = await mongoose.model('Order').countDocuments();
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    this.order_number = `ORD-${year}${month}-${String(count + 1).padStart(5, '0')}`;
  }
});

// Indexes
orderSchema.index({ user: 1, created_at: -1 });
orderSchema.index({ order_number: 1 });
orderSchema.index({ status: 1 });
orderSchema.index({ payment_status: 1 });
orderSchema.index({ created_at: -1 });

export default mongoose.models.Order || mongoose.model('Order', orderSchema);