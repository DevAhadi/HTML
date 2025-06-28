// === Show Current Time ===
function updateTime() {
  const now = new Date();
  document.getElementById("current-time").textContent = now.toLocaleTimeString();
}
setInterval(updateTime, 1000);
updateTime();

// === Expiry Check ===
const expiry = localStorage.getItem("zexpiryDate");
const now = new Date();

if (!expiry || new Date(expiry) < now) {
  alert("⛔ Your access has expired. Please enter a valid key.");
  window.location.href = "index.html";
}

// === Utility: History Management ===
function getHistory() {
  return JSON.parse(localStorage.getItem("predictionHistory") || "[]");
}

function savePrediction(value) {
  const history = getHistory();
  history.push(value);
  if (history.length > 5) history.shift();
  localStorage.setItem("predictionHistory", JSON.stringify(history));
}

function isHotStreak(history) {
  return history.filter(v => v >= 2.0).length >= 3;
}

function isColdStreak(history) {
  return history.filter(v => v <= 1.3).length >= 3;
}

// === Generate Button Logic ===
document.getElementById("generate-btn").addEventListener("click", () => {
  const now = Date.now();
  const lastTime = parseInt(localStorage.getItem("lastGeneratedTime") || "0");
  const cooldown = 120000; // 2 minutes

  const popup = document.getElementById("popup");
  const floatContainer = document.getElementById("float-container");
  const countdownMsg = document.getElementById("countdown-message");
  const countdown = document.getElementById("countdown");
  const streakStatus = document.getElementById("streak-status");
  const streakLabel = document.getElementById("streak-label");

  if (now - lastTime < cooldown) {
    let remaining = Math.ceil((cooldown - (now - lastTime)) / 1000);
    countdown.textContent = remaining;
    countdownMsg.classList.remove("hidden");

    const interval = setInterval(() => {
      remaining--;
      countdown.textContent = remaining;
      if (remaining <= 0) {
        clearInterval(interval);
        countdownMsg.classList.add("hidden");
        countdown.textContent = "120";
        localStorage.removeItem("lastGeneratedTime");
      }
    }, 1000);
    return;
  }

  // Show loading popup
  popup.classList.remove("hidden");

  setTimeout(() => {
    popup.classList.add("hidden");

    const history = getHistory();
    let result;

    // === Smart Prediction Logic ===
    if (isHotStreak(history)) {
      result = (Math.random() * (1.8 - 1.1) + 1.1).toFixed(2);
    } else if (isColdStreak(history)) {
      result = (Math.random() * (3.0 - 2.0) + 2.0).toFixed(2);
    } else {
      result = Math.random() < 0.25
        ? (Math.random() * (20 - 3) + 3).toFixed(2)
        : (Math.random() * (2.49 - 1) + 1).toFixed(2);
    }

    document.getElementById("random-float").textContent = `${result}x`;
    floatContainer.classList.remove("hidden");

    savePrediction(parseFloat(result));
    localStorage.setItem("lastGeneratedTime", now);

    // Show streak label
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
  }, 3000); // signal delay
});
