/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Mr Bumble's Descent
@description: You play as Mr Bumble, a gentleman who falls through skies with the help of his trusty umbrella
@author: Me, Devank Arolkar
@tags: ['tag1', 'tag2']
@addedOn: 2026-02-25
*/

const player = "p"
const coin = "c"
const pigeon = "b"
const background = "k"

setLegend(
  [ player, bitmap`
................
................
................
................
................
..........3.....
.........333....
.......033033...
......0.0.0.....
...0...0..0.....
....0.0..00.....
.....0000.0.....
......0.........
......0.........
.....0.0........
....0.0.........` ],

  [ coin, bitmap`
................
................
................
................
................
.......000......
......06660.....
......06060.....
......06060.....
......06660.....
.......000......
................
................
................
................
................`],

   [pigeon, bitmap`
................
................
................
................
...........L....
....3..L..L1L...
...33LL1LLL0L...
...3L1111101L...
.....L111LLL....
......LLL.......
................
................
................
................
................
................`
],
[background, bitmap`
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
7777777777777777`])



setSolids([])

let level = 0
const levels = [
  map`
....
.p..
....
....`
]

setBackground(background)

setMap(levels[level])



setPushables({
  [ player ]: []
})

//just the movement
onInput("a", () => {
  getFirst(player).x += -1
})

onInput("d", () => {
  getFirst(player).x += 1
})

//game over button
onInput("j", () => {
  clearText()
  setMap(levels[level])
})

//runs every 500 milliseconds and makes the pigeons and coins move up and get deleted and handles coin collecting and spawns new
setInterval(() => {
  //makes coins move up and get deleted if on top
  for (const c of getAll(coin)) {
    if (c.y === 0) {
      c.remove()
    } 
    else {
      c.y -= 1
    }
  }
 //makes pigeon move up and get deleted if on top
  for (const p of getAll(pigeon)) {
    if (p.y === 0) {
      p.remove()
    } 
    else {
      p.y -= 1
    }
  }

  const p = getFirst(player)
 
  for (const c of getAll(coin)) {
    if (p.x === c.x && p.y === c.y) {
      c.remove()
    }
  }
  const bottomrow = height() - 1

  if (getAll(coin).length === 0 && getAll(pigeon).length === 0) {
    //chooses random column for pigeon or coin to spawn
    const randomX = Math.floor(Math.random() * width())
    //randomly chooses whether to spawn coin or pigeon
    if (Math.random() < 0.5) {
      addSprite(randomX, bottomrow, coin)
    } 
    else {
      addSprite(randomX, bottomrow, pigeon)
    }
  }
}, 500)
//makes it so if player touches coin it gets deleted
afterInput(() => {
  for (const c of getAll(coin)) {
    if (getFirst(player).x === c.x && getFirst(player).y === c.y) {
      c.remove()
    }
  }
  for (const b of getAll(pigeon)) {
    if (getFirst(player).x === b.x && getFirst(player).y === b.y) {
        clearText()
        addText("GAME OVER", {x:5, y:6, color: color`3`})
        addText("press J to restart", {x:3, y:8, color: color`3`})
    }
  }
})