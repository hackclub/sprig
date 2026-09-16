/*
@title: Silsica
@description: "this is a maze where a player escapes the silsica using portals and other upgrades"
@author: Aadi Vinayak A Pillai
@tags: ['puzzle']
@addedOn: 2026-09-16

Instructions:
Press W,A,S,D for moving
Objective:
Escape the silsica maze
*/

// --- 1. SPRITE KEYS ---
const player = "p";
const wall = "w";
const portalA = "a";
const portalB = "b";
const exit = "e";
const floor = "f";

// --- 2. BITMAP DEFINITIONS ---
setLegend(
  [player, bitmap`
....00000000....
...0888888880...
..083388888880..
.08883888888880.
.08888888888880.
0888888888888880
0888888888888880
0888888888888880
0888888888888880
0888888888888880
0888888888888880
.08888888888880.
.08888888888880.
..088888888880..
...0888888880...
....00000000....`],

  [portalA, bitmap`
....33333333....
..339999999933..
.39933333333993.
.393........393.
393..........393
393..........393
393..........393
393..........393
393..........393
393..........393
393..........393
.393........393.
.39933333333993.
..339999999933..
....33333333....
................`],

  [portalB, bitmap`
....33333333....
..33CCCCCCCC33..
.3CC33333333CC3.
.3C3........3C3.
3C3..........3C3
3C3..........3C3
3C3..........3C3
3C3..........3C3
3C3..........3C3
3C3..........3C3
3C3..........3C3
.3C3........3C3.
.3CC33333333CC3.
..33CCCCCCCC33..
....33333333....
................`],

  [exit, bitmap`
3333333333333333
3..............3
3.333333333333.3
3.3..........3.3
3.3.33333333.3.3
3.3.3......3.3.3
3.3.3.3333.3.3.3
3.3.3.3..3.3.3.3
3.3.3.3..3.3.3.3
3.3.3.3333.3.3.3
3.3.3......3.3.3
3.3.33333333.3.3
3.3..........3.3
3.333333333333.3
3..............3
3333333333333333`],

  [wall, bitmap`
1111111111111111
1222122212221221
1222122212221221
1111111111111111
1221222122212221
1221222122212221
1111111111111111
1222122212221221
1222122212221221
1111111111111111
1221222122212221
1221222122212221
1111111111111111
1222122212221221
1222122212221221
1111111111111111`],

  [floor, bitmap`
0000000000000000
0100000000000000
0000000000000000
0000000000000100
0000000000000000
0000010000000000
0000000000000000
0000000000000000
0000000000000000
0000000001000000
0000000000000000
0100000000000000
0000000000000000
0000000000000100
0000000000000000
0000000000000000`]
);

// --- 3. GAME CONFIGURATION ---
setBackground(floor);
setSolids([player, wall]);

// Sound effects
const moveSound = tune`150: C5-100`;
const portalSound = tune`250: E5-80, G5-80, C6-120`;
const winSound = tune`180: C5-100, E5-100, G5-100, C6-300`;

// Levels Map Array
const levels = [
  map`
www.wwwwww
w.p.w...aw
w.w.w.ww.w
w...w.ww.w
w.www.ww.w
wb.......w
wwwwww.e.w
..........`,

  map`
wwwwwwwwww
wp...w...w
w.ww.w.w.w
w.wa...waw
w.wwwwww.w
w...b....w
w.w.wwww.w
we......bw`
];

let currentLevel = 0;
setMap(levels[currentLevel]);

// --- 4. CONTROLS & MOVEMENT ---
function tryMove(dx, dy) {
  const p = getFirst(player);
  if (!p) return;

  const targetX = p.x + dx;
  const targetY = p.y + dy;

  // Check board bounds
  if (targetX < 0 || targetX >= width() || targetY < 0 || targetY >= height()) {
    return;
  }

  // Check walls
  const targetTile = getTile(targetX, targetY);
  const hasWall = targetTile.some(s => s.type === wall);
  
  if (!hasWall) {
    p.x = targetX;
    p.y = targetY;
    playTune(moveSound);
  }
}

onInput("w", () => tryMove(0, -1));
onInput("s", () => tryMove(0, 1));
onInput("a", () => tryMove(-1, 0));
onInput("d", () => tryMove(1, 0));

onInput("i", () => tryMove(0, -1));
onInput("k", () => tryMove(0, 1));
onInput("j", () => tryMove(-1, 0));
onInput("l", () => tryMove(1, 0));

// --- 5. GAME RULES & PORTAL LOGIC ---
afterInput(() => {
  const p = getFirst(player);
  if (!p) return;

  const currentTile = getTile(p.x, p.y);

  // Check Portal A Teleportation -> Find Portal B
  if (currentTile.some(s => s.type === portalA)) {
    const targetPortals = getAll(portalB);
    if (targetPortals.length > 0) {
      p.x = targetPortals[0].x;
      p.y = targetPortals[0].y;
      playTune(portalSound);
      addText("TELEPORT!", { x: 5, y: 1, color: color`3` });
      return;
    }
  }

  // Check Portal B Teleportation -> Find Portal A
  if (currentTile.some(s => s.type === portalB)) {
    const targetPortals = getAll(portalA);
    if (targetPortals.length > 0) {
      p.x = targetPortals[0].x;
      p.y = targetPortals[0].y;
      playTune(portalSound);
      addText("TELEPORT!", { x: 5, y: 1, color: color`3` });
      return;
    }
  }

  // Check Level Win Condition
  if (currentTile.some(s => s.type === exit)) {
    playTune(winSound);
    currentLevel++;
    
    if (currentLevel < levels.length) {
      clearText();
      addText("STAGE CLEAR!", { x: 3, y: 3, color: color`3` });
      setMap(levels[currentLevel]);
    } else {
      clearText();
      addText("SILSIKA ESCAPED!", { x: 1, y: 3, color: color`3` });
    }
  } else {
    clearText();
  }
});
