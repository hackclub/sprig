/*
@title: Magnetic Maze
@author: Sarvesh V
@description: A grid-based puzzle game where you use a magnet to push/pull metal boxes onto switches.
@tags: ['puzzle', 'magnet', 'logic']
@addedOn: 2026-05-20
*/

const player = "p";
const box = "m";
const wall = "w";
const switchTarget = "s";

// 1. SET UP THE ART (LEGEND)
setLegend(
  [player, bitmap`
................
......444.......
.....44444......
.....44.44......
.....44.44......
.....44.44......
......4.4.......
......4.4.......
......4.4.......
......4.4.......
......4.4.......
......4.4.......
......4.4.......
.......4........
.......4........
................`],
  [box, bitmap`
................
..000000000000..
..055555555550..
..055555555550..
..055555555550..
..055555555550..
..055555555550..
..055555555550..
..055555555550..
..055555555550..
..055555555550..
..055555555550..
..055555555550..
..000000000000..
................
................`],
  [wall, bitmap`
0000000000000000
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0000000000000000`],
  [switchTarget, bitmap`
................
................
................
................
.......33.......
......3333......
.....333333.....
....33333333....
.....333333.....
......3333......
.......33.......
................
................
................
................
................`]
);

// 2. CONFIGURE GAME RULES
setSolids([player, box, wall]);

// Level 0: The Tutorial
const level0 = map`
wwwwwwwwwwwwwww
w.............w
w.............w
w...s...m...p.w
w.............w
w.............w
wwwwwwwwwwwwwww`;

// Level 1: The Basics
const level1 = map`
wwwwwwwwwwwwwww
w.............w
w...s.....m..pw
w.............w
wwwwwwwwwwwwwww`;

// Level 2: The Bounce
const level2 = map`
wwwwwwwwwwwwwww
w......w......w
w..s.......m..w
w......w......w
w.............w
w....p........w
wwwwwwwwwwwwwww`;

// Level 3: Double Trouble
const level3 = map`
wwwwwwwwwwwwwww
w..s.......m..w
w.............w
w......p......w
w.............w
w..s.......m..w
wwwwwwwwwwwwwww`;

// Level 4: The Corridor
const level4 = map`
wwwwwwwwwwwwwww
w......w......w
w..s...w..m...w
w..wwwww......w
w........p....w
w.............w
wwwwwwwwwwwwwww`;

// Level 5: The Final Test
const level5 = map`
wwwwwwwwwwwwwww
w.s.........s.w
w...wwwwwww...w
w.m.w..p..w.m.w
w...w.....w...w
w.............w
wwwwwwwwwwwwwww`;

// Level 6: Tight Quarters
const level6 = map`
wwwwwwwwwwwwwww
w.s.........s.w
w.m.........m.w
w......p......w
w.............w
wwwwwwwwwwwwwww`;

// Level 7: The Blockade
const level7 = map`
wwwwwwwwwwwwwww
w...w.....w...w
w.s.w..m..w.s.w
w...w..p..w...w
w......m......w
wwwwwwwwwwwwwww`;

// Level 8: The Vault
const level8 = map`
wwwwwwwwwwwwwww
w..ww.s.s.ww..w
w..w...p...w..w
w..w..m.m..w..w
w.............w
wwwwwwwwwwwwwww`;

// Level 9: Crossfire
const level9 = map`
wwwwwwwwwwwwwww
w.s.........s.w
w..w...p...w..w
w..w.m...m.w..w
w.............w
wwwwwwwwwwwwwww`;

// Level 10: Twin Peaks
const level10 = map`
wwwwwwwwwwwwwww
w...s.....s...w
w..www...www..w
w.............w
w..m...p...m..w
wwwwwwwwwwwwwww`;

// Level 11: Three's a Crowd
const level11 = map`
wwwwwwwwwwwwwww
w..s...s...s..w
w.............w
w..m...m...m..w
w......p......w
wwwwwwwwwwwwwww`;

// Level 12: The Pit
const level12 = map`
wwwwwwwwwwwwwww
w..w.s...s.w..w
w..w.m.p.m.w..w
w..w.......w..w
w.............w
wwwwwwwwwwwwwww`;

// Level 13: Pillars
const level13 = map`
wwwwwwwwwwwwwww
w.s...w.w...s.w
w.m...w.w...m.w
w.......p.....w
w.............w
wwwwwwwwwwwwwww`;

// Level 14: The Triangle
const level14 = map`
wwwwwwwwwwwwwww
w......w......w
w..s...m...s..w
w......p......w
w..m.......m..w
w......s......w
wwwwwwwwwwwwwww`;

