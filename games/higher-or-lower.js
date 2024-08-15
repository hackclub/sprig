/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Higher Lower v2
@author: Kipp-ie 
@tags: []
@addedOn: 2024-08-15
*/



setSolids([])

let level = 0
const levels = [
  map`
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................`
]

setMap(levels[level])
const losesound = tune`
97.40259740259741: D5~97.40259740259741,
97.40259740259741: D5~97.40259740259741,
97.40259740259741: C5~97.40259740259741,
97.40259740259741: B4~97.40259740259741,
97.40259740259741: A4~97.40259740259741,
97.40259740259741: G4~97.40259740259741,
97.40259740259741: G4~97.40259740259741,
2435.064935064935`
const winsound = tune`
98.36065573770492: F4~98.36065573770492,
98.36065573770492: F4~98.36065573770492,
98.36065573770492: G4~98.36065573770492,
98.36065573770492: A4~98.36065573770492,
98.36065573770492: B4~98.36065573770492,
98.36065573770492: C5~98.36065573770492,
98.36065573770492: C5~98.36065573770492,
2459.0163934426228`

addText("Higher or Lower", {x: 3, y:1});
var gamestarted = 0
var number = 0
var number2 = 0
var score = 0
if (gamestarted == 0) {
  addText("Press A", {x: 6, y:8});
}

onInput("a", () => {
  if (gamestarted == 0) {
    clearText()
    addText("Higher W - Lower S", {x:1, y:3});
    addText("Higher or Lower", {x: 3, y:1});
    number = Math.floor(Math.random() * 10 + 1);
    addText(String(number), {x: 9, y: 10});
    gamestarted = 1
    addText("Score: " + score, {x: 7, y: 2});
  }
})

onInput("w", () => {
  if (gamestarted == 1) {
    number2 = Math.floor(Math.random() * 10 + 1);
    addText("The number was:", {x:3, y:12});
    addText(String(number2), {x: 9, y: 13, color: color`1`});
    if (number <= number2) {
      addText("You win! +1 score", {x: 2, y: 14, color: color`4`});
      gamestarted = 0
      score = score + 1
      addText("Press A", {x:6, y: 8})
      playTune(winsound)
      
      
    } else {
      addText("You lose!", {x: 5, y: 14, color:color`3`});
      gamestarted = 0
      score = 0
      addText("Press A", {x:6, y: 8})
      playTune(losesound)

    }
  }
})

onInput("s", () => {
  if (gamestarted == 1) {
    number2 = Math.floor(Math.random() * 10 + 1);
    addText("The number was:", {x:3, y:12});
    addText(String(number2), {x: 9, y: 13, color:color`1`});
    if (number >= number2) {
      addText("You win! +1 score", {x: 2, y: 14, color: color`4`});
      gamestarted = 0
      score = score + 1
      addText("Press A", {x:6, y: 8})
      playTune(winsound)
      
      
    } else {
      addText("You lose!", {x: 5, y: 14, color:color`3`});
      gamestarted = 0
      score = 0
      addText("Press A", {x:6, y: 8})
      playTune(losesound)

    }
  }
})

