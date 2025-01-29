/*
@title: Ping Pong
@author: Cral-Cactus
@tags: ['retro']
@addedOn: 2024-07-05
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
...000000000....
...000000000....
...000000000....
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

onInput("a", () => {
  const paddle1 = getFirst(paddle);
  if (paddle1.y > 0) paddle1.y -= 1;
});

onInput("d", () => {
  const paddle1 = getFirst(paddle);
  if (paddle1.y < 13) paddle1.y += 1;
});

function movePaddle2() {
  const paddle2 = getAll(paddle).find(p => p.x === 15);
  const targetY = ballY - 1;

  if (paddle2) {
    if (paddle2.y < targetY && paddle2.y < 13) {
      paddle2.y += 1;
    } else if (paddle2.y > targetY && paddle2.y > 0) {
      paddle2.y -= 1;
    }
  }
}

function updateScoreboard() {
  clearText();
  addText(`${player1Score} - ${player2Score}`, { y: 1, color: color`2` });
}

function update() {
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
    resetBall();
  } else if (ballX > 15) {
    player1Score += 1;
    updateScoreboard();
    resetBall();
  } else {
    addSprite(Math.floor(ballX), Math.floor(ballY), ball);
    movePaddle2();
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
500: c4^500 + e4^500 + g4^500,
500: d4^500 + f4^500 + a4^500,
500: e4^500 + g4^500 + b4^500,
500: f4^500 + a4^500 + c5^500,
500: g4^500 + b4^500 + d5^500,
500: a4^500 + c5^500 + e5^500,
500: b4^500 + d5^500 + f5^500,
500: c5^500 + e5^500 + g5^500`;
playTune(soundtrack, Infinity);
