/*
@title: Farming Things
@author: Suspicious Yam
@tags: []
@addedOn: 2024-00-00
*/

//defines variables
const player = "p";
const dirt = "o";

const seed = "a";
const corn = "b";
const seede = "c";
const bush = "d";
const seeda = "e";
const alien = "f";

let counter = 0;

//variable images
setLegend(
  [player, bitmap`
................
................
................
................
.....000000.....
.....090090.....
.....000000.....
.....040040.....
.....004400.....
......0000......
......0000......
......0..0......
......0..0......
................
................
................` ],
  [seed, bitmap`
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCFCCCCCCCC
CCCCCCCFCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC`],
  [corn,bitmap`
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCC6CCCCCCCC
CCCCCCC64CCCCCCC
CCCCCCCDCCCCCCCC
CCCCCCCDCCCCCCCC
CCCCCC4DCCCCCCCC
CCCCCCCD4CCCCCCC
CCCCCCCDCCCCCCCC
CCCCCCCDCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC`],
  [dirt,bitmap`
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC`],
  [seede, bitmap`
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCC99CCCCCCC
CCCCCCCC9CCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC`],
  [bush, bitmap`
CCCCCCCCCCCCCCCC
CCCC44444CCCCCCC
CCC44DDD44444CCC
CC44DDDDDDD4444C
CC4DDD444DDD4D4C
CCDDD43DD43DDDD4
CCDDDDDDDDDDDDDD
CCD44DDDDDDDDDDD
C4DD3DD4DD444DDC
4DDDDD43D4DD4DDC
DDD44DDDD4DD3DCC
DD43D4DDDDDDDDCC
C4DDDDDDDDDDDDCC
CCCDDDDDDDDDDCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC`],
  [seeda, bitmap`
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCC7777CCCCCC
CCCCCC7557CCCCCC
CCCCCC7777CCCCCC
CCCCCC7CC7CCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC` ],
  [alien, bitmap`
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCC5CCCC5CCCCC
CCCCC777777CCCCC
CCCCC757757CCCCC
CCCC57777775CCCC
CCCCC77HH77CCCCC
CCCCC7H88H7CCCCC
CCCCCC7HH7CCCCCC
CCCCCC7777CCCCCC
CCCCCC7CC7CCCCCC
CCCCC57CC75CCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC` ]
)

//set background and spawn player
const levels = [
  map`
oooooo
oooooo
oooooo
oooooo
oooooo
oooooo`]
setMap(levels[0]) 
addSprite(0,0,player)

//movement
onInput("s", () => {
  getFirst(player).y += 1
})
onInput("w", () => {
  getFirst(player).y -= 1
  
})
onInput("a", () => {
  getFirst(player).x -= 1
})
onInput("d", () => {
  getFirst(player).x += 1
}) 

//actions
onInput("i",()=> {   //grow berry
  let x = getFirst(player).x
  let y = getFirst(player).y
  let sprites = getTile(x,y);
  
  if (plant(sprites,"c")) {
    spawn(x,y,bush);
    counter++;
  } 
  else {
    spawn(x,y,seede);
  }
})

onInput("j",()=> {   //grow corn
  let x = getFirst(player).x
  let y = getFirst(player).y
  let sprites = getTile(x,y);
  
  if (plant(sprites,"a")) {
    spawn(x,y,corn);
    counter++;
  } 
  else {
    spawn(x,y,seed);
  }
})

onInput("k",()=> {   //grow alien
  let x = getFirst(player).x
  let y = getFirst(player).y
  let sprites = getTile(x,y);
  
  if (plant(sprites,"e")) {
    spawn(x,y,alien);
    counter++;
  } 
  else {
    spawn(x,y,seeda);
  }
})

//reset
onInput("l",()=> {   
  setMap(levels[0]);
  clearText();
  counter = 0;
  addSprite(0,0,player);
})

//add sprite
function spawn(x,y,type) {
  clearTile(x,y);
  addSprite(x,y,player);
  addSprite(x,y,type);
}

//tests for sprite in tile
function plant(a,b) {
  return a.some(sprite => sprite.type === b);
}

//win condition
afterInput(() => { 
  if (counter > 24) { 
    clearText();
    addText("You Win!", {x: 5,y:1, color: color`2`});   
    stop();
  }
  else {
    clearText(); 
    addText("Things: " + counter.toString(),{x: 5,y:1, color: color`2`})
  }
})
