
/* 
@title: Two_Player_Tetris
@author: Spectral
@tags: ['multiplayer','retro']
@addedOn: 2023-09-11
*/

    /*
A two-player game of tetris. wasd and ijkl control the left and right sides, respectively.
When one player allows the entire screen to be filled, the other player will gain a point.

Controls:
w - Rotate current block counterclockwise
a - Shift current block left
s - Drop block
d - Shift current block right

i - Rotate current block counterclockwise
j - Shift current block left
k - Drop block
l - Shift current block right
*/

class tile {
  constructor(blockType, blockState, color, player, x, y) {
    this.blockType = blockType;
    this.blockState = blockState;
    this.color = color;
    this.x = x;
    this.y = y;
    
  }

  xPos(block, state = this.blockState) { return this.blockType[state][block][0] + this.x; }
  yPos(block, state = this.blockState) { return this.blockType[state][block][1] + this.y; }
  
  collision() {
    for (let i = 0; i < 4; i++) {
      if (collisionMap[this.yPos(i)][this.xPos(i)] == 1) {
        return true;
      }
    }
    return false;
  }

  rotateLeft() {
    let prevState = this.blockState;
    
    this.blockState = (this.blockState - 1) & 0x3;
    if (this.collision()) {
      this.blockState = prevState;
    }

    for (let i = 0; i < 4; i++) {
      clearTile(this.xPos(i, prevState), this.yPos(i, prevState));
      addSprite(this.xPos(i, prevState), this.yPos(i, prevState), background);
    }
    for (let i = 0; i < 4; i++) {
      addSprite(this.xPos(i), this.yPos(i), this.color);
    }
  }
  
  rotateRight() {
    let prevState = this.blockState;
    
    this.blockState = (this.blockState + 1) & 0x3;
    if (this.collision()) {
      this.blockState = prevState;
    }
    
    for (let i = 0; i < 4; i++) {
      clearTile(this.xPos(i, prevState), this.yPos(i, prevState));
      addSprite(this.xPos(i, prevState), this.yPos(i, prevState), background);
    }
    for (let i = 0; i < 4; i++) {
      addSprite(this.xPos(i), this.yPos(i), this.color);
    }
  }

  shiftLeft() {
    this.x--;
    if (this.collision()) {
      this.x++;
    }

    for (let i = 0; i < 4; i++) {
      clearTile(this.xPos(i) + 1, this.yPos(i));
      addSprite(this.xPos(i) + 1, this.yPos(i), background);
    }
    for (let i = 0; i < 4; i++) {
      addSprite(this.xPos(i), this.yPos(i), this.color);
    }
  }

  shiftRight() {
    this.x++;
    if (this.collision()) {
      this.x--;
    }

    for (let i = 0; i < 4; i++) {
      clearTile(this.xPos(i) - 1, this.yPos(i));
      addSprite(this.xPos(i) - 1, this.yPos(i), background);
    }
    for (let i = 0; i < 4; i++) {
      addSprite(this.xPos(i), this.yPos(i), this.color);
    }
  }

  shiftDown() {
    this.y++;
    if (this.collision()) {
      this.y--;
      return false;
    }
    
    for (let i = 0; i < 4; i++) {
      clearTile(this.xPos(i), this.yPos(i) - 1);
      addSprite(this.xPos(i), this.yPos(i) - 1, background);
    }
    for (let i = 0; i < 4; i++) {
      addSprite(this.xPos(i), this.yPos(i), this.color);
    }
    
    return true;
  }

  drop() {
    let yOffset = this.y;
    
    while (!this.collision()) {
      this.y++;
    }
    this.y--;

    yOffset -= this.y;

    for (let i = 0; i < 4; i++) {
      clearTile(this.xPos(i), this.yPos(i) + yOffset);
      addSprite(this.xPos(i), this.yPos(i) + yOffset, background);
    }
    for (let i = 0; i < 4; i++) {
      addSprite(this.xPos(i), this.yPos(i), this.color);
    }
  }

