/*
@title: Tetris
@author: MostLime12195
@tags: [retro, endless]
@addedOn: 2024-00-00
*/

/*
!! CONTROLS !!

- A & D to move LEFT and RIGHT
- S to MOVE DOWN
- W & K to ROTATE CLOCKWISE
- J to ROTATE COUNTER-CLOCKWISE
- L to HARD DROP
- I to RESTART (once dead)

*/

// In tiles per second
const blockMoveSpeed = 0.5;

const blackBorder = "@"
const blueBlock = "b"
const redBlock = "r"
const greenBlock = "g"
const grayBlock = "e"
const pinkBlock = "p"
const yellowBlock = "y"
const whiteBlock = "w"
const background = "t"

setLegend(
  [blackBorder, bitmap`
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
0000000000000000`],
  [blueBlock, bitmap`
5555555555555555
5555555555555555
5577777777777755
5577777777777755
5577777777777755
5577777777777755
5577777777777755
5577777777777755
5577777777777755
5577777777777755
5577777777777755
5577777777777755
5577777777777755
5577777777777755
5555555555555555
5555555555555555`],
  [redBlock, bitmap`
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CC333333333333CC
CC333333333333CC
CC333333333333CC
CC333333333333CC
CC333333333333CC
CC333333333333CC
CC333333333333CC
CC333333333333CC
CC333333333333CC
CC333333333333CC
CC333333333333CC
CC333333333333CC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC`],
  [greenBlock, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DD444444444444DD
DD444444444444DD
DD444444444444DD
DD444444444444DD
DD444444444444DD
DD444444444444DD
DD444444444444DD
DD444444444444DD
DD444444444444DD
DD444444444444DD
DD444444444444DD
DD444444444444DD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD`],
  [grayBlock, bitmap`
0000000000000000
0000000000000000
00LLLLLLLLLLLL00
00LLLLLLLLLLLL00
00LLLLLLLLLLLL00
00LLLLLLLLLLLL00
00LLLLLLLLLLLL00
00LLLLLLLLLLLL00
00LLLLLLLLLLLL00
00LLLLLLLLLLLL00
00LLLLLLLLLLLL00
00LLLLLLLLLLLL00
00LLLLLLLLLLLL00
00LLLLLLLLLLLL00
0000000000000000
0000000000000000`],
  [whiteBlock, bitmap`
1111111111111111
1111111111111111
1122222222222211
1122222222222211
1122222222222211
1122222222222211
1122222222222211
1122222222222211
1122222222222211
1122222222222211
1122222222222211
1122222222222211
1122222222222211
1122222222222211
1111111111111111
1111111111111111`],
  [pinkBlock, bitmap`
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HH888888888888HH
HH888888888888HH
HH888888888888HH
HH888888888888HH
HH888888888888HH
HH888888888888HH
HH888888888888HH
HH888888888888HH
HH888888888888HH
HH888888888888HH
HH888888888888HH
HH888888888888HH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH`],
  [yellowBlock, bitmap`
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FF666666666666FF
FF666666666666FF
FF666666666666FF
FF666666666666FF
FF666666666666FF
FF666666666666FF
FF666666666666FF
FF666666666666FF
FF666666666666FF
FF666666666666FF
FF666666666666FF
FF666666666666FF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF`],
  [background, bitmap`
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999`]
)

let blocks = [
  ["I", [
    [0, 0, redBlock],
    [1, 0, redBlock],
    [2, 0, redBlock],
    [3, 0, redBlock]
  ]],
  ["L", [
    [0, 1, pinkBlock],
    [1, 1, pinkBlock],
    [2, 0, pinkBlock],
    [2, 1, pinkBlock]
  ]],
  ["T", [
    [0, 1, yellowBlock],
    [1, 1, yellowBlock],
    [1, 0, yellowBlock],
    [2, 1, yellowBlock]
  ]],
  ["S", [
    [0, 1, greenBlock],
    [1, 0, greenBlock],
    [1, 1, greenBlock],
    [2, 0, greenBlock]
  ]],
  ["Z", [
    [0, 0, grayBlock],
    [1, 0, grayBlock],
    [1, 1, grayBlock],
    [2, 1, grayBlock]
  ]],
  ["O", [
    [0, 0, blueBlock],
    [0, 1, blueBlock],
    [1, 0, blueBlock],
    [1, 1, blueBlock]
  ]],
  ["J", [
    [0, 0, whiteBlock],
    [0, 1, whiteBlock],
    [1, 1, whiteBlock],
    [2, 1, whiteBlock]
  ]]
]

let playMap = map`
@@@@@@@@@@@@
@..........@
@..........@
@..........@
@..........@
@..........@
@..........@
@..........@
@..........@
@..........@
@..........@
@..........@
@..........@
@..........@
@..........@
@..........@
@..........@
@@@@@@@@@@@@`

// Global game variables.
let moveBlockDownInterval;
let tileList = [];
let score = 0;
let gameIsOver = false;

let currBlock = {
  "type": blocks[~~(Math.random() * blocks.length)],
  "state": ~~(Math.random() * 4), // 0..3
  "x": 6,
  "y": 1
}

// ----- HELPER FUNCTIONS FOR ROTATION & COLLISION -----

// Returns the rotated block map for a given rotation state (0-3).
// The square ("O") block does not rotate.
function getRotatedBlockMap(state) {
  const [blockType, blockMap] = currBlock.type;
  if (blockType === "O") {
    return blockMap;
  }
  let xs = blockMap.map(tile => tile[0]);
  let ys = blockMap.map(tile => tile[1]);
  let minX = Math.min(...xs),
    maxX = Math.max(...xs);
  let minY = Math.min(...ys),
    maxY = Math.max(...ys);
  let pivotX = (minX + maxX) / 2;
  let pivotY = (minY + maxY) / 2;
  let rotatedBlockMap = blockMap.map(tile => {
    let x = tile[0] - pivotX;
    let y = tile[1] - pivotY;
    let rotatedX, rotatedY;
    switch (state) {
      case 0:
        rotatedX = x;
        rotatedY = y;
        break;
      case 1:
        rotatedX = y;
        rotatedY = -x;
        break;
      case 2:
        rotatedX = -x;
        rotatedY = -y;
        break;
      case 3:
        rotatedX = -y;
        rotatedY = x;
        break;
      default:
        rotatedX = x;
        rotatedY = y;
    }
    return [Math.round(rotatedX + pivotX), Math.round(rotatedY + pivotY), tile[2]];
  });
  return rotatedBlockMap;
}

function rotateBlockmap() {
  return getRotatedBlockMap(currBlock.state);
}

// Returns true if placing the current block at (x,y) with rotation state "state"
// doesn't collide with walls or locked tiles.
function canPlaceBlock(x, y, state) {
  let blockMap = getRotatedBlockMap(state);
  let playableMinX = 1,
    playableMaxX = 10,
    playableMinY = 1,
    playableMaxY = 16;
  for (let tile of blockMap) {
    let absX = tile[0] + x;
    let absY = tile[1] + y;
    if (absX < playableMinX || absX > playableMaxX || absY < playableMinY || absY > playableMaxY)
      return false;
    for (let placedTile of tileList) {
      if (placedTile[0] === absX && placedTile[1] === absY)
        return false;
    }
  }
  return true;
}

function tryRotate(newState) {
  if (canPlaceBlock(currBlock.x, currBlock.y, newState)) {
    currBlock.state = newState;
  } else if (canPlaceBlock(currBlock.x - 1, currBlock.y, newState)) {
    currBlock.x -= 1;
    currBlock.state = newState;
  } else if (canPlaceBlock(currBlock.x + 1, currBlock.y, newState)) {
    currBlock.x += 1;
    currBlock.state = newState;
  } else if (canPlaceBlock(currBlock.x - 2, currBlock.y, newState)) {
    currBlock.x -= 2;
    currBlock.state = newState;
  } else if (canPlaceBlock(currBlock.x + 2, currBlock.y, newState)) {
    currBlock.x += 2;
    currBlock.state = newState;
  }
  refreshScreen();
}

// ----- LINE REMOVAL & SCORING -----

function removeFullLines() {
  let playableMinX = 1,
    playableMaxX = 10,
    playableMinY = 1,
    playableMaxY = 16;
  let linesCleared = 0;
  for (let y = playableMaxY; y >= playableMinY; y--) {
    let rowTiles = tileList.filter(tile => tile[1] === y);
    if (rowTiles.length >= (playableMaxX - playableMinX + 1)) {
      tileList = tileList.filter(tile => tile[1] !== y);
      linesCleared++;
      for (let i = 0; i < tileList.length; i++) {
        if (tileList[i][1] < y) {
          tileList[i][1]++;
        }
      }
      y++; // recheck this row after shifting
    }
  }
  return linesCleared;
}

function updateScoreDisplay() {
  addText("LINES", { x: 0, y: 1, color: color`2` })
  addText("000", { x: 0, y: 2, color: color`L` })

  addText("SCORE", { x: 15, y: 1, color: color`2` })
  addText(score.toString().padStart(5, "0"), { x: 15, y: 2, color: color`L` })
}

function gameOver() {
  clearInterval(moveBlockDownInterval);
  gameIsOver = true;
  addText("GAME", { x: 8, y: 5, color: color`3` })
  addText("OVER", { x: 8, y: 7, color: color`3` })
  addText("RESTART", { x: 7, y: 9, color: color`4` })
  addText("(i)", { x: 9, y: 10, color: color`D` })
}

// ----- GAME LOGIC -----

function startGame() {
  gameIsOver = false;
  clearText();
  tileList = [];
  score = 0;
  // Set starting block.
  currBlock.x = 5;
  currBlock.y = 1;
  currBlock.type = blocks[~~(Math.random() * blocks.length)];
  currBlock.state = ~~(Math.random() * 4);
  refreshScreen();
  clearInterval(moveBlockDownInterval);
  moveBlockDownInterval = setInterval(() => { moveBlockDown() }, blockMoveSpeed * 1000);
}

function moveBlockDown() {
  if (gameIsOver) return;
  if (canPlaceBlock(currBlock.x, currBlock.y + 1, currBlock.state)) {
    currBlock.y++;
    refreshScreen();
  } else {
    let blockMap = getRotatedBlockMap(currBlock.state);
    for (let tile of blockMap) {
      tileList.push([tile[0] + currBlock.x, tile[1] + currBlock.y, tile[2]]);
    }
    let cleared = removeFullLines();
    if (cleared > 0) { score += cleared * 100; }
    // Prepare next block.
    currBlock.x = 5;
    currBlock.y = 1;
    currBlock.type = blocks[~~(Math.random() * blocks.length)];
    currBlock.state = ~~(Math.random() * 4);
    // Adjust spawn position so no tile is above the playable area.
    let newBlockMap = getRotatedBlockMap(currBlock.state);
    let minBlockY = Math.min(...newBlockMap.map(tile => tile[1]));
    if (minBlockY < 1) {
      currBlock.y -= (minBlockY - 1);
    }
    // Check if new block can be placed.
    if (!canPlaceBlock(currBlock.x, currBlock.y, currBlock.state)) {
      gameOver();
      return;
    }
    refreshScreen();
  }
}

function refreshScreen() {
  setMap(playMap);
  setBackground(background);
  for (let tile of tileList) {
    addSprite(tile[0], tile[1], tile[2]);
  }
  let blockMap = getRotatedBlockMap(currBlock.state);
  for (let tile of blockMap) {
    addSprite(tile[0] + currBlock.x, tile[1] + currBlock.y, tile[2]);
  }
  updateScoreDisplay();
}

// ----- INPUT HANDLERS -----

onInput("a", () => {
  if (gameIsOver) return;
  if (canPlaceBlock(currBlock.x - 1, currBlock.y, currBlock.state))
    currBlock.x -= 1;
  refreshScreen();
});
onInput("d", () => {
  if (gameIsOver) return;
  if (canPlaceBlock(currBlock.x + 1, currBlock.y, currBlock.state))
    currBlock.x += 1;
  refreshScreen();
});
onInput("s", () => {
  if (gameIsOver) return;
  moveBlockDown();
});
onInput("w", () => {
  if (gameIsOver) return;
  let newState = (currBlock.state + 3) % 4;
  tryRotate(newState);
});
onInput("j", () => {
  if (gameIsOver) return;
  let newState = (currBlock.state + 1) % 4;
  tryRotate(newState);
});
onInput("k", () => {
  if (gameIsOver) return;
  let newState = (currBlock.state + 3) % 4;
  tryRotate(newState);
});
onInput("i", () => {
  if (gameIsOver) startGame();
});
onInput("l", () => {
  if (gameIsOver) return;
  // Hard drop: keep moving the block down until it collides.
  while (canPlaceBlock(currBlock.x, currBlock.y + 1, currBlock.state)) {
    currBlock.y++;
  }
  // Now lock the piece (this calls the same logic as if it had naturally landed).
  moveBlockDown();
});

afterInput(() => {
  refreshScreen();
});

startGame();