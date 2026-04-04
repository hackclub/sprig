// ================== LEGEND ==================
setLegend(
  ["p", bitmap`
................
................
................
......11........
......22........
.....7777.......
....7.77.7......
......77........
......11........
......11........
......11........
................
................
................
................
................`],

  ["w", bitmap`
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444`],

  ["c", bitmap`
................
.....66666......
....6666666.....
....66...66.....
....6666666.....
.....66666......
................
................`],

  ["G", bitmap`
................
....888888......
....8....8......
....8....8......
....8....8......
....888888......
................
................`],

  ["g", bitmap`
................
....333333......
....3....3......
....3....3......
....3....3......
....333333......
................`],

  ["e", bitmap`
................
....999999......
....9....9......
....9.99.9......
....9....9......
....999999......
................
................`],

  ["m", bitmap`
................
....555555......
....5....5......
....5....5......
....5....5......
....555555......
................
................`]
);

// ================== LEVEL MAPS ==================
const levels = [

map`
wwwwwwwwwwww
wp.....c...w
w.ww.wwwww.w
w..w..c..w.w
w.wwwwwwww.w
w.....G....w
wwwwwwwwwwww
`,

map`
wwwwwwwwwwww
wp....e....w
w.ww...w.c.w
wwwwww.ww..w
w.c....G...w
w......w...w
wwwwwwwwwwww
`,

map`
wwwwwwwwwwww
wp.....w...w
w.wwww..ww.w
w...w.c....w
w..wwwwww..w
w.....G.w.cw
wwwwwwwwwwww
`,

// LEVEL 4 – moving platform
map`
wwwwwwwwwwww
wp....m..c.w
w.w.e.w....w
w..w.......w
w.w..wwwww.w
w.....G.w.cw
wwwwwwwwwwww
`,

// LEVEL 5 – harder
map`
wwwwwwwwwwww
wp..e......w
w.w..www.www
w.w..e...c.w
w...e..www.w
w...c.wG...w
wwwwwwwwwwww
`
];

// ================== SOLIDS ==================
setSolids(["p", "w", "G", "m"]);

// ================== GAME STATE ==================
let currentLevel = 0;
let collected = 0;
let totalEnergy = 0;
let doorOpened = false;
let gameWon = false;

let canMove = true;
let time = 0;

// ================== LOAD LEVEL ==================
function loadLevel(i) {
  clearText();
  setMap(levels[i]);
  collected = 0;
  doorOpened = false;
  totalEnergy = getAll("c").length;
}

loadLevel(currentLevel);

// ================== TIMER ==================
setInterval(() => {
  if (!gameWon) time++;
}, 1000);

// ================== PLAYER MOVEMENT (SLOW) ==================
function move(dx, dy) {
  if (!canMove || gameWon) return;
  let p = getFirst("p");
  p.x += dx;
  p.y += dy;
  canMove = false;
  setTimeout(() => canMove = true, 180);
}

onInput("w", () => move(0, -1));
onInput("s", () => move(0, 1));
onInput("a", () => move(-1, 0));
onInput("d", () => move(1, 0));

// ================== ENEMY MOVEMENT ==================
setInterval(() => {
  getAll("e").forEach(enemy => {
    enemy.x += Math.random() > 0.5 ? 1 : -1;
  });
}, 500);

// ================== MOVING PLATFORM ==================
let dir = 1;
setInterval(() => {
  getAll("m").forEach(p => {
    p.x += dir;
  });
  dir *= -1;
}, 700);

// ================== GAME LOGIC ==================
afterInput(() => {
  if (gameWon) return;

  let p = getFirst("p");

  // Enemy collision
  if (getTile(p.x, p.y).some(s => s.type === "e")) {
    loadLevel(currentLevel);
    return;
  }

  // Collect energy
  let energy = getTile(p.x, p.y).find(s => s.type === "c");
  if (energy) {
    energy.remove();
    collected++;
  }

  clearText();
  addText(`Lvl ${currentLevel+1}`, { x: 1, y: 1, color: color`6` });
  addText(`Energy ${collected}/${totalEnergy}`, { x: 1, y: 2, color: color`6` });
  addText(`Time ${time}s`, { x: 1, y: 3, color: color`3` });

  // Open gate
  if (collected === totalEnergy && !doorOpened) {
    doorOpened = true;
    let door = getFirst("G");
    if (door) {
      addSprite(door.x, door.y, "g");
      door.remove();
    }
  }

  // Finish level
  if (getTile(p.x, p.y).some(s => s.type === "g")) {
    currentLevel++;
    if (currentLevel >= levels.length) {
      gameWon = true;
      setMap(map`
............
............
............
............
............
............
............
`);
      clearText();
      addText("YOU WIN!", { x: 3, y: 3, color: color`3` });
      addText(`Time: ${time}s`, { x: 3, y: 4, color: color`6` });
    } else {
      loadLevel(currentLevel);
    }
  }
});
