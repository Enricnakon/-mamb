const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const crypto = require('crypto');
const path = require('path');
const nodemailer = require('nodemailer');
const User = require('./models/User');
const Product = require('./models/Product');
const authMiddleware = require('./middleware/authMiddleware');
const Item = require('./models/item');
const Order = require('./models/order'); // Assuming Order is defined in a file named order.js
const formDataRouter = require('./routes/form'); // Import form router
const FormData = require('./models/FormData');


const multer = require('multer');
const router = express.Router(); // Define router here
 

const app = express();
const PORT = 3000;

app.use('/form', formDataRouter);

// Define a route to render the form page
app.get('/formB', (req, res) => {
  res.render('formB');
});







// Generate a random secret key for session
const secretKey = crypto.randomBytes(32).toString('hex');
console.log('Generated secret key:', secretKey);

// Set up session middleware
app.use(session({
  secret: secretKey, // Use the generated secret key
  resave: false,
  saveUninitialized: true
}));

// Connect to MongoDB
mongoose.connect('mongodb+srv://juma:juma@cluster0.tvrxlqa.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error(err));

// Middleware for parsing JSON and URL-encoded request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set up static files directory
app.use(express.static('public'));

// Set up view engine and views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Apply authMiddleware to protected routes
// Define requireAuth middleware
const requireAuth = (req, res, next) => {
  if (req.session && req.session.userId) {
      next(); // If user is authenticated, proceed to the next middleware
  } else {
      res.redirect('/login'); // If user is not authenticated, redirect to the login page
  }
};

// Route to render user.ejs with user-specific products
app.get('/userProducts', authMiddleware.requireAuth, async (req, res) => {
  try {
    // Fetch products created by the currently authenticated user
    const userId = req.session.userId;
    const products = await Product.find({ createdBy: userId });

    // Render the userProducts.ejs view with products data
    res.render('userProducts', { products });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).send('Internal Server Error');
  }
});
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'enricnakon@gmail.com',
    pass: 'fdvj ulhv ogut gvpq'
  }
});

// Start the server
 
// L// Login route with server-side validation
app.post('/login', async (req, res) => {
  try {
    // Extract username/email and password from request body
    const { identifier, password } = req.body;

    // Validate input data: Check if both fields are present
    if (!identifier || !password) {
      return res.status(400).json({ message: 'Both username/email and password are required' });
    }

    // Now you can proceed with authentication logic
    // For example, find the user by username/email and verify password

    // Example authentication logic (replace it with your actual authentication logic)
    const user = await User.findOne({ $or: [{ email: identifier }, { username: identifier }] });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    // If authentication is successful, you can send a success response
    req.session.userId = user._id;
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = app;

// Route to render user.ejs with user-specific products
// Route to render user.ejs with all products
// Route to render user.ejs with all products
 
// Route to render user.ejs with user-specific products
 

// Define the function to generate the verification token
function generateVerificationToken() {
  const tokenLength = 32;
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let verificationToken = '';
  for (let i = 0; i < tokenLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    verificationToken += characters[randomIndex];
  }
  return verificationToken;
}

// Register route
app.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send('User already exists');
    }

    // Generate the verification token using the function
    const verificationToken = generateVerificationToken();

    const newUser = new User({ username, email, password, verificationToken });
    await newUser.save();

    req.session.userId = newUser._id;

    // Include the verification token in the email sent to the user
    const mailOptions = {
      from: email, 
      to: email,
      subject: 'Email Verification',
      html: `Click <a href="http://localhost:3000/verify/${verificationToken}">here</a> to verify your email.`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        return res.status(500).send('Failed to send verification email');
      }
      console.log('Email sent:', info.response);
      // Send verification token to the client along with the registration success message
      res.status(201).json({ message: 'User registered successfully. Please check your email for verification.', verificationToken });
    });

  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Email verification route
