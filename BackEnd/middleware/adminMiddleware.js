// middleware/adminMiddleware.js

const User = require('../models/User');

const adminMiddleware = async (req, res, next) => {
  try {
    // This middleware should be used after authMiddleware,
    // so req.user should already exist
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized access' });
    }

    // Check if the user has admin role
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied. Admin privileges required' });
    }

    // If user is admin, proceed to the next middleware or route handler
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Admin authorization failed' });
  }
};

module.exports = adminMiddleware;