/*
@title:Robot
@author:PotatoHacker
@tags: [Puzzle]
@addedOn: 2024-06-10
*/

//sprites
const player = "p"
const wall = "w"
const wall2 = "o"
const background = "b"
const tile = "t"
const goal = "g"
const fakewall = "f"
//sound
const victory = tune`
1000: C4/1000 + G4^1000 + B4~1000 + E4-1000,
1000: D4-1000 + F4^1000 + A4~1000 + C5/1000,
1000: C4/1000 + E4-1000 + G4^1000 + B4~1000,
1000: D4-1000 + F4^1000 + A4~1000 + C5/1000,
1000: E4/1000 + G4-1000 + B4^1000 + D5~1000,
1000: F4-1000 + A4^1000 + C5~1000 + E5/1000,
1000: E4/1000 + G4-1000 + B4^1000 + D5~1000,
1000: F4-1000 + A4^1000 + C5~1000 + E5/1000,
1000: C4/1000 + E4-1000 + G4^1000 + B4~1000,
1000: D4-1000 + F4^1000 + A4~1000 + C5/1000,
1000: C4/1000 + E4-1000 + G4^1000 + B4~1000,
1000: D4-1000 + F4^1000 + A4~1000 + C5/1000,
1000: E4/1000 + G4-1000 + B4^1000 + D5~1000,
1000: F4-1000 + A4^1000 + C5~1000 + E5/1000,
1000: E4/1000 + G4-1000 + B4^1000 + D5~1000,
1000: F4-1000 + A4^1000 + C5~1000 + E5/1000,
1000: C4/1000 + E4-1000 + G4^1000 + B4~1000,
1000: D4-1000 + F4^1000 + A4~1000 + C5/1000,
1000: C4/1000 + E4-1000 + G4^1000 + B4~1000,
1000: D4-1000 + F4^1000 + A4~1000 + C5/1000,
1000: E4/1000 + G4-1000 + B4^1000 + D5~1000,
1000: F4-1000 + A4^1000 + C5~1000 + E5/1000,
1000: E4/1000 + G4-1000 + B4^1000 + D5~1000,
1000: F4-1000 + A4^1000 + C5~1000 + E5/1000,
1000: C4/1000 + E4-1000 + G4^1000 + B4~1000,
1000: D4-1000 + F4^1000 + A4~1000 + C5/1000,
1000: C4/1000 + E4-1000 + G4^1000 + B4~1000,
1000: D4-1000 + F4^1000 + A4~1000 + C5/1000,
1000: E4/1000 + G4-1000 + B4^1000 + D5~1000,
1000: F4-1000 + A4^1000 + C5~1000 + E5/1000,
1000: E4/1000 + G4-1000 + B4^1000 + D5~1000,
1000: F4-1000 + A4^1000 + C5~1000 + E5/1000`
const completeLevel = tune`
1000: C4/1000,
1000: B5/1000 + G5-1000 + E5^1000 + C5~1000 + G4/1000,
1000: E4/1000,
29000`
const tileInPlace = tune`
157.89473684210526: D4~157.89473684210526 + C4~157.89473684210526 + B4^157.89473684210526 + F4^157.89473684210526 + G4/157.89473684210526,
157.89473684210526: A4^157.89473684210526 + E4^157.89473684210526 + D4-157.89473684210526,
4736.8421052631575`
//sprite art
setLegend(
  [player, bitmap`
................
.....000000.....
.....066660.....
...0000000000...
...0222222220...
...0202222020...
...0202222020...
...0202222020...
...0200000020...
...020L00L020...
...000L00L000...
.....0L00L0.....
.....0L00L0.....
....00L00L00....
....0LL00LL0....
....00000000....`],
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
0000000000000000`],
  [wall2, bitmap`
5555555555555555
5DDDDDDDDDDDDDD5
5D333333333333D5
5D399999999993D5
5D397777777793D5
5D39722HH88793D5
5D39722HH88793D5
5D397HH8822793D5
5D397HH8822793D5
5D3978822HH793D5
5D3978822HH793D5
5D397777777793D5
5D399999999993D5
5D333333333333D5
5DDDDDDDDDDDDDD5
5555555555555555`],
  [background, bitmap`
1111111111111111
1L11111111111L11
11L11111111111L1
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1L11111111111L11
11L11111111111L1
1111111111111111`],
  [tile, bitmap`
................
.CCCCCCCCCCCCCC.
.CCCC333333CCCC.
.CC3333333333CC.
.CC3399999933CC.
.C339955559933C.
.C339555555933C.
.C339555555933C.
.C339555555933C.
.C339555555933C.
.C339955559933C.
.CC3399999933CC.
.CC3333333333CC.
.CCCC333333CCCC.
.CCCCCCCCCCCCCC.
................`],
  [goal, bitmap`
6666666666666666
6999999999999996
6933333333333396
693CCCCCCCCCC396
693C77777777C396
693C75555557C396
693C75444457C396
693C75493457C396
693C75439457C396
693C75444457C396
693C75555557C396
693C77777777C396
693CCCCCCCCCC396
6933333333333396
6999999999999996
6666666666666666`],
  [fakewall, bitmap`
0000000000000000
0LLLLLLLLLLLLLL0
0L000000000000L0
0L000000000000L0
0L000000000000L0
0L000000000000L0
0L000000000000L0
0L000000000000L0
0L000000000000L0
0L000000000000L0
0L000000000000L0
0L000000000000L0
0L000000000000L0
0L000000000000L0
0LLLLLLLLLLLLLL0
0000000000000000`]
)
setBackground(background)
setSolids([player, wall, tile])
//levels
let level = 0
const levels = [
  map`
wwwwwwww
wp....gw
w......w
w..ww..w
w..ww..w
w..t...w
w......w
wwwwwwww`,
  map`
p.www...
wtww....
w.ww..w.
w.www.w.
w.www.w.
..www.w.
......w.
wwww..wg`,
  map`
wwwwwwp.
ooooowt.
wwwwww..
w.......
ww......
.ww.....
..ww....
g.......`,
  map`
w.wwwwww
wpw....g
wtw..www
w.ww.woo
w.ww.woo
..ww.woo
.....woo
www..woo`,
  map`
w.p.wg..
....w...
.t.tw...
w...w...
w...w...
w...w...
w.......
w......g`,
  map`
wwwgwwwwwwww
wgw.wooooooo
w.w.wooooooo
w.w.wwwwwwoo
w.w.w....woo
w.w.w.p...wo
w.w.ww.ww.wo
wtw.tt.gw.wo
..w.wwwww.wo
.ww.......wo
.wwww.....wo
..........wo`,
  map`
wgg...t.g...
wwwwwwwwtww.
g.......tgw.
..wwwwwwtww.
.wwoooow.ww.
.wooooow.ww.
.wwwwwww.ww.
............
tw..........
............
wwwwww.wwwww
g.........tp`,
  map`
www...tg.w
wwwfwwwwww
www......w
wwwwwwww.w
www....w.w
www.ww.w.w
www.wp.w.w
www.wwww.w
www......w
wwwwwwwwww`,
  map`
.p.....wgwww
.tww.www.f.w
.t..tgww.wtw
.twwgwww.w.w
.twwwwww.w.w
.t...gww.w.w
..wwwwww.w.w
.........w.w
..wfwww..w.w
..g.wwwwww..
..w.........
wgg..wwwwwww`
]
setMap(levels[level])

setPushables({
  [player]: [tile],
  [tile]: [tile],
})

//inputs

onInput("w", () => {
  getFirst(player).y += -1;
});

onInput("s", () => {
  getFirst(player).y += 1;
});

onInput("a", () => {
  getFirst(player).x += -1;
});

onInput("d", () => {
  getFirst(player).x += 1;
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
  const numberCovered = tilesWith(goal, tile).length;
  const prevNumberCovered = tilesWith(goal, tile).length;
  if (numberCovered === targetNumber) {
    level = level + 1;
    playTune(completeLevel)
    const currentLevel = levels[level];

    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("TASK COMPLETED.", { y: 5, color: color`D` });
      playback.end()
      playTune(victory, Infinity)
    }
  }
});