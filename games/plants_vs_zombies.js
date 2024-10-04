/*
@title: Plants vs. Zombies
@author: jianmin-chen
@tags: []
@addedOn: 2023-02-15

  Instructions:
  Use A + D to choose which plant to put down.
  Use S to make selection, then use IJKL to move the selection cursor around.
  Use W to finally put down the plant.
  Goal: Kill 10 zombies to win. Don't let the zombies touch the stone, or they win!
  Types of plants (find a working strategy!):
    * Peashooter: Shoots peas
    * Snow pea: Shoots peas, but also slows down zombies
    * Repeater: Shoots peas faster
    * Wallnut: Line of defense
    * Potato mine: Detonates on touching a zombie.
    * Sunflower: The must-have. Faster sunflower generation.
  Feel free to adjust the options below
*/

// Options
const sunValue = 25
const newSun = 20000 // Every 20 seconds
const maxSuns = 5
const newZombie = 12000 // Every 12 seconds
const zombieHealth = [240, 320]
const zombieSpeed = [1000, 2500]
const zombieDamage = [10, 20]

// Cursors
let borderCursor = {
  letter: 'a',
  bitmap: bitmap`
6666666666666666
6..............6
6..............6
6..............6
6..............6
6..............6
6..............6
6..............6
6..............6
6..............6
6..............6
6..............6
6..............6
6..............6
6..............6
6666666666666666`
}
let borderChoice = 0
let cursor = {
  letter: 'b',
  bitmap: bitmap`
8888888888888888
8..............8
8..............8
8..............8
8..............8
8..............8
8..............8
8..............8
8..............8
8..............8
8..............8
8..............8
8..............8
8..............8
8..............8
8888888888888888`,
  x: 1,
  y: 1,
  active: false
}

