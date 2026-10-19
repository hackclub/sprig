/*
@title: Sky Sweeper
@description: Mine Sweeper for in the sky wasd to move. J to restat. K to flag, I to sweep. 
@author: Aishy
@tags: ['Space', 'Star', 'Mine Sweeper']
@addedOn: 2026-10-11

Controls:
  W A S D = move 
  I       = sweep
  K       = flag
  J       = restart
*/

const cursor = "c";  // scanner reticle
const hidden = "h";  // unscanned sector
const flag   = "f";  // beacon
const empty  = "e";  // safe sector with 0 mines nearby
const mineS  = "m";  // space mine
const boom   = "x";  // the mine that got you

// sound effects
const scanTune = tune`
60: E5~60,
60`;
const flagTune = tune`
80: G5^80,
80`;
const boomTune = tune`
100: undefined/100,
100: undefined/100,
100: undefined/100,
100: undefined/100,
2800`;
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
2222222222222222
2777777777777775
2777777777777775
2777777777777775
2777772227777775
2777722222777775
2772222222227775
2772222222222775
2722222222222275
2711222222222175
2771111111111775
2777777777777775
2777777777777775
2777777777777775
2777777777777775
5555555555555555`],
  [ empty, bitmap`
5555555555555555
5777777777777775
5777777777777775
5777777667777775
5777777667777775
5777776666777775
5776666666666775
5777666666667775
5777776666777775
5777766666677775
5777666776667775
5776677777766775
5777777777777775
5777777777777775
5777777777777775
5555555555555555`],
  [ flag, bitmap`
5555555555555555
5777777777777775
5777711111777775
5777112221177775
5771127777117775
5771227777717775
5771277777717775
5771277777717775
5771177777117775
5777117771177775
5777711111LL7775
5777777777L11775
5777777777711175
5777777777771175
5777777777777775
5555555555555555`],
  [ mineS, bitmap`
5555555555555555
5777777700077775
5777777003000075
5777770033333075
5777700339999075
5777003996669005
5770033966699305
5700399996993005
570399CC99933075
57039CCC99330775
570399CC93307775
5703399993077775
5770333330777775
5777000007777775
5777777777777775
5555555555555555`],
  [ boom, bitmap`
6666666666666666
6999999900099993
6999999003000093
6999990033333093
6999900339999093
6999003996669003
6990033966699303
6900399996993003
690399CC99933093
69039CCC99330993
690399CC93309993
6903399993099993
6990333330999993
6999000009999993
6999999999999993
3333333333333333`],
  [ "1", bitmap`
5555555555555555
5777777777777775
5777777777777775
5777777777777775
5777777HH7777775
577777HHH7777775
5777777HH7777775
5777777HH7777775
5777777HH7777775
5777777HH7777775
5777777HH7777775
577777HHHH777775
5777777777777775
5777777777777775
5777777777777775
5555555555555555`],
  
  [ "2", bitmap`
5555555555555555
5777777777777775
5777777777777775
5777777777777775
5777778888777775
5777788778877775
5777777778877775
5777777788877775
5777777788877775
5777777888777775
5777778887777775
5777788888877775
5777777777777775
5777777777777775
5777777777777775
5555555555555555`],

  [ "3", bitmap`
5555555555555555
5777777777777775
5777777777777775
5777777777777775
5777773333777775
5777733773377775
5777777773377775
5777777333777775
5777777773377775
5777777773377775
5777737773377775
5777773333777775
5777777777777775
5777777777777775
5777777777777775
5555555555555555`],

  [ "4", bitmap`
5555555555555555
5777777777777775
5777777777777775
5777777777777775
5777779779977775
5777779779977775
5777799779977775
5777797779977775
5777799999977775
5777777779977775
5777777779977775
5777777779977775
5777777777777775
5777777777777775
5777777777777775
5555555555555555`],

  [ "5", bitmap`
5555555555555555
5777777777777775
5777777777777775
5777777777777775
5777744444477775
5777744777777775
5777744777777775
5777774444777775
5777777774477775
5777777774477775
5777747774477775
5777774444777775
5777777777777775
5777777777777775
5777777777777775
5555555555555555`],

  
  [ "6", bitmap`