  writeCollision() {
    for (let i = 0; i < 4; i++) {
      collisionMap[this.yPos(i)][this.xPos(i)] = 1;
    }
  }
}

const side = "|";
const bottom = "-";
const corner = "#";

const redTile = "r";
const orangeTile = "o";
const yellowTile = "y";
const greenTile = "g";
const blueTile = "b";
const purpleTile = "p";
const magentaTile = "m";
const garbageTile = "t";
const background = "*";

const tPiece = [
  [[1,1],[0,1],[1,0],[2,1]],
  [[1,1],[1,0],[2,1],[1,2]],
  [[1,1],[2,1],[1,2],[0,1]],
  [[1,1],[1,2],[0,1],[1,0]]
];
const iPiece = [
  [[0,0],[1,0],[2,0],[3,0]],
  [[0,0],[0,1],[0,2],[0,3]],
  [[0,0],[1,0],[2,0],[3,0]],
  [[0,0],[0,1],[0,2],[0,3]]
];
const bPiece = [
  [[0,0],[0,1],[1,0],[1,1]],
  [[0,0],[0,1],[1,0],[1,1]],
  [[0,0],[0,1],[1,0],[1,1]],
  [[0,0],[0,1],[1,0],[1,1]]
];
const lPiece = [
  [[1,1],[1,0],[1,2],[2,2]],
  [[1,1],[2,1],[0,1],[0,2]],
  [[1,1],[1,2],[1,0],[0,0]],
  [[1,1],[0,1],[2,1],[2,0]]
];
const jPiece = [
  [[1,1],[1,0],[0,2],[1,2]],
  [[1,1],[2,1],[0,1],[0,0]],
  [[1,1],[1,2],[1,0],[2,0]],
  [[1,1],[0,1],[2,1],[2,2]]
];
const zPiece = [
  [[1,1],[0,0],[1,0],[2,1]],
  [[1,1],[1,0],[0,1],[0,2]],
  [[1,1],[0,0],[1,0],[2,1]],
  [[1,1],[1,0],[0,1],[0,2]]
];
const sPiece = [
  [[1,1],[1,0],[2,0],[0,1]],
  [[1,1],[0,0],[0,1],[1,2]],
  [[1,1],[1,0],[2,0],[0,1]],
  [[1,1],[0,0],[0,1],[1,2]]
];

const pieces = [tPiece, iPiece, bPiece, lPiece, jPiece, zPiece, sPiece];
const tiles = [redTile, orangeTile, yellowTile, greenTile, blueTile, purpleTile, magentaTile];

var player1Tile;
var player2Tile;

var player1Score = 0;
var player2Score = 0;

var loopInterval;
var dropInterval = 1000;

var collisionMap = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];

var player1ColorMap = [
  ["#","#","#","#","#","#","#","#","#","#","#","#"],
  ["#","*","*","*","*","*","*","*","*","*","*","#"],
  ["#","*","*","*","*","*","*","*","*","*","*","#"],
  ["#","*","*","*","*","*","*","*","*","*","*","#"],
  ["#","*","*","*","*","*","*","*","*","*","*","#"],
  ["#","*","*","*","*","*","*","*","*","*","*","#"],
  ["#","*","*","*","*","*","*","*","*","*","*","#"],
  ["#","*","*","*","*","*","*","*","*","*","*","#"],
  ["#","*","*","*","*","*","*","*","*","*","*","#"],
  ["#","*","*","*","*","*","*","*","*","*","*","#"],
  ["#","*","*","*","*","*","*","*","*","*","*","#"],
  ["#","*","*","*","*","*","*","*","*","*","*","#"],
  ["#","*","*","*","*","*","*","*","*","*","*","#"],
  ["#","*","*","*","*","*","*","*","*","*","*","#"],
  ["#","*","*","*","*","*","*","*","*","*","*","#"],
  ["#","*","*","*","*","*","*","*","*","*","*","#"],
  ["#","*","*","*","*","*","*","*","*","*","*","#"],
  ["#","*","*","*","*","*","*","*","*","*","*","#"],
  ["#","*","*","*","*","*","*","*","*","*","*","#"],
  ["#","*","*","*","*","*","*","*","*","*","*","#"],
  ["#","*","*","*","*","*","*","*","*","*","*","#"],
  ["#","#","#","#","#","#","#","#","#","#","#","#"],
];

