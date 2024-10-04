/*
@title: Conquerers
@author: Leonard (Omay)
@tags: ['multiplayer']
@addedOn: 2022-11-15

WASD to move selector
I to place a boat
K to skip (if you can't place a boat)

Get the most boats on the board.
Place boats next to your existing boat(s)
*/

const selector = "s";
const redBoat = "r";
const blueBoat = "b";
const empty = "e";
const wall = "w";

setLegend(
  [selector, bitmap`
2222222222222222
22............22
2..............2
2..............2
2..............2
2..............2
2..............2
2..............2
2..............2
2..............2
2..............2
2..............2
2..............2
2..............2
22............22
2222222222222222`],
  [redBoat, bitmap`
................
................
.......3........
.......333......
.......33333....
.......333333...
.......3333.....
.......3........
.......3........
.......3........
...3333333333...
....33333333....
.....333333.....
......3333......
................
................`],
  [blueBoat, bitmap`
................
................
........5.......
......555.......
....55555.......
...555555.......
.....5555.......
........5.......
........5.......
........5.......
...5555555555...
....55555555....
.....555555.....
......5555......
................
................`],
  [wall, bitmap`
6666666666666666
6666666666666666
6662666662666626
6666666666666666
6666666666666666
6666666666666626
6666666626666666
6666666666666666
6626666666666666
6666662666666666
6666666666666666
6666666662666266
6666666666666666
6666666666666662
6626666266666666
6666666666666666`],
  [empty, bitmap`
7777777777777777
7777222227777777
7722277722777777
7727777772777222
2227777772222277
7777777777777777
7777777772222777
2277777227772222
7227772277777777
7772222777777777
7777777777777777
7777777777777777
7772222777777777
7222772277777777
2277777227772222
2777777722227772`]
);

let level = 0;
const levels = [
  map`
wwwwwwwwww
wr.......w
w........w
wwww..wwww
wwww..wwww
w........w
w.......bw
wwwwwwwwww`,
  map`
wwwwwwwwww
wr.......w
w.wwwwww.w
w........w
w........w
w.wwwwww.w
w.......bw
wwwwwwwwww`,
  map`
wwwwwwwwww
w....w..ww
ww....r.ww
ww.www..ww
ww.wwww..w
wwbwww...w
w........w
wwwwwwwwww`,
  map`
wwwwwwwwww
w........w
w.ww.rww.w
w........w
w........w
w.wwb.ww.w
w........w
wwwwwwwwww`,
  map`
wwwwwwwwww
w........w
w........w
w..wwww..w
w..w.rw..w
w.....w..w
w.....w.bw
wwwwwwwwww`
];
const boatNums = [36, 36, 30, 40, 40];

setMap(levels[level]);
setBackground(empty);
addSprite(1, 1, selector);
var turn = 0;
var redTotal = 0;
var blueTotal = 0;
function checkNeighbor(x, y, type){
  return getTile(x, y-1).map(x => x.type).concat(getTile(x-1, y).map(x => x.type)).concat(getTile(x+1, y).map(x => x.type)).concat(getTile(x, y+1).map(x => x.type)).includes(type);
}
onInput("w", () => {
  getFirst(selector).y -= 1;
});
onInput("a", () => {
  getFirst(selector).x -= 1;
});
onInput("s", () => {
  getFirst(selector).y += 1;
});
onInput("d", () => {
  getFirst(selector).x += 1;
});
onInput("i", () => {
  if(checkNeighbor(getFirst(selector).x, getFirst(selector).y, (turn % 2 === 0) ? redBoat : blueBoat) && !getTile(getFirst(selector).x, getFirst(selector).y).map(x => x.type).includes(blueBoat) && !getTile(getFirst(selector).x, getFirst(selector).y).map(x => x.type).includes(redBoat) && !getTile(getFirst(selector).x, getFirst(selector).y).map(x => x.type).includes(wall)){
    addSprite(getFirst(selector).x, getFirst(selector).y, (turn % 2 === 0) ? redBoat : blueBoat);
    turn++;
  }
});
onInput("k", () => {
  turn++;
});

afterInput(() => {
  if(getAll(redBoat).length + getAll(blueBoat).length >= boatNums[level]){
    redTotal += getAll(redBoat).length;
    blueTotal += getAll(blueBoat).length;
    if(level < levels.length-1){
      level++;
      setMap(levels[level]);
      setBackground(empty);
      addSprite(1, 1, selector);
    }else{
      if(redTotal > blueTotal){
        setMap(redBoat);
        addText("Red Wins");
      }else if(blueTotal > redTotal){
        setMap(blueBoat);
        addText("Blue Wins");
      }else{
        setMap(empty);
        addText("Tie");
      }
    }
  }
});
