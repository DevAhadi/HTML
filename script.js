document.getElementById("login-form").addEventListener("submit", function(event) {
  event.preventDefault();

  const enteredKey = document.getElementById("access-key").value;
  const correctKey = "5resdyer"; // Change this to your actual key

  // Show popup message for 10 seconds
  const popup = document.getElementById("popup");
  popup.classList.remove("hidden");

  setTimeout(() => {
    popup.classList.add("hidden");
    if (enteredKey === correctKey) {
      // Redirect to the next page
      window.location.href = "predictor.html"; // Replace with your actual next page URL
    } else {
      // Show error message and retry/buy key options
      document.getElementById("error-section").classList.remove("hidden");
    }
  }, 10000); // 10 seconds delay
});

document.getElementById("retry-btn").addEventListener("click", function() {
  // Reload the page for retry
  window.location.reload();
});

document.getElementById("buy-key-btn").addEventListener("click", function() {
  // Redirect to key purchase page
  window.location.href = "https://wa.me/254704985993?text=Yoh%20AHADI%20%F0%9F%87%B0%F0%9F%87%AA%20Nipange%20na%20access%20key"; // Replace with your actual key purchase page URL
});

function updateTime() {
      const now = new Date();
      const timeString = now.toLocaleTimeString();
      document.getElementById("time").textContent = timeString;
    }

    // Update the time every second
    setInterval(updateTime, 1000);
    updateTime(); // Call once immediately to show the time without delay
