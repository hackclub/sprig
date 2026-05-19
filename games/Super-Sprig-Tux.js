/*
@title: Super Sprig Tux
@author: Darshan Saravanan
@description: Bringing the legendary Super Tux to the Sprig platform, This is a Endless Platformer where you have to collect score by travelling further, opening boxes and smashing the enemies.
@tags: ['platformer','endless','arcade','mario','Linux','Tux','The real ones']
@addedOn: 2026-04-25
*/

const tuxWalk1 = bitmap`
................
................
....00000000....
...0LLLLLLLL0...
..0LL20LL20LL0..
..0LL00LL00LL0..
..0LLL6666LLL0..
.06LLLL66LLLL60.
.06LLL2222LLL60.
.0L0L222222L0L0.
..002222222200..
...0222222220...
...0066000066...
....00....00....
................
................`;

const tuxWalk2 = bitmap`
................
................
....00000000....
...0LLLLLLLL0...
..0LL20LL20LL0..
..0LL00LL00LL0..
..0LLL6666LLL0..
.06LLLL66LLLL60.
.06LLL2222LLL60.
.0L0L222222L0L0.
..002222222200..
...0222222220...
...0660000660...
....00....00....
................
................`;

const tuxLeft1 = bitmap`
................
................
....00000000....
...0LLLLLLLL0...
..0LL20LL20LL0..
..0LL00LL00LL0..
..0LLL6666LLL0..
.06LLLL66LLLL60.
.06LLL2222LLL60.
.0L0L222222L0L0.
..002222222200..
...0222222220...
...6600006600...
....00....00....
................
................`;

const tuxLeft2 = bitmap`
................
................
....00000000....
...0LLLLLLLL0...
..0LL20LL20LL0..
..0LL00LL00LL0..
..0LLL6666LLL0..
.06LLLL66LLLL60.
.06LLL2222LLL60.
.0L0L222222L0L0.
..002222222200..
...0222222220...
...0660000660...
....00....00....
................
................`;

const snowGround = bitmap`
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777755777
7755577777755757
5555555557755555
5555555555555555`;

const mountain = bitmap`
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777`;

const boxFull = bitmap`
6666666666666666
6666666666666666
6666611111166666
6666116666116666
6666116666116666
6666666661166666
6666666611666666
6666666116666666
6666666116666666
6666666666666666
6666666116666666
6666666116666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666`;

const boxEmpty = bitmap`
CCCCCCCCCCCCCCCC
C9CCCCCCCCCCCC9C
CC9CCCCCCCCCC9CC
CCC9CCCCCCCC9CCC
CCCC9CCCCCC9CCCC
CCCCC9CCCC9CCCCC
CCCCCC9CC9CCCCCC
CCCCCCC99CCCCCCC
CCCCCCC99CCCCCCC
CCCCCC9CC9CCCCCC
CCCCC9CCCC9CCCCC
CCCC9CCCCCC9CCCC
CCC9CCCCCCCC9CCC
CC9CCCCCCCCCC9CC
C9CCCCCCCCCCCC9C
CCCCCCCCCCCCCCCC`;

const cloudBmp = bitmap`
................
....00000000....
..0077777770....
.077777772770...
.0777777722770..
..077777777770..
...0777777700...
....0000000.....
................
................
................
................
................
................
................
................`;

const enemy1 = bitmap`
................
................
................
................
................
......888.......
.....88888......
....8808808.....
....8888888.....
....8888888.....
.....88888......
.....8...8......
....88...88.....
................
................
................`;

const enemy2 = bitmap`
................
................
................
................
................
......888.......
.....88888......
....8808808.....
....8888888.....
....8888888.....
.....88888......
......8.8.......
.....88.88......
................
................
................`;

setLegend(
  ['p', tuxWalk1], ['q', tuxWalk2],
  ['l', tuxLeft1], ['k', tuxLeft2],
  ['g', snowGround], ['m', mountain],
  ['?', boxFull], ['e', boxEmpty],
  ['c', cloudBmp], ['1', enemy1], ['2', enemy2]
);


