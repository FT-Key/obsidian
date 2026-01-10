// ===================================
// models/Favorite.js
// ===================================
import mongoose from 'mongoose';

const favoriteItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  added_at: {
    type: Date,
    default: Date.now
  }
});

const favoriteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  items: [favoriteItemSchema],
  created_at: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Indexes
favoriteSchema.index({ user: 1 });

export default mongoose.models.Favorite || mongoose.model('Favorite', favoriteSchema);