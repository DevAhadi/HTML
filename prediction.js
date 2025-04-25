document.getElementById("generate-btn").addEventListener("click", function() {
      const lastGeneratedTime = localStorage.getItem("lastGeneratedTime");
      const currentTime = Date.now();
      
      if (lastGeneratedTime && currentTime - lastGeneratedTime < 90000) {
        // Show the error message with countdown
        const countdownElement = document.getElementById("countdown");
        const errorMessage = document.getElementById("error-message");
        errorMessage.classList.remove("hidden");
        
        // Calculate remaining time and start countdown
        let remainingTime = Math.ceil((90000 - (currentTime - lastGeneratedTime)) / 1000);
        
        const countdownInterval = setInterval(() => {
          remainingTime--;
          countdownElement.textContent = remainingTime;
          
          if (remainingTime <= 0) {
            clearInterval(countdownInterval);
            errorMessage.classList.add("hidden");
            countdownElement.textContent = "90"; // Reset countdown for next restriction
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
            if (Math.random() < 0.25) {randomFloat = (Math.random() * (20.00 - 3.00) + 3.00).toFixed(2); // 3.00 - 20.00 (1 out of 4 chance)
    } else {
      randomFloat = (Math.random() * (2.49 - 1.00) + 1.00).toFixed(2); // 1.00 - 2.49 (default range)
    }
// Append "x" to the float
const floatWithX = `${randomFloat}x`;

// Show generated float
document.getElementById("random-float").textContent = floatWithX;
document.getElementById("float-container").classList.remove("hidden");

// Store the generation time
localStorage.setItem("lastGeneratedTime", currentTime);


  }, 10000); // 10 seconds delay
});
function updateTime() {
      const now = new Date();
      const timeString = now.toLocaleTimeString();
      document.getElementById("time").textContent = timeString;
    }

    // Update the time every second
    setInterval(updateTime, 1000);
    updateTime(); // Call once immediately to show the time without delay