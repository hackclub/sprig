/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started
javascript:void(0);
@title: lasers vs fog
@author: e-rairigh
@tags: ['multiplayer']
@addedOn: 2024-09-27
*/
let win = false
let shot = false
const glass = "g"
const foger = "G"
const path = "p"
const laser = "l"
const zaper = "z"
const floor = "F"
const zapX = "x"
const fog = "f"
const lase = "a"

const tne = tune`
247.93388429752065: C4~247.93388429752065,
247.93388429752065: E4^247.93388429752065,
247.93388429752065: C4~247.93388429752065,
247.93388429752065: E4^247.93388429752065 + C5-247.93388429752065,
247.93388429752065: C4~247.93388429752065,
247.93388429752065: E4^247.93388429752065,
247.93388429752065: C4~247.93388429752065 + G4-247.93388429752065 + C5~247.93388429752065,
247.93388429752065: E4^247.93388429752065,
247.93388429752065: C4~247.93388429752065,
247.93388429752065: E4^247.93388429752065,
247.93388429752065: C4~247.93388429752065,
247.93388429752065: E4^247.93388429752065 + C5-247.93388429752065,
247.93388429752065: C4~247.93388429752065,
247.93388429752065: E4^247.93388429752065 + A4-247.93388429752065 + G5-247.93388429752065,
247.93388429752065: C4~247.93388429752065,
247.93388429752065: E4^247.93388429752065 + E5~247.93388429752065,
247.93388429752065: C4~247.93388429752065,
247.93388429752065: E4^247.93388429752065,
247.93388429752065: C4~247.93388429752065,
247.93388429752065: E4^247.93388429752065 + G4-247.93388429752065,
247.93388429752065: C4~247.93388429752065 + B4-247.93388429752065,
247.93388429752065: E4^247.93388429752065 + D5-247.93388429752065 + G4~247.93388429752065,
247.93388429752065: C4~247.93388429752065,
247.93388429752065: E4^247.93388429752065,
247.93388429752065: C4~247.93388429752065 + A5/247.93388429752065,
247.93388429752065: E4^247.93388429752065 + G5~247.93388429752065,
247.93388429752065: C4~247.93388429752065 + F5/247.93388429752065,
247.93388429752065: E4^247.93388429752065 + E5~247.93388429752065,
247.93388429752065: C4~247.93388429752065 + D5/247.93388429752065 + G4-247.93388429752065,
247.93388429752065: E4^247.93388429752065 + C5~247.93388429752065,
247.93388429752065: C4~247.93388429752065,
247.93388429752065: E4^247.93388429752065`
const smile = tune`
37.5,
37.5: B5^37.5 + A5^37.5,
37.5: A5^37.5,
37.5: G5^37.5 + F5^37.5 + E5^37.5,
37.5: D5^37.5,
37.5: D5^37.5,
37.5: C5^37.5,
37.5: C5^37.5 + B4^37.5 + A4^37.5 + G4^37.5,
37.5: B4^37.5 + G4^37.5,
37.5: A4~37.5 + G4~37.5 + B4~37.5 + C5~37.5 + D5~37.5,
37.5: A4^37.5 + G4^37.5 + F5^37.5,
37.5: B4^37.5 + A4^37.5 + G4^37.5 + F5^37.5,
37.5: B4^37.5 + A4^37.5 + F5^37.5,
37.5: B4~37.5 + C5~37.5 + D5~37.5 + E5~37.5 + F5~37.5,
37.5: F5^37.5 + G4^37.5 + G5^37.5,
37.5: F5^37.5 + G4^37.5 + G5^37.5,
37.5: F5^37.5 + A4^37.5 + G5^37.5,
37.5: F5^37.5 + B4^37.5 + A4^37.5 + G5^37.5,
37.5: F5~37.5 + C5~37.5 + B4~37.5 + D4~37.5 + C4~37.5,
37.5: E5~37.5 + D5~37.5 + F5~37.5 + C5~37.5 + B4~37.5,
37.5: D4~37.5,
37.5: E4~37.5,
37.5: F4~37.5,
37.5: F4~37.5 + G4~37.5,
37.5: G4~37.5 + A4~37.5 + B4~37.5 + C5~37.5 + D5~37.5,
37.5: E5~37.5 + F5~37.5,
37.5: F5~37.5 + E5~37.5,
37.5: E5~37.5 + D5~37.5 + C5~37.5 + B4~37.5,
150`
playTune(tne,Infinity)

