/*
@title: Infinite Maze
@author: pertark
@tags: ['endless']
@addedOn: 2022-09-22
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
  for(var i = 0; i < Math.min(h, mapHeight); i++){
    map2.push([]);
    for(var j = 0; j < Math.min(w, mapWidth); j++){
      map2[i].push([]);
      for(var k = 0; k < map[i+y][j+x].length; k++){
        map2[i][j].push(map[i+y][j+x][k]);
      }
    }
  }
  return map2;
}
//END INCLUDE

const player = "r";
const wall = "w";
const goal = "g";

setLegend(
  [player, bitmap`
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333`],
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
  [goal, bitmap`
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444`],
);

setSolids([player, wall]);

// Controls

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

onInput("i", () => {
  setMapV2(mapNat);
  getFirst(player).y -= 1;//Change
  py = getFirst(player).y;
});

onInput("j", () => {
  setMapV2(mapNat);
  getFirst(player).x -= 1;//Change
  px = getFirst(player).x;
});

onInput("k", () => {
  setMapV2(mapNat);
  getFirst(player).y += 1;//Change
  py = getFirst(player).y;
});

onInput("l", () => {
  setMapV2(mapNat);
  getFirst(player).x += 1;//Change
  px = getFirst(player).x;
});

// Maze generation

function rchoice(arr) {
  let n = arr.length;
  return arr[Math.floor(Math.random()*n)]
}

function generateEmptyMaze(wi, hi) {
  let blanks = "w".repeat(2*wi+1); // poltergeist in my computer
  let blank = blanks.split("");
  let rows = "w.".repeat(wi) + "w";
  let row = rows.split("");
  // console.log("blank", blank);
  // console.log("row", row);
  let maze = [];
  for (let i=0; i<hi; i++) {
    maze.push([...blank]);
    maze.push([...row]);
  }
  maze.push([...blank]);
  // console.log("empty maze:", maze)
  return maze;
}

function mazeGeneration(w, h) {
  let initial = [
    Math.floor(Math.random()*w),
    Math.floor(Math.random()*h)
  ]
  let visited = [...Array(w)].map(() => { 
    let row = [...Array(h).fill(0)];
    row[-1] = 1;
    row[h] = 1;
    return row;
  });
  // a bit of a hack
  visited[-1] = Array(h).fill(1);
  visited.push(Array(h).fill(1));
  
  let stack = [initial];
  let maze = generateEmptyMaze(w, h);

  while (stack.length > 0) {
    let curr = stack[stack.length-1]; 
    let [x, y, ...r] = curr;
    visited[x][y] = 1;
    
    let toVisit = []
    if (!visited[x+1][y]) toVisit.push([x+1, y]);
    if (!visited[x-1][y]) toVisit.push([x-1, y]);
    if (!visited[x][y+1]) toVisit.push([x, y+1]);
    if (!visited[x][y-1]) toVisit.push([x, y-1]);

    if (toVisit.length == 0) {
      stack.pop();
      continue;
    }
    let [nx, ny] = rchoice(toVisit);
    stack.push([nx, ny]);
    visited[nx][ny] = 1;
    maze[ny+y+1][nx+x+1] = ".";
  }
  maze[1][1] = "r";
  maze[2*h-1][2*w-1] = "g";
  return map`` + maze.map(r => r.join("")).join("\n")
}

let first = mazeGeneration(4, 4)
let mapa;
setMap(first)
//INCLUDE
mapNat = getMapV2();
setMapV2(trimMapV2(px-5, py-4, 10, 8, mapNat));
//END INCLUDE
let score = 0;

afterInput(() => {
  if (tilesWith(player, goal).length) {
    mapa = mazeGeneration(4+score, 4+score);
    score += 1;
    // console.log(mapa);
    setMap(mapa);
    clearText();
    addText("Score: " + score, {
      y: 0,
      color: color`3`
    })
    px = 1;
    py = 1;
  }
  //INCLUDE
  mapNat = getMapV2();
  setMapV2(trimMapV2(px-5, py-4, 10, 8, mapNat));
  //END INCLUDE
});
