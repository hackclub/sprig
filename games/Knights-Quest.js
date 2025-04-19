const player = "p";
const wall = "w";
const key = "k";
const door = "d";
const guard = "g";
const floor = "f";

setLegend(
  [player, bitmap`
....3333....
...366663...
..36666663..
..36666663..
..36666663..
..36666663..
...366663...
....3333....
.....33.....
....3333....
...366663...
..36666663..
..36666663..
...366663...
....3333....
............`],

  [wall, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],

  [key, bitmap`
................
....0000........
...022220.......
..02222220......
..02222220......
..02222220......
...022220.......
....0000........
................
................
................
................
................
................
................
................`],

  [door, bitmap`
3333333333333333
3............... 
3.333333333333.. 
3.3.........3.3. 
3.3.3333333.3.3. 
3.3.3.....3.3.3. 
3.3.3.333.3.3.3. 
3.3.3.3..3.3.3.3 
3.3.3.3..3.3.3.3 
3.3.3.333.3.3.3. 
3.3.3.....3.3.3. 
3.3.3333333.3.3. 
3.3.........3.3. 
3.333333333333.. 
3............... 
3333333333333333`],

  [guard, bitmap`
................
..99999999999...
.9999111199999..
.9911111111999..
.9911199911999..
.9911199911999..
.9911111111999..
.9999111199999..
..99999999999...
.....99999......
....9999999.....
...999999999....
...999999999....
....9999999.....
.....99999......
................`],

  [floor, bitmap`
0LLLLLLLLLLLLLL0
L01111111111110L
L10555555555501L
L15077777777051L
L1570DDDDDD0751L
L157D044440D751L
L157D409904D751L
L157D495494D751L
L157D49D794D751L
L157D409904D751L
L157D044440D751L
L1570DDDDDD0751L
L15077777777051L
L10555555555501L
L01111111111110L
0LLLLLLLLLLLLLL0`]
);

setBackground(floor);

setMap(map`
wwwwwwwwwwwwwwwwwwwwwwwwwwwww
wfffffffffffffffffffffffffffw
wfffffffffffffffffffffffffffw
wffwffkfgffffffffffffffffffff
wffwwwwwwwwwwwwwwwwwwwwwwwwww
wfffffffffffffffffffffffffffw
wffffffffffpffffffffffffffffw
wffwwwwwwwwwwwwwwwwwwwwwwwwww
wfffffffffgkffffffffffffffffw
wfffffffffffffffffffffffffffw
wfffffffffffffffffffffffffffd
wwwwwwwwwwwwwwwwwwwwwwwwwwwww
wfffffffffffffffffffffffffffw
wfffffffffffffffffffffffffffw
wwwwwwwwwwwwwwwwwwwwwwwwwwwww
`);

let keysLeft = 2;
let gameOver = false;

onInput("w", () => tryMove("up"));
onInput("s", () => tryMove("down"));
onInput("a", () => tryMove("left"));
onInput("d", () => tryMove("right"));

function tryMove(dir) {
  if (gameOver) return;
  const next = getTileInDir(dir);
  const types = next.map(t => t.type);

  if (types.includes(wall)) return;
  if (types.includes(guard)) return endGame(false);
  if (types.includes(key)) {
    keysLeft--;
    clearTile(getNextPos(dir));
  }
  if (types.includes(door)) {
    if (keysLeft === 0) return endGame(true);
    else return;
  }

  getFirst(player).move(dir);
}

function getTileInDir(dir) {
  return getTile(getNextPos(dir));
}

function getNextPos(dir) {
  const { x, y } = getFirst(player);
  if (dir === "up") return { x, y: y - 1 };
  if (dir === "down") return { x, y: y + 1 };
  if (dir === "left") return { x: x - 1, y };
  if (dir === "right") return { x: x + 1, y };
}

setInterval(() => {
  if (gameOver) return;
  const p = getFirst(player);
  getAll(guard).forEach(g => {
    const dx = p.x - g.x;
    const dy = p.y - g.y;
    let dir;
    if (Math.abs(dx) > Math.abs(dy)) {
      dir = dx > 0 ? "right" : "left";
    } else {
      dir = dy > 0 ? "down" : "up";
    }

    const { x, y } = getNextFrom(g.x, g.y, dir);
    const types = getTile({ x, y }).map(t => t.type);

    if (!types.includes(wall) && !types.includes(guard)) {
      g.x = x;
      g.y = y;
    }

    if (g.x === p.x && g.y === p.y) {
      endGame(false);
    }
  });
}, 1000);

function getNextFrom(x, y, dir) {
  if (dir === "up") return { x, y: y - 1 };
  if (dir === "down") return { x, y: y + 1 };
  if (dir === "left") return { x: x - 1, y };
  if (dir === "right") return { x: x + 1, y };
}

function endGame(won) {
  gameOver = true;
  addText(won ? "YOU WON!" : "YOU LOST!", {
    y: 7,
    color: won ? color`2` : color`3`
  });
}
