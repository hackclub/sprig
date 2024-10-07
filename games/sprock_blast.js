/*
@title: Sprock Blast
@author: cayleb247
@tags: ['puzzle', 'retro']
@addedOn: 2024-10-03
*/

/*
CONTROLS:
W - Move cursor up
S - Move cursor down
A - Move block one position to the left
D - Move Block one position to the right
J - Selected a block | Place a block
L - Cancel block selection
I - Restart game (at game over)


Glossary for comments:
Brick - An individual bitmap of a brick; makes up blocks
Blocks - A block made of bricks with a unique shape (L, T, Square, etc.)
Tile - A 3x3 sized space within the board
Position - A tile on the board that is able for a block to be placed within
*/

const player = "p"
let blockSelection = []
let blockPreviewStatus = 0; // Status of whether block outline is within the board
let blockPosition = 0; // Index of a current shown block position
let tileList = [] // List of the every single 3x3 tile's configuration on the board
let positionList = []; // Indexes of every position that the block can be on the board
let blockSelectionIndexes = []; // List of every index of the selected block that a brick present
let currentPositionIndex = 0;
let blockChoice = 0; // The block out of the three offered that the player selects
let availableBlocks = []; // List of every block left (starting from top; 1 through 3)
let score = 0; // Player's score
let combo = 0; // Default value for combos
let gameStatus = 1; // Whether the game is active or not

// Block Indexes
const blockCombos = [
  [0,3,4,7], // s
  [4,5,6,7], // s2
  [1,3,4,6], // sInv
  [3,4,7,8], // sInv2
  [0,3,6,7], // L
  [3,4,5,6], // L2
  [0,1,4,7], // L3
  [5,6,7,8], // L4
  [1,4,6,7], // lInv
  [3,6,7,8], // lInv2
  [0,1,3,6], // lInv3
  [3,4,5,8], // lInv4
  [0,1,2,3,6], // bigL
  [0,1,2,5,8], // bigL2
  [2,5,6,7,8], // bigL3
  [0,3,6,7,8], // bigL4
  [3,6,7], // smallL
  [3,4,6], // smallL2
  [3,4,7], // smallL3
  [4,6,7], // smallL4
  [6], // dot
  [3,6], // line
  [6,7], // line2
  [0,3,6], // bigLine
  [6,7,8], // bigLine2
  [1,3,4,7], // t
  [4,6,7,8], // t2
  [0,3,4,6], // t3
  [3,4,5,7], // t4
  [0,1,2,4,7], // bigT
  [2,3,4,5,8], // bigT2
  [1,4,6,7,8], // bigT3
  [0,3,4,5,6], // bigT4
  [0,1,3,4,6,7], // rect
  [3,4,5,6,7,8], // rect2
  [3,4,6,7], // cube
  [0,1,2,3,4,5,6,7,8], // bigcube
  [1,3,4,5,7] // plus
]

// Block Colors
const blockColors = [
  "1", // pink
  "2", // yellow
  "3", // red
  "4", // blue
  "5", // green
  "6" // orange
]


// Board
const background = "x"
const board_top_left_corner = "a"
const board_top_middle = "b"
const board_top_right_corner = "c"
const board_right_middle = "d"
const board_bottom_right_corner = "e"
const board_bottom_middle = "f"
const board_bottom_left_corner = "g"
const board_left_middle = "h"

// Block Pieces:
const block1 = "1"
const block2 = "2"
const block3 = "3"
const block4 = "4"
const block5 = "5"
const block6 = "6"

// Misc Sprites:
const selection = "s"
const brickDivideLeft = "v"
const brickDivideCenter = "y"
const brickDivideRight = "z"


// Functions:

function getTileValue(x, y) { // Get the information for a select 3x3 tile
  let tileData = []; // List for every brick in a 3x3 tile
  x += 2; // To adjust x value to start at right value during first iteration
  y -= 1;
  for (let i=0;i<3;i++) {
    x -= 3; // Reset x coordinate every shift down in y
    y += 1;
    for (let i=0;i<3;i++) {
      x += 1;
      tileData.push(getTile(x,y));
    }
  }
  return tileData;
}
    


