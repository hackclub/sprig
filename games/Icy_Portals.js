/*
@title: Icy Portals
@author: Jonathan La
@tags: ['puzzle']
@addedOn: 2022-12-02
*/

let moves = 20;
const background = "i";
const wall = "w";
const player = "p";
const goal = "g";
const purpleTeleporter = "t";
const blueTeleporter = "b";
const button = "n";

// Music
const song = tune`
200: c5~200 + g4^200,
200: c4~200 + g4^200 + e5/200 + a4-200,
200: c5~200 + g4^200,
200: e5~200 + g4^200 + f5/200,
200: c5~200 + g4^200,
200: c4~200 + g4^200 + e5/200 + a4-200,
200: c5~200 + g4^200,
200: e5~200 + g4^200 + f5/200,
200: c5~200 + g4^200,
200: g4^200 + c4~200 + e5/200 + a4-200,
200: c5~200 + g4^200,
200: f5~200 + g4^200 + g5/200 + e5/200,
200: c5~200 + g4^200,
200: c4~200 + g4^200 + e5/200 + a4-200,
200: c5~200 + g4^200,
200: f5~200 + g5/200 + e5/200 + g4^200,
200: c5~200 + g4^200,
200: c4~200 + g4^200 + e5/200 + a4-200,
200: c5~200 + g4^200,
200: f5~200 + g5/200 + e5/200 + g4^200,
200: c5~200 + g4^200,
200: c4~200 + g4^200 + e5/200 + a4-200,
200: c5~200 + g4^200,
200: f5~200 + g5/200 + e5/200 + g4^200,
200: c5~200 + g4^200,
200: c4~200 + g4^200 + a4-200 + e5/200,
200: c5~200 + g4^200,
200: e5~200 + f5/200 + g4^200,
200: c5~200 + g4^200,
200: c4~200 + g4^200 + e5/200 + a4-200,
200: c5~200 + g4^200,
200: e5~200 + g4^200 + f5/200`;
const finish = tune`
60: c4-60,
60: c5-60,
1800`;
playTune(song, Infinity);
// Music End

setLegend(
  [ background, bitmap`
7777777777777777
7777777777777777
7777777727777777
7277777722777777
7227777772227777
7727777777722277
7727777777722777
7727777777777777
7722777777777777
7772777777777777
7777777777777277
7777777777777227
7777777777777727
7777772277777727
7777777222777777
7777777777777777`],
  [ player, bitmap`
................
......CCCCC.....
......CCCCC.....
.....CCCCCCC....
......22222.....
......20202.....
......22922.....
......20002.....
......22222.....
.....2222222....
.....2222222....
.....2222222....
.....2222222....
....222222222...
....222222222...
....222222222...`],
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
  [ goal, bitmap`
................
...44444444444..
..4444444444444.
..4422222222244.
..4424444444244.
..4424222224244.
..4424244424244.
..4424242424244.
..4424242424244.
..4424244424244.
..4424222224244.
..4424444444244.
..4422222222244.
..4444444444444.
...44444444444..
................`],
  [ purpleTeleporter, bitmap`
................
...HHHHHHHHHHH..
..HHHHHHHHHHHHH.
..HH222222222HH.
..HH2HHHHHHH2HH.
..HH2H22222H2HH.
..HH2H2HHH2H2HH.
..HH2H2H2H2H2HH.
..HH2H2H2H2H2HH.
..HH2H2HHH2H2HH.
..HH2H22222H2HH.
..HH2HHHHHHH2HH.
..HH222222222HH.
..HHHHHHHHHHHHH.
...HHHHHHHHHHH..
................`],
  [ blueTeleporter, bitmap`
................
...55555555555..
..5555555555555.
..5522222222255.
..5525555555255.
..5525222225255.
..5525255525255.
..5525252525255.
..5525252525255.
..5525255525255.
..5525222225255.
..5525555555255.
..5522222222255.
..5555555555555.
...55555555555..
................`],
  [ button, bitmap`
2222222222222222
2000000000000002
2033333333333302
2033333333333302
2033333333333302
2033333333333302
2033333333333302
2033333333333302
2033333333333302
2033333333333302
2033333333333302
2033333333333302
2033333333333302
2033333333333302
2000000000000002
2222222222222222`],
);

