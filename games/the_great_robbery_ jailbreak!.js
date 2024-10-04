/*
@title: jailbreak :)
@author: navya
@tags: ['multiplayer']
@addedOn: 2024-06-26
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

*/



const melody = tune`
181.8181818181818: G4-181.8181818181818,
181.8181818181818: F4-181.8181818181818,
181.8181818181818: F4-181.8181818181818,
181.8181818181818: F4-181.8181818181818,
181.8181818181818: G4-181.8181818181818,
181.8181818181818: A4-181.8181818181818,
181.8181818181818: B4-181.8181818181818,
181.8181818181818: A4-181.8181818181818,
181.8181818181818: G4-181.8181818181818,
181.8181818181818: F4-181.8181818181818,
181.8181818181818: E4~181.8181818181818,
181.8181818181818: D4~181.8181818181818,
181.8181818181818: C4~181.8181818181818,
181.8181818181818: D4^181.8181818181818,
181.8181818181818: E4^181.8181818181818,
181.8181818181818: F4^181.8181818181818,
181.8181818181818,
181.8181818181818: G4^181.8181818181818,
181.8181818181818,
181.8181818181818: F4^181.8181818181818,
181.8181818181818,
181.8181818181818: E4^181.8181818181818,
181.8181818181818,
181.8181818181818: D4^181.8181818181818,
181.8181818181818,
181.8181818181818: C4^181.8181818181818,
181.8181818181818: C4~181.8181818181818,
181.8181818181818: C4-181.8181818181818,
181.8181818181818: D4-181.8181818181818,
181.8181818181818: E4-181.8181818181818,
181.8181818181818: F4-181.8181818181818,
181.8181818181818: G4-181.8181818181818`;
const robber = "r";
const robber2 = "s";
const money = "m";
const wall = "w";
const finish = "f";
const background = "b";
const gate = 'g';
const key = 'k';

setLegend(
  [ robber, bitmap`
................
................
.....00000......
.....00000......
.....CCCCC......
....C00000C.....
....C00C00C.....
.....CCCCC......
......CCC.......
...000000000....
...022222220....
...000000000....
...022222220....
....0000000.....
.....00000......
.....00.00......` ],
  [ robber2, bitmap`
................
................
......00000.....
......CCCCC.....
.....CC0C0CC....
.....CCCCCCC....
......CCCCC.....
....000000000...
....999999999...
....000000000...
....999999999...
....CC00000CC...
......99999.....
......99999.....
......00000.....
......00000.....`],
  [ wall, bitmap `
LLLL1LLLL1LLLL1L
LLLL1LLLL1LLLL1L
1111111111111111
L1LLLL1LLLL1LLLL
L1LLLL1LLLL1LLLL
1111111111111111
LLLL1LLLL1LLLL1L
LLLL1LLLL1LLLL1L
1111111111111111
L1LLLL1LLLL1LLLL
L1LLLL1LLLL1LLLL
1111111111111111
LLLL1LLLL1LLLL1L
LLLL1LLLL1LLLL1L
1111111111111111
L1LLLL1LLLL1LLLL`],
  [ finish, bitmap`
0000222200002222
0000222200002222
0000222200002222
0000222200002222
2222000022220000
2222000022220000
2222000022220000
2222000022220000
0000222200002222
0000222200002222
0000222200002222
0000222200002222
2222000022220000
2222000022220000
2222000022220000
2222000022220000`],
  [ background, bitmap`
0000000000000000
LLLLLLLLLLLLLLLL
0000000000000000
LLLLLLLLLLLLLLLL
0000000000000000
LLLLLLLLLLLLLLLL
0000000000000000
LLLLLLLLLLLLLLLL
0000000000000000
LLLLLLLLLLLLLLLL
0000000000000000
LLLLLLLLLLLLLLLL
0000000000000000
LLLLLLLLLLLLLLLL
0000000000000000
LLLLLLLLLLLLLLLL`],
  [ gate, bitmap`
........3.......
.......33.......
3......333.....3
3....33.333....3
3...333.3.33...3
3...3.3.3.3.3..3
3..33.3.3.3.33.3
3.333.3.3.3.3333
333.3.3.3.3.3.33
3333333333333333
3.3.3.3.3.3.3..3
3333333333333333
3.3.3.3.3.3.3..3
3333333333333333
3.3.3.3.3.3.3..3
3333333333333333`],
  [ key, bitmap`
................
................
................
...6666.........
...6..66........
...6..66666666..
...6..66...6.6..
...6666....6.6..
................
................
................
................
................
................
................
................`]
); 

setBackground(background)

const melody1 = tune`
500,
500: A5^500,
15000`;
const melody2 = tune`
500,
500: C5~500,
15000`;
const melody3 = tune`
500,
500: D4~500,
15000`;
const melody4 = tune`
500,
500: B4^500,
15000`;

