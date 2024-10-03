/*
@title: Amoeba
@author: LUKÁCS Gergely
@tags: ['puzzle']
@addedOn: 2022-11-08

HOW TO PLAY:
Amoeba is a two-player strategy game, a version of Gomoku.
To win, you need to place (at least) five marks in a line.
The two players take it in turns to place a mark on the grid.
The aim of the game is to place five of your own marks in
the horizontal, vertical or diagonal direction without interruption.
The opponent tries to prevent this by placing marks at the end
of the line that appears to be formed. In this implementation,
the grid is infinite.

GAME CONTROLS:
 - Move the selector cursor with WASD
 - Pan around the map with IJKL
 - Double click W to place a mark in the currently selected square
 - Double click I to zoom in
 - Double click K to zoom out
 - Double click J to move the selection cursor to the center of the screen
 - Double click L rapidly to reset the game
*/

const TILES = {
  empty: "e",
  filledX: "1",
  filledO: "2",
  solidX: "3",
  solidO: "4",
};

const SPRITES = {
  selectionMarker: "m",
  markX: "X",
  markXTemporary: "x",
  markXWhite: "5",
  markO: "O",
  markOTemporary: "o",
  markOWhite: "6",
};

const TUNES = {
  invalidPlacement: tune`
250,
250: d4-250,
250: c4/250,
7250`,
  win: tune`
333.3333333333333: f4-333.3333333333333,
333.3333333333333: g4~333.3333333333333 + a4-333.3333333333333,
333.3333333333333: b4/333.3333333333333,
333.3333333333333: a4~333.3333333333333 + c5-333.3333333333333,
333.3333333333333,
333.3333333333333: d5/333.3333333333333 + e5-333.3333333333333,
333.3333333333333: d5~333.3333333333333 + g5-333.3333333333333,
8333.333333333332`,
  markPlaced: tune`
500: g4~500,
15500`,
};

setLegend(
  [ SPRITES.selectionMarker, bitmap`
0.000000000000.0
..LLLLLLLLLLLL..
0L............L0
0L............L0
0L............L0
0L............L0
0L............L0
0L............L0
0L............L0
0L............L0
0L............L0
0L............L0
0L............L0
0L............L0
..LLLLLLLLLLLL..
0.000000000000.0` ],
  [ SPRITES.markX, bitmap`
................
................
..33........33..
..333......333..
...333....333...
....333..333....
.....333333.....
......3333......
......3333......
.....333333.....
....333..333....
...333....333...
..333......333..
..33........33..
................
................` ],
  [ SPRITES.markXTemporary, bitmap`
................
................
..11........11..
..111......111..
...111....111...
....111..111....
.....111111.....
......1111......
......1111......
.....111111.....
....111..111....
...111....111...
..111......111..
..11........11..
................
................` ],
  [ SPRITES.markXWhite, bitmap`
................
................
..22........22..
..222......222..
...222....222...
....222..222....
.....222222.....
......2222......
......2222......
.....222222.....
....222..222....
...222....222...
..222......222..
..22........22..
................
................` ],
  [ SPRITES.markO, bitmap`
................
................
.....777777.....
....77777777....
...777....777...
..777......777..
..77........77..
..77........77..
..77........77..
..77........77..
..777......777..
...777....777...
....77777777....
.....777777.....
................
................` ],
  [ SPRITES.markOTemporary, bitmap`
................
................
.....111111.....
....11111111....
...111....111...
..111......111..
..11........11..
..11........11..
..11........11..
..11........11..
..111......111..
...111....111...
....11111111....
.....111111.....
................
................` ],
  [ SPRITES.markOWhite, bitmap`
................
................
.....222222.....
....22222222....
...222....222...
..222......222..
..22........22..
..22........22..
..22........22..
..22........22..
..222......222..
...222....222...
....22222222....
.....222222.....
................
................` ],
  [ TILES.empty, bitmap`
1111111111111111
1..............1
1..............1
1..............1
1..............1
1..............1
1..............1
1..............1
1..............1
1..............1
1..............1
1..............1
1..............1
1..............1
1..............1
1111111111111111` ],
  [ TILES.filledX, bitmap`
3333333333333333
3CCCCCCCCCCCCCC3
3CCCCCCCCCCCCCC3
3CCCCCCCCCCCCCC3
3CCCCCCCCCCCCCC3
3CCCCCCCCCCCCCC3
3CCCCCCCCCCCCCC3
3CCCCCCCCCCCCCC3
3CCCCCCCCCCCCCC3
3CCCCCCCCCCCCCC3
3CCCCCCCCCCCCCC3
3CCCCCCCCCCCCCC3
3CCCCCCCCCCCCCC3
3CCCCCCCCCCCCCC3
3CCCCCCCCCCCCCC3
3333333333333333` ],
  [ TILES.filledO, bitmap`
7777777777777777
7555555555555557
7555555555555557
7555555555555557
7555555555555557
7555555555555557
7555555555555557
7555555555555557
7555555555555557
7555555555555557
7555555555555557
7555555555555557
7555555555555557
7555555555555557
7555555555555557
7777777777777777` ],
  [ TILES.solidX, bitmap`
CCCCCCCCCCCCCCCC
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
C33333333333333C
C33333333333333C
C33333333333333C
C33333333333333C
CCCCCCCCCCCCCCCC` ],
  [ TILES.solidO, bitmap`
5555555555555555
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
5777777777777775
5777777777777775
5777777777777775
5777777777777775
5555555555555555` ],
);

