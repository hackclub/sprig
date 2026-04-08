/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Monkey Maze
@author: 
@tags: []
@addedOn: 2024-00-00
*/

const player = "p"
const banana = "b"
const wall = "w"

setLegend(
  [ player, bitmap`
................
................
....CCCCCCCC....
...C222CC222C...
...C202CC202C...
CC.C222CC222C.CC
CCC.CCCCCCCC.CCC
.CCC...CC...CCC.
..CCCCCCCCCCCC..
...C99999999C...
...C999CC999C...
...C99999999C...
....CCCCCCCC....
....00.CC.00....
..0000.CC.0000..
..0000.CC.0000..` ],
  [banana, bitmap`
..............44
.........4444444
.........666444.
........6666644.
.......66666664.
......666666064.
.....6666660664.
....666666066...
...666660066....
..666660066.....
.666666066......
.66666066.......
.6666066........
.666066.........
.66666..........
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
)

setSolids([player, wall])

let level = 0
const levels = [
  map`
pwww.www
...w.w.w
ww......
...w.ww.
.www....
......ww
..w.....
..www..b`,
  map`
p....www
..www..w
w.w.w.ww
........
ww.www.w
.w.wb..w
.w.www..
...w.w.w`,
  map`
.w..w...
wwwwwww.
..w.wp..
.bw...w.
.ww.w.w.
...w..w.
.w.w.ww.
.w....w.`,
  map`
..wwww..
.w...ww.
.w.w..w.
.w..w.w.
ww.ww.ww
.p..w..b
..wwwww.
.ww..w..`,
  map`
.w...ww.
ww..w.w.
.w...wb.
...p.ww.
.ww.w...
.ww.w...
.w.wwww.
........`,
  map`
........
.w..www.
..bw....
..w.w.w.
ww.....w
.p.ww.w.
.www.w..
......w.`,
  map`
.......w
.wwwwbww
.w...w..
..w..p..
.w.w..w.
.ww.w...
...w..ww
.w......`,
  map`
b..wb...
..pw..p.
...www..
wwwb.w..
b..w....
.p..w.p.
.....w..
w..w...w`,
]


setMap(levels[level])

setPushables({
  [ player ]: []
})

onInput("s", () => {
  getFirst(player).y += 1
})

onInput("w", () => {
  getFirst(player).y -= 1
})

onInput("d", () => {
  getFirst(player).x += 1
})

onInput("a", () => {
  getFirst(player).x -= 1
})

onInput("l", () => {
  setMap(levels[level]);
});

onInput("k", () => {
  clearText();
  addText("Game Over!", { y: 4, color: color`3` });
  addText(`Your Score: ${level}`, { y: 6, color: color`6` });
  addText("Press L to restart", { y: 8, color: color`7` });
});

onInput("l", () => {
  level = 0;
  clearText();
  setMap(levels[level]);
});

const numberCovered = tilesWith(player, banana).length;

 if (numberCovered === 1) {
    level = level + 1;
  const currentLevel = levels[level];
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("You Win!", { y: 4, color: color`3` });
      addText("Thanks for playing!", { y: 5, color: color`7` });
      addText("Nithishsaran", { y: 6, color: color`C` });
    }
  }

afterInput(() => {
  const numberCovered = tilesWith(player, banana).length;
  if (numberCovered === 1) {
    level = level + 1;
    const currentLevel = levels[level];
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("You Win!", { y: 4, color: color`3` });
      addText("Thanks for playing!", { y: 5, color: color`7` });
      addText("Nithishsaran", { y: 6, color: color`C` });
    }
  }
})