/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: 
@author: 
@tags: []
@addedOn: 2024-00-00
*/

const player = "p";
const box = "b"
const wall = "w"
const goal = "g"

setLegend(
  [ player, bitmap`
................
................
................
....6666666666..
....6..6.6...6..
....6...6....6..
....6.6...6..6..
....6........6..
....6........6..
....6666666666..
....6.666666.6..
....6..6666..6..
....6...66...6..
....6666666666..
................
................` 
  ],
  [ box, 
    bitmap`
................
....CCCCCCCCCCC.
....CCCCCCCCCCC.
....CC.C.C.C.CC.
....CC.C.C.C.CC.
....CCCCCCCCCCC.
....CC.C.C.C.CC.
....CCCCCCCCCCC.
....CC.C.C.C.CC.
....CC.CCCCCCCC.
....CC.C.C.C.CC.
....CCCCCCCCCCC.
....CCCCCCCCCCC.
................
................
................`
],
  [
    goal,
    bitmap`
................
.....0000000000.
.....0.5....5.0.
.....0555555550.
.....0.5....5.0.
.....0.5....5.0.
.....0.55.5.550.
.....055.5.55.0.
.....0.5....5.0.
.....0.5....5.0.
.....0555555550.
.....0.5....5.0.
.....0000000000.
................
................
................`
],
  [
    wall,
    bitmap`
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
0000000000000000`
],
  );
