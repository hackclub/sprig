/* 
@title: Word Sculptor
@author: S1K
@tags: []
@addedOn: 2024-09-03
*/

const defaultWords = ["CAT", "DOG", "FOX", "OWL", "LION", "CODE", "HACKCLUB", "BYTE", "GIT", "BOTS", "PYTHON", "SCRIPT", "DATA", "SPRIG"];
let words = [...defaultWords];
let word = "";
let guessedLetters = [];
let visibleIndices = [];
let attempts = 0;
let gameState = "playing"; // "playing", "won", "lost"

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let currentLetterIndex = 0;

// Load custom words from local storage
function loadCustomWords() {
  const storedWords = localStorage.getItem('customWords');
  if (storedWords) {
    words = [...defaultWords, ...JSON.parse(storedWords)];
  }
}

// Save custom words to local storage
function saveCustomWords() {
  localStorage.setItem('customWords', JSON.stringify(words.filter(word => !defaultWords.includes(word))));
}

// Sprites
setLegend(
  ["b", bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`],
);

// Initialize game
function initGame() {
  word = words[Math.floor(Math.random() * words.length)];
  guessedLetters = [];
  visibleIndices = generateVisibleIndices(word);
  attempts = 0;
  gameState = "playing";
  currentLetterIndex = 0;
}

// Generate visible indices for randomly placing missing letters
function generateVisibleIndices(word) {
  let indices = [];
  for (let i = 0; i < word.length; i++) {
    indices.push(i);
  }
  // Shuffle and keep half of the indices visible
  return indices.sort(() => Math.random() - 0.5).slice(0, word.length - Math.floor(word.length / 2));
}

// Main game loop
function update() {
  clearText();
  if (gameState === "playing") {
    drawWord();
    drawCurrentLetter();
    drawAttempts();
  } else {
    drawGameOver();
  }
}

// Left
onInput("a", () => {
  if (gameState === "playing") {
    currentLetterIndex = (currentLetterIndex - 1 + 26) % 26;
    update();
  }
});

// Right
onInput("d", () => {
  if (gameState === "playing") {
    currentLetterIndex = (currentLetterIndex + 1) % 26;
    update();
  }
});

// Confirm Letter Choice
onInput("w", () => {
  if (gameState === "playing") {
    guessLetter(alphabet[currentLetterIndex]);
    update();
  }
});

// Restart Game
onInput("i", () => {
  if (gameState !== "playing") {
    initGame();
    update();
  }
});

// Add Custom Words
onInput("l", () => {
  if (gameState === "playing") {
    addCustomWord(prompt("Enter a new word:").toUpperCase());
    initGame();
    update();
  }
});

// Add custom word to the game
function addCustomWord(newWord) {
  if (newWord && /^[A-Z]+$/.test(newWord)) {
    if (!words.includes(newWord)) {
      words.push(newWord);
      saveCustomWords();
    }
  }
}

// Draw the current state of the word
function drawWord() {
  let displayWord = "";
  for (let i = 0; i < word.length; i++) {
    if (visibleIndices.includes(i) || guessedLetters.includes(word[i])) {
      displayWord += word[i];
    } else {
      displayWord += "_";
    }
  }
  addText(displayWord, { x: 8, y: 6, color: color`9` });
}

// Draw the current letter for guessing
function drawCurrentLetter() {
  addText(alphabet[currentLetterIndex], { x: 10, y: 9, color: color`9` });
}

// Draw the number of attempts
function drawAttempts() {
  addText(`${attempts}/10`, { x: 8, y: 11, color: color`9` });
}

// Draw game over screen
function drawGameOver() {
  if (gameState === "won") {
    addText("You won!", { x: 1, y: 5, color: color`9` });
  } else {
    addText("Game over", { x: 1, y: 5, color: color`9` });
    addText(`Word: ${word}`, { x: 1, y: 7, color: color`9` });
  }
  addText("Press I to restart", { x: 1, y: 10, color: color`9` });
}

// Handle letter guessing
function guessLetter(letter) {
  if (!guessedLetters.includes(letter)) {
    guessedLetters.push(letter);

    if (!word.includes(letter)) {
      shiftVisibleIndices();
    }

    attempts++;
    checkGameStatus();
  }
}

// Shift visible indices
function shiftVisibleIndices() {
  // Find the first visible index to hide
  const firstIndex = Math.min(...visibleIndices);
  visibleIndices = visibleIndices.filter(index => index !== firstIndex);

  // Add a new index to make visible
  let newIndex = Math.floor(Math.random() * word.length);
  if (visibleIndices.length === word.length) {
    newIndex = (Math.max(...visibleIndices) + 1) % word.length;
  }
  visibleIndices.push(newIndex);
}

// Check game status
function checkGameStatus() {
  if (word.split('').every(letter => guessedLetters.includes(letter))) {
    gameState = "won";
  } else if (attempts >= 10) {
    gameState = "lost";
  }
}

// Set up the game map
setMap(map`
bbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbb`);

// Load custom words on initialization
loadCustomWords();

// Initialize and start the game
initGame();
update();

