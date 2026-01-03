/*
@title: Duality
@author: CheetahDoesStuff
@description: Simple puzzle game. Wait, you control 2 players, AT ONCE???
@tags: ["Puzzle"]
@addedOn: 2025-01-03

Controls (also shown ingame):
WASD - Move
J - Restart/reset level

Complete all 11 levels to win, but youre controlling 2 characters at the same time! Solve increasingly harder puzzles to eventually make it to the winscreen
You can restart after winning by completing the winscreen level like any other.
*/

const bluey = "b"
const redis = "r"

const wall = "w"
const block = "p"
const air = "a"

const bGoal = "g"
const rGoal = "h"

const sWin = tune`
107.14285714285714,
107.14285714285714: D4^107.14285714285714 + F4^107.14285714285714,
107.14285714285714: E4^107.14285714285714 + G4^107.14285714285714,
107.14285714285714: F4^107.14285714285714 + A4^107.14285714285714,
107.14285714285714: G4^107.14285714285714 + B4^107.14285714285714,
107.14285714285714: B4^107.14285714285714 + D5^107.14285714285714,
107.14285714285714,
107.14285714285714: F5^107.14285714285714,
107.14285714285714: A5^107.14285714285714,
2464.285714285714`
const sMove = tune`
83.33333333333333: E4^83.33333333333333,
2583.333333333333`

