const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = 5000;
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use('/images', express.static('public/images'));

// Connect to MongoDB

mongoose.connect('mongodb+srv://uniproject08:abc12345%23@cluster0.yubklsz.mongodb.net/?retryWrites=true&w=majority&appName=cluster0')
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));

const Product = mongoose.model('Product', new mongoose.Schema({
    id: Number,
    name: String,
    category: String,
    price: Number,
    image: String
}));

const Category = mongoose.model('Category', new mongoose.Schema({
    name: String,
    slug: String,
    image: String
}));
// === Products APIs ===

// كل المنتجات
app.get('/api/products', async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

// المنتجات الـ featured
app.get('/api/products/featured', async (req, res) => {
    const featured = await Product.find({ isFeatured: true });
    res.json(featured);
});

// === Categories APIs ===

// كل الكاتيجوريز من الـ database
app.get('/api/categories', async (req, res) => {
    const categories = await Category.find();
    res.json(categories);
});

// عشان لو الفرونت بيستخدم route ثابت فيه كاتيجوريز (زي اللي كان عندك في الأول)
app.get('/api/categories/static', (req, res) => {
    res.json(categories); // لو عندك array ثابتة برضو
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});








