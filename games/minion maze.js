/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: minion maze
@author: 
@tags: []
@addedOn: 2024-00-00
*/

const player = "p"
const wall = "w"
const exit = "e"

setLegend(
  [ player, bitmap`
................
................
................
....0006000.....
....02402C0.....
....0006000.....
.....66366......
...067666760....
.....67776......
.....77777......
......7.7.......
.....00.00......
................
................
................
................` ],
  [ wall, bitmap`
..H.H.HHH.H.H...
...H.H.H.H.H....
..H.HHHHHHHH....
..00000H00000...
..0C2220C2220...
..02222022220...
...0000H0000....
...LHH2H2HHL.00.
...HLHHHHHLH.00.
..HHLLLLLLLHHH..
.H..LLLLLLL.....
.00.LLLLLLL.....
.00..L...L......
....00...00.....
................
................` ],
  [ exit, bitmap`
................
................
................
................
.........00.....
..........66....
..........666...
..........666...
..........666...
..........666...
..........666...
..........666...
..........66....
.........F6.....
................
................` ],
)

const levels = [
  map`
ww.wwwwe.
w..wwwww.
..ww...w.
w..w.w...
ww...wwww
ww.w.w..w
...w.w.ww
.www...ww
..pw.wwww`,
  map`
....w.w.w....e
.ww.www.www.ww
..w.......w...
w.ww.wwww.w.w.
p.ww..w.w...w.`,
  map`
w.w.....w
w.wwwww.w
w.......w
w.ww.ww.w
..ww.ww.w
.wwwpwe.w
wwww.wwww
w.......w
w.wwwww.w
w.......w
wwww.wwww`,
  map`
...............
.wwwwwwwwwwwww.
.w.............
.w.wwwwwwwwwwww
.w............w
.wwwwwwwwwwww.w
.w............w
.w.wwwwwwwwwwww
.w............w
.wwwwwwwwwwww.w
.......pwe....w`,
  map`
e.ww..
w..www
.w....
.w..w.
...ww.
.wwp..`
]

let currentLevel = 0
setMap(levels[currentLevel])

setSolids([ wall, exit ])

setPushables({
})

onInput("w", () => {
  const playerSprite = getFirst(player)
  const nextTile = getTile(playerSprite.x, playerSprite.y - 1)
  if (nextTile.some(sprite => sprite.type === wall)) {
    return; // Don't move if next tile contains a wall
  }
  playerSprite.y -= 1
})

onInput("a", () => {
  const playerSprite = getFirst(player)
  const nextTile = getTile(playerSprite.x - 1, playerSprite.y)
  if (nextTile.some(sprite => sprite.type === wall)) {
    return; // Don't move if next tile contains a wall
  }
  playerSprite.x -= 1
})

onInput("s", () => {
  const playerSprite = getFirst(player)
  const nextTile = getTile(playerSprite.x, playerSprite.y + 1)
  if (nextTile.some(sprite => sprite.type === wall)) {
    return; // Don't move if next tile contains a wall
  }
  playerSprite.y += 1
})

onInput("d", () => {
  const playerSprite = getFirst(player)
  const nextTile = getTile(playerSprite.x + 1, playerSprite.y)
  if (nextTile.some(sprite => sprite.type === wall)) {
    return; // Don't move if next tile contains a wall
  }
  playerSprite.x += 1
})

afterInput(() => {
  const playerSprite = getFirst(player)
  if (tilesWith(player, exit).length) {
    if (currentLevel < levels.length - 1) {
      currentLevel++
      setMap(levels[currentLevel])
    } else {
      console.log("Congratulations! You have completed all levels.")
    }
  }
})