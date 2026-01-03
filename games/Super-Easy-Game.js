/*
@title: The Maze Runner
@description: "The Maze Runner" is a grid-based maze adventure where players explore complex layouts, collect coins, and search for the exit while avoiding roaming enemies. Each level introduces tighter paths and smarter enemy placement, encouraging careful movement and planning.
@author: AymenD
@tags: ['maze', 'puzzle', 'strategy']
@addedOn: 2025-12-14
*/

const player = "s";
const wall = "w";
const coin = "c";
const enemy = "e";
const exit = "x";
const melody = tune`
500,
500: E4~500 + C5/500 + G4^500,
500: F4~500 + D5/500,
500: G4~500 + C5/500,
500: A4~500 + G4^500,
500: C5/500 + E4~500 + G4-500,
500: D5/500 + F4~500,
500: C5/500 + G4~500,
500: A4~500 + G4^500,
500: C5/500 + E4~500 + G4-500,
500: D5/500 + F4~500,
500: C5/500 + G4~500,
500: A4~500 + G4^500,
500: C5/500 + E4~500 + G4-500,
500: D5/500 + F4~500,
500: C5/500 + G4~500,
500: A4~500 + G4^500,
500: C5/500 + E4~500 + G4-500,
500: D5/500 + F4~500,
500: C5/500 + G4~500,
500: A4~500 + G4^500,
500: C5/500 + E4~500 + G4-500,
500: D5/500 + F4~500,
500: C5/500 + G4~500,
500: A4~500 + G4^500,
500: C5/500 + E4~500 + G4-500,
500: D5/500 + F4~500,
500: C5/500 + G4~500,
500: A4~500 + G4^500,
500: C5/500 + E4~500 + G4-500,
500: D5/500 + F4~500,
500: C5/500 + G4~500`;

// Current game state (used for future expansion)
let gameState = "playing"; 

setLegend(
  [ player, bitmap`
................
................
.....000000.....
....02222220....
...0......220...
...0...0..0.0...
...0...0..0.0...
...01......10...
....01111110....
.....000000.....
.....0....0.....
.....0....0.....
.....0....0.....
.....0..010.....
.....0..010.....
.....000000.....`],
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
................
.....00000......
....0660660.....
...066000660....
...066066660....
...066000660....
...066660660....
...066000660....
....0660660.....
.....00000......
................
................
................`],
  [ enemy, bitmap`
.......1........
.......L........
...1..LLL..1....
...1.LLLLL.1....
...LLL000LLL....
.....L303L...LL.
.....L000L..L.H.
.....LLLLL.L..H.
......L0L.....H.
......1L1LLLLLH.
......L0L.....H.
......1L1.....H.
......L0L.....H.
......L.L.....L.
................
................`],
  [ exit, bitmap`
................
.....444444.....
....47777774....
...477DDDD774...
...47D5555D74...
...47D5HH5D74...
...47D5HH5D74...
...47D5555D74...
...477DDDD774...
....47777774....
.....444444.....
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
ws....c........w
w.wwww.wwww.ww.w
w....w...cw....w
www.wwww.ww.ww.w
w....w....w....w
w.ww.w....wwww.w
wc.w...cc.w....w
wcwwwww.wwwww..w
w....w......e..w
ww.wwwwwwwwww.cw
w..cc........c.w
wewwwwww.wwwwwww
w.............xw
wwwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwww
ws..cw...ccwcwcw
wwww.....cc..w.w
w.w..w.wwwwwww.w
w.w..w.......w.w
w.w..wwwwwww.w.w
w.w...e..w...w.w
w.w...ww.w.....w
wcwww.ww.wwwweww
w........w.....w
w.wwewww...w...w
w....c.w...w...w
w...ww.www.wwwww
w..........c...w
wwwwwwwwwwwwww.x`,
  map`
wwwwwwwwwwwwwwww
w........w.....w
ws.......w.....w
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
ws.ww..w......xw
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
ws..........w.xw
w.wwwwwwwwwww..w
w...........e..w
w.wwwww..wwww..w
w.w...w..w..w.ww
w.w...w..wwcw..w
w.w...w...wcw..w
w.w...www.wcww.w
w.w.....w.w.w..w
w.w.....w...w..w
w.wwwww.w.....ww
w....w..wwww...w
w..............w
wwwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwww
ws..c.c.w.c.cwxw
wcwwwww.w....w.w
w.w.....w.ewww.w
w.wcwwwww.w....w
wcw.wc...ew.c..w
w.w.w...c.wwwe.w
w.w.wwwww.wc...w
wcwe....w.c.we.w
w.w.w.w.w...w..w
w.w.w.w.wwwww..w
w.wcwcwc.ccw..ew
w.www.wwww.e...w
w.c...c..w.....w
wwwwwwwwwwwwwwww`
];
// Tracks the current level index
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
..w...w.........
...w.w..........
....w..www.w.w..
....w..w.w.w.w..
....w..www.www..
................
........w.......
................
..w...w.w.w..w..
..w...w.w.ww.w..
..w.w.w.w.w.ww..
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
................
................
..w...www.w.....
..w...w.w.w.....
..w...w.w.w.....
..w...w.w.w.....
..w...w.w.w.....
..www.www.www...
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