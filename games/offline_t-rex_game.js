/*
@title: offline_t-rex_game
@author: zoya hussain
@tags: ['endless']
@addedOn: 2022-12-31
*/

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
0000000022222220
0000000200000002
0000000200200002
0000000200000002
0200000200000002
2020000200002220
2020002200000020
2002020000000220
2000200000000200
2000000000000022
0200000002200202
0020000020020200
0002000202002000
0000202000202000
0000222000222000
0000000000000000`],
  [sky, bitmap`
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
0000000000000000`],
  [cactus_1, bitmap`
0000000000000000
0000000000220000
0000002002222000
0000022002222020
0000022002222022
0000022002222022
0000022002222022
0000022002222022
0000022002222022
0000022202222022
0000002222222222
0000000002222000
2222222222222222
0000200002222000
0200000202222000
0000020002222002`],
  [ground, bitmap`
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
0000022222222220
2222220020000022
0000000000020000
0200002002000020
0000000000000000`],
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