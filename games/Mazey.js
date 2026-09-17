/*
@title: Mazey
@author: Kartik Biddoliya
@description: Just some maze, try to escape.
@tags: ['maze']
@addedOn: 2026-09-07
*/

const player = "p";
const wall = "w";
const one = "o";
const two = "t";
const three = "3";
const key = "k";
const goal = "g";
let count = 0;
let hasKey = false;

setLegend(
  [ player, bitmap`
................
....0000000.....
..0077777700000.
..0777777777770.
.00777227772270.
.077772277722700
.077777777777770
..7777777777777.
.......7........
.......7..0.....
....7777777.....
....0..7........
.....77777......
....77...77.....
....0.....0.....
................` ],
  [ wall, bitmap`
0000000000000000
0777777777777770
0777777777777770
0777777777777770
0777777777777770
0777777777777770
0777777777777770
0777777777777770
0777777777777770
0777777777777770
0777777777777770
0777777777777770
0777777777777770
0777777777777770
0777777777777770
0000000000000000`],
  [ one, bitmap`
2222222222222222
2222222222222222
2222222220022222
2222222200022222
2222222000022222
2222220020022222
2222200220022222
2222002220022222
2222222220022222
2222222220022222
2222222220022222
2222222220022222
2222220000000222
2220000000000002
2222222222222222
2222222222222222` ],
  [ two, bitmap`
2222222222222222
2222222222222222
2222222222222222
2222000000022222
2222022222022222
2222022222022222
2222022222022222
2222222222022222
2222222222022222
2222222220022222
2222222200222222
2222220002222222
2222000222222222
2222000000000222
2222222222222222
2222222222222222` ],
  [ three, bitmap`
2222222222222222
2222222222222222
2222222222222222
2222200002222222
2222002220222222
2222222220222222
2222222220222222
2222222200222222
2222220002222222
2222222200222222
2222222220222222
2222002220222222
2222200002222222
2222222222222222
2222222222222222
2222222222222222` ],
  [ key, bitmap`
................
................
......000.......
.....0...0......
.....0...0......
......000.......
......0.........
......0.........
......0.........
......000.......
.....0...0......
....0.....0.....
................
................
................
................` ],
  [ goal, bitmap`
7777777777777777
7000000000000007
7077777777777707
7070000000000707
7070777777770707
7070700000070707
7070707777070707
7070707007070707
7070707007070707
7070707777070707
7070700000070707
7070777777770707
7070000000000707
7077777777777707
7000000000000007
7777777777777777`
  ]
);

