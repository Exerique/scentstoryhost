const express = require('express');
const router = express.Router();
const {
  getAllQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion
} = require('../controllers/question.controller');

const auth = require('../middleware/auth');
const adminOnly = require('../middleware/adminOnly');

router.get('/', getAllQuestions);

router.post('/', auth, adminOnly, createQuestion);
router.put('/:id', auth, adminOnly, updateQuestion);
router.delete('/:id', auth, adminOnly, deleteQuestion);

module.exports = router;