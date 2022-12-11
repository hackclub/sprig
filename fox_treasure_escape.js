/*
@title: fox_treasure_escape
@author: nirek_gada
*/

const player = "p";
const chest = "c";
const exit = "e";
const wall = "w"
const enemy = "n";

setLegend(
  [ player, bitmap`
................
.99..........99.
.999........999.
.9299......9929.
.92299....99229.
.92229999992229.
.92222999922229.
.99999999999999.
.99999999999999.
.99990999909999.
.29990999909992.
.29999999999992.
.22999999999922.
.22299999999222.
..222990099222..
...2299009922...`],
  [ chest, bitmap`
CCCCCCCCCCCCCCCC
CCC9999999999CCC
CCCC99999999CCCC
CCCCC999999CCCCC
C9CCCC9999CCCC9C
C99CCCC99CCCC99C
C999CC6666CC999C
C9999C6CC6C9999C
C999CC6CC6CC999C
C99CCC6666CCC99C
C9CCCCC99CCCCC9C
CCCCCC9999CCCCCC
CCCCC999999CCCCC
CCCC99999999CCCC
CCCC99999999CCCC
CCCCCCCCCCCCCCCC`],
  [exit, bitmap`
...5555555555...
..555555555555..
..555777777555..
.55577777777555.
.55574444447555.
.55774DDDD47755.
.55744DDDD44755.
.5574DD44DD4755.
.5574DD44DD4755.
.55744DDDD44755.
.55774DDDD47755.
.55574444447555.
.55577777777555.
..555777777555..
..555555555555..
...5555555555...`],
  [enemy, bitmap`
....00000000....
..002222222100..
.022222222221L0.
.02111222211110.
02100012210001L0
0210000210000110
02100002100001L0
02210002100021L0
02222221122221L0
.02222100222110.
.02222L022221L0.
..011222221LL0..
...0011111L00...
....010L0L00....
....000L0L00....
......0000......`],
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

setSolids([player, chest, wall, enemy]);

let level = 0;
const levels = [
  map`
pc.e`,
  map`
p.we
n.c.
.n..`,
  map`
.ww.n
.e...
.wn..
n.c..
..p..`,
  map`
....
..c.
e..e
.c..
...p`,
  map`
p..e
.nc.
.c..
e..n`,
  map`
w....n
en...e
.ew...
...c..
..c..n
wc..n.
n...p.`,
  map`
e.e..n..e.e
...wwwww...
.n.wnnnw.n.
.c.wnpnw.c.
...ww.ww...
.n.........
..c....c..n
n...nn.....`,
  map`
e......ne.
....c..w..
.......w.n
.nnwnwnw..
....w.....
....we..c.
.cnw..w.nn
..w..nn...
.wn....c.n
e........p`,
  map`
eeeeeeeeeeeeeee
...............
..w.........w..
...nwnwnwnwn...
...............
..c.c.c.c.c.c..
.c.c.c.c.c.c.c.
......c.c......
.......p.......`,
];
const currentLevel = levels[level];
setMap(levels[level]);

setPushables({
  [ player ]: [chest]  
});

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
    const currentLevel = levels[level];
    if (currentLevel !== undefined) setMap(currentLevel);
});

afterInput(() => {
    const numberCovered = tilesWith(exit, chest).length;
    const targetNumber = tilesWith(exit).length;

    if (numberCovered === targetNumber) {
        // increase the current level number
        level = level + 1;

        const currentLevel = levels[level];

        // make sure the level exists and if so set the map
        if (currentLevel !== undefined) {
            setMap(currentLevel);
        } else {
            addText("you win!", { y: 4, color: color`7` });
        }
    }
});