let level = 0
const levels = [
  map`
s..wwwww
ww..w.wf
.......f
.ww.wwwf
w..w...f
ww.ww.wf
r.....ww`,
  map`
.....ww.ww
.www...w.f
sw.w.ww..f
ww.w..w.wf
r.w.wkww.f
w.w....g.f
w....w.www
wwwwwwww.w`,
  map`
.wwwww.....ffff
s....wwww.w...w
wwww.w...w.ww.w
w....w.w.ww.w.w
w.wwww.w...w..w
w..kw..wwwgww.w
www...ww....w..
.w...w.w.wwww.w
rw.ww..w..w...w
...w....w...www`,
  map`
fffffw....w......wwww
w.w..w.w.ww.wwwww..w.
w.ww.wwwww..w........
w..gwk...w..w.wwwwww.
.ww..www.ww.www....w.
ww.....w.w.......w...
w..www.w.w..w.w.w.w..
w..www.w...wwww.ww..w
ww.ww..ww..w....w..ww
.w....w...ww.wwwww..w
w..www...ww..w....w.w
w.w..w.www..w..ww.w..
w..w....w..w..w....w.
ww..ww.w.w...ww.wwww.
..w....w.wwwwwws.w.r.`,
  map`
wr.w.sw.......wfff
w..w..w..wwww.w...
..w.w..w....w.wgww
.w.w.w.w.w..w.w...
..w.w..ww..w..www.
w...w.w.w.ww.ww...
www.w...w.w....w..
www.w.www.www..w.w
ww..w......w..ww..
w...wwwww.ww.ww..w
www..w.w..w..w..ww
www...k...w....www`,  
  map`
www...........wwwwww......ww
w.wkwwwwwwww..w....w.w.w...w
w.wwww.......ww.ww.w.ww..www
w....w.wwwww.w..w..w..w.wwwf
.w.w.w....w..w.ww.w...w.w..f
ww.w..www.ww.w..w.w.www.w.wf
w..w..www..w.ww.w.w...w.w.wf
ww.ww.www.ww..w.w.www.w.w..w
.w..w..w..w..ww.w...w.w..w.w
ww..ww...ww.ww..ww.w..w..w.w
...w.wwwwww..ww.ww.w.w..w..w
.ww.w....ww..ww.w..w.w.ww.ww
.w.w.w.ww.w.w...w.w..wgw..ww
.ww.w.w.www.w.ww..w.w..ww...
..........w.w..ww.w..w...ww.
wwwwwwwww.w.ww..w.ww.ww...w.
.......w..w.www.w..w..w.ww..
.ww.ww..w.w...w.w.ww.w..w..w
.ww.www.w.www.w.w..w..w.w.ww
..w.www.w...w....w.w..w.w.w.
sww.www.www.wwwwww...w.....w
.w.r.ww......www.wwwwwwwwwww`,
]

setMap(levels[level])

onInput("w", () => {
  getFirst(robber).y -= 1
  playTune(melody1, 1)
})

onInput("a", () => {
  getFirst(robber).x -= 1
  playTune(melody2, 1)
})

onInput("s", () => {
  getFirst(robber).y += 1
  playTune(melody3, 1)
})

onInput("d", () => {
  getFirst(robber).x += 1
  playTune(melody4, 1)
})

onInput("i", () => {
  getFirst(robber2).y -= 1
  playTune(melody1, 1)
})

onInput("j", () => {
  getFirst(robber2).x -= 1
  playTune(melody2, 1)
})

onInput("k", () => {
  getFirst(robber2).y += 1
  playTune(melody3, 1)
})

onInput("l", () => {
  getFirst(robber2).x += 1
  playTune(melody4, 1)
})

setSolids([robber, robber2, wall, gate])

// Initialize scores for each robber
let robber1Score = 0;
let robber2Score = 0;

// Check if players reach the finish
afterInput(() => {
  if (tilesWith(robber, finish).length > 0) {
    robber1Score++; // Increment robber 1's score if they reach the finish
    clearTile(getFirst(robber).x, getFirst(robber).y); // Clear the finish tile to prevent multiple score increments
    level++; // Increment the level
    if (level < levels.length) {
      setMap(levels[level]);
    } else {
      level = 0;
      setMap(levels[level]);
    }
  }

  if (tilesWith(robber2, finish).length > 0) {
    robber2Score++; // Increment robber 2's score if they reach the finish
    clearTile(getFirst(robber2).x, getFirst(robber2).y); // Clear the finish tile
    level++;
    if (level < levels.length) {
      setMap(levels[level]);
    } else {
      level = 0;
      setMap(levels[level]);
    }
  }
  
  // Update the displayed scores after the score increments
  displayScores();
})

const displayScores = () => {
  addText(`Robber 1 Score: ${robber1Score}`, { x: 1, y: 1, color: color`2`, size: 1 });
  addText(`Robber 2 Score: ${robber2Score}`, { x: 1, y: 2, color: color`9`, size: 1 });
}

// Call displayScores to ensure scores are always visible
displayScores();

 afterInput(() => {
  const keysTakenByRobber1 = tilesWith(robber, key);
  const keysTakenByRobber2 = tilesWith(robber2, key);

  if (keysTakenByRobber1.length >= 1) {
    getFirst(gate).remove();
    let playguy = getFirst(robber)
    getTile(playguy.x, playguy.y)[1].remove();
  };

  if (keysTakenByRobber2.length >= 1) {
    getFirst(gate).remove();
    let playguy = getFirst(robber2)
    getTile(playguy.x, playguy.y)[1].remove();
  }
 });



