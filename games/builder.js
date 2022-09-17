/*
@title: Builder
@author: leonard (omay)
*/

let mspf = 500;

const player = "a";
const wall = "b";
const box = "c";
const goal = "d";

setLegend(
  [player, bitmap`
0......00......0
.0....LLLL....0.
..0..111111..0..
...0000000000...
...0........0...
..10.00..00.01..
.L10.00..00.01L.
0L10........01L0
0L10........01L0
.L10.0....0.01L.
..10..0000..01..
...0........0...
...0000000000...
..0..111111..0..
.0....LLLL....0.
0......00......0`],
  [wall, bitmap`
0000000000000000
0LLLLLLLLLLLLLL0
0L000000000000L0
0L000000000000L0
0L000000000000L0
0L000000000000L0
0L000000000000L0
0L000000000000L0
0L000000000000L0
0L000000000000L0
0L000000000000L0
0L000000000000L0
0L000000000000L0
0L000000000000L0
0LLLLLLLLLLLLLL0
0000000000000000`],
  [box, bitmap`
L111111111111111
LL1111111111111L
LLL11111111111LL
LLL0000000000LLL
LLL0000000000LLL
LLL0000000000LLL
LLL0000000000LLL
LLL0000000000LLL
LLL0000000000LLL
LLL0000000000LLL
LLL0000000000LLL
LLL0000000000LLL
LLL0000000000LLL
LL11111111111LLL
L1111111111111LL
111111111111111L`],
  [goal, bitmap`
1111111111111111
1LLLLLLLLLLLLLL1
1L000000000000L1
1L000000000000L1
1L000000000000L1
1L000000000000L1
1L000000000000L1
1L000000000000L1
1L000000000000L1
1L000000000000L1
1L000000000000L1
1L000000000000L1
1L000000000000L1
1L000000000000L1
1LLLLLLLLLLLLLL1
1111111111111111`],
);

let frames = 0;

setSolids([player, wall, box]);

let level = 0;
const levels = [
  map`
..bd
..b.
....
a...`,
  map`
..bb
...d
..bb
a.bb`,
  map`
b...
bdb.
bbb.
a...`,
  map`
...bd
.b.b.
.b.b.
ab...`,
];

setMap(levels[level]);

setPushables({
  [ player ]: [box],
  [ box ]: [box, player]
});
var to = null;
function step(){
  var players = getAll(player);
  for(var i = 0; i < players.length; i++){
    players[i].y += 1;
  }
  var boxes = getAll(box);
  for(var i = 0; i < boxes.length; i++){
    boxes[i].y += 1;
  }
  frames++;
  addText(frames.toString(), { 
    x: 0, 
    y: 0, 
    color: [ 255, 0, 0 ] // red
})
  to = null;
}
onInput("a", () => {
  getFirst(player).x -= 1
});
onInput("d", () => {
  getFirst(player).x += 1
});
onInput("w", () => {
  if(getFirst(player).y === height()-1 || getTile(getFirst(player).x, getFirst(player).y+1).map(x => x.type).includes(box) || getTile(getFirst(player).x, getFirst(player).y+1).map(x => x.type).includes(wall)){
    getFirst(player).y -= 1;
  }
});
onInput("s", () => {
  setMap(levels[level]);
});
onInput("i", () => {
  var tile = getTile(getFirst(player).x, getFirst(player).y-1);
  for(var i = 0; i < tile.length; i++){
    if(tile[i].type === box){
      tile[i].y -= 1;
    }
  }
  tile = getTile(getFirst(player).x, getFirst(player).y-1);
  if(!tile.map(x => x.type).includes(box) && !tile.map(x => x.type).includes(wall)){
    addSprite(getFirst(player).x, getFirst(player).y-1, box);
  }
});
onInput("j", () => {
  var tile = getTile(getFirst(player).x-1, getFirst(player).y);
  for(var i = 0; i < tile.length; i++){
    if(tile[i].type === box){
      tile[i].x -= 1;
    }
  }
  if(!tile.map(x => x.type).includes(box)){
    addSprite(getFirst(player).x-1, getFirst(player).y, box);
  }
});
onInput("l", () => {
  var tile = getTile(getFirst(player).x+1, getFirst(player).y);
  for(var i = 0; i < tile.length; i++){
    if(tile[i].type === box){
      tile[i].x += 1;
    }
  }
  if(!tile.map(x => x.type).includes(box)){
    addSprite(getFirst(player).x+1, getFirst(player).y, box);
  }
});
onInput("k", () => {
  var tile = getTile(getFirst(player).x, getFirst(player).y+1);
  for(var i = 0; i < tile.length; i++){
    if(tile[i].type === box){
      tile[i].y += 1;
    }
  }
  if(!tile.map(x => x.type).includes(box)){
    addSprite(getFirst(player).x, getFirst(player).y+1, box);
  }
});
afterInput(() => {
  if(tilesWith(goal).length === tilesWith(goal, box).length){
    level++;
    if(levels.length >= level+1){
      setMap(levels[level]);
    }else{
      addText("You win!", {color: [0, 255, 0]});
    }
  }
  if(to === null){
    to = setTimeout(step, mspf);
  }
});
