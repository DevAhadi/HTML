window.onload = function () {
  const expiryDate = localStorage.getItem("zexpiryDate");
  const now = new Date();
  const statusMessage = document.getElementById("status-message");

  if (!expiryDate || new Date(expiryDate) < now) {
    // No key or expired
    statusMessage.textContent = !expiryDate
      ? "🔐 Please enter your access key."
      : "⛔ Your key has expired.";
    document.getElementById("login-container").classList.remove("hidden");
  } else {
    // Valid key
    window.location.href = "predictor.html";
  }
};

document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const enteredKey = document.getElementById("access-key").value.trim();
  const validKey = "313yead23yz"; // Replace with secure logic if needed
  const popup = document.getElementById("popup");
  const popupMessage = document.getElementById("popup-message");

  popupMessage.textContent = "🔍 Validating...";
  popup.classList.remove("hidden");

  setTimeout(() => {
    popup.classList.add("hidden");

    if (enteredKey === validKey) {
      const expiry = new Date();
      expiry.setDate(expiry.getDate() + 7);
      localStorage.setItem("zexpiryDate", expiry.toISOString());

      popupMessage.textContent = `✅ Key accepted! Valid until ${expiry.toDateString()}`;
      popup.classList.remove("hidden");

      setTimeout(() => {
        window.location.href = "predictor.html";
      }, 2500);
    } else {
      document.getElementById("error-popup").classList.remove("hidden");
    }
  }, 2000);
});

document.getElementById("retry-btn").onclick = () => {
  document.getElementById("error-popup").classList.add("hidden");
};

document.getElementById("buy-key-btn").onclick = () => {
  window.location.href =
    "https://wa.me/254704985993?text=Hi%20Ahadi,%20I%20need%20a%20new%20access%20key.";
};
document.getElementById("toggle-eye").addEventListener("click", function () {
  const input = document.getElementById("access-key");
  const isPassword = input.getAttribute("type") === "password";
  input.setAttribute("type", isPassword ? "text" : "password");
  this.textContent = isPassword ? "🙈" : "👁️"; // toggle emoji for fun
});
