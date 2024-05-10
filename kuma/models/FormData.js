// models/FormData.js
const mongoose = require('mongoose');

const formDataSchema = new mongoose.Schema({
  description: String,
  image: String
});

const FormData = mongoose.model('FormData', formDataSchema);

module.exports = FormData;
