// routes/auth.js
const express = require('express');
const router = express.Router();

// Import your authController
const authController = require('../controllers/authController');

// Define your routes
router.post('/register', authController.register); // This line should have a callback function (e.g., authController.register)
router.post('/login', authController.login); // This line should have a callback function (e.g., authController.login)

module.exports = router;
