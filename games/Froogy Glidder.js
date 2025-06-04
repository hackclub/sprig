/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Froog glider
@author: meeps
@tags: [froog]
@addedOn: 1024-03-14
*/
let  isRunning=true
let score=1
let score1=650
const froogy = "f"
const sky="b"
const cloud="c"
const taco="t"
let lose = false;

setLegend(
  [ froogy, bitmap`
................
......88H88.....
.....88H8H88....
....88H888H88...
....8H88888H8...
....8...8...8...
....88..8..88...
.....8..8.88....
.....8DDDD8.....
.....D0DD0D.....
....DDD00DDD....
....D.DDDD.D....
................
................
................
................` ],
  [sky,bitmap`
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777`],
  [cloud,bitmap`
7777722222227777
7777222222222777
7772222222222227
7722222222222222
7722222222222222
7222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222227
7722222222222277
7772222777727777
7777777777777777`],
   [taco,bitmap`
................
................
................
................
................
....3666666.....
...D6666666D....
.C66666666666C..
.26666666666662.
C66666666666663.
36666666666666D.
666666666666666.
666666666666666.
................
................
................`],

)

setSolids([froogy,cloud])
let level = 0

const levels = [
  map`
......
......
c..c..
..c.c.
.c.c..
t.c.fc
c.c.c.`
]
setBackground("b")
setMap(levels[level])

setPushables({
  [ cloud ]: [froogy]
})
// ------------------------------------comNDZ BELOW 
onInput("s", () => {
  getFirst(froogy).y += 1
})


onInput("w", () => {
  getFirst(froogy).y -= 1
})

onInput("a", () => {
  getFirst(froogy).x -= 1
})


onInput("d", () => {
  getFirst(froogy).x += 1
})


// --------------------------------------- inputs
afterInput(() => {
  
})
let clouds=getAll("c")

setInterval(() =>{
 
getFirst(taco).y -= 1

for (let cloud of clouds) {
cloud.y -= 1
}
  if(getFirst(froogy).y == 0 && getTile(getFirst(froogy).x,getFirst(froogy).y+1).some(s =>s.type ==="c") ) {
    setInterval(() => {
if(getFirst(froogy).y == 0 && getTile(getFirst(froogy).x,getFirst(froogy).y+1).some(s =>s.type ==="c") ) {
  addText("you died :(", { 
  x: 5,
  y: 4,
  color: color`0`
})
   addText("Score: " + score, { 
  x: 5,
  y: 6,
  color: color`8`
})
  lose = true;
 getFirst(froogy).remove();
  }

    },score1);
  }

addText(" " + score, { 
  x: 1,
  y:1,
  color: color`8`
})
  if (score1 < 200){
    score1 = 201;
  }
score1 = 1000 -(score*25)
},score1);

function gameLoop(){
   let rand = Math.floor(Math.random()*(6))
 for (let cloud of clouds) {
   //  console.log("Cloud y value:", cloud.y)

   if (cloud.y === 0){
setInterval(() =>{
   if (cloud.y === 0){
  cloud.x=rand;
   cloud.y= 6;
   }
   let rand2 = Math.floor(Math.random()*(6))
 
  const tileNum2 = tilesWith(cloud,taco)
  if (tileNum2.length > 0){
    console.log("hi")
    getFirst(taco). y = 6;
  getFirst(taco). x = rand2 ;
  }
if (getFirst(taco).y=== 0){
getFirst(taco). y = 6;
  getFirst(taco). x = rand2 ;
  
}
const tileNum = tilesWith(froogy,taco)

if(tileNum.length >0){score=score+1
getFirst(taco). y = 6;
  getFirst(taco). x = rand2 ;

               }

},400);
}
  }}








//if(getFirst(taco).y == (getFirstfroogy).y-1) {taco  }
setInterval(() =>{
  
setTimeout(gameLoop, 20);
},100);



