
const Arrow = "a"
const wall = "w"
const bg = "b"
setLegend(
  [ Arrow, bitmap`
................
................
................
................
................
L...............
3L..............
33L.............
333L........LLL.
3333LLLLLLL3LLLL
333L........LLL.
33L.............
3L..............
L...............
................
................` ],
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
0000000000000000` ],
    [ bg, bitmap`
................
................
................
................
................
....00000.......
....02020.......
....00000.......
....02220.......
......0.........
....00000.......
....0.0.0.......
....0.0.0.......
......0.........
.....0.0........
....0...0.......` ],
  
)

setSolids([Arrow,wall])

let level = 0;
const levels = [
  map`
aw...
.w.w.
.w.w.
.w.w.
...wb`,
  map`
w.aw.w....w..
w..w....w....
w..w.www..w..
w..w...w..w..
w..w.w.ww.w..
w..w......w..
w....wwww.b.`,
  map`
w.aw.........
...w.wwwwwww.
...w.wwwww...
...w.....w..w
...wwwww.w.w.
.........w...
....wwwwwwww.
...wb........`,
  map`
w............
.............
.............
........w....
wwwwww..w.ww.
a.........w..
ww..w.w...w..
....wwwwwww..
.w...w....w..
.wwwwwb.w.w..
.w...wwww.w..
.w...w..w.w..
.w.w.w..w....
.w.w.w..wwww.
.......w.....`, 
  map`
w...bw......w......
....ww.wwwwww.wwww.
............w......
...w....ww.....w.
...w.w.w..wwwwwww..
...wwwwww.ww....w..
..........w...waw.w
....ww.w..w.w.www.w
.......ww..........
...........w.w...ww
.....w.w..w...w..w.
....w.w.ww.........
..........wwwwwwwwwss`,
  map`
....w..w...wa.....
.ww......w..wwwww.
.w...ww.wwww......
.www..ww..ww.ww.ww
.........w.w......
www....www..w..www
.bw.www.....w..w..
w.w..wwww.w.w..w..
..........w...ww..`,
  
];
 
  

setMap(levels[level])



onInput("s", () => {
  getFirst(Arrow).y += 1
})
onInput("w", () => {
  getFirst(Arrow).y += -1
})
onInput("a", () => {
  getFirst(Arrow).x += -1
})
onInput("d", () => {
  getFirst(Arrow).x += 1
})

afterInput(() => {

})

afterInput(() => {
  // count the number of tiles with goals
  const targetNumber = tilesWith(bg).length;
  
  // count the number of tiles with goals and boxes
  const numberCovered = tilesWith(bg, Arrow).length;

  if (numberCovered === targetNumber) {
    // increase the current level number
    level = level + 1;

    const currentLevel = levels[level];

    // make sure the level exists and if so set the map
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("you win!", { y: 4, color: color`3` });
    }
  }
});
//End - Teleport Feature 
