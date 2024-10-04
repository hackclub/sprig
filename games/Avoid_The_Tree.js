/*
@title: Avoid_The_Tree
@author: Samarth Verulkar
@tags: ['endless']
@addedOn: 2023-01-05

References and inspirations:
Coding Demo 5: Gravity by Leonard (Omay)
flappy_bird_but_no_gravity_and_worse by sam liu 
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
......44........
...4444.........
.....44.........
.....66.........
...666666.......
..66666666......
.666666000......
.6666600006.....
666666600666....
666666666666....
6666666666666333
6666666666666333
66666666666663..
.66666666666....
.6666666666.....
.66666666.......`],
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
CCCCCCCCCCCCCCCC
CCCCDDCCCCCCCCCC
CCDDCDCCCCCCCCCC
CDDDDDCCCCDDCCCC
DDDDDCCCCCDDDCCC
DDDCCCCCCCCDDCCC
CCCCCCCCCCCDDDCC
CCCCCCCCCCCCDDDC
CCCCCCCCCCCCDDDD
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
77777CCCCCCCCCC7
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC`],
);

setSolids([dino]);
setBackground(sky);

let level = 0;
const levels = [
  map`
ssssss
ssssss
pggggg`,
];

setMap(levels[level]);

setPushables({
  [ dino ]: [],
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
ssssss
ssssss
ssssss`);
  clearText();
  addText(`Game over!\n\nScore: ${score}`, {x:1, y: 6, color: color`2`})
}

gameLoop();
tick();