let level =0;
const levels =[map`
pwwww
....w
.b..w
w....
wwwwg`,
               map`
wwwwwwwww
w...w...w
w.p.wg..w
w..bw...w
w.......w
w.......w
w.w.....w
w.w.....w
w.......w
wwwwwwwww`,
               map`
.p.....w....
..w....wwwb.
..wg.www....
.....w..w...
......w.w...
...w......b.
.gw....w.w..
............`,
               map`
wwwwwwwwwwwwwwwwwww
wp................w
w.................w
w..wwww..wwwww....w
w..w..ww.w...ww...w
w..ww..w.w...gw...w
w...w........ww...w
w...ww......ww....w
ww...w......w.....w
ww...ww..b.w......w
ww....ww...w......w
ww.....ww.ww......w
wwwwwwwwwwwwwwwwwww`,
               map`
wwwwwwwwww..www
wp....b......ww
wwwwwwww.w....w
ww.....w.ww...w
ww...b.w.www..w
ww.......wwww.w
ww.....wwwwww.w
wwg....wwwwww.w
wwwwwwwwwwwwwgw
wwwwwwwwwwwwwww`,
               map`
wwwwwwwwwwwwwwwww
wg..wwwwww......w
w..........b...w.
w..b..........wwg
w.....ww....ww...
wwwwwwg.....w....
w................
w.....w.......w..
w..ww..........ww
w..........b....w
www...wwwwwwww..w
ww...........w..w
wp.wwwwwwwwwwwwww`,
               map`
wwwwwwwwwwwwwwwwwwwwww
w.......w...w..w.....w
w.b.....w.w.w.w..b.w.w
w....ww...w..........w
w.w.w..........w.w.w.w
w.w.w....gg....w.www.w
www......gg....w.....w
w....w.w..p....w...w.w
wwwwwww.......ww...w.w
w..b..ww.....ww..b...w
w.......w.w..w.......w
w..w..w.w..w.w.wwww..w
w..................www
wwwwwwwwwwwwwwwwwwwwww`,   
               map`
wwwwwwwwwwwwwwwww
wg..wwwwww......w
w..........b...w.
w..b..........wwg
w.....ww....ww...
wwwwwwg.....w....
w................
w.....w.......w..
w..ww..........ww
w..........b....w
www...wwwwwwww..w
ww...........w..w
wp.wwwwwwwwwwwwww`,
               map`
p...................b.....
....wwww.....b............
.b..w.....ww.....www..w...
....w..w..w....www....w...
......w...w..w.w.....w....
....b.w..w...w.w..b..w..b.
........w......w.....w....
www.....w......w.....w....
w....w..w...w.....w.......
w....w..w..ww.....w.......
ww...w..w..w.....ww.......
.ww...w........www....w...
...w....ww...www......w...
....w.b.w....w..b....w....
....w.......w......www....
....ww.....ww....ww....ggg
.b...w..w........w.....ggg
.......................ggg`,
               map`
w........................w
............b.............
..b...www.................
.....ww.wwww........b.....
....ww.....w.w............
...ww.........www.........
..ww.............ww.......
..w.wwww...wwww...www.b...
.ww....w...wp.w...w.......
..w.w..w...w......w.......
..w.wwww...wwww...w....b..
..w...............w.......
..w...............w.......
..w..w......w.....w.......
..w..wwwgggww.....w..b....
..w...ggwwwwgg...ww.......
..wwwwwwwwwwwwwwww....b...
w........................w`,
               map`.
w.......w.........p
www.....w.....ggg..
w.ww..........ggg..
w..ww....www..ggg..
w...w......ww......
w...........ww.....
w.b...ww.....ww....
w...b..ww......ww..
w.b.....ww......www
w........ww........
w..b.b....w........
w.b........ww......
w...b..b....www....
w.............ww...
wwwwwwwwwwwwwwwwwww`,
               map`
p......w................
ww.....w.........ww.....
g.w...w...gg..w.........
.w....w...gg..w...ww....
.w......ww........wg....
.w.w..........w...w.....
...wwwwwwww...w.........
wwww......ww..w.........
.b.b.......w..w.........
.bbb..w....w..w...w...w.
.b.b..w...ww.....w....w.
.......w..w......w....w.
.......w..............w.
www....w.............wg.
...w.......wwwww.....w..
..........ww............`,
               map`.
wwwwwwwwwwwwwwwwwwwwwwwp
www.....................
wwg.......w....w...b...w
w.........w..........b.w
w.........wg.....w.....w
w...w.....ww......w..b.w
w....ww....w.w.........w
w.....ww......w.....w..w
w........www...w....ww.w
w..ww..www......w....w.w
www..w...www.....w...w.w
w......www.......w...w.w
w..........www.......w.w
w..........w.......www.w
...................w...w
g.....b.ww.........w...g
wwwwwwwwwwwwwwwwwwwwwwww`,
               map`
.p.......................................p.
..b.....g......bbbbb.......................
..b.............w..............w....g......
..b...w.w......w.w.........gg..w.......b...
....ww......ww...www.....g.....w...........
..........ww.........ww.ww...........www...
.g.g......w........ww.....w........www.....
...gg........w...ww.......w............w...
..w........ww..g......bb...w.....g.........
.ww..ww...ww...............w...w.g.........
.w....w..w...b..gggg..p....w....w..g.b.w...
.w....w.w....b..................w......w...
.w......ww......wwwwwwww........wb..g......
.w...w...w.w..............w.....w..bg......
.w...w.....w...............w....w...g..w...
.....w............www.wwww..w....w..g..w...
.w.g.w...........ww.........w....w.....w.b.
.w....w.....g..........................w...
......w.........ww...b...........w.....w...
.w..g..........w..bb...wwww.b.....w....w...
..w..........w........ww..........w........
..ww..b....w........ww............w...p....
......b.ww..ww....ww..........w.wwww.....b.
...............www.............w....w......
...p....................................b..
..............b............b...............`
              ];
const currentLevel = levels[level];
setMap(levels[0]);

onInput("w", () => {
  getFirst(player).y -= 1;
});

onInput("s", () => {
  getFirst(player).y += 1;
});

onInput("a", () => {
  getFirst(player).x -=1 ;
});

onInput("d", () => {
  getFirst(player).x += 1;
});

setSolids([player, box, wall]);

setPushables({
  [player]: [box]
});
afterInput(() => {
  const numberCovered = tilesWith(goal, box).length;
  const targetNumber = tilesWith(goal).length;
  if (numberCovered === targetNumber) {
    level = level + 1;
    const currentLevel = levels[level];
    if (currentLevel !== undefined) {
      setMap(currentLevel);
  } else {
      addText("You Win!!! You are the best!!!", { y: 4, color: color`0`});
    }
  }
});
onInput("j", () => {
  const currentLevel = levels[level];
  if (currentLevel !== undefined) setMap(currentLevel);
});






