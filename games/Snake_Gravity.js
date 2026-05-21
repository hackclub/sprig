/*
@title: Snake_Gravity
@author: Jojotheamazing
@description: Don't fall eat appless go to portal
@tags: ['Fun', 'Puzzle']
@addedOn: 2026-04-07
*/

const head = "h";
const body = "b";
const apple = "a";
const wall = "#";
const portal = "p";
const lockedPortal = "l";

let dir = "right";

let shouldGrow = false;
let gameState = "playing"; //playing , dead,win
let deathReason = "";

let history = [];

let snake = [];

//best res 20x16
let cols = 20;
let rows = 16;


const levels = [
  {
    width:10 ,
    height: 6,
    snake: [
      { x: 2, y: 1 }
    ],
    apples: [
      { x: 6, y: 1 },
      { x: 4, y: 1 }
    ],
    portal: { x: 8, y: 1 },
    walls: [
      { x: 2, y: 2 },
      { x: 3, y: 2 },
      { x: 4, y: 2 },
      { x: 6, y: 2 }
    ]
  },
  
  {
    width:10 ,
    height: 6,
    snake: [
      { x: 4, y: 1 },
      { x: 3, y: 1 },
      { x: 2, y: 1 }
    ],
    apples: [
      { x: 6, y: 1 },
      { x: 1, y: 4 }
    ],
    portal: { x: 8, y: 5 },
    walls: [
      { x: 3, y: 2 },
      { x: 4, y: 2 },
      { x: 4, y: 5 },
      { x: 5, y: 5 },
      { x: 3, y: 5 }
      ,
      { x: 6, y: 5 }
    ]
  },
  
  {
    width:10 ,
    height: 6,
    snake: [
      { x: 4, y: 1 },
      { x: 3, y: 1 },
      { x: 2, y: 1 }
    ],
    apples: [
      { x: 6, y: 1 },
      { x: 5, y: 1 },
      { x: 1, y: 4 }
    ],
    portal: { x: 8, y: 5 },
    walls: [
      { x: 3, y: 2 },
      { x: 4, y: 2 },
      { x: 4, y: 5 },
      { x: 5, y: 4 },
      { x: 3, y: 5 }
    ]
  },
  {
    width:10 ,
    height: 8,
    snake: [
      { x: 2, y: 3},
      { x: 3, y: 3 },
      { x: 4, y: 3 }
    ],
    apples: [
      { x: 2, y: 2 },
      { x: 5, y: 2 }
    ],
    portal: { x: 5, y: 0 },
    walls: [
      { x: 3, y: 1},
      { x: 6, y: 2 },
      { x: 3, y: 4 },
      { x: 6, y: 4 },
      { x: 4, y: 6 }
    ]
  },
  {
  width: 16,
  height: 12,

  snake: [
    { x: 2, y: 7 },
    { x: 2, y: 6 },
    { x: 2, y: 5 },
    { x: 3, y: 5 }
  ],

  apples: [
    { x: 2, y: 4 },
    { x: 13, y: 4 },
    { x: 3, y: 7 },
    { x: 6, y: 8 }
  ],

  walls: [
    { x: 9, y: 3 },
    { x: 8, y: 4 },
    { x: 7, y: 5 },
    { x: 3, y: 6 },
    { x: 4, y: 6 },
    { x: 4, y: 7 },
    { x: 5, y: 7 },
    { x: 3, y: 9 },
    { x: 4, y: 9 },
    { x: 12, y: 9 }
  ],

  portal: { x: 4, y: 1 }
},
{
width:16,
height:12,
snake:[{x:7,y:5},{x:6,y:5},{x:5,y:5},{x:5,y:6}],
apples:[{x:7,y:2}],
walls:[{x:6,y:1},{x:6,y:2},{x:8,y:2},{x:8,y:3},{x:12,y:3},{x:10,y:4},{x:12,y:4},{x:2,y:5},{x:3,y:5},{x:4,y:5},{x:10,y:5},{x:2,y:6},{x:6,y:6},{x:10,y:6},{x:11,y:6},{x:12,y:6},{x:2,y:7},{x:4,y:7},{x:6,y:7},{x:7,y:7},{x:15,y:8},{x:1,y:9},{x:2,y:9},{x:3,y:9},{x:13,y:9},{x:14,y:9},{x:15,y:9},{x:1,y:10},{x:2,y:10},{x:3,y:10},{x:5,y:10},{x:7,y:10},{x:9,y:10},{x:10,y:10},{x:11,y:10},{x:13,y:10},{x:14,y:10},{x:15,y:10},{x:1,y:11},{x:2,y:11},{x:3,y:11},{x:9,y:11},{x:10,y:11},{x:11,y:11}],
portal:{x:3,y:3}
},
  {
width:16,
height:12,
snake:[{x:4,y:7},{x:3,y:7},{x:3,y:8},{x:3,y:9},{x:4,y:9},{x:5,y:9},{x:5,y:10},{x:5,y:11}],
apples:[{x:6,y:5},{x:8,y:5},{x:5,y:6},{x:7,y:6},{x:9,y:6},{x:6,y:7},{x:8,y:8}],
walls:[{x:2,y:0},{x:3,y:0},{x:4,y:0},{x:5,y:0},{x:6,y:0},{x:7,y:0},{x:8,y:0},{x:9,y:0},{x:10,y:0},{x:2,y:1},{x:3,y:1},{x:4,y:1},{x:5,y:1},{x:6,y:1},{x:7,y:1},{x:8,y:1},{x:9,y:1},{x:2,y:2},{x:3,y:2},{x:4,y:2},{x:5,y:2},{x:6,y:2},{x:7,y:2},{x:8,y:2},{x:9,y:2},{x:3,y:3},{x:4,y:3},{x:5,y:3},{x:6,y:3},{x:7,y:3},{x:8,y:3},{x:9,y:3},{x:10,y:3},{x:3,y:4},{x:4,y:4},{x:7,y:4},{x:8,y:4},{x:9,y:4},{x:10,y:4},{x:11,y:4},{x:3,y:5},{x:4,y:5},{x:10,y:5},{x:11,y:5},{x:4,y:6},{x:6,y:6},{x:10,y:6},{x:9,y:7},{x:10,y:7},{x:4,y:8},{x:5,y:8},{x:6,y:8},{x:9,y:8},{x:10,y:8},{x:6,y:9},{x:7,y:9},{x:8,y:9},{x:9,y:9},{x:7,y:10},{x:8,y:10}],
portal:{x:1,y:7}
}
];
let currentLevel =0;

