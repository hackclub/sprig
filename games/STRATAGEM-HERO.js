/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: STRATAGEM HERO
@author: XyrusB2010
@tags: []
@addedOn: 2025-02-20
*/

const upIdle = "a"
const rightIdle = "b"
const downIdle = "c"
const leftIdle = "d"

const upActive = "e"
const rightActive = "f"
const downActive = "g"
const leftActive = "h"

const reinforce = "i"
const sos = "j"
const resupply = "k"
const precisionStrike = "l"
const machineGun = "m"
const hellbomb = "n"

const black = "0"

setLegend(
  [upIdle, bitmap`
................
................
.......11.......
......1111......
.....111111.....
....11111111....
...1111111111...
..111111111111..
..111111111111..
.....111111.....
.....111111.....
.....111111.....
.....111111.....
.....111111.....
................
................`],
  [rightIdle, bitmap`
................
................
.......11.......
.......111......
.......1111.....
..1111111111....
..11111111111...
..111111111111..
..111111111111..
..11111111111...
..1111111111....
.......1111.....
.......111......
.......11.......
................
................`],
  [downIdle, bitmap`
................
................
.....111111.....
.....111111.....
.....111111.....
.....111111.....
.....111111.....
..111111111111..
..111111111111..
...1111111111...
....11111111....
.....111111.....
......1111......
.......11.......
................
................`],
  [leftIdle, bitmap`
................
................
.......11.......
......111.......
.....1111.......
....1111111111..
...11111111111..
..111111111111..
..111111111111..
...11111111111..
....1111111111..
.....1111.......
......111.......
.......11.......
................
................`],

  [upActive, bitmap`
................
................
.......66.......
......6666......
.....666666.....
....66666666....
...6666666666...
..666666666666..
..666666666666..
.....666666.....
.....666666.....
.....666666.....
.....666666.....
.....666666.....
................
................`],
  [rightActive, bitmap`
................
................
.......66.......
.......666......
.......6666.....
..6666666666....
..66666666666...
..666666666666..
..666666666666..
..66666666666...
..6666666666....
.......6666.....
.......666......
.......66.......
................
................`],
  [downActive, bitmap`
................
................
.....666666.....
.....666666.....
.....666666.....
.....666666.....
.....666666.....
..666666666666..
..666666666666..
...6666666666...
....66666666....
.....666666.....
......6666......
.......66.......
................
................`],
  [leftActive, bitmap`
................
................
.......66.......
......666.......
.....6666.......
....6666666666..
...66666666666..
..666666666666..
..666666666666..
...66666666666..
....6666666666..
.....6666.......
......666.......
.......66.......
................
................`],

  [reinforce, bitmap`
6666666666666666
6000000000000006
6000000000000006
6000000000010006
6000000000010006
6000001101111106
6000011110010006
6000110011010006
6000111111000006
6000011110000006
6000001100000006
6001110011100006
6001111111100006
6000000000000006
6000000000000006
6666666666666666`],
  [sos, bitmap`
6666666666666666
6000000000000006
6000111111110006
6001000000001006
6000011111100006
6000100000010006
6000001111000006
6000010000100006
6000000000000006
6011101111011106
6010001001010006
6011101001011106
6000101001000106
6011101111011106
6000000000000006
6666666666666666`],
  [resupply, bitmap`
6666666666666666
6000000000000006
6000000000000006
6066661001666606
6066661111666606
6006661111666006
6000661111660006
6000100110010006
6000111111110006
6000111111110006
6000111111110006
6000006666000006
6000000660000006
6000000000000006
6000000000000006
6666666666666666`],
  [precisionStrike, bitmap`
3333333333333333
3000000000000003
3000111LL1110003
3000011LL1100003
3000001LL1000003
3000000LL0000003
3000000110000003
3000000000000003
3000000330000003
3000030000300003
3003303003033003
3000000000000003
3033033003303303
3033033003303303
3000000000000003
3333333333333333`],
  [machineGun, bitmap`
7777777777777777
7000000000000007
7000000000000007
7000LLLLLLL10007
7000000000000007
7000LLLLLLL10007
7000000000000007
7000LLLLLLL10007
7000000000000007
7000007700000007
7077777777777707
7070070770000007
7000000770000007
7000000000000007
7000000000000007
7777777777777777`],
  [hellbomb, bitmap`
6666666666666666
6000000000000006
6000011111100006
6000111111110006
6000111111110006
6000011111100006
6000000110000006
6000011111100006
6000011111100006
6000000110000006
6000000110000006
6000001111000006
6000101111010006
6001111111111006
6000000000000006
6666666666666666`],

  [black, bitmap`
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

let odd = 0
let even = 1
const levels = [
  map`
.........
.........
.........
.........
.........
.........
.........
.........`,
  map`
..........
..........
..........
..........
..........
..........
..........
..........`
]

let order = []
let currentIndex = 0
let startIndex = 0
let mapWidth = 0

function activateArrow(index) {
  let tile = getTile(startIndex + index, 5)[0];

  if (tile.type === upIdle) tile.type = upActive;
  if (tile.type === rightIdle) tile.type = rightActive;
  if (tile.type === downIdle) tile.type = downActive;
  if (tile.type === leftIdle) tile.type = leftActive;
}

function resetStratagem() {
  currentIndex = 0;

  for (let i = 0; i < order.length; i++) {
    let tile = getTile(startIndex + i, 5)[0];

    if (tile.type === upActive) tile.type = upIdle;
    if (tile.type === rightActive) tile.type = rightIdle;
    if (tile.type === downActive) tile.type = downIdle;
    if (tile.type === leftActive) tile.type = leftIdle;
  }
}

function handleInput(expected) {
  if (order[currentIndex] === expected) {
    activateArrow(currentIndex);
    currentIndex++;

    // Finished stratagem
    if (currentIndex >= order.length) {
      setTimeout(() => {
        loadStratagem();
      }, 500);
    }

  } else {
    resetStratagem();
  }
}

onInput("w", () => handleInput(upIdle));
onInput("d", () => handleInput(rightIdle));
onInput("s", () => handleInput(downIdle));
onInput("a", () => handleInput(leftIdle));
onInput("i", () => handleInput(upIdle));
onInput("l", () => handleInput(rightIdle));
onInput("k", () => handleInput(downIdle));
onInput("j", () => handleInput(leftIdle));

function centerArrows(arrows) {
  if (mapWidth === even) {
    size = 10
  } else {
    size = 9
  }
  
  const result = new Array(size).fill(black);
  const letters = arrows.split("")
  const startIndex = Math.floor((size - letters.length) / 2);

  for (let i = 0; i < letters.length; i++) {
    letters[i] = letters[i].replaceAll("u", upIdle).replaceAll("r", rightIdle).replaceAll("d", downIdle).replaceAll("l", leftIdle)
  }

  for (let i = 0; i < letters.length; i++) {
    result[startIndex + i] = letters[i];
  }

  return [result, letters, startIndex];
}

const stratagems = [
  { title: "Reinforce", sprite: reinforce, code: "udrlu" },
  { title: "SOS Beacon", sprite: sos, code: "udru" },
  { title: "Resupply", sprite: resupply, code: "ddur" },
  { title: "Precision Strike", sprite: precisionStrike, code: "rru" },
  { title: "Machine Gun", sprite: machineGun, code: "dldur" },
  { title: "HELLBOMB", sprite: hellbomb, code: "duldurdu"}
]

function loadStratagem() {
  let toLoad = Math.floor(Math.random() * stratagems.length);
  let current = stratagems[toLoad];

  if (current.code.length % 2 === 0) {
    mapWidth = even
  } else {
    mapWidth = odd
  }

  clearText();
  setMap(levels[mapWidth]);
  setBackground(black)
  currentIndex = 0;

  addText("STRATAGEM HERO", {
    y: 3,
    color: color`6`
  });

  addText(current.title, {
    y: 9,
    color: color`6`
  });

  addSprite(4, 3, current.sprite);

  let result = centerArrows(current.code);
  let layout = result[0];
  order = result[1];
  startIndex = result[2];

  for (let i = 0; i < layout.length; i++) {
    addSprite(i, 5, layout[i]);
  }
}

loadStratagem()

const arrowSound = tune`
202.7027027027027: E5-202.7027027027027,
6283.783783783784`
afterInput(() => {
  playTune(arrowSound)
})