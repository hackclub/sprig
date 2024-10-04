/*
@title: Math Quiz Game
@author: Zigao Wang
@tags: ['utility','multiplayer']
@addedOn: 2024-07-24
*/

const leftPlayer = "L";
const rightPlayer = "R";
const questionText = "Q";
const answerOption = "A";
const leftCross = "X";
const rightCross = "Y";
const timeoutGraphic = "T";

// Define sprites
setLegend(
  [leftPlayer, bitmap`
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777`],
  [rightPlayer, bitmap`
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333`],
  [questionText, bitmap`
................
................
................
................
................
................
................
................
................
................
................
................
................
................
................
................`],
  [answerOption, bitmap`
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777`],
  [leftCross, bitmap`
3377777777777733
3337777777777333
7333777777773337
7733377777733377
7773337777333777
7777333773337777
7777733333377777
7777773333777777
7777773333777777
7777733333377777
7777333773337777
7773337777333777
7733377777733377
7333777777773337
3337777777777333
3377777777777733`],
  [rightCross, bitmap`
7733333333333377
7773333333333777
3777333333337773
3377733333377733
3337773333777333
3333777337773333
3333377777733333
3333337777333333
3333337777333333
3333377777733333
3333777337773333
3337773333777333
3377733333377733
3777333333337773
7773333333333777
7733333333333377`],
  [timeoutGraphic, bitmap`
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999`]
);

// Create initial map and menu map
const initialMap = `
LLLLLRRRRR
LLLLLRRRRR
LLLLLRRRRR
LLLLLRRRRR
LLLLLRRRRR
LLLLLRRRRR
LLLLLRRRRR
LLLLLRRRRR`;

const menuMap = `
....................
....................
....................
....................
....................
....................
....................
....................
LLLLLLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLLLLLL
RRRRRRRRRRRRRRRRRRRR
RRRRRRRRRRRRRRRRRRRR
RRRRRRRRRRRRRRRRRRRR`;

let leftPlayerScore = 0;
let rightPlayerScore = 0;
let currentQuestion = {};
let feedbackMessage = "";
let questionCount = 0;
let inMenu = true; // Track if the game is in the menu state
let gameEnded = false; // Track if the game has ended
let maxQuestions = 10; // Default number of questions
let silentMode = false; // Default silent mode off
let timerInterval;
let timeLeft = 5; // Time for each question in seconds
let backgroundMusicHandle; // Handle for background music

// Define sounds
const correctSound = tune`
120: C5-120,
120: D5-120,
120: A5-120,
120: B5-120,
3360`;
const incorrectSound = tune`
120: B5/120,
120: A5/120,
120: D5/120,
120: C5/120,
3360`;
const startSound = tune`
120: E5-120,
120: D5-120,
120: C5-120,
120: D5-120,
120: A5-120,
3240`;
const gameOverSound = tune`
120: G4-120,
120: F4-120,
120: E4-120,
120: C4/120,
120: C4/120,
3240`;
const timeoutSound = tune`
120: E4-120,
120: D4-120,
120: C4-120,
120: B3-120,
120: A3-120,
3240`;
const backgroundMusic = tune`
500: G4^500,
500: E4^500,
500: G4^500,
500: E4^500,
500: G4^500,
500: E4^500,
500: G4^500,
500: E4^500,
500: G4^500,
500: E4^500,
500: G4^500,
500: E4^500,
500: G4^500,
500: E4^500,
500: G4^500,
500: E4^500`;

// Function to generate a random math question
const generateRandomQuestion = () => {
  let num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  const operators = ['+', '-', '*', '/'];
  const operator = operators[Math.floor(Math.random() * operators.length)];
  let correctAnswer;
  
  switch (operator) {
    case '+':
      correctAnswer = num1 + num2;
      break;
    case '-':
      correctAnswer = num1 - num2;
      break;
    case '*':
      correctAnswer = num1 * num2;
      break;
    case '/':
      correctAnswer = num1; // Ensure integer result for division
      num1 = num1 * num2; // Adjust num1 to be a multiple of num2
      break;
  }

  const question = `${num1} ${operator} ${num2}`;
  const answers = generateRandomAnswers(correctAnswer);

  return { question, answers, correct: correctAnswer };
};

