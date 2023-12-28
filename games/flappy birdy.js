/*
@title: flappy_bird_but_no_gravity_and_worse
@author: sam liu
*/

const player = "p";
const wall = "w";
const background = "b";

setLegend(
  [ player, bitmap`
.........66666..
.........62226..
.........62026..
.........6222699
...6666666666699
..66666666666699
6666666666......
..66666666......
...6666666......
...C....C.......
...C....C.......
...C....C.......
..CCC..CCC......
...C....C.......
................
................`],
  [ wall, bitmap`
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444`],
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
var speed = 350;
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
  addText(`Score: ${score}`, {x: 9, y: 1,color: color`0`})
    
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

  speed -= (350-speed);
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
  addText("You Lost", {x: 5, y: 6, color: color`0`})
  addText(`Score: ${score}`, {x: 5, y: 9, color: color`0`})
}

gameLoop();
