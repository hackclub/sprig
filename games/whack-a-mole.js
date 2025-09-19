/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: whack a mole
@author: Praneel
@tags: []
@addedOn: 2025-00-00
*/
const player ="p"
const mole = "m"
const hole = "h"
let score=0
let speed=500
setLegend(
  [player,bitmap`
................
................
................
................
................
................
................
9C99C9..........
9C99C9..........
..CC............
..CC............
..CC............
..CC............
..CC............
..CC............
..CC............`],
  ["M",bitmap`
................
................
................
................
................
................
........99......
........CC......
.CCCCCCC99......
.CCCCCCC99......
........CC......
........99......
................
................
................
................`],
  [mole,bitmap`
3333333333333333
3333CCCCCCCC3333
333CCCCCCCCCC333
33CCCCCCCCCCCC33
3CCCCCCCCCCCCCC3
3CCCCCCCCCCCCCC3
3CCC02CCCC20CCC3
3CCC00CCCC00CCC3
3CCCCCCCCCCCCCC3
3CCCC110011CCCC3
3CCCCLL00LLCCCC3
3CCCCCCCCCCCCCC3
33CCCCCCCCCCCC33
333CCCCCCCCCC333
3333CCCCCCCC3333
3333333333333333`],
  [hole,bitmap`
3333333333333333
3333000000003333
3330000000000333
3300000000000033
3000000000000003
3000000000000003
3000000000000003
3000000000000003
3000000000000003
3000000000000003
3000000000000003
3000000000000003
3300000000000033
3330000000000333
3333000000003333
3333333333333333`],
  ["a",bitmap`
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
  ["r",bitmap`
6666366666663666
6666366666663366
6666366666663366
6666366666663666
6666336666663666
6666636666663666
6666636666663666
3336633333663333
6633336663333363
6666366666666366
6666366666666366
6666366666666366
6666636666663366
3333336663333633
6666633333663336
6666636666663666`],
  ["n",bitmap``],

)
setBackground("r")
setMap(map`
p....
.hhh.
.hhh.
.....`)
const holes = getAll("h")
holes.current=[0,0]
holes.y=holes.current[1]
holes.x = holes.current[0]
function rand(max,min){
  holes.x = Math.floor(Math.random()*(max-min)+min)
  holes.y = Math.floor(Math.random()*((max-1)-min)+min)
  if (holes.x==holes.current[0] && holes.y == holes.current[1]){
    rand(max,min)
  }
}
function flip (){
  getFirst(holes)
  rand(4,1)
  holes.forEach((o)=>{
    if(o.x == holes.x && o.y == holes.y){
      o.type="m"
    } else{
      o.type="h"
    }
  })
}
function Game_loop(){
  clearText()
  addText("score: "+score,{color:color`0`})
  addText("speed: "+((speed)/1000)+" SPF",{x:4,y:1,color:color`0`})
  getAll(mole).forEach((o)=>{
    if (o.type=="m"){
    o.type="h"
    } else{
      o.type="h"
    }
  })
  flip()
  
  setTimeout(Game_loop,speed)
}

onInput("w",()=>{
  const p = getFirst(player)
  if (p){
  p.y--
  }
});
onInput("a",()=>{
  const p = getFirst(player)
  if (p){
  p.x--
  }
});
onInput("s",()=>{
  const p = getFirst(player)
  if (p){
  p.y++
  }
});
onInput("d",()=>{
  const p = getFirst(player)
  if (p){
  p.x++
  }
});
onInput("i",()=>{
  const p = getFirst(player)
  getTile(p.x,p.y).forEach((o)=>{
    if (o.type=="m"){
      score+=1
      flip()
    }
    
  })
  p.type="M"
  setTimeout(()=>{
    getTile(p.x,p.y).forEach((o)=>{
      if (o.type=="M"){
        o.type="n"
      }
    })
    
    p.type="p"
    },200)
})
onInput("l",()=>{
  if (speed>0){
  speed-=50
  }
})
onInput("j",()=>{
  if (speed<1000){
  speed+=50
  }
})
onInput("k",()=>{
  speed=500
})
Game_loop()


