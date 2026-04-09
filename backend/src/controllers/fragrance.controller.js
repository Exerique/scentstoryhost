const Fragrance = require('../models/Fragrance'); 
const Result = require('../models/Result');

// --- Public Access ---

// 1. Get all fragrances
exports.getAllFragrances = async (req, res, next) => {
  try {
    const fragrances = await Fragrance.find().populate('createdBy', 'username');
    res.status(200).json({ success: true, count: fragrances.length, data: fragrances });
  } catch (err) {
    next(err);
  }
};

// 2. Get single fragrance by ID
exports.getFragranceById = async (req, res, next) => {
  try {
    const fragrance = await Fragrance.findById(req.params.id);
    if (!fragrance) return res.status(404).json({ success: false, message: 'Fragrance not found' });
    res.status(200).json({ success: true, data: fragrance });
  } catch (err) {
    next(err);
  }
};

// 3. Key quiz endpoint: Dynamic Matching Algorithm
exports.getQuizResult = async (req, res, next) => {
  try {
    const { answers } = req.body; // Expects an array: ["A", "B", "A", "C", "D", "A"]

    if (!answers || !Array.isArray(answers)) {
      return res.status(400).json({ success: false, message: "Please provide an array of answers" });
    }

    // A. Calculate User's Vibe Profile (Percentages)
    const counts = { A: 0, B: 0, C: 0, D: 0 };
    answers.forEach(val => { if(counts[val] !== undefined) counts[val]++; });
    
    const total = answers.length;
    const userProfile = {
      A: (counts.A / total) * 10, // Scale to 0-10 to match your new schema
      B: (counts.B / total) * 10,
      C: (counts.C / total) * 10,
      D: (counts.D / total) * 10
    };

    // B. Find all fragrances to compare
    const fragrances = await Fragrance.find();

    // C. Find the "Nearest Neighbor" (Euclidean Distance)
    let bestMatch = null;
    let minDistance = Infinity;

    fragrances.forEach(frag => {
      // Calculate distance between user profile and fragrance tags
      const distance = Math.sqrt(
        Math.pow(userProfile.A - (frag.tags.A || 0), 2) +
        Math.pow(userProfile.B - (frag.tags.B || 0), 2) +
        Math.pow(userProfile.C - (frag.tags.C || 0), 2) +
        Math.pow(userProfile.D - (frag.tags.D || 0), 2)
      );

      if (distance < minDistance) {
        minDistance = distance;
        bestMatch = frag;
      }
    });
    await Result.create({
        user: req.user ? req.user.id : null,
        fragrance: bestMatch._id,
        archetype: bestMatch.archetype,
        vibeScores: userProfile
    });
    res.status(200).json({ success: true, data: bestMatch });
  } catch (err) {
    next(err);
  }
};

// --- Admin Only ---

// 4. Add new fragrance (now includes tags object)
exports.createFragrance = async (req, res, next) => {
  try {
    req.body.createdBy = req.user.id; 
    const fragrance = await Fragrance.create(req.body);
    res.status(201).json({ success: true, data: fragrance });
  } catch (err) {
    next(err);
  }
};

// 5. Edit fragrance
exports.updateFragrance = async (req, res, next) => {
  try {
    const fragrance = await Fragrance.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!fragrance) return res.status(404).json({ success: false, message: 'Fragrance not found' });
    res.status(200).json({ success: true, data: fragrance });
  } catch (err) {
    next(err);
  }
};

// 6. Delete fragrance
exports.deleteFragrance = async (req, res, next) => {
  try {
    const fragrance = await Fragrance.findByIdAndDelete(req.params.id);
    if (!fragrance) return res.status(404).json({ success: false, message: 'Fragrance not found' });
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    next(err);
  }
};