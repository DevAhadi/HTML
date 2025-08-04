// === Show Current Time at Header ===
function updateTime() {
  const now = new Date();
  const timeString = now.toLocaleTimeString();
  document.getElementById("current-time").textContent = timeString;
}
setInterval(updateTime, 1000);
updateTime(); // Initialize immediately

// === Expiry Check ===
const expiry = localStorage.getItem("zexpiryDate");
const now = new Date();
if (!expiry || new Date(expiry) < now) {
  alert("⛔ Your access has expired. Please enter a valid key.");
  window.location.href = "index.html";
}

// === History Management ===
function getHistory() {
  return JSON.parse(localStorage.getItem("predictionHistory") || "[]");
}

function savePrediction(value) {
  const history = getHistory();
  history.push(value);
  if (history.length > 5) history.shift(); // Keep last 5
  localStorage.setItem("predictionHistory", JSON.stringify(history));
}

function isHotStreak(history) {
  return history.filter(v => v >= 2.0).length >= 3;
}

function isColdStreak(history) {
  return history.filter(v => v <= 1.3).length >= 3;
}

// === Generate Button Logic ===
document.getElementById("generate-btn").addEventListener("click", function () {
  const lastGeneratedTime = localStorage.getItem("lastGeneratedTime");
  const currentTime = Date.now();

  const countdownElement = document.getElementById("countdown");
  const countdownMessage = document.getElementById("countdown-message");
  const popup = document.getElementById("popup");
  const floatContainer = document.getElementById("float-container");
  const streakStatus = document.getElementById("streak-status");
  const streakLabel = document.getElementById("streak-label");

  // === Cooldown Logic (90 seconds) ===
  if (lastGeneratedTime && currentTime - lastGeneratedTime < 90000) {
    countdownMessage.classList.remove("hidden");
    let remainingTime = Math.ceil((90000 - (currentTime - lastGeneratedTime)) / 1000);
    countdownElement.textContent = remainingTime;

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

  // === Show "Obtaining signals..." ===
  popup.classList.remove("hidden");

  setTimeout(() => {
    popup.classList.add("hidden");

    const history = getHistory();
    let randomFloat;

    // === Prediction Logic with Streak Sensitivity ===
    if (isHotStreak(history)) {
      randomFloat = (Math.random() * (1.8 - 1.1) + 1.1).toFixed(2);
    } else if (isColdStreak(history)) {
      randomFloat = (Math.random() * (3.0 - 2.0) + 2.0).toFixed(2);
    } else {
      randomFloat = Math.random() < 0.25
        ? (Math.random() * (20.00 - 3.00) + 3.00).toFixed(2)
        : (Math.random() * (2.49 - 1.00) + 1.00).toFixed(2);
    }

    // === Format and Display Result ===
    const floatWithX = `${randomFloat}x`;
    document.getElementById("random-float").textContent = floatWithX;
    floatContainer.classList.remove("hidden");

    // === Save and Flag Streak ===
    savePrediction(parseFloat(randomFloat));
    localStorage.setItem("lastGeneratedTime", currentTime);

    if (isHotStreak(history)) {
      streakLabel.textContent = "🔥 HOT STREAK DETECTED";
      streakLabel.className = "hot";
      streakStatus.classList.remove("hidden");
    } else if (isColdStreak(history)) {
      streakLabel.textContent = "🥶 COLD STREAK IN PROGRESS";
      streakLabel.className = "cold";
      streakStatus.classList.remove("hidden");
      } else {
      streakStatus.classList.add("hidden");
    }

  }, 3000); // Delay for popup
});
