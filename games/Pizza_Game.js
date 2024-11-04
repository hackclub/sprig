/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Pizza Game
@author: Daniel Davidson
@tags: ['endless', 'puzzle', 'music']
@addedOn: 2024-11-04
*/

const player = "p"
const pizza = "z"
const hungy = "h"
const nothin = "n"
const melody = tune`
150: F4^150 + F5^150 + F4~150,
150: F4~150,
150: A4^150 + A5^150 + F4~150,
150: F4~150,
150: G4^150 + G5^150 + F4~150,
150: A4^150 + A5^150 + F4~150,
150: F4~150,
150: F5^150 + F4^150 + F4~150,
150: F4~150,
150: A4^150 + A5^150 + F4~150,
150: F4~150,
150: A4^150 + A5^150 + F4~150,
150: G4^150 + G5^150 + F4~150,
150: F4~150,
150: A4^150 + A5^150 + F4~150,
150: F4~150,
150: A4^150 + A5^150 + A4~150,
150: A4~150,
150: C5^150 + C6^150 + A4~150,
150: A4~150,
150: A4^150 + A5^150 + A4~150,
150: C5^150 + C6^150 + A4~150,
150: A4~150,
150: A4^150 + A5^150 + A4~150,
150: A4~150,
150: C5^150 + C6^150 + A4~150,
150: A4~150,
150: C5^150 + C6^150 + A4~150,
150: A4^150 + A5^150 + A4~150,
150: A4~150,
150: C5^150 + C6^150 + A4~150,
150: A4~150,

150: A#4^150 + A#5^150 + A#4~150,
150: A#4~150,
150: D5^150 + D6^150 + A#4~150,
150: A#4~150,
150: A#4^150 + A#5^150 + A#4~150,
150: D5^150 + D6^150 + A#4~150,
150: A#4~150,
150: A#5^150 + A#4^150 + A#4~150,
150: A#4~150,
150: D5^150 + D6^150 + A#4~150,
150: A#4~150,
150: D5^150 + D6^150 + A#4~150,
150: A#4^150 + A#5^150 + A#4~150,
150: A#4~150,
150: D5^150 + D6^150 + A#4~150,
150: A#4~150,

150: A#4^150 + A#5^150 + A#4~150,
150: A#4~150,
150: D5^150 + D6^150 + A#4~150,
150: A#4~150,
150: A#4^150 + A#5^150 + A#4~150,
150: D5^150 + D6^150 + A#4~150,
150: A#4~150,
150: A#4^150 + A#5^150 + A#4~150,
150: A#4~150,
150: C#5^150 + C#6^150 + A#4~150,
150: A#4~150,
150: C#5^150 + C#6^150 + A#4~150,
150: A#4^150 + A#5^150 + A#4~150,
150: A#4~150,
150: C#5^150 + C#6^150 + A#4~150,
150: A#4~150,`
setLegend(
  [player, bitmap`
................
................
.....999999.....
....99333399....
....93633639....
....93333339....
....93633639....
....99366399....
.....999999.....
...9333333339...
...9333330039...
...9333333339...
...9333333339...
...9.333333.9...
.....0....0.....
....00....00....`],
  [pizza, bitmap`
...9999999999...
..993333333399..
.99336666663399.
9936666666666399
9336633666666339
93663333666CC639
93663333666CC639
9366633666666639
9366666663366639
9366666633336639
9366CC6633336639
9336CC6663366339
9936666666666399
.99336666663399.
..993333333399..
...9999999999...`],
  [hungy, bitmap`
....00000000....
...0020220200...
..022202202220..
..022020020220..
..022022220220..
..022222222220..
..022200002220..
..022022220220..
...0022222200...
....00000000....
.......00.......
.....000000.....
.....0.00.0.....
.....0.00.0.....
......0000......
......0..0......`],
  [nothin, bitmap`
................
................
................
................
................
................
................
................
................
................
................
................
................
................
................
................`]
)
let playing = 1
setSolids([player, hungy, nothin])
let playback = playTune(melody, Infinity)
let level = 0
let pizzastack = 0
let peoplefed = 0
let peoplemapfed = 0
let peopleonmap = 0
const levels = [
  map`
n.........
..........
..........
..........
..........
..........
p..z....h.
..........`,
  map`
n.........
..........
..........
..........
..........
..........
z...h...p.
..........`,
  map`
nh........
..........
..........
..........
..........
..........
p.........
.........z`,
  map`
nph.......
..........
..........
..........
..........
z.........
..........
..........`,
  map`
n.p.......
..........
..........
....z.....
..........
..........
..........
.........h`,

  map`
n.........
..........
..........
..........
..........
..........
..........
hh...zz..p`,
  map`
n........h
..........
.h........
..........
..........
..........
.........z
p........z`,
  map`
n.........
..........
.p........
..........
.z..z.....
..........
..........
.....hh...`,
  map`
n.........
..........
..........
..........
..........
..........
..........
...zzhhp..`,
  map`
n.........
..........
..........
..........
..........
..........
..zz...hh.
......p...`,

  map`
n.........
..........
..........
..........
..........
..........
h.........
zh.....zp.`,
  map`
n.........
.z..z.....
..........
...z......
..........
.........h
p.......hz
........hh`,
  map`
n.........
..........
..........
..........
........hh
........hz
zz......hh
zz.....hzp`,
  map`
n.....hzhh
......hzzh
......hzzz
......hhhh
....zz....
....zz....
.........p
..........`,
  map`
nhhhhzzzzp
hhhhhzzzzz
hhhhhzzzzz
hhhhhzzzzz
hhhhhzzzzz
hhhhhzzzzz
hhhhhzzzzz
hhhhhzzzzz`,
]

