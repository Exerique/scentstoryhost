const adminOnly = (req, res, next) => {

  //  Security Check
  if (!req.isAdminDomain) {
    return res.status(403).json({
      success: false,
      message: 'Access denied: Admin actions must be performed through the admin portal.'
    });
  }

  // Auth Check
  if (!req.user) {
    return res.status(500).json({
      success: false,
      message: 'Admin check failed: req.user is missing. Place auth middleware before adminOnly.'
    });
  }

  //  Role Check
  if (req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Access denied: This action requires administrator privileges.'
    });
  }

  next();
};

module.exports = adminOnly;