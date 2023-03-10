/*
@title: OutBrick 
@author: Shrey Mehra
*/

const playerL = "p";
const blockT = "t";
const ball = "o";
const background = "s";
let Score = 0;
let playerSpeed = 6;

setLegend(
  [ playerL, bitmap`
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
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
0777777777744770
0777777774744740
7777777747777770
0777777777777470
0777777777777770
0777777777777770
0747777777777770
0777777777777770
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
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`]
);

let sounds = true;
const paddleSound = tune`
134.52914798206277: c5~134.52914798206277,
941.7040358744393,
134.52914798206277: d5~134.52914798206277,
1076.2331838565021,
134.52914798206277: a4~134.52914798206277,
1076.2331838565021,
134.52914798206277: b4~134.52914798206277,
672.6457399103139`;
const blockSound = tune`
500: c5^500,
6500,
500: e4~500,
3000,
500: e4~500,
2500,
500: f4~500,
500: b4~500,
1500`;
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
