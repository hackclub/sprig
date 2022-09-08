/*
Originally sourced from getting_started by author leo. Done it up and learnt through the docs.
+ Levels completely different,
+ few new blocks and mechanics,
+ functioning levels.

@title: Random Block Game
@author: nicholasyoannou


-------
IGNORE BELOW, JUST A NOTE TO SELF FOR MAYBE ANOTHER TIME
Make your own game! Try
 - adding two players
 - leaving a trail as you move
 - having different blocks and goal types
 - come up with your own mechanic!

*/


const player = "p";
const box = "b";
const goal = "g";
const wall = "w";
const grass = 'a';
const fire = 'f';
const slime = 's';

setLegend(
  [ player, bitmap`
................
................
................
.......0........
.....00.000.....
....0.....00....
....0.0.0..0....
....0......0....
....0......0....
....00....0.....
......00000.....
......0...0.....
....000...000...
................
................
................`],
  [ box, bitmap`
................
................
................
...88888888888..
...8....8....8..
...8....8....8..
...8....8....8..
...8....8....8..
...88888888888..
...8....8....8..
...8....8....8..
...8....8....8..
...8....8....8..
...88888888888..
................
................`],
  [ goal, bitmap`
................
................
................
....444444......
...44....44.....
...4......4.....
...4.......4....
...4.......4....
...4.......4....
...44......4....
....4......4....
....44....44....
.....444444.....
................
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
  [ grass, bitmap `
................
................
................
................
................
................
.....44.44.4....
.....44.44.4....
.....44.4444....
....44444444....
....4..44444....
...4...4...44...
............4...
............4...
................
................`,
  fire, bitmap `
......3.........
.....333........
.....3.3........
.....3..3.......
.....3..3..3....
....3....3.3....
....33..33.33...
....33..33.33...
....33..33.3.3..
...3.33.33.3.3..
...3.33.333.33..
...3.3.3333333..
...3.3..33.333..
........333...3.
.........3.333..
................`,
  'slime', bitmap `
................
................
................
................
................
................
................
.....444444.....
.....444444.....
.....424424.....
.....442244.....
.....444444.....
.....444444.....
................
................
................`]
)
let level = 0;
const levels = [
  map`
p.bg`,
  map`
p..
.b.
..g`,
  map`
..ag
pbaa
..w.
..w.`,
  map`
p.g.
.a.b
.b.b
a.bg`,
  map`
g..g..
......
w.w...
w..b..
ww....
.p.b..
......`,
  map`
p.w..
.bwg.
.....
..bg.
.....`,
  map `
..........
...b.aaag.
....paaaa.
.....aaaa.
.....aaa..
..........`,
];

const currentLevel = levels[level];
setMap(currentLevel);
addText(`Starting Level`, { y: 2, x: 0, color: [255, 0, 0] });

setSolids([ player, box, wall, fire ]);

setPushables({
  [player]: [ box, player ],
  [box]: [ box ],
});

// MUSIC AND START - PLAYER MOVEMENT CONTROLS
const melody_moment = tune `
74.81296758104739: c5^74.81296758104739,
74.81296758104739: c5^74.81296758104739,
74.81296758104739: c5^74.81296758104739 + d5^74.81296758104739,
74.81296758104739: d5^74.81296758104739 + e5^74.81296758104739,
74.81296758104739: e5^74.81296758104739 + f5^74.81296758104739,
74.81296758104739: e5^74.81296758104739 + f5^74.81296758104739 + g5^74.81296758104739,
74.81296758104739: f5^74.81296758104739 + g5^74.81296758104739,
74.81296758104739: g5^74.81296758104739,
1795.5112219451373`

onInput("s", () => {
  getFirst(player).y += 1;
});

onInput("d", () => {
  getFirst(player).x += 1;
});

onInput("a", () => {
    // Move the player one tile to the right
    getFirst(player).x -= 1
})

onInput("w", () => {
    // Move the player one tile to the right
    getFirst(player).y -= 1
})


// END - PLAYER MOVEMENT CONTROLS

onInput("j", () => {
  const currentLevel = levels[level];
  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
    clearText()
    addText(`Level ${level}`, { y: 4, color: [255, 0, 0] });
  }
});

afterInput(() => {
  // count the number of tiles with goals
  const targetNumber = tilesWith(goal).length;
  
  // count the number of tiles with goals and boxes
  const numberCovered = tilesWith(goal, box).length;

  const numberCoveredFire = tilesWith(box,fire).length;
  console.log(numberCoveredFire);

  if (numberCovered === targetNumber) {
    // increase the current level number
    level = level + 1;
    playTune(melody_moment)

    const currentLevel = levels[level];

    // make sure the level exists and if so set the map
    if (currentLevel !== undefined) {
      clearText()
      addText(`Level ${level}`, { y: 4, color: [255, 0, 0] });
      setMap(currentLevel);
    } else {
      addText("you win!", { y: 4, color: [255, 0, 0] });
    }
  }
});
