/*
@title: thirs a spike
@author: Anonymous
@tags: []
@addedOn: 2026-00-00
*/

const createArray = (size) => [...Array(size).keys()];
const wait = (time) => new Promise((resolve) => setTimeout(resolve, time));

const player = "p";
const wall = "w";
const coin = "c";
const spike = "s";

// playing, win, loss
let status = "playing";

let didMoveRight = false;
let jumps = 0;
let size = 0;
let hasCoin = false;
let obstacle;
let counter = 0;
let spacesToAppearSpike = 10;
let finalY = 0;

const killables = [coin, spike];

const playerDead = [
  player,
  bitmap`
................
................
................
................
................
................
................
................
.........00.....
.......00330....
......0333330...
...00033333330..
..0333333333330.
.033333333333330
0333333333333330
................`,
];

const playerAlive = [
  player,
  bitmap`
................
................
................
...00000000.....
...0......0.....
...077..770.....
...02....20.....
...02222220.....
...00000000.....
.....66.........
.6666666666.....
.6.666666.6.....
.6.666666.6.....
.6.666666.6.....
...666666.6.....
...6....6.......`,
];

const objects = [
  [
    wall,
    bitmap`
44D4D444D44D4444
C44D44444D44444C
CC444D4D444444CC
CCC444444444CCCC
CCCC44D4D44CCCCC
CCCCC44444CCCCCC
CCCCCC444CCCCCCC
CCCCCCC4CCCCCCCC
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
    coin,
    bitmap`
................
................
................
.......0........
.......0........
......00........
......020.......
......020.......
......020.......
.....0L200......
.....0L220......
.....0L120......
.....0L120......
....0LL1200.....
...0LL11120.....
...0L111120.....`,
  ],
  [
    spike,
    bitmap`
................
................
................
....FFFF........
...F6666F.......
..F699996F......
..F692296F......
..F692296F......
..F692296F......
..F699996F......
..F666666F......
...FF6FFF.......
....FFF.........
................
................
................`,
  ],
];

setLegend(playerAlive, ...objects);
setSolids([player, wall]);

let level = 0;
const levels = [
  map`
...............
...............
............w.w
...........w...
p........w.....
w.w.w.w.w......
...............
...............
ccccccccccccccc
wwwwwwwwwwwwwww`,
];

// Fixed: Storing final section as explicit string array rows to prevent compilation split failures
const finalSection = [
  "...............",
  "...............",
  "..............w",
  "........w.w.w..",
  "..w.w.w........",
  "w..............",
  "...............",
  "...............",
  "ccccccccccccccc",
  "wwwwwwwwwwwwwww"
];

const obstacles = [
  { width: 4, height: 1, border: 1, y: 5 },
  { width: 2, height: 2, border: 1, y: 5 },
  { width: 2, height: 3, border: 1, y: 5 },
  { width: 2, height: 2, border: 1, y: 4, doesFall: true },
  { width: 3, height: 1, border: 1, y: 5 },
  { width: 2, height: 2, border: 1, y: 5 },
];

setMap(levels[level]);

// Helper to safely find the floor level dynamically
const getPlayerYFloor = () => {
  const p = getFirst(player);
  if (!p) return 5;
  // Look for a wall directly underneath player
  const below = getTile(p.x, p.y + 1);
  return below.some(t => t.type === wall) ? p.y : null;
};

onInput("d", () => {
  if (status === "loss") return;
  didMoveRight = true;
  if (getFirst(player).x >= 10 && finalY != 15) return;
  getFirst(player).x++;
});

onInput("a", () => {
  if (status === "loss") return;
  getFirst(player).x--;
});

onInput("w", () => {
  if (status === "loss") return;
  
  // Refined Jump validation: check if player is actually standing on something solid
  const p = getFirst(player);
  const tileBelow = getTile(p.x, p.y + 1);
  const standingOnWall = tileBelow.some(t => t.type === wall);

  if (jumps > 0 || !standingOnWall) return;

  jumps++;
  jump().then(async () => {
    jumps--;
  });
});

const jump = async () => {
  await createArray(3).reduce(async (promise) => {
    await promise;
    getFirst(player).y--;
    checkIfKillablesWereTouched();
    await wait(80);
  }, Promise.resolve());

  await resetGravity();
};

const resetGravity = async () => {
  await createArray(3).reduce(async (promise) => {
    await promise;
    // Don't fall through the floor
    const nextTile = getTile(getFirst(player).x, getFirst(player).y + 1);
    if (nextTile.some(t => t.type === wall)) return;
    
    getFirst(player).y++;
    checkIfKillablesWereTouched();
    await wait(80);
  }, Promise.resolve());
};

const shake = () => {
  if (typeof document === "undefined") return;
  const gameCanvasContainer = document.querySelector(".game-canvas-container");
  if (!gameCanvasContainer) return;
  gameCanvasContainer.classList.add("shake");
  setTimeout(() => {
    gameCanvasContainer.classList.remove("shake");
  }, 200);
};

// Fixed Gravity Loop
setInterval(() => {
  if (status !== "playing") return;
  checkIfKillablesWereTouched();

  const p = getFirst(player);
  if (!p || jumps) return;

  // If there's no wall underneath, gravity pulls down
  const tileBelow = getTile(p.x, p.y + 1);
  if (!tileBelow.some(t => t.type === wall)) {
    p.y++;
  }
}, 120);

const killPlayer = () => {
  counter = 0;
  finalY = 0;
  if (status === 'loss') return; 

  status = "loss";

  addText("You lost!", {
    x: 4,
    y: 2,
    color: color`1`,
  });

  shake();
  setLegend(playerDead, ...objects);

  setTimeout(() => {
    setLegend(playerAlive, ...objects);
    setMap(levels[level]);
    
    const p = getFirst(player);
    if (p) {
      p.y = 4;
      p.x = 0;
    }

    clearText();
    status = "playing";
  }, 800);
};

const checkIfKillablesWereTouched = () => {
  const p = getFirst(player);
  if (!p) return;

  const playerTochedKillable = getTile(p.x, p.y).some(({ type }) =>
    killables.includes(type)
  );

  if (playerTochedKillable) killPlayer();
};

const fallBlock = (spikeSprite) => {
  createArray(9 - spikeSprite.y).reduce(async (promise) => {
    await promise;
    // Fixed: safety handling to check if spike was already cleaned up/removed
    if (!getAll(spike).includes(spikeSprite)) return;

    if (spikeSprite.y >= 5) {
      spikeSprite.remove();
    } else {
      spikeSprite.y++;
    }
    await wait(100);
  }, Promise.resolve());
};

afterInput(() => {
  if (status !== "playing") return;
  checkIfKillablesWereTouched();

  const p = getFirst(player);
  if (!p) return;

  if (p.x === 14) {
    addText("You Win!", {
      x: 5,
      y: 2,
      color: color`5`,
    });
    status = "win";
    return;
  }

  if (finalY === 15) return;

  const playerIsBlocked = tilesWith(wall).some(
    (w) => w.y === p.y && w.x === p.x + 1
  );
  
  const playerIsInScrollPosition = p.x === 10;

  if (!playerIsInScrollPosition || !didMoveRight || playerIsBlocked) return;

  didMoveRight = false;

  // Scroll existing objects to the left
  const tags = [wall, coin, spike];
  tags.forEach((letter) => {
    getAll(letter).forEach((l) => {
      l.x--;
      if (l.x < 0) l.remove();
    });
  });

  // Always generate procedural base floor (y=6) so player doesn't fall forever!
  addSprite(14, 6, wall);

  if (spacesToAppearSpike < 0) {
    const showTrap = Math.floor(Math.random() * 2);
    if (showTrap) {
      addSprite(11, 5, coin);
      spacesToAppearSpike = 10;
    }
  }
  spacesToAppearSpike--;

  const spikeFound = getAll(spike).find((s) => s.x === p.x);
  if (spikeFound) fallBlock(spikeFound);

  // Generate the finale zone mapping
  if (counter >= 10) {
    if (finalY < finalSection[0].length) {
      finalSection.forEach((line, yIdx) => {
        const char = line[finalY];
        if (char !== "." && char !== "p") {
          addSprite(14, yIdx, char);
        }
      });
      finalY++;
    }
    return;
  }

  // Handle standard procedural obstacle sizing
  if (!size) {
    counter++;
    const index = Math.floor(Math.random() * obstacles.length);
    obstacle = obstacles[index];
    size = obstacle.width + obstacle.border * 2;
    hasCoin = false;
  }

  const { width, border, height, y, doesFall } = obstacle;
  size -= 1;

  if (size <= width + border && size > border) {
    createArray(height).forEach((_, index, self) => {
      addSprite(14, y - index, wall);

      if (!index && doesFall) {
        addSprite(14, y - index + 1, spike);
      }

      if (self.length - 1 === index && !hasCoin) {
        const showCoin = Math.floor(Math.random() * 2);
        if (showCoin) {
          addSprite(14, y - index - 1, coin);
          hasCoin = true;
        }
      }
    });
  }
});