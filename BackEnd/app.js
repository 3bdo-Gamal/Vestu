const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const morgan = require('morgan');
require('dotenv').config();

const app = express();

// Connect to MongoDB Atlas
mongoose.connect(process.env.Mongo_URI, {
})
.then(() => console.log('✅ Connected to MongoDB Atlas'))
.catch((err) => {
  console.error('❌ MongoDB connection failed:', err.message);
  process.exit(1);
});

// Middleware to serve static files from the FrontEnd directory
app.use(express.static(path.join(__dirname, '../FrontEnd')));


// Middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));

// API routes
app.use('/api/auth', require('./routes/authRoutes'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/authP.html'));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});


