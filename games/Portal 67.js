// Game: THE LINKER (Stability Patch)
// Fixed: 'remove' of undefined by adding existence checks

const player = "p";
const wall = "w";
const core = "c"; 
const gate = "g"; 
const exit = "e"; 

setLegend(
  [player, bitmap`
................
................
......0000......
.....055550.....
....05555550....
....05500550....
....05500550....
....05555550....
....05555550....
....05111150....
....05111150....
.....055550.....
......0000......
................
................
................`],
  [wall, bitmap`
0000000000000000
0000000000000000
0011111111111100
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0011111111111100
0000000000000000
0000000000000000`],
  [core, bitmap`
................
..333333333333..
..377777777773..
..373333333373..
..373777777373..
..373733337373..
..373737737373..
..373737737373..
..373733337373..
..373777777373..
..373333333373..
..377777777773..
..333333333333..
................
................
................`],
  [gate, bitmap`
................
................
....22222222....
....22222222....
....22....22....
....22....22....
....22....22....
....22222222....
....22222222....
....22....22....
....22....22....
....22....22....
....22....22....
................
................
................`],
  [exit, bitmap`
................
................
....44444444....
....44444444....
....44..........
....44..........
....44444444....
....44444444....
....44..........
....44..........
....44444444....
....44444444....
................
................
................`]
);

let gameState = "START"; 
let currentLevel = 0;
let score = 10000;
let textElements = [];

const levels = [
  map`
wwwwwwww
w......w
w.wwww.w
w..cg..w
w.c..wpw
wwwwwwww`, //solvable
  map`
wwwwww
w.p.cw
w..c.w
w.g..w
wwwwww`, //solvable
  map`
wwwwwww
w.p...w
w.c.c.w
w...g.w
wwwwwww`, //solvable
  map`
wwwww
wwpww
w.c.w
w...w
wcg.w
wwwww`,//solvable
  map`
wwwwwww
wc....w
w.....w
w..w..w
w..wc.w
wpgw..w
wwwwwww`,//solvable
  map`
wwwwwww
w.....w
w.c.c.w
w.pwg.w
wwwwwww`,//solvable
  map`
wwwwwww
w.....w
w.pc..w
ww....w
ww.c..w
ww.g..w
wwwwwww`,//solvable
  map`
wwwwwwww
wg.c...w
w..p...w
w..c...w
wwww...w
wwwwwwww`,//solvable
  map`
wwwwww
w....w
w.c..w
w.pcgw
w....w
wwwwww`,//solvable
  map`
wwwwww
w..c.w
ww.g.w
w..c.w
w..p.w
wwwwww`,//solvable
  map`
wwwww
w.p.w
wcw.w
w.w.w
wcg.w
wwwww`,//solvable
  map`
wwwwww
w....w
w...cw
ww.p.w
w..g.w
w..c.w
wwwwww`,//solvable
  map`
wwwwwww
w..c..w
ww...gw
ww.w.pw
w..c..w
w....ww
wwwwww.`,//solvable
  map`
wwwwwwww
w.c....w
w.pw.w.w
w..g.w.w
w.c..w.w
ww.www.w
w......w
wwwwwwww`,//solvable
  map`
wwwwwww
w.c...w
ww..c.w
wwp...w
wwwwgww
wwwwwww`,//solvable
  map`
wwwwwwww
w......w
ww.www.w
wc...w.w
ww.pc..w
ww..gw.w
wwwwwwww`,//solvable
  map`
wwwwwww
w.c...w
wc..w.w
w..gw.w
wwwww.w
w..p..w
wwwwwww`,//solvable
  map`
wwwwwwww
w......w
ww.c.c.w
ww.p.g.w
wwwwwwww`,//solvable
  map`
wwwwwww
w.c.c.w
w..p..w
w.w.w.w
w..g..w
wwwwwww`,//solvable
  map`
wwwwwww
wc....w
ww..c.w
ww...pw
wwgwwww
wwwwwww`//solvable
];

function clearUI() {
  textElements.forEach(t => t.remove());
  textElements = [];
}

function updateUI() {
  clearUI();
  if (gameState === "PLAY") {
    textElements.push(addText(`Level: ${currentLevel + 1}`, { x: 5, y: 5, color: color`3` }));
    textElements.push(addText(`Score: ${score}`, { x: 80, y: 5, color: color`7` }));
  }
}

function showStartScreen() {
  gameState = "START";
  setMap(map`
wwwwwwwwww
w...ee...w
pppppppppp
wccccccccw
wwwwwwwwww`);
  clearUI();
  textElements.push(addText("THE LINKER", { x: 45, y: 40, color: color`5` }));
  textElements.push(addText("Press W to Start", { x: 35, y: 65, color: color`3` }));
}

function showEndScreen() {
  gameState = "END";
  setMap(map`
wwwwwwwwww
wppppppppw
wwwwwwwwww
wccceecccw
wwwwwwwwww`);
  clearUI();
  textElements.push(addText("YOU LINKED THEM!", { x: 25, y: 40, color: color`5` }));
  textElements.push(addText(`Score: ${score}`, { x: 45, y: 60, color: color`7` }));
  textElements.push(addText("Press J to Reset", { x: 30, y: 80, color: color`2` }));
}

function loadLevel() {
  gameState = "PLAY";
  setMap(levels[currentLevel]);
  updateUI();
}

function checkWinCondition() {
  if (gameState !== "PLAY") return;
  const cores = getAll(core);
  let touching = false;
  for (let i = 0; i < cores.length; i++) {
    for (let j = i + 1; j < cores.length; j++) {
      const d = Math.abs(cores[i].x - cores[j].x) + Math.abs(cores[i].y - cores[j].y);
      if (d === 1) touching = true;
    }
  }
  if (touching) {
    const g = getFirst(gate);
    // CRITICAL FIX: Check if gate exists and has a remove method before calling it
    if (g && typeof g.remove === 'function') { 
      const {x, y} = g;
      g.remove();
      addSprite(x, y, exit); 
    }
  }
}

function move(dx, dy) {
  if (gameState !== "PLAY") return;
  const p = getFirst(player);
  if (!p) return;

  const tx = p.x + dx;
  const ty = p.y + dy;
  const target = getTile(tx, ty);
  const isCore = target.find(t => t.type === core);

  score -= 1;

  if (isCore) {
    const bx = tx + dx;
    const by = ty + dy;
    const beyond = getTile(bx, by);
    if (beyond.every(t => t.type !== wall && t.type !== core && t.type !== gate)) {
      isCore.x += dx;
      isCore.y += dy;
      p.x += dx;
      p.y += dy;
    }
  } else if (target.every(t => t.type !== wall && t.type !== gate)) {
    p.x += dx;
    p.y += dy;
  }

  // Check if stepping on exit
  const here = getTile(p.x, p.y);
  if (here.some(t => t.type === exit)) {
    currentLevel++;
    if (currentLevel >= levels.length) {
      showEndScreen();
    } else {
      score += 100;
      loadLevel();
    }
    return; // Stop execution here to avoid running checkWinCondition on a deleted level
  }

  checkWinCondition();
  updateUI();
}

onInput("w", () => {
  if (gameState === "START") loadLevel();
  else move(0, -1);
});
onInput("s", () => move(0, 1));
onInput("a", () => move(-1, 0));
onInput("d", () => move(1, 0));
onInput("j", () => {
  if (gameState === "PLAY") { score -= 50; loadLevel(); }
  if (gameState === "END") { currentLevel = 0; score = 10000; showStartScreen(); }
});

showStartScreen();