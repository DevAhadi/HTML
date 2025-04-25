window.onload = function() {
  const zexpiryDate = localStorage.getItem("zexpiryDate"); // Updated property name
  const currentDate = new Date();
  const statusMessage = document.getElementById("status-message");

  if (!zexpiryDate) {
    // User has never purchased a key
    statusMessage.textContent = "Key is yet to be purchased.";
    document.getElementById("login-container").classList.remove("hidden");
  } else if (new Date(zexpiryDate) < currentDate) {
    // Key has expired
    statusMessage.textContent = "Expired Key.";
    document.getElementById("login-container").classList.remove("hidden");
  } else {
    // Key is valid, redirect to predictor.html
    window.location.href = "predictor.html";
  }
};

// Handle form submission
document.getElementById("login-form").addEventListener("submit", function(event) {
  event.preventDefault();

  const enteredKey = document.getElementById("access-key").value;
  const correctKey = "5resdyer";
  const popup = document.getElementById("popup");
  const popupMessage = document.getElementById("popup-message");

  // Show "Checking access key..." popup
  popup.classList.remove("hidden");
  popupMessage.textContent = "Checking access key...";

  setTimeout(() => {
    popup.classList.add("hidden");

    if (enteredKey === correctKey) {
      // Key is correct
      const zexpiryDate = new Date(); // Use updated property name
      zexpiryDate.setDate(new Date().getDate() + 7);
      localStorage.setItem("zexpiryDate", zexpiryDate); // Save using updated property name

      // Show success popup
      popupMessage.textContent = `Key is accepted. Expiry Date: ${zexpiryDate.toDateString()}`;
      popup.classList.remove("hidden");

      setTimeout(() => {
        window.location.href = "predictor.html";
      }, 3000);
    } else {
      // Key is incorrect
      const errorPopup = document.getElementById("error-popup");
      document.getElementById("error-message").textContent = "❌ Incorrect key. Please try again or buy a new key.";
      errorPopup.classList.remove("hidden");
    }
  }, 3000);
});

// Handle retry and buy key buttons
document.getElementById("retry-btn").addEventListener("click", function() {
  window.location.reload();
});

document.getElementById("buy-key-btn").addEventListener("click", function() {
  window.location.href = "https://wa.me/254704985993?text=Hello%20Ahadi,%20I%20need%20a%20new%20key!";
});
