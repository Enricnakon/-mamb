document.getElementById("sellButton").addEventListener("click", function() {
  document.getElementById("loginModal").style.display = "block";
});

document.getElementById("registerButton").addEventListener("click", function() {
  document.getElementById("registerModal").style.display = "block";
});

document.getElementById("forgotPasswordLink").addEventListener("click", function(event) {
  event.preventDefault();
  document.getElementById("forgotPasswordModal").style.display = "block";
});
// Get the logout modal
var logoutModal = document.getElementById('logoutModal');

// Get the logout button
var logoutButton = document.getElementById('logoutButton');

// When the user clicks the logout button, display the logout modal
logoutButton.addEventListener('click', function() {
    logoutModal.style.display = 'block';
});

// Close modal when close button is clicked
var closeButtons = document.querySelectorAll('.close');
closeButtons.forEach(function(button) {
  button.addEventListener('click', function() {
    var modal = button.closest('.modal');
    modal.style.display = 'none';
  });
});



 //  menuTimeout;

var menuTimeout;

function toggleMenu(show) {
  var dropdownMenu = document.getElementById("dropdownMenu");
  if (show) {
    clearTimeout(menuTimeout);
    dropdownMenu.style.display = "block";
  } else {
    menuTimeout = setTimeout(function() {
      dropdownMenu.style.display = "none";
    }, 3000); // Adjust the timeout as needed
  }
}







// Close modal when close button is clicked
// Close modal when close button is clicked
var closeButtons = document.querySelectorAll('.close');
closeButtons.forEach(function(button) {
  button.addEventListener('click', function() {
    var modal = button.closest('.modal');
    modal.style.display = 'none';
  });
});



































































































const images = document.querySelectorAll('.image-container');
  let currentIndex = 0;

  setInterval(() => {
    images[currentIndex].classList.remove('active');
    currentIndex = (currentIndex + 1) % images.length;
    images[currentIndex].classList.add('active');
  }, 5000); // Change image every 5 seconds





document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.getElementById('loginForm');

  loginForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission
    const formData = new FormData(loginForm);
    const identifier = formData.get('identifier');
    const password = formData.get('password');

    // Check if either identifier or password is empty
    if (!identifier.trim() || !password.trim()) {
      alert('Please enter both username/email and password');
      return; // Exit the function early if fields are empty
    }

    // Now you can send a POST request to your server with the form data
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ identifier, password })
    })
    .then(response => response.json())
    .then(data => {
      if (data.message === 'Login successful') {
        // Redirect to the user page after successful login
        window.location.href = '/form'; // Redirect
      } else {
        alert(data.message);
      }
      loginForm.reset(); // Reset the form after submission
    })
    .catch(error => {
      console.error('Error:', error);
    });
  });
});

 document.addEventListener('DOMContentLoaded', function() {
    const logoutButton = document.getElementById('logoutButton');

    logoutButton.addEventListener('click', function(event) {
      event.preventDefault(); // Prevent the default button behavior

      // Send a GET request to the logout endpoint
      fetch('/logout', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.text())
      .then(data => {
        // Handle the response from the server
        alert(data); // Show an alert with the logout message
        window.location.href = '/'; // Redirect to the home page or login page
      })
      .catch(error => {
        console.error('Error:', error);
      });
    });
  });





registerForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission
    const formData = new FormData(registerForm);
    const username = formData.get('username');
    const email = formData.get('email');
    const password = formData.get('password');

    // Now you can send a POST request to your server with the form data
    fetch('/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, email, password })
    })
    .then(response => response.text()) // Parse the response as text
    .then(data => {
      // Display the response as an alert
      alert(data);

      // If registration is successful and email verification is required,
      // you can inform the user to check their email for verification.
      if (data.includes('Please check your email for verification')) {
        alert('Please check your email for verification.');
      }

      // Reset the form after submission
      registerForm.reset();
    })
    .catch(error => {
      console.error('Error:', error);
    });
  });
 
  forgotPasswordForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission
    const formData = new FormData(forgotPasswordForm);
    const email = formData.get('email');

    // Now you can send a POST request to your server with the form data
    fetch('/forgot-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    })
    .then(response => response.text()) // Parse the response as text
    .then(data => {
      alert(data); // Display the response as an alert (or handle it however you like)
      forgotPasswordForm.reset(); // Clear the form after submission
    })
    .catch(error => {
      console.error('Error:', error);
    });
  });
 




























  document.getElementById('verificationButton').addEventListener('click', verifyEmail);

