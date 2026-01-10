// ===================================
// models/ContactMessage.js
// ===================================
import mongoose from 'mongoose';

const contactMessageSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    trim: true
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true
  },
  replied: {
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

// Indexes
contactMessageSchema.index({ replied: 1, created_at: -1 });
contactMessageSchema.index({ email: 1 });

export default mongoose.models.ContactMessage || mongoose.model('ContactMessage', contactMessageSchema);