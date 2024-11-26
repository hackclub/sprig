/*
@title: Builder
@author: Leonard (Omay)
@tags: ['strategy']
@addedOn: 2022-11-06

WAD to move
S to reset
IJKL to make boxes

Get a box to the goal
*/

const player = "p";
const wall = "w";
const box = "b";
const goal = "g";

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
1111111111111111`]
);

setSolids([player, box, wall]);

let level = 0;
const levels = [
  map`
..wg
..w.
....
p...`,
  map`
..ww
...g
..ww
p.ww`,
  map`
w...
wgw.
www.
p...`,
  map`
...wg
.w.w.
.w.w.
pw...`
];

setMap(levels[level]);

setPushables({
  [player]: [box],
  [box]: [box]
});
var velocity = 0;
var canGoDown = false;
function isOnGround(obj, ground){
  var below = getTile(obj.x, obj.y+1).map(x => x.type);
  for(var i = 0; i < below.length; i++){
    if(ground.includes(below[i])){
      return true;
    }
  }
  if(obj.y === height()-1){
    return true;
  }else{
    return false;
  }
}
onInput("w", () => {
  if(isOnGround(getFirst(player), [box, wall])){
    velocity = 1;
    canGoDown = false;
    var p = getFirst(player);
    var y = p.y;
    p.y -= velocity;
    if(p.y === y && velocity !== 0){
      velocity = 0;
    }else{
      velocity = -1;
    }
  }
});
onInput("a", () => {
  getFirst(player).x -= 1;
});
onInput("d", () => {
  getFirst(player).x += 1;
});
onInput("s", () => {
  setMap(levels[level]);
});
onInput("i", () => {
  var p = getFirst(player);
  if(getTile(p.x, p.y-1).map(x => x.type).includes(box)){
    getTile(p.x, p.y-1)[getTile(p.x, p.y-1).map(x => x.type).indexOf(box)].y--;
  }
  if((getTile(p.x, p.y-1).map(x => x.type).includes(goal) || getTile(p.x, p.y-1).length === 0) && p.y > 0){
    addSprite(p.x, p.y-1, box);
  }
});
onInput("j", () => {
  var p = getFirst(player);
  if(getTile(p.x-1, p.y).map(x => x.type).includes(box)){
    getTile(p.x-1, p.y)[getTile(p.x-1, p.y).map(x => x.type).indexOf(box)].x--;
  }
  if((getTile(p.x-1, p.y).map(x => x.type).includes(goal) || getTile(p.x-1, p.y).length === 0) && p.x > 0){
    addSprite(p.x-1, p.y, box);
  }
});
onInput("k", () => {
  var p = getFirst(player);
  if(getTile(p.x, p.y+1).map(x => x.type).includes(box)){
    getTile(p.x, p.y+1)[getTile(p.x, p.y+1).map(x => x.type).indexOf(box)].y++;
  }
  if((getTile(p.x, p.y+1).map(x => x.type).includes(goal) || getTile(p.x, p.y+1).length === 0) && p.y < height()-1){
    addSprite(p.x, p.y+1, box);
  }
});
onInput("l", () => {
  var p = getFirst(player);
  if(getTile(p.x+1, p.y).map(x => x.type).includes(box)){
    getTile(p.x+1, p.y)[getTile(p.x+1, p.y).map(x => x.type).indexOf(box)].x++;
  }
  if((getTile(p.x+1, p.y).map(x => x.type).includes(goal) || getTile(p.x+1, p.y).length === 0) && p.x < width()-1){
    addSprite(p.x+1, p.y, box);
  }
});
setInterval(() => {
  var b = getAll(box);
  for(var i = 0; i < b.length; i++){
    b[i].y++;
  }
  if(canGoDown || velocity > 0){
    var p = getFirst(player);
    var y = p.y;
    if((velocity < 0 && !isOnGround(p, [box, wall])) || velocity > 0){
      p.y -= velocity;
    }
    if(p.y === y && velocity !== 0){
      velocity = 0;
    }else{
      velocity--;
    }
  }
  canGoDown = true;
}, 500);
afterInput(() => {
  if(tilesWith(goal).length === tilesWith(goal, box).length){
    if(level < levels.length-1){
      level++;
      setMap(levels[level]);
    }else{
      addText("You Win!", {color: color`4`});
    }
  }
});
