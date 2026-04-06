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
      required: [true, 'Archetype is required'],
      trim: true,
      // Optional: Add enum if archetypes are fixed
      // enum: ['Floral', 'Woody', 'Fresh', 'Oriental', ...], 
    },
    combination: {
      type: String,
      required: [true, 'Combination pattern is required'],
      trim: true,
      uppercase: true,
      // Regex validates typical patterns like A-A-A-A, A-A-B-B, etc.
      match: [
        /^[A-Z]-[A-Z]-[A-Z]-[A-Z]$/,
        'Please use valid combination format (e.g., A-A-A-B)'
      ]
    },
    photoUrl: {
      type: String,
      // Optional regex to validate URL structure if desired
      default: '',
    },
    category: {
      type: String,
      trim: true,
    },
    notes: {
      type: [String], // Array of note strings
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
