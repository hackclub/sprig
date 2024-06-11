/*
@title:Robot
@author:PotatoHacker
@tags: [random]
@addedOn: 2024-06-10
*/

//sprites
const player = "p"
const wall = "w"
const wall2 = "o"
const background = "b"
const tile = "t"
const goal = "g"
//sound

//sprite art
setLegend(
  [ player, bitmap`
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
....00000000....` ],
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
0000000000000000` ],
  [ wall2, bitmap`
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
  [ background, bitmap`
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
  [ tile, bitmap`
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
  [ goal, bitmap`
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
6666666666666666`]
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
..........wo`
]
setMap(levels[level])

setPushables({
  [ player ]: [ tile ],
  [ tile ]: [ tile ],
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
  if (numberCovered === targetNumber) {
    level = level + 1;

    const currentLevel = levels[level];

    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("Task completed.", { y: 5, color: color`D` });    
    }
  }
});