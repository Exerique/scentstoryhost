const mongoose = require('mongoose');

const fragranceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Fragrance name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      maxlength: [1000, 'Description cannot exceed 1000 characters'],
    },
    archetype: {
      type: String,
      required: true
    },
    tags: {
      A: { type: Number, default: 0, min: 0, max: 10 }, // Aquatic Score
      B: { type: Number, default: 0, min: 0, max: 10 }, // Earthy Score
      C: { type: Number, default: 0, min: 0, max: 10 }, // Ethereal Score
      D: { type: Number, default: 0, min: 0, max: 10 }  // Noir Score
    },
    photoUrl: {
      type: String,
      default: '',
    },
    category: {
      type: String,
      required: true,
      enum: ['Aquatic', 'Earthy', 'Ethereal', 'Noir', 'Rare Blend'], 
      trim: true,
    },
    notes: {
      type: [String], 
      default: [],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
fragranceSchema.index({ archetype: 1 });
fragranceSchema.index({ combination: 1 });
fragranceSchema.index({ createdBy: 1 });

const Fragrance = mongoose.model('Fragrance', fragranceSchema);

module.exports = Fragrance;
