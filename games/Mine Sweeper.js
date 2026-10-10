/*
@title: Mine Sweeper
@description: Minesweeper K for flags, I to sweep, normal keys to navagate, J to replay
@tags: ['minesweeper']
@addedOn: 2026-10-10
*/

const cursor = "c";
const hidden = "h";
const flag = "f";
const empty = "e";
const mineS = "m";
const boom = "x";

const scanTune = tune`
60: E5~60,
60`;
const flagTune = tune`
80: G5^80,
80`;
const boomTune = tune`
100: C3/100 + G2/100,
100: A2/100,
100: F2/100,
100: C2/100,
100`;
const winTune = tune`
100: C5~100,
100: E5~100,
100: G5~100,
100: C6~100 + E6~100,
100`;

setLegend(
  [ cursor, bitmap`
6666666666666666
6666666666666666
66............66
66............66
66............66
66............66
66............66
66............66
66............66
66............66
66............66
66............66
66............66
66............66
6666666666666666
6666666666666666`],
  [ hidden, bitmap`
8888888888888888
8HHHHHHHHHHHHHH7
8HHHHHHHHHHHHHH7
8HHHHHHHHHHHHHH7
8HHHHHHHHHHHHHH7
8HHHHHHHHHHHHHH7
8HHHHHHHHHHHHHH7
8HHHHHHHHHHHHHH7
8HHHHHHHHHHHHHH7
8HHHHHHHHHHHHHH7
8HHHHHHHHHHHHHH7
8HHHHHHHHHHHHHH7
8HHHHHHHHHHHHHH7
8HHHHHHHHHHHHHH7
8HHHHHHHHHHHHHH7
7777777777777777`],
  [ flag, bitmap`
8888888888888888
8444444444444447
8444444444444447
8444433332444447
8444433332444447
8444443332444447
8444444332444447
8444444442444447
8444444442444447
8444444442444447
8444444442444447
8444444222224447
8444442222222447
8444444444444447
8444444444444447
7777777777777777`],
  [ empty, bitmap`
LLLLLLLLLLLLLLLL
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
LLLLLLLLLLLLLLLL`],
  [ mineS, bitmap`
LLLLLLLLLLLLLLLL
L11111111111111L
L11111100111111L
L11011000011011L
L11100055000111L
L11102255550111L
L11005555550011L
L10055555555001L
L10055555555001L
L11005555550011L
L11105555220111L
L11100055000111L
L11011000011011L
L11111100111111L
L11111111111111L
LLLLLLLLLLLLLLLL`],
  [ boom, bitmap`
LLLLLLLLLLLLLLLL
L33333333333333L
L33333300333333L
L33033000033033L
L33300055000333L
L33302255550333L
L33005555550033L
L30055555555003L
L30055555555003L
L33005555550033L
L33305555220333L
L33300055000333L
L33033000033033L
L33333300333333L
L33333333333333L
LLLLLLLLLLLLLLLL`],
  [ "1", bitmap`
LLLLLLLLLLLLLLLL
L11111111111111L
L11111111111111L
L11111111111111L
L11111177111111L
L11111777111111L
L11111177111111L
L11111177111111L
L11111177111111L
L11111177111111L
L11111177111111L
L11111777711111L
L11111111111111L
L11111111111111L
L11111111111111L
LLLLLLLLLLLLLLLL`],
  [ "2", bitmap`
LLLLLLLLLLLLLLLL
L11111111111111L
L11111111111111L
L11111111111111L
L11111HHHH11111L
L1111HH11HH1111L
L11111111HH1111L
L1111111HHH1111L
L1111111HHH1111L
L111111HHH11111L
L11111HHH111111L
L1111HHHHHH1111L
L11111111111111L
L11111111111111L
L11111111111111L
LLLLLLLLLLLLLLLL`],
  [ "3", bitmap`
LLLLLLLLLLLLLLLL
L11111111111111L
L11111111111111L
L11111111111111L
L11111888811111L
L11118811881111L
L11111111881111L
L11111188811111L
L11111111881111L
L11111111881111L
L11118111881111L
L11111888811111L
L11111111111111L
L11111111111111L
L11111111111111L
LLLLLLLLLLLLLLLL`],
  [ "4", bitmap`
LLLLLLLLLLLLLLLL
L11111111111111L
L11111111111111L
L11111111111111L
L11111311331111L
L11111311331111L
L11113311331111L
L11113111331111L
L11113333331111L
L11111111331111L
L11111111331111L
L11111111331111L
L11111111111111L
L11111111111111L
L11111111111111L
LLLLLLLLLLLLLLLL`],
  [ "5", bitmap`
LLLLLLLLLLLLLLLL
L11111111111111L
L11111111111111L
L11111111111111L
L11119999991111L
L11119911111111L
L11119911111111L
L11111999911111L
L11111111991111L
L11111111991111L
L11119111991111L
L11111999911111L
L11111111111111L
L11111111111111L
L11111111111111L
LLLLLLLLLLLLLLLL`],
  [ "6", bitmap`
LLLLLLLLLLLLLLLL
L11111111111111L
L11111111111111L
L11111111111111L
L11111666611111L
L11116611111111L
L11116611111111L
L11116666611111L
L11116611661111L
L11116611661111L
L11116611661111L
L11111666611111L
L11111111111111L
L11111111111111L
L11111111111111L
LLLLLLLLLLLLLLLL`],
  [ "7", bitmap`
LLLLLLLLLLLLLLLL
L11111111111111L
L11111111111111L
L11111111111111L
L11114444441111L
L11114111441111L
L11111111441111L
L11111114441111L
L11111144411111L
L11111144111111L
L11111144111111L
L11111144111111L
L11111111111111L
L11111111111111L
L11111111111111L
LLLLLLLLLLLLLLLL`],
  [ "8", bitmap`
LLLLLLLLLLLLLLLL
L11111111111111L
L11111111111111L
L11111111111111L
L11111777711111L
L11117711771111L
L11117711771111L
L11111777711111L
L11117711771111L
L11117711771111L
L11117711771111L
L11111777711111L
L11111111111111L
L11111111111111L
L11111111111111L
LLLLLLLLLLLLLLLL`]
);

