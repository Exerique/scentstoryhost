const express = require('express');
const router = express.Router();
const reportController = require('../controllers/report.controller');
const auth = require('../middleware/auth'); 
const adminOnly = require('../middleware/adminOnly'); 

router.get('/dashboard', auth, adminOnly, reportController.getAdminDashboardStats);

module.exports = router;