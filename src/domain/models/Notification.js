// ===================================
// models/Notification.js
// ===================================
import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: [
      'appointment_confirmed',
      'appointment_reminder',
      'order_confirmed',
      'order_paid',
      'points_earned',
      'coupon_available',
      'vip_coupon',
      'welcome'
    ],
    required: true
  },
  subject: {
    type: String,
    required: true,
    trim: true
  },
  message: {
    type: String,
    required: true
  },
  sent: {
    type: Boolean,
    default: false
  },
  sent_at: {
    type: Date,
    default: null
  },
  recipient_email: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Indexes
notificationSchema.index({ user: 1, created_at: -1 });
notificationSchema.index({ sent: 1 });

export default mongoose.models.Notification || mongoose.model('Notification', notificationSchema);