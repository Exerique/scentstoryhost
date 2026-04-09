const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  fragrance: { type: mongoose.Schema.Types.ObjectId, ref: 'Fragrance', required: true },
  archetype: String,
  // To track "Vibe Distribution"
  vibeScores: {
    A: { type: Number, default: 0 },
    B: { type: Number, default: 0 },
    C: { type: Number, default: 0 },
    D: { type: Number, default: 0 }
  }
}, { timestamps: true });

module.exports = mongoose.model('Result', resultSchema);