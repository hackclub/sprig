/*
@title: Pipes Puzzle
@author: RayhanADev
@tags: ['puzzle']
@addedOn: 2022-10-14
*/

/**
A Pipes Puzzle!! Use WASD to move the cursor around and
use L to rotate the pipe. The goal is to connect all the
pipes in the square. Connected pipes are indicated by a
blue background. All levels are random and solvable!

GLHF :D

Press J to create a new level!
**/

const GRID_SIZE = 5;

function checkGridSize() {
  if(GRID_SIZE > 5) console.error('Grid size cannot be greater than 5');
  if(GRID_SIZE < 3) console.error('Grid size cannot be less than 3');
  if(GRID_SIZE % 2 === 0) console.error('Grid size cannot be even');
};

checkGridSize();

/* PRNG: https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript */
function cyrb128(str) {
  let h1 = 1779033703,
    h2 = 3144134277,
    h3 = 1013904242,
    h4 = 2773480762;
  for (let i = 0, k; i < str.length; i++) {
    k = str.charCodeAt(i);
    h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
    h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
    h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
    h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
  }
  h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067);
  h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233);
  h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213);
  h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179);
  return [
    (h1 ^ h2 ^ h3 ^ h4) >>> 0,
    (h2 ^ h1) >>> 0,
    (h3 ^ h1) >>> 0,
    (h4 ^ h1) >>> 0,
  ];
}

function sfc32(a, b, c, d) {
  return function () {
    a >>>= 0;
    b >>>= 0;
    c >>>= 0;
    d >>>= 0;
    var t = (a + b) | 0;
    a = b ^ (b >>> 9);
    b = (c + (c << 3)) | 0;
    c = (c << 21) | (c >>> 11);
    d = (d + 1) | 0;
    t = (t + d) | 0;
    c = (c + t) | 0;
    return (t >>> 0) / 4294967296;
  };
}

const seed = cyrb128(String(Math.random()));
const prng = sfc32(seed[0], seed[1], seed[2], seed[3]);

prng();
prng();
prng();
prng();

/* Engine */

class Pipe {
  constructor() {
    this.x = 0;
    this.y = 0;

    this.active = 0;

    this.UP = 0;
    this.RIGHT = 1;
    this.DOWN = 2;
    this.LEFT = 3;

    this.connections = Array.apply(null, new Array(4)).map(
      Number.prototype.valueOf,
      0,
    );
  }

  get isActive() {
    return this.active === 1 ? true : false;
  }

  set isActive(active) {
    this.active = active ? 1 : 0;
  }

  hasConnection(direction) {
    return this.connections[direction] === 1 ? true : false;
  }

  rotate() {
    this.connections.splice(
      0,
      0,
      this.connections.splice(this.connections.length - 1, 1)[0],
    );
  }
}

class Grid {
  constructor() {
    this.size = 0;
    this.pipes = [];
    this.win = false;
  }

  init() {
    this.win = false;
    this.initPipes(GRID_SIZE);
    this.buildPipes();
    this.scramblePipes();
    this.checkPipes();
    this.draw();
  }

  getPipe(x, y) {
    if (
      typeof this.pipes[x] !== 'undefined' &&
      typeof this.pipes[x][y] !== 'undefined'
    ) {
      return this.pipes[x][y];
    }
  }

  initPipes(size) {
    this.size = size;
    for (let x = 1; x <= size; x++) {
      this.pipes[x] = [];
      for (let y = 1; y <= size; y++) {
        const pipe = new Pipe();
        pipe.x = x;
        pipe.y = y;

        this.pipes[x][y] = pipe;
      }
    }
  }