setLegend(
  [ bluey, bitmap`
................
................
................
......7.7.7.....
....77777777....
.....777777.....
....77777777....
.....777777.....
...7775775777...
...7.777777.7...
...7.777777.7...
.....777777.....
.....777777.....
.....7....7.....
.....7....7.....
.....7....7.....` ],
  [ redis, bitmap`
................
................
................
......3.3.3.....
....33333333....
.....333333.....
....33333333....
.....333333.....
...3339339333...
...3.333333.3...
...3.333333.3...
.....333333.....
.....333333.....
.....3....3.....
.....3....3.....
.....3....3.....`],
  
  [ wall, bitmap`
LLLLLLLLLLLLLLLL
L00000000000000L
L00000000000000L
L00000000000000L
L00000000000000L
L00000000000000L
L00000000000000L
L00000000000000L
L00000000000000L
L00000000000000L
L00000000000000L
L00000000000000L
L00000000000000L
L00000000000000L
L00000000000000L
LLLLLLLLLLLLLLLL`],
  [ block, bitmap`
9999999999999999
9CCCCCCCCCCCCCC9
9CCCCCCCCCCCCCC9
9CCCCCCCCCCCCCC9
9CCCCCCCCCCCCCC9
9CCCCCCCCCCCCCC9
9CCCCCCCCCCCCCC9
9CCCCCCCCCCCCCC9
9CCCCCCCCCCCCCC9
9CCCCCCCCCCCCCC9
9CCCCCCCCCCCCCC9
9CCCCCCCCCCCCCC9
9CCCCCCCCCCCCCC9
9CCCCCCCCCCCCCC9
9CCCCCCCCCCCCCC9
9999999999999999`],
  [ air, bitmap`
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

  [bGoal, bitmap`
7777777777777777
7575555555555557
7575777777777757
7575755555555757
7575757777775757
7575757555575757
7575757577575757
7575757557575757
7575757557575757
7575757777575757
7575755555575757
7575777777775757
7575555555555757
7577777777777757
7555555555555557
7777777777777777`],
  [rGoal, bitmap`
3333333333333333
3939999999999993
3939333333333393
3939399999999393
3939393333339393
3939393999939393
3939393933939393
3939393993939393
3939393993939393
3939393333939393
3939399999939393
3939333333339393
3939999999999393
3933333333333393
3999999999999993
3333333333333333`]
)

setSolids([wall, bluey, redis, block])

let level = 0
const levels = [
  map`
wwwwwwwwwww
wb...wr...w
w....w....w
w....w....w
w....w....w
w....w....w
w....w....w
w....w....w
w...gw...hw
wwwwwwwwwww`,
  map`
wwwwwwwwwww
wb...wr...w
w....w....w
w....w....w
wwppwwwppww
w....w....w
w....w....w
w....w....w
w...gw...hw
wwwwwwwwwww`,
  map`
wwwwwwwwwww
wwbwwwwwrww
ww.wwwww.ww
ww.wwwww.ww
ww.wwwww.ww
ww..www..ww
www.www.www
www.www.www
wwwgwwwhwww
wwwwwwwwwww`,
  map`
wwwwwwwwwww
wwb.wwwwrww
ww..wwww.ww
ww..wwww.ww
ww..wwww.ww
ww..wwwwhww
wwpwwgww.ww
ww....wwwww
ww.wwwwwwww
wwwwwwwwwww`,
  map`
wwwwwwwwwww
wwb.....rww
wwwww.wwwww
wwwww.wwwww
wwwww....ww
wwwww....ww
wwwww...gww
wwwwwhwwwww
wwwwwwwwwww
wwwwwwwwwww`,
  map`
wwwwwwwwwww
w..wwwwwwww
wp...b..rww
w.wwwwwwwww
w.hwwwwwwww
w.gwwwwwwww
w.wwwwwwwww
wwwwwwwwwww
wwwwwwwwwww
wwwwwwwwwww`,
  map`
wwwwwwwwwww
wh.......ww
w........ww
w..b.r.wwww
ww.....wgww
w......w.ww
w........ww
wwwwwwwwwww
wwwwwwwwwww
wwwwwwwwwww`,
  map`
wwwwwwwwwww
wb....r...w
w.........w
w.........w
w....w....w
w.........w
w.........w
w.........w
w..h...g..w
wwwwwwwwwww`,
  map`
wwwwwwwwwww
wwwwwwwwwww
wwwwwwwwwww
wwwwwwwwwww
wwwwwww.www
www.bpp.www
www..wgrhww
wwwwwwwwwww
wwwwwwwwwww
wwwwwwwwwww`,
  map`
wwwwwwwwwww
w.wwwwwwwww
w.wgwwwwwww
w.whwwwwwww
w.pppppp.ww
w....w....w
w..b.w..r.w
w....w....w
wwwwwwwwwww
wwwwwwwwwww`,
  map`
wwwwwwwwwww
wwwwwwwwwww
wwwwwhw...w
wwww.pppw.w
wwww.ww.w.w
wwwb.wwww.w
www.ww..r.w
wg...p...ww
www.wwwwwww
wwwwwwwwwww`,
  map`
wwwwwwwwwww
wpppppppppw
wpwwwwwwwpw
wpw.....wpw
wpw.b.r.wpw
wpw.....wpw
wpw.g.h.wpw
wpwwwwwwwpw
wpppppppppw
wwwwwwwwwww`
]

setMap(levels[level])

setPushables({
  [ bluey ]: [block],
  [ redis ]: [block],
  [ block ]: [bluey, redis, block]
})

onInput("w", () => {
  getFirst(bluey).y -= 1
  getFirst(redis).y -= 1
  playTune(sMove)
})

onInput("a", () => {
  getFirst(bluey).x -= 1
  getFirst(redis).x -= 1
  playTune(sMove)
})

onInput("s", () => {
  getFirst(bluey).y += 1
  getFirst(redis).y += 1
  playTune(sMove)
})

onInput("d", () => {
  getFirst(bluey).x += 1
  getFirst(redis).x += 1
  playTune(sMove)
})

onInput("j", () => {
  setMap(levels[level])
})

function printPermanents() {
  addText("dua", {
    x: 13,
    y: 0,
    color: color`7`
  })
  addText("lity", {
    x: 16,
    y: 0,
    color: color`3`
  })
  
  addText("Move: WASD", {
    x: 5,
    y: 14,
    color: color`1`
  })
  addText("Reset lvl: J", {
    x: 4,
    y: 15,
    color: color`1`
  })
}

function printLevelNum() {
  if (level < levels.length - 1) {
    addText(`${level + 1}/${levels.length - 1}`, {
      x: 0,
      y: 0,
      color: color`1`
    }) 
  }
  else {
    addText(`Win!`, {
      x: 0,
      y: 0,
      color: color`6`
    }) 
  }
}

function inGoal(player, goal) {
  for (const sprite of getTile(player.x, player.y)) {
    if (sprite.type == goal.type) {return true}
  }
  return false
}

printPermanents()
printLevelNum()

afterInput(() => {
  b = getFirst(bluey); r = getFirst(redis); bg = getFirst(bGoal); rg = getFirst(rGoal)
  next = inGoal(b, bg) && inGoal(r, rg)


  if (next && level < levels.length - 1) {level++; playTune(sWin); setMap(levels[level]); clearText(); printPermanents(); printLevelNum()}
  else if (next) {level = 0; playTune(sWin); setMap(levels[level]); clearText(); printPermanents(); printLevelNum()}
})