// Function to generate random answers
const generateRandomAnswers = (correctAnswer) => {
  const answers = new Set();
  answers.add(correctAnswer);

  while (answers.size < 4) {
    const randomAnswer = Math.floor(Math.random() * 20) + 1;
    answers.add(randomAnswer);
  }

  return Array.from(answers).sort(() => Math.random() - 0.5);
};

// Function to update the question and answers
const updateQuestion = () => {
  if (questionCount >= maxQuestions) {
    endGame();
    return;
  }

  currentQuestion = generateRandomQuestion();
  clearText();
  setMap(initialMap);
  displayScores();
  displayQuestionAndAnswers();
  feedbackMessage = "";
  questionCount++;
  startTimer();
};

// Function to display scores
const displayScores = () => {
  addText(`Score:${leftPlayerScore}`, { x: 1, y: 14, color: color`2` });
  addText(`Score:${rightPlayerScore}`, { x: 11, y: 14, color: color`2` });
  addText(`Round:${questionCount + 1}/${maxQuestions}`, { x: 1, y: 1, color: color`2` });
};

// Function to display the question and answers
const displayQuestionAndAnswers = () => {
  addText(currentQuestion.question, { x: 7, y: 3, color: color`2` });

  // Left player answers
  addText(`${currentQuestion.answers[0]}`, { x: 4, y: 5, color: color`6` });
  addText(`${currentQuestion.answers[1]}`, { x: 2, y: 7, color: color`6` });
  addText(`${currentQuestion.answers[2]}`, { x: 4, y: 9, color: color`6` });
  addText(`${currentQuestion.answers[3]}`, { x: 6, y: 7, color: color`6` });

  // Right player answers
  addText(`${currentQuestion.answers[0]}`, { x: 15, y: 5, color: color`6` });
  addText(`${currentQuestion.answers[1]}`, { x: 13, y: 7, color: color`6` });
  addText(`${currentQuestion.answers[2]}`, { x: 15, y: 9, color: color`6` });
  addText(`${currentQuestion.answers[3]}`, { x: 17, y: 7, color: color`6` });

  // Display feedback message
  addText(feedbackMessage, { x: 7, y: 12, color: color`2` });
};

// Function to check the answer
const checkAnswer = (player, answerIndex) => {
  clearInterval(timerInterval); // Stop the timer
  if (currentQuestion.answers[answerIndex] === currentQuestion.correct) {
    if (player === 'left') {
      leftPlayerScore++;
      setMap(map`
LLLLL
LLLLL
LLLLL
LLLLL`);
    } else {
      rightPlayerScore++;
      setMap(map`
RRRRR
RRRRR
RRRRR
RRRRR`);
    }
    feedbackMessage = "Correct!";
    if (!silentMode) playTune(correctSound);
  } else {
    feedbackMessage = "Wrong!";
    if (player === 'left') {
      leftPlayerScore = Math.max(0, leftPlayerScore - 1); // Decrease score but not below zero
      setMap(map`
XXXXXRRRRR
XXXXXRRRRR
XXXXXRRRRR
XXXXXRRRRR
XXXXXRRRRR
XXXXXRRRRR
XXXXXRRRRR
XXXXXRRRRR`);
    } else {
      rightPlayerScore = Math.max(0, rightPlayerScore - 1); // Decrease score but not below zero
      setMap(map`
AAAAAYYYYY
AAAAAYYYYY
AAAAAYYYYY
AAAAAYYYYY
AAAAAYYYYY
AAAAAYYYYY
AAAAAYYYYY
AAAAAYYYYY`);
    }
    if (!silentMode) playTune(incorrectSound);
  }

  displayFeedbackAndNextQuestion();
};

// Function to display feedback and move to the next question
const displayFeedbackAndNextQuestion = () => {
  clearText();
  displayScores();
  addText(feedbackMessage, { x: 7, y: 12, color: color`2` });

  // Add a delay before updating the question
  setTimeout(() => {
    updateQuestion();
  }, 500); // 0.5-second delay
};

