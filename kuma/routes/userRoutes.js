const express = require('express');
const router = express.Router();
const Product = require('./models/Product');
const { requireAuth } = require('./middleware/authMiddleware'); // Import your authentication middleware

// Route handler for "/user"
router.get('/user', requireAuth, async (req, res) => {
    try {
        // Retrieve the currently authenticated user's ID from the session
        const userId = req.session.userId;

        // Query the database for products created by the authenticated user
        const products = await Product.find({ createdBy: userId });

        // Render a page with the retrieved products
        res.render('userProducts', { products });
    } catch (error) {
        console.error('Error fetching user products:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
