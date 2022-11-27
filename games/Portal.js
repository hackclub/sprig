/*
@title: Portal
@author: Jonathan La
*/

const wall = "w";
const player = "p";
const goal = "g";
const purpleTeleporter = "t";
const blueTeleporter = "b";
const button = "n";

// Music
const song = tune`
200: c5~200,
200: c4~200,
200: c5~200,
200: e5~200,
200: c5~200,
200: c4~200,
200: c5~200,
200: e5~200,
200: c5~200,
200: c4~200,
200: c5~200,
200: f5~200,
200: c5~200,
200: c4~200,
200: c5~200,
200: f5~200,
200: c5~200,
200: c4~200,
200: c5~200,
200: f5~200,
200: c5~200,
200: c4~200,
200: c5~200,
200: f5~200,
200: c5~200,
200: c4~200,
200: c5~200,
200: e5~200,
200: c5~200,
200: c4~200,
200: c5~200,
200: e5~200`;
const finish = tune`
60: c4-60,
60: c5-60,
1800`;
playTune(song, Infinity);
// Music End

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
  [ purpleTeleporter, bitmap`
................
................
................
....HHHHHH......
...HH....HH.....
...H......H.....
...H.......H....
...H.......H....
...H.......H....
...HH......H....
....H......H....
....HH....HH....
.....HHHHHH.....
................
................
................`],
  [ blueTeleporter, bitmap`
................
................
................
....777777......
...77....77.....
...7......7.....
...7.......7....
...7.......7....
...7.......7....
...77......7....
....7......7....
....77....77....
.....777777.....
................
................
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

let level = 0;
const levels = [
  map`
p...
...g`,
  map`
pw.
.w.
..g`,
  map`
p.t
www
b.g`,
  map`
pw.
.w.
nwg`,
  map`
.p.wt
.w.ww
bwnwg`,
  map`
wpww
wnwt
wwww
wb.g`,
  map`
.p...
.....
.....
.....
b.n.t`, // win screen
];

const currentLevel = levels[level];
setMap(currentLevel);

setSolids([ player, wall ]);


// START - PLAYER MOVEMENT CONTROLS

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

// END - PLAYER MOVEMENT CONTROLS

onInput("j", () => {
  const currentLevel = levels[level];
  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
  }
});

afterInput(() => {

  // button
  const buttons = tilesWith(button).length;
  const buttonPressed = tilesWith(button, player).length;
  if (buttonPressed === buttons) {
    clearTile((getFirst(button) && (getFirst(button).x) + 1), (getFirst(button) && (getFirst(button).y)))
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
  
  // count the number of tiles with goals
  const targetNumber = tilesWith(goal).length;
  
  // count the number of tiles with goals and boxes
  const numberCovered = tilesWith(goal, player).length;

  if (numberCovered === targetNumber) {
    
    // increase the current level number
    if (level < 6) {
      playTune(finish);
    }
    level = level + 1;

    const currentLevel = levels[level];

    // make sure the level exists and if so set the map
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("You escaped!", { y: 4, color: color`3` });
      addText("Thanks for", { y: 6, color: color`3` });
      addText("playing!", { y: 8, color: color`3` });
    }
  }
});
