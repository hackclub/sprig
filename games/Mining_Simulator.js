
/* 
@title: Mining_Simulator
@author: MiniCube11
@tags: ['simulation']
@img: ""
@addedOn: 2023-04-10
*/

    /*
A D to move player
W S to move cursor
J to dig
K to place
I to toggle stats
*/

// constants
const screenWidth = 8;
const screenHeight = 6;
const gameRows = 20;
const gameColumns = 20;
const maxViewingDist = 4;
const groundLevel = 5;

// sprites
const playerRight = "R";
const playerLeft = "L";
const playerDown = "D";
const cursor = "C";
const stone = "t";
const stoneSelected = "T";
const plank = "p";
const plankSelected = "P";
const sand = "s";
const sandSelected = "S";
const black = "#";
const darkGray = "+";
const healthValues = ["0", "1", "2", "3", "4", "5"];

const initialHealth = {'.': 0, [stone]: 50, [plank]: 100, [sand]: 150};

setLegend(
  [ playerRight, bitmap`
................
................
................
....88888888....
...8888888888...
...8888888888...
...8888882281111
...8888882088.01
...88888822880.1
...8888888880..1
...8888888808...
...8888888088...
....88888888....
......8..8......
......8..8......
......88.88.....` ],
  [ playerLeft, bitmap`
................
................
................
....88888888....
...8888888888...
...8888888888...
1111822888888...
10.8802888888...
1.08822888888...
1..0888888888...
...8088888888...
...8808888888...
....88888888....
......8..8......
......8..8......
.....88.88......` ],
  [ playerDown, bitmap`
................
................
................
....88888888....
...8888888888...
...8888888888...
...8822882288...
...8800880088...
...8888888888...
...8888CC8888...
...8888CC8888...
...8888CC8888...
....888CC888....
.....L8CC8L.....
......LCCL......
......8LL8......` ],
  [ stone, bitmap`
111L1LLLLL111111
LLL111L11LL1LL11
L1LLLLLLLLLLLLLL
11L1LL11LL11L111
LLLLL11LL1LLLLL1
L111LLL11111LLLL
1LLL1LLLL1111L11
1L1L111LLLL11LLL
LLLLL11L11LLLLLL
L111LLLLLLLLL111
L11LL111LL111LLL
111L1LLLL111111L
LLLLLL11LLLLLLLL
L1111L1111111111
1LLLLL11LL1L111L
11111LL1111LL111` ],
  [ stoneSelected, bitmap`
6666666666666666
6LL111L11LL1LL16
61LLLLLLLLLLLLL6
61L1LL11LL11L116
6LLLL11LL1LLLLL6
6111LLL11111LLL6
6LLL1LLLL1111L16
6L1L111LLLL11LL6
6LLLL11L11LLLLL6
6111LLLLLLLLL116
611LL111LL111LL6
611L1LLLL1111116
6LLLLL11LLLLLLL6
61111L1111111116
6LLLLL11LL1L1116
6666666666666666` ],
  [ plank, bitmap`
CCCCCCCCCCCCCCCC
LLCLLLLCLLLCLLLL
CCCCCCCCCCCCCCCC
LLLCLLLLCLLLCLLL
CCCCCCCCCCCCCCCC
CLLLLCLLLLCLLLLL
CCCCCCCCCCCCCCCC
LLLCLLLLCLLCLCLL
CCCCCCCCCCCCCCCC
CLLLLCLLLLLLLLLL
CCCCCCCCCCCCCCCC
LLLCLLLLCLLLCLLL
CCCCCCCCCCCCCCCC
CLLLLCLLLCLLLLCL
CCCCCCCCCCCCCCCC
LLCLLCLCLLLCLLLL` ],
  [ plankSelected, bitmap`
6666666666666666
6LCLLLLCLLLCLLL6
6CCCCCCCCCCCCCC6
6LLCLLLLCLLLCLL6
6CCCCCCCCCCCCCC6
6LLLLCLLLLCLLLL6
6CCCCCCCCCCCCCC6
6LLCLLLLCLLCLCL6
6CCCCCCCCCCCCCC6
6LLLLCLLLLLLLLL6
6CCCCCCCCCCCCCC6
6LLCLLLLCLLLCLL6
6CCCCCCCCCCCCCC6
6LLLLCLLLCLLLLC6
6CCCCCCCCCCCCCC6
6666666666666666` ],
  [ sand, bitmap`
FFFFFFFFFFFFFFFF
F6666FFFFFFFFFFF
F6FFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
F6FFFFFFFFFFFFFF
F6FFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF` ],
  [ sandSelected, bitmap`
6666666666666666
66666FFFFFFFFFF6
66FFFFFFFFFFFFF6
6FFFFFFFFFFFFFF6
66FFFFFFFFFFFFF6
66FFFFFFFFFFFFF6
6FFFFFFFFFFFFFF6
6FFFFFFFFFFFFFF6
6FFFFFFFFFFFFFF6
6FFFFFFFFFFFFFF6
6FFFFFFFFFFFFFF6
6FFFFFFFFFFFFFF6
6FFFFFFFFFFFFFF6
6FFFFFFFFFFFFFF6
6FFFFFFFFFFFFFF6
6666666666666666` ],
  [ cursor, bitmap`
6666666666666666
6..............6
6..............6
6..............6
6..............6
6..............6
6..............6
6..............6
6..............6
6..............6
6..............6
6..............6
6..............6
6..............6
6..............6
6666666666666666` ],
  [ black, bitmap`
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
  [ darkGray, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL` ],
  [ healthValues[5], bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0HHHHHHHHHHHHHH0
0HHHHHHHHHHHHHH0
0HHHHHHHHHHHHHH0
0HHHHHHHHHHHHHH0
0HHHHHHHHHHHHHH0
0HHHHHHHHHHHHHH0
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000` ],
  [ healthValues[4], bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0888HHHHHHHHHHH0
0888HHHHHHHHHHH0
0888HHHHHHHHHHH0
0888HHHHHHHHHHH0
0888HHHHHHHHHHH0
0888HHHHHHHHHHH0
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000` ],
  [ healthValues[3], bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0888888HHHHHHHH0
0888888HHHHHHHH0
0888888HHHHHHHH0
0888888HHHHHHHH0
0888888HHHHHHHH0
0888888HHHHHHHH0
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000` ],
  [ healthValues[2], bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0888888888HHHHH0
0888888888HHHHH0
0888888888HHHHH0
0888888888HHHHH0
0888888888HHHHH0
0888888888HHHHH0
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000` ],
  [ healthValues[1], bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0888888888888HH0
0888888888888HH0
0888888888888HH0
0888888888888HH0
0888888888888HH0
0888888888888HH0
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000` ],
  [ healthValues[0], bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0888888888888880
0888888888888880
0888888888888880
0888888888888880
0888888888888880
0888888888888880
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000` ],
)

