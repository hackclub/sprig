/*
@title: Paddle Wars
@author: R09Aditya
@tags: [arcade, pong, multiplayer, classic, sports, competitive, retro, 2player, ball-game, skill, fast-paced, pixel, challenge]
@addedOn: 2025-08-25
*/
const paddle = "p";
const ball = "b";
const darkBackground = "d";

setLegend(
  [ paddle, bitmap`
......0000......
......0000......
......0000......
......0000......
......0000......
......0000......
......0000......
......0000......
......0000......
......0000......
......0000......
......0000......
......0000......
......0000......
......0000......
......0000......`],
  [ ball, bitmap`
................
................
................
.....00000......
....0000000.....
...000000000....
...0000000000...
..00000000000...
..0000000000....
...000000000....
....0000000.....
.....00000......
................
................
................
................`],
  [ darkBackground, bitmap`
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111`]
);

const level = map`
................
................
................
................
................
................
................
p..............p
................
................
................
................
................
................
................`;

setMap(level);
setBackground(darkBackground);
setSolids([paddle]);

let ballX = 7.5;
let ballY = 7.5;
let horizontalSpeed = 0.2;
let verticalSpeed = 0.1;
let ballVelX = Math.random() < 0.5 ? -horizontalSpeed : horizontalSpeed;
let ballVelY = (Math.random() - 0.5) * 2 * verticalSpeed;

let player1Score = 0;
let player2Score = 0;
const maxScore = 6;
let gameOver = false;


onInput("w", () => {
  const paddle1 = getFirst(paddle);
  if (!gameOver && paddle1.y > 0) paddle1.y -= 1;
});
onInput("s", () => {
  const paddle1 = getFirst(paddle);
  if (!gameOver && paddle1.y < 13) paddle1.y += 1;
});

onInput("i", () => {
  const paddle2 = getAll(paddle).find(p => p.x === 15);
  if (!gameOver && paddle2 && paddle2.y > 0) paddle2.y -= 1;
});
onInput("k", () => {
  const paddle2 = getAll(paddle).find(p => p.x === 15);
  if (!gameOver && paddle2 && paddle2.y < 13) paddle2.y += 1;
});

function updateScoreboard() {
  clearText();
  addText(`${player1Score} - ${player2Score}`, { y: 1, color: color`2` });
}

function endGame(winner) {
  gameOver = true;
  clearText();
  addText(`${winner} WINS!`, { y: 3, color: color`3` });
}

function update() {
  if (gameOver) return;

  clearTile(Math.floor(ballX), Math.floor(ballY));

  ballX += ballVelX;
  ballY += ballVelY;

  if (ballY < 0) {
    ballY = 0;
    ballVelY = Math.abs(ballVelY);
  } else if (ballY > 13) {
    ballY = 13;
    ballVelY = -Math.abs(ballVelY);
  }

  const leftPaddle = getFirst(paddle);
  const rightPaddle = getAll(paddle).find(p => p.x === 15);

  if (ballX <= 1 && ballY >= leftPaddle.y && ballY <= leftPaddle.y + 2) {
    ballVelX = Math.abs(ballVelX);
    ballVelY = (Math.random() - 0.5) * 2 * verticalSpeed;
    ballX = 1;
  }

  if (rightPaddle && ballX >= 14 && ballY >= rightPaddle.y && ballY <= rightPaddle.y + 2) {
    ballVelX = -Math.abs(ballVelX);
    ballVelY = (Math.random() - 0.5) * 2 * verticalSpeed;
    ballX = 14;
  }

  if (ballX < 0) {
    player2Score += 1;
    updateScoreboard();
    if (player2Score >= maxScore) return endGame("Player 2");
    resetBall();
  } else if (ballX > 15) {
    player1Score += 1;
    updateScoreboard();
    if (player1Score >= maxScore) return endGame("Player 1");
    resetBall();
  } else {
    addSprite(Math.floor(ballX), Math.floor(ballY), ball);
  }

  setTimeout(update, 50);
}

function resetBall() {
  ballX = 7.5;
  ballY = 7.5;
  ballVelX = Math.random() < 0.5 ? -horizontalSpeed : horizontalSpeed;
  ballVelY = (Math.random() - 0.5) * 2 * verticalSpeed;
  addSprite(Math.floor(ballX), Math.floor(ballY), ball);
}

addSprite(Math.floor(ballX), Math.floor(ballY), ball);
updateScoreboard();
update();

const soundtrack = tune`
150: c4^150, e4^150, g4^150, c5^150,
150: g4^150, e4^150, c4^150, d4^150,
150: f4^150, a4^150, f4^150, d4^150,
150: e4^150, g4^150, b4^150, c5^150,
150: c5^150, b4^150, g4^150, e4^150,
150: d4^150, f4^150, a4^150, g4^150,
200: c4^200, d4^200, e4^200, f4^200,
300: g4^300
`;

playTune(soundtrack, Infinity);
