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

/**
 * @swagger
 * tags:
 *   name: Combinations
 *   description: Archetype profile management and fragrance matching logic
 */

/**
 * @swagger
 * /api/combinations:
 *   get:
 *     summary: Get all archetype profiles
 *     tags: [Combinations]
 *     responses:
 *       200:
 *         description: List of all archetypes retrieved successfully
 *
 *   post:
 *     summary: Create a new archetype profile
 *     tags: [Combinations]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - archetypeName
 *               - realFragranceMatch
 *             properties:
 *               archetypeName:
 *                 type: string
 *                 example: The Pure Voyager
 *               realFragranceMatch:
 *                 type: string
 *                 example: Maison Margiela – Sailing Day
 *               code:
 *                 type: string
 *                 example: PV-01
 *               vibe:
 *                 type: string
 *                 example: Fresh & Airy
 *               description:
 *                 type: string
 *                 example: A profile for those who find peace in the open sea.
 *     responses:
 *       201:
 *         description: Archetype created successfully
 */
// Public and Admin root routes
router.get('/', getAllCombinations);
router.post('/', auth, adminOnly, createCombination);

/**
 * @swagger
 * /api/combinations/{name}:
 *   get:
 *     summary: Get a specific archetype by name
 *     tags: [Combinations]
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Archetype profile found
 *
 *   put:
 *     summary: Update an existing archetype profile
 *     tags: [Combinations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               archetypeName:
 *                 type: string
 *                 example: The Pure Voyager
 *               realFragranceMatch:
 *                 type: string
 *                 example: Maison Margiela – Sailing Day
 *               code:
 *                 type: string
 *               vibe:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Update successful
 *       403:
 *         description: Forbidden
 *
 *   delete:
 *     summary: Delete an archetype profile
 *     tags: [Combinations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Archetype deleted
 */

// Routes using the name parameter
router.get('/:name', getCombinationByName); 
router.put('/:name', auth, adminOnly, updateCombination);
router.delete('/:name', auth, adminOnly, deleteCombination);

module.exports = router;