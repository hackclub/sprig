const player = "r"; 
const wall = "w";
const goal = "g";
const key = "k";
const door = "d";
const block = "b"; 

setLegend(
  [ player, bitmap`
................
................
...444444.......
..444442244.....
.4424255244.....
.44222552444....
.44455554444....
..444444444.....
.55555544444....
.555555 444.....
.555555 4.......
..55555.........
..2.2..55.......
..2.2..55.......
.22.22.55.......
................` ], 
  [ wall, bitmap`
LLLLLLLLLLLLLLLL
L11111111111111L
L1LLLLLLLLLLLL1L
L1L1111111111L1L
L1L1LLLLLLLL1L1L
L1L1L111111L1L1L
L1L1L1LLLL1L1L1L
L1L1L1L11L1L1L1L
L1L1L1L11L1L1L1L
L1L1L1LLLL1L1L1L
L1L1L111111L1L1L
L1L1LLLLLLLL1L1L
L1L1111111111L1L
L1LLLLLLLLLLLL1L
L11111111111111L
LLLLLLLLLLLLLLLL` ],
  [ goal, bitmap`
................
................
.....44444......
....44...44.....
...44.....44....
..44.......44...
..4.......444...
.4.........4....
.4...666...4....
.4...6.6...4....
.4...666...4....
.4.........4....
.44.......4.....
..44.....44.....
...44...44......
....44444.......` ],
  [ key, bitmap`
................
................
......000.......
.....0..0.......
....0...0.......
...0....0.......
..0.....0.......
..0000000.......
..0.....0.......
..0.....0.......
..0.....0.......
..0000000.......
................
................
................
................`],
  [ door, bitmap`
0000000000000000
0555555555555550
0500000000000050
0505555555555050
0505000000005050
0505055555505050
0505050005505050
0505050555005050
0505050005505050
0505055555505050
0505000000005050
0505555555555050
0500000000000050
0555555555555550
0000000000000000
0000000000000000`],
  [ block, bitmap`
................
...88888888.....
..8........8....
.8..........8...
.8...7777...8...
.8...7..7...8...
.8...7777...8...
.8..........8...
.8..........8...
.8...7777...8...
.8...7..7...8...
.8...7777...8...
.8..........8...
..8........8....
...88888888.....
................`] 
);

let level = 0;
let keysCollected = 0;
let gameWon = false; 

const levels = [
  map`
wwwwwwwwww
w.r......w
w........w
w...b....w
w........w
w...g....w
wwwwwwwwww`,
  map`
wwwwwwwwww
w.r.b..k.w
w.wwwwww.w
wd.......w
wwwwwwgwww`,
  map`
wwwwwwwwww
w.r......w
w....k...w
wwwwbwwdww
w...g....w
w........w
wwwwwwwwww`,
  map`
wwwwwwwwww
wr.k.b...w
w.wwwwwwdw
w.d.b....w
wwwwww.www
w..k..g..w
wwwwwwwwww`,
  map`
wwwwwwwwww
wr......kw
wwwwdwwwww
w.......kw
wwwbwwwwww
w....d...w
www.wwwdww
wwwwwww.gw
wwwwwwwwww`,
  map`
wwwwwwwwww
w.r.b....w
w..b.k...w
w.wwwwwwww
wd.......w
wwwwwwgwww`,
  map`
wwwwwwwwww
w..d.b...w
w.wwwww.ww
w.wb..k..d
w.wwwwwwwg
w...r...kw
wwwwwwwwww`,
  map`
wwwwwwwwww
wd.kb....w
w.wwwwwwww
w....d..gw
w.wbwwwwww
w.w...r..w
w.wkwwwwww
wd..kd..kw
wwwwwwwwww`
];

function loadLevel(levelIndex) {
  keysCollected = 0; 
  setMap(levels[levelIndex]);
  if (levelIndex > 0) { 
    addText(`Level ${levelIndex + 1}`, { x: 5, y: 1, color: color`5` });
  }
}

loadLevel(level);

function tryMove(dx, dy) {
  if (gameWon) return;

  const playerSprite = getFirst(player);
  const targetX = playerSprite.x + dx;
  const targetY = playerSprite.y + dy;

  const targetTiles = getTile(targetX, targetY);
  const targetBlock = targetTiles.find(tile => tile.type === block);
  
  let blocked = false;

  if (targetTiles.some(tile => tile.type === wall)) {
    blocked = true;
  } 
  else if (targetTiles.some(tile => tile.type === door)) {
    if (keysCollected <= 0) { 
      blocked = true; 
    }
  } 
  else if (targetBlock) {
    const nextToBlockX = targetX + dx;
    const nextToBlockY = targetY + dy;
    const nextToBlockTiles = getTile(nextToBlockX, nextToBlockY);

    if (nextToBlockTiles.some(tile => tile.type === wall || tile.type === door || tile.type === block)) {
      blocked = true; 
    } else {
      targetBlock.x = nextToBlockX;
      targetBlock.y = nextToBlockY;
    }
  }

  if (!blocked) {
    playerSprite.x = targetX;
    playerSprite.y = targetY;
  }
}

onInput("w", () => tryMove(0, -1));
onInput("s", () => tryMove(0, 1));
onInput("a", () => tryMove(-1, 0));
onInput("d", () => tryMove(1, 0));

afterInput(() => {
  if (gameWon) return; 

  const playerSprite = getFirst(player);
  const currentTiles = getTile(playerSprite.x, playerSprite.y); 

  const keyTile = currentTiles.find(tile => tile.type === key);
  if (keyTile) {
    keyTile.remove(); 
    keysCollected++; 
  }

  if (currentTiles.some(tile => tile.type === goal)) {
    level++; 
    if (level < levels.length) {
      clearText();
      loadLevel(level);
    } else {
      gameWon = true;
      clearText();
      addText("YOU WIN!", { x: 5, y: 6, color: color`4` });
      addText("Fantastic!", { x: 4, y: 7, color: color`6` }); 
    }
  }
});