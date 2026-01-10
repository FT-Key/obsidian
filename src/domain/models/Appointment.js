// ===================================
// models/Appointment.js
// ===================================
import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    required: true
  },
  date: {
    type: Date,
    required: [true, 'Date is required']
  },
  start_time: {
    type: String,
    required: [true, 'Start time is required'],
    match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format (HH:MM)']
  },
  end_time: {
    type: String,
    required: [true, 'End time is required'],
    match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format (HH:MM)']
  },
  charged_price: {
    type: Number,
    required: [true, 'Price is required'],
    min: 0
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled', 'no_show'],
    default: 'pending'
  },
  service_type: {
    type: String,
    required: [true, 'Service type is required'],
    trim: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  cancelled_at: {
    type: Date,
    default: null
  },
  reschedules: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Indexes
appointmentSchema.index({ user: 1, date: -1 });
appointmentSchema.index({ date: 1, start_time: 1 });
appointmentSchema.index({ status: 1 });

export default mongoose.models.Appointment || mongoose.model('Appointment', appointmentSchema);