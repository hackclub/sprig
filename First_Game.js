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
const goal = "g"
const wall = "w"
const box = "b"
setLegend(
  [player, bitmap`
................
................
.......666......
.......6.6......
......6..66.....
......6...6.6...
....6667.76.6...
....6.6.F.666...
....6.6H.H6.....
......6.H.6.....
.....6....6.....
.....6...6......
......666.......
......6.6.......
.....66.66......
................`],
  [goal, bitmap`
................
................
................
................
....3.....3.....
.....3...3......
......3.3.......
.......3........
......3.3.......
.....3...3......
....3.....3.....
................
................
................
................
................`],
  [box, bitmap`
................
................
................
................
....DDDDDDD.....
....DD...DD.....
....D.D.D.D.....
....D..D..D.....
....D.D.D.D.....
....DD...DD.....
....DDDDDDD.....
................
................
................
................
................`],
  [wall, bitmap`
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
);

setSolids([player, wall, box])

let level = 0;
const levels = [
  map`
p..w..
...w..
.b....
...w..
...w.g`,
  map`
.....p
......
......
.....g
..b...
......`,
  map`
g....
...b.
.www.
.....
p....`,
  map`
.....
.b...
www.w
.....
g...p`
]
const currentlevel = levels[level];
setMap(currentlevel);

setPushables({
  [player]: [box]
})
onInput("s", () => {
  getFirst(player).y += 1;
});

onInput("d", () => {
  getFirst(player).x += 1;
});

onInput("w", () => {
  getFirst(player).y -= 1;
});
onInput("a", () => {
  getFirst(player).x -= 1;
});
onInput("k", () => {
  playTune(myTune);
});
onInput("j", () => {
  const currentLevel = levels[level];
  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
  }
});
afterInput(() => {
  const targetNumber = tilesWith(goal).length;
  const numberCovered = tilesWith(goal, box).length;
  if (numberCovered === targetNumber) {
    level = level + 1;
    const currentLevel = levels[level];
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("Win!!!", { y: 4, color: color`3` });
    }
  }
});
const myTune = tune`
500: G5~500 + B4^500,
500: D5-500 + B4^500,
500: G5~500 + B4/500,
500: D5-500 + B4^500,
500: G5~500 + B4^500,
500: D5-500 + B4/500,
500: G5~500 + B4^500,
500: D5-500 + B4^500,
500: G5~500 + B4/500,
500: D5-500 + B4^500,
500: G5~500 + B4^500,
500: D5-500 + B4/500,
500: G5~500 + B4^500,
500: D5-500 + B4^500,
500: G5~500 + B4/500,
500: D5-500 + B4^500,
500: G5~500 + B4^500,
500: D5-500 + B4/500,
500: G5~500 + B4^500,
500: D5-500 + B4^500,
500: G5~500 + B4/500,
500: D5-500 + B4^500,
500: G5~500 + B4^500,
500: D5-500 + B4/500,
500: G5~500 + B4^500,
500: D5-500 + B4^500,
500: G5~500 + B4/500,
500: D5-500 + B4^500,
500: G5~500 + B4^500,
500: D5-500 + B4/500,
500: G5~500 + B4^500,
500: D5-500 + B4^500`;