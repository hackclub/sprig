// Toxic Zone Survival - Sprig Edition (Lowercase-only IDs)

const p = "p"
const t = "t"
const o = "o"
const w = "w"

setLegend(
  [p, bitmap`
................
................
.......33.......
......3333......
.....333333.....
....33222333....
....33222333....
.....333333.....
......3333......
.......33.......
................
................
................
................
................
................`],

  [t, bitmap`
................
................
....22222222....
...2222222222...
..222222222222..
..222211112222..
..222211112222..
..222222222222..
...2222222222...
....22222222....
................
................
................
................
................
................`],

  [o, bitmap`
................
................
.......44.......
......4444......
.....444444.....
......4444......
.......44.......
................
................
................
................
................
................
................
................
................`],

  [w, bitmap`
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

setMap(map`
wwwwwwwwwwwwww
w............w
w............w
w............w
w............w
w............w
w............w
w............w
w............w
w............w
wwwwwwwwwwwwww`)

const W = width()
const H = height()

// CONFIG
const cfg = {
  tick: 140,
  oxyMax: 100,
  hpMax: 100,
  oxyDrain: 3,
  cloudMul: 4,
  dmg: 10,
  tankOxy: 36,
  tankSpawn: 6000,
  tankLife: 14000,
  cloudSpawn: 4200,
  cloudMin: 900,
  grow: 0.28
}

let state = "idle"
let pl = { x: Math.floor(W/2), y: Math.floor(H/2), oxy: cfg.oxyMax, hp: cfg.hpMax }
let dir = {x:0,y:0}
let nextDir = null
let clouds = []
let tanks = []
let tickLoop = null
let nextTank = performance.now() + 1000
let nextCloud = performance.now() + 1200
let cloudRate = cfg.cloudSpawn
let start = 0
let time = 0
let best = Number(localStorage.getItem("highScoreSprigTZS") || 0)

// UTIL
function r(a,b){ return Math.random()*(b-a)+a }
function solid(x,y){ return getTile(x,y).some(s=>s.type===w) }

// CLOUD/TANK SPAWN
function makeCloud(){
  const edge = Math.floor(Math.random()*4)
  let x,y
  if(edge===0){ x=0; y=Math.floor(r(1,H-2)) }
  if(edge===1){ x=W-1; y=Math.floor(r(1,H-2)) }
  if(edge===2){ x=Math.floor(r(1,W-2)); y=0 }
  if(edge===3){ x=Math.floor(r(1,W-2)); y=H-1 }
  const ang = Math.atan2(H/2-y, W/2-x)
  clouds.push({ x, y, r:r(1.2,2.4), vx:Math.cos(ang)*r(0.02,0.18), vy:Math.sin(ang)*r(0.02,0.18) })
}

function makeTank(){
  const arr = []
  for(let x=1;x<W-1;x++){
    for(let y=1;y<H-1;y++){
      if(!(x===pl.x && y===pl.y) && !solid(x,y)) arr.push({x,y})
    }
  }
  if(arr.length===0) return
  const p0 = arr[Math.floor(Math.random()*arr.length)]
  tanks.push({ x:p0.x, y:p0.y, born:performance.now() })
}

// DRAW
function clearInside(){
  for(let x=1;x<W-1;x++){
    for(let y=1;y<H-1;y++){
      clearTile(x,y)
    }
  }
}

function draw(){
  for(const tn of tanks) addSprite(tn.x, tn.y, o)
  for(const c of clouds){
    const R = c.r
    const xmin = Math.max(1, Math.floor(c.x - R))
    const xmax = Math.min(W-2, Math.floor(c.x + R))
    const ymin = Math.max(1, Math.floor(c.y - R))
    const ymax = Math.min(H-2, Math.floor(c.y + R))
    for(let xx=xmin; xx<=xmax; xx++){
      for(let yy=ymin; yy<=ymax; yy++){
        const dx = xx - c.x, dy = yy - c.y
        if(Math.sqrt(dx*dx+dy*dy) <= R+0.3) addSprite(xx,yy,t)
      }
    }
  }
  addSprite(pl.x, pl.y, p)
}

// GAME LOGIC
function step(){
  if(state!=="play") return
  const now = performance.now()

  // movement
  if(nextDir){
    if(!(dir.x===-nextDir.x && dir.y===-nextDir.y)) dir = nextDir
    nextDir = null
  }
  if(dir.x||dir.y){
    const nx = pl.x + dir.x, ny = pl.y + dir.y
    if(!solid(nx,ny)){ pl.x = nx; pl.y = ny }
  }

  // clouds
  for(const c of clouds){
    c.r += cfg.grow
    c.x += c.vx
    c.y += c.vy
  }
  clouds = clouds.filter(c => !(c.x<-3||c.x>W+3||c.y<-3||c.y>H+3||c.r>10))

  // spawn clouds
  cloudRate = Math.max(cfg.cloudMin, cfg.cloudSpawn - (time/60)*300)
  if(now>=nextCloud){
    makeCloud()
    nextCloud = now + r(cloudRate*0.7, cloudRate*1.2)
  }

  // tanks
  if(now>=nextTank){
    makeTank()
    nextTank = now + r(cfg.tankSpawn*0.6, cfg.tankSpawn*1.4)
  }
  tanks = tanks.filter(tk => now - tk.born <= cfg.tankLife)

  // pickup
  for(let i=tanks.length-1;i>=0;i--){
    if(tanks[i].x===pl.x && tanks[i].y===pl.y){
      pl.oxy = Math.min(cfg.oxyMax, pl.oxy + cfg.tankOxy)
      tanks.splice(i,1)
      try{ playTune("c5:6") }catch(e){}
    }
  }

  // oxygen drain
  let inside=false
  for(const c of clouds){
    const dx=pl.x-c.x, dy=pl.y-c.y
    if(Math.sqrt(dx*dx+dy*dy)<=c.r+0.2){ inside=true; break }
  }
  const dt = cfg.tick/1000
  pl.oxy = Math.max(0, pl.oxy - cfg.oxyDrain * (inside?cfg.cloudMul:1) * dt)
  if(pl.oxy<=0) pl.hp = Math.max(0, pl.hp - cfg.dmg*dt)

  // score
  time = (now-start)/1000

  // redraw
  clearInside()
  draw()

  try{ clearText() }catch(e){}
  addText("TIME "+time.toFixed(1), {x:1,y:0,color:color`3`})
  addText("OXY "+Math.floor(pl.oxy), {x:9,y:0,color:color`4`})
  addText("HP "+Math.floor(pl.hp), {x:14,y:0,color:color`2`})
  addText("BEST "+Math.floor(best), {x:1,y:H-1,color:color`5`})

  // game over
  if(pl.hp<=0){
    endGame()
  }
}

function endGame(){
  state="end"
  if(tickLoop) clearInterval(tickLoop)
  const final = Math.floor(time)
  if(final>best){
    best=final
    localStorage.setItem("highScoreSprigTZS",String(best))
  }
  try{ clearText() }catch(e){}
  addText("GAME OVER", {x:5,y:3,color:color`2`})
  addText("TIME "+final+"s", {x:5,y:5,color:color`3`})
  addText("PRESS ANY KEY", {x:3,y:7,color:color`4`})
  try{ playTune("e4:6 r:2 c4:8") }catch(e){}
}

function startGame(){
  pl.x=Math.floor(W/2); pl.y=Math.floor(H/2)
  pl.oxy=cfg.oxyMax; pl.hp=cfg.hpMax
  clouds=[]; tanks=[]
  dir={x:0,y:0}; nextDir=null
  start=performance.now()
  time=0
  state="play"
  if(tickLoop) clearInterval(tickLoop)
  tickLoop=setInterval(step,cfg.tick)
  makeCloud()
  makeTank()
}

// INPUT HANDLERS
function move(x,y){ nextDir={x,y}; if(state==="idle") startGame(); if(state==="end") startGame() }

onInput("w",()=>move(0,-1))
onInput("s",()=>move(0,1))
onInput("a",()=>move(-1,0))
onInput("d",()=>move(1,0))
onInput("i",()=>move(0,-1))
onInput("k",()=>move(0,1))
onInput("j",()=>move(-1,0))
onInput("l",()=>move(1,0))

// START SCREEN
try{ clearText() }catch(e){}
addText("TOXIC ZONE SURVIVAL",{x:2,y:2,color:color`3`})
addText("Move: WASD / IJKL",{x:3,y:4,color:color`4`})
addText("Press any key",{x:4,y:6,color:color`5`})
