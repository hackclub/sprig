
/* 
@title: breakfast_maze!
@author: Alex
@tags: ['puzzle']
@addedOn: 2023-08-01
*/

    const player = "p"
const goal = "g"
const maze = "m"
const key = "k"
const lock = "l"
const portal1 = "1"
const portal2 = "2"
const wall = "w"
const background = "b"


setLegend(
  [ player, bitmap`
................
................
.........H......
....HHHHHHH.....
....HHHHH88H....
...HH0HHH08H....
...HHHHHHHHH....
....HH8HHHH.....
...HH8000HHH....
...HHHHHHHHH....
....HHHHHHHH....
....HHHHHHH.....
.....H.H........
................
................
................` ],
  [ goal, bitmap `
................
................
................
.....CCCCCC.....
....CCCCCCCC....
...CCCCCCCCCC...
...CCC0CC0CCC...
...CCCCCCCCCC...
...CCCCCCCCCC...
...CCC000CCCC...
..CCCCCCCCCCCC..
....CCCCCCCC....
....CC.CC.CC....
................
................
................`],
  [ maze, bitmap `
................
.CC0CCCCC0CCCCC.
.CCCCCCCCCCCCCC.
.CCCCCCCCCCCCCC.
..CCC0CC0C0CCC..
..CCCCCCCCCCC0..
..0CCC0CCCCCCC..
..CCC0CCC0CCCC..
..CCCCCCCC0C0C..
..CC0CCCCCCCCC..
..CCCCC0CCCCCC..
..0CCCCCC0CCCC..
..CC00CCCCCC0C..
..CCCCCCCCCCCC..
..0CCC0CCC0CCC..
................`],
  [ key, bitmap`
................
................
......0000......
.....066660.....
.....060060.....
.....060060.....
.....066660.....
......0660......
.....00660......
....066660......
.....00660......
.....00660......
....066660......
.....0000.......
.......0........
................`],
  [ lock, bitmap`
6666666666666666
6666666666666666
6666666666666666
6666600000066666
6666606666066666
6666606666066666
6600000000000066
6606666666666066
6606666666666066
6606660660666066
6606666666666066
6606660000666066
6606666666666066
6600000000000066
6666666666666666
6666666666666666`],
  [ portal1, bitmap`
................
................
.....000000.....
...00DDDDDD00...
...0DDDDDDDD0...
..0DDDDDDDDDD0..
..0DDDDDDDDDD0..
..0DDDDDDDDDD0..
..0DDDDDDDDDD0..
..0DDDDDDDDDD0..
..0DDDDDDDDDD0..
...0DDDDDDDD0...
...00DDDDDD00...
.....000000.....
................
................`],
  [ portal2, bitmap`
................
................
.....000000.....
...0077777700...
...0777777770...
..077777777770..
..077777777770..
..077777777770..
..077777777770..
..077777777770..
..077777777770..
...0777777770...
...0077777700...
.....000000.....
................
................`],
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
  [ background, bitmap`
8888888888888888
8888888888888888
2222222222222222
2222222222222222
8888888888888888
8888888888888888
2222222222222222
2222222222222222
8888888888888888
8888888888888888
2222222222222222
2222222222222222
8888888888888888
8888888888888888
2222222222222222
2222222222222222`]
  
)


setSolids([player, maze, lock, wall])

let level = 0
const levels = [
  map`
p.
.g`,
  map`
p..
mm.
..g`,
  map`
pmg.
.m..
.mm.
....`,
  map`
p.mgmm
m.m.m.
..m...
.mmmm.
......
mmmmm.`,
  map`
p.lg
.mmm
.m..
...k`,
  map`
pm......m.k
.m.mmmm.m..
.m....m.mm.
.m.mm.m....
.mmmm.mmmmm
...........
mmmmmmmmmml
.l...m..km.
.m.m...m.m.
.m.m.mmmmm.
gm.m.......`,
  map`
p.1
mmm
g.2`,
  map`
p....1
mmmm.m
..m...
.m....
...mmm
lm.m2.
gm.m.k`,
  map`
pwm2m...
.wmkm.mg
.wmmm.mm
.w.w....
.w.wmmm.
.w.w....
.w.w.mm.
1l......`,
  map`
.m.......mm..........p..
.m.......m..............
mmm.m.m.mmm.mmm.mmm.....
.m..m.m..m..m.m.m.m.....
.mm.mmm..m..mmm.m....g..
......m.................
....mmm.................
........................
.....m..................
.mmm.m.mmm.....m........
.m.m.m...m.m.m...mmm.mmm
.mmm.m.mmm.m.m.m.m.m.m.m
.m...m.m.m.mmm.m.m.m.mmm
.m...m.mmm...m.m.m.m...m
...........mmm.......mmm
........................`

]
setMap(levels[level])

setBackground(background)

onInput("s", () => {
  getFirst(player).y += 1; 
});

onInput("d", () => {
  getFirst(player).x += 1;
});

onInput("w", () => {
  getFirst(player).y -= 1;
});

onInput("a", () => {
  getFirst(player).x -= 1;
});

afterInput(() => {
  
  const targetNumber = tilesWith(goal).length;
  const portal1Covered = tilesWith(player, portal1);
  const portal2Covered = tilesWith(player, portal2);
  
  if (portal2Covered.length >= 1) {
    const pt = getFirst(portal1);
    const pl = getFirst(player);

    pl.x = pt.x;
    pl.y = pt.y;
  }

  if (portal1Covered.length >= 1) {
    const pp = getFirst(portal2);
    const pl = getFirst(player);

    pl.x = pp.x;
    pl.y = pp.y;
  }
  
  // count the number of tiles with goals and boxes
  const numberCovered = tilesWith(goal, player).length;
  const keysTaken = tilesWith(player, key); // ADDED: all the keys that the player is on

  // if the number of goals is the same as the number of goals covered
  // all goals are covered and we can go to the next level
  if (numberCovered === targetNumber) {
    // increase the current level number
    level = level + 1;

    const currentLevel = levels[level];

    // make sure the level exists and if so set the map
    // otherwise, we have finished the last level, there is no level
    // after the last level
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("WOO!", { y: 7, color: color`D` });
    }
  }
   if (keysTaken.length >= 1) {
      getFirst(lock).remove();
      getFirst(key).remove();
    }
});
