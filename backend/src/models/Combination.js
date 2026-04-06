const mongoose = require('mongoose');

const combinationSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: [true, 'Combination code is required'],
      unique: true,
      trim: true,
      uppercase: true,
      match: [
        /^[A-Z]-[A-Z]-[A-Z]-[A-Z]$/,
        'Please use valid combination format (e.g., A-A-A-B)'
      ],
    },
    archetypeName: {
      type: String,
      required: [true, 'Archetype name is required'],
      trim: true,
    },
    realFragranceMatch: {
      type: String,
      required: [true, 'Real fragrance match is required'],
      trim: true,
    },
    vibe: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      maxlength: [1000, 'Description cannot exceed 1000 characters'],
    },
  },
  {
    timestamps: true, // Will add createdAt and updatedAt
  }
);

// Indexes
combinationSchema.index({ code: 1 });

const Combination = mongoose.model('Combination', combinationSchema);

module.exports = Combination;

/* 
 * Example Seed Data:
 * {
 *   code: "A-A-A-A",
 *   archetypeName: "The Pure Classic",
 *   realFragranceMatch: "Chanel No. 5",
 *   vibe: "Elegant, Timeless, Sophisticated",
 *   description: "A perfectly balanced classical scent..."
 * }
 */
