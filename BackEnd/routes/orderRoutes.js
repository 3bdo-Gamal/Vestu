// routes/orderRoutes.js

const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const orderController = require('../controllers/orderController');

// All routes require authentication
router.use(auth);

// Order management for users
router.get('/user', orderController.getUserOrders);
router.post('/', orderController.createOrder);
router.get('/:id', orderController.getOrderDetail);
router.post('/:id/cancel', orderController.cancelOrder);

module.exports = router;