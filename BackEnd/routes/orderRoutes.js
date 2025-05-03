const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { getUserOrders } = require('../controllers/orderController');

router.get('/user', auth, getUserOrders);

module.exports = router;

