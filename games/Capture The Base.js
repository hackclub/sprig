/* 
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Capture The Base
@author: 
@tags: []
@addedOn: 2025-00-00
*/

const player = "1"
const player2 = "2"
const p1base = "f"
const p2base = "w"
const back = "b"

setLegend(
  [ player, bitmap`
................
..33..33..3.....
.333..393.3.....
.393..393.33....
.393.33933333...
3393339999993...
399999999999333.
399902999029993.
999900999009993.
999999999999999.
999999999999999.
999999999999999.
.66999999999996.
.66666666666666.
...6666666666...
................`], [player2, bitmap`
.......55.......
......5775......
.....557755.....
....55777755....
...5577777755...
..557777777755..
..577777777775..
..577027702775..
.55770077007755.
.57777777777775.
5777777777777775
5777777777777775
5777777777777775
5577777777777755
.55555555555555.
...5555555555...`], [p1base, bitmap`
9696969696969696
6969696969696969
9699999999999996
6999999299999969
9699992329999996
6999923329999969
9699232329999996
6999922329999969
9699992329999996
6999992329999969
9699992329999996
6999999299999969
9699999999999996
6999999999999969
9696969696969696
6969696969696969`], [p2base, bitmap`
7777777777777777
7775555555555777
7755555555555577
7575550000555757
7755507777055577
7575070007055757
7755070007055577
7575555070555757
7755550705555577
7575507000555757
7755077777055577
7575500000555757
7755555555555577
7755555555555577
7775555555555777
7777777777777777`], [back, bitmap`
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444`]
)

setSolids([player, player2])

let level = 0
let scoreW = 0
let scoreF = 0
let finished = 0
const levels = [
  map`
............
............
..1........w
f........2..
............
............`
]

function touching(sprite1, sprite2) {
  return sprite1.x === sprite2.x && sprite1.y === sprite2.y;
}

setMap(levels[level])
setBackground(back)

setPushables({
  [player]: [player2],
  [player2]: [player]
})

function move(player, d) {
  if (finished) return;
  if (player == "1") {
    switch (d) {
      case "l":
        getFirst(player).x -= 1
        break;
      case "r":
        getFirst(player).x += 1
        break;
      case "u":
        getFirst(player).y -= 1
        break;
      case "d":
        getFirst(player).y += 1
    }
  } else if (player == "2") {
    switch (d) {
      case "l":
        getFirst(player2).x -= 1
        break;
      case "r":
        getFirst(player2).x += 1
        break;
      case "u":
        getFirst(player2).y -= 1
        break;
      case "d":
        getFirst(player2).y += 1
        break;
    }
  }

}

function drawScore() {
  addText("Water: " + scoreW, {x: 10, y: 0, color: color`5`})
  addText("Fire: " + scoreF, {x: 10, y: 2, color: color`3`})
}

function clear() {
  setMap(levels[level])
  clearText()
  finished = 0
}

function check() {
  if (finished) return;
  if (touching(getFirst(player), getFirst(p2base))) {
    scoreF += 1
    addText("Fire won!", {x: 0, y: 2, color: color`3`})
    drawScore()
    setTimeout(clear, 5000)
    finished = 1
  } else if (touching(getFirst(player2), getFirst(p1base))) {
    scoreW += 1
    addText("Water won!", {x: 0, y: 2, color: color`5`})
    drawScore()
    setTimeout(clear, 5000)
    finished = 1
  }
}

onInput("s", () => {
  move("1", "d")
})
onInput("k", () => {
  move("2", "d")
})
onInput("w", () => {
  move("1", "u")
})
onInput("i", () => {
  move("2", "u")
})
onInput("a", () => {
  move("1", "l")
})
onInput("j", () => {
  move("2", "l")
})
onInput("d", () => {
  move("1", "r")
})
onInput("l", () => {
  move("2", "r")
})
afterInput(() => {
    check()
})

drawScore()