/*
@title: escape_room
@author: Sampanna and Dhruv
@tags: ['puzzle']
@addedOn: 2022-11-01

*/
const wall = "w";
const player = "p";
const goal = "g";
setLegend(
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
0000000000000000`],[player, bitmap`
................
................
...0000000000...
...0000000000...
...0222002220...
...0022002200...
...0000000000...
.....002200.....
......CCCC......
......CCCC......
......CCCC......
......CCCC......
......CCCC......
......CCCC......
....00000000....
....00000000....`],  [ goal, bitmap`
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444`]
)
let level = 0;
const levels = [map`
w.p.wwwwwwwwwwwwww
w...w............w
w...w............w
w...wwwwwwww.....w
w..........w.....w
w..........w..w..w
w..........w..w..w
wwww..www.....wwww
w..w..w.......w..g
w..w..w.......w..w
w.....wwwwwwwww..w
w.....w.......w..w
w..w..w.......w..w
w..w..w..w..www..w
w..wwww..w.......w
w........w.......w
w........w.w.....w
wwwwwwwwwwwwwwwwww`,map`
wwwwwwwwwwwwwwwwwwwwp
w...w.....w.w........
www.wwwww.w.www.wwwww
w.w...w.w.......w...w
w.w.www.wwwwwww.w.w.w
w.w.........w...w.w.w
w.wwwwwwwww.w.w.w.w.w
w...........w.w...w.w
wwwwwww.w.www.w.wwwww
w.w.w.w.w...w.w.w.w.w
w.w.w.w.www.www.w.w.w
w.w.......w.w.......w
w.wwwwwww.www.www.www
w.......w...w.w.w.w.w
w.wwwwwwwww.w.w.www.w
w...................w
w.w.w.www.www.wwwww.w
w.w.w.w.w...w.w...w.w
wwwww.w.wwwww.www.w.w
wg....w.........w...w
wwwwwwwwwwwwwwwwwwwww`,map`
wwwwwwwwwwwwwwwwwwwwwwwwwww
wp..w.....w.w..........w..w
www.wwwww.w.www.www...www.w
w.w...w.w.......w...w..w.ww
w.w.www.wwwwwww.w.w.ww.w..w
w.w.........w...w.w.w..w..w
w.wwwwwwwww.w.w.w.w.......w
w...........w.w...w.....www
wwwwwww.w.www.w.wwwww.w...w
w.w.w.w.w...w.w.w.w...w...w
w.w.w.w.www.www.w.w.wwww..w
w.w.......w.w.............w
w.wwwwwww.www.www.www.www.w
w.......w...w.w.w.w.w.w.w.w
w.wwwwwwwww.w.w.www.www.w.w
w.......................w.w
w.w.w.www.www.wwwww.wwwww.w
w.w.w.w.w...w.w...w.w..w..w
wwwww.w.wwwww.www.w....w..w
w.....w.........w...w..w..w
w.w...w.wwww.ww.....w.....w
w.wwwww.w..w.....w..ww....w
w.......w..www.www..ww.ww.w
w..w.................w.w..w
wwww..ww.w.wwwwwww..ww.wwww
w....www.w......w....w....w
wwwwwwww.wwwwwwwwwwwwwwwwgw`,map`
wwwwwwwwwwwwwwwwwwwwwwwwwwwww
w.....w.........w.......w...w
w.www.w.wwwwwww.w.wwwww.w.w.w
w...w.w...w...w.w.w...w.w.w.w
wwwww.wwwww.w.w.w.www.w.www.w
p.....w...w.w.w.w.....w.w...w
wwwww.w.w.www.w.wwwwwww.w.w.w
w.....w.w.....w.w.........w.w
w.www.www.wwwww.w.www.wwwww.w
w.w.w.....w...w.w.w.w.w...w.w
w.w.wwwwwww.www.w.w.w.w.wwwww
w...w.....w.....w...w...w...w
w.w.w.w.www.wwwww.w.w.w.w.www
w.w.w.w...w.w.....w.w.w.....w
w.w.w.w.w.w.wwwwwwwww.wwwwwww
w.w.w.w.w.w.........w.....w.w
w.w.w.w.w...wwwwwww.wwwww.w.w
w.w.www.wwwww.....w.w...w...w
w.w.........w.www.w.www.www.w
w.www.w.w...w...w.w.......w.w
w.w...w.wwwwwwwww.w.wwwww.w.w
w.w.www.....w...w.w.w...w.w.w
w.w.w.wwwww.w.w.w...w.www.www
w...w.w...w.w.w.w.w.w.......w
wwwww.w.w.w.w.w.w.w.wwwwwwwww
w.......w.w.w.w...w.........w
w.wwwwwww.www.ww.wwww.wwww.ww
w.............w...w.....w...w
wwwwwwwgwwwwwwwwwwwwwwwwwwwww`,map`
wwwwwwwwwwwwwwwwwwwwwwww
w..w..w.w.w............w
w.www.....w.wwwwwwwwww.w
w.....www....w.w.......w
w.w.w..w..wwww...wwwww.w
w.w.wwwwwww..ww.ww..w..w
w.w.w..w..ww....w..www.w
w.w...www..w.ww.ww.....w
wwwww...ww....www..www.w
w...w.w..wwww.w...ww.w.w
w.www.ww.w....w.www....w
w.w...w..ww.www.w.ww.www
w.ww.www.w..w...w.w....w
w........w.ww.w.w...ww.w
wwwwwwww.w....w.wwwww..w
w......w.wwww.w.w..w..ww
ww.www...w....www.w....w
w....wwwww.wwww...wwwwww
w.ww.w.....w..w........w
w.w..ww.wwww.ww.w.ww.www
wwww.w...w......w.w....w
w....w.w.w.wwwwwwwww.www
w.ww.www.w....w........w
w.w....w.wwww.w.wwwwww.w
w.w.wwww......w......w.w
w.w....w.wwww.www.w.ww.w
wwwww.ww...w....w.w.w..w
w..w...w.w.w.wwww.w.wwww
w.www.ww.www...w..w....w
w.....w....www.w.wwwww.w
www.wwwwww.w...w.....w.w
w...w......w.wwwwwww.w.w
w.www.ww.www.........w.w
w.w...w....wwwwwwwwwwwww
w.w...w.ww.....w...w...w
w.w...w.w....w.www.w.w.w
w.www.w.w.wwww.....w.www
w...w...w......w.w.....w
wpwwwwwwwwwwwwwwwwwwwwgw`

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
    // increase the current level number
    level = level + 1;

    const currentLevel = levels[level];

    // make sure the level exists and if so set the map
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      setMap(map`
wwwwwwwwww
wwwwwwwwww
wwwwwwwwww
wwwwwwwwww
wwwwwwwwww
wwwwwwwwww`);
      addText("Yass you won", { y: 4,x:4 });
      addText("Slayyyyy", { y: 5,x:4});
    }
  }
});

