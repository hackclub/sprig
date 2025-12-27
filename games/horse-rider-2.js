/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

Author:Moma120

**What is your game about?**
jumping over obstackles in order to get to the portal

**How do you play your game?**
you move with wasd and jump with ijkl

@title: horse rider 1
@author: Moma120
@tags: [horse, jumping, puzzle]
@addedOn: 2025-12-27
*/

const player = "p"
const fence = "f"
const jumpgate = "j"
const portal = "n"

setLegend(
  [player, bitmap`
.....6666.......
......CCC.......
......CC0.......
......CCC.......
......7575......
......755.5.FFF.
......77555FF0C.
......7775FFCCCC
..CCCC555FFCCCC.
FFCCCC555CCCC...
FFCCCC555CCCC...
FCCCCCLLLCCC....
F.CCCCCCCCCC....
F...CC..CCC.....
...C.C..C.C.....
...C.C.C..C.....`],
  [fence, bitmap`
................
................
................
................
................
................
................
................
CCCCCCCCCCCCCCCC
C..............C
CCCCCCCCCCCCCCCC
C..............C
CCCCCCCCCCCCCCCC
C..............C
CCCCCCCCCCCCCCCC
C..............C`],
  [jumpgate, bitmap`
................
.......333......
.......232......
.......333......
.......232......
.......333......
.......232......
.......333......
.......232......
.......333......
.......232......
.......333......
.......232......
.......333......
.......232......
.......333......`],
  [portal, bitmap`
6363000000003636
36300HHHHHH00363
6300HH5555HH0036
300HH588885HH003
00HH55877855HH00
0HH5588778855HH0
0H558877778855H0
0H588772277885H0
0H588772227785H0
0H558877277885H0
0HH55887778855H0
00HH558878855HH0
300HH5588855HH00
6300HH55555HH003
36300HHHHHHH0036
6363000000000363`]
)

setSolids([fence, jumpgate, player])

let level = 0
const levels = [
  map`
njffffffff
fjj.jf.j.j
.j.fj.f.jf
fj.ff.ff.f
.j.f..j.j.
fjfjfjfjff
fjf.ff.f..
pj.j.j..j.`,
  map`
ffffffffff
pj.j.j.j.j
j.j.j.j..j
j.jffffffn
j.jf....ff
f....ff...`,
  map`
.j.fffn
fj.ffff
.jf.j..
pj..fff`,
  map`
pj.fj
fnf..
ff.j.`,
  map`
.........jnfj.jj
....ff...fffjfjj
f.ffffff..f.j.j.
f.fffpffffffffff
jf.jjfjjf.j..jf.
j.fjj.jjffjjfj..
jf.jjfjj..jj.jfj
j.fjj.jj.fjjfj.j
jf.jjfjjffjj.jfj
j.fjj.jj..jjfj..
jf.j..jj.fjj.jf.
jffjj.j.j.jjfjff
fffffffffffj.j..`,
  map`
...
pjn`
]

setMap(levels[level])

setPushables({
  [player]: [],
})

onInput("s", () => {
  getFirst(player).y += 1
});

onInput("w", () => {
  getFirst(player).y -= 1
});

onInput("d", () => {
  getFirst(player).x += 1
});

onInput("a", () => {
  getFirst(player).x -= 1
});

onInput("j", () => {
  getFirst(player).x -= 2
});

onInput("l", () => {
  getFirst(player).x += 2
});

onInput("i", () => {
  getFirst(player).y -= 2
});

onInput("k", () => {
  getFirst(player).y += 2
});

afterInput(() => {
  // count the number of tiles with goals
  const targetNumber = tilesWith(portal).length;
  
  // count the number of tiles with goals and boxes
  const numberCovered = tilesWith(portal, player).length;

  // if the number of goals is the same as the number of goals covered
  // all goals are covered and we can go to the next level
  if (numberCovered === targetNumber) {
    // increase the current level number
    level = level + 1;

    const currentLevel = levels[level];

    // make sure the level exists and if so set the map
    // otherwise, we have finished the last level, there is no level
    // after the last level
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("you win!", { y: 1, color: color`3` });
    }
  }
});
