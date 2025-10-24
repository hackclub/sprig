/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: 2 Player Tag Game
@author: Leo B
@tags: [2 Player]
@addedOn: 2025-10-21
*/
const player = "p"
const player2 = "2"
const wall = "w"
const background = "b"
let tagged = false 
let time = 0 
let gameActive = true



  

setInterval(() => {
  let checkTagged = tilesWith(player, player2).length;
  if (checkTagged >= 1) {
 tagged = true
  gameActive = false
  addText ("Red Wins", {
    x:6,
    y:2,
    color: color`3`
  })
  }

  time += 1
  if (time >= 400 && tagged == false) { // Make sure to multiply desired time (in seconds) by 1000
    gameActive = false
    addText("Blue Wins", {
    x: 6,
    y:2,
    color: color`7`
  })
    
}
}, 1)





setLegend(
  [ player, bitmap`
................
................
................
................
....33333333....
....33333333....
....33333333....
....30033003....
....30033003....
....33333333....
....33333333....
....33333333....
................
................
................
................` ],
  [ player2, bitmap`
................
................
................
................
....77777777....
....77777777....
....77777777....
....70077007....
....70077007....
....77777777....
....77777777....
....77777777....
................
................
................
................`],
  [wall, bitmap`
1111111111111111
11LLLLLLLLLLLL11
1LLLLLLLLLLLLLL1
1LLLLLLLLLLLLLL1
1LLLLLLLLLLLLLL1
1LLLLLLLLLLLLLL1
1LLLLLLLLLLLLLL1
1LLLLLLLLLLLLLL1
1LLLLLLLLLLLLLL1
1LLLLLLLLLLLLLL1
1LLLLLLLLLLLLLL1
1LLLLLLLLLLLLLL1
1LLLLLLLLLLLLLL1
1LLLLLLLLLLLLLL1
11LLLLLLLLLLLL11
1111111111111111`],
  [background, bitmap`
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
2222222222222222`],
)

setBackground(background)

const level = map`
p........
..w......
.........
......w..
.........
w........
.........
.....w...
........2`

setMap(level)

// only walls are solid
setSolids([wall])

function canMove(sprite, dx, dy) {
  const x = sprite.x + dx
  const y = sprite.y + dy
  const things = getTile(x, y)
  // if there’s any wall in the target tile, block the move
  return !things.some(t => t.type === wall)
}

// Player 1 movement
onInput("s", () => {
  const p = getFirst(player)
  if (canMove(p, 0, 1) && gameActive)
    p.y += 1
})

onInput("w", () => {
  const p = getFirst(player)
  if (canMove(p, 0, -1) && gameActive)
  p.y -= 1
})

onInput("d", () => {
  const p = getFirst(player)
  if (canMove(p, 1, 0) && gameActive)
    p.x += 1
})

onInput("a", () => {
  const p = getFirst(player)
  if (canMove(p, -1, 0) && gameActive)
    p.x -= 1
})

// Player 2 movement
onInput("k", () => {
  const p2 = getFirst(player2)
  if (canMove(p2, 0, 1) && gameActive)
    p2.y += 1
})

onInput("i", () => {
  const p2 = getFirst(player2)
  if (canMove(p2, 0, -1) && gameActive)
    p2.y -= 1
})

onInput("l", () => {
  const p2 = getFirst(player2)
  if (canMove(p2, 1, 0) && gameActive)
    p2.x += 1
})

onInput("j", () => {
  const p2 = getFirst(player2)
  if (canMove(p2, -1, 0) && gameActive) 
    p2.x -= 1
})