5555555555555555
5777777777777775
5777777777777775
5777777777777775
577777HHHH777775
57777HH777777775
57777HH777777775
57777HHHHH777775
57777HH77HH77775
57777HH77HH77775
57777HH77HH77775
577777HHHH777775
5777777777777775
5777777777777775
5777777777777775
5555555555555555`],


  [ "7", bitmap`
5555555555555555
5777777777777775
5777777777777775
5777777777777775
5777788888877775
5777787778877775
5777777778877775
5777777788877775
5777777888777775
5777777887777775
5777777887777775
5777777887777775
5777777777777775
5777777777777775
5777777777777775
5555555555555555`],


  
  [ "8", bitmap`
5555555555555555
5777777777777775
5777777777777775
5777777777777775
577777HHHH777775
57777HH77HH77775
57777HH77HH77775
577777HHHH777775
57777HH77HH77775
57777HH77HH77775
57777HH77HH77775
577777HHHH777775
5777777777777775
5777777777777775
5777777777777775
5555555555555555`],

)

// post vairiabls
const W = 10;      // columns 
const H = 8;       // rows
const MINES = 10;  // the mine count

// st codes: 0 hidden, 1 revealed, 2 flagged, 3 mine shown, 4 exploded mine
let mine, num, st, cx, cy, over, started, left;

function grid(v) {
  return Array.from({ length: H }, () => Array(W).fill(v));
}

function reset() {
  mine = grid(false);
  num = grid(0);
  st = grid(0);
  cx = 4;
  cy = 3;
  over = false;
  started = false;
  left = W * H - MINES; // that thing
  clearText();
  setMap(Array(H).fill("h".repeat(W)).join("\n"));
  render();
}

function plant(sx, sy) {
  let n = 0;
  while (n < MINES) {
    const x = Math.floor(Math.random() * W);
    const y = Math.floor(Math.random() * H);
    if (mine[y][x]) continue;
    if (Math.abs(x - sx) <= 1 && Math.abs(y - sy) <= 1) continue;
    mine[y][x] = true;
    n++;
  }
  // count neighbouring mines for every tile
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      let c = 0;
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const nx = x + dx, ny = y + dy;
          if (nx >= 0 && ny >= 0 && nx < W && ny < H && mine[ny][nx]) c++;
        }
      }
      num[y][x] = c;
    }
  }
}

//
function reveal(x, y) {
  const stack = [[x, y]];
  while (stack.length) {
    const [a, b] = stack.pop();
    if (a < 0 || b < 0 || a >= W || b >= H) continue;
    if (st[b][a] !== 0) continue;
    st[b][a] = 1;
    left--;
    if (num[b][a] === 0) {
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          stack.push([a + dx, b + dy]);
        }
      }
    }
  }
}

function spriteFor(x, y) {
  const s = st[y][x];
  if (s === 0) return hidden;
  if (s === 2) return flag;
  if (s === 3) return mineS;
  if (s === 4) return boom;
  return num[y][x] === 0 ? empty : String(num[y][x]);
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

// 
onInput("w", () => { cy = Math.max(0, cy - 1);     render(); });
onInput("s", () => { cy = Math.min(H - 1, cy + 1); render(); });
onInput("a", () => { cx = Math.max(0, cx - 1);     render(); });
onInput("d", () => { cx = Math.min(W - 1, cx + 1); render(); });

// sweep
onInput("i", () => {
  if (over || st[cy][cx] !== 0) return;
  if (!started) { plant(cx, cy); started = true; }

  if (mine[cy][cx]) {
    // boom! show every mine
    over = true;
    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        if (mine[y][x] && st[y][x] !== 2) st[y][x] = 3;
      }
    }
    st[cy][cx] = 4;
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
        if (mine[y][x]) st[y][x] = 2;
      }
    }
    playTune(winTune);
    addText("ALL CLEAR!  J=again", { x: 7, y: 7, color: color`4` });
    addText("press j to retry", { x: 3, y: 9, color: color`7` });

  }
  render();
});

// plant or remove
onInput("k", () => {
  if (over) return;
  if (st[cy][cx] === 0) st[cy][cx] = 2;
  else if (st[cy][cx] === 2) st[cy][cx] = 0;
  else return;
  playTune(flagTune);
  render();
});

// restart
onInput("j", () => reset());

reset();
