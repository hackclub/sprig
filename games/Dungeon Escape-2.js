/*
@title: dungeon_escape
@description: Collect all keys, unlock the door, avoid guards and spikes, reach the exit!
@author: Niladri Kumar Sahoo
@tags: ['puzzle', 'action', 'dungeon']
@addedOn: 2026-02-21

CONTROLS:
  W A S D  — move
  J        — restart level
  L        — next level (after winning)
  I        — previous level / back to menu
*/

// ── SPRITE KEYS ────────────────────────────────────────────
const player   = "p";
const wall     = "w";
const floor_   = "f";
const key_     = "k";
const door     = "d";
const exit_    = "e";
const guard    = "g";
const spike    = "s";
const coin     = "c";
const title_bg = "t";

// ── BITMAPS ────────────────────────────────────────────────
setLegend(

  [player, bitmap`
................
....0000000.....
...066666600....
...06.....60....
...06.0.0.60....
...06.....60....
...066000660....
....0666660.....
.....00000......
....0.666.0.....
...0..666..0....
...0...6...0....
...0.6.6.6.0....
...066666660....
....00000000....
................`],

  [wall, bitmap`
1111111111111111
1116111161111611
1116111161111611
1116111161111611
1111111111111111
6116111116111161
6116111116111161
6116111116111161
1111111111111111
1116111161111611
1116111161111611
1116111161111611
1111111111111111
6116111116111161
6116111116111161
1111111111111111`],

  [floor_, bitmap`
DDDDDDDDDDDDDDDD
DC..............
DC..............
DC..............
DC..............
DC..............
DC..............
DC..............
DC..............
DC..............
DC..............
DC..............
DC..............
DC..............
DC..............
DDDDDDDDDDDDDDDD`],

  [key_, bitmap`
................
.......4444.....
......44..440...
.....44....440..
.....4.....4.0..
.....44....440..
......44..440...
.......44440....
........440.....
........440.....
........44440...
........4..40...
........44440...
................
................
................`],

  [door, bitmap`
3333333333333333
33LLLLLLLLLLLL33
33L..........L33
33L....LL....L33
33L...L33L...L33
33L...3003...L33
33L...3003...L33
33L...L33L...L33
33L..........L33
33L..........L33
33L..........L33
33L..........L33
33L..........L33
33LLLLLLLLLLLL33
3333333333333333
3333333333333333`],

  [exit_, bitmap`
................
....05555500....
...055....550...
..05..5555..50..
..0..5LLLL5..0..
..0.5LLLLLL5.0..
..0.5LLLLLL5.0..
..0..5LLLL5..0..
..05..5555..50..
...055....550...
....05555500....
................
................
................
................
................`],

  [guard, bitmap`
................
....2222222.....
...244444442....
...24L...L42....
...244L4L442....
....2444442.....
.....22222......
...222444222....
...24.....42....
...24.4.4.42....
...24.....42....
...222...222....
....2.....2.....
....2.....2.....
................
................`],

  [spike, bitmap`
................
................
.......4........
......474.......
......474.......
.....47774......
.....4...4......
....7.....7.....
....7.....7.....
...7.......7....
...7.......7....
..2222222222....
................
................
................
................`],

  [coin, bitmap`
................
................
......4444......
.....400044.....
....40000004....
....40LLLL04....
....40LLLL04....
....40000004....
.....400044.....
......4444......
................
................
................
................
................
................`],

  // Title screen background tile — solid dark
  [title_bg, bitmap`
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
0000000000000000`]

);

// ── TILE BACKGROUND ────────────────────────────────────────
setBackground(floor_);

// ── TITLE MAP ──────────────────────────────────────────────
// 12 wide x 8 tall solid dark tiles — blank canvas for text
const titleMap = map`
tttttttttttt
tttttttttttt
tttttttttttt
tttttttttttt
tttttttttttt
tttttttttttt
tttttttttttt
tttttttttttt`

// ── LEVELS ─────────────────────────────────────────────────
const levels = [
  map`
wwwwwwwwwwww
wp.........w
w..........w
w.....k....w
wwwwwdwwwwww
w..........w
w........e.w
wwwwwwwwwwww`,

  map`
wwwwwwwwwwww
wp........ew
w..........w
ww.wwwdwwwww
w..........w
w...s.s.s..w
w....k.....w
w.....g....w
wwwwwwwwwwww`,

  map`
wwwwwwwwwwww
wp.........w
w....s.s...w
ww.wwwwww.ww
w..........w
w.k..g.k...w
ww..wwwdwwww
w....g.....w
w........e.w
wwwwwwwwwwww`,

  map`
wwwwwwwwwwww
wp.w.......w
w..w.wwwww.w
w..w.....k.w
w.ww..www..w
w.w....w.s.w
w.ww..www..w
w.g....d...w
w......g.e.w
wwwwwwwwwwww`,

  map`
wwwwwwwwwwww
wp.s.s.s..ew
ww.wwwwwwwww
w.k........w
w.wwwwww.w.w
w........w.w
w.s.g..k.w.w
wwwwwww..w.w
w.g....k.d.w
wwwwwwwwwwww`
];

