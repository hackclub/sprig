const player = "p";
const playerL = "q";
const heart = "h";
const flag = "f";
const pole = "o";
const grass = "g";
const dirt = "d";
const sky = "s";

setLegend(
  [ player, bitmap`
.......CC.......
....CCCCC.CC....
...CCCCCCCCCC...
...C88CCC888C...
.CCC88888888CC..
.CCC88888888CC..
.CC88C888C88CC..
CCC888888888CCC.
CC888888888888C.
.8888888888888..
CC88888888888C..
CCC888888888CCC.
.CC888888888CC..
.CC888888888C...
..CC8888888C....
....888.888.....
` ],
  [ playerL, bitmap`
.......CC.......
....CC.CCCCC....
...CCCCCCCCCC...
...C888CCC88C...
..CC88888888CCC.
..CC88888888CCC.
..CC88C888C88CC.
.CCC888888888CCC
.C888888888888CC
..8888888888888.
..C88888888888CC
.CCC888888888CCC
..CC888888888CC.
...C888888888CC.
....C8888888CC..
.....888.888....
` ],
  [ heart, bitmap`
................
................
...CCC....CCC...
..C333C..C333C..
.C33333CC33333C.
C3333333333333CC
C33883333333333C
C3333333333CC33C
C333333333CCC33C
.C3333333CCC33C.
..C333333CC33C..
...C3333CC33C...
....C333C33C....
.....CC333C.....
......CCCC......
.......CC.......
` ],
  [ flag, bitmap`
.....LL.........
.....LL66666....
.....LL66666666.
.....LL66666666.
.....LL66666666.
.....LL66666....
.....LL.........
.....LL.........
.....LL.........
.....LL.........
.....LL.........
.....LL.........
.....LL.........
.....LL.........
.....LL.........
.....LL.........
` ],
  [ pole, bitmap`
.....LL.........
.....LL.........
.....LL.........
.....LL.........
.....LL.........
.....LL.........
.....LL.........
.....LL.........
.....LL.........
.....LL.........
.....LL.........
.....LL.........
.....LL.........
.....LL.........
.....LL.........
.....LL.........
` ],
  [ grass, bitmap`
4444444444444444
44D4444D44D4444D
DDDDDDDDDDDDDDDD
CCCCCCCCCCCCCCCC
CCC9CCCCCCCCC9CC
CCCCCCCCCCCCCCCC
CCCCCCC9CCCCCCCC
CCCCCCCCCCCCCCCC
CC9CCCCCCCCC9CCC
CCCCCCCCCCCCCCCC
CCCCCCCCC9CCCCCC
CCCCCCCCCCCCCCCC
CCC9CCCCCCCC9CCC
CCCCCCCCCCCCCCCC
CCCCCC9CCCCCCCCC
CCCCCCCCCCCCCCCC
` ],
  [ dirt, bitmap`
CCCCCCCCCCCCCCCC
CCC9CCCCCCCCC9CC
CCCCCCCCCCCCCCCC
CCCCCCC9CCCCCCCC
CCCCCCCCCCCCCCCC
CC9CCCCCCCCC9CCC
CCCCCCCCCCCCCCCC
CCCCCCCCC9CCCCCC
CCCCCCCCCCCCCCCC
CCC9CCCCCCCC9CCC
CCCCCCCCCCCCCCCC
CCCCCC9CCCCCCCCC
CCCCCCCCCCCCCCCC
CC9CCCCCCCCC9CCC
CCCCCCCCCCCCCCCC
CCCCCCC9CCCCCCCC
` ],
  [ sky, bitmap`
9922992299229922
9922992299229922
2299229922992299
2299229922992299
9922992299229922
9922992299229922
2299229922992299
2299229922992299
9922992299229922
9922992299229922
2299229922992299
2299229922992299
9922992299229922
9922992299229922
2299229922992299
2299229922992299
` ]
);
setBackground(sky);

