/*
@title: alexandru moga
@author: flappy-bird
@tags: []
@addedOn: 2025-01-09
*/
const player = "p";
const wall = "w";
const background = "b";

setLegend(
  [ player, bitmap`
................
................
................
.....0000000....
....006666020...
..006666602220..
.02206666022020.
022220666022020.
022222066602220.
0622260666600000
.066606666099990
..00006660900000
....066666099990
.....00666600000
......00000.....
................`],
  [ wall, bitmap`
4DDD444444444444
4DDD444444444444
4DDD444444444444
4DDD444444444444
4DDD444444444444
4DDD444444444444
4DDD444444444444
4DDD444444444444
4DDD444444444444
4DDD444444444444
4DDD444444444444
4DDD444444444444
4DDD444444444444
4DDD444444444444
4DDD444444444444
4DDD444444444444`],
  [ background, bitmap`
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
7777777777777777` ]
);

setMap( map`
.......w
.......w
.......w
.p......
.......w
.......w
.......w
.......w` );
setBackground(background);

var opening = 3;
var speed = 250;
var score = 0;
var isGameOver = false;

setPushables({
  [ player ]: [],
});

onInput("s", () => {
  if (!isGameOver) {
    getFirst(player).y += 1
  }
});

onInput("w", () => {
  if (!isGameOver) {
    getFirst(player).y -= 1
  }
});

function genWall() {
  opening = Math.floor(Math.random() * 8);
  for (let y=0; y < 8; y++) {
    if (y != opening) {
      addSprite(7, y, wall);
    }
  }

  score++;
}

function gameLoop() {
  addText(`Score: ${score}`, {x: 9, y: 14,color: color`2`})
    
  getAll(wall).forEach((w) => {
    if (w.x == 0) {
      w.remove();
    } else {
      w.x -= 1;
    };
  });

  if (getAll(wall).length == 0) {
    genWall();
  }

  if (getFirst(wall).x == getFirst(player).x && getFirst(player).y != opening) {
      lost();
  } 

  speed -= (250-speed);
  if (!isGameOver) {
    setTimeout(gameLoop, speed);
  }
}

function lost() {
  isGameOver = true;
  // console.log("You lost");
  setMap(map`
........
........
........
........
........
........
........
........`);
  clearText();
  addText("Game over!", {x: 5, y: 7, color: color`3`})
  addText(`Score: ${score}`, {x: 5, y: 8, color: color`3`})
}

gameLoop();
