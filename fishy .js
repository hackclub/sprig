/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: 
@author: 
@tags: []
@img: ""
@addedOn: 2024-00-00
*/

const player = "p"
const basket = "b"
const fish = "c"
const background = "g"
const myTune = tune `
1000,
500: D4~500,
500: D4~500,
500: D4~500,
500: D4~500,
500: D4~500 + E4~500,
500: E4~500,
500: E4~500,
500: E4~500,
500: E4~500,
500: E4~500,
500: E4~500,
500: E4~500 + D4~500,
500: D4~500,
500: D4~500,
500: D4~500,
500: D4~500,
500: D4~500,
500: D4~500,
500: D4~500 + E4~500,
500: E4~500,
500: E4~500,
500: E4~500 + F4~500,
500: F4~500,
500: F4~500,
500: E4~500 + D4~500,
500: D4~500,
500: D4~500,
500: D4~500,
500: D4~500,
500: D4~500`;

setLegend(
  [ player, bitmap`
................
................
................
.......D........
......D6D.......
.....00D00......
.....0...0......
.....00.00......
.....0...0......
.....00000......
.......0........
......000.......
.......0........
......0.0.......
.....0...0......
................` ],
  [ basket, bitmap`
................
................
................
................
................
................
....777777......
...7L111111.....
...7LL1L11......
...77L11L1......
...7.L1L11......
...7.L1111......
......LLLL......
................
................
................`],
  [ fish, bitmap`
................
................
................
................
................
................
.......9........
.....99999......
....9999909.....
.....999999.....
.......9........
................
................
................
................
................`],
  [ background, bitmap`
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
7777777777777777`]
);

setSolids([])

let level = 0
const levels = [
  map`
gggggggg
gp.....g
g.c....g
ggggg..g
ggbgg..g
g......g
g......g
gggggggg`,
  map`
ggggggggg
g..g...bg
g..g....g
g.......g
g.gggg..g
g.g.c...g
gpg.....g
ggggggggg`,
  map`
ggggggggggg
g.........g
g.........g
g.....g...g
g.....g.ggg
g.ggggg...g
g.....g...g
g...g.ggc.g
gb..gpg...g
ggggggggggg`,
  map`
ggggggggggggg
gg..g.......g
g.c.g.......g
g...........g
ggg......gggg
g.....g..g..p
g...ggg..g..g
g.....g.....g
gg....ggggggg
g..........bg
ggggggggggggg`
]

setSolids([])

setSolids([player, fish, background]);

setMap(levels[level])

setPushables({
  [ player ]: [fish]
})

onInput("s", () => {
  getFirst(player).y += 1; // positive y is downwards
  playTune(myTune);
});

onInput("d", () => {
  getFirst(player).x += 1;
  playTune(myTune);
});

onInput("w", () => {
  getFirst(player).y -= 1; // positive y is downwards
  playTune(myTune);
});

onInput("a", () => {
  getFirst(player).x -= 1;
  playTune(myTune);
});

// input to reset level
onInput("j", () => {
  const currentLevel = levels[level]; // get the original map of the level

  // make sure the level exists before we load it
  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
  }
});

afterInput(() => {
  const targetNumber = tilesWith(basket).length;
  const numberCovered = tilesWith(basket, fish).length;
  if (numberCovered === targetNumber) {
    level = level + 1
    const currentLevel = levels[level];
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("you win!", { y: 6, color: color`5` });
    }
  }
});