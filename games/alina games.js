const player = "p"
const gem = "g"
const wall = "w"

setLegend(
  [ player, bitmap`
................
......3333......
.....333333.....
....33300333....
....33333333....
.....333333.....
......3333......
................
................
................
................
................
................
................
................
................` ],

  [ gem, bitmap`
................
................
......4444......
.....444444.....
.....444444.....
......4444......
................
................
................
................
................
................
................
................
................
................` ],

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
1111111111111111` ]
)

setSolids([player, wall])

const level = map`
wwwwwwwwww
w....g...w
w..ww..w.w
w..w..g..w
w.p....w.w
w...g....w
wwwwwwwwww
`

setMap(level)

// movement
onInput("w", () => {
  getFirst(player).y -= 1
})

onInput("s", () => {
  getFirst(player).y += 1
})

onInput("a", () => {
  getFirst(player).x -= 1
})

onInput("d", () => {
  getFirst(player).x += 1
})

// remove gem when touched
afterInput(() => {
  const touched = tilesWith(player, gem)
  touched.forEach(tile => {
    tile.forEach(sprite => {
      if (sprite.type === gem) {
        sprite.remove()
      }
    })
  })

  if (tilesWith(gem).length === 0) {
    addText("you win lol", { y: 6, color: color`3` })
  }
})