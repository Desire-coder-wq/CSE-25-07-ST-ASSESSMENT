const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Signup Route
router.post('/signup', async (req, res) => {
  try {
    const { fullName, email, phoneNumber, password, confirmPassword } = req.body;

    const errors = [];
    if (!fullName || !email || !phoneNumber || !password || !confirmPassword)
      errors.push('Please fill in all fields');

    if (password !== confirmPassword)
      errors.push('Passwords do not match');

    if (password && password.length < 6)
      errors.push('Password must be at least 6 characters');

    if (errors.length > 0) return res.status(400).json({ success: false, errors });

    // Check if user exists
    const existingUser = await User.findOne({ $or: [{ email }, { phoneNumber }] });
    if (existingUser)
      return res.status(400).json({ success: false, errors: ['User with this email or phone already exists'] });

    // Hash password and save user
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ fullName, email, phoneNumber, password: hashedPassword });
    await newUser.save();

    return res.json({ success: true, message: 'Account created successfully!' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, errors: ['Server error'] });
  }
});

// Login Route using Passport Local (configured in config/passport.js)
router.post('/login', async (req, res, next) => {
  const passport = req.app.get('passport');
  passport.authenticate('local', (err, user, info) => {
    if (err) return res.status(500).json({ success: false, errors: ['Server error'] });
    if (!user) return res.status(400).json({ success: false, errors: [info.message] });

    req.login(user, err => {
      if (err) return res.status(500).json({ success: false, errors: ['Login failed'] });
      return res.json({ success: true, message: 'Login successful' });
    });
  })(req, res, next);
});

module.exports = router;