let apples = [];
let portalPos = { x: 0, y: 0 };
let portalUnlocked = false;

setLegend(
  [head, bitmap`
.DDDDDDDDDDDDDD.
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DD222DDDDDD222DD
DD2LLDDDDDD2LLDD
DD2L0DDDDDD2L0DD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDCCCCCDDDDDD
DDDDDD3C3DDDDDDD
DDDDDD3C3DDDDDDD
DDDDD3C33DDDDDDD
DDDDD333DDDDDDDD
DDDDDDDDDDDDDDDD
.DDDDDDDDDDDDDD.`],
  [body, bitmap`
.DDDDDDDDDDDDDD.
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDD444444DDDDD
DDDD44444444DDDD
DDDD44444444DDDD
DDDD44444444DDDD
DDDD44444444DDDD
DDDD44444444DDDD
DDDD44444444DDDD
DDDDD444444DDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
.DDDDDDDDDDDDDD.`],
  [apple, bitmap`
................
........DD4.....
.......D44......
.......D4.......
.....333333.....
...C333333333...
..CC3333333339..
..CC3333333339..
..CC3333333339..
..CC3333333339..
...CC33333339...
...CC33333339...
...CC33333339...
....CC333339....
.....C33339.....
................`],
  [wall, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LL111111111111LL
LL111111111111LL
LL111111111111LL
LL111111111111LL
LL111111111111LL
LL111111111111LL
LL111111111111LL
LL111111111111LL
LL111111111111LL
LL111111111111LL
LL111111111111LL
LL111111111111LL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],
  [portal, bitmap`
....HHHHHHHH....
...8HHHHHHHH8...
..8HH888888HH8..
.8HH88888888HH8.
HHH8888888888HHH
HH888HH88HH888HH
HH888H888H8888HH
HH888HH888H888HH
HH8888H88HH888HH
HH888H8888H888HH
HH888HH88HH888HH
HHH8888888888HHH
.8HH88888888HH8.
..8HH888888HH8..
...8HHHHHHHH8...
....HHHHHHHH....`],
  [lockedPortal, bitmap`
....LLLLLLLL....
...1LLLLLLLL1...
..1LL111111LL1..
.1LL11111111LL1.
LLL1111111111LLL
LL111LL11LL111LL
LL111L111L1111LL
LL111LL111L111LL
LL1111L11LL111LL
LL111L1111L111LL
LL111LL11LL111LL
LLL1111111111LLL
.1LL11111111LL1.
..1LL111111LL1..
...1LLLLLLLL1...
....LLLLLLLL....`]
);