let xOffset = 0;
let yOffset = 0;
const MAP_WIDTH = 5;
const MAP_HEIGHT = 3;
let resolutionAdder = 4;

let marksPlaced = [{x:0, y:0, type:"X"}, {x:2, y:-3, type:"O"}];
let winningMarks = [];
let gameOver = false;
let currentTurn = "X";

function renderMap() {
  const mapXRange = ((MAP_WIDTH + resolutionAdder) - 1) / 2;
  const mapYRange = ((MAP_HEIGHT + resolutionAdder) - 1) / 2;

  let tilesToDraw = "";
  
  for (let y = yOffset + mapYRange; y >= yOffset - mapYRange; y--) {
    for (let x = xOffset - mapXRange; x <= xOffset + mapXRange; x++) {
      if(gameOver === true) {
        if(marksPlaced.find(mark => mark.x === x && mark.y === y) !== undefined) {
          if(winningMarks.find(mark => mark.x === x && mark.y === y) !== undefined) {
            tilesToDraw += TILES[`solid${currentTurn}`];
          } else {
            tilesToDraw += TILES[`filled${currentTurn}`];
          };
        } else {
          tilesToDraw += TILES.empty;
        };
      } else {
        tilesToDraw += TILES.empty;
      };
    };
    
    tilesToDraw += "\n";
  };

  setMap(tilesToDraw);
  renderSelectionMarker();
  renderMarksPlaced();
};

function getSprigCoordinatesFrom(x, y) {
  const mapXRange = ((MAP_WIDTH + resolutionAdder) - 1) / 2;
  const mapYRange = ((MAP_HEIGHT + resolutionAdder) - 1) / 2;

  const coordinates = {
    x: mapXRange - xOffset + x,
    y: mapYRange + yOffset - y,
  };

  if(coordinates.x <= mapXRange * 2 && coordinates.y <= mapYRange * 2 && coordinates.x >= 0 && coordinates.y >= 0) {
    return coordinates;
  } else {
    return undefined;
  };
};

function renderMarksPlaced() {
  const marks = [...getAll(SPRITES.markX), ...getAll(SPRITES.markO)];

  for(const mark of marks) {
    mark.remove();
  };

  for(const mark of marksPlaced) {
    const position = getSprigCoordinatesFrom(mark.x, mark.y);
    if(position !== undefined) {
      if(gameOver === true && winningMarks.find(_mark => _mark.x === mark.x && _mark.y === mark.y) !== undefined) {
        addSprite(position.x, position.y, SPRITES[`mark${mark.type}White`]);
      } else {
        addSprite(position.x, position.y, SPRITES[`mark${mark.type}`]);
      };
    };
  };
};

let selectionMarkerInterval = null;
let selectionMarkerVisible = false;
let selectionMarker = {
  x: 0,
  y: 0,
};

setInterval(() => {
  selectionMarkerVisible = !selectionMarkerVisible;
  renderSelectionMarker();
}, 500);

function renderSelectionMarker() {
  const position = getSprigCoordinatesFrom(selectionMarker.x, selectionMarker.y);
  getFirst(SPRITES.selectionMarker) && getFirst(SPRITES.selectionMarker).remove();
  getFirst(SPRITES.markXTemporary) && getFirst(SPRITES.markXTemporary).remove();
  getFirst(SPRITES.markOTemporary) && getFirst(SPRITES.markOTemporary).remove();
  
  if(position !== undefined && selectionMarkerVisible === true && gameOver === false) {
    addSprite(position.x, position.y, SPRITES.selectionMarker);

    // If the selected square isn't occupied, render a preview of the next mark to be placed
    if(marksPlaced.find(mark => mark.x === selectionMarker.x && mark.y === selectionMarker.y) === undefined) {
      addSprite(position.x, position.y, SPRITES[`mark${currentTurn}Temporary`]);
    };
  };
}

