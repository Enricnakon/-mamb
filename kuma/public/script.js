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


// Handle opening and closing of modals
document.querySelectorAll('.close').forEach(closeBtn => {
  closeBtn.addEventListener('click', () => {
    closeBtn.closest('.modal').style.display = 'none';
  });
});

window.addEventListener('click', (event) => {
  if (event.target.classList.contains('modal')) {
    event.target.style.display = 'none';
  }
});












 

























// Handle opening and closing of modals
document.querySelectorAll('.close').forEach(closeBtn => {
  closeBtn.addEventListener('click', () => {
    closeBtn.closest('.modal').style.display = 'none';
  });
});

window.addEventListener('click', (event) => {
  if (event.target.classList.contains('modal')) {
    event.target.style.display = 'none';
  }
});

// Event listener for the logout button in the new location
document.getElementById('logoutButton').addEventListener('click', () => {
  document.getElementById('logoutModal').style.display = 'block';
});

// Event listener for confirming logout in the logout modal
document.getElementById('logoutConfirmButton').addEventListener('click', () => {
  // Perform logout actions here
  console.log('User logged out');
  document.getElementById('logoutModal').style.display = 'none';
});

















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

  const registerForm = document.getElementById('registerForm');

  registerForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission
  
    const formData = new FormData(registerForm);
    const username = formData.get('username');
    const email = formData.get('email');
    const password = formData.get('password');
  
    // Send a POST request to your server with the form data
    fetch('/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, email, password })
    })
    .then(response => response.json()) // Parse the response as JSON
    .then(data => {
      // Display the response message
      alert(data.message);
  
      // If a verification token is provided, inform the user to check their email for verification
      if (data.verificationToken) {
        alert('Please check your email for verification.');
      }
  
      // Reset the form after submission
      registerForm.reset();
    })
    .catch(error => {
      console.error('Error:', error);
      // Handle any errors, e.g., display an error message to the user
      alert('An error occurred. Please try again.');
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
 
























 
















$(document).ready(function() {
  // Fetch latest products for phones on document load
  fetchLatestProducts('phones');
  // Fetch latest products for computers on document load
  fetchLatestProducts('computers');
  // Fetch latest products for houses on document load
  fetchLatestProducts('house');
  // Fetch latest products for vehicles on document load
  fetchLatestProducts('vehicle');
  // Fetch latest products for furniture on document load
  fetchLatestProducts('furniture');
  // Fetch latest products for clothes on document load
  fetchLatestProducts('clothes');
  // Fetch latest products for cosmetics on document load
  fetchLatestProducts('cosmetics');
  // Fetch latest products for services on document load
  fetchLatestProducts('services');
});

function fetchLatestProducts(category) {
  $.get(`/category/${category}`, function(products) {
    // Render products for the specified category
    displayLatestProducts(category, products);
  });
}

 
  

const cartItems = [];

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

    // Call the function to update the cart count
    updateCartCount();

    // Show the cart container
    document.getElementById('cart').style.display = 'block';

    // Update the cart display
    updateCartDisplay();
}

// Function to update the cart count display
function updateCartCount() {
    // Get the current cart count
    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    // Update the cart count display
    document.getElementById('cartCount').textContent = cartCount;
}

// Function to update the cart display
function updateCartDisplay() {
    // Update the cart display with cartItems data
    // This function should be implemented according to your specific UI requirements
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















function showCart(event) {
  event.preventDefault();
  // Check if the cart section already exists
  var existingCart = document.getElementById("cart");
  if (!existingCart) {
    // Create the section element
    var cartSection = document.createElement("section");
    cartSection.id = "cart";
    cartSection.className = "cart-container";

    // Cart buttons
    var controlsDiv = document.createElement("div");
    controlsDiv.className = "controls";
    controlsDiv.innerHTML = '<button onclick="minimizeCart()">_0</button><button onclick="closeCart()">x</button>';

    // Shopping Cart heading
    var heading = document.createElement("h2");
    heading.textContent = "Shopping Cart";

    // Cart items container
    var cartItemsDiv = document.createElement("div");
    cartItemsDiv.id = "cartItems";

    // Total Price
    var totalPricePara = document.createElement("p");
    totalPricePara.innerHTML = 'Total Price: <span id="totalPrice">0</span>';

    // Place Order button
    var placeOrderBtn = document.createElement("button");
    placeOrderBtn.className = "btn btn-primary";
    placeOrderBtn.textContent = "Place Your Order";
    placeOrderBtn.onclick = toggleOrderForm;

    // Order Form container
    var orderFormDiv = document.createElement("div");
    orderFormDiv.id = "orderForm";
    orderFormDiv.className = "form-container";
    orderFormDiv.style.display = "none";
    orderFormDiv.innerHTML = '<h3>Order Details</h3><form id="placeOrderForm"><div class="form-group"><label for="name">Name</label><input type="text" class="form-control" id="name" required></div><div class="form-group"><label for="email">Email address</label><input type="email" class="form-control" id="email" required></div><div class="form-group"><label for="phone">Phone</label><input type="tel" class="form-control" id="phone" required></div><button type="button" class="btn btn-success" onclick="submitOrder()">Submit Order</button></form>';

    // Append elements to the section
    cartSection.appendChild(controlsDiv);
    cartSection.appendChild(heading);
    cartSection.appendChild(cartItemsDiv);
    cartSection.appendChild(totalPricePara);
    cartSection.appendChild(placeOrderBtn);
    cartSection.appendChild(orderFormDiv);

    // Append the section to the body
    document.body.appendChild(cartSection);
  } else {
    // If the cart section already exists, toggle its visibility
    existingCart.style.display = existingCart.style.display === "none" ? "block" : "none";
  }
}

// Function to toggle the order form visibility
function toggleOrderForm() {
  var orderForm = document.getElementById("orderForm");
  orderForm.style.display = orderForm.style.display === "none" ? "block" : "none";
}































document.addEventListener('DOMContentLoaded', function() {
  const navbar = document.querySelector('.navbar10');
  const links = navbar.querySelectorAll('a');
  let currentIndex = 0;
  const intervalTime = 3000; // Time in milliseconds for auto-rotation
  let autoScroll;

  const scrollToLink = (index) => {
    const link = links[index];
    const offsetLeft = link.offsetLeft;
    const linkWidth = link.offsetWidth;
    const navbarWidth = navbar.clientWidth;
    
    // Calculate the position to scroll
    const scrollPosition = offsetLeft - (navbarWidth / 2) + (linkWidth / 2);
    
    navbar.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
    });
    currentIndex = index;
  };

  const startAutoScroll = () => {
    autoScroll = setInterval(() => {
      currentIndex = (currentIndex + 1) % links.length;
      scrollToLink(currentIndex);
    }, intervalTime);
  };

  const stopAutoScroll = () => {
    clearInterval(autoScroll);
  };

  // Start auto-rotation
  startAutoScroll();

  // Add event listeners to stop auto-rotation on mouse enter and resume on mouse leave
  navbar.addEventListener('mouseenter', stopAutoScroll);
  navbar.addEventListener('mouseleave', startAutoScroll);

  // Add event listeners to navigate to links on click
  links.forEach((link, index) => {
    link.addEventListener('click', () => {
      scrollToLink(index);
      stopAutoScroll(); // Optional: stop auto-rotation on click
    });
  });
});





 