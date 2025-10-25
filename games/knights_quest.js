/*
@title: None
@author: None
@description: None
@tags: []
@addedOn: None
*/

const player = "p";
const wall = "w";
const key = "k";
const door = "d";
const guard = "g";
const floor = "f";

setLegend(
  [player, bitmap`
2222333322222222
2223666632222222
2236666663222222
2236666663222222
2236666663222222
2236666663222222
2223666632222222
2222333322222222
2222233222222222
2222333322222222
2223666632222222
2236666663222222
2236666663222222
2223666632222222
2222333322222222
2222222222222222`],

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
2222222222222222
2222000022222222
2220555502222222
2205555550222222
2205555550222222
2205555550222222
2220555502222222
2222000022222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222`],

  [door, bitmap`
3333333333333333
3222222222222222
3233333333333322
3232222222223232
3232333333323232
3232322222323232
3232323332323232
3232323223232323
3232323223232323
3232323332323232
3232322222323232
3232333333323232
3232222222223232
3233333333333322
3222222222222222
3333333333333333`],

  [guard, bitmap`
2222222222222222
2299999999999222
2999911119999922
2991111111199922
2991119991199922
2991119991199922
2991111111199922
2999911119999922
2299999999999222
2222299999222222
2222999999922222
2229999999992222
2229999999992222
2222999999922222
2222299999222222
2222222222222222`],

  [floor, bitmap`
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222`]
);

setBackground(floor);

// 🔁 3 LEVELS from your Python version
const maps = [
  map`
wwwwwwwwwwwwwwwwwwwwwwwwwwwww
wfffffffffffffffffffffffffffw
wfffffffffffffffffffffffffffw
wffwffkfgfffffffffffffffffffw
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
wwwwwwwwwwwwwwwwwwwwwwwwwwwww`,

  map`
wwwwwwwwwwwwwwwwwwwwwwwwwwwww
wfff.ff.f.w....wgwg.fffwffg.w
wfff.ff.f.w.f..wfwg.fffwffffw
wfffff....ff....fwg.fffwffffd
wfffw.gfkf.....wfwf.wffwffffw
wfffwwwwwwwwwwww.f.fwf.wffffw
wffffffffff.f..wk.ffwf.wffffw
wffffffffff.ff.w.f.fwf.wffffw
wfffwwwww.fwwfwf.f.fwffwffffw
wfffw.f....w.fkw.f.fwffwffffw
wfffw.pff..wg.fwf.f.wffwffffw
wfffwwwwwwwww.fwk.ffwfffffffw
wfffffgfffffff.w.fffwfffffffw
wfffffkffffffffwgfkfwfffffffw
wwwwwwwwwwwwwwwwwwwwwwwwwwwww`,

  map`
wwwwwwwwwwwwwwwwwwwwwwwwwwwdw
wfffffkffffgffffffwfffffffffw
wfffwwwwwfffffffffwfffgfffffw
wfffwfffwfffffffffwfffwfffffw
wfffwfffwfffffgfffwfffwfffffw
wfffwfffwwwwwwwfffwfffwfffffw
wfffwfffffffffffffwfffwfffffw
wfffwwwwwwfwwwwwwwwfffwfffffw
wffffffffwfffkfffffffffwffffw
wfffwwwwwwwwwwwwwwwffffwffffw
wfffwkkkkkkkkkkkkkwffffwffffw
wfffwpkkkkkkkkkkkkwffffgffffw
wfffwkkkkkkkkkkkkkwfffffffffw
wfffffffffffffffffffffffkfffw
wwwwwwwwwwwwwwwwwwwwwwwwwwwww`
];

let level = 0;
let keysLeft = 0;
let gameOver = false;

function loadLevel() {
  clearText();
  gameOver = false;
  keysLeft = 0;
  setMap(maps[level]);

  getAll(key).forEach(() => keysLeft++);
}

function getNextFrom(x, y, dir) {
  if (dir === "up") return { x, y: y - 1 };
  if (dir === "down") return { x, y: y + 1 };
  if (dir === "left") return { x: x - 1, y };
  if (dir === "right") return { x: x + 1, y };
}

// 🎮 Movement
onInput("w", () => movePlayer("up"));
onInput("s", () => movePlayer("down"));
onInput("a", () => movePlayer("left"));
onInput("d", () => movePlayer("right"));
onInput("j", () => loadLevel()); // 🔁 Restart current level


function movePlayer(dir) {
  if (gameOver) return;

  const p = getFirst(player);
  const next = getNextFrom(p.x, p.y, dir);
  const contents = getTile(next.x, next.y).map(o => o.type);

  if (contents.includes(wall)) return;

  if (contents.includes(key)) {
    clearTile(next.x, next.y);
    keysLeft--;
  }

  if (contents.includes(door)) {
    if (keysLeft === 0) {
      level++;
      if (level < maps.length) {
        loadLevel();
      } else {
        endGame(true);
      }
    }
    return;
  }

  if (contents.includes(guard)) return endGame(false);

  p.x = next.x;
  p.y = next.y;
}

// 🧠 Guard AI
setInterval(() => {
  if (gameOver) return;

  const p = getFirst(player);

  getAll(guard).forEach(g => {
    const dx = p.x - g.x;
    const dy = p.y - g.y;
    let dir = Math.abs(dx) > Math.abs(dy)
      ? (dx > 0 ? "right" : "left")
      : (dy > 0 ? "down" : "up");

    const moveTo = getNextFrom(g.x, g.y, dir);
    const nextTypes = getTile(moveTo.x, moveTo.y).map(o => o.type);

    if (!nextTypes.includes(wall) && !nextTypes.includes(guard)) {
      g.x = moveTo.x;
      g.y = moveTo.y;
    }

    if (g.x === p.x && g.y === p.y) endGame(false);
  });
}, 700);

// 💀 Game Over
function endGame(won) {
  gameOver = true;
  addText(won ? "YOU BEAT ALL 3 LEVELS!" : "YOU LOST!", {
    y: 7,
    color: won ? color`L` : color`3`
  });
}

// 🚀 Load first level
loadLevel();
