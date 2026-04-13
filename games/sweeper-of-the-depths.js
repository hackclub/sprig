/* @title: sweeper-of-the-depths
@description: A dungeon crawler where you navigate traps, slay slimes, and cleanse the aqueducts.
@author: K8BH
@tags: ['action', 'adventure', 'puzzle']
@addedOn: 2026-04-13
*/

const player = "p"
const wall = "w"
const blueTile = "b" 
const goal = "g"
const lava = "l"
const enemy = "e" 

setLegend(
  [ player, bitmap`
................
.......111......
.......151......
......11511.....
.......111......
......55555.....
.....5555555....
.....0555550....
.....0555550....
......55555.....
......1...1.....
......1...1.....
.....11...11....
................
................
................` ],
  [ wall, bitmap`
0000000000000000
0111111011111110
0111111011111110
0111111011111110
0000000000000000
0111101111110111
0111101111110111
0111101111110111
0000000000000000
0111111011111110
0111111011111110
0111111011111110
0000000000000000
0111101111110111
0111101111110111
0000000000000000` ],
  [ blueTile, bitmap`
1111111111111111
1551155555511551
1155511551155511
1551155555511551
1111111111111111
1555551155555111
1551155551155551
1555551155555111
1111111111111111
1155511551155511
1551155555511551
1155511551155511
1111111111111111
1555551155555111
1551155551155551
1111111111111111` ],
  [ goal, bitmap`
................
.......77.......
......7447......
.....744447.....
....74444447....
....74444447....
...7444444447...
...7444444447...
....74444447....
....74444447....
.....744447.....
......7447......
.......77.......
................
................
................` ],
  [ lava, bitmap`
................
................
................
.......3........
......333.......
.....33233......
....3322233.....
...332222233....
..33222222233...
...332222233....
....3322233.....
.....33233......
......333.......
.......3........
................
................` ],
  [ enemy, bitmap`
................
................
................
................
................
.......88.......
......8888......
.....888888.....
....88888888....
...8.888888.8...
...8088888808...
...8.888888.8...
...8888888888...
...888.88.888...
................
................` ]
)

setSolids([ wall, blueTile ])
setPushables({ [player]: [] })

let level = 0
let gameState = "START" 
let menuLock = false

const storyTexts = [
  ["CORRUPTED SLIMES", "INFEST AQUEDUCTS", "PRESS J TO SWEEP"],
  ["WATER FROZEN", "INTO BLOCKS", "PRESS J TO ADVANCE"],
  ["BEWARE THE LAVA", "ATTACK WITH J", "PRESS J"],
  ["A TIGHT SQUEEZE", "DONT GET TRAPPED", "PRESS J"],
  ["THE GAUNTLET", "REACH CRYSTAL", "PRESS J"]
]

const levels = [
  map`
wwwwwwwwwwwwwwww
wp.............w
wwwwwwwwwwwwww.w
w..............w
w.wwwwwwwww..e.w
w.w.......wwwwww
w.w.wwwww......w
w.w.w...wwwwww.w
w.e.w.g......w.w
wwwwwwwwwwww.w.w
w............w.w
w.wwwwwwwwwwww.w
w..............w
w..............w
wwwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwww
wp...bbbbb.....w
wwww.b...b.bb..w
w....b.g.b..b..w
w.bbbb.b.bb.b..w
w......b.e..b..w
bbbbbbbb.bbbb..w
w..............w
w.bbbbbb.bbbbbbw
w.b....b.b.....w
w.b.bb.b.b.bbb.w
w.b.eb.b...b...w
w.b..b.bbbbb.bbw
w.bbbb........ew
wwwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwww
wp....l........w
wwwww.l.wwwwww.w
w.....l......w.w
w.llllllllll.w.w
w...l......l.w.w
www.l.wwww.l.w.w
w.e.l.wgw..l.w.w
w.w.l.w.w..l.w.w
w.w.l......l.w.w
w.w.llllllll.w.w
w.w........l.e.w
w.wwwwwwww.wwwww
w..............w
wwwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwww
wp...l...b.....w
w.bb.l.b.l.bbb.w
w....l.b.l.e...w
w.llll.b.lllll.w
w..e...b.......w
w.bbbb.b.bbbbb.w
w.b....l.....b.w
w.b.llllllll.b.w
w.b........l.b.w
w.b.bbbbww.l.b.w
w.b.e....w.l.b.w
w.llllll.w...l.w
w........wwwwwgw
wwwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwww
wp.l.e...l...l.w
ww.l.l.b.l.b.l.w
ww.l.l.b.l.b.l.w
w..l.e.b.e.b.e.w
w.llllllllllll.w
w......e.......w
w.llllllllllll.w
w...l...l...l..w
ww.wl.b.l.w.l.ww
ww.wl.b.l.w.l.ww
ww.wl.b.l.w.l.ww
w..wl.b.l.w.l..w
w.e...........gw
wwwwwwwwwwwwwwww`
]