const levels = [
map`
.........................................................
.........................................................
.........................................................
.........................................................
.........................................................
.........................................................
.........................................................
.........................................................
.........................................................
.........................................................
............................h............................
..........................ggggg..........................
....................h..............................f.....
..p...............ggggg...........ggggg............o.....
ggggggggggggggg...........................ggggggggggggg..
ddddddddddddddd...........................ddddddddddddd..
`,
map`
........................................................................
........................................................................
........................................................................
........................................................................
........................................................................
........................................................................
........................................................................
........................................................................
........................................................................
........................................................................
.....................................................h..................
.......................h....gggg...h................gggg..........f.....
......................gggg........gggg........gggg................o.....
..p............gggg.......................................gggggggggggg..
ggggggggggggg...........................ggg...............dddddddddddd..
ddddddddddddd...........................................................
`,
map`
.........................................................................................
.........................................................................................
.........................................................................................
.........................................................................................
.........................................................................................
.........................................................................................
.........................................................................................
.........................................................................................
...............................................................h.........................
..........................h...ggg..............................gg........................
.........................ggg.......ggg....................gg.............................
.........................................h..........................ggg...........f......
....................ggg..................gg.........gg............................o......
..p...........ggg.............................gg..........................ggggggggggggg..
gggggggggg................................................................ddddddddddddd..
dddddddddd...............................................................................
`,
map`
........................................................................................
........................................................................................
........................................................................................
........................................................................................
........................................................................................
........................................................................................
........................................................................................
........................................................................................
........................................................................................
.............................h....gg..........................gg........................
............................gg..........gg...............h..............................
.......................gg.....................gg.........gg.........gg..................
.................gg.................................gg............................f.....
..p........gg.....................................................................o.....
gggggggg.................................................................ggggggggggggg..
dddddddd.................................................................ddddddddddddd..
`
];

const VIEW_W = 20;      
const VIEW_H = 16;
const DT = 1 / 30;
const SPEED = 5.5;     
const GRAV = 26;
const JUMP = 12;          
const MAX_FALL = 14;

const HB_L = 0.2, HB_R = 0.8, HB_T = 0.1, HB_B = 1.0;

let level = 0;
let grid = [];
let W = 0, H = 0;
let hearts = 0;
let cam = 0;
let dirty = true;
let won = false;
let sprite = null;
let hudKey = "";
let P = { x: 0, y: 0, vy: 0, dir: 0, face: 1, ground: false, coyote: 0, jumpBuf: 0, cx: 0, cy: 0 };

function loadLevel(n) {
  level = n;
  won = false;
  grid = levels[n].trim().split("\n").map(r => r.trim().split(""));
  H = grid.length;
  W = grid[0].length;
  hearts = 0;
  for (let r = 0; r < H; r++) {
    for (let c = 0; c < W; c++) {
      if (grid[r][c] === "p") {
        grid[r][c] = ".";
        P = { x: c, y: r, vy: 0, dir: 0, face: 1, ground: true, coyote: 0, jumpBuf: 0, cx: c, cy: r };
      }
    }
  }
  cam = 0;
  dirty = true;
  hudKey = "";
}

function solidAt(c, r) {
  if (c < 0 || c >= W) return true;    
  if (r < 0 || r >= H) return false;
  const t = grid[r][c];
  return t === "g" || t === "d";
}

function hits(x, y) {
  const l = Math.floor(x + HB_L), r = Math.floor(x + HB_R - 1e-6);
  const t = Math.floor(y + HB_T), b = Math.floor(y + HB_B - 1e-6);
  for (let rr = t; rr <= b; rr++)
    for (let cc = l; cc <= r; cc++)
      if (solidAt(cc, rr)) return true;
  return false;
}

