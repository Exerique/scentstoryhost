const express = require('express');
const router = express.Router();
const {
  getAllFragrances,
  getFragranceById,
  getQuizResult, 
  createFragrance,
  updateFragrance,
  deleteFragrance
} = require('../controllers/fragrance.controller');

// Import security middleware
const auth = require('../middleware/auth');
const adminOnly = require('../middleware/adminOnly');

// Public Routes
router.get('/', getAllFragrances);
router.get('/:id', getFragranceById);
router.post('/get-result', getQuizResult); 

// Admin Only Routes
router.post('/', auth, adminOnly, createFragrance);
router.put('/:id', auth, adminOnly, updateFragrance);
router.delete('/:id', auth, adminOnly, deleteFragrance);

module.exports = router;