const startChunk =
  `c.......c.......
   ................
   ................
   ................
   ................
   ................
   ................
   gggggggggggggggg`;

const chunks = [
  `c.......
   ........
   ........
   ........
   ........
   ......x.
   ........
   gggggggg`,
  `........
   c.......
   ........
   ...m....
   ..mmm...
   .mmmmm..
   mmmmmmm.
   gggggggg`,
  `..c.....
   ........
   ........
   ........
   ....x...
   ........
   ..g..g..
   gg....gg`,
  `........
   ....c...
   ........
   ..???...
   ........
   ...x....
   ........
   gggggggg`,
  `........
   ........
   ..c.....
   ........
   .m....m.
   .mmx.mm.
   ggg..ggg
   ggg..ggg`
];


let gameOver = false;
let loopId = null;
let tickCount = 0;
let score = 0;

let mapGrid = [];
let enemies = [];
let cameraX = 0;

let wx = 2; // Tux World X
let y = 6; // Tux World Y
let maxWx = 2;

let jumpPower = 0;
let fallDelay = 0;
let facingLeft = false;


let lastA = 0;
let lastD = 0;
let lastW = 0;


function init() {
  gameOver = false;
  score = 0;
  wx = 2;
  y = 6;
  maxWx = 2;
  cameraX = 0;
  jumpPower = 0;
  fallDelay = 0;
  facingLeft = false;
  tickCount = 0;
  enemies = [];

  lastA = 0;
  lastD = 0;
  lastW = 0;

  mapGrid = ["", "", "", "", "", "", "", ""];
  appendChunk(startChunk);
  for (let i = 0; i < 4; i++) addRandomChunk();

  if (loopId) clearInterval(loopId);
  // Butter smooth 80ms ticks
  loopId = setInterval(tick, 80);
  render();
}

function appendChunk(chunkStr) {
  let lines = chunkStr.trim().split('\n');
  let chunkWidth = lines[0].trim().length;
  let startWx = mapGrid[0] ? mapGrid[0].length : 0;

  for (let i = 0; i < 8; i++) {
    let row = lines[i].trim();
    let cleanRow = "";
    for (let j = 0; j < chunkWidth; j++) {
      if (row[j] === 'x') {
        enemies.push({ wx: startWx + j, y: i, dir: -1, tick: 0, oldWx: startWx + j });
        cleanRow += '.';
      } else {
        cleanRow += row[j];
      }
    }
    if (mapGrid[i] === undefined) mapGrid[i] = "";
    mapGrid[i] += cleanRow;
  }
}

function addRandomChunk() {
  let idx = Math.floor(Math.random() * chunks.length);
  appendChunk(chunks[idx]);
}

function isSolid(x, testY) {
  if (testY < 0 || testY >= 8) return false;
  if (x < 0) return true; // Block off-map left
  if (x >= mapGrid[0].length) return false;
  let char = mapGrid[testY][x];
  return ['g', 'm', '?', 'e'].includes(char);
}

function triggerBox(bx, by) {
  let row = mapGrid[by].split('');
  row[bx] = 'e';
  mapGrid[by] = row.join('');
  score += 10;
}

function checkCollisions(tuxFell, oldWx) {
  if (gameOver) return;
  for (let i = enemies.length - 1; i >= 0; i--) {
    let e = enemies[i];
    let swapped = (oldWx !== undefined && e.oldWx !== undefined && oldWx === e.wx && wx === e.oldWx && e.y === y);

    if ((e.wx === wx && e.y === y) || swapped) {
      if (tuxFell && !swapped) {
        enemies.splice(i, 1);
        score += 50;
        jumpPower = 3;
        fallDelay = 0;
      } else {
        // Hit side
        die();
        return;
      }
    }
  }
}

