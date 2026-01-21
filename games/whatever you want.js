/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: whatever you want
@author: 
@tags: []
@addedOn: 2025-00-00
*/

const player = "p"
const ground = "g"
const object = "o"

setLegend(
  [ player, bitmap`
................
................
.......000......
.......060......
......0F60......
......0F660.0...
....0000600.0...
....0.0F66000...
....0.00600.....
......0F060.....
.....0FF660.....
.....0FFF0......
......000.......
......0.0.......
.....00.00......
................` ],
  [ground, bitmap`
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111`],
  [object, bitmap`
........0.......
.......070......
......0770......
.....07770......
....07777700....
....077777770...
...07777777770..
...07777777770..
...05777777770..
...05777777770..
...05577777770..
....0557777770..
.....055555550..
......0055500...
........000.....
................`],
)

setSolids([])

let level = 0
const levels = [
  map`
.........
.........
.........
.........
.........
.........
.........
p........
ggggggggg`
]

setMap(levels[level])

setPushables({
  [ player ]: []
})
let gamerunning = true;

onInput("d", () => {
  if (gamerunning){
  getFirst(player).x += 1
  }
})
onInput("a", () => {
  if (gamerunning){
  getFirst(player).x -= 1
  }
})

const gameloop = setInterval(()=> {
spawny()
  fallyFall()
  if (checkHit() ==false){
    clearInterval(gameloop)
    gamerunning = false;
    addText("Game Over",{x:5, y:4, color:'3'})
  }
},85)

function spawny(){
  let x = Math.floor(Math.random()*9);
  let y = 0;
addSprite(x,y,object)
}

function fallyFall(){
let o = getAll(object)
for (let i = 0; i < o.length; i++) {
  o[i].y +=1;
}
}

function checkHit(){
let o=getAll(object)
  let p=getFirst(player)
  for (let i = 0; i < o.length; i++) {
    if (o[i].x==p.x && o[i].y==p.y) {
      return false;
    }
  }
  return true;
}