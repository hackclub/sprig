/*
@title: candyshopper
@author: ayaangrover
@tags: ["puzzle"]
@addedOn: 2024-07-15
*/

const player = "p"
const juice = "j"
const chocolate = "c"
const candycane = "a"
const goal = "g";
const wall = "w";

setLegend(
  /* [ player, bitmap`
................
.....77777......
....7777777.....
...777777777....
...7777777777...
...777777777777.
...6666666666...
...0000000000...
...6666660000...
...6666666666...
...66666666666..
...66666CCCCC...
...666666CC66...
...6666666CCC...
...66666666CC...
................` ], */
  [player, bitmap`
................
....00000000....
..000......000..
.00..........00.
.0..0......0..0.
.0....0..0....0.
.0....0000....0.
.00..........00.
..000......000..
....00000000....
....0......0....
....0......0....
.0000......0000.
................
................
................`],
  [juice, bitmap`
................
....1111........
.......1........
.......1........
...99999999999..
...92222222229..
...92222242229..
...9222C422229..
...92299992229..
...92999999229..
...92999999229..
...92299992229..
...92222222229..
...92222222229..
...92222222229..
...99999999999..`],
  [chocolate, bitmap`
....0000000.....
....0C0C0C0.....
....0000000.....
....0C0C0C0.....
....0000000.....
....0C0C0C0.....
....0000000.....
....0C0C0C0.....
....1110000.....
....3311111.....
....3333333.....
....3333333.....
....3333333.....
....3333333.....
....3333333.....
....3333333.....`],
  [candycane, bitmap`
................
................
......343.......
.....4...4......
....3.....3.....
....4.....4.....
....3.....3.....
..........4.....
..........3.....
..........4.....
..........3.....
..........4.....
..........3.....
..........4.....
..........3.....
..........2.....`],
  [goal, bitmap`
................
................
................
..LLLLLLLLLLL...
..L.........L...
..L.........L...
LLLLLLLLLLLLLLL.
L.L.L.L.L.L.L.L.
LLLLLLLLLLLLLLL.
L.L.L.L.L.L.L.L.
LLLLLLLLLLLLLLL.
L.L.L.L.L.L.L.L.
LLLLLLLLLLLLLLL.
L.L.L.L.L.L.L.L.
LLLLLLLLLLLLLLL.
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


let level = 0
const levels = [
  map`
p..
..j
..g`,
  map`
p..jg
.....
j.c..
.a...
g.g.g`,
  map`
p..
ww.
...
.ww
...
ww.
...
.ww
...
ww.
gj.
www`,
  map`
.p.
...
acj
ggg`,
  map`
w.p..
wj.a.
gj.cg
wgwgw
wwwww`,
  map`
...............gw
.a.............ww
..a............gw
...a..........gww
....a.........pgw
.....a........gww
......a........gw
.......a.......ww
...............gw`,
  map`
p.g..
.....
.g..
.c..a
.....`,
  map`
p..w......www...w.w
ww.wwww.w..ww.w.w.w
....w...w.www.w.w.w
.ww...w.w.www.w...w
.www.ww.wwwww.w.w.w
.w.w..w...w...w.w.w
...w.ww.w.w.w.w.w.w
.w.w.w..w...w.w.w.w
.w.w.w.wwwwww.w.w.w
wwww.w.w...ww.w.w.w
.....w...w.ww.www.w
.wwwww.w.w.ww.www.w
.www.w.w.wwww.www.w
.....w.w...ww.www.w
wwwwww.www.w..w...w
w......w.w.wwww.www
wwwwww...w....w.jg.`,
  map`
..wwgwgwgwgwgwgwgwgwg
pa.wa.j.j.j.j.j.j.j.j
w..w.w.w.w.w.w.w.w.w.
w..w.w.w.w.w.w.w.w.w.
g..w.................
w..ww.wwwwwwwwwwwwwww
w..ww.wgwgwgwgwgwgwgw
w..ww.wcwcwcwcwcwcwcw
w..ww.w.w.w.w.w.w.w.w
w..ww.w.w.w.w.w.w.w.w
w..ww.w.w.w.w.w.w.w.w
w..ww.w.w.w.w.w.w.w.w
w..ww.w.w.w.w.w.w.w.w
wa.ww.w.w.w.w.w.w.w.w
wg..................wdd`
]

const currentLevel = levels[level];
setMap(currentLevel);

setSolids([player, juice, chocolate, candycane, wall]);

setPushables({
  [player]: [juice, chocolate, candycane],
  [juice]: [juice],
  [chocolate]: [chocolate],
  [candycane]: [candycane]
})

onInput("w", () => {
  getFirst(player).y -= 1
})
onInput("s", () => {
  getFirst(player).y += 1
})
onInput("a", () => {
  getFirst(player).x -= 1
})
onInput("d", () => {
  getFirst(player).x += 1
})

onInput("j", () => {
  const currentLevel = levels[level];

  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
  }
});

afterInput(() => {
  const baskets = tilesWith(goal).length;

  const successes = tilesWith(goal, juice).length + tilesWith(goal, chocolate).length + tilesWith(goal, candycane).length;
  if (successes === baskets) {
    level = level + 1;

    const currentLevel = levels[level];

    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("game over");
    }
  }
});