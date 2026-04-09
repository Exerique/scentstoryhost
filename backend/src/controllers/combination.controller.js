const Combination = require('../models/Combination');

// --- Public Access ---

// 1. Get all archetypes
exports.getAllCombinations = async (req, res, next) => {
  try {
    const combinations = await Combination.find().sort({ archetypeName: 1 });
    res.status(200).json({ success: true, count: combinations.length, data: combinations });
  } catch (err) {
    next(err);
  }
};

// 2. Get one archetype by Name (e.g., /api/combinations/The%20Pure%20Voyager)
exports.getCombinationByName = async (req, res, next) => {
  try {
    const name = decodeURIComponent(req.params.name);
    const combination = await Combination.findOne({ archetypeName: name });

    if (!combination) {
      return res.status(404).json({ 
        success: false, 
        message: `Archetype profile '${name}' not found` 
      });
    }

    res.status(200).json({ success: true, data: combination });
  } catch (err) {
    next(err);
  }
};

// --- Admin Only ---

// 3. Create a new archetype profile
exports.createCombination = async (req, res, next) => {
  try {
    const combination = await Combination.create(req.body);
    res.status(201).json({ success: true, data: combination });
  } catch (err) {
    next(err);
  }
};

// 4. Edit an archetype by Name
exports.updateCombination = async (req, res, next) => {
  try {
    const name = decodeURIComponent(req.params.name);
    const combination = await Combination.findOneAndUpdate(
      { archetypeName: name },
      req.body,
      { new: true, runValidators: true }
    );

    if (!combination) {
      return res.status(404).json({ success: false, message: 'Archetype not found' });
    }

    res.status(200).json({ success: true, data: combination });
  } catch (err) {
    next(err);
  }
};

// 5. Delete an archetype by Name
exports.deleteCombination = async (req, res, next) => {
  try {
    const name = decodeURIComponent(req.params.name);
    const combination = await Combination.findOneAndDelete({ archetypeName: name });

    if (!combination) {
      return res.status(404).json({ success: false, message: 'Archetype not found' });
    }

    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    next(err);
  }
};