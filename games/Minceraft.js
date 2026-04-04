/* 
@title: Minecraft
@author: Nikhil Nagaraj (Enhanced)
*/

// 2D "Paper Minecraft"-style sandbox for Sprig.
// Features:
// - Break/place blocks (grass, dirt, stone, wood, leaves)
// - Gravity and jumping with velocity
// - Facing direction (rotate with E)
// - Mine with X, place with Z
// - Generated world with stone/dirt/grass layers and trees
// - Inventory hotbar (1–4)

const player = "p";
const grass = "g";
const dirt = "d";
const stone = "s";
const wood = "w";
const sky = "k";
const leaves = "l";

setLegend(
  [ player, bitmap`
.....CCCCCC.....
.....CFFFFC.....
.....FFFFFF.....
.....2CFFC2.....
.....FFFFFF.....
...7777777777...
...7777777777...
...CC777777CC...
...CC777777CC...
...CC777777CC...
...CC777777CC...
...CC777777CC...
.....55..55.....
.....55..55.....
.....55..55.....
.....55..55.....` ],
  [ grass, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDCCDDCCDDCCDDDD
CCCCDCCCCCCCCCDD
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
CCCCCCCCCCCCCCCC` ],
  [ dirt, bitmap`
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
CCCCCCCCCCCCCCCC` ],
  [ stone, bitmap`
LL11LLLLLLLLLLLL
LL11LLLLLLLLLLLL
LLLLLLLLLLL11LLL
LLLLLLLLLLL11LLL
11LLLLLLLLL11LLL
11LLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLL11LLLLLLLL
LLLLLL11LLLLLLLL
LLLLLL11LLLL1111
LLLLLL11LLLL1111
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
L1LLLLLLLLLLLLLL
L1LLLLLLLL11LLLL
L1LLLLLLLL11LLLL` ],
  [ wood, bitmap`
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCFCCCCCCCCCCCC
CCCFCCCCCCCCCCCC
CCFFFCCCCCCCCCCC
CCFFFCCCCCCCCCCC
CCFFFCCCCCCCCCCC
CCCFCCCCCCCFCCCC
CCCFCCCCCCCFCCCC
CCCCCCCCCCFFFCCC
CCCCCCCCCCFFFCCC
CCCCCCCCCCFFFCCC
CCCCCCCCCCCFCCCC
CCCCCCCCCCCFCCCC` ],
  [ sky, bitmap`
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777` ],
  [ leaves, bitmap`
DDDDDDDDDDDD44DD
DD44DDDDDDDD44DD
DD44DDDDDDDD44DD
DD44DDDD44DD44DD
DDDDDDDD44DDDDDD
DDDDDDDDDDDDDDDD
DDDD44DDDDDDDDDD
DDDD44DDDDDDD444
DDDD44DDDDDDD444
DDDDDDDDDDDDDDDD
DDDDDDDDDD444DDD
DDDDDDDDDD444DDD
D44DDDDDDDDDDDDD
D44DDDDDDDDDDDDD
DDDDDDDDDDDDD44D
DDDDDDDDDDDDD44D` ]
);

setSolids([ player, grass, dirt, stone, wood, leaves ]);

// Generate a Minecraft-style world with layers and trees
function generateWorld() {
  // Start with all sky
  let worldMap = [];
  for (let y = 0; y < 16; y++) {
    worldMap[y] = [];
    for (let x = 0; x < 16; x++) {
      worldMap[y][x] = sky;
    }
  }
  
  // Define surface height (simple hills)
  const surfaceHeight = [9, 9, 9, 9, 8, 8, 8, 9, 9, 9, 10, 10, 10, 9, 9, 9];
  
  // Build layers from bottom up
  for (let x = 0; x < 16; x++) {
    const surface = surfaceHeight[x];
    
    // Fill from bottom to surface
    for (let y = 15; y >= surface; y--) {
      if (y >= 13) {
        // Bottom layers are stone
        worldMap[y][x] = stone;
      } else if (y === surface) {
        // Top layer is grass
        worldMap[y][x] = grass;
      } else {
        // Middle layers are dirt
        worldMap[y][x] = dirt;
      }
    }
  }
  
  // Add some trees (wood trunks with leaves)
  const treePlaces = [3, 7, 12];
  for (const tx of treePlaces) {
    const treeBase = surfaceHeight[tx];
    if (treeBase < 8) continue;
    
    // Tree trunk (3 blocks tall)
    worldMap[treeBase - 1][tx] = wood;
    worldMap[treeBase - 2][tx] = wood;
    worldMap[treeBase - 3][tx] = wood;
    
    // Leaves (cross pattern around top)
    const leafY = treeBase - 3;
    if (leafY > 0) {
      // Top layer of leaves
      if (leafY - 1 >= 0) worldMap[leafY - 1][tx] = leaves;
      
      // Middle layer (wider)
      if (tx > 0) worldMap[leafY][tx - 1] = leaves;
      if (tx < 15) worldMap[leafY][tx + 1] = leaves;
      worldMap[leafY][tx] = leaves; // center
      
      // Lower layer
      if (leafY + 1 < 16) {
        if (tx > 0) worldMap[leafY + 1][tx - 1] = leaves;
        if (tx < 15) worldMap[leafY + 1][tx + 1] = leaves;
      }
    }
  }
  
  // Convert to map string
  let mapStr = "";
  for (let y = 0; y < 16; y++) {
    for (let x = 0; x < 16; x++) {
      mapStr += worldMap[y][x];
    }
    if (y < 15) mapStr += "\n";
  }
  
  return mapStr;
}

const world = generateWorld();
setMap(world);

// Place player on surface
addSprite(8, 6, player);

// Game state
let selectedSlot = 1; // 1: grass, 2: dirt, 3: stone, 4: wood
let facingDir = 2; // 0: up, 1: right, 2: down, 3: left
let jumpCounter = 0; // how many voxels left to jump up (0, 1, or 2)

// Direction vectors
const dirVectors = [
  { dx: 0, dy: -1 },  // up
  { dx: 1, dy: 0 },   // right
  { dx: 0, dy: 1 },   // down
  { dx: -1, dy: 0 }   // left
];

// Helpers
function getPlayer() {
  const ps = getAll(player);
  return ps.length ? ps.at(-1) : null;
}

function inBounds(x, y) {
  return x >= 0 && x < 16 && y >= 0 && y < 16;
}

function isSolidAt(x, y) {
  if (!inBounds(x, y)) return true;
  const t = getTile(x, y);
  for (let i = 0; i < t.length; i++) {
    const type = t[i].type;
    if (type !== sky && type !== player) {
      return true;
    }
  }
  return false;
}

function blockAt(x, y) {
  if (!inBounds(x, y)) return null;
  const t = getTile(x, y);
  for (let i = 0; i < t.length; i++) {
    const type = t[i].type;
    if (type === grass || type === dirt || type === stone || type === wood || type === leaves) {
      return type;
    }
  }
  return null;
}

function removeBlock(x, y) {
  if (!inBounds(x, y)) return;
  const t = getTile(x, y);
  for (let i = 0; i < t.length; i++) {
    const type = t[i].type;
    if (type === grass || type === dirt || type === stone || type === wood || type === leaves) {
      t[i].remove();
      addSprite(x, y, sky);
      return;
    }
  }
}

function placeBlock(x, y) {
  if (!inBounds(x, y)) return;
  const t = getTile(x, y);
  
  // Cannot place on player
  for (let i = 0; i < t.length; i++) {
    if (t[i].type === player) return;
  }
  
  // Cannot place on existing block
  let hasBlock = false;
  for (let i = 0; i < t.length; i++) {
    const type = t[i].type;
    if (type === grass || type === dirt || type === stone || type === wood || type === leaves) {
      hasBlock = true;
      break;
    }
  }
  if (hasBlock) return;

  let typeToPlace = grass;
  if (selectedSlot === 1) typeToPlace = grass;
  else if (selectedSlot === 2) typeToPlace = dirt;
  else if (selectedSlot === 3) typeToPlace = stone;
  else if (selectedSlot === 4) typeToPlace = wood;

  addSprite(x, y, typeToPlace);
}

// Movement
function tryMoveHorizontal(dx) {
  const p = getPlayer();
  if (!p) return;
  const nx = p.x + dx;
  const ny = p.y;
  
  if (!inBounds(nx, ny)) return;
  if (!isSolidAt(nx, ny)) {
    p.x = nx;
  }
}

// Mining: break block in facing direction
function mineBlock() {
  const p = getPlayer();
  if (!p) return;
  const dir = dirVectors[facingDir];
  const tx = p.x + dir.dx;
  const ty = p.y + dir.dy;
  removeBlock(tx, ty);
}

// Place block in facing direction
function buildBlock() {
  const p = getPlayer();
  if (!p) return;
  const dir = dirVectors[facingDir];
  const tx = p.x + dir.dx;
  const ty = p.y + dir.dy;
  placeBlock(tx, ty);
}

// Jump
function jump() {
  const p = getPlayer();
  if (!p) return;
  
  // Can only jump if on ground (solid block below)
  if (isSolidAt(p.x, p.y + 1)) {
    jumpCounter = 2; // Jump 2 voxels high
  }
}

// Inputs
onInput("a", () => {
  tryMoveHorizontal(-1);
});

onInput("d", () => {
  tryMoveHorizontal(1);
});

onInput("w", () => {
  jump();
});

onInput("i", () => {
  buildBlock();
});

onInput("j", () => {
  // Rotate facing direction by 90 degrees
  facingDir = (facingDir + 1) % 4;
  
  // Show indicator
  const dirs = ["UP", "RIGHT", "DOWN", "LEFT"];
  addText(dirs[facingDir], { x: 1, y: 1, color: color`3` });
  setTimeout(() => clearText(), 500);
});

onInput("k", () => {
  mineBlock();
});

onInput("l", () => {
  // Cycle inventory slot
  selectedSlot = (selectedSlot % 4) + 1;
  
  const items = ["GRASS", "DIRT", "STONE", "WOOD"];
  const colors = [color`4`, color`C`, color`L`, color`C`];
  addText(items[selectedSlot - 1], { x: 1, y: 1, color: colors[selectedSlot - 1] });
  setTimeout(() => clearText(), 500);
});

// Physics loop - simple gravity and jumping
setInterval(() => {
  const p = getPlayer();
  if (!p) return;
  
  // If jumping, move up
  if (jumpCounter > 0) {
    const ny = p.y - 1;
    if (inBounds(p.x, ny) && !isSolidAt(p.x, ny)) {
      p.y = ny;
      jumpCounter--;
    } else {
      // Hit ceiling, stop jumping
      jumpCounter = 0;
    }
  }
  // Otherwise apply gravity - fall if block below is sky
  else if (!isSolidAt(p.x, p.y + 1)) {
    const ny = p.y + 1;
    if (inBounds(p.x, ny)) {
      p.y = ny;
    }
  }
}, 100);

// Display controls hint
addText("WASD: Move/Jump", { x: 1, y: 14, color: color`2` });
addText("I: Place  K: Mine  J: Rotate  L: Item", { x: 0, y: 15, color: color`2` });