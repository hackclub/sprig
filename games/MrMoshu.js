/*
@title: Mr. Moshu
@author: Emin Jamally
@tags: ["hacker", "puzzle", "terminal", "stealth"]
@addedOn: 2026-04-07
@description: A hacking-themed puzzle game. Play as a "Ghost" in the machine — collect data cubes, bypass active firewalls, and decrypt terminal passwords to reach "Owner" status.
*/
const p = "p";
const w = "w";
const v = "v";
const d = "d";
const k = "k";
const f = "f";
const z = "z";

setLegend(
  [p, bitmap`
....00000000....
...00LLLLLL00...
...0LL00011L0...
..00L000001100..
..0L03300331L0..
..0L0000000110..
..0L0000000110..
..00L000000L00..
...00L0000L00...
....00L1L100....
...00L11L1L0....
..00LLLLL1LL00..
.00LLLLLL11LL00.
.0LLLLLLLLLLLL0.
.0LLLLLLLLLLLL0.
.00000000000000.`],
  [w, bitmap`
0000000000000000
0777777777777770
0700000000000070
0703300000220070
0703300000220070
0700000000000070
0700000000000070
0700000000000070
0703300000000070
0703300000000070
0700000000000070
0700000000000070
0700000000000070
0700000000000070
0777777777777770
0000000000000000`],
  [v, bitmap`
0LLLLLLLLLLLLLL0
LLLLLLLLLLLLLLLL
L66L66L66L7L111L
LLLLLLLLLLLLLLLL
0LLLLLLLLLLLLLL0
0000000000000000
0LLLLLLLLLLLLLL0
L1L1L1LLLLLLLLLL
L1L1L1L7L7L7L6LL
L1L1L1LLLLLLLLLL
0LLLLLLLLLLLLLL0
0000000000000000
0LLLLLLLLLLLLLL0
L66L66L66L77LLLL
L66L66L66L77LLLL
0LLLLLLLLLLLLLL0`],
  [d, bitmap`
.D...D..D..D....
D.D.DD.DD.D.D...
D.D..D..D.D.D...
D.D..D..D.D.D...
.D...D..D..D....
................
................
.D...D...D...D..
D.D.D.D.D.D.DD..
D.D.D.D.D.D..D..
D.D.D.D.D.D..D..
.D...D...D...D..
................
................
................
................`],
  [k, bitmap`
...0000000000...
..011111111110..
.01000000000010.
.010DD00D000010.
.01D000D0D00010.
.01D000000D0010.
.010DD0D000D010.
.01000000000010.
.01000000000010.
.01000000000010.
.01111111111110.
..000LLLLLL000..
..011111111110..
.01LL1LLLLLLL10.
0111111111111110
0000000000000000`],
  [f, bitmap`
.00033333333000.
0033333333333300
0333333333333330
0333003333003330
3330003333000333
3300003333000033
3300003333000033
3333333333333333
3333330000333333
3333300000033333
3333000330003333
0330003333000330
0030033333300300
.03333333333330.
..000333333300..
....00000000....`],
  [z, bitmap`
.D...D..D...D...
D.D.DD.D.D.D.D..
D.D..D.D.D.D.D..
D.D..D.D.D.D.D..
.D...D..D...D...
................
................
.D..D..D...D....
DD.DD.D.D.D.D...
.D..D.D.D.D.D...
.D..D.D.D.D.D...
.D..D..D...D....
................
................
................
................`],
);

const levels = [
  map`
vwvwvwvwvvwvvv
w..........d.w
w..p.........v
w......d.w...w
v........w...v
w.wvwwvwww...w
v.d.wk.......v
w...w........w
vwvvwvwvwvwvwv`,
  map`
wwwwwwwwwwwww
w.k........dw
w...wwwwwww.w
w...w.....w.w
w.p.w..z....w
w...w.....w.w
w...wwwwwwwww
w.......d...w
wwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwww
wp.wdw.....wkww
w..w.ww.www...w
w.....w..f....w
w..wwwwwwww.www
w...w..w..d...w
w.www..f..www.w
w.w.........w.w
w.w.wwwwwww.w.w
w.w.dw....w.w.w
w.wwww.w.ww.w.w
w......w....wdw
wwwwwwwwwwwwwww`
];

