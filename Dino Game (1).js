/*
@title:DINO GAME
@author:whitedevil2807 */

let vy = 0;

const jumpHeight = -2;
const gravity = 2;
const terminalVelocity = 10;
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
6666666633333336
6666666366666663
6666666366366663
6666666366666663
6366666366666663
3636666366663336
3636663366666636
3663636666666336
3666366666666366
3666666666666633
6366666663366363
6636666636636366
6663666363663666
6666363666363666
6666333666333666
6666666666666666`],
  [sky, bitmap`
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
  [cactus_1, bitmap`
6666666666666666
6666666666336666
6666663663333666
6666633663333636
6666633663333633
6666633663333633
6666633663333633
6666633663333633
6666633663333633
6666633363333633
6666663333333333
6666666663333666
3333333333333333
6666366663333666
6366666363333666
6666636663333663`],
  [ground, bitmap`
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
6666633333333336
3333336636666633
6666666666636666
6366663663666636
6666666666666666`],
);

setSolids([dino]);
setBackground(sky);

let level = 0;
const levels = [
  map`
ssssss
pgggog
ssssss`,
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
  console.log("You lost");
  setMap(map`
ssssss
ssssss
ssssss`);
  clearText();
  addText(`Game over!\n\nScore: ${score}`, {x:1, y: 6, color: color`2`})
}

gameLoop();
tick();