function getTileList() { // Get information on every 3x3 tile on board
  tileList = [];
  for (let y=1;y<=8;y++) {
    for (let x=1;x<=8;x++) {
      tileList.push(getTileValue(x,y));
    }
  }
}


function makePositionList() { // Iterate through every postion and check if space is available

  positionList = []; // Begin with an empty list of positions

  for (let i=0;i<=63;i++) {
    let isPlaceable = 1;
    for (const index of blockSelectionIndexes) {
      if (tileList[i][index].length == 0) {
        isPlaceable = 0;
        break;
      } else if (tileList[i][index][0]["_type"] !== "x") {
        isPlaceable = 0;
        break;
      }
    
    }
    if (isPlaceable === 1) {
      positionList.push(i);
    }
  }

  if (positionList.length == 0) { // Condition to end the game
    endGame();
  }
}

function getSelectedBlockIndexes() {
  
  for (let i=0;i<=8;i++) { // Get block selection's indexes
    if (blockSelection[i].length !== 0) {
      blockSelectionIndexes.push(i)
    }
  }
}

function displayPosition(positionIndex) { // Display selection for a select postion on position list

  if (gameStatus == 1) { // Seems redundant but prevents a type error when the game ends
    let currentPosition = tileList[positionIndex];

    for (const blockIndex of blockSelectionIndexes) {

      addSprite(currentPosition[blockIndex][0]["_x"], currentPosition[blockIndex][0]["_y"], "s");
    }
  
  }
  
 
}

function removeDisplayPosition(positionIndex) { // Remove selection for a select postion on position list
  let currentPosition = tileList[positionIndex];

  for (const blockIndex of blockSelectionIndexes) {

    clearTile(currentPosition[blockIndex][0]["_x"], currentPosition[blockIndex][0]["_y"]);
    addSprite(currentPosition[blockIndex][0]["_x"], currentPosition[blockIndex][0]["_y"], "x")
  }
  
}

function placeBlock(positionIndex) { // Places a block given an index for the position on the board
  let currentPosition = tileList[positionIndex]; // Declares current position given the position index
  
  for (const blockIndex of blockSelectionIndexes) { // Add corresponding colored bricks

    addSprite(currentPosition[blockIndex][0]["_x"], currentPosition[blockIndex][0]["_y"], blockSelection[blockSelectionIndexes[0]][0]["_type"]);
  }
}

function clearBlockChoice(block_number) {
  if (block_number == 1) {
    
    for (let y=1;y<=3;y++) {
        for (let x=12;x<=14;x++) {
          clearTile(x,y);
        }
    }
          
  } else if (block_number == 2) {
    for (let y=5;y<=7;y++) {
        for (let x=12;x<=14;x++) {
          clearTile(x,y);
        }
    }

    
  } else if (block_number == 3) {

    for (let y=9;y<=11;y++) {
        for (let x=12;x<=14;x++) {
          clearTile(x,y);
    
        }
      }

  }
}

function getRandomInt(max) { // Returns a random number between 0 and the max (not including the max)
  return Math.floor(Math.random()*max);
}


function newBlocks() { // Generates a new set of three blocks
  if (availableBlocks.length == 0) {


    let threeBlockCoords = [
    [[12,1], [13,1], [14,1], [12,2], [13,2], [14,2], [12,3], [13,3], [14,3]],
    [[12,5], [13,5], [14,5], [12,6], [13,6], [14,6], [12,7], [13,7], [14,7]],
    [[12,9], [13,9], [14,9], [12,10], [13,10], [14,10], [12,11], [13,11], [14,11]]
    ];

    let selectedBlocks = []; // A list of three random blocks
    let selectedColors = []; // A list of three random colors
    
    for (let i=1; i<=3; i++) {
      selectedBlocks.push(blockCombos[getRandomInt(blockCombos.length)]);
      
      selectedColors.push(blockColors[getRandomInt(blockColors.length)]);
    }
    
    for (let i=0;i<=2;i++) {
      let block = selectedBlocks[i]; // Iterate through each block and color
      let color = selectedColors[i];
      let coords = threeBlockCoords[i]

      for (const blockIndex of block) {
        addSprite(coords[blockIndex][0], coords[blockIndex][1], color);
      }
    }
    
    availableBlocks = [1,2,3];
  }
  
}

