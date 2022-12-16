/*
@title: Maze Running
@author: bigEthan

*/
const wall = "w";
const player = "p";
const goal = "g";
setLegend(
  [ wall, bitmap`
3000000000000003
0300000000000030
0030000000000300
0003000000003000
0000300000030000
0000030000300000
0000003003000000
0000000330000000
0000000330000000
0000003003000000
0000030000300000
0000300000030000
0003000000003000
0030000000000300
0300000000000030
3000000000000003`],[player, bitmap`
....66666666....
...6666666666...
..666666666666..
..6666066066666.
.66666066066666.
6666660660666666
6666666666666666
6660666666660666
6660666666660666
6666066666606666
6666066666606666
.66660666606666.
.66666000066666.
.6666666666666..
..6.6666666666..
.....66666......`],  [ goal, bitmap`
4444444444444444
4454444444455544
4455555554444444
4455454544544444
4455545544444444
4455455544445444
4454555544445454
4445545454554454
4445544545554444
4445445555545444
4445445555545444
4455445445544444
5545445454454444
4444555544554444
4444444544444444
4444444444444444`]
)
let level = 0;
const levels = [map`
w..g
w.ww
....
pww.`,map`
ww...w..
w..w.ww.
..w..w..
.wg.www.
..wwwp..
w....ww.
.w.w....
.....w..`,map`
.pww..w....ww...
..w.............
..ww.www..w.w...
...w.w.w.w...w..
.......wwg.w.w..
..w...w.www.w...
w.ww........w.w.
..w.ww.ww...w..w
.w......ww..w..w
.w.wwww..w.....w
.w..www..w......
.w...w...ww....w
..w....wwww.w..w
..w..w......ww.w
.....w...w...w..
......w.w.....ww`,map`
wwwwwwwwwwwwwwwwwwwwwwwwwwwww
wp...........wwwwww........ww
w.w.wwww.......w.....w.....ww
w.w.w.w.....www......ww....ww
w.www.ww.w.....w...w..ww..www
w.....wwww.w..www..w..wwww..w
w..w....w.w..ww.w.w.w..ww...w
w..w..w.w....w.ww.w.w.w.....w
w..wwww.w.w..w..w.ww.w...w..w
w..w......ww..w.w.ww.www.w..w
w....w.w.w.ww..ww.w.....www.w
wwwww..ww...w.www..w....w.w.w
w..w......wwww.www.w.....w..w
w..w.wwww.www..ww..w..w..w..w
w..w.w.w.......w..www....w..w
w..w...w...ww.ww.wwww..www..w
w..w.w.w.wwww.w.wwwwww.....ww
w....w.w..ww......w.w.ww...ww
w.wwwwwww...w.......w.w.....w
w...ww...ww.w.ww..w...w.w...w
w...ww....w.wwww...w..w..w.ww
w..ww........ww....ww.w..w..w
w.ww..www.w..w.w.w..w.w..ww.w
w..w..w.w.w.ww.....w...w.w..w
w.ww.ww.ww....w...w.www.ww.ww
w..w.w.w....www......w..w...w
w..wwww......w..w..w..ww..www
w..........w...w.w.ww......gw
wwwwwwwwwwwwwwwwwwwwwwwwwwwww`,map`
wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
wp.w..w.w.w......ww........w..ww..w................w..w...w
w.www.w.www.wwwwwwwwww.....w.www..........w.w.w.w.w..w..w.w
w.......w....w.w.w..w..w.ww...wwww..ww.ww.w.ww..www...ww..w
w.w..w..w.wwww....wwwwwwwwww.w........ww.....ww..wwwww.w..w
w.w.www..ww..ww.w..wwwwwwww.wwwwwww.ww.wwww.w.w..w...ww...w
w.w.ww.w..ww..w.ww..w...w..w.www.w...www..w..w.w...w.ww...w
www...www..ww...ww.ww.www.www.......ww.ww.....ww...w......w
www.www...ww..www...ww..ww.w..w.w..w..ww.ww.w.......www...w
w...www.w...w.w...w..www.ww..wwwww..ww..w...w....w..w...www
w.www.w.ww..w.w.www.........ww.w..w.w.ww.ww.wwww..ww.www.ww
w.ww..w..ww.www.www.w....wwww..w..........w......ww..w...ww
w.ww.www.w..w...w.wwwww..ww..ww.wwww..w...w..ww..w...w.w..w
w.....ww..www.wwww.ww....w.w.ww.www....ww...www......w.w..w
www.wwww..w..ww.wwwww.w.w..www.w..wwwwwww........w.w.w....w
ww....w...w.w.w...w...wwwwwwwwww..w..www.wwwwww.wwww......w
ww.wwwww.ww.w.www..ww..w.w.ww........w...ww.ww..ww..w.....w
ww....wwwwwwwww..w.wwww...ww..w......w.www.ww...ww........w
w.www...w..w.wwww.....wwww.ww...ww......www..ww.w.www...g.w
w.w.www.wwww.ww.www..www.w.w..wwwww.ww..w.w.w.w..w.....w.ww
wwwww...www....wwww..w...........www...w.www.w.w...w...w..w
ww....wwww.wwwwwwwwwwwww.w.w..wwww.ww......ww...w.www.....w
w.w..www.w....w.......w..w.ww...w......wwww..ww..w........w
w.w.ww.wwwwww.wwwwwwww..ww.ww.ww.www..w.ww.w.www....ww.w..w
w.w....w.....ww.....ww....w.ww...www..ww...w..w..ww..wwww.w
w.w.w....wwww.www.w.ww..w.w..www..w..www..w.....w..w....w.w
wwwwwww....w....w.www.w..ww.www.......w.w.wwww...www......w
w..w..ww.w...wwww.w.w.w.ww...ww.www..w.ww...w......ww..ww.w
w.wwwww..www...w..w..w.....www...w..w..w.w.w.ww.ww..wwww..w
www.....w..www.w.wwwww...w.ww..w...w.w....w...wwww.w.w....w
www.w.wwww.ww..w.w.w.w...ww.......ww..w..ww.w.wwww...w.wwww
w..ww.w.ww.wwwwwwwww.w.w...w.ww...w.w.wwwwww......ww.w..w.w
wwwww.ww.www......ww.w.w..w.ww.....ww.w..ww..w.ww...ww..w.w
www...wwwwwwwwwwwwwwwww.wwwww.ww.www.www....wwwwww.ww..w..w
w.w............w...w...w..w.www..w....ww.....w..w..www.w..w
w.w...w.w....w.www.w.w...w.........ww..w....w..w.....w.w..w
w.www.w.w.wwww.w...w.www..ww......w..w.ww...w.......w.....w
w...w...w........w...........w.....www........w.ww........w
wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww`

];

const currentLevel = levels[level];
setMap(currentLevel);

setSolids([ player, wall ]);

onInput("s", () => {
  getFirst(player).y += 1;
});

onInput("a", () => {
  getFirst(player).x -= 1;
});
onInput("w", () => {
  getFirst(player).y -= 1;
});

onInput("d", () => {
  getFirst(player).x += 1;
});
afterInput(() => {
  const numberCovered = tilesWith(goal, player).length;
  const targetNumber = tilesWith(goal).length;

  if (numberCovered === targetNumber) {
    level = level + 1;

    const currentLevel = levels[level];

    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      setMap(map`
pppppppppp
pppppppppp
pppppppppp
pppppppppp
pppppppppp
pppppppppp`);
      addText("CONGRATULATIONS", { y: 4,x:4 });
      addText("YOU WIN!!!", { y: 5,x:4});
    }
  }
});

