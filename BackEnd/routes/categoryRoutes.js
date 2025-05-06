const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { getAllCategories } = require('../controllers/categoryController');
router.get('/', categoryController.getAllCategories);
// router.get('/static', categoryController.getStaticCategories);

module.exports = router;
