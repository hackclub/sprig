/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: mister impossuble
@author: Prashanta Bhusal
@tags: [endless]
@addedOn: 2025-10-14
*/




let vy = 0;

const jumpHeight = -10;
const gravity = 5;
const terminalVelocity = 1;
const minTime = 150;
const maxTime = 250;

const dino = "p";
const sky = "s";
const cactus_1 = "o";
const ground = "g";

var score = 0;
var opening = 3;
var speed = 150;
var gameOver = false;


setLegend(
  [dino, bitmap`
................
...00...........
..04400.........
..0440.0........
..0440.0........
...00..0........
.......0........
.....00000......
....0666660.....
...066666660....
..06336663360...
..06666666660...
..06666366660...
...066666660....
....0000000.....
................`],
  [sky, bitmap`
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
7777777777777777`],
  [cactus_1, bitmap`
CCCCCCCCCCCCCCCC
CCCCCCCCCCCC44CC
CCCCDDCC44CCCCCC
CCDDCD4CCCCCCC4C
CDDDDDCCCCDDCCCC
DDDDDCCCCCDDDCCC
DDDCCCCCCCCDDCCC
CCCCCCCCCCCDDDCC
CCCC4CCCCCCCDDDC
CCCCCCCC4CCCDDDD
CCCDCCCCCCCCCCDC
CDDDCCCCCCCCCCCC
DDDCCCCCCCCDCCCC
CCCCCCCCCCCDDCCC
CCCCCCCCCCCCDDDC
CCCCCCCCCCCCCDDC`],
  [ground, bitmap`
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
777777C77CC77777
77777CCCCCCCCC77
77CCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC`],
);

setSolids([dino]);
setBackground(sky);

let level = 0;
const levels = [
  map`
sssssss
sssssss
pgggggg`,
];

setMap(levels[level]);

setPushables({
  [ dino ]: [],
});

function showMainMenu() {
    gameOver = true; // stop gameplay until player starts
    clearText();

    // Title at the top
    addText(`Mister Impossible`, { x: 1, y: 2, color: color`6` });

    // Instruction at the bottom
    addText(`Press "L" to start`, { x: 1, y: height() - 2, color: color`5` });
}
onInput("l", () => {
    if (gameOver) {  // only works on menu or after game over
        startGame();
    }
});


function checkGrounded(obj){
  var py = obj.y;
  obj.y++;
  if(py === obj.y){
    return true;
  }else{
    obj.y--;
    return false;
  }
}

onInput("w", () => {
  if(checkGrounded(getFirst(dino))){
    vy = jumpHeight;
  }
});


function lerp(a, b, f){
  return (a * (1 - f)) + (b * f);
}
function constrain(n, mi, ma){
  return (n < mi) ? mi : ((n > ma) ? ma : n);
}
function tick(){
  if(getFirst(dino)) getFirst(dino).y += Math.sign(vy);
  vy += gravity;
  vy = constrain(vy, -terminalVelocity, terminalVelocity);
  setTimeout(tick, lerp(minTime, maxTime, Math.abs(vy)/terminalVelocity));
}

function createCactus1() {
  let x = width()-1;
  let y = 2;
  addSprite(x, y, cactus_1);
}

function gameLoop() {   
  getAll(cactus_1).forEach((o) => {
    if (o.x == 0) {
      o.remove();
      score += 1;
    } else {
      o.x -= 1;
    };
  });


  if (getAll(cactus_1).length == 0 && Math.random() < 0.3) {
    createCactus1();
  }

  if (tilesWith(cactus_1, dino).length > 0) {
    lost();
  } 


  speed -= (150-speed);
  if (!gameOver) {
    setTimeout(gameLoop, speed);
  }
}


function lost() {
  gameOver = true;
  // console.log("You lost");
  setMap(map`
s.....
ssssss
ssposs
gggogg`);
  clearText();
  addText(`Game over! Press K\n\nScore: ${score}`, {x:1, y: 6, color: color`6`})
  
}
// --- add this directly after lost() ---
onInput("k", () => {
    if (gameOver) {
        startGame();
    }
});
function startGame() {
    gameOver = false;
    score = 0;
    vy = 0;
    clearText();

    level = 0;
    setMap(levels[level]);

    getAll(cactus_1).forEach(c => c.remove());

    gameLoop();
    tick();
}


showMainMenu();