  buildPipes() {
    const totalPipes = this.size * this.size;
    const connectedPipes = [];

    const x = Math.ceil(this.size / 2);
    const y = Math.ceil(this.size / 2);

    const firstPipe = this.pipes[x][y];
    firstPipe.active = 1;

    connectedPipes.push(firstPipe);

    while (connectedPipes.length < totalPipes) {
      const selected =
        connectedPipes[Math.floor(prng() * connectedPipes.length)];
      let newPipe = undefined;

      // Create a random direction
      const direction = Math.floor(prng() * 4);
      let reverseDirection = undefined;

      switch (direction) {
        case selected.UP: {
          let previousRow = this.pipes[selected.x - 1];
          if (typeof previousRow !== 'undefined') {
            newPipe = previousRow[selected.y];
          }
          reverseDirection = selected.DOWN;
          break;
        }
        case selected.DOWN: {
          let nextRow = this.pipes[selected.x + 1];
          if (typeof nextRow !== 'undefined') {
            newPipe = nextRow[selected.y];
          }
          reverseDirection = selected.UP;
          break;
        }
        case selected.RIGHT: {
          let bottomRow = this.pipes[selected.x];
          if (typeof bottomRow !== 'undefined') {
            newPipe = bottomRow[selected.y + 1];
          }
          reverseDirection = selected.LEFT;
          break;
        }
        case selected.LEFT: {
          let topRow = this.pipes[selected.x];
          if (typeof topRow !== 'undefined') {
            newPipe = topRow[selected.y - 1];
          }
          reverseDirection = selected.RIGHT;
          break;
        }
      }

      if (
        typeof newPipe !== 'undefined' &&
        newPipe.connections.indexOf(1) === -1
      ) {
        selected.connections[direction] = 1;
        newPipe.connections[reverseDirection] = 1;

        connectedPipes.push(newPipe);
      }
    }
  }

  scramblePipes() {
    for (let x = 1; x < this.pipes.length; x++) {
      for (let y = 1; y < this.pipes.length; y++) {
        let pipe = this.pipes[x][y];
        let random = Math.floor(prng() * 4);

        for (let i = 0; i < random; i++) {
          pipe.rotate();
        }
      }
    }
  }

  disablePipes() {
    for (let x = 1; x < this.pipes.length; x++) {
      for (let y = 1; y < this.pipes.length; y++) {
        let pipe = this.pipes[x][y];
        pipe.isActive = false;
      }
    }
  }

  checkPipes() {
    let connectedPipes = [];
    let pipesToCheck = [];

    // Disable all pipes
    this.disablePipes();

    // Get the center pipe, set is to active, an add it to the set to be checked
    let centerPipe = this.getPipe(
      Math.ceil(this.size / 2),
      Math.ceil(this.size / 2),
    );
    centerPipe.isActive = true;

    connectedPipes.push(centerPipe);
    pipesToCheck.push(centerPipe);

    // While there are still pipes left to be checked
    while (pipesToCheck.length > 0) {
      let pipe = pipesToCheck.pop();
      let x = pipe.x;
      let y = pipe.y;

      // Check if this pipe has a connection up
      if (pipe.hasConnection(pipe.UP)) {
        let above = this.getPipe(x - 1, y);
        if (
          typeof above !== 'undefined' &&
          above.hasConnection(pipe.DOWN) &&
          !above.isActive
        ) {
          above.isActive = true;

          connectedPipes.push(above);
          pipesToCheck.push(above);
        }
      }

      // Check if this pipe has a connection down
      if (pipe.hasConnection(pipe.DOWN)) {
        let below = this.getPipe(x + 1, y);
        if (
          typeof below !== 'undefined' &&
          below.hasConnection(pipe.UP) &&
          !below.isActive
        ) {
          below.isActive = true;

          connectedPipes.push(below);
          pipesToCheck.push(below);
        }
      }

      // Check if this pipe has a connection right
      if (pipe.hasConnection(pipe.RIGHT)) {
        let right = this.getPipe(x, y + 1);
        if (
          typeof right !== 'undefined' &&
          right.hasConnection(pipe.LEFT) &&
          !right.isActive
        ) {
          right.isActive = true;

          connectedPipes.push(right);
          pipesToCheck.push(right);
        }
      }

      // Check if the pipe has a connection left
      if (pipe.hasConnection(pipe.LEFT)) {
        let left = this.getPipe(x, y - 1);
        if (
          typeof left !== 'undefined' &&
          left.hasConnection(pipe.RIGHT) &&
          !left.isActive
        ) {
          left.isActive = true;

          connectedPipes.push(left);
          pipesToCheck.push(left);
        }
      }
    }

    // Check if the user has won
    if (connectedPipes.length === this.size * this.size) {
      this.win = true;
      this.draw();
    }
  }
}

/* Utilities */

function rotateText(text, rotation) {
  const rows = text.trim().split('\n');
  const newRows = [];

  const numRows = rows.length;
  const numItems = rows[0].length;

  let x = 0;
  let y = 0;
  for (let i = 0; i < numItems; i++) {
    for (let j = numRows - 1; j > -1; j--) {
      const char = rows[j][i];

      if (!newRows[y]) newRows[y] = [];
      newRows[y][x] = char;

      x++;
    }

    y++;
  }

  const newText = newRows.map((row) => row.join('')).join('\n');
  const currentRotation = rotation - 90;

  if (currentRotation === 0) return newText;
  return rotateText(newText, currentRotation);
}

