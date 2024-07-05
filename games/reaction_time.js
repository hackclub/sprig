/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Reaction Time
@author: Tyler Bordeaux
@tags: []
@addedOn: 2024-07-05
*/

const button = "b"
const colors = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]

let startTime = 0
let fastestTime = Infinity

setLegend(
  [ button, bitmap`
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
0000000000000000`]
)

setSolids([])

let level = 0
const levels = [
  map`
.....
.....
..b..
.....
.....`
]

setMap(levels[level])

function randomColor() {
  const colorIndex = Math.floor(Math.random() * colors.length)
  return colors[colorIndex]
}

function changeButtonColor() {
  const newColor = randomColor()
  setLegend(
    [ button, bitmap`
${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}
${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}
${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}
${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}
${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}
${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}
${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}
${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}
${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}
${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}
${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}
${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}
${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}
${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}
${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}
${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}${newColor}`]
  )
  startTime = Date.now()
}

function startGame() {
  changeButtonColor()
  setTimeout(changeButtonColor, Math.random() * 3000 + 1000)
}

onInput("a", () => {
  const currentTime = Date.now()
  const reactionTime = currentTime - startTime
  if (reactionTime < fastestTime) {
    fastestTime = reactionTime
    clearText()
    addText(` Fastest: ${fastestTime} ms`, { x: 2, y: 2, color: color`0` })
  }
  startGame()
})

startGame()