const levels = [
  map`
wwwwwwwwwwwwwwwwwwwwwww
wg.w........w.........w
w..w..wwww..w.w.......w
w..w..w.....w...w.ww..w
w..w..w...wwww..w..w..w
w..w..w.w....w..w..w..w
w.www...ww...ww.w.www.w
w.....w.w..w....w.....w
w..w............w.....w
w..w..www..w.w.www....w
w..w...w.p.w..........w
w......w...w.....wwww.w
wwww....wwww..ww....w.w
w...........www..w..w.w
w..ww..w.ww......w..w.w
w......w.....w...w..w.w
w.wwwwww..wwwwwwwwwww.w
w.....kw........w...w.w
w..........www..www.w.w
w..wwww.....w...w...w.w
w...w...ww..w...w...w.w
w.........w.........wkw
wwwwwwwwwwwwwwwwwwwwwww`,

  map`
wwwwwwwwwwwwwwwwwwwwwwwww
w......w.....w....w...wgw
w....w..w.ww.w....w.w.w.w
w.ww...ww...............w
w......w...w..www...ww..w
w......w...w....w.......w
w...w......w.....www.ww.w
w..www...........w......w
w.....www.www.wwwww.....w
w...w...............www.w
w.w.....www...w.........w
w.w..w......w.w....www..w
w....w......w.w.w.w..w..w
w....w...w...pw.......w.w
www......wwwwww...w...w.w
w.............w....w..w.w
w..w.www......w.ww.w..w.w
w.......w.ww.w.......ww.w
w..wwww.w..w.w..........w
w.......w..w.w..www..w..w
w.......................w
w.w.ww...............w..w
w.w....www..www..wwww...w
w............kw.........w
wwwwwwwwwwwwwwwwwwwwwwwww`,

  map`
wwwwwwwwwwwwwwwwwwwwwwwwww
w...........w.....w......w
w.ww.www.........www....ww
w..w.....wwww...w...w....w
ww.w..w.ww.....ww.....w.kw
w..w................w..www
w...w.wwww..wwww..w...w..w
w.w.w...........ww....w..w
ww......w.w.w.........w..w
w.w.....w...w.....w...w..w
w...w.....w.....ww..w....w
w.....w.......www........w
w.ww....ww..ww...........w
w.w....w.............w...w
w.....w.....w..w.w....w..w
wgw.........w.........w..w
www...........ww.....ww..w
ww..www..w...w.......w...w
w...w.w....p...w...w.www.w
w...w....www.ww....w.....w
w.........w....w...w...w.w
w.w.......w....www.......w
wwwwwww............w.w...w
w.w..ww.w.w.ww......www..w
w...........w............w
wwwwwwwwwwwwwwwwwwwwwwwwww`,

  map`
wwwwwwwwwwwwwwwwwwwwwwwwwwww
w..............wg......w...w
w....ww......www..w....w...w
w.w....w.w.....w..w.......ww
w..........w...w...........w
w....w.........wwww........w
w...w..w...w..........www..w
w...w......w...........w...w
w...w..w...w....w......w...w
w......w....w.w.w.w.w..w...w
wwwwwwwww..w....w......w...w
w.........ww...www.....w...w
w..........w.........w.....w
w...w...p............w.w.www
w...w...w..w....w..........w
www...ww...w....w..........w
w.............wwwww..w...www
w....w....w..........w.....w
w....w..............w...w..w
w...w............w......w..w
w...w.....w..ww..w......w..w
w...w.....ww.....w.w....w..w
ww.....w.......w......w....w
w......w.......w...w..w.w..w
w...w..ww......ww..w..w....w
w...w.....w....w...w.......w
w..kw......k...............w
wwwwwwwwwwwwwwwwwwwwwwwwwwww`,

  map`
wwwwwwwwwwwwwwwwwwwwwww
wg.w........w.........w
w..w..wwww..w.w.......w
w..w..w.....w...w.ww..w
w..w..w...wwww..w..w..w
w..w..w.w....w..w..w..w
w.www...ww...ww.w.www.w
w.....w.w..w....w.....w
w..w............w.....w
w..w..www..w.w.www....w
w..w...w.p.w..........w
w......w...w.....wwww.w
wwww....wwww..ww....w.w
w...........www..w..w.w
w..ww..w.ww......w..w.w
w......w.....w...w..w.w
w.wwwwww..wwwwwwwwwww.w
w......w........w...w.w
w..........www..www.w.w
w..wwww.....w...w...w.w
w...w...ww..w...w...w.w
w.........w.........wkw
wwwwwwwwwwwwwwwwwwwwwww`,
  
];

setMap(levels[count]);
setSolids([ player, wall ]);

onInput("a", () => { getFirst(player).x -= 1 })
onInput("w", () => { getFirst(player).y -= 1 })
onInput("s", () => { getFirst(player).y += 1 })
onInput("d", () => { getFirst(player).x += 1 })


onInput("j", () => {
  count = 0;
  hasKey = false;
  setMap(levels[count]);
});

afterInput(() => {
  const playerTile = getFirst(player);
  const tiles = getTile(playerTile.x, playerTile.y);

  if (tiles.some(t => t.type === key)) {
    hasKey = true;
    tiles.find(t => t.type === key).remove();
    clearText();
    addText("KEY FOUND!", { x: 5, y: 1, color: color`3` });
  }

  if (tiles.some(t => t.type === goal) && hasKey) {
    count++;
    hasKey = false;

    if (count < levels.length) {
      setMap(levels[count]);
    } else {
      clearText();
      addText("YOU WON!", { x: 6, y: 7, color: color`3` });
    }
  }
});