// Level 15: The Grand Finale
const level15 = map`
wwwwwwwwwwwwwww
w.s....s....s.w
w.w....w....w.w
w.m....m....m.w
w.............w
w......p......w
wwwwwwwwwwwwwww`;

// Put them all in a list
const levels = [
  level0, level1, level2, level3, level4, level5,
  level6, level7, level8, level9, level10,
  level11, level12, level13, level14, level15
];
let currentLevel = 0;
let gameWon = false;

// Custom function to load levels and text
function loadLevel(index) {
  clearText(); // Clear any old text off the screen
  setMap(levels[index]);

  // Tutorial text adjusted to fit within Sprig screen limits
  if (index === 0) {
    addText("WASD to Move", { y: 0 });
    addText("J:Pull  K:Push", { y: 1 });
    addText("L to Restart", { y: 2 });
    addText("Box on switch!", { y: 9 });
  }
}

// Start the game by loading Level 0
loadLevel(currentLevel);

// Track the direction the player is facing (defaults to left)
let dx = -1;
let dy = 0;

// 3. MOVEMENT LOGIC
function tryMove(newDx, newDy) {
  let p = getFirst(player);
  // Always update the facing direction first
  dx = newDx;
  dy = newDy;

  // Check what is in the next tile
  let nextTile = getTile(p.x + dx, p.y + dy);

  // Only move the character if the next tile is NOT a wall or a box
  if (!nextTile.some(t => t.type === wall || t.type === box)) {
    p.x += dx;
    p.y += dy;
  }
}

onInput("w", () => tryMove(0, -1));
onInput("s", () => tryMove(0, 1));
onInput("a", () => tryMove(-1, 0));
onInput("d", () => tryMove(1, 0));

// Restart Level (Press L)
onInput("l", () => {
  if (!gameWon) {
    loadLevel(currentLevel);
  }
});

// 4. ATTRACT ABILITY (Press J)
onInput("j", () => {
  let p = getFirst(player);
  let scanX = p.x + dx;
  let scanY = p.y + dy;
  let targetBox = null;

  // Scan up to 20 tiles ahead
  for (let i = 0; i < 20; i++) {
    let tiles = getTile(scanX, scanY);
    if (tiles.some(t => t.type === wall)) break; // Wall blocks beam

    let hitBox = tiles.find(t => t.type === box);
    if (hitBox) {
      targetBox = hitBox; // Found our box!
      break;
    }
    scanX += dx;
    scanY += dy;
  }

  // Pull the box toward the player
  if (targetBox) {
    for (let i = 0; i < 20; i++) {
      let nextX = targetBox.x - dx;
      let nextY = targetBox.y - dy;

      if (nextX === p.x && nextY === p.y) break; // Hit player

      let nextTile = getTile(nextX, nextY);
      if (nextTile.some(t => t.type === wall || t.type === box)) break; // Hit solid

      targetBox.x = nextX;
      targetBox.y = nextY;
    }
  }
});

// 5. REPEL ABILITY (Press K)
onInput("k", () => {
  let p = getFirst(player);
  let scanX = p.x + dx;
  let scanY = p.y + dy;
  let targetBox = null;

  for (let i = 0; i < 20; i++) {
    let tiles = getTile(scanX, scanY);
    if (tiles.some(t => t.type === wall)) break;

    let hitBox = tiles.find(t => t.type === box);
    if (hitBox) {
      targetBox = hitBox;
      break;
    }
    scanX += dx;
    scanY += dy;
  }

  // Push the box away from the player
  if (targetBox) {
    for (let i = 0; i < 20; i++) {
      let nextX = targetBox.x + dx;
      let nextY = targetBox.y + dy;

      let nextTile = getTile(nextX, nextY);
      if (nextTile.some(t => t.type === wall || t.type === box)) break;

      targetBox.x = nextX;
      targetBox.y = nextY;
    }
  }
});

// 6. WIN CONDITION
afterInput(() => {
  if (gameWon) return;

  let switches = getAll(switchTarget);
  let allCovered = true;

  for (let s of switches) {
    let tile = getTile(s.x, s.y);
    if (!tile.some(t => t.type === box)) {
      allCovered = false;
    }
  }

  // If all switches are covered by a box
  if (allCovered && switches.length > 0) {
    currentLevel++; // Increment the level tracker

    // Check if there are more levels to play
    if (currentLevel < levels.length) {
      loadLevel(currentLevel); // Load the next map
    } else {
      gameWon = true;
      clearText();
      addText("YOU BEAT THE GAME!", { y: 2 });
    }
  }
});
