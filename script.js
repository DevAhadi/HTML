window.onload = function() {
  const xpiryDate = localStorage.getItem("xpiryDate");
  const currentDate = new Date();

  if (xpiryDate && new Date(xpiryDate) > currentDate) {
    if (!localStorage.getItem("redirected")) {
      localStorage.setItem("redirected", true);
      window.location.href = "predictor.html";
    }
  } else {
    document.getElementById("login-container").classList.remove("hidden");
  }
};

// Handle form submission
document.getElementById("login-form").addEventListener("submit", function(event) {
  event.preventDefault();
    const enteredKey = document.getElementById("access-key").value;
  const correctKey = "12345";

  if (enteredKey === correctKey) {
    const expiryDate = new Date();
    xpiryDate.setDate(new Date().getDate() + 7);
    localStorage.setItem("xpiryDate", xpiryDate);
    localStorage.setItem("redirected", false); // Reset redirection flag
window.location.href = "predictor.html";


  } else {
    document.getElementById("error-popup").classList.remove("hidden");
  }
});

// Handle retry and buy key buttons
document.getElementById("retry-btn").addEventListener("click", function() {
  window.location.reload();
});

document.getElementById("buy-key-btn").addEventListener("click", function() {
  window.location.href = "https://wa.me/254704985993?text=Hello%20Ahadi,%20I%20need%20a%20new%20key!";
});