// ── STATE ──────────────────────────────────────────────────
let levelIndex = 0;
let keysHeld   = 0;
let keysTotal  = 0;
let score      = 0;
let isDead     = false;
let isWon      = false;
let isTitle    = true;
let titlePage  = 1;    // 1 = title/controls page 1, 2 = controls page 2
let guardDirs  = [];

// ── TITLE SCREEN ───────────────────────────────────────────
function showTitle(page) {
  isTitle   = true;
  isDead    = false;
  isWon     = false;
  titlePage = page || 1;

  // Swap to dedicated blank dark map
  setMap(titleMap);
  setSolids([]);
  clearText("");

  if (titlePage === 1) {
    // PAGE 1 — Title + tagline + prompt
    addText("      DUNGEON",    { x: 1, y: 1, color: color`7` }); // purple
    addText("      ESCAPE",     { x: 1, y: 2, color: color`7` }); // purple
    addText("    AVOID GUARDS",{ x: 0, y: 5, color: color`L` }); // white
    addText("    GET ALL KEYS",{ x: 0, y: 7, color: color`4` }); // yellow
    addText("    FIND EXIT!",  { x: 1, y: 9, color: color`5` }); // green
    addText(" Press I=NEXT >>>",    { x: 2, y: 12, color: color`2` }); // red — prompts to flip
  } else {
    // PAGE 2 — Controls
    addText("      CONTROLS", { x: 0, y: 0, color: color`6` }); // teal header
    addText("WASD = MOVE",  { x: 0, y: 2, color: color`1` }); // white
    addText("I = PREV LV",  { x: 0, y: 4, color: color`1` }); // white
    addText("J = RETRY",    { x: 0, y: 6, color: color`4` }); // yellow
    addText("L = NEXT LV",  { x: 0, y: 8, color: color`4` }); // yellow
    addText(">>> I = START! <<<",   { x: 1, y: 10, color: color`7` }); // green — start prompt
    addText("< BACK  L",    { x: 1, y: 12, color: color`2` }); // red — back prompt
  }
}

// ── LOAD LEVEL ─────────────────────────────────────────────
function loadLevel(n) {
  isTitle  = false;
  isDead   = false;
  isWon    = false;
  keysHeld = 0;

  setMap(levels[n]);
  keysTotal = getAll(key_).length;
  guardDirs = getAll(guard).map(() => 1);

  setSolids([player, wall, door]);
  setPushables({ [player]: [] });

  showHUD();
}

// ── HUD ────────────────────────────────────────────────────
function showHUD() {
  clearText("");

  if (isDead) {
    // Death: red title, teal divider, white options
    addText("X CAUGHT X",   { x: 1, y: 3, color: color`0` }); // red
    addText("==========",   { x: 0, y: 4, color: color`6` }); // teal
    addText("J = RETRY",    { x: 1, y: 5, color: color`4` }); // yellow
    addText("I = MENU",     { x: 2, y: 6, color: color`L` }); // white
    return;
  }

  if (isWon) {
    // Win: yellow title, teal divider, green score, white button
    addText("* LEVEL  *",   { x: 1, y: 2, color: color`4` }); // yellow
    addText("* CLEAR! *",   { x: 1, y: 3, color: color`5` }); // green
    addText("==========",   { x: 0, y: 4, color: color`6` }); // teal
    addText("SC:" + score,  { x: 2, y: 5, color: color`4` }); // yellow
    addText("L = NEXT",     { x: 2, y: 6, color: color`L` }); // white
    return;
  }

  // Gameplay HUD — level yellow, keys green, score white
  addText("LV" + (levelIndex + 1),          { x: 0, y: 0, color: color`4` }); // yellow
  addText("K:" + keysHeld + "/" + keysTotal, { x: 3, y: 0, color: color`5` }); // green
  addText(score + "P",                       { x: 9, y: 0, color: color`L` }); // white
}