renderMap();

const doubleClick = (single, double) => {
  let clicks = 0;
  let timeout = null;

  return (...args) => {
    clicks++;
    if (clicks === 1) {
      timeout = setTimeout(function () {
        single(...args);
        clicks = 0;
      }, 200);
    } else {
      clearTimeout(timeout);
      double(...args);
      clicks = 0;
    }
  };
}

function getSequenceOfMarks(initialX, initialY, xStepDirection, yStepDirection, marks) {
  let sequenceFound = [];
  let seqeunceFoundInOppositeDirection = [];

  for (let i = 0; i < 5; i++) {
    const mark = marks.find(mark => { 
      return mark.x === initialX + i * xStepDirection && mark.y === initialY + i * yStepDirection;
    });
    
    if(mark !== undefined) sequenceFound.push(mark);
  };

  // Look in the other direction as well
  // We start at index 1 to avoid counting the same mark twice
  for (let i = 1; i < 5; i++) {
    const mark = marks.find(mark => { 
      return mark.x === initialX + (i * -1) * xStepDirection && mark.y === initialY + (i * -1) * yStepDirection;
    });
    
    if(mark !== undefined) seqeunceFoundInOppositeDirection.push(mark);
  };

  return sequenceFound.length + seqeunceFoundInOppositeDirection.length >= 5
    ? sequenceFound.concat(seqeunceFoundInOppositeDirection)
    : false;
};

function checkForWin() {
  const marks = marksPlaced.filter(mark => mark.type === currentTurn);
  // console.log("M", marks);

  const sequenceChecks = [[-1, 1], /*[1, -1],*/ [1, 1], /*[-1, -1],*/ [0, 1], /*[0, -1],*/ [-1, 0], /*[1, 0]*/];

  for(let i = 0; i < sequenceChecks.length; i++) {
    const result = getSequenceOfMarks(selectionMarker.x, selectionMarker.y, sequenceChecks[i][0], sequenceChecks[i][1], marks);
    if(result !== false) {
      gameOver = true;
      winningMarks = result;
      getFirst(SPRITES.selectionMarker) && getFirst(SPRITES.selectionMarker).remove();
      playTune(TUNES.win);
      break;
    };
  };
};

const moveSelectorUp = doubleClick(() => selectionMarker.y++, () => {
  // If the selected position is already occupied, plan an error sound
  if(marksPlaced.find(mark => mark.x === selectionMarker.x && mark.y === selectionMarker.y) !== undefined) return playTune(TUNES.invalidPlacement);

  marksPlaced.push({ x: selectionMarker.x, y: selectionMarker.y, type: currentTurn });
  checkForWin();
  
  if(gameOver === false) { 
    playTune(TUNES.markPlaced); 
    currentTurn = currentTurn === "X" ? "O" : "X";
  };
  
  renderMap();
});
const moveSelectorDown = () => selectionMarker.y--;
const moveSelectorLeft = () => selectionMarker.x--;
const moveSelectorRight = () => selectionMarker.x++;

onInput("w", () => {
  
  moveSelectorUp();
  renderSelectionMarker();
});

onInput("a", () => {
  moveSelectorLeft();
  renderSelectionMarker();
});

onInput("s", () => {
  moveSelectorDown();
  renderSelectionMarker();
});

onInput("d", () => {
  moveSelectorRight();
  renderSelectionMarker();
});

const panUp = doubleClick(() => yOffset++, () => { if(resolutionAdder >= 2) resolutionAdder -= 2 });
const panDown = doubleClick(() => yOffset--, () => { if(resolutionAdder <= 10) resolutionAdder += 2 });
const panLeft = doubleClick(() => xOffset--, () => selectionMarker = { x: xOffset, y: yOffset });
const panRight = doubleClick(() => xOffset++, () => {
  // Resets the game
  xOffset = 0;
  yOffset = 0;
  marksPlaced = [];
  winningMarks = [];
  gameOver = false;
  currentTurn = "X";
  selectionMarker = {
    x: 0,
    y: 0,
  };
});

onInput("i", () => {
  panUp();
  renderMap();
});

onInput("j", () => {
  panLeft();
  renderMap();
});

onInput("k", () => {
  panDown();
  renderMap();
});

onInput("l", () => {
  panRight();
  renderMap();
});
