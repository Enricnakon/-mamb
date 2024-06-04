const express = require('express');
const nodemailer = require('nodemailer');
const Customer = require('../models/customerSchema');

const router = express.Router();

// Register route for customers
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await Customer.findOne({ email });
    if (existingUser) {
      return res.status(400).send('Customer already exists');
    }

    // Generate the verification token using the function
    const verificationToken = generateVerificationToken();

    const newCustomer = new Customer({ username, email, password, verificationToken });
    await newCustomer.save();

    // Include the verification token in the email sent to the customer
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'your-email@gmail.com', // Update with your Gmail email address
        pass: 'your-password' // Update with your Gmail password
      }
    });

    const mailOptions = {
      from: 'your-email@gmail.com', // Update with your Gmail email address
      to: email,
      subject: 'Email Verification',
      html: `Click <a href="http://localhost:3000/customer/verify/${verificationToken}">here</a> to verify your email.`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        return res.status(500).send('Failed to send verification email');
      }
      console.log('Email sent:', info.response);
      // Send verification token to the client along with the registration success message
      res.status(201).json({ message: 'Customer registered successfully. Please check your email for verification.', verificationToken });
    });

  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Login route for customers
router.post('/login', async (req, res) => {
  try {
    // Login logic here
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Verification route for customers
router.get('/verify/:token', async (req, res) => {
  try {
    // Verification logic here
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Password reset route for customers
router.post('/forgot-password', async (req, res) => {
  try {
    // Password reset logic here
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

router.get('/reset-password/:token', async (req, res) => {
  try {
    // Reset password logic here
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
