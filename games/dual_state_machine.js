/*
@title: dual_state_machine
@author: Leonard (Omay)
@tags: ['strategy']
@addedOn: 2022-11-11

you only win when it turns green...

step on a blue block to turn it yellow
step on a yellow block to turn it blue

wasd to move
j to restart or continue

make all blocks yellow

based on those mario things
*/

var px = 1000;
var py = 1000;

const player = "p";
const on = "1";
const off = "0";
const wall = "w";
const bg = "b";
const complete = "c";

setLegend(
  [player, bitmap`
................
................
................
................
....22222222....
....22222222....
....22222222....
....22222222....
....22222222....
....22222222....
....22222222....
....22222222....
................
................
................
................`],
  [complete, bitmap`
4444444444444444
4444444444444444
44DDDDDDDDDDDD44
44DDDDDDDDDDDD44
44DD44444444DD44
44DD44444444DD44
44DD44444444DD44
44DD44444444DD44
44DD44444444DD44
44DD44444444DD44
44DD44444444DD44
44DD44444444DD44
44DDDDDDDDDDDD44
44DDDDDDDDDDDD44
4444444444444444
4444444444444444`],
  [off, bitmap`
7777777777777777
7777555555557777
7777555555557777
7777557777557777
7777557777557777
7777777777557777
7777777777557777
7777777555557777
7777777555557777
7777777557777777
7777777557777777
7777777777777777
7777777557777777
7777777557777777
7777777777777777
7777777777777777`],
  [on, bitmap`
6666666666666666
6666666666666666
6666666FF6666666
6666666FF6666666
6666666FF6666666
6666666FF6666666
6666666FF6666666
6666666FF6666666
6666666FF6666666
6666666FF6666666
6666666FF6666666
6666666666666666
6666666FF6666666
6666666FF6666666
6666666666666666
6666666666666666`],
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
0000000000000000`],
  [bg, bitmap`
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
LLLLLLLLLLLLLLLL`]
);

setSolids([player, wall]);

let level = 0;
const levels = [
  map`
00w00
00w00
00w00
00000
00000`,
  map`
0wwwww0
00000w0
wwww0w0
00000w0
0wwwww0
0000000`,
  map`
0000000000
0.00.0.0w0
0w0ww0w0w0
0w00w000w0
0ww0wwwww0
0000w00000`,
  map`
w0000000w0
w00wwww0w0
w00wwww0w0
000wwww0w0
00000000w0
0000000000`,
  map`
.................
...0.0.000.0.0...
...0.0.0.0.0.0...
...000.0.0.0.0...
....0..0.0.0.0...
....0..000.000...
.................
.0.0.0.000.0..0..
.0.0.0..0..00.0..
.0.0.0..0..0.00..
.0.0.0..0..0..0..
.00000.000.0..0..
.................`
];
const poss = [
  [0, 0],
  [0, 0],
  [0, 0],
  [1, 0],
  [0, 0]
];
function changePlayer(){
  if(getFirst(player).x !== px || getFirst(player).y !== py){
    var pT = tilesWith(player)[0];
    if(pT.map(x => x.type).includes(on)){
      pT[pT.map(x => x.type).indexOf(on)].type = off;
    }else if(pT.map(x => x.type).includes(off)){
      pT[pT.map(x => x.type).indexOf(off)].type = on;
    }
    px = getFirst(player).x;
    py = getFirst(player).y;
  }
}
function setLevel(){
  px = 1000;
  py = 1000;
  setMap(levels[level]);
  addSprite(poss[level][0], poss[level][1], player);
  setBackground(bg);
  changePlayer();
}
onInput("w", () => {
  getFirst(player).y -= 1
});
onInput("a", () => {
  getFirst(player).x -= 1
});
onInput("s", () => {
  getFirst(player).y += 1
});
onInput("d", () => {
  getFirst(player).x += 1
});
onInput("j", () => {
  if(getAll(complete).length > 0){
    level++;
  }
  if(level < levels.length) setLevel();
});
setLevel();
afterInput(() => {
  changePlayer();
  if(getAll(off).length === 0){
    var ons = getAll(on);
    for(var i = 0; i < ons.length; i++){
      ons[i].type = complete;
    }
  }
});
