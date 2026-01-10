const player = "p";
const wall = "w";
const core = "c";
const gate = "g";

setLegend(
  // player: bright block
  [ player, bitmap`
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
0000000000000000` ],
  // wall: dark block
  [ wall, bitmap`
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111` ],
  // core: another color
  [ core, bitmap`
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444` ],
  // gate: third color
  [ gate, bitmap`
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333` ]
);

// walls + gate are solid
setSolids([player, wall, gate]);

let hasCore = false;
let gameOver = false; // stop everything after warp

setMap(map`
wwwwwwwwwwwwww
w............w
w...c........w
w............w
w.......g....w
w............w
w...p........w
wwwwwwwwwwwwww
`);

// movement (player)
function tryMovePlayer(dx, dy) {
  if (gameOver) return;
  const p = getFirst(player);
  if (!p) return;

  const nx = p.x + dx;
  const ny = p.y + dy;
  const tile = getTile(nx, ny);

  // block if solid
  if (tile.some(s => s.type === wall || s.type === gate)) return;

  p.x = nx;
  p.y = ny;
}

onInput("w", () => tryMovePlayer(0, -1));
onInput("s", () => tryMovePlayer(0, 1));
onInput("a", () => tryMovePlayer(-1, 0));
onInput("d", () => tryMovePlayer(1, 0));

// helper: gate moves opposite to player, slips in corners
function tryMoveGate() {
  if (gameOver) return;

  const p = getFirst(player);
  const g = getFirst(gate);
  if (!p || !g) return;

  const width = 14;
  const height = 8;

  function isFree(x, y) {
    if (x < 0 || x >= width || y < 0 || y >= height) return false;
    const tile = getTile(x, y);
    // cannot go into walls or another gate
    return !tile.some(s => s.type === wall || s.type === gate);
  }

  // exact opposite direction: vector from player to gate
  let dx = g.x - p.x;
  let dy = g.y - p.y;

  // normalize to step -1,0,1
  if (dx > 1) dx = 1;
  if (dx < -1) dx = -1;
  if (dy > 1) dy = 1;
  if (dy < -1) dy = -1;

  const candidates = [];

  // primary: straight/diagonal opposite move
  if (dx !== 0 || dy !== 0) {
    candidates.push({ x: g.x + dx, y: g.y + dy });
  }

  // slip moves (perpendicular to direction) to escape corners
  const slips = [];
  if (dx !== 0) {
    slips.push({ x: g.x,     y: g.y + 1 });
    slips.push({ x: g.x,     y: g.y - 1 });
  }
  if (dy !== 0) {
    slips.push({ x: g.x + 1, y: g.y });
    slips.push({ x: g.x - 1, y: g.y });
  }

  // if both dx and dy are 0 (same tile), allow all four slip directions
  if (dx === 0 && dy === 0) {
    slips.push(
      { x: g.x + 1, y: g.y },
      { x: g.x - 1, y: g.y },
      { x: g.x,     y: g.y + 1 },
      { x: g.x,     y: g.y - 1 },
    );
  }

  // randomize slip order so it can wiggle out
  for (let i = slips.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [slips[i], slips[j]] = [slips[j], slips[i]];
  }

  candidates.push(...slips);

  // choose first valid candidate
  for (const m of candidates) {
    if (isFree(m.x, m.y)) {
      g.x = m.x;
      g.y = m.y;
      break;
    }
  }
}

function gameStep() {
  if (gameOver) return;

  tryMoveGate();

  const p = getFirst(player);
  if (!p) return;

  // pick up core
  getTile(p.x, p.y).forEach(sprite => {
    if (sprite.type === core) {
      sprite.remove();
      hasCore = true;
      clearText();
      addText("CORE ACTIVE", { y: 1, color: color`2` });
    }
  });

  // win when next to gate and core collected
  if (hasCore) {
    const neighbors = [
      ...getTile(p.x + 1, p.y),
      ...getTile(p.x - 1, p.y),
      ...getTile(p.x, p.y + 1),
      ...getTile(p.x, p.y - 1)
    ];

    if (neighbors.some(s => s.type === gate)) {
      clearText();
      addText("WARP COMPLETE", { y: 4, color: color`3` });

      // freeze game: no more movement
      gameOver = true;
    }
  }
}

// gate + logic tick
const TICK_MS = 150;
setInterval(gameStep, TICK_MS);

afterInput(() => {
  // nothing needed; logic runs in gameStep
});
