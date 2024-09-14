const express = require('express');
const { registerUser, loginUser, getProfile } = require('../controller/authController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();
console.log("ppp")
// Authentication routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected route to get user profile (requires JWT token)
router.get('/profile', protect, getProfile);

module.exports = router;
