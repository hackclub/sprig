const player = "p";
const bullet = "b";
const background = "g";
const obstacle = "o";
const abilityIndicator = "a";

setLegend(
  [player, bitmap`
................
................
................
.....777777.....
.....7C77C7.....
.....777777.....
.....773377.....
......7777......
.....777777.....
.......77.......
......7777......
......7..7......
.....77..77.....
................
................
................`],
  [bullet, bitmap`
................
.LLLLLLLLLLLLLL.
.LLLLLLLLLLLLLL.
.LLLLLLLLLLLLLL.
.LLLLLLLLLLLLLL.
.LLLLLLLLLLLLLL.
.LLLLLLLLLLLLLL.
.LLLLLLLLLLLLLL.
.LLLLLLLLLLLLLL.
.LLLLLLLLLLLLLL.
.LLLLLLLLLLLLLL.
.LLLLLLLLLLLLLL.
.LLLLLLLLLLLLLL.
.LLLLLLLLLLLLLL.
.LLLLLLLLLLLLLL.
................`],
  [obstacle, bitmap`
................
..CCCCCCCCCCCC..
..CCCCCCCCCCCC..
..CCCCCCCCCCCC..
..CCCCCCCCCCCC..
..CCCCCCCCCCCC..
..CCCCCCCCCCCC..
..CCCCCCCCCCCC..
..CCCCCCCCCCCC..
..CCCCCCCCCCCC..
..CCCCCCCCCCCC..
..CCCCCCCCCCCC..
..CCCCCCCCCCCC..
..CCCCCCCCCCCC..
................
................`],
  [abilityIndicator, bitmap`
................
............666.
....DDDD...66666
...DDDDDD..66666
...DDDDDD9966666
...DDDDDD9966666
...DDDDDD9966666
....DDDD9999666.
.....999999999..
....FFF99977777.
...FFFFF97777777
...FFFFF97777777
...FFFFF97777777
...FFFFF.7777777
...FFFFF..77777.
....FFF.........`],
  [background, bitmap`
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
4444444444444444`]
);

setBackground(background);

const level = map`
................
................
................
...ooooo........
...o............
...o............
........p.......
................
................
...ooooo........
................
................
................
................
................`;
setMap(level);

setSolids([player, bullet, obstacle]);

let gameOver = false;
let gameStarted = false;
let stepsSurvived = 0;
let abilityAvailable = false;
let instruct = false;

function showStartScreen() {
  addText("Your name is", { x: 2, y: 1, color: color`3` });
  addText("Rico Rodriguez.", { x: 2, y: 2, color: color`3` });
  addText("The black hand", { x: 2, y: 4, color: color`3` });
  addText("have found you", { x: 2, y: 5, color: color`3` });
  addText("vulnerable!", { x: 2, y: 6, color: color`3` });
  addText("Your controls", { x: 2, y: 8, color: color`3` });
  addText("have been", { x: 2, y: 9, color: color`3` });
  addText("hacked", { x: 2, y: 10, color: color`3` });
  addText("and are somehow", { x: 2, y: 11, color: color`3` });
  addText("flipped!", { x: 2, y: 12, color: color`3` });
  addText("Press I to start", { x: 2, y: 14, color: color`3` });
}

function instructions() {
  clearText();
  addText("Use DSAW to move", { x: 2, y: 1, color: color`3` });
  addText("When you see a", { x: 2, y: 2, color: color`3` });
  addText("colurful icon", { x: 2, y: 4, color: color`3` });
  addText("in the top right,", { x: 2, y: 5, color: color`3` });
  addText("you can press k", { x: 2, y: 6, color: color`3` });
  addText("to launch bavarium", { x: 2, y: 8, color: color`3` });
  addText("nuke, destroying", { x: 2, y: 9, color: color`3` });
  addText("the brown obstacle", { x: 2, y: 10, color: color`3` });
  addText("It recharges every", { x: 2, y: 11, color: color`3` });
  addText("20 points!", { x: 2, y: 12, color: color`3` });
  addText("Good Luck (i)", { x: 2, y: 14, color: color`3` });
}

function hideStartScreen() {
  clearText();
  instructions()
}
function hideInstructions() {
  clearText();
}

function createBullet() {
  if (!gameOver && gameStarted) {
    const x = 0;
    const y = Math.floor(Math.random() * height());

    const obstacleAtSpawn = getTile(x, y).find(s => s.type === obstacle);

    if (!obstacleAtSpawn && x !== getFirst(player).x) {
      addSprite(x, y, bullet);
    }
  }
}

function moveBullets() {
  if (!gameOver && gameStarted) {
    getAll(bullet).forEach(b => {
      
      const nextTile = getTile(b.x + 1, b.y);
      if (b.x < width() - 1 && !nextTile.some(t => t.type === obstacle)) {
        b.x += 1;
      } else {
        b.remove();
      }
    });
  }
}

