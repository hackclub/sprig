/*
@title: Slimer
@author: DevCmb
@tags: []
@addedOn: 2024-07-04
Slimer
*/

const player = "p"
const goal = "g"
const winnertext = "w"
const wall = "a"

const bkey = "b"
const rkey = "r"
const gkey = "k"

const bkeyDoor = "d"
const rkeyDoor = "s"
const gkeyDoor = "q"

const crate = "c"
const crateButton = "j"
const crateWall = "v"

const doubleStepPowerup = "n"
const depower = "z"

const obstacles = [wall, bkeyDoor, rkeyDoor, gkeyDoor, crateWall]

setLegend(
  [ player, bitmap`
....77777777....
...7........7...
..7..........7..
..7..........7..
..7........0.7..
..7..........7..
.77..........77.
.7............7.
.7............7.
.7...........07.
.7..........007.
.7.0.......00.7.
77........00..77
7......0000....7
7..............7
7777777777777777`],
  [ goal,  bitmap`
....66666666....
...6666666666...
..666444444666..
.66444444444466.
6664444444444666
6644444444444466
6644444444444466
6644444444444466
6644444444444466
6644444444444466
6644444444444466
6664444444444666
.66444444444466.
..666444444666..
...6666666666...
....66666666....`], 
  [ wall, bitmap`
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF`],
  [ bkey, bitmap`
................
................
................
................
................
..........777...
.........7...7..
..77777777...7..
..7...7..7...7..
..7...7...777...
................
................
................
................
................
................`],
  [ rkey, bitmap`
................
................
................
................
................
..........333...
.........3...3..
..33333333...3..
..3...3..3...3..
..3...3...333...
................
................
................
................
................
................`],
  [ gkey, bitmap`
................
................
................
................
................
..........444...
.........4...4..
..44444444...4..
..4...4..4...4..
..4...4...444...
................
................
................
................
................
................`],
  [ bkeyDoor, bitmap`
...7777777777...
...7777777777...
...7777777777...
...7777777777...
...7777777777...
...7777777777...
...7777777777...
...7777777777...
...7777777777...
...7777777777...
...7777777777...
...7777777777...
...7777777777...
...7777777777...
...7777777777...
...7777777777...`],
  [ rkeyDoor, bitmap`
...3333333333...
...3333333333...
...3333333333...
...3333333333...
...3333333333...
...3333333333...
...3333333333...
...3333333333...
...3333333333...
...3333333333...
...3333333333...
...3333333333...
...3333333333...
...3333333333...
...3333333333...
...3333333333...`],
  [ gkeyDoor, bitmap`
...4444444444...
...4444444444...
...4444444444...
...4444444444...
...4444444444...
...4444444444...
...4444444444...
...4444444444...
...4444444444...
...4444444444...
...4444444444...
...4444444444...
...4444444444...
...4444444444...
...4444444444...
...4444444444...`],
  [ crate, bitmap`
9999999999999999
9966666666666699
9696666666666969
9669666666669669
9666966666696669
9666696666966669
9666669669666669
9666666996666669
9666666996666669
9666669669666669
9666696666966669
9666966666696669
9669666666669669
9696666666666969
9966666666666699
9999999999999999`],
  [ crateButton, bitmap`
....99999999....
...9666666669...
..966999999669..
.96999999999969.
9669999999999669
9699999999999969
9699999999999969
9699999999999969
9699999999999969
9699999999999969
9699999999999969
9669999999999669
.96999999999969.
..966999999669..
...9666666669...
....99999999....`],
  [ crateWall, bitmap`
...9999999999...
...9999999999...
...9999999999...
...9999999999...
...9999999999...
...9999999999...
...9999999999...
...9999999999...
...9999999999...
...9999999999...
...9999999999...
...9999999999...
...9999999999...
...9999999999...
...9999999999...
...9999999999...`],
  [ doubleStepPowerup, bitmap`
................
................
................
........6.......
........6.......
.......66.......
.......66.......
......6666......
..66666666666...
...6666666666...
....6666666.....
....666666......
...66666666.....
..666...666.....
..........6.....
................`],
  [ depower, bitmap`
....33333333....
...3333333333...
..233333333332..
.33233333333233.
3333233333323333
3333323333233333
3333332332333333
3333333223333333
3333333223333333
3333332332333333
3333323333233333
3333233333323333
.33233333333233.
..233333333332..
...3333333333...
....33333333....`]
)


setSolids([...obstacles])

