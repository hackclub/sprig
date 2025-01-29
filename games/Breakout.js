/*
@title: Breakout
@author: Holly
@tags: ['retro']
@addedOn: 2022-09-28
*/

const playerL = "p";
const blockT = "t";
const ball = "o";
const background = "s";
let Score = 0;
let playerSpeed = 6;

setLegend(
  [ playerL, bitmap`
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
................
................
................
................
................
................
................
................
................`],
  [ blockT, bitmap`
0444444444444440
0444444444444440
0444444444444440
0444444444444440
0444444444444440
0444444444444440
0444444444444440
0444444444444440
................
................
................
................
................
................
................
................`],
  [ ball, bitmap`
................
................
................
................
................
................
................
.......666......
......66666.....
.....6666666....
....666666666...
....666666666...
....666666666...
.....6666666....
......66666.....
.......666......`],
  [ background, bitmap`
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
0000000000000000`]
);

let sounds = true;
const paddleSound = tune`
134.52914798206277: c5~134.52914798206277,
4170.403587443946`;
const blockSound = tune`
500: c5^500,
15500`;
const loseSound = tune`
130.43478260869566: c4/130.43478260869566 + d4/130.43478260869566,
130.43478260869566: c4/130.43478260869566 + d4/130.43478260869566,
3913.0434782608695`;

setBackground(background);

let level = 0;
const levels = [
  map`
.......................
.......................
ttttttttttttttttttttttt
ttttttttttttttttttttttt
ttttttttttttttttttttttt
ttttttttttttttttttttttt
ttttttttttttttttttttttt
ttttttttttttttttttttttt
.......................
o......................
.......................
.......................
.......................
.......................
.......................
.......................
.......................
.......................
......pp...............`,
];

setMap(levels[level]);

addText(`${Score}`, {
  y: 0,
  x: 9,
  color: color`2`
});

onInput("d", () => {
  getAll(playerL).forEach(s => s.x += 2)
});

onInput("a", () => {
  getAll(playerL).forEach(s => s.x -= 2)
});

let headingX = 1;
let headingY = 1;

function writeScore() {
  addText (`${Score += 1}`, {
  y: 0,
  x: 9,
  color: color`2`
  });
}

function makeSound() {
  if (sounds) {
    playTune(paddleSound);
  }
  else {
    playTune(blockSound);
  }
  sounds = !sounds
}

let gameInterval = setInterval(() => {
  let ballOne = getFirst(ball)
  let positionBeforeX = ballOne.x;
  ballOne.x += headingX;
  if (positionBeforeX == ballOne.x){
    headingX *= -1;
  }
  let positionBeforeY = ballOne.y;
  ballOne.y += headingY;
  if (positionBeforeY == ballOne.y){
    headingY *= -1;
  }

  //ball to bounce off bricks
  let tilesWithBrickandBall = tilesWith(ball, blockT)
  if (tilesWithBrickandBall.length > 0){
    let tileWithBrickandBall = tilesWithBrickandBall[0];
    let brick = tileWithBrickandBall.find(s=>s.type===blockT);
    makeSound();
    brick.remove();
    writeScore();
    headingY *= -1;
  }

  //ball to bounce off paddle
  let paddleTiles = tilesWith(playerL);
  if (paddleTiles.some(s => s.length > 1)){
    makeSound();
    headingY *= -1;
    ballOne.y += headingY
  }

  //you lose!  
  if (ballOne.y >= height() -1) {
    playTune(loseSound);
    ballOne.remove();
    clearText()
    addText ("GAME OVER!", { y: 0, x: 5, color: color`2` });
    addText ("TRY AGAIN!", { y: 5, x: 5, color: color`2` });
    clearInterval(gameInterval);
 } 
  
}, 1000/10)
