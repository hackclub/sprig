
/* 
@title: run
@author: Nguyễn Gia Bách
@tags: ['puzzle']
@addedOn: 2023-07-20
*/

    /*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started
*/

const player = "p"

var score = 0

var hit1 = false
var hit2 = false
var hit3 = false
var hit4 = false

const rocket1 = "r"
const d1 = "left"

const rocket2 = "s"
const d2 = "right"

const rocket3 = "t"
const d3 = "up"

const rocket4 = "u"
const d4 = "down"

setLegend(
  [ player, bitmap`
................
.....777777.....
....77777777....
....77777777....
....77777777....
....77777777....
....77777777....
....77777777....
.....777777.....
.......77.......
.....777777.....
....7..77..7....
...7..7..7..7...
......7..7......
......7..7......
................` ],
  [ rocket1, bitmap`
................
................
.....333333.....
...3333333333...
...3333333333...
..333333333333..
..333333333333..
..333333333333..
..333333333333..
..333333333333..
..333333333333..
...3333333333...
...3333333333...
.....333333.....
................
................`],
  [ rocket2, bitmap`
................
................
.....333333.....
...3333333333...
...3333333333...
..333333333333..
..333333333333..
..333333333333..
..333333333333..
..333333333333..
..333333333333..
...3333333333...
...3333333333...
.....333333.....
................
................`],
  [ rocket3, bitmap`
................
................
.....333333.....
...3333333333...
...3333333333...
..333333333333..
..333333333333..
..333333333333..
..333333333333..
..333333333333..
..333333333333..
...3333333333...
...3333333333...
.....333333.....
................
................`],
  [ rocket4, bitmap`
................
................
.....333333.....
...3333333333...
...3333333333...
..333333333333..
..333333333333..
..333333333333..
..333333333333..
..333333333333..
..333333333333..
...3333333333...
...3333333333...
.....333333.....
................
................`]
)

setSolids([])

let level = 0
const levels = [
  map`
r.......u
.........
.........
.........
....p....
.........
.........
.........
t.......s`,
  map`
....
....
....
....`,
  map`
....
....
....
....`
]

setMap(levels[level])

setPushables({
  [ player ]: []
})

onInput("s", () => {
  if (level == 0)
  getFirst(player).y += 1
})

onInput("w", () => {
  if (level == 0)
  getFirst(player).y -= 1
})

onInput("a", () => {
  if (level == 0)
  getFirst(player).x -= 1
})

onInput("d", () => {
  if (level == 0)
  getFirst(player).x += 1
})

afterInput(() => {
  if (level == 1) {
    level = 0
    clearText()
    setMap(levels[level])
    setTimeout(update,500)
  }
  if (level == 2) {
    level = 0
    clearText()
    setMap(levels[level])
    setTimeout(update,500)
  }
})

level = 2
setMap(levels[level])
addText('Press any button',{x: 2, y: 7, color: color`3`})
addText('to start',{x: 6, y: 8, color: color`3`})

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function die() {
  level = 1
  setMap(levels[level])
  clearText()
  addText('Your score is:'+score,{x: 2, y: 6, color: color`3`})
  addText('Press any button',{x: 2, y: 7, color: color`3`})
  addText('to play again',{x: 4, y: 8, color: color`3`})
  score = 0
}

function update() {
  if (hit1){
    getFirst(rocket1).x = 0
    getFirst(rocket1).y = getRandomInt(1,height()-1)
    hit1 = false
  }

  if (hit2){
    getFirst(rocket2).x = width()-1
    getFirst(rocket2).y = getRandomInt(1,height()-1)
    hit2 = false
  }

  if (hit3){
    getFirst(rocket3).y = height()-1
    getFirst(rocket3).x = getRandomInt(1,width()-1)
    hit3 = false
  }

  if (hit4){
    getFirst(rocket4).y = 0
    getFirst(rocket4).x = getRandomInt(1,width()-1)
    hit4 = false
  }
  
  getFirst(rocket1).x += 1
  if (getFirst(rocket1).x == width()-1) {
    hit1 = true
  }

  getFirst(rocket2).x -= 1
  if (getFirst(rocket2).x == 0) {
    hit2 = true
  }

  getFirst(rocket3).y -= 1
  if (getFirst(rocket3).y == 0) {
    hit3 = true
  }

  getFirst(rocket4).y += 1
  if (getFirst(rocket4).y == height()-1) {
    hit4 = true
  }

  if (getFirst(player).x == getFirst(rocket4).x 
      && getFirst(player).y == getFirst(rocket4).y) {
    die()
	return
  }

  if (getFirst(player).x == getFirst(rocket3).x 
      && getFirst(player).y == getFirst(rocket3).y) {
    die()
	return
  }

  if (getFirst(player).x == getFirst(rocket2).x 
      && getFirst(player).y == getFirst(rocket2).y) {
    die()
	return
  }

  if (getFirst(player).x == getFirst(rocket1).x 
      && getFirst(player).y == getFirst(rocket1).y) {
    die()
	return
  }

  score += 1
  addText(''+score)
  
  setTimeout(update,500)
}