function saveState() {
  
  history.push({
    snake: snake.map(p => ({ ...p })),
    
    apples: apples.map(a=> ({ ...a })),
    
    portalUnlocked:portalUnlocked,
    dir:dir
  });
  
}

function win() {
  gameState = "win";

  clearText();

  addText("CONGRATS!", { y: 2, color: color`6` });
  
  addText("You escaped!", { y: 3, color: color`6` });
  
  addText("K: Next", { y: 5, color: color`3` });
  addText("L: Retry", { y: 6, color: color`3` });
}

function die(reason) {
  gameState = "dead";
  deathReason = reason;

  clearText();

  addText("YOU DIED",{ y: 3, color: color`3`});
  
  addText(reason, { y:5, color: color`5`});
  
  addText("Press L",{y:7, color: color`7`});
}

function loadLevel(i) {
  let level= levels[i];

  cols =level.width;
  rows =level.height;
  
  snake= level.snake.map(p => ({ ...p }));
  apples= level.apples.map(a => ({ ...a }));
  portalPos={ ...level.portal };

  portalUnlocked=false;
  history = [];
  
  let head = snake[0];
  let next = snake[1];

  if (next) {
    if (next.x < head.x) dir = "right";
    else if (next.x > head.x) dir = "left";
    else if (next.y < head.y) dir = "down";
    else if (next.y > head.y) dir = "up";
  }
  
  render();
}

function restartLevel() {
  gameState ="playing";
  clearText();
  loadLevel(currentLevel);
}



function checkFallDeath() {
  
  for (let part of snake) {
    
    if (part.y >= rows) {
      die("Fell into void");
      return true;
      
    }
  }
  return false;
}

function canFall() {
  for (let part of snake) {
    let ny = part.y + 1;

    // walls only
    for (let w of levels[currentLevel].walls) {
      if (w.x === part.x && w.y === ny) return false;
    }
  }

  return true;
}

function applyGravity() {
  while (canFall()) {
    snake = snake.map(part => ({
      x: part.x,
      y: part.y + 1
    }));

    // check after each step
    if (checkFallDeath()) return;
  }
}

function growSnake() {
  let tail = snake[snake.length - 1];
  snake.push({ x: tail.x, y: tail.y });
}

function canMove(nx, ny) {
  
  if (nx<0 || nx>= cols || ny <0 || ny>= rows) return false;

  // self collision
  for (let i = 0; i < snake.length; i++) {
    if (snake[i].x ===nx && snake[i].y=== ny) return false;
    
  }

  for (let w of levels[currentLevel].walls) {
    if (w.x === nx && w.y === ny)return false;
  }

  return true;
}

