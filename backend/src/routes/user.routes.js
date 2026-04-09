const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  deleteUser
} = require('../controllers/user.controller');

// Import security middleware
const auth = require('../middleware/auth');
const adminOnly = require('../middleware/adminOnly');

// Apply admin protection to all routes in this file
router.use(auth);
router.use(adminOnly);

// Admin Routes
router.get('/', getAllUsers);
router.delete('/:id', deleteUser);

module.exports = router;