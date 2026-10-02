/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Beat Drop
@description: 
@author: 
@tags: ['tag1', 'tag2']
@addedOn: 2026-10-02
*/

const leftButton = "z"
const midLeftButton = "x"
const midRightButton = "c"
const rightButton = "v"
const leftButtonPressed = "b"
const midLeftButtonPressed = "n"
const midRightButtonPressed = "m"
const rightButtonPressed = ","
const bubble = "t"
const background = "o"
var score = 0
var misses = 0
var timeLeft = null
var timerDur = null
var totalShots = null
var gameStart = false

setLegend(
   [ bubble, bitmap`
................
...0000000000...
..0888888888H0..
.0888888888H8H0.
.08888888888H80.
.0888888888H8H0.
.08888888888HH0.
.0888888888H8H0.
.08888888888HH0.
.088888H8H8H8H0.
.088H8H8H8H8HH0.
.08H8H8HHHHHHH0.
.0H8HHHHHHHHHH0.
..0HHHHHHHHHH0..
...0000000000...
................` ],
  [ leftButtonPressed, bitmap`
...3333333333...
..322222222223..
.32333333333323.
3233232323232323
3232323232323323
3233222322232323
3232322222223323
3233232232232323
3232322322323323
3233222222232323
3232323222223323
3233232323232323
3232323232323323
.32333333333323.
..322222222223..
...3333333333...` ],  
  [ midLeftButtonPressed, bitmap`
...5555555555...
..522222222225..
.52555555555525.
5255252525252525
5252525252525525
5255222522252525
5252522222225525
5255252252252525
5252522522525525
5255222222252525
5252525222225525
5255252525252525
5252525252525525
.52555555555525.
..522222222225..
...5555555555...` ],  
  [ midRightButtonPressed, bitmap`
...6666666666...
..622222222226..
.62666666666626.
6266262626262626
6262626262626626
6266222622262626
6262622222226626
6266262262262626
6262622622626626
6266222222262626
6262626222226626
6266262626262626
6262626262626626
.62666666666626.
..622222222226..
...6666666666...` ],  
  [ rightButtonPressed, bitmap`
...4444444444...
..422222222224..
.42444444444424.
4244242424242424
4242424242424424
4244222422242424
4242422222224424
4244242242242424
4242422422424424
4244222222242424
4242424222224424
4244242424242424
4242424242424424
.42444444444424.
..422222222224..
...4444444444...` ],
  [ leftButton, bitmap`
................
...0000000000...
..011111111110..
.01111111111110.
.01111111111110.
.01111111111110.
.01111111111110.
.01111111111110.
.01111111111110.
.01111111111110.
.01111111111110.
.01111111111110.
.01111111111110.
..011111111110..
...0000000000...
................` ],
  [ midLeftButton, bitmap`
................
...0000000000...
..011111111110..
.01111111111110.
.01111111111110.
.01111111111110.
.01111111111110.
.01111111111110.
.01111111111110.
.01111111111110.
.01111111111110.
.01111111111110.
.01111111111110.
..011111111110..
...0000000000...
................` ],
  [ midRightButton, bitmap`
................
...0000000000...
..011111111110..
.01111111111110.
.01111111111110.
.01111111111110.
.01111111111110.
.01111111111110.
.01111111111110.
.01111111111110.
.01111111111110.
.01111111111110.
.01111111111110.
..011111111110..
...0000000000...
................` ],
  [ rightButton, bitmap`
................
...0000000000...
..011111111110..
.01111111111110.
.01111111111110.
.01111111111110.
.01111111111110.
.01111111111110.
.01111111111110.
.01111111111110.
.01111111111110.
.01111111111110.
.01111111111110.
..011111111110..
...0000000000...
................` ],
  [ background, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`]
)

setSolids([])

let level = 0
const levels = [
  map`
....
....
....
....
....
....
....
....
....
zxcv`
]

setMap(levels[level])
setBackground(background)

function showScore () {
  clearText()
  if (timeLeft > 0){
    addText("Score: " + score, { x:1, y:1, color: color`2` })
    addText("Misses: " + misses, { x:1, y:2, color: color`2` })
    addText("Time: " + timeLeft, { x:1, y:3, color: color`2` })
  } else if (timeLeft == null){
    addText("Score: " + score, { x:1, y:1, color: color`2` })
    addText("Misses: " + misses, { x:1, y:2, color: color`2` })
  } else {
    let acc = 0
    if (totalShots > 0) {
      acc = Math.round((score / totalShots) * 100)
    }

    let popped = 0
    if (score + misses > 0) {
      popped = Math.round((score / totalShots) * 100)
    }
    addText("Game Over!", { x: 5, y: 1, color: color`2`})
    addText("Final Score: " + score, { x: 2, y:3, color: color`2`})
    addText("Total Misses: " + misses, { x:2, y:4, color: color`2` })
    addText("In a Time Of: " + timerDur, { x:2, y:5, color: color`2` })
    addText("Accuracy:" + acc + "%", { x:2, y:6, color: color`2` })
    addText("Popped " + popped + "%", { x:2, y:7, color: color`2` })

    if (score > 200 && misses < score) {
      addText("You are a popping", { x:1, y:10, color: color`2`})
      addText("master!", { x:3, y:11, color: color`2`})
    } else if (score == 0) {
      addText("Haha, very funny.", { x:2, y:10, color: color`2`})
    }
  }
}

          
//button input
onInput("s", () => {
  if (gameStart == true){  
    totalShots += 1
  }
  
  addSprite(0, 9, leftButtonPressed)

  setTimeout(() => {
    getFirst(leftButtonPressed).remove()
  }, 100)

  let bubbles = getAll(bubble)

  for (let i = 0; i < bubbles.length; i++) {
    if (bubbles [i].x == 0 && bubbles[i].y >= 9) {
      bubbles[i].remove()
      score += 1
    }
  }
})

onInput("d", () => {
    
  if (gameStart == true){  
    totalShots += 1
  }
  
  addSprite(1, 9, midLeftButtonPressed)

  setTimeout(() => {
    getFirst(midLeftButtonPressed).remove()
  }, 100)

  let bubbles = getAll(bubble)

  for (let i = 0; i < bubbles.length; i++) {
    if (bubbles [i].x == 1 && bubbles[i].y >= 9) {
      bubbles[i].remove()
      score += 1
    }
  }
})

onInput("j", () => {
    
  if (gameStart == true){  
    totalShots += 1
  }
  
  addSprite(2, 9, midRightButtonPressed)

  setTimeout(() => {
    getFirst(midRightButtonPressed).remove()
  }, 100)

  let bubbles = getAll(bubble)

  for (let i = 0; i < bubbles.length; i++) {
    if (bubbles [i].x == 2 && bubbles[i].y >= 9) {
      bubbles[i].remove()
      score += 1
    }
  }
})

onInput("k", () => {
  
  if (gameStart == true){  
    totalShots += 1
  }
  
  addSprite(3, 9, rightButtonPressed)

  setTimeout(() => {
    getFirst(rightButtonPressed).remove()
  }, 100)

  let bubbles = getAll(bubble)

  for (let i = 0; i < bubbles.length; i++) {
    if (bubbles [i].x == 3 && bubbles[i].y >= 9) {
      bubbles[i].remove()
      score += 1
    }
  }
})

onInput("a", () => {
  if (gameStart == false){
    gameStart = true
    loop()
  }
})

//bubble spawn and fall logic
function fall() {
  if (timeLeft > 0) {
    let bubbles = getAll(bubble)
    
    for (let i = 0; i < bubbles.length; i++) {
  
      if (bubbles[i].y == 9) {
  
        bubbles[i].remove()
        misses += 1
      } else {
  
        bubbles[i].y += 1
      }
    }
  
    let lane = Math.floor(Math.random() * 4)
    addSprite(lane, 0, bubble)
  
    let waitTime = 400 - score * 2
  
    if (waitTime < 120) {
      waitTime = 120
    }
  
    setTimeout(fall, waitTime)
  } else {
    setTimeout(fall, 400)
  }
}

function timer() {
  if(timeLeft == null){
    timeLeft = 60 + Math.floor(Math.random() * 61)
    timerDur = timeLeft
  }else{
    if(timeLeft > 0){
      timeLeft -= 1
    } else {
      timeLeft = 0
    }
  }
}

function startScreen() {
  addText("Drop Beat", { x:3, y:3, color: color`2`})
  addText("Press the a key", { x:1, y:9, color: color`2`})
  addText("to start!", { x:1, y:10, color: color`2`})
  addText("v1.2", { x:15, y:14, color: color`2`})
}

function loop() {
  if (gameStart == true){
    setTimeout(fall, 400)
    setInterval(timer, 1000)
    setInterval(showScore, 20)
  } else {
    startScreen()
  }
}

loop()