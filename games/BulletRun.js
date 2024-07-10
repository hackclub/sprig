/*
@title: AvoidTheBullets
@tags: N/A
@addedOn: Not Decided yet
@author: Vivaan Shahani
*/

// define the sprites in our game
const player = "p";
const bullet = "b";
const goal = "g";
const wall = "w";
let bulletSpeed = 250;
let bulletInterval;

// assign bitmap art to each sprite
setLegend(
  [ player, bitmap`
................
................
....333333......
...33.3..33.....
..33......3.....
.3....3.3.3.....
.33.......3.....
..333333333.....
....3.3333......
....3...3.......
....3...3.......
....3...3.......
....3...3.......
....3...3.......
....3...3.......
....3...3.......`],
  [ bullet, bitmap`
................
................
................
................
................
..00000.........
..00000000......
..000000000000..
..00000000000...
..00000000000...
..000000000.....
..00000.........
..00............
................
................
................`],
  [ goal, bitmap`
................
................
................
....444444......
...44....44.....
...4......4.....
...4.......4....
...4.......4....
...4.......4....
...44......4....
....4......4....
....44....44....
.....444444.....
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
0000000000000000`]
);

// create game levels
let level = 0; // this tracks the level we are on
const levels = [
  map`
pb..
..g.
....`,
  map`
p..
.b.
..g`,
  map`
p.wg
.b..
..w.
..w.`,
  map`
pb.w
...w
...w
..bg`,
  map`
pb.b.b
......
.w.w.w
.b.b..
....bg`,
  map`
b.b.b.b.b.b.b.
..............
..............
..............
..............
w.............
p............g
w.............
..............
..............
..............
..............
bb.b.b.b.b.b..`,
  map`
.w.b.w.
.b...bb
w..w..w
.......
pw...wg
...b...
w..w..w
.b...b.
.w.b.wb`,
  map`
pb
w.
w.
w.
w.
..
w.
w.
w.
w.
g.`,
  map`
..gbbw.b................
..bbbwgw.........wwwwww.
.....w.w...wwwwww....b..
..bbbwwwwww...b.....b...
wwwwwww..bw..b.....b....
w.w.bw..b...b.....b.....
pb.b...b...b..w..b..w..g`,
  // last challenge level
  map`
p..w...........................
.www...b........b.w..b.b.......
..ww...b..bb...b.....w..w.bb...
..w.....w...w.......b.bb.......
..www.wwwww...ww.w.....b.......
..w.b.bw.....ww.w..wb........w.
...wbb.ww....w...w...w.........
...w...w......w......w.ww...bb.
........w........w.....w....w..
....b..ww......ww.w..........b.
.............b.w..www.ww.......
.........w.....bw....w....b....
...b............b..............
ww.wb.w.w.ww.......w.w.....b.w.
...b..w......b......w........b.
......w.ww.....w.w..........w..
..b....w.w.....................
..........w..b...w.............
ww....................w...w..b.
..w..............wwww.ww.......
w.b....b...bbwb........w...b...
......ww.........b.............
....w....w.wb......w...........
...b..........ww..w...b......b.
.w........w.............w.w..b.
....w.b..b.ww....w....wwwwb....
........w..bb.....w.w......w...
..w........w.b.....w....w....w.
........w...b.......w....w...ww
.......w.....b...w.............
...w...b........w..w...ww......
.w.......ww...wbw...bb..ww..wwg`,
];

// set the map displayed to the current level
setMap(levels[level]);

setSolids([ player, wall ]); // other sprites cannot go inside of these sprites

// allow certain sprites to push certain other sprites
setPushables({
  [player]: []
});

// inputs for player movement control
onInput("s", () => {
  getFirst(player).y += 1; // positive y is downwards
});

onInput("d", () => {
  getFirst(player).x += 1;
});
onInput("w", () => {
  getFirst(player).y -= 1;
});
onInput("a", () => {
  getFirst(player).x -= 1;
});

// Bullet movement logic
let bulletDirections = {};

function initializeBulletDirections() {
  const bullets = getAll(bullet);
  bulletDirections = {}; // Reset directions
  for (let b of bullets) {
    bulletDirections[`${b.x},${b.y}`] = 1; // 1 for down, -1 for up
  }
}

function moveBullets() {
  const bullets = getAll(bullet);
  for (let b of bullets) {
    const key = `${b.x},${b.y}`;
    const direction = bulletDirections[key];
    const newY = b.y + direction;

    if (newY < 0 || newY >= height() || getTile(b.x, newY).some(t => t.type === wall)) {
      bulletDirections[key] = -direction; // Switch direction
    } else {
      b.y = newY;
      bulletDirections[`${b.x},${b.y}`] = direction; // Update the new key with direction
    }
  }
}

function updateLevelCounter() {
  clearText();
  addText(`Level ${level + 1} / ${levels.length}`, { y: 1, color: color`3` });
  if (level === 7) {
      bulletSpeed = 75;
      startBulletInterval(); // Update the bullet interval speed for level 7
    } else if (level === 8) {
      bulletSpeed = 250;
      startBulletInterval();
  }
}

function checkForDeath() {
  const playerBullets = tilesWith(player, bullet).length;
  if (playerBullets > 0) {
    addText("Game Over!", { y: 4, color: color`3` });
    setMap(levels[level]);
    initializeBulletDirections();
    updateLevelCounter();
  }
}

function startBulletInterval() {
  clearInterval(bulletInterval);
  bulletInterval = setInterval(() => {
    moveBullets();
    checkForDeath();
  }, bulletSpeed);
}

// input to reset level
onInput("j", () => {
  setMap(levels[level]);
  initializeBulletDirections();
  updateLevelCounter();
  clearText();
  startBulletInterval();
});

// these get run after every input
afterInput(() => {
  const numberCovered = tilesWith(goal, player).length;

  if (numberCovered === 1) {
    level += 1; // Increment the level after changing the speed

    if (level < levels.length) {
      setMap(levels[level]);
      initializeBulletDirections();
      updateLevelCounter();
    } else {
      addText("You win!", { y: 4, color: color`3` });
    }
  }

  checkForDeath();
});

// Initialize bullet directions on game start
initializeBulletDirections();
updateLevelCounter();
startBulletInterval(); // Start the initial bullet interval
