/*
@title: 2D Life
@author: Leonard (Omay)

Change outcomes for new rules.
It works like this:
The part before the "/" is what qualifies a cell to be born (prefixed by a "B")
The numbers between the "B" and "/" are how many neighbors it takes to be born.
The part after the "/" is what qualifies a cell to survive (prefixed by a "S")
The numbers between the "S" and "/" are how many neighbors it takes for a cell to survive.

For instance, highlife would be "B36/S23"
*/

const outcomes = "B3/S23";

const sel = "s";
const living = "l";
const dead = "d";

setLegend(
  [sel, bitmap`
2222222222222222
2000000000000002
20............02
20............02
20............02
20............02
20............02
20............02
20............02
20............02
20............02
20............02
20............02
20............02
2000000000000002
2222222222222222`],
  [living, bitmap`
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222`],
  [dead, bitmap`
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
);

setSolids([]);

let level = 0;
const levels = [
  map`
dddddddddddddddddddddddddddddddddddddddd
dldddddddddddddddddddddddddddddddddddddd
ddlldddddddddddddddddddddddddddddddddddd
dllddddddddddddddddddddddddddddddddddddd
dddddddddddddddddddddddddddddddddddddddd
dddddddddddddddddddddddddddddddddddddddd
dddddddddddddddddddddddddddddddddddddddd
dddddddddddddddddddddddddddddddddddddddd
dddddddddddddddddddddddddddddddddddddddd
dddddddddddddddddddddddddddddddddddddddd
dddddddddddddddddddddddddddddddddddddddd
dddddddddddddddddddddddddddddddddddddddd
dddddddddddddddddddddddddddddddddddddddd
dddddddddddddddddddddddddddddddddddddddd
dddddddddddddddddddddddddddddddddddddddd
dddddddddddddddddddddddddddddddddddddddd
dddddddddddddddddddddddddddddddddddddddd
dddddddddddddddddddddddddddddddddddddddd
dddddddddddddddddddddddddddddddddddddddd
dddddddddddddddddddddddddddddddddddddddd
dddddddddddddddddddddddddddddddddddddddd
dddddddddddddddddddddddddddddddddddddddd
dddddddddddddddddddddddddddddddddddddddd
dddddddddddddddddddddddddddddddddddddddd
dddddddddddddddddddddddddddddddddddddddd
dddddddddddddddddddddddddddddddddddddddd
dddddddddddddddddddddddddddddddddddddddd
dddddddddddddddddddddddddddddddddddddddd
dddddddddddddddddddddddddddddddddddddddd
dddddddddddddddddddddddddddddddddddddddd
dddddddddddddddddddddddddddddddddddddddd
dddddddddddddddddddddddddddddddddddddddd`,
];

setMap(levels[level]);
addSprite(0, 0, sel);

function spriteData(sprite){
  return {x:sprite.x,y:sprite.y,type:sprite.type};
}
function loopBetween(x, mi, ma){
  if(x < mi){
    return ma;
  }else if(x > ma){
    return mi;
  }else{
    return x;
  }
}
function getLivingNeighbors(x, y, livingSprites){
  var livingNeighbors = 0;
  for(var i = 0; i < livingSprites.length; i++){
    if(
      ((livingSprites[i].x === x-1 || livingSprites[i].x === x+1) && 
      (livingSprites[i].y === y-1 || livingSprites[i].y === y+1)) ||
      ((livingSprites[i].x === x) &&
      (livingSprites[i].y === y-1 || livingSprites[i].y === y+1)) ||
      ((livingSprites[i].x === x-1 || livingSprites[i].x === x+1) &&
      (livingSprites[i].y === y))
    ){
      livingNeighbors++;
    }
  }
  return livingNeighbors;
}
onInput("w", () => {
  getFirst(sel).y -= 1;
});
onInput("a", () => {
  getFirst(sel).x -= 1;
});
onInput("s", () => {
  getFirst(sel).y += 1;
});
onInput("d", () => {
  getFirst(sel).x += 1;
});
onInput("i", () => {
  var selc = getFirst(sel);
  var tile = getTile(selc.x, selc.y);
  var tilet = tile.map(x => x.type);
  if(tilet.includes(living)){
    tile[tilet.indexOf(living)].remove();
    addSprite(selc.x, selc.y, dead);
  }else{
    tile[tilet.indexOf(dead)].remove();
    addSprite(selc.x, selc.y, living);
  }
});
onInput("k", () => {
  var livingCells = getAll(living);
  var deadCells = getAll(dead);
  var livingCellsClone = livingCells.map(x => spriteData(x));
  var deadCellsClone = deadCells.map(x => spriteData(x));
  var deadOutcomes = [0,0,0,0,0,0,0,0,0];
  var livingOutcomes = [0,0,0,0,0,0,0,0,0];
  var dO = outcomes.split("/")[0].substring(1, outcomes.split("/")[0].length);
  var lO = outcomes.split("/")[1].substring(1, outcomes.split("/")[1].length);
  for(var i = 0; i < dO.length; i++){
    deadOutcomes[parseInt(dO.charAt(i))] = 1;
  }
  for(var i = 0; i < lO.length; i++){
    livingOutcomes[parseInt(lO.charAt(i))] = 1;
  }
  for(var i = 0; i < livingCellsClone.length; i++){
    var livingNeighbors = getLivingNeighbors(livingCellsClone[i].x, livingCellsClone[i].y, livingCellsClone);
    if(livingOutcomes[livingNeighbors] === 0){
      livingCells[i].remove();
      addSprite(livingCellsClone[i].x, livingCellsClone[i].y, dead);
    }
  }
  for(var i = 0; i < deadCellsClone.length; i++){
    var livingNeighbors = getLivingNeighbors(deadCellsClone[i].x, deadCellsClone[i].y, livingCellsClone);
    if(deadOutcomes[livingNeighbors] === 1){
      deadCells[i].remove();
      addSprite(deadCellsClone[i].x, deadCellsClone[i].y, living);
    }
  }
});
