/*
@title: Sprig-wall
@description: getting the apple and avoiding the weird looking monsters. 
@author: elite_punith
@tags: ['puzzle', 'maze', 'hard']
@addedOn: 2026-04-16
*/

const p = "p"
const w = "w"
const bg = "b"
const house = "h"
const apple = "a"
const evil = "m" 
const key = "k"
const door = "d"

const my_tune = tune`
153.84615384615384: E4^153.84615384615384,
153.84615384615384: C4~153.84615384615384 + E4^153.84615384615384,
153.84615384615384: C4~153.84615384615384 + E4^153.84615384615384,
153.84615384615384: C4~153.84615384615384 + E4^153.84615384615384,
153.84615384615384,
153.84615384615384: F4~153.84615384615384 + C4-153.84615384615384 + D4~153.84615384615384,
153.84615384615384: D4~153.84615384615384 + F4^153.84615384615384,
153.84615384615384: F4~153.84615384615384,
153.84615384615384: F4-153.84615384615384 + D4~153.84615384615384,
153.84615384615384,
153.84615384615384: E4/153.84615384615384 + D4~153.84615384615384,
153.84615384615384: D4^153.84615384615384,
153.84615384615384: E4/153.84615384615384 + D4~153.84615384615384,
153.84615384615384: E4/153.84615384615384 + D4~153.84615384615384,
153.84615384615384: D4~153.84615384615384,
153.84615384615384: D4^153.84615384615384,
153.84615384615384: D4~153.84615384615384,
153.84615384615384: D4^153.84615384615384,
153.84615384615384: D4^153.84615384615384,
153.84615384615384: C4~153.84615384615384,
153.84615384615384: D4^153.84615384615384 + C4~153.84615384615384,
153.84615384615384,
153.84615384615384: D4~153.84615384615384 + C4~153.84615384615384,
153.84615384615384: E4/153.84615384615384 + D4~153.84615384615384,
153.84615384615384,
153.84615384615384: C4-153.84615384615384 + E4/153.84615384615384,
153.84615384615384: C4-153.84615384615384,
153.84615384615384: C4~153.84615384615384 + E4~153.84615384615384,
153.84615384615384: E4/153.84615384615384,
153.84615384615384: D4~153.84615384615384 + C4~153.84615384615384,
153.84615384615384: E4/153.84615384615384 + C4-153.84615384615384,
153.84615384615384: D4~153.84615384615384`

playTune(my_tune, Infinity)

setLegend(
  [ p, bitmap`
2222000000022222
22220.....022222
22220.7.7.022222
22220.....022222
2222000000022222
2222220002222222
2222222022222222
2222222022222222
2220000000002222
2227222022272222
222222202CCFCC22
222222202CCCCC22
2222222022222222
2222000000022222
2222722222722222
2222222222222222` ],
  [ apple, bitmap`
2222222222222222
2222222242222222
2222222D42222222
2222222242222222
2222223333222222
2222232222322222
2222322222232222
2223222222223222
2232222222222322
2223222222223222
2222322222232222
2222232222322222
2222223223222222
2222222332222222
2222222222222222
2222222222222222` ],
  [ house, bitmap`
0000000000000000
0CCCCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
0C000CCCCC000CC0
0C020CCCCC020CC0
0C000CCCCC000CC0
0CCCCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
0CCCC00000CCCCC0
0CCCC02220CCCCC0
0CCCC02220CCCCC0
0CCCC02220CCCCC0
0000002220000000`],
  [ bg, bitmap`
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
2222222222222222` ],
  [ w, bitmap`
2222222LL2222222
2222222L02222222
2222222LL2222222
2222222L02222222
2222222LL2222222
2222222L02222222
2222222LL2222222
2222222L02222222
2222222LL2222222
2222222L02222222
2222222LL2222222
2222222L02222222
2222222LL2222222
2222222L02222222
2222222LL2222222
2222222L02222222` ] ,
  [ evil, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000070000700000
0000070000700000
0000000000000000
0007777777770000
0007000000070000
0007077770070000
0007000000070000
0007777777770000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`],
  [ door, bitmap`
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444F44444444
444444FFF4444444
444444FFF4444444
4444444F44444444
4444444F44444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444` ],
  [ key, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000066600000000
0000660660000000
0000660660000000
0000066600000000
0000006000000000
0000006600000000
0000006000000000
0000006600000000
0000006000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000` ]
)

setSolids([p, apple, w, door, evil])

let cur_lvl = 0
let game_over = false

