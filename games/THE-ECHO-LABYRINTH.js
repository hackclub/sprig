/*
@title: The Echo Labyrinth
@author: Gemini
@tags: ['memory', 'procedural', 'adventure']
*/

const player = "p";
const wall = "w";
const exit = "e";
const floor = "f"; 
const portal = "o"; 
const beacon = "b"; 

setLegend(
  [player, bitmap`
    ................
    ......0000......
    .....055550.....
    ....05555550....
    ....05055050....
    ....05555550....
    ....05500550....
    ....05555550....
    .....000000.....
    ......0550......
    ....00055000....
    ...0550550550...
    ...0550550550...
    ...0550000550...
    ....00....00....
    ................`],
  [wall, bitmap`
    0000000000000000
    0777777777777770
    0700000000000070
    0707777777777070
    0707000000007070
    0707077777707070
    0707070000707070
    0707070770707070
    0707070770707070
    0707070000707070
    0707077777707070
    0707000000007070
    0707777777777070
    0700000000000070
    0777777777777770
    0000000000000000`],
  [exit, bitmap`
    ................
    ......4444......
    ....44444444....
    ...4444444444...
    ..444444444444..
    ..4444....4444..
    ..4444....4444..
    ..4444....4444..
    ..4444....4444..
    ..4444....4444..
    ..4444....4444..
    ..444444444444..
    ...4444444444...
    ....44444444....
    ......4444......
    ................`],
  [portal, bitmap`
    ................
    .......88.......
    .....888888.....
    ....88888888....
    ...8888008888...
    ...8880000888...
    ..888800008888..
    ..888800008888..
    ..888800008888..
    ...8880000888...
    ...8888008888...
    ....88888888....
    .....888888.....
    .......88.......
    ................`],
  [floor, bitmap`
    0000000000000000
    0..............0
    0..............0
    0..............0
    0..............0
    0..............0
    0..............0
    0..............0
    0..............0
    0..............0
    0..............0
    0000000000000000`],
  [beacon, bitmap`
    ................
    .......33.......
    ......3333......
    .....333333.....
    .....333333.....
    ......3333......
    .......33.......
    .......33.......
    .......33.......
    .......33.......
    .......33.......
    .......33.......
    ......3333......
    ................
    ................
    ................`]
);

setBackground(floor);

let gameState = "LOBBY"; 
let mazeData = []; 
let px = 2; 
let py = 2;

// Compact Lobby - ensure no spaces at the start of lines!
const lobbyMap = map`
wwwwwwww
wffffoff
wfpxfffw
wffffffw
wwwwwwww`;

function startNewLevel() {
  const width = 12;
  const height = 7;
  mazeData = [];
  px = 1;
  py = 1;

  for (let y = 0; y < height; y++) {
    let row = [];
    for (let x = 0; x < width; x++) {
      if (x === 0 || x === width - 1 || y === 0 || y === height - 1) row.push(wall);
      else row.push(Math.random() < 0.2 ? wall : floor);
    }
    mazeData.push(row);
  }

  mazeData[py][px] = player;
  mazeData[height - 2][width - 2] = exit;
  gameState = "PLAYING";
  renderDarkness();
}

function renderDarkness() {
  const currentMap = mazeData.map((row, y) => {
    return row.map((tile, x) => {
      if (x === px && y === py) return player; 
      const dist = Math.max(Math.abs(x - px), Math.abs(y - py));
      if (dist <= 1) return tile;
      if (tile === beacon) return beacon;
      return " "; 
    }).join("");
  }).join("\n");
  
  setMap(currentMap);
}

function move(dx, dy) {
  if (gameState === "LOBBY") {
    const p = getFirst(player);
    if (!p) return; 
    const targetTiles = getTile(p.x + dx, p.y + dy);
    if (targetTiles.every(t => t.type !== wall)) {
      p.x += dx;
      p.y += dy;
    }
  } else {
    const nx = px + dx;
    const ny = py + dy;
    if (mazeData[ny] && mazeData[ny][nx] !== wall) {
      mazeData[py][px] = floor;
      px = nx;
      py = ny;
      if (mazeData[py][px] === exit) {
        startNewLevel();
      } else {
        mazeData[py][px] = player;
        renderDarkness();
      }
    }
  }
}

onInput("w", () => move(0, -1));
onInput("s", () => move(0, 1));
onInput("a", () => move(-1, 0));
onInput("d", () => move(1, 0));

onInput("i", () => {
  if (gameState === "LOBBY") {
    const p = getFirst(player);
    if (getTile(p.x, p.y).some(t => t.type === portal)) startNewLevel();
  } else {
    mazeData[py][px] = beacon;
    renderDarkness();
  }
});

setMap(lobbyMap);

// SAFETY SPAWN: This puts the portal exactly where you can see it.
const pLoc = getFirst(player);
if (pLoc) {
  // Adds a portal right next to the player's starting spot
  addSprite(pLoc.x + 1, pLoc.y, portal);
}