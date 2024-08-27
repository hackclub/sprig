/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Maze Flag Collector Game
@author: Ravin
@tags: [maze, game]
@addedOn: 2024-00-00
*/

const player = "p"
const flag = "f"
const wall = "w"

let playersprite = bitmap`
................
................
.......000......
.......0.0......
......0..0......
......0...0.0...
....0003.30.0...
....0.0...000...
....0.05550.....
......0...0.....
.....0....0.....
.....0...0......
......000.......
......0.0.......
.....00.00......
................`

let flagsprite = bitmap`
...0000.........
...0440.........
...0440.........
...0000.........
...0440000000000
...0440444444440
...0440444444400
...044044444000.
...0440444400...
...044000000....
...0440.........
..004400........
..044440........
0000000000......
0444444440......
0000000000......`

let wallsprite = bitmap`
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
1111111111111111`

setLegend(
  [player, playersprite],
  [flag, flagsprite],
  [wall, wallsprite]
)

setSolids([player, wall])

let level = 0
const levels = [
  map`
wwwwwwwwww
wp.....f.w
ww.wwww.ww
w....w...w
w..wwwww.w
w.w.....ww
ww.wwwwww.
w........w
wwwwwwwwww`,
  map`
wwwwwwwwww
w.......fw
w.wwwwww.w
w.w....pw.
w.w.w.w.w.
w.w.w.w.w.
w.w.w.w.w.
w.......w.
wwwwwwwwww`,
  map`
wwwwwwwwww
w........f
w.wwwwww.w
w.w......w
w.w.wwww.w
w.w....pww
w.wwwwwwww
w........w
wwwwwwwwww`,
  map`
..........
wwwwwwwww.
w.......w.
w.wwwww.w.
w.w..pw.w.
w.w.www.w.
w.w.....w.
w.wwwwwww.
wf........`
]

function loadLevel(levelIndex) {
  setMap(levels[levelIndex])
}

loadLevel(level)

setPushables({
  [player]: []
})

onInput("w", () => {
  getFirst(player).y -= 1
})

onInput("a", () => {
  getFirst(player).x -= 1
})

onInput("s", () => {
  getFirst(player).y += 1
})

onInput("d", () => {
  getFirst(player).x += 1
})

afterInput(() => {
  const playerSprite = getFirst(player)
  const flagSprite = getFirst(flag)

  // Ensure the sprites exist before accessing their properties
  if (playerSprite && flagSprite) {
    // Check if player has collected the flag
    if (playerSprite.x === flagSprite.x && playerSprite.y === flagSprite.y) {
      console.log("You collected the flag! You win!")

      // Move to the next level
      level += 1
      if (level >= levels.length) {
        console.log("You have completed all levels!")
        level = 0 // Reset to the first level if needed
      }
      loadLevel(level)
    }
  } else {
    console.log("Player or flag sprite not found!")
  }
})
