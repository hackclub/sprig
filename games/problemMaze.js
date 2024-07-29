/*
@title: maze
@author: Gramgra07
@tags: ["maze"]
@addedOn: 2024-07-29
*/

const player = "p"
const wall = "w"
const goal = "g"
const trigger = "t"
const movingWall = "m"
const portal = "o"
const portal2 = "i"
const key = "k"
const door = "d"
const trigger2 = "j"
const movingWall2="e"
triggerPressedOnce = false

setLegend(
  [player, bitmap`
................
................
.......000......
.......0.0......
......0..0......
......0...0.0...
....0003.30.0...
....0.0...000...
....0.05550.....
......0...0.....
.....0....0.....
.....0...0......
......000.......
......0.0.......
.....00.00......
................`],
  [wall, bitmap`
0000000000000000
0777777777777770
0700000000000070
0700000000000070
0700000000000070
0700000000000070
0700000000000070
0700000000000070
0700000000000070
0700000000000070
0700000000000070
0700000000000070
0700000000000070
0700000000000070
0777777777777770
0000000000000000`],
  [goal, bitmap`
................
....66666666....
...6666666666...
..666FFFFFF666..
.666FFFFFFFF666.
.66FFF6666FFF66.
.66FF66FF66FF66.
.66FF6FFFFFFF66.
.66FF6FFFFFFF66.
.66FF66FF66FF66.
.66FFF6666FFF66.
.666FFFFFFFF666.
..666FFFFFF666..
...6666666666...
....66666666....
................`],
  [trigger, bitmap`
................
................
................
................
.............LL.
.............LL.
............CCC.
...........CCC..
..........CCC...
.........CCC....
........CCC.....
.......CCC......
...LLLLLLLLLLL..
...LLLLLLLLLLL..
................
................`],
  [trigger2, bitmap`
................
................
................
................
.............L4.
.............LL.
............CCC.
...........CCC..
..........CCC...
.........CCC....
........CCC.....
.......CCC......
...LLLLLLLLLLL..
...LLLLLLLLLLL..
................
................`],
  [movingWall, bitmap`
................
.00000000000000.
.09999999999990.
.09000000000090.
.09000000000090.
.09000000000090.
.09000000000090.
.09000000000090.
.09000000000090.
.09000000000090.
.09000000000090.
.09000000000090.
.09000000000090.
.09999999999990.
.00000000000000.
................`],
  [movingWall2, bitmap`
................
.00000000000000.
.04444444444440.
.04000000000040.
.04000000000040.
.04000000000040.
.04000000000040.
.04000000000040.
.04000000000040.
.04000000000040.
.04000000000040.
.04000000000040.
.04000000000040.
.04444444444440.
.00000000000000.
................`],
  [portal, bitmap`
................
....HHHHHHHH....
...HHHHHHHHHH...
..HHHHHHHHHHHH..
.HHHH888888HHHH.
.HHH88888888HHH.
.HHH88888888HHH.
.HHH88888888HHH.
.HHH88888888HHH.
.HHH88888888HHH.
.HHH88888888HHH.
.HHHH888888HHHH.
..HHHHHHHHHHHH..
...HHHHHHHHHH...
....HHHHHHHH....
................`],
  [portal2, bitmap`
................
....55555555....
...5555555555...
..555777777555..
.55577777777555.
.55777777777755.
.55777777777755.
.55777777777755.
.55777777777755.
.55777777777755.
.55777777777755.
.55577777777555.
..555777777555..
...5555555555...
....55555555....
................`],
  [key,bitmap`
................
................
................
................
..66666.........
.6666666........
.6666666FFFFFFFF
.6666666FFFFFFFF
.6666666...FF.FF
.6666666...FF.FF
.6666666........
..66666.........
................
................
................
................`],
  [door,bitmap`
................
................
................
................
.....CCCCCC.....
....CCC000CC....
....CCC000CC....
....0CC000CC....
....CCC000CC....
....CCCCCCCC....
....CCCCCCCC....
....CCCCCCLC....
....CCCCCCCC....
....0CCCCCCC....
....CCCCCCCC....
....CCCCCCCC....`],
)

setSolids([wall, player, movingWall,movingWall2,door])

