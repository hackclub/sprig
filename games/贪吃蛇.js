/*
@title: Greedy Snake
@author: ZhengRu
@tags: [贪吃蛇]
@addedOn: 2025-10-30
*/

const player = "p"
const body = "b"
const food = "f"
const wall = "w"
const gamebg = "g";

setLegend(
  [ player, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD`],
  [ body, bitmap`
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
0000000000000000` ],
  [ food, bitmap`
....4....4.4....
.....44.44444...
......444.......
..0000.4.00.....
..0330040330000.
.033333433333300
0333333403333330
0333330033333330
0333333333333330
0333333333333330
0333333333333330
0333333333333330
0333333333333330
0003333333333330
..0003333333330.
...000000000000.` ],
  [ wall, bitmap`
CCCCCCCCCCCCCCCC
99999999999C9999
9999F9999F9C999F
9F999F99999C9F99
CCCCCCCCCCCCCCCC
FCF99999999999F9
9CF99999F99999F9
9CF9999999F999F9
CCCCCCCCCCCCCCCC
99F99999CF999999
99999F99CF999999
99999999CFF99999
CCCCCCCCCCCCCCCC
9CF999999999999C
9CF999F99F99999C
FCF999999F99F99C` ],
  [ gamebg, bitmap`
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
................`]
);

const music = tune`
3000: C5~3000 + C4~3000 + G4~3000,
3000: E5~3000 + C4~3000 + B4~3000,
3000: C5~3000 + C4~3000 + G4~3000,
3000: B4~3000 + C4~3000 + F4~3000,
3000: A4~3000 + C4~3000 + E4~3000,
3000: G4~3000 + E4~3000 + C4~3000,
3000: C4~3000 + A4~3000 + F4~3000,
3000: C4~3000 + C5~3000 + G4~3000,
3000: C4~3000 + E5~3000 + B4~3000,
3000: C4~3000 + C5~3000 + G4~3000,
3000: C4~3000 + B4~3000 + F4~3000,
3000: C4~3000 + A4~3000 + E4~3000,
3000: C4~3000 + E4~3000 + G4~3000,
3000: C4~3000 + A4~3000 + F4~3000,
3000: C4~3000 + C5~3000 + G4~3000,
3000: C4~3000 + E5~3000 + B4~3000,
3000: C4~3000 + C5~3000 + G4~3000,
3000: C4~3000 + B4~3000 + F4~3000,
3000: C4~3000 + A4~3000 + E4~3000,
3000: C4~3000 + E4~3000 + G4~3000,
3000: C4~3000 + A4~3000 + F4~3000,
3000: C4~3000 + G4~3000 + C5~3000,
3000: C4~3000 + E5~3000 + B4~3000,
3000: C4~3000 + C5~3000 + G4~3000,
3000: C4~3000 + B4~3000 + F4~3000,
3000: C4~3000 + A4~3000 + E4~3000,
3000: C4~3000 + E4~3000 + G4~3000,
3000: C4~3000 + A4~3000 + F4~3000,
3000: C4~3000 + G4~3000 + C5~3000,
3000: C4~3000 + B4~3000 + G4~3000,
3000: C4~3000 + A4~3000 + F4~3000,
3000: C4~3000 + B4~3000 + F4~3000`;
const move_music = tune`
47.84688995215311: F4~47.84688995215311 + A4~47.84688995215311 + B4~47.84688995215311,
47.84688995215311: A4~47.84688995215311 + G4~47.84688995215311 + F4~47.84688995215311,
47.84688995215311: G4~47.84688995215311 + F4~47.84688995215311,
1387.5598086124403`;
let playback = playTune(music, Infinity)

let direction = "e";
let directionToSet = "e";
let score = 0;

setMap(map`
..........
..........
..........
..........
..........
..........
..........
..........`);
setBackground(gamebg);

setSolids([ player, wall, body]);

let snake = [
  [0, 0]
]

function placeFood() {
    let position = [Math.floor(Math.random() * 9)+1, Math.floor(Math.random() * 7)+1];
  
  addSprite(position[0], position[1], food);

  
}

function addScore() {
  clearText();
  addText("SCORE: " + score, {x: 1, y: 1});
}

function gameOver() {
  for (let x = 0; x <= 9; x++) {
    for (let y = 0; y <= 7; y++) {
      addSprite(x, y, gamebg);
    }
  }
  clearText();
  addText("GAME OVER!", {x:5, y:4, color:color`3`});
  addText("Final Score: " + score, {x: 1, y:6});
  addText("Try again? Press i.", {x: 1, y:13});
  clearInterval(interval);
  if(playback) playback.end();
}

addScore();

onInput("s", () => {
  if (direction != "n") {
  directionToSet = "s";
  }
  playTune(move_music);
});

onInput("d", () => {
  if (direction != "w") {
  directionToSet = "e";
  }
  playTune(move_music);
});

onInput("a", () => {
  if (direction != "e") {
  directionToSet = "w";
  }
  playTune(move_music);
});

onInput("w", () => {
  if (direction != "s") {
  directionToSet = "n";
  }
  playTune(move_music);
});

onInput("i", () => {
  clearText();
  getAll().forEach(tile => {
    clearTile(tile.x, tile.y);
  });
  
  score = 0;
  direction = "e";
  directionToSet = "e";
  snake = [
  [0, 0]
];
  placeFood();
  clearInterval(interval);
  interval = setInterval(move, 400);
  addScore();

  if(playback) playback.end();
  playback = playTune(music, Infinity);
});

placeFood();

function move() {

  direction = directionToSet;
  
  if (tilesWith(food) == 0) {
    placeFood();
  }
  
  switch(direction) {
    case "n":
      snake.push([snake[snake.length-1][0], snake[snake.length-1][1]-1])
      break;
    case "s":
      snake.push([snake[snake.length-1][0], snake[snake.length-1][1]+1])
      break;
    case "e":
      snake.push([snake[snake.length-1][0]+1, snake[snake.length-1][1]])
      break;
    case "w":
      snake.push([snake[snake.length-1][0]-1, snake[snake.length-1][1]])
      break;
  }
  
  if (tilesWith(player, food).length != 0 || tilesWith(body, food).length != 0) {
    // console.log(tilesWith(player).length);
    placeFood();
    score += 1;
    clearTile(getFirst(food).x, getFirst(food).y);
    addScore();
    clearTile(snake[0][0], snake[0][1]);

    clearInterval(interval);
  interval = setInterval(move, 400 - (score*10));
  }
  else if (snake.length > 1) {
    
    let removed = snake.shift();
    clearTile(removed[0], removed[1]);
  }

  let i = 0;
  snake.forEach(el => {

    if (i+1 < snake.length) {
      clearTile(el[0], el[1]);
      addSprite(el[0], el[1], body);
  }
  else {
    if ((el[0] < 0 || el[0] > 9) || (el[1] < 0 || el[1] > 7)) {
      
      gameOver();
    } else {
    addSprite(el[0], el[1], player);
    }
  }
    if (tilesWith(player, body).length != 0) {
      gameOver();
    }
    i++;
  })
}

let interval = setInterval(move, 400);