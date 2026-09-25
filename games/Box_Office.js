/*
@title: Box_Office
@author: justacookie
@description: Push each colored box onto a goal of its own color. Clear three levels, then endless mode generates a new random level every win.
@tags: ['puzzle', 'sokoban', 'endless']
@addedOn: 2026-08-28
*/

const player = "p";
const wall = "w";

// differently colored boxes
const redBox = "b";
const redGoal = "g";
const blueBox = "c";
const blueGoal = "h";
const purpleBox = "d";
const purpleGoal = "i";

setLegend(
  [player, bitmap`
................
................
.....000000.....
....00000000....
....00.00.00....
....00000000....
....00000000....
.....000000.....
......0000......
.....000000.....
....00000000....
....0000.000....
.......00.......
......00.00.....
.....000.000....
................`],
  [redBox, bitmap`
................
.00000000000000.
.03333333333330.
.03333333333330.
.03333333333330.
.03333333333330.
.03333333333330.
.03333333333330.
.03333333333330.
.03333333333330.
.03333333333330.
.03333333333330.
.03333333333330.
.03333333333330.
.00000000000000.
................`],
  [blueBox, bitmap`
................
.00000000000000.
.06666666666660.
.06666666666660.
.06666666666660.
.06666666666660.
.06666666666660.
.06666666666660.
.06666666666660.
.06666666666660.
.06666666666660.
.06666666666660.
.06666666666660.
.06666666666660.
.00000000000000.
................`],
  [purpleBox, bitmap`
................
.00000000000000.
.07777777777770.
.07777777777770.
.07777777777770.
.07777777777770.
.07777777777770.
.07777777777770.
.07777777777770.
.07777777777770.
.07777777777770.
.07777777777770.
.07777777777770.
.07777777777770.
.00000000000000.
................`],
  [redGoal, bitmap`
................
................
................
................
................
................
.....333333.....
.....333333.....
.....333333.....
.....333333.....
................
................
................
................
................
................`],
  [blueGoal, bitmap`
................
................
................
................
................
................
.....666666.....
.....666666.....
.....666666.....
.....666666.....
................
................
................
................
................
................`],
  [purpleGoal, bitmap`
................
................
................
................
................
................
.....777777.....
.....777777.....
.....777777.....
.....777777.....
................
................
................
................
................
................`],
  [wall, bitmap`
0000000000000000
0555555555555550
0555555555555550
0555555555555550
0555555555555550
0555555555555550
0555555555555550
0000000000000000
0555555555555550
0555555555555550
0555555555555550
0555555555555550
0555555555555550
0555555555555550
0555555555555550
0000000000000000`]
);

setSolids([player, redBox, blueBox, purpleBox, wall]);
setPushables({ [player]: [redBox, blueBox, purpleBox] });

// each entry ties one box color to the only goal color it can satisfy
const pairs = [
  { box: redBox, goal: redGoal },
  { box: blueBox, goal: blueGoal },
  { box: purpleBox, goal: purpleGoal }
];

const levels = [
  map`
wwwwwww
w.....w
w.bg..w
w.p...w
wwwwwww`,
  map`
wwwwwwww
w......w
w.bg...w
w......w
w.bg...w
wp.....w
wwwwwwww`,
  map`
wwwwwwww
w.g.g..w
w......w
w.b.b..w
w......w
w..p...w
wwwwwwww`
];

let level = 0;
let endlessLevel = 0;
let currentLevel = levels[level];
setMap(currentLevel);

// a level is done only when every goal is covered by a box of ITS color
function levelComplete() {
  for (const pair of pairs) {
    const goals = tilesWith(pair.goal).length;
    const matched = tilesWith(pair.goal, pair.box).length;
    if (goals !== matched) return false;
  }
  return true;
}

// CHANGE 2: procedural endless generator
const GEN_W = 10; // total width, wall border included, 8x8
const GEN_H = 10;

function randInt(n) {
  return Math.floor(Math.random() * n);
}

// every still-empty floor tile, one of them at random
function randomEmpty(grid) {
  const spots = [];
  for (let y = 1; y <= GEN_H - 2; y++) {
    for (let x = 1; x <= GEN_W - 2; x++) {
      if (grid[y][x] === ".") spots.push({ x, y });
    }
  }
  if (spots.length === 0) return null;
  return spots[randInt(spots.length)];
}

function generateLevel(pairCount) {
  // open room boxed in by walls
  const grid = [];
  for (let y = 0; y < GEN_H; y++) {
    const row = [];
    for (let x = 0; x < GEN_W; x++) {
      const edge = x === 0 || y === 0 || x === GEN_W - 1 || y === GEN_H - 1;
      row.push(edge ? wall : ".");
    }
    grid.push(row);
  }

  const placed = [];

  // boxes sit at least one tile off every wall and never touch another box,
  // so each one starts with free space on all four sides (nothing is pre-wedged)
  for (let i = 0; i < pairCount; i++) {
    const candidates = [];
    for (let y = 2; y <= GEN_H - 3; y++) {
      for (let x = 2; x <= GEN_W - 3; x++) {
        if (grid[y][x] !== ".") continue;
        let ok = true;
        for (const s of placed) {
          if (Math.abs(s.x - x) <= 1 && Math.abs(s.y - y) <= 1) { ok = false; break; }
        }
        if (ok) candidates.push({ x, y });
      }
    }
    if (candidates.length === 0) break; // no room left, just use fewer pairs
    const spot = candidates[randInt(candidates.length)];
    const pair = pairs[i % pairs.length]; // cycle colors so N can pass 3
    grid[spot.y][spot.x] = pair.box;
    placed.push({ x: spot.x, y: spot.y, pair });
  }

  // one matching goal per placed box, always on a tile nothing else claimed
  for (const s of placed) {
    const spot = randomEmpty(grid);
    if (spot === null) break;
    grid[spot.y][spot.x] = s.pair.goal;
  }

  // player last, so it can never land on a box or goal
  const start = randomEmpty(grid);
  if (start !== null) grid[start.y][start.x] = player;

  let rows = "";
  for (let y = 0; y < GEN_H; y++) {
    rows += grid[y].join("");
    if (y < GEN_H - 1) rows += "\n";
  }
  return map`${rows}`; // hand the built string to Sprig's map tag
}

function startEndlessLevel() {
  const pairCount = Math.min(5, 2 + Math.floor((endlessLevel - 1) / 2)); // 2 pairs, creeping up to 5
  currentLevel = generateLevel(pairCount);
  setMap(currentLevel);
  clearText();
  addText("lvl " + endlessLevel, { x: 1, y: 1 });
}

onInput("w", () => {
  getFirst(player).y -= 1;
});

onInput("s", () => {
  getFirst(player).y += 1;
});

onInput("a", () => {
  getFirst(player).x -= 1;
});

onInput("d", () => {
  getFirst(player).x += 1;
});

onInput("j", () => {
  setMap(currentLevel);
});

afterInput(() => {
  if (!levelComplete()) return;

  level += 1;
  if (level < levels.length) {
    currentLevel = levels[level];
    setMap(currentLevel);
    clearText();
  } else {
    endlessLevel += 1;
    startEndlessLevel();
  }
});
