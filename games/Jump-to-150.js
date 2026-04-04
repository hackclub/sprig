/*
@title: Jump Counter (with Risk)
@description: Jump as much as you can! Reach 150... but 25% chance to lose everything on each jump.
@author: 
@tags: [jump, challenge]
*/

// Only player sprite
const player = "p"

setLegend(
  [ player, bitmap`
................
.......000......
.......0.0......
......0..0......
......0...0.....
....0003330.....
....0.033330....
....0.05550.....
......0...0.....
.....0....0.....
.....0...0......
......000.......
......0.0.......
.....00.00......
................` ]
)

setSolids([])
setPushables({})

// Simple map (player on bottom)
setMap(map`
..........
..........
..........
..........
..........
..........
..........
..........
..........
p.........
`)

// Jump counter
let jumps = 0

// Jump on w (only if on ground)
onInput("w", () => {
  const pl = getFirst(player)
  if (!pl || pl.y !== 9) return
  
  // 25% chance to clear everything
  if (Math.random() < 0.05) {
    jumps = 0
    addText("CLEARED!", {x:4, y:5, color: color`H`})  // red-ishw
    setTimeout(() => {}, 800) // tiny delay so you see the message
  } else {
    jumps++
    pl.y -= 3
  }

  // Check win condition
  if (jumps >= 150) {
    clearText()
    addText("YOU WIN!", {x:4, y:4, color: color`D`})  // green-ish
    addText("150 JUMPS!", {x:3, y:6, color: color`D`})
    addText("w to play again", {x:8, y:8, color: color`5`})
    jumps = 150  // lock it
  }
})

// Gravity loop
setInterval(() => {
  const pl = getFirst(player)
  if (!pl) return

  // Fall down
  if (pl.y < 9) {
    pl.y += 1
  }

  // Live display (only update if not won yet)
  if (jumps < 150) {
    clearText()
    addText("Jumps: " + jumps, {x:2, y:1, color: color`3`})
    addText("w = jump", {x:2, y:3, color: color`5`})
    addText("Goal: 150", {x:2, y:4, color: color`5`})
  }

}, 150)

// Restart by jumping again after win/clear
onInput("w", () => {
  if (jumps >= 150 || jumps === 0) {
    jumps = 0
    const pl = getFirst(player)
    if (pl) pl.y = 9
  }
})