

const User = require('../models/User');

const adminMiddleware = async (req, res, next) => {
  try {
    
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized access' });
    }

    
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied. Admin privileges required' });
    }

    
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Admin authorization failed' });
  }
};

module.exports = adminMiddleware;