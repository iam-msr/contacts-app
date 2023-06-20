const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

const secretKey = process.env.JWT_SECRET_KEY;

// Register route
router.post('/register', async (req, res) => {
    console.log(req.body.username); // Log before trying to find user
  
    try {
      // Checking whether user exists already or not.
      let usercheck = await User.findOne({ username: req.body.username });
  
      console.log(req.body.username); // Log after trying to find user
  
      if (usercheck) {
        return res.status(400).json({ error: "This email already exists" });
      }
  
      const { username, password } = req.body;
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);
  
      const newUser = await User.create({ username, passwordHash });
      res.status(201).json(newUser);
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

// Login route
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(username);

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: 'Sorry,No user with this email and password exists' });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ error: 'Please login with correct credentials' });
    }

    const token = jwt.sign({ user: { id: user.id } }, secretKey, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