setBackground(background)
let level = 0;
const levels = [
  map`
p........
wwwwwwww.
.........
.wwwwwwww
.........
wwwwwwww.
g........`,
  map`
p.....w.w
..w......
w........
...wg....
........w
.....w.w.
..w......`,
  map`
p......w.
.w.......
.........
.....w...
.....tw..
......www
..w...wbg`,
  map`
p..wbw...
w..w.....
..www....
...w...w.
.w.w.w.g.
.t.w.....
w..w....w`,
  map`
........p
.wwwwwwww
.w.......
.w.wwwww.
.w..nwgw.
.wwwwwww.
.........`,
  map`
.........
.........
.w..p....
...nwg...
........w
.........
w........`,
  map`
p...w...p
....w....
.w..w..w.
...ww....
....w....
..g.w....
..w.wg...`,
  map`
t...w.nwb
....w...w
...ww.w..
wg..wwpw.
....w....
.w..w..w.
...ww...w`,
  map`
p...p
.....
.....
w.w.w
bwnwt`, // win screen
];

const currentLevel = levels[level];
setMap(currentLevel);

setSolids([ player, wall ]);


// START - PLAYER MOVEMENT CONTROLS
let i;
let players;
let chars;
onInput("s", () => {
  players = getAll(player);
  if (moves >= 1){
  for (chars of players){
      i = 1;
      while (i < 100){
        chars.y += 1;
        i++;
      }
    }
    moves -=1
  }
});
  
onInput("d", () => {
  players = getAll(player);
  if (moves >= 1){
    for (chars of players){
      i = 1;
      while (i < 100){
        chars.x += 1;
          i++;
      }
    }
    moves -=1
  }
});
  
onInput("w", () => {
  players = getAll(player);
  if (moves >= 1){
    for (chars of players){
      i = 1;
      while (i < 100){
        chars.y -= 1;
        i++;
      }
    }
    moves -=1
  }
});
  
onInput("a", () => {
  players = getAll(player);
  if (moves >= 1){
    for (chars of players){
      i = 1;
      while (i < 100){
        chars.x -= 1;
        i++;
      }
    }
    moves -=1
  }
});

// END - PLAYER MOVEMENT CONTROLS

onInput("j", () => {
  const currentLevel = levels[level];
  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
    moves = 20;
  }
});

afterInput(() => {
  
  // button
  if (getFirst(player) && getFirst(button) && getFirst(player).x == getFirst(button).x) {
    if (getFirst(player).y == getFirst(button).y) {
      let x = getFirst(player).x
      let y = getFirst(player).y
      clearTile(x, y)
      clearTile(x + 1, y)
      addSprite(x, y, player)
    }
  }
      
  // defining teleporters
  if (getFirst(blueTeleporter) && getFirst(player) && getFirst(blueTeleporter).x == getFirst(player).x) {
    if (getFirst(blueTeleporter).y == getFirst(player).y) {
      getFirst(player).x = getFirst(purpleTeleporter).x;
      getFirst(player).y = getFirst(purpleTeleporter).y;
    }
  }
  else if (getFirst(purpleTeleporter) && getFirst(player) && getFirst(purpleTeleporter).x == getFirst(player).x) {
    if (getFirst(purpleTeleporter).y == getFirst(player).y) {
      getFirst(player).x = getFirst(blueTeleporter).x;
      getFirst(player).y = getFirst(blueTeleporter).y;
    }
  }

  // moves left
  clearText();
  addText(moves.toString(), { x: 0, y: 1, color: color`3` });
  
  // count the number of tiles with goals
  const targetNumber = tilesWith(goal).length;
  
  // count the number of tiles with goals and boxes
  const numberCovered = tilesWith(goal, player).length;

  if (numberCovered === targetNumber) {
    
    // increase the current level number
    if (level < 11) {
      playTune(finish);
      level = level + 1;
      moves = 20;
      clearText();
      addText(moves.toString(), { x: 0, y: 1, color: color`3` });
    }

    const currentLevel = levels[level];

    // make sure the level exists and if so set the map
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      moves = 1000;
      addText("You won!", { y: 4, color: color`3` });
      addText("Thanks for", { y: 6, color: color`3` });
      addText("playing!", { y: 8, color: color`3` });
    }
  }
});
