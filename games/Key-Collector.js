const player = "p";
const wall = "w";
const enemy = "e";
const key = "k";
const door = "d";
const floor = "f";

setLegend(
  [player, bitmap`
................
....000000......
...00000000.....
...00200200.....
...00000000.....
...00200200.....
....022220......
.....0000.......
......00........
.....0000.......
.....0..0.......
....0....0......
....0....0......
....0....0......
....0....0......
................`],
  [wall, bitmap`
LLLLLLLLLLLLLLLL
L88888888888888L
L88888888888888L
L88888888888888L
L88888888888888L
L88888888888888L
L88888888888888L
L88888888888888L
L88888888888888L
L88888888888888L
L88888888888888L
L88888888888888L
L88888888888888L
L88888888888888L
L88888888888888L
LLLLLLLLLLLLLLLL`],
  [enemy, bitmap`
..2......2......
...555555.......
..55555555......
.5550550555.....
.5555555555.....
..55000055......
..50555505......
....5555........
...555555.......
..55555555......
.5555555555.....
5555....5555....
5555....5555....
5555....5555....
5555....5555....
5555....5555....`],
  [key, bitmap`
................
................
................
................
.00.............
0..0000000......
0..0000000......
0..0000000......
.00.0.0..0......
......0..0......
................
................
................
................
................
................`],
  [door, bitmap`
0000000000000000
0............000
0.3333333333.000
0.3.......3..000
0.3.......3..000
0.3.......3..000
0.3.......3..000
0.3.......3..000
0.3.......3..000
0.3.......3..000
0.3.......3..000
0.3.......3..000
0.3.......3..000
0.3.......3..000
0.3333333333.000
0000000000000000`],
  [floor, bitmap`
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
................`]
);

setBackground(floor);

let level = 0;

