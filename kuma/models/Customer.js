const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  verified: {
    type: Boolean,
    default: false
  },
  verificationToken: String,
  resetPasswordToken: String, // New field for storing reset password token
  resetPasswordExpires: Date // New field for storing token expiration time
});

const Customer = mongoose.model('Customer', CustomerSchema);

module.exports = Customer;
