/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Dan The Bird
@author: Yash00241
@tags: ['begginer', 'endless', 'duck', 'flappybird']
@addedOn: 2024-08-29
*/
var bgm = tune`
200: A4^200 + C5^200 + E5^200 + A5^200,
200: G4~200 + C5~200 + E5-200 + D5^200,
200: F4^200 + A4~200 + C5^200,
200: E4~200 + G4~200 + B4-200 + C5^200,
200: D5^200 + A4^200 + F5~200 + E5-200,
200: C5^200 + E4~200 + G4-200 + D5^200,
200: B4~200 + G4^200 + E5-200 + C5~200,
200: A4^200 + F5~200 + D5^200 + G4^200,
200: E5^200 + C5~200 + A4-200 + B4~200,
200: F4^200 + D4^200 + E5~200 + G4^200,
200: C5^200 + G4~200 + E4-200 + D5^200,
200: A4^200 + C5^200 + B4~200 + E5-200,
200: G4^200 + D5^200 + C5^200 + F5~200,
200: E4~200 + G4~200 + A4^200 + C5~200,
200: B4-200 + F5^200 + G4~200 + E5~200,
200: D5^200 + C5~200 + A4~200 + G4^200,
200: E5~200 + C5^200 + F4~200 + B4-200,
200: G4^200 + D5^200 + A4~200 + C5~200,
200: A4^200 + C5^200 + E5^200 + A5^200,
200: G4~200 + C5~200 + E5-200 + D5^200,
200: F4^200 + A4~200 + C5^200,
200: E4~200 + G4~200 + B4-200 + C5^200,
200: D5^200 + A4^200 + F5~200 + E5-200,
200: C5^200 + E4~200 + G4-200 + D5^200,
200: B4~200 + G4^200 + E5-200 + C5~200,
200: A4^200 + F5~200 + D5^200 + G4^200,
200: E5^200 + C5~200 + A4-200 + B4~200,
200: F4^200 + D4^200 + E5~200 + G4^200,
200: C5^200 + G4~200 + E4-200 + D5^200,
200: A4^200 + C5^200 + B4~200 + E5-200,
200: G4^200 + D5^200 + C5^200 + F5~200,
200: E4~200 + G4~200 + A4^200 + C5~200`
var music = playTune(bgm, Infinity);

const player = "p";
const wall = "w";
const background = "b";

setLegend(
  [ player, bitmap`
................
................
................
................
..........000000
......000.066660
.....00990060060
000..09999066060
0660000090066660
0066666000666660
.066666666666600
.06666666666660.
.00666666666660.
..0066666666660.
...006666666600.
.....000000000..`],
  [ wall, bitmap`
DDDDDDDDDDDDDDDD
D4444D444444444D
DDD44D444444444D
D4444D4DD444444D
D4444D444444444D
DDDDDDDDDDDDDDDD
D4444444444D444D
D44444DD444D44DD
D4444444444D44DD
D4444444444D444D
DDDDDDDDDDDDDDDD
D444444D4444444D
D4DD444D4444444D
D444444D4444444D
D444444D4444DD4D
DDDDDDDDDDDDDDDD`],
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
0000000000000000` ]
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
  addText(`Score: ${score}`, {x: 9, y: 14,color: color`7`})
    
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
  addText("Game over!", {x: 5, y: 7, color: color`2`})
  addText(`Score: ${score}`, {x: 5, y: 8, color: color`7`})
}

gameLoop();
