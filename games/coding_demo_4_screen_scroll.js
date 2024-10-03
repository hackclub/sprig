/*
@title: Coding Demo 4 - Screen Scrolling
@author: Leonard (Omay)
@tags: []
@addedOn: 2022-11-7

MapV2 is a version of a map I made that can store any map. It is helpful for copying the current state of the map.
Between every "INCLUDE" and "END INCLUDE" is what you need to copy
Lines labeled with "Change" are things you can change.
You can also change the width and height of the shown map (3rd and 4th input)
*/

//INCLUDE
var px = 1;
var py = 1;
var mapNat = [];
//LIB
function getMapV2(){
  var map = [];
  for(var i = 0; i < height(); i++){
    map.push([]);
    for(var j = 0; j < width(); j++){
      map[i].push([]);
      var tile = getTile(j, i);
      for(var k = 0; k < tile.length; k++){
        map[i][j].push(tile[k].type);
      }
    }
  }
  return map;
}
function setMapV2(map){
  var tempMap = "";
  for(var i = 0; i < map.length; i++){
    for(var j = 0; j < map[i].length; j++){
      tempMap += ".";
    }
    tempMap += "\n";
  }
  setMap(tempMap);
  for(var i = 0; i < map.length; i++){
    for(var j = 0; j < map[i].length; j++){
      for(var k = 0; k < map[i][j].length; k++){
        addSprite(j, i, map[i][j][k]);
      }
    }
  }
}
function trimMapV2(x, y, w, h, map){
  var map2 = [];
  var mapWidth = map[0].length;
  var mapHeight = map.length;
  x = Math.max(Math.min(mapWidth-w, x), 0);
  y = Math.max(Math.min(mapHeight-h, y), 0);
  for(var i = 0; i < h; i++){
    map2.push([]);
    for(var j = 0; j < w; j++){
      map2[i].push([]);
      for(var k = 0; k < map[i+y][j+x].length; k++){
        map2[i][j].push(map[i+y][j+x][k]);
      }
    }
  }
  return map2;
}
//END INCLUDE

const player = "p";
const wall = "w";
const bg = "b";
setLegend(
  [player, bitmap`
.....111111.....
.....127721.....
.....177771.....
.....172271.....
.....111111.....
.......11.......
.......11.......
.....111111.....
.....1.11.1.....
.....1.11.1.....
.......11.......
.......11.......
.....111111.....
.....1....1.....
.....1....1.....
.....1....1.....`],
  [wall, bitmap`
111L111L111L111L
111L111L111L111L
111L111L111L111L
LLLLLLLLLLLLLLLL
L111L111L111L111
L111L111L111L111
L111L111L111L111
LLLLLLLLLLLLLLLL
1L111L111L111L11
1L111L111L111L11
1L111L111L111L11
LLLLLLLLLLLLLLLL
11L111L111L111L1
11L111L111L111L1
11L111L111L111L1
LLLLLLLLLLLLLLLL`],
  [bg, bitmap`
LLL0LLL0LLL0LLL0
LLL0LLL0LLL0LLL0
LLL0LLL0LLL0LLL0
0000000000000000
0LLL0LLL0LLL0LLL
0LLL0LLL0LLL0LLL
0LLL0LLL0LLL0LLL
0000000000000000
L0LLL0LLL0LLL0LL
L0LLL0LLL0LLL0LL
L0LLL0LLL0LLL0LL
0000000000000000
LL0LLL0LLL0LLL0L
LL0LLL0LLL0LLL0L
LL0LLL0LLL0LLL0L
0000000000000000`]
);

setSolids([player, wall]);

let level = 0;
const levels = [
  map`
wwwwwwwwwwwwwwwwwww
wpw...............w
w.wwwwwww.wwwwwww.w
w...w.w.w.w.w...w.w
www.w.w.w.w.w.wwwww
w.......w.........w
w.wwwww.www.w.www.w
w.....w.....w.w.w.w
www.w.w.www.w.w.www
w.w.w...w.........w
w.w.www.www.wwwww.w
w.....w.w...w...w.w
w.w.www.w.www.www.w
w.w.....w.....w...w
wwwwwwwwwwwwwwwwwww`,
];

setMap(levels[level]);
setBackground(bg);
//INCLUDE
mapNat = getMapV2();
setMapV2(trimMapV2(px-5, py-4, 10, 8, mapNat));
//END INCLUDE
setPushables({
  [ player ]: [],
});
//INCLUDE
onInput("w", () => {
  setMapV2(mapNat);
  getFirst(player).y -= 1;//Change
  py = getFirst(player).y;
});
onInput("a", () => {
  setMapV2(mapNat);
  getFirst(player).x -= 1;//Change
  px = getFirst(player).x;
});
onInput("s", () => {
  setMapV2(mapNat);
  getFirst(player).y += 1;//Change
  py = getFirst(player).y;
});
onInput("d", () => {
  setMapV2(mapNat);
  getFirst(player).x += 1;//Change
  px = getFirst(player).x;
});
//END INCLUDE
afterInput(() => {
  //INCLUDE
  mapNat = getMapV2();
  setMapV2(trimMapV2(px-5, py-4, 10, 8, mapNat));
  //END INCLUDE
});
