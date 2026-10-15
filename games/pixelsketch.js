/*
@title: pixelsketch
@description: A pocket pixel art creation tool with fully working audio, HUD, and fixed canvas tiles!
@author: airfryer
@tags: ['art', 'tool', 'sandbox']
@addedOn: 2026-10-15
*/

/*
Hi, this is a small doodling app, I didnt want to make a game with only like 10 levels and wanted something that might actually help with boredom while Im outside, so I made this, here are some instructions:
- w, a, s, d: Move and paint
- i: Toggle Eraser mode
- k: Switch Color
- j: Toggle Brush Size (1 or 2)
- l: Clear entire canvas
please enjoy :p 
*/

const cursor = "p";
const emptyTile = "-";
const labelS = "S";
const labelC = "C";
const dash = "h";
const num1 = "1";
const num2 = "2";
const redPixel = "r";
const orangePixel = "o";
const yellowPixel = "y";
const greenPixel = "g";
const bluePixel = "b";
const eraserChar = "e";

setLegend(
  [cursor, bitmap`
    3333333333333333
    3..............3
    3..............3
    3....333333....3
    3....3....3....3
    3....3....3....3
    3....3....3....3
    3....3....3....3
    3....3....3....3
    3....3....3....3
    3....3....3....3
    3....333333....3
    3..............3
    3..............3
    3333333333333333
  `],
  [emptyTile, bitmap`
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
    ................
  `],
  [labelS, bitmap`
    3333333333333333
    33..............
    33..............
    3333333333333333
    ..............33
    ..............33
    3333333333333333
    ................
    ................
    ................
    ................
    ................
    ................
    ................
    ................
    ................
  `],
  [labelC, bitmap`
    3333333333333333
    33..............
    33..............
    33..............
    33..............
    33..............
    3333333333333333
    ................
    ................
    ................
    ................
    ................
    ................
    ................
    ................
    ................
  `],
  [dash, bitmap`
    ................
    ................
    ................
    3333333333333333
    3333333333333333
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
  `],
  [num1, bitmap`
    ........333.....
    .......3333.....
    ........333.....
    ........333.....
    ........333.....
    ........333.....
    ........333.....
    .....3333333333.
    ................
    ................
    ................
    ................
    ................
    ................
    ................
    ................
  `],
  [num2, bitmap`
    ....3333333.....
    ...333...333....
    .........333....
    ........333.....
    .......333......
    ......333.......
    .....333........
    ....333333333333
    ................
    ................
    ................
    ................
    ................
    ................
    ................
    ................
  `],
  [eraserChar, bitmap`
    3333333333333333
    33..............
    33..............
    3333333333333333
    33..............
    33..............
    3333333333333333
    ................
    ................
    ................
    ................
    ................
    ................
    ................
    ................
    ................
  `],
  [redPixel, bitmap`
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
    2222222222222222
  `],
  [orangePixel, bitmap`
    5555555555555555
    5555555555555555
    5555555555555555
    5555555555555555
    5555555555555555
    5555555555555555
    5555555555555555
    5555555555555555
    5555555555555555
    5555555555555555
    5555555555555555
    5555555555555555
    5555555555555555
    5555555555555555
    5555555555555555
    5555555555555555
  `],
  [yellowPixel, bitmap`
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
    6666666666666666
  `],
  [greenPixel, bitmap`
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
    7777777777777777
  `],
  [bluePixel, bitmap`
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
    8888888888888888
  `]
);

setSolids([]);

// Row 0 is the HUD (cursor 'p' starts tucked safely at the end of Row 0)
// Rows 1-9 are 100% filled with empty background tiles so every cell is colorable
setMap(`
S-1-h-C-gp......
----------------
----------------
----------------
----------------
----------------
----------------
----------------
----------------
----------------
`);

setPushables({
  [cursor]: []
});

// Define Retro Buzzer Sounds
const tickTune = tune`c5`;
const eraserTune = tune`g3`;
const colorTune = tune`e4`;
const sizeTune = tune`a3`;
const wipeTune = tune`c2`;

// App State
const colors = [redPixel, orangePixel, yellowPixel, greenPixel, bluePixel];
let colorIndex = 3; // Starts on Green (g)
let brushSize = 1;  // Starts on Size 1
let isEraser = false;

function updateGUI() {
  let sizeTiles = getAll().filter(o => o.x === 2 && o.y === 0);
  sizeTiles.forEach(o => { o.type = brushSize === 1 ? num1 : num2; });

  let colorTiles = getAll().filter(o => o.x === 8 && o.y === 0);
  colorTiles.forEach(o => {
    if (isEraser) {
      o.type = eraserChar;
    } else {
      o.type = colors[colorIndex];
    }
  });
}

function paintAt(cx, cy) {
  for (let dx = 0; dx < brushSize; dx++) {
    for (let dy = 0; dy < brushSize; dy++) {
      let tx = cx + dx;
      let ty = cy + dy;
      if (tx < 16 && ty >= 1 && ty < 10) {
        let tiles = getAll().filter(o => o.x === tx && o.y === ty && o.type !== cursor);
        tiles.forEach(o => {
          o.type = isEraser ? emptyTile : colors[colorIndex];
        });
      }
    }
  }
}

function moveCursor(dx, dy) {
  let p = getFirst(cursor);
  let newX = Math.max(0, Math.min(15, p.x + dx));
  // Restrict cursor strictly to canvas rows (1 to 9), keeping it out of the HUD row
  let newY = Math.max(1, Math.min(9, p.y + dy));
  p.x = newX;
  p.y = newY;
  paintAt(newX, newY);
  playTune(tickTune);
}

onInput("w", () => moveCursor(0, -1));
onInput("s", () => moveCursor(0, 1));
onInput("a", () => moveCursor(-1, 0));
onInput("d", () => moveCursor(1, 0));

onInput("i", () => {
  isEraser = !isEraser;
  paintAt(getFirst(cursor).x, getFirst(cursor).y);
  updateGUI();
  playTune(eraserTune);
});

onInput("k", () => {
  colorIndex = (colorIndex + 1) % colors.length;
  isEraser = false;
  paintAt(getFirst(cursor).x, getFirst(cursor).y);
  updateGUI();
  playTune(colorTune);
});

onInput("j", () => {
  brushSize = brushSize === 1 ? 2 : 1;
  paintAt(getFirst(cursor).x, getFirst(cursor).y);
  updateGUI();
  playTune(sizeTune);
});

onInput("l", () => {
  getAll().forEach(o => {
    if (o.type !== cursor && o.y > 0) {
      o.type = emptyTile;
    }
  });
  updateGUI();
  playTune(wipeTune);
});

afterInput(() => {
  updateGUI();
});