/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Maze Ball
@author: 
@tags: []
@addedOn: 2024-00-00
*/

const player = "p"
const wall = "w"
const goal = "g"
setLegend(
  [ player, bitmap`
................
................
.....555555.....
...5555555555...
...5555555555...
..555555555555..
..555555555555..
..555555555555..
..555555555555..
..555555555555..
..555555555555..
...5555555555...
...5555555555...
.....555555.....
................
................` ],
  [ wall, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL` ],
  [ goal, bitmap`
................
................
.....DDDDDD.....
...DDDDDDDDDD...
...DD......DD...
..DD........DD..
..DD........DD..
..DD........DD..
..DD........DD..
..DD........DD..
..DD........DD..
...DD......DD...
...DDDDDDDDDD...
.....DDDDDD.....
................
................` ],
)
// Make sure each sprite definition is enclosed in square brackets within the setLegend function call.
setSolids([wall, player])

// Add this code inside the afterInput block to check for reaching the goal
afterInput(() => {
  const playerSprite = getFirst(player)
  const goalTile = getTile(playerSprite.x, playerSprite.y).find(sprite => sprite.type === goal)

// Add this code inside the afterInput block to check for reaching the goal
afterInput(() => {
  const playerSprite = getFirst(player)
  const goalTile = getTile(playerSprite.x, playerSprite.y).find(sprite => sprite.type === goal)

  if (goalTile) {
    level++
    clearTile(playerSprite.x, playerSprite.y)
    if (levels[level]) {
      setMap(levels[level])
    } else {
      console.log("You have completed all levels!")
    }
  }
})
let level = 0
const levels = [
  map`
wwwwwwwwwww
w.........w
w.wwwww.w.w
w.w...w.www
w.w.www...w
w...wp..w.w
www.wwwwwww
w......w.gw
w.www.ww.ww
w...w.....w
wwwwwwwwwww`,
  map`
wwwwwwwwwww
w...w.....w
w.w.wwwww.w
w.w.......w
w.wwwwwww.w
w.wpwg..w.w
w.w.www.w.w
w.w.w...w.w
w.w.w.www.w
w...w.....w
wwwwwwwwwww`,
  map`
wwwwwwwwwww
w........pw
w.wwwwwwwww
w.w...w.w.w
w.www.w.w.w
w...w.w...w
w.w.w.w.www
w.w.......w
www.wwwww.w
w.....wg..w
wwwwwwwwwww`,
  map`
wwwwwwwwwww
wp......w.w
wwwww.www.w
w.........w
w.www.....w
w.w.......w
wwwww.....w
w.........w
wwwwww....w
w........gw
wwwwwwwwwww`
]

setMap(levels[level])

setPushables({
  [ player ]: []
})

onInput("s", () => {
  getFirst(player).y += 1
})
onInput("w", () => {
  getFirst(player).y -= 1
})
onInput("d", () => {
  getFirst(player).x += 1
})
onInput("a", () => {
  getFirst(player).x -= 1
})