const Product = require('../models/Product');

exports.getAllProducts = async (req, res) => {
    const products = await Product.find();
    res.json(products);
};

exports.getFeaturedProducts = async (req, res) => {
    const featured = await Product.find({ isFeatured: true });
    res.json(featured);
};