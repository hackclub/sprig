
/* 
@title: the_greenhouse_maze
@description: A game where you try to navigate through various obstacles in a garden maze to get to a greenhouse shed. 
@author: Kavya G
@tags: [maze, greenhouse, gardening]
@addedOn: 2026-11-24
*/

    const player = "p";
    const wall = "w";
    const plant = "l";
    const pot = "t";
    const shed = "s";
    const soilbag = "b";
    const tools = "o";
    const redflower = "r";
    const purpleflower = "f";

setLegend(
	[ player, bitmap`
........C.......
......CCCC4.....
.....CCCCCCC....
...0CCCCCCCCC...
...000000000....
..00000....0....
..00000.0.00....
.000000....0....
00000..0000.....
0000...888......
.00..088H880....
....088H3H880...
....8888H8888...
....HHHHHHHHH...
.......0..0.....
......00..00....` ],
    [wall, bitmap`
DD4D4D4D4D4D4D4D
D4D4D4D4D4D4D4DD
4D4D4D4D4D4D4D4D
D44444D444D444D4
DD4D444D4D44444D
D4D444D4D4D444D4
4D444D4D4D4D444D
D444D4D444D44444
DD4D4D44444D4444
D44444444444D444
4D444444444D4D4D
D44444D444D4D4D4
4444444D44444D4D
D444D4D4D4D4D444
444D44444DDD444D
D4D44444D4D4D4D4` ],
    [plant, bitmap`
................
................
................
................
................
................
................
.....DDD.DD.....
......DDDD......
........D.......
................
................
................
................
................
................` ],
    [pot, bitmap`
................
................
................
................
................
................
................
................
.......D.DD.....
........D.......
.......CCC......
........C.......
................
................
................
................` ],
    [shed, bitmap `
................
........0.......
.......000......
......00000.....
....00033300....
...0000333000...
..0000.....000..
.0000.......000.
...0.........0..
...0....4....0..
...04.4.4....0..
...0.44CCC.770..
...0.4..C..770..
...0FFFFFFFFF0..
...00000000000..
................`], 
    [ soilbag, bitmap `FFFFFFFFFFFFFFFF
CCCFCCCCCCFCCCCC
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FCCCCFCCCFCFCFFF
FCFFCFCFCFCFCFFF
FCFFFFCFCFCFCFFF
FCFFFFCFCFCFCFFF
FCCCCFCFCFCFCFFF
FCFFCFCFCFCFCFFF
FFFFCFCFCFCFCFFF
FFFFCFCFCFCFCFFF
FCFFCFCFCFCFCFFF
FCCCCFCCCFCFCCCC
FFFFFFFFFFFFFFFF
F1F1F1F1111FFFFF`],
  [tools, bitmap `
................
................
...........1L...
..L.L.L....1L...
..L.L.L...1LLL..
..L.L.L...1LLL..
..L.L.L..1LLLLL.
..L.L.L..1LLLLL.
..LLLLL..1LLLLL.
....L......CC...
....L......CC...
....L......CC...
....L......CC...
....L......CC...
....L......CC...
................`],
  [redflower, bitmap `
......3333......
.....83333......
.....833333.....
.....833333.....
.....83333..83..
.333..333333333.
8333333333333333
8333333966933333
8333339666633333
833333966663333.
.3333339669333..
...333333333333.
...833333333333.
...833333.83333.
...83333..83333.
.....883...333..`],
  [purpleflower, bitmap `
......HHHH......
.....8HHHH......
.....8HHHHH.....
.....8HHHHH.....
.....8HHHH..8H..
.HHH..HHHHHHHHH.
8HHHHHHHHHHHHHHH
8HHHHHH8668HHHHH
8HHHHH86666HHHHH
8HHHHH86666HHHH.
.HHHHHH8668HHH..
...HHHHHHHHHHHH.
...8HHHHHHHHHHH.
...8HHHHH.8HHHH.
...8HHHH..8HHHH.
.....88H...HHH..`],
  
)

setSolids([ player, wall, plant, pot, soilbag,])

let level = 0;
const levels = [
	map`
pwl..s
..w.ww
w...tw
wllttw`,
  map `
plww.l
t.wltw
.t...l
w.wl.s`,
  map `
pb.w.
lbt..
w.w..
wlwws`,
map `
ll.o.s
..wo..
...w.t
bo..o.
pww...`, 
map `
.blos
.wt..
pb..o
l.o.l
t.t..`, 
  map `
pbowws
.w..w.
rwfb..
llw.wt`,
]

setMap(levels[level])

setPushables({
	[ player ]: [pot, soilbag],
})

//controls!!
onInput("w", () => {
	getFirst(player).y -= 1
});
onInput("a", () => {
	getFirst(player).x -= 1
});
onInput("s", () => {
	getFirst(player).y += 1
});
onInput("d", () => {
	getFirst(player).x += 1
});

onInput("j", () => {
	setMap(levels[level])
});

afterInput(() => {
    const numberOfGoalsCovered = tilesWith(player, shed).length;

    if (numberOfGoalsCovered >= 1) {
        level = level + 1;
      if (level<levels.length) {
      setMap(levels[level]);
    } else {
      addText("you win!", { y: 6, color: color`5` });
    }
      
    }
    
  const toolsCovered = tilesWith(player, tools).length;
  if (toolsCovered > 0) {
    setMap(levels[level])
  }

    const redflowersCovered = tilesWith(player, redflower).length;
    const purpleflowersCovered = tilesWith(player, purpleflower).length;
    if (redflowersCovered >=1) {
    const pf = getFirst(purpleflower);
    const pl = getFirst(player);

      pl.x = pf.x;
      pl.y = pf.y;

  }

  if (purpleflowersCovered >=1) {
    const rf = getFirst(redflower);
    const pl = getFirst(player);

      pl.x = rf.x
      pl.y = rf.y
    }
})