function getRows() {
  let rows = [];
  let currentRow = [];
  for (let y=3;y<=10;y++) {
    currentRow = [];
    for (let x=1;x<=8;x++) {
      currentRow.push(getTile(x,y));
    }
    rows.push(currentRow);
  }
  return rows;
  
}

function getColumns() {
  let columns = [];
  let currentColumn = [];
  for (let x=1;x<=8;x++) {
    currentColumn = [];
    for (let y=3;y<=10;y++) {
      currentColumn.push(getTile(x,y));
    }
    columns.push(currentColumn);
  }
  return columns;
}

function blockClear() {

  let rowsList = getRows(); // Get list of very row
  let columnsList = getColumns(); // Get list of very column
  
  let rowsToClear = []; // List of every full row
  let columnsToClear = []; // List of every full column

  for (const row of rowsList) { // Push index of every full row (0-7)
    let currentRow = [];
    for (let i=0;i<=7;i++) {
      if (row[i].length == 2) {
        currentRow.push(i);
    }
    }
    if (currentRow.length == 8) {
      rowsToClear.push(rowsList.indexOf(row));
    }
  }
    for (const column of columnsList) { // Push index of every full column (0-7)
      let currentColumn = [];
      for (let i=0;i<=7;i++) {
      if (column[i].length == 2) {
        currentColumn.push(i);
    }
    }
    if (currentColumn.length == 8) {
      columnsToClear.push(columnsList.indexOf(column));
    }
  }

  if (rowsToClear.length != 0 && columnsToClear.length != 0) { // Scoring if both a row and column is cleared
    for (const rowIndex of rowsToClear) {
      score += 10; // Add 10 for a row complete
      for (const removedBrick of rowsList[rowIndex]) {
        clearTile(removedBrick[0]["_x"], removedBrick[0]["_y"]);
        addSprite(removedBrick[0]["_x"], removedBrick[0]["_y"], "x");
      }
    }
    for (const colIndex of columnsToClear) {
      score += 10; // Add 10 for a column complete
      for (const removedBrick of columnsList[colIndex]) {
        clearTile(removedBrick[0]["_x"], removedBrick[0]["_y"]);
        addSprite(removedBrick[0]["_x"], removedBrick[0]["_y"], "x");
      }
    }
    score += combo * 10; // Add combo score
    combo += 1; // Level up combo
  } else if (rowsToClear.length != 0) { // Scoring if a row is cleared
    for (const rowIndex of rowsToClear) {
      score += 10; 
      for (const removedBrick of rowsList[rowIndex]) {
        clearTile(removedBrick[0]["_x"], removedBrick[0]["_y"]);
        addSprite(removedBrick[0]["_x"], removedBrick[0]["_y"], "x");
      }
    }
    score += combo * 10;
    combo += 1;
  } else if (columnsToClear.length != 0) { // Scoring if a column is cleared
    for (const colIndex of columnsToClear) {
      score += 10;
      for (const removedBrick of columnsList[colIndex]) {
        clearTile(removedBrick[0]["_x"], removedBrick[0]["_y"]);
        addSprite(removedBrick[0]["_x"], removedBrick[0]["_y"], "x");
      }
    }
    score += combo * 10;
    combo += 1;
  } else {
    combo = 0; // Combo resets if no rows or columns are cleared
  }
  
  
  clearText(); // Remove previous score
  
  addText("SCORE:" + score, {
  x: 1,
  y: 1,
  color: color`2`
  })
}

function endGame() {
  gameStatus = 0;
    setMap(levels[1]);
    clearText();
    addText("GAME OVER!", {
      x: 5,
      y: 6,
      color: color`2`
      
    })
    addText("Score:", {
      x: 2,
      y: 8,
      color: color`2`
      
    })
    addText(score.toString(), {
      x: 8,
      y: 8,
      color: color`2`
      
    })
    addText("Play again?  <i>", {
      x: 2,
      y: 12,
      color: color`2`
      
    })
}

