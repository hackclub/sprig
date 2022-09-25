/*
@title: 2D Life
@author: Leonard (Omay)

Change livingOutcomes and deadOutcomes for new rules.
It works like this.
If a cell is alive, livingOutcomes[neighbors] is the outcome -- 0 it dies, 1 it stays alive
If it is dead, deadOutcomes[neighbors] is the outcome, same rules apply.
For instance, highlife would be

const livingOutcomes = [0,0,1,1,0,0,0,0,0];
const deadOutcomes = [0,0,0,1,0,0,1,0,0];
*/

const livingOutcomes = [0,0,1,1,0,0,0,0,0];
const deadOutcomes = [0,0,0,1,0,0,0,0,0];

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