onInput("a", () => {
  lastA = Date.now();
  facingLeft = true;
});
onInput("d", () => {
  lastD = Date.now();
  facingLeft = false;
});
onInput("w", () => { lastW = Date.now(); });
onInput("j", () => { lastW = Date.now(); });
onInput("k", () => { if (gameOver) init(); });

function tick() {
  if (gameOver) return;
  tickCount++;
  let tuxFell = false;
  let now = Date.now();
  let oldWx = wx;

  let holdA = (now - lastA) < 150;
  let holdD = (now - lastD) < 150;
  let holdW = (now - lastW) < 150;
  let dx = 0;
  if (holdD && !holdA) dx = 1;
  if (holdA && !holdD) dx = -1;

  if (dx !== 0) {
    if (!isSolid(wx + dx, y)) {
      wx += dx;
      if (wx > maxWx) {
        maxWx = wx;
        score += 1;
      }
    }
  }

  if (jumpPower > 0) {
    if (!isSolid(wx, y - 1)) {
      y--;
      jumpPower--;
      if (jumpPower === 0) fallDelay = 2; // Extra hover makes jumps longer!
    } else {
      let tile = mapGrid[y - 1][wx];
      if (tile === '?') triggerBox(wx, y - 1);
      jumpPower = 0;
      fallDelay = 0;
    }
  } else {
    if (holdW && isSolid(wx, y + 1)) {
      jumpPower = 4;
      lastW = 0;
    } else if (!isSolid(wx, y + 1)) {
      if (fallDelay > 0) fallDelay--;
      else {
        y++;
        tuxFell = true;
      }
    }
  }

  for (let i = enemies.length - 1; i >= 0; i--) {
    let e = enemies[i];
    e.tick++;
    e.oldWx = e.wx;

    if (e.wx < cameraX - 4 || e.y >= 8) {
      enemies.splice(i, 1);
      continue;
    }

    if (!isSolid(e.wx, e.y + 1)) {
      if (e.tick % 2 === 0) e.y++;
    } else if (e.tick % 4 === 0) {
      // Patrol side to side
      let nextX = e.wx + e.dir;
      if (isSolid(nextX, e.y)) {
        e.dir *= -1;
      } else {
        e.wx = nextX;
      }
    }
  }

  checkCollisions(tuxFell, oldWx);

  if (y >= 8) die();
  if (!gameOver) render();
}

function render() {
  if (gameOver) return;

  if (wx > cameraX + 8) cameraX = wx - 8;
  if (wx < cameraX + 3) {
    cameraX = wx - 3;
    if (cameraX < 0) cameraX = 0;
  }

  while (mapGrid[0].length < cameraX + 24) addRandomChunk();

  let mapStr = "";
  for (let r = 0; r < 8; r++) {
    mapStr += mapGrid[r].substring(cameraX, cameraX + 16) + "\n";
  }
  setMap(mapStr.trim());

  for (let e of enemies) {
    let screenX = e.wx - cameraX;
    if (screenX >= 0 && screenX < 16) {
      let spriteType = (Math.floor(e.tick / 4) % 2 === 0) ? "1" : "2";
      addSprite(screenX, e.y, spriteType);
    }
  }

  let screenX = wx - cameraX;
  let animState = Math.floor(tickCount / 2) % 2 === 0;
  let spriteType = facingLeft ? (animState ? "l" : "k") : (animState ? "p" : "q");
  addSprite(screenX, y, spriteType);

  clearText();
  addText(`SCORE: ${score}`, { x: 0, y: 0, color: color`3` });
}

function die() {
  gameOver = true;
  clearInterval(loopId);
  clearText();
  addText(`SCORE: ${score}`, { x: 0, y: 0, color: color`3` });
  addText("GAME OVER", { x: 3, y: 3, color: color`4` });
  addText("Press K", { x: 4, y: 4, color: color`6` });
}

init();
