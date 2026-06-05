const express = require('express');
const router = express.Router();

// Import controllers
const {
  registerUser,
  loginUser,
  getUserProfile,
} = require('../controllers/authController');

// Import middlewares
const {
  validateRegister,
  validateLogin,
} = require('../middleware/validateMiddleware');
const { protect } = require('../middleware/authMiddleware');

// Public route to register a new user
router.post('/register', validateRegister, registerUser);

// Public route to log in a user
router.post('/login', validateLogin, loginUser);

// Protected route to view logged-in user profile details
router.get('/profile', protect, getUserProfile);

module.exports = router;
