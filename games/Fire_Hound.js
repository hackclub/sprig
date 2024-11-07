/*
@title: Fire Hound
@author: Himir Desai
@tags: ['puzzle']
@addedOn: 2023-01-30
*/

const player = "p";
const water = "w";
const ground = "g";
const sky = "s";
const cloud = "c";
const portalUp = "u";
const portalDown = "d";
const sheild = "b";
var score = 0;
var highScore = 0;

setLegend(
  [ground, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],
  [water, bitmap`
.......22.......
........2.......
.....22.2.2.....
...222.22.22....
....222222.2.2..
.2.2277777722...
...27777777722.2
..2277777777722.
2.2277555577722.
..277555555772..
2.277555555772.2
22227555555772..
...275555557722.
22.2775555772.2.
..2.22777772..2.
.2...222222.....`],
  [player, bitmap`
................
...........0333.
..........03303.
..........33C633
..........3CCC33
....00303033C33.
..033333333C03..
..33CCCCC30C3...
..03CCCCCCCC0...
..3CCCCCCCCC3...
333CCCCCCCCC3...
3.3CCCCCCCCC....
..3CC33CC03C....
..0C3..3C.3C....
..3C3..3C.3C....
..3C3..30.......`],
  [sheild, bitmap`
................
................
................
................
................
................
.....999999.....
..990333333099..
9033000000003309
9000033333300009
00333......33300
.3............3.
................
................
................
................`],
  [cloud, bitmap`
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
  [sky, bitmap`
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH`],
  [portalUp, bitmap`
..............00
..............03
............0003
...........00333
...........03399
..........003999
.........0033999
.........0339999
........00399999
........03399999
.......003999999
.......033999999
......0039999999
......0039999999
......0039999999
......0039999999`],
  [portalDown, bitmap`
......0039999999
......0039999999
......0039999999
.......033999999
.......003999999
........03399999
........00399999
.........0339999
........00033999
........03003999
.......003903399
.......033900399
.......039990339
.......039990003
.......039999903
.......039999900`],

)

var map;
function generateMap(){
  map = `
cssssssssssssssssc
ssssssssssssssssss
ssssssssssssssssss
ssssssssssssssssss
ssssssssssssssssss
ssssssssssssssssss
ssssssssssssssssss
ssssssssssssssssss
sssssssssssssssssu
pssssssssssssssssd
gssssssssssssssssg
gssssssssssssssssg`;
  setBackground(sky);
  setMap(map);
  for (let i = 1;i < width()-1;i++){
  addSprite(i, height()-1, ground)
  addSprite(i, height()-2, ground)
  addSprite(i,0,cloud)
  if(Math.floor(Math.random()*5)){
    addSprite(i, height()-3, ground)
    addSprite(i,1,cloud)
    if(Math.floor(Math.random()*2)){
      if(getTile(i-1,height()-3)[0].type == "g"){
        addSprite(i, height()-4, ground)
      }
    }
  }
}
  addText("Shield-i", {x:0,y:height()+1,color:`2`})
  addText("Score:"+score, {x:10,y:height()+1,color:`2`})
  addText("High Score:" + highScore, {x:1, y:2, color:color`0`})

}
generateMap();

setSolids([player, ground]);
// Create a variable that shows when the game is running
var gameRunning = true; 
var inAir = false;
var won = false;
var shieldUsed = false;


// START - PLAYER MOVEMENT CONTROLS
function jump() {
  let p = getFirst(player);
  inAir = true
  p.y -= 1;
  setTimeout(()=>{
    p.y+=1
    inAir = false
  },300)
}

onInput("a", () => {
  if (gameRunning) {
    getFirst(player).x -= 1;
  }
});
onInput("s", () => {
  if (gameRunning) {
    getFirst(player).y += 1;
  }
});
onInput("d", () => {
  if (gameRunning) {
    getFirst(player).x += 1;
  }
});
onInput("w", () => {
  if (gameRunning) {
    if(!inAir){
      jump();
    }
  }
});
onInput("l", () => {
  if(!gameRunning){
    gameRunning = true;
    shieldUsed = false;
    let shields = getAll(shield);
    if(shields){
      for (let i = 0; i < shields.length;i++){
        shields[i].remove()
      }
    }    
    getFirst(player).x=0;
    getFirst(player).y=height()-3;
    let waters = getAll(water);
    for(let i = 0; i < waters.length; i++){
      waters[i].remove();
    }
    clearText()
    addText("Shield-i", {x:0,y:height()+1,color:`2`})
    addText("Score:"+score, {x:10,y:height()+1,color:`2`})
    addText("High Score:" + highScore, {x:1, y:2, color:color`0`})
  }
});
onInput("i", () => {
  if(!shieldUsed && gameRunning){
    let p = getFirst(player);
    addSprite(p.x,p.y-1,sheild);
    shieldUsed = true;
  }
});
// END - PLAYER MOVEMENT CONTROLS
// Put obstacle in a random position
function spawnWater() {
  let x = Math.floor(Math.random() * (width()-1));
  let y = 2; 
  addSprite(x, y, water);
}
// Make obstacles move
function moveWater() {
  let waters = getAll(water);

  for (let i = 0; i < waters.length; i++) {
    waters[i].y += 1;
  }
}

// Make obstacles disappear
function despawnWater() {
  let waters = getAll(water);

  for (let i = 0; i < waters.length; i++) {
   if (waters[i].y == height()-1) {
     waters[i].remove();
   }
  }
}

// See if the player was hit
function checkHit() {
  // Step 3 - Fix code
  let waters = getAll(water);
  let p = getFirst(player);

  for (let i = 0; i < waters.length; i++) {
    if (waters[i].x == p.x && waters[i].y == p.y) {
      return true;
    }
  }

  return false;
}

function shield(){
  let sh = getFirst(sheild);
  if(sh){
    sh.x=getFirst(player).x;
    sh.y=getFirst(player).y-1;
    let waters = getAll(water);
    
    for (let i = 0; i < waters.length; i++) {
      if (waters[i].x == sh.x && waters[i].y == sh.y) {
        sh.remove()
        waters[i].remove()
    }
  }
  }
}

var gameLoop = setInterval(() => {
  // Step 4 - Add all game functions
  if (checkHit()) {
    gameRunning = false;
    score = 0;
    addText("Game Over!", {x:5,y:6,color:color`3`});
    addText("Retry -> l", {x:5,y:8,color:color`2`});
  }
  if(getFirst(player).x == 17 && getFirst(player).y == height()-3){
    won = true;
    gameRunning = false;
    score += 1;
    if (score > highScore){
      highScore = score;
    }
  }
  if(gameRunning){
    shield();
  }
  if(won){
       gameRunning = true;
    shieldUsed = false;
    let shields = getAll(shield);
    if(shields){
      for (let i = 0; i < shields.length;i++){
        shields[i].remove()
      }
    }    
    getFirst(player).x=0;
    getFirst(player).y=height()-3;
    let waters = getAll(water);
    for(let i = 0; i < waters.length; i++){
      waters[i].remove();
    }
    clearText()
    addText("shield-i", {x:0,y:height()+1,color:`2`})
    generateMap()
    won = false;
    addText("High Score:" + highScore, {x:1, y:2, color:color`0`})
  }
}, 50);

var fallLoop = setInterval(()=>{
  let p = getFirst(player);
  if(getTile(p.x,p.y+1) != "g"){
    p.y+=1;
  }
  if(gameRunning){
    spawnWater()
    moveWater()
    despawnWater()
  }
},300)

