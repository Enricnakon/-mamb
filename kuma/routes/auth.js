const express = require('express');
const Customer = require('../models/Customer');
const router = express.Router();
const session = require('express-session');
const crypto = require('crypto'); // Import crypto module
const nodemailer = require('nodemailer'); // Import nodemailer module

 

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'enricnakon@gmail.com',
    pass: 'fdvj ulhv ogut gvpq'
  }
});

// Generate a random verification token
const generateVerificationToken = () => {
  return crypto.randomBytes(20).toString('hex');
};

// Verification route
// Verification route
// Verification route
router.get('/verify/:token', async (req, res) => {
    const token = req.params.token;
    try {
      const customer = await Customer.findOneAndUpdate({ verificationToken: token }, { verified: true, verificationToken: null });
      if (customer) {
        // Handle successful verification
        res.send('Account verified successfully');
      } else {
        // Handle invalid or expired token
        res.status(404).send('Invalid or expired token');
      }
    } catch (err) {
      console.error(err);
      // Handle internal server error
      res.status(500).send('Internal server error');
    }
  });
  

router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    const verificationToken = generateVerificationToken(); // Generate verification token
    const newCustomer = new Customer({ username, email, password, verificationToken });
    try {
      await newCustomer.save();
      // Send verification email with HTML content and inline CSS
      const mailOptions = {
        from: email,// Set your sender email address here
        to: email,
        subject: 'Account Verification',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <p style="font-size: 16px;">Hello ${username},</p>
            <p style="font-size: 16px;">Thank you for registering with us. Please click on the following link to verify your account:</p>
            <p style="font-size: 16px;"><a href="http://localhost:3000/auth/verify/${verificationToken}" style="color: #007bff; text-decoration: none; font-weight: bold;">Verify Your Account</a></p>
            <p style="font-size: 16px;">If you did not request this verification, you can safely ignore this email.</p>
            <p style="font-size: 16px;">Once your account is verified, you can <a href="http://localhost:3000/auth/login" style="color: #007bff; text-decoration: none; font-weight: bold;">login here</a>.</p>
          </div>
        `
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          res.status(500).send('Error sending verification email');
        } else {
          console.log('Email sent: ' + info.response);
          res.status(201).send('Customer registered successfully. Check your email for verification.');
        }
      });
    } catch (err) {
      console.error(err);
      res.status(500).send('Error registering customer');
    }
  });

  // Login route

 // In auth.js or wherever your authentication routes are defined
router.get('/login', (req, res) => {
    // Render the login form or serve a static login page
    res.render('login');
  });
  
 
// Generate a random secret key for session
const secretKey = crypto.randomBytes(32).toString('hex');
console.log('Generated secret key:', secretKey);

// Set up session middleware
router.use(session({
  secret: secretKey, // Use the generated secret key
  resave: false,
  saveUninitialized: true
}));

// Login route
router.get('/login', (req, res) => {
  // Render the login form or serve a static login page
  res.render('login');
});

router.post('/login', async (req, res) => {
  const { identifier, password } = req.body;
  try {
    // Find the customer in the database by username or email and password
    const customer = await Customer.findOne({ $or: [{ username: identifier }, { email: identifier }], password });

    // If a customer is found and the password matches, login is successful
    if (customer) {
      // Store customer's data in the session
      req.session.customer = customer;

      // Redirect to index.html after successful login
      res.redirect('/index.html');
    } else {
      // If no customer is found or password doesn't match, send invalid credentials error
      res.status(400).send('Invalid credentials');
    }
  } catch (err) {
    // If an error occurs during the login process, send internal server error
    console.error(err);
    res.status(500).send('Error logging in');
  }
});
















































// Step 1: Generate Password Reset Token
const generatePasswordResetToken = () => {
    return crypto.randomBytes(20).toString('hex');
};
  
// Step 2: Send Password Reset Email
router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    try {
        const customer = await Customer.findOne({ email });
        if (!customer) {
            return res.status(404).send('Customer not found');
        }
        const resetToken = generatePasswordResetToken();
        customer.resetPasswordToken = resetToken;
        customer.resetPasswordExpires = Date.now() + 3600000; // Token expires in 1 hour
        await customer.save();
  
        const mailOptions = {
            from: 'your@example.com',
            to: email,
            subject: 'Password Reset',
            html: `
                <p>You are receiving this email because you (or someone else) has requested a password reset for your account.</p>
                <p>Please click on the following link, or paste this into your browser to complete the process:</p>
                <p><a href="http://localhost:3000/auth/reset-password/${resetToken}">Reset Password</a></p>
                <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
            `
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                return res.status(500).send('Error sending password reset email');
            }
            console.log('Email sent: ' + info.response);
            res.send('Password reset email sent');
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error resetting password');
    }
});
  
// Step 3: Handle Password Reset Request
router.get('/reset-password/:token', async (req, res) => {
    const { token } = req.params;
    try {
        const customer = await Customer.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });
        if (!customer) {
            return res.status(400).send('Password reset token is invalid or has expired');
        }
        // Render the password reset form
        res.render('reset-password', { token });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error resetting password');
    }
});
  
router.post('/reset-password/:token', async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
    try {
        const customer = await Customer.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });
        if (!customer) {
            return res.status(400).send('Password reset token is invalid or has expired');
        }
        // Update the customer's password
        customer.password = password;
        customer.resetPasswordToken = undefined;
        customer.resetPasswordExpires = undefined;
        await customer.save();
        res.send('Password reset successful');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error resetting password');
    }
});





module.exports = router;
