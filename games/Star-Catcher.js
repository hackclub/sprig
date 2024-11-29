// Create the canvas for the game
const canvas = document.createElement("canvas");
canvas.width = 160; // Sprig-compatible width
canvas.height = 128; // Sprig-compatible height
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");

// Basic styling for the game
document.body.style.margin = "0";
document.body.style.display = "flex";
document.body.style.justifyContent = "center";
document.body.style.alignItems = "center";
document.body.style.backgroundColor = "black";

// Game variables
let player = { x: 70, y: 110, width: 20, height: 10, color: "white" };
let stars = [];
let score = 0;
let isGameOver = false;
let starInterval = null;

// Function to create a falling star
function createStar() {
  const x = Math.random() * (canvas.width - 10); // Random x position
  stars.push({ x, y: 0, width: 10, height: 10, color: "yellow" });
}

// Function to draw the player
function drawPlayer() {
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

// Function to draw the stars
function drawStars() {
  for (const star of stars) {
    ctx.fillStyle = star.color;
    ctx.fillRect(star.x, star.y, star.width, star.height);
  }
}

// Function to update star positions and check for collisions
function updateStars() {
  for (const star of stars) {
    star.y += 2; // Stars fall at 2 pixels per frame
  }

  // Remove stars that fall off the screen
  stars = stars.filter((star) => star.y < canvas.height);

  // Check for collisions with the player
  for (const star of stars) {
    if (
      star.y + star.height > player.y &&
      star.x < player.x + player.width &&
      star.x + star.width > player.x
    ) {
      score++; // Increase score
      stars.splice(stars.indexOf(star), 1); // Remove the star
    }
  }
}

// Function to check if the game is over
function checkGameOver() {
  for (const star of stars) {
    if (star.y + star.height >= canvas.height) {
      isGameOver = true;
      stopGame(); // Stop everything
      alert(`Game Over! Final Score: ${score}`);
      restartGame(); // Restart the game
      break;
    }
  }
}

// Function to stop the game
function stopGame() {
  clearInterval(starInterval); // Stop the star generation interval
  isGameOver = true;
}

// Function to restart the game
function restartGame() {
  stars = [];
  score = 0;
  isGameOver = false;
  player.x = 70;
  startGame(); // Restart the game
}

// Event listener to move the player
document.addEventListener("keydown", (e) => {
  if (isGameOver) return;
  if (e.key === "ArrowLeft" && player.x > 0) {
    player.x -= 10; // Move left
  } else if (e.key === "ArrowRight" && player.x + player.width < canvas.width) {
    player.x += 10; // Move right
  }
});

// Function to display the score
function drawScore() {
  ctx.fillStyle = "white";
  ctx.font = "10px Arial";
  ctx.fillText(`Score: ${score}`, 5, 10);
}

// Main game loop
function updateGame() {
  if (isGameOver) return;

  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw game elements
  drawPlayer();
  drawStars();
  drawScore();

  // Update the game state
  updateStars();
  checkGameOver();

  // Repeat
  requestAnimationFrame(updateGame);
}

// Start the game
function startGame() {
  clearInterval(starInterval); // Clear any existing intervals to prevent stacking
  starInterval = setInterval(createStar, 1000); // Generate stars every second
  updateGame();
}

startGame();
