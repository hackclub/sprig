 /*
@title: gummie muncher
@author: Traffic-Person
@description: eat 25 gummies without being caught by the chasing spikes
@tags: ['escape', 'chase']
@addedOn: 2025-12-03
*/

const player = "p"
const gummy = "g"
const spike = "s"

const gummyeat = tune`
500: G4~500 + E4-500 + B4^500,
15500`

let score = 0
let won = false

// Sprites
setLegend(
  [player, bitmap`
................
................
................
................
....00000000....
...0........0...
...00......00...
...0........0...
...0..0000..0...
...0.....7..0...
....00000700....
....0......0....
....0......0....
....0......0....
...00......00...
................`],
  [gummy, bitmap`
................
................
................
.........33.....
........3223....
........3333....
........3333....
......43232.....
.....444333.....
.....24243......
.....4444.......
......44........
................
................
................
................`],
  [spike, bitmap`
................
................
....11111111....
....11111111....
....11111111....
....11111111....
....11111111....
....11111111....
....11111111....
....11111111....
....11111111....
....11111111....
................
................
................
................`]
)

setSolids([])

let level = 0
const levels = [
  map`
p......
.......
..g....
.......
.......
.......`
]

function resetLevel() {
  setMap(levels[level])
  score = 0
}

setMap(levels[level])

setPushables({
  [player]: []
})

// Eat gummies & spike collision
afterInput(() => {
  const p = getFirst(player)

  for (let t of getTile(p.x, p.y)) {
    if (t.type === gummy) {
      t.remove()
      playTune(gummyeat)
      score += 1
    }
    if (t.type === spike) {
      resetLevel()
      addText("Ouch! Hit a spike!", { x: 0, y: 2, color: color`1` })
      return
    }
  }

  clearText()
  addText("Score: " + score, { x: 0, y: 0, color: color`3` })
  addText("Goal: Get 25 score", { x: 0, y: 1, color: color`3` })

  if (score >= 25) {
    won = true
    clearText()
    addText("You Won!!!111!!", { x: 2, y: 2, color: color`9` })
  }
})

if (won == false) {
  onInput("s", () => getFirst(player).y += 1)
  onInput("w", () => getFirst(player).y -= 1)
  onInput("a", () => getFirst(player).x -= 1)
  onInput("d", () => getFirst(player).x += 1)
}

// Spawn gummies faster and more often
setInterval(() => {
  if (won == false) {
    for (let i = 0; i < 1; i++) { // spawn 3 gummies
      const x = Math.floor(Math.random() * 7)
      const y = Math.floor(Math.random() * 6)
      if (getTile(x, y).length === 0) addSprite(x, y, gummy)
    }
  }
}, 750) // every 0.5 seconds

// Spawn more spikes
setInterval(() => {
  if (won == false) {
    if (Math.random() < 0.7) { // 60% chance
      const x = Math.floor(Math.random() * 7)
      const y = Math.floor(Math.random() * 6)
      const p = getFirst(player)
      if (getTile(x, y).length === 0 && !(x === p.x && y === p.y)) {
        addSprite(x, y, spike)
      }
    }
  }
}, 1200)

// Move spikes towards the player faster
setInterval(() => {
  if (won == false) {
    const p = getFirst(player)
    for (let s of getAll(spike)) {
      let nx = s.x
      let ny = s.y

      // Move horizontally toward player
      if (p.x > s.x) nx += 1
      if (p.x < s.x) nx -= 1

      // Move vertically toward player
      if (p.y > s.y) ny += 1
      if (p.y < s.y) ny -= 1

      // Keep inside map & avoid other spikes
      if (
        nx >= 0 && nx < 7 &&
        ny >= 0 && ny < 6 &&
        getTile(nx, ny).every(t => t.type !== spike)
      ) {
        s.x = nx
        s.y = ny
      }

      // Check if spike hit player
      if (s.x === p.x && s.y === p.y) {
        resetLevel()
        addText("Ouch! Hit a spike!", { x: 0, y: 2, color: color`1` })
        return
      }
    }
  }
}, 500)