const victoryMap = map`
wwwwwwwwwwwwwww
w.............w
w.............w
w.............w
w.............w
w.............w
w.............w
w.............w
w.............w
w.............w
w.............w
w.............w
w.............w
wwwwwwwwwwwwwww`;

let currentLevel = 0;
let gameOver = false;

const firewallDirs = new Map();

function initFirewalls() {
  firewallDirs.clear();
  getAll("f").forEach((fw, i) => {
    firewallDirs.set(fw, i % 2 === 0
      ? { dx: 0, dy: 1 }
      : { dx: 1, dy: 0 }
    );
  });
}

function moveFirewalls() {
  if (gameOver) return;
  getAll("f").forEach(fw => {
    let { dx, dy } = firewallDirs.get(fw) || { dx: 0, dy: 1 };
    const nx = fw.x + dx;
    const ny = fw.y + dy;
    const ahead = getTile(nx, ny);
    const blocked = ahead.some(t =>
      t.type === "w" || t.type === "v" || t.type === "f"
    );
    if (blocked) {
      firewallDirs.set(fw, { dx: -dx, dy: -dy });
    } else {
      fw.x = nx;
      fw.y = ny;
    }
    const player = getFirst("p");
    if (player && fw.x === player.x && fw.y === player.y) {
      currentLevel = 0;
      setupLevel();
    }
  });
}

setInterval(moveFirewalls, 600);

function isWall(tiles) {
  return tiles.some(t => t.type === "w" || t.type === "v");
}

function showVictory() {
  gameOver = true;
  setMap(victoryMap);
  addText("VICTORY!", { x: 3, y: 5, color: color`green` });
  addText("You Win!", { x: 3, y: 7, color: color`black` });
  addText("Press I", { x: 4, y: 9, color: color`black` });
  addText("to replay", { x: 3, y: 10, color: color`black` });
}

function setupLevel() {
  gameOver = false;
  clearText();
  setMap(levels[currentLevel]);
  initFirewalls();
}

setupLevel();

onInput("w", () => {
  if (gameOver) return;
  const player = getFirst("p");
  if (!player) return;
  const ny = player.y - 1;
  if (ny < 0) return;
  if (!isWall(getTile(player.x, ny))) player.y = ny;
});

onInput("s", () => {
  if (gameOver) return;
  const player = getFirst("p");
  if (!player) return;
  const ny = player.y + 1;
  if (!isWall(getTile(player.x, ny))) player.y = ny;
});

onInput("a", () => {
  if (gameOver) return;
  const player = getFirst("p");
  if (!player) return;
  const nx = player.x - 1;
  if (nx < 0) return;
  if (!isWall(getTile(nx, player.y))) player.x = nx;
});

onInput("d", () => {
  if (gameOver) return;
  const player = getFirst("p");
  if (!player) return;
  const nx = player.x + 1;
  if (!isWall(getTile(nx, player.y))) player.x += 1;
});

onInput("i", () => {
  currentLevel = 0;
  setupLevel();
});

afterInput(() => {
  if (gameOver) return;
  const player = getFirst("p");
  if (!player) return;

  let levelComplete = false;

  getTile(player.x, player.y).forEach(t => {
    if (t.type === "z") {
      currentLevel = 0;
      setupLevel();
      levelComplete = true;
    }

    if (t.type === "d") t.remove();

    if (t.type === "k" && !levelComplete) {
      if (getAll("d").length === 0) {
        levelComplete = true;
        currentLevel++;
        if (currentLevel >= levels.length) {
          showVictory();
        } else {
          setupLevel();
        }
      }
    }
  });
});