setMap(levels[level])
peopleonmap = tilesWith(hungy).length
addText(peoplefed.toString(), {
  x: 1,
  y: 1
})
setPushables({
  [player]: []
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
onInput("j", () => {
  if (playing == 1) {
    playback.end()
    playing = 0
  } else {
    playback = playTune(melody, Infinity)
    playing = 1
  }
})

const generateRandomTile = () => {
  let oldCoords = []

  return (playerX, playerY) => {
    let randomX, randomY
    do {
      randomX = Math.floor(Math.random() * 9)
      randomY = Math.floor(Math.random() * 7)
    } while (
      oldCoords.some(coord => coord.x === randomX && coord.y === randomY) ||
      (randomX === playerX && randomY === playerY) ||
      (randomX === 0 && randomY === 0)
    )

    oldCoords.push({ x: randomX, y: randomY })
    if (oldCoords.length > 3) {
      oldCoords.shift()
    }

    return { x: randomX, y: randomY }
  }
}
afterInput(() => {
  const peopleDelivered = tilesWith(player, hungy)
  const pizzasHad = tilesWith(player, pizza)
  const playerTile = getFirst(player);
  const pizzaatplayer = getTile(playerTile.x, playerTile.y).find(sprite => sprite.type === pizza)
  const hungyatplayer = getTile(playerTile.x, playerTile.y).find(sprite => sprite.type === hungy)
  const getRandomTile = generateRandomTile();
  
  const randomHungy = getRandomTile(playerTile.x, playerTile.y);
  const randomHungy2 = getRandomTile(playerTile.x, playerTile.y);
  const randomPizza = getRandomTile(playerTile.x, playerTile.y);
  const randomPizza2 = getRandomTile(playerTile.x, playerTile.y);
  
  if (pizzastack >= 1) {
    setSolids([player, nothin])
  } else {
    setSolids([player, hungy, nothin])
  }
  if (peopleDelivered.length >= 1 && pizzastack >= 1) {
    pizzastack -= 1
    peoplefed += 1
    peoplemapfed += 1
    hungyatplayer.remove()
    clearText()
    addText(peoplefed.toString(), {
      x: 1,
      y: 1
    })
        if (peoplefed == 76 || peoplefed == 77){
      addText("Infinite Mode", {
      x: 4,
      y: 1
    })
    }
  }
  if (peoplemapfed == peopleonmap) {
    level = level + 1
    peoplemapfed = 0

    const currentLevel = levels[level]
    setSolids([player, hungy, nothin])

    if (currentLevel !== undefined) {
      setMap(currentLevel)

      peopleonmap = tilesWith(hungy).length
    } else {
      addSprite(randomHungy.x, randomHungy.y, hungy)
      console.log("1:", randomHungy.x, randomHungy.y)
      addSprite(randomPizza.x, randomPizza.y, pizza)
      console.log("2:", randomPizza.x, randomPizza.y)
      addSprite(randomHungy2.x, randomHungy2.y, hungy)
      console.log("3:", randomHungy2.x, randomHungy2.y)
      addSprite(randomPizza2.x, randomPizza2.y, pizza)
      console.log("4:", randomPizza2.x, randomPizza2.y)
      peopleonmap = tilesWith(hungy).length
      setSolids([player, hungy, nothin])
    }
  }

  if (pizzasHad.length >= 1) {
    pizzastack += 1
    pizzaatplayer.remove()

  }


})
