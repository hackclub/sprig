/*
@title: Gravity Flipper
@author: Claude
@tags: ['platformer', 'gravity', 'puzzle']
@addedOn: 2024-03-18

Controls:
- A/D: Move left/right
- W: Flip gravity
- J: Reset level
*/

const player = "p";
const wall = "w";
const normalPlatform = "n"; // Blue - exists in normal gravity
const invertPlatform = "i"; // Red - exists in inverted gravity
const goal = "g";
const spike = "s";
const background = "b";

let gravityFlipped = false;
let currentLevel = 0;
let gameStarted = false;

setLegend(
  [player, bitmap`
................
................
.....000000.....
....00222200....
....02222220....
....02222220....
....00222200....
.....000000.....
......0000......
.....022220.....
....02222220....
....02222220....
.....00..00.....
.....00..00.....
....000..000....
....00....00....`],
  [wall, bitmap`
0000000000000000
0LLLLLLLLLLLLLL0
0L000000000000L0
0L0LLLLLLLLLL0L0
0L0L00000000L0L0
0L0L0LLLLLL0L0L0
0L0L0L0000L0L0L0
0L0L0L0LL0L0L0L0
0L0L0L0LL0L0L0L0
0L0L0L0000L0L0L0
0L0L0LLLLLL0L0L0
0L0L00000000L0L0
0L0LLLLLLLLLL0L0
0L000000000000L0
0LLLLLLLLLLLLLL0
0000000000000000`],
  [normalPlatform, bitmap`
5555555555555555
5777777777777775
5755555555555575
5757777777777575
5757555555557575
5757577777757575
5757575555757575
5757575775757575
5757575775757575
5757575555757575
5757577777757575
5757555555557575
5757777777777575
5755555555555575
5777777777777775
5555555555555555`],
  [invertPlatform, bitmap`
3333333333333333
3999999999999993
3955555555555593
3959999999999593
3959555555559593
3959599999959593
3959595555959593
3959595995959593
3959595995959593
3959595555959593
3959599999959593
3959555555559593
3959999999999593
3955555555555593
3999999999999993
3333333333333333`],
  [goal, bitmap`
................
................
.....444444.....
....44444444....
...4444444444...
...4466666644...
...4464444644...
...4464444644...
...4464444644...
...4464444644...
...4466666644...
...4444444444...
....44444444....
.....444444.....
................
................`],
  [spike, bitmap`
................
................
.......33.......
......3333......
......3333......
.....333333.....
.....333333.....
....33333333....
....33333333....
...3333333333...
...3333333333...
..333333333333..
..333333333333..
.33333333333333.
.33333333333333.
3333333333333333`],
  [background, bitmap`
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

setBackground(background);

const levels = [
  map`
..........
..........
..........
w.......gw
wnnn...nnw
w........w
w........w
w...nnn..w
wp.......w
wwwwwwwwww`,
  map`
..........
..........
..........
w.......gw
wiii...iiw
w........w
w........w
w...nnn..w
wp.......w
wwwwwwwwww`,
  map`
..........
g.........
iii.......
w.........
w...nnn...
w.........
w.........
w...iii...
wp........
wwwwwwwwww`,
  map`
..........
......g...
.....iii..
w.........
w....nnn..
w.........
w.........
w.iiinnn..
wp........
wwwwwwwwww`,
  map`
g.........
nnn.......
w.........
w.........
w...iii...
w.........
w.........
w...nnn...
wp...s....
wwwwwwwwww`,
  map`
..........
g....s....
iii...nnn.
w.........
w...nnn...
w.........
w...iii...
w.........
wp........
wwwwwwwwww`,
  map`
giii......
w.........
w...nnn...
w.........
w...iii...
w.........
w..nnn....
w.........
wp........
wwwwwwwwww`
];

setMap(levels[currentLevel]);
setSolids([player, wall]);

// Gravity simulation
let fallInterval = setInterval(() => {
  if (!gameStarted) return;
  
  const p = getFirst(player);
  if (!p) return;
  
  // Apply gravity
  const direction = gravityFlipped ? -1 : 1;
  const nextY = p.y + direction;
  
  // Check if can fall/rise
  if (nextY >= 0 && nextY < height()) {
    const nextTile = getTile(p.x, nextY);
    let canMove = true;
    
    for (let sprite of nextTile) {
      if (sprite.type === wall) {
        canMove = false;
        break;
      }
      // Check platform visibility based on gravity
      if (sprite.type === normalPlatform && !gravityFlipped) {
        canMove = false;
        break;
      }
      if (sprite.type === invertPlatform && gravityFlipped) {
        canMove = false;
        break;
      }
    }
    
    if (canMove) {
      p.y = nextY;
    }
  }
  
  // Check for death by spikes
  const currentTile = getTile(p.x, p.y);
  for (let sprite of currentTile) {
    if (sprite.type === spike) {
      resetLevel();
      return;
    }
  }
  
  // Check for win
  for (let sprite of currentTile) {
    if (sprite.type === goal) {
      currentLevel++;
      if (currentLevel >= levels.length) {
        clearText();
        addText("You Win!", { x: 5, y: 7, color: color`4` });
        addText("Press K to", { x: 4, y: 8, color: color`2` });
        addText("restart!", { x: 5, y: 9, color: color`2` });
        gameStarted = false;
      } else {
        gravityFlipped = false;
        setMap(levels[currentLevel]);
        playTune(winTune);
      }
    }
  }
}, 100);

// Movement controls
onInput("a", () => {
  if (!gameStarted) gameStarted = true;
  const p = getFirst(player);
  if (p && p.x > 0) {
    const nextTile = getTile(p.x - 1, p.y);
    let canMove = true;
    
    for (let sprite of nextTile) {
      if (sprite.type === wall) {
        canMove = false;
        break;
      }
      if (sprite.type === normalPlatform && !gravityFlipped) {
        canMove = false;
        break;
      }
      if (sprite.type === invertPlatform && gravityFlipped) {
        canMove = false;
        break;
      }
    }
    
    if (canMove) {
      p.x -= 1;
      playTune(moveTune);
    }
  }
});

onInput("d", () => {
  if (!gameStarted) gameStarted = true;
  const p = getFirst(player);
  if (p && p.x < width() - 1) {
    const nextTile = getTile(p.x + 1, p.y);
    let canMove = true;
    
    for (let sprite of nextTile) {
      if (sprite.type === wall) {
        canMove = false;
        break;
      }
      if (sprite.type === normalPlatform && !gravityFlipped) {
        canMove = false;
        break;
      }
      if (sprite.type === invertPlatform && gravityFlipped) {
        canMove = false;
        break;
      }
    }
    
    if (canMove) {
      p.x += 1;
      playTune(moveTune);
    }
  }
});

// Gravity flip
onInput("w", () => {
  if (!gameStarted) gameStarted = true;
  gravityFlipped = !gravityFlipped;
  playTune(flipTune);
  updateGravityIndicator();
});

// Reset level
onInput("j", () => {
  resetLevel();
});

// Restart game
onInput("k", () => {
  currentLevel = 0;
  gravityFlipped = false;
  gameStarted = true;
  setMap(levels[currentLevel]);
  clearText();
  updateGravityIndicator();
});

function resetLevel() {
  gravityFlipped = false;
  setMap(levels[currentLevel]);
  updateGravityIndicator();
}

function updateGravityIndicator() {
  clearText();
  if (gravityFlipped) {
    addText("GRAVITY: UP", { x: 1, y: 1, color: color`3` });
  } else {
    addText("GRAVITY: DOWN", { x: 1, y: 1, color: color`5` });
  }
  addText(`Level ${currentLevel + 1}/${levels.length}`, { x: 1, y: 2, color: color`2` });
}

// Sound effects
const moveTune = tune`
100: C5~100,
100: D5~100,
2800`;

const flipTune = tune`
75: C4^75,
75: E4^75,
75: G4^75,
75: C5^75,
2200`;

const winTune = tune`
150: C5^150,
150: E5^150,
150: G5^150,
150: C6^150,
3600`;

// Initial display
updateGravityIndicator();
addText("GRAVITY FLIPPER", { x: 1, y: 5, color: color`6` });
addText("A/D: Move", { x: 3, y: 7, color: color`2` });
addText("W: Flip Gravity", { x: 1, y: 8, color: color`2` });
addText("J: Reset Level", { x: 1, y: 9, color: color`2` });
addText("", { x: 1, y: 11, color: color`4` });
addText("Blue platforms:", { x: 0, y: 12, color: color`5` });
addText("  Normal gravity", { x: 0, y: 13, color: color`2` });
addText("Red platforms:", { x: 0, y: 14, color: color`3` });
addText("  Flipped gravity", { x: 0, y: 15, color: color`2` });