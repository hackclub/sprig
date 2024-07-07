// Sprig game setup

const player = "p";
const alien = "a";
const bullet = "b";
const wall = "w";

// Set the sprites
setLegend(
  [player, bitmap`
................
................
......LLLL......
......LLLL......
.....LLLLLL.....
.....LLLLLL.....
.....LLLLLL.....
.....LLLLLL.....
.....LLLLLL.....
.....LLLLLL.....
......LLLL......
......LLLL......
................
................
................
................`],
  [alien, bitmap`
................
................
................
....4444444444..
...444444444444.
..44444444444444
..44444444444444
..444..4444..444
..4444......4444
..44444444444444
..44444444444444
...444444444444.
....4444444444..
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
......FFFF......
......FFFF......
......FFFF......
......FFFF......
................
................
................
................
................
................`],
  [wall, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`]
);

// Setup initial game state
setSolids([player, alien, wall]);

// Setup level
const level = map`
wwwwwwwwwwwwwwww
w..............w
w..............w
w..............w
w.a.a.a..a.a.a.w
w.a.a.a..a.a.a.w
w..............w
w..............w
w..............w
w..............w
w..............w
w..............w
w......p.......w
w..............w
wwwwwwwwwwwwwwww`;

setMap(level);

// Variables to control game state
let moveInterval;
let bulletInterval;
let moveRight = true; // Variable to track direction of aliens
let score = 0; // Variable to track the score

// Function to update the score display
function updateScore() {
  clearText();
  addText(`Score: ${score}`, { y: 2, x: 3, color: color`3` });
}

// Move the aliens as a block
function moveAliens() {
  let aliens = getAll(alien);
  if (!aliens || aliens.length === 0) {
    clearInterval(moveInterval);
    clearInterval(bulletInterval);
    clearText();
    addText("You Win!", { y: 7, color: color`3` });
    return;
  }

  // Determine if we need to change direction
  let changeDirection = false;
  for (let a of aliens) {
    if (a.x <= 1 && !moveRight) {
      moveRight = true;
      changeDirection = true;
      break;
    } else if (a.x >= 14 && moveRight) {
      moveRight = false;
      changeDirection = true;
      break;
    }
  }

  // Move aliens as a block
  let offset = moveRight ? 1 : -1;
  if (!changeDirection) {
    for (let a of aliens) {
      a.x += offset;
    }
  }
}

// Shoot bullet
function shootBullet() {
  let p = getFirst(player);
  if (p) {
    let newBullet = addSprite(p.x, p.y - 1, bullet);
  }
}

// Handle player movement
onInput("a", () => {
  let p = getFirst(player);
  if (p && p.x > 0) p.x -= 1; // Move player less pixels
});

onInput("d", () => {
  let p = getFirst(player);
  if (p && p.x < 15) p.x += 1; // Move player less pixels
});

onInput("s", () => {
  shootBullet();
});

// Game update loop
setInterval(() => {
  let bullets = getAll(bullet);
  if (Array.isArray(bullets) && bullets.length > 0) { // Verifica que bullets sea un array
    bullets.forEach(b => {
      if (b) {
        b.y -= 1;
        if (b.y < 0) {
          b.remove();
        } else {
          let tile = getTile(b.x, b.y);
          if (Array.isArray(tile) && tile.length > 0) { // Verifica que tile sea un array
            let hit = tile.filter(s => s.type === alien);
            if (Array.isArray(hit) && hit.length > 0) { // Verifica que hit sea un array
              b.remove(); // Remove bullet on collision
              hit.forEach(h => h.remove()); // Remove all hit aliens
              score += 10; // Increment score by 10 for each alien hit
              updateScore(); // Update the score display
            }
          }
        }
      }
    });
  }
}, 100);

// Start moving aliens
moveInterval = setInterval(moveAliens, 1000); // Mueve los aliens cada 1 segundo

// Initialize score display
updateScore();