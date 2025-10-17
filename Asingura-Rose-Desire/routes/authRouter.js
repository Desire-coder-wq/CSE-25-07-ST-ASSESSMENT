const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();

// Mock user database (in production, use real database)
const users = [];

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  // Simple validation
  if (!email || !password) {
    return res.render('login', { 
      title: 'Login',
      error: 'Please fill in all fields' 
    });
  }

  // Find user (in production, query database)
  const user = users.find(u => u.email === email);
  
  if (!user) {
    return res.render('login', { 
      title: 'Login',
      error: 'Invalid email or password' 
    });
  }

  // Check password
  const isMatch = await bcrypt.compare(password, user.password);
  
  if (!isMatch) {
    return res.render('login', { 
      title: 'Login',
      error: 'Invalid email or password' 
    });
  }

  // Set session
  req.session.user = user;
  res.render('success', { 
    title: 'Success',
    message: 'You have successfully signed into the Refactory system. Feel at home' 
  });
});

router.post('/signup', async (req, res) => {
  const { email, phone, password, confirmPassword } = req.body;
  
  // Validation
  if (!email || !phone || !password || !confirmPassword) {
    return res.render('signup', { 
      title: 'Sign Up',
      error: 'Please fill in all fields' 
    });
  }

  if (password !== confirmPassword) {
    return res.render('signup', { 
      title: 'Sign Up',
      error: 'Passwords do not match' 
    });
  }

  if (password.length < 6) {
    return res.render('signup', { 
      title: 'Sign Up',
      error: 'Password must be at least 6 characters' 
    });
  }

  // Check if user exists
  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.render('signup', { 
      title: 'Sign Up',
      error: 'User already exists' 
    });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 12);
  
  // Create user
  const newUser = {
    id: Date.now().toString(),
    email,
    phone,
    password: hashedPassword
  };

  users.push(newUser);
  
  res.render('success', { 
    title: 'Success',
    message: 'You have successfully created your Refactory account!',
    showLoginLink: true 
  });
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login');
});

module.exports = router;