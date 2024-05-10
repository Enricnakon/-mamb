// authMiddleware.js

// Import any necessary modules
const User = require('../models/User');

// Middleware function to check if the user is authenticated
const requireAuth = (req, res, next) => {
    // Check if the user is logged in (you may have your own way to do this, like checking session or token)
    if (req.session && req.session.userId) {
        // User is authenticated, proceed to the next middleware
        next();
    } else {
        // User is not authenticated, redirect them to the login page or send an error response
        res.status(401).send('Unauthorized');
    }
};

// Export the middleware functions
module.exports = { requireAuth };
