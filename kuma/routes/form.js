// routes/form.js

const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const FormData = require('../models/FormData');

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// Initialize multer upload
const upload = multer({ storage: storage });

// Handle form submission
router.post('/submit', upload.single('image'), async (req, res) => {
  try {
    const formData = new FormData({
      description: req.body.description,
      image: req.file.filename
    });
    await formData.save();
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Route to delete FormData
// Route to delete FormData
router.post('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await FormData.findByIdAndDelete(id);
    res.redirect('/viewFormData'); // Redirect to the viewFormData page after deletion
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Route to render the edit form
router.get('/edit/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const formData = await FormData.findById(id);
    res.render('editFormData', { formData }); // Render the edit form with the fetched form data
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

//// Route to update FormData
router.post('/edit/:id', upload.single('newImage'), async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    let updateData = { description }; // Initialize update data with description

    // Check if a new image file is uploaded
    if (req.file) {
      updateData.image = req.file.filename; // Update image field with new filename
    }

    await FormData.findByIdAndUpdate(id, updateData);
    res.redirect('/'); // Redirect to the home page after update
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
