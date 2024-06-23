/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started
@title: Tech Catchers
@author: Jack
@tags: ['endless', 'tech','SSD']
@addedOn: 2024-06-23

Instructions:
What a lovely day, rain then sun and now SSD's. Catch the raining tech! Each piece of tech gives 1 point
But each Robot takes 5 points away.
(Their is a mechanism which groups them after time and the points values change)

The Controls are:

A: Left
D: Right

*/

const player = "p"; // Player character
const techItem = "t"; // Tech item to collect
const ground = "g"; // Ground tiles
const basket = "b"; // Basket for collecting tech items
const robot = "r"; // Robot character

// Corrected sprite definitions with consistent sizes
setLegend(
  [basket, bitmap`
................
................
...0000000000...
.00L11111111100.
0LLLLLL111111110
00LLLLLL11111100
0100LLLLL11100L0
0111000000009LL0
0111111111139LL0
0111111111193LL0
.01111111113LL0.
.0111111119LLL0.
.01111111LLLLL0.
..011111LLLLL0..
..011111LLLLL0..
...0000000000...`],
  [player, bitmap`
................
................
................
.......1........
.......1........
.......1........
.......1........
.......1........
.......1........
....0001000.....
....0111110.....
.....0CCC0......
......0C0.......
......0C0.......
......0C0.......
.......0........`], // Player character
  [techItem, bitmap`
................
................
....6.F6F.6.....
....D.DDD.D.....
....DDDDDDD.....
....DL2220D.....
....D221204.....
....DL2220D.....
....D221204.....
....D00000D.....
....DDDDDD4.....
....400000D.....
....D00000D.....
....4DD6DDD.....
....DD6.6DD.....
................`], // Tech item
  [ground, bitmap`
4444444444444444
4444444444444444
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
................`],
  [robot, bitmap`
.....LL.........
.......L........
...0000000000...
..0LL111111110..
..0LL170770710..
..0LL177007710..
..0LL177777710..
..0LL111111110..
...0CCCCCCCC0...
...0C1L1L1L10...
...0C11L1L1L0...
...0C1L1L1L10...
...0C11111110...
...0C00000010...
....0......0....
................`] // Robot character
);

setSolids([]);
let score = 0;

let level = 0;
const levels = [
  map`
........
........
........
........
........
........
b.......
gggggggg`
];

setMap(levels[level]);
setPushables({
  [player]: []
});
var gameRunning = true;

function stopGame() {
  gameRunning = false;
  clearInterval(gameLoop);
}

// Stop the game after 180 seconds or 3 minutes
setTimeout(stopGame, 180000);

onInput("a", () => {
  if (gameRunning) {
    getFirst(basket).x -= 1;
  }
});

onInput("d", () => {
  if (gameRunning) {
    getFirst(basket).x += 1;
  }
});

function spawnTechItem() {
  let x = Math.floor(Math.random() * 8);
  let y = 0;
  addSprite(x, y, techItem);
}

function moveTechItems() {
  let techItems = getAll(techItem);

  for (let i = 0; i < techItems.length; i++) {
    techItems[i].y += 1;
  }
}

function despawnTechItems() {
  let techItems = getAll(techItem);

  for (let i = 0; i < techItems.length; i++) {
    if (techItems[i].y === 7) {
      techItems[i].remove();
    }
  }
}

function spawnRobot() {
  let x = Math.floor(Math.random() * 8);
  let y = 0;
  addSprite(x, y, robot);
}

function moveRobots() {
  let robots = getAll(robot);

  for (let j = 0; j < robots.length; j++) {
    robots[j].y += 1;
  }
}

function despawnRobots() {
  const basketX = getFirst(basket).x;
  const basketY = getFirst(basket).y;
  let robots = getAll(robot);

  for (let j = 0; j < robots.length; j++) {
    if (robots[j].y === 7) {
      robots[j].remove();
    }
  }
}

function checkHit() {
  let robots = getAll(robot);
  let b = getFirst(basket);

  for (let i = 0; i < robots.length; i++) {
    if (robots[i].x === b.x && robots[i].y === b.y) {
      score -= 5;
      return true;
    }
  }

  let techItems = getAll(techItem);
  for (let i = 0; i < techItems.length; i++) {
    if (techItems[i].x === b.x && techItems[i].y === b.y) {
      score += 1;
      techItems[i].remove();
      break;
    }
  }

  return false;
}

var gameLoop = setInterval(() => {
  if (!gameRunning) return;

  moveTechItems();
  spawnTechItem();
  despawnTechItems();

  moveRobots();
  spawnRobot();
  despawnRobots();
  if (checkHit()) {
    // No need to manually increment score here since checkHit does it
  }

  addText(`Score:${score}`, { x: 2, y: 1, color: "blue" });
}, 250);