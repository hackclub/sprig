
const player = "p"
const item = "i"

setLegend(
  [ player, bitmap`
................
................
.....000000.....
....06666660....
...0666666660...
..066606660660..
..066606660660..
..066606660660..
..066606660660..
..066066666060..
..066006660060..
...0660000660...
....06666660....
.....000000.....
................
................` ],
  [ item, bitmap`
................
................
................
.....5555555....
....555505555...
...55550005555..
...55550055555..
...55550005555..
...55550000555..
...55555500555..
...55555500555..
....555000055...
.....5555055....
................
................
................`
  ]
)

const level = map`
pii
.ii`

setMap(level)

setPushables({
  [ player ]: [],
  [ item ]: []
})

onInput("w", () => {
  const playerSprite = getFirst(player)
  const nextTile = getTile(playerSprite.x, playerSprite.y - 1)
  if (!nextTile.some(sprite => sprite.type === item)) {
    playerSprite.y -= 1
  } else {
    getFirst(item).remove()
  }
})

onInput("a", () => {
  const playerSprite = getFirst(player)
  const nextTile = getTile(playerSprite.x - 1, playerSprite.y)
  if (!nextTile.some(sprite => sprite.type === item)) {
    playerSprite.x -= 1
  } else {
    getFirst(item).remove()
  }
})

onInput("s", () => {
  const playerSprite = getFirst(player)
  const nextTile = getTile(playerSprite.x, playerSprite.y + 1)
  if (!nextTile.some(sprite => sprite.type === item)) {
    playerSprite.y += 1
  } else {
    getFirst(item).remove()
  }
})