app.get('/verify/:token', async (req, res) => {
  try {
    const { token } = req.params;
    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return res.status(400).send('Invalid verification token');
    }

    user.verified = true;  // Mark user as verified
    user.verificationToken = null;  // Remove the verification token
    await user.save();

    res.send('Email verified successfully!');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});










app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to logout' });
    }
    res.status(200).json({ message: 'Logged out successfully' });
  });
});















app.get('/verify/:token', async (req, res) => {
  try {
    const token = req.params.token;
    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return res.status(400).send('Invalid or expired verification token');
    }

    if (user && user._id) {
      console.log('User ID:', user._id);
    } else {
      console.log('User or user ID not available');
    }

    if (user.verified) {
      return res.redirect('/login');
    }

    user.verified = true;
    user.verificationToken = undefined;
    await user.save();

    res.status(200).send('Email verified successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

app.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send('User not found');
    }
    const resetToken = generateResetToken();
    user.resetToken = resetToken;
    await user.save();

    const mailOptions = {
      from: email,
      to: email,
      subject: 'Password Reset',
      html: `Click <a href="http://localhost:3000/reset-password/${resetToken}">here</a> to reset your password.`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.status(500).send('Failed to send reset password email');
      } else {
        console.log('Email sent: ' + info.response);
        res.status(200).send('Reset password email sent. Please check your email.');
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

app.get('/reset-password/:token', async (req, res) => {
  try {
    const token = req.params.token;
    const user = await User.findOne({ resetToken: token });
    if (!user) {
      return res.status(400).json({ message: 'Invalid token' });
    }
    res.status(200).json({ message: 'Valid token' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

 
  
app.get('/reset-password/:token', async (req, res) => {
  try {
    const token = req.params.token;
    const user = await User.findOne({ resetToken: token });
    if (!user) {
      return res.status(400).json({ message: 'Invalid token' });
    }
    res.status(200).json({ message: 'Valid token' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});
 
  








































































 


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images/'); // Define the destination path for uploaded files
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  });
  
  const upload = multer({ storage: storage });
   
  app.get('/category/:category', async (req, res) => {
    const category = req.params.category;
    try {
        const products = await Product.find({ category }).sort({ createdAt: -1 });
        const formattedProducts = products.map(product => ({
            _id: product._id,
            productName: product.productName,
            description: product.description,
            price: product.price,
            cutprice:product. cutprice,
            productImages: product.productImages
        }));
        res.json(formattedProducts);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/latest', async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        const formattedProducts = products.map(product => ({
            _id: product._id,
            productName: product.productName,
            description: product.description,
            price: product.price,
            cutprice:product. cutprice,
            productImages: product.productImages
        }));
        res.json(formattedProducts);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});














































































// Route to fetch all products
app.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error('Error fetching products:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to fetch products with a specific subcategory
app.get('/products/:subcategory', async (req, res) => {
  const subcategory = req.params.subcategory; // Get the subcategory from the request params

  try {
    // Query the database for products with the specified subcategory
    const products = await Product.find({ subCategory: subcategory });

    // Send the products as a response
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
  
  // Define route to render the product details EJS file
  // Define route to render the product details EJS file
   
  // Serve static files (like index.html and images)
  app.use(express.static(path.join(__dirname, 'public')));
  app.use('/images', express.static(path.join(__dirname, 'public/images')));
  
  // Handle file uploads
  app.post('/upload', upload.single('image'), (req, res) => {
    res.json({ imageUrl: `/images/${req.file.filename}` });
  });
  
  
  
   
  
  app.post('/addOrder', async (req, res) => {
    try {
      const { cartItems, totalPrice, name, phone, email } = req.body;
  
      // Save the order data to your database
      const order = new Order({
        cartItems,
        totalPrice,
        name,
        phone,
        email
      });
      await order.save();
  
      // Send email confirmation to the customer
      await transporter.sendMail({
        from: 'enricnakon@gmail.com',
        to: email, // Use the provided email address for the recipient
        subject: 'Order Confirmation',
        html: `
          <p>Dear ${name},</p>
          <p>Your order has been placed successfully. Below are the details:</p>
          <p>Cart Items: ${JSON.stringify(cartItems)}</p>
          <p>Total Price: ${totalPrice}</p>
          <p>Phone: ${phone}</p>
          <p>Thank you for shopping with us!</p>
        `
      });

      await transporter.sendMail({
        from: email,
        to: 'enricnakon@gmail.com', // Use the provided email address for the recipient
        subject: 'Order Confirmation',
        html: `
          <p>name ${name},</p>
          <p>order has been placed successfully. Below are the details:</p>
          <p>Cart Items: ${JSON.stringify(cartItems)}</p>
          <p>Total Price: ${totalPrice}</p>
          <p>Phone: ${phone}</p>
         
        `
      });


       
      // Respond with success message
      res.status(200).json({ message: 'Order placed successfully' });
    } catch (error) {
      console.error('Error placing order:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  app.get('/admin', async (req, res) => {
    try {
      // Define an async function inside the route handler
      const fetchOrders = async () => {
        return await Order.find().sort({ createdAt: 1 });
      };
  
      // Call the async function and wait for the result
      const orders = await fetchOrders();
  
      // Render the admin.ejs file and pass the orders data to it
      res.render('admin', { orders });
    } catch (error) {
      console.error('Error fetching orders:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

  module.exports = router;



// 

  app.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.render('productupld', { products });
    } catch (err) {
        console.error('Error fetching products:', err);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/products/subcategory/:subCategory', async (req, res) => {
  try {
    const { subCategory } = req.params;
    const products = await Product.find({ subCategory });
    res.json(products); // Return products as JSON
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.get('/subcategory/:subCategory', async (req, res) => {
  try {
    const { subCategory } = req.params;
    const products = await Product.find({ subCategory });
    res.json(products); // Return products as JSON
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});







  app.get('/admin', async (req, res) => {
    try {
      // Define an async function inside the route handler
      const fetchOrders = async () => {
        return await Order.find().sort({ createdAt: 1 });
      };
  
      // Call the async function and wait for the result
      const orders = await fetchOrders();
  
      // Render the admin.ejs file and pass the orders data to it
      res.render('admin', { orders });
    } catch (error) {
      console.error('Error fetching orders:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
app.get('/views/admin_dashboard', async (req, res) => {
    try {
      // Retrieve necessary data from the database
      let products = await Product.find();
      let orders = await Order.find();
   
    
  
      // Filter products by category if category parameter is provided in the query
      const category = req.query.category;
      if (category) {
        products = await Product.find({ category });
      }
  
      // Search products by name if search query parameter is provided
      const searchQuery = req.query.search;
      if (searchQuery) {
        const regex = new RegExp(searchQuery, 'i');
        products = await Product.find({ productName: regex });
      }
  
      // Organize products by category
      const categories = await Product.distinct('category');
  
      // Render the admin dashboard EJS file and pass the data as variables
      res.render('admin_dashboard', { 
        products, 
        orders, 
         
        categories,
        selectedCategory: category,
        searchQuery
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });



  
  app.get('/productupld', async (req, res) => {
    try {
      const products = await Product.find(); // Fetch all products from the database
      res.render('productupld', { products }); // Pass the products data to the view
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  });
  
// Get Edit Product Form
app.get('/editProduct/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id); // Find the product by ID
    res.render('editproduct', { product }); // Render the editproduct view with product data
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Update Product Route
app.post('/editProduct/:id', upload.array('productImages', 3), async (req, res) => {
  try {
    const { productName, description, price,cutprice,category } = req.body;
    let product = await Product.findById(req.params.id); // Find the product by ID

    product.productName = productName;
    product.description = description;
    product.price = price;
    product. cutprice = cutprice;
    product.category = category;

    // Handle image updates
    if (req.files) {
      const imagePaths = req.files.map(file => file.filename);
      if (imagePaths.length > 0) {
        product.productImages = imagePaths; // Replace existing images with new ones
      }
    }

    await product.save(); // Save the updated product
    // Redirect to the /form page after updating
    res.redirect('/productupld');
  } catch (error) {
    console.error('Error processing form data:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Delete Product Route
app.post('/delete/:id', async (req, res) => {
  try {
      await Product.findByIdAndDelete(req.params.id); // Find and delete the product by ID
      res.redirect('/productupld'); // Redirect to the product listing page after deleting
  } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
  }
});


















































  app.get('/ordersview', async (req, res) => {
    try {
      const orders = await Order.find(); // Fetch all orders from the database
      res.render('ordersview', { orders }); // Pass the orders data to the view
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  });
  
// POST route to handle deletion of orders
app.post('/orders/delete/:orderId', async (req, res) => {
  const { orderId } = req.params;
  try {
      // Find the order by ID and delete it
      await Order.findByIdAndDelete(orderId);
      res.redirect('/ordersview'); // Redirect back to the orders view after deletion
  } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
  }
});










app.post('/addProduct', upload.array('productImages', 3), async (req, res) => {
  try {
    console.log('Session data:', req.session);

    // Ensure user is authenticated
    if (!req.session.userId) {
      return res.status(401).send('Unauthorized');
    }

    const { productName, description, price,cutprice, subCategory, category } = req.body;
    console.log('Request body:', req.body);
    console.log('Received subCategory:', subCategory);

    const productImages = req.files.map(file => file.filename);

    if (productImages.length !== 3) {
      return res.status(400).send('Please upload exactly 3 images.');
    }

    // Retrieve the user ID from the session
    const userId = req.session.userId;

    const newProduct = new Product({
      productName,
      description,
      price,
      cutprice,
      category,
      subCategory,
      productImages,
      createdBy: userId
    });

    await newProduct.save(); // Save the new product to the database

    // Redirect to the /form page
    res.redirect('/form');
  } catch (error) {
    console.error('Error processing form data:', error);
    res.status(500).send('Internal Server Error');
  }
});








  app.get('/form', (req, res) => {
    res.render('form'); // Assuming your form.ejs file is named 'form.ejs' and is located in your views directory
  });
  








  app.get('/', (req, res) => {
    res.render('index');
  });
  
 
app.get('/formB', (req, res) => {
  res.render('formB');
});




// Route to retrieve FormData
// Define routes
app.get('/api/formdata', async (req, res) => {
    try {
        // Fetch all data from the FormData collection
        const formData = await FormData.find();
        res.json(formData); // Send the data as JSON response
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

  
  
// server.js

// Route to retrieve FormData for viewing
app.get('/viewFormData', async (req, res) => {
  try {
    const formData = await FormData.find();
    console.log(formData); // Log the fetched data
    // Fetch editFormData here if needed
    const editFormData = await FormData.findOne({ /* add condition to fetch specific data for editing */ });
    res.render('viewFormData', { formData, editFormData }); // Pass both formData and editFormData to the view
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});













app.get('/search', async (req, res) => {
  const query = req.query.query;
  const category = req.query.category;

  if (!query || !category) {
    return res.status(400).json({ error: 'Query and category parameters are required' });
  }

  try {
    const products = await Product.find({
      category: category,
      $or: [
        { productName: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { subCategory: { $regex: query, $options: 'i' } }
      ]
    });
    res.json(products);
  } catch (error) {
    console.error('Error fetching search results:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


  

app.get('/search', async (req, res) => {
  const query = req.query.query;
  const category = req.query.category;

  if (!query || !category) {
    return res.status(400).json({ error: 'Query and category parameters are required' });
  }

  try {
    const products = await Product.find({
      category: category,
      $or: [
        { productName: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { subCategory: { $regex: query, $options: 'i' } }
      ]
    });
    res.json(products);
  } catch (error) {
    console.error('Error fetching search results:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.listen(3000, () => {
  console.log('Server running on port 3000');
});