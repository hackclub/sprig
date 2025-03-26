/*

@title: Navigating a nightmare
@author: B-S-M-C
@addedOn: 2024-02-23
*/
const PLAYER = "p";
const WALL = "w";
const FLOOR = "f";
const STAR = "s";
const TELEPORTER = "t";  // Teleporter tile
const SPIKE = "k";       // Spike tile
const KEY = "y";         // Key tile
const DOOR = "d";        // Door tile

setLegend(
  [ PLAYER, bitmap`
................
................
................
.......00.......
......0..0......
.....0....0.....
....0......0....
....0......0....
....0......0....
.....0....0.....
......0..0......
.......00.......
................
................
................
................`],
  [ WALL, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD`],
  [ FLOOR, bitmap`
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
  [ STAR, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000330000000
0000003553000000
0000035555300000
0000355555530000
0003555555553000
0003555555553000
0000355555530000
0000035555300000
0000003553000000
0000000330000000
0000000000000000
0000000000000000
0000000000000000`],
  [ TELEPORTER, bitmap`
................
................
................
....555555......
...55....55.....
...5......5.....
...5......5.....
...5......5.....
...5......5.....
...55....55.....
....555555......
................
................
................
................`],
  [ SPIKE, bitmap`
0000000000000000
0000000000000000
0000000000000000
0011110000001110
0001LL111111L100
00011LL11LLLL100
00011LL11LLLL100
000111L1LLLL1000
00011111LLLL1000
0001LL1LLLLL1000
0001LL11LLL1L100
0001L11LLLL1L100
001111011L1LL110
0010000011111100
0000000000000000
0000000000000000`],
  [ KEY, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0066660000000000
0060066000000000
0060006000000000
0060006666666000
0060066000606000
0066660000606000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`],
  [ DOOR, bitmap`
0000000000000000
0000000000000000
000CCCCCCCCC0000
000CFFFFFFFC0000
000CFFFFFFFC0000
000CFFFFFFFC0000
000CFFFFFFFC0000
000CFFFFFFFC0000
000CFFFF66FC0000
000CCFFF66FC0000
0000CFFFFFFCC000
0000CFFFFFFFC000
0000CFFFFFFFC000
0000CFFFFFFFC000
0000CFFFFFFFC000
0000CFFFFFFFC000`]
);

const levels = [
  map`
wwwwwwwwww
wpfffffffw
wfwwsffwfw
wffwffwwsw
wffffffffw
wfsfffffww
wffffffffw
wwwwwwwwww`,  // Level 0
  map`
wwwwwwwwww
wpfffsfffw
wfffwffffw
wfwffffwkw
wfwkffwwff
wffffffffw
wffwkfffsw
wwwwwwwwww`,  // Level 1
  map`
wwwwwwwwww
wpffffffww
wffwwffkww
wfwwsffffw
wfffwfffww
wfkfsffkww
fffffffkww
wwwwwwwwww`,  // Level 2
  map`
wwwwwwwwww
wpffffffyw
wffwfffffw
fffwfffffw
fffwfffffw
wffffffffw
wfffffdffw
wwwwwwwwww`,  // Level 3
  map`
wwwwwwwwww
wpffffsfdw
wfffwffffw
ffwffffwfw
wfwwsffffw
wffffsfffw
wyfwfffffw
wwwwwwfwww`,  // Level 4
  map`
wwwwwwwwww
wpffwfffdw
wffwwfffww
wffffffkww
wffwwffffw
wffwfffwfw
wswwykfwsw
wwwwwwwwww`,  // Level 5
  map`
wwwwfwwwwf
wpffffkwfw
wffwffswfw
wkfwkffffw
wkfwwwffkf
fffffffffw
wfsfkwfskw
fwwwwfwwww`,  // Level 6
  map`
wwwwfwwfww
wpfffwwffw
wffwffwfww
wfffwffffw
wwfwwfwsfw
wfffffwwfw
ffffwfffff
wffffwwwww`,  // Level 7
  map`
wwkffwdwwf
wpffkffffs
ffwsffwwfk
kfffwsffff
fswfkfffkw
wwffffwwsw
ffsfkfffff
kffwwfsfky`,  // Level 8
  map`
fffffwffff
fpfffwffff
fffffwffff
fffffwffpd
fffffwffff
fffffwffff
fffffwffff
fffffwffff`,  // Level 9
];

let level = 0;
setMap(levels[level]);

let score = 0;
let hasKey = false;  // Track if the player has the key
clearText();
addText("Score: " + score, { x: 1, y: 1, color: color`3` });

function checkWin() {
  const stars = getAll(STAR);
  const door = getFirst(DOOR);

  // If there are no stars left and no door, the player wins
  if (stars.length === 0 && !door) {
    level++;
    if (level < levels.length) {
      setMap(levels[level]);
      hasKey = false;  // Reset key status for the new level
      clearText();
      addText("Score: " + score, { x: 1, y: 1, color: color`3` });
    } else {
      addText("You Win!", { y: 6, color: color`3` });
    }
  }

  // If there are no stars left and a door exists, check if the player is on the door
  if (stars.length === 0 && door) {
    const player = getFirst(PLAYER);
    const playerTile = getTile(player.x, player.y);

    // Check if the player is standing on the door
    if (playerTile.some(tile => tile.type === DOOR) && hasKey) {
      level++;
      if (level < levels.length) {
        setMap(levels[level]);
        hasKey = false;  // Reset key status for the new level
        clearText();
        addText("Score: " + score, { x: 1, y: 1, color: color`3` });
        addText("whoareyou", { y: 3, color: color`3` });
      } else {
        addText("You Win!", { y: 3, color: color`3` });
      }
    }
  }
}

function resetLevel() {
  setMap(levels[level]);
  addText("The spikes, the spikes, the spikes!", { y: 6, color: color`3` });
}

function handleTileInteraction(nextTile, player, newPosition) {
  const star = nextTile.find(tile => tile.type === STAR);
  const teleporter = nextTile.find(tile => tile.type === TELEPORTER);
  const spike = nextTile.find(tile => tile.type === SPIKE);
  const key = nextTile.find(tile => tile.type === KEY);
  const door = nextTile.find(tile => tile.type === DOOR);

  if (star) {
    star.remove();
    score++;
    clearText();
    addText("Score: " + score, { x: 1, y: 1, color: color`3` });
  }

  if (teleporter) {
    player.x = 3;  // Teleport player to a fixed position
    player.y = 4;
  }

  if (spike) {
    resetLevel();
  }

  if (key) {
    key.remove();
    hasKey = true;
    addText("Key Collected!", { x: 1, y: 1, color: color`3` });
  }

  player.x = newPosition.x;
  player.y = newPosition.y;
  checkWin();
}

onInput("w", () => {
  const player = getFirst(PLAYER);
  const nextY = player.y - 1;
  const nextTile = getTile(player.x, nextY);
  if (nextTile.some(tile => tile.type === WALL)) return;

  handleTileInteraction(nextTile, player, { x: player.x, y: nextY });
});

onInput("s", () => {
  const player = getFirst(PLAYER);
  const nextY = player.y + 1;
  const nextTile = getTile(player.x, nextY);
  if (nextTile.some(tile => tile.type === WALL)) return;

  handleTileInteraction(nextTile, player, { x: player.x, y: nextY });
});

onInput("a", () => {
  const player = getFirst(PLAYER);
  const nextX = player.x - 1;
  const nextTile = getTile(nextX, player.y);
  if (nextTile.some(tile => tile.type === WALL)) return;

  handleTileInteraction(nextTile, player, { x: nextX, y: player.y });
});

onInput("d", () => {
  const player = getFirst(PLAYER);
  const nextX = player.x + 1;
  const nextTile = getTile(nextX, player.y);
  if (nextTile.some(tile => tile.type === WALL)) return;

  handleTileInteraction(nextTile, player, { x: nextX, y: player.y });
});