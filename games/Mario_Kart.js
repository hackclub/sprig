/*
@title: Mario_Kart
@author: nucleiav */
@tags: ['endless']
@addedOn: 2023-01-13

let n = 0;

const jump_ht = -3;
const gravity = 3;
const terminalSpeed = 10;
const min_t = 200;
const max_t = 250;

const mario = "p";
const sky = "s";
const block = "o";
const ground = "g";
const Game_Over = "l";

var score = 0;
var initial = 10;
var speed = 150;
var GameOver = false;


setLegend(
  [mario, bitmap`
.....33333......
....333333333...
....CCC6606.....
...C6C6660666...
...C6CC6666666..
...CC66666666...
.....6666666....
....333333......
...3300000333...
..333030303333..
..663033303366..
..666333333666..
..663333333366..
....333..333....
...LLL....LLL...
..LLLL....LLLL..
`],
  [sky, bitmap`
5575557575757775
7757222575757577
7757222275757775
5752222227575755
7772222557575555
5555757555575755
7577575777575755
5575557575757775
7757222575757577
7757222275757775
5752222227575755
7772222557575555
5555757555575755
7577575777575755
5555757555575755
7577575777575755
`],
  [block, bitmap`
................
...00000000000..
...09966099660..
...09966099660..
...09966099660..
...00000000000..
...00000000000..
...09966099660..
...09966099660..
...09966099660..
...00000000000..
................
`],
  [ground, bitmap`
......444444....
...4444444444...
444444444C44444.
.444444444C44444
.......4444C44..
.......44444C44.
.......44444CC4.
............CC..
............CCC.
............CCC.
............CCC.
............CCC.
...........CCCC.
.....4444444646.
6644444999649666
4464996949946664
9699996996999969
9999999999999999`],
  [Game_Over, bitmap`
0000000000000000
1111111111111111
2222222222222222
3333333333333333
4444444444444444
5555555555555555
6666666666666666
7777777777777777
8888888888888888
9999999999999999
8888888888888888
7777777777777777
6666666666666666
5555555555555555
4444444444444444
3333333333333333
2222222222222222
1111111111111111
0000000000000000
`],
);

setSolids([mario]);
setBackground(sky);

let level = 0;
const levels = [
  map`
sssssssss
sssssssss
pgggggggg
`,
];

setMap(levels[level]);

setPushables({
  [ mario ]: [],
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
  if(checkGrounded(getFirst(mario))){
    n = jump_ht;
  }
});


function lerp(a, b, f){
  return (a * (1 - f)) + (b * f);
}
function constrain(n, mi, ma){
  return (n < mi) ? mi : ((n > ma) ? ma : n);
}
function start(){
  if(getFirst(mario)) getFirst(mario).y += Math.sign(n);
  n += gravity;
  n = constrain(n, -terminalSpeed, terminalSpeed);
  setTimeout(start, lerp(min_t, max_t, Math.abs(n)/terminalSpeed));
}

function makeBlock() {
  let x = width()-1;
  let y = 2;
  addSprite(x, y, block);
}

function gameScore() {   
  getAll(block).forEach((o) => {
    if (o.x == 0) {
      o.remove();
      score += 1;
    } else {
      o.x -= 1;
    };
  });


  if (getAll(block).length == 0 && Math.random() < 0.3) {
    makeBlock();
  }

  if (tilesWith(block, mario).length > 0) {
    lost();
  } 


  speed -= (150-speed);
  if (!GameOver) {
    setTimeout(gameScore, speed);
  }
}


function lost() {
  GameOver = true;
  // console.log("You lost");
  setMap(map`
llllll
llllll
llllll`);
  clearText();
  addText(`Game over!\n\nScore: ${score}`, {x:2, y: 5, color: color`0`})
}

gameScore();
start();