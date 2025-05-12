const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    enum: ["denim", "oversized", "polo", "basics"],
    required: true
  },
  images: [{
    type: String
  }],
  stock: {
    type: Number,
    default: 0
  },
  sizes: [{
    type: String
  }], 
  colors: [{
    type: String,
    enum: ["Black", "White"]
  }],
  featured: {
    type: Boolean,
    default: false
  }, 
  createdAt: {
    type: Date,
    default: Date.now
  }
});
module.exports = mongoose.model('Product', productSchema);
