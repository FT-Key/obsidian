// ===================================
// models/Category.js
// ===================================
import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    unique: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Indexes
categorySchema.index({ name: 1 });

export default mongoose.models.Category || mongoose.model('Category', categorySchema);