/*
@title: Neon Infinite Racer
@description: Endless racing HEHE
@author: Nullsec0x
*/

const PLAYER = "p"
const CAR = "c"
const COIN = "o"
const ROAD = "r"
const GRASS = "g"
const STAR = "s"

setLegend(

[PLAYER, bitmap`
................
.....000000.....
....02222220....
...0222222220...
...0222222220...
...0002222000...
...0002222000...
...0222222220...
....02222220....
.....000000.....
................
................
................
................
................
................`],

[CAR, bitmap`
................
.....111111.....
....12222221....
...1222222221...
...1222222221...
...1112222111...
...1112222111...
...1222222221...
....12222221....
.....111111.....
................
................
................
................
................
................`],

[COIN, bitmap`
................
......6666......
.....677776.....
....67777776....
....67777776....
....67777776....
....67777776....
.....677776.....
......6666......
................
................
................
................
................
................
................`],

[ROAD, bitmap`
0000000000000000
0000000000000000
0000011110000000
0000011110000000
0000011110000000
0000000000000000
0000000000000000
0000011110000000
0000011110000000
0000011110000000
0000000000000000
0000000000000000
0000011110000000
0000011110000000
0000011110000000
0000000000000000`],

[GRASS, bitmap`
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333`],

[STAR, bitmap`
................
.......9........
................
................
....9...........
................
...........9....
................
.......9........
................
................
................
................
................
................
................`]

)

const levelMap = map`
gggg....gggg
gggg....gggg
gggg....gggg
gggg....gggg
gggg....gggg
gggg....gggg
gggg....gggg
gggg....gggg
gggg....gggg
`

setMap(levelMap)

const LANE_MIN = 4
const LANE_MAX = 7

let playerX = 5
let playerY = 7

let world = []

let state = "boot"

let score = 0
let coins = 0
let speed = 250
let introFrame = 0

function resetWorld(){
  world=[]
  for(let y=0;y<height();y++){
    world.push(new Array(width()).fill(null))
  }
}

function spawnRow(){

  let row = new Array(width()).fill(null)

  let lane = Math.floor(Math.random()*(LANE_MAX-LANE_MIN+1))+LANE_MIN

  let roll = Math.random()

  if(roll < 0.35){
    row[lane] = "car"
  }

  if(roll > 0.8){
    row[lane] = "coin"
  }

  world.unshift(row)
  world.pop()

}

function gameLoop(){

  if(state !== "play") return

  score++

  spawnRow()

  let obj = world[playerY][playerX]

  if(obj === "car"){
    state="gameover"
  }

  if(obj === "coin"){
    coins++
    world[playerY][playerX] = null
  }

  draw()

  if(score % 60 === 0 && speed > 80){
    speed -= 5
  }

  setTimeout(gameLoop, speed)

}

function introAnimation(){

  clearText()

  for(let y=0;y<height();y++){
    for(let x=0;x<width();x++){

      clearTile(x,y)

      if(Math.random()>0.92){
        addSprite(x,y,STAR)
      }

    }
  }

  if(introFrame > 10){
    addText("NULLSEC0X",{x:5,y:6,color:color`6`}) // centered
  }

  if(introFrame > 20){
    addText("PRESENTS",{x:5,y:8,color:color`7`}) // centered
  }

  if(introFrame > 35){
    state="menu"
    draw()
    return
  }

  introFrame++

  setTimeout(introAnimation,120)

}

function draw(){

  clearText()

  for(let y=0;y<height();y++){
    for(let x=0;x<width();x++){

      clearTile(x,y)

      if(state==="menu"||state==="gameover"){
        addSprite(x,y,GRASS)
        continue
      }

      if(x>=LANE_MIN && x<=LANE_MAX){
        addSprite(x,y,ROAD)
      }else{
        addSprite(x,y,GRASS)
      }

      let obj = world[y][x]

      if(obj==="car") addSprite(x,y,CAR)
      if(obj==="coin") addSprite(x,y,COIN)

    }
  }

  if(state==="play"){

    addSprite(playerX,playerY,PLAYER)

    addText("SCORE:"+score,{x:1,y:1,color:color`7`})
    addText("COINS:"+coins,{x:1,y:14,color:color`6`})

  }

  if(state==="menu"){

    addText("NEON RACER",{x:5,y:5,color:color`6`})
    addText("PRESS J",{x:7,y:9}) 

  }

  if(state==="gameover"){

    addText("CRASHED",{x:5,y:6,color:color`3`})
    addText("SCORE:"+score,{x:7,y:6})
    addText("J RESTART",{x:6,y:9})

  }

}

onInput("a",()=>{

  if(state==="play" && playerX>LANE_MIN){
    playerX--
  }

  draw()

})

onInput("d",()=>{

  if(state==="play" && playerX<LANE_MAX){
    playerX++
  }

  draw()

})

onInput("j",()=>{

  if(state==="menu" || state==="gameover"){

    state="play"

    score=0
    coins=0
    speed=250

    resetWorld()

    gameLoop()

  }

  draw()

})

resetWorld()
introAnimation()