// Map sprites
const lightGreenGrass = {
  letter: 'c',
  bitmap: bitmap`
4444444444444444
44D4444444444444
4444444444444444
4444443444444D44
4444444444444444
4444444444444444
444D444444424444
44DDD44444444444
444D44444D444444
4444444444444444
4444444444444444
44444444D4D43444
444D44444D444444
44444444444444D4
4444444444444444
4444444444444444`
}
const darkGreenGrass = {
  letter: 'd',
  bitmap: bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDD4DDD
DDDDDDDDDDD444DD
DDDDDDD2DDDD4DDD
DD4DDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDD3DDDDD
DDDDDDDDDDDDDDDD
DDDDD4D4DDDDDDDD
DDDDDD4DDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDD4DDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD`
}
const stone = {
  letter: 'e',
  bitmap: bitmap`
LLLLLLLLLLLLLLLL
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
LLLLLLLLLLLLLLLL`
}
const brown = {
  letter: 'f',
  bitmap: bitmap`
LCCCCCCCCCCCCCCC
LCCCCCCCCCCCCCCC
LCCCCCCCCCCCCCCC
LCCCCCCCCCCCCCCC
LCCCCCCCCCCCCCCC
LCCCCCCCCCCCCCCC
LCCCCCCCCCCCCCCC
LCCCCCCCCCCCCCCC
LCCCCCCCCCCCCCCC
LCCCCCCCCCCCCCCC
LCCCCCCCCCCCCCCC
LCCCCCCCCCCCCCCC
LCCCCCCCCCCCCCCC
LCCCCCCCCCCCCCCC
LCCCCCCCCCCCCCCC
LLLLLLLLLLLLLLLL`
}
const grasses = { lightGreenGrass, darkGreenGrass }
const sunlight = {
  letter: 'g',
  bitmap: bitmap`
................
................
................
................
......0000......
.....066660.....
....06600660....
....060FF060....
....060FF060....
....06600660....
.....066660.....
......0000......
................
................
................
................`
}
const bullets = {
  green: {
    letter: 'h',
    bitmap: bitmap`
................
................
................
...........00...
..........0420..
..........0440..
...........00...
................
................
................
................
................
................
................
................
................`
  },
  blue: {
    letter: 'i',
    bitmap: bitmap`
................
................
................
...........00...
..........0720..
..........0770..
...........00...
................
................
................
................
................
................
................
................
................`
  }
}

// Functions
const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)
const getSprites = (x, y) =>
  getTile(x, y).filter(
    tile =>
      ![
        stone.letter,
        lightGreenGrass.letter,
        darkGreenGrass.letter,
        sunlight.letter
      ].includes(tile.type)
  )
const validX = x => (x > 0 && x < width() - 1 ? true : false)
const validY = y => (y > 0 && y < height() - 1 ? true : false)

function Sun(x = random(0, width() - 1), y = random(0, height() - 1)) {
  return { x, y, letter: sunlight.letter, bitmap: sunlight.bitmap }
}

function shootBullet(x, y, type, collide, bulletSpeed) {
  if (!Object.keys(bullets).includes(type))
    throw new Error('Bullet type does not exist')
  return {
    x,
    y,
    letter: bullets[type].letter,
    bitmap: bullets[type].bitmap,
    collide,
    speed: bulletSpeed,
    curr: 0,
    run: function (timestamp) {
      this.curr += timestamp
      if (this.curr > this.speed) {
        this.curr = 0
        if (this.x < width()) this.x++ // Move forward until we reach end
      }
    }
  }
}

// Plants
function Plant(bitmap, options = {}) {
  // For some reason I can't do ...options?
  let res = { bitmap }
  if (!options.letter || !options.cost)
    throw new Error('Not all plant properties provided')
  for (let key of Object.keys(options)) res[key] = options[key]
  return res
}

function peashooter() {
  return Plant(
    bitmap`
  ................
  .....0000..000..
  ....04444004440.
  ...044424444040.
  ...044404444040.
  ...044404DD4040.
  ....0444D004440.
  .....00D0..000..
  ......040.......
  ....0004400.....
  ....0D40D040....
  ...044440DD0....
  ...040D444440...
  ....0.000D4D0...
  .........040....
  ..........0.....`,
    {
      x: 0,
      y: 0,
      letter: 'k',
      cost: 100,
      health: 200,
      bullet: bullets.green,
      recharge: 1500,
      bulletSpeed: 50,
      onBulletCollide: function (zombie) {
        zombie.health -= 40
      },
      curr: 0,
      run: function (timestamp) {
        this.curr += timestamp
        if (this.curr > this.recharge) {
          this.curr = 0
          return [
            shootBullet(
              this.x,
              this.y,
              'green',
              this.onBulletCollide,
              this.bulletSpeed
            )
          ]
        }
      },
      onCollide: function (zombie) {
        this.health -= zombie.damage
        if (this.health <= 0) return false
        return true
      }
    }
  )
}

function snowpea() {
  return Plant(
    bitmap`
.00.............
.070.0000..000..
..0507777007770.
.00077727777070.
075077707777070.
.00077707557070.
.07507775007770.
.050.0050..000..
..0...070.......
....0007700.....
....05705070....
...077770770....
...0705777770...
....0.0005750...
.........050....
..........0.....`,
    {
      x: 0,
      y: 0,
      letter: 'l',
      cost: 225,
      health: 120,
      bullet: bullets.blue,
      bulletSpeed: 50,
      recharge: 1200,
      onBulletCollide: function (zombie) {
        // Besides damage, also slows down zombie
        zombie.health -= 40
        if (!zombie.speedChanged) {
          // Only change speed if it hasn't changed yet
          zombie.speed *= 2 // Actually slows it down
          zombie.speedChange = true
        }
      },
      curr: 0,
      run: function (timestamp) {
        this.curr += timestamp
        if (this.curr > this.recharge) {
          this.curr = 0
          return [
            shootBullet(
              this.x,
              this.y,
              'blue',
              this.onBulletCollide,
              this.bulletSpeed
            )
          ]
        }
      },
      onCollide: function (zombie) {
        this.health -= zombie.damage
        if (this.health <= 0) return false
        return true
      }
    }
  )
}

function repeater() {
  return Plant(
    bitmap`
..00............
.04D00000..000..
04DD04444004440.
.00044424444040.
.0D044404444040.
04D044404DD4040.
.0D00444D004440.
..0..00D0..000..
......040.......
....0004400.....
....0D40D040....
...044440DD0....
...040D444440...
....0.000D4D0...
.........040....
..........0.....`,
    {
      x: 0,
      y: 0,
      letter: 'm',
      cost: 200,
      health: 200,
      bullet: bullets.green,
      bulletSpeed: 50,
      recharge: 750,
      onBulletCollide: function (zombie) {
        // Just a faster version of the pea
        zombie.health -= 40
      },
      curr: 0,
      run: function (timestamp) {
        this.curr += timestamp
        if (this.curr > this.recharge) {
          this.curr = 0
          return [
            shootBullet(
              this.x,
              this.y,
              'green',
              this.onBulletCollide,
              this.bulletSpeed
            )
          ]
        }
      },
      onCollide: function (zombie) {
        this.health -= zombie.damage
        if (this.health <= 0) return false
        return true
      }
    }
  )
}

function sunflower() {
  return Plant(
    bitmap`
.....000000.....
....06666160....
...0616666610...
..0616FFFFF660..
..066FF2F2F660..
..016FF0F0F610..
..066FF0F0F660..
...016FFFFF160..
....066666660...
....00000000....
....0D40D0D40...
...044440D4440..
...040D444D0D0..
....0.00000.0...
................
................`,
    {
      x: 0,
      y: 0,
      letter: 'n',
      cost: 50,
      health: 200,
      recharge: 5000,
      speed: 5000,
      curr: 0,
      run: function (timestamp) {
        this.curr += timestamp
        if (this.curr > this.speed) {
          this.curr = 0
          return Sun() // Generate sun at given interval
        }
      },
      onCollide: function (zombie) {
        this.health -= zombie.damage
        if (this.health <= 0) return false
        return true
      }
    }
  )
}

function wallnut() {
  return Plant(
    bitmap`
.......0000.....
......0FFFF0....
.....0LFFFFF0...
....0LFFFFFFF0..
...0LLFFFFFFF0..
..0LLFFF2FF2FF0.
..0LLFF20F20FF0.
..0LLFF22F22FF0.
..0LLFFFFFFFFF0.
..0LLFF00FFFFF0.
...0LFFFF0FFFF0.
...0LFFFFFFFFF0.
....0LFFFFFFF0..
.....0LFFFFF0...
......000000....
................`,
    {
      x: 0,
      y: 0,
      letter: 'o',
      cost: 50,
      health: 400,
      onCollide: function () {
        this.health--
        if (this.health <= 0) return false
        return true
      }
    }
  )
}

function potatomine() {
  return Plant(
    bitmap`
................
................
......000.......
.....03C30......
.....03330......
......010.......
.....00000......
....0FFFFF0.....
...0FLF2F2F0....
..00LFF0F0F0....
.0L0FFFFFFF00...
..0000002200F0..
.0F0F0F000FF0...
..0.0.000F0F0...
.........0.0....
................`,
    {
      x: 0,
      y: 0,
      letter: 'p',
      cost: 25,
      onCollide: function (zombie) {
        // "Detonate" on impact
        zombie.health /= 2
        return false
      }
    }
  )
}

const plants = { peashooter, snowpea, repeater, wallnut, potatomine }
const plantLetters = Object.keys(plants).map(plant => plants[plant]().letter)

function PlantCard(bitmap, plant) {
  // Cost cards for the plants
  return { bitmap, letter: plant().letter.toUpperCase(), plant }
}

const plantCards = [
  PlantCard(
    bitmap`
CCCCCCCCCCCCCCCC
CC000000000000CC
C022220C3022220C
C02220000002220C
C0220FF2F2F0220C
C0220FF0F0F0220C
C02201010100220C
C020L0F0F0FF020C
C00000000000000C
C01111111111110C
C01100011000110C
C01111011011110C
C01100111100110C
C01100011001110C
CC000000000000CC
CCCCCCCCCCCCCCCC`,
    potatomine
  ),
  PlantCard(
    bitmap`
CCCCCCCCCCCCCCCC
CC000000000000CC
C02201666660220C
C02066FFFF61020C
C0206F2FF2F6020C
C0206F0FF0F6020C
C02066FFFF66020C
C02201666610220C
C00000000000000C
C01111111111110C
C01100011000110C
C01101111010110C
C01110011000110C
C01100111111110C
CC000000000000CC
CCCCCCCCCCCCCCCC`,
    sunflower
  ),
  PlantCard(
    bitmap`
CCCCCCCCCCCCCCCC
CC000000000000CC
C02220LLFFF0220C
C0220LLFFFF0220C
C0220LLF0F00220C
C0220LLFFFF0220C
C0220LLFFFF0220C
C02220LLFFF0220C
C00000000000000C
C01111111111110C
C01100011000110C
C01101111010110C
C01110011000110C
C01100111111110C
CC000000000000CC
CCCCCCCCCCCCCCCC`,
    wallnut
  ),
  PlantCard(
    bitmap`
CCCCCCCCCCCCCCCC
CC000000000000CC
C02200002220220C
C02044440004020C
C02044244444020C
C02044044444020C
C02044440004020C
C02200002220220C
C00000000000000C
C01111111111110C
C01101000100010C
C01101010101010C
C01101000100010C
C01111111111110C
CC000000000000CC
CCCCCCCCCCCCCCCC`,
    peashooter
  ),
  PlantCard(
    bitmap`
CCCCCCCCCCCCCCCC
CC000000000000CC
C02022000022020C
C00700777700700C
C02070772777700C
C00700770777700C
C02020777700700C
C02222000022020C
C00000000000000C
C01111111111110C
C01101000100010C
C01101110101110C
C01101101110010C
C01111111100110C
CC000000000000CC
CCCCCCCCCCCCCCCC`,
    snowpea
  ),
  PlantCard(
    bitmap`
CCCCCCCCCCCCCCCC
CC000000000000CC
C02002000022020C
C00DD0444400400C
C020D0442444400C
C00D00440444400C
C00DD0444400400C
C02002000022020C
C00000000000000C
C01111111111110C
C01000100010000C
C01110101010100C
C01001100010000C
C01000111111110C
CC000000000000CC
CCCCCCCCCCCCCCCC`,
    repeater
  )
]

// Zombies
const zombie = {
  letter: 'j',
  bitmap: bitmap`
................
..00000.........
.0111110........
.010101L000.....
.012121L0FF0....
.011111L0FFF0...
.0LL2100LFFFF0..
.02LL0F0LFFFF0..
..0000F0LFFFF0..
.....0F000L0L0..
....00F05505050.
....00F00550500.
..00L0111005500.
.0FFL010101100L.
.000000.0..0LFF.
................`
}
function Zombie(x, y) {
  return {
    letter: zombie.letter,
    bitmap: zombie.bitmap,
    x,
    y,
    health: random(...zombieHealth),
    damage: random(...zombieDamage),
    speed: random(...zombieSpeed),
    speedChanged: false,
    curr: 0,
    type: 'zombie',
    run: function (timestamp) {
      // => true = zombie dead, false = zombie not dead (undead, pun intended)
      this.curr += timestamp
      if (this.curr > this.speed) {
        this.curr = 0
        const plants = getSprites(this.x, this.y).filter(tile =>
          plantLetters.includes(tile.type)
        )
        if (!plants.length) this.x-- // Only move if it hasn't collided with plant
        if (this.speedChanged) {
          this.speed = random(...zombieSpeed) // Reset zombie speed
          this.speedChanged = false
        }
        return false
      } else return false
    }
  }
}

const blackBackground = 'q'

// Legend
// In order of "z-index"
let legend = [
  [
    blackBackground,
    bitmap`
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
0000000000000000`
  ],
  [borderCursor.letter, borderCursor.bitmap],
  [cursor.letter, cursor.bitmap],
  [sunlight.letter, sunlight.bitmap]
]
legend.push([zombie.letter, zombie.bitmap])
for (let card of plantCards) {
  legend.push([card.letter, card.bitmap])
  legend.push([card.plant().letter, card.plant().bitmap])
}
for (let bullet of Object.keys(bullets)) {
  legend.push([bullets[bullet].letter, bullets[bullet].bitmap])
}

setLegend(
  ...[
    ...legend,
    [lightGreenGrass.letter, lightGreenGrass.bitmap],
    [darkGreenGrass.letter, darkGreenGrass.bitmap],
    [stone.letter, stone.bitmap],
    [brown.letter, brown.bitmap]
  ]
)

// Map
const grid = map`
ePNOKLMeeee
edcdcdcdcdc
ecdcdcdcdcd
edcdcdcdcdc
ecdcdcdcdcd
edcdcdcdcdc
eeeeeeeeeee`

// Music
const melody = tune`
272.72727272727275: b4-272.72727272727275 + g4~272.72727272727275 + f4~272.72727272727275 + e4~272.72727272727275,
272.72727272727275: c5-272.72727272727275 + a4~272.72727272727275 + g4~272.72727272727275 + f4~272.72727272727275 + d4~272.72727272727275,
272.72727272727275: b4-272.72727272727275 + g4~272.72727272727275 + f4~272.72727272727275 + e4~272.72727272727275,
272.72727272727275: c5-272.72727272727275 + a4~272.72727272727275 + g4~272.72727272727275 + f4~272.72727272727275 + c4~272.72727272727275,
272.72727272727275: b4^272.72727272727275 + g4~272.72727272727275 + f4~272.72727272727275 + e4~272.72727272727275,
272.72727272727275: g4^272.72727272727275 + f4~272.72727272727275,
272.72727272727275: g4~272.72727272727275,
272.72727272727275: a4^272.72727272727275,
272.72727272727275: g4-272.72727272727275 + b4~272.72727272727275,
272.72727272727275: a4~272.72727272727275 + e4~272.72727272727275 + c5~272.72727272727275,
272.72727272727275: a4^272.72727272727275 + d4~272.72727272727275,
272.72727272727275: g4-272.72727272727275 + b4~272.72727272727275,
272.72727272727275: a4~272.72727272727275 + e4~272.72727272727275 + c5~272.72727272727275,
272.72727272727275: d5-272.72727272727275 + d4~272.72727272727275,
272.72727272727275: g4^272.72727272727275 + b4~272.72727272727275,
272.72727272727275: a4~272.72727272727275 + c5~272.72727272727275 + e4~272.72727272727275,
272.72727272727275: d4~272.72727272727275 + c4~272.72727272727275,
272.72727272727275: g4~272.72727272727275 + a4~272.72727272727275,
272.72727272727275: a5~272.72727272727275 + g5~272.72727272727275 + f5~272.72727272727275 + e5~272.72727272727275 + c5-272.72727272727275,
272.72727272727275: a5~272.72727272727275 + g5~272.72727272727275 + f5~272.72727272727275 + d5~272.72727272727275 + e5^272.72727272727275,
272.72727272727275: g5~272.72727272727275 + f5~272.72727272727275 + d5~272.72727272727275 + e5-272.72727272727275 + c4~272.72727272727275,
272.72727272727275: e5~272.72727272727275 + d5^272.72727272727275 + c4~272.72727272727275 + d4~272.72727272727275,
272.72727272727275: a5~272.72727272727275 + f5~272.72727272727275 + g5-272.72727272727275 + c4~272.72727272727275,
272.72727272727275: b5^272.72727272727275,
272.72727272727275: a4~272.72727272727275 + a5^272.72727272727275 + g4~272.72727272727275,
272.72727272727275: c4/272.72727272727275,
272.72727272727275: a5~272.72727272727275 + g5~272.72727272727275 + f5~272.72727272727275 + e5~272.72727272727275 + c5-272.72727272727275,
272.72727272727275: a5~272.72727272727275 + g5~272.72727272727275 + f5~272.72727272727275 + d5~272.72727272727275 + e5^272.72727272727275,
272.72727272727275: g5~272.72727272727275 + f5~272.72727272727275 + d5~272.72727272727275 + e5-272.72727272727275 + c4~272.72727272727275,
272.72727272727275: e5~272.72727272727275 + d5^272.72727272727275 + c4~272.72727272727275 + b5^272.72727272727275 + d4~272.72727272727275,
272.72727272727275: f5~272.72727272727275 + a5~272.72727272727275 + b5^272.72727272727275 + g5-272.72727272727275 + c4~272.72727272727275,
272.72727272727275: a5-272.72727272727275 + c4~272.72727272727275`

// Game
function Game() {
  return {
    sprites: [],
    plantSprites: [],
    zombieSprites: [],
    sunlight: [],
    playback: undefined,
    map: grid,
    amount: 200, // Amount of sunlight
    score: 0, // Number of zombies killed
    over: false,
    init: function () {
      setMap(this.map)
      this.playback = playTune(melody, Infinity)
      addSprite(borderChoice + 1, 0, borderCursor.letter)
      addText(String(this.amount), { x: 0, y: 0, color: color`6` })
      addText(String(this.score), { x: 19, y: 0, color: color`4` })
    },
    run: function (timestamp) {
      try {
        let newPlants = []
        for (let plant of this.plantSprites) {
          if (plant.run) {
            const res = plant.run(timestamp)
            if (
              res &&
              res.letter === sunlight.letter &&
              this.sunlight.length < maxSuns
            ) {
              // Add sunlight, which is static
              addSprite(res.x, res.y, res.letter)
              this.sunlight.push(res)
            } else if (Array.isArray(res)) {
              // Add each sprite (most likely bullets) to the list of sprites
              for (let sprite of res) {
                addSprite(sprite.x, sprite.y, sprite.letter)
                this.sprites.push(sprite)
              }
            }
          }
          // Check if plant collided with zombie, and "kill"
          const zombie = this.zombieSprites.filter(
            zombie => zombie.x === plant.x && zombie.y === plant.y
          )
          if (zombie.length) {
            if (plant.onCollide) {
              const survives = plant.onCollide(zombie[0])
              if (!survives) {
                // Plant died :( so it doesn't get added to new plant
                const past = getTile(plant.x, plant.y).filter(
                  tile => tile.type === plant.letter
                )[0]
                if (past) past.remove()
                continue
              }
            }
          }
          newPlants.push(plant)
        }
        this.plantSprites = newPlants

        let newSprites = []
        for (let sprite of this.sprites) {
          const past = getTile(sprite.x, sprite.y).filter(
            tile => tile.type === sprite.letter
          )[0]
          past.remove()
          sprite.run(timestamp)
          // Check if sprite is bullet, and if so, whether or not it has collided with zombie
          if (
            sprite.letter === bullets.green.letter ||
            sprite.letter === bullets.blue.letter
          ) {
            const zombie = this.zombieSprites.filter(
              zombie => zombie.x === sprite.x && zombie.y === sprite.y
            )
            if (zombie.length) {
              let zombieObj = zombie[0]
              sprite.collide(zombieObj)
              continue
            }
          }
          if (validY(sprite.y) && sprite.x < width() - 1) {
            // If the character hasn't fallen off the screen yet, show it
            addSprite(sprite.x, sprite.y, sprite.letter)
            newSprites.push(sprite)
          }
        }
        this.sprites = newSprites

        let newZombies = []
        for (let sprite of this.zombieSprites) {
          const past = getTile(sprite.x, sprite.y).filter(
            tile => tile.type === sprite.letter
          )[0]
          if (past) past.remove()
          if (sprite.health <= 0) {
            this.score++
            continue
          }
          sprite.run(timestamp)
          if (sprite.x > 0) {
            addSprite(sprite.x, sprite.y, sprite.letter)
            newZombies.push(sprite)
          } else if (sprite.x <= 0) {
            // Check if zombie has reached behind plants - if so, the game is over
            this.cleanup('Ooopsies!', 6, 7)
            return
          }
        }
        this.zombieSprites = newZombies

        clearText()
        addText(String(this.amount), { x: 0, y: 0, color: color`6` })
        addText(String(this.score), { x: 19, y: 0, color: color`4` })
      } catch (err) {
        // console.log('Found the error!', err)
      }
    },
    cleanup: function (text, x, y) {
      clearInterval(gameloop)
      this.over = true
      for (let x = 0; x < width(); x++) {
        for (let y = 0; y < height(); y++) {
          clearTile(x, y)
        }
      }
      clearText()
      setBackground(blackBackground)
      addText(text, { x, y, color: color`3` })
      if (this.playback) this.playback.end()
    }
  }
}

let game = Game()
game.init()

onInput('a', () => {
  if (!game.over && borderChoice > 0 && !cursor.active) borderChoice--
})

onInput('d', () => {
  if (!game.over && borderChoice !== plantCards.length - 1 && !cursor.active)
    borderChoice++
})

onInput('s', () => {
  if (game.over) return
  // Let user place a plant! But only if they have the requisite sunlight, and if there isn't already a plant there
  const plant = plantCards[borderChoice].plant()
  if (plant.cost > game.amount) return
  if (!getAll(cursor.letter).length) {
    cursor.x = 1
    cursor.y = 1
    addSprite(cursor.x, cursor.y, cursor.letter)
    cursor.active = true
  }
})

onInput('w', () => {
  if (game.over) return
  for (let sprite of game.plantSprites) {
    if (sprite.x === cursor.x && sprite.y === cursor.y) return
  }

  // Put down sprite and remove cursor
  const cursorSprite = getTile(cursor.x, cursor.y).filter(
    tile => tile.type === cursor.letter
  )[0]
  if (cursorSprite) cursorSprite.remove()

  const plant = plantCards[borderChoice].plant()
  plant.x = cursor.x
  plant.y = cursor.y
  game.plantSprites.push(plant)
  game.amount -= plant.cost
  addSprite(cursor.x, cursor.y, plant.letter)
  cursor.active = false
  cursor.x = 1
  cursor.y = 1
})

onInput('i', () => {
  if (game.over || cursor.y <= 1 || !cursor.active) return
  getFirst(cursor.letter).y--
  cursor.y--
})

onInput('j', () => {
  if (game.over || cursor.x <= 1 || !cursor.active) return
  getFirst(cursor.letter).x--
  cursor.x--
})

onInput('l', () => {
  if (game.over || cursor.x >= width() - 1 || !cursor.active) return
  getFirst(cursor.letter).x++
  cursor.x++
})

onInput('k', () => {
  if (game.over) return
  if (!cursor.active) {
    // If cursor isn't active, this collects sunlight
    if (game.sunlight.length) {
      const collected = game.sunlight[0]
      game.sunlight = game.sunlight.slice(1) // Remove first sun
      const sprite = getTile(collected.x, collected.y).filter(
        tile => tile.type === sunlight.letter
      )[0]
      sprite.remove()
      game.amount += sunValue
    }
  } else if (cursor.y >= height() - 2) return
  else {
    // Move cursor
    getFirst(cursor.letter).y++
    cursor.y++
  }
})

afterInput(() => {
  if (game.over) return
  getFirst(borderCursor.letter).x = borderChoice + 1
})

// Game loop
let last = new Date()
let sunlightCount = 0
let zombieCount = 0
let gameloop = setInterval(() => {
  if (game.score === 10) game.cleanup('You saved the day!!', 1, 7)

  let timestamp = new Date() - last

  sunlightCount += timestamp
  if (sunlightCount >= newSun && game.sunlight.length < maxSuns) {
    sunlightCount = 0
    const newSun = Sun()
    addSprite(newSun.x, newSun.y, newSun.letter)
    game.sunlight.push(newSun)
  }

  zombieCount += timestamp
  if (zombieCount >= newZombie) {
    zombieCount = 0
    const pos = [width() - 1, random(1, height() - 2)]
    // console.log(pos)
    const newZombie = Zombie(...pos)
    addSprite(newZombie.x, newZombie.y, newZombie.letter)
    game.zombieSprites.push(newZombie)
  }

  game.run(timestamp)
  last = new Date()

  // Also make sure to run collide() functions on the plants themselves.
  // Fix weird zombie behavior.
  // Fix weird text behavior when game is over.
}, 1000 / 60)
