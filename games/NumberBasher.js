/*
@title: Least_Tiles_2.0
@author: NumberBasher
@addedOn: 2024-09-16
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
  map`
w.w..ww.www...w.w.www..ww.w.w.w..w.w
w.w.w...w.....w.w..w....w.w.w.w..w.w
w.w..w..ww.........w....w.ww..w.....
w.w...w.w..........w..w.w.w.w.w.....
.ww.ww..www.......www..ww.w.w.www...
eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
www.ww.....ww.w.w..w.w..ww..w.w.w...
ew..w.w.....w.w.w.w.w.w.w.w.w.w.w...
ew..w.w.....w.w.w.w.w.w.www.w.w.w...
ew..w.w...w.w.w.w.w...w.w...........
pw...ww....ww..ww.w...w.w...w.w.w...`,
  map`
pwewewwwwe
weweeeweee
ewwwwwwwww
wwweeeweew
weewwewwew
ewwewewwew
weeewewwee
ewwweeewwe
weweweeeew
eweeeeewee`,
  map`
eee.ttttttt
eww...w....
eeeweeewewe
wwewewewewe
eeeweweweee
........wwe
ttttttwpeee`,
  map`
p.........
..........
..........
..........
....e.....
.w........
.ww.......
w.........
........w.
..........`,
  map`
p..w....w.
........e.
.e..weeee.
..ew...ee.
w.ee..wee.
...ee.....
..w..e.w..
..........
ee...w....
..eeee....`,
  map`
pe...wwwwww.ww...........
.e...............w...w.w.
..e...........w.ee.e.....
..e.......wwee..w...w....
..ww..w....weww..w..w....
..w.e..w.w.....ww..ee....
w....e.....ww.....ww..w..
www...ew..www....e.......
www...we....w.e....w.w...
ww....w.e...we........ww.
www..ww....ew...www......
ww...ww..wwwww......w...w
w..w..w..e..w.w.........w
w......ewww.w..w.........
ww....e..wwww.....w.....w
w.w...w...w.e.w.....w...w
w..ee......wee..w.w.e...w
...e.....w...ew..ww.ww..w
ww..ew..ww..w.eew....ee.w
ww.....e..eew..eew.wwww.w
.weew.ewee..ww.eeew...w.w
..w.......eeeewwew..w.w.w
..ewww.....ee.www.....w.w
...ee...e.e.............w
.....eee......ww....w.w..`,
  map`
pewwe
eeeew
eeewe
ewwew
wewwe`,
  map`
p........w
...w.....w
..e.w.....
.ww.......
...w......
..........
..w.......
.w........
..........
..........`,
  map`
weeeeeeeeeeeeeee
wewwweeeeeeewwwe
wewwwwwwwwwwwwwe
wewweweeweewewwe
wwewweeeeeeewwee
weeweeewwweeewee
weeweeweeeweewee
weeweewepeweewee
weeweeweeeweewee
weeweeewwweeewee
weewweeeeeeewwew
wewweweeeeewewwe
wewwwwwwwwwwwwwe
wewwweeeeeeewwwe
weeeeweeeeeeeeee
wwwwwwwwwwwwwwww`,
  map`
weeeeeeeeeeeeeee
wewwwwwwwwwwwwwe
weweeeeeeeeeewwe
wewewweeeeeewewe
weweeweeeeeweewe
weweeeweeeweeewe
weweeeewpweeeewe
weweeeeeweeeeewe
weweeeeweweeeewe
weweeeweeeweeewe
wewewweeeeewwewe
wewewweeeeeewewe
weweeeeeeeeeeewe
wewwwwwwwwwwwwwe
weeeeeeeeeeeeeee
wwwwwwwwwwwwwwww`,
]

setMap(levels[level])

setPushables({
  [player]: []
})
onInput("w", () => {
  if (!flag) return;

  const player = getFirst("p")
  let futureY = player.y - 1

  // Continuously move the player to the right until a wall is encountered
  while (!getTile(player.x, futureY).some(sprite => sprite.type === "w") && (0 <= futureY && futureY < height())) {
    // Clear the current player position
    clearTile(player.x, player.y)
    addSprite(player.x, player.y, "t")

    // Move the player to the right
    player.y = futureY
    // Add the player back to the new position
    addSprite(player.x, player.y, "p")
    // Update the future position for the next iteration
    futureY--
    if (lastpressed !== "w" && flag) { moves++ }
    lastpressed = "w"
  }

})
onInput("s", () => {
  if (!flag) return;

  const player = getFirst("p")
  let futureY = player.y + 1

  // Continuously move the player to the right until a wall is encountered
  while (!getTile(player.x, futureY).some(sprite => sprite.type === "w") && (0 <= futureY && futureY < height())) {
    // Clear the current player position
    clearTile(player.x, player.y)
    addSprite(player.x, player.y, "t")

    // Move the player to the right
    player.y = futureY
    // Add the player back to the new position
    addSprite(player.x, player.y, "p")
    // Update the future position for the next iteration
    futureY++
    if (lastpressed !== "s") { moves++ }
    lastpressed = "s"
  }


})
onInput("a", () => {
  if (!flag) return;

  const player = getFirst("p")
  let futureX = player.x - 1

  // Continuously move the player to the right until a wall is encountered
  while (!getTile(futureX, player.y).some(sprite => sprite.type === "w") && (0 <= futureX && futureX < width())) {
    // Clear the current player position
    clearTile(player.x, player.y)
    addSprite(player.x, player.y, "t")

    // Move the player to the right
    player.x = futureX
    // Add the player back to the new position
    addSprite(player.x, player.y, "p")
    // Update the future position for the next iteration
    futureX--
    if (lastpressed !== "a" && flag) { moves++ }
    lastpressed = "a"
  }


})
onInput("d", () => {
  if (!flag) return;

  const player = getFirst("p")
  let futureX = player.x + 1

  // Continuously move the player to the right until a wall is encountered
  while (!getTile(futureX, player.y).some(sprite => sprite.type === "w") && (0 <= futureX && futureX < width())) {
    // Clear the current player position
    clearTile(player.x, player.y)
    addSprite(player.x, player.y, "t")

    // Move the player to the right
    player.x = futureX
    // Add the player back to the new position
    addSprite(player.x, player.y, "p")
    // Update the future position for the next iteration
    futureX++
    if (lastpressed !== "d" && flag) { moves++ }
    lastpressed = "d"
  }

})




onInput("i", () => {
  if (!flag) return;

  const player = getFirst("p")
  let futureY = player.y - 2

  // Continuously move the player to the right until a wall is encountered
  while (!getTile(player.x, futureY).some(sprite => sprite.type === "w") && (0 <= futureY && futureY < height())) {
    // Clear the current player position
    clearTile(player.x, player.y)
    addSprite(player.x, player.y, "t")

    // Move the player to the right
    player.y = futureY
    // Add the player back to the new position
    addSprite(player.x, player.y, "p")
    // Update the future position for the next iteration
    futureY -= 2
    if (lastpressed !== "i" && flag) { moves++ }
    lastpressed = "i"
  }

})
onInput("k", () => {
  if (!flag) return;

  const player = getFirst("p")
  let futureY = player.y + 2

  // Continuously move the player to the right until a wall is encountered
  while (!getTile(player.x, futureY).some(sprite => sprite.type === "w") && (0 <= futureY && futureY < height())) {
    // Clear the current player position
    clearTile(player.x, player.y)
    addSprite(player.x, player.y, "t")

    // Move the player to the right
    player.y = futureY
    // Add the player back to the new position
    addSprite(player.x, player.y, "p")
    // Update the future position for the next iteration
    futureY += 2
    if (lastpressed !== "k") { moves++ }
    lastpressed = "k"
  }


})
onInput("j", () => {
  if (!flag) return;

  const player = getFirst("p")
  let futureX = player.x - 2

  // Continuously move the player to the right until a wall is encountered
  while (!getTile(futureX, player.y).some(sprite => sprite.type === "w") && (0 <= futureX && futureX < width())) {
    // Clear the current player position
    clearTile(player.x, player.y)
    addSprite(player.x, player.y, "t")

    // Move the player to the right
    player.x = futureX
    // Add the player back to the new position
    addSprite(player.x, player.y, "p")
    // Update the future position for the next iteration
    futureX -= 2
    if (lastpressed !== "j" && flag) { moves++ }
    lastpressed = "j"
  }


})
onInput("l", () => {
  if (!flag) return;

  const player = getFirst("p")
  let futureX = player.x + 2

  // Continuously move the player to the right until a wall is encountered
  while (!getTile(futureX, player.y).some(sprite => sprite.type === "w") && (0 <= futureX && futureX < width())) {
    // Clear the current player position
    clearTile(player.x, player.y)
    addSprite(player.x, player.y, "t")

    // Move the player to the right
    player.x = futureX
    // Add the player back to the new position
    addSprite(player.x, player.y, "p")
    // Update the future position for the next iteration
    futureX += 2
    if (lastpressed !== "l" && flag) { moves++ }
    lastpressed = "l"
  }

})







afterInput(() => {
  addText((moves % 1000).toString().padStart(2, '0'), {
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