function restartGame() {
  gameStatus = 1; // Replay the game
  
  blockPreviewStatus = 0;
  
  setMap(levels[0]);
  
  clearText();
  
  score = 0;
  
  availableBlocks = [];
  
  addText("SCORE:" + score, {
  x: 1,
  y: 1,
  color: color`2`
  })

  newBlocks();
}


setLegend(
  [ selection, bitmap`
..22..22..22..22
..22..22..22..22
22..22..22..22..
22..22..22..22..
..22..22..22..22
..22..22..22..22
22..22..22..22..
22..22..22..22..
..22..22..22..22
..22..22..22..22
22..22..22..22..
22..22..22..22..
..22..22..22..22
..22..22..22..22
22..22..22..22..
22..22..22..22..`],
  [ player, bitmap`
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222`],
  [ board_top_left_corner, bitmap`
22LLLLLLLLLLLLLL
222LLLLLLLLLLLLL
L221111111111111
LL12111111111111
LL11LLLLLLLLLLLL
LL11LLLLLLLLLLLL
LL11LLL111111111
LL11LL1111111111
LL11LL1111111111
LL11LL1111111111
LL11LL1111111111
LL11LL111111LLLL
LL11LL11111LLLLL
LL11LL11111LLLLL
LL11LL11111LLL11
LL11LL11111LLL11`],
  [ board_top_middle, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
1111111111111111
1111111111111111
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
1111111111111111
1111111111111111`],
  [ board_top_right_corner, bitmap`
LLLLLLLLLLLLLL22
LLLLLLLLLLLLL222
111111111111122L
11111111111121LL
LLLLLLLLLLLL11LL
LLLLLLLLLLLL11LL
111111111LLL11LL
1111111111LL11LL
1111111111LL11LL
1111111111LL11LL
1111111111LL11LL
LLLL111111LL11LL
LLLLL11111LL11LL
LLLLL11111LL11LL
11LLL11111LL11LL
11LLL11111LL11LL`],
  [ board_right_middle, bitmap`
11LLL11111LL11LL
11LLL11111LL11LL
11LLL11111LL11LL
11LLL11111LL11LL
11LLL11111LL11LL
11LLL11111LL11LL
11LLL11111LL11LL
11LLL11111LL11LL
11LLL11111LL11LL
11LLL11111LL11LL
11LLL11111LL11LL
11LLL11111LL11LL
11LLL11111LL11LL
11LLL11111LL11LL
11LLL11111LL11LL
11LLL11111LL11LL`],
  [ board_bottom_right_corner,bitmap`
11LLL11111LL11LL
11LLL11111LL11LL
LLLLL11111LL11LL
LLLLL11111LL11LL
LLLL111111LL11LL
1111111111LL11LL
1111111111LL11LL
1111111111LL11LL
1111111111LL11LL
111111111LLL11LL
LLLLLLLLLLLL11LL
LLLLLLLLLLLL11LL
11111111111121LL
111111111111122L
LLLLLLLLLLLLL222
LLLLLLLLLLLLLL22`],
  [ board_bottom_middle, bitmap`
1111111111111111
1111111111111111
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
1111111111111111
1111111111111111
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],
  [ board_bottom_left_corner, bitmap`
LL11LL11111LLL11
LL11LL11111LLL11
LL11LL11111LLLLL
LL11LL11111LLLLL
LL11LL111111LLLL
LL11LL1111111111
LL11LL1111111111
LL11LL1111111111
LL11LL1111111111
LL11LLL111111111
LL11LLLLLLLLLLLL
LL11LLLLLLLLLLLL
LL12111111111111
L221111111111111
222LLLLLLLLLLLLL
22LLLLLLLLLLLLLL`],
  [ board_left_middle, bitmap`
LL11LL11111LLL11
LL11LL11111LLL11
LL11LL11111LLL11
LL11LL11111LLL11
LL11LL11111LLL11
LL11LL11111LLL11
LL11LL11111LLL11
LL11LL11111LLL11
LL11LL11111LLL11
LL11LL11111LLL11
LL11LL11111LLL11
LL11LL11111LLL11
LL11LL11111LLL11
LL11LL11111LLL11
LL11LL11111LLL11
LL11LL11111LLL11`],
  [ block1, bitmap`
22222222HHHHHHHH
228888888888888H
282888888888888H
H88888888888888H
H88888888888888H
H88888888888888H
H88888888888888H
H88888888888888H
H88888888888888H
H88888888888888H
H88888888888888H
H88888888888888H
H88888888888888H
H888888888888282
H888888888888822
HHHHHHHHH2222222`],
  [ block2, bitmap`
22222FFFFFFFFFFF
226666666666666F
262666666666666F
F66666666666666F
F66666666666666F
F66666666666666F
F66666666666666F
F66666666666666F
F66666666666666F
F66666666666666F
F66666666666666F
F66666666666666F
F66666666666666F
F666666666666262
F666666666666622
FFFFFFFFFFF22222`],
  [ block3, bitmap`
22222CCCCCCCCCCC
223333333333333C
232333333333333C
C33333333333333C
C33333333333333C
C33333333333333C
C33333333333333C
C33333333333333C
C33333333333333C
C33333333333333C
C33333333333333C
C33333333333333C
C33333333333333C
C333333333333232
C333333333333322
CCCCCCCCCCC22222`],
  [ block4, bitmap`
2222255555555555
2277777777777775
2727777777777775
5777777777777775
5777777777777775
5777777777777775
5777777777777775
5777777777777775
5777777777777775
5777777777777775
5777777777777775
5777777777777775
5777777777777775
5777777777777272
5777777777777722
5555555555522222`],
  [ block5, bitmap`
22222DDDDDDDDDDD
224444444444444D
242444444444444D
D44444444444444D
D44444444444444D
D44444444444444D
D44444444444444D
D44444444444444D
D44444444444444D
D44444444444444D
D44444444444444D
D44444444444444D
D44444444444444D
D444444444444242
D444444444444422
DDDDDDDDDDD22222`],
  [ block6, bitmap`
22222CCCCCCCCCCC
229999999999999C
292999999999999C
C99999999999999C
C99999999999999C
C99999999999999C
C99999999999999C
C99999999999999C
C99999999999999C
C99999999999999C
C99999999999999C
C99999999999999C
C99999999999999C
C999999999999292
C999999999999922
CCCCCCCCCCC22222`],
  [ brickDivideLeft, bitmap`
................
................
................
................
................
..LLLLLLLLLLLLLL
.L21111111111111
L221111111111111
L111111111111111
.L11111111111111
..LLLLLLLLLLLLLL
................
................
................
................
................`],
  [ brickDivideCenter, bitmap`
................
................
................
................
................
LLLLLLLLLLLLLLLL
1111111111111111
1111111111111111
1111111111111111
1111111111111111
LLLLLLLLLLLLLLLL
................
................
................
................
................`],
  [ brickDivideRight, bitmap`
................
................
................
................
................
LLLLLLLLLLLLLL..
11111111111111L.
111111111111111L
111111111111111L
11111111111111L.
LLLLLLLLLLLLLL..
................
................
................
................
................`],
  [ background, bitmap`
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
  
  
)

setBackground("x")

const levels = [
  map`
...............
...............
abbbbbbbbcp....
hxxxxxxxxd.....
hxxxxxxxxd..vyz
hxxxxxxxxd.....
hxxxxxxxxd.....
hxxxxxxxxd.....
hxxxxxxxxd..vyz
hxxxxxxxxd.....
hxxxxxxxxd.....
gffffffffe.....`,
  map`
abbbbbbbbbbbbbc
h.............d
h.............d
h.............d
h.............d
h.............d
h.............d
h.............d
h.............d
h.............d
h.............d
gfffffffffffffe`
]

setMap(levels[0])

addText("SCORE:" + score, {
  x: 1,
  y: 1,
  color: color`2`
})

newBlocks(); // Begin with new blocks

onInput("d", () => { // Move the displayed position one position to the left
  if (gameStatus == 1) {
    if (blockPreviewStatus == 1) {
    removeDisplayPosition(positionList[currentPositionIndex]); // Remove the current displayed position
    currentPositionIndex += 1; // Move to next position
    if (currentPositionIndex > positionList.length - 1) { // Check if position index is out of range, reset if so
      currentPositionIndex = 0;
    }
    displayPosition(positionList[currentPositionIndex]); // Display the new position
    }
  }
  

})

onInput("a", () => { // Move the displayed position one position to the left
  if (gameStatus == 1) {
    if (blockPreviewStatus == 1) {
    removeDisplayPosition(positionList[currentPositionIndex]);
    currentPositionIndex -= 1;
    if (currentPositionIndex < 0) { // Check if position index is out of range
      currentPositionIndex = positionList.length - 1;
    }
    displayPosition(positionList[currentPositionIndex]);
    }
  }
  
})
        

onInput("s", () => {
  if (blockPreviewStatus == 0) {
    getFirst(player).y += 4
  }
  
  
})

onInput("w", () => {
  if (blockPreviewStatus == 0) {
    getFirst(player).y -= 4
  }

})

onInput("j", () => {

  if (gameStatus == 1) {
    
    if (blockPreviewStatus == 0) {

    blockSelectionIndexes = []; // Clear prior selection indexes when new block is chosen

    currentPositionIndex = 0; // Begin position indexes at 0

    blockSelection = []; // Clear prior block selection when new block is chosen
    
    getTileList(); // Get list of every tile on board

    if (getFirst(player).y < 4 && availableBlocks.includes(1)) {
      blockChoice = 1; // First block was selected
      blockPreviewStatus = 1;
      for (let y=1;y<=3;y++) {
        for (let x=12;x<=14;x++) {
          blockSelection.push(getTile(x,y));
        
        }
      }
      getSelectedBlockIndexes();
      makePositionList();
      displayPosition(positionList[currentPositionIndex]);


      
    } else if (getFirst(player).y < 8 && getFirst(player).y > 4  && availableBlocks.includes(2)) {
      blockChoice = 2; // Second block was selected
      blockPreviewStatus = 1;
      for (let y=5;y<=7;y++) {
        for (let x=12;x<=14;x++) {
          blockSelection.push(getTile(x,y));
        
        }
      }
            
      getSelectedBlockIndexes();
      makePositionList();
      displayPosition(positionList[currentPositionIndex]);


      
    } else if (getFirst(player).y > 8 &&availableBlocks.includes(3)) {
      blockChoice = 3; // Third block was selected
      blockPreviewStatus = 1;
      for (let y=9;y<=11;y++) {
        for (let x=12;x<=14;x++) {
          blockSelection.push(getTile(x,y));
    
        }
      }
            
      getSelectedBlockIndexes();
      makePositionList();
      displayPosition(positionList[currentPositionIndex]);

     
            
    }
    

  } else if (blockPreviewStatus == 1) { // If "j" is pressed when block preview is active

    availableBlocks.splice(availableBlocks.indexOf(blockChoice), 1); // Remove block from list of available blocks
    
    removeDisplayPosition(positionList[currentPositionIndex]); // Remove the displayed position 
    
    placeBlock(positionList[currentPositionIndex]); // Place selected block

    blockPreviewStatus = 0; // Turn off block preview

    clearBlockChoice(blockChoice); // Delete placed block in viewer

    score += blockSelectionIndexes.length // Add the value of the block to the score

    newBlocks(); // Generate new blocks

    blockClear(); // Clear completed rows and columns

  }
    
  }
  
})


onInput("l", () => {
  blockPreviewStatus = 0;
  removeDisplayPosition(positionList[currentPositionIndex]);
})

onInput("i", () => {
  if (gameStatus == 0) {
    restartGame(); // "i" restarts the game
  }
})