const levels = [
  map`
wwwwwwwwwwwwwwww
wp.............w
w.wwwwww.wwwww.w
w.w.....w.....w.
w.w.w.w.w.www.w.
w...w.w.w.w.w.w.
www.w.w.w.w.w.w.
w.....w.w.w.w.w.
w.wwwwwww.w.w.w.
w.w.......w.w.w.
w.w.wwwwwww.w.w.
w.w.........w.w.
w.wwwwwwwwww.w.w
w.k.........d.w.
w.wwwwwwwwwwwww.
wwwwwwwwwwwwwwww`,

  map`
wwwwwwwwwwwwwwww
wp....wwwwk....w
www.w.wwwww.w..w
w...w.w.....w..w
w.w.w.wwwww.w..w
w.w.w.....w.w..w
w.w.wwwww.w.w..w
w.w.....w.w.w..w
w.wwwww.w.w.wwww
w.......w.w.wwww
wwwwwwwww.w.wwww
w.........w.wwww
w.wwwwwwwww.wwww
w.............d.
w...wwwwwwwwwwww
wwwwwwwwwwwwwwww`,

  map`
wwwwwwwwwwwwwwww
wp.............w
w.wwwwww.wwww..w
w.w.....w..w...w
w.w.w.w.ww.w.www
w...w.w....w.www
www.w.wwww.w.www
w.....w......www
w.wwwwwwwww..www
w.w.........w...
w.w.wwwwwwwww...
w.w.............
w.wwwwwwwwwwww.w
w.k.wwwwwwww..d.
w.wwwwwwwwwwwwww
wwwwwwwwwwwwwwww`,

  map`
wwwwwwwwwwwwwwww
wp...........k.w
w.wwwwwwwwwwww.w
w.w...........w.
w.w.wwwwwwwww.w.
w.w.w.......w.w.
w.w.w.wwwww.w.w.
w.w.w.w...w.w.w.
w.w.w.w.w.w.w.w.
w.w.w.w.w.w.w.w.
w.w.w.w.w.w.w.w.
w.....w.w...w.w.
w.w.www.w.www.w.
w.w.w.........d.
w.wwwwwwwwwwwwww
wwwwwwwwwwwwwwww`,

  map`
wwwwwwwwwwwwwwww
wp....w........w
w.wwww.wwww..w..
w...........www.
wwwww.wwwww.www.
w.......w...www.
w.wwwww.w.wwwww.
w.w.....w....ww.
w.w.wwwwwww.ww..
w.w.........w...
w.wwwwwwww.w.ww.
w.........w.....
w.wwwwwwwwwwww..
w.k......ww.d...
w.wwwwwwwwwwwwww
wwwwwwwwwwwwwwww`,

  map`
wwwwwwwwwwwwwwww
wp.............w
w.wwwwww.wwwww.w
w.w.....w.....w.
w.w.w.w.w.www.w.
w...w.w.w.w.w.w.
www.w.w.w.w.w.w.
w.....w.w.w.w.w.
w.wwwwwww.w.w.w.
w.w.......w.w.w.
w.w.wwwwwww.w.w.
w.w.........w.w.
w.wwwwwwwwww.w.w
w.k.........d.w.
w.wwwwwwwwwwwww.
wwwwwwwwwwwwwwww`,

  map`
wwwwwwwwwwwwwwww
wp.....w.......w
w.wwww.w.wwwww.w
w.w.......wwww.w
w.w.wwwwww.wwwkw
w.w.w.....w.w.w.
w.w.w.wwwww.w.w.
w.w.w.....w.w.w.
w.w.wwwwwww.w.w.
w.w.........w.w.
w.wwwwwwwwwww.w.
w.............w.
w.wwwwwwwwwwww.w
w...........d..w
w.wwwwwwwwwwwwww
wwwwwwwwwwwwwwww`,

  map`
wwwwwwwwwwwwwwww
wp.............w
w.wwwwwww.wwww.w
w.w.....w.wk...w
w.w.www.w.wwwww.
w.w.w...w.....w.
w.w.w.wwwwwww.w.
w.w.w.........w.
w.w.wwwwwwwww.w.
w.w........ww.w.
w.wwwwwwww...w.w
w.w...........w.
w.w..wwwwwwwwwww
w.ww........d..w
w.wwwwwwwwwwwwww
wwwwwwwwwwwwwwww`,

  map`
wwwwwwwwwwwwwwww
wp.............w
w.wwwwwwwwwww..w
w.w...........w.
w.w.wwwwwwwwww.w
w.w.w.........w.
w.w.w.wwwww.www.
w.w.w.w...wkw.w.
w.w.w.w.wwwww.w.
w.w.w.........w.
w.w.wwwwwwwww.w.
w.w...........w.
w.wwwwwwwwwwww.w
w.w.........d..w
w.wwwwwwwwwwwwww
wwwwwwwwwwwwwwww`,

  map`
wwwwwwwwwwwwwwww
wk.............w
w.wwwwwwwwwwww.w
w.w.............
w.w.wwwwwwwwww.w
w.w.w.........w.
w.w.w.wwwwwww.w.
w.w...w....pw.wd
w.w.w.w.wwwww.w.
w.w.w.w.......w.
w.w.wwwwwwwww.w.
w.w...........w.
w.wwwwwwwwwwww..
w...............
w.wwwwwwwwwwwwww
wwwwwwwwwwwwwwww`,

  map`
wwwwwwwwwwwwwwww
w.k......w.w..pw
w.wwwwwwww.....w
w.w.........w.w.
w.w.wwwwwww.w.w.
w.w.w.......w.w.
w.w.w.wwwwwww.w.
w.w.w........ww.
w.w.wwwwwww..w..
w.w.........w...
w.w.wwwwwwww.w..
w.............w.
w.wwwwwwwwwwwwww
w.....www...d..w
w.www......wwwww
wwwww.....wwwwww`,

  map`
wwwwwwwwwwwwwwww
wp..........w..w
w.wwww.www..w.ww
w.....ww...w...w
wwwwwwwwww.wwwww
w.......w...w.kw
w.wwwww.w.www.w
w.w.....w.....w
w.w.wwwwwww.ww.w
w.w.........w..w
w.wwww.www.w.ww.
w.........w....w
w.wwwwwwwwwwww.w
w...........d..w
w.wwwwwwwwwwwwww
wwwwwwwwwwwwwwww`,

  map`
wwwwwwwwwwwwwwww
wp........ww..kw
w.wwwwwwwwwww...
w.w...........w.
w.w.wwwwwwwwwww.
w.w.w.........w.
w.w.w.wwwww.www.
w.w.w.w.....w.w.
w.w...w.wwwww.w.
w.w.w.w.......w.
w.w.wwwwwwwww.w.
w.w...........w.
w.wwwwwwwww.ww..
w...........d...
w.wwwwwwwwwwwwww
wwwwwwwwwwwwwwww`,

  map`
wwwwwwwwwwwwwwww
wp.............w
w.ww.w.wwwww.wdw
w...w.w.....w.w.
w.w.w.wwwww.w.w.
w.w.w.....w.w.w.
w.w.wwwww.w.w.w.
w.w.....w.w.w.w.
w.wwwww.w.w.w.w.
w.......w.w.w.w.
wwwwwww.w.w.w.w.
w.........w.w.w.
w.wwwwwwwww.w.w.
w.w...........k.
w...wwwwwwwwwwww
wwwwwwwwwwwwwwww`,

  map`
wwwwwwwwwwwwwwww
wp.............w
w.wwwwww.wwww..w
w.w.....w..w...w
w.w.w.w.ww.w.www
w...w.w...kw...w
www.w.wwww.w.w.w
w.....w....w.w.w
w.wwwwww.www.w.w
w.w.........w.w.
w.w.wwwwwwwww.w.
w.w.............
w.wwwwwwwwwwww.w
w.............d.
w.wwwwwwwwwwwwww
wwwwwwwwwwwwwwww`,

  map`
wwwwwwwwwwwwwwww
wp.............w
w.wwwwww.wwwww.w
w.w.....w.......
w.w.w.w.w.www.w.
w...w.w.w.w.w.w.
www.w.w.w.w.w.w.
w.....wkw.w.w.wd
w.wwwwwww.w.w.w.
w.w.......w.w.w.
w.w.wwwwwww.w.w.
w.w.........w.w.
w.wwwwwwwwww.w.w
w.............w.
w.wwwwwwwwwwwww.
wwwwwwwwwwwwwwww`,

  map`
wwwwwwwwwwwwwwww
wp.....w......kw
w.wwww.w.wwwww.w
w.w.......w...w.
w.w.wwwwww.w.w.w
w.w.w.....w.w.w.
w.w.w.wwwww.w.w.
w.w.w.....w.w.w.
wdw.wwwwwww.w.w.
w.w.........w.w.
w.wwwwwwwwwww.w.
w.............w.
w.wwwwwwwwwwww.w
w..............w
w.wwwwwwwwwwwwww
wwwwwwwwwwwwwwww`,

  map`
wwwwwwwwwwwwwwww
wp.........w..kw
w.wwwwwwww.w...w
w.w........ww.w.
w.w.wwwwwww...w.
w.w.w.......w.w.
w.w.w.wwwwwww.w.
w.w.w.......w.w.
w.w.wwwwwwww...w
w.w.........w...
w.wwwwwwwwww...w
w...............
w.wwwwwwwwwwww.w
w...........d..w
w.wwwwwwwwwwwwww
wwwwwwwwwwwwwwww`
];