function moveObstacles() {
  if (!gameOver && gameStarted) {
    getAll(obstacle).forEach(o => {
      const direction = Math.floor(Math.random() * 4);
      let newX = o.x;
      let newY = o.y;

      if (direction === 0 && o.x > 0) { // Left
        newX -= 1;
      } else if (direction === 1 && o.x < width() - 1) { // Right
        newX += 1;
      } else if (direction === 2 && o.y > 0) { // Up
        newY -= 1;
      } else if (direction === 3 && o.y < height() - 1) { // Down
        newY += 1;
      }

      const obstacleAtNewPosition = getTile(newX, newY).some(t => t.type === obstacle);
      const bulletAtNewPosition = getTile(newX, newY).some(t => t.type === bullet);
      const playerAtNewPosition = getTile(newX, newY).some(t => t.type === player);

      if (!obstacleAtNewPosition && !bulletAtNewPosition && !playerAtNewPosition) {
        o.x = newX;
        o.y = newY;
      }
    });
  }
}

function checkCollisions() {
  const p = getFirst(player);
  
  if (p) {
    getAll(bullet).forEach(b => {
      if (p.x - b.x == 1 &&
          p.y == b.y) {
        gameOver = true;
        addText("Game Over!", { x: 2, y: 5, color: color`3` });
        addText(`Score: ${stepsSurvived}`, { x: 2, y: 7, color: color`3` });
        addText("Press J to restart", { x: 2, y: 9, color: color`3` });
        getAll(bullet).forEach(b => b.remove());
        setInterval(() => {}, 1000);
      }
    });
  }
}

function destroyObstacle() {
  if (abilityAvailable && !gameOver && gameStarted) {
    const p = getFirst(player);
    const obstacles = getAll(obstacle);

    if (obstacles.length > 0) {
      // Find the nearest obstacle to the player
      let nearestObstacle = obstacles[0];
      let nearestDistance = Math.abs(nearestObstacle.x - p.x) + Math.abs(nearestObstacle.y - p.y);

      obstacles.forEach(o => {
        const distance = Math.abs(o.x - p.x) + Math.abs(o.y - p.y);
        if (distance < nearestDistance) {
          nearestObstacle = o;
          nearestDistance = distance;
        }
      });

      nearestObstacle.remove();
      abilityAvailable = false;
      clearAbilityIndicator();
    }
  }
}

function showAbilityIndicator() {
  if (!gameOver && gameStarted) {
    addSprite(15, 0, abilityIndicator);
  }
}

function clearAbilityIndicator() {
  getAll(abilityIndicator).forEach(a => a.remove());
}

onInput("w", () => {
  const p = getFirst(player);
  if (!gameOver && gameStarted && p.y < height() - 1) {
    const nextTile = getTile(p.x, p.y + 1);
    if (!nextTile.some(t => t.type === obstacle)) {
      p.y += 1;
      stepsSurvived += 1;
    }
  }
});

onInput("s", () => {
  const p = getFirst(player);
  if (!gameOver && gameStarted && p.y > 0) {
    const nextTile = getTile(p.x, p.y - 1);
    if (!nextTile.some(t => t.type === obstacle)) {
      p.y -= 1;
      stepsSurvived += 1;
    }
  }
});

onInput("a", () => {
  const p = getFirst(player);
  if (!gameOver && gameStarted ) {
    const nextTile = getTile(p.x - 1, p.y);
    if (!nextTile.some(t => t.type === obstacle)) {
      p.x += 1;
      stepsSurvived += 1;
    }
  }
});

onInput("d", () => {
  const p = getFirst(player);
  if (!gameOver && gameStarted) {
    const nextTile = getTile(p.x + 1, p.y);
    if (!nextTile.some(t => t.type === obstacle)) {
      p.x -= 1;
      stepsSurvived += 1;
    }
  }
});

onInput("k", () => {
  destroyObstacle();
});

onInput("j", () => {
    location.reload();
});

onInput("i", () => {
  if (!gameStarted) {
    gameStarted = true;
    hideStartScreen();
    instructions()
  }
  else {
    if (!instruct) {
      instruct = true;
      hideInstructions()
    
  }
  }
});

afterInput(() => {
  if (!gameOver && gameStarted) {
    moveBullets();
    checkCollisions();
    createBullet();
    moveObstacles();
    if (stepsSurvived >= 20 && !abilityAvailable) {
      abilityAvailable = true;
      showAbilityIndicator();
    }
    addText(`${stepsSurvived}`, { x: 2, y: 1, color: color`3` });
  }
});

setInterval(createBullet, 300);

showStartScreen();