function activeText(text) {
  return text.replace(/\./g, '7');
}

// https://bobbyhadz.com/blog/javascript-check-if-two-arrays-have-same-elements
function areArraysEqual(array1, array2) {
  if (array1.length === array2.length) {
    return array1.every((element) => {
      if (array2.includes(element)) {
        return true;
      }

      return false;
    });
  }

  return false;
}

// https://stackoverflow.com/questions/5767325/how-can-i-remove-a-specific-item-from-an-array
function removeItemArray(arr, value) {
  var index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}

/* Sprig Implementation */

const bentPipe = `
....00000000....
....04444440....
....00000000....
.....044440.....
.....044440..000
.....04444000040
.....04444444040
.....04444444040
.....04444444040
......0444444040
.......000000040
.............000
................
................
................
................`;

const crossPipe = `
....00000000....
....04444440....
....00000000....
.....044440.....
000..044440..000
0400004444000040
0404444444444040
0404444444444040
0404444444444040
0404444444444040
0400004444000040
000..044440..000
.....044440.....
....00000000....
....04444440....
....00000000....`;

const endPipe = `
................
................
................
................
................
......0000......
.....044440.....
.....044440.....
.....044440.....
.....044440.....
.....044440.....
.....044440.....
.....044440.....
....00000000....
....04444440....
....00000000....`;

const straightPipe = `
....00000000....
....04444440....
....00000000....
.....044440.....
.....044440.....
.....044440.....
.....044440.....
.....044440.....
.....044440.....
.....044440.....
.....044440.....
.....044440.....
.....044440.....
....00000000....
....04444440....
....00000000....`;

const splitPipe = `
....00000000....
....04444440....
....00000000....
.....044440.....
.....044440..000
.....04444000040
.....04444444040
.....04444444040
.....04444444040
.....04444444040
.....04444000040
.....044440..000
.....044440.....
....00000000....
....04444440....
....00000000....`;

const pipeMap = new Map();

const charList = 'abcdefghijklnopqrstuvwxyz1234567';
let charListPointer = -1;

// End Points
pipeMap.set(['u'], {
  code: charList[++charListPointer],
  sprite: `${rotateText(endPipe, 180)}`,
});
pipeMap.set(['d'], { code: charList[++charListPointer], sprite: `${endPipe}` });
pipeMap.set(['r'], {
  code: charList[++charListPointer],
  sprite: `${rotateText(endPipe, 270)}`,
});
pipeMap.set(['l'], {
  code: charList[++charListPointer],
  sprite: `${rotateText(endPipe, 90)}`,
});

// Straight
pipeMap.set(['u', 'd'], {
  code: charList[++charListPointer],
  sprite: `${straightPipe}`,
});
pipeMap.set(['l', 'r'], {
  code: charList[++charListPointer],
  sprite: `${rotateText(straightPipe, 90)}`,
});

// Corners
pipeMap.set(['u', 'r'], {
  code: charList[++charListPointer],
  sprite: `${bentPipe}`,
});
pipeMap.set(['u', 'l'], {
  code: charList[++charListPointer],
  sprite: `${rotateText(bentPipe, 270)}`,
});
pipeMap.set(['d', 'r'], {
  code: charList[++charListPointer],
  sprite: `${rotateText(bentPipe, 90)}`,
});
pipeMap.set(['d', 'l'], {
  code: charList[++charListPointer],
  sprite: `${rotateText(bentPipe, 180)}`,
});

// Splits
pipeMap.set(['u', 'r', 'l'], {
  code: charList[++charListPointer],
  sprite: `${rotateText(splitPipe, 270)}`,
});
pipeMap.set(['r', 'd', 'l'], {
  code: charList[++charListPointer],
  sprite: `${rotateText(splitPipe, 90)}`,
});
pipeMap.set(['d', 'l', 'u'], {
  code: charList[++charListPointer],
  sprite: `${rotateText(splitPipe, 180)}`,
});
pipeMap.set(['u', 'r', 'd'], {
  code: charList[++charListPointer],
  sprite: `${splitPipe}`,
});