// generate map
let gameMap = [];
let blockHealth = [];

for (let i=0; i<gameRows; ++i) {
  let gameRow = [];
  let healthRow = [];
  for (let j=0; j<gameColumns; ++j) {
    let rand = Math.random();
    let tile = stone;
    if (rand > 0.33)
      tile = plank;
    if (rand > 0.66)
      tile = sand;
    if (i<=groundLevel)
      tile = '.';
    gameRow.push(tile);
    healthRow.push(initialHealth[tile]);
  }
  gameMap.push(gameRow);
  blockHealth.push(healthRow);
}

// player
let playerCol = gameColumns / 2;
let playerRow = groundLevel;
let playerDirection = 1;
let cursorHeight = 0;
let cursorRow = playerRow;
let cursorCol = playerCol + 1;
let digging = false;
let blocksMined = 1;
let statsShow = true;
let tutorial = 1;

onInput("i", () => {
  statsShow = !statsShow;
});

onInput("j", () => {
  digging = true;
});

onInput("k", () => {
  place();
});

onInput("w", () => {
  moveCursor(-1);
});

onInput("s", () => {
  moveCursor(1);
});

onInput("a", () => {
  movePlayer(-1);
});

onInput("d", () => {
  movePlayer(1);  
});

afterInput(() => {
  // console.log("yes");
});

// movement
function updateCursorPos() {
  cursorRow = playerRow;
  cursorCol = playerCol + playerDirection;
  if (Math.abs(cursorHeight) >= 1) cursorRow += cursorHeight / Math.abs(cursorHeight);
  if (Math.abs(cursorHeight) == 2) cursorCol = playerCol;
}