function undo() {
  if (history.length===0) return;

  let prev= history.pop();

  snake= prev.snake.map(p => ({ ...p }));
  apples =prev.apples.map(a => ({ ...a }));
  portalUnlocked=prev.portalUnlocked;
  dir =prev.dir;

  render();
}

function moveSnake() {
  if (gameState !=="playing") return;
  
  let head =snake[0];
  
  let nx = head.x;
  let ny = head.y;

  if (dir=== "up") ny--;
  if (dir=== "down") ny++;
  if (dir ==="left") nx--;
  if (dir ==="right") nx++;

  if (!canMove(nx, ny)) return;
  saveState();
  let prev=snake.map(s => ({ ...s }));

  head.x =nx;
  head.y= ny;

  for (let i = 1; i < snake.length; i++) {
    snake[i] = prev[i - 1];
  }
  checkPortal();
  checkApple();
  

  if (shouldGrow) {
    let tail =prev[prev.length - 1];
    snake.push({ x: tail.x, y: tail.y });
    shouldGrow =false;
  }

  applyGravity();

  render();
}

function checkApple() {
  for (let i =0; i < apples.length; i++) {
    if (
      snake[0].x=== apples[i].x &&
      snake[0].y ===apples[i].y
    ) {
      shouldGrow = true;

      // remove that apple
      apples.splice(i, 1);

      break;
    }
  }

  // unlock portal if all apples gone
  if (apples.length === 0) {
    portalUnlocked= true;
  }
}

function render() {
  let mapStr ="";
  
  for (let y = 0; y < rows; y++) {
    let row ="";

    for (let x = 0; x < cols; x++) {
      let char = ".";

      // walls
      
      for (let w of levels[currentLevel].walls) {
        if (w.x === x && w.y === y) char = "#";
      }

      // apples
      for (let a of apples) {
        if (a.x === x && a.y === y) char = "a";
      }

      // portal
      if (x === portalPos.x && y === portalPos.y) {
        
        char = portalUnlocked ? "p" : "l";
        
      }
      
      // snake
      snake.forEach((part, i) => {
        if (part.x === x && part.y === y) {
          
          char = i === 0 ? "h" : "b";
        }
      });

      row += char;
    }

    mapStr +=row + "\n";
  }
  
  setMap(map`${mapStr}`);
  addText("Undo: J", { y: 1, color: color`C` });
}

function setDirection(newDir) {
  if (
    (dir === "up" && newDir === "down") ||
    (dir === "down" && newDir === "up") ||
    (dir === "left" && newDir === "right") ||
    (dir === "right" && newDir === "left")
  ) {
    return;
  }
  
  dir = newDir;
  moveSnake();
}

onInput("w", () => { setDirection("up");  });
onInput("s", () => { setDirection("down"); });
onInput("a", () => { setDirection("left");  });
onInput("d", () => { setDirection("right");  });

onInput("l", () => {
  if (gameState === "dead") {
    restartLevel();
    return;
  }

  if (gameState === "win") {
    if (currentLevel === levels.length - 1) {
      currentLevel = 0;
    }
    loadLevel(currentLevel);
    gameState = "playing";
    clearText();
  }
});

onInput("k", () => {
  if (gameState !== "win") return;

  if (currentLevel < levels.length - 1) {
    currentLevel++;
    
    loadLevel(currentLevel);
    gameState ="playing";
    
    clearText();
  } else {
    
    clearText();
    
    addText("ALL LEVELS DONE!", { y: 2, color: color`4` });
    
    addText("L: Replay", { y: 4, color: color`3` });
  }
});

onInput("j", () => {
  if (gameState === "playing") {
    undo();
  }
});

function checkPortal() {
  if (!portalUnlocked) return;

  let head = snake[0];

  if (head.x === portalPos.x && head.y === portalPos.y) {
    win();
  }
}

// start game
loadLevel(currentLevel);
