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

/**
 * @swagger
 * tags:
 *   name: Questions
 *   description: Quiz flow management and question sequencing
 */

/**
 * @swagger
 * /api/questions:
 *   get:
 *     summary: Get all quiz questions
 *     description: Retrieves the full list of questions sorted by their "order" field for the quiz flow.
 *     tags: [Questions]
 *     responses:
 *       200:
 *         description: Questions retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 count:
 *                   type: number
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *
  *   post:
 *     summary: Create a new quiz question
 *     tags: [Questions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - order
 *               - options
 *             properties:
 *               order:
 *                 type: number
 *                 example: 1
 *               storyTitle:
 *                 type: string
 *                 example: The Enchanted Forest
 *               storyText:
 *                 type: string
 *                 example: You find yourself walking through a misty field of morning dew...
 *               options:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - vibeImpact
 *                   properties:
 *                     text:
 *                       type: string
 *                       example: Follow the silver butterfly
 *                     vibeImpact:
 *                       type: string
 *                       enum:
 *                         - A
 *                         - B
 *                         - C
 *                         - D
 *                       example: A
 *                     imageUrl:
 *                       type: string
 *                       example: https://res.cloudinary.com/demo/image/upload/sample.jpg
 *     responses:
 *       201:
 *         description: Question created successfully
 *       403:
 *         description: Forbidden - Admin/Subdomain access only
 */
router.get('/', getAllQuestions);
router.post('/', auth, adminOnly, createQuestion);

/**
 * @swagger
 * /api/questions/{id}:
 *   put:
 *     summary: Update an existing question
 *     tags: [Questions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The MongoDB ID of the question
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               order:
 *                 type: number
 *                 example: 1
 *               storyTitle:
 *                 type: string
 *                 example: The Enchanted Forest
 *               storyText:
 *                 type: string
 *                 example: Updated story text...
 *               options:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - vibeImpact
 *                   properties:
 *                     text:
 *                       type: string
 *                       example: Follow the silver butterfly
 *                     vibeImpact:
 *                       type: string
 *                       enum:
 *                         - A
 *                         - B
 *                         - C
 *                         - D
 *                       example: A
 *                     imageUrl:
 *                       type: string
 *                       example: https://res.cloudinary.com/demo/image/upload/sample.jpg
 *     responses:
 *       200:
 *         description: Question updated successfully
 *       404:
 *         description: Question not found
 *
 *   delete:
 *     summary: Delete a question
 *     tags: [Questions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Question removed
 */
router.put('/:id', auth, adminOnly, updateQuestion);
router.delete('/:id', auth, adminOnly, deleteQuestion);

module.exports = router;