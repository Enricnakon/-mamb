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

document.querySelectorAll(".close").forEach(function(closeBtn) {
  closeBtn.addEventListener("click", function() {
    document.querySelectorAll(".modal").forEach(function(modal) {
      modal.style.display = "none";
    });
  });
});


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