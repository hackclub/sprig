/*
@title: Simple Flappy Bird Easy
@description: Tap 'W' to flap upwards and float past the pipe gaps to reach the flag 'f'. 
@author: Your Name
@tags: ['arcade', 'simple', 'side-scroller']
@addedOn: 2026-07-19
*/

// 1. Declare Core Engine Sprite Identifiers
const player = "p"
const wall = "w"
const finish = "f"

// 2. Set Up Color Bitmaps (0-9 Digits Only)
setLegend(
  [ player, bitmap`
................
....00000000....
...0222222220...
..021122221120..
..022222222220..
..000033330000..
..022233332220..
..022222222220..
..022222222220..
..000033330000..
..022233332220..
..022222222220..
...0222222220...
....00000000....
................
................` ],
  [ wall, bitmap`
5555555555555555
5777777777777755
5755555555555755
5757777777775755
5757555555575755
5757577777575755
5757575557575755
5757575757575755
5757575757575755
5757575557575755
5757577777575755
5757555555575755
5757777777775755
5755555555555755
5777777777777755
5555555555555555` ],
  [ finish, bitmap`
00..00..00..00..
..00..00..00..00
00..00..00..00..
..00..00..00..00
00..00..00..00..
..00..00..00..00
00..00..00..00..
..00..00..00..00
00..00..00..00..
..00..00..00..00
00..00..00..00..
..00..00..00..00
00..00..00..00..
..00..00..00..00
00..00..00..00..
..00..00..00..00` ]
)

// 3. Define Collision Systems
setSolids([ player, wall ])

// 4. Exactly Four 8x8 Side-Scrolling Flappy Grids (Level 4 Made Easy!)
let level = 0
const levels = [
  // LEVEL 1: Wide straight gap
  map`
wwwwwwww
wp.....w
w.w.w..w
w......w
w......w
w.w.w.fw
wwwwwwww
wwwwwwww
`,
  // LEVEL 2: Low-mid gap jump
  map`
wwwwwwww
wpw....w
w.w.w..w
w...w..w
w.w...fw
w.w.wwww
wwwwwwww
wwwwwwww
`,
  // LEVEL 3: Up-and-down wave pattern
  map`
wwwwwwww
wp..w..w
w.w.w..w
w.w...fw
w...wwww
w.w.wwww
wwwwwwww
wwwwwwww
`,
  // LEVEL 4: MODIFIED EASY VERSION (Wide middle path)
  map`
wwwwwwww
wp.....w
w......w
w......w
w......w
w.....fw
wwwwwwww
wwwwwwww
`
]

// 5. Run Initial Map Engine State
setMap(levels[level])

// 6. Flap Inputs (W flaps up, S drops down quickly, D scrolls right)
onInput("w", () => { getFirst(player).y -= 1 })
onInput("s", () => { getFirst(player).y += 1 })
onInput("d", () => { getFirst(player).x += 1 })

// 7. Auto-Gravity Simulation & Win Evaluation Loop
afterInput(() => {
  const p = getFirst(player)
  const f = getFirst(finish)

  if (!p) return

  // Gravity System: Pulls the bird down 1 block automatically every turn
  p.y += 1

  // Boundary Safe Check: Respawn if you hit the ceiling or floor boundaries
  if (p.y >= 6 || p.y <= 0) {
    p.x = 1
    p.y = 1
    clearText()
    addText("Crash! Try Again!")
    return
  }

  // Goal Trigger Check: Successfully pass through the course to touch the flag
  if (f && p.x === f.x && p.y === f.y) {
    level += 1
    
    if (level < levels.length) {
      clearText()
      setMap(levels[level])
      addText("Level Passed!")
    } else {
      clearText()
      
      // FIXED TEXT INTERACTION: Split phrase onto two lines to keep it perfectly visible inside the boundaries
      addText("ULTIMATE FLAPPY", { x: 1, y: 1, color: color`3` })
      addText("CHAMPION!", { x: 1, y: 2, color: color`3` })
    }
  }
})
