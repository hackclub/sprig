/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Block Dash
@author: Vaughn
@tags: []
@addedOn: 2025-00-00
*/


const player = "p"; // p = player
const block = "b"; // b = block

const rightStair = "r"; // r = right stair
const rightStairDown = "f"; // f = right downwards-facing stair
const leftStair = "l"; // l = left stair
const leftStairDown = "g"; // g = right downwards-facing stair

const leftSpike = "s"; // s = left spike
const leftSpikeDown = "c" // c = left downwards spike
const rightSpike = "x"; // x = right spike
const rightSpikeDown = "z" // z = right downwards spike
const bottomSpike = "d"; // d = down/bottom spike

setLegend(
  [ player, bitmap`
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
LLLLLLLLLLLLLLLL` ],
  [ rightStair, bitmap`
..............LL
..............LL
............LLLL
............LLLL
..........LLLLLL
..........LLLLLL
........LLLLLLLL
........LLLLLLLL
......LLLLLLLLLL
......LLLLLLLLLL
....LLLLLLLLLLLL
....LLLLLLLLLLLL
..LLLLLLLLLLLLLL
..LLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL` ],
  [ rightStairDown, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
..LLLLLLLLLLLLLL
..LLLLLLLLLLLLLL
....LLLLLLLLLLLL
....LLLLLLLLLLLL
......LLLLLLLLLL
......LLLLLLLLLL
........LLLLLLLL
........LLLLLLLL
..........LLLLLL
..........LLLLLL
............LLLL
............LLLL
..............LL
..............LL` ],
  [ leftStair, bitmap`
LL..............
LL..............
LLLL............
LLLL............
LLLLLL..........
LLLLLL..........
LLLLLLLL........
LLLLLLLL........
LLLLLLLLLL......
LLLLLLLLLL......
LLLLLLLLLLLL....
LLLLLLLLLLLL....
LLLLLLLLLLLLLL..
LLLLLLLLLLLLLL..
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL` ],
  [ leftStairDown, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLL..
LLLLLLLLLLLLLL..
LLLLLLLLLLLL....
LLLLLLLLLLLL....
LLLLLLLLLL......
LLLLLLLLLL......
LLLLLLLL........
LLLLLLLL........
LLLLLL..........
LLLLLL..........
LLLL............
LLLL............
LL..............
LL..............` ],
  
  
  [ leftSpike, bitmap`
..............33
............3333
............3333
............3333
.........3333333
.........3333333
.........3333333
......3333333333
......3333333333
......3333333333
...3333333333333
...3333333333333
...3333333333333
3333333333333333
3333333333333333
3333333333333333` ],
  [ leftSpikeDown, bitmap`
3333333333333333
3333333333333333
3333333333333333
...3333333333333
...3333333333333
...3333333333333
......3333333333
......3333333333
......3333333333
.........3333333
.........3333333
.........3333333
............3333
............3333
............3333
..............33` ],
  [ rightSpike, bitmap`
33..............
3333............
3333............
3333............
3333333.........
3333333.........
3333333.........
3333333333......
3333333333......
3333333333......
3333333333333...
3333333333333...
3333333333333...
3333333333333333
3333333333333333
3333333333333333` ],
  [ rightSpikeDown, bitmap`
3333333333333333
3333333333333333
3333333333333333
3333333333333...
3333333333333...
3333333333333...
3333333333......
3333333333......
3333333333......
3333333.........
3333333.........
3333333.........
3333............
3333............
3333............
33..............` ],
  [ bottomSpike, bitmap`
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
  
);

setSolids([block, player]);

let gameState = {
  level: 0,
  speed: 100,
  jumpSpeed: 10,
  jumpHeight: 4,
  gravity: 200,
  count: 0,
  isGameOver: false,
  isJumping: false,
  isInAir: false,
  isColliding: false,
};

const levels = [
  map`
.....bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
.....bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
.....fbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
......fbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
.......bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
.......fbbbbbbbbbbbbbbbbbbbbbbbg..................
..................................................
..................................................
..................................................
..................................................
..................................................
..................................................
..................................................
..................................................
..................................................
..................................................
..................................................
..................................................
....p........bbbbb.....sx...........sx....sx......
bbbbbbbbbbb........bbbbbbbbb....bbbbbbbbbbbbbbbbbb`,
  map`
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbg.....fbbbbbbbbbbbbbbb
.......fbbbbbbbbbbbbbbg...........................
..................................................
..................................................
..................................................
..................................................
..................................................
..................................................
..................................................
..................................................
..................................................
..................................................
.....................bb..........................b
.................bb...........sx....sx........bb..
p......sx....bb...............dd....dd.....bb.....
bbbbbbbbbbb...............bbbbbbbbbbbbbbb.........`,
  map`
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
.......fbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbg
...............fbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbg.
................fbbbbbbbbbbbbbbbbbbbbbbbbbbbbbg...
...................fbbbbbbbbbbbbbbbbbbbbbbbbbg....
....................fbbbbbbbbbbbbbbbbbbbbbbbg.....
......................fbbbbbbbbbbbbbbbbbbbbb......
........................fbbbbbbbbbbbbbbbbbbg......
...........................cz...cz...cz...........
...............b..................................
.............b....................................
...........b......................sx..............
p.......bb.......sx.....bbbbb....bbbbbbb..........
bb..bb..fg.......dd.bb..bbbbb.sx.bbbbg...bb.......
bb..fg...........dd.fg..bbbbb.dd.bbbb....fg.bbbbbb
bb...............dd.....bbbbb.dd.bbbb.........fbbb`,
  map`
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
.......fbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbg
...............fbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbg.
................fbbbbbbbbbbbbbbbbbbbbbbbbbbbbbg...
.....................fbbbbbg......................
.......................fbbg.......................
........................bb........................
......................sxbg........................
...............bbbbbbbbbb.........................
..................................................
...........bbb..............bbb...................
..................................................
.......bb...............bbb.......................
p.............sx...bbb...........bb...............
bbbbb......bbbbbbb....................b...b...bbbb
bbg...........................................bbbb`,
];


function movePlayer(dx, dy) {
  let pl = getFirst(player);
  pl.x += dx;
  pl.y += dy;
}

onInput("w", () => {
  tryJumping();
})


function tryJumping() {
  console.log(gameState.isInAir)
  if (gameState.isInAir) {
    return;
  }
  
  if (!gameState.isJumping){
    jumpCount = 0;
    slowJump();
    gameState.isJumping = true;
    setTimeout(tryJumping, gameState.jumpSpeed);
    
  } else {
    gameState.isJumping = false;
  }
}

let jumpCount = 0;

function slowJump() {
  
  if (jumpCount < gameState.jumpHeight) {
    jumpCount += 1;
    movePlayer(0, -1);
    setTimeout(slowJump, gameState.jumpSpeed);
  }
  
}

function checkForCollisions() {

  let pl = getFirst(player);
  let finalIsinAir = true;
  
  getAll(block).forEach((bl) => {

    if (pl.y + 1 == bl.y) { // block below player
      finalIsinAir = false;
    }
      
      
  });

  if (finalIsinAir == true) {
    gameState.isInAir = true
  } else {
    gameState.isInAir = false
  }


  // terrible code ik :D, could just loop all item types in a function but im lazy
  getAll(leftSpike).forEach((s) => {
    if (pl.x == s.x) {
      if (pl.y == s.y) {
        endGame();
        gameState.level = 0;
      } 
    }
  });
  getAll(leftSpikeDown).forEach((s) => {
    if (pl.x == s.x) {
      if (pl.y == s.y) {
        endGame();
        gameState.level = 0;
      } 
    }
  });
  getAll(rightSpike).forEach((s) => {
    if (pl.x == s.x) {
      if (pl.y == s.y) {
        endGame();
        gameState.level = 0;
      } 
    }
  });
  getAll(rightSpikeDown).forEach((s) => {
    if (pl.x == s.x) {
      if (pl.y == s.y) {
        endGame();
        gameState.level = 0;
      } 
    }
  });
  getAll(bottomSpike).forEach((s) => {
    if (pl.x == s.x) {
      if (pl.y == s.y) {
        endGame();
        gameState.level = 0;
      } 
    }
  });
  

  if (pl.x > 48) {
    gameState.level += 1

    if (gameState.level > 3) {
      winGame();
    } else {
      setMap(levels[gameState.level])
    }
  }
  
  if (pl.y > 18) {
    gameState.level = 0;
    endGame();
  }
  
}

function endGame() {
  console.log("ended game")
  setMap(levels[0]);
}

function winGame() {
  addText("You win!", { x: 5, y: 7, color: color`4` });
  gameState.isGameOver = true;
}

afterInput(() => {
  
})

function applyGravity() {

  let pl = getFirst(player);

  if (!gameState.isJumping) {
    movePlayer(0, 1);
  }
  if (gameState.isInAir) {
    movePlayer(0, 1);
  }
  
  
  setTimeout(applyGravity, gameState.gravity);
}

function gameLoop() {
  movePlayer(1, 0);
  
  checkForCollisions();
  gameState.count++;
  if (!gameState.isGameOver) {
    setTimeout(gameLoop, gameState.speed);
  }
}

setMap(levels[0]); // set initial map
applyGravity();
gameLoop();