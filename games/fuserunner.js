/*
@title: Fuse Runner
@author: FrostyDevLOL
@description: This game is about a bomb racing thru a maze to a water bucket to defuse itself. The maze changes every level for infinite fun!
@tags: ['puzzle', 'random']
@addedOn: 2026-10-06
*/

const p = "p"; // player (bomb)
const b = "b"; // bucket (exit)
const w = "w"; // wall

// 1. Pixel Art
setLegend(
  [p, bitmap`
................
.....22222......
...222552222....
..22225552222...
.2222555552222..
.2225555555222..
.2225505055222..
.2225555555222..
.2225555555222..
.2222555552222..
..22225552222...
...222222222....
.....22222......
................
................
................`],
  [b, bitmap`
................
................
...999999999....
...988888889....
...988888889....
...911111119....
...911111119....
...911111119....
....91111119....
....91111119....
....91111119....
.....999999.....
................
................
................
................`],
  [w, bitmap`
5555555555555555
5444444444444445
5411111111111145
5411111111111145
5411111111111145
5411111111111145
5411111111111145
5411111111111145
5411111111111145
5411111111111145
5411111111111145
5411111111111145
5411111111111145
5411111111111145
5444444444444445
5555555555555555`]
);

setSolids([p, w]);

// 2. Game Variables
const mazeWidth = 17;  
const mazeHeight = 11; 

let gameState = "home"; 
let levelNum = 1;
let highScore = 0;
let timeLeft = 0;
let timerInterval = null;

// 3. UI Manager (Compacted to fit the screen)
function drawUI() {
  clearText(); 
  
  if (gameState === "home") {
    addText("FUSE RUNNER", { y: 3, color: color`6` });
    addText("J: Start", { y: 7, color: color`3` });
    if (highScore > 0) {
      addText(`HIGH: ${highScore}`, { y: 9, color: color`5` });
    }
  } 
  else if (gameState === "playing") {
    // Compacted HUD
    addText(`LVL:${levelNum} T:${timeLeft}s`, { y: 1, color: color`3` });
  } 
  else if (gameState === "gameover") {
    addText("TIME OUT!", { y: 3, color: color`4` });
    addText(`BEATEN: ${levelNum - 1}`, { y: 5, color: color`0` });
    addText(`HIGH: ${highScore}`, { y: 7, color: color`5` });
    addText("J: Restart", { y: 9, color: color`3` });
  }
}

// 4. Time Limit & Game State Handlers
function startLevelTimer() {
  timeLeft = Math.max(8, 25 - (levelNum - 1));
  drawUI();
  
  if (timerInterval) clearInterval(timerInterval);
  
  timerInterval = setInterval(() => {
    if (gameState === "playing") {
      timeLeft--;
      drawUI(); 
      if (timeLeft <= 0) {
        endGame();
      }
    }
  }, 1000); 
}

function startGame() {
  levelNum = 1;
  gameState = "playing";
  generateNewMaze();
  startLevelTimer();
}

function endGame() {
  gameState = "gameover";
  if (timerInterval) clearInterval(timerInterval);
  
  const levelsBeaten = levelNum - 1;
  if (levelsBeaten > highScore) {
    highScore = levelsBeaten; 
  }
  
  let blankMap = "";
  for (let i = 0; i < mazeHeight; i++) {
    blankMap += ".................\n";
  }
  setMap(blankMap);
  drawUI();
}

// 5. Maze Generator
function generateNewMaze() {
  const grid = [];
  for (let y = 0; y < mazeHeight; y++) {
    grid[y] = [];
    for (let x = 0; x < mazeWidth; x++) {
      grid[y][x] = "w";
    }
  }

  const visited = {};
  function carve(cx, cy) {
    visited[`${cx},${cy}`] = true;
    grid[cy][cx] = "."; 

    const directions = [
      [0, -2], [0, 2], [-2, 0], [2, 0]
    ];
    
    for (let i = directions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [directions[i], directions[j]] = [directions[j], directions[i]];
    }

    for (const [dx, dy] of directions) {
      const nx = cx + dx;
      const ny = cy + dy;

      if (nx > 0 && nx < mazeWidth - 1 && ny > 0 && ny < mazeHeight - 1 && !visited[`${nx},${ny}`]) {
        grid[cy + dy / 2][cx + dx / 2] = "."; 
        carve(nx, ny);
      }
    }
  }

  carve(1, 1);
  grid[1][1] = "p"; 
  grid[mazeHeight - 2][mazeWidth - 2] = "b"; 

  let mapString = "";
  for (let y = 0; y < mazeHeight; y++) {
    mapString += grid[y].join("") + "\n";
  }
  setMap(mapString);
}


// 6. Input Controls
onInput("j", () => {
  if (gameState === "home" || gameState === "gameover") {
    startGame();
  }
});

onInput("k", () => {
  if (gameState === "playing") {
    endGame(); 
  }
});

onInput("w", () => { if (gameState === "playing" && getFirst(p)) getFirst(p).y -= 1; });
onInput("s", () => { if (gameState === "playing" && getFirst(p)) getFirst(p).y += 1; });
onInput("a", () => { if (gameState === "playing" && getFirst(p)) getFirst(p).x -= 1; });
onInput("d", () => { if (gameState === "playing" && getFirst(p)) getFirst(p).x += 1; });

// 7. Check for Victory
afterInput(() => {
  if (gameState !== "playing") return;
  
  const player = getFirst(p);
  const target = getFirst(b);

  if (player && target && player.x === target.x && player.y === target.y) {
    levelNum++;
    generateNewMaze();
    startLevelTimer(); 
  }
});

// 8. Initialize Home Screen on boot
let initialBlankMap = "";
for (let i = 0; i < mazeHeight; i++) {
  initialBlankMap += ".................\n";
}
setMap(initialBlankMap);
drawUI();
