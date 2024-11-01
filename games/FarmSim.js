/*
@title: Farming Things
@author: Suspicious Yam
@tags: []
@addedOn: 2024-00-00
*/

//defines variables
const player = "p";
const dirt = "o";
const enemy = "i";

const seed = "a";
const corn = "b";
const seede = "c";
const bush = "d";
const seeda = "e";
const alien = "f";

let counter = 0;
let countere = 0;
let countera = 0;

let glitch = "g";
let glitch2 = "h";

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
  [enemy,bitmap`
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCC4CCCCCC4CCCC
CCCCC4CCCC4CCCCC
CCCCC333333CCCCC
CCCCC323323CCCCC
CCCCC333333CCCCC
CCCCC332233CCCCC
CCCCC323323CCCCC
CCCC33333333CCCC
CCCCCC3333CCCCCC
CCCCCC3CC3CCCCCC
CCCCCC3CC3CCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC`] ,
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
CCCCCCCCCCCCCCCC` ],
  [glitch, bitmap`
3903333834F33CF3
3900223864F33CF3
3990F42864002C00
D990F41864428C53
DD93F41362208353
DH93F41332008456
DH93F43325008456
DH96F432H5203456
D59632D8H5023466
356694D8HH002463
356294D8FH005483
356194H8FH005483
356194H3FH005483
350194H3F3005383
330134H333005333
330134H333003333`],
  [glitch2,bitmap`
4077444044544C54
4077HH4064544C54
4007L4H064443C44
6007L45064430C54
6607L4546C340454
6H07L4544C440456
6H07L44435440456
6H06L443F5344456
650643D0F5434466
456607D0FF443464
456307D06F44L404
456507H06F44L404
456507H46F44L404
454504H46444L404
444544H44444L444
444544H444444444`]

)

//set background and spawn player
const levels = [
  map`
ooooooo
ooooooo
ooooooo
ooooooo
ooooooo
ooooooo
ooooooo`,
  map`
gggghhg
ghghhhg
hgghghg
gghghhh
ghgghhg
ghghghg
ghhgggg`
]

setMap(levels[0]) 
addSprite(0,0,player);
addSprite(6,6,enemy);


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
//grow berry
onInput("i",()=> {   
  let x = getFirst(player).x
  let y = getFirst(player).y
  let sprites = getTile(x,y);
  //tests what to plant
  if (plant(sprites,"i") != true){  
    if (plant(sprites,"c")) {
      spawn(x,y,bush);
      countere++;
    } 
    else {
      spawn(x,y,seede);
    }
  }
})

//grow corn
onInput("j",()=> {   
  let x = getFirst(player).x
  let y = getFirst(player).y
  let sprites = getTile(x,y);
  //tests what to plant
  if (plant(sprites,"i") != true){
    if (plant(sprites,"a")) {
      spawn(x,y,corn);
      counter++;
    } 
    else {
      spawn(x,y,seed);
    }
  }
})

//grow alien
onInput("k",()=> {   
  let x = getFirst(player).x
  let y = getFirst(player).y
  let sprites = getTile(x,y);
  //tests what to plant
  if (plant(sprites,"i") != true){
    if (plant(sprites,"e")) {
      spawn(x,y,alien);
      countera++;
    } 
    else {
      spawn(x,y,seeda);
  }
  }
})

//reset
onInput("l",()=> {   
  setMap(levels[0]);
  clearText();
  counter = 0;
  countere = 0;
  countera = 0;
  addText("Make a Farm!", {x: 5,y:1, color: color`2`});
  addSprite(0,0,player);
  addSprite(6,6,enemy);
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

function moveEnemy() {
  const e = getFirst(enemy);
  const p = getFirst(player);
  setTimeout(() => {
    //determines whether to move left or right based on player x position
    if (e.x - p.x > 0)
      e.x -= 1
    else if (e.x - p.x == 0 && e.x>p.x)
      e.x -= 1
    else
      e.x += 1
    //determines whether to move up or down based on player y position
    if (e.y - p.y > 0)
      e.y -= 1
    else if (e.y - p.y == 0 && e.y>p.y)
      e.y -= 1
    else
      e.y += 1
    
    moveEnemy();
  }, 2000); 
}

//enemy will delete any sprite he lands on and the counter for that plant decreases
function eat(a,b,type) {

  let sprites = getTile(a,b,)
  sprites.forEach(sprite => {
    if (sprite.type === type) {
      if (sprite.type == "a" || sprite.type == "b")
        counter -= 1;
      if (sprite.type == "c" || sprite.type == "d")
        countere -= 1;
      if (sprite.type == "e" || sprite.type == "f")
        countera -= 1;

      sprite.remove();
      addSprite(a,b,dirt);

    }
  });
}

function destroy(){
  setMap(levels[1])
}

moveEnemy();

afterInput(() => { 

  let e = getFirst(enemy);
  eat(e.x,e.y,"a")
  eat(e.x,e.y,"b")
  eat(e.x,e.y,"c")
  eat(e.x,e.y,"d")
  eat(e.x,e.y,"e")
  eat(e.x,e.y,"f")
  eat(e.x,e.y,"p")
  
 //win condition 
  if (counter > 8 && countere > 8 && countera > 8) { 
    clearText();
    addText("You Win!", {x: 5,y:6, color: color`2`});    
  }
  else {
    clearText(); 
    addText("Corn: " + counter.toString(),{x:3,y:1, color: color`2`})
    addText("Berries: " + countere.toString(),{x: 3,y:2, color: color`2`})
    addText("Aliens: " + countera.toString(),{x: 3,y:3, color: color`2`})
  }
  //easter egg
    if (counter > 11 && countere > 11 && countera > 11) { 
    clearText();
    addText("What did you do?", {x: 2,y:6, color: color`2`});
    destroy();
  }
})
