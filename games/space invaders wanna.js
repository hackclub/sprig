const player = "p"; // Player's sprite
const enemy = "e";  // Enemy's sprite
const bullet = "b"; // Bullet's sprite
const enemyBullet = "x"; // Enemy's bullet
const empty = "k"; // Blank space

setLegend(
  [player, bitmap`
  .0000.
  000000
  .0000.
  0.00.0
  0....0
  ......`],
  [enemy, bitmap`
  ......
  0.00.0
  .0000.
  .0..0.
  ......
  ......`],
  [bullet, bitmap`
  ..0...
  ..0...
  ......
  ......
  ......
  ......`],
  [enemyBullet, bitmap`
  ......
  ..0...
  ..0...
  ......
  ......
  ......`],
  [empty, bitmap`
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666`]
);

// Define the game map
setMap(map`
................
................
....e....e......
................
................
................
................
................
......p.........
................
`);

const mapHeight = 10; // Map height (hardcoded based on setMap)
const mapWidth = 16; // Map width (hardcoded based on setMap)

// Set player controls
onInput("a", () => {
  const p = getFirst(player);
  if (p.x > 0) p.x -= 1; // Prevent going out of bounds
});

onInput("d", () => {
  const p = getFirst(player);
  if (p.x < mapWidth - 1) p.x += 1; // Prevent going out of bounds
});

onInput("w", () => {
  const p = getFirst(player);
  addSprite(p.x, p.y - 1, bullet); // Fire a bullet above the player
});

// Move player bullets upward
setInterval(() => {
  const bullets = getAll(bullet);
  for (const b of bullets) {
    b.y -= 1;
    if (b.y < 0) b.remove(); // Remove bullets that go out of bounds
  }
}, 100);

// Move enemies downward periodically
setInterval(() => {
  const enemies = getAll(enemy);
  for (const e of enemies) {
    e.y += 1;
    if (e.y >= mapHeight) {
      end("Game Over! The enemies reached you.");
    }
  }
}, 1000);

// Enemies shoot bullets randomly
setInterval(() => {
  const enemies = getAll(enemy);
  for (const e of enemies) {
    if (Math.random() < 0.3) {
      addSprite(e.x, e.y + 1, enemyBullet); // Enemy shoots downward
    }
  }
}, 1500);

// Move enemy bullets downward
setInterval(() => {
  const eBullets = getAll(enemyBullet);
  for (const eb of eBullets) {
    eb.y += 1;
    if (eb.y >= mapHeight) eb.remove(); // Remove bullets that go out of bounds
  }
}, 100);

// Collision detection
setInterval(() => {
  // Bullet hits enemy
  const bullets = getAll(bullet);
  for (const b of bullets) {
    const hitEnemy = getTile(b.x, b.y).find((s) => s.type === enemy);
    if (hitEnemy) {
      hitEnemy.remove();
      b.remove();
    }
  }

  // Enemy bullet hits player
  const eBullets = getAll(enemyBullet);
  for (const eb of eBullets) {
    const hitPlayer = getTile(eb.x, eb.y).find((s) => s.type === player);
    if (hitPlayer) {
      end("Game Over! You were hit.");
    }
  }
}, 50);

// Check for win condition
setInterval(() => {
  if (getAll(enemy).length === 0) {
    end("You win! All enemies defeated.");
  }
}, 100);
