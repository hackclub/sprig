/*
@title: dino-square
@author: Efe Çalışkan
@description: This is a dino game where the player goes around the screen instead of going on a straight line
@tags: []
@addedOn: 2025-06-22
*/

const player = "p"
const cactus_normal = "n"
const cactus_right = "r"
const block = "b"

let game_ended = false

setLegend(
  [ player, bitmap`
................
................
.....0000.......
.....0..0.......
.....0..0.......
......00........
.....0000.......
....0.00.0......
...0..00..0.....
......00........
......00........
.....0000.......
.....0..0.......
.....0..0.......
.....0..0.......
.....0..0.......` ],
  [ cactus_normal, bitmap`
................
................
................
................
...0000000000...
...0000000000...
...0000000000...
...0000000000...
...0000000000...
...0000000000...
...0000000000...
...0000000000...
...0000000000...
...0000000000...
...0000000000...
...0000000000...`],
  [ cactus_right, bitmap`
................
................
................
....000000000000
....000000000000
....000000000000
....000000000000
....000000000000
....000000000000
....000000000000
....000000000000
....000000000000
....000000000000
................
................
................`],
  [ block, bitmap`
0000000000000000
0000000000000000
0000000000000000
00000......00000
0000........0000
000..........000
000..........000
000..........000
000..........000
000..........000
000..........000
0000........0000
00000......00000
0000000000000000
0000000000000000
0000000000000000`]

)

setSolids([player, cactus_normal, cactus_right])

let level = 0
const levels = [map`
...................
...................
...................
...................
...................
...................
...................
...................
...................
...................
...................
...p..b....b....b..`]

setMap(levels[level])

setPushables({
  [ player ]: []
})

function move(h,d){

  if(getFirst(player).y==height()-1){
    getFirst(player).y-=h
    setTimeout(()=>{
      getFirst(player).y+=h
    },d)
  }
  if(getFirst(player).x==width()-1){
    getFirst(player).x-=h
    setTimeout(()=>{
      getFirst(player).x+=h
    },d)
  }
  if(getFirst(player).y==0){
    getFirst(player).y+=h
    setTimeout(()=>{
      getFirst(player).y-=h
    },d)
  }
  if(getFirst(player).x==0){
    getFirst(player).x += h
    setTimeout(()=>{
      getFirst(player).x-=h
    },d)
  }
}


onInput("w",()=>{move(1,1000)})
onInput("s",()=>{move(2,1500)})
let floor = 0

const gameLoop = () =>{
  
  // movement 
  if(getFirst(player).x<width()-1 && floor == 0){
    getFirst(player).x+=1
    if (getFirst(player).x == width()-1) floor =1
  }
  else if(0<getFirst(player).y && floor == 1){
    getFirst(player).y-=1
    if (getFirst(player).y == 0) floor =2
  }
  else if (0<getFirst(player).x && floor == 2){
    getFirst(player).x-=1
    if(getFirst(player).x==0) floor = 3
  }
  else if (height()-1>getFirst(player).y && floor==3){
    getFirst(player).y +=1
    if(getFirst(player).y==height()-1) floor = 0
  }

  
  // Game Over
  if(tilesWith(player,block).length!=0){
    console.log("Game Over")
  }//else{
    setTimeout(()=>{gameLoop()},500)
  //}
}

function blockGen0(){
  for(let i=0;i<3;i++){
      setTimeout(()=>{
        let blocks = getAll(block)
        let y = Math.floor(Math.random() * height())
        let minus_x = (Math.random() < 0.75 ? 1 : 0) + 1
        addSprite(width()-minus_x,y,block)
        //clearTile(blocks[i].x,blocks[i].y)
      },2500*i)
    }
} 

function blockGen1(){
  for(let i=0;i<3;i++){
      setTimeout(()=>{
        let blocks = getAll(block)
        let x = Math.floor(Math.random() * width())
        let plus_y = (Math.random() < 0.25 ? 1 : 0)
        addSprite(x,plus_y,block)
        //clearTile(blocks[i].x,blocks[i].y)
      },2500*i)
    }
}
function blockGen2(){
  for(let i=0;i<3;i++){
      setTimeout(()=>{
        let blocks = getAll(block)
        let x = (Math.random() < 0.25 ? 1 : 0)
        let y = Math.floor(Math.random()* height())
        addSprite(x,y,block)
        //clearTile(blocks[i].x,blocks[i].y)
      },2500*i)
    }
}

function clearAll(type) {
  getAll(type).forEach(sprite => {
    sprite.remove()
  })
}

function blockGen3(){
  for(let i=0;i<3;i++){
      setTimeout(()=>{
        let blocks = getAll(block)
        let x = Math.floor(Math.random() * width())
        let minus_y = (Math.random() < 0.75 ? 1 : 0) + 1
        addSprite(x,height()-minus_y,block)
        //clearTile(blocks[i].x,blocks[i].y)
      },2500*i)
    }
  setTimeout(()=>{clearAll(block)},10000)
}

const blockGen = () => {
  
  function wait(_floor){
    if (floor==_floor){
      switch (_floor){
        case 0:
          blockGen0()
          break;
        case 1:
          blockGen1()
          break;
        case 2:
          blockGen2()
          break;
        case 3:
          blockGen3()
          break;
      }
    }
    else{
      setTimeout(()=>{wait(_floor)},100)
    }
  }
  function work(){
    wait(0)
    wait(1)
    wait(2)
    wait(3)
  }
  work()
  for(let i=1;i<100;i++){
    setTimeout(()=>{clearAll(block);work()},(width()+height())*2*500*i)
  }
  
}

gameLoop()
setTimeout(blockGen,3000)