var player2ColorMap = [
  ["#","#","#","#","#","#","#","#","#","#","#","#"],
  ["#","*","*","*","*","*","*","*","*","*","*","#"],
  ["#","*","*","*","*","*","*","*","*","*","*","#"],
  ["#","*","*","*","*","*","*","*","*","*","*","#"],
  ["#","*","*","*","*","*","*","*","*","*","*","#"],
  ["#","*","*","*","*","*","*","*","*","*","*","#"],
  ["#","*","*","*","*","*","*","*","*","*","*","#"],
  ["#","*","*","*","*","*","*","*","*","*","*","#"],
  ["#","*","*","*","*","*","*","*","*","*","*","#"],
  ["#","*","*","*","*","*","*","*","*","*","*","#"],
  ["#","*","*","*","*","*","*","*","*","*","*","#"],
  ["#","*","*","*","*","*","*","*","*","*","*","#"],
  ["#","*","*","*","*","*","*","*","*","*","*","#"],
  ["#","*","*","*","*","*","*","*","*","*","*","#"],
  ["#","*","*","*","*","*","*","*","*","*","*","#"],
  ["#","*","*","*","*","*","*","*","*","*","*","#"],
  ["#","*","*","*","*","*","*","*","*","*","*","#"],
  ["#","*","*","*","*","*","*","*","*","*","*","#"],
  ["#","*","*","*","*","*","*","*","*","*","*","#"],
  ["#","*","*","*","*","*","*","*","*","*","*","#"],
  ["#","*","*","*","*","*","*","*","*","*","*","#"],
  ["#","#","#","#","#","#","#","#","#","#","#","#"],
];

var display = map`
#----------#----------#
|**********|**********|
|**********|**********|
|**********|**********|
|**********|**********|
|**********|**********|
|**********|**********|
|**********|**********|
|**********|**********|
|**********|**********|
|**********|**********|
|**********|**********|
|**********|**********|
|**********|**********|
|**********|**********|
|**********|**********|
|**********|**********|
|**********|**********|
|**********|**********|
|**********|**********|
|**********|**********|
#----------#----------#`;


setLegend(
  [side, bitmap`
LLLLL111111LLLLL
LLLLL111111LLLLL
LLLLL111111LLLLL
LLLLL111111LLLLL
LLLLL111111LLLLL
LLLLL111111LLLLL
LLLLL111111LLLLL
LLLLL111111LLLLL
LLLLL111111LLLLL
LLLLL111111LLLLL
LLLLL111111LLLLL
LLLLL111111LLLLL
LLLLL111111LLLLL
LLLLL111111LLLLL
LLLLL111111LLLLL
LLLLL111111LLLLL`],
  [bottom, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],
  [corner, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLL11111111LLLL
LLLL11111111LLLL
LLLL11111111LLLL
LLLL11111111LLLL
LLLL11111111LLLL
LLLL11111111LLLL
LLLL11111111LLLL
LLLL11111111LLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],
  [redTile, bitmap`
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333`],
  [orangeTile, bitmap`
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
9999999999999999`],
  [yellowTile, bitmap`
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666`],
  [greenTile, bitmap`
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444`],
  [blueTile, bitmap`
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
7777777777777777`],
  [purpleTile, bitmap`
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH`],
  [magentaTile, bitmap`
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888`],
  [garbageTile, bitmap`
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
LLLLLLLLLLLLLLLL`],
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
)

setSolids([side, bottom, redTile, orangeTile, yellowTile, greenTile, blueTile, purpleTile]);

setMap(display);

