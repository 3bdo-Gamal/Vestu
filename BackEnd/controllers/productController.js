// HEAD
// controllers/productController.js

const Product = require('../models/Product');

exports.getAllProducts = async (req, res) => {
  try {
    // Support filtering by category
    const { category, featured, search, sort } = req.query; // إضافة sort هنا
    const filter = {};

    if (category) filter.category = category;
    if (featured === 'true') filter.featured = true;

    // Search functionality
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // Sorting functionality based on price
    let sortCriteria = { createdAt: -1 };  // Default sorting by creation date
    if (sort === 'price-low-to-high') {
      sortCriteria = { price: 1 };  // Sorting by price ascending
    } else if (sort === 'price-high-to-low') {
      sortCriteria = { price: -1 };  // Sorting by price descending
    }

    const products = await Product.find(filter)
      .sort(sortCriteria); // استخدام sortCriteria بناءً على الـ query

    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error retrieving products' });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error retrieving product' });
  }
};

exports.getFeaturedProducts = async (req, res) => {
  try {
    const featuredProducts = await Product.find({ featured: true })
      .sort({ createdAt: -1 })
      .limit(8);

    res.json(featuredProducts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error retrieving featured products' });
  }
};

exports.getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    const products = await Product.find({ category })
      .sort({ createdAt: -1 });

    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error retrieving products by category' });
  }
}
//=======
const Product = require('../models/Product');

exports.getAllProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

exports.getFeaturedProducts = async (req, res) => {
  const featured = await Product.find({ isFeatured: true });
  res.json(featured);
  // nouran
};