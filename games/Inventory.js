// Made by Ekam
// Built on February 8, 2026 in Seattle, WA :)

// SPRITES
const wall = "w"
const box = "b"
const spot = "s"
const floor = "f"
const player = "p"
const play = "P"

// LEGEND (YOUR ART)
setLegend(
  [ wall, bitmap`
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
1111111111111111` ],
  [ box, bitmap`
0000000000000000
0CCCCCCCCCCCCCC0
0C99CCC99CC9C9C0
0C9C9C9CC9CC9CC0
0C99CC9CC9CC9CC0
0C9C9C9CC9CC9CC0
0C99CCC99CC9C9C0
0CCCCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
0C9CCCCCCC9999C0
0CC9CCCCCCCC99C0
0CCC9CCCCCC9C9C0
0CCCC999999CC9C0
0CCCCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
0000000000000000` ],
  [ spot, bitmap`
0000000000000000
0444444444444440
04D4D4D4D4DD4D40
04D4D4D4D4DD4D40
04D4D4D4D4D4DD40
04D4D4D4D4D4DD40
044D4D44D4D4DD40
0444444444444440
0444444444444440
04D4444444DDDD40
044D44444444DD40
0444D444444D4D40
04444DDDDDD44D40
0444444444444440
0444444444444440
0000000000000000` ],
  [ floor, bitmap`
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
  [ player, bitmap`
2220000000000222
2200666666660022
2006666666666002
0066666666666600
0660000000000660
0660000660000660
0660000660000660
0666666666666660
0666666666666660
0660666666660660
0666066666606660
0666600000066660
0066666666666600
2006666666666002
2200666666660022
2220000000000222` ],
  [ play, bitmap`
DDDDDDDDDDDDDDDD
D44444444444444D
D44444444444444D
D44444444444444D
D444DD444444444D
D444DDDD4444444D
D444DDDDDD44444D
D444DDDDDDDD444D
D444DDDDDDDD444D
D444DDDDDD44444D
D444DDDD4444444D
D444DD444444444D
D44444444444444D
D44444444444444D
D44444444444444D
DDDDDDDDDDDDDDDD` ]
)

setBackground(floor)

// COLLISION
setSolids([player, wall, box])
setPushables({
  [player]: [box]
})

// MENU MAP
const menu = map`
wwwwwwwwww
w........w
w..p.....w
w....P...w
w........w
w........w
w........w
wwwwwwwwww`

const levels = [
map`
wwwwwwwwww
wp...w...w
w.b..w.s.w
w....w...w
w....w...w
w........w
w........w
wwwwwwwwww`,

map`
wwwwwwwwww
wp...w...w
w.bb.w.s.w
w....w...w
w....w.s.w
w........w
w........w
wwwwwwwwww`,

map`
wwwwwwwwww
w..s.w...w
w.bb.w...w
w....w.p.w
w....w.s.w
w........w
w........w
wwwwwwwwww`,

map`
wwwwwwwwww
wp...w...w
w.bbbws..w
w....w...w
w....w.s.w
w........w
w........w
wwwwwwwwww`,

map`
wwwwwwwwww
wps..w...w
w.bb.w...w
w....w.s.w
w....w...w
w........w
w........w
wwwwwwwwww`,

map`
wwwwwwwwww
w..s.w...w
w.bb.w...w
w....w.p.w
w....w.s.w
w........w
w........w
wwwwwwwwww`,

map`
wwwwwwwwww
w..s.w.s.w
w.bb.w...w
w....w.p.w
w....w...w
w........w
w........w
wwwwwwwwww`,

map`
wwwwwwwwww
wp...w...w
w.bbbw...w
w....w.s.w
w....w.s.w
w........w
w........w
wwwwwwwwww`,

map`
wwwwwwwwww
w..s.w...w
w.bbbw.s.w
w....w.p.w
w....w...w
w........w
w........w
wwwwwwwwww`,

map`
wwwwwwwwww
wpsssw...w
w.bbbw...w
w....w...w
w....w...w
w........w
w........w
wwwwwwwwww`
]

// GAME STATE
let level = 0
let gameState = "menu"

setMap(menu)
clearText()
addText("INVENTORY", { x: 1, y: 1, color: color`3` })
addText("Walk to box to play", { x: 1, y: 2, color: color`3` })

// MOVEMENT
onInput("w", () => getFirst(player).y--)
onInput("s", () => getFirst(player).y++)
onInput("a", () => getFirst(player).x--)
onInput("d", () => getFirst(player).x++)

// RESTART LEVEL
onInput("i", () => {
  if (gameState !== "game") return
  setMap(levels[level])
  clearText()
  addText("Restarted", { x: 1, y: 1, color: color`3` })
})

// GAME LOGIC
afterInput(() => {
  // MENU LOGIC
  if (gameState === "menu") {
    const p = getFirst(player)
    const tile = getTile(p.x, p.y)
    if (tile.some(s => s.type === play)) {
      gameState = "game"
      level = 0
      setMap(levels[level])
      clearText()
      addText("Level 1", { x: 1, y: 1, color: color`3` })
    }
    return
  }

  // WIN CHECK
  const spots = tilesWith(spot)
  let filled = 0

  for (const tile of spots) {
    if (tile.some(s => s.type === box)) filled++
  }

  if (filled === spots.length) {
    level++
    if (level < levels.length) {
      setMap(levels[level])
      clearText()
      addText("Level " + (level + 1), { x: 1, y: 1, color: color`3` })
    } else {
      clearText()
      addText("You win!", { x: 1, y: 6, color: color`3` })
    }
  }
})