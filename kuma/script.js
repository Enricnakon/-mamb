document.addEventListener("DOMContentLoaded", function() {
  // Login form
  document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission
    // Handle login form submission here
    console.log("Login form submitted");
  });

  // Register form
  document.getElementById("registerForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission
    // Handle register form submission here
    console.log("Register form submitted");
  });

  // Forgot password form
  document.getElementById("forgotPasswordForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission
    // Handle forgot password form submission here
    console.log("Forgot password form submitted");
  });
});

 

 // JavaScript for image transition
const images = document.querySelectorAll('.image-container');
let currentIndex = 0;

function changeImage() {
  images[currentIndex].classList.remove('active');
  currentIndex = (currentIndex + 1) % images.length;
  images[currentIndex].classList.add('active');
  setTimeout(changeImage, 5000); // Change image every 5 seconds
}

// Start the initial image change
changeImage();

// Reset index to 0 after reaching the end of images
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    currentIndex = 0;
  }, 5000); // Reset after 5 seconds
});






function toggleMenu() {
  var dropdownMenu = document.getElementById("dropdownMenu");
  dropdownMenu.classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it 