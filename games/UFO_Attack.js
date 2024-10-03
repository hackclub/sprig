/*
@title: UFO Attack
@author: Troy
@tags: ['strategy']
@addedOn: 2022-11-13
*/


const player = "p";
const box = "b";
const goal = "g";
const wall = "w";
const grass = "a";
const block = "l";

setLegend(
  [ player, bitmap`
................
000....000......
0220000220......
.00200200.......
..022220........
..00202000000...
..022200200020..
..022200220020..
..0888802222200.
...0000220020000
....022200020000
....0222000220.0
....0222222220..
.....00000000...
.....0.0..0.0...
................`],
  [ box, bitmap`
................
................
......0000......
....00777700....
...0077777700...
.00110777701100.
0011110000111100
0111311111141110
.00111611511100.
...0011111100...
.....000000.....
....0..66..0....
...0..6666..0...
..0..666666..0..
................
................`],
  [ goal, bitmap`
DDDDF6F6FFFFFFDD
DDDF6F6F666666FD
DDF6F6F66666666F
DDF6F6F666666666
DF6F6F666FF66666
DF6F6F66FF666F66
DF6F6F6666666666
DF6F6F6666FF6666
DF6F6F66F6F66F66
F6F6F666F66F6666
F6F6F6666666F666
F6F6F6666666F66F
F6F6F6666FF6666F
DF6F6F66666666FD
DDF6F6FF66666FDD
DDDF6F66FFFFFDDD`],
  [ wall, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
0000DDDDDDDD0000
0FF0DDDDDDDD0FF0
0FF0000000000FF0
0FFFFFFFFFFFFFF0
0FF0000000000FF0
0FF0000000000FF0
0FFFFFFFFFFFFFF0
0FF0000000000FF0
0FF0DDDDDDDD0FF0
0000DDDDDDDD0000
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD`],
  [ grass, bitmap`
4DDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDD4DDDD4DDD
DDDDDDDDDDDDDDDD
DDD4DDDDDDDDDDDD
DDDDDDDDDDDD4DDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDD4DDDDDDD
DDDDDDDDDDDDDDDD
DD4DDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDD4DDDDD4DDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD`],
  [ block ,  bitmap`
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
0000000000000000`],
);

let level = 0;
const levels = [
  map`
.bg
p..
w..`,
  map`
p.wg
.bw.
....
....`,
  map`
pww.g
.ww..
b..w.
.w.w.
.w...`,
  map`
gw....
.w.w..
.w.w..
.w.w..
.w.w.b
...w.p`,
  map`
...
gp.
...`,
];

const currentLevel = levels[level];
setMap(currentLevel);

setSolids([ player, wall, ]);
setBackground(grass);

setPushables({
  [player]: [box]
});

onInput("s", () => {
  const p = getFirst(player);
  if (p) p.y += 1;
  const b = getFirst(box);
  if (b) b.y += 1;
});

onInput("w", () => {
  const p = getFirst(player);
  if (p) p.y -= 1;
  const b = getFirst(box);
  if (b) b.y -= 1;
});

onInput("d", () => {
  const p = getFirst(player);
  if (p) p.x += 1;
  const b = getFirst(box);
  if (b) b.x += 1;
});

onInput("a", () => {
  const p = getFirst(player);
  if (p) p.x -= 1;
  const b = getFirst(box);
  if (b) b.x -= 1;
});
onInput("j", () => {
  const currentLevel = levels[level];
  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
  }
});

afterInput(() => {
  const targetNumber = tilesWith(player).length;
  
  const numberCovered = tilesWith(player, box).length;

  if (numberCovered === targetNumber) {
    level = 7;

    const currentLevel = levels[level];

    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      setMap( map`
....................
..www..w..w...w.www.
..w...w.w.ww.ww.w...
..www.www.w.w.w.www.
..w.w.w.w.w...w.w...
..www.w.w.w...w.www.
....................
...www.w.w.www.www..
...w.w.w.w.w...w.w..
...w.w.w.w.www.www..
...w.w.w.w.w...ww...
...www..w..www.w.w..
....................`)
    }
  }
});

afterInput(() => {
  const targetNumber = tilesWith(goal).length;
  
  const numberCovered = tilesWith(goal, player).length;

  if (numberCovered === targetNumber) {
    level = level + 1;
    
    const currentLevel = levels[level];

    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("", { y: 4, color: color`3` });
    }
  }
});

afterInput(() => {
  const targetNumber = tilesWith(player).length;
  
  const numberCovered = tilesWith(player, box).length;

  if (numberCovered === targetNumber) {
    level = 7;

    const currentLevel = levels[level];

    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      setMap( map`
....................
..lll..l..l...l.lll.
..l...l.l.ll.ll.l...
..lll.lll.l.l.l.lll.
..l.l.l.l.l...l.l...
..lll.l.l.l...l.lll.
....................
...lll.l.l.lll.lll..
...l.l.l.l.l...l.l..
...l.l.l.l.lll.lll..
...l.l.l.l.l...ll...
...lll..l..lll.l.l..
....................`)
    }
  }
  if (level == 0) {
    addText("Eat the hay", { y: 13, color: color`3` });
    addText("while avoiding", { y: 14, color: color`3` });
    addText("the ufo!!", { y: 15, color: color`3` });
  }

  if (level == 1) {
    clearText()
    addText("ufo moves", { y: 1, color: color`3` });
    addText("when you do", { y: 2, color: color`3` });
  }

  if (level == 2) {
    clearText()
  }

  if (level == 4) {
    clearText()
    addText("YOU WIN", { y: 1, color: color`3` });
    addText("enjoy the hay", { y: 2, color: color`3` });
  }
});
