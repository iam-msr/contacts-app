const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const Contact = mongoose.model('Contact', contactSchema);
module.exports = Contact;
