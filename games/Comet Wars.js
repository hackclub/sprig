/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Comet Wars
@author: Uday Prakash Gupta
@tags: ['action']
@addedOn: 2024-12-03
*/

const player = "p";
const comet = "o";
const background = "b";

setLegend(
  [ player, bitmap`
.......00.......
......0770......
.....072270.....
.....0LLLL0.....
.00001111100000.
.01111111111110.
.00111111111100.
..000111111000..
....00111100....
.....011110.....
.....011110.....
.....011110.....
.....011110.....
.....011110.....
.....000000.....
......0000......` ],
  [ background, bitmap`
5555555555555555
5000000000000005
5000000000000005
5000000000000005
5000000000000005
5000000000000005
5000000000000005
5000000000000005
5000000000000005
5000000000000005
5000000000000005
5000000000000005
5000000000000005
5000000000000005
5000000000000005
5555555555555555` ],
  [ comet, bitmap`
......CCCC......
.....CC333C.....
....CC99933C....
....C3999933C...
..CCC9966999CC..
..CC99666699CCC.
CC399666666993CC
C33996666669933C
CC399966669993CC
CCC9999669999CCC
.C399999999933C.
..C339999993CC..
...C3399333CC...
...CCC3333CCC...
....CCC33CCC....
......CCCC......` ]
);


setMap(
  map`
........
........
........
........
........
........
........
...p....`
);

setBackground(background);


//Functions
function getcomet() {
  let x = Math.floor(Math.random() * 8);
  let y = 0;
  addSprite(x, y, comet);
}
 
function movecomet() {
  let comets = getAll(comet);
  
  for (let i = 0; i < comets.length; i++) {
    comets[i].y += 1;
  }
}

function removecomet() {
  let comets = getAll(comet);
 
  for (let i = 0; i < comets.length; i++) {
    if (comets[i].y == 7) {
      comets[i].remove();
    }
  }
}
 
function ifhit() {
  let comets = getAll(comet);
  let p = getFirst(player);
  for (let i = 0; i < comets.length; i++) {
    if (comets[i].x == p.x && comets[i].y == p.y) {
      return true;
    }
  }
  return false;
}

var started = true;
var timeTaken = 0;
var gameLoop = setInterval(() => {
  if (started) {
    timeTaken++;
  }
  removecomet();
  movecomet();
  getcomet();
  addText(`${timeTaken*2} Points`, {
      x: 0,
      y: 0,
      color: color`2`
    });
 
  if (ifhit()) {
    clearInterval(gameLoop);
    started = false;
    addText(`GAME OVER!`, {
      x: 5,
      y: 6,
      color: color`3`
    });
  }
}, 1000); // Update every second

onInput("a", () => {
  if (started) {
    getFirst(player).x -= 1;
  }
});
 
onInput("d", () => {
  if (started) {
    getFirst(player).x += 1;
  }
});
 

 


