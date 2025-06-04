// Define the sprites
setLegend(
  [ 'p', bitmap`
................
....66666.......
...6666666......
...6666666......
...6666666......
...6666666......
....66666.......
.....666........
.....666........
.....666........
.....666........
................
................
................
................
................` ], // Player (green figure)
  [ 'w', bitmap`
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222` ], // Wall (gray block)
  [ 'g', bitmap`
................
....44444.......
...4444444......
...4444444......
...4444444......
...4444444......
....44444.......
................
................
................
................
................
................
................
................
................` ]  // Goal (yellow star)
);

// Define multiple levels
const levels = [
  map`
p.........
..........
..........
..........
..........
..........
..........
.........g`,
  map`
pw...w....
.w.w.w.ww.
.w.w.w.w..
.w.w.w.w.w
.w.w.w.w..
.w.w.w.ww.
.w.w.w.w..
...w...wg.`,
  map`
p.........
.wwwwwwwww
........w.
.www.wwww.
.wgw......
.w.wwwwww.
.w........
wwwwwwwww.`,
  map`
p..w.....w
ww.w.w.w.w
...w.w.w.w
.www.w.w.w
.....w.w.w
wwwwwwww.w
g........w
wwwwwwwwww`,
  map`
p.........
wwwww.www.
..........
w.wwwwwwww
..........
www.www.w.
......w.w.
wwwww...wg`,
  map`
p.........
www.wwwww.
....w.....
.wwww.wwww
.w....w...
.wwww.w.w.
.wwww.w.w.
....w...wg`,
  map`wwwwwwwwww
wp.w.....w
w..w..w..w
w..w..w..w
w..w.....w
w..w..w..w
w.....w.gw
wwwwwwwwww`,
  map`
p.w.......
w..w..w.w.
ww..w..wg.
w.w..w..w.
...w..w..w
.w..w..w..
..ww.w..w.
w.........`,
  map`
pw.w.....w
...w.w.w.w
ww.w.w.w.w
...w.w.w.w
.www.www.w
..w..wg..w
w.ww.wwwww
.........w`,
  map`
p.........
.www..www.
.w....w.w.
.w.w..w.w.
.wgw..w.w.
.www..www.
..........
wwwwwwwwww`,
];

let currentLevel = 0;

// Function to load a specific level
function loadLevel(level) {
  setMap(levels[level]);
}

// Set the initial map (Level 1)
loadLevel(currentLevel);

// Set solid objects (player can't pass through these)
setSolids([ 'p', 'w' ]);

// Handle player movement
onInput("w", () => {
  getFirst('p').y -= 1; // Move up
});

onInput("s", () => {
  getFirst('p').y += 1; // Move down
});

onInput("a", () => {
  getFirst('p').x -= 1; // Move left
});

onInput("d", () => {
  getFirst('p').x += 1; // Move right
});

// Check for goal and handle level progression
afterInput(() => {
  const player = getFirst('p');
  const goal = getFirst('g');
  if (player.x === goal.x && player.y === goal.y) {
    currentLevel++;
    if (currentLevel < levels.length) {
      loadLevel(currentLevel); // Load next level
    } else {
      addText("You Win!", { y: 4, color: color`3` }); // Show win message
    }
  }
});