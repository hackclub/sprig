// ... (existing code)

// Additional setup for enhanced visuals
const tileWidth = 64;
const tileHeight = 64;

// Draw the background
function drawBackground() {
  for (let y = 0; y < 7; y++) {
    for (let x = 0; x < 7; x++) {
      addSprite(x, y, bg);
    }
  }
}

// Draw the game tiles with lights
function drawTiles() {
  for (let y = 0; y < 7; y++) {
    for (let x = 0; x < 7; x++) {
      const lightType = getTile(x, y).map((x) => x.type);
      if (lightType.includes(lightOn)) {
        addSprite(x, y, lightOn);
      } else if (lightType.includes(lightOff)) {
        addSprite(x, y, lightOff);
      }
    }
  }
}

// Draw the cursor
function drawCursor(x, y) {
  addSprite(x, y, cursor);
}

// Draw the level text
function drawLevelText(level) {
  addText("Level", { x: 580, y: 50, color: color`3`, size: 36 });
  addText(level.toString(), { x: 590, y: 100, color: color`L`, size: 36 });
}

// Draw the timer text
function drawTimer(timer) {
  addText("Time", { x: 580, y: 200, color: color`3`, size: 36 });
  const minutes = Math.floor(timer / 60);
  const seconds = (timer % 60).toString().padStart(2, "0");
  addText(`${minutes}:${seconds}`, { x: 590, y: 250, color: color`C`, size: 36 });
}

// Draw the moves text
function drawMoves(moves) {
  addText("Moves", { x: 580, y: 350, color: color`8`, size: 36 });
  addText(moves.toString(), { x: 590, y: 400, color: color`H`, size: 36 });
}

// Load level with enhanced visuals
function loadLevel(n) {
  clearInterval(timerInterval); // Stop the timer

  setMap(levels[n]); // Load level map

  drawBackground(); // Draw the background
  drawTiles(); // Draw the game tiles
  const cursorPos = { x: 3, y: 3 };
  drawCursor(cursorPos.x, cursorPos.y); // Draw the cursor at the center
  drawLevelText(level); // Draw level text
  drawTimer(timer); // Draw timer text
  drawMoves(moves); // Draw moves text

  controlsEnabled = true; // Enable controls
}

// ... (existing code)

// Additional function to handle cursor movement with arrow keys
function handleArrowKeyInput(key) {
  if (!controlsEnabled) return;

  const cursorPos = getFirst(cursor);
  let newX = cursorPos.x;
  let newY = cursorPos.y;

  if (key === "ArrowUp" && cursorPos.y > 1) {
    newY--;
  } else if (key === "ArrowDown" && cursorPos.y < 5) {
    newY++;
  } else if (key === "ArrowLeft" && cursorPos.x > 1) {
    newX--;
  } else if (key === "ArrowRight" && cursorPos.x < 5) {
    newX++;
  }

  // Only update cursor position if it changed
  if (newX !== cursorPos.x || newY !== cursorPos.y) {
    // Clear old cursor position
    clearTile(cursorPos.x, cursorPos.y);
    // Draw new cursor position
    drawCursor(newX, newY);
  }
}

// Cursor Control (updated with arrow key input)
onInput("w", () => handleArrowKeyInput("ArrowUp"));
onInput("a", () => handleArrowKeyInput("ArrowLeft"));
onInput("s", () => handleArrowKeyInput("ArrowDown"));
onInput("d", () => handleArrowKeyInput("ArrowRight"));

// ... (existing code)

// Flip tile group
onInput("k", () => {
  if (!controlsEnabled) return;

  const tile = getFirst(cursor);
  flipTileGroup(tile.x, tile.y); // Flip the tile group underneath the cursor

  // ... (existing code)

  // Additional code to update visuals after tile flip
  drawTiles(); // Redraw game tiles
  drawCursor(tile.x, tile.y); // Redraw cursor
  drawMoves(moves); // Update moves text

  // ... (existing code)
});

// ... (existing code)
loadLevel(level); // Load the first level
