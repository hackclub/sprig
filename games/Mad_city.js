
/* 
@title: Mad_city
@author: Andromeda
@tags: ['endless']
@addedOn: 2023-04-26
*/

    /*
Written by Andrd
*/ 

const car = "c"

const cones = "C"
const holes = "h"
const pedestrian = "p"

const road = "s"
const blankRoad = "b"
const sidewalk = "k"

var speed = 500;
const maxSpeed = 500;

var currentSpeed = 0.1;
var dead = false;

setLegend(
  [ car, bitmap`
................
................
...000......000.
...777777777779.
..9777111111113.
.99771111111L17.
.77771111111L17.
.77771111111L17.
.77771111111L17.
.77771111111L17.
.99771111111L17.
..9777111111113.
...777777777779.
...000......000.
................
................` ],
  [ cones, bitmap`
.....666666.....
....69999996....
....66666666....
....66666666....
....66666666....
...6999999996...
...6666666666...
...6666666666...
..699999999996..
..666666666666..
.69999999999996.
.66666666666666.
.99999999999999.
.66666666666666.
6666666666666666
6666666666666666` ],
  [ holes, bitmap`
................
....11111111....
...11LLLLLL11...
..1LLLLLLLLLL1..
.11LL000000LL11.
.1LL00000000LL1.
.1LL00000000LL1.
.1LL00000000LL1.
.1LL00000000LL1.
.1LL00000000LL1.
.1LL00000000LL1.
.11LL000000LL11.
..1LLLLLLLLLL1..
...11LLLLLL11...
....11111111....
................` ],
  [ pedestrian,bitmap`
................
................
.......666......
.......660......
.......666......
........6.......
......99999.....
......99999.....
......99999.....
......99999.....
......9DDD9.....
......6DDD6.....
.......DDD......
.......DDD......
.......DDD......
.......DDD......`],

  [ road,bitmap`
LLLLLLLLLLLLLLLL
666666LLL6666666
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
6666666LL6666666
LLLLLLLLLLLLLLLL`],
  [ blankRoad,bitmap`
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
LLLLLLLLLLLLLLLL`],
  [ sidewalk,bitmap`
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111`],
)

const obstacles = [
  "C",
  "h",
  "p"
];

setSolids([])

let level = 0
const levels = [
  map`
kkkkkkkkk
bbbbbbbbb
bbbbbbbbb
sssssssss
bbbbbbbbb
sssssssss
bbbbbbbbb
sssssssss
bbbbbbbbb
kkkkkkkkk`
]

setMap(levels[level])

setPushables({
  [ car ]: []
})

onInput("s", () => {
  var height = getFirst(car).y;
  if(height == 8){
    return;
  }
  getFirst(car).y += 1
})

onInput("w", () => {
  var height = getFirst(car).y;
  if(height == 1){
    return;
  }
  getFirst(car).y -= 1
})

onInput("j", () => {
  if(dead){
    gameStart();
  }
})

afterInput(() => {
})



function gameStart(){
  dead = false;
  speed = maxSpeed;
  setMap(levels[level]);
  addSprite(7, Math.floor(Math.random() * 10), "c");
  clearText();
  gameLoop();
}

function gameLoop(){
  speed -= 0.5;
  currentSpeed += 0.5;
  addText(`Speed: ${currentSpeed}`, {x: 3, y: 0, color: color`0`})

  if(speed == 0){
    won();
  }
  
  if(!dead){
    setTimeout(createObstacles, speed);
  }
}
function createObstacles(){
  let opening = Math.floor(Math.random() * 8);

  if(!dead)
      var height = Math.floor(Math.random() * 8);
      var sprite = obstacles[Math.floor(Math.random() * 3)]

      if(sprite == "C" || sprite == "h"){
        height += 1;
      } else {
        height =  Math.floor(Math.random() * 10);
      }
      addSprite(0, height, sprite);


  getAll(obstacles[0]).forEach((w) => {
    if (w.x == 8) 
      w.remove();
    else {
      w.x += 1;
      if(!dead){
        if(getFirst(car).x == w.x && getFirst(car).y == w.y){
          lost();
        }
      }
    };
  });

  getAll(obstacles[1]).forEach((w) => {
    if (w.x == 8) 
      w.remove();
    else {
      w.x += 1;
      if(!dead){
        if(getFirst(car).x == w.x && getFirst(car).y == w.y){
          lost();
        }
      }
    };
  });

  getAll(obstacles[2]).forEach((w) => {
    if (w.x == 8 || w.y == 9) 
      w.remove();
    else {
      w.x += 1;
      w.y += 1;
      if(!dead){
        if(getFirst(car).x == w.x && getFirst(car).y == w.y){
          lost();
        }
      }
    };
  });
  
  if(!dead){
    gameLoop();
  }
}

function lost(){
  dead = true;
  clearText();
  setMap(map`
ppphhCCh
hphhhhhh
hppp..pp
hpChchpp
hpphhpph
hpppphhC
hChphpph
hhhhhhhh`);
  addText("You crashed!", {x: width() / 2, y: height() / 2, color: color`0`})
}

function won(){
  dead = true;
  clearText();
  setMap(map`
bbbbbbbb
bbbbbbbb
bbbbbbbb
bbbbbbbb
bbbbbbbb
bbbbbbbb
bbbbbbbb
bbbbbbbb`);
  addSprite(4, 3, "c");
  addText("You Won!!!!" , {x: width() / 2, y: height() / 2, color: color`0`})
}


gameStart();
