// routes/adminRouter.js

const express = require('express');
const router = express.Router();
const path = require('path');
const auth = require('../middleware/authMiddleware');
const adminAuth = require('../middleware/adminMiddleware');
const adminController = require('../controllers/adminController');

// Protect all routes with both auth and admin middleware
router.use(auth, adminAuth);


// Product management routes
router.get('/products', adminController.getAllProducts);
router.post('/products', adminController.createProduct);
router.put('/products/:id', adminController.updateProduct);
router.delete('/products/:id', adminController.deleteProduct);

// User management routes
router.get('/users', adminController.getAllUsers);

// Order management routes
router.get('/orders', adminController.getAllOrders);
router.put('/orders/:id/status', adminController.updateOrderStatus);

module.exports = router;
