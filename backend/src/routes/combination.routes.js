const express = require('express');
const router = express.Router();
const {
  getAllCombinations,
  getCombinationByName,
  createCombination,
  updateCombination,
  deleteCombination
} = require('../controllers/combination.controller');

const auth = require('../middleware/auth');
const adminOnly = require('../middleware/adminOnly');

// Public Routes
router.get('/', getAllCombinations);
router.get('/:name', getCombinationByName); 

// Admin Only Routes
router.post('/', auth, adminOnly, createCombination);
router.put('/:name', auth, adminOnly, updateCombination);
router.delete('/:name', auth, adminOnly, deleteCombination);

module.exports = router;