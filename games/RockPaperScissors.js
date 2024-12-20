/*
@title: RockPaperScissors
@author: Andrea Ivanov
@tags: []
@addedOn: 2024-12-16
*/


const player = 'p';
const rock = 'r';
const paper = 'a';
const scissors = 's';
const door = 'd';


setLegend(
  [player, bitmap`
................
................
.....00000......
....0.....0.....
....0.0.0.0.....
....0.....0.....
....0.000.0.....
....0.....0.....
.....00000......
.......0........
.....00000......
.......0........
.......0........
......0.0.......
.....0...0......
................`],
  [door, bitmap`
................
......8888......
.....888888.....
....88888888....
....88888888....
....88888888....
....88888888....
....88888888....
....88888888....
....88888888....
....88888888....
....88888888....
....88888888....
....88888888....
....88888888....
................`]
);

setMap(map`
.p............d`);


let gameRunning = true;
let playerChoice = null;
let botChoice = null;
let choices = ['r', 'a', 's'];
let score = 0;
let streak = 0;
let level = 1;


onInput('w', () => makeChoice('r'));
onInput('s', () => makeChoice('a'));
onInput('d', () => makeChoice('s'));


function makeChoice(choice) {
  if (!gameRunning) return;
  gameRunning = false;
  playerChoice = choice;
  botChoice = choices[Math.floor(Math.random() * 3)];
  resolveGame();
}


function resolveGame() {
  clearText();
  clearText();
  if (!playerChoice || !botChoice) return;

  let result = "";
  let playerSprite = getFirst(player);

  if (playerChoice === botChoice) {
    result = ("Tie! -_-");
    updatePrText('tie');

    resultColor = color`6`; 
  } else if (
    (playerChoice === 'r' && botChoice === 's') ||
    (playerChoice === 'a' && botChoice === 'r') ||
    (playerChoice === 's' && botChoice === 'a')
  ) {
    result = "You won >:( !";
    updatePrText('win');
    resultColor = color`7`; 
    score++;
    streak++;
    playerSprite.x += 1; 
  if (playerSprite.x === 14) {
    playerSprite.remove();
    addSprite(1, 0, player);
  }
  } else {
    result = "You lost!";
    updatePrText('lose');
    resultColor = color`3`;
    playerSprite.x = 1;
    streak = 0;
    
  }

 
  if (playerSprite.x === 14) {
    level++;
    playerSprite.x = 1;
    score = 0;
    streak = 0;
    updateText(`Level ${level}!`, color`6`);
    setTimeout(() => {
    displayInstructions();
    gameRunning = true;
  }, 2500);
    return;
  }

  updateText(`You chose ${getChoiceName(playerChoice)}. Bot chose ${getChoiceName(botChoice)}.`, resultColor);
  addText(result, { x: 5, y: 6, color: resultColor });
  setTimeout(() => {
    clearText();
    displayInstructions();
    gameRunning = true;
  }, 2500);
  resetGame();
}


function getChoiceName(choice) {
  if (choice === 'r') return 'Rock';
  if (choice === 'a') return 'Paper';
  if (choice === 's') return 'Scissors';
}

function resetGame() {
  
  playerChoice = null;
  botChoice = null;
  setTimeout(() => {
    displayInstructions();
  }, 2500);
}

function updatePrText(outcome) {
  const texts = {
    win: ["Not bad...!", "Luck!", "Impossible!"],
    lose: ["Try Again", "Try harder!"],
    tie: ["That's all?", "Seriously?", "Wow"]
  };

  const randomText = texts[outcome][Math.floor(Math.random() * texts[outcome].length)];
  addText(randomText, { x: 0, y: 14, color: color`1` });
}


function updateText(message, colorCode) {
  
  const lines = message.split('. ');
  lines.forEach((line, index) => {
    addText(line, { x: 0, y: index, color: colorCode });
  });

  addText(`Score: ${score}`, { x: 0, y: 10, color: color`2` });
  addText(`Streak: ${streak}`, { x: 0, y: 11, color: color`2` });
  addText(`Level: ${level}`, { x: 0, y: 12, color: color`2` });
}

function displayInstructions(resetColor = false) {
  addText('Press W for Rock', { x: 0, y: 0, color: color`3` });
  addText('Press S for Paper', { x: 0, y: 1, color: color`4` });
  addText('Press D for Scissors', { x: 0, y: 2, color: color`5` });
  addText("Ready?", { x: 0, y: 6, color: color`3` });
  addText("!", { x: 19, y: 6, color: color`6` });
  const scoreColor = color`2`;
  addText(`Score: ${score}`, { x: 0, y: 10, color: scoreColor });
  addText(`Streak: ${streak}`, { x: 0, y: 11, color: scoreColor });
  addText(`Level: ${level}`, { x: 0, y: 12, color: scoreColor });
}

clearText();
displayInstructions();

