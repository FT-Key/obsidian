// ===================================
// models/Payment.js
// ===================================
import mongoose from 'mongoose';

const mercadopagoTransactionSchema = new mongoose.Schema({
  preference_id: String,
  payment_id: String,
  payment_type: String,
  installments: Number,
  transaction_amount: Number,
  status: String,
  webhook_data: mongoose.Schema.Types.Mixed,
  created_at: {
    type: Date,
    default: Date.now
  }
});

const paymentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    default: null
  },
  appointment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appointment',
    default: null
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'cancelled'],
    default: 'pending'
  },
  operation_type: {
    type: String,
    enum: ['order', 'appointment'],
    required: true
  },
  mercadopago_transactions: [mercadopagoTransactionSchema],
  created_at: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Indexes
paymentSchema.index({ user: 1, created_at: -1 });
paymentSchema.index({ order: 1 });
paymentSchema.index({ appointment: 1 });
paymentSchema.index({ status: 1 });

export default mongoose.models.Payment || mongoose.model('Payment', paymentSchema);