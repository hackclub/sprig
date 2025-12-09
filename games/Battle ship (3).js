/*
@title: Battleship Classic
*/

// --- SPRITES & CONSTANTS ---
const playerCursor = "p"
const water = "w"
const hit = "h"
const miss = "x"
const enemyShip = "s"

let playerLives = 3
let gameState = "start" // "start", "play", "end"
let playerInputEnabled = false
let enemyShips = [] // list of enemy ship coordinates
let gridSize = 7

// --- LEGEND ---
setLegend(
  [playerCursor, bitmap`
LLLLLLLLLLLLLLLL
L77777777777777L
L77777777777777L
L77777722777777L
L77777700777777L
L77700000000777L
L77700000000777L
L77777700777777L
L77777000077777L
L77777777777777L
L77777777777777L
L77777777777777L
L77777777777777L
L77777777777777L
L77777777777777L
LLLLLLLLLLLLLLLL`],
  [water, bitmap`
7777755577555555
5555775555577755
7777755577775557
5555555555555555
5555777555557775
5777755577777555
5555555555555555
7775557777555577
5555777555557775
5555555555555555
7777755555555777
5555557777757755
7755577555555557
5557555577777777
7555577775555577
5557775555577755`],
  [enemyShip, bitmap`................
................
................
................
................
................
................
................
................
................
................
................
................
................
................
................`],
  [hit, bitmap`
....66666666....
...6666666666...
..666666666666..
.66666666666666.
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
.66666666666666.
..666666666666..
...6666666666...
....66666666....`],
  [miss, bitmap`
....22222222....
...2222222222...
..222222222222..
.22222222222222.
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
.22222222222222.
..222222222222..
...2222222222...
....22222222....`]
)

setBackground(water)
setSolids([])

// -----------------------------
// CLEAR ALL SPRITES
// -----------------------------
function clearAllSprites() {
  for (let y = 0; y < height(); y++) {
    for (let x = 0; x < width(); x++) {
      getTile(x, y).forEach(s => {
        if (s.type !== water) {
          try { s.remove() } catch(e) {}
        }
      })
    }
  }
}

// -----------------------------
// START SCREEN
// -----------------------------
function showStartScreen(){
  clearAllSprites()
  clearText()
  setMap(map`
.......
.......
.......
...p...
.......
.......
.......`)
  addText(" BATTLESHIP ", {x:1,y:2,color:color`3`})
  addText("PRESS L TO START", {x:0,y:4,color:color`3`})
  gameState = "start"
  playerInputEnabled = false
}
showStartScreen()

// -----------------------------
// SHIP PLACEMENT
// -----------------------------
function randomCoord() { return {x: Math.floor(Math.random()*gridSize), y: Math.floor(Math.random()*gridSize)} }

function placeShip(size){
  let attempts = 0
  while(attempts<100){
    attempts++
    const horizontal = Math.random()<0.5
    const start = randomCoord()
    const coords = []
    for(let i=0;i<size;i++){
      const x = start.x + (horizontal?i:0)
      const y = start.y + (horizontal?0:i)
      if(x>=gridSize || y>=gridSize) break
      coords.push({x,y})
    }
    if(coords.length!==size) continue
    if(coords.some(c=>enemyShips.some(s=>s.x===c.x && s.y===c.y))) continue
    coords.forEach(c=>enemyShips.push(c))
    return coords
  }
}

function placeAllShips() {
  enemyShips = []
  placeShip(2)
  placeShip(3)
  placeShip(3)
}

// -----------------------------
// RESET GAME
// -----------------------------
function resetGame(){
  clearText()
  clearAllSprites()
  playerLives = 3
  playerInputEnabled = true
  gameState = "play"
  setMap(map`
p......
.......
.......
.......
.......
.......
.......`)
  addSprite(0,0,playerCursor)
  placeAllShips()
  updateHUD()
}

// -----------------------------
// HUD
// -----------------------------
function updateHUD(){
  clearText()
  addText(`LIVES: ${playerLives}`, {x:0,y:0,color:color`3`})
  addText(`ENEMY SHIPS: ${enemyShips.length}`, {x:5,y:0,color:color`3`})
}

// -----------------------------
// PLAYER MOVEMENT
// -----------------------------
onInput("w",()=>{if(playerInputEnabled){let p=getFirst(playerCursor); if(p.y>0)p.y--; updateHUD()}})
onInput("s",()=>{if(playerInputEnabled){let p=getFirst(playerCursor); if(p.y<height()-1)p.y++; updateHUD()}})
onInput("a",()=>{if(playerInputEnabled){let p=getFirst(playerCursor); if(p.x>0)p.x--; updateHUD()}})
onInput("d",()=>{if(playerInputEnabled){let p=getFirst(playerCursor); if(p.x<width()-1)p.x++; updateHUD()}})

// -----------------------------
// PLAYER SHOOT
// -----------------------------
onInput("l",()=>{
  if(gameState==="start"){resetGame(); return}
  if(!playerInputEnabled) return

  const p = getFirst(playerCursor)
  const tile = getTile(p.x,p.y)
  if(tile.some(t=>t.type===hit||t.type===miss)) return

  const hitIndex = enemyShips.findIndex(s=>s.x===p.x && s.y===p.y)
  if(hitIndex!==-1){
    addSprite(p.x,p.y,hit)
    enemyShips.splice(hitIndex,1)
  } else addSprite(p.x,p.y,miss)

  updateHUD()
  checkEnd()
  if(playerInputEnabled) setTimeout(enemyShoot,150)
})

// -----------------------------
// ENEMY AI SHOOT
// -----------------------------
function enemyShoot(){
  if(!playerInputEnabled) return
  const playerPos = getFirst(playerCursor)
  let target = {x:playerPos.x, y:playerPos.y} // aim at player
  const tile = getTile(target.x,target.y)
  if(tile.some(t=>t.type===hit||t.type===miss)){
    // pick random adjacent if already shot
    target.x = Math.max(0, Math.min(gridSize-1, target.x + Math.floor(Math.random()*3)-1))
    target.y = Math.max(0, Math.min(gridSize-1, target.y + Math.floor(Math.random()*3)-1))
  }
  const finalTile = getTile(target.x,target.y)
  if(finalTile.some(t=>t.type===playerCursor)){
    playerLives--
    addText("YOU WERE HIT!",{x:0,y:1,color:color`3`})
    if(playerLives<=0){
      addText("YOU LOSE!",{x:2,y:3,color:color`3`})
      addText("PRESS J TO RESTART",{x:0,y:5,color:color`3`})
      playerInputEnabled=false
      gameState="end"
    }
  } else addSprite(target.x,target.y,miss)

  updateHUD()
  checkEnd()
}

// -----------------------------
// END CHECK
// -----------------------------
function checkEnd(){
  if(gameState!=="play") return
  if(enemyShips.length===0){
    addText("YOU WIN!",{x:2,y:3,color:color`3`})
    addText("PRESS J TO RESTART",{x:0,y:5,color:color`3`})
    playerInputEnabled=false
    gameState="end"
  }
}

// -----------------------------
// RESTART
// -----------------------------
onInput("j",()=>{showStartScreen()})
afterInput(()=>{if(gameState==="play") checkEnd()})