const maps = [
  // Level 1: Intro to movement
  map`
p...w..........w
.wwa....w..waw..
....w.w..w....w.
.ww.w.w..w.w....
..w.w..aww.w.w.w
......w.........
.w......w.w.w..h`,
  // Level 2: Intro to Keys
  map`
p..............k
wwwwwwwwwwwwww.w
w.a..........h.w
w.wwwwwwwwwwww.w
w..............w
wwwwwwwwwwwwww.w
.......d........`,
  // Level 3: Monsters and multiple doors
  map`
p..............k
wwwwwwwwwwwwww.w
h.........a....w
wwwwwwmwwwwwww.w
h.........a....d
wwwwwwwwwwwwww.w
...............w`,
  // Level 4: The Central Chamber
  map`
p.w............k
..w.wwwwwwwwww.w
a...m........d.w
h.....a......w.w
h...m........w.w
..wwwwwwwwwwww.w
...............w`,
  // Level 5: The Twin Halls
  map`
wwwwwwwwwwwwwwww
w..............k
wh..wwwwwdwwwwww
w..a.....a.....w
wh..wwmwwwmwww.w
w..p...........w
wwwwwwwwwwwwwwww`,
  // Level 6: The Long Push
  map`
w..wwwwwwwwww.kw
w.a........d..hw
w..wwmwwwwww..ww
w..a..........hw
w..wwwmwwwww..ww
wp............ww
wwwwwwwwwwwwwwww`,
  // Level 7: The Box (Fixed Pathing)
  map`
w.k............w
w.w.w.w.w.w.wm.w
w.d............w
w.w.a...a......w
w.w...h...h..w.w
w.w..........w.w
w..pwwwwwwwwww.w`,
  // Level 8: The Cross
  map`
p..............k
..wwwwwwwwwmww.w
..a..........d.h
..wwwwwwwwwwww.w
..a..........d.h
..wwmwwwwwwwww.w
...............w`,
  // Level 9: The Squeeze
  map`
p..............k
wwwwwwwwwwwww..w
h.....d...a....w
wwwwwwmwwwwww..w
h.....d...a....w
wwwwwwwwwwwww..w
...............w`,
  // Level 10: The Grand Finale
  map`
p..............k
wwwwwwwwwwwww..w
h.....d.a......w
w..wwwwwwwwwmwww
w......a.d.....h
w..wwwwwwwwwwwww
w..............w`
]

function load_map() {
  game_over = false
  setMap(maps[cur_lvl])
  clearText()
  addText("Level " + (cur_lvl + 1) + " of 10", { y: 1, color: color`3` })
  addText("WASD: Move  J: Reset", { y: 14, color: color`2` })
}

setBackground(bg)
load_map()

setPushables({
  [p]: [apple],
  [apple]: [apple] 
})

function shift_guy(x_dir, y_dir) {
  if (game_over) return
  let guy = getFirst(p)
  if (!guy) return
  
  let nextX = guy.x + x_dir
  let nextY = guy.y + y_dir
  
  let stuff_there = getTile(nextX, nextY)
  if (stuff_there.some(tile => tile.type === evil)) {
     clearText()
     addText("YOU LOST!", { x: 4, y: 4, color: color`3` })
     addText("Press J to retry", { x: 3, y: 6, color: color`2` })
     game_over = true
     return
  }
  
  guy.x += x_dir
  guy.y += y_dir
}

onInput("s", () => shift_guy(0, 1))
onInput("w", () => shift_guy(0, -1))
onInput("a", () => shift_guy(-1, 0))
onInput("d", () => shift_guy(1, 0))
onInput("j", () => {
  if (game_over && cur_lvl === maps.length) {
    cur_lvl = 0 
  }
  load_map()
}) 

afterInput(() => {
  if (game_over) return
  let guy = getFirst(p)
  if (!guy) return

  getAll(key).forEach(k => {
    if (guy.x === k.x && guy.y === k.y) {
      k.remove()
      getAll(door).forEach(d => d.remove())
    }
  })

  let houses = getAll(house)
  let filled_houses = tilesWith(apple, house).length
  
  if (houses.length > 0 && filled_houses >= houses.length) { 
    if (cur_lvl < maps.length - 1) {
      cur_lvl += 1
      load_map()
    } else {
      cur_lvl += 1 
      clearText()
      addText("YOU WON!!!", { x: 4, y: 4, color: color`3` })
      addText("Press J to restart", { x: 2, y: 6, color: color`2` })
      game_over = true
    }
  }
})
