const Result = require('../models/Result');
const User = require('../models/User');
const Fragrance = require('../models/Fragrance');

/**
 * @desc    Get aggregated statistics for the Admin Dashboard
 * @route   GET /api/reports/dashboard
 * @access  Private (Admin Only via Admin Subdomain)
 */
exports.getAdminDashboardStats = async (req, res, next) => {
  try {
    // 1. Popularity Report
    const popularity = await Result.aggregate([
      { $group: { _id: "$archetype", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);

    // 2. Vibe Distribution
    const vibeDist = await Result.aggregate([
      { $group: {
          _id: null,
          avgA: { $avg: "$vibeScores.A" },
          avgB: { $avg: "$vibeScores.B" },
          avgC: { $avg: "$vibeScores.C" },
          avgD: { $avg: "$vibeScores.D" }
      }}
    ]);

    // 3. User Growth
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const newUsers = await User.countDocuments({ createdAt: { $gte: sevenDaysAgo } });

    // 4. Inventory Summary
    const inventory = await Fragrance.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } }
    ]);

    res.status(200).json({
      success: true,
      data: {
        topFragrances: popularity,
        overallVibeBalance: vibeDist[0] || { avgA: 0, avgB: 0, avgC: 0, avgD: 0 },
        newUsersThisWeek: newUsers,
        categoryCounts: inventory
      }
    });
  } catch (err) {
    next(err);
  }
};