setLegend(
  [foger,  bitmap`
.......21.......
......0120......
.....000000.....
....00021000....
...0010220200...
..001221221200..
.00002222120000.
1202212122221021
2101222212122012
.00002122220000.
..001221212100..
...0010220200...
....00021000....
.....000000.....
......0120......
.......21.......`],
  [zaper, bitmap`
.......57.......
......0750......
.....000000.....
....00057000....
...0070550500...
..007557557500..
.00005555750000.
7505575755557057
5707555575755075
.00005755550000.
..007557575700..
...0070550500...
....00057000....
.....000000.....
......0750......
.......57.......`],
  [laser, bitmap`
................
................
................
................
...........L....
..........L5L...
....LLLL.L577L..
...LLL7LL57575L.
..LLL757LLLLLL..
..LLLL7LL77575L.
...LLLLL.L577L..
..........L5L...
...........L....
................
................
................`] ,           
  [ fog, bitmap`
..222222122222..
.22222222222222.
2221222222222122
1222222222122222
2222222122222222
2222222222222222
2212222222222222
2222212222122222
2222222222222222
2222222222222222
2122222222222122
2222222222122222
2212212222222222
2222222222222222
.22222221222222.
..222222222222..`],
  [lase, bitmap`
................
................
................
................
................
................
................
......757575....
......575757....
................
................
................
................
................
................
................`],
  [floor, bitmap`
LLLLLL1LL111111L
L1L111111111111L
L11111111111111L
LL1111111111112L
L111111111111111
111111111111112L
111111111111111L
L11111111111112L
111111111111111L
111111111111112L
1111111111111221
111111111111112L
L11111111111211L
L111111112111221
111122121121221L
LL1LL11LLLL1LL1L`])




let level = 0
const levels = [
  map`
..................f
...................
...................
l..................
...................
...................
...................
...................`,
  map`
l.................f
.............z.....
...................
.........z........z
....z..............
...................
.......z....z......
...................`,
  map`
l.................f
.....z.......z.....
..G................
.........G........G
....z..............
...............G...
.......G....z......
...................`,
  map`
l............z....f
....G..............
.......G....z......
...........G.......
....G........z.....
.........z....G....
.......G....z......
................z..`,
  map`
l...G.............f
......G....z.zz....
....G...G...z.z....
....G.G.G...zzz.z..
......G......zzz...
...G.......z..zzz..
...GG...G.G...zzz..
............z..z...`,
  map`
l...G.............f
......G....z.zz....
....G...G...z.z....
........G...zzz.z..
.............z.....
...G.......z..zzz..
...GG...G.G...zzz..
............z..z...`,
  map`
l............z....f
....G..............
.......G....z......
...........G.......
....G........z.....
.........z....G....
.......G....z......
................z..`,
map`
l.................f
.....z.......z.....
..G................
.........G........G
....z..............
...............G...
.......G....z......
...................`,
  map`
l.................f
.............z.....
...................
.........z........z
....z..............
...................
.......z....z......
...................`,
  map`
l.................f.
..GG..GGG.GGG.GG.GG.
..GzG.GzG.GzG.GzGzG.
..GzG.GzG.GzG.GzzzG.
..GzG.GzG.GzG.GzzzG.
..GzG.GzG.GzG.G...G.
..GG..GGG.GGG.GzzzG.
....................`
]

setBackground(floor)

function fire()
  {
   shot = true
  const originalSprite = getFirst(laser)

// Create a new sprite with the same properties
let clonedSprite = addSprite(originalSprite.x + 1, originalSprite.y, lase)}

function isOver(obj1,obj2,xs=0,xl=0,ys=0,yl=0){
  return (getFirst(obj1).x+xs == getFirst(obj2).x+xl && getFirst(obj1).y+ys == getFirst(obj2).y+yl)
}

