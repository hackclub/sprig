const player = "p"; // Key for player sprite
const wall = "w";   // Key for wall sprite
const treasure = "t"; // Key for treasure sprite
const bullet = "b"; // Key for bullet sprite
const enemy = "e";   // Key for enemy sprite

setLegend(
  [player, bitmap`
................
................
................
................
......000.......
......CCC.......
......CCC.......
.......C........
.....C777C......
.....C777C......
.....C777C......
......777.......
......000.......
......0.0.......
......0.0.......
.....00.00......`],
  [wall, bitmap`
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111`],
  [treasure, bitmap`
................
................
................
....444444......
...44....44.....
...4.4444.4.....
...4.4444.4.....
...44....44.....
....444444......
................
................
................
................
................
................
................`],
  [bullet, bitmap`
................
................
................
................
................
................
......0000......
......0000......
......0000......
......0000......
................
................
................
................
................
................`],
  [enemy, bitmap`
................
................
................
......3333......
.....333333.....
....33033033....
....33333333....
....33000033....
.....330033.....
......3333......
................
................
................
................
................
................`]
);

setSolids([player, wall, enemy]); // Define solid objects (enemies block movement)

let level = 0; // Start at level 0
let lives = 3; // Start with 3 lives

// Define 10 advanced 10x10 levels with player in bottom-right, enemies blocking treasure
const level1 = map`
wwwwwwwwww
w.tw.e.w.w
w.wwww.w.w
w.e..e.w.w
w.wwww.w.w
w.w....w.w
w.w.wwww.w
w.w.e..e.w
w.w.wwww.w
wwwwwwwwpw`;

const level2 = map`
wwwwwwwwww
w.tww.e..w
w.www.ww.w
w.e.w.w..w
w.w.w.we.w
w.w.w.ww.w
w.w.w.w..w
w.we..e..w
w.wwww.w.w
wwwwwwwwpw`;

const level3 = map`
wwwwwwwwww
wtw.e..e.w
w.w.wwww.w
w.w..e.w.w
w.wwww.w.w
w.e..w.w.w
w.ww.w.w.w
w.w..e.w.w
w.w.wwww.w
wwwwwwwwpw`;

const level4 = map`
wwwwwwwwww
w.t.w....w
w.w.w.we.w
w.e.w.w..w
w.w.w.w..w
w.w.e.w.ew
w.w.w.w..w
w.w.w.e..w
w.w.w.w..w
wwwwwwwwpw`;

const level5 = map`
wwwwwwwwww
w.t....e.w
w.wwww.w.w
w....w.w.w
w.e..w.w.w
w.w..w.w.w
w.w.ww.w.w
w.w..e.w.w
w.w.wwww.w
wwwewwwwpw`;

const level6 = map`
wwwwwwwwww
w.tww....w
w.wew.we.w
w.w...w..w
w.w.w.w..w
w.e.w.w.ew
w.w.w.w..w
w.w.w.e..w
w.w.w.w..w
wwwwwwwwpw`;

const level7 = map`
wwwwwwwwww
wtw....e.w
w.w.wwww.w
w.w.e..w.w
w.w.w..w.w
w.w.w..w.w
w.w.ww.w.w
w.w..e.w.w
w.e.w..w.w
wwwwwwwwpw`;

const level8 = map`
wwwwwwwwww
w.t.w.e..w
w.w.w.w..w
w.we..w..w
w.w.w.w..w
we..w.w..w
w.w.w.w..w
w.w.w.e..w
w.w.w.w..w
wwwwwwwwpw`;

const level9 = map`
wwwwwwwwww
wew....e.w
w.w.wwww.w
w...e..w.w
w.w.w..w.w
w.w.w.we.w
w.w.w..w.w
w.w..e.w.w
wtw.wwww.w
wwwwwwwwpw`;

const level10 = map`
wwwwwwwwww
wetew.e..w
w.w.w.w.ew
w.e.w.w..w
w.w.w.we.w
w.w.e.w..w
w.w.w.w.ew
w.w.w.w..w
w.w.w.we.w
wwwwwwwwpw`;

const levels = [level1, level2, level3, level4, level5, level6, level7, level8, level9, level10];
setMap(levels[level]); // Load the first level

// Display initial lives
addText(`Lives: ${lives}`, { x: 6, y: 0, color: color`0` });

setPushables({
  [player]: []
});

