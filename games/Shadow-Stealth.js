/*
  @title: Shadow Stealth
  @author: shreyancat
  @description: A tile-based stealth puzzle game where you dodge patrolling guard sightlines, gather keys, and escape the museum.
  @tags: ['stealth', 'puzzle', 'action']
  @addedOn: 2026-10-06
*/

const wall = "w";
const door = "d";
const openDoor = "o";
const key = "k";
const light = "l";
const guard = "g";
const player = "p";

setLegend(
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
0000000000000000` ],
  [ door, bitmap`
................
...8888888888...
...8........8...
...8.888888.8...
...8.8....8.8...
...8.8.00.8.8...
...8.8.00.8.8...
...8.8....8.8...
...8.888888.8...
...8........8...
...8888888888...
................
................
................
................
................` ],
  [ openDoor, bitmap`
................
...8888888888...
...8........8...
...8........8...
...8........8...
...8...55...8...
...8...55...8...
...8........8...
...8........8...
...8........8...
...8888888888...
................
................
................
................
................` ],
  [ key, bitmap`
................
.....5555.......
....5....5......
....5....5......
.....5555.......
.......5........
.......555......
.......5........
.......55.......
.......5........
................
................
................
................
................
................` ],
  [ light, bitmap`
................
.33333333333333.
.3............3.
.3............3.
.3............3.
.3............3.
.3............3.
.3............3.
.3............3.
.3............3.
.3............3.
.3............3.
.3............3.
.33333333333333.
................
................` ],
  [ guard, bitmap`
................
...3333333333...
..3..........3..
..3..00..00..3..
..3..00..00..3..
..3..........3..
...3333333333...
......333.......
....33...33.....
...3..333..3....
...3..333..3....
...3..333..3....
....33...33.....
...3.......3....
...3.......3....
................` ],
  [ player, bitmap`
................
...000000000....
..0.........0...
..0..50005..0...
..0..0...0..0...
...000...000....
......000.......
....00...00.....
...0..000..0....
...0..000..0....
...0..000..0....
....00...00.....
...0.......0....
...0.......0....
................
................` ]
);

const level1 = map`
wwwwwwwwwwwwwwww
wp.............w
w.wwwwwwwwwwww.w
w.w..........w.w
w.w...k......w.w
w.w..........w.w
w.wwwwwwwwww.w.w
w....g.......w.w
w............d.w
wwwwwwwwwwwwwwww
`;

const level2 = map`
wwwwwwwwwwwwwwww
wp...w.........w
w.ww.w.wwwwwww.w
w.ww...w.....w.w
w.wwww.w.w.w.w.w
w....g...w.g.w.w
wwww.wwwww.w.w.w
wk...w...k...w.w
w.wwwwww.wwwww.w
w............d.w
wwwwwwwwwwwwwwww
`;

const level3 = map`
wwwwwwwwwwwwwwww
wp.....w.k...w.w
wwww.w.w.www.w.w
w....w.......w.w
w.ww.wwwwwww.w.w
w..g.......g...w
w.wwww.wwwww.w.w
wk...w...k...w.w
w.wwwwwwwwww.w.w
w............d.w
wwwwwwwwwwwwwwww
`;

const levelData = [
  {
    map: level1,
    exitX: 13,
    exitY: 8,
    guardConfigs: [
      { minX: 2, maxX: 11, dir: 1 }
    ]
  },
  {
    map: level2,
    exitX: 13,
    exitY: 9,
    guardConfigs: [
      { minX: 1, maxX: 4, dir: 1 },
      { minX: 9, maxX: 12, dir: -1 }
    ]
  },
  {
    map: level3,
    exitX: 13,
    exitY: 9,
    guardConfigs: [
      { minX: 2, maxX: 6, dir: 1 },
      { minX: 8, maxX: 13, dir: -1 }
    ]
  }
];

// Audio
const sfxKey = tune`300:d4-50 e4-50 g4-100`;
const sfxSpotted = tune`400:f3-100 eb3-100 d3-200`;
const sfxWin = tune`500:c4-80 e4-80 g4-80 c5-200`;
const sfxStep = tune`200:c2-20`;

let curLevelIndex = 0;
let gameOver = false;
let gameWon = false;
let guardStates = [];

function updateVisionBeams() {
  const oldLights = getAll(light);
  for (let i = 0; i < oldLights.length; i++) {
    oldLights[i].remove();
  }

  const guards = getAll(guard);
  for (let i = 0; i < guards.length; i++) {
    const g = guards[i];
    const state = guardStates[i];
    if (!state) continue;

    const bx = g.x + state.dir;
    const by = g.y;

    const spritesAtTarget = getTile(bx, by);
    const isSolid = spritesAtTarget.some(s => s.type === wall || s.type === door);

    if (!isSolid) {
      addSprite(bx, by, light);
    }
  }
}

function checkCaught() {
  const p = getFirst(player);
  const guards = getAll(guard);
  if (!p) return false;

  for (let i = 0; i < guards.length; i++) {
    const g = guards[i];
    const state = guardStates[i];
    if (!state) continue;

    const sameTile = (p.x === g.x && p.y === g.y);
    const inBeam = (p.x === g.x + state.dir && p.y === g.y);

    if (sameTile || inBeam) return true;
  }
  return false;
}

function loadLevel(index) {
  clearText();
  curLevelIndex = index;
  const lvl = levelData[curLevelIndex];

  setMap(lvl.map);
  setSolids([ player, wall, door ]);

  gameOver = false;
  gameWon = false;

  guardStates = lvl.guardConfigs.map(c => ({
    dir: c.dir,
    minX: c.minX,
    maxX: c.maxX
  }));

  updateVisionBeams();
}

onInput("w", () => {
  if (gameOver) { loadLevel(curLevelIndex); return; }
  if (gameWon) return;
  getFirst(player).y -= 1;
  playTune(sfxStep);
});

onInput("s", () => {
  if (gameOver) { loadLevel(curLevelIndex); return; }
  if (gameWon) return;
  getFirst(player).y += 1;
  playTune(sfxStep);
});

onInput("a", () => {
  if (gameOver) { loadLevel(curLevelIndex); return; }
  if (gameWon) return;
  getFirst(player).x -= 1;
  playTune(sfxStep);
});

onInput("d", () => {
  if (gameOver) { loadLevel(curLevelIndex); return; }
  if (gameWon) return;
  getFirst(player).x += 1;
  playTune(sfxStep);
});

afterInput(() => {
  if (gameOver || gameWon) return;

  const p = getFirst(player);
  if (!p) return;

  // 1. Did player walk into guard or beam?
  if (checkCaught()) {
    gameOver = true;
    playTune(sfxSpotted);
    addText("SPOTTED! PRESS ANY KEY", { y: 4, color: color`3` });
    return;
  }

  // 2. Pick up keys
  const keys = getAll(key);
  for (let i = 0; i < keys.length; i++) {
    if (p.x === keys[i].x && p.y === keys[i].y) {
      keys[i].remove();
      playTune(sfxKey);
      break;
    }
  }

  // 3. Unlock door: Replace locked door with OPEN DOOR sprite
  if (getAll(key).length === 0) {
    const doors = getAll(door);
    for (let i = 0; i < doors.length; i++) {
      const dx = doors[i].x;
      const dy = doors[i].y;
      doors[i].remove();
      addSprite(dx, dy, openDoor);
    }
    // Remove door from solids so player can step into openDoor
    setSolids([ player, wall ]);
  }

  // 4. Move all guards according to their patrol range
  const guards = getAll(guard);
  for (let i = 0; i < guards.length; i++) {
    const g = guards[i];
    const state = guardStates[i];
    if (!state) continue;

    let nextX = g.x + state.dir;
    if (nextX > state.maxX || nextX < state.minX) {
      state.dir *= -1;
      nextX = g.x + state.dir;
    }
    g.x = nextX;
  }

  // 5. Update vision beams for new guard positions
  updateVisionBeams();

  // 6. Did a guard shine beam on player
  if (checkCaught()) {
    gameOver = true;
    playTune(sfxSpotted);
    addText("SPOTTED! PRESS ANY KEY", { y: 4, color: color`3` });
    return;
  }

  // 7. Check if player stepped into the exit (open door)
  const currentLvl = levelData[curLevelIndex];
  if (getAll(key).length === 0 && p.x === currentLvl.exitX && p.y === currentLvl.exitY) {
    if (curLevelIndex < levelData.length - 1) {
      playTune(sfxWin);
      addText("FLOOR CLEARED!", { y: 4, color: color`1` });
      setTimeout(() => {
        loadLevel(curLevelIndex + 1);
      }, 800);
    } else {
      gameWon = true;
      playTune(sfxWin);
      addText("ESCAPED THE MUSEUM!", { y: 4, color: color`1` });
    }
  }
});

// Boot level 1
loadLevel(0);
