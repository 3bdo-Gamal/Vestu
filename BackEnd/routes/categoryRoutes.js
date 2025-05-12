const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { getAllCategories } = require('../controllers/categoryController');
router.get('/', categoryController.getAllCategories);


module.exports = router;
