<<<<<<< HEAD
// routes/productRoutes.js

=======
>>>>>>> nouran
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

<<<<<<< HEAD
// Public routes available to all users
router.get('/', productController.getAllProducts);
router.get('/featured', productController.getFeaturedProducts);
router.get('/category/:category', productController.getProductsByCategory);
router.get('/:id', productController.getProductById);

module.exports = router;
=======
router.get('/', productController.getAllProducts);
router.get('/featured', productController.getFeaturedProducts);

module.exports = router;
>>>>>>> nouran