function startLevel() {
  clearText();
  setMap(levels[level]);

  let enemies = getAll(enemy);
  for (let e of enemies) {
    patrol(e, level);
  }
}

function patrol(enemyObj, lvl) {
  let dir = 1;
  setInterval(() => {
    let { x, y } = enemyObj;
    if (!enemyObj.exists()) return;

    let next = lvl % 2 === 0
      ? { x: x + dir, y }
      : { x, y: y + dir };

    if (getTile(next.x, next.y).some(t => t.type === wall || t.type === door)) {
      dir *= -1;
    } else {
      enemyObj.setPosition(next.x, next.y);
    }

    if (enemyObj.overlaps(player)) {
      lose();
    }
  }, 500);
}

function lose() {
  clearText();
  addText("Caught!", { y: 6, color: color`red` });
  setTimeout(startLevel, 1500);
}

function win() {
  level++;
  if (level < levels.length) {
    clearText();
    addText("Next Level!", { y: 6, color: color`green` });
    setTimeout(startLevel, 1500);
  } else {
    clearText();
    addText("You Win!", { y: 6, color: color`green` });
  }
}

// Movement with wall collision check
function tryMove(dx, dy) {
  const p = getFirst(player);
  const target = getTile(p.x + dx, p.y + dy);
  if (!target.some(t => t.type === wall)) {
    p.x += dx;
    p.y += dy;
  }
}

onInput("s", () => tryMove(0, 1));
onInput("w", () => tryMove(0, -1));
onInput("a", () => tryMove(-1, 0));
onInput("d", () => tryMove(1, 0));

afterInput(() => {
  let p = getFirst(player);
  let tile = getTile(p.x, p.y);

  if (tile.some(t => t.type === enemy)) {
    lose();
  }

  if (tile.some(t => t.type === key)) {
    clearTile(p.x, p.y);
    addSprite(p.x, p.y, player);
  }

  if (tile.some(t => t.type === door)) {
    if (!getAll(key).length) {
      win();
    }
  }
});

startLevel();