// Function to start the timer
const startTimer = () => {
  timeLeft = 5;
  displayTimer();
  timerInterval = setInterval(() => {
    timeLeft--;
    displayTimer();
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      feedbackMessage = "Time's up!";
      leftPlayerScore = Math.max(0, leftPlayerScore - 1); // Decrease score but not below zero
      rightPlayerScore = Math.max(0, rightPlayerScore - 1); // Decrease score but not below zero
      setMap(map`
TTTTTTTTTT
TTTTTTTTTT
TTTTTTTTTT
TTTTTTTTTT
TTTTTTTTTT
TTTTTTTTTT
TTTTTTTTTT
TTTTTTTTTT`);
      if (!silentMode) playTune(timeoutSound);
      displayFeedbackAndNextQuestion();
    }
  }, 1000); // Update every second
};

// Function to display the timer
const displayTimer = () => {
  addText(`Time:${timeLeft}`, { x: 13, y: 1, color: color`2` });
};

// Function to end the game
const endGame = () => {
  clearInterval(timerInterval); // Stop the timer
  clearText();
  if (!silentMode) playTune(gameOverSound);
  if (backgroundMusicHandle) backgroundMusicHandle.end(); // Stop background music
  setMap(initialMap);

  if (leftPlayerScore > rightPlayerScore) {
    addText("Blue Wins!", { x: 6, y: 6, color: color`2` });
  } else if (rightPlayerScore > leftPlayerScore) {
    addText("Red Wins!", { x: 6, y: 6, color: color`2` });
  } else {
    addText("It's a Tie!", { x: 4, y: 6, color: color`2` });
  }

  addText(`Score: ${leftPlayerScore}:${rightPlayerScore}`, { x: 5, y: 8, color: color`2` });
  addText("Press 'W' to return", { x: 1, y: 10, color: color`2` });

  // Set gameEnded to true to prevent starting the game immediately on 'W' press
  gameEnded = true;
};

// Function to show the game menu
const showMenu = () => {
  inMenu = true;
  gameEnded = false;
  clearText();
  setMap(menuMap);
  addText("Math Quiz Game", { x: 3, y: 2, color: color`3` });
  addText("Made by Zigao Wang", { x: 1, y: 5, color: color`7` });
  addText(`Rounds: <${maxQuestions}>`, { x: 4, y: 9, color: color`2` });
  addText(`Silent: ${silentMode ? "On" : "Off"} (S)`, { x: 3, y: 11, color: color`2` });
  addText("Press 'W' to Start", { x: 1, y: 14, color: color`2` });
};

// Function to start the game
const startGame = () => {
  inMenu = false;
  gameEnded = false;
  leftPlayerScore = 0;
  rightPlayerScore = 0;
  questionCount = 0;
  if (!silentMode) playTune(startSound);
  updateQuestion();
  // Start background music
  if (!silentMode) backgroundMusicHandle = playTune(backgroundMusic, Infinity);
};

// Input handler for starting the game from the menu or returning to the menu
onInput("w", () => {
  if (gameEnded) {
    showMenu();
  } else if (inMenu) {
    startGame();
  } else {
    checkAnswer('left', 0);
  }
});

// Input handlers for player answers
onInput("a", () => { if (!inMenu) checkAnswer('left', 1); });
onInput("s", () => { if (!inMenu) checkAnswer('left', 2); });
onInput("d", () => { if (!inMenu) checkAnswer('left', 3); });

onInput("i", () => { if (!inMenu) checkAnswer('right', 0); });
onInput("j", () => { if (!inMenu) checkAnswer('right', 1); });
onInput("k", () => { if (!inMenu) checkAnswer('right', 2); });
onInput("l", () => { if (!inMenu) checkAnswer('right', 3); });

// Input handlers for adjusting rounds and toggling silent mode in the menu
onInput("a", () => {
  if (inMenu) {
    maxQuestions = maxQuestions === 5 ? 50 : maxQuestions === 10 ? 5 : maxQuestions === 15 ? 10 : maxQuestions === 20 ? 15 : maxQuestions === 30 ? 20 : maxQuestions === 50 ? 30 : maxQuestions;
    showMenu();
  }
});

onInput("d", () => {
  if (inMenu) {
    maxQuestions = maxQuestions === 5 ? 10 : maxQuestions === 10 ? 15 : maxQuestions === 15 ? 20 : maxQuestions === 20 ? 30 : maxQuestions === 30 ? 50 : maxQuestions === 50 ? 5 : maxQuestions;
    showMenu();
  }
});

onInput("s", () => {
  if (inMenu) {
    silentMode = !silentMode;
    showMenu();
  }
});

// Show the game menu initially
showMenu();