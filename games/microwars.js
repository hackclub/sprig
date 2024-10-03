/*
@title: microwars
@author: Bedo
@tags: ['multiplayer']
@addedOn: 2023-02-19
*/

const rasp = "r"
const raspProjectile = "R"
const ardu = "a"
const arduProjectile = "A"
const heart = "h"
const emptyHeart = "H"
const bg = "b"

let raspHealth = 3
let arduHealth = 3

let raspCooldown = 1
let arduCooldown = 1

let active = true

setLegend(
  [rasp, bitmap`
................
................
................
................
................
................
DFDFDFDFDFDFDFDF
1DD0D000DDDDDDDD
1DDDD000DDD33DDF
1DD2D000DDDDDDDD
DFDFDFDFDFDFDFDF
................
................
................
................
................`],
  [raspProjectile, bitmap`
.4444......44...
.44444.444444...
.444444444444...
..444444444.....
....44444.......
..0000000000....
.0330333303000..
.0300000000330..
.0000330030330..
.003033303000000
.033033303300330
.033000303303330
.003030000000330
..00033033330330
...0000033330000
......0000000...`],
  [ardu, bitmap`
................
................
................
................
................
................
7F7F7F7F7F7F7F7F
F70007777707777L
770007677707277L
F70007700777777L
7F7F7F7F7F7F7F7F
................
................
................
................
................`],
  [arduProjectile, bitmap`
................
................
................
77..............
777.............
77777..77.......
777777.777......
77777777777.....
727777777777....
7222777777777...
77722277777777..
.77772227777777.
...777777777777.
.....7777...7777
.......77.......
................`],
  [bg, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`],
  [heart, bitmap`
....20000002....
...2011111102...
...2011LL1102...
...2011111102...
...2900000092...
...2999099992...
...2990009992...
...2999099992...
...2099999902...
...2000000002...
...2000000002...
...2000000002...
...2009990002...
...2000000002...
...2000000002...
....22222222....`]
)

let field = map`
hhh....hhh
..........
..........
a........r
..........
..........
..........`

setBackground(bg)
setMap(field)

onInput("w", () => {
  getFirst(ardu).y -=1
})

onInput("s", () => {
  getFirst(ardu).y +=1
})

onInput("a", () => {
  if(!active) return
  if(arduCooldown<1)return
  const ino = getFirst(ardu)
  addSprite(ino.x+1, ino.y, arduProjectile)
  arduCooldown = 0
})

onInput("i", () => {
  getFirst(rasp).y -=1
})

onInput("k", () => {
  getFirst(rasp).y +=1
})

onInput("l", () => {
  if(!active) return
  if(raspCooldown<1)return
  const pi = getFirst(rasp)
  addSprite(pi.x-1, pi.y, raspProjectile)
  raspCooldown = 0
})

const spawnHearts = () => {
  for(const h of getAll(heart)) {
    h.remove()
  }
  for(let i = 0; i<arduHealth;i++) {
    addSprite(0+i, 0, heart)
  }
  for(let i = 0; i<raspHealth;i++) {
    addSprite(width()-3+i, 0, heart)
  }
}

setInterval(() => {
  arduCooldown+=0.08
  raspCooldown+=0.08
  spawnHearts()
  if(active) {
    for (const pi of getAll(raspProjectile)) {
    if(pi.x==0) {
      let x = pi.x
      let y = pi.y
      clearTile(pi.x, pi.y)
      if(!getFirst(ardu)) {
        arduHealth-=1
        addSprite(x, y,ardu)
      }
    } 
    pi.x-=1
  }

  for (const ino of getAll(arduProjectile)) {
    if(ino.x==width()-1) {
      let x = ino.x
      let y = ino.y
      clearTile(ino.x, ino.y)
      if(!getFirst(rasp)) {
        raspHealth-=1
        addSprite(x, y,rasp)
      }
    } 
    ino.x+=1
  }
  }
  

  if(raspHealth<=0) {
    active = false
    addText("ARDUINO WON!", { 
      x: 3,
      y: 3,
      color: color`7`
    })
  }else if(arduHealth<=0) {
    active = false
    addText("RASPBERRY WON!", { 
      x: 3,
      y: 3,
      color: color`3`
    })
  }
  
}, 100)