function clearedLine(colorMap) {
  let clearedLineFound = false;
  let isClearedLine = true;
  
  for (let i = 20; i >= 1; i--) {
    isClearedLine = true;
    for (let j = 1; j <= 9; j++) {
      if (colorMap[i][j] == "*") {
        isClearedLine = false;
        break;
      }
    }
    
    if (isClearedLine == true) {
      clearedLineFound = true;
      colorMap.splice(i, 1);
      colorMap[0] = ["#","*","*","*","*","*","*","*","*","*","*","#"];
      colorMap.unshift(["#","#","#","#","#","#","#","#","#","#","#","#"]);
      i++;
    }
  }

  return clearedLineFound;
}
      
function init() {
  let player1Block = Math.floor(Math.random() * 6);
  let player2Block = Math.floor(Math.random() * 6);

  dropInterval = 1000;
  
  collisionMap = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
  ];
  
  player1ColorMap = [
    ["#","#","#","#","#","#","#","#","#","#","#","#"],
    ["#","*","*","*","*","*","*","*","*","*","*","#"],
    ["#","*","*","*","*","*","*","*","*","*","*","#"],
    ["#","*","*","*","*","*","*","*","*","*","*","#"],
    ["#","*","*","*","*","*","*","*","*","*","*","#"],
    ["#","*","*","*","*","*","*","*","*","*","*","#"],
    ["#","*","*","*","*","*","*","*","*","*","*","#"],
    ["#","*","*","*","*","*","*","*","*","*","*","#"],
    ["#","*","*","*","*","*","*","*","*","*","*","#"],
    ["#","*","*","*","*","*","*","*","*","*","*","#"],
    ["#","*","*","*","*","*","*","*","*","*","*","#"],
    ["#","*","*","*","*","*","*","*","*","*","*","#"],
    ["#","*","*","*","*","*","*","*","*","*","*","#"],
    ["#","*","*","*","*","*","*","*","*","*","*","#"],
    ["#","*","*","*","*","*","*","*","*","*","*","#"],
    ["#","*","*","*","*","*","*","*","*","*","*","#"],
    ["#","*","*","*","*","*","*","*","*","*","*","#"],
    ["#","*","*","*","*","*","*","*","*","*","*","#"],
    ["#","*","*","*","*","*","*","*","*","*","*","#"],
    ["#","*","*","*","*","*","*","*","*","*","*","#"],
    ["#","*","*","*","*","*","*","*","*","*","*","#"],
    ["#","#","#","#","#","#","#","#","#","#","#","#"],
  ];
  
  player2ColorMap = [
    ["#","#","#","#","#","#","#","#","#","#","#","#"],
    ["#","*","*","*","*","*","*","*","*","*","*","#"],
    ["#","*","*","*","*","*","*","*","*","*","*","#"],
    ["#","*","*","*","*","*","*","*","*","*","*","#"],
    ["#","*","*","*","*","*","*","*","*","*","*","#"],
    ["#","*","*","*","*","*","*","*","*","*","*","#"],
    ["#","*","*","*","*","*","*","*","*","*","*","#"],
    ["#","*","*","*","*","*","*","*","*","*","*","#"],
    ["#","*","*","*","*","*","*","*","*","*","*","#"],
    ["#","*","*","*","*","*","*","*","*","*","*","#"],
    ["#","*","*","*","*","*","*","*","*","*","*","#"],
    ["#","*","*","*","*","*","*","*","*","*","*","#"],
    ["#","*","*","*","*","*","*","*","*","*","*","#"],
    ["#","*","*","*","*","*","*","*","*","*","*","#"],
    ["#","*","*","*","*","*","*","*","*","*","*","#"],
    ["#","*","*","*","*","*","*","*","*","*","*","#"],
    ["#","*","*","*","*","*","*","*","*","*","*","#"],
    ["#","*","*","*","*","*","*","*","*","*","*","#"],
    ["#","*","*","*","*","*","*","*","*","*","*","#"],
    ["#","*","*","*","*","*","*","*","*","*","*","#"],
    ["#","*","*","*","*","*","*","*","*","*","*","#"],
    ["#","#","#","#","#","#","#","#","#","#","#","#"],
  ];
  
  display = map`
#----------#----------#
|**********|**********|
|**********|**********|
|**********|**********|
|**********|**********|
|**********|**********|
|**********|**********|
|**********|**********|
|**********|**********|
|**********|**********|
|**********|**********|
|**********|**********|
|**********|**********|
|**********|**********|
|**********|**********|
|**********|**********|
|**********|**********|
|**********|**********|
|**********|**********|
|**********|**********|
|**********|**********|
#----------#----------#`;
  setMap(display);

  player1Tile = new tile(pieces[player1Block], 0, tiles[player1Block], 1, 5, 1);
  player2Tile = new tile(pieces[player2Block], 0, tiles[player2Block], 2, 15, 1);
}

