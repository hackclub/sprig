/*
@title: Nim
@author: Leonard (Omay)
@tags: ['strategy','retro']
@addedOn: 2022-11-15
*/

const match = "m";
const selector = "s";

setLegend(
  [match, bitmap`
................
.......33.......
......3333......
......3333......
.......33.......
.......FF.......
.......FF.......
.......FF.......
.......FF.......
.......FF.......
.......FF.......
.......FF.......
.......FF.......
.......FF.......
.......FF.......
................`],
  [selector, bitmap`
LLLLLLLLLLLLLLLL
LL............LL
L..............L
L..............L
L..............L
L..............L
L..............L
L..............L
L..............L
L..............L
L..............L
L..............L
L..............L
L..............L
LL............LL
LLLLLLLLLLLLLLLL`]
);

setSolids([]);

let level = 0;
const levels = [
  map`
s..m...
..mmm..
.mmmmm.
mmmmmmm`,
];

setMap(levels[level]);
var turnActive = false;
var p1 = true;
onInput("w", () => {
  if(!turnActive){
    getFirst(selector).y -= 1
  }
});
onInput("a", () => {
  getFirst(selector).x -= 1
});
onInput("s", () => {
  if(!turnActive){
    getFirst(selector).y += 1
  }
});
onInput("d", () => {
  getFirst(selector).x += 1
});
onInput("i", () => {
  turnActive = true;
  var tile = getTile(getFirst(selector).x, getFirst(selector).y);
  for(var i = 0; i < tile.length; i++){
    if(tile[i].type === match){
      tile[i].remove();
    }
  }
});
onInput("k", () => {
  turnActive = false;
  if(getAll(match).length === 0){
    addText(p1 ? "Player 2 Wins" : "Player 1 Wins");
  }
  p1 = !p1;
});

afterInput(() => {
  
});
