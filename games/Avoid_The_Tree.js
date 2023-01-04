/*
@title: Avoid_The_Tree
@author: Samarth Verulkar
*/

const player = "p";
const wall = "w";
const background = "b";

setLegend(
  [ player, bitmap`
......44........
...4444.........
.....44.........
.....66.........
...666666.......
..66666666......
.666666000......
.6666600006.....
666666600666....
666666666666....
6666666666666333
6666666666666333
66666666666663..
.66666666666....
.6666666666.....
.66666666.......`],
  [ wall, bitmap`
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CDDDDDCCCCCCDDDC
CDDDCCCCCCCCDDDC
CDDDCCCCCCCCDDDC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCDDDDD
CCDDDCCCCCCDDDDD
CCDDDCCCCCCDDDDD
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC`],
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
  addText(`Score: ${score}`, {x: 9, y: 14,color: color`6`})
    
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
  console.log("You lost");
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
  addText("Game over!", {x: 5, y: 7, color: color`6`})
  addText(`Score: ${score}`, {x: 5, y: 8, color: color`6`})
}

gameLoop();
