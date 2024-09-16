/*
@title: Least_Tiles_2.0
@author: NumberBasher
@addedOn: 2024-09-16
@tags: []
*/

  addText('00', {
    x: 1,
    y: 1,
    color: color`2`
  })

let flag = true
const player = "p"
const wall = "w"
const touched = "t"
const empty = "e"
let moves = 0
let totalmoves = 0
let lastpressed = ""

setLegend(
  [player, bitmap`
F666666666666666
F600000000000006
F606666666666606
F606066666660606
F606606666606606
F606660666066606
F606666060666606
F606666606666606
F606666060666606
F606660666066606
F606606666606606
F606066666660606
F606666666666606
F600000000000006
F666666666666666
FFFFFFFFFFFFFFFF`],
  [wall, bitmap`
L000000000000000
L000000000000000
L007777777777700
L007007777700700
L007007777700700
L007777777777700
L007777777777700
L007777777777700
L007777777777700
L007777777777700
L007007777700700
L007007777700700
L007777777777700
L000000000000000
L000000000000000
LLLLLLLLLLLLLLLL`],
  [touched, bitmap`
D444444444444444
D4DDD4444444DDD4
D4DDDDDDDDDDDDD4
D4DD4D44444D4DD4
D44DD4444444DD44
D44D444DDD444D44
D44D44D444D44D44
D44D44D4D4D44D44
D44D44D444D44D44
D44D444DDD444D44
D44DD4444444DD44
D4DD4D44444D4DD4
D4DDDDDDDDDDDDD4
D4DDD4444444DDD4
D444444444444444
DDDDDDDDDDDDDDDD`],
  [empty, bitmap`
1222222222222222
1202222222222202
1222222222222222
1222222222222222
1222222222222222
1222222222222222
1222222222222222
1222222222222222
1222222222222222
1222222222222222
1222222222222222
1222222222222222
1222222222222222
1202222222222202
1222222222222222
1111111111111111`]

)

setSolids([player, wall])

let level = 0
const levels = [
  map`
wwwwwwwwwwwwwww
wpeeeeewweeeeew
wwwwwwewwewweew
weeeeeeeeewweww
wwwwweeeeeeeeew
weeewwwwweeweww
wwwewwwwweeweww
wwweweeeeeeweww
weeeweeeeewweww
wewwwwwwwwwweew
weeeeeeeewwweew
weeewweeeeeweew
wwewwwewwweweew
wweeeeewwweeeew
wwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwww
weeeeeeeeeeewww
wewwwweweweewww
wewewwepeweewww
weeewwwweweeeew
wweewwwweeeewew
wweewwwwewewwew
wwewwwwwewewwew
weeeeeeeeeeeeew
wwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwww
wpeeeeeeeeew
wwwwwwwwwwew
weeeeeeeeeew
wewwwwewwwww
weeeeeeweeew
weewwweweeew
weeeeeeeewww
weewwwwwwwww
weeweeeeeeew
wweeeeeeeeew
wwwwwwwwwwww`,
  map`
wwwwwwwwwww
weeeeeeeeew
wewwwwwwwew
weeeeeewwew
weeeeeewwew
wwwwwwewwew
weeeeeeeeew
wewwwwwwwew
weeeeewwwew
wwwwwewwwew
wweeeeeewew
weeeeeeewew
weeeeewwwew
wwewwwwwwww
wweeeepwwww
wwwwwwwwwww`,
]

setMap(levels[level])

setPushables({
  [player]: []
})
onInput("w", () => {
  if(!flag)return;
  if (lastpressed !== "w" && flag) { moves++ }

  const player = getFirst("p")
  let futureY = player.y - 1

  // Continuously move the player to the right until a wall is encountered
  while (!getTile(player.x, futureY).some(sprite => sprite.type === "w")) {
    // Clear the current player position
    clearTile(player.x, player.y)
    addSprite(player.x, player.y, "t")

    // Move the player to the right
    player.y = futureY
    // Add the player back to the new position
    addSprite(player.x, player.y, "p")
    // Update the future position for the next iteration
    futureY--
  }
  lastpressed = "w"

})
onInput("s", () => {
  if(!flag)return;
  if (lastpressed !== "s") { moves++ }

  const player = getFirst("p")
  let futureY = player.y + 1

  // Continuously move the player to the right until a wall is encountered
  while (!getTile(player.x, futureY).some(sprite => sprite.type === "w")) {
    // Clear the current player position
    clearTile(player.x, player.y)
    addSprite(player.x, player.y, "t")

    // Move the player to the right
    player.y = futureY
    // Add the player back to the new position
    addSprite(player.x, player.y, "p")
    // Update the future position for the next iteration
    futureY++
  }
  lastpressed = "s"


})
onInput("a", () => {
  if(!flag)return;
  if (lastpressed !== "a" && flag) { moves++ }

  const player = getFirst("p")
  let futureX = player.x - 1

  // Continuously move the player to the right until a wall is encountered
  while (!getTile(futureX, player.y).some(sprite => sprite.type === "w")) {
    // Clear the current player position
    clearTile(player.x, player.y)
    addSprite(player.x, player.y, "t")

    // Move the player to the right
    player.x = futureX
    // Add the player back to the new position
    addSprite(player.x, player.y, "p")
    // Update the future position for the next iteration
    futureX--
  }
  lastpressed = "a"


})
onInput("d", () => {
  if(!flag)return;
  if (lastpressed !== "d" && flag) { moves++ }

  const player = getFirst("p")
  let futureX = player.x + 1

  // Continuously move the player to the right until a wall is encountered
  while (!getTile(futureX, player.y).some(sprite => sprite.type === "w")) {
    // Clear the current player position
    clearTile(player.x, player.y)
    addSprite(player.x, player.y, "t")

    // Move the player to the right
    player.x = futureX
    // Add the player back to the new position
    addSprite(player.x, player.y, "p")
    // Update the future position for the next iteration
    futureX++
  }
  lastpressed = "d"

})

onInput("j", () => {
  setMap(levels[level])
})


afterInput(() => {
  addText((moves%1000).toString().padStart(2, '0'), {
    x: 1,
    y: 1,
    color: color`2`
  })
  const emptyTiles = getAll("e")


  if (emptyTiles.length === 0) {
    level++
    const currentLevel = levels[level]
    if (currentLevel !== undefined && flag) {
      setMap(currentLevel)
      totalmoves += moves
      moves = 0
    } else {
      if (flag) totalmoves += moves
      addText(`you took ${totalmoves} moves!`, { x: 1, y: 4, color: color`3` });
      flag = false
    }
  }

})

