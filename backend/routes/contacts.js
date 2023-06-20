const express = require('express');
const Contact = require('../models/Contact');
const verifyToken = require('../middleware/verifyToken');
const router = express.Router();

// Add contact
router.post('/contacts', verifyToken, async (req, res) => {
  try {
    const userId = req.authData.user.id;
    const { name, email, phone } = req.body;
    const newContact = await Contact.create({ name, email, phone, user: userId });

    res.status(201).json(newContact);
  } catch (error) {
    console.error('Error creating contact:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get user's contacts
router.get('/contacts', verifyToken, async (req, res) => {
  try {
    const userId = req.authData.user.id;
    const contacts = await Contact.find({ user: userId });

    res.json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
