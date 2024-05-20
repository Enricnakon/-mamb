const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  subCategory: { type: String, required: true }, // Ensure this is set to required if necessary
  productImages: [{ type: String, required: true }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }]
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
