// Game Name: Infinite Sokoban DX
// Dev: Kshitiz Mishra

const player = "p";
const box = "b";
const target = "t";
const wall = "w";

setLegend(
  [ player, bitmap`
0 0 3 3 3 3 0 0
0 3 2 2 2 2 3 0
3 2 2 2 2 2 2 3
3 2 0 2 2 0 2 3
3 2 2 2 2 2 2 3
0 3 2 3 3 2 3 0
0 0 3 0 0 3 0 0
0 0 3 0 0 3 0 0` ],
  [ box, bitmap`
3 3 3 3 3 3 3 3
3 1 1 1 1 1 1 3
3 1 3 3 3 3 1 3
3 1 3 1 1 3 1 3
3 1 3 1 1 3 1 3
3 1 3 3 3 3 1 3
3 1 1 1 1 1 1 3
3 3 3 3 3 3 3 3` ],
  [ target, bitmap`
0 0 0 0 0 0 0 0
0 5 5 0 0 5 5 0
0 5 5 0 0 5 5 0
0 0 0 5 5 0 0 0
0 0 0 5 5 0 0 0
0 5 5 0 0 5 5 0
0 5 5 0 0 5 5 0
0 0 0 0 0 0 0 0` ],
  [ wall, bitmap`
0 0 0 0 0 0 0 0
0 1 1 1 1 1 1 0
0 1 0 0 0 0 1 0
0 1 0 1 1 0 1 0
0 1 0 1 1 0 1 0
0 1 0 0 0 0 1 0
0 1 1 1 1 1 1 0
0 0 0 0 0 0 0 0` ]
);

setSolids([ player, box, wall ]);

let score = 0;

function generateLevel() {
  clearText();
  
  let grid = [
    ["w","w","w","w","w","w","w","w"],
    ["w",".",".",".",".",".",".","w"],
    ["w",".",".",".",".",".",".","w"],
    ["w",".",".",".",".",".",".","w"],
    ["w",".",".",".",".",".",".","w"],
    ["w",".",".",".",".",".",".","w"],
    ["w",".",".",".",".",".",".","w"],
    ["w","w","w","w","w","w","w","w"]
  ];

  grid[1][1] = "p";

  let placedTargets = 0;
  while (placedTargets < 2) {
    let rx = Math.floor(Math.random() * 4) + 2;
    let ry = Math.floor(Math.random() * 4) + 2;
    if (grid[ry][rx] === ".") {
      grid[ry][rx] = "t";
      placedTargets++;
    }
  }

  let placedBoxes = 0;
  while (placedBoxes < 2) {
    let rx = Math.floor(Math.random() * 4) + 2;
    let ry = Math.floor(Math.random() * 4) + 2;
    if (grid[ry][rx] === ".") {
      grid[ry][rx] = "b";
      placedBoxes++;
    }
  }

  const mapString = grid.map(row => row.join(" ")).join("\n");
  setMap(mapString);
  
  addText(`Score: ${score}`, { x: 0, y: 0, color: color`3` });
}

function move(dx, dy) {
  const p = getFirst(player);
  if (!p) return;

  const targetX = p.x + dx;
  const targetY = p.y + dy;
  
  const pushedBox = getTile(targetX, targetY).find(tile => tile.type === box);

  if (pushedBox) {
    const boxTargetX = targetX + dx;
    const boxTargetY = targetY + dy;
    const boxDestTiles = getTile(boxTargetX, boxTargetY);

    const isBlocked = boxDestTiles.some(
      tile => tile.type === wall || tile.type === box
    );

    if (!isBlocked) {
      pushedBox.x = boxTargetX;
      pushedBox.y = boxTargetY;
      p.x = targetX;
      p.y = targetY;
    }
  } else {
    const isWall = getTile(targetX, targetY).some(tile => tile.type === wall);
    if (!isWall) {
      p.x = targetX;
      p.y = targetY;
    }
  }
}

onInput("w", () => move(0, -1));
onInput("s", () => move(0, 1));
onInput("a", () => move(-1, 0));
onInput("d", () => move(1, 0));

afterInput(() => {
  const targets = getAll(target);
  let solved = 0;

  targets.forEach(t => {
    const hasBox = getTile(t.x, t.y).some(tile => tile.type === box);
    if (hasBox) solved++;
  });

  if (solved === targets.length && targets.length > 0) {
    score += 1;
    generateLevel();
  }
});

generateLevel();
