// ===================================
// models/PointMovement.js
// ===================================
import mongoose from 'mongoose';

const pointMovementSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  points: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    enum: ['add', 'subtract'],
    required: true
  },
  event: {
    type: String,
    enum: [
      'order_completed',
      'appointment_completed',
      'punctual_attendance',
      'first_purchase',
      'late_cancellation',
      'frequent_reschedule',
      'no_show',
      'product_return',
      'coupon_redeemed',
      'manual_adjustment'
    ],
    required: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  date: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Middleware to update user points
pointMovementSchema.post('save', async function () {
  const User = mongoose.model('User');
  const movements = await mongoose.model('PointMovement')
    .find({ user: this.user });

  const totalPoints = movements.reduce((total, mov) => {
    return mov.type === 'add' ? total + mov.points : total - mov.points;
  }, 0);

  await User.findByIdAndUpdate(this.user, {
    loyalty_points: totalPoints
  });
});

// Indexes
pointMovementSchema.index({ user: 1, date: -1 });
pointMovementSchema.index({ event: 1 });

export default mongoose.models.PointMovement || mongoose.model('PointMovement', pointMovementSchema);