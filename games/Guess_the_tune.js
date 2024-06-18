/*

@title: Guess the tune
@author: Sajeg
@tags: []
@addedOn: 2024-00-00
*/
// Changeable global variable
let length = 5
let pressed = []
let need = []

// Sprites of notes
const tune0Key = "p"
const tune1Key = "w"
const tune2Key = "r"
const tune3Key = "t"

setLegend(
  [tune3Key, bitmap`
................
....55555555....
...5555555555...
..555555555555..
.55555555555555.
.55555555555555.
.55555555555555.
.55555555555555.
.55555555555555.
.55555555555555.
.55555555555555.
.55555555555555.
..555555555555..
...5555555555...
....55555555....
................`],
  [tune0Key, bitmap`
................
....77777777....
...7777777777...
..777777777777..
.77777777777777.
.77777777777777.
.77777777777777.
.77777777777777.
.77777777777777.
.77777777777777.
.77777777777777.
.77777777777777.
..777777777777..
...7777777777...
....77777777....
................`],
  [tune1Key, bitmap`
................
....66666666....
...6666666666...
..666666666666..
.66666666666666.
.66666666666666.
.66666666666666.
.66666666666666.
.66666666666666.
.66666666666666.
.66666666666666.
.66666666666666.
..666666666666..
...6666666666...
....66666666....
................`],
  [tune2Key, bitmap`
................
....99999999....
...9999999999...
..999999999999..
.99999999999999.
.99999999999999.
.99999999999999.
.99999999999999.
.99999999999999.
.99999999999999.
.99999999999999.
.99999999999999.
..999999999999..
...9999999999...
....99999999....
................`],
)

// Sounds of the game
const tune0 = tune`
500: B4~500,
15500`
const tune1 = tune`
500: E5~500,
15500`
const tune2 = tune`
500: A5~500,
15500`
const tune3 = tune`
500: F4~500,
15500`

const undo = tune`
150.7537688442211: E4-150.7537688442211,
150.7537688442211: F4-150.7537688442211,
150.7537688442211: E4-150.7537688442211,
150.7537688442211: D4-150.7537688442211,
150.7537688442211: E4-150.7537688442211,
4070.3517587939696`
const lengthUp = tune`
150: B4-150,
150: C5-150,
4500`
const lengthDown = tune`
149.2537313432836: B4-149.2537313432836,
149.2537313432836: A4-149.2537313432836,
4477.611940298508`

const win = tune`
150: F5-150,
150: C5-150,
150: F5-150,
150: B5-150,
4200`
const loose = tune`
150: F4-150,
150: B4-150,
150: F4-150,
150: C4-150,
4200`

// Level map
const level = map`
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
................`
setMap(level)

// Tutorial hints
addText("Press i to start", {
  x: 1,
  y: 4,
  color: color`7`
})

addText("Remember the tunes", {
  x: 1,
  y: 8,
  color: color`3`
})
addText("and repeat them", {
  x: 1,
  y: 10,
  color: color`6`
})

onInput("w", () => {
  playTune(tune0)
  pressed.push(0)
})

onInput("s", () => {
  playTune(tune1)
  pressed.push(1)
})

onInput("d", () => {
  playTune(tune2)
  pressed.push(2)
})

onInput("a", () => {
  playTune(tune3)
  pressed.push(3)
})

onInput("i", () => {
  clearText()
  generateSong();
  updateHud()
})

onInput("j", () => {
  if (length > 0) {
    length -= 1
    playTune(lengthDown)
  }
  updateHud()
})

onInput("l", () => {
  length += 1
  playTune(lengthUp)
})

onInput("k", () => {
  pressed.pop()
  playTune(undo)
})

afterInput(() => {
  updateHud()
  console.log(pressed)
  console.log(need)
  if (pressed.length === need.length && need.length > 0) {
    if (pressed.toString() === need.toString()) {
      playTune(win)
      addText("YOU WIN", {
        x: 6,
        y: 7,
        color: color`6`
      })
    } else {
      playTune(loose)
      addText("YOU LOOSE", {
        x: 6,
        y: 7,
        color: color`3`
      })
    }
  }
})

function generateSong() {
  let song = ``
  need = []
  pressed = []
  for (let i = 0; i < length; i++) {
    const noteNum = getRandomNote()
    need.push(noteNum)
    if (noteNum === 0) {
      song += `500: B4~500,`
    } else if (noteNum === 1) {
      song += `500: E5~500,`
    } else if (noteNum === 2) {
      song += `500: A5~500,`
    } else {
      song += `500: F4~500,`

    }
  }
  song += `14000`
  playTune(song)
}

function updateHud() {
  addText("Undo: k", {
    x: 12,
    y: 14,
    color: color`0`
  })
  addText("Length: " + length, {
    x: 10,
    y: 1,
    color: color`0`
  })
  for (let i = 0; i < pressed.length; i++) {
    console.log(name)
    if (i === 0) {
      if (i < 14) {
        addSprite(1 + i, 6, tune0Key)
      } else if (i < 28) {
        addSprite(1 + (i - 14), 7, tune0Key)
      } else if (i < 42) {
        addSprite(1 + (i - 28), 8, tune0Key)
      }
    } else if (i === 1) {
      if (i < 14) {
        addSprite(1 + i, 6, tune1Key)
      } else if (i < 28) {
        addSprite(1 + (i - 14), 7, tune1Key)
      } else if (i < 42) {
        addSprite(1 + (i - 28), 8, tune1Key)
      }
    }
  }
}

function getRandomNote() {
  return Math.floor(Math.random() * 4);
}