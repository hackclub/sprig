/*
@title: sokoban with a twist
@author: aaaaaihatepython
@tags: [#sokoban, #:3]
@addedOn: 2024-08-01
*/

const player = "p"
const wall = "w"
const background = "b"
const melody = tune`
250: C4~250 + G4^250 + D5/250 + B5-250,
250: C5/250 + G5-250,
250: C4~250 + F4^250 + E5/250 + G5-250,
250: F4~250,
250: C4~250 + G4^250 + D5/250 + B5-250,
250: C5/250 + G5-250,
250: C4~250 + F4^250 + E5/250 + G5-250,
250: F4~250,
250: C4~250 + G4^250 + D5/250 + B5-250,
250: C5/250 + G5-250,
250: C4~250 + F4^250 + E5/250 + G5-250,
250: F4~250,
250: C4~250 + G4^250 + D5/250 + B5-250,
250: C5/250 + G5-250,
250: C4~250 + F4^250 + E5/250 + G5-250,
250: F4~250,
250: C4~250 + G4^250 + D5/250 + B5-250,
250: C5/250 + G5-250,
250: C4~250 + F4^250 + E5/250 + G5-250,
250: F4~250,
250: C4~250 + G4^250 + D5/250 + B5-250,
250: C5/250 + G5-250,
250: C4~250 + F4^250 + E5/250 + G5-250,
250: F4~250,
250: C4~250 + G4^250 + D5/250 + B5-250,
250: C5/250 + G5-250,
250: C4~250 + F4^250 + E5/250 + G5-250,
250: F4~250,
250: C4~250 + G4^250 + D5/250 + B5-250,
250: C5/250 + G5-250,
250: C4~250 + F4^250 + E5/250 + G5-250 + B5/250,
250: F4~250 + A5/250 + G4/250`
const box = "c"
const button = "r"
const inviswall = "i"
const inviswarning = "e"

setBackground("b")

setLegend(

  [player, bitmap`
................
................
................
...1.........1..
...1.........1..
.111.......111..
................
................
................
..1.....1....1..
..1....11....1..
..11..1111..11..
...1111..1111...
................
................
................`],
  [wall, bitmap`
LLLLLLLL11111111
11111111LLLLLL01
101LL01LL01LLL01
101LL01L01LLLL01
1011L0101LLLLL01
1011L011LLLLLL01
1010101L01LLLL01
1LL0101L0101111L
1LLL011L0101111L
10LLL01L0101011L
10LLL01L0101011L
10LLL0100001001L
10L011111111L01L
01LLLLLLLLL0101L
01LLLLLL01111111
011111111LLLLLLL`],
  [background, bitmap `
0000000000000000
000000000L000000
00000L00000000L0
0000000000000000
0000000000000000
000000000L000000
0000000000000000
00L000L000000000
0000000000000000
0000000000000000
0000000000000000
00L0000000000000
00000000000L000L
0000000000000000
0000000000000000
000000L000000000`],
  [box, bitmap `
.........LLLLL..
00LLLLL11LLLLL..
00LLLLL11LLLLL..
00LLLLL11LLLLL..
00LLLLL11LLLLL..
00LLLLL11LLLLL..
00LLLLL11LLLLL..
00LLLLL11LLLLL..
00LLLLL11LLLLL..
00LLLLL11LLLLL..
00LLLLL11LLLLL..
00LLLLL11LLLLL..
00LLLLL111LLLL..
00LLLLL1111LLL..
00LLLLL11111LL..
00000000000000..`],
  [button, bitmap `
................
................
................
....777777777...
...77777777777..
...77777777777..
..5777777777775.
..5777777777775.
..5577777777755.
...55555555555..
................
................
................
................
................
................`],
  [inviswall, bitmap `
0000000000000000
000000000L000000
00000L00000000L0
0000000000000000
0000000000000000
000000000L000000
0000000000000000
00L000L000000000
0000000000000000
0000000000000000
0000000000000000
00L0000000000000
00000000000L000L
0000000000000000
0000000000000000
000000L000000000`],
  [inviswarning, bitmap `
7...7.5.77755...
7.7.75.5.7.5....
.7.7.555.7.557.7
.....5.5.....777
555.777.555..7.7
5...7.7.5.5.....
55..7.7.5.5.....
5...777.55......
........5.5.....
................
7.5..5.7.7.5.777
7.55.5.7.7.5.7..
7.5.55..7..5.777
...............7
.............777
................`],
)

setSolids([player, wall, box, inviswall, ])

let level = 0

const levels = [
  map`
wwwwwwwwww
w........w
w........w
w.p.cr...w
w........w
w........w
w........w
wwwwwwwwww`,
  map`
wwwwwwwwww
w...r....w
w........w
w.pcc....w
w........w
w........w
w.r......w
wwwwwwwwww`,
  map`
wwwwwwwwww
w.w....wrw
w.w....w.w
w.p....w.w
w...w....w
w..cw....w
w...w....w
wwwwwwwwww`,
  map`
wwwwwwwwww
wrc....crw
w.....cc.w
w.p......w
w........w
w........w
wrr....crw
wwwwwwwwww`,
  map`
wwwwwwwwww
wpw...cr.w
w.w.w.cr.w
w.w.w.cr.w
w.w.w.cr.w
w.w.w.cr.w
w...w.cr.w
wwwwwwwwww`,
  map`
wwwwwwwwww
w.......pw
w.wcw.wcww
w....c...w
w.w.w.w.ww
w....w...w
wrrr.....w
wwwwwwwwww`,
  map`
..........
.www.wwww.
ww....crw.
...wwwwww.
wpwrc.....
...wwwwww.
cw....crwc
rwwwwwwwwr`,
  map`
wwwwwwwwww
wrii.....w
w.ip...c.w
w..e..c..w
wr.....c.w
w.....c..w
wr......rw
wwwwwwwwww`,
  map `
irrrcc....
iiiiiiii..
i.....pi..
i.iiiiiic.
i.irrrccc.
i.iiiiiii.
i.......i.
iiiiiii...`,
  map `
b..bbbbbbb
b.........
r..bbbbb..
bbbb......
pc....b...
bbbb..bbbb
...bbbb...
..........`,
  map `
ir...i....
iii..i....
iii..i....
.....i....
.....i....
iciiii....
ipi.......
iii.......`,
]

const playback = playTune(melody, Infinity)

setMap(levels[0])

setPushables({
  [player]: [box, player],
  [box]: [box],
})

//controls
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

onInput("i", () => {
  const currentLevel = levels[level];
  setMap(currentLevel)
})

//win check
afterInput(() => {
  const buttons = tilesWith(button).length;
  const boxesbuttons = tilesWith(box, button).length;

  if (boxesbuttons === buttons) {
    level = level + 1;
    const currentLevel = levels[level];
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("you win :3", { y: 2, color: color`7` });
    }
  }
});