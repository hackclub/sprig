/*
@title: gravity_fun
@author: phantomeniasll
@tags: ['retro']
@addedOn: 2022-12-22
*/



const player = "p";
const pipe = "l";

setLegend(
  [ player, bitmap`
0000000000000000
0000000000000000
0000000000000000
000LLLLLLLLLL000
000LLLLLLLLLL000
000LL111111LL000
000LL111111LL000
000LL111111LL000
000LL111111LL000
000LL111111LL000
000LL111111LL000
000LLLLLLLLLL000
000LLLLLLLLLL000
0000000000000000
0000000000000000
0000000000000000`],
  [ pipe, bitmap`
LLCC33333333CCCC
LLCC33333333CCCC
LCCC33333333CCCC
LCCC33333333CCCC
CCCC33333333CCCC
CCCC33333333CCCC
CCCC33333333CCCC
CCCC33333333CCCC
CCCC33333333CCCC
CCCC33333333CCCC
CCCC33333333CCCC
CCCC33333333CCCC
CCCC33333333CCCC
CCCC33333333CCCC
CCCC33333333CCCC
CCCC33333333CCCC`],
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
      if(x+1 < xPlayer+1 && y < yPlayer  && y != 0 && x != 0){
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

//CONSTANTS
var openingWidth = 10;
var gravity = 0.3;
var jumpStrength = 1.8;
var updateTimems = 30;

// START - PLAYER MOVEMENT CONTROLS

onInput("w", () => {
  velocity = -jumpStrength;
});

// END - PLAYER MOVEMENT CONTROLS

function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}



var velocity = 0;
var pipes = [Math.round(width/3),Math.round(2*width/3),width-1];
var openings = [30,40,20];

var frontPipeIndex = 0;
var score = 0;
clearText();
addText("Score:"+score);

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
    addText("Score:"+score);
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
  let die = false;
  getAll(player).forEach(p => {
    p.y += Math.floor(velocity)
    if(p.y == 0 || p.y == width -3 )
    {
      die=true;
    }
  });
  movePipes();
  if(tilesWith(player,pipe).length != 0 || die){
    score = 0;
    clearText();
    addText("Score:"+score);
    setMap(currentLevel);
    velocity = 0;
    for(var i=0; i<3;i++)
      {
        openings[i] = randomIntFromInterval(20, height-20);
      }
    frontPipeIndex = 0;
    unDrawPipes();
    drawPipes();
  }

velocity += gravity;
setTimeout(physicUpdate,updateTimems);     
}
physicUpdate();
afterInput(() => {

});