// Player movement
onInput("w", () => {
  const playerPos = getFirst(player);
  if (playerPos.y - 1 >= 0) playerPos.y -= 1; // Move up with boundary check
});
onInput("s", () => {
  const playerPos = getFirst(player);
  if (playerPos.y + 1 < height()) playerPos.y += 1; // Move down with boundary check
});
onInput("a", () => {
  const playerPos = getFirst(player);
  if (playerPos.x - 1 >= 0) playerPos.x -= 1; // Move left with boundary check
});
onInput("d", () => {
  const playerPos = getFirst(player);
  if (playerPos.x + 1 < width()) playerPos.x += 1; // Move right with boundary check
});

// Shooting bullets in all directions with the "k" key
onInput("k", () => {
  const playerPos = getFirst(player);
  if (playerPos) { // Ensure the player exists
    if (playerPos.y - 1 >= 0) addSprite(playerPos.x, playerPos.y - 1, bullet); // Up
    if (playerPos.y + 1 < height()) addSprite(playerPos.x, playerPos.y + 1, bullet); // Down
    if (playerPos.x - 1 >= 0) addSprite(playerPos.x - 1, playerPos.y, bullet); // Left
    if (playerPos.x + 1 < width()) addSprite(playerPos.x + 1, playerPos.y, bullet); // Right
  } else {
    console.log("Error: Player sprite not found!");
  }
});

// Enemy movement and attempt to run into player
setInterval(() => {
  const playerPos = getFirst(player);
  getAll(enemy).forEach(e => {
    const leftTile = getTile(e.x - 1, e.y);
    const rightTile = getTile(e.x + 1, e.y);
    let nextX = e.x;

    // Determine next move
    if (e.x + 1 < width() && !rightTile.some(sprite => sprite.type === wall || sprite.type === enemy)) {
      nextX = e.x + 1; // Plan to move right
    } else if (e.x - 1 >= 0 && !leftTile.some(sprite => sprite.type === wall || sprite.type === enemy)) {
      nextX = e.x - 1; // Plan to move left
    }

    // Check if next move would hit player
    if (nextX === playerPos.x && e.y === playerPos.y) {
      lives -= 1; // Lose a life
      clearText();
      addText(`Lives: ${lives}`, { x: 6, y: 0, color: color`0` });
      
      if (lives > 0) {
        // Reset to start of current level
        setMap(levels[level]);
      } else {
        // Game over: reset to level 0 with 3 lives
        level = 0;
        lives = 3;
        setMap(levels[level]);
        addText("Game Over!\nStarting Over", { x: 4, y: 4, color: color`3` });
        setTimeout(() => {
          clearText();
          addText(`Lives: ${lives}`, { x: 1, y: 1, color: color`3` });
        }, 2000); // Clear game over message after 2 seconds
      }
    } else {
      // Move enemy if no player collision
      e.x = nextX;
    }
  });
}, 500); // Move enemies every 500ms

// Bullet movement and enemy collision logic
setInterval(() => {
  getAll(bullet).forEach(b => {
    // Move bullets outward from player position at spawn time
    const dx = b.x - getFirst(player).x;
    const dy = b.y - getFirst(player).y;
    if (dx > 0 && b.x + 1 < width() && !getTile(b.x + 1, b.y).some(s => s.type === wall)) b.x += 1;
    else if (dx < 0 && b.x - 1 >= 0 && !getTile(b.x - 1, b.y).some(s => s.type === wall)) b.x -= 1;
    else if (dy > 0 && b.y + 1 < height() && !getTile(b.x, b.y + 1).some(s => s.type === wall)) b.y += 1;
    else if (dy < 0 && b.y - 1 >= 0 && !getTile(b.x, b.y - 1).some(s => s.type === wall)) b.y -= 1;
    else b.remove(); // Remove bullet if it hits a wall or boundary

    // Check for bullet-enemy collision
    const tile = tilesWith(bullet, enemy);
    if (tile.length > 0) {
      tile[0].forEach(sprite => {
        if (sprite.type === enemy) sprite.remove(); // Remove enemy
        if (sprite.type === bullet) sprite.remove(); // Remove bullet
      });
    }
  });
}, 100); // Move bullets every 100ms

// Check for treasure collection and level progression
afterInput(() => {
  const tile = tilesWith(player, treasure);
  if (tile.length > 0) {
    level += 1;
    if (level < levels.length) {
      setMap(levels[level]);
      clearText();
      addText(`Lives: ${lives}`, { x: 1, y: 1, color: color`3` });
    } else {
      clearText();
      addText("You found all treasures!\nYou win!", { x: 4, y: 4, color: color`3` });
    }
  }
});