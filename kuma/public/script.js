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
