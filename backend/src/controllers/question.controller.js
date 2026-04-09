const Question = require('../models/Question');

// --- Public Access ---

// 1. Get all questions (Sorted by order for the quiz flow)
exports.getAllQuestions = async (req, res, next) => {
  try {
    const questions = await Question.find().sort({ order: 1 });
    res.status(200).json({ 
      success: true, 
      count: questions.length, 
      data: questions 
    });
  } catch (err) {
    next(err);
  }
};

// --- Admin Only ---

// 2. Add a new question
exports.createQuestion = async (req, res, next) => {
  try {
    const question = await Question.create(req.body);
    res.status(201).json({ success: true, data: question });
  } catch (err) {
    next(err);
  }
};

// 3. Update an existing question
exports.updateQuestion = async (req, res, next) => {
  try {
    const question = await Question.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!question) {
      return res.status(404).json({ success: false, message: 'Question not found' });
    }

    res.status(200).json({ success: true, data: question });
  } catch (err) {
    next(err);
  }
};

// 4. Delete a question
exports.deleteQuestion = async (req, res, next) => {
  try {
    const question = await Question.findByIdAndDelete(req.params.id);

    if (!question) {
      return res.status(404).json({ success: false, message: 'Question not found' });
    }

    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    next(err);
  }
};