function moveCursor(direction) {
  if (tutorial == 2) tutorial++;
  cursorHeight += direction;
  if (Math.abs(cursorHeight) > 2) cursorHeight -= direction;
  updateCursorPos();
}

function movePlayer(direction) {
  if (tutorial == 1) tutorial++;
  playerDirection = direction;
  cursorHeight = 0;
  let newCol = playerCol + direction;
  if (newCol < 0 || newCol > gameColumns - 1) return;
  if (gameMap[playerRow][newCol] == '.')
    playerCol = newCol;
  else if (playerRow > 0 && gameMap[playerRow - 1][newCol] == '.' && gameMap[playerRow - 1][playerCol] == '.')
    playerRow--, playerCol = newCol;
  updateCursorPos();
}

// update
function gravity() {
  while (playerRow < gameRows - 1 && gameMap[playerRow + 1][playerCol] == '.') {
    playerRow++;
  }
  updateCursorPos();
}

function dig() {
  if (!digging) return;
  digging = false;
  if (!(0 <= cursorRow && cursorRow < gameRows && 0 <= cursorCol && cursorCol < gameColumns)) return;
  if (gameMap[cursorRow][cursorCol] == '.') return;
  if (tutorial == 3) tutorial++;
  blockHealth[cursorRow][cursorCol]-=2;
  if (blockHealth[cursorRow][cursorCol] <= 0)
    gameMap[cursorRow][cursorCol] = '.', blocksMined++;
}

function place() {
  if (blocksMined <= 0) return;
  if (cursorRow <= 0) return;
  if (gameMap[cursorRow][cursorCol] != '.') return;
  if (tutorial == 4) tutorial++;
  gameMap[cursorRow][cursorCol] = stone;
  blockHealth[cursorRow][cursorCol] = initialHealth[stone];
  blocksMined--;
}

function updateMap() {
  let startRow = Math.min(Math.max(-screenHeight / 2, playerRow - screenHeight / 2), gameRows - screenHeight);
  let startColumn = Math.min(Math.max(0, playerCol - screenWidth / 2), gameColumns - screenWidth);
  let output = [];
  for (let i=startRow; i<startRow + screenHeight; ++i) {
    for (let j=startColumn; j<startColumn + screenWidth; ++j) {
      let outputTile = '.';
      if (0<=i && i<gameRows)
        outputTile = gameMap[i][j];
      if (i==playerRow&&j==playerCol) {
        outputTile = (playerDirection == 1 ? playerRight : playerLeft);
        if (cursorHeight == 2) outputTile = playerDown;
      }
      if (i==cursorRow&&j==cursorCol) {
        if (outputTile == '.') outputTile = cursor;
        else outputTile = outputTile.toUpperCase();
      }
      let dr = Math.abs(playerRow - i);
      let dc = Math.abs(playerCol - j);
      if (dr + dc == maxViewingDist) outputTile = darkGray;
      if (dr + dc > maxViewingDist || dc == maxViewingDist) outputTile = black; 
      output.push(outputTile);
    }
    output.push('\n');
  }
  if (0 <= cursorRow && cursorRow < gameRows && 0 <= cursorCol && cursorCol < gameColumns) {
    let initial = initialHealth[gameMap[cursorRow][cursorCol]];
    let current = blockHealth[cursorRow][cursorCol];
    if (current != initial) {
      let percent = Math.round(current / initial * 5);
      output[screenWidth - 1] = healthValues[percent];
    }
  }
  setMap(output.join(''));
  
  clearText();
  if (tutorial <= 4) {
    if (tutorial == 1) addText(`A D to move player`, { x: 1, y: 14, color: color`4` });
    else if (tutorial == 2) addText(`W S to move cursor`, { x: 1, y: 14, color: color`4` });
    else if (tutorial == 3) addText(`J to mine block`, { x: 1, y: 14, color: color`4` });
    else if (tutorial == 4) addText(`K to place block`, { x: 1, y: 14, color: color`4` });
  }
  if (statsShow) {
    addText(`${playerCol}, ${playerRow}`, { x: 1, y: 1, color: color`4` });
    addText(`${blocksMined}`, { x: 1, y: 3, color: color`4` });
  }
}

function update() {
  gravity();
  dig();
  updateMap();
}

function tick() {
  update();
}

function gameLoop() {
  tick();
  setInterval(gameLoop, 30);
}

gameLoop();