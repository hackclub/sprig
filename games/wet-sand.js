/*
@title: wet-sand
@author: mint
@tags: ['simulation']
@addedOn: 2023-02-20
*/

const sand = "s";
const water = "w";
const block = "b";
const cursor = "#";
const air = ".";
const fish = "f";

setLegend(
  [ sand, bitmap`
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
  [ water, bitmap`
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
5555555555555555`],
  [ block, bitmap`
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
  [ cursor, bitmap`
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
0000000000000000`],
  [ fish, bitmap`
555555F66FF55555
5555FF66666F6555
5522226666622225
5520026666620025
5520026666620025
5520026666620025
5520026666620025
5520026666620025
5520026666620025
5522226666622225
5555F6666666F555
5554F6655566F455
55D44F655566F4D5
55D44F66666F44D5
55DDDFF666FFDDD5
5555555FFF555555`],
);

let mapSize = 16;

let clamp = (value, min, max) => Math.min(Math.max(value, min), max);

let level = map`
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
................`
setMap(level);

let cursorPosition = [0, 0];

let grid = new Array(16).fill(0).map(() => new Array(16).fill("."))

onInput("a", () => {
  cursorPosition[0]--
});

onInput("d", () => {
  cursorPosition[0]++
});


onInput("w", () => {
  cursorPosition[1]--
});

onInput("s", () => {
  cursorPosition[1]++
});

onInput("i", () => {
  grid[cursorPosition[1]][cursorPosition[0]] = sand;
});

onInput("k", () => {
  if (Math.floor(Math.random() * 30) == 0) {
    grid[cursorPosition[1]][cursorPosition[0]] = fish;
  } else {
    grid[cursorPosition[1]][cursorPosition[0]] = water;
  }
});

onInput("j", () => {
  grid[cursorPosition[1]][cursorPosition[0]] = block;
});

onInput("l", () => {
  grid[cursorPosition[1]][cursorPosition[0]] = air;
});




afterInput(() => {
  cursorPosition[0] = clamp(cursorPosition[0], 0, mapSize - 1)
  cursorPosition[1] = clamp(cursorPosition[1], 0, mapSize - 1)
});

let getCell = (x, y) => {
  if (x > mapSize - 1 || x < 0 || y > mapSize - 1 || y < 0) {
    return block
  } else {
    return grid[y][x]
  }
}

let everyCell = []
for (let y = 0; y < mapSize; y++) {
  for (let x = 0; x < mapSize; x++) {
    everyCell.push([x, y])
  }
}

let queue = everyCell.sort(() => Math.random() - .5).slice();

let tick = () => {

  let batch = 16;
  for (let i = 0; i < batch; i++) {
    let cellToCheck = queue.pop();
    if (queue.length == 0) {
      queue = everyCell.sort(() => Math.random() - .5).slice();
    }
    
    let x = cellToCheck[0]
    let y = cellToCheck[1]
    let cell = getCell(x, y)

    if (cell == sand) {
      if (getCell(x, y+1) == air || getCell(x, y+1) == water) {
        grid[y][x] = grid[y+1][x]
        grid[y+1][x] = sand
      } else {
        let dir = Math.random() > .5 ? 1 : -1;
        if (getCell(x + dir, y+1) == air || getCell(x + dir, y+1) == water) {
          grid[y][x] = grid[y+1][x+dir]
          grid[y+1][x+dir] = sand
        }
      }
    }

    if (cell == water) {
      if (getCell(x, y+1) == air) {
        grid[y][x] = grid[y+1][x]
        grid[y+1][x] = water
      } else {
        let dir = Math.random() > .5 ? 1 : -1;
        if (getCell(x + dir, y+1) == air) {
          grid[y][x] = grid[y+1][x+dir]
          grid[y+1][x+dir] = water
        } else if (getCell(x + dir, y) == air) {
          grid[y][x] = grid[y][x+dir]
          grid[y][x+dir] = water
        }
      }
    }

    if (cell == fish) {
      if (getCell(x, y+1) == air) {
        grid[y][x] = grid[y+1][x]
        grid[y+1][x] = fish
      }
      let shouldSwimUpDown = Math.floor(Math.random() * 10) == 0;
      if (shouldSwimUpDown) {
        let dir = Math.random() > .5 ? 1 : -1;
        if (getCell(x, y+dir) == water && getCell(x, y+dir*2) == water) {
          grid[y][x] = grid[y+dir][x]
          grid[y+dir][x] = fish;
        }
      } else {
        if (Math.floor(Math.random() * 5) == 0) {
          let dir = Math.random() > .5 ? 1 : -1;
          if (getCell(x+dir, y) == water) {
            grid[y][x] = grid[y][x+dir]
            grid[y][x+dir] = fish;
          }
        }
      }
    }
  }
  
  for (let y = 0; y < mapSize; y++) {
    for (let x = 0; x < mapSize; x++) {
      clearTile(x, y);
      addSprite(x, y, grid[y][x]);

      if (x == cursorPosition[0] && y == cursorPosition[1]) {
        clearTile(x, y);
        addSprite(x, y, cursor);
      }
    }
  }
  
  setTimeout(tick, 0);
}

tick();