function step() {
  if (P.dir !== 0) {
    let nx = P.x + P.dir * SPEED * DT;
    if (hits(nx, P.y)) {
      nx = P.dir > 0 ? Math.floor(nx + HB_R) - HB_R - 1e-4
                     : Math.floor(nx + HB_L) + 1 - HB_L + 1e-4;
    }
    P.x = nx;
    P.face = P.dir;
  }

  if (P.jumpBuf > 0) P.jumpBuf--;
  if (P.coyote > 0) P.coyote--;
  if (P.jumpBuf > 0 && (P.ground || P.coyote > 0)) {
    P.vy = -JUMP;
    P.ground = false;
    P.coyote = 0;
    P.jumpBuf = 0;
  }

  P.vy = Math.min(P.vy + GRAV * DT, MAX_FALL);
  let ny = P.y + P.vy * DT;
  const wasGround = P.ground;
  P.ground = false;
  if (hits(P.x, ny)) {
    if (P.vy > 0) {
      ny = Math.floor(ny + HB_B) - HB_B - 1e-4;
      P.ground = true;
    } else {
      ny = Math.floor(ny + HB_T) + 1 - HB_T + 1e-4;
    }
    P.vy = 0;
  }
  P.y = ny;
  if (wasGround && !P.ground && P.vy >= 0) P.coyote = 4;

 
  const l = Math.floor(P.x + HB_L), r = Math.floor(P.x + HB_R - 1e-6);
  const t = Math.floor(P.y + HB_T), b = Math.floor(P.y + HB_B - 1e-6);
  let reached = false;
  for (let rr = t; rr <= b; rr++) {
    for (let cc = l; cc <= r; cc++) {
      if (rr < 0 || rr >= H || cc < 0 || cc >= W) continue;
      const tile = grid[rr][cc];
      if (tile === "h") {
        grid[rr][cc] = ".";
        hearts++;
        P.cx = cc; P.cy = rr;     
        dirty = true;
      } else if (tile === "f" || tile === "o") {
        reached = true;
      }
    }
  }
  if (reached) return "goal";
  if (P.y > H + 1) return "dead";
  return null;
}

function die() {
  if (hearts > 0) {
    hearts--;
    P.x = P.cx; P.y = P.cy; P.vy = 0; P.dir = 0; P.ground = false;
  } else {
    loadLevel(level);
  }
}
function viewString() {
  const rows = [];
  for (let r = 0; r < VIEW_H; r++) rows.push(grid[r].slice(cam, cam + VIEW_W).join(""));
  return rows.join("\n");
}

function updateCamera() {
  const oldCam = cam;
  const vx = P.x - cam;
  if (vx > 12) cam = Math.floor(P.x - 12);
  if (vx < 7) cam = Math.ceil(P.x - 7);
  cam = Math.max(0, Math.min(W - VIEW_W, cam));
  if (cam !== oldCam) dirty = true;   // scrolled: redraw the visible part of the level
}

function drawPlayer() {
  const tx = Math.round(P.x) - cam;
  const ty = Math.round(P.y);
  const type = P.face > 0 ? player : playerL;
  if (ty < 0 || ty >= VIEW_H || tx < 0 || tx >= VIEW_W) {
    if (sprite) { sprite.remove(); sprite = null; }
    return;
  }
  if (!sprite || sprite.type !== type) {
    if (sprite) sprite.remove();
    addSprite(tx, ty, type);
    sprite = getFirst(type);
  } else {
    sprite.x = tx;
    sprite.y = ty;
  }
}

function drawHud() {
  const key = hearts + "," + level;
  if (key === hudKey) return;
  hudKey = key;
  clearText();
  addText("HEARTS " + hearts, { x: 1, y: 0, color: color`0` });
  addText("LEVEL " + (level + 1), { x: 13, y: 0, color: color`0` });
}

function render() {
  updateCamera();
  if (dirty) {
    setMap(viewString());
    sprite = null;
    dirty = false;
  }
  drawPlayer();
  drawHud();
}

function showWin() {
  won = true;
  sprite = null;
  hudKey = "";
  setMap(("....................\n").repeat(VIEW_H));
  clearText();
  addText("YOU WIN!", { y: 5, color: color`0` });
  addText("hearts to spare: " + hearts, { y: 7, color: color`3` });
  addText("press j to", { y: 10, color: color`L` });
  addText("play again", { y: 11, color: color`L` });
}

function nextLevel() {
  if (level + 1 < levels.length) loadLevel(level + 1);
  else showWin();
}
onInput("d", () => { P.dir = 1; });
onInput("a", () => { P.dir = -1; });
onInput("s", () => { P.dir = 0; });
onInput("w", () => { P.jumpBuf = 6; });
onInput("j", () => { loadLevel(won ? 0 : level); });
onInput("i", () => { loadLevel(Math.max(0, won ? levels.length - 1 : level - 1)); });
onInput("l", () => { if (!won) nextLevel(); });
setInterval(() => {
  if (won) return;
  const result = step();
  if (result === "goal") { nextLevel(); }
  else if (result === "dead") { die(); }
  if (!won) render();
}, 33);

loadLevel(0);
render();
