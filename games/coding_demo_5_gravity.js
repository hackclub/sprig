/*
@title: Coding Demo 5: Gravity
@author: Leonard (Omay)
@tags: ['simulation']
@addedOn: 2022-11-12

Comments labeled include on their own line mean copy the code from the include to end include

Try and put the code in the same places
*/
//INCLUDE
let vy = 0;

const jumpHeight = -3;
const gravity = 2;
const terminalVelocity = 10;
const minTime = 50;
const maxTime = 250;
//END INCLUDE

const player = "p";
const wall = "w";

setLegend(
  [player, bitmap`
.....00000......
.....0...0..0...
...0.00000..0...
...00..00..00...
....00.0..00....
.....000000.....
......000.......
.......0........
.......0........
.......0........
.....00000......
....00....0.....
...00.....0.....
...0.......0....
..00.......0....
..0........0....`],
  [wall, bitmap`
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
0000000000000000`]
);

setSolids([player, wall]);

let level = 0;
const levels = [
  map`
.ww.......
..........
www..www..
w....www..
...wwwww..
.....www..
.www.www..
pwww......`,
];

setMap(levels[level]);

setPushables({
  [player]: [],
});
//INCLUDE
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
//END INCLUDE
onInput("w", () => {
  //INCLUDE
  if(checkGrounded(getFirst(player))){
    vy = jumpHeight;
  }
  //END INCLUDE
});
onInput("a", () => {
  getFirst(player).x--;
});
onInput("d", () => {
  getFirst(player).x++;
});
//INCLUDE
function lerp(a, b, f){
  return (a * (1 - f)) + (b * f);
}
function constrain(n, mi, ma){
  return (n < mi) ? mi : ((n > ma) ? ma : n);
}
function tick(){
  getFirst(player).y += Math.sign(vy);
  vy += gravity;
  vy = constrain(vy, -terminalVelocity, terminalVelocity);
  setTimeout(tick, lerp(minTime, maxTime, Math.abs(vy)/terminalVelocity));
}
tick();
//END INCLUDE
