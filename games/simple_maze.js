/*
@title: simple maze
@author: Itamar Davidyan
@tags: ['puzzle']
@addedOn: 2022-09-13
*/


const player = "p";

const goal = "g";
const goalU = "-";
const goalD = "_";
const goalR = "|";
const goalL = "]";
const goalUD = "[";
const goalUR = "{";
const goalUL = "}";
const goalUDR = ":";
const goalUDL = ";";
const goalURL = "+";
const goalDR = ")";
const goalDL = "(";
const goalDRL = "?";
const goalRL = ">";

const goals = [
  goal, goalU, goalD, goalR, goalL, goalUD, goalUR, goalUL, goalUDR,
  goalUDL, goalURL, goalDR, goalDL, goalDRL, goalRL
];

const wallU = "U";
const wallD = "D";
const wallR = "R";
const wallL = "L";
const wallUD = "1";
const wallUR = "2";
const wallUL = "3";
const wallUDR = "4";
const wallUDL = "5";
const wallURL = "6";
const wallDR = "7";
const wallDL = "8";
const wallDRL = "9";
const wallRL = "0";

setLegend(
  [ player, bitmap`
................
................
..000000000000..
..0..........0..
..0..........0..
..0..33..33..0..
..0..33..33..0..
..0..........0..
..0..0....0..0..
..0...0000...0..
...0........0...
....0......0....
.....000000.....
................
................
................`],
  [ goal, bitmap`
................
................
..3..........3..
...3........3...
....3......3....
.....3....3.....
......3..3......
.......33.......
.......33.......
......3..3......
.....3....3.....
....3......3....
...3........3...
..3..........3..
................
................`],
  [ goalU, bitmap`
LLLLLLLLLLLLLLLL
................
..3..........3..
...3........3...
....3......3....
.....3....3.....
......3..3......
.......33.......
.......33.......
......3..3......
.....3....3.....
....3......3....
...3........3...
..3..........3..
................
................`],
  [ goalD, bitmap`
................
................
..3..........3..
...3........3...
....3......3....
.....3....3.....
......3..3......
.......33.......
.......33.......
......3..3......
.....3....3.....
....3......3....
...3........3...
..3..........3..
................
LLLLLLLLLLLLLLLL`],
  [ goalR, bitmap`
...............L
...............L
..3..........3.L
...3........3..L
....3......3...L
.....3....3....L
......3..3.....L
.......33......L
.......33......L
......3..3.....L
.....3....3....L
....3......3...L
...3........3..L
..3..........3.L
...............L
...............L`],
  [ goalL, bitmap`
L...............
L...............
L.3..........3..
L..3........3...
L...3......3....
L....3....3.....
L.....3..3......
L......33.......
L......33.......
L.....3..3......
L....3....3.....
L...3......3....
L..3........3...
L.3..........3..
L...............
L...............`],
  [ goalUD, bitmap`
LLLLLLLLLLLLLLLL
................
..3..........3..
...3........3...
....3......3....
.....3....3.....
......3..3......
.......33.......
.......33.......
......3..3......
.....3....3.....
....3......3....
...3........3...
..3..........3..
................
LLLLLLLLLLLLLLLL`],
  [ goalUR, bitmap`
LLLLLLLLLLLLLLLL
...............L
..3..........3.L
...3........3..L
....3......3...L
.....3....3....L
......3..3.....L
.......33......L
.......33......L
......3..3.....L
.....3....3....L
....3......3...L
...3........3..L
..3..........3.L
...............L
...............L`],
  [ goalUL, bitmap`
LLLLLLLLLLLLLLLL
L...............
L.3..........3..
L..3........3...
L...3......3....
L....3....3.....
L.....3..3......
L......33.......
L......33.......
L.....3..3......
L....3....3.....
L...3......3....
L..3........3...
L.3..........3..
L...............
L...............`],
  [ goalUDR, bitmap`
LLLLLLLLLLLLLLLL
...............L
..3..........3.L
...3........3..L
....3......3...L
.....3....3....L
......3..3.....L
.......33......L
.......33......L
......3..3.....L
.....3....3....L
....3......3...L
...3........3..L
..3..........3.L
...............L
LLLLLLLLLLLLLLLL`],
  [ goalUDL, bitmap`
LLLLLLLLLLLLLLLL
L...............
L.3..........3..
L..3........3...
L...3......3....
L....3....3.....
L.....3..3......
L......33.......
L......33.......
L.....3..3......
L....3....3.....
L...3......3....
L..3........3...
L.3..........3..
L...............
LLLLLLLLLLLLLLLL`],
  [ goalURL, bitmap`
LLLLLLLLLLLLLLLL
L..............L
L.3..........3.L
L..3........3..L
L...3......3...L
L....3....3....L
L.....3..3.....L
L......33......L
L......33......L
L.....3..3.....L
L....3....3....L
L...3......3...L
L..3........3..L
L.3..........3.L
L..............L
L..............L`],
  [ goalDR, bitmap`
...............L
...............L
..3..........3.L
...3........3..L
....3......3...L
.....3....3....L
......3..3.....L
.......33......L
.......33......L
......3..3.....L
.....3....3....L
....3......3...L
...3........3..L
..3..........3.L
...............L
LLLLLLLLLLLLLLLL`],
  [ goalDL, bitmap`
L...............
L...............
L.3..........3..
L..3........3...
L...3......3....
L....3....3.....
L.....3..3......
L......33.......
L......33.......
L.....3..3......
L....3....3.....
L...3......3....
L..3........3...
L.3..........3..
L...............
LLLLLLLLLLLLLLLL`],
  [ goalDRL, bitmap`
L..............L
L..............L
L.3..........3.L
L..3........3..L
L...3......3...L
L....3....3....L
L.....3..3.....L
L......33......L
L......33......L
L.....3..3.....L
L....3....3....L
L...3......3...L
L..3........3..L
L.3..........3.L
L..............L
LLLLLLLLLLLLLLLL`],
  [ goalRL, bitmap`
L..............L
L..............L
L.3..........3.L
L..3........3..L
L...3......3...L
L....3....3....L
L.....3..3.....L
L......33......L
L......33......L
L.....3..3.....L
L....3....3....L
L...3......3...L
L..3........3..L
L.3..........3.L
L..............L
L..............L`],
  [ wallU, bitmap`
LLLLLLLLLLLLLLLL
................
................
................
................
................
................
................
................
................
................
................
................
................
................
................`],
  [ wallD, bitmap`
................
................
................
................
................
................
................
................
................
................
................
................
................
................
................
LLLLLLLLLLLLLLLL`],
  [ wallR, bitmap`
...............L
...............L
...............L
...............L
...............L
...............L
...............L
...............L
...............L
...............L
...............L
...............L
...............L
...............L
...............L
...............L`],
  [ wallL, bitmap`
L...............
L...............
L...............
L...............
L...............
L...............
L...............
L...............
L...............
L...............
L...............
L...............
L...............
L...............
L...............
L...............`],
  [ wallUD, bitmap`
LLLLLLLLLLLLLLLL
................
................
................
................
................
................
................
................
................
................
................
................
................
................
LLLLLLLLLLLLLLLL`],
  [ wallUR, bitmap`
LLLLLLLLLLLLLLLL
...............L
...............L
...............L
...............L
...............L
...............L
...............L
...............L
...............L
...............L
...............L
...............L
...............L
...............L
...............L`],
  [ wallUL, bitmap`
LLLLLLLLLLLLLLLL
L...............
L...............
L...............
L...............
L...............
L...............
L...............
L...............
L...............
L...............
L...............
L...............
L...............
L...............
L...............`],
  [ wallUDR, bitmap`
LLLLLLLLLLLLLLLL
...............L
...............L
...............L
...............L
...............L
...............L
...............L
...............L
...............L
...............L
...............L
...............L
...............L
...............L
LLLLLLLLLLLLLLLL`],
  [ wallUDL, bitmap`
LLLLLLLLLLLLLLLL
L...............
L...............
L...............
L...............
L...............
L...............
L...............
L...............
L...............
L...............
L...............
L...............
L...............
L...............
LLLLLLLLLLLLLLLL`],
  [ wallURL, bitmap`
LLLLLLLLLLLLLLLL
L..............L
L..............L
L..............L
L..............L
L..............L
L..............L
L..............L
L..............L
L..............L
L..............L
L..............L
L..............L
L..............L
L..............L
L..............L`],
  [ wallDR, bitmap`
...............L
...............L
...............L
...............L
...............L
...............L
...............L
...............L
...............L
...............L
...............L
...............L
...............L
...............L
...............L
LLLLLLLLLLLLLLLL`],
  [ wallDL, bitmap`
L...............
L...............
L...............
L...............
L...............
L...............
L...............
L...............
L...............
L...............
L...............
L...............
L...............
L...............
L...............
LLLLLLLLLLLLLLLL`],
  [ wallDRL, bitmap`
L..............L
L..............L
L..............L
L..............L
L..............L
L..............L
L..............L
L..............L
L..............L
L..............L
L..............L
L..............L
L..............L
L..............L
L..............L
LLLLLLLLLLLLLLLL`],
  [ wallRL, bitmap`
L..............L
L..............L
L..............L
L..............L
L..............L
L..............L
L..............L
L..............L
L..............L
L..............L
L..............L
L..............L
L..............L
L..............L
L..............L
L..............L`],
);