// ── GUARD PATROL ───────────────────────────────────────────
function stepGuards() {
  getAll(guard).forEach((g, i) => {
    const nx = g.x + guardDirs[i];
    const ny = g.y;
    const nextTiles = getTile(nx, ny);
    const blocked = nextTiles.some(t => t.type === wall || t.type === door);
    const edged   = nx < 0 || ny < 0;
    if (blocked || edged) guardDirs[i] *= -1;
    else g.x = nx;
  });
  checkGuardHit();
}

function checkGuardHit() {
  if (isDead || isWon) return;
  const p = getFirst(player);
  if (!p) return;
  if (getTile(p.x, p.y).some(t => t.type === guard)) triggerDeath();
}

// ── DEATH / WIN ────────────────────────────────────────────
function triggerDeath() {
  if (isDead || isWon) return;
  isDead = true;
  score  = Math.max(0, score - 20);
  showHUD();
}

function triggerWin() {
  if (isWon) return;
  isWon  = true;
  score += keysHeld * 30 + 100;
  showHUD();
}

// ── MOVE PLAYER ────────────────────────────────────────────
function tryMove(dx, dy) {
  if (isDead || isWon || isTitle) return;
  const p = getFirst(player);
  if (!p) return;

  const prevX = p.x, prevY = p.y;
  p.x += dx;
  p.y += dy;

  getTile(p.x, p.y).filter(t => t.type === key_).forEach(t => {
    t.remove();
    keysHeld++;
    score += 20;
    if (keysHeld >= keysTotal) {
      getAll(door).forEach(d => d.remove());
      setSolids([player, wall]);
    }
  });

  getTile(p.x, p.y).filter(t => t.type === coin).forEach(t => {
    t.remove();
    score += 10;
  });

  if (getTile(p.x, p.y).some(t => t.type === spike)) {
    triggerDeath();
    return;
  }

  checkGuardHit();
  if (isDead) return;

  if (getTile(p.x, p.y).some(t => t.type === exit_)) {
    if (keysHeld >= keysTotal) { triggerWin(); return; }
    else { p.x = prevX; p.y = prevY; }
  }

  stepGuards();
  showHUD();
}

// ── INPUTS ─────────────────────────────────────────────────
onInput("w", () => tryMove(0, -1));
onInput("s", () => tryMove(0,  1));
onInput("a", () => tryMove(-1, 0));
onInput("d", () => tryMove( 1, 0));

onInput("j", () => {
  if (isTitle) return;
  loadLevel(levelIndex);
});

onInput("l", () => {
  // On title page 1 → go to controls page
  if (isTitle && titlePage === 1) { showTitle(2); return; }
  // On title page 2 → go back to title page 1
  if (isTitle && titlePage === 2) { showTitle(1); return; }

  if (!isWon) return;
  levelIndex++;
  if (levelIndex >= levels.length) {
    // All levels beaten — show victory screen then return to title
    setMap(titleMap);
    setSolids([]);
    clearText("");
    addText("~~~~~~~~~~",  { x: 0, y: 0, color: color`6` }); // teal
    addText("YOU WIN!!",   { x: 1, y: 1, color: color`4` }); // yellow
    addText("ALL LEVELS",  { x: 1, y: 2, color: color`4` }); // yellow
    addText("COMPLETE!",   { x: 1, y: 3, color: color`5` }); // green
    addText("~~~~~~~~~~",  { x: 0, y: 4, color: color`6` }); // teal
    addText("SCORE:",      { x: 2, y: 5, color: color`L` }); // white
    addText("" + score,    { x: 4, y: 6, color: color`4` }); // yellow
    addText("I=REPLAY",    { x: 2, y: 7, color: color`2` }); // red
    levelIndex = 0;
    isWon   = false;
    isTitle = true;
    titlePage = 0; // special "victory" state so I goes to title
  } else {
    loadLevel(levelIndex);
  }
});

onInput("i", () => {
  // Title page 1 → go to controls page 2
  if (isTitle && titlePage === 1) { showTitle(2); return; }
  // Title page 2 → START THE GAME
  if (isTitle && titlePage === 2) { score = 0; levelIndex = 0; loadLevel(0); return; }
  // Victory screen → back to title
  if (isTitle && titlePage === 0) { showTitle(1); return; }
  // In-game dead → back to title
  if (isDead) { showTitle(1); return; }
  // In-game playing → go to previous level
  levelIndex = Math.max(0, levelIndex - 1);
  loadLevel(levelIndex);
});

// ── INIT ───────────────────────────────────────────────────
showTitle(1);