const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
  const { username, email, password, firstName, lastName, phone, birthDate } = req.body;

  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ error: 'Email already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      firstName,
      lastName,
      phone,
      birthDate
    });

    res.status(201).json({ message: 'User created' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Registration failed' });
  }
};


exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: 3600 });

    // ✅ إرسال بيانات المستخدم مع التوكن
    res.json({
      token,
      user: {
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        username: user.username,
        email: user.email,
        phone: user.phone || '',
        birthDate: user.birthDate || '',
        role: user.role
      }
    });;
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Login failed' });
  }
};
