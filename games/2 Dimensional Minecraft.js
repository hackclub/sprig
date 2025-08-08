const player = "p";
const grass = "g";
const oak = "o";
const brick = "b";
const select = "s"; // Hotbar selector

const solidTypes = [player, grass, oak, brick];
setSolids(solidTypes);

function isSolid(type) {
  return solidTypes.includes(type);
}

setLegend(
  [player, bitmap`
................
................
.......000......
.......0.0......
......0..0......
......0...0.0...
....0003.30.0...
....0.0...000...
....0.05550.....
......0...0.....
.....0....0.....
.....0...0......
......000.......
......0.0.......
.....00.00......
................`],
  [grass, bitmap`
444444444444444D
DDDD4444DDDDD444
DDDDDDDDDDDDDDDD
CCDDDDCCCCCCDDDD
CCCCCCCCCCCCCCDC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC`],
  [oak, bitmap`
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC`],
  [brick, bitmap`
CCCCCC1CCCCC1CCC
CCCCCC1CCCCC1CCC
CCCCCC1CCCCC1CCC
1111111111111CCC
CCCCCCCC111CCCCC
CCCCCCCC1C1CCCCC
CCCCCCCC1C11CCCC
111111111CC11111
CCC1CCCC1CCCC1C1
CCC1CCCC1CCCC1CC
CCC11111111111CC
1111CCCC1CCCCCCC
CC11CCCC11111111
111111111CCCC1CC
CCCCC1CCCCCCC1CC
CCCC11CCCCCCC1CC`],
  [select, bitmap`
................
................
................
................
................
................
................
................
................
................
................
................
................
................
................
1111111111111111`]
);

const blocks = [grass, oak, brick];
let selectedBlock = 0;
const MAP_WIDTH = 10;
const MAP_HEIGHT = 11; // extra top row for hotbar
let jumping = false;

function generateWorld() {
  let rows = [".........."]; // hotbar row
  const baseHeight = Math.floor((MAP_HEIGHT - 1) / 2);
  for (let y = 1; y < MAP_HEIGHT; y++) {
    let row = "";
    for (let x = 0; x < MAP_WIDTH; x++) {
      let h = baseHeight + Math.floor(Math.sin((x + Math.random() * 2) / 2) * 2);
      if (y > h) {
        row += blocks[Math.floor(Math.random() * blocks.length)];
      } else {
        row += ".";
      }
    }
    rows.push(row);
  }

  // place player
  for (let y = 1; y < MAP_HEIGHT; y++) {
    let row = rows[y];
    let cx = Math.floor(MAP_WIDTH / 2);
    if (row[cx] === ".") {
      rows[y] = row.substring(0, cx) + player + row.substring(cx + 1);
      break;
    }
  }

  return map`${rows.join("\n")}`;
}

function resetGame() {
  setMap(generateWorld());
  drawHotbar();
}

resetGame();
setPushables({ [player]: [] });

function tryMove(dx, dy) {
  const p = getFirst(player);
  const nx = p.x + dx;
  const ny = p.y + dy;
  if (
    nx >= 0 && nx < MAP_WIDTH &&
    ny >= 1 && ny < MAP_HEIGHT
  ) {
    const tile = getTile(nx, ny);
    if (tile.length === 0 || !tile.some(t => isSolid(t.type))) {
      p.x = nx;
      p.y = ny;
    }
  }
}

// Movement
onInput("a", () => tryMove(-1, 0));
onInput("d", () => tryMove(1, 0));

// Jump 2 tiles with W
onInput("w", () => {
  const p = getFirst(player);
  if (!p) return;
  const below = getTile(p.x, p.y + 1);
  const above1 = getTile(p.x, p.y - 1);
  const above2 = getTile(p.x, p.y - 2);
  if (
    below.some(t => isSolid(t.type)) &&
    p.y > 2 &&
    above1.every(t => !isSolid(t.type)) &&
    above2.every(t => !isSolid(t.type))
  ) {
    p.y -= 2;
    jumping = true;
    setTimeout(() => jumping = false, 300);
  }
});

// Continuous gravity
setInterval(() => {
  if (jumping) return;
  const p = getFirst(player);
  if (!p) return;
  const below = getTile(p.x, p.y + 1);
  if (below.length === 0 || !below.some(t => isSolid(t.type))) {
    if (p.y + 1 < MAP_HEIGHT) {
      p.y += 1;
    }
  }
}, 300);

// Place block with K
onInput("k", () => {
  const p = getFirst(player);
  const tx = p.x;
  const ty = p.y + 1;
  if (ty < MAP_HEIGHT) {
    const below = getTile(tx, ty);
    if (below.length === 0) {
      addSprite(tx, ty, blocks[selectedBlock]);
    }
  }
});

// Break block with J
onInput("j", () => {
  const p = getFirst(player);
  const tx = p.x;
  const ty = p.y + 1;
  if (ty < MAP_HEIGHT) {
    const below = getTile(tx, ty);
    if (below.length > 0 && below[0].type !== player) {
      clearTile(tx, ty);
    }
  }
});

// Switch block
onInput("i", () => {
  selectedBlock = (selectedBlock + 1) % blocks.length;
  drawHotbar();
});
onInput("l", () => {
  selectedBlock = (selectedBlock - 1 + blocks.length) % blocks.length;
  drawHotbar();
});

// Reset world
onInput("s", () => {
  resetGame();
});

// Hotbar on row 0
function drawHotbar() {
  for (let x = 0; x < MAP_WIDTH; x++) {
    clearTile(x, 0);
    if (x < blocks.length) {
      addSprite(x, 0, blocks[x]);
      if (x === selectedBlock) addSprite(x, 0, select);
    }
  }
}
