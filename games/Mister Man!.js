//controls are I, J, K, L, and W for reset

//define the sprites in our game

const box = "b"
const goal = "g"
const wall = "w"
const MrMan = "p"
const player2 = "2"
const player3 = "3"
const player4 = "4"
const player5 = "5"
const player6 = "6"
const decorate = "d"
const trophie = "t"
const block = "l"
// assign bitmap art to each sprite
setLegend(

  [ box, bitmap`
8888888888888888
8HHHHHHHHHHHHHHH
8H9999999999999H
8H9LLLLLLLLLLL9H
8H9L3333L5555L9H
8H9L3333L5555L9H
8H9L3333L5555L9H
8H9L3333L5555L9H
8H9LLLLLLLLLLL9H
8H9L4444L6666L9H
8H9L4444L6666L9H
8H9L4444L6666L9H
8H9L4444L6666L9H
8H9LLLLLLLLLLL9H
8H9999999999999H
8HHHHHHHHHHHHHHH`],
  [ goal, bitmap`
.00000000000000.
.07777777777770.
.07777000077770.
.07777770077770.
.07777700077770.
.07777707777770.
.07777777777770.
.07777707777770.
.07777777777770.
.00000000000000.
.0L0L0L0L0L0LL0.
.00000000000000.
.0L0000000L0LL0.
.0L0LLLLL0L0LL0.
..000000000000..
................`],
  [ wall, bitmap`
..055555777770..
..055557777770..
..055555777770..
..055557777770..
..055555777770..
..0595536747H0..
..0903306000H0..
..0900306040H0..
..0909006040H0..
..0909906000H0..
..099999HHHHH0..
..09999H9HHHH0..
..099999HHHHH0..
..0999HH8HHHH0..
..09988888H8H0..
..0988888888H0..`],
  [ MrMan, bitmap`
................
.....00000......
....0CCCCC0.....
....0C0C0C0.....
....0CCCCC0.....
....0CCCCC0.....
....0C0C0C0.....
....0C000C0.....
....0CCCCC0.....
.C...00000...C..
..0.0476190.0...
...00H383H00....
....0916740.....
....0000000.....
.....0...0......
.....00..00.....`],
  [ player2, bitmap`
...000000000....
..06666666660...
..06606660660...
..06666666660...
..06666666660...
..06606660660...
..03360006330...
6.03366666330.6.
0..000000000..0.
0...090D070...0.
0000990D0770000.
...0090D0700....
..0440H030880...
.04440HH008880..
..00000000000...
...0.......0....`],
  [ player3, bitmap `
................
................
...000000000....
...0.......0....
...0.0...0.0....
...0.......0....
...0..000..0....
...0.......0....
...000000000....
.......0........
..0000.0.0000...
.....00000......
.......0........
......000.......
.....00.00......
....00...00.....`],
  [ player4, bitmap `
................
......00000.....
...0000CCC00....
...0330C0CC0....
...0C3CCCCC0....
...00C000330....
....00CCCC00....
.C...000000..C..
.00..00660..00..
..00.00660.00...
....00066000....
......0000......
......0.00......
......0..CCCC...
......CCC.......
................`],
  [ player5, bitmap `
....00000000....
...00......00...
...0.20.20..0...
...0.00.00..0...
...0...0....0...
...00......00...
....00000000....
.......0........
....00.0.00.....
......000.......
.......0........
.......0........
......000.......
.....0...0......
...00.....00....
..0.........0...`],
  [ player6, bitmap `
.....CCCCCC.....
....CCCCCCCC....
...CCCCCCCCCC...
...CCC02C02CC...
...CCC00C00CC...
...CCCCCCCCCC...
...CCCC000CCC...
....CCCCCCCC....
.C...CCCCCC...C.
CC44..4444..44CC
.C.4..4444..4.C.
...4444444444...
......5555......
......5..5......
......5..5......
....CCC..CCC....`],
  [ decorate, bitmap `
..7.1.1.0...D...
....1..1.22.F...
.FHHF99FFFFFD...
.6F998..L.3LL0..
...9H4.44.LLC8..
0.D.46D69LL87F7.
055.366HHL684...
15F99H..HLL8LD4D
.1.D988.FHLDC.9.
.F188.4.7H3DD9..
.F588L.8.HHH1...
.6.8...9.HH.H.44
99994.59D.H8.4..
..FL77CLHH84400.
..D.H..66.44...6
..DCH..5.4......`],
  [ trophie, bitmap `
................
......6666......
...666FFFF666...
..66.66FF66.66..
.66..666666..66.
.66..666666..66.
.66..6666F6..66.
.66..6666F6..66.
..66.6666F6.66..
...666666F666...
....6666FF66....
......6666......
.......66.......
.......66.......
......6666......
.....666666.....`],
  [ block, bitmap `
0000000000000000
0222222222222220
0222222222222220
0222222222222220
0222222222222220
077444262332HHH0
0722426663232H20
0772426263232H20
0272426663322H20
0772426263232H20
0222222222222220
0222222222222220
0222222222222220
0222222222222220
0222222222222220
0000000000000000`]
);

// create game levels
let level = 0; // this tracks the level we are on
const levels = [
  map`
...............................
..llll.lllll..l...llll..lllll..
..l......l....l...l...l...l....
..l......l...lll..l...l...l....
..ll.....l...l.l..llll....l....
....ll...l...lll..ll......l....
.....l...l..ll.ll.l.l.....l....
.....l...l..l...l.l..l....l....
..llll...l..l...l.l...l...l....
...............................
...............................
...............................
............pb.....g...........
...............................
...............................
...............................
...............................`,
  map`
pw.g
.b..
....`,
  map`
w.pwg
.b...
.....
.g..b
w....`,
  map`
pw..
.b..
...g
....`,
  map`
pb.g
w.b.
g.b.
..g.`,
  map`
....g
.g..b
..p..
.b.b.
....g`,
  map`
p.wg
b.w.
..b.
g...`,
  map`
wwwwwwwwwtwdwwdt5wwwdw4
g..bpww.wwdw.ww4tdw.wdw
wbwwwww.w.wd.wdt3ww.dw.
wwwdddw.w.dw.ww2tdw.wd.
w3wdtdwbw.wd.wdt6ww.dw.
wwwdtdwww.dw.ww5tdw.wd.
wwwdddw4w.wd.wdt4ww.dw.
wwwwwwwww.dwwww3tdwwwd.
w2wb...wwwwd2wdt2ww3dww`,
  map`
23456dtlbw2
23456dtlbw3
23......bw4
23......bw5
wwwwwwwwwww
p.b.......g
wwwwwwwwwww
23456dtlbw6
23456dtlbwd
23456dtlbwt
23456dtlbwl`

  ];



// set the map displayed to the current level
const currentLevel = levels[level];
setMap(currentLevel);

setSolids([ MrMan, box, wall, block ]); // other sprites cannot go inside of these sprites

// allow certain sprites to push certain other sprites
setPushables({
  [MrMan]: [ box ],
  [box]: [ box ]
});

// inputs for player movement control


onInput("k", () => {
  getFirst(MrMan).y += 1; // positive y is downwards
});

onInput("l", () => {
  getFirst(MrMan).x += 1;
});

onInput("i", () => {
  getFirst(MrMan).y -= 1;
});

onInput("j", () => {
    getFirst(MrMan).x -= 1;
});
// input to reset level
onInput("w", () => {
const currentLevel = levels[level]; // get the original map of the level

  // make sure the level exists before we load it
  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
  }
});

// these get run after every input
afterInput(() => {
  // count the number of tiles with goals
  const targetNumber = tilesWith(goal).length;
  
  // count the number of tiles with goals and boxes
  const numberCovered = tilesWith(goal, box).length;

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
      addText("you win!", { y: 4, color: color`0` });
    }
  }
});
