/*
@title: Hungry Ninja
@author: Prajval Raval

Instructions:
WASD to control your player
Collect as many apples as you can and avoid bombs.
P.S. There are also apple bombs :-)
*/

// All the game sprites
const player = "p";
const box = "b";
const goal = "g";
const wall = "w";
const log = "l";
const dirt = "d";
const leaves = "e";
const sky = "s";
const apple = "a";
const enemy = "q";

// Game Variables
let ninjaDied = false;
let score = 0;
let level = 0;

// Game Music
const music = tune`
277.77777777777777: B5~277.77777777777777 + C4~277.77777777777777,
277.77777777777777: B4~277.77777777777777 + C5^277.77777777777777,
277.77777777777777: C5~277.77777777777777 + B4^277.77777777777777 + A4-277.77777777777777,
277.77777777777777: C5/277.77777777777777 + B4~277.77777777777777 + D4-277.77777777777777,
277.77777777777777: G5~277.77777777777777,
277.77777777777777: F4^277.77777777777777 + E4^277.77777777777777 + G5~277.77777777777777,
277.77777777777777: F4^277.77777777777777 + E4^277.77777777777777,
277.77777777777777: G4~277.77777777777777 + F4^277.77777777777777 + E4^277.77777777777777,
277.77777777777777: G4~277.77777777777777,
277.77777777777777: G5^277.77777777777777 + F5^277.77777777777777 + G4~277.77777777777777,
277.77777777777777: G5^277.77777777777777 + F5^277.77777777777777,
277.77777777777777: G5^277.77777777777777 + F5^277.77777777777777 + E5~277.77777777777777,
277.77777777777777: E5~277.77777777777777,
277.77777777777777: B4^277.77777777777777 + A4^277.77777777777777 + E5~277.77777777777777 + D4-277.77777777777777,
277.77777777777777: B4^277.77777777777777 + A4^277.77777777777777 + C5/277.77777777777777,
277.77777777777777: B4^277.77777777777777 + A4^277.77777777777777 + G4~277.77777777777777 + D4-277.77777777777777,
277.77777777777777: G4~277.77777777777777,
277.77777777777777: B5^277.77777777777777 + A5^277.77777777777777 + G4~277.77777777777777,
277.77777777777777: B5^277.77777777777777 + A5^277.77777777777777 + G5~277.77777777777777,
277.77777777777777: B5^277.77777777777777 + A5^277.77777777777777 + G5~277.77777777777777,
277.77777777777777: G5~277.77777777777777,
277.77777777777777: E5^277.77777777777777 + D5^277.77777777777777 + D4-277.77777777777777,
277.77777777777777: E5^277.77777777777777 + D5^277.77777777777777 + C5/277.77777777777777,
277.77777777777777: E5^277.77777777777777 + D5^277.77777777777777 + C5~277.77777777777777 + D4-277.77777777777777,
277.77777777777777: C5~277.77777777777777,
277.77777777777777: A5^277.77777777777777 + G5^277.77777777777777 + C5~277.77777777777777,
277.77777777777777: A5^277.77777777777777 + G5^277.77777777777777,
277.77777777777777: A5^277.77777777777777 + G5^277.77777777777777 + B5~277.77777777777777,
277.77777777777777: B5~277.77777777777777,
277.77777777777777: B5-277.77777777777777 + A4-277.77777777777777 + B4^277.77777777777777 + C5/277.77777777777777 + D4-277.77777777777777,
277.77777777777777: C5^277.77777777777777 + B4^277.77777777777777,
277.77777777777777: G5-277.77777777777777 + F5-277.77777777777777 + E5-277.77777777777777 + B4^277.77777777777777 + C5^277.77777777777777`;

// Setting game background music
playTune(music, Infinity);

// All the game bitmaps
setLegend(
  [
    player,
    bitmap`
........00000...
........02020...
.....00000200...
.....02220000...
....0220220.....
....0322220.....
.....000220.....
6000000000000006
06020D22522D0200
600002D525D20006
....025D2D520...
....0522D2250...
....000000000...
......60606.....
....HHH...HHH...
....HH0...0HH...`,
  ],
  [
    log,
    bitmap`
C0CCC0CC0CCCCCCC
C0CC00C0CC0CC0C0
C0CC0CC0CC0CC0C0
0C0C0CC0CC0CC0C0
CC0CCCCCCC0CC0C0
CCCCCCCCCC0CC0C0
0CC0CCCC0C0C00C0
CCC0CC0C0C0C0CC0
CCC0CC0C0C0C0CC0
CCC0CCC0CC0C0CC0
C0C0CCC0C0CC0CC0
C0C0CCC0C0CC0CC0
00C0CCC0C0CC0CC0
00CCCCC0CCCC0CCC
C0CC0CC00CCC0CC0
CCCC0CCC0CCC0CCC`,
  ],
  [
    dirt,
    bitmap`
44DD4DDD44DD4D44
44444C44DD444444
4C444C4C4444C44C
CCCC4CCC4C4CCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC`,
  ],
  [
    leaves,
    bitmap`
DDDDDDDDDD2DDDDD
DD2DD3DD6DDDDDDD
DDDDDDDDDD3DDD2D
D2DDD9D62DDDDDDD
DDDDDDDDDDDD3DDD
DD2DDDDDDDDDDDDD
DDDDD2DDDDDDDDD6
D6DDDDD2DD2DDDDD
DDDDDDDDDDDDDDDD
DDDD2DD6DDDDDD2D
DD9DDDDDDDDDDDDD
2DDDDD3DD9D2DDDD
D3DDDDDDDDDDDDDD
DDD2DDD2DDDDDDDD
DDDDDD3DD2DDDD2D
D6DD9DDDDDDDDDDD`,
  ],
  [
    sky,
    bitmap`
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
7777777777777777`,
  ],
  [
    apple,
    bitmap`
................
................
.......4DDD.....
......4DD4......
......444.......
.......D........
....3333333.....
....3.3.3.3.....
....33.3.33.....
....3.3.3.3.....
....33.3.33.....
....3333333.....
................
................
................
................`,
  ],
  [
    enemy,
    bitmap`
................
................
.......6F99.....
......6F66......
......6F6.......
.......6........
....0000000.....
....00.0.00.....
....0.0.0.0.....
....00.0.00.....
....0.0.0.0.....
....0000000.....
................
................
................
................`,
  ]
);

// Setting game background
setBackground(sky);

// Other sprites cannot go inside of these sprites
setSolids([player, box, wall, dirt, leaves]);

// Game Maps
const levels = [
  map`
aeaeaeaeaea
eeeeeeeeeee
.l.l.l.l.l.
pl.l.l.l.l.
.l.l.l.l.l.
.l.l.l.l.l.
.l.l.l.l.l.
ddddddddddd`,
];

// Set the map displayed to the current level
const currentLevel = levels[level];
setMap(currentLevel);

// Game Reset function
function reset() {
  setMap(currentLevel);
  score = 0;
  ninjaDied = false;
  clearText();
}

// Function that updates in game score
function updateScore() {
  clearText();
  addText(`Score:${score}`, {
    y: 14,
    color: color`2`,
  });
}

// inputs for player movement control
onInput("w", () => {
  if (!ninjaDied) {
    getFirst(player).y -= 1;
  }
});

onInput("a", () => {
  if (!ninjaDied) {
    getFirst(player).x -= 1;
  }
});

onInput("d", () => {
  if (!ninjaDied) {
    getFirst(player).x += 1;
  }
});

onInput("s", () => {
  if (!ninjaDied) {
    getFirst(player).y += 1;
  }
});

onInput("j", () => {
  reset();
});

function getRandomEvenNumberLessThan10() {
  // Generate a random number between 0 and 9
  const randomNumber = Math.floor(Math.random() * 10);

  // Check if the random number is even
  if (randomNumber % 2 === 0) {
    // Return the random number
    return randomNumber;
  } else {
    // Generate a new random number
    return getRandomEvenNumberLessThan10();
  }
}

// Input Logic
afterInput(() => {
  let ninja = getFirst(player);
  let apples = getAll(apple);
  let enemies = getAll(enemy);

  for (let i = 0; !ninjaDied && i < apples.length; i++) {
    if (ninja.x === apples[i].x && ninja.y === apples[i].y) {
      apples[i].remove();
      score = score + 1;
      updateScore();
      addSprite(getRandomEvenNumberLessThan10(), 0, apple);
    }
  }

  for (let i = 0; !ninjaDied && i < enemies.length; i++) {
    if (ninja.x === enemies[i].x && ninja.y === enemies[i].y) {
      clearText();
      ninjaDied = true;
      addText(
        "  Game Over!\n\nFinal Score:" +
          score +
          "\n\n  Press J to \n   restart",
        {
          x: 3,
          y: 5,
          color: color`2`,
        }
      );
    }
  }
});

// Core Game Logic.
setInterval(function () {
  let ninja = getFirst(player);
  let apples = getAll(apple);
  let enemies = getAll(enemy);

  for (var i = 0; !ninjaDied && i < apples.length; i++) {
    apples[i].y++;

    if (ninja.x === apples[i].x && ninja.y === apples[i].y) {
      apples[i].remove();
      score = score + 1;
      updateScore();
      addSprite(getRandomEvenNumberLessThan10(), 0, apple);
    }

    if (apples[i].y == 7) {
      apples[i].y = 0;
    }
  }
  for (var i = 0; !ninjaDied && i < enemies.length; i++) {
    enemies[i].y++;

    if (ninja.x === enemies[i].x && ninja.y === enemies[i].y) {
      enemies[i].remove();
      clearText();
      ninjaDied = true;
      addText(
        "  Game Over!\n\nFinal Score:" +
          score +
          "\n\n  Press J to \n   restart",
        {
          x: 3,
          y: 5,
          color: color`2`,
        }
      );
    }

    if (enemies[i].y == 7) {
      enemies[i].y = 0;
    }
  }
}, 1000);

setInterval(function () {
  let enemies = getAll(enemy);
  if (!ninjaDied && enemies.length < 12) {
    addSprite(getRandomEvenNumberLessThan10(), 0, enemy);
  }
  if (!ninjaDied) {
    addSprite(getRandomEvenNumberLessThan10(), 0, apple);
  }
}, 10000);
