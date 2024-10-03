/*
@title: Sweepar
@author: eshangonemad
@tags: []
@addedOn: 2024-03-20
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started
*/
const cursor = "c"
const bomb = "b"
const flag = "f"
const normal = "n"
const open = "o" 
const non="t"
const one="z"
const two="x"
const three="v"
const four="g"
const five="y"
setLegend([one,bitmap`
0000000000000000
0222222222222220
0222222222222220
0222222772222220
0222227772222220
0222277272222220
0222772272222220
0222722272222220
0222222272222220
0222222272222220
0222222272222220
0222277777772220
0222777777777220
0222222222222220
0222222222222220
0000000000000000`],
[two,bitmap`
0000000000000000
0222222222222220
0222222222222220
0222222222222220
0222222222222220
0222222222222220
0222222222222220
0222222222222220
0222222222222220
0222222222222220
0222222222222220
0222222222222220
0222222222222220
0222222222222220
0222222222222220
0000000000000000`],
[three, bitmap``],
          [four,bitmap`
0000000000000000
0222222222222220
0222222222222220
0222222222222220
0222222222222220
0222222222222220
0222222222222220
0222222222222220
0222222222222220
0222222222222220
0222222222222220
0222222222222220
0222222222222220
0222222222222220
0222222222222220
0000000000000000`],
          [five,bitmap`
0000000000000000
0222222222222220
0222222222222220
0222222222222220
0222333333222220
0222322222222220
0222322222222220
0222333333222220
0222222223222220
0222222223222220
0222322223222220
0222333333222220
0222222222222220
0222222222222220
0222222222222220
0000000000000000`],
  [ cursor, bitmap`
................
................
................
.....000000.....
....00000000....
...0000000000...
...0000440000...
...0004444000...
...0044444400...
...0000000000...
...0000000000...
....00000000....
.....000000.....
................
................
................` ],
  [ bomb, bitmap`
0000000000000000
0222222222222220
0222222222222220
0222222222222220
0222223223222220
0222223333222220
0222333333332220
0222233333322220
0222233333322220
0222333333332220
0222223333222220
0222223223222220
0222222222222220
0222222222222220
0222222222222220
0000000000000000` ],
  [ flag, bitmap`
0000000000000000
0111111111111110
0111L33333311110
0111L33333311110
0111L33333311110
0111L33333311110
0111L33333311110
0111L11111111110
0111L11111111110
0111L11111111110
0111L11111111110
0111L11111111110
0111L11111111110
0111L11111111110
0111111111111110
0000000000000000` ],
  [ normal, bitmap`
0000000000000000
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0000000000000000` ],
  [open, bitmap`
0000000000000000
0222222222222220
0222222222222220
0222222222222220
0222222222222220
0222222222222220
0222222222222220
0222222222222220
0222222222222220
0222222222222220
0222222222222220
0222222222222220
0222222222222220
0222222222222220
0222222222222220
0000000000000000`],
  [non,bitmap`
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
2222222222222222`]
)

const gameGrid = [
  [normal, normal, normal, normal, normal, normal, normal, normal],
  [normal, normal, normal, normal, normal, normal, normal, normal],
  [normal, normal, normal, normal, normal, normal, normal, normal],
  [normal, normal, normal, normal, normal, normal, normal, normal],
  [normal, normal, normal, normal, normal, normal, normal, normal],
  [normal, normal, normal, normal, normal, normal, normal, normal],
  [normal, normal, normal, normal, normal, normal, normal, normal],
  [normal, normal, normal, normal, normal, normal, normal, normal]
]

const placeBombs = () => {
  for (let i = 0; i < 5; i++) {
    let x = Math.floor(Math.random() * 8)
    let y = Math.floor(Math.random() * 8)
    if (gameGrid[y][x] !== bomb) {
      gameGrid[y][x] = bomb
    } else {
      i--
    }
  }
}

placeBombs()

let cursorX = 0
let cursorY = 0

const moveCursor = (directionX, directionY) => {
  if (cursorX + directionX >= 0 && cursorX + directionX < 8 && cursorY + directionY >= 0 && cursorY + directionY < 8) {
    cursorX += directionX
    cursorY += directionY
    getFirst(cursor).x = cursorX
    getFirst(cursor).y = cursorY
  }
}

const openSquare = () => {
  if (gameGrid[cursorY][cursorX] === bomb) {
    // Handle bomb hit (game over logic)
    addSprite(cursorX, cursorY, bomb);
    // console.log("Game over! You hit a bomb.");
    gameover();
  } else if (gameGrid[cursorY][cursorX] === flag) {
    // Handle unflagging logic
    clearTile(cursorX, cursorY);
    addSprite(cursorX, cursorY, normal);
    addSprite(cursorX, cursorY, cursor);
    // console.log("Square unflagged.");
  } else if (gameGrid[cursorY][cursorX] === normal) {
    // Handle opening logic
    const adjacentBombs = countAdjacentBombs(cursorX, cursorY);
    clearTile(cursorX, cursorY);
    if (adjacentBombs > 0) {
      // Display the number of adjacent bombs
      addSprite(cursorX, cursorY, getNumberSprite(adjacentBombs));
    } else {
      // No adjacent bombs, show open tile
      addSprite(cursorX, cursorY, open);
    }
    addSprite(cursorX, cursorY, cursor);
    // console.log("Square opened.");
    checkWin(); // Call the checkWin function after opening a square
  }
};


const countAdjacentBombs = (x, y) => {
  let count = 0;
  for (let dx = -1; dx <= 1; dx++) {
    for (let dy = -1; dy <= 1; dy++) {
      const nx = x + dx;
      const ny = y + dy;
      if (nx >= 0 && nx < 8 && ny >= 0 && ny < 8 && gameGrid[ny][nx] === bomb) {
        count++;
      }
    }
  }
  return count;
};

const getNumberSprite = (adjacentBombs) => {
  switch (adjacentBombs) {
    case 1:
      return one;
    case 2:
      return two;
    case 3:
      return three;
    case 4:
      return four;
    case 5:
      return five;
    default:
      return normal; // Just to handle unexpected cases, you can customize this
  }
};

const gameover = () => {
  const overl = map`
tttttttt
tttttttt
tttttttt
tttttttt
tttttttt
tttttttt
tttttttt
tttttttt`;
  setMap(overl);
  addText("GAME OVER", { 
    x: 6,
    y: 4,
    color: color`3`
  });
  addText("press i to reset", { 
    x: 2,
    y: 5,
    color: color`H`
  });
};

const flagSquare = () => {
  if (gameGrid[cursorY][cursorX] === normal || gameGrid[cursorY][cursorX] === bomb) {
    addSprite(cursorX, cursorY, flag);
    gameGrid[cursorY][cursorX] = flag;
    // console.log("Square flagged.");
  } else if (gameGrid[cursorY][cursorX] === flag) {
    clearTile(cursorX,cursorY);
    addSprite(cursorX,cursorY,normal);
    addSprite(cursorX,cursorY,cursor);
    gameGrid[cursorY][cursorX] = normal;
    // console.log("Flag removed.");
  }
};

const clear = () => {
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      clearTile(x, y);
      gameGrid[y][x] = normal;
    }
  }
};
const checkWin = () => {
  let nonBombCount = 0;
  let flaggedCount = 0;
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      if (gameGrid[y][x] === normal || gameGrid[y][x] === flag) {
        nonBombCount++;
        if (gameGrid[y][x] === flag) {
          flaggedCount++;
        }
      }
    }
  }
  if (nonBombCount === 64 - 5 && flaggedCount === 5) { // All non-bomb squares opened and all bombs flagged
    // Player wins
    const winMap = map`
wwwwwwww
wwwwwwww
wwwwwwww
wwwwwwww
wwwwwwww
wwwwwwww
wwwwwwww
wwwwwwww`;
    setMap(winMap);
    addText("YOU WIN!", { 
      x: 6,
      y: 4,
      color: color`3`
    });
    addText("press i to reset", { 
      x: 2,
      y: 5,
      color: color`L`
    });
  }
};

const initialMap = map`
nnnnnnnn
nnnnnnnn
nnnnnnnn
nnnnnnnn
nnnnnnnn
nnnnnnnn
nnnnnnnn
nnnnnnnn
`;
setMap(initialMap);
addSprite(cursorX, cursorY, cursor);

onInput("w", () => moveCursor(0, -1));
onInput("a", () => moveCursor(-1, 0));
onInput("s", () => moveCursor(0, 1));
onInput("d", () => moveCursor(1, 0));
onInput("j", openSquare);
onInput("k", flagSquare);
onInput("l", gameover);
onInput("i", () => {
	clearText()
  clear();
  placeBombs();
  setMap(initialMap);
  addSprite(cursorX, cursorY, cursor);
});
