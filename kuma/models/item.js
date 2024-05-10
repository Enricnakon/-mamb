const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  imageURL: String,
  paragraph: String
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
