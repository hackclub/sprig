/*
@title: Maze
@author: Itamar Davidyan
*/


const player = "p";
const goal = "g";
const wallU = "U";
const wallD = "D";
const wallL = "L";
const wallR = "R";

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
);

let level = 0;
const levels = [
  map`
.DDg
...U
UUU.
pUUU`,
  map`
DDD..
.DDDL
.DgL.
ULU.L
pUUU.`
];

const currentLevel = levels[level];
setMap(currentLevel);

setSolids([ player ]);

// START - PLAYER MOVEMENT CONTROLS

onInput("s", () => {
  const currentPlayer = getFirst(player);
  const { x, y } = currentPlayer;

  const playerTileSprites = getTile(x, y);
  if (playerTileSprites.some(({ _type }) => _type === wallD)) return;
  
  const belowTileSprites = getTile(x, y+1);
  if (belowTileSprites.some(({ _type }) => _type === wallU)) return;
  
  currentPlayer.y += 1;
});

onInput("d", () => {
  const currentPlayer = getFirst(player);
  const { x, y } = currentPlayer;

  const playerTileSprites = getTile(x, y);
  if (playerTileSprites.some(({ _type }) => _type === wallR)) return;
  
  const rightTileSprites = getTile(x+1, y);
  if (rightTileSprites.some(({ _type }) => _type === wallL)) return;
  
  currentPlayer.x += 1;
});

onInput("a", () => {
  const currentPlayer = getFirst(player);
  const { x, y } = currentPlayer;

  const playerTileSprites = getTile(x, y);
  if (playerTileSprites.some(({ _type }) => _type === wallL)) return;
  
  const leftTileSprites = getTile(x-1, y);
  if (leftTileSprites.some(({ _type }) => _type === wallR)) return;
  
  currentPlayer.x -= 1;
});

onInput("w", () => {
  const currentPlayer = getFirst(player);
  const { x, y } = currentPlayer;

  const playerTileSprites = getTile(x, y);
  if (playerTileSprites.some(({ _type }) => _type === wallU)) return;
  
  const aboveTileSprites = getTile(x, y-1);
  if (aboveTileSprites.some(({ _type }) => _type === wallD)) return;
  
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
  // count the number of tiles with goals and boxes
  const numberOfPlayersArrivedTarget = tilesWith(goal, player).length;

  if (numberOfPlayersArrivedTarget === 1) {
    // increase the current level number
    level = level + 1;

    const currentLevel = levels[level];

    // make sure the level exists and if so set the map
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("you win!", { y: 4, color: [255, 0, 0] });
    }
  }
});
