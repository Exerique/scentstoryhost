const mongoose = require('mongoose');

const combinationSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      trim: true,
      uppercase: true,
    },

    archetypeName: {
      type: String,
      required: [true, 'Archetype name is required'],
      unique: true, 
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
    timestamps: true,
  }
);


const Combination = mongoose.model('Combination', combinationSchema);

module.exports = Combination;