let level = 0
const levels = [
    map`
  .....
  .....
  p...g
  .....`,
    map`
...g.
.....
p....
.....`,
    map`
......
...a..
...a..
...a..
p..a.g`,
    map`
  .....ag.
  aaa..aa.
  ....aa..
  .a.aa...
  pa......`,
    map`
  .b..d...
  ....d...
  ....d...
  ....d...
  ....d...
  p...d..g`,
    map`
  rd...q.s.
  .d...q.s.
  .d..kq.s.
  .d...q.s.
  .d...q.s.
  .d...q.s.
  .d.p.qbsg`,
    map`
  .....vg.
  .j...v..
  .....v..
  ...c.v..
  p....v..`,
    map`
  gv..d..r.s...
  .v..d....s...
  .v..d....s...
  .v..d....s...
  .v..d....s...
  .vj.d.c..s...
  .v..d....s...
  .v..d.p..s..b`,
    map`
.dr.v........vsk
.a..v......j.vs.
.a..v........vs.
.a..v........vs.
.a..v........vs.
.a..v.....c..vs.
.a..v........vs.
.a..v........vs.
.aaaa........vs.
gab.q..p.....vs.`,
    map`
gd..q..k.v..r.
.d..q....v.aaa
.d.cq....v.s..
.d..q....v.s..
.d..qj...v.s..
.d..q....v.s..
.d..q....v.s..
.d..q....v.s..
.d..q....v.s..
.d..q..p.v.s.b`,
    map`
..dba...
..dja...
..d.a...
g.d.c..p
..d.....
..d.....`,
    map`
gdqc...kc.
.dqc....c.
.dqc....c.
.dqccccccb
.dqc....c.
.dqc.p..c.`,
    map`
..abjd..vn
..a..d..v.
..a..d..v.
..a..dc.v.
g.ap.d..v.`,
    map`
gd.......v....
.d.......v....
.d.......v.n..
.d.......v....
.dp..c...v....
.d..aaa..v....
.d..aba.jv....
.d..aaa..v....
.d.......v....
.d.......v....`,
  map`
gaq.......v..dn
.aq.......v.zd.
.aq...c...v..d.
.aq.......v..d.
.aq.....j.v..d.
.aq.......v.bd.
.aq.......v..d.
.aq.......v..d.
.aq.......v..d.
.aq....p..v..dk`,
  map`
g..ad.anq....
aaaad.a.q...b
....d.a.q.aaa
....d.a.q....
....d.a.q....
....d.a.q....
....dka.q....
.p..d.a.q..p.`,
  map`
...asb...dn
.c.as....d.
...as....d.
jp.as....d.
aaaas...pd.
.aavs.aaaaa
gaavs.a....`,
  map`
pa..v.ar.ap
.a..v.a..a.
.s..v.a....
.s..v.a.caj
.s..v.a....
.a..v.a..a.
pa..vga..ap`
  ]

const win = map`
.....
..p..
.....
.....`

const d = Date.now()
setMap(levels[level])

setPushables({
  [ player ]: [ crate ]
})

onInput("w", () => movePlayer(0, -1))
onInput("s", () => movePlayer(0, 1))
onInput("a", () => movePlayer(-1, 0))
onInput("d", () => movePlayer(1, 0))
var activePowerup = "None"
afterInput(() =>{
  if(!getFirst(player) || !getFirst(goal)) return;
  if(getFirst(player).x === getFirst(goal).x && getFirst(player).y == getFirst(goal).y){
    level++
    activePowerup = "None"
    if (level < levels.length) {
      setMap(levels[level])
    } else {
      setMap(win)
    }
  }
})

function movePlayer(dx, dy) {
  if(activePowerup == "DoubleMove"){ 

    dx = dx * 2
    dy = dy * 2
  }

  getAll(player).forEach((playerSprite) => {
    var targetX = playerSprite.x + dx
    var targetY = playerSprite.y + dy
    
    if (!isObstacle(targetX, targetY)) {
        const targetTileSprites = getTile(targetX, targetY)

        const crateIndex = targetTileSprites.findIndex(sprite => sprite.type === crate)
        
        if (crateIndex !== -1) {
          const nextTileSprites = getTile(targetX + dx, targetY + dy)
          const nextCrateIndex = nextTileSprites.findIndex(sprite => sprite.type === crate)
          
          if (nextCrateIndex === -1 && !isObstacle(targetX + dx, targetY + dy)) {
            targetTileSprites[crateIndex].x += dx
            targetTileSprites[crateIndex].y += dy
            playerSprite.x = targetX
            playerSprite.y = targetY

            const button = getTile(targetTileSprites[crateIndex].x, targetTileSprites[crateIndex].y)
            if(button.some(sprite => sprite.type == crateButton)){
                //targetTileSprites[crateIndex].remove()
                getAll(crateWall).forEach(wall => {
                  wall.remove()
                })
            }
          }
        } else {
          if(!isObstacle(targetX, targetY)) {
            if(getTile(targetX, targetY).find(sprite => sprite.type === "n")){
              activePowerup = "DoubleMove"
              console.log("set powerup")
              getTile(targetX, targetY).find(sprite => sprite.type === "n").remove()
            } else if (getTile(targetX, targetY).find(sprite => sprite.type === depower)){
              getTile(targetX, targetY).find(sprite => sprite.type === depower).remove()
              activePowerup = "None"
            }

            if(targetX < 0) targetX = 0
            if(targetX > width()) targetX = width()

            if(targetY > height()) targetY = height()
            if(targetY < 0) targetY = 0

            playerSprite.x = targetX
            playerSprite.y = targetY
          }
        }

      const blueKey = getTile(targetX, targetY).find(sprite => sprite.type === bkey)
      const redKey = getTile(targetX, targetY).find(sprite => sprite.type === rkey)
      const greenKey = getTile(targetX, targetY).find(sprite => sprite.type == gkey)

      if (blueKey) {
        blueKey.remove()

        getAll(bkeyDoor).forEach(door => {
          door.remove()
        })
      }

      if (redKey) {
        redKey.remove()

        getAll(rkeyDoor).forEach(door => {
          door.remove()
        })
      }

      if (greenKey){
        greenKey.remove()

        getAll(gkeyDoor).forEach(door => {
          door.remove()
        })
      }
    }
  })
  
}
  

function isObstacle(x, y) {
  return getTile(x, y).some(sprite => obstacles.includes(sprite.type))
}