const upWalls = [
  goalU, goalUD, goalUR, goalUL, goalUDR, goalUDL, goalURL,
  wallU, wallUD, wallUR, wallUL, wallUDR, wallUDL, wallURL
];
const downWalls = [
  goalD, goalUD, goalUDR, goalUDL, goalDR, goalDL, goalDRL,
  wallD, wallUD, wallUDR, wallUDL, wallDR, wallDL, wallDRL
];
const rightWalls = [
  goalR, goalUR, goalUDR, goalURL, goalDR, goalDRL, goalRL,
  wallR, wallUR, wallUDR, wallURL, wallDR, wallDRL, wallRL
];
const leftWalls = [
  goalL, goalUL, goalUDL, goalURL, goalDL, goalDRL, goalRL,
  wallL, wallUL, wallUDL, wallURL, wallDL, wallDRL, wallRL
];

let level = 0;
const levels = [
  map`
.DD_
....
U11D
...p`,
  map`
DDD..
.DD7.
..|..
U517.
p....`,
  map`
.....
.116.
DD.8.
DDDR.
.DD7.
..|..
U517.
p....`,
  map`
.......p
.3U.33U}
.6U8.L8D
.L.R.LL.
.L6R.L0.
.L87.L0.
.8DDD87.
........`,
  map`
36112U112p
LL..RR.RRR
L0U22R.0RR
L0.0RR.9RR
L0.0.RDD7R
L0.0RR.R.R
LR.0RDDRD2
L9.7..RR.R
L..L.2RDD6
;1D117DDD7`
];