let level = 0
const levels = [
  map`
...w.w..
ww.w..w.
w...w..w
..w...w.
.w..w..w
.pw.ww.g`,
  map`
.....w..
ww.w..w.
..m.w...
.ww..ww.
..tw....
pwwgm..w`,
  map`
..gw.wwt
..w.....
w.wm.w.w
..w.ww..
.wwm..w.
..m..wwp`,
  map`
pww..wwg
..tw....
.ww..ww.
.wow...w
..m..wm.
w.w..wow`,
  map`
pwwm.wwg
..tw....
.ww..ww.
.wow...w
..mm.wm.
wmwm.wow`,
  map`
pm.....g
.w.w.ww.
tw.w.ww.
w..w.w..
ow.w...m
...w..mo`,
  map`
g.w.....
.dw.....
wm..m...
.kwmm...
www..www
piw..t.i`,
  map`
k.....dg
.m.ww.ow
.mw.tw.w
omwipw.w
wwwwwwm.
i.......`,
  map`
....w.............
.ww.ww.wwwwwwww...
.w..ww.w......w..w
.w..ww........w.wo
.w..wwww.wwwwww.w.
.w..w....w......w.
.w..w.g.ww.wwwwww.
dw..w...w..w..eeee
kw..w...w..wmmmm..
.w..wwwww..w..eeee
.w.........wmmmm..
ow.........w..eeee
wwwwwwwwwwwwww....
p....jt...........`,
//   map`
// kw.....w......w..t
// ..w.m..w.w.ww.w.wo
// w..w.w.w..ww..w...
// ww...w.w.ww..w..ww
// ..wwww.w..w.w....w
// .ww...eww.w.wwww.w
// w......w.pw....w.w
// w.w..ww...w.wwww.w
// w.w.w.....w......w
// w.w...wwwwwwwwwwww
// w.wwww.w...w....w.
// w...d..w.w...ww.w.
// w.wwm..w.w.owww.w.
// wwwgm..w.ww.www..j`,
]

setMap(levels[level])

setPushables({
  [player]: []
})

onInput("s", () => {
  getFirst(player).y += 1
})
onInput("w", () => {
  getFirst(player).y -= 1
})
onInput("a", () => {
  getFirst(player).x -= 1
})
onInput("d", () => {
  getFirst(player).x += 1
})
onInput("j", () => {
  const currentLevel = levels[level]; // get the original map of the level

  // make sure the level exists before we load it
  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
  }
});
afterInput(() => {
  if (tilesWith(key, player).length > 0) {
    const doors = getAll(door);
    for (let i = 0; i < doors.length; i++) {
      doors[i].remove();
    }
    const keys = getAll(key);
    
    for (let i = 0; i < keys.length; i++) {
      keys[i].remove();
    }
  }
  if (tilesWith(trigger, player).length > 0) {
    const movingWalls = getAll(movingWall);
    for (let i = 0; i < movingWalls.length; i++) {
      movingWalls[i].x += 1;
    }
  }
  if (tilesWith(trigger2, player).length > 0) {
    const movingWalls2 = getAll(movingWall2);
    for (let i = 0; i < movingWalls2.length; i++) {
      movingWalls2[i].x -= 1;
    }
  }
  if (tilesWith(portal, player).length > 0) {
    let number = tilesWith(portal,player).length
      nextX = getAll(portal)[number].x;
      nextY = getAll(portal)[number].y;
    if (nextX === getFirst(player).x && nextY === getFirst(player).y){
      nextX = getAll(portal)[0].x;
      nextY = getAll(portal)[0].y;
    }
      getFirst(player).x = nextX;
      getFirst(player).y = nextY;
  }
  if (tilesWith(portal2, player).length > 0) {
    let number = tilesWith(portal2,player).length
      nextX = getAll(portal2)[number].x;
      nextY = getAll(portal2)[number].y;
    if (nextX === getFirst(player).x && nextY === getFirst(player).y){
      nextX = getAll(portal2)[0].x;
      nextY = getAll(portal2)[0].y;
    }
      getFirst(player).x = nextX;
      getFirst(player).y = nextY;
  }
  const numberCovered = tilesWith(goal, player).length;
  if (numberCovered === 1) {
    level = level + 1;

    const currentLevel = levels[level];
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("you win!", { y: 4, color: color`H` });
    }
  }
})
