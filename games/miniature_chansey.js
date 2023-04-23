const player = "p";
const box = "b";
const goal = "g";
const wall = "w";


setLegend(
  [ player, bitmap`
................
......00........
....00070000....
...0777777700...
...0777777770...
...0773377730...
..00077777700...
..0500077000....
.055000000500...
.050555555550...
.050555555550...
.050555555500...
.05055555500....
..005500550.....
...000..000.....
................`],
  [ box, bitmap`
................
.LLLLLLLLLLLLLL.
.LLL11111111LLL.
.LL3111111113LL.
.L113111111311L.
.L111311113111L.
.L111131131111L.
.L111113311111L.
.L111113311111L.
.L111131131111L.
.L111311113111L.
.L113111111311L.
.LL3111111113LL.
.LLL11111111LLL.
.LLLLLLLLLLLLLL.
................`],
  [ goal, bitmap`
................
................
.......44.......
......4DD4......
.....4DDDD4.....
....4DDDD224....
...4DDDDDD2D4...
...4DDDDDDDD4...
..4DDDDDDDDDD4..
..4DDDDDDDDDD4..
...4DDDDDDDD4...
....4DDDDDD4....
.....4DDDD4.....
......4DD4......
.......44.......
................`],
  [ wall, bitmap`
................
.LLLLLLLLLLLLLL.
.LLLLLLLLLLLLLL.
.LL6666666666LL.
.LL1111111111LL.
.LL6666666666LL.
.LL1111111111LL.
.LL6666666666LL.
.LL1111111111LL.
.LL6666666666LL.
.LL1111111111LL.
.LL6666666666LL.
.LL1111111111LL.
.LLLLLLLLLLLLLL.
.LLLLLLLLLLLLLL.
................`]

 

   
  


 

);
let level = 0;
const levels = [
  map`
.p.bg.`,
  map`
....
p...
..b.
...g`,
  map`
p.wg
.bw.
..w.
..w.`,
  map`
pw...
w..b.
...b.
.bbg.`,
  map`
g.w...
....ww
bbp.wg
......
......`,
  map`
.......
....bb.
g......
..bp.w.
.....wg
www....
......g`
];



const currentLevel = levels[level];
setMap(currentLevel);

setSolids([ player, box,  ]);

setPushables({
  [player]: [ box  ]
});

// START - PLAYER MOVEMENT CONTROLS


onInput("w", () => {
  getFirst(player).y += -1;
});

onInput("s", () => {
  getFirst(player).y += 1;
});

onInput("d", () => {
  getFirst(player).x += 1;
});

onInput("a", () => {
  getFirst(player).x += -1;
});

afterInput(() => {
  // count the number of tiles with goals
  const targetNumber = tilesWith(goal).length;
  
  // count the number of tiles with goals and boxes
  const numberCovered = tilesWith(goal, box, ).length;

  if (numberCovered === targetNumber) {
    // increase the current level number
    level = level + 1;

    const currentLevel = levels[level];

    // make sure the level exists and if so set the map
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("You Win!", { y: 4, color: color`3` });
    }
  }
});