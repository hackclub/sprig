/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Gameee
@author: 
@tags: []
@addedOn: 2025-02-28
*/

const wall = "w"
const player = "p"
const endblock = "e"

setLegend(
  [ player, bitmap`
.....000000.....
.....020020.....
.....000000.....
.....000000.....
.....002200.....
....00000000....
....00000000....
.00000000000000.
.0..00000000..0.
....00000000....
....11111111....
....00000000....
....00....00....
....00....00....
....00....00....
....00....00....` ],
  [ wall, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000` ],
  [ endblock, bitmap`
................
................
..444444444444..
..444444444444..
..444444444444..
..444444444444..
..444444444444..
..444444444444..
..444444444444..
..444444444444..
..444444444444..
..444444444444..
..444444444444..
..444444444444..
................
................`]
)

setSolids([player, wall])

let level = 0
const levels = [
  map`
wwwwwww
e.....w
wwww.ww
p..w.ww
ww.w..w
ww.ww.w
ww....w
wwwwwww`
]

setMap(levels[level])

setPushables({
  [player]: []
})

onInput("s", () => getFirst(player).y += 1)
onInput("w", () => getFirst(player).y -= 1)
onInput("a", () => getFirst(player).x -= 1)
onInput("d", () => getFirst(player).x += 1)

afterInput(() => {
  const p = getFirst(player)
  const tile = getTile(p.x, p.y)

  if (tile.some(t => t.type === endblock)) {
    clearText()
    addText("You win!", { y: 6, color: color`3` })
  }
})