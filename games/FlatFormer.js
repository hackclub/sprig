/*
@title: FlatFormer
@author: Sterling Duncan
@tags: []
@addedOn: 2024-11-23
*/

const player = "p"
const platform = "w"

setLegend(
  [ player, bitmap`
................
................
................
................
................
................
....333.........
....373.........
....333.........
...3.3.3........
..3..3..3.......
.....3..........
.....3..........
....3.3.........
...3...3........
..3.....3.......` ],
  [ platform, bitmap`
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777` ]
)

setSolids([ player, platform ])

const level = map`
.w............
.w.wwww..wwwww
.w.w.w...w....
.w...ww.ww.ww.
pwwwww..w..ww.
.w.w........w.
.w.ww....w....
.w.......wwww.
.ww.....w.....
.w..w...w.....
.wwwwwwww.....
..............
...wwwwwww.w..
...w.....w.w..
...w....ww.w..
..ww....ww.w..
..ww..wwww.w..
..w...w.ww.ww.
.ww...w..w.w..
ww...wwwww.w..
.w...wwwwwww..
.w...w..w.ww..
.www...ww..w..
...w...w..ww..
..............`

setMap(level)

onInput("d", () => {
  getFirst(player).x += 1
})

onInput("a", () => {
  getFirst(player).x -= 1
})

onInput("w", () => {
  getFirst(player).y -= 1
})

onInput("s", () => {
  getFirst(player).y += 1
})

afterInput(() => {
  const playerSprite = getFirst(player)

  // Check for collisions with solid tiles
  if (tilesWith(playerSprite.x, playerSprite.y).some(tile => tilesWith(platform).includes(tile))) {
    // Handle collision (e.g., stop player movement)
    playerSprite.y -= 1 // Move player up one tile to prevent collision
  }
})
