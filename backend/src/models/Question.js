const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  order: { type: Number, required: true }, 
  storyTitle: String, 
  storyText: String,
  options: [{
    text: String, 
    vibeImpact: { 
      type: String, 
      enum: ['A', 'B', 'C', 'D'], 
      required: true 
    },
    imageUrl: { type: String, default: '' }
  }]
});

module.exports = mongoose.model('Question', questionSchema);