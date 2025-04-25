// Show current time at the header
function updateTime() {
  const now = new Date();
  const timeString = now.toLocaleTimeString();
  document.getElementById("current-time").textContent = timeString;
}
setInterval(updateTime, 1000);
updateTime(); // Initialize immediately

document.getElementById("generate-btn").addEventListener("click", function () {
  const lastGeneratedTime = localStorage.getItem("lastGeneratedTime");
  const currentTime = Date.now();

  if (lastGeneratedTime && currentTime - lastGeneratedTime < 90000) {
    // Show countdown timer if user tries generating too soon
    const countdownElement = document.getElementById("countdown");
    const countdownMessage = document.getElementById("countdown-message");
    countdownMessage.classList.remove("hidden");
    let remainingTime = Math.ceil((90000 - (currentTime - lastGeneratedTime)) / 1000);
    const countdownInterval = setInterval(() => {
      remainingTime--;
      countdownElement.textContent = remainingTime;
  if (remainingTime <= 0) {
    clearInterval(countdownInterval);
    countdownMessage.classList.add("hidden");
    countdownElement.textContent = "90";
  }
}, 1000);

return;


  }

  // Show "Obtaining signals..." popup
  const popup = document.getElementById("popup");
  popup.classList.remove("hidden");

  setTimeout(() => {
    popup.classList.add("hidden");
// Generate a random float
let randomFloat;
if (Math.random() < 0.25) {
  randomFloat = (Math.random() * (20.00 - 3.00) + 3.00).toFixed(2);
} else {
  randomFloat = (Math.random() * (2.49 - 1.00) + 1.00).toFixed(2);
}

// Append "x" to the float
const floatWithX = `${randomFloat}x`;

// Show generated float
document.getElementById("random-float").textContent = floatWithX;
document.getElementById("float-container").classList.remove("hidden");

// Store the generation time
localStorage.setItem("lastGeneratedTime", currentTime);


  }, 3000); // 3 seconds delay for "obtaining signals..."
});