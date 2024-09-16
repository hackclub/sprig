/*
@title: jeffrey's house escape
@author: bingleypro
@tags: []
@addedOn: 2024-06-19
(the date above refers to the 19th of june)
*/

/* Define scene objects (these can be referenced in maps) */
const player = "p"
const wall = "w"
const door = "d"
const key = "k"

/* Setup sprites */
setLegend(
  [player, bitmap`
................
......0000000...
.....00.....00..
....00.......0..
....0..0..0..00.
...0.......0..0.
...0..00..00.00.
...00..000...0..
....000.....00..
......0000000...
........0.......
........0.......
........0.......
.......00.......
.......0........
...00000000000..`],
  [wall, bitmap`
LLLLLLLLLLLLLLLL
LL000L00L00L00LL
L0L0L00L00L00L0L
L00L00L00L00L00L
L0L0LL00L00L00LL
LL00LL0L00L00L0L
L00L00L00L00L00L
L0L00L0LL00L00LL
LL00L00LL0L00LLL
L00L00L00L00L00L
L0L00L00L0LL00LL
LL00L00L00LL0L0L
L00L00L00L00L00L
L0L00L00L00L0L0L
LL00L00L00L000LL
LLLLLLLLLLLLLLLL`],
  [door, bitmap`
................
................
....CCCCCCCC....
....CCCCCCCC....
...CCCCCCCCCC...
...CCCCCCCCCC...
..CCCCCCCCCCCC..
..CCCCCCCCCCCC..
..CCCCCCCCCCCC..
..CCCCCCCCC6CC..
..CCCCCCCC6C6C..
..CCCCCCCCC6CC..
..CCCCCCCCCCCC..
..CCCCCCCCCCCC..
..CCCCCCCCCCCC..
..CCCCCCCCCCCC..`],
  [key, bitmap`
................
.......66666....
.......66666....
.......66.......
.......66.......
.......6666.....
.......66.......
.......66.......
.......66.......
.....66666......
....6666666.....
....66...66.....
....66...66.....
....66...66.....
....6666666.....
.....66666......`],
)

setSolids([player, wall])

/* Setup levels - only 1 is visible, rest are generated */
let level = 0
const levels = [
  map`
...ww
.w.ww
....k
wwdwp`,
/*  map`
d...w.
www...
w....w
wk....
wpw...`,
  map`
..w...
w.....
..dwww
..k...
..p...
..w.w.`,
  map`
.......w.
pw..w...k
....d...w
.........
..w..w...
w..w.....`,
  map`
..........kw..
.......w....w.
.w............
...w..........
......p..w....
..............
w.............
..w...w.......
.w...........w
....dw.....w..
w........w....
.w............`,
  map`
..w....
.....w.
ww.k...
p..d...
...w...`,
  map`
p.kdw`,*/
]

let hasKey = false;

const currentLevel = levels[level];
setMap(levels[level]);

/* Function to move the player in one direction as far as possible */
function movePlayer(direction) {
  let player = getFirst("p");
  let moved = true;

  while (moved) {
    let newX = player.x;
    let newY = player.y;

    if (direction === "up") {
      newY -= 1;
    } else if (direction === "left") {
      newX -= 1;
    } else if (direction === "down") {
      newY += 1;
    } else if (direction === "right") {
      newX += 1;
    }

    if (newX < 0 || newY < 0 || newX >= width() || newY >= height() || getTile(newX, newY).some(sprite => sprite.type === "w")) {
      moved = false;
    } else {
      player.x = newX;
      player.y = newY;

      /* Collect keys */
      if (getTile(newX, newY).some(sprite => sprite.type === "k")) {
        hasKey = true;
        getTile(newX, newY).forEach(sprite => {
          if (sprite.type === "k") sprite.remove();
        });
      }
    }
  }
}

/* Check for inputs - this should work on Sprig consoles as well */
onInput("w", () => movePlayer("up"));
onInput("a", () => movePlayer("left"));
onInput("s", () => movePlayer("down"));
onInput("d", () => movePlayer("right"));

/* After completion, generate a new level */
afterInput(() => {
  if (tilesWith(door, player).length > 0 && hasKey) {
    level += 1;

    // Generate a level!
    let newLevel;
    do {
      newLevel = generateLevel(10, 10);  // change this to any size you like!
    } while (!isLevelSolvable(newLevel.split("\n").map(row => row.split(''))));
    
    levels.push(map`${newLevel}`);
    setMap(levels[level]);
    
    const currentLevel = levels[level];
    hasKey = false;

    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("you win!", { y: 4, color: color`3` });
    }
  }
});

/* This is the path finding function used */
function bfs(start, end, grid) {
  let queue = [start];
  let visited = new Set();
  visited.add(`${start.x},${start.y}`);

  const directions = [
    { x: 0, y: -1 }, // up
    { x: 0, y: 1 },  // down
    { x: -1, y: 0 }, // left
    { x: 1, y: 0 }   // right
  ];

  while (queue.length > 0) {
    let { x, y } = queue.shift();

    if (x === end.x && y === end.y) {
      return true;
    }

    // Continue in the current direction until hitting a wall
    for (let dir of directions) {
      let newX = x;
      let newY = y;
      
      while (
        newX + dir.x >= 0 && newX + dir.x < grid[0].length &&
        newY + dir.y >= 0 && newY + dir.y < grid.length &&
        grid[newY + dir.y][newX + dir.x] !== 'w'
      ) {
        newX += dir.x;
        newY += dir.y;
      }
      
      // Check if the new position is visited
      if (!visited.has(`${newX},${newY}`)) {
        queue.push({ x: newX, y: newY });
        visited.add(`${newX},${newY}`);
      }
    }
  }

  return false;
}

function isLevelSolvable(grid) {
  let player, key, door;

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] === 'p') player = { x, y };
      if (grid[y][x] === 'k') key = { x, y };
      if (grid[y][x] === 'd') door = { x, y };
    }
  }

  if (!player || !key || !door) return false;

  // Check if there's a path from player to key
  if (!bfs(player, key, grid)) return false;

  // Check if there's a path from key to door
  return bfs(key, door, grid);
}

function generateLevel(width, height) {
  let newLevel = [];
  for (let y = 0; y < height; y++) {
    newLevel.push(new Array(width).fill("."));
  }

  function randomPosition() {
    return {
      x: Math.floor(Math.random() * width),
      y: Math.floor(Math.random() * height),
    };
  }

  let playerPos = randomPosition();
  let doorPos = randomPosition();
  let keyPos = randomPosition();

  while (
    (playerPos.x === doorPos.x && playerPos.y === doorPos.y) ||
    (playerPos.x === keyPos.x && playerPos.y === keyPos.y) ||
    (doorPos.x === keyPos.x && doorPos.y === keyPos.y)
  ) {
    doorPos = randomPosition();
    keyPos = randomPosition();
  }

  newLevel[playerPos.y][playerPos.x] = "p";
  newLevel[doorPos.y][doorPos.x] = "d";
  newLevel[keyPos.y][keyPos.x] = "k";

  let wallCount = Math.floor(width * height * 0.2);

  for (let i = 0; i < wallCount; i++) {
    let wallPos = randomPosition();
    while (newLevel[wallPos.y][wallPos.x] !== ".") {
      wallPos = randomPosition();
    }
    newLevel[wallPos.y][wallPos.x] = "w";
  }

  return newLevel.map(row => row.join("")).join("\n");
}

// Generate a level!
let newLevel;
do {
  newLevel = generateLevel(10, 10);  // or any other size
} while (!isLevelSolvable(newLevel.split("\n").map(row => row.split(''))));

levels.push(map`${newLevel}`);
setMap(levels[level]);
