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
p.....w....
.ww...wwwb.
.wg.www....
....w..w...
.....w.w...
..w......b.
gw....w.w..`
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
wwwwwwwwwwwwwwwwwwwwww`
map`
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
wwwwwwwwwwwwwwwwwww`
               
               map`
wwwwwwwwwwwwwwww
wp......gw.....w
w........w.....w
w.b......w..b..w
w.......w......w
ww.wwww...wwww.w
w...wg.......w.w
w...wwwww....w.w
w.......w....w.w
w.b.....w....w.w
w.......w.....gw
wwwwwwwwwwwwwwww`,
            map`
..............w......
.g.w.w...w.b..w....g.
.....w........wwww...
w.w...wwww..b....w.ww
...w...wp.....w..w.w.
.......ww.b.w....w.w.
.wwwwwww...ww...ww.ww
..w........w..b.w....
..ww.w.w...ww...w....
...w........w...w....
...w...........ww....
..wwww...wwwwwww.....
.ww.w..............g.
gw.....wwwwwwww......` 
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
      addText("You Win!!!", { y: 4, color: color`5`});
    }
  }
});
onInput("j", () => {
  const currentLevel = levels[level];
  if (currentLevel !== undefined) setMap(currentLevel);
});






