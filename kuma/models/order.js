const mongoose = require('mongoose');

// Define the schema for the Order model
const orderSchema = new mongoose.Schema({
  cartItems: [{ 
    productId: String,
    productName: String,
    price: Number,
    quantity: Number,
    image: String  // Added image field to store the URL or path of the product image
  }],
  totalPrice: { type: Number, required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true }
});

// Create the Order model based on the schema
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