setMap(levels[0])


function zap(){
  for(let i = 0;i < getAll(zaper).length; i++){
    let j = getAll(zaper)[i]
    if(j.x == getFirst(fog).x && j.y == getFirst(fog).y){
      
      clearTile(j.x,j.y-1)
      clearTile(j.x,j.y+1)
      clearTile(j.x-1,j.y)
      clearTile(j.x+1,j.y)
      clearTile(j.x-1,j.y-1)
      clearTile(j.x+1,j.y+1)
      clearTile(j.x-1,j.y+1)
      clearTile(j.x+1,j.y-1)
      
      j.remove()
    }
  }
  
}

function puf(){
  let j
   for(let i = 0;i < getAll(foger).length; i++){
    j = getAll(foger)[i]
    if (shot){
    if(j.x-4 == getFirst(lase).x && j.y == getFirst(lase).y){
      
      addSprite(j.x,j.y-1,fog)
      addSprite(j.x,j.y+1,fog)
      addSprite(j.x-1,j.y,fog)
      addSprite(j.x+1,j.y,fog)
      addSprite(j.x-1,j.y-1,fog)
      addSprite(j.x+1,j.y+1,fog)
      addSprite(j.x-1,j.y+1,fog)
      addSprite(j.x+1,j.y-1,fog)
      getFirst(lase).remove()
      shot = false
      j.remove()
    }
  }
 }
}

function time(){ 
    if(getAll(fog).length >= 40){
      addText("FOG WINS!!!",{x:4,y:8,color:color`D`})
      win = true
      onInput("i",() => {
      if (win){
      clearText()
      display = true
      level = Math.round(Math.random() * 9)
      timer = 120
      setMap(levels[level])
      win = false}
    })
    }
    else{
     addText("LASER WINS!!!",{x:4,y:8,color:color`5`})
      win = true
    onInput("w",() => {
      if(win){
      clearText()
      display = true
      level = Math.round(Math.random() * 9)
      timer = 120
      setMap(levels[level])
      win = false}
    })
    }
  
}

onInput("k", () => {
  getFirst(fog).y += 1
})

onInput("i", () => {
  getFirst(fog).y -= 1
})

onInput("l", () => {
  getFirst(fog).x += 1
})

onInput("j", () => {
  getFirst(fog).x -= 1
})

onInput("w", () => {
  getFirst(laser).y -= 1
  if(!(isOver(laser,fog,xs=1))){
  clearTile(0,getFirst(laser).y+1)}
})

onInput("s",() => {
  getFirst(laser).y += 1
  if(!(isOver(laser,fog,xs=-1))){
clearTile(0,getFirst(laser).y-1)}
})

onInput("d",fire)

onInput("a",() => {
  num1 = Math.round(Math.random() * 18)
  num2 = Math.round(Math.random() * 7)
  if(!(num1 <= 1)){
  addSprite(num1,num2,zaper)}
})

afterInput(() => {
  const originalSprite = getFirst(fog)
const clonedSprite = addSprite(originalSprite.x, originalSprite.y, fog)
})

setInterval(() => {
  puf()
  if (shot){  
  

if (!(getFirst(lase).x <= 1 /*== getFirst(laser).x && getFirst(lase).y == getFirst(laser).y)*/)){
  if (!(getFirst(lase).x-1 == getFirst(fog).x && getFirst(lase).y == getFirst(fog).y)){
  clearTile(getFirst(lase).x-1, getFirst(lase).y)
  }
  if (!(getFirst(lase).x+4 == getFirst(fog).x && getFirst(lase).y == getFirst(fog).y)){
  clearTile(getFirst(lase).x+4, getFirst(lase).y)
  }
}
getFirst(lase).x += 1
if (getFirst(lase).x >= 15){
  getFirst(lase).remove()
  shot = false
  }
    
  }
  zap()        })

let display = true
let timer = 120

setInterval(() => {
   if(timer <= 0){
     display = false
     time()
   }
   if(display){
   timer -= 1
   clearText()}
   addText(timer.toString())
  
 },1000)
