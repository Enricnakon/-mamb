document.addEventListener('DOMContentLoaded', function() {
    // Handle Sign In/Sign Up link click
    document.getElementById("toggleModal").addEventListener("click", function(event) {
      event.preventDefault();
      document.getElementById("uniqueLoginModal").style.display = "block";
    });
  
    // Register button click to show register modal
    document.getElementById("uniqueRegisterButton").addEventListener("click", function(event) {
      event.preventDefault();
      document.getElementById("uniqueLoginModal").style.display = "none";
      document.getElementById("uniqueRegisterModal").style.display = "block";
    });
  
    // Forgot password link click to show forgot password modal
    document.getElementById("uniqueForgotPasswordLink").addEventListener("click", function(event) {
      event.preventDefault();
      document.getElementById("uniqueLoginModal").style.display = "none";
      document.getElementById("uniqueForgotPasswordModal").style.display = "block";
    });
  
    // Handle opening and closing of modals
    document.querySelectorAll('.unique-close').forEach(closeBtn => {
      closeBtn.addEventListener('click', () => {
        closeBtn.closest('.unique-modal').style.display = 'none';
      });
    });
  
    window.addEventListener('click', (event) => {
      if (event.target.classList.contains('unique-modal')) {
        event.target.style.display = 'none';
      }
    });
  
    // Logout Button
    document.getElementById("uniqueLogoutButton").addEventListener("click", function() {
      document.getElementById("uniqueLogoutModal").style.display = "block";
    });
  
    document.getElementById("uniqueLogoutConfirmButton").addEventListener("click", function() {
      // Add logout functionality here
      document.getElementById("uniqueLogoutModal").style.display = "none";
      alert('Logged out successfully');
    });
  });
  document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('uniqueRegisterForm');
    registerForm.addEventListener('submit', function(event) {
      event.preventDefault();
  
      const formData = new FormData(registerForm);
      const username = formData.get('username');
      const email = formData.get('email');
      const password = formData.get('password');
  
      fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
      })
      .then(response => response.text())
      .then(data => {
        alert(data);
        registerForm.reset();
      })
      .catch(error => {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
      });
    });
  
    const loginForm = document.getElementById('uniqueLoginForm');
    loginForm.addEventListener('submit', function(event) {
      event.preventDefault();
  
      const formData = new FormData(loginForm);
      const identifier = formData.get('identifier');
      const password = formData.get('password');
  
      fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ identifier, password })
      })
      .then(response => response.text())
      .then(data => {
        alert(data);
        loginForm.reset();
      })
      .catch(error => {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
      });
    });
  });
  
  
  
  document.addEventListener('DOMContentLoaded', function() {
    // Load the login form HTML into the loginFormContainer
    fetch('login-form.html')
      .then(response => response.text())
      .then(html => {
        document.getElementById('loginFormContainer').innerHTML = html;
      })
      .catch(error => {
        console.error('Error loading login form:', error);
      });
  });
  



  // Handle verification link click
document.querySelectorAll('.verification-link').forEach(link => {
    link.addEventListener('click', function(event) {
      event.preventDefault();
      const verificationToken = link.dataset.token;
      
      // Make an AJAX request to handle the verification
      fetch(`/auth/verify/${verificationToken}`)
        .then(response => response.text())
        .then(data => {
          // Update the UI based on the response
          if (data === 'Account verified successfully') {
            // Display success message or update UI elements
            alert('Account verified successfully');
          } else {
            // Display error message or update UI elements
            alert('Invalid or expired token');
          }
        })
        .catch(error => {
          console.error('Error:', error);
          // Handle error
          alert('An error occurred. Please try again.');
        });
    });
  });
  