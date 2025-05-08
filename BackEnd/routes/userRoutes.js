const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware'); // استيراد الميدل وير للتحقق من التوكن
const { getUserProfile, updateUserProfile } = require('../controllers/userController');

// مسار الحصول على بيانات المستخدم
router.get('/profile', auth, getUserProfile);

// مسار تحديث بيانات المستخدم
router.put('/profile', auth, updateUserProfile);

module.exports = router;