// Cross
pipeMap.set(['u', 'r', 'd', 'l'], {
  code: charList[++charListPointer],
  sprite: `${crossPipe}`,
});

const activePipeMap = new Map(pipeMap);
for (const key of activePipeMap.keys()) {
  const { sprite } = activePipeMap.get(key);
  activePipeMap.set(key, {
    code: charList[++charListPointer],
    sprite: activeText(sprite),
  });
}

const legend = [];
for (const { code, sprite } of pipeMap.values()) {
  legend.push([code, bitmap`${sprite.trim()}`]);
}

for (const { code, sprite } of activePipeMap.values()) {
  legend.push([code, bitmap`${sprite.trim()}`]);
}

const m = 'm';

setLegend(
  [
    '8',
    bitmap`
....222222222222
..22222222222222
.222222222222222
.222222222222222
2222222222222222
2222222222222222
2222222202220200
2222222202020220
2222222202020220
2222222202020220
2222222220002200
2222222222222222
.222222222222222
.222222222222222
..22222222222222
....222222222222`,
  ],
  [
    '9',
    bitmap`
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
0202202022022000
2202202022020222
2200202002020002
2202002020020222
0202202022022000
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222`,
  ],
  [
    '0',
    bitmap`
222222222222....
22222222222222..
222222222222222.
222222222222222.
2222222222222222
2222222222222222
2200220222222222
2022020222222222
2000220222222222
2022022222222222
2022020222222222
2222222222222222
222222222222222.
222222222222222.
22222222222222..
222222222222....`,
  ],
  [
    m,
    bitmap`
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
0..............0
0..............0
0..............0
0..............0
0000000000000000`,
  ],
  ...legend,
);

const solids = [];
for (const { code } of pipeMap.values(pipeMap)) {
  solids.push(code);
}

setSolids(solids);

let level = 0;
const levels = [
  map`
.....
.....
.....
.....
.....`,
];

setMap(levels[level].trim());

let globalMouseX = 0;
let globalMouseY = 0;

// Code Split for Clarity
class SprigGrid extends Grid {
  draw() {
    const tiles = getAll();
    for (const tile of tiles) {
      clearTile(tile.x, tile.y);
    }

    for (let x in this.pipes) {
      let row = this.pipes[x];
      let rows = [];

      for (let y in row) {
        let pipe = row[y];
        let pipeSymbol = [];

        if (pipe.connections[0] === 1) pipeSymbol.push('u');
        if (pipe.connections[1] === 1) pipeSymbol.push('r');
        if (pipe.connections[2] === 1) pipeSymbol.push('d');
        if (pipe.connections[3] === 1) pipeSymbol.push('l');
        if (pipe.active === 1) pipeSymbol.push('a');

        let code = '';
        const isActive = pipeSymbol.includes('a');

        for (const key of pipeMap.keys()) {
          if (areArraysEqual(key, removeItemArray(pipeSymbol, 'a'))) {
            if (isActive) {
              ({ code } = activePipeMap.get(key));
            } else {
              ({ code } = pipeMap.get(key));
            }
          }
        }

        addSprite(y - 1, x - 1, code);
      }
    }

    addSprite(globalMouseX, globalMouseY, m);

    if (grid.win) {
      addSprite((grid.size - 1) / 2 - 1, (grid.size - 1) / 2, '8');
      addSprite((grid.size - 1) / 2, (grid.size - 1) / 2, '9');
      addSprite((grid.size - 1) / 2 + 1, (grid.size - 1) / 2, '0');
    }
  }
}

const grid = new SprigGrid();
grid.init();

function rotatePipe(x, y) {
  grid.getPipe(x + 1, y + 1).rotate();
  grid.checkPipes();
  grid.draw();
}

onInput('w', () => {
  if (grid.win === true) return;
  getFirst(m).y -= 1;
  globalMouseY = getFirst(m).y;
});

onInput('a', () => {
  if (grid.win === true) return;
  getFirst(m).x -= 1;
  globalMouseX = getFirst(m).x;
});

onInput('s', () => {
  if (grid.win === true) return;
  getFirst(m).y += 1;
  globalMouseY = getFirst(m).y;
});

onInput('d', () => {
  if (grid.win === true) return;
  getFirst(m).x += 1;
  globalMouseX = getFirst(m).x;
});

onInput('l', () => {
  if (grid.win === true) return;
  const { x, y } = getFirst(m);
  rotatePipe(y, x);
});

onInput('j', () => {
  grid.init();
});
