const express = require('express');
const router = express.Router();
const Item = require('../models/item');

// Home page route
router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.render('/index', { items });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Add item route
router.post('/addItem', async (req, res) => {
  try {
    const { imageURL, paragraph } = req.body;
    const newItem = new Item({ imageURL, paragraph });
    await newItem.save();
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
