const express = require('express');
const router = express.Router();
const Item = require('../models/item');

// Get all items
router.get('/getData', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
