const player = "p";
let promptText = null;
let scoreText = null;
let gameOverText = null;
let timeLeftText = null;
const promptTime = 2000; // Time limit in milliseconds
const promptDelay = 1000; // Delay between prompts in milliseconds
const characters = "ASDWIJKL";
let sequenceLength = 1;
let currentSequence = "";
let timer = null;
let score = 0;
let timeLeft = promptTime;

setLegend(
  [ player, bitmap`
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222` ]
  );
const level = map`
ppppp
ppppp
ppppp
ppppp`;
setMap(level);

onInput("a", () => handleInput("A"));
onInput("s", () => handleInput("S"));
onInput("d", () => handleInput("D"));
onInput("w", () => handleInput("W"));
onInput("i", () => handleInput("I"));
onInput("j", () => handleInput("J"));
onInput("k", () => handleInput("K"));
onInput("l", () => handleInput("L"));

displaySequence();

// Generate a random character from the available characters
function getRandomCharacter() {
  return characters[Math.floor(Math.random() * characters.length)];
}

// Generate a random sequence of characters
function generateSequence(length) {
  let sequence = "";
  for (let i = 0; i < length; i++) {
    sequence += getRandomCharacter();
  }
  return sequence;
}

// Display the current prompt sequence to the user
function displaySequence() {
  currentSequence = generateSequence(sequenceLength);
  clearText();
  promptText = addText(currentSequence, { x: 2, y: 2 });
  scoreText = addText(`Score: ${score}`, { x: 2, y: 4 });
  timeLeftText = addText(`Time left: ${timeLeft / 1000}s`, { x: 2, y: 6 });
}

// Handle user input
function handleInput(key) {
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }

  if (key === currentSequence[0]) {
    currentSequence = currentSequence.slice(1);

    if (currentSequence.length === 0) {
      // User entered the sequence correctly
      sequenceLength++;
      score++;
      timeLeft += 50;
      displaySequence();
    }
  } else {
    // User entered the wrong key, reset the game
    sequenceLength = 1;
    
    displayGameOver();
  }

  // Start the timer for the next prompt
  timer = setTimeout(displaySequence, promptDelay);
}

// Display game over text
function displayGameOver() {
  clearTimeout(timer);
  timer = null;
  clearText();
  gameOverText = addText("Game Over", { x: 2, y: 2 });
  scoreText = addText(`Final Score: ${score}`, { x: 2, y: 4 });
  score = 0;
  timeLeft = 1000;
  timeLeftText = addText(`Timer: ${timeLeft / 1000}s`, { x: 2, y: 6 });
}

// Update time left
function updateTimeLeft() {
  timeLeft -= 100;
  if (timeLeft <= 0) {
    clearTimeout(timer);
    timer = null;
    displayGameOver();
  } else {
    timer = setTimeout(updateTimeLeft, 100);
  }
}

// Set up game initialization and input handling
function setupGame() {
  displaySequence();
  updateTimeLeft();
}

// Start the game
setupGame();
