// models/User.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Invalid email']
  },
  password_hash: {
    type: String,
    required: [true, 'Password is required'],
    select: false
  },
  phone: {
    type: String,
    required: [true, 'Phone is required'],
    trim: true
  },
  role: {
    type: String,
    enum: ['customer', 'admin'],
    default: 'customer'
  },
  loyalty_points: {
    type: Number,
    default: 0
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

// Virtual for customer level
userSchema.virtual('customer_level').get(function() {
  if (this.loyalty_points >= 500) return 'VIP';
  if (this.loyalty_points >= 300) return 'Gold';
  if (this.loyalty_points >= 100) return 'Silver';
  if (this.loyalty_points >= 0) return 'Regular';
  return 'Under review';
});

// Virtuals for relationships
userSchema.virtual('appointments', {
  ref: 'Appointment',
  localField: '_id',
  foreignField: 'user'
});

userSchema.virtual('orders', {
  ref: 'Order',
  localField: '_id',
  foreignField: 'user'
});

userSchema.virtual('point_movements', {
  ref: 'PointMovement',
  localField: '_id',
  foreignField: 'user'
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password_hash')) return next();
  this.password_hash = await bcrypt.hash(this.password_hash, 12);
  next();
});

// Method to compare password
userSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password_hash);
};

// Indexes
userSchema.index({ email: 1 });
userSchema.index({ loyalty_points: -1 });

export default mongoose.models.User || mongoose.model('User', userSchema);