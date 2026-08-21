/*
@title: Shadow Vault
@author: Jakc- king offsuit
*/

const P="p",W="w",E="e",K="k",D="d"

let hp=3,key=false,dir=[0,-1],tick=0,dead=false

setLegend(
[P,bitmap`
................
.....3333.......
....322223......
....322223......
.....3333.......
......55........
.....5775.......
.....7777.......
....770077......
....777777......
.....7..7.......
....77..77......
................
................
................
................`],

[W,bitmap`
LLLLLLLLLLLLLLLL
L11111111111111L
L1LLLLLLLLLLLL1L
L1L1111111111L1L
L1L1LLLLLL1L1L1L
L1L1L1111L1L1L1L
L1L1L1LL1L1L1L1L
L1L1L1111L1L1L1L
L1L1LLLLLL1L1L1L
L1L1111111111L1L
L1LLLLLLLLLLLL1L
L11111111111111L
LLLLLLLLLLLLLLLL
L11111111111111L
L11111111111111L
LLLLLLLLLLLLLLLL`],

[E,bitmap`
................
.....6666.......
....6FFFF6......
...6F6666F6.....
...6F6FF6F6.....
...6FFFFF6......
....6F66F6......
.....6..6.......
....6....6......
................
................
................
................
................
................
................`],

[K,bitmap`
.......3........
.......3........
......333.......
.....33433......
......333.......
.......3........
......5.5.......
.....55.55......
................
................
................
................
................
................
................
................`],

[D,bitmap`
................
....222222......
...2LLLLLL2.....
...2L2222L2.....
...2L2LL2L2.....
...2L2222L2.....
...2LLLLLL2.....
....222222......
................
................
................
................
................
................
................
................`]
)

setSolids([P,W])

const level=map`
wwwwwwwwwwwwwwww
wp....w.......dw
w.www.w.www.www.
w.w...w...w....w
w.w.www.w.w.ww.w
w...w...w.w....w
www.w.www.w.ww.w
w...w..k..w....w
w.www.www.www..w
w.....w.....w..w
w.www.w.www.w..w
w...w...w...w..w
w.w.www.w.www..w
w.e....w....e..w
w..............w
wwwwwwwwwwwwwwww`

function hud(){
  clearText()
  addText("HP:"+hp,{x:0,y:0,color:color`3`})
  if(key)addText("KEY",{x:11,y:0,color:color`2`})
}

function reset(){
  hp=3
  key=false
  dead=false
  tick=0
  setMap(level)
  hud()
}

function hero(){return getFirst(P)}

function moveEnemy(enemy){
  const p=hero()
  const dx=p.x-enemy.x
  const dy=p.y-enemy.y
  let sx=0,sy=0
  if(Math.abs(dx)>Math.abs(dy)) sx=Math.sign(dx)
  else sy=Math.sign(dy)

  if(sx && !getTile(enemy.x+sx,enemy.y).some(t=>t.type===W)) enemy.x+=sx
  else if(sy && !getTile(enemy.x,enemy.y+sy).some(t=>t.type===W)) enemy.y+=sy
}

function damage(){
  hp--
  playTune(tune`100:c4-100`)
  if(hp<=0){
    dead=true
    clearText()
    addText("YOU DIED",{x:3,y:6,color:color`3`})
    addText("J RESTART",{x:3,y:8,color:color`2`})
    return
  }
  hero().x=1
  hero().y=1
  hud()
}

function attack(){
  if(dead)return
  const p=hero()
  const tx=p.x+dir[0],ty=p.y+dir[1]
  getTile(tx,ty).forEach(o=>{
    if(o.type===E){
      o.remove()
      playTune(tune`80:g5^80`)
    }
  })
}

onInput("w",()=>{if(dead)return;dir=[0,-1];hero().y--})
onInput("s",()=>{if(dead)return;dir=[0,1];hero().y++})
onInput("a",()=>{if(dead)return;dir=[-1,0];hero().x--})
onInput("d",()=>{if(dead)return;dir=[1,0];hero().x++})
onInput("k",attack)
onInput("j",()=>{if(dead)reset()})

afterInput(()=>{
  if(dead)return

  const p=hero()
  tick++

  const tile=getTile(p.x,p.y)

  tile.forEach(o=>{
    if(o.type===K){
      key=true
      o.remove()
      playTune(tune`120:c5~120+e5~120`)
      hud()
    }
    if(o.type===D && key){
      clearText()
      addText("ESCAPED!",{x:3,y:6,color:color`4`})
      addText("YOU WIN",{x:4,y:8,color:color`2`})
      dead=true
    }
  })

  getAll(E).forEach(moveEnemy)

  if(getTile(p.x,p.y).some(t=>t.type===E)) damage()

  if(tick%18===0 && getAll(E).length<2){
    addSprite(14,14,E)
  }
})

reset()