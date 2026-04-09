const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  deleteUser
} = require('../controllers/user.controller');

// Import security middleware
const auth = require('../middleware/auth');
const adminOnly = require('../middleware/adminOnly');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User account management and administrative controls
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all registered users
 *     description: Retrieves a list of all users, sorted by the most recently created.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users retrieved successfully
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
 *       403:
 *         description: Forbidden - Requires Admin role and admin subdomain
 */

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete a user account
 *     description: Removes a user from the database. Note that an admin cannot delete their own account.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The MongoDB ID of the user to delete
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       400:
 *         description: Bad Request - Attempted to delete own admin account
 *       404:
 *         description: User not found
 *       403:
 *         description: Forbidden
 */

// Apply admin protection to all routes in this file
router.use(auth);
router.use(adminOnly);

// Admin Routes
router.get('/', getAllUsers);
router.delete('/:id', deleteUser);

module.exports = router;