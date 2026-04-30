/*
@title: Not really a two player
@description: 
@author: Sleepy.io
@tags: ['tag1', 'tag2']
@addedOn: 2025-00-00
*/

const player = "p";
const wall = "w";
const player2 = "i";
const wall2 = "u";
const truewall = "t";
const end = "e";
const start = "s";

setLegend(
  [ player, bitmap`
................
................
...0....0.......
...00..00.......
...000000.......
..00000000......
..02000020......
..00000000......
...000000.......
....0000........
..00066000......
....0000........
....00000.......
....0000.0......
....0..0.0......
....0..0..0.....` ],
  [ player2, bitmap`
................
................
...0....0.......
...00..00.......
...000000.......
..00000000......
..02000020......
..00000000......
...000000.......
....0000........
..00077000......
....0000........
....00000.......
....0000.0......
....0..0.0......
....0..0..0.....` ],
  [ wall, bitmap`
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
  [ wall2, bitmap`
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
LLLLLLLLLLLLLLLL`],
  [ truewall, bitmap`
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333`],
  [ end, bitmap`
.......66.......
.......66.......
......6666......
......6666......
......6666......
.....666666.....
6666666666666666
.66666666666666.
...6666666666...
....66666666....
....66666666....
...6666666666...
...6666666666...
...666....666...
..666......666..
..6..........6..`],
  [ start, bitmap`
....00000000....
...0222222220...
..022222222220..
.02220022222220.
0222000022222220
0222000000222220
0222000000002220
0222000000000220
0222000000000220
0222000000002220
0222000000222220
0222000022222220
.02220022222220.
..022222222220..
...0222222220...
....00000000....`]
)

setSolids([ player, wall, player2, wall2, truewall]);

let level = 0
const levels = [
  map`
.......
.......
...s...
p.....i`,
  map`
e.u...u...
u.u.u.u.u.
u...u...ui
tttttttttt
w...w...wp
w.w.w.w.w.
e.w...w...`,
    map`
et..i....e
.........t
..........
wttttttttt
..........
..........
p.........`,
  map`
..........
.ttttttttw
.ttt....u.
.ttt.tttt.
it...t....
tt.ttt..t.
p..ttteet.`,
    map`
i.........
..........
e...we...e
tttttttttu
..........
..........
p.........`,
]

setMap(levels[level])

setPushables({
  [ player2 ]: [wall],
  [ player ] : [wall2],
  [ wall2 ] : [wall],
  [ wall ] : [wall2]
})

onInput("s", () => {
  getFirst(player).y += 1
})
onInput("w", () => {
  getFirst(player).y -= 1
})
onInput("a", () => {
  getFirst(player).x -= 1
})
onInput("d", () => {
  getFirst(player).x += 1
})

onInput("s", () => {
  getFirst(player2).y += 1
})
onInput("w", () => {
  getFirst(player2).y -= 1
})
onInput("a", () => {
  getFirst(player2).x -= 1
})
onInput("d", () => {
  getFirst(player2).x += 1
})

if (level == 0) {
  addText("Not really", { y: 4, color: color`0` });
  addText("a two player", { y: 5, color: color`0` });
}



afterInput(() => {

  clearText()

  if (level == 0) {
  addText("Not really", { y: 4, color: color`0` });
  addText("a two player", { y: 5, color: color`0` });
  }
  
  const targetnumber = tilesWith(end).length;
  const numbercovered = tilesWith(end, player).length;
  const numbercovered2 = numbercovered + tilesWith(end, player2).length;
  const targetnumber2 = targetnumber + tilesWith(start).length;
  const numbercovered3 = numbercovered2 + tilesWith(start, player).length;
  const numbercovered4 = numbercovered3 + tilesWith(end, wall).length;
  const numbercovered5 = numbercovered4 + tilesWith(end, wall2).length;
  
  if (numbercovered5 === targetnumber2) {
    level = level + 1;

    const currentLevel = levels[level];

    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("you win!", { y: 3, color: color`0` });
    }
  }
})