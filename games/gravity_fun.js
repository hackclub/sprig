/*
@title: gravity_fun
@author: phantomeniasll
*/



const player = "p";
const pipe = "l";

setLegend(
  [ player, bitmap`
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
  [ pipe, bitmap`
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

let level =  map`
p.......................................
........................................
........................................
........................................
........................................
........................................
........................................
........................................
........................................
........................................
........................................
........................................
........................................
........................................
........................................
........................................
........................................
........................................
........................................
........................................
........................................
........................................
........................................
........................................
........................................
........................................
........................................
........................................
........................................
........................................
........................................
........................................
........................................
........................................
........................................
........................................
........................................
........................................
........................................
........................................
........................................`;


function generateLevel(xDim, yDim,xPlayer, yPlayer) {
  var lvl = "";
  for(var x = 0; x <xDim; x++){
    var row = "";
    for(var y=0; y < yDim; y++){
      if(x < xPlayer && y < yPlayer ){
      row += "p";}
      else{
        row += ".";}
    }
    lvl += row + "\n"
  }
  return lvl;
}

var height = 80;
var width = 80;
level = generateLevel(height,width,3,3);


const currentLevel = level;
setMap(currentLevel);

setSolids([]);

setPushables({
  [player]: []
});

// START - PLAYER MOVEMENT CONTROLS

onInput("w", () => {
  velocity = -1.5;
});

// END - PLAYER MOVEMENT CONTROLS

onInput("j", () => {
  const currentLevel = levels[level];
  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
  }
});

function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

var velocity = 0;
var pipes = [Math.round(width/3),Math.round(2*width/3),width-1];
var openings = [30,40,20];
var openingWidth = 10;
var frontPipeIndex = 0;
var score = 0;
clearText();
addText("Score:"+score,width/2,3,color`H`);

function drawPipes(){
  for(var i=0;i<pipes.length;i++)
    {
      if(pipes[i]<width){
        for(var y=0;y<height;y++){
            if(Math.abs(y-openings[i]) > openingWidth)
            addSprite(pipes[i],y,pipe); 
          } 
      }
    }  
}
function unDrawPipe(x) {
  for(var y=0; y<height; y++){
    clearTile(0,y);
  }
}
function unDrawPipes() {
  var tiles = getAll(pipe);
  tiles.forEach((p)=>{clearTile(p.x,p.y);})
}
function movePipes(){
  var pipe_sprites = getAll(pipe);
  var respawnFrontPipe = false;
  pipe_sprites.forEach(p => {
    if(p.x == 0){
      respawnFrontPipe = true;    
    }
    else{
      p.x -= 1;
      
    }
  });
  if(respawnFrontPipe){
    score += 1;
    clearText();
    addText("Score:"+score,width/2,3,color`H`);
    unDrawPipe(0);
    openings[frontPipeIndex] = randomIntFromInterval(20, height-20);
    for(var y=0;y<height;y++){
            if(Math.abs(y-openings[frontPipeIndex]) > openingWidth)
            addSprite(width-1,y,pipe); 
    }
    frontPipeIndex++;
    frontPipeIndex %= pipes.length;
  }
}
drawPipes();
var physicUpdate = () => {
  getAll(player).forEach(p => p.y += Math.floor(velocity));
  movePipes();
  if(tilesWith(player,pipe).length != 0){
    score = 0;
    clearText();
    addText("Score:"+score,width/2,3,color`H`);
    setMap(currentLevel);
    velocity = 0;
    for(var i=0; i<3;i++)
      {
        openings[i] = randomIntFromInterval(20, height-20);
      }
    
    openingWidth = 10;
    frontPipeIndex = 0;
    unDrawPipes();
    drawPipes();
  }
 
velocity += 0.2;
setTimeout(physicUpdate,30);     
}
physicUpdate();
afterInput(() => {
  
});