function gameLoop() {
  let player1Block = Math.floor(Math.random() * 6);
  let player2Block = Math.floor(Math.random() * 6);
  let redrawPlayer1 = false;
  let redrawPlayer2 = false;

  redrawPlayer1 = clearedLine(player1ColorMap);
  redrawPlayer2 = clearedLine(player2ColorMap);

  if (redrawPlayer1) {
    for (let i = 1; i < 21; i++) {
      for (let j = 1; j < 11; j++) {
        clearTile(j, i);
        addSprite(j, i, player1ColorMap[i][j]);
        collisionMap[i][j] = (player1ColorMap[i][j] != "*");
      }
    }
  }

  if (redrawPlayer2) {
    for (let i = 1; i < 21; i++) {
      for (let j = 1; j < 11; j++) {
        clearTile(j + 11, i);
        addSprite(j + 11, i, player2ColorMap[i][j]);
        collisionMap[i][j + 11] = (player2ColorMap[i][j] != "*");
      }
    }
  }
  
  if (player1Tile.collision() || player2Tile.collision()) {
    player1Score += player2Tile.collision();
    player2Score += player1Tile.collision();
    init();
  }
  
  if (!player1Tile.shiftDown()) {
    player1Tile.writeCollision();
    for (let i = 0; i < 4; i++) {
      player1ColorMap[player1Tile.yPos(i)][player1Tile.xPos(i)] = player1Tile.color;
    }
    player1Tile = new tile(pieces[player1Block], 0, tiles[player1Block], 1, 5, 1);
    for (let i = 0; i < 4; i++) {
      addSprite(player1Tile.xPos(i), player1Tile.yPos(i), player1Tile.color);
    }
  }
  
  if (!player2Tile.shiftDown()) {
    player2Tile.writeCollision();
    for (let i = 0; i < 4; i++) {
      player2ColorMap[player2Tile.yPos(i)][player2Tile.xPos(i) - 11] = player2Tile.color;
    }
    player2Tile = new tile(pieces[player2Block], 0, tiles[player2Block], 2, 16, 1);
    for (let i = 0; i < 4; i++) {
      addSprite(player2Tile.xPos(i), player2Tile.yPos(i), player2Tile.color);
    }
  }

  clearText();

  addText(player1Score.toString(), {
    x: 0,
    y: 0,
    color: color`2`
  })

  addText(player2Score.toString(), {
    x: 18,
    y: 0,
    color: color`2`
  })

  clearInterval(loopInterval);
  dropInterval = Math.ceil(dropInterval * 0.99);
  loopInterval = setInterval(gameLoop, dropInterval);
}

onInput("w", () => { player1Tile.rotateLeft(); })
onInput("a", () => { player1Tile.shiftLeft(); })
onInput("s", () => { player1Tile.drop(); })
onInput("d", () => { player1Tile.shiftRight(); })

onInput("i", () => { player2Tile.rotateLeft(); })
onInput("j", () => { player2Tile.shiftLeft(); })
onInput("k", () => { player2Tile.drop(); })
onInput("l", () => { player2Tile.shiftRight(); })

init();
loopInterval = setInterval(gameLoop, dropInterval);
