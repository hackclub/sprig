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

setLegend(

[cursor, bitmap`
................
......000.......
.....00000......
....0000000.....
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
................`],

[wall, bitmap`
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

[file, bitmap`
................
....66666666....
....6......6....
....6......6....
....6......6....
....6......6....
....6......6....
....6......6....
....66666666....
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
....33333333....
...3333333333...
...3333333333...
...3333333333...
....33333333....
.....333333.....
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
....77777777....
....77777777....
....77777777....
....77777777....
....77777777....
....77777777....
....77777777....
....77777777....
................
................
................
................
................
................
................`],

[dock, bitmap`
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
2222222222222222`]
)

setSolids([cursor, wall])

const levels = [

map`
wwwwwwwwww
wc...f...w
w........w
w....v...w
w........w
w....f...w
w........w
w.......gw
w........w
wwwwwwwwww`,

map`
wwwwwwwwww
wc..f....w
w...v....w
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
w...v....w
w........w
w..f.....w
w....v...w
w........w
w.......gw
w........w
wwwwwwwwww`,

map`
wwwwwwwwww
wc..f....w
w..v..v..w
w........w
w..f.....w
w....v...w
w........w
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
wwwwwwwwww`
]

function startLevel(){
  setMap(levels[level])
  setBackground(dock)
  clearText()
  addText("FILES:"+score,{x:1,y:1,color:color`4`})
}

startLevel()

onInput("w",()=>{ if(!gameOver)getFirst(cursor).y-- })
onInput("s",()=>{ if(!gameOver)getFirst(cursor).y++ })
onInput("a",()=>{ if(!gameOver)getFirst(cursor).x-- })
onInput("d",()=>{ if(!gameOver)getFirst(cursor).x++ })

onInput("j",()=>{
  if(gameOver){
    level=0
    score=0
    gameOver=false
    startLevel()
  }
})

function moveViruses(){

  if(gameOver) return

  getAll(virus).forEach(v=>{
    let r=Math.floor(Math.random()*4)
    if(r===0)v.x++
    if(r===1)v.x--
    if(r===2)v.y++
    if(r===3)v.y--
  })

}

setInterval(moveViruses,700)

afterInput(()=>{

  if(gameOver) return

  tilesWith(cursor,file).forEach(t=>{
    t[1].remove()
    score++
  })

  if(tilesWith(cursor,virus).length>0){

    gameOver=true
    clearText()

    addText("GAME OVER",{x:4,y:5,color:color`3`})
    addText("Press J",{x:5,y:7,color:color`3`})

  }

  if(getAll(file).length===0 && tilesWith(cursor,finder).length>0){

    level++

    if(level>=levels.length){

      clearText()
      addText("YOU SAVED",{x:4,y:5,color:color`4`})
      addText("THE MAC!",{x:4,y:7,color:color`4`})
      gameOver=true

    } else {

      startLevel()

    }

  }

})
