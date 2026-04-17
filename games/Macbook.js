/*
@title: macbook_virus_escape
@author: aytida
@description: Play as a MacBook cursor collecting files while avoiding viruses and reaching Finder to save the system.
@tags: ['arcade', 'survival', 'mac', 'virus']
@addedOn: 2026-03-14
*/

const cursor = "c"
const wall = "w"
const file = "f"
const virus = "v"
const finder = "g"
const dock = "d"

let level = 0
let score = 0
let gameOver = false
let inIntro = true
let inLevelScreen = false

setLegend(
[cursor, bitmap`
................
......000.......
.....00000......
....000000......
....00000.......
....000.........
....00..........
....0...........
................
................
................
................
................
................
................
................`],

[wall, bitmap`
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

[file, bitmap`
................
....666666......
....6....6......
....6....6......
....6....6......
....6....6......
....666666......
................
................
................
................
................
................
................
................
................`],

[virus, bitmap`
................
.....333333.....
....3......3....
...3..3333..3...
...3..3333..3...
....3......3....
.....333333.....
................
................
................
................
................
................
................
................
................`],

[finder, bitmap`
................
....44444444....
....4......4....
....4..44..4....
....4......4....
....4......4....
....44444444....
................
................
................
................
................
................
................
................
................`],

[dock, bitmap`
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
1111111111111111`]
)

setSolids([cursor])

const levels = [
map`
wwwwwwwwww
wc..f....w
w........w
w....v...w
w........w
w..f.....w
w........w
w.......gw
w........w
wwwwwwwwww`,

map`
wwwwwwwwww
wc..f....w
w..v.....w
w........w
w..f.....w
w........w
w....v...w
w.......gw
w........w
wwwwwwwwww`,

map`
wwwwwwwwww
wc..f....w
w..v.....w
w........w
w..f..v..w
w........w
w....v...w
w.......gw
w........w
wwwwwwwwww`,

map`
wwwwwwwwww
wc..f....w
w..v..v..w
w........w
w..f..v..w
w........w
w....v...w
w.......gw
w........w
wwwwwwwwww`,

map`
wwwwwwwwww
wc..f....w
w..v..v..w
w........w
w..f..v..w
w..v.....w
w....v...w
w.......gw
w........w
wwwwwwwwww`,

map`
wwwwwwwwww
wc..f....w
w..v..v..w
w........w
w..f..v..w
w..v..v..w
w....v...w
w.......gw
w........w
wwwwwwwwww`,

map`
wwwwwwwwww
wc..f....w
w..v..v..w
w........w
w..f..v..w
w..v..v..w
w..v.....w
w.......gw
w........w
wwwwwwwwww`,

map`
wwwwwwwwww
wc..f....w
w..v..v..w
w........w
w..f..v..w
w..v..v..w
w..v..v..w
w.......gw
w........w
wwwwwwwwww`,

map`
wwwwwwwwww
wc..f....w
w..v..v..w
w........w
w..f..v..w
w..v..v..w
w..v..v..w
w.......gw
w........w
wwwwwwwwww`,

map`
wwwwwwwwww
wc..f....w
w..v..v..w
w........w
w..f..v..w
w..v..v..w
w..v..v..w
w.......gw
w........w
wwwwwwwwww`
]

function drawDock(){
  for(let x=0;x<width();x++){
    addSprite(x,height()-1,dock)
  }
}

function introScreen(){
  clearText()
  setMap(map`
..........
..........
..........
..........
..........
..........
..........
..........
..........
..........`)
  setBackground(wall)
  drawDock()

  addText("MACBOOK",{x:5,y:5,color:color`0`})
  addText("Press K",{x:5,y:8,color:color`4`})
}

function levelScreen(){
  inLevelScreen = true
  clearText()
  setMap(map`
..........
..........
..........
..........
..........
..........
..........
..........
..........
..........`)
  setBackground(wall)
  drawDock()

  addText("LEVEL "+(level+1),{x:6,y:5,color:color`4`})
  addText("Press K",{x:5,y:7,color:color`0`})
}

function startLevel(){
  setMap(levels[level])
  setBackground(wall)
  clearText()
  drawDock()
  addText("MAC",{x:1,y:0,color:color`0`})
  addText("FILES:"+score,{x:10,y:0,color:color`6`})
}

introScreen()

onInput("k",()=>{
  if(inIntro){
    inIntro=false
    levelScreen()
    return
  }
  if(inLevelScreen){
    inLevelScreen=false
    startLevel()
  }
})

onInput("w",()=>{ if(!gameOver && !inIntro && !inLevelScreen)getFirst(cursor).y-- })
onInput("s",()=>{ if(!gameOver && !inIntro && !inLevelScreen)getFirst(cursor).y++ })
onInput("a",()=>{ if(!gameOver && !inIntro && !inLevelScreen)getFirst(cursor).x-- })
onInput("d",()=>{ if(!gameOver && !inIntro && !inLevelScreen)getFirst(cursor).x++ })

onInput("j",()=>{
  if(gameOver){
    level=0
    score=0
    gameOver=false
    inIntro=true
    introScreen()
  }
})

let dirs = [[1,0],[-1,0],[0,1],[0,-1]]

function moveViruses(){
  if(gameOver || inIntro || inLevelScreen) return
  getAll(virus).forEach(v=>{
    let d = dirs[Math.floor(Math.random()*dirs.length)]
    v.x += d[0]
    v.y += d[1]
  })
}

setInterval(moveViruses,700)

afterInput(()=>{

  if(gameOver || inIntro || inLevelScreen) return

  tilesWith(cursor,file).forEach(t=>{
    t[1].remove()
    score++
  })

  if(tilesWith(cursor,virus).length>0){
    gameOver=true
    clearText()
    addText("SYSTEM CRASH",{x:3,y:5,color:color`3`})
    addText("Press J",{x:5,y:7,color:color`3`})
  }

  if(getAll(file).length===0 && tilesWith(cursor,finder).length>0){
    level++
    if(level>=levels.length){
      clearText()
      addText("MAC SAVED",{x:4,y:5,color:color`4`})
      gameOver=true
    } else {
      levelScreen()
    }
  }

})
