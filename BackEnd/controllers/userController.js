
const User = require('../models/User');
const bcrypt = require('bcryptjs');
exports.getUserProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    birthDate: user.birthDate
  });
};
exports.updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const { firstName, lastName, email, phone, birthDate, password } = req.body;

    // التحقق من البيانات المرسلة وتحديثها إذا كانت موجودة
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (email) user.email = email;
    if (phone) user.phone = phone;
    if (birthDate) user.birthDate = birthDate;
    if (password) user.password = await bcrypt.hash(password, 10);

    await user.save();

    res.json({ message: "Profile updated successfully." });
  } catch (err) {
    console.error("❌ Error updating profile:", err);
    res.status(500).json({ error: "Server error during update" });
  }
};
