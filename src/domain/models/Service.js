// ===================================
// models/Service.js
// ===================================
import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true
  },
  base_price: {
    type: Number,
    required: [true, 'Price is required'],
    min: 0
  },
  duration_minutes: {
    type: Number,
    required: [true, 'Duration is required'],
    min: 15
  },
  main_image: {
    type: String,
    default: null
  },
  images: [{
    type: String
  }],
  active: {
    type: Boolean,
    default: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Indexes
serviceSchema.index({ active: 1 });
serviceSchema.index({ name: 'text', description: 'text' });

export default mongoose.models.Service || mongoose.model('Service', serviceSchema);