const express = require('express');
const router = express.Router();
const reportController = require('../controllers/report.controller');
const auth = require('../middleware/auth'); 
const adminOnly = require('../middleware/adminOnly'); 

/**
 * @swagger
 * tags:
 *   name: Reports
 *   description: Administrative analytics and system-wide statistics
 */

/**
 * @swagger
 * /api/reports/dashboard:
 *   get:
 *     summary: Get aggregated statistics for the Admin Dashboard
 *     description: |
 *       Retrieves high-level analytics including:
 *       - Popularity of archetypes
 *       - Average vibe distribution (4D vector balance)
 *       - Recent user growth
 *       - Fragrance inventory by category
 *       **Note:** This endpoint requires the admin.localhost subdomain.
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved dashboard statistics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     topFragrances:
 *                       type: array
 *                       description: Top 5 archetypes based on quiz results
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             example: The Pure Voyager
 *                           count:
 *                             type: number
 *                             example: 42
 *
 *                     overallVibeBalance:
 *                       type: object
 *                       description: Average scores for A, B, C, and D across all results
 *                       properties:
 *                         avgA:
 *                           type: number
 *                           example: 7.2
 *                         avgB:
 *                           type: number
 *                           example: 4.5
 *                         avgC:
 *                           type: number
 *                           example: 6.1
 *                         avgD:
 *                           type: number
 *                           example: 3.8
 *
 *                     newUsersThisWeek:
 *                       type: number
 *                       description: Count of users registered in the last 7 days
 *                       example: 15
 *
 *                     categoryCounts:
 *                       type: array
 *                       description: Inventory breakdown by category
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             example: Floral
 *                           count:
 *                             type: number
 *                             example: 12
 *
 *       403:
 *         description: Forbidden - Requires Admin role and admin subdomain access
 *       401:
 *         description: Unauthorized - Invalid or missing token
 */
router.get('/dashboard', auth, adminOnly, reportController.getAdminDashboardStats);

module.exports = router;