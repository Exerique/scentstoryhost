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

const auth = require('../middleware/auth');
const adminOnly = require('../middleware/adminOnly');

/**
 * @swagger
 * tags:
 *   name: Fragrances
 *   description: Scent inventory and 4D vector matching engine
 */

/**
 * @swagger
 * /api/fragrances:
 *   get:
 *     summary: Get all fragrances in the library
 *     tags: [Fragrances]
 *     responses:
 *       200:
 *         description: Successfully retrieved all fragrances
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
 *     summary: Add a new fragrance to the system
 *     tags: [Fragrances]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - brand
 *               - archetype
 *               - description
 *               - category
 *             properties:
 *               name:
 *                 type: string
 *                 example: Ocean Breeze
 *               brand:
 *                 type: string
 *                 example: ScentStory Signature
 *               archetype:
 *                 type: string
 *                 example: The Pure Voyager
*               description:
 *                 type: string
 *                 example: A crisp, aquatic fragrance that captures the essence of a refreshing sea breeze.
 *               category:
 *                 type: string
 *                 enum:
 *                      - Aquatic
 *                      - Floral
 *                      - Ethereal
 *                      - Citrus
 *                 example: Aquatic
 *               tags:
 *                 type: object
 *                 properties:
 *                   A:
 *                     type: number
 *                     example: 8.5
 *                   B:
 *                     type: number
 *                     example: 2.0
 *                   C:
 *                     type: number
 *                     example: 4.0
 *                   D:
 *                     type: number
 *                     example: 1.5
 *     responses:
 *       201:
 *         description: Fragrance created
 *       403:
 *         description: Forbidden - Admin/Subdomain only
 */
router.get('/', getAllFragrances);
router.post('/', auth, adminOnly, createFragrance);

/**
 * @swagger
 * /api/fragrances/get-result:
 *   post:
 *     summary: Run the ScentStory matching algorithm
 *     description: Calculates Euclidean distance between user quiz answers and fragrance profiles
 *     tags: [Fragrances]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - answers
 *             properties:
 *               answers:
 *                 type: array
 *                 items:
 *                   type: string
 *                   enum: [A, B, C, D]
 *                 example: ["A", "B", "A", "C", "D", "A"]
 *     responses:
 *       200:
 *         description: Best match found and result logged
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   description: The nearest neighbor fragrance object
 */
router.post('/get-result', getQuizResult); 

/**
 * @swagger
 * /api/fragrances/{id}:
 *   get:
 *     summary: Get a single fragrance by its ID
 *     tags: [Fragrances]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Fragrance found
 *       404:
 *         description: Fragrance not found
 *
 *   put:
 *     summary: Update fragrance details
 *     tags: [Fragrances]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The MongoDB ID of the fragrance to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Ocean Breeze
 *               brand:
 *                 type: string
 *                 example: ScentStory Signature
 *               description:
 *                 type: string
 *               category:
 *                 type: string
 *                 enum:
 *                   - Aquatic
 *                   - Floral
 *                   - Woody
 *                   - Ethereal
 *                   - Citrus
 *               tags:
 *                 type: object
 *                 properties:
 *                   A:
 *                     type: number
 *                   B:
 *                     type: number
 *                   C:
 *                     type: number
 *                   D:
 *                     type: number
 *     responses:
 *       200:
 *         description: Updated successfully
 *       404:
 *         description: Fragrance not found
 *
 *   delete:
 *     summary: Remove a fragrance from the database
 *     tags: [Fragrances]
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
 *         description: Deleted successfully
 */
router.get('/:id', getFragranceById);
router.put('/:id', auth, adminOnly, updateFragrance);
router.delete('/:id', auth, adminOnly, deleteFragrance);

module.exports = router;