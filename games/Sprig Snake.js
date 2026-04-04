const player = "p"; // The Snake's Head
const body   = "b"; // The Snake's Body
const apple  = "a"; // The Yummy Apple
const wall   = "w"; // The Walls
const floor  = "."; // The Empty Floor

setLegend(
  [ player, bitmap`
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999` ], 
  [ body, bitmap`
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999` ],
  [ apple, bitmap`
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
3333333333333333` ],
  [ wall, bitmap`
................
................
................
................
................
................
................
................
................
................
................
................
................
................
................
................` ]
);

// --- 2. SETUP MAP ---
const levelLayout = map`
wwwwwwwwwwwwwwwww
w...............w
w...............w
w...............w
w...............w
w.......a.......w
w...............w
w...............w
w......ppp......w
w...............w
w...............w
w...............w
w...............w
w...............w
wwwwwwwwwwwwwwwww`;

setMap(levelLayout);

// --- 3. GAME VARIABLES ---
let snake = [];
let direction = { x: 1, y: 0 }; // Moving Right initially
let nextDirection = { x: 1, y: 0 }; // Input buffer
let score = 0;
let gameInterval = null;

// Initialize Snake position from the map
const startTiles = getAll(player);

startTiles.forEach(t => {
  const x = t.x;
  const y = t.y;
  // Clear the map setup tiles
  addSprite(x, y, floor); 
});

// Hardcode start for reliability
snake = [
  { x: 5, y: 8 }, // Head
  { x: 4, y: 8 }, // Body
  { x: 3, y: 8 }  // Tail
];

// --- 4. GAME LOGIC ---

function spawnApple() {
  let valid = false;
  let ax, ay;
  
  // Try random spots until we find an empty one
  while (!valid) {
    ax = Math.floor(Math.random() * 15) + 1; // 1 to 15 (inside walls)
    ay = Math.floor(Math.random() * 13) + 1; 
    
    // Check if anything is already there
    const tiles = getTile(ax, ay);
    const isClear = tiles.every(t => t.type !== wall && t.type !== player && t.type !== body);
    
    if (isClear) {
      valid = true;
      addSprite(ax, ay, apple);
    }
  }
}

function drawSnake() {
  // Clear old snake bodies from screen handled by logic below
  // This function just draws the current state
  snake.forEach((segment, index) => {
    // Remove any existing snake parts at this spot to prevent overlap visual bugs
    const existing = getTile(segment.x, segment.y).filter(t => t.type === player || t.type === body);
    existing.forEach(t => t.remove());

    // Draw Head or Body
    if (index === 0) {
      addSprite(segment.x, segment.y, player);
    } else {
      addSprite(segment.x, segment.y, body);
    }
  });
}

function gameOver() {
  console.log("Game Over! Score: " + score);
  // Simple reset
  score = 0;
  snake = [{ x: 5, y: 8 }, { x: 4, y: 8 }];
  direction = { x: 1, y: 0 };
  nextDirection = { x: 1, y: 0 };
  
  // Clear board of old snake parts (optional cleanup)
  const allBodies = getAll(body);
  const allHeads = getAll(player);
  [...allBodies, ...allHeads].forEach(t => t.remove());
}

function update() {
  // Apply the buffered input (prevents 180-degree death)
  // Prevent reversing: if moving Right (x=1), ignore Left (x=-1)
  if (nextDirection.x !== -direction.x && nextDirection.y !== -direction.y) {
     direction = nextDirection;
  }

  const head = snake[0];
  const newHead = { x: head.x + direction.x, y: head.y + direction.y };

  // 1. Check Collisions
  const hitTiles = getTile(newHead.x, newHead.y);
  const hitWall = hitTiles.some(t => t.type === wall);
  const hitSelf = hitTiles.some(t => t.type === body);

  if (hitWall || hitSelf) {
    gameOver();
    drawSnake(); // Redraw reset state
    return;
  }

  // 2. Move Snake
  snake.unshift(newHead); // Add new head

  // 3. Check Apple
  const hitApple = hitTiles.some(t => t.type === apple);
  
  if (hitApple) {
    score++;
    // Remove the apple sprite
    hitTiles.find(t => t.type === apple).remove();
    spawnApple();
    // Don't pop the tail, so we grow!
  } else {
    // Normal move: remove tail
    const tail = snake.pop();
    // Visually remove tail from screen
    const itemsAtTail = getTile(tail.x, tail.y);
    itemsAtTail.forEach(t => {
      if (t.type === body || t.type === player) t.remove();
    });
  }

  drawSnake();
}

// --- 5. INPUT HANDLING ---
onInput("w", () => { nextDirection = { x: 0, y: -1 } });
onInput("s", () => { nextDirection = { x: 0, y: 1 } });
onInput("a", () => { nextDirection = { x: -1, y: 0 } });
onInput("d", () => { nextDirection = { x: 1, y: 0 } });

// --- 6. START GAME ---
drawSnake();
// Run the update loop every 250ms (4 times a second)
setInterval(update, 250);