const W = 10;
const H = 8;
const MINES = 10;

// state: 0 hidden, 1 open, 2 flagged, 3 mine, 4 hit mine
let mines, counts, state, cx, cy, over, started, left;

function grid(v) {
  return Array.from({ length: H }, () => Array(W).fill(v));
}

function reset() {
  mines = grid(false);
  counts = grid(0);
  state = grid(0);
  cx = 4;
  cy = 3;
  over = false;
  started = false;
  left = W * H - MINES;
  clearText();
  setMap(Array(H).fill("h".repeat(W)).join("\n"));
  render();
}


function plant(sx, sy) {
  let n = 0;
  while (n < MINES) {
    const x = Math.floor(Math.random() * W);
    const y = Math.floor(Math.random() * H);
    if (mines[y][x]) continue;
    if (Math.abs(x - sx) <= 1 && Math.abs(y - sy) <= 1) continue;
    mines[y][x] = true;
    n++;
  }

  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      let c = 0;
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const nx = x + dx;
          const ny = y + dy;
          if (nx >= 0 && ny >= 0 && nx < W && ny < H && mines[ny][nx]) c++;
        }
      }
      counts[y][x] = c;
    }
  }
}

function reveal(x, y) {
  const stack = [[x, y]];
  while (stack.length) {
    const [a, b] = stack.pop();
    if (a < 0 || b < 0 || a >= W || b >= H) continue;
    if (state[b][a] !== 0) continue;
    state[b][a] = 1;
    left--;
    if (counts[b][a] === 0) {
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          stack.push([a + dx, b + dy]);
        }
      }
    }
  }
}

function spriteFor(x, y) {
  const s = state[y][x];
  if (s === 0) return hidden;
  if (s === 2) return flag;
  if (s === 3) return mineS;
  if (s === 4) return boom;
  return counts[y][x] === 0 ? empty : String(counts[y][x]);
}



function render() {
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      clearTile(x, y);
      addSprite(x, y, spriteFor(x, y));
    }
  }
  addSprite(cx, cy, cursor);
}

onInput("w", () => { cy = Math.max(0, cy - 1); render(); });
onInput("s", () => { cy = Math.min(H - 1, cy + 1); render(); });
onInput("a", () => { cx = Math.max(0, cx - 1); render(); });
onInput("d", () => { cx = Math.min(W - 1, cx + 1); render(); });



onInput("i", () => {
  if (over || state[cy][cx] !== 0) return;
  if (!started) {
    plant(cx, cy);
    started = true;
  }

  if (mines[cy][cx]) {
    over = true;
    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        if (mines[y][x] && state[y][x] !== 2) state[y][x] = 3;
      }
    }
    state[cy][cx] = 4;
    render();
    playTune(boomTune);
    addText("BOOM!", { x: 7, y: 7, color: color`3` });
    addText("press j to retry", { x: 3, y: 9, color: color`3` });
    return;
  }

  reveal(cx, cy);
  playTune(scanTune);

  if (left === 0) {
    over = true;
    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        if (mines[y][x]) state[y][x] = 2;
      }
    }
    playTune(winTune);
    addText("YOU WIN!", { x: 5, y: 7, color: color`4` });
    addText("press j to retry", { x: 3, y: 9, color: color`7` });
  }
  render();
});

onInput("k", () => {
  if (over) return;
  if (state[cy][cx] === 0) state[cy][cx] = 2;
  else if (state[cy][cx] === 2) state[cy][cx] = 0;
  else return;
  playTune(flagTune);
  render();
});

onInput("j", () => reset());

reset();