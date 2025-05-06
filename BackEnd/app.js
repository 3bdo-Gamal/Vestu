const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const morgan = require('morgan');
require('dotenv').config();

const app = express();

mongoose.connect(process.env.Mongo_URI, {})
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  });

app.use(express.static(path.join(__dirname, '../FrontEnd')));
app.use('/images', express.static(path.join(__dirname, '../FrontEnd/images')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/categories', require('./routes/categoryRoutes'));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../FrontEnd/authP.html'));
});
// homepageeeeeee
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../FrontEnd/index.html'));
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});







