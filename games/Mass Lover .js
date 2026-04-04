 /*
  	>     @title:COINCOLLECTER+
	>     @author:Moriz1432
	>     @description:
	>     @tags: ['game', 'collector']
	>     @addedOn: 2025-12-05
	>     */

const player = "p"
const wall = "w"
const coin = "c"

setLegend(
  [player, bitmap`
................
................
................
......0000......
.....022220.....
....02222220....
....02222220....
....02222220....
....02222220....
....02222220....
.....022220.....
......0000......
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

  [coin, bitmap`
................
................
................
......3333......
.....344443.....
....34444443....
....34444443....
....34444443....
....34444443....
....34444443....
.....344443.....
......3333......
................
................
................
................`]
)

setSolids([wall])

// --- LEVELS ---
let level = 0

const levels = [
  // Level 1
  map`
wwwwwwwww
wp....c.w
w..ww...w
w..w....w
w..w.c..w
w....w..w
wc...w..w
wwwwwwwww`,

  // Level 2
  map`
wwwwwwwwwww
wp.......cw
w.w.www.w.w
w.w...w.w.w
w.w.c.w.w.w
w...w.....w
wc....c...w
wwwwwwwwwww`,

  // Level 3 (Hard mode)
  map`
wwwwwwwwwww
w.c...c...w
w.www.www.w
wp..c.....w
www.w.www.w
w...c..c..w
w.www.www.w
w....c....w
wwwwwwwwwww`
]

setMap(levels[level])

// --- MOVEMENT --- 
onInput("w", () => getFirst(player).y--)
onInput("s", () => getFirst(player).y++)
onInput("a", () => getFirst(player).x--)
onInput("d", () => getFirst(player).x++)

// --- GAME LOGIC ---
afterInput(() => {
  const p = getFirst(player)

  // Remove coins if player steps on them
  getTile(p.x, p.y)
    .filter(t => t.type === coin)
    .forEach(c => c.remove())

  // Next level if all coins are gone
  if (tilesWith(coin).length === 0) {
    clearText()
    addText("Level Complete!", { y: 1, color: color`4` })

    level++

    if (level < levels.length) {
      setTimeout(() => {
        clearText()
        setMap(levels[level])
      }, 500)
    } else {
      setTimeout(() => {
        clearText()
        addText("YOU WIN!", { y: 1, color: color`3` })
      }, 500)
    }
  }
})
