/*
@title: Maze_escape
@author: NikosDev
@tags: [] 
@addedOn: 2024-08-15
*/

const player = "p";
const wall = "w";
const coin = "c";
const enemy = "e";
const exit = "x";
const melody = tune`
500: C4~500,
500: C4/500,
500: C4~500,
500: C4/500,
500: C4~500,
500: G5^500 + C4~500,
500: C4~500,
500: G5^500 + C4~500,
500: C4~500,
500: G5^500 + C4/500,
500: F5^500 + E5^500 + G4-500 + F4~500,
500: D5^500 + C5^500 + G4-500 + F4~500 + C4/500,
500: C5^500 + B4^500 + G4-500 + F4~500,
500: B4^500 + G4-500 + F4~500 + C4/500,
500: B4^500,
500: G4/500 + G5~500,
500: B4^500 + G4/500 + G5~500,
500: B4^500 + F4~500,
500: F4~500 + A4^500 + B4^500,
500: F4~500,
500: E5^500 + F4~500 + A4/500,
500: A4/500 + B4/500,
500: C5/500 + D5/500,
500: D5/500 + E5/500,
500: F5-500 + G5-500 + A4-500,
500: E5-500 + D5-500 + A4-500,
500: E5/500 + G4-500,
500: E5/500 + D5/500 + G4-500 + F4-500,
500: D5^500 + C5^500 + F4-500 + E4-500,
500: E5^500 + E4-500 + D4-500,
500: E5/500 + D5/500 + A4-500 + A5-500 + D4-500,
500: E5/500 + D5/500 + C4-500`;

let gameState = "playing";  // Ensure this is set correctly

setLegend(
  [ player, bitmap`
................
......4444......
.....FFFFFF.....
.....666666.....
.....00.000.....
....0.....00....
....0.0.0..0....
....0......0....
....0......0....
....00....0.....
......00000.....
......0...0.....
....000...000...
................
................
................`],
  [ wall, bitmap`
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
0000000000000000`],
  [ coin, bitmap`
................
................
................
......6666......
....66666666....
....66FFFF66....
....66FFFF66....
....66FFFF66....
....66666666....
......6666......
................
................
................
................
................
................`],
  [ enemy, bitmap`
................
.............0..
..0.33333333000.
.00033333333000.
.00033033303000.
.00033333333.0..
.0003333333330..
.00033300033.0..
....33033303.0..
....33333333....
....33333333....
.....3....3.....
....3......3....
....3......3....
................
................`],
  [ exit, bitmap`
................
................
.....444444.....
....44....44....
....4.DDDD.4....
....4.D..D.4....
....4.D..D.4....
....4.DDDD.4....
....44....44....
.....444444.....
................
................
................
................
................
................`]
);

// Play melody
playTune(melody, 3);

const levels = [
  map`
wwwwwwwwwwwwwwww
wp....c........w
w.wwww.wwww.ww.w
w....w...cw....w
wwwwwwwwwww.ww.w
w....wwww.w....w
w.ww.wwww.wwww.c
wc.w...cc.w....w
wcwwwww.wwwww..w
w....w.........w
ww.wwwww.wwww.cw
w..cc..w.w...c.w
w.wwwwww.wwwwwww
w.....w........w
wwwwwwwwwwwwww.x`,
  map`
wwwwwwwwwwwwwwww
wp..cw...ccwcwcw
w..w.w...ccw.w.w
wwww.w.wwwww.w.w
w.w..w.....w.w.w
w.w..wwww......w
w.w........w...w
w.w...ww.w.w...w
wcwww.ww.wwwwwww
w...w....w.....w
w.wwwwww.......w
w...wc.w...w...w
w...ww..ww.wwwww
w..........c...w
wwwwwwwwwwwwww.x`,
  map`
wwwwwwwwwwwwwwww
w........w.....w
wp.......w.....w
wwwwww...w.....w
w..eww.wwwwwww.w
wcc....ww.cccw.w
w...w......www.w
w.wwwww...w....w
w.w.......w...xw
w.w....w..w....w
w.w....w..wwww.w
w.wwwwwwwww..w.w
w.........wwww.w
w..............w
wwwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwww
wp.ww..w......xw
w...w..w...w...w
w..ww.cwww.wwwww
w...w.cw..c....w
w.w.wccw..cww..w
www.w..ww..wwwww
w...w..www.w...w
w..ww..w...w...w
w......w..www.ew
w..e.......w...w
wwwww.cc.c.....w
w...w...cc.....w
w.wwwwww.......w
wwwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwww
wp.w.......w..xw
w..w..w....w...w
w.....www..we..w
w.....www..ww..w
w..w..wwww..ww.w
w..w..wwwwwcw..w
w...w.wwwwwcw.ww
w...w.w...wcw..w
w...w.w...w.w..w
w.www.w...www..w
w.wwwww........w
w.......wwww...w
w..............w
wwwwwwwwwwwwwwww`
];

let currentLevel = 0;
setMap(levels[currentLevel]);

setSolids([player, wall, enemy]);

let score = 0;
let isMoving = false;
let moveDirection = {x: 0, y: 0};

onInput("w", () => {
  moveDirection = {x: 0, y: -1};
  isMoving = true;
});

onInput("a", () => {
  moveDirection = {x: -1, y: 0};
  isMoving = true;
});

onInput("s", () => {
  moveDirection = {x: 0, y: 1};
  isMoving = true;
});

onInput("d", () => {
  moveDirection = {x: 1, y: 0};
  isMoving = true;
});

function restartGame() {
  currentLevel = 0;
  score = 0;
  setMap(levels[currentLevel]);
}

onInput("j", () => {
  restartGame();
});

function movePlayer() {
  if (isMoving) {
    const playerSprite = getFirst(player);
    if (playerSprite) {
      const newX = playerSprite.x + moveDirection.x;
      const newY = playerSprite.y + moveDirection.y;

      // Ensure the new position is not a wall
      if (!getTile(newX, newY).some(t => t.type === wall)) {
        playerSprite.x = newX;
        playerSprite.y = newY;

        // Check if player collects a coin
        const coins = getTile(newX, newY).filter(t => t.type === coin);
        if (coins.length > 0) {
          coins.forEach(coinSprite => {
            coinSprite.remove();  // Remove the coin
          });
          score += 1;
        }

        // Check if player reaches the exit
        if (tilesWith(player, exit).length > 0) {
          currentLevel++;
          if (currentLevel < levels.length) {
            setMap(levels[currentLevel]);
          } else {
            // Display final message on a clean map
            setMap(map`
            ................
            ................
            ..w.w.www.w.w...
            ...w..w.w.w.w...
            ...w..www.www...
            ................
            ................
            ........w.......
            ................
            ..w...w.w.www...
            ..w.w.w.w.w..w..
            ..ww.ww.w.w..w..
            ................
            ................
            ................`);

            isMoving = false;

            // Listen for the "j" key press to restart the game
            onInput("j", restartGame);
          }
        }

        // Check if player is caught by an enemy
        if (tilesWith(player, enemy).length > 0) {
          console.log("Game Over. Score: " + score);
          isMoving = false;
          setMap(map`
................
................
................
.w..............
.w..............
.w..............
.w.www..ww..www.
.w.w.w..w...w...
.w.w.w..w...www.
.w.w.w..w...w...
.w.www.ww...www.
................
................
................
................`);
        }
      }

      isMoving = false; // Stop movement after reaching the next tile
    }
  }
}

// Call movePlayer function at regular intervals
setInterval(movePlayer, 100);

// Enemy movement (random)
setInterval(() => {
  const allEnemies = getAll(enemy);
  allEnemies.forEach((e) => {
    const direction = Math.floor(Math.random() * 4);
    if (direction === 0 && e.y > 0) e.y -= 1;
    else if (direction === 1 && e.y < height() - 1) e.y += 1;
    else if (direction === 2 && e.x > 0) e.x -= 1;
    else if (direction === 3 && e.x < width() - 1) e.x += 1;
  });
}, 1000);