function verifyEmail() {
  // Get the token from the URL or from wherever it's stored
  const token = '9e71143b4473108de056e2152f296ecb4246dc95'; // Replace with the actual token

  fetch(`/verify/${token}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // Handle successful verification
      alert('Email verified successfully!');
    })
    .catch(error => {
      console.error('Error:', error);
      // Display error message to the user
      alert('Failed to verify email due to a network issue. Please try again or click the link in the verification email.');
    });
}





















  $(document).ready(function() {
  // Fetch latest products for phones on document load
  fetchLatestProducts('phones');
  // Fetch latest products for computers on document load
  fetchLatestProducts('computers');
  // Fetch latest products for houses on document load
  fetchLatestProducts('house');
});

function fetchLatestProducts(category) {
  $.get(`/category/${category}`, function(products) {
    // Render products for the specified category
    displayLatestProducts(category, products);
  });
}
function displayLatestProducts(category, products) {
  const container = $(`#latest${category.charAt(0).toUpperCase() + category.slice(1)}`);
  container.empty(); // Clear previous content

  let activeIndex = 0; // Index of the first active card
  let cardsPerPage = 4; // Number of cards to display per page by default

  if ($(window).width() <= 576) {
    cardsPerPage = 2; // Set the number of cards to display per page for phone screens
  }

  function updateCards() {
    container.empty(); // Clear previous content

    for (let i = activeIndex; i < activeIndex + cardsPerPage && i < products.length; i++) {
      const product = products[i];
      const card = $(`
        <div class="card mt-3 ${i === activeIndex ? 'active' : 'd-none'}">
          <div class="card-header">${product.productName}</div>
          <div class="card-body">
            <p>${product.description}</p>
            <p>Price: $${product.price}</p>
            <img src="/images/${product.productImages[0]}" alt="Product Image" class="img-fluid card-img-top" width="200" height="150">
            <div class="overlay"></div>
          </div>
        </div>
      `);
      
      // Create button container and buttons using jQuery
      const buttonContainer = $('<div class="button-container"></div>');

      const viewBtn = $('<button class="view-btn">View</button>');
      viewBtn.on('click', () => {
        viewProduct({
          productId: product._id,
          productName: product.productName,
          description: product.description,
          price: product.price,
          category: product.category,
          productImages: product.productImages
        });
      });

      const addToCartBtn = $(`<button class="add-to-cart-btn" id="add-to-cart-${product._id}">Add to Cart</button>`);
      addToCartBtn.on('click', () => {
        addToCart(product._id, product.productName, product.price);
      });

      buttonContainer.append(viewBtn);
      buttonContainer.append(addToCartBtn);
      card.find('.overlay').append(buttonContainer);
      container.append(card);
    }
  }

  // Call updateCards initially and on window resize
  $(window).on('resize', updateCards);
  updateCards();

  // Navigation buttons
  container.parent().find('.next-btn').click(function() {
    if (activeIndex + cardsPerPage < products.length) {
      activeIndex += cardsPerPage;
      updateCards();
    }
  });

  container.parent().find('.prev-btn').click(function() {
    if (activeIndex - cardsPerPage >= 0) {
      activeIndex -= cardsPerPage;
      updateCards();
    }
  });
}


 
    const cartItems = [];

    // Function to handle adding product to cart
   // Function to handle adding product to cart
function addToCart(productId, productName, price) {
    const index = cartItems.findIndex(item => item.productId === productId);

    if (index !== -1) {
        cartItems[index].quantity++;
    } else {
        cartItems.push({
          productId: productId,   
          productName: productName,
          
            price: price,
            quantity: 1
        });
    }

    // Show the cart container
    document.getElementById('cart').style.display = 'block';

    updateCartDisplay();
}

    // Function to update the cart display
    function updateCartDisplay() {
        const cartContainer = document.getElementById('cartItems');
        cartContainer.innerHTML = '';
        let totalPrice = 0;

        cartItems.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <span>ID: ${item.productId}, ${item.productName} - $${item.price} <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity('${item.productId}', this.value)"></span>
                <button onclick="removeFromCart('${item.productId}')">Remove</button>
            `;
            cartContainer.appendChild(cartItem);
            totalPrice += item.price * item.quantity;
        });

        document.getElementById('totalPrice').textContent = totalPrice.toFixed(2);
    }

    // Function to update quantity of items in cart
    function updateQuantity(productId, quantity) {
        const item = cartItems.find(item => item.productId === productId);

        if (item) {
            item.quantity = parseInt(quantity);
        }

        updateCartDisplay();
    }

    // Function to remove item from cart
    function removeFromCart(productId) {
        const index = cartItems.findIndex(item => item.productId === productId);

        if (index !== -1) {
            cartItems.splice(index, 1);
            updateCartDisplay();
        }
    }

    // Function to toggle order form visibility
    function toggleOrderForm() {
        const orderForm = document.getElementById('orderForm');
        orderForm.style.display = orderForm.style.display === 'none' ? 'block' : 'none';
    }

    // Function to submit the order
    function submitOrder() {
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();

        if (name && email && phone && cartItems.length > 0) {
            const order = {
                name: name,
                email: email,
                phone: phone,
                cartItems: cartItems,
                totalPrice: parseFloat(document.getElementById('totalPrice').textContent)
            };

            // Send the order data to the server for processing
            fetch('/addOrder', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(order)
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Failed to submit order');
            })
            .then(data => {
                // Clear the cart and hide the order form
                cartItems.length = 0;
                updateCartDisplay();
                toggleOrderForm();
                // Optionally, show a confirmation message
                alert(data.message);
            })
            .catch(error => {
                console.error('Error submitting order:', error);
                alert('Failed to submit order. Please try again later.');
            });
        } else {
            alert('Please fill in all required fields and add items to your cart.');
        }
    }
    // Function to handle viewing product details
    function viewProduct(product) {
      // Populate product details in the modal
      const productDetails = document.getElementById('productDetails');
      productDetails.innerHTML = `
        <h2>${product.productName}</h2>
        <p>Product ID: ${product.productId}</p>
        <p>Description: ${product.description}</p>
        <p>Price: ${product.price}</p>
       
      `;
      // Populate images in the image container
      const imageContainer = document.getElementById('imageContainer');
      imageContainer.innerHTML = '';
      product.productImages.forEach((image, index) => {
        const img = document.createElement('img');
        img.src = `/images/${image}`;
        img.alt = product.productName;
        img.onclick = () => swapImages(index);
        img.style.width = index === 0 ? '200px' : '50px';
        img.style.height = index === 0 ? '300px' : '50px';
        imageContainer.appendChild(img);
      });
      // Display the modal
      document.getElementById('productModal').style.display = 'block';
    }

    // Function to swap big and small images
    function swapImages(index) {
      const images = document.getElementById('imageContainer').getElementsByTagName('img');
      const tempSrc = images[0].src;
      images[0].src = images[index].src;
      images[index].src = tempSrc;
    }

    // Fetch products from API endpoint
// Fetch products from API endpoint
// Fetch products from API endpoint
 
    // Close the modal when the close button is clicked
    document.querySelector('.close').addEventListener('click', () => {
      document.getElementById('productModal').style.display = 'none';
    });

    // Close the modal when clicking outside of it
    window.addEventListener('click', (event) => {
      if (event.target == document.getElementById('productModal')) {
        document.getElementById('productModal').style.display = 'none';
      }
    });









// Define a route handler for the /form route
app.get('/view/form', (req, res) => {
    // Respond with a simple message indicating that the form is accessed
    res.send('This is the form page');
});
