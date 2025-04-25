// Check expiry date before displaying the login form
window.onload = function() {
    const currentDate = new Date();
    const storedDate = localStorage.getItem("expiryDate");
    
    if (storedDate && new Date(storedDate) > currentDate) {
      // Redirect to predictor.html if expiry date is valid
      window.location.href = "predictor.html";
    } else {
      // Show the login form if expiry date has passed or doesn't exist
      document.getElementById("login-container").classList.remove("hidden");
  }
};

// Handle form submission
document.getElementById("login-form").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent default form submission

  const enteredKey = document.getElementById("access-key").value;
  const correctKey = "123y5"; // Replace with your actual key

  if (enteredKey === correctKey) {
    // Add 7 days to current date and store in local storage
    const expiryDate = new Date();
    expiryDate.setDate(new Date().getDate() + 7);
    localStorage.setItem("expiryDate", expiryDate);
// Redirect to predictor.html
window.location.href = "predictor.html";


  } else {
    // Show error popup
    document.getElementById("error-popup").classList.remove("hidden");
  }
});

// Handle retry and buy key buttons
document.getElementById("retry-btn").addEventListener("click", function() {
  // Reload the page for retry
  window.location.reload();
});

document.getElementById("buy-key-btn").addEventListener("click", function() {
  // Redirect to WhatsApp contact page
  window.location.href = "https://wa.me/254704985993?text=Hello%20Ahadi,%20I%20need%20a%20new%20key!";
});