const currentLevel = levels[level];
setMap(currentLevel);

setSolids([ player ]);

// START - PLAYER MOVEMENT CONTROLS

onInput("s", () => {
  const currentPlayer = getFirst(player);
  const { x, y } = currentPlayer;

  const playerTileSprites = getTile(x, y);
  if (playerTileSprites.some(({ _type }) => downWalls.includes(_type))) return;

  const belowTileSprites = getTile(x, y+1);
  if (belowTileSprites.some(({ _type }) => upWalls.includes(_type))) return;

  currentPlayer.y += 1;
});

onInput("d", () => {
  const currentPlayer = getFirst(player);
  const { x, y } = currentPlayer;

  const playerTileSprites = getTile(x, y);
  if (playerTileSprites.some(({ _type }) => rightWalls.includes(_type))) return;

  const rightTileSprites = getTile(x+1, y);
  if (rightTileSprites.some(({ _type }) => leftWalls.includes(_type))) return;

  currentPlayer.x += 1;
});

onInput("a", () => {
  const currentPlayer = getFirst(player);
  const { x, y } = currentPlayer;

  const playerTileSprites = getTile(x, y);
  if (playerTileSprites.some(({ _type }) => leftWalls.includes(_type))) return;

  const leftTileSprites = getTile(x-1, y);
  if (leftTileSprites.some(({ _type }) => rightWalls.includes(_type))) return;

  currentPlayer.x -= 1;
});

onInput("w", () => {
  const currentPlayer = getFirst(player);
  const { x, y } = currentPlayer;

  const playerTileSprites = getTile(x, y);
  if (playerTileSprites.some(({ _type }) => upWalls.includes(_type))) return;

  const aboveTileSprites = getTile(x, y-1);
  if (aboveTileSprites.some(({ _type }) => downWalls.includes(_type))) return;

  currentPlayer.y -= 1;
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
  const playerArrivedToGoal = goals.some(goal => tilesWith(goal, player).length === 1);

  if (playerArrivedToGoal) {
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