// ===================================
// models/Coupon.js
// ===================================
import mongoose from 'mongoose';

const couponSchema = new mongoose.Schema({
  code: {
    type: String,
    required: [true, 'Code is required'],
    unique: true,
    uppercase: true,
    trim: true
  },
  type: {
    type: String,
    enum: ['percentage', 'fixed'],
    required: true
  },
  value: {
    type: Number,
    required: true,
    min: 0
  },
  minimum_amount: {
    type: Number,
    default: 0,
    min: 0
  },
  max_uses: {
    type: Number,
    default: null
  },
  uses_count: {
    type: Number,
    default: 0,
    min: 0
  },
  start_date: {
    type: Date,
    default: Date.now
  },
  end_date: {
    type: Date,
    required: true
  },
  active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual to check if valid
couponSchema.virtual('is_valid').get(function () {
  const now = new Date();
  return this.active &&
    now >= this.start_date &&
    now <= this.end_date &&
    (this.max_uses === null || this.uses_count < this.max_uses);
});

// Method to calculate discount
couponSchema.methods.calculateDiscount = function (amount) {
  if (!this.is_valid) return 0;
  if (amount < this.minimum_amount) return 0;

  if (this.type === 'percentage') {
    return amount * (this.value / 100);
  }
  return this.value;
};

// Indexes
couponSchema.index({ code: 1 });
couponSchema.index({ active: 1, end_date: 1 });

export default mongoose.models.Coupon || mongoose.model('Coupon', couponSchema);