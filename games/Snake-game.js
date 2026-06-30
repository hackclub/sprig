const headUp = "u";
const headDown = "d";
const headLeft = "l";
const headRight = "r";
const body = "b";
const food = "f";

setLegend(
  [ headUp,  bitmap`
................
................
.......33.......
.......33.......
.......33.......
.......33.......
.......33.......
.72222777722227.
7720027777200277
7720227777202277
7722227777222277
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777` ],
  [ headDown,  bitmap`
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7722227777222277
7722027777220277
7720027777200277
.72222777722227.
.......33.......
.......33.......
.......33.......
.......33.......
.......33.......
................
................` ],
  [ headLeft,  bitmap`
........77777777
.......777777777
.......222277777
.......202277777
.......200277777
.......222277777
.......777777777
..33333777777777
..33333777777777
.......777777777
.......222277777
.......202277777
.......200277777
.......222277777
.......777777777
........77777777` ],
  [ headRight,  bitmap`
77777777........
777777777.......
777772222.......
777772002.......
777772202.......
777772222.......
777777777.......
77777777733333..
77777777733333..
777777777.......
777772222.......
777772002.......
777772202.......
777772222.......
777777777.......
77777777........` ],
  [ body,  bitmap`
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
  [ food,  bitmap`
................
................
........4.......
.......4........
......3333......
.....333333.....
....33333333....
....33333333....
....33333333....
....33333333....
.....333333.....
......3333......
................
................
................
................` ]
);


setMap(map`
.....
..u..
.....
.....`);

// Starting position and direction
let direction = "right"; // "up", "down", "left", "right"
let score = 0;

// The snake array stores all [x, y] coordinates. Index 0 is the head.
let snake = [
  [8, 8], // Head
  [7, 8], // Body segment 1
  [6, 8]  // Body segment 2
];

let foodPos = [4, 4];

function gameTick() {
  let currentHead = snake[0];
  let newHead = [currentHead[0], currentHead[1]];

  // 1. Move head
  if (direction === "up") newHead[1] -= 1;
  if (direction === "down") newHead[1] += 1;
  if (direction === "left") newHead[0] -= 1;
  if (direction === "right") newHead[0] += 1;

  // 2. Check walls (Assuming a standard 16x12 Sprig map grid)
  if (newHead[0] < 0 || newHead[0] >= 16 || newHead[1] < 0 || newHead[1] >= 12) {
    gameOver();
    return;
  }

  // Check self-collision
  for (let segment of snake) {
    if (newHead[0] === segment[0] && newHead[1] === segment[1]) {
      gameOver();
      return;
    }
  }

  // 3. Add new head to array
  snake.unshift(newHead);

  // 4. Check food collision
  if (newHead[0] === foodPos[0] && newHead[1] === foodPos[1]) {
    score++;
    spawnFood();
  } else {
    snake.pop(); // Remove tail if no food eaten
  }

  // 5. Render to screen
  drawGame();
}

// Run the game tick every 200ms
const gameInterval = setInterval(gameTick, 200);

function drawGame() {
  let mapString = "";
  
  for (let y = 0; y < 12; y++) {
    for (let x = 0; x < 16; x++) {
      
      // 1. Check if coordinate matches the head
      if (x === snake[0][0] && y === snake[0][1]) {
        if (direction === "up") mapString += headUp;
        else if (direction === "down") mapString += headDown;
        else if (direction === "left") mapString += headLeft;
        else if (direction === "right") mapString += headRight;
      } 
      
      // 2. Check if coordinate is part of the body
      else if (snake.some(seg => seg[0] === x && seg[1] === y)) {
        mapString += body;
      } 
      
      // 3. Check if coordinate is food
      else if (x === foodPos[0] && y === foodPos[1]) {
        mapString += food;
      } 
      
      // 4. Empty tile
      else {
        mapString += ".";
      }
    }
    mapString += "\n";
  }
  
  setMap(mapString);
}

onInput("w", () => { if (direction !== "down") direction = "up"; });
onInput("s", () => { if (direction !== "up") direction = "down"; });
onInput("a", () => { if (direction !== "right") direction = "left"; });
onInput("d", () => { if (direction !== "left") direction = "right"; });

function spawnFood() {
  // Generate random coords inside the 16x12 grid
  let newX = Math.floor(Math.random() * 16);
  let newY = Math.floor(Math.random() * 12);
  
  // Make sure food doesn't land on the snake
  if (snake.some(seg => seg[0] === newX && seg[1] === newY)) {
    spawnFood();
  } else {
    foodPos = [newX, newY];
  }
}

function gameOver() {
  clearInterval(gameInterval);
  addText("Game Over!", { y: 5, color: color`3` });
}