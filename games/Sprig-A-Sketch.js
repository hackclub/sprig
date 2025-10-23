/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Sprig-A-Sketch
@author: ConstintCreations
@description: Draw on your Sprig! There are 15 colors and 5 brush sizes to choose from.
@tags: ['utility', 'sandbox']
@addedOn: 2025-10-22
*/

const white = "w"
const black = "z"
const darkGray = "d"
const lightGray = "l"
const red = "r"
const darkRed = "R"
const blue = "b"
const darkBlue = "B"
const yellow = "y"
const darkYellow = "Y"
const green = "g"
const darkGreen = "G"
const pink = "p"
const purple = "P"
const orange = "o"

setLegend(
  [ white, bitmap`
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
2222222222222222` ],
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
  [ lightGray, bitmap`
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111` ],
  [ red, bitmap`
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
3333333333333333` ],
  [ darkRed, bitmap`
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
  [ blue, bitmap`
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
  [ darkBlue, bitmap`
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
5555555555555555` ],
  [ yellow, bitmap`
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
6666666666666666` ],
  [ darkYellow, bitmap`
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
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
  [ green, bitmap`
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
4444444444444444` ],
  [ darkGreen, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD` ],
  [ pink, bitmap`
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
8888888888888888` ],
  [ purple, bitmap`
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
HHHHHHHHHHHHHHHH` ],
  [ orange, bitmap`
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
9999999999999999` ],
)

const colors = [
  `w`,
  `z`,
  `d`,
  `l`,
  `r`,
  `R`,
  `b`,
  `B`,
  `y`,
  `Y`,
  `g`,
  `G`,
  `p`,
  `P`,
  `o`
]

setSolids([])

let cursorPos = [0, 0];
let currentColorIndex = 1;
let drawnMap;
let brushSize = 1;
let drawToggle = false;

function resetMap() {
  let mapArray = [];
  for(let y = 0; y < 64; y++) {
    mapArray[y] = [];
    for(let x = 0; x < 80; x++) {
      mapArray[y][x] = `w`;
    }
  }

  drawnMap = mapArray;
  
  renderMap(mapArray);
}

resetMap();

/*function drawSidebar(mapArray) {
  for(let y = 0; y < 64; y++) {
    for(let x = 64; x < 80; x++) {
      mapArray[y][x] = `l`;
    }
  }

  return mapArray;
}*/

function drawCursor(mapArray) {
  mapArray[cursorPos[1]][cursorPos[0]] = colors[currentColorIndex];

  const radius = Math.floor(brushSize / 2);
  for (let dy = -radius; dy <= radius; dy++) {
    for (let dx = -radius; dx <= radius; dx++) {
      const x = cursorPos[0] + dx;
      const y = cursorPos[1] + dy;
      if (x >= 0 && x < 80 && y >= 0 && y < 64) {
        if (brushSize == 3) {
          if (dx == 0 || dy == 0) {
            mapArray[y][x] = colors[currentColorIndex];
          }
        } else {
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < radius + 0.5) {
            mapArray[y][x] = colors[currentColorIndex];
          }
        }
      }
    }
  }
  
  return mapArray;
}

function renderMap(mapArray) {
  let lMap = mapArray.map(row => [...row]);
  //lMap = drawSidebar(lMap);
  lMap = drawCursor(lMap);
  let drawMap = ``;
  for(let y = 0; y < 64; y++) {
    for(let x = 0; x < 80; x++) {
      drawMap += lMap[y][x];
    }
    drawMap += `\n`;
  }
  setMap(drawMap);
}
  
onInput("w", () => {
  moveCursor("up");
})

onInput("a", () => {
  moveCursor("left");
})

onInput("s", () => {
  moveCursor("down");
})

onInput("d", () => {
  moveCursor("right");
})

function moveCursor(direction) {
  let newCursorPos = cursorPos;
  switch (direction) {
    case "up":
      if (cursorPos[1] == 0) {
        return;
      }
      newCursorPos[1]--;
      break;
    case "down":
      if (cursorPos[1] == 63) {
        return;
      }
      newCursorPos[1]++;
      break;
    case "left":
      if (cursorPos[0] == 0) {
        return;
      }
      newCursorPos[0]--;
      break;
    case "right":
      if (cursorPos[0] == 79) {
        return;
      }
      newCursorPos[0]++;
      break;
  }
  cursorPos = newCursorPos;
  if (drawToggle) {
    draw();
  };
  renderMap(drawnMap);
}

function draw() {
  const radius = Math.floor(brushSize / 2);
  for (let dy = -radius; dy <= radius; dy++) {
    for (let dx = -radius; dx <= radius; dx++) {
      const x = cursorPos[0] + dx;
      const y = cursorPos[1] + dy;
      if (x >= 0 && x < 80 && y >= 0 && y < 64) {
        if (brushSize == 3) {
          if (dx == 0 || dy == 0) {
            drawnMap[y][x] = colors[currentColorIndex];
          }
        } else {
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < radius + 0.5) {
            drawnMap[y][x] = colors[currentColorIndex];
          }
        }
      }
    }
  }

  renderMap(drawnMap);
}

onInput("i", () => {
  draw();
})

onInput("j", () => {
  currentColorIndex = (currentColorIndex + 1) % colors.length;
  if (drawToggle) {
    draw();
  }
  renderMap(drawnMap);
})

onInput("k", () => {
  drawToggle = !drawToggle;
  if (drawToggle) {
    draw();
  }
})

onInput("l", () => {
  if (brushSize + 2 <= 9) {
    brushSize += 2;
  } else {
    brushSize = 1;
  }
  renderMap(drawnMap);
})

afterInput(() => {
  
})