setMap(map`
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
................`)

addText("SWEEPER OF", { y: 3, color: color`9` })
addText("THE DEPTHS", { y: 5, color: color`9` })
addText("PRESS J", { y: 10, color: color`7` })
addText("TO BEGIN", { y: 12, color: color`7` })

function loadLevel(lvl) {
  level = lvl
  setMap(levels[level])
  gameState = "STORY"
  
  const lines = storyTexts[level]
  lines.forEach((line, index) => {
    addText(line, { y: 4 + (index * 3), color: color`9` }) 
  })
}

function lockMenu() {
  menuLock = true
  setTimeout(() => { menuLock = false }, 300)
}

onInput("w", () => { if (gameState === "PLAYING") getFirst(player).y -= 1 })
onInput("s", () => { if (gameState === "PLAYING") getFirst(player).y += 1 })
onInput("a", () => { if (gameState === "PLAYING") getFirst(player).x -= 1 })
onInput("d", () => { if (gameState === "PLAYING") getFirst(player).x += 1 })

onInput("j", () => {
  if (menuLock) return 

  if (gameState === "START") {
    clearText()
    loadLevel(0)
    lockMenu()
  } 
  else if (gameState === "STORY" || gameState === "DEAD") {
    clearText()
    gameState = "PLAYING"
    lockMenu()
  } 
  else if (gameState === "PLAYING") {
    const p = getFirst(player)
    if (!p) return
    
    let hitAnything = false
    const enemies = getAll(enemy)
    
    enemies.forEach(e => {
      const dx = Math.abs(p.x - e.x)
      const dy = Math.abs(p.y - e.y)
      
      if (dx + dy === 1) {
        e.remove()
        hitAnything = true
      }
    })
    
    if (hitAnything) {
      addText("BAM!", { y: 2, color: color`7` })
      setTimeout(() => {
        if (gameState === "PLAYING") clearText()
      }, 500)
    }
  }
})

afterInput(() => {
  if (gameState !== "PLAYING") return

  const p = getFirst(player)
  const g = getFirst(goal)
  if (!p) return
  
  const hitLava = getAll(lava).find(l => l.x === p.x && l.y === p.y)
  const hitEnemy = getAll(enemy).find(e => e.x === p.x && e.y === p.y)
  
  if (hitLava || hitEnemy) {
    gameState = "DEAD"
    setMap(levels[level])
    
    addText("YOU DIED!", { y: 4, color: color`3` })
    addText("PRESS J", { y: 8, color: color`9` })
    addText("TO RETRY", { y: 10, color: color`9` })
    
    lockMenu()
    return
  }

  if (g && p.x === g.x && p.y === g.y) {
    level++
    if (level < levels.length) {
      clearText()
      loadLevel(level)
      lockMenu()
    } else {
      gameState = "WIN"
      clearText()
      
      addText("DUNGEON", { y: 4, color: color`7` })
      addText("CLEARED!", { y: 6, color: color`7` })
      addText("AQUEDUCTS", { y: 10, color: color`9` })
      addText("SAVED!", { y: 12, color: color`9` })
    }
  }
})