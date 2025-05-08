const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: false,
    trim: true
  },
  lastName: {
    type: String,
    required: false,
    trim: true
  },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true,
    trim: true
  },
  password: { 
    type: String, 
    required: true 
  },
  username: { 
    type: String, 
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: false,
    trim: true
  },
  birthDate: {
    type: Date,
    required: false
  },
  address: { 
    type: String,
    required: false
  },
  role: { 
    type: String, 
    enum: ["user", "admin"], 
    default: "user" 
  },
  orders: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Order" 
  }],
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date 
  }
});

module.exports = mongoose